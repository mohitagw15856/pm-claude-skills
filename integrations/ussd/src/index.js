// PM Skills over USSD (Cloudflare Worker, Africa's Talking-style callback). Dial
// a short code on any phone, even a basic feature phone with no data: pick a
// topic, pick a situation, and get the skill's first step on screen plus an SMS
// with a link to the full skill. No AI model is called, so it costs nothing to
// run beyond the USSD and SMS fees of your own provider account.
//
// The provider POSTs sessionId, phoneNumber and text (every choice so far,
// joined by *); we reply with "CON ..." to continue or "END ..." to finish.
// Stateless: the path through the menu is in text, and nothing is stored.

import { allow } from '../../shared/caps.js';
import { MENU, TITLE } from './menu.js';

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const SCREEN = 182; // the usual USSD screen limit

const text = (s) => new Response(s, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
const cut = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
// Basic phones show the GSM character set: drop emoji and swap dashes and curly quotes.
const plain = (s) => s.replace(/\s*[\u2014\u2013]\s*/g, ', ').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\uFE0F]/gu, '').replace(/\s{2,}/g, ' ').trim();
const list = (items) => items.map((x, i) => `${i + 1}. ${x}`).join('\n');

// Constant-time comparison, so the secret path cannot be guessed by timing.
function same(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

async function firstStep(name) {
  try {
    const r = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}`);
    if (!r.ok) return '';
    return String((await r.json()).description || '').split(/\s*Use when/i)[0];
  } catch { return ''; }
}

async function sendSms(env, to, message) {
  const host = env.AT_SANDBOX === 'true' ? 'api.sandbox.africastalking.com' : 'api.africastalking.com';
  const body = new URLSearchParams({ username: env.AT_USERNAME, to, message });
  if (env.AT_SENDER_ID) body.set('from', env.AT_SENDER_ID);
  const r = await fetch(`https://${host}/version1/messaging`, {
    method: 'POST',
    headers: { apiKey: env.AT_API_KEY, accept: 'application/json', 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
  return r.ok;
}

// The reply for one step through the menu ("" is the first screen; "2*1" is topic 2, skill 1).
export async function screen(env, input, phone, ctx) {
  const path = input ? input.split('*') : [];
  if (path.at(-1) === '0') return screen(env, path.slice(0, -2).join('*'), phone, ctx); // 0 goes back
  if (!path.length) return `CON ${TITLE}\n${list(MENU.map((t) => t.label))}`;
  const topic = MENU[Number(path[0]) - 1];
  if (!topic) return 'END Sorry, that is not on the menu. Dial again to start over.';
  if (path.length === 1) return `CON ${topic.label}\n${list(topic.skills.map((s) => s[1]))}\n0. Back`;
  const pick = topic.skills[Number(path[1]) - 1];
  if (!pick || path.length > 2) return 'END Sorry, that is not on the menu. Dial again to start over.';
  const [name, label] = pick;
  const link = `${SITE}/index.html?skill=${name}`;
  let sms = '';
  if (env.AT_API_KEY && env.AT_USERNAME && /^\+\d{6,15}$/.test(phone || '') && (await allow(env, phone, 'ussd')).ok) {
    const send = sendSms(env, phone, `PM Skills: ${label}. The full guide, free to use: ${link}`).catch(() => false);
    if (ctx && ctx.waitUntil) ctx.waitUntil(send); else await send;
    sms = '\nWe have sent you the link by SMS.';
  }
  // A long link is no use on a feature phone screen, so it only travels by SMS.
  const tail = sms + '\nNot professional advice.';
  return `END ${label}\n${cut(plain(await firstStep(name)), SCREEN - label.length - tail.length - 2)}${tail}`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ service: 'pm-skills-ussd', hint: 'USSD callback. Setup: integrations/ussd/README.md' }), { headers: { 'content-type': 'application/json' } });
    }
    // The callback URL carries a secret path, so only your provider can drive it (and send SMS on your account).
    const key = url.pathname.replace(/^\/+/, '');
    if (!env.USSD_SECRET || !same(key, env.USSD_SECRET)) return new Response('forbidden', { status: 403 });
    const form = await request.formData().catch(() => null);
    if (!form) return new Response('bad request', { status: 400 });
    return text(await screen(env, String(form.get('text') || ''), String(form.get('phoneNumber') || ''), ctx));
  },
};
