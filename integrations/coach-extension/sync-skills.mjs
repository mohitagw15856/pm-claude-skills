#!/usr/bin/env node
// Regenerate the coach's bundled skill index from the canonical catalog.
// Run after a release:  node integrations/coach-extension/sync-skills.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(join(here, '..', '..', 'web', 'skills.json'), 'utf8'));
const all = Array.isArray(raw) ? raw : raw.skills || [];
const idx = all.map((x) => ({
  n: x.name,
  t: x.title || x.name,
  s: (x.summary || x.description || '').split(/(?<=[.!?])\s/)[0].slice(0, 120),
  p: x.plugin || '',
}));
writeFileSync(join(here, 'coach-skills.json'), JSON.stringify(idx));
console.log(`coach-skills.json synced — ${idx.length} skills.`);
