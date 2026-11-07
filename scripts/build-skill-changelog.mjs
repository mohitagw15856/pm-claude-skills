#!/usr/bin/env node
// Builds web/skill-changelog.json: per-skill git history ({date, sha, subject}),
// newest first, for `pm-claude-skills changelog <skill>` and for doctor's
// "N skills changed since you installed" line. Built at deploy and at prepack;
// never committed. Every real skill gets a key, even with an empty history.
import { readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LIMIT = Number(process.env.SKILL_CHANGELOG_LIMIT || 20000);
const skills = {};
for (const n of readdirSync(join(ROOT, 'skills')).sort()) if (existsSync(join(ROOT, 'skills', n, 'SKILL.md'))) skills[n] = [];

let log = '';
try {
  log = execFileSync('git', ['log', `-n${LIMIT}`, '--format=%x1e%h%x09%as%x09%s', '--name-only', '--', 'skills/*/SKILL.md'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
} catch (e) { console.warn(`git log failed (${e.message.split('\n')[0]}); writing an empty changelog.`); }

let commits = 0;
for (const chunk of log.split('\x1e').filter(Boolean)) {
  const [head, ...files] = chunk.trim().split('\n');
  const [sha, date, subject] = head.split('\t');
  if (!sha) continue;
  commits++;
  const touched = new Set(files.map((f) => (f.match(/^skills\/([^/]+)\/SKILL\.md$/) || [])[1]).filter(Boolean));
  // Library-wide commits (a regen touching hundreds of skills) are noise in a per-skill history.
  if (touched.size > 200) continue;
  for (const n of touched) if (skills[n]) skills[n].push({ date, sha, subject });
}

const out = { generated: new Date().toISOString().slice(0, 10), commits, skills };
mkdirSync(join(ROOT, 'web'), { recursive: true });
writeFileSync(join(ROOT, 'web', 'skill-changelog.json'), JSON.stringify(out));
const withHistory = Object.values(skills).filter((h) => h.length).length;
console.log(`skill-changelog.json: ${Object.keys(skills).length} skills, ${withHistory} with history, from ${commits} commits.`);
