#!/usr/bin/env node
// Example-output gate (decision-layer idea #14). docs/EXAMPLE-OUTPUT-FIELD.md sets the bar
// for the "## Example Output" section: real shape, abridged, honest (figures labelled),
// matching the skill's Output Format. Coverage is 2 of 1,100+; candidates can be generated
// by any model, but only ones that clear the bar should land. This scores candidates.
//   node scripts/example-output-gate.mjs --dir candidates/      # <skill>.md per file
//   node scripts/example-output-gate.mjs --skill lease-decoder --file ex.md
//   node scripts/example-output-gate.mjs --selftest
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ask, score, noul, configured, mockTransport } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const Q = {
  shape: score('Does this example match the shape the skill\'s Output Format section prescribes?', ['a different artifact entirely', 'loosely related; headings or tables differ', 'the same shape with small deviations', 'exactly the prescribed shape, trimmed to the telling part']),
  abridged: noul('Is the example abridged to the telling part (roughly 8–40 lines) rather than a full output or a one-liner?'),
  honest: noul('Are specific figures, names and dates either clearly illustrative (marked as example) or derived from the stated input, with no fabricated authority (laws, prices, statistics) presented as fact?'),
  input: noul('Does the example begin with the abridged input it responds to, so a reader can judge the before/after?'),
};
export function outputFormat(skill) {
  const p = join(ROOT, 'skills', skill, 'SKILL.md'); if (!existsSync(p)) return '';
  return (readFileSync(p, 'utf8').match(/^## Output Format[^\n]*\n([\s\S]*?)(?=^## )/m) || [, ''])[1].trim().slice(0, 3000);
}
export function heuristic(text) {
  const lines = text.split('\n').filter((l) => l.trim()).length;
  return { shape: /^#|^\|/m.test(text) ? 2 : 1, abridged: lines >= 8 && lines <= 40 ? 1 : 0, honest: /\[example\]|illustrative|\(example\)/i.test(text) || !/\$\d|\d{4}/.test(text) ? 1 : 0, input: /\*\*Input/i.test(text) || /^>\s*.*input/im.test(text) ? 1 : 0 };
}
export async function gate(skill, text, { transport, env = process.env, minShape = 2, min = 0.7 } = {}) {
  let a, method;
  if (!transport && !configured(env)) { a = heuristic(text); method = 'heuristic'; }
  else { const r = await ask({ skill, output_format: outputFormat(skill), candidate: text.slice(0, 8000) }, Q, { transport, env }); a = { shape: +r.answers.shape.level, abridged: r.answers.abridged.noul, honest: r.answers.honest.noul, input: r.answers.input.noul }; method = 'jev'; }
  const fails = []; if (a.shape < minShape) fails.push('shape'); for (const k of ['abridged', 'honest', 'input']) if (a[k] < min) fails.push(k);
  return { skill, method, ...a, pass: fails.length === 0, fails };
}
export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const good = '> **Input (abridged):** *"landlord kept $1,200 of $1,500 for cleaning and paint"*\n\n# Deposit Recovery: $1,500 — phase: challenging\n| Claimed | Amount | Type | Response |\n|---|---|---|---|\n| Cleaning | $400 [example] | unsubstantiated | request itemised receipt |\n| Paint | $800 [example] | wear | cite useful life |\n\nNext: send the demand letter within 7 days.\nNot legal advice.\n';
  const h = await gate('security-deposit-recovery', good, { env: {} }); ok(h.pass && h.method === 'heuristic', `heuristic passes the doc's own example (${h.fails})`);
  const bad = await gate('security-deposit-recovery', 'Here is a deposit letter.', { env: {} }); ok(!bad.pass && bad.fails.includes('abridged'), 'heuristic fails a one-liner');
  const t = mockTransport((k) => (k === 'shape' ? 3 : k === 'honest' ? 0.4 : 0.9));
  const j = await gate('security-deposit-recovery', good, { transport: t }); ok(!j.pass && j.fails.join() === 'honest' && j.method === 'jev', 'model path fails only on honesty');
  ok(outputFormat('lease-decoder').length > 30, 'reads Output Format');
  console.log(`example-output-gate self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2); const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : d; };
  if (argv.includes('--selftest')) process.exit(await selftest());
  const items = [];
  if (arg('dir')) for (const f of readdirSync(arg('dir')).filter((f) => f.endsWith('.md'))) items.push({ skill: basename(f, '.md'), file: join(arg('dir'), f) });
  else if (arg('skill') && arg('file')) items.push({ skill: arg('skill'), file: arg('file') });
  if (!items.length) { console.error('usage: --dir <candidates/> | --skill <name> --file <ex.md>'); process.exit(2); }
  let bad = 0;
  for (const it of items) { const r = await gate(it.skill, readFileSync(it.file, 'utf8')); if (!r.pass) bad++; console.log(`${r.pass ? '✓' : '✗'} ${it.skill}  shape=${r.shape} abridged=${r.abridged} honest=${r.honest} input=${r.input}${r.fails.length ? '  fails: ' + r.fails.join(', ') : ''}  (${r.method})`); }
  console.log(`${items.length - bad}/${items.length} clear the bar`);
  process.exit(bad ? 1 : 0);
}
