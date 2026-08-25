#!/usr/bin/env node
// Generates conformance/badge.json — the shields.io endpoint behind the
// SkillSpec badge.
//
// It was hand-written and said "L3 · 750 skills" while the library held 1153.
// A conformance badge that misreports the corpus it certifies is worse than no
// badge, and it is exactly the class of hand-typed count that check-drift.mjs
// exists to catch — so this generates it and the drift guard watches it.
//
//   node scripts/build-conformance-badge.mjs           # write
//   node scripts/build-conformance-badge.mjs --check   # exit 1 if stale
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'conformance', 'badge.json');
const check = process.argv.includes('--check');

const skillsDir = join(root, 'skills');
const count = readdirSync(skillsDir).filter((n) => {
  try { return statSync(join(skillsDir, n)).isDirectory() && existsSync(join(skillsDir, n, 'SKILL.md')); }
  catch { return false; }
}).length;

// The level the library itself is gated at, from the workflow that enforces it,
// so the badge cannot claim a level CI is not actually holding.
const wf = readFileSync(join(root, '.github', 'workflows', 'skillcheck.yml'), 'utf8');
const level = (wf.match(/--min-level\s+(\d+)/) || [, '3'])[1];

const badge = {
  schemaVersion: 1,
  label: 'SkillSpec',
  message: `L${level} · ${count} skills`,
  color: 'brightgreen',
};
const text = JSON.stringify(badge) + '\n';

if (check) {
  const current = existsSync(out) ? readFileSync(out, 'utf8') : '';
  if (current !== text) {
    console.error(`conformance/badge.json is stale — run: node scripts/build-conformance-badge.mjs`);
    console.error(`  expected: ${text.trim()}`);
    console.error(`  found:    ${current.trim() || '(missing)'}`);
    process.exit(1);
  }
  console.log(`Conformance badge up to date — L${level} · ${count} skills. ✓`);
} else {
  writeFileSync(out, text);
  console.log(`Wrote conformance/badge.json — L${level} · ${count} skills.`);
}
