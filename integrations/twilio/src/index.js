// Text a skill (moonshot: off-web reach). A Cloudflare Worker that receives an
// SMS or WhatsApp message via Twilio, runs the right skill on it, and texts the
// result back — no app, no browser.
//
//   Text:  "board minutes from these notes: …"   → drafted minutes back
//   Or force a skill:  "prd-template: a referral program for B2B users"
//
// Verifies Twilio's signature (HMAC-SHA1 over the URL + sorted params with your
// Auth Token) and FAILS CLOSED if a secret is missing.
//
// Deploy:  cd integrations/twilio && npx wrangler deploy
// Secrets: npx wrangler secret put ANTHROPIC_API_KEY
//          npx wrangler secret put TWILIO_AUTH_TOKEN
// Then point your Twilio number's "A message comes in" webhook at  https://<worker>/sms

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const SMS_LIMIT = 1400; // keep the reply to a few segments; link to the full run

const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const xmlEscape = (s) => String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

// Twilio signs: base64( HMAC-SHA1( authToken, fullUrl + concat(sortedKey+value) ) ).
async function verifyTwilio(url, params, header, token) {
  if (!header) return false;
  let data = url;
  for (const k of [...params.keys()].sort()) data += k + params.get(k);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(token), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return b64(mac) === header;
}

async function searchSkill(q) {
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}`, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!r.ok) return null;
  const j = await r.json();
  return (j.skills && j.skills[0]) || null;
}

async function skillBody(name) {
  const r = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}?format=md`, { cf: { cacheTtl: 300, cacheEverything: true } });
  return r.ok ? await r.text() : null;
}

async function runSkill(name, userText, key) {
  const md = await skillBody(name);
  if (!md) return null;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: md + '\n\nYou are replying over SMS — be concise and skip preamble. If required inputs are missing, ask for them in one short line.',
      messages: [{ role: 'user', content: userText }],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const j = await res.json();
  return (j.content || []).map((c) => c.text || '').join('').trim();
}

function twiml(msg) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(msg)}</Message></Response>`, {
    headers: { 'content-type': 'text/xml' },
  });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname !== '/sms' || req.method !== 'POST') return new Response('PM Skills — text a skill. Point your Twilio webhook at POST /sms.', { status: url.pathname === '/' ? 200 : 404 });
    if (!env.ANTHROPIC_API_KEY || !env.TWILIO_AUTH_TOKEN) return twiml('This bot is not configured yet.');

    const raw = await req.text();
    const params = new URLSearchParams(raw);
    if (!(await verifyTwilio(req.url, params, req.headers.get('x-twilio-signature'), env.TWILIO_AUTH_TOKEN))) {
      return new Response('bad signature', { status: 403 });
    }

    const bodyText = (params.get('Body') || '').trim();
    if (!bodyText) return twiml('Text me a task — e.g. "board minutes from these notes: …" — and I\'ll draft it. Or force a skill with "prd-template: …".');

    // Explicit "skill-name: rest" wins; otherwise search for the best-fit skill.
    let name, input = bodyText;
    const m = bodyText.match(/^([a-z0-9][a-z0-9-]{2,40}):\s*([\s\S]+)$/i);
    if (m) { name = m[1].toLowerCase(); input = m[2]; }
    else { const s = await searchSkill(bodyText); name = s && s.name; }
    if (!name) return twiml(`Couldn't match a skill. Try naming one, e.g. "meeting-notes: …". Browse: ${SITE}`);

    try {
      const out = await runSkill(name, input, env.ANTHROPIC_API_KEY);
      if (!out) return twiml(`Unknown skill "${name}". Browse: ${SITE}`);
      const link = `${SITE}/?skill=${encodeURIComponent(name)}`;
      if (out.length <= SMS_LIMIT) return twiml(`${out}\n\n— via ${name} · full: ${link}`);
      return twiml(`${out.slice(0, SMS_LIMIT)}…\n\n[trimmed] Full version: ${link}`);
    } catch (e) {
      return twiml(`Sorry — that failed (${e.message}). Try again, or run it at ${SITE}/?skill=${encodeURIComponent(name)}`);
    }
  },
};
