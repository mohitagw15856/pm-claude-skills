#!/usr/bin/env node
// Skill eval harness. For each case × model: run the skill, then score the output
// with an LLM judge on a fixed rubric. Writes evals/results.json — feed it to
// scripts/build-leaderboard.mjs to render web/leaderboard.html.
//
// Requires an Anthropic API key (this calls the API and costs tokens).
//
// Usage:
//   ANTHROPIC_API_KEY=sk-ant-... node evals/run-evals.mjs
//   ... node evals/run-evals.mjs --models claude-opus-4-8,claude-sonnet-4-6,claude-haiku-4-5-20251001
//   ... node evals/run-evals.mjs --judge claude-opus-4-8 --cases evals/cases.json
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete, parseSkill } from '../bin/lib/anthropic.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : def;
}

const apiKey = process.env.ANTHROPIC_API_KEY || '';
const models = arg('models', 'claude-sonnet-4-6,claude-haiku-4-5-20251001').split(',').map((s) => s.trim());
const judge = arg('judge', 'claude-opus-4-8');
const casesPath = arg('cases', join(__dirname, 'cases.json'));
const outPath = arg('out', join(__dirname, 'results.json'));

const DIMENSIONS = ['structure', 'completeness', 'usefulness', 'grounding'];

function runPrompt(skillBody) {
  return skillBody + '\n\n---\nExecute this skill now on the input. Output only the finished artifact.';
}

function judgePrompt(description, output) {
  return `You are a strict evaluator of a professional work artifact.

The artifact was produced by a skill whose job is:
"${description}"

Score the artifact below from 1 (poor) to 5 (excellent) on each dimension:
- structure: follows a clear, expected structure for this kind of output
- completeness: covers what the task needs, nothing important missing
- usefulness: actually useful to a professional, specific not generic
- grounding: stays grounded in the given input, no invented facts/metrics

Return ONLY a JSON object, no prose: {"structure":N,"completeness":N,"usefulness":N,"grounding":N}

--- ARTIFACT ---
${output}`;
}

function parseScores(text) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('judge did not return JSON');
  const j = JSON.parse(m[0]);
  const s = {};
  for (const d of DIMENSIONS) s[d] = Math.max(1, Math.min(5, Number(j[d]) || 0));
  return s;
}

// Run an async worker over `items` with at most `limit` in flight.
async function pool(items, limit, worker) {
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await worker(items[idx]);
    }
  }));
  return out;
}

async function scoreTask({ c, body, description, model }) {
  try {
    const output = await complete({ apiKey, model, system: runPrompt(body), messages: [{ role: 'user', content: c.input }], maxTokens: 3000 });
    const judged = await complete({ apiKey, model: judge, messages: [{ role: 'user', content: judgePrompt(description, output) }], maxTokens: 200 });
    const scores = parseScores(judged);
    const overall = DIMENSIONS.reduce((a, d) => a + scores[d], 0) / DIMENSIONS.length;
    process.stderr.write(`✓ ${c.skill} on ${model} — ${overall.toFixed(2)}/5\n`);
    return { skill: c.skill, model, scores, overall: Math.round(overall * 100) / 100 };
  } catch (e) {
    process.stderr.write(`✗ ${c.skill} on ${model} — FAILED (${e.message})\n`);
    return null;
  }
}

async function main() {
  if (!apiKey) { console.error('Set ANTHROPIC_API_KEY to run evals.'); process.exit(1); }
  const concurrency = parseInt(arg('concurrency', '2'), 10) || 2;
  const { cases } = JSON.parse(readFileSync(casesPath, 'utf8'));

  // Build the full (case × model) task list.
  const tasks = [];
  for (const c of cases) {
    const skillFile = join(root, 'skills', c.skill, 'SKILL.md');
    if (!existsSync(skillFile)) { console.error(`skip ${c.skill}: no SKILL.md`); continue; }
    const { meta, body } = parseSkill(readFileSync(skillFile, 'utf8'));
    for (const model of models) tasks.push({ c, body, description: meta.description || c.skill, model });
  }

  process.stderr.write(`Scoring ${tasks.length} runs (concurrency ${concurrency})…\n`);
  const results = (await pool(tasks, concurrency, scoreTask)).filter(Boolean);

  const out = { generatedAt: new Date().toISOString(), judge, models, dimensions: DIMENSIONS, results };
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`\nWrote ${outPath} — ${results.length}/${tasks.length} scored runs. Build the page: node scripts/build-leaderboard.mjs`);
}

main();
