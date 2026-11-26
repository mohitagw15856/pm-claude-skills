#!/usr/bin/env node
// The quarterly Skill Hack schedule (data/skill-hack.json, docs/skill-hack.md):
// quarters in order, one after another without overlap, each with a theme and a
// brief, and any winner well formed. SKILL-CUP.md freshness is checked by
// close-skill-cup.mjs --check, which renders this schedule.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { hacks } = JSON.parse(readFileSync(join(root, 'data', 'skill-hack.json'), 'utf8'));
const DATE = /^\d{4}-\d{2}-\d{2}$/;
assert.ok(Array.isArray(hacks) && hacks.length, 'hacks must be a non-empty list');
hacks.forEach((h, i) => {
  const at = `hacks[${i}] (${h.quarter})`;
  assert.match(h.quarter || '', /^\d{4}-Q[1-4]$/, `${at}: quarter must look like 2027-Q1`);
  assert.ok(DATE.test(h.opens || '') && DATE.test(h.closes || '') && h.opens <= h.closes, `${at}: bad dates`);
  const [y, q] = h.quarter.split('-Q').map(Number);
  const qStart = `${y}-${String((q - 1) * 3 + 1).padStart(2, '0')}-01`, qEnd = `${y}-${String(q * 3).padStart(2, '0')}-31`;
  assert.ok(h.opens >= qStart && h.closes <= qEnd, `${at}: dates must fall inside the quarter`);
  assert.ok(typeof h.theme === 'string' && h.theme.length >= 3 && h.theme.length <= 60, `${at}: theme of 3 to 60 characters`);
  assert.ok(typeof h.brief === 'string' && h.brief.length >= 40 && h.brief.length <= 400, `${at}: brief of 40 to 400 characters`);
  assert.ok(!/\u2014/.test(h.theme + h.brief), `${at}: no em dashes`);
  if (i) assert.ok(hacks[i - 1].closes < h.opens, `${at}: must open after ${hacks[i - 1].quarter} closes`);
  const w = h.winner;
  if (w != null && w !== 'none') {
    assert.ok(Number.isInteger(w.pr) && typeof w.score === 'number' && w.score >= 1 && w.score <= 5, `${at}: winner needs pr and a 1-5 score`);
    assert.ok(Array.isArray(w.authors) && w.authors.length >= 1 && w.authors.length <= 3 && w.authors.every((a) => /^[A-Za-z0-9-]{1,39}$/.test(a)), `${at}: winner authors are 1 to 3 GitHub logins`);
    assert.ok(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(w.pack || '') && Array.isArray(w.skills) && w.skills.length >= 2 && w.skills.length <= 4, `${at}: winner pack name and 2 to 4 skills`);
  }
});
console.log(`skill-hack: ${hacks.length} quarters scheduled, ${hacks[0].quarter} to ${hacks[hacks.length - 1].quarter} ✓`);
