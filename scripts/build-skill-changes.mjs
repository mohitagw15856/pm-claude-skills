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

// Atom feed of the same history (web/changes.xml), so a reader or an agent can
// follow skill changes without polling the page. Library-wide commits are kept
// but summarised by count; per-skill commits list the skills.
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const feedItems = commits.slice(0, 100).map((c) => {
  const link = c.pr ? `${REPO}/pull/${c.pr}/files` : `${REPO}/commit/${c.sha}`;
  const what = c.bulk ? `${c.count} skills changed (library-wide)` : c.skills.map((s) => `<a href="${SITE}/skill/${s}.html">${s}</a>`).join(', ');
  return `  <entry>
    <id>${REPO}/commit/${c.sha}</id>
    <title>${esc(c.subject)}</title>
    <link href="${link}"/>
    <updated>${c.date}T00:00:00Z</updated>
    <summary type="html">${esc(`<p>${what}</p><p><a href="${link}">Full diff</a></p>`)}</summary>
  </entry>`;
});
const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>PM Skills: what changed</title>
  <subtitle>Every edit to a skill in the library, newest first, with the pull request that carries the diff.</subtitle>
  <link href="${SITE}/changes.html"/>
  <link rel="self" href="${SITE}/changes.xml"/>
  <id>${SITE}/changes.xml</id>
  <updated>${(commits[0] ? commits[0].date : new Date().toISOString().slice(0, 10))}T00:00:00Z</updated>
${feedItems.join('\n')}
</feed>
`;
writeFileSync(join(root, 'web', 'changes.xml'), feed);
console.log(`skill-changes.json: ${commits.length} commits (${commits.filter((c) => c.bulk).length} library-wide), ${evo.filter((e) => e.kept).length} kept rewrites; changes.xml: ${feedItems.length} entries.`);
