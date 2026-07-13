#!/usr/bin/env node
// Self-improving library — the driver behind the "Self-improve skills" Action.
//
// Two phases, run either side of a re-eval so we only keep genuine wins:
//
//   1. node scripts/self-improve.mjs --pick 5          (needs ANTHROPIC_API_KEY)
//        Picks the N lowest-scoring skills from evals/results.json, asks a model
//        to rewrite each SKILL.md against the rubric, and writes a manifest of
//        {skill, oldScore, backupPath} to .self-improve.json.
//
//   2. node evals/run-evals.mjs --skills a,b,c --models <judge>   (re-score them)
//
//   3. node scripts/self-improve.mjs --reconcile
//        Compares new vs old overall score per skill; REVERTS any that didn't
//        beat their old score, keeps the wins, and prints a summary (+ sets
//        GITHUB_OUTPUT `improved=` for the workflow to decide whether to PR).
//
// It never merges anything — a human reviews the PR. Cost is bounded by --pick.
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = join(root, '.self-improve.json');
const BACKUP_DIR = join(root, '.self-improve-backups');
const RESULTS = join(root, 'evals', 'results.json');
const MODEL = process.env.IMPROVE_MODEL || 'claude-sonnet-4-6';

const arg = (name, def) => {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 ? (process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true) : def;
};
const skillFile = (name) => join(root, 'skills', name, 'SKILL.md');
const setOutput = (k, v) => { if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`, { flag: 'a' }); };

function overallBySkill() {
  const data = JSON.parse(readFileSync(RESULTS, 'utf8'));
  const map = new Map();
  for (const r of data.results) {
    // keep the lowest score per skill across models (the weakest showing)
    if (!map.has(r.skill) || r.overall < map.get(r.skill)) map.set(r.skill, r.overall);
  }
  return map;
}

async function rewrite(name, current) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY is required for --pick.');
  const system = `You are improving a professional Agent Skill (a SKILL.md file). Rewrite it so it scores higher on this rubric: STRUCTURE (clear sections + output template), COMPLETENESS (covers required inputs, process, quality checks, anti-patterns, trigger phrases), USEFULNESS (specific, senior-level, not generic), GROUNDING (tells the model to ask for missing inputs and never fabricate facts/quotes/metrics).

Hard rules:
- Keep the YAML frontmatter's \`name\` EXACTLY the same. You may sharpen the \`description\` but keep its meaning and the "Use when… Produces…" shape.
- Return ONLY the full new SKILL.md content (frontmatter + body). No preamble, no code fences.
- Keep it a general, reusable skill — do not invent domain facts, numbers, or examples presented as real.`;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: MODEL, max_tokens: 4000, system, messages: [{ role: 'user', content: `Here is the current SKILL.md for "${name}". Improve it:\n\n${current}` }] }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  let out = (j.content || []).map((c) => c.text || '').join('').trim();
  out = out.replace(/^```(?:markdown|md)?\n?/, '').replace(/\n?```$/, '').trim();
  if (!out.startsWith('---') || !new RegExp(`name:\\s*${name}\\b`).test(out)) {
    throw new Error(`rewrite for ${name} did not preserve frontmatter/name`);
  }
  return out + '\n';
}

async function pick() {
  const n = parseInt(arg('pick', 5), 10) || 5;
  const scores = overallBySkill();
  const candidates = [...scores.entries()]
    .filter(([name]) => existsSync(skillFile(name)))
    .sort((a, b) => a[1] - b[1])
    .slice(0, n);
  if (!candidates.length) { console.log('No scored skills found to improve.'); setOutput('picked', 0); return; }

  rmSync(BACKUP_DIR, { recursive: true, force: true });
  mkdirSync(BACKUP_DIR, { recursive: true });
  const manifest = [];
  for (const [name, oldScore] of candidates) {
    const path = skillFile(name);
    const current = readFileSync(path, 'utf8');
    process.stdout.write(`Improving ${name} (was ${oldScore})… `);
    try {
      const improved = await rewrite(name, current);
      const backup = join(BACKUP_DIR, `${name}.md`);
      cpSync(path, backup);
      writeFileSync(path, improved);
      manifest.push({ skill: name, oldScore, backup });
      console.log('rewritten');
    } catch (e) {
      console.log(`skipped (${e.message})`);
    }
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`\nRewrote ${manifest.length} skill(s). Re-eval them, then run --reconcile.`);
  setOutput('picked', manifest.length);
  setOutput('skills', manifest.map((m) => m.skill).join(','));
}

function reconcile() {
  if (!existsSync(MANIFEST)) { console.log('No manifest — nothing to reconcile.'); setOutput('improved', 0); return; }
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const newScores = overallBySkill();
  const kept = [], reverted = [];
  for (const { skill, oldScore, backup } of manifest) {
    const now = newScores.get(skill);
    if (now != null && now > oldScore) {
      kept.push({ skill, oldScore, newScore: now });
    } else {
      // regression or no gain — restore the original file
      if (existsSync(backup)) cpSync(backup, skillFile(skill));
      reverted.push({ skill, oldScore, newScore: now ?? 'n/a' });
    }
  }
  console.log('KEPT (improved):');
  kept.forEach((k) => console.log(`  ${k.skill}: ${k.oldScore} → ${k.newScore}`));
  console.log('REVERTED (no gain):');
  reverted.forEach((r) => console.log(`  ${r.skill}: ${r.oldScore} → ${r.newScore}`));
  rmSync(MANIFEST, { force: true });
  rmSync(BACKUP_DIR, { recursive: true, force: true });
  setOutput('improved', kept.length);
  setOutput('summary', kept.map((k) => `${k.skill} ${k.oldScore}→${k.newScore}`).join(', '));
}

if (arg('reconcile')) reconcile();
else await pick();
