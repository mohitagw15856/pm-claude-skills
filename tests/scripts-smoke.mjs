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
  { name: 'nps distribution', script: 'skills/csat-nps-analysis/scripts/nps.py',
    args: ['nps', '2', '1', '1', '2', '4', '5', '5', '10', '10', '25', '35'], expect: /NPS|nps/i },
  { name: 'A/B z-test', script: 'skills/experiment-readout/scripts/ab_significance.py',
    args: ['1000', '100', '1000', '130', '--json'], expect: /p_value|significant/i },
  { name: 'RICE ranking', script: 'skills/rice-prioritisation/scripts/rice_calculator.py',
    args: [w('rice.json', JSON.stringify([
      { name: 'A', reach: 5000, impact: 2, confidence: 0.8, effort: 3 },
      { name: 'B', reach: 800, impact: 3, confidence: 0.5, effort: 1 }]))],
    expect: /A|B/ },
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
