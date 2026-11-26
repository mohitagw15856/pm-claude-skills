#!/usr/bin/env node
// Small-model badges: one shields.io endpoint JSON per skill that has a recorded
// run on a small open model (data/small-model.json, written by
// scripts/local-eval.mjs --record). A skill with no run gets no badge; nothing
// here invents a score. Self-judged runs are kept in the data but never badged,
// because a model grading itself is a smoke signal, not evidence.
//
//   node scripts/build-small-model-badges.mjs           # write web/badge/small-model/<skill>.json
//   node scripts/build-small-model-badges.mjs --check   # validate data/small-model.json only
//   options: --data <file> --out <dir>
//
// Use a badge with:
//   https://img.shields.io/endpoint?url=https://mohitagw15856.github.io/pm-claude-skills/badge/small-model/<skill>.json
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? resolve(process.argv[i + 1]) : null; };
const dataFile = arg('data') || join(root, 'data', 'small-model.json');
const outDir = arg('out') || join(root, 'web', 'badge', 'small-model');
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const data = JSON.parse(readFileSync(dataFile, 'utf8'));
const runs = Array.isArray(data.runs) ? data.runs : null;
const errors = [];
if (!runs) errors.push('runs must be an array');
for (const [n, r] of (runs || []).entries()) {
  const at = `runs[${n}]`;
  if (!NAME.test(r.skill || '')) errors.push(`${at}: bad skill name`);
  else if (!existsSync(join(root, 'skills', r.skill, 'SKILL.md'))) errors.push(`${at}: no skill ${r.skill}`);
  if (typeof r.model !== 'string' || !r.model) errors.push(`${at}: model missing`);
  if (typeof r.judge !== 'string' || !r.judge) errors.push(`${at}: judge missing`);
  if (!(typeof r.score === 'number' && r.score >= 1 && r.score <= 5)) errors.push(`${at}: score must be a number from 1 to 5`);
  if (!(Number.isInteger(r.cases) && r.cases >= 1)) errors.push(`${at}: cases must be a positive integer`);
  if (!DATE.test(r.date || '')) errors.push(`${at}: date must be YYYY-MM-DD`);
  if (typeof r.selfJudged !== 'boolean') errors.push(`${at}: selfJudged must be true or false`);
}
if (errors.length) { for (const e of errors) console.error(`✗ ${e}`); process.exit(1); }
if (process.argv.includes('--check')) { console.log(`small-model.json valid: ${runs.length} run(s). ✓`); process.exit(0); }

// Best independently judged score per skill; ties go to the most recent run.
const best = {};
for (const r of runs) {
  if (r.selfJudged) continue;
  const b = best[r.skill];
  if (!b || r.score > b.score || (r.score === b.score && r.date > b.date)) best[r.skill] = r;
}
const color = (s) => (s >= 4 ? 'brightgreen' : s >= 3.5 ? 'green' : s >= 3 ? 'yellow' : 'orange');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
const index = [];
for (const [skill, r] of Object.entries(best).sort(([a], [b]) => a.localeCompare(b))) {
  writeFileSync(join(outDir, `${skill}.json`), JSON.stringify({ schemaVersion: 1, label: 'small model', message: `${r.score.toFixed(1)}/5 ${r.model}`, color: color(r.score) }) + '\n');
  index.push({ skill, model: r.model, judge: r.judge, score: r.score, cases: r.cases, date: r.date });
}
writeFileSync(join(outDir, 'index.json'), JSON.stringify({ skills: index }, null, 2) + '\n');
console.log(`Small-model badges: ${index.length} skill(s) with an independently judged run (${runs.length} run(s) recorded).`);
