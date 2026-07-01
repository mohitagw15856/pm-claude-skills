// PM Skills ChatOps — a single Cloudflare Worker serving BOTH a Slack slash
// command (/pmskill) and a Discord slash command (/pmskill). It searches the
// library via the public REST API and replies with the top matching skills.
//
// Requests are verified before anything runs:
//   • Slack   — HMAC-SHA256 over `v0:{timestamp}:{body}` with SLACK_SIGNING_SECRET
//   • Discord — Ed25519 over `{timestamp}{body}` with DISCORD_PUBLIC_KEY
// It FAILS CLOSED: if the relevant secret isn't set, the route refuses (401).
//
// Deploy:  cd integrations/chatops && npx wrangler deploy
// Secrets: npx wrangler secret put SLACK_SIGNING_SECRET
//          npx wrangler secret put DISCORD_PUBLIC_KEY
// Then point Slack's slash command at  https://<worker>/slack
// and Discord's Interactions Endpoint at  https://<worker>/discord

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

const enc = (s) => new TextEncoder().encode(s);
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const hexToBytes = (h) => new Uint8Array((h.match(/.{1,2}/g) || []).map((x) => parseInt(x, 16)));

// Constant-time string compare (avoids leaking via early return).
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

// ---- Shared: search the library via the REST API --------------------------
async function searchSkills(query, limit = 5) {
  const q = (query || '').trim();
  if (!q) return [];
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}`, {
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!r.ok) return [];
  const j = await r.json();
  return (j.skills || []).slice(0, limit);
}

function summarize(s) {
  return (s.summary || (s.description || '').split(/(?<=[.!?])\s/)[0] || '').slice(0, 140);
}

// ---- Slack ----------------------------------------------------------------
async function verifySlack(req, rawBody, secret) {
  const ts = req.headers.get('x-slack-request-timestamp') || '';
  const sig = req.headers.get('x-slack-signature') || '';
  if (!ts || !sig) return false;
  // Reject stale requests (replay protection): 5-minute window.
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
  const key = await crypto.subtle.importKey('raw', enc(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, enc(`v0:${ts}:${rawBody}`));
  return safeEqual(`v0=${hex(mac)}`, sig);
}

async function handleSlack(req, env) {
  const secret = env.SLACK_SIGNING_SECRET;
  if (!secret) return json({ text: 'Bot not configured: SLACK_SIGNING_SECRET is missing.' }, 401);
  const raw = await req.text();
  if (!(await verifySlack(req, raw, secret))) return new Response('bad signature', { status: 401 });

  const params = new URLSearchParams(raw);
  const query = params.get('text') || '';
  const skills = await searchSkills(query);

  if (!skills.length) {
    return json({
      response_type: 'ephemeral',
      text: query
        ? `No skills matched *${query}*. Browse all 400+ at ${SITE}`
        : `Usage: \`/pmskill <what you need>\` — e.g. \`/pmskill launch plan\`. Browse: ${SITE}`,
    });
  }
  const lines = skills
    .map((s) => `• <${SITE}/?skill=${s.name}|*${s.title || s.name}*> — ${summarize(s)}`)
    .join('\n');
  return json({
    response_type: 'ephemeral', // only the requester sees it; change to 'in_channel' to share
    text: `*Skills for “${query}”*\n${lines}\n\n_Open one to run it free in your browser._`,
  });
}

// ---- Discord --------------------------------------------------------------
async function verifyDiscord(req, rawBody, publicKey) {
  const sig = req.headers.get('x-signature-ed25519') || '';
  const ts = req.headers.get('x-signature-timestamp') || '';
  if (!sig || !ts) return false;
  try {
    const key = await crypto.subtle.importKey('raw', hexToBytes(publicKey), { name: 'Ed25519' }, false, ['verify']);
    return await crypto.subtle.verify({ name: 'Ed25519' }, key, hexToBytes(sig), enc(ts + rawBody));
  } catch (_) {
    return false;
  }
}

async function handleDiscord(req, env) {
  const publicKey = env.DISCORD_PUBLIC_KEY;
  if (!publicKey) return new Response('Bot not configured: DISCORD_PUBLIC_KEY is missing.', { status: 401 });
  const raw = await req.text();
  if (!(await verifyDiscord(req, raw, publicKey))) return new Response('bad signature', { status: 401 });

  const body = JSON.parse(raw);
  if (body.type === 1) return json({ type: 1 }); // PING → PONG

  if (body.type === 2) { // APPLICATION_COMMAND
    const opt = (body.data?.options || []).find((o) => o.name === 'query');
    const query = (opt && opt.value) || '';
    const skills = await searchSkills(query);
    let content;
    if (!skills.length) {
      content = query
        ? `No skills matched **${query}**. Browse all 400+ at <${SITE}>`
        : `Usage: \`/pmskill query:<what you need>\`. Browse: <${SITE}>`;
    } else {
      const lines = skills.map((s) => `• **${s.title || s.name}** — ${summarize(s)}\n<${SITE}/?skill=${s.name}>`).join('\n');
      content = `**Skills for “${query}”**\n${lines}`;
    }
    return json({ type: 4, data: { content, flags: 64 } }); // 64 = ephemeral
  }
  return json({ type: 4, data: { content: 'Unsupported interaction.', flags: 64 } });
}

// ---- Router ---------------------------------------------------------------
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'POST' && url.pathname === '/slack') return handleSlack(req, env);
    if (req.method === 'POST' && url.pathname === '/discord') return handleDiscord(req, env);
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(
        `PM Skills ChatOps bot.\nSlack slash command  → POST ${url.origin}/slack\nDiscord interactions → POST ${url.origin}/discord\n\nSource & setup: ${REPO}/tree/main/integrations/chatops\n`,
        { headers: { 'content-type': 'text/plain' } },
      );
    }
    return new Response('Not found', { status: 404 });
  },
};
