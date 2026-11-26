#!/usr/bin/env node
// Validates the jobs exam (skillbench/jobs-exam): papers written by practitioners,
// the anonymised answers, and the grades experts gave them. Run in npm run check.
//   node scripts/check-jobs-exam.mjs [--dir <jobs-exam dir>]
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const di = process.argv.indexOf('--dir');
const dir = di > 0 ? process.argv[di + 1] : join(root, 'skillbench', 'jobs-exam');
const errors = [];
const cfg = JSON.parse(readFileSync(join(dir, 'papers.json'), 'utf8'));
const ISSUE = /^https:\/\/github\.com\/mohitagw15856\/pm-claude-skills\/issues\/\d+$/;

function checkPaper(p, isExample) {
  const tag = p.id || '(no id)';
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id || '')) errors.push(`${tag}: id must be kebab-case`);
  if (!p.occupation) errors.push(`${tag}: occupation is required`);
  if (p.isco && !/^\d{4}$/.test(p.isco)) errors.push(`${tag}: isco must be a 4-digit ISCO-08 code`);
  if (!p.region) errors.push(`${tag}: region is required`);
  if (!p.task || p.task.length < 80) errors.push(`${tag}: task must be a full brief (80+ characters)`);
  if (!Array.isArray(p.marking) || p.marking.length < 3) errors.push(`${tag}: marking needs at least 3 points`);
  const total = (p.marking || []).reduce((n, m) => n + (Number.isInteger(m.marks) && m.marks > 0 ? m.marks : NaN), 0);
  if (Number.isNaN(total)) errors.push(`${tag}: every marking point needs whole, positive marks`);
  if (!(p.pass_mark > 0 && p.pass_mark <= total)) errors.push(`${tag}: pass_mark must be between 1 and the total (${total})`);
  if (!Array.isArray(p.fatal)) errors.push(`${tag}: fatal must be a list (it can be empty)`);
  if (isExample) { if (p.example_only !== true) errors.push(`${tag}: the example must say example_only: true`); return total; }
  if (p.example_only) errors.push(`${tag}: example_only papers can't be in papers`);
  if (!p.author || !p.author.credential || p.author.credential.length < 10) errors.push(`${tag}: author.credential must say who wrote it (role, years, where)`);
  if (!p.author || !ISSUE.test(p.author.issue || '')) errors.push(`${tag}: author.issue must link the jobs-exam-paper issue`);
  return total;
}

if (cfg.example) checkPaper(cfg.example, true);
const papers = new Map();
for (const p of cfg.papers || []) { if (papers.has(p.id)) errors.push(`${p.id}: duplicate paper id`); papers.set(p.id, checkPaper(p, false)); }

// answers/<paper>.json: [{ id, text }], ids random so graders can't tell the model.
const answers = new Map();
const ad = join(dir, 'answers');
for (const f of existsSync(ad) ? readdirSync(ad).filter((x) => x.endsWith('.json')) : []) {
  const pid = f.replace(/\.json$/, '');
  if (!papers.has(pid)) { errors.push(`answers/${f}: no paper "${pid}"`); continue; }
  const list = JSON.parse(readFileSync(join(ad, f), 'utf8'));
  for (const a of list) {
    if (!/^[a-f0-9]{8}$/.test(a.id || '')) errors.push(`answers/${f}: answer ids must be 8 hex characters`);
    if (/\b(claude|gpt|gemini|llama|qwen|deepseek|mistral|anthropic|openai)\b/i.test(a.text || '')) errors.push(`answers/${f} ${a.id}: names a model or vendor, which unblinds the graders; redact it`);
  }
  answers.set(pid, new Set(list.map((a) => a.id)));
}

// grades/<paper>.json: [{ answer, grader: { credential, issue }, marks: [..], fatal: bool }].
const gd = join(dir, 'grades');
for (const f of existsSync(gd) ? readdirSync(gd).filter((x) => x.endsWith('.json')) : []) {
  const pid = f.replace(/\.json$/, '');
  const paper = (cfg.papers || []).find((p) => p.id === pid);
  if (!paper) { errors.push(`grades/${f}: no paper "${pid}"`); continue; }
  for (const g of JSON.parse(readFileSync(join(gd, f), 'utf8'))) {
    const gt = `grades/${f} ${g.answer}`;
    if (!(answers.get(pid) || new Set()).has(g.answer)) errors.push(`${gt}: no such answer`);
    if (!g.grader || !g.grader.credential || !ISSUE.test(g.grader.issue || '')) errors.push(`${gt}: grader needs a credential and the grade issue link`);
    if (!Array.isArray(g.marks) || g.marks.length !== paper.marking.length || g.marks.some((m, i) => !Number.isInteger(m) || m < 0 || m > paper.marking[i].marks)) errors.push(`${gt}: marks must give 0..max for each marking point`);
    if (typeof g.fatal !== 'boolean') errors.push(`${gt}: fatal must be true or false`);
  }
}

if (errors.length) { errors.forEach((e) => console.error('✗ ' + e)); process.exit(1); }
console.log(`Jobs exam OK: ${papers.size} paper(s), ${[...answers.values()].reduce((n, s) => n + s.size, 0)} answer(s).`);
