#!/usr/bin/env node
// Report eval coverage per bundle: which bundles are fully scored, partially scored, or
// not evaluated at all. This is the "select what to evaluate" step for the
// "Evaluate selected bundles" Action — run it (free, no API calls) to see the unevaluated
// bundles, then dispatch the eval workflow with the ones you want to add to the leaderboard.
//
// Sources:
//   web/skills.json   — skill → bundle map (run `node web/build-skills.mjs` first)
//   evals/results.json (or results.example.json) — which skills already have a score
//   evals/eval-exclude.mjs — skills that aren't eval-applicable (don't count against a bundle)
//
// Usage:
//   node scripts/eval-status.mjs                 # human-readable table
//   node scripts/eval-status.mjs --json          # machine-readable JSON
//   node scripts/eval-status.mjs --markdown      # GitHub step-summary markdown
//   node scripts/eval-status.mjs --unevaluated   # print just the comma-list of bundles
//                                                # with any unscored skill (paste into the Action)
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVAL_EXCLUDE } from '../evals/eval-exclude.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (n) => process.argv.includes(`--${n}`);

const skillsPath = join(root, 'web', 'skills.json');
if (!existsSync(skillsPath)) {
  console.error('web/skills.json not found — run `node web/build-skills.mjs` first.');
  process.exit(1);
}
const sdata = JSON.parse(readFileSync(skillsPath, 'utf8'));
const skills = (Array.isArray(sdata) ? sdata : (sdata.skills || []))
  .filter((s) => !EVAL_EXCLUDE.has(s.name));

// Which skills already have at least one score?
const real = join(root, 'evals', 'results.json');
const example = join(root, 'evals', 'results.example.json');
const resPath = existsSync(real) ? real : (existsSync(example) ? example : null);
const scored = new Set();
if (resPath) {
  const r = JSON.parse(readFileSync(resPath, 'utf8'));
  for (const x of (r.results || [])) scored.add(x.skill);
}

// Aggregate per bundle.
const bundles = new Map();
for (const s of skills) {
  const b = bundles.get(s.plugin) || { bundle: s.plugin, total: 0, scored: 0, unscored: [] };
  b.total++;
  if (scored.has(s.name)) b.scored++;
  else b.unscored.push(s.name);
  bundles.set(s.plugin, b);
}
const rows = [...bundles.values()].sort((a, b) => a.bundle.localeCompare(b.bundle));
const status = (b) => b.scored === 0 ? 'unevaluated' : b.scored < b.total ? 'partial' : 'complete';
const unevaluatedBundles = rows.filter((b) => b.scored < b.total).map((b) => b.bundle);

if (has('unevaluated')) {
  // Bare comma-list of bundles with anything left to score — paste straight into the Action.
  process.stdout.write(unevaluatedBundles.join(',') + (unevaluatedBundles.length ? '\n' : ''));
  process.exit(0);
}

if (has('json')) {
  console.log(JSON.stringify({
    bundles: rows.map((b) => ({ ...b, status: status(b) })),
    unevaluatedBundles,
    totals: {
      bundles: rows.length,
      skills: skills.length,
      scored: skills.length - rows.reduce((a, b) => a + b.unscored.length, 0),
    },
  }, null, 2));
  process.exit(0);
}

if (has('markdown')) {
  const icon = { complete: '✅', partial: '🟡', unevaluated: '⬜' };
  let out = '## Eval coverage by bundle\n\n';
  out += '| Bundle | Status | Scored / Total | Unscored skills |\n|---|---|---|---|\n';
  for (const b of rows) {
    const st = status(b);
    out += `| \`${b.bundle}\` | ${icon[st]} ${st} | ${b.scored}/${b.total} | ${b.unscored.slice(0, 8).join(', ')}${b.unscored.length > 8 ? `, +${b.unscored.length - 8} more` : ''} |\n`;
  }
  out += `\n**Bundles with skills left to evaluate (${unevaluatedBundles.length}):**\n\n`;
  out += unevaluatedBundles.length ? '```\n' + unevaluatedBundles.join(',') + '\n```\n' : '_None — every bundle is fully scored._\n';
  out += '\nCopy the list above into the **Evaluate selected bundles** workflow’s `bundles` input (or use `unevaluated` to do them all).\n';
  console.log(out);
  process.exit(0);
}

// Default: human-readable table.
const pad = (s, n) => String(s).padEnd(n);
console.log(`Eval coverage — ${skills.length} eval-applicable skills across ${rows.length} bundles\n`);
console.log(pad('BUNDLE', 22) + pad('STATUS', 14) + 'SCORED');
console.log('-'.repeat(48));
for (const b of rows) {
  console.log(pad(b.bundle, 22) + pad(status(b), 14) + `${b.scored}/${b.total}`);
}
console.log('\nBundles with skills left to evaluate:');
console.log(unevaluatedBundles.length ? '  ' + unevaluatedBundles.join(', ') : '  (none — all bundles fully scored)');
console.log('\nTo add some to the leaderboard: dispatch the "Evaluate selected bundles" Action with those bundle names.');
