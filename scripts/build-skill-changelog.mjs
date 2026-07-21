#!/usr/bin/env node
// Generates web/skill-changelog.json — a per-skill history derived from git, so a
// user can see WHAT changed in a skill and WHEN, not just a single "updated" date.
// Shape: { generatedAt, skills: { <name>: [{ date, subject, sha }] } } (newest first,
// capped per skill). Pure function of git history → a build artifact (gitignored),
// regenerated at deploy alongside the sitemap. No dependencies, no network.
import { execSync } from 'node:child_process';
import { writeFileSync, readdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const outFile = join(root, 'web', 'skill-changelog.json');
const CAP = 12; // most-recent commits per skill — enough for a history panel

const names = existsSync(skillsDir)
  ? readdirSync(skillsDir).filter((n) => existsSync(join(skillsDir, n, 'SKILL.md')))
  : [];

const out = { generatedAt: new Date().toISOString().slice(0, 10), skills: {} };

// Shallow CI checkouts have truncated history — reuse the committed artifact so the
// panel doesn't go blank (mirrors web/build-skills.mjs's handling of `updated`).
let shallow = false;
try { shallow = execSync('git rev-parse --is-shallow-repository', { cwd: root, encoding: 'utf8' }).trim() === 'true'; } catch { /* not a git repo */ }
if (shallow && existsSync(outFile)) {
  try { out.skills = JSON.parse(readFileSync(outFile, 'utf8')).skills || {}; } catch { /* start fresh */ }
  writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  console.log(`skill-changelog: shallow clone — reused ${Object.keys(out.skills).length} committed histories`);
} else {
  // One git call for all skills: log with a unique record separator, then bucket by
  // the paths each commit touched. Cheaper than a git call per skill (750 of them).
  const SEP = '';
  let entries = [];
  try {
    const log = execSync(
      `git log --pretty=format:"%h${SEP}%as${SEP}%s" --name-only -- "skills/*/SKILL.md"`,
      { cwd: root, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 },
    );
    let cur = null;
    for (const line of log.split('\n')) {
      if (line.includes(SEP)) {
        const [sha, date, subject] = line.split(SEP);
        cur = { sha, date, subject };
      } else if (cur && line.startsWith('skills/')) {
        const name = line.split('/')[1];
        if (name) entries.push({ name, ...cur });
      }
    }
  } catch (e) {
    console.error(`skill-changelog: git log failed (${e.message}) — writing empty history`);
  }
  const current = new Set(names);
  for (const name of names) out.skills[name] = [];
  for (const e of entries) {
    if (!current.has(e.name)) continue; // skip since-renamed/removed skills
    const list = out.skills[e.name];
    if (list.length < CAP && !list.some((x) => x.sha === e.sha)) list.push({ date: e.date, subject: e.subject, sha: e.sha });
  }
  writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  const withHistory = Object.values(out.skills).filter((a) => a.length).length;
  console.log(`skill-changelog: ${withHistory}/${names.length} skills with history → web/skill-changelog.json`);
}
