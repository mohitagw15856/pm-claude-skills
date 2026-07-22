// `pm-claude-skills test <skill>` — the author's test bench.
// Run a skill against its eval case (evals/cases.json) with the library's judge
// and see the score, the rubric breakdown, and variance across repeated runs —
// locally, before you open a PR. Lowers the barrier to contributing a skill that
// actually holds up.
//
//   npx pm-claude-skills test executive-update            # 1 run, scored
//   npx pm-claude-skills test executive-update --runs 3   # variance across runs
//   npx pm-claude-skills test executive-update --input "your own test input"
//   npx pm-claude-skills test executive-update --dry-run  # no API; show the case
// Needs ANTHROPIC_API_KEY (unless --dry-run).
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete } from './lib/anthropic.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const RUBRIC = [
  ['structure', 'Would a senior professional recognise the artifact\'s shape? Right sections, right order.'],
  ['completeness', 'Are the load-bearing sections present and specific (not placeholder)?'],
  ['usefulness', 'Could the reader act on it without a rewrite?'],
  ['grounding', 'Does it use the input\'s facts, label assumptions, and avoid fabrication?'],
];

function parseArgs(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') o.dryRun = true;
    else if (a === '--json') o.json = true;
    else if (a === '--runs') o.runs = Number(argv[++i]);
    else if (a === '--input') o.input = argv[++i];
    else if (a === '--model') o.model = argv[++i];
    else if (!a.startsWith('--')) o._.push(a);
  }
  return o;
}

function loadSkill(name) {
  const sj = join(ROOT, 'web', 'skills.json');
  if (existsSync(sj)) {
    const s = (JSON.parse(readFileSync(sj, 'utf8')).skills || []).find((x) => x.name === name);
    if (s) return { title: s.title, body: s.body || s.instructions || s.description };
  }
  const p = join(ROOT, 'skills', name, 'SKILL.md');
  if (existsSync(p)) { const raw = readFileSync(p, 'utf8'); return { title: name, body: raw.replace(/^---[\s\S]*?---\n/, '') }; }
  return null;
}

function evalInput(name) {
  const p = join(ROOT, 'evals', 'cases.json');
  if (!existsSync(p)) return null;
  const cases = JSON.parse(readFileSync(p, 'utf8')).cases || [];
  const c = cases.find((x) => x.skill === name);
  return c ? c.input : null;
}

const judgePrompt = (title, input, output) => `You are grading the output of a professional skill ("${title}") on a 1-5 rubric.

RUBRIC:
${RUBRIC.map(([k, d], i) => `${i + 1}. ${k} — ${d}`).join('\n')}

THE INPUT THE SKILL WAS GIVEN:
"""${input}"""

THE SKILL'S OUTPUT:
"""${String(output).slice(0, 8000)}"""

Score each dimension 1-5. Return STRICT JSON only:
{"structure": n, "completeness": n, "usefulness": n, "grounding": n, "overall": <mean, one decimal>, "fix": "the single highest-impact improvement, one sentence"}`;

export async function run(argv) {
  const o = parseArgs(argv);
  const name = o._[0];
  if (!name) { console.error('Usage: pm-claude-skills test <skill> [--runs N] [--input "..."] [--dry-run]'); return 1; }
  const skill = loadSkill(name);
  if (!skill) { console.error(`No skill named "${name}". Try: pm-claude-skills search ${name}`); return 1; }
  const input = o.input || evalInput(name);
  if (!input) { console.error(`No eval case for "${name}" in evals/cases.json — pass --input "..." to test it.`); return 1; }

  if (o.dryRun) {
    console.log(`Skill:  ${skill.title} (${name})`);
    console.log(`Input:  ${String(input).slice(0, 200)}${input.length > 200 ? '…' : ''}`);
    console.log(`Rubric: ${RUBRIC.map((r) => r[0]).join(', ')}`);
    console.log(`Would run ${o.runs || 1}× and judge (needs ANTHROPIC_API_KEY).`);
    return 0;
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { console.error('Set ANTHROPIC_API_KEY (or use --dry-run).'); return 1; }

  const runs = Math.max(1, o.runs || 1);
  const scores = [];
  for (let i = 0; i < runs; i++) {
    const output = await complete({ apiKey: key, model: o.model, system: skill.body, messages: [{ role: 'user', content: input }], maxTokens: 2000 });
    const raw = await complete({ apiKey: key, model: 'claude-sonnet-4-6', system: 'You are a strict, fair evaluator. Output only the requested JSON.', messages: [{ role: 'user', content: judgePrompt(skill.title, input, output) }], maxTokens: 400 });
    let v; try { v = JSON.parse(String(raw).match(/\{[\s\S]*\}/)[0]); } catch { v = null; }
    if (v) { scores.push(v); if (!o.json) console.log(`run ${i + 1}: ${v.overall}/5  (S${v.structure} C${v.completeness} U${v.usefulness} G${v.grounding})  — ${v.fix}`); }
  }
  if (!scores.length) { console.error('Judge returned no parseable scores.'); return 1; }
  const mean = scores.reduce((a, s) => a + Number(s.overall), 0) / scores.length;
  const overalls = scores.map((s) => Number(s.overall));
  const spread = Math.max(...overalls) - Math.min(...overalls);
  const verdict = mean >= 4 ? 'PASS' : mean >= 3 ? 'WEAK' : 'FAIL';

  if (o.json) { console.log(JSON.stringify({ skill: name, runs: scores, mean: Number(mean.toFixed(2)), spread, verdict }, null, 2)); return mean >= 3 ? 0 : 1; }
  console.log(`\n${verdict} — mean ${mean.toFixed(2)}/5${runs > 1 ? ` · spread ${spread.toFixed(1)} across ${runs} runs${spread >= 1 ? ' (high variance ⚠ — tighten the skill)' : ''}` : ''}`);
  console.log(mean >= 4 ? 'Ship it.' : 'Below the L3 bar (4.0). Address the "fix" note above and re-test.');
  return mean >= 3 ? 0 : 1;
}
