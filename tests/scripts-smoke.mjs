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
  { name: 'rent vs buy (breakeven year)', script: 'skills/rent-vs-buy/scripts/rent_vs_buy.py',
    args: ['--price', '450000', '--rent', '2200'],
    expect: /mortgage: 2,275\.44\/mo[\s\S]*12 {5}307,391 {7}303,507 {6}3,884[\s\S]*breakeven: year 12/ },
  { name: 'car tco (ranked scenarios)', script: 'skills/car-tco/scripts/car_tco.py',
    args: ['--new-price', '38000', '--used-price', '24000', '--lease-month', '420', '--keep-value', '9000'],
    expect: /keep_current {6}45,487[\s\S]*buy_used {10}51,485[\s\S]*buy_new {11}56,882[\s\S]*lease_forever {5}75,540[\s\S]*cheapest on these assumptions: keep_current/ },
  { name: 'freelance rate (utilization math)', script: 'skills/freelance-rate/scripts/freelance_rate.py',
    args: ['--target', '90000'],
    expect: /required revenue: 109,200[\s\S]*billable hours: {3}1,104[\s\S]*hourly: 99 {3}day rate: 791[\s\S]*honest rate is 2\.2x/ },
  { name: 'raise vs jump (crossover)', script: 'skills/raise-vs-jump/scripts/raise_vs_jump.py',
    args: ['--salary', '120000'],
    expect: /10 {7}161,270 {7}209,641 {5}1,416,935 {5}1,627,538[\s\S]*cumulative crossover: year 3[\s\S]*salary gap at year 10: \+48,371/ },
  { name: 'debt payoff (avalanche vs snowball)', script: 'skills/debt-payoff/scripts/debt_payoff.py',
    args: ['--debt', 'visa:9000:24.9:180', '--debt', 'loan:3000:6:60', '--extra', '200'],
    expect: /avalanche[\s\S]*debt-free in 39 months \(3\.2 yrs\) · interest paid: 3,903\.03[\s\S]*snowball[\s\S]*46 months \(3\.8 yrs\) · interest paid: 5,929\.00[\s\S]*avalanche saves 2,025\.97/ },
  { name: 'emergency fund (risk adders)', script: 'skills/emergency-fund/scripts/emergency_fund.py',
    args: ['--essentials', '3400', '--saved', '4000', '--monthly-save', '500', '--single-income', '--variable-income'],
    expect: /target: 6 months of essentials = 20,400[\s\S]*single income \(\+1\), variable income \(\+2\)[\s\S]*1\.2 months covered · gap: 16,400[\s\S]*full in 32\.8 months/ },
  { name: 'ev vs gas (crossover year)', script: 'skills/ev-vs-gas/scripts/ev_vs_gas.py',
    args: ['--ev-price', '42000', '--gas-price', '33000', '--incentive', '7500'],
    expect: /gap \+1,500[\s\S]*EV saves 767[\s\S]*1 {10}35,695 {11}35,212 {8}-483[\s\S]*2 {10}36,891 {11}37,425 {9}534[\s\S]*crossover: year 2/ },
  { name: 'daycare vs stay-home (net + trajectory)', script: 'skills/daycare-vs-stay-home/scripts/daycare_vs_stay_home.py',
    args: ['--income', '62000', '--daycare', '1600'],
    expect: /= 26,160 net\/year \(13\.08\/hr effective\)[\s\S]*forgoes 329,166 gross[\s\S]*~64,687 vs 71,875 never-left/ },
  { name: 'wedding budget (allocation + guest lever)', script: 'skills/wedding-budget/scripts/wedding_budget.py',
    args: ['--budget', '30000', '--guests', '110'],
    expect: /venue_and_catering\s+42\.0%\s+12,600[\s\S]*contingency\s+9\.0%\s+2,700[\s\S]*per guest: 114\.55 — cutting 10 guests frees ~1,145/ },
  { name: 'student loan strategy (three paths)', script: 'skills/student-loan-strategy/scripts/student_loan_strategy.py',
    args: ['--loan', 'grad:38000:6.8:410', '--loan', 'undergrad:12000:4.5:130', '--extra', '400'],
    expect: /weighted APR 6\.25%[\s\S]*attack \(avalanche\): {2}debt-free in 68 mo \(5\.7 yr\) · interest 8,438\.12[\s\S]*minimums \+ invest: {3}debt-free in 132 mo · interest 18,796\.34 · portfolio ~74,529/ },
  { name: 'solar breakeven (year table)', script: 'skills/solar-breakeven/scripts/solar_breakeven.py',
    args: ['--cost', '22000', '--incentive', '6600', '--bill', '190'],
    expect: /net cost after incentives: 15,400[\s\S]*1 {4}1,938 {9}1,938 {4}-13,462[\s\S]*breakeven: year 8/ },
  { name: 'subscription audit (annualized ranking)', script: 'skills/subscription-audit/scripts/subscription_audit.py',
    args: ['--sub', 'streaming-a:15.99:monthly', '--sub', 'cloud:2.99:monthly', '--sub', 'vpn:71.88:yearly', '--sub', 'gym:45:monthly'],
    expect: /gym\s+monthly\s+45\.00\s+540\.00[\s\S]*4 subscriptions = 839\.64\/year · 69\.97\/month · 2\.30\/day[\s\S]*top 3 are 95\.7%/ },
  { name: 'college cost (all-in + loan tail)', script: 'skills/college-cost/scripts/college_cost.py',
    args: ['--sticker', '32000', '--aid', '14000'],
    expect: /net 4-year cost: 79,887 {2}\(39,943 cash \+ 39,943 borrowed\)[\s\S]*453\.55\/mo for 10 years = 54,426 repaid \(14,483 interest\)[\s\S]*true all-in \(cash \+ repayments\): 94,369/ },
  { name: 'context crush (json schema+stats)', script: 'skills/context-crusher/scripts/context_crush.py',
    args: ['--mode', 'json', '--file', w('crush-pin.json', JSON.stringify(Array.from({ length: 30 }, (_, i) => ({ i }))))],
    expect: /\[context-crush json: ~\d+ -> ~\d+ tokens, \d+% smaller[\s\S]*"__crushed__":"array of 30 items","schema":\{"i":"int"\}[\s\S]*"mean":14\.5/ },
  { name: 'repo map (symbols + token math)', script: 'skills/repo-map/scripts/repo_map.py',
    args: ['skills/context-crusher'],
    expect: /this map ≈ \d+ tokens[\s\S]*context_crush\.py\s+\d+L\s+→ toks, summarize_array, crush_json, crush_log, crush_text, main[\s\S]*the map is the index, not the territory/ },
  { name: 'token cost (heuristics + price math)', script: 'skills/token-cost/scripts/token_cost.py',
    args: ['--file', w('cost-pin.txt', 'aaaa '.repeat(100)), '--price-in', '3', '--calls', '10'],
    expect: /~129 tokens {2}\(chars\/4: 125 · words\*4\/3: 133 — heuristics, ±15%\)[\s\S]*\$0\.000387\/call · \$0\.0039 across 10 calls at \$3\/M/ },
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
