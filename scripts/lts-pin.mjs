#!/usr/bin/env node
// Maintain data/lts.json, the long-term-support line (docs/LTS.md).
//
//   node scripts/lts-pin.mjs --revise <skill> --note "Fix a typo in the risk table"
//       after a fix to an LTS skill's SKILL.md: records the new SHA-256 as a
//       revision with its note. tests/checks/lts.mjs fails until this is done.
//   node scripts/lts-pin.mjs --add <skill>
//       adds a skill to the current line, pinned at today's SKILL.md.
//   node scripts/lts-pin.mjs --status
//       lists each LTS skill and whether its SKILL.md still matches its pin.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'data', 'lts.json');
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const lts = JSON.parse(readFileSync(FILE, 'utf8'));
const hashOf = (name) => createHash('sha256').update(readFileSync(join(root, 'skills', name, 'SKILL.md'))).digest('hex');
const today = new Date().toISOString().slice(0, 10);
const save = () => writeFileSync(FILE, JSON.stringify(lts, null, 2) + '\n');
const need = (name) => {
  if (!NAME_RE.test(name || '') || !existsSync(join(root, 'skills', name, 'SKILL.md'))) { console.error(`✗ no skill called "${name}"`); process.exit(2); }
  return name;
};

if (opt('--revise') !== undefined) {
  const name = need(opt('--revise'));
  const note = (opt('--note') || '').trim();
  if (note.length < 10) { console.error('✗ --note must say what the fix was (at least 10 characters)'); process.exit(2); }
  const s = lts.skills.find((x) => x.name === name);
  if (!s) { console.error(`✗ ${name} is not in the LTS line`); process.exit(2); }
  const h = hashOf(name);
  if (h === s.sha256) { console.log(`${name} already matches its pin; nothing to record.`); process.exit(0); }
  s.revisions.push({ date: today, sha256: h, note });
  s.sha256 = h;
  save();
  console.log(`Recorded revision ${s.revisions.length} of ${name}.`);
} else if (opt('--add') !== undefined) {
  const name = need(opt('--add'));
  if (lts.skills.some((x) => x.name === name)) { console.log(`${name} is already LTS.`); process.exit(0); }
  const h = hashOf(name);
  lts.skills.push({ name, pinned: h, sha256: h, revisions: [] });
  lts.skills.sort((a, b) => a.name.localeCompare(b.name));
  save();
  console.log(`Added ${name} to LTS line ${lts.line}.`);
} else if (args.includes('--status')) {
  for (const s of lts.skills) console.log(`${hashOf(s.name) === s.sha256 ? '✓' : '✗'} ${s.name}  r${s.revisions.length}`);
} else {
  console.error('Usage: lts-pin.mjs --revise <skill> --note "<what was fixed>" | --add <skill> | --status');
  process.exit(2);
}
