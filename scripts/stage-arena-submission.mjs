#!/usr/bin/env node
// Turn one SkillBench run into an Agent Arena submission (docs/arena.md):
// skillbench/community/<model>.json, holding only that run plus its provenance.
// Validates with the same rules as tests/checks/arena.mjs before writing.
//
//   node scripts/stage-arena-submission.mjs --results /tmp/byo.json --model my-model \
//     [--agent "My agent 2.1"] (--run <GitHub Actions run URL> | --outputs <https link to saved outputs>)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSubmission } from './lib/arena.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const resultsPath = arg('results'), model = arg('model');
if (!resultsPath || !model) { console.error('Usage: --results <file> --model <id> [--agent <label>] (--run <url> | --outputs <url>)'); process.exit(2); }

// The run adapters' route prefixes (local:, hf:, …) are how the model was reached, not its name.
const bare = (m) => String(m).replace(/^(local|local-judge|modelscope|hf|sf|cf):/, '');
const results = JSON.parse(readFileSync(resultsPath, 'utf8'));
const run = (results.runs || []).find((r) => bare(r.model) === bare(model));
if (!run) { console.error(`No run for ${model} in ${resultsPath}.`); process.exit(1); }
const taskSet = JSON.parse(readFileSync(join(root, 'skillbench', 'tasks.json'), 'utf8'));
const stem = bare(model).replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 100);
const sub = {
  submitted_via: arg('run') ? 'skillbench-byo' : 'local',
  ...(arg('run') ? { run: arg('run') } : { outputs: arg('outputs') }),
  ...(arg('agent') ? { agent: arg('agent') } : {}),
  runs: [{ ...run, model: bare(run.model), tasks: (run.tasks || []).map(({ task, domain, bare: b, skilled }) => ({ task, domain, bare: b, skilled })) }],
};
const errs = validateSubmission(sub, taskSet, { stem });
if (errs.length) { for (const e of errs) console.error(`✗ ${e}`); process.exit(1); }
mkdirSync(join(root, 'skillbench', 'community'), { recursive: true });
const out = join(root, 'skillbench', 'community', `${stem}.json`);
writeFileSync(out, JSON.stringify(sub, null, 2) + '\n');
console.log(`Wrote skillbench/community/${stem}.json (score ${run.score}, lift ${run.lift}). Open a pull request with it.`);
