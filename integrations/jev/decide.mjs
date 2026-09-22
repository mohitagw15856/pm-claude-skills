#!/usr/bin/env node
// Run one of the pm-decisions contracts against a state with a calibrated decision model.
//   node integrations/jev/decide.mjs ship-or-slip --state state.json
//   node integrations/jev/decide.mjs hire-or-pass --state '{"role":"…"}' --json
//   node integrations/jev/decide.mjs --list | --selftest
// The contracts live in integrations/jev/decisions/*.json and mirror the skills in
// skills/<id>/SKILL.md. Any model that returns probabilities over defined options
// can serve them; this runner speaks the Jev API.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ask, choice, score, decide, mockTransport } from './client.mjs';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'decisions');
export function listContracts() { return readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(DIR, f), 'utf8'))); }
export function loadContract(id) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error('bad contract id');
  return JSON.parse(readFileSync(join(DIR, `${id}.json`), 'utf8'));
}
export function toQuestion(c) { return c.type === 'score' ? score(c.question, c.criteria) : choice(c.question, c.criteria); }

export function missingFields(contract, state) {
  return Object.keys(contract.state_schema).filter((k) => state?.[k] == null || String(state[k]).trim() === '');
}

export async function runDecision(id, state, { transport, env = process.env } = {}) {
  const c = loadContract(id);
  const missing = missingFields(c, state);
  const { answers, ms, model } = await ask(state, { d: toQuestion(c) }, { transport, env });
  const a = answers.d;
  const d = decide(a, c.thresholds);
  const out = { contract: c.id, type: c.type, pick: d.pick, auto: d.ok, probability: d.probability, confidence: d.confidence, probabilities: a.probabilities, missing, model, ms };
  if (c.type === 'score') { out.score = a.score; out.level = c.criteria[+a.level]; out.move = c.moves?.[String(a.level)] || null; }
  else out.meaning = c.criteria[d.pick];
  if (!d.ok) out.hold = c.on_hold;
  if (missing.length) out.warning = `state is missing: ${missing.join(', ')} — the answer is less reliable`;
  return out;
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const ids = listContracts().map((c) => c.id);
  ok(ids.length === 4 && ids.includes('ship-or-slip'), `4 contracts (${ids.join(', ')})`);
  for (const c of listContracts()) { let good = true; try { toQuestion(c); } catch { good = false; } ok(good, `${c.id} builds a valid question`); ok(c.thresholds && c.on_hold && c.state_schema, `${c.id} has thresholds, on_hold, state_schema`); }
  const t = mockTransport((k, q) => (q.type === 'score' ? 3 : 'slip'));
  const r = await runDecision('ship-or-slip', { release: 'v9 on Friday', open_blockers: '1 sev-1: payments double-charge', test_status: '97%', rollback: 'untested', customer_commitments: 'none', scope_cuttable: 'reports' }, { transport: t });
  ok(r.pick === 'slip' && r.auto && /severity-1/.test(r.meaning), 'ship-or-slip → slip with meaning');
  const r2 = await runDecision('renew-or-churn-call', { account: 'Acme' }, { transport: t });
  ok(r2.level && r2.move && r2.missing.length === 5 && /missing/.test(r2.warning), 'score contract returns level, move, and warns on missing state');
  console.log(`jev decide self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) process.exit(await selftest());
  if (argv.includes('--list')) { for (const c of listContracts()) console.log(`${c.id.padEnd(22)} ${c.type.padEnd(7)} ${c.question}`); process.exit(0); }
  const id = argv.find((a) => !a.startsWith('--'));
  const si = argv.indexOf('--state');
  if (!id || si === -1) { console.error('usage: node integrations/jev/decide.mjs <contract> --state <file.json|json> [--json]'); process.exit(2); }
  const raw = argv[si + 1];
  const state = raw.trim().startsWith('{') ? JSON.parse(raw) : JSON.parse(readFileSync(raw, 'utf8'));
  const r = await runDecision(id, state);
  if (argv.includes('--json')) console.log(JSON.stringify(r, null, 2));
  else {
    console.log(`${r.contract}: ${r.pick}${r.level ? ` (${r.level})` : ''} · p ${r.probability.toFixed(2)} · confidence ${r.confidence.toFixed(2)} · ${r.auto ? 'act' : 'hold'} · ${r.ms} ms`);
    if (r.meaning) console.log(`  ${r.meaning}`); if (r.move) console.log(`  next move: ${r.move}`);
    if (r.hold) console.log(`  hold: ${r.hold}`); if (r.warning) console.log(`  ! ${r.warning}`);
  }
}
