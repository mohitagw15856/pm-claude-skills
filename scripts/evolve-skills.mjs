#!/usr/bin/env node
// The evolution loop — the library improves itself, with a referee.
//
// Reads evals/results.json, takes the lowest-scoring skills, has a CHALLENGER
// model rewrite each one against its weak dimensions, then a BLIND judge scores
// champion vs challenger without knowing which is which. The challenger only
// replaces the champion if it wins by a clear margin; everything lands on a
// branch for human review — the loop proposes, people dispose.
//
//   node scripts/evolve-skills.mjs --dry-run              # plan only: no API, no writes
//   node scripts/evolve-skills.mjs --count 3              # evolve the 3 weakest (needs ANTHROPIC_API_KEY — costs money)
//   node scripts/evolve-skills.mjs --skills a,b           # evolve specific skills
//
// COST GUARD: every skill evolved = 1 rewrite call + 2 judge calls. Never run
// without --dry-run unless spend is explicitly approved (repo standing rule).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete } from '../bin/lib/anthropic.mjs';
import { logEvolution } from './lib/evolution-log.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (n) => args.includes('--' + n);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };

const dryRun = flag('dry-run');
const count = Math.max(1, parseInt(opt('count', '3'), 10) || 3);
const only = (opt('skills', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
const model = opt('model', 'claude-sonnet-4-6');
const judgeModel = opt('judge', 'claude-haiku-4-5-20251001');
const MARGIN = 0.25;              // challenger must beat champion overall by this
const apiKey = process.env.ANTHROPIC_API_KEY;

// ── Pick the weakest skills from the last eval run ────────────────────────────
const resultsPath = join(root, 'evals', 'results.json');
if (!existsSync(resultsPath)) { console.error('evals/results.json not found — run the eval leaderboard first.'); process.exit(1); }
const evalData = JSON.parse(readFileSync(resultsPath, 'utf8'));
const scored = (evalData.results || []).filter((r) => typeof r.overall === 'number');
if (!scored.length) { console.error('evals/results.json has no scored results.'); process.exit(1); }

let picks = only.length
  ? scored.filter((r) => only.includes(r.skill))
  : [...scored].sort((a, b) => a.overall - b.overall).slice(0, count);
picks = picks.filter((r) => existsSync(join(root, 'skills', r.skill, 'SKILL.md')));
if (!picks.length) { console.error('No matching skills to evolve.'); process.exit(1); }

const dims = evalData.dimensions || ['structure', 'completeness', 'usefulness', 'grounding'];
const weakDims = (r) => dims.filter((d) => (r.scores?.[d] ?? 5) <= Math.min(...dims.map((x) => r.scores?.[x] ?? 5)));

console.log(`🧬 Evolution loop — ${picks.length} candidate(s) from eval run ${evalData.generatedAt || '?'}${dryRun ? '  [DRY RUN: no API calls, no writes]' : ''}\n`);
for (const r of picks) console.log(`  ${r.skill}: overall ${r.overall}  (weakest: ${weakDims(r).join(', ')})`);

if (dryRun) {
  console.log(`\nPlan: for each skill → 1 challenger rewrite (${model}) + blind judging (${judgeModel}, champion & challenger scored separately) → replace only if challenger wins by ≥${MARGIN}.`);
  console.log('Nothing was called or written. Re-run without --dry-run to execute (requires ANTHROPIC_API_KEY; costs money).');
  process.exit(0);
}
if (!apiKey) { console.error('ANTHROPIC_API_KEY not set. (Use --dry-run to preview without spending.)'); process.exit(1); }

// ── Blind judging: score one skill text on the eval dimensions ───────────────
async function judgeScore(text) {
  const raw = await complete({ apiKey, model: judgeModel, maxTokens: 400,
    system: `You are a strict evaluator of SKILL.md files (professional AI skill definitions). Score the skill on each dimension, integers 1-5. Return STRICT JSON only: {${dims.map((d) => `"${d}":<1-5>`).join(',')}}`,
    messages: [{ role: 'user', content: 'SKILL.md TO SCORE:\n\n' + text.slice(0, 24000) }] });
  const j = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
  const vals = dims.map((d) => Number(j[d]) || 0);
  return { scores: j, overall: vals.reduce((a, b) => a + b, 0) / vals.length };
}

const spec = existsSync(join(root, 'SKILLSPEC.md')) ? readFileSync(join(root, 'SKILLSPEC.md'), 'utf8').slice(0, 8000) : '';
const evolved = [];

for (const r of picks) {
  const path = join(root, 'skills', r.skill, 'SKILL.md');
  const champion = readFileSync(path, 'utf8');
  console.log(`\n⚔️  ${r.skill} — rewriting (weak: ${weakDims(r).join(', ')})…`);

  const challenger = (await complete({ apiKey, model, maxTokens: 8000,
    system: `You improve SKILL.md files for a curated professional skill library. Rewrite the given skill to be materially better, focusing on its measured weak dimensions: ${weakDims(r).join(', ')} (last eval: ${JSON.stringify(r.scores)}).
HARD RULES: keep the exact frontmatter \`name\`; keep valid YAML frontmatter with a description that says what it does + "Use when" + what it produces; keep/strengthen all SkillSpec L3 sections (What This Skill Produces or Required Inputs, Output, Quality Checks, Anti-Patterns); no placeholders; no invented external facts; similar length (±30%). Output ONLY the complete new SKILL.md, no commentary.
${spec ? 'THE SPEC (excerpt):\n' + spec : ''}`,
    messages: [{ role: 'user', content: champion }] })).replace(/^```(markdown|md)?\n/, '').replace(/\n```\s*$/, '');

  if (!/^---\n[\s\S]*?\n---/.test(challenger) || !challenger.includes(r.skill)) {
    console.log('   ✗ challenger malformed (frontmatter/name check failed) — champion retained'); continue;
  }

  // Blind: judge never sees labels, and each text is scored in isolation.
  const [a, b] = Math.random() < 0.5 ? [champion, challenger] : [challenger, champion];
  const [sa, sb] = [await judgeScore(a), await judgeScore(b)];
  const champScore = a === champion ? sa : sb;
  const challScore = a === champion ? sb : sa;
  console.log(`   champion ${champScore.overall.toFixed(2)} vs challenger ${challScore.overall.toFixed(2)}`);

  const won = challScore.overall >= champScore.overall + MARGIN;
  logEvolution({ skill: r.skill, loop: 'evolve', model, judge: judgeModel, before: champScore.overall, after: challScore.overall, kept: won });
  if (won) {
    writeFileSync(path, challenger.endsWith('\n') ? challenger : challenger + '\n');
    evolved.push({ skill: r.skill, from: champScore.overall, to: challScore.overall });
    console.log('   ✅ challenger wins — written (lands on a branch; humans review the PR)');
  } else {
    console.log('   🛡 champion holds — no change');
  }
}

console.log(`\nDone: ${evolved.length}/${picks.length} evolved.`);
if (evolved.length) {
  writeFileSync(join(root, 'evolve-summary.json'), JSON.stringify({ at: new Date().toISOString(), model, judge: judgeModel, evolved }, null, 2));
  console.log('Summary written to evolve-summary.json (used by the workflow for the PR body).');
}
