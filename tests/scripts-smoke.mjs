#!/usr/bin/env node
// Smoke harness for the executable skills — every skills/*/scripts/*.py helper,
// exercised on every CI run. Three tiers:
//   A: every script answers --help with exit 0 (catches syntax/import breaks)
//   B: functional cases with real fixtures and asserted output — including the
//      regression test for the Van Westendorp plateau bug
//   C: no script hangs on garbage input (any exit code, but it must return)
// Stdlib python3 + node only. Exit 1 on any failure.
import { execFileSync, spawnSync } from 'node:child_process';
import { readdirSync, existsSync, writeFileSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = join(root, '.scripts-smoke-tmp');
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const w = (name, content) => { const p = join(tmp, name); writeFileSync(p, content); return p; };
let pass = 0, fail = 0;
const bad = (msg) => { fail++; console.error('  ✗ ' + msg); };
const ok = () => pass++;

// ── Tier A: --help across every script ────────────────────────────────────────
const scripts = [];
for (const skill of readdirSync(join(root, 'skills'))) {
  const dir = join(root, 'skills', skill, 'scripts');
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) if (f.endsWith('.py')) scripts.push(join(dir, f));
}
console.log(`Tier A — ${scripts.length} scripts answer --help:`);
for (const s of scripts) {
  const r = spawnSync('python3', [s, '--help'], { encoding: 'utf8', timeout: 15000 });
  if (r.status === 0 && /usage:/i.test(r.stdout + r.stderr)) ok();
  else bad(`${basename(s)}: --help exited ${r.status}`);
}

// ── Tier B: functional fixtures ───────────────────────────────────────────────
console.log('Tier B — functional cases:');
const CASES = [
  { name: 'xlsx create (live formula)', script: 'skills/excel-model/scripts/xlsx_tool.py',
    args: ['create', join(tmp, 't.xlsx'), '--data', '{"S":[["a","b","sum"],[2,3,"=A2+B2"]]}'],
    expect: /wrote .*1 sheet/, post: () => existsSync(join(tmp, 't.xlsx')) },
  { name: 'docx create→extract roundtrip', script: 'skills/word-document/scripts/docx_tool.py',
    args: ['create', join(tmp, 't.docx'), '--text-file', w('d.md', '# Title\nBody with **bold**\n- bullet')],
    expect: /wrote/, post: () => {
      const out = execFileSync('python3', [join(root, 'skills/word-document/scripts/docx_tool.py'), 'extract', join(tmp, 't.docx')], { encoding: 'utf8' });
      return out.includes('Title') && out.includes('bullet');
    } },
  { name: 'pptx build (3 slides)', script: 'skills/slide-deck/scripts/pptx_tool.py',
    args: ['build', join(tmp, 't.pptx'), '--outline-file', w('deck.md', '# Deck\nsub\n## One\n- a\n## Two\n- b')],
    expect: /wrote .*slide/ },
  { name: 'cohort fit (params + xlsx)', script: 'skills/cohort-curve-model/scripts/cohort_model.py',
    args: ['fit', join(tmp, 'c.xlsx'), '--observed', '[100,62,48,41,37,34,32]', '--arpu', '40'],
    expect: /a=0\.6\d+ b=0\.3\d+ .*LTV≈3\d\d/ },
  { name: 'runway sim (deterministic seed)', script: 'skills/runway-monte-carlo/scripts/runway_sim.py',
    args: ['run', join(tmp, 'r.xlsx'), '--cash', '2400000', '--burn', '210000', '--revenue', '60000', '--rev-growth', '0.05', '--rev-vol', '0.3'],
    expect: /naive=16\.0mo P10=19 P50=>36/ },   // exact: seed=7 default — any drift is a regression
  { name: 'van westendorp (plateau regression)', script: 'skills/pricing-sensitivity-model/scripts/van_westendorp.py',
    args: ['analyze', join(tmp, 'vw.xlsx'), '--responses', JSON.stringify(
      Array.from({ length: 30 }, (_, i) => { const b = 12 + (i % 10); return { too_cheap: b * 0.4, cheap: b * 0.7, expensive: b * 1.3, too_expensive: b * 1.9 }; })) ],
    expect: /OPP=\d/, post: (out) => {
      // The bug this guards: non-overlapping curves once put OPP on the range floor.
      const m = out.match(/OPP=([\d.]+).*range=([\d.]+)–([\d.]+)/);
      return m && +m[1] > +m[2] && +m[1] < +m[3];
    } },
  { name: 'erlang staffing (M/M/c)', script: 'skills/support-staffing-model/scripts/erlang_staffing.py',
    args: ['plan', join(tmp, 's.xlsx'), '--arrivals', '120', '--aht', '6', '--sla', '0.8', '--answer-in', '60'],
    expect: /base 15 on-queue \/ 22 rostered/ },   // exact Erlang C result — drift = regression
  { name: 'schedule MC (deterministic)', script: 'skills/schedule-monte-carlo/scripts/schedule_sim.py',
    args: ['run', join(tmp, 'sc.xlsx'), '--tasks', w('t.json', JSON.stringify([
      { name: 'design', optimistic: 3, likely: 5, pessimistic: 10, depends: [] },
      { name: 'build', optimistic: 8, likely: 13, pessimistic: 25, depends: ['design'] }]))],
    expect: /deterministic=18\.0 P10=/ },
  { name: 'tornado (+ injection rejected)', script: 'skills/tornado-sensitivity/scripts/tornado.py',
    args: ['run', join(tmp, 'to.xlsx'), '--model', w('m.json', JSON.stringify({ output: 'x', formula: '(a*b)/c',
      drivers: [{ name: 'a', low: 1, base: 2, high: 3 }, { name: 'b', low: 4, base: 5, high: 6 }, { name: 'c', low: 1, base: 2, high: 4 }] }))],
    expect: /top driver: c/, post: () => {
      const r = spawnSync('python3', [join(root, 'skills/tornado-sensitivity/scripts/tornado.py'), 'run', join(tmp, 'e.xlsx'),
        '--model', w('evil.json', JSON.stringify({ formula: '__import__("os")', drivers: [{ name: 'x', low: 1, base: 2, high: 3 }] }))], { encoding: 'utf8', timeout: 15000 });
      return r.status !== 0;   // the evil formula must be rejected
    } },
  { name: 'nps distribution', script: 'skills/csat-nps-analysis/scripts/nps.py',
    args: ['nps', '2', '1', '1', '2', '4', '5', '5', '10', '10', '25', '35'], expect: /NPS|nps/i },
  { name: 'A/B z-test', script: 'skills/experiment-readout/scripts/ab_significance.py',
    args: ['1000', '100', '1000', '130', '--json'], expect: /p_value|significant/i },
  { name: 'RICE ranking', script: 'skills/rice-prioritisation/scripts/rice_calculator.py',
    args: [w('rice.json', JSON.stringify([
      { name: 'A', reach: 5000, impact: 2, confidence: 0.8, effort: 3 },
      { name: 'B', reach: 800, impact: 3, confidence: 0.5, effort: 1 }]))],
    expect: /A|B/ },
  { name: 'exit waterfall (conversion equilibrium — exact pins)', script: 'skills/exit-waterfall/scripts/exit_waterfall.py',
    args: [w('cap.json', JSON.stringify({ classes: [
      { name: 'Founders', shares: 6000000, type: 'common' },
      { name: 'Seed', shares: 1500000, type: 'preferred', invested: 2000000, pref_multiple: 1 },
      { name: 'Series A', shares: 2500000, type: 'preferred', invested: 8000000, pref_multiple: 1 },
      { name: 'Options', shares: 1000000, type: 'options', strike: 0.8 }],
      exits: [10000000, 30000000, 60000000] }))],
    // exact: at $10M prefs consume all (Founders 0); Seed converts alone at $30M; both at $60M
    expect: /10,000,000 {15}0 {7}2,000,000 {7}8,000,000 {15}0 {2}-[\s\S]*30,000,000 {6}16,094,118[\s\S]*Seed\n[\s\S]*60,000,000 {6}33,163,636[\s\S]*Seed,Series A/ },
  { name: 'offer comparison (cliff + crossover)', script: 'skills/offer-comparison/scripts/offer_comparison.py',
    args: [w('offers.json', JSON.stringify([
      { name: 'BigCo', base: 190000, bonus_pct: 15, equity_total: 240000, vest_years: 4, cliff_months: 12, vest_freq: 'monthly', match_pct: 4, match_cap: 0 },
      { name: 'Startup', base: 165000, bonus_pct: 0, equity_total: 400000, vest_years: 4, cliff_months: 12, vest_freq: 'monthly' }]))],
    expect: /286,100 {9}265,000[\s\S]*leader at year 4: BigCo · no crossover/ },   // exact yr-1 totals
  { name: 'refinance breakeven (term-reset warning)', script: 'skills/refinance-breakeven/scripts/refinance_breakeven.py',
    args: ['--balance', '380000', '--rate', '6.9', '--months-left', '336', '--new-rate', '5.6', '--new-term', '360', '--closing', '6500'],
    expect: /2,557\.54 -> 2,181\.50[\s\S]*breakeven: month 18[\s\S]*term reset: 24 extra months/ },
  { name: 'fire number (sensitivity grid)', script: 'skills/fire-number/scripts/fire_number.py',
    args: ['--savings', '120000', '--monthly', '3000', '--spend', '60000'],
    expect: /FIRE number: 1,500,000[\s\S]*years to reach at 5% real return: 19\.5[\s\S]*not modeled: sequence-of-returns risk/ },
];
for (const c of CASES) {
  const r = spawnSync('python3', [join(root, c.script), ...c.args], { encoding: 'utf8', timeout: 30000 });
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) { bad(`${c.name}: exit ${r.status} — ${out.split('\n')[0]}`); continue; }
  if (!c.expect.test(out)) { bad(`${c.name}: output mismatch — got "${out.slice(0, 90)}"`); continue; }
  if (c.post && !c.post(out)) { bad(`${c.name}: post-condition failed`); continue; }
  ok();
}

// ── Tier C: garbage input must return, not hang ───────────────────────────────
console.log('Tier C — no hangs on garbage:');
const garbage = w('garbage.json', '{{{not json');
for (const s of scripts) {
  const r = spawnSync('python3', [s, garbage], { encoding: 'utf8', timeout: 12000, input: '' });
  if (r.error && r.error.code === 'ETIMEDOUT') bad(`${basename(s)}: HUNG on garbage input`);
  else ok();
}

rmSync(tmp, { recursive: true, force: true });
console.log(`\n${pass} passed · ${fail} failed  (${scripts.length} scripts, ${CASES.length} functional cases)`);
process.exit(fail ? 1 : 0);
