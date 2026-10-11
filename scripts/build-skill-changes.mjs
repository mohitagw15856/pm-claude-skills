#!/usr/bin/env node
// What changed in each skill, and why: the commits that touched skills/*/SKILL.md
// (subject, date, pull request, which skills) plus the evolution log's scores for
// machine rewrites. Writes web/skill-changes.json for web/changes.html. Built at
// deploy, which first fetches commit history without file contents.
//
//   node scripts/build-skill-changes.mjs [--limit 400]
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const i = process.argv.indexOf('--limit');
const LIMIT = i !== -1 ? Number(process.argv[i + 1]) || 400 : 400;
const BULK = 25; // a commit touching more skills than this is a library-wide change

let log = '';
try { log = execFileSync('git', ['log', `-n${LIMIT}`, '--format=%x1e%H%x09%as%x09%s', '--name-only', '--', 'skills/*/SKILL.md'], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); }
catch (e) { console.warn(`git log failed (${e.message.split('\n')[0]}); writing an empty feed.`); }
const commits = log.split('\x1e').filter((b) => b.trim()).map((block) => {
  const [head, ...files] = block.trim().split('\n');
  const [sha, date, subject] = head.split('\t');
  const skills = [...new Set(files.map((f) => (f.match(/^skills\/([^/]+)\/SKILL\.md$/) || [])[1]).filter(Boolean))];
  const pr = (subject.match(/\(#(\d+)\)\s*$/) || [])[1];
  return { sha: sha.slice(0, 12), date, subject: subject.replace(/\s*\(#\d+\)\s*$/, ''), ...(pr ? { pr: Number(pr) } : {}), count: skills.length, skills, ...(skills.length > BULK ? { bulk: true } : {}) };
}).filter((c) => c.count);
const evo = existsSync(join(root, 'data', 'evolution-log.json')) ? JSON.parse(readFileSync(join(root, 'data', 'evolution-log.json'), 'utf8')).entries || [] : [];
writeFileSync(join(root, 'web', 'skill-changes.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), bulkThreshold: BULK, commits, rewrites: evo.filter((e) => e.kept) }));
console.log(`skill-changes.json: ${commits.length} commits (${commits.filter((c) => c.bulk).length} library-wide), ${evo.filter((e) => e.kept).length} kept rewrites.`);
