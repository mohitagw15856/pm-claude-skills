#!/usr/bin/env node
// Journey step gate (decision-layer idea #5). Session mode (journeys/SESSION-MODE.md)
// advances a pack one step at a time. This scores a step's output against what the
// NEXT step needs carried forward, so the session can advance itself instead of asking.
//   node scripts/journey-gate.mjs just-laid-off 0 --output step0.md   # proceed | hold
//   node scripts/journey-gate.mjs --selftest
// Two typed questions per gate: completeness (score, 3 levels) and carry-forward
// present (noul). No key → structural heuristic, labelled.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ask, score, noul, configured, mockTransport } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export function loadJourney(id, dir = join(ROOT, 'journeys')) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error('bad journey id');
  const p = join(dir, `${id}.json`); if (!existsSync(p)) throw new Error(`no journey ${id}`);
  return JSON.parse(readFileSync(p, 'utf8'));
}

export function questionsFor(step) {
  const carry = (step.carry || []).join('; ') || 'nothing specific';
  return {
    complete: score(`Rate how complete this output is as the result of the "${step.skill}" step. The step exists because: ${step.why}`, [
      'empty or a refusal — nothing usable was produced',
      'partial — some structure, but key parts are missing, placeholders remain, or it asks the user for inputs it should have used',
      'complete — a finished artifact in the shape the skill promises, with the boundary or caveat lines present',
    ]),
    carry: noul(`Does the output contain the information the next step needs carried forward: ${carry}?`, { true: 'each item is stated concretely (a value, a date, a decision), not just mentioned', false: 'one or more items are absent, vague, or left as a question' }),
  };
}

export function heuristic(output, step) {
  const text = String(output || '');
  const lines = text.split('\n').filter((l) => l.trim()).length;
  const placeholders = /\[(?:TODO|TBD|insert|your [^\]]+)\]|\bTODO\b|\bTBD\b|lorem ipsum/i.test(text);
  const complete = !text.trim() ? 0 : (lines < 8 || placeholders) ? 1 : 2;
  const carryTerms = (step.carry || []).map((c) => c.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3)[0]).filter(Boolean);
  const carry = carryTerms.length ? carryTerms.filter((w) => text.toLowerCase().includes(w)).length / carryTerms.length : 1;
  return { method: 'heuristic', complete, carry };
}

export async function gateStep(journey, index, output, { transport, env = process.env, minComplete = 2, minCarry = 0.7 } = {}) {
  const step = journey.steps[index];
  if (!step) throw new Error(`no step ${index}`);
  const next = journey.steps[index + 1];
  let complete, carry, method, ms;
  if (!transport && !configured(env)) ({ method, complete, carry } = heuristic(output, step));
  else {
    const r = await ask({ step: step.skill, output: String(output).slice(0, 12000) }, questionsFor(step), { transport, env });
    complete = +r.answers.complete.level; carry = r.answers.carry.noul; method = 'jev'; ms = r.ms;
  }
  const proceed = complete >= minComplete && carry >= minCarry;
  return { journey: journey.id, step: step.skill, next: next?.skill || null, method, complete, carry: +carry.toFixed(2), proceed, ms,
    reason: proceed ? 'complete and the carry-forward is present' : complete < minComplete ? 'output is not complete enough to build on' : `carry-forward missing: ${(step.carry || []).join(', ')}` };
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const j = loadJourney('just-laid-off');
  ok(j.steps.length > 2, 'journey loads');
  const good = '# Severance decoded\n\n| Clause | Risk |\n|---|---|\n| Release | high |\n| Non-compete | medium |\n\nSeverance terms: 8 weeks pay.\nSign-by date: 14 Oct.\nRelease clauses: general release, non-compete 12 months.\nNot legal advice — confirm locally.\nNext: unemployment claim.\n';
  const t = mockTransport((k) => (k === 'complete' ? 2 : 0.9));
  const a = await gateStep(j, 0, good, { transport: t });
  ok(a.proceed && a.next, `jev gate proceeds to ${a.next}`);
  const h = await gateStep(j, 0, good, { env: {} });
  ok(h.method === 'heuristic' && h.proceed, 'heuristic proceeds on a full artifact with carry terms');
  const bad = await gateStep(j, 0, 'TODO fill this in', { env: {} });
  ok(!bad.proceed && /complete/.test(bad.reason), 'heuristic holds on a stub');
  const t2 = mockTransport((k) => (k === 'complete' ? 2 : 0.2));
  const c = await gateStep(j, 0, good, { transport: t2 });
  ok(!c.proceed && /carry-forward/.test(c.reason), 'holds when carry is missing');
  console.log(`journey-gate self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) process.exit(await selftest());
  const [id, idx] = argv.filter((a) => !a.startsWith('--'));
  const oi = argv.indexOf('--output');
  if (!id || idx === undefined || oi === -1) { console.error('usage: node scripts/journey-gate.mjs <journey> <stepIndex> --output <file>'); process.exit(2); }
  const r = await gateStep(loadJourney(id), +idx, readFileSync(argv[oi + 1], 'utf8'));
  console.log(JSON.stringify(r, null, 2));
  process.exit(r.proceed ? 0 : 3);
}
