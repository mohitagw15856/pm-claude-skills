#!/usr/bin/env node
// Self-improving skills. For a skill with an eval case: run it, judge it on the
// same rubric the leaderboard uses, ask the judge model to critique the output,
// rewrite the SKILL.md body to fix the weaknesses, then re-run and re-judge. The
// rewrite is kept ONLY if it scores higher than the original — and every kept
// improvement is logged to SKILL-IMPROVEMENTS.md.
//
//   ANTHROPIC_API_KEY=... node scripts/improve-skill.mjs roadmap-narrative
//   ANTHROPIC_API_KEY=... node scripts/improve-skill.mjs --all          # every eval-case skill
//   ... --min-gain 0.3   (default 0.25 — required overall improvement to keep)
//   ... --dry-run         (don't write files; just report)
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete, parseSkill } from '../bin/lib/anthropic.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiKey = process.env.ANTHROPIC_API_KEY || '';
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : d; };
const RUN_MODEL = arg('model', 'claude-sonnet-4-6');
const JUDGE = arg('judge', 'claude-sonnet-4-6'); // cost-optimized; pass --judge claude-opus-4-8 for a stricter pass
const MIN_GAIN = parseFloat(arg('min-gain', '0.25'));
const DRY = process.argv.includes('--dry-run');
const DIMENSIONS = ['structure', 'completeness', 'usefulness', 'grounding'];

const runPrompt = (body) => body + '\n\n---\nExecute this skill now on the input. Output only the finished artifact.';
const judgePrompt = (description, output) => `You are a strict evaluator of a professional work artifact.

The artifact was produced by a skill whose job is:
"${description}"

Score it from 1 (poor) to 5 (excellent) on each dimension:
- structure: follows a clear, expected structure
- completeness: covers what the task needs, nothing important missing
- usefulness: actually useful to a professional, specific not generic
- grounding: stays grounded in the given input, no invented facts/metrics

Return ONLY JSON: {"structure":N,"completeness":N,"usefulness":N,"grounding":N}

--- ARTIFACT ---
${output}`;

function parseScores(text) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('judge did not return JSON');
  const j = JSON.parse(m[0]);
  const s = {};
  for (const d of DIMENSIONS) s[d] = Math.max(1, Math.min(5, Number(j[d]) || 0));
  return s;
}
const overallOf = (s) => Math.round((DIMENSIONS.reduce((a, d) => a + s[d], 0) / DIMENSIONS.length) * 100) / 100;

async function evalBody({ body, description, input }) {
  const output = await complete({ apiKey, model: RUN_MODEL, system: runPrompt(body), messages: [{ role: 'user', content: input }], maxTokens: 3000 });
  const judged = await complete({ apiKey, model: JUDGE, messages: [{ role: 'user', content: judgePrompt(description, output) }], maxTokens: 200 });
  const scores = parseScores(judged);
  return { output, scores, overall: overallOf(scores) };
}

// Frontmatter is preserved; only the body is rewritten.
function splitFrontmatter(text) {
  const m = text.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: text };
}

async function improve(skill) {
  const file = join(root, 'skills', skill, 'SKILL.md');
  if (!existsSync(file)) { console.error(`skip ${skill}: no SKILL.md`); return; }
  const cases = JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases;
  const input = (cases.find((c) => c.skill === skill) || {}).input;
  if (!input) { console.error(`skip ${skill}: no eval case in evals/cases.json`); return; }

  const raw = readFileSync(file, 'utf8');
  const { fm, body } = splitFrontmatter(raw);
  const { meta } = parseSkill(raw);
  const description = meta.description || skill;

  process.stderr.write(`\n● ${skill}: scoring baseline…\n`);
  const base = await evalBody({ body, description, input });
  process.stderr.write(`  baseline ${base.overall}/5  ${JSON.stringify(base.scores)}\n`);

  // Critique: where did the output fall short, and what should the skill instruct?
  const critique = await complete({
    apiKey, model: JUDGE, maxTokens: 700,
    messages: [{ role: 'user', content:
`A skill ("${description}") produced the artifact below and scored ${base.overall}/5 (${DIMENSIONS.map((d) => d + ' ' + base.scores[d]).join(', ')}).

Give 3–6 specific, actionable INSTRUCTIONS to add to or change in the skill's prompt so its output scores higher on structure, completeness, usefulness, and grounding. Focus on the weakest dimensions. Be concrete (e.g. "require a section X", "infer and label missing numbers instead of leaving blanks"). Output a plain bullet list, nothing else.

--- ARTIFACT ---
${base.output}` }],
  });

  // Rewrite the body addressing the critique; preserve purpose, format, and frontmatter.
  const newBody = (await complete({
    apiKey, model: JUDGE, maxTokens: 4000,
    messages: [{ role: 'user', content:
`Here is the body of a SKILL.md file (instructions for an AI to produce a professional artifact). Rewrite it to fix the weaknesses in the critique, while keeping its purpose, voice, and overall structure. Keep it tight and instructional. Do NOT include YAML frontmatter or any commentary — output ONLY the new Markdown body.

CRITIQUE:
${critique.trim()}

CURRENT BODY:
${body.trim()}` }],
  })).trim();

  process.stderr.write(`  scoring rewrite…\n`);
  const next = await evalBody({ body: newBody, description, input });
  const gain = Math.round((next.overall - base.overall) * 100) / 100;
  process.stderr.write(`  rewrite ${next.overall}/5  (gain ${gain >= 0 ? '+' : ''}${gain})\n`);

  if (gain >= MIN_GAIN) {
    if (!DRY) {
      writeFileSync(file, fm + newBody + '\n');
      appendFileSync(join(root, 'SKILL-IMPROVEMENTS.md'),
        `- **${skill}** — ${base.overall} → ${next.overall} (+${gain}) on ${new Date().toISOString().slice(0, 10)}\n`);
    }
    console.log(`✅ ${skill}: improved ${base.overall} → ${next.overall} (+${gain})${DRY ? ' [dry-run]' : ' — SKILL.md updated'}`);
    return { skill, kept: true, from: base.overall, to: next.overall };
  }
  console.log(`— ${skill}: kept original (${base.overall}; rewrite ${next.overall}, gain ${gain} < ${MIN_GAIN})`);
  return { skill, kept: false, from: base.overall, to: next.overall };
}

async function main() {
  if (!apiKey) { console.error('Set ANTHROPIC_API_KEY to run.'); process.exit(1); }
  let targets = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (process.argv.includes('--all')) {
    targets = JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases.map((c) => c.skill);
  }
  if (!targets.length) { console.error('Usage: improve-skill.mjs <skill> [...] | --all'); process.exit(1); }

  // Ensure the changelog has a header.
  const log = join(root, 'SKILL-IMPROVEMENTS.md');
  if (!DRY && !existsSync(log)) writeFileSync(log, '# 🔁 Skill Improvements\n\nAutomatic, eval-driven improvements (kept only when the rewrite scores higher). Generated by `scripts/improve-skill.mjs`.\n\n');

  for (const t of targets) {
    try { await improve(t); } catch (e) { console.error(`✗ ${t}: ${e.message}`); }
  }
}

main();
