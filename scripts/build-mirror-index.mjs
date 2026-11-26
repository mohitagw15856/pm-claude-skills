#!/usr/bin/env node
// A small, committed routing index for tools that read the repo through a mirror.
//
// web/skills-index.json is a build output and is not committed, so the Gitee and
// GitHub raw URLs return 404 for it. The mainland tools (MaxKB, FastGPT, the group
// chat bots) load their index over those URLs and need a file that is really there.
// This one carries only what routing needs (name, full description, the Chinese
// description where one exists), so it changes when a description changes and not
// on every build.
//
//   node scripts/build-mirror-index.mjs           write data/skills-index.min.json
//   node scripts/build-mirror-index.mjs --check   fail if the committed file is stale
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'web', 'skills-index.json');
const out = join(root, 'data', 'skills-index.min.json');
if (!existsSync(src)) { console.error('web/skills-index.json is missing. Run: node web/build-skills.mjs'); process.exit(1); }

const skills = JSON.parse(readFileSync(src, 'utf8')).skills
  .filter((s) => !s.deprecated)
  .map((s) => (s.descriptionZh
    ? { name: s.name, description: s.description || '', descriptionZh: s.descriptionZh }
    : { name: s.name, description: s.description || '' }))
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

// One skill per line keeps diffs readable when a single description changes.
const body = '{"skills":[\n' + skills.map((s) => JSON.stringify(s)).join(',\n') + '\n]}\n';

if (process.argv.includes('--check')) {
  const have = existsSync(out) ? readFileSync(out, 'utf8') : '';
  if (have !== body) { console.error('data/skills-index.min.json is stale. Run: node scripts/build-mirror-index.mjs'); process.exit(1); }
  console.log(`mirror index: ${skills.length} skills, up to date ✓`);
} else {
  writeFileSync(out, body);
  console.log(`Wrote ${skills.length} skills to data/skills-index.min.json (${(Buffer.byteLength(body) / 1024).toFixed(0)} KB)`);
}
