#!/usr/bin/env node
// Score the jobs exam once grading closes: join the experts' grades with the
// sealed key and write results.json. An answer counts only with two or more
// graders; its mark is their mean, and it fails outright if most graders found
// a fatal error. The spread between graders is reported, not hidden.
//   node skillbench/jobs-exam/score.mjs --key .key.json
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ki = process.argv.indexOf('--key');
const keyFile = ki > 0 ? process.argv[ki + 1] : join(here, '.key.json');
if (!existsSync(keyFile)) { console.error(`No key at ${keyFile}: the key from run.mjs is needed to unblind.`); process.exit(1); }
const key = JSON.parse(readFileSync(keyFile, 'utf8'));
const cfg = JSON.parse(readFileSync(join(here, 'papers.json'), 'utf8'));
const MIN_GRADERS = 2;
const byModel = {};
const rows = [];
for (const p of cfg.papers || []) {
  const gf = join(here, 'grades', `${p.id}.json`);
  if (!existsSync(gf)) continue;
  const total = p.marking.reduce((n, m) => n + m.marks, 0);
  const grades = JSON.parse(readFileSync(gf, 'utf8'));
  const ids = [...new Set(grades.map((g) => g.answer))];
  for (const id of ids) {
    const gs = grades.filter((g) => g.answer === id);
    const k = key[id];
    if (!k || gs.length < MIN_GRADERS) continue;
    const scores = gs.map((g) => (g.fatal ? 0 : g.marks.reduce((a, b) => a + b, 0)));
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const fatal = gs.filter((g) => g.fatal).length * 2 > gs.length;
    const pass = !fatal && mean >= p.pass_mark;
    rows.push({ paper: p.id, occupation: p.occupation, answer: id, model: k.model, graders: gs.length, mean: +mean.toFixed(2), total, spread: Math.max(...scores) - Math.min(...scores), fatal, pass });
    const m = (byModel[k.model] = byModel[k.model] || { answers: 0, passed: 0, occupations: new Set() });
    m.answers++; if (pass) m.passed++; m.occupations.add(p.occupation);
  }
}
const models = Object.entries(byModel).map(([model, m]) => ({ model, answers: m.answers, passed: m.passed, pass_rate: +(m.passed / m.answers).toFixed(3), occupations: m.occupations.size })).sort((a, b) => b.pass_rate - a.pass_rate);
writeFileSync(join(here, 'results.json'), JSON.stringify({ version: cfg.version, scored: new Date().toISOString().slice(0, 10), method: `expert-graded, blind, at least ${MIN_GRADERS} graders per answer; fatal error by majority fails the answer`, models, answers: rows }, null, 1) + '\n');
console.log(models.length ? models.map((m) => `${m.model}: passed ${m.passed}/${m.answers} (${Math.round(m.pass_rate * 100)}%) across ${m.occupations} occupation(s)`).join('\n') : 'No answer has two graders yet; nothing to score.');
