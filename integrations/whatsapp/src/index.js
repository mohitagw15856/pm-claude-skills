// PM Skills — WhatsApp bot (Cloudflare Worker + Twilio WhatsApp webhook).
// The Telegram bot's twin for the world's biggest messenger. Twilio POSTs
// form-encoded webhooks; replies go back as TwiML in the response, so the
// worker needs NO Twilio credentials — only the webhook URL configured.
//
// Commands mirror integrations/telegram: "find <task>", "skill <name>",
// "run <name or task> <input>" (run only if ANTHROPIC_API_KEY is set), and
// plain text auto-routes. Stateless; nothing stored.
//
// Forward it: a photo or PDF of a document is read with the matching skill
// (integrations/shared/forward-doc.js). That takes longer than Twilio's 15-second
// webhook window, so the bot answers "Reading it…" at once and sends the result
// through Twilio's API: it needs TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.
// With TWILIO_AUTH_TOKEN set, every webhook's X-Twilio-Signature is verified, so
// nobody else can make the bot spend your Anthropic key.

import { documentBlock, readDocument, PRIVACY_NOTE } from '../../shared/forward-doc.js';
import { validTwilioSignature } from '../../shared/twilio-signature.js';

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const LIMIT = 3600; // WhatsApp caps at 4096 chars; leave headroom

const search = async (q, limit = 5) => {
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}&limit=${limit}`);
  return r.ok ? (await r.json()).skills || [] : [];
};
const getSkill = async (name) => {
  const r = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}`);
  return r.ok ? r.json() : null;
};
async function runSkill(instructions, userText, key) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-5', max_tokens: 1500,
      system: instructions + '\n\nYou are replying in WhatsApp. Produce the deliverable directly, plain text, compact. If required inputs are missing, ask briefly.',
      messages: [{ role: 'user', content: userText.slice(0, 20000) }],
    }),
  });
  if (!r.ok) throw new Error('model ' + r.status);
  const j = await r.json();
  return (j.content || []).map((c) => c.text).join('').trim();
}

const HELP = `PM Skills bot: over a thousand professional skills.
find <task> - search the library
skill <name> - full instructions
run <name or task> - draft it here
📄 Send a photo or PDF of a document (a lease, a bill, a contract) to have it read with the right skill. Add a caption to say what you want.
Library: ${REPO}`;

// Outbound WhatsApp messages through Twilio's API (1,600 characters each).
async function sendWhatsApp(env, from, to, text) {
  const auth = 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
  const parts = [];
  for (let i = 0; i < text.length && parts.length < 4; i += 1500) parts.push(text.slice(i, i + 1500));
  for (const body of parts) {
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: { authorization: auth, 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ From: from, To: to, Body: body }),
    });
  }
}

async function readAndReply(env, form) {
  const from = form.get('To'), to = form.get('From');
  try {
    // Twilio media URLs need the account's credentials.
    const auth = 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
    const res = await fetch(form.get('MediaUrl0'), { headers: { authorization: auth } });
    const block = res.ok ? documentBlock(await res.arrayBuffer(), form.get('MediaContentType0') || res.headers.get('content-type')) : null;
    if (!block) return sendWhatsApp(env, from, to, 'I can read photos (JPEG, PNG, WebP) and PDFs up to 8 MB.');
    const { skill, text } = await readDocument({ block, note: (form.get('Body') || '').trim(), key: env.ANTHROPIC_API_KEY, channel: 'WhatsApp' });
    return sendWhatsApp(env, from, to, (skill ? `(${skill})\n\n` : '') + (text || 'The model returned nothing. Try a clearer photo.'));
  } catch {
    return sendWhatsApp(env, from, to, 'Reading that failed. Try again in a minute.');
  }
}

async function reply(text) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cut = text.length > LIMIT ? text.slice(0, LIMIT) + `\n\n…truncated — full text: ${REPO}` : text;
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${esc(cut)}</Message></Response>`,
    { headers: { 'content-type': 'text/xml' } });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ bot: 'pm-skills-whatsapp', hint: 'Twilio WhatsApp webhook endpoint — see integrations/whatsapp/README.md', library: REPO }), { headers: { 'content-type': 'application/json' } });
    }
    const form = await request.formData().catch(() => null);
    if (form && env.TWILIO_AUTH_TOKEN && !(await validTwilioSignature(request, form, env.TWILIO_AUTH_TOKEN))) {
      return new Response('forbidden', { status: 403 });
    }
    const text = ((form && form.get('Body')) || '').trim();
    const canRun = !!env.ANTHROPIC_API_KEY;
    if (form && Number(form.get('NumMedia') || 0) > 0) {
      if (!canRun || !env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN) return reply('Reading documents is not enabled on this deployment.');
      ctx.waitUntil(readAndReply(env, form));
      return reply(`Reading it… ${PRIVACY_NOTE}`);
    }
    if (!text) return reply(HELP);
    const [, cmd, rest = ''] = text.match(/^(find|skill|run|help|start)\b\s*([\s\S]*)$/i) || [null, null, text];
    const c = (cmd || '').toLowerCase();

    if (c === 'help' || c === 'start') return reply(HELP);
    if (c === 'skill') {
      const s = await getSkill(rest.trim().split(/\s+/)[0]);
      return reply(s ? `${s.title}\n\n${s.instructions}` : `No skill by that name. Try: find ${rest}`);
    }
    if (c === 'find' || (!c && !canRun)) {
      const q = (c ? rest : text).trim();
      const hits = await search(q);
      return reply(hits.length ? hits.map((s) => `• ${s.name} — ${s.description}`).join('\n\n') + '\n\nGet one: skill <name>' : `No matches for "${q}".`);
    }
    // run (explicit or plain text with a key configured)
    const input = (c === 'run' ? rest : text).trim();
    if (!input) return reply('Give me the task: run executive-update churn up 2pts, shipped referral');
    const maybeName = input.split(/\s+/)[0];
    let s = /^[a-z0-9-]+$/.test(maybeName) ? await getSkill(maybeName) : null;
    const userText = s ? input.slice(maybeName.length).trim() || input : input;
    if (!s) {
      const hits = await search(input, 1);
      if (!hits.length) return reply('Could not match a skill. Try: find <keywords>');
      s = await getSkill(hits[0].name);
    }
    if (!canRun) return reply(`Best match: ${s.name}. Running is not enabled on this deployment — get the instructions with: skill ${s.name}`);
    try { return reply(await runSkill(s.instructions, userText, env.ANTHROPIC_API_KEY) || 'The model returned nothing — try rephrasing.'); }
    catch { return reply('The model call failed — try again in a minute.'); }
  },
};
