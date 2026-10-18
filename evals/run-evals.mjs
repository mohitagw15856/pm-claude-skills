#!/usr/bin/env node
// Skill eval harness. For each case × model: run the skill, then score the output
// with an LLM judge on a fixed rubric. Writes evals/results.json — feed it to
// scripts/build-leaderboard.mjs to render web/leaderboard.html.
//
// Requires an Anthropic API key (this calls the API and costs tokens).
//
// Cost controls (defaults are cheap: 1 model + a Sonnet judge):
//   --dry-run            print the plan + rough $ estimate, make NO API calls
//   --changed            only score skills whose SKILL.md changed vs --base (CI/PRs)
//   --max-skills N        hard cap on how many skills to score this run
//   --base <ref>          base git ref for --changed (default origin/main)
//   (unchanged skills are skipped automatically via a content hash; --force re-scores)
//
// Targeted scoring (for the "Evaluate selected bundles" Action — prior scores are kept):
//   --bundles a,b,c      only score skills in these bundles (needs web/skills.json)
//   --skills x,y         only score these specific skills
//   --unevaluated        only score skills that have no score yet in --out (add new ones)
//   --save-outputs <dir> keep each skill's input, output and scores in <dir>/<skill>.md
//
// Usage:
//   ANTHROPIC_API_KEY=sk-ant-... node evals/run-evals.mjs               # cheap full run
//   node evals/run-evals.mjs --dry-run                                  # estimate only
//   node evals/run-evals.mjs --changed                                  # only changed skills
//   node evals/run-evals.mjs --models claude-sonnet-4-6,claude-haiku-4-5-20251001 --judge claude-opus-4-8  # official run
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { complete, parseSkill } from '../bin/lib/anthropic.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : def;
}
const has = (name) => process.argv.includes(`--${name}`);

const apiKey = process.env.ANTHROPIC_API_KEY || '';
// Cost-optimized defaults: one run model + a Sonnet judge (Opus judging was ~5× the cost
// for a 1–5 rubric it doesn't need). Override with --models / --judge for an "official" run.
const models = arg('models', 'claude-sonnet-4-6').split(',').map((s) => s.trim());
const judge = arg('judge', 'claude-sonnet-4-6');
const casesPath = arg('cases', join(__dirname, 'cases.json'));
const outPath = arg('out', join(__dirname, 'results.json'));
const maxSkills = parseInt(arg('max-skills', '0'), 10) || 0; // 0 = no cap
const onlyChanged = has('changed');   // only skills whose SKILL.md changed vs the base ref
const force = has('force');           // re-score even if unchanged since last run
const dryRun = has('dry-run');        // print the plan + cost estimate, make no API calls
const baseRef = arg('base', 'origin/main');
// --save-outputs <dir>: write each skill's input, output and scores to <dir>/<skill>.md,
// so a low score can be read and diagnosed instead of guessed at.
const saveDir = arg('save-outputs', '');

// Targeted scoring (used by the "Evaluate selected bundles" workflow): score only the
// skills in chosen bundles / an explicit skill list, optionally only the not-yet-scored
// ones. Empty filters = score everything in the case set (the existing behaviour).
const onlyBundles = new Set((arg('bundles', '') || '').split(',').map((s) => s.trim()).filter(Boolean));
const onlySkills = new Set((arg('skills', '') || '').split(',').map((s) => s.trim()).filter(Boolean));
const onlyUnevaluated = has('unevaluated'); // skip skills that already have any score in --out

// Map each skill to its bundle (plugin) so --bundles can filter. Built from web/skills.json
// (the catalog artifact); if it's missing, --bundles is a no-op with a warning.
let skillBundle = new Map();
if (onlyBundles.size) {
  const sj = join(root, 'web', 'skills.json');
  if (existsSync(sj)) {
    const data = JSON.parse(readFileSync(sj, 'utf8'));
    const list = Array.isArray(data) ? data : (data.skills || []);
    skillBundle = new Map(list.map((s) => [s.name, s.plugin]));
  } else {
    process.stderr.write('::warning:: --bundles given but web/skills.json missing — run `node web/build-skills.mjs` first. Ignoring --bundles.\n');
    onlyBundles.clear();
  }
}

// Rough $ per (generation + judge) call pair, for a pre-run estimate only.
const APPROX_COST = { 'claude-opus-4-8': 0.09, 'claude-sonnet-4-6': 0.02, 'claude-haiku-4-5-20251001': 0.006 };
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

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
  // Robust: strip code fences, try JSON, then fall back to a per-dimension regex so a
  // judge that wraps the JSON in prose (or omits a brace) still yields scores.
  const clean = String(text || '').replace(/```[a-z]*|```/gi, '');
  let j = null;
  const m = clean.match(/\{[\s\S]*\}/);
  if (m) { try { j = JSON.parse(m[0]); } catch (_) {} }
  const s = {};
  for (const d of DIMENSIONS) {
    let v = j && j[d] != null ? Number(j[d]) : NaN;
    if (!(v >= 1)) {
      const mm = clean.match(new RegExp('"?' + d + '"?\\s*[:=]\\s*(\\d+(?:\\.\\d+)?)', 'i'));
      if (mm) v = Number(mm[1]);
    }
    if (!(v >= 1)) throw new Error('judge returned no score for "' + d + '"');
    s[d] = Math.max(1, Math.min(5, v));
  }
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

async function scoreTask({ c, body, description, model, hash }) {
  try {
    const output = await complete({ apiKey, model, system: runPrompt(body), messages: [{ role: 'user', content: c.input }], maxTokens: 3000 });
    if (!output || !output.trim()) throw new Error('skill produced no output');
    let scores;
    try {
      scores = parseScores(await complete({ apiKey, model: judge, messages: [{ role: 'user', content: judgePrompt(description, output) }], maxTokens: 300 }));
    } catch (_) {
      // One stricter retry — the judge occasionally wraps or malforms the JSON.
      const retry = await complete({ apiKey, model: judge, maxTokens: 300, messages: [{ role: 'user', content: judgePrompt(description, output) + '\n\nReturn ONLY this JSON on one line, nothing else: {"structure":N,"completeness":N,"usefulness":N,"grounding":N}' }] });
      scores = parseScores(retry);
    }
    const overall = DIMENSIONS.reduce((a, d) => a + scores[d], 0) / DIMENSIONS.length;
    process.stderr.write(`✓ ${c.skill} on ${model} — ${overall.toFixed(2)}/5\n`);
    if (saveDir) {
      mkdirSync(saveDir, { recursive: true });
      writeFileSync(join(saveDir, `${c.skill}.md`), `# ${c.skill} (${model}): ${overall.toFixed(2)}/5\n\nScores: ${JSON.stringify(scores)}\nOutput length: ${output.length} characters\n\n## Input\n\n${c.input}\n\n## Output\n\n${output}\n`);
    }
    return { skill: c.skill, model, scores, overall: Math.round(overall * 100) / 100, hash };
  } catch (e) {
    process.stderr.write(`✗ ${c.skill} on ${model} — FAILED (${e.message})\n`);
    return null;
  }
}

// Skills whose SKILL.md changed vs the base git ref (for --changed / CI on a PR).
function changedSkills() {
  try {
    if (!/^[\w./-]+$/.test(baseRef)) return new Set();
    const diff = (range) => execFileSync('git', ['diff', '--name-only', range, '--', 'skills/'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    let out;
    try { out = diff(`${baseRef}...HEAD`); } catch { out = diff(baseRef); }
    return new Set(out.split('\n').map((l) => (l.match(/^skills\/([^/]+)\//) || [])[1]).filter(Boolean));
  } catch { return new Set(); }
}

async function main() {
  const concurrency = parseInt(arg('concurrency', '2'), 10) || 2;
  const { cases } = JSON.parse(readFileSync(casesPath, 'utf8'));
  const prior = existsSync(outPath) ? (JSON.parse(readFileSync(outPath, 'utf8')).results || []) : [];
  const priorByKey = new Map(prior.map((r) => [`${r.skill}|${r.model}`, r]));
  const changed = onlyChanged ? changedSkills() : null;

  // Build the task list, deciding per (skill × model) whether to run, skip-reuse, or drop.
  const toRun = [], reused = [], dropped = [];
  for (const c of cases) {
    const skillFile = join(root, 'skills', c.skill, 'SKILL.md');
    if (!existsSync(skillFile)) { dropped.push(c.skill); continue; }
    // Targeted filters: keep any prior score for skills we're not asked to evaluate, but
    // don't (re)run them. Lets the bundle workflow score just the chosen/new bundles cheaply.
    if (onlySkills.size && !onlySkills.has(c.skill)) {
      for (const model of models) { const p = priorByKey.get(`${c.skill}|${model}`); if (p) reused.push(p); }
      continue;
    }
    if (onlyBundles.size && !onlyBundles.has(skillBundle.get(c.skill))) {
      for (const model of models) { const p = priorByKey.get(`${c.skill}|${model}`); if (p) reused.push(p); }
      continue;
    }
    if (onlyUnevaluated && models.some((model) => priorByKey.has(`${c.skill}|${model}`))) {
      for (const model of models) { const p = priorByKey.get(`${c.skill}|${model}`); if (p) reused.push(p); }
      continue;
    }
    if (changed && !changed.has(c.skill)) { // --changed: keep prior score, don't re-run
      for (const model of models) { const p = priorByKey.get(`${c.skill}|${model}`); if (p) reused.push(p); }
      continue;
    }
    const { meta, body } = parseSkill(readFileSync(skillFile, 'utf8'));
    const hash = sha(body + ' ' + c.input);
    for (const model of models) {
      const p = priorByKey.get(`${c.skill}|${model}`);
      // Reuse a prior score when it's unchanged — OR when it predates hashing (no hash
      // recorded), so a re-run only scores genuinely new/changed skills, not the whole library.
      if (!force && p && (!p.hash || p.hash === hash)) reused.push(p);
      else toRun.push({ c, body, description: meta.description || c.skill, model, hash });
    }
  }
  if (maxSkills && toRun.length > maxSkills * models.length) toRun.length = maxSkills * models.length;

  // Each task = one generation (run model) + one judge call. Count both.
  const judgeCost = APPROX_COST[judge] || 0.02;
  const est = toRun.reduce((a, t) => a + (APPROX_COST[t.model] || 0.02) + judgeCost, 0);
  process.stderr.write(
    `Plan: ${toRun.length} run(s) to score, ${reused.length} reused (unchanged), ${dropped.length} dropped.\n` +
    `Judge: ${judge}${judge.includes('opus') ? ' ⚠️ (Opus — ~5× a Sonnet judge; pass --judge claude-sonnet-4-6 to cut cost)' : ''} · models: ${models.join(', ')} · est. cost ≈ $${est.toFixed(2)} (rough, incl. judge).\n`);
  if (dryRun) { process.stderr.write('Dry run — no API calls made.\n'); return; }
  if (!toRun.length) { process.stderr.write('Nothing to score; results are up to date.\n'); }
  if (toRun.length && !apiKey) { console.error('Set ANTHROPIC_API_KEY to run evals.'); process.exit(1); }

  const fresh = (await pool(toRun, concurrency, scoreTask)).filter(Boolean);
  // A run where every call failed (a bad key, no credit) must not touch the results file.
  if (toRun.length && !fresh.length) { console.error(`\nAll ${toRun.length} run(s) failed; ${outPath} left unchanged.`); process.exit(1); }

  // Merge: every prior score is kept unless this run re-scored it. Building only from
  // this run's tasks used to drop scores it did not touch (capped runs, other models).
  const merged = new Map(prior.map((r) => [`${r.skill}|${r.model}`, r]));
  for (const r of reused) merged.set(`${r.skill}|${r.model}`, r);
  for (const r of fresh) merged.set(`${r.skill}|${r.model}`, r);
  const results = [...merged.values()].sort((a, b) => a.skill.localeCompare(b.skill));

  const out = { generatedAt: new Date().toISOString(), judge, models, dimensions: DIMENSIONS, results };
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`\nWrote ${outPath} — ${fresh.length} newly scored, ${reused.length} reused, ${results.length} total. Build the page: node scripts/build-leaderboard.mjs`);
}

main();
