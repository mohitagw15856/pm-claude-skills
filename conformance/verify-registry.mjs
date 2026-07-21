#!/usr/bin/env node
// Validates conformance/registry.json — the SkillSpec Conformance Registry.
// Structural gate for PRs that add a repo: required fields, sane level (1-3),
// well-formed URL, ISO date, no duplicate repos. It does NOT clone external repos
// (that's a maintainer's one-line `skillspec-check` per REGISTRY.md) — it keeps the
// registry file itself honest and machine-checkable. No dependencies.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const reg = JSON.parse(readFileSync(join(here, 'registry.json'), 'utf8'));
const errs = [];

if (reg.spec !== 'skillspec-registry/1') errs.push(`spec must be "skillspec-registry/1" (got ${JSON.stringify(reg.spec)})`);
if (!Array.isArray(reg.repos)) errs.push('repos must be an array');

const seen = new Set();
for (const [i, r] of (reg.repos || []).entries()) {
  const at = `repos[${i}]${r && r.name ? ` (${r.name})` : ''}`;
  if (!r || typeof r !== 'object') { errs.push(`${at}: not an object`); continue; }
  if (!r.name || typeof r.name !== 'string') errs.push(`${at}: missing string "name"`);
  if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(r.url || '')) errs.push(`${at}: "url" must be a https://github.com/<owner>/<repo> URL`);
  if (!Number.isInteger(r.skills) || r.skills < 1) errs.push(`${at}: "skills" must be a positive integer`);
  if (![1, 2, 3].includes(r.level)) errs.push(`${at}: "level" must be 1, 2, or 3`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.verifiedAt || '')) errs.push(`${at}: "verifiedAt" must be YYYY-MM-DD`);
  const key = (r.url || '').toLowerCase().replace(/\/$/, '');
  if (seen.has(key)) errs.push(`${at}: duplicate repo ${key}`);
  seen.add(key);
}

if (errs.length) {
  console.error('✗ registry.json invalid:');
  for (const e of errs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ registry.json valid — ${reg.repos.length} conformant repo${reg.repos.length === 1 ? '' : 's'} listed`);
