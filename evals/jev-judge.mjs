#!/usr/bin/env node
// A typed judge for the four eval dimensions (decision-layer idea #11).
// The LLM judge in run-evals.mjs writes a 1–5 score per dimension; this asks a
// calibrated decision model the same four questions as Score(5 levels) and returns
// the identical shape ({ scores, overall }) plus a confidence per dimension — cheaper,
// reproducible, and a cross-family check on the LLM judge's numbers.
//   node evals/jev-judge.mjs --skill prd-template --output out.md [--input "case text"] [--json]
//   node evals/jev-judge.mjs --selftest
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ask, score, configured, mockTransport } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const L = (a, b, c, d, e) => [a, b, c, d, e];
export const RUBRIC = {
  structure: score('How well does the output follow the structure the skill\'s Output Format section prescribes?', L('no recognisable structure', 'a few of the prescribed sections, out of order or renamed', 'most sections present, some missing or merged', 'all prescribed sections present, minor deviations', 'exactly the prescribed structure, every section in place')),
  completeness: score('Does the output cover everything the task and the skill require?', L('most of the task is unaddressed', 'major parts missing or replaced by placeholders', 'covers the core, misses secondary requirements', 'covers nearly everything, one small gap', 'complete — every requirement and every required section addressed')),
  usefulness: score('Would a senior professional find this specific and actionable rather than generic?', L('generic filler; could apply to any input', 'mostly generic with a few specifics', 'useful but padded or hedged', 'specific, actionable, little padding', 'exactly what an expert would hand over — specific, decisive, no filler')),
  grounding: score('Is the output grounded in the given input, without invented facts, numbers or names?', L('largely invented; contradicts the input', 'several invented specifics', 'mostly grounded; one or two unsupported claims', 'grounded; assumptions labelled', 'fully grounded; every figure traceable to the input or explicitly marked as an example')),
};

export function skillContract(name) {
  const p = join(ROOT, 'skills', name, 'SKILL.md'); if (!existsSync(p)) throw new Error(`no skill ${name}`);
  const md = readFileSync(p, 'utf8');
  const sec = (h) => (md.match(new RegExp(`^## (?:${h})[^\\n]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm')) || [, ''])[1].trim().slice(0, 3000);
  return { output_format: sec('Output Format|Template Structure|Output Template|Output|Deliverable'), quality_checks: sec('Quality Checks'), anti_patterns: sec('Anti-Patterns') };
}

export async function judge({ skill, input = '', output }, { transport, env = process.env } = {}) {
  if (!transport && !configured(env)) return { method: 'off', note: 'JEV_API_KEY not set' };
  const state = { skill, contract: skillContract(skill), input: String(input).slice(0, 4000), output: String(output).slice(0, 16000) };
  const { answers, ms, model } = await ask(state, RUBRIC, { transport, env });
  const scores = {}, confidence = {};
  for (const d of Object.keys(RUBRIC)) { scores[d] = +answers[d].level + 1; confidence[d] = +answers[d].confidence.toFixed(2); }
  const overall = +(Object.values(scores).reduce((a, b) => a + b, 0) / 4).toFixed(2);
  return { method: 'jev', judge: model || 'jev', skill, scores, overall, confidence, ms };
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const c = skillContract('prd-template'); ok(c.output_format.length > 50 && c.quality_checks.length > 20, 'reads the skill contract');
  const t = mockTransport((k) => ({ structure: 4, completeness: 3, usefulness: 4, grounding: 2 })[k]);
  const r = await judge({ skill: 'prd-template', input: 'referral feature', output: '# PRD\n…' }, { transport: t });
  ok(r.scores.structure === 5 && r.scores.grounding === 3 && r.overall === 4.25, `scores are 1–5 (${JSON.stringify(r.scores)}) overall ${r.overall}`);
  ok(Object.keys(r.confidence).length === 4, 'confidence per dimension');
  ok((await judge({ skill: 'prd-template', output: 'x' }, { env: {} })).method === 'off', 'no key → off');
  console.log(`jev-judge self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2); const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : d; };
  if (argv.includes('--selftest')) process.exit(await selftest());
  const skill = arg('skill'), out = arg('output');
  if (!skill || !out) { console.error('usage: node evals/jev-judge.mjs --skill <name> --output <file> [--input "…"] [--json]'); process.exit(2); }
  const r = await judge({ skill, input: arg('input', ''), output: readFileSync(out, 'utf8') });
  if (argv.includes('--json') || r.method === 'off') console.log(JSON.stringify(r, null, 2));
  else console.log(`${skill}: overall ${r.overall} · ${Object.entries(r.scores).map(([d, s]) => `${d} ${s} (c${r.confidence[d]})`).join(' · ')} · ${r.ms} ms`);
}
