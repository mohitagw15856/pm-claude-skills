#!/usr/bin/env node
// Guard against a skill silently changing its home bundle.
//
// A skill that ships in several bundles has one "home": the bundle its catalogue entry
// and its export path (exports/cursor/<bundle>/<skill>/…) are filed under. Without a pin
// the home is the alphabetically last bundle that contains the skill, so wiring an old
// skill into a new bundle can move a path that search engines have indexed. This check
// compares every skill's home with the committed record in data/skill-home-lock.json and
// fails when an existing skill's home has moved.
//
//   node scripts/check-skill-homes.mjs            exit 1 if a recorded home has moved
//   node scripts/check-skill-homes.mjs --update   record new skills and accept the current homes
//
// To keep a skill where it was, add it to data/skill-home.json. To move it on purpose,
// run --update and say why in the pull request. No dependencies.
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCK = join(ROOT, 'data', 'skill-home-lock.json');

// The same rule web/build-skills.mjs and scripts/build-exports.mjs apply.
export function computeHomes(root) {
  const homes = {};
  const plugins = join(root, 'plugins');
  for (const bundle of readdirSync(plugins).sort()) {
    const dir = join(plugins, bundle, 'skills');
    if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;
    for (const skill of readdirSync(dir)) if (existsSync(join(dir, skill, 'SKILL.md'))) homes[skill] = bundle;
  }
  let pins = {};
  try { pins = JSON.parse(readFileSync(join(root, 'data', 'skill-home.json'), 'utf8')).home || {}; } catch { /* no pins */ }
  for (const [skill, bundle] of Object.entries(pins)) {
    if (existsSync(join(plugins, bundle, 'skills', skill, 'SKILL.md'))) homes[skill] = bundle;
  }
  return Object.fromEntries(Object.entries(homes).sort());
}

export function compare(lock, homes) {
  const moved = []; const added = []; const gone = [];
  for (const [skill, bundle] of Object.entries(homes)) {
    if (!(skill in lock)) added.push(skill);
    else if (lock[skill] !== bundle) moved.push({ skill, from: lock[skill], to: bundle });
  }
  for (const skill of Object.keys(lock)) if (!(skill in homes)) gone.push(skill);
  return { moved, added, gone };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const homes = computeHomes(ROOT);
  const lock = existsSync(LOCK) ? JSON.parse(readFileSync(LOCK, 'utf8')).homes || {} : {};
  const { moved, added, gone } = compare(lock, homes);
  if (process.argv.includes('--update')) {
    writeFileSync(LOCK, JSON.stringify({ _comment: 'Each skill\'s home bundle, recorded so a pull request cannot move one by accident. Written by scripts/check-skill-homes.mjs --update.', homes }, null, 1) + '\n');
    console.log(`Recorded ${Object.keys(homes).length} skill homes (${added.length} new, ${moved.length} moved, ${gone.length} removed).`);
    process.exit(0);
  }
  for (const m of moved) console.error(`  ✗ ${m.skill}: home moved from ${m.from} to ${m.to}. Its export path changes with it.`);
  if (moved.length) { console.error(`\n${moved.length} skill(s) changed home. Pin the old bundle in data/skill-home.json, or run: node scripts/check-skill-homes.mjs --update`); process.exit(1); }
  if (added.length || gone.length) { console.error(`  ✗ ${added.length} skill(s) are not recorded yet and ${gone.length} recorded skill(s) no longer exist. Run: node scripts/check-skill-homes.mjs --update`); process.exit(1); }
  console.log(`Skill homes: ${Object.keys(homes).length} skills are where they were recorded. ✓`);
}
