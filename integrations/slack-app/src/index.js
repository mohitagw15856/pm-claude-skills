// PM Skills — Slack app (Cloudflare Worker). A `/skill` slash command that runs
// a professional skill right in Slack: `/skill executive-update <your notes>`
// or just `/skill <describe the task>` to auto-match. The drafted artifact
// posts back into the channel (or ephemeral to you). Search-only mode
// (`/skill?` ) lists matches without running.
//
// Deploy:  cd integrations/slack-app && npm install && npx wrangler deploy
// Secrets:
//   npx wrangler secret put SLACK_SIGNING_SECRET   # verify requests are from Slack
//   npx wrangler secret put ANTHROPIC_API_KEY      # to actually run skills
// Then in your Slack app: create a slash command `/skill` → this Worker's URL.

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';

const enc = new TextEncoder();
async function verifySlack(req, body, secret) {
  const ts = req.headers.get('x-slack-request-timestamp');
  const sig = req.headers.get('x-slack-signature');
  if (!ts || !sig) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false; // replay guard
  const base = `v0:${ts}:${body}`;
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(base));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return timingSafeEqual(`v0=${hex}`, sig);
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function form(obj) { return Object.fromEntries(new URLSearchParams(obj)); }
const ephemeral = (text) => new Response(JSON.stringify({ response_type: 'ephemeral', text }), { headers: { 'content-type': 'application/json' } });

async function findSkill(q) {
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}&limit=5`);
  if (!r.ok) return null;
  return (await r.json()).skills || [];
}
async function getSkill(name) {
  const r = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}`);
  return r.ok ? r.json() : null;
}
async function runSkill(instructions, userText, key) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6', max_tokens: 2000,
      system: instructions + '\n\nYou are posting into a Slack channel. Produce the deliverable directly, no preamble. Use Slack-friendly markdown. If required inputs are missing, ask for them briefly.',
      messages: [{ role: 'user', content: userText.slice(0, 30000) }],
    }),
  });
  if (!r.ok) throw new Error(`model ${r.status}`);
  const j = await r.json();
  return (j.content || []).map((c) => c.text).join('').trim();
}

// Slack must get a 200 within 3s; heavy work goes async and posts to response_url.
async function handle(payload, env, ctx) {
  const text = (payload.text || '').trim();
  if (!text || text === 'help') {
    return ephemeral('*PM Skills* — `/skill <skill-name> <your notes>` to run one, or `/skill <describe the task>` to auto-match. Add a leading `?` to only search, e.g. `/skill ? churn email`.');
  }
  // Search-only mode.
  if (text.startsWith('?')) {
    const hits = await findSkill(text.slice(1).trim());
    if (!hits || !hits.length) return ephemeral('No matches. Try different words.');
    return ephemeral('Matches:\n' + hits.map((s) => `• *${s.title}* — \`${s.name}\``).join('\n'));
  }
  const first = text.split(/\s+/)[0];
  const rest = text.slice(first.length).trim();
  ctx.waitUntil((async () => {
    try {
      let skill = /^[a-z0-9-]+$/.test(first) ? await getSkill(first) : null;
      let userText = rest;
      if (!skill) { const hits = await findSkill(text); skill = hits && hits[0] ? await getSkill(hits[0].name) : null; userText = text; }
      if (!skill) return post(payload.response_url, { response_type: 'ephemeral', text: 'No skill matched. Try `/skill ? <words>` to search.' });
      if (!env.ANTHROPIC_API_KEY) return post(payload.response_url, { response_type: 'ephemeral', text: `Found *${skill.title}* — set ANTHROPIC_API_KEY on the Worker to run it. Open it: ${skill.name}` });
      const out = await runSkill(skill.instructions, userText || `Draft a ${skill.title}.`, env.ANTHROPIC_API_KEY);
      await post(payload.response_url, { response_type: 'in_channel', text: `*${skill.title}*\n${out}` });
    } catch (e) {
      await post(payload.response_url, { response_type: 'ephemeral', text: `Something went wrong: ${e.message}` });
    }
  })());
  return ephemeral(`Running *${first}*… I'll post the draft here in a moment.`);
}
async function post(url, body) { await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); }

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'GET') return new Response('PM Skills Slack app — set a /skill slash command to POST here.', { status: 200 });
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
    const raw = await request.text();
    if (env.SLACK_SIGNING_SECRET && !(await verifySlack(request, raw, env.SLACK_SIGNING_SECRET))) {
      return new Response('bad signature', { status: 401 });
    }
    return handle(form(raw), env, ctx);
  },
};
