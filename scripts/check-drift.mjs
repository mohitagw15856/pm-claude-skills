#!/usr/bin/env node
// Drift guard — the lesson of PRs #146/#147/#148 made permanent: hardcoded
// counts and lists rot silently. This check derives the canonical numbers from
// the repo itself and fails if any living document still carries a stale one.
//
// Two rules:
//   1. Load-bearing manifests must state the CURRENT skill count.
//   2. No living doc may contain a known-stale "<N> skills"-style claim.
//
// Historical records (CHANGELOG, newsletters, generated skill pages, exports)
// are exempt — history is allowed to say what was true at the time.
//
//   node scripts/check-drift.mjs        exits 1 with a list of offenders
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

// ── Canonical numbers, derived ────────────────────────────────────────────────
const skillCount = readdirSync(join(root, 'skills')).filter((n) => {
  try { return statSync(join(root, 'skills', n)).isDirectory() && existsSync(join(root, 'skills', n, 'SKILL.md')); }
  catch { return false; }
}).length;
const bundleCount = JSON.parse(read('.claude-plugin/marketplace.json')).plugins.length;

const problems = [];

// ── Rule 1: manifests must carry the current count ───────────────────────────
for (const f of ['package.json', 'server.json']) {
  const desc = JSON.parse(read(f)).description || '';
  if (!desc.includes(`${skillCount} professional`)) {
    problems.push(`${f}: description says "${desc.slice(0, 60)}…" — expected "${skillCount} professional …"`);
  }
}

// ── Rule 2: no stale count claims in living docs ─────────────────────────────
// Any "<number> skills"-ish claim in these files must use the current number
// (small tolerance for subset claims like "50 production skills").
const LIVING = [
  'README.md', 'CHEATSHEET.md', 'PERSONAS.md', 'CONTRIBUTING.md', 'docs/SHOWCASE.md',
  'docs/FOUNDATION.md', 'docs/print/README.md', 'training/README.md', 'training/MODEL_CARD.md',
  ...readdirSync(join(root, 'web')).filter((n) => n.endsWith('.html')).map((n) => `web/${n}`),
];
// Legitimate non-total numbers that may precede the word "skills":
// 50 = production tier · 45 = pm-engineering · 28 = eval-scored (update when a
// new eval run lands) · small numbers = bundle sizes in prose.
// 17 = the pm-live keyless live-data family · 100 = the pm-cowork bundle
const ALLOWED = new Set([skillCount, bundleCount, 100, 50, 45, 28, 17, 12, 30, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
// Several claim shapes; each regex's first capture group is the number.
const CLAIMS = [
  /\b(\d{2,4})\s+(?:(?:professional|open-source|curated|AI)\s+){0,2}(?:Agent\s+)?skills?\b/gi,
  /\b(\d{2,4})-skill\b/gi,                       // "a 466-skill library"
  /\*\*(\d{2,4})\*\*,? (?:across|skills)/gi,     // "| **466**, across …"
  /<b>(\d{2,4})<\/b>\s*skills/gi,                // cheatsheet pill
  /\ball (\d{2,4}) interactively\b/gi,           // "pick from all 466 interactively"
  /\bskills-(\d{2,4})-[a-z]+\b/gi,               // static shields badge "skills-466-blue"
];

for (const f of LIVING) {
  if (!existsSync(join(root, f))) continue;
  const text = read(f);
  for (const m of CLAIMS.flatMap((re) => [...text.matchAll(re)])) {
    const n = +m[1];
    if (ALLOWED.has(n)) continue;
    // allow forward-looking milestones ("push to 600 skills")
    const near = text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 10);
    if (/push to|→|->/.test(near) && n > skillCount) continue;
    // allow history: release-note clauses ("Earlier — v46 … 466 skills") and
    // published-article titles (their names can't be edited retroactively)
    const wide = text.slice(Math.max(0, m.index - 2500), m.index + m[0].length + 200);
    if (/Earlier — v\d|\*v4\d, |medium\.com/.test(wide)) continue;
    const line = text.slice(0, m.index).split('\n').length;
    problems.push(`${f}:${line}: "${m[0].trim()}" — current count is ${skillCount}`);
  }
}

if (problems.length) {
  console.error(`Drift check failed (${problems.length} stale claim(s); canonical: ${skillCount} skills, ${bundleCount} bundles):\n`);
  for (const p of problems) console.error('  ✗ ' + p);
  console.error('\nFix the text or, if a new legitimate subset number, add it to ALLOWED in scripts/check-drift.mjs.');
  process.exit(1);
}
console.log(`Drift check clean — ${skillCount} skills / ${bundleCount} bundles consistent across manifests and living docs.`);
