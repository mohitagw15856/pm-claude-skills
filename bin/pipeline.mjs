// `pm-claude-skills pipeline` — typed skill pipelines (pipelines/<id>.json).
// A pipeline chains skills that ship a contract (schemas/skills/<name>.json):
// each step's inputs are bound to the pipeline inputs or to an earlier step's
// outputs, and the chain is validated against the contracts before any model
// call. Unlike `chain`, which passes prose forward, every step here takes and
// returns JSON that is checked against the contract.
//
//   pm-claude-skills pipeline list
//   pm-claude-skills pipeline validate [id]
//   pm-claude-skills pipeline run <id> --input inputs.json [--out-dir ./pipeline-out] [--model <m>] [--dry-run]
//
// `run` needs ANTHROPIC_API_KEY (your key, one call per step). --dry-run
// resolves the first step's inputs and prints the plan without calling anything.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete, parseSkill } from './lib/anthropic.mjs';
import { modelFor } from './lib/models.mjs';
import { loadContracts, loadPipelines, validatePipeline, resolveStepInputs, checkAgainst } from './lib/pipelines.mjs';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const getArg = (argv, name, def) => { const i = argv.indexOf('--' + name); return i !== -1 && argv[i + 1] ? argv[i + 1] : def; };

const HELP = `pipeline — run skills as a typed chain, each output feeding the next by contract.

  pm-claude-skills pipeline list                       the pipelines in pipelines/
  pm-claude-skills pipeline validate [id]              prove the chain fits the contracts (no API)
  pm-claude-skills pipeline run <id> --input in.json   run it (ANTHROPIC_API_KEY, one call per step)
      [--out-dir <dir>]   write <n>-<step>.json per step and pipeline.json (default ./pipeline-out)
      [--model <m>]       default: the "default" role in data/models.json
      [--dry-run]         resolve the plan and the first step's inputs, call nothing

Write your own: docs/PIPELINES.md. A step may only use a skill with a contract in schemas/skills/.`;

function stripFences(text) {
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (m ? m[1] : text).trim();
  const start = raw.indexOf('{'), end = raw.lastIndexOf('}');
  return start !== -1 && end > start ? raw.slice(start, end + 1) : raw;
}

export async function run(argv) {
  const sub = argv[0];
  if (!sub || sub === '--help' || sub === '-h' || sub === 'help') { console.log(HELP); return sub ? 0 : 1; }
  const contracts = loadContracts(PKG_ROOT);
  const pipelines = loadPipelines(PKG_ROOT).filter((p) => p.def);

  if (sub === 'list') {
    if (!pipelines.length) { console.log('No pipelines found.'); return 0; }
    console.log('Typed pipelines (each step bound to the next by contract):\n');
    for (const { def } of pipelines) console.log(`  ${def.id.padEnd(24)} ${def.steps.map((s) => s.skill).join(' > ')}\n  ${' '.repeat(24)} ${def.summary}`);
    console.log('\nValidate:  pm-claude-skills pipeline validate <id>    Run:  pm-claude-skills pipeline run <id> --input in.json');
    return 0;
  }

  if (sub === 'validate') {
    const id = argv[1] && !argv[1].startsWith('--') ? argv[1] : '';
    const chosen = id ? pipelines.filter((p) => p.def.id === id) : pipelines;
    if (id && !chosen.length) { console.error(`Unknown pipeline "${id}". See: pm-claude-skills pipeline list`); return 1; }
    let bad = 0;
    for (const { def } of chosen) {
      const r = validatePipeline(def, contracts);
      console.log(`${r.errors.length ? '✗' : '✓'} ${def.id}: ${def.steps.map((s) => s.skill).join(' > ')}`);
      for (const e of r.errors) console.log(`    ✗ ${e}`);
      for (const w of r.warnings) console.log(`    ! ${w}`);
      bad += r.errors.length;
    }
    return bad ? 1 : 0;
  }

  if (sub !== 'run') { console.error(`Unknown subcommand "${sub}".\n`); console.log(HELP); return 2; }

  const id = argv[1] && !argv[1].startsWith('--') ? argv[1] : '';
  const found = pipelines.find((p) => p.def.id === id);
  if (!found) { console.error(`Unknown pipeline "${id}". See: pm-claude-skills pipeline list`); return 1; }
  const def = found.def;
  const v = validatePipeline(def, contracts);
  if (v.errors.length) { console.error(`✗ ${def.id} does not validate against the contracts:`); for (const e of v.errors) console.error(`  ${e}`); return 1; }

  const inFile = getArg(argv, 'input');
  if (!inFile) { console.error('Pass --input <file.json> with the pipeline inputs. Fields: ' + Object.keys((def.inputs || {}).properties || {}).join(', ')); return 1; }
  let input;
  try { input = JSON.parse(readFileSync(inFile, 'utf8')); } catch (e) { console.error(`✗ ${inFile}: ${e.message}`); return 1; }
  const inProblems = checkAgainst(input, def.inputs || { type: 'object' }, 'inputs');
  if (inProblems.length) { for (const p of inProblems) console.error(`✗ ${p}`); return 1; }

  const dryRun = argv.includes('--dry-run');
  const outDir = resolve(getArg(argv, 'out-dir', 'pipeline-out'));
  const model = getArg(argv, 'model', modelFor('default'));
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey && !dryRun) { console.error('Set ANTHROPIC_API_KEY to run a pipeline (one API call per step), or pass --dry-run.'); return 1; }

  const ctx = { input };
  const record = { pipeline: def.id, model, started: new Date().toISOString(), steps: [] };
  if (!dryRun) mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < def.steps.length; i++) {
    const step = def.steps[i];
    const contract = contracts.get(step.skill);
    let stepInputs = {};
    if (dryRun && i > 0) {
      console.log(`${i + 1}. ${step.id} (${step.skill})`);
      console.log(`   inputs: ${Object.entries(step.inputs).map(([k, b]) => `${k} <- ${typeof b === "object" && b && b.from ? b.from : JSON.stringify(b)}`).join(", ")}`);
      continue;
    }
    try { stepInputs = resolveStepInputs(step, contract, ctx); }
    catch (e) { console.error(`✗ ${step.id}: ${e.message}`); return 1; }
    const problems = checkAgainst(stepInputs, contract.inputs, `${step.id} inputs`);
    if (problems.length) { for (const p of problems) console.error(`✗ ${p}`); return 1; }

    if (dryRun) {
      console.log(`${i + 1}. ${step.id} (${step.skill})`);
      console.log(JSON.stringify(stepInputs, null, 2).split("\n").map((l) => "   " + l).join("\n"));
      continue;
    }

    const skillFile = join(PKG_ROOT, 'skills', step.skill, 'SKILL.md');
    if (!existsSync(skillFile)) { console.error(`✗ ${step.skill}: SKILL.md not found`); return 1; }
    const { body } = parseSkill(readFileSync(skillFile, 'utf8'));
    const system = body + '\n\n---\nYou are one step in a typed pipeline. The inputs arrive as JSON. Do the skill\'s work fully, then reply with ONLY a JSON object that validates against the output schema given: no prose before or after, no Markdown fences. Put long-form text in the string fields the schema provides.';
    const user = `Inputs (JSON):\n${JSON.stringify(stepInputs, null, 2)}\n\nOutput schema (JSON Schema):\n${JSON.stringify(contract.outputs, null, 2)}`;
    console.error(`▶ ${i + 1}/${def.steps.length} ${step.id}: ${step.skill} with ${model}…`);
    let text;
    try { text = await complete({ apiKey, model, system, messages: [{ role: 'user', content: user }], maxTokens: 8192 }); }
    catch (e) { console.error(`✗ ${step.id}: ${e.message}`); return 1; }
    let out;
    try { out = JSON.parse(stripFences(text)); }
    catch { writeFileSync(join(outDir, `${i + 1}-${step.id}.raw.txt`), text); console.error(`✗ ${step.id}: the model did not return JSON (saved the raw reply to ${outDir})`); return 1; }
    const outProblems = checkAgainst(out, contract.outputs, `${step.id} outputs`);
    for (const p of outProblems) console.error(`  ! ${p}`);
    ctx[step.id] = out;
    const file = join(outDir, `${i + 1}-${step.id}.json`);
    writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
    record.steps.push({ id: step.id, skill: step.skill, inputs: stepInputs, file, contractWarnings: outProblems });
    console.error(`  ✓ ${file}`);
  }
  if (dryRun) { console.log('\n[dry-run] nothing called, nothing written.'); return 0; }
  record.finished = new Date().toISOString();
  writeFileSync(join(outDir, 'pipeline.json'), JSON.stringify(record, null, 2) + '\n');
  console.error(`\n✅ ${def.id}: ${def.steps.length} steps, outputs in ${outDir}/`);
  return 0;
}
