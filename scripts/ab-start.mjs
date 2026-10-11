#!/usr/bin/env node
// Start a live A/B test: the given SKILL.md (a challenger, for example from the
// evolve loop) becomes version B of the skill in the playground.
//
//   node scripts/ab-start.mjs --skill cover-letter --from path/to/challenger/SKILL.md
//   node scripts/ab-start.mjs --stop cover-letter
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'data', 'ab-tests.json');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const d = JSON.parse(readFileSync(FILE, 'utf8'));

const stop = arg('stop');
if (stop) {
  d.tests = d.tests.filter((t) => t.skill !== stop);
  rmSync(join(root, 'proposals', 'ab', `${stop}.md`), { force: true });
  writeFileSync(FILE, JSON.stringify(d, null, 2) + '\n');
  console.log(`Stopped the A/B test for ${stop}.`);
  process.exit(0);
}
const skill = arg('skill'), from = arg('from');
if (!NAME.test(skill || '') || !existsSync(join(root, 'skills', skill, 'SKILL.md'))) { console.error('--skill must be an existing skill.'); process.exit(1); }
if (!from || !existsSync(from)) { console.error('--from must be the challenger SKILL.md.'); process.exit(1); }
const text = readFileSync(from, 'utf8');
const name = (text.match(/^name:\s*["']?([\w-]+)/m) || [])[1];
if (name !== skill) { console.error(`The challenger's frontmatter name is "${name}", not "${skill}".`); process.exit(1); }
mkdirSync(join(root, 'proposals', 'ab'), { recursive: true });
writeFileSync(join(root, 'proposals', 'ab', `${skill}.md`), text);
d.tests = d.tests.filter((t) => t.skill !== skill);
d.tests.push({ skill, started: new Date().toISOString().slice(0, 10) });
writeFileSync(FILE, JSON.stringify(d, null, 2) + '\n');
console.log(`A/B test started for ${skill}: version B is proposals/ab/${skill}.md. It goes live on the next deploy.`);
