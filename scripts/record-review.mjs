#!/usr/bin/env node
// Record an expert review in config/human-review.json, from an "Expert review"
// issue (.github/ISSUE_TEMPLATE/expert-review.yml), after a maintainer has read it
// and any requested edits are merged. The skill page then shows
// "✔ Reviewed by <credential>, <month year>" for review_validity_months.
//
//   node scripts/record-review.mjs --skill lease-decoder --credential "Licensed attorney (California)" \
//       --reviewer "J. Doe" --issue 412 [--date 2026-10-11] [--verified] [--notes "Added a notice-period caveat."]
//
// Never record a review without a real person who actually read the skill: an
// invented review is worse than none.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'config', 'human-review.json');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const has = (n) => process.argv.includes(`--${n}`);
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const clean = (s, max) => String(s || '').replace(/[\r\n<>`]/g, ' ').trim().slice(0, max);

if (has('help') || !arg('skill')) {
  console.log('Usage: node scripts/record-review.mjs --skill <name> --credential "<role and credential>" [--reviewer "<name or initials>"] [--issue <number>] [--date YYYY-MM-DD] [--verified] [--notes "<text>"]');
  process.exit(arg('skill') ? 0 : 1);
}
const skill = arg('skill');
const credential = clean(arg('credential'), 120);
const date = arg('date') || new Date().toISOString().slice(0, 10);
const issue = arg('issue');
if (!NAME.test(skill) || !existsSync(join(root, 'skills', skill, 'SKILL.md'))) { console.error(`No skill named ${skill}.`); process.exit(2); }
if (!credential) { console.error('--credential is required (as it should read on the badge).'); process.exit(2); }
if (!DATE.test(date)) { console.error('--date must be YYYY-MM-DD.'); process.exit(2); }
if (issue && !/^\d+$/.test(issue)) { console.error('--issue must be an issue number.'); process.exit(2); }

const tiers = existsSync(join(root, 'data', 'risk-tiers.json')) ? JSON.parse(readFileSync(join(root, 'data', 'risk-tiers.json'), 'utf8')).tiers || {} : {};
if ((tiers[skill] || {}).tier !== 'high-stakes') console.warn(`Note: ${skill} is not rated high-stakes; recording anyway.`);

const reg = JSON.parse(readFileSync(FILE, 'utf8'));
const entry = {
  skill, credential, date,
  ...(arg('reviewer') ? { reviewer: clean(arg('reviewer'), 80) } : {}),
  verified: has('verified'),
  ...(issue ? { issue: Number(issue) } : {}),
  ...(arg('notes') ? { notes: clean(arg('notes'), 300) } : {}),
};
reg.reviews = (reg.reviews || []).filter((r) => !(r.skill === skill && r.date === date));
reg.reviews.push(entry);
reg.reviews.sort((a, b) => a.skill.localeCompare(b.skill) || a.date.localeCompare(b.date));
writeFileSync(FILE, JSON.stringify(reg, null, 2) + '\n');
console.log(`Recorded: ${skill} reviewed by ${credential} on ${date}${entry.verified ? ' (verified)' : ''}. Rebuild the pages and trust numbers: node scripts/build-skill-pages.mjs && node scripts/build-trust-numbers.mjs`);
