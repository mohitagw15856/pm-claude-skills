#!/usr/bin/env node
// Eval-coverage ratchet.
//
// The library's most attackable number: 1,154 skills, 28 with published judge
// scores, 246 with curated eval cases. The count of *scored* skills costs
// tokens to move; the count of skills with a *case* costs only authorship —
// and it is the precondition for every future scoring run. So this ratchets
// the free half: coverage can only go up, and a new skill must arrive with a
// case.
//
// Two rules:
//   1. RATCHET — the number of skills with at least one case in
//      evals/cases.json must never drop below evals/coverage-baseline.json.
//      Rising coverage updates the baseline in place (the baseline is a
//      committed file, so check-generated-style drift is visible in review).
//   2. NEW SKILLS — with --base <ref>, any skills/*/SKILL.md ADDED relative to
//      that ref must have a case. Old skills are grandfathered; the debt is
//      frozen, not inherited by new work.
//
//   node scripts/check-eval-coverage.mjs                 # report + update baseline if higher
//   node scripts/check-eval-coverage.mjs --check         # exit 1 on ratchet violation
//   node scripts/check-eval-coverage.mjs --check --base origin/main
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (f) => process.argv.includes(f);
const arg = (f) => { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : ''; };
const baselineFile = join(root, 'evals', 'coverage-baseline.json');

const cases = JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases;
const covered = new Set(cases.map((c) => c.skill));
const skills = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md')));
// Cases can outlive a merged/renamed skill; count only ones that still resolve.
const live = new Set(skills);
const coveredLive = [...covered].filter((n) => live.has(n));

const baseline = existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')) : { skillsWithCases: 0 };
const problems = [];

// ── Rule 1: the ratchet ──────────────────────────────────────────────────────
if (coveredLive.length < baseline.skillsWithCases) {
  problems.push(`coverage dropped: ${coveredLive.length} skills with cases, baseline is ${baseline.skillsWithCases}. Removing a case requires lowering the baseline on purpose, in the same commit, with a reason.`);
}

// ── Rule 2: new skills ship a case ───────────────────────────────────────────
const base = arg('--base');
if (base) {
  let added = [];
  try {
    added = execFileSync('git', ['diff', '--diff-filter=A', '--name-only', `${base}...HEAD`, '--', 'skills/*/SKILL.md'],
      { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean)
      .map((p) => p.split('/')[1]);
  } catch (e) {
    console.error(`(could not diff against ${base}: ${e.message} — skipping the new-skill rule)`);
  }
  const missing = added.filter((n) => !covered.has(n));
  if (missing.length) {
    problems.push(`new skill(s) without an eval case: ${missing.join(', ')}. Add one entry each to evals/cases.json — a realistic input a user would actually give the skill.`);
  }
}

const pct = ((100 * coveredLive.length) / skills.length).toFixed(1);
console.log(`Eval coverage — ${coveredLive.length}/${skills.length} skills have a curated case (${pct}%) · baseline ${baseline.skillsWithCases}`);

if (problems.length) {
  for (const p of problems) console.error('  ✗ ' + p);
  if (has('--check')) process.exit(1);
} else if (coveredLive.length > baseline.skillsWithCases) {
  if (has('--check')) {
    console.error(`  ✗ coverage rose to ${coveredLive.length} but the baseline still says ${baseline.skillsWithCases} — run: node scripts/check-eval-coverage.mjs (no flags) and commit the baseline.`);
    process.exit(1);
  }
  writeFileSync(baselineFile, JSON.stringify({
    _comment: 'Eval-coverage ratchet floor — the number of skills with at least one case in evals/cases.json. CI fails if coverage falls below this. Updated by scripts/check-eval-coverage.mjs; never lower it by hand without a reason in the commit.',
    skillsWithCases: coveredLive.length,
  }, null, 2) + '\n');
  console.log(`Baseline ratcheted up: ${baseline.skillsWithCases} → ${coveredLive.length}.`);
} else {
  console.log('Within ratchet. ✓');
}
