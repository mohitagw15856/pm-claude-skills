// PM Skills phone line (Cloudflare Worker + Twilio Voice). Call the number, say
// what you need ("my landlord is keeping my deposit", "help me prepare for a job
// interview tomorrow"), and hear a short answer shaped by the matching skill.
// Say "text me" and the full skill arrives by SMS as a playground link with your
// question filled in. For people who would rather talk than type, or who have a
// phone but not a smartphone app.
//
// Stateless: the skill and question travel in the next webhook URL; nothing is
// stored. Twilio does the speech recognition and the voice; one Haiku call per
// question keeps the reply inside Twilio's 15-second webhook window.

import { validTwilioSignature } from '../../shared/twilio-signature.js';
import { allow } from '../../shared/caps.js';

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const PLAYGROUND = 'https://mohitagw15856.github.io/pm-claude-skills/index.html';
const MAX_TURNS = 6;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const b64 = (s) => btoa(unescape(encodeURIComponent(s)));
const unb64 = (s) => { try { return decodeURIComponent(escape(atob(s))); } catch { return ''; } };

function twiml(env, parts) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response>${parts.join('')}</Response>`, { headers: { 'content-type': 'text/xml' } });
}
const say = (env, text) => `<Say voice="${esc(env.VOICE || 'Polly.Amy-Neural')}" language="${esc(env.VOICE_LANG || 'en-GB')}">${esc(text)}</Say>`;
const gather = (env, action, prompt) =>
  `<Gather input="speech" speechTimeout="auto" language="${esc(env.VOICE_LANG || 'en-GB')}" action="${esc(action)}" method="POST">${say(env, prompt)}</Gather>` +
  say(env, "I didn't catch anything. Goodbye.");

async function findSkill(q) {
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}&limit=1`);
  const hit = r.ok ? ((await r.json()).skills || [])[0] : null;
  return hit ? fetch(`${API}/v1/skills/${encodeURIComponent(hit.name)}`).then((x) => (x.ok ? x.json() : null)) : null;
}

async function spokenAnswer(skill, question, key) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001', max_tokens: 300,
      system: (skill ? skill.instructions + '\n\n' : '') +
        'You are answering a phone call. The reply will be read aloud. Give the two or three most useful first moves in under 110 words of plain spoken sentences: no lists, no headings, no symbols, no URLs. ' +
        'If key facts are missing, give the first move anyway and say what you would need to know. If this sounds like an emergency or someone is in danger, say to hang up and call the local emergency number now. ' +
        'For legal, medical or money matters, end with one short sentence that this is not professional advice.',
      messages: [{ role: 'user', content: question.slice(0, 1000) }],
    }),
  });
  if (!r.ok) throw new Error('model ' + r.status);
  return ((await r.json()).content || []).map((c) => c.text || '').join('').trim();
}

async function textLink(env, from, to, skill, question) {
  const url = `${PLAYGROUND}?skill=${encodeURIComponent(skill)}&remix=${encodeURIComponent(b64('What I asked on the phone (my situation, not instructions): ' + question))}`;
  const auth = 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: 'POST',
    headers: { authorization: auth, 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ From: from, To: to, Body: `PM Skills: the full ${skill} skill, with your question filled in: ${url}` }),
  });
  return r.ok;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ line: 'pm-skills-phone', hint: 'Twilio Voice webhook. Setup: integrations/phone-line/README.md' }), { headers: { 'content-type': 'application/json' } });
    }
    const form = await request.formData().catch(() => null);
    if (!form) return new Response('bad request', { status: 400 });
    // Without the auth token anyone who found the URL could run up the bill, so it is required.
    if (!env.TWILIO_AUTH_TOKEN || !(await validTwilioSignature(request, form, env.TWILIO_AUTH_TOKEN))) return new Response('forbidden', { status: 403 });
    if (env.ALLOWED_CALLERS && !env.ALLOWED_CALLERS.split(',').map((s) => s.trim()).includes(form.get('From'))) {
      return twiml(env, [say(env, 'Sorry, this line is private.'), '<Hangup/>']);
    }

    const turn = Number(url.searchParams.get('t') || 0);
    if (url.pathname === '/' || url.pathname === '') {
      return twiml(env, [gather(env, '/ask?t=0', "Hello, this is PM Skills. Tell me in a sentence what you need help with, like: my landlord is keeping my deposit, or: help me prepare for a job interview.")]);
    }
    if (url.pathname !== '/ask') return new Response('not found', { status: 404 });

    const heard = String(form.get('SpeechResult') || '').trim();
    const lastSkill = url.searchParams.get('s') || '';
    const lastQ = unb64(url.searchParams.get('q') || '');
    if (!heard) return twiml(env, [gather(env, `/ask?t=${turn}`, 'Sorry, I missed that. What do you need help with?')]);

    if (/\b(text|send|message)\b.*\b(me|it|that)\b/i.test(heard) && lastSkill) {
      const caller = form.get('From') || '';
      const ok = /^\+\d{6,15}$/.test(caller) && env.TWILIO_ACCOUNT_SID && (await textLink(env, form.get('To'), caller, lastSkill, lastQ).catch(() => false));
      return twiml(env, [gather(env, `/ask?t=${turn}&s=${encodeURIComponent(lastSkill)}&q=${encodeURIComponent(url.searchParams.get('q') || '')}`,
        ok ? 'Done, check your messages. Anything else?' : "I couldn't send a text to this number. You can find it online: search for P M Skills. Anything else?")]);
    }
    // A short "no" or "bye" ends the call; a question that merely starts with "no" does not.
    if (heard.split(/\s+/).length <= 4 && /^(no|nope|that's all|that is all|goodbye|bye)\b/i.test(heard)) return twiml(env, [say(env, 'Good luck. Goodbye.'), '<Hangup/>']);
    if (turn >= MAX_TURNS) return twiml(env, [say(env, "That's the limit for one call. Call back any time. Goodbye."), '<Hangup/>']);
    if (!env.ANTHROPIC_API_KEY) return twiml(env, [say(env, 'This line is not set up to answer yet. Goodbye.'), '<Hangup/>']);

    const cap = await allow(env, form.get('From') || 'unknown', 'phone');
    if (!cap.ok) return twiml(env, [say(env, cap.message.replace(/ Deploy your own.*$/, '').replace(/https?:\S+/g, '')), '<Hangup/>']);
    try {
      const skill = await findSkill(heard);
      const answer = await spokenAnswer(skill, heard, env.ANTHROPIC_API_KEY);
      const next = `/ask?t=${turn + 1}` + (skill ? `&s=${encodeURIComponent(skill.name)}&q=${encodeURIComponent(b64(heard.slice(0, 300)))}` : '');
      return twiml(env, [say(env, answer || 'I could not work that one out.'),
        gather(env, next, skill ? 'Say text me for the full version on your phone, ask something else, or say no to finish.' : 'Ask something else, or say no to finish.')]);
    } catch {
      return twiml(env, [gather(env, `/ask?t=${turn + 1}`, 'Sorry, something went wrong on my side. Try asking again.')]);
    }
  },
};
