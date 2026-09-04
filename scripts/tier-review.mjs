#!/usr/bin/env node
// Tier promotion review — makes the ladder's middle rung climbable.
//
// The library has run 50 Production-Ready skills against 1,090+ Stable ones
// since the tier system shipped, and no skill has ever been promoted: there
// was a ladder but no stairs. This defines the bar mechanically, reports who
// clears it, and applies a promotion round on request.
//
// The bar for Production-Ready (all four, checkable without spending tokens):
//   1. A curated eval case in evals/cases.json — the precondition for scoring.
//   2. Depth beyond the SKILL.md — a references/ folder or a helper script.
//   3. Zero SkillCheck warnings.
//   4. Not deprecated and not Experimental (external-dependency skills stay
//      Experimental regardless of quality — that tier is about moving parts,
//      not maturity).
//
// Deliberately NOT in the bar: a judge score. Only 28 skills have one and
// scoring costs tokens; gating promotion on it would freeze the ladder again.
// When scores exist, a low one should *block* promotion — that check is here.
//
//   node scripts/tier-review.mjs              # report the eligible cohort
//   node scripts/tier-review.mjs --apply      # promote them in skill-tiers.json
//   node scripts/tier-review.mjs --json
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (f) => process.argv.includes(f);

const tiersFile = join(root, 'skill-tiers.json');
const tiers = JSON.parse(readFileSync(tiersFile, 'utf8'));
const prod = new Set(tiers.productionReady);
const exp = new Set(tiers.experimental);

const cases = new Set(JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases.map((c) => c.skill));

// Low judge scores block promotion where they exist.
let scores = {};
try {
  const r = JSON.parse(readFileSync(join(root, 'evals', 'results.json'), 'utf8'));
  for (const [k, v] of Object.entries(r.skills || r)) {
    if (v && typeof v.score === 'number') scores[k] = v.score;
  }
} catch { /* no results yet */ }

// SkillCheck warnings, per skill, via the real validator.
let warnings = new Set();
const out = execFileSync(process.execPath, [join(root, 'scripts', 'skillcheck.mjs'), '--json'], { cwd: root, encoding: 'utf8' });
const j = JSON.parse(out.slice(out.indexOf('{')));
const entries = j.results || j.skills || [];
if (!entries.length) throw new Error('skillcheck --json returned no per-skill results — refusing to treat that as "no warnings"');
for (const s of entries) {
  if ((s.warnings || []).length) warnings.add(s.name);
}

const skills = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md')));

const rows = [];
for (const n of skills) {
  if (prod.has(n) || exp.has(n)) continue;
  const fm = readFileSync(join(root, 'skills', n, 'SKILL.md'), 'utf8').split('---')[1] || '';
  if (/^deprecated:/m.test(fm)) continue;
  const evidence = {
    evalCase: cases.has(n),
    depth: existsSync(join(root, 'skills', n, 'references')) || existsSync(join(root, 'skills', n, 'scripts')),
    cleanCheck: !warnings.has(n),
    scoreOk: !(n in scores) || scores[n] >= 4,
  };
  if (Object.values(evidence).every(Boolean)) rows.push({ name: n, score: scores[n] ?? null, evidence });
}
rows.sort((a, b) => a.name.localeCompare(b.name));

if (has('--json')) {
  console.log(JSON.stringify({ currentProduction: prod.size, eligible: rows }, null, 2));
} else {
  console.log(`Tier review — ${prod.size} Production-Ready today · ${rows.length} Stable skill(s) clear the bar\n`);
  for (const r of rows) {
    console.log(`  ✓ ${r.name}${r.score !== null ? `  (judge score ${r.score}/5)` : ''}`);
  }
  console.log('\nBar: eval case + references/ or scripts/ + zero warnings + no blocking score.');
}

if (has('--apply') && rows.length) {
  tiers.productionReady = [...prod, ...rows.map((r) => r.name)].sort();
  writeFileSync(tiersFile, JSON.stringify(tiers, null, 2) + '\n');
  console.log(`\nApplied: productionReady ${prod.size} → ${tiers.productionReady.length}. Update TIERS.md prose and regenerate (npm run check).`);
}
