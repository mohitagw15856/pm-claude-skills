// Crisis + intent routing for a public bot (docs/PUBLIC-BOT-RUNBOOK.md, safety rule 2).
// One call per inbound message, BEFORE any skill runs:
//   danger  (noul)   — self-harm or immediate physical danger → crisis-line reply, stop
//   lane    (choice) — hotline | human | skill | menu
// Conservative by design: a danger probability ≥ 0.3 is treated as yes (better a
// false positive). Without a key it uses a keyword list, labelled `method: keyword`.
import { fileURLToPath } from 'node:url';
import { ask, noul, choice, configured, mockTransport } from './client.mjs';

export const LINES = {
  US: '988 (call or text) — Suicide & Crisis Lifeline · emergencies 911',
  UK: 'Samaritans 116 123 · emergencies 999',
  IN: 'Tele-MANAS 14416 / 1-800-891-4416 · emergencies 112',
  default: 'findahelpline.com — local crisis lines by country · local emergency number',
};
const DANGER_WORDS = /\b(kill myself|suicid|end my life|self[- ]harm|hurt myself|want to die|overdose|can't go on|cannot go on|can not go on|he's going to hurt|she's going to hurt|threatened to kill|being attacked|not safe right now)\b/i;

export const QUESTIONS = {
  danger: noul('Does this message suggest the sender or someone with them is at risk of self-harm or in immediate physical danger? Treat ambiguity as yes.', { true: 'signs of self-harm, suicidal intent, abuse in progress, or an emergency happening now', false: 'stress, sadness, money or legal trouble, or a routine request — hard but not an emergency' }),
  lane: choice('How should a public help-bot handle this message?', {
    hotline: 'the person needs a crisis line or emergency services first — nothing else until then',
    human: 'a real person should answer: legal threat, medical decision, complaint about the bot, or the request is unclear and high-stakes',
    skill: 'a structured self-help skill (decoder, checklist, script, planner) answers it well',
    menu: 'a greeting, thanks, or something off-topic — show the menu',
  }),
};

export async function routeInbound(message, { country = 'default', transport, env = process.env, dangerThreshold = 0.3 } = {}) {
  const text = String(message || '').slice(0, 2000);
  if (!transport && !configured(env)) {
    const danger = DANGER_WORDS.test(text);
    return { method: 'keyword', danger, dangerP: danger ? 1 : 0, lane: danger ? 'hotline' : 'skill', reply: danger ? crisisReply(country) : null };
  }
  const { answers, ms } = await ask(text, QUESTIONS, { transport, env });
  const dangerP = answers.danger.noul;
  const danger = dangerP >= dangerThreshold;
  const lane = danger ? 'hotline' : answers.lane.choice;
  return { method: 'jev', danger, dangerP, lane, laneP: answers.lane.probabilities?.[answers.lane.choice], confidence: answers.lane.confidence, reply: danger ? crisisReply(country) : null, ms };
}

export function crisisReply(country = 'default') {
  const line = LINES[country] || LINES.default;
  return `If you might be in danger or thinking about harming yourself, please reach out right now: ${line}. I'm a self-help bot and can't help in an emergency — a person can. When you're safe, I'm here.`;
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const t = mockTransport((key, q, state) => (key === 'danger' ? (/die/.test(state) ? 0.45 : 0.02) : (/deposit/.test(state) ? 'skill' : 'menu')));
  const a = await routeInbound('i just want to die, the landlord took everything', { transport: t, country: 'US' });
  ok(a.danger && a.lane === 'hotline' && /988/.test(a.reply), 'p=0.45 → hotline (conservative threshold)');
  const b = await routeInbound('my landlord kept my deposit', { transport: t });
  ok(!b.danger && b.lane === 'skill' && b.reply === null, 'routine ask → skill lane');
  const c = await routeInbound('I cannot go on like this', { env: {} });
  ok(c.method === 'keyword' && c.danger, 'keyword fallback catches a phrasing');
  const d = await routeInbound('hello', { env: {} });
  ok(d.method === 'keyword' && !d.danger, 'keyword fallback passes a greeting');
  ok(/findahelpline/.test(crisisReply('ZZ')), 'unknown country → global directory');
  console.log(`jev crisis self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv.includes('--selftest') && process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(await selftest());
