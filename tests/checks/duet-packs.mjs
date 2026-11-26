#!/usr/bin/env node
// Starter packs for proactive agents (data/duet-packs.json): three or four skills
// per pack, every one a real skill already in the Duet-ready registry.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const packs = JSON.parse(readFileSync(join(root, 'data', 'duet-packs.json'), 'utf8')).packs || [];
const ready = JSON.parse(readFileSync(join(root, 'data', 'duet-ready.json'), 'utf8')).skills || {};
const errors = [];
const ids = new Set();
for (const p of packs) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id || '')) errors.push(`${p.id}: id must be kebab-case`);
  if (ids.has(p.id)) errors.push(`${p.id}: duplicate id`); ids.add(p.id);
  if (!p.title || !p.for) errors.push(`${p.id}: needs a title and who it is for`);
  if (!Array.isArray(p.skills) || p.skills.length < 3 || p.skills.length > 4) errors.push(`${p.id}: a pack has three or four skills`);
  for (const s of p.skills || []) {
    if (!existsSync(join(root, 'skills', s, 'SKILL.md'))) errors.push(`${p.id}: ${s} is not a skill`);
    else if (!ready[s]) errors.push(`${p.id}: ${s} is not in data/duet-ready.json`);
  }
}
if (!packs.length) errors.push('no packs');
if (errors.length) { errors.forEach((e) => console.error('✗ ' + e)); process.exit(1); }
console.log(`Duet starter packs: ${packs.length} packs, every skill Duet-ready. ✓`);
