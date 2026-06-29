#!/usr/bin/env node
// Validates the COMMUNITY-SKILLS.md directory table so PR submissions stay well-formed.
// Structural only — no network calls. Run locally before a PR, and in CI on changes to
// COMMUNITY-SKILLS.md.
//
//   node scripts/check-community-skills.mjs
//
// Checks each contributor row has: 4 columns, a markdown link in the name column, an
// http(s) repo URL in the last column, and no duplicate repo URLs. The placeholder
// "Be the first" row and empty rows are ignored.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = join(root, 'COMMUNITY-SKILLS.md');
const lines = readFileSync(file, 'utf8').split('\n');

// Locate the directory table: the header row with "Skill / pack", then its separator,
// then consecutive pipe rows.
const headerIdx = lines.findIndex((l) => /^\|\s*Skill\s*\/\s*pack\s*\|/i.test(l));
const errors = [];
if (headerIdx === -1) {
  errors.push('Could not find the directory table header ("| Skill / pack | …").');
}

const rows = [];
if (headerIdx !== -1) {
  // header at headerIdx, separator at headerIdx+1, data rows follow
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().startsWith('|')) break; // table ended
    rows.push({ n: i + 1, line });
  }
}

const seenRepos = new Map();
let realEntries = 0;
for (const { n, line } of rows) {
  // Split a markdown table row into cells (drop the leading/trailing empty parts).
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  const joined = cells.join(' ');
  // Ignore the placeholder / empty rows.
  if (/be the first/i.test(joined)) continue;
  if (cells.every((c) => c === '')) continue;

  realEntries++;
  if (cells.length !== 4) {
    errors.push(`Line ${n}: expected 4 columns (Skill / pack | Author | What it does | Repo), found ${cells.length}.`);
    continue;
  }
  const [name, author, desc, repo] = cells;
  const link = name.match(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/);
  if (!link) errors.push(`Line ${n}: the "Skill / pack" cell must be a markdown link, e.g. [Name](https://github.com/you/repo).`);
  if (!author) errors.push(`Line ${n}: the "Author" cell is empty (add your @handle).`);
  if (!desc) errors.push(`Line ${n}: the "What it does" cell is empty (add a one-line description).`);
  const repoUrl = (repo.match(/https?:\/\/\S+/) || [])[0];
  if (!repoUrl) {
    errors.push(`Line ${n}: the "Repo" cell must contain a public repo URL (https://…).`);
  } else {
    const key = repoUrl.replace(/\/$/, '').toLowerCase();
    if (seenRepos.has(key)) errors.push(`Line ${n}: duplicate repo URL (already listed on line ${seenRepos.get(key)}).`);
    else seenRepos.set(key, n);
  }
}

if (errors.length) {
  console.error('Community Skills check — FAILED:\n');
  for (const e of errors) console.error('  ✗ ' + e);
  console.error(`\nFix the row(s) above in COMMUNITY-SKILLS.md. Format:\n  | [Name](https://github.com/you/repo) | [@you](https://github.com/you) | One line. | https://github.com/you/repo |`);
  process.exit(1);
}
console.log(`Community Skills check — OK (${realEntries} listed ${realEntries === 1 ? 'entry' : 'entries'}).`);
