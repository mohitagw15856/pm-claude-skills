#!/usr/bin/env node
// What actually worked, per skill, from the three real-use signals: playground
// ratings (web/feedback.json), Outcome Ledger contributions (data/outcomes.json:
// landed / mixed / no) and accepted ROI stories (data/savings.json). Writes
// web/proven.json for the search pages, which nudge well-proven skills up and
// show "worked for N people". Built at deploy. Thin evidence moves nothing:
// the boost needs at least 3 signals and grows to full strength at 20.
//
//   node scripts/build-proven.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p, d) => (existsSync(join(root, p)) ? JSON.parse(readFileSync(join(root, p), 'utf8')) : d);
const P = {};
const at = (name) => (P[name] = P[name] || { up: 0, ratings: 0, landed: 0, mixed: 0, no: 0, stories: 0 });

// A/B arms (@a, @b) are rated separately; for "did it work" they count as the skill.
for (const [key, v] of Object.entries(read('web/feedback.json', {}).skills || {})) {
  const p = at(key.replace(/@[ab]$/, ''));
  p.up += v.up || 0; p.ratings += v.total || (v.up || 0) + (v.down || 0);
}
for (const c of read('data/outcomes.json', {}).contributions || []) {
  for (const [name, n] of Object.entries(c.counts || {})) { const p = at(name); p.landed += n.landed || 0; p.mixed += n.mixed || 0; p.no += n.no || 0; }
}
for (const e of read('data/savings.json', {}).entries || []) for (const name of e.skills || []) at(name).stories++;

const out = {};
for (const [name, p] of Object.entries(P)) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) continue;
  const n = p.ratings + p.landed + p.mixed + p.no + p.stories;
  const good = p.up + p.landed + p.mixed * 0.5 + p.stories;
  out[name] = { n, worked: p.up + p.landed + p.stories, rate: Math.round(((good + 1) / (n + 2)) * 100) / 100 };
}
writeFileSync(join(root, 'web', 'proven.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), skills: out }));
console.log(`proven.json: ${Object.keys(out).length} skill(s) with real-use evidence, ${Object.values(out).filter((x) => x.n >= 3).length} with enough to affect ranking.`);
