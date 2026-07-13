#!/usr/bin/env node
// Validates credentials/registry.json — the public registry of Operator's Exam
// credentials. Mirrors the honesty model of the Season/registry checks: the
// scores are self-reported (AI-graded in the browser), but the ANSWERS are
// public and the transcript hash is recomputed here, so a credential is
// tamper-evident — the attested hash must match the exact answers on record.
//
//   node scripts/check-credentials.mjs
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const exam = JSON.parse(readFileSync(join(root, 'credentials', 'exam-1.json'), 'utf8'));
const reg = JSON.parse(readFileSync(join(root, 'credentials', 'registry.json'), 'utf8'));
const errors = [];

if (reg.spec !== 'pm-skills-credentials/1') errors.push('spec must be "pm-skills-credentials/1"');
if (reg.exam !== exam.exam) errors.push(`registry.exam (${reg.exam}) must match exam.exam (${exam.exam})`);
if (!Array.isArray(reg.holders)) errors.push('holders must be an array');

const HANDLE_RE = /^[a-zA-Z0-9-]{1,39}$/;
const maxById = Object.fromEntries(exam.items.map((it) => [it.id, it.points]));

// Canonical transcript — MUST match canonical() in web/certified.html byte-for-byte.
function canonical(handle, answers) {
  const parts = [exam.exam, exam.version, String(handle || '').toLowerCase()];
  for (const it of exam.items) {
    parts.push(it.id + '\n' + String((answers || {})[it.id] || '').replace(/\r\n/g, '\n').trim());
  }
  return parts.join('\n---\n');
}
const sha256hex = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

const seen = new Set();
for (const [i, h] of (reg.holders || []).entries()) {
  const tag = `holders[${i}] (${h && h.handle || '?'})`;
  if (!h || typeof h !== 'object') { errors.push(`${tag}: not an object`); continue; }
  if (!HANDLE_RE.test(h.handle || '')) errors.push(`${tag}: invalid GitHub handle`);
  if (seen.has((h.handle || '').toLowerCase())) errors.push(`${tag}: duplicate handle`);
  seen.add((h.handle || '').toLowerCase());
  if (h.exam !== exam.exam) errors.push(`${tag}: exam must be "${exam.exam}"`);
  if (typeof h.version !== 'string') errors.push(`${tag}: missing version`);
  if (isNaN(Date.parse(h.date))) errors.push(`${tag}: date is not a valid ISO timestamp`);

  // Scores: every item present, within 0..max, and total === sum.
  let sum = 0;
  for (const it of exam.items) {
    const v = h.scores && h.scores[it.id];
    if (typeof v !== 'number' || v < 0 || v > maxById[it.id]) { errors.push(`${tag}: score for "${it.id}" must be 0..${maxById[it.id]}`); }
    else sum += v;
  }
  if (h.total !== sum) errors.push(`${tag}: total (${h.total}) must equal the sum of item scores (${sum})`);
  const shouldPass = sum >= exam.pass_mark;
  if ((h.verdict === 'PASS') !== shouldPass) errors.push(`${tag}: verdict "${h.verdict}" inconsistent with total ${sum} vs pass mark ${exam.pass_mark}`);
  if (h.verdict !== 'PASS') errors.push(`${tag}: only PASS credentials belong in the registry`);

  // Tamper-evidence: the attested hash must match the answers on record.
  if (!h.answers || typeof h.answers !== 'object') { errors.push(`${tag}: answers object required (so the record is auditable)`); }
  else {
    const recomputed = 'sha256-' + sha256hex(canonical(h.handle, h.answers));
    if (h.transcriptHash !== recomputed) errors.push(`${tag}: transcriptHash does not match the answers (recomputed ${recomputed})`);
  }
}

if (errors.length) {
  console.error(`✗ credentials/registry.json — ${errors.length} problem(s):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ credentials/registry.json OK — ${(reg.holders || []).length} credential(s), all tamper-evident.`);
