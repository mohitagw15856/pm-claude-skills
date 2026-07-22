#!/usr/bin/env node
// Gold-standard eval — grade a skill's output against a concrete REFERENCE
// artifact, not only the judge's taste. For each entry in evals/gold/corpus.json
// it runs the skill on the input, then asks the judge to score the output
// against the reference on that entry's rubric (coverage + quality), and reports
// a gold score plus the specific dimensions the output missed.
//
// Why: SkillBench and the leaderboard are LLM-judged in the abstract; grading
// against a fixed, human-authored target is a stronger, less circular signal
// (see docs/paper/skillbench.md §6). This is the harness; add cited real
// exemplars to the corpus to strengthen it.
//
//   node scripts/gold-eval.mjs                 # all entries (needs ANTHROPIC_API_KEY)
//   node scripts/gold-eval.mjs --skill executive-update
//   node scripts/gold-eval.mjs --dry-run       # no API; list what would run
//   node scripts/gold-eval.mjs --json
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete } from '../bin/lib/anthropic.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : d; };
const has = (n) => process.argv.includes('--' + n);

const corpus = JSON.parse(readFileSync(join(root, 'evals', 'gold', 'corpus.json'), 'utf8'));
const skills = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills || [];
const skillBody = (name) => {
  const s = skills.find((x) => x.name === name);
  return s ? (s.body || s.instructions || s.description || '') : null;
};

const only = arg('skill');
const entries = corpus.entries.filter((e) => (only ? e.skill === only : true));
if (!entries.length) { console.error(`No gold entries${only ? ` for "${only}"` : ''}.`); process.exit(1); }

const JUDGE = (entry, output) => `You are grading a professional artifact against a GOLD REFERENCE.

RUBRIC (score each dimension the output meets):
${entry.rubric.map((r, i) => `${i + 1}. ${r}`).join('\n')}

GOLD REFERENCE (what a strong answer looks like — do not require identical wording, require the same substance and quality):
"""${entry.reference}"""

CANDIDATE OUTPUT (grade this):
"""${output}"""

Return STRICT JSON only:
{"score": <0-5, mean quality vs the reference>, "coverage": <0-1, fraction of rubric dimensions met>, "missed": ["rubric dimensions the candidate failed to meet, verbatim from the rubric"], "note": "<one sentence>"}`;

async function grade(entry) {
  const body = skillBody(entry.skill);
  if (!body) return { skill: entry.skill, error: 'skill not found in skills.json' };
  if (has('dry-run')) { console.log(`· [dry-run] would run "${entry.skill}" and grade vs its ${entry.rubric.length}-point reference`); return null; }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { console.error('ANTHROPIC_API_KEY not set (use --dry-run to preview).'); process.exit(1); }
  const output = await complete({ apiKey: key, system: body, messages: [{ role: 'user', content: entry.input }], maxTokens: 2000 });
  const raw = await complete({ apiKey: key, model: 'claude-sonnet-4-6', system: 'You are a strict, fair evaluator. Output only the requested JSON.', messages: [{ role: 'user', content: JUDGE(entry, output.trim ? output.trim() : output) }], maxTokens: 700 });
  let verdict;
  try { verdict = JSON.parse(String(raw).match(/\{[\s\S]*\}/)[0]); }
  catch { return { skill: entry.skill, error: 'judge returned non-JSON' }; }
  return { skill: entry.skill, score: verdict.score, coverage: verdict.coverage, missed: verdict.missed || [], note: verdict.note };
}

const results = [];
for (const e of entries) { const r = await grade(e); if (r) results.push(r); }

if (has('json')) { console.log(JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)); process.exit(0); }
if (has('dry-run')) process.exit(0);

console.log(`\nGold eval — ${results.length} skill(s) vs reference artifacts\n`);
let sum = 0, n = 0;
for (const r of results) {
  if (r.error) { console.log(`✗ ${r.skill}: ${r.error}`); continue; }
  sum += r.score; n++;
  console.log(`${r.score >= 4 ? '✓' : '⚠'} ${r.skill.padEnd(22)} ${r.score}/5 · coverage ${Math.round(r.coverage * 100)}%`);
  if (r.missed.length) r.missed.forEach((m) => console.log(`    missed: ${m}`));
  if (r.note) console.log(`    ${r.note}`);
}
if (n) console.log(`\nMean gold score: ${(sum / n).toFixed(2)}/5 across ${n} skill(s).`);
