#!/usr/bin/env node
// The long-term-support line (data/lts.json, docs/LTS.md): every LTS skill's
// SKILL.md still has the SHA-256 recorded for it. A fix to an LTS skill is
// allowed, but only with a revision in the same change:
//   node scripts/lts-pin.mjs --revise <skill> --note "<what was fixed>"
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const lts = JSON.parse(readFileSync(join(root, 'data', 'lts.json'), 'utf8'));
const index = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills || [];
const byName = new Map(index.map((s) => [s.name, s]));
const evalled = new Set((JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases || []).map((c) => c.skill));
const HEX = /^[0-9a-f]{64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const errors = [];

if (!DATE.test(lts.since) || !DATE.test(lts.until)) errors.push('since and until must be YYYY-MM-DD dates');
const months = (new Date(lts.until) - new Date(lts.since)) / (30.44 * 86400e3);
if (!(months >= 11 && months <= 13)) errors.push(`an LTS line runs about 12 months; ${lts.since} to ${lts.until} is ${months.toFixed(1)}`);
if (!Array.isArray(lts.skills) || lts.skills.length < 1) errors.push('skills must list at least one skill');

const seen = new Set();
for (const s of lts.skills || []) {
  const at = s.name || '(no name)';
  if (seen.has(s.name)) errors.push(`${at}: listed twice`);
  seen.add(s.name);
  const file = join(root, 'skills', s.name || '', 'SKILL.md');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.name || '') || !existsSync(file)) { errors.push(`${at}: no skills/${at}/SKILL.md`); continue; }
  const meta = byName.get(s.name);
  if (meta && meta.tier !== 'production') errors.push(`${at}: only production-tier skills can be LTS (tier is ${meta.tier})`);
  if (!evalled.has(s.name)) errors.push(`${at}: needs an eval case in evals/cases.json`);
  if (meta && meta.deprecated) errors.push(`${at}: deprecated skills leave the LTS line at the next line, not mid-line (see docs/LTS.md)`);
  if (!HEX.test(s.pinned || '') || !HEX.test(s.sha256 || '')) { errors.push(`${at}: pinned and sha256 must be 64 lowercase hex characters`); continue; }
  const revs = Array.isArray(s.revisions) ? s.revisions : null;
  if (!revs) { errors.push(`${at}: revisions must be an array`); continue; }
  for (const [i, r] of revs.entries()) {
    if (!DATE.test(r.date || '') || !HEX.test(r.sha256 || '') || typeof r.note !== 'string' || r.note.trim().length < 10) errors.push(`${at}: revision ${i + 1} needs a date, a sha256 and a note of at least 10 characters`);
  }
  const expected = revs.length ? revs[revs.length - 1].sha256 : s.pinned;
  if (s.sha256 !== expected) errors.push(`${at}: sha256 must equal ${revs.length ? 'the last revision' : 'pinned'} (a changed pin needs a revision note)`);
  const actual = createHash('sha256').update(readFileSync(file)).digest('hex');
  if (actual !== s.sha256) errors.push(`${at}: SKILL.md changed but it is an LTS skill (fixes only). If this is a fix, record it: node scripts/lts-pin.mjs --revise ${at} --note "<what was fixed>"`);
}

if (errors.length) { for (const e of errors) console.error(`✗ lts: ${e}`); process.exit(1); }
console.log(`lts: line ${lts.line}, ${lts.skills.length} skills match their pins until ${lts.until} ✓`);
