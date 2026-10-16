#!/usr/bin/env node
// PM-8B teacher pass: a strong model does each real task WITH the matching skill,
// a judge scores the answer on the SkillBench rubric, and only answers scoring
// --min (default 4) or more are kept. The kept rows pair the task alone with the
// skilled answer, so the small model learns to produce the skill's judgment
// without being handed the skill.
//
// No API credit: point it at an open model you serve yourself (vLLM, Ollama,
// llama.cpp; any OpenAI-compatible /v1). On the rented GPU that trains PM-8B:
//   vllm serve Qwen/Qwen3-32B-AWQ --port 8000 &
//   node training/teacher-pass.mjs --base-url http://localhost:8000/v1 --teacher Qwen/Qwen3-32B-AWQ --judge Qwen/Qwen3-32B-AWQ
// With Anthropic instead (spends credit; needs --allow-api-spend):
//   ANTHROPIC_API_KEY=… node training/teacher-pass.mjs --allow-api-spend --dry-run
//   ANTHROPIC_API_KEY=… node training/teacher-pass.mjs --limit 50      # a first batch
//   ANTHROPIC_API_KEY=… node training/teacher-pass.mjs                 # everything; resumes
//   --teacher <model>  (default claude-sonnet-5)  --judge <model>  (default claude-haiku-4-5-20251001)
//   --min <score>      keep threshold, 1-5 (default 4)
//
// Inputs: evals/cases.json, plus the "You say" requests in web/worked-examples.json
// when it has been built. Held-out skills (training/pm-8b-split.mjs) are never
// sent, so the evaluation stays fair. Output: training/teacher.jsonl (gitignored;
// rebuildable, and it carries model outputs, so check your provider's terms before
// publishing it). Rejected answers are logged to training/teacher-rejected.jsonl.
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { heldOut } from './pm-8b-split.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : d; };
const has = (n) => process.argv.includes(`--${n}`);
const TEACHER = arg('teacher', 'claude-sonnet-5');
const JUDGE = arg('judge', 'claude-haiku-4-5-20251001');
const MIN = Number(arg('min', '4'));
const LIMIT = Number(arg('limit', '0'));
const OUT = join(here, 'teacher.jsonl');
const REJECTED = join(here, 'teacher-rejected.jsonl');
if (!(MIN >= 1 && MIN <= 5)) { console.error('--min must be between 1 and 5.'); process.exit(2); }
if (!Number.isInteger(LIMIT) || LIMIT < 0) { console.error('--limit must be a whole number.'); process.exit(2); }

// The work list: real task inputs for skills that are in training.
const items = [];
for (const c of JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases) items.push({ skill: c.skill, input: c.input, source: 'eval-case' });
const we = join(root, 'web', 'worked-examples.json');
if (existsSync(we)) for (const e of JSON.parse(readFileSync(we, 'utf8')).examples) for (const s of e.scenarios) items.push({ skill: e.skill, input: s.say, source: 'worked-example' });
const idOf = (it) => createHash('sha256').update(`${it.skill}\n${it.input}`).digest('hex').slice(0, 16);
const done = new Set([OUT, REJECTED].flatMap((p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).id) : [])));
let todo = items.filter((it) => !heldOut(it.skill) && existsSync(join(root, 'skills', it.skill, 'SKILL.md')) && !done.has(idOf(it)));
if (LIMIT) todo = todo.slice(0, LIMIT);

console.log(`Teacher pass: ${items.length} inputs, ${done.size} already done, ${todo.length} to run (teacher ${TEACHER}, judge ${JUDGE}, keep ≥ ${MIN}).`);
if (has('dry-run')) { console.log(`About ${todo.length} teacher completions and ${todo.length} judge calls. Dry run: no calls made.`); process.exit(0); }
const BASE = arg('base-url', '');
const KEY = process.env.ANTHROPIC_API_KEY;
if (!BASE && !has('allow-api-spend')) { console.error('Refusing to spend Anthropic credit by default. Pass --base-url <your OpenAI-compatible server>/v1 (free: your own GPU), or --allow-api-spend to use Claude.'); process.exit(1); }
if (!BASE && !KEY) { console.error('ANTHROPIC_API_KEY is not set.'); process.exit(1); }

// An OpenAI-compatible server (vLLM, Ollama, llama.cpp): no API credit involved.
async function openaiCompat(model, system, user, maxTokens) {
  const r = await fetch(BASE.replace(/\/$/, '') + '/chat/completions', {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + (process.env.OPENAI_API_KEY || 'local') },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: user }] }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`${model}: ${(j.error && j.error.message) || r.status}`);
  // Reasoning models (Qwen3) wrap their thinking in <think>; keep only the answer.
  return (j.choices?.[0]?.message?.content || '').replace(/<think>[\s\S]*?<\/think>\s*/g, '').trim();
}

async function claude(model, system, user, maxTokens) {
  if (BASE) return openaiCompat(model, system, user, maxTokens);
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model, max_tokens: maxTokens, ...(system ? { system } : {}), messages: [{ role: 'user', content: user }] }),
    });
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 5000 * (attempt + 1))); continue; }
    const j = await res.json();
    if (!res.ok) throw new Error(`${model}: ${j.error?.message || res.status}`);
    return j.content?.[0]?.text || '';
  }
  throw new Error(`${model}: still rate-limited after 3 attempts`);
}

// Same rubric as skillbench/run-skillbench.mjs.
const RUBRIC = `You are a strict evaluator of professional work artifacts. Score the RESPONSE to the TASK on four dimensions, each 1-5:
- structure: would a senior professional recognise this artifact's shape?
- completeness: are the load-bearing sections present and specific (not padded)?
- usefulness: could the intended reader act on it without a rewrite?
- grounding: does it use the task's facts, label assumptions, avoid fabricated specifics?
Return STRICT JSON only: {"structure":n,"completeness":n,"usefulness":n,"grounding":n}`;
async function judge(input, output) {
  const raw = await claude(JUDGE, RUBRIC, `TASK:\n${input}\n\nRESPONSE:\n${output.slice(0, 14000)}`, 300);
  try {
    const j = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
    const dims = ['structure', 'completeness', 'usefulness', 'grounding'].map((d) => Math.max(1, Math.min(5, +j[d] || 0)));
    return +(dims.reduce((a, b) => a + b, 0) / 4).toFixed(2);
  } catch { return null; }
}

const body = (s) => readFileSync(join(root, 'skills', s, 'SKILL.md'), 'utf8').replace(/^---[\s\S]*?---\r?\n/, '');
let kept = 0, rejected = 0, failed = 0;
async function work(it) {
  const id = idOf(it);
  try {
    const answer = await claude(TEACHER, body(it.skill), it.input, 4096);
    const score = await judge(it.input, answer);
    const row = { id, skill: it.skill, meta: { source: it.source, teacher: TEACHER, judge: JUDGE, score } };
    if (score != null && score >= MIN) {
      appendFileSync(OUT, JSON.stringify({ ...row, messages: [{ role: 'user', content: it.input }, { role: 'assistant', content: answer }] }) + '\n');
      kept++;
    } else { appendFileSync(REJECTED, JSON.stringify(row) + '\n'); rejected++; }
  } catch (e) { failed++; console.log(`  ✗ ${it.skill}: ${String(e.message || e).slice(0, 160)}`); }
}
const CONCURRENCY = 4;
for (let i = 0; i < todo.length; i += CONCURRENCY) {
  await Promise.all(todo.slice(i, i + CONCURRENCY).map(work));
  process.stdout.write(`\r  ${Math.min(i + CONCURRENCY, todo.length)}/${todo.length} · kept ${kept} · rejected ${rejected} · failed ${failed}`);
}
console.log(`\nTeacher pass done: kept ${kept}, rejected ${rejected}, failed ${failed} (failed ones are retried on the next run). Next: node training/build-pm-8b-mix.mjs`);
