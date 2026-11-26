#!/usr/bin/env node
// Launch-day verdict: after SkillBench runs on a newly released model, say for
// each skill whether it still earns its place on that model. Uplift is the
// skilled score minus the bare score on the same task (1 to 5 rubric):
//
//   keeps helping   uplift >= +0.25   the skill adds real value on this model
//   neutral         |uplift| < 0.25   the model does this well enough alone; review the skill
//   hurts           uplift <= -0.25   the skill makes this model worse; retune it first
//
// It also compares with a baseline model (the previous run by default), so a
// skill that helped the old model and stopped helping the new one stands out.
// Reads results only; makes no API calls.
//
//   node scripts/launch-verdict.mjs --model <id> [--baseline <id>] [--results skillbench/results.json] [--out <file>]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (k, d = null) => { const i = args.indexOf(`--${k}`); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const model = opt('model');
if (!model) { console.error('Usage: launch-verdict.mjs --model <id> [--baseline <id>] [--results file] [--out file]'); process.exit(2); }
const resultsPath = resolve(opt('results', join(root, 'skillbench', 'results.json')));
const runs = JSON.parse(readFileSync(resultsPath, 'utf8')).runs || [];
const run = runs.find((r) => r.model === model);
if (!run) { console.error(`✗ no SkillBench run for ${model} in ${resultsPath}`); process.exit(1); }
const others = runs.filter((r) => r.model !== model && r.taskSetVersion === run.taskSetVersion);
const baseName = opt('baseline');
const base = baseName ? others.find((r) => r.model === baseName) : others.sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];
if (baseName && !base) { console.error(`✗ no run for baseline ${baseName} on task set v${run.taskSetVersion}`); process.exit(1); }

const T = 0.25;
const num = (x) => (typeof x === 'number' && Number.isFinite(x) ? x : null);
const sign = (x) => (x > 0 ? '+' : '') + x.toFixed(2);
const verdictOf = (u) => (u >= T ? 'keeps helping' : u <= -T ? 'hurts' : 'neutral');
const baseTask = new Map((base?.tasks || []).map((t) => [t.task, t]));
const rows = (run.tasks || []).filter((t) => num(t.bare) !== null && num(t.skilled) !== null).map((t) => {
  const uplift = t.skilled - t.bare;
  const b = baseTask.get(t.task);
  const was = b && num(b.bare) !== null && num(b.skilled) !== null ? b.skilled - b.bare : null;
  return { task: t.task, domain: t.domain || '', bare: t.bare, skilled: t.skilled, uplift, verdict: verdictOf(uplift), was, change: was === null ? '' : verdictOf(was) === verdictOf(uplift) ? '' : `${verdictOf(was)} → ${verdictOf(uplift)}` };
}).sort((a, b) => a.uplift - b.uplift);
if (!rows.length) { console.error(`✗ the run for ${model} has no per-task scores`); process.exit(1); }

const count = (v) => rows.filter((r) => r.verdict === v).length;
const md = [
  `# Launch-day verdict: ${model}`,
  '',
  `SkillBench task set v${run.taskSetVersion}, run ${run.date}, judge ${run.judge || 'not recorded'}.${base ? ` Baseline: ${base.model} (run ${base.date}).` : ' No baseline run on this task set.'}`,
  '',
  `| Overall | Score |`,
  `|---|---|`,
  `| With skills | ${num(run.score) !== null ? run.score.toFixed(2) : 'n/a'} / 5 |`,
  `| Bare | ${num(run.bare) !== null ? run.bare.toFixed(2) : 'n/a'} / 5 |`,
  `| Uplift | ${num(run.score) !== null && num(run.bare) !== null ? sign(run.score - run.bare) : 'n/a'} |`,
  '',
  `**${count('keeps helping')} keep helping, ${count('neutral')} neutral, ${count('hurts')} hurt** (threshold ±${T}).`,
  '',
  `| Skill | Domain | Bare | With skill | Uplift | Verdict | ${base ? `Uplift on ${base.model}` : 'Baseline'} | Changed |`,
  '|---|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.task} | ${r.domain} | ${r.bare.toFixed(2)} | ${r.skilled.toFixed(2)} | ${sign(r.uplift)} | ${r.verdict} | ${r.was === null ? 'n/a' : sign(r.was)} | ${r.change} |`),
  '',
  '## What to do',
  '',
  '- **Hurts:** retune the skill before recommending it on this model. Read the saved outputs (run SkillBench with --save-outputs) to see what the skill pushed the model into.',
  '- **Neutral:** the model now does this task well unaided. Keep the skill if it adds structure people rely on; otherwise mark it for review.',
  '- **Changed:** a skill whose verdict moved since the baseline is the first thing to read.',
  '',
  `Caveats: one run, one judge, ${rows.length} tasks. A launch-day signal, not a final ranking.`,
  '',
].join('\n');
const out = resolve(opt('out', join(root, 'skillbench', 'reports', `verdict-${model.replace(/[^a-zA-Z0-9.-]/g, '_')}-${run.date}.md`)));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, md);
console.log(`Wrote ${out.replace(root + '/', '')}: ${count('keeps helping')} keep helping, ${count('neutral')} neutral, ${count('hurts')} hurt.`);
