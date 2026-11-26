// `pm-claude-skills mission` — long-horizon missions (missions/<id>.json).
// A mission chains typed pipelines into one long piece of work for a model
// that can hold a long task: every link is proven against the contracts
// before anything runs, the run stops at each human checkpoint, and it
// resumes from saved state, so a failure at step nine does not cost the
// first eight calls again.
//
//   pm-claude-skills mission list
//   pm-claude-skills mission validate [id]
//   pm-claude-skills mission plan <id>
//   pm-claude-skills mission run <id> --input in.json [--out-dir ./mission-out] [--model <m>] [--effort <e>] [--no-checkpoints] [--dry-run]
//   pm-claude-skills mission run <id> --resume [--out-dir ./mission-out]
//
// `run` needs ANTHROPIC_API_KEY (your key, one call per step).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete, parseSkill } from './lib/anthropic.mjs';
import { modelFor, modelInfo, requestShape } from './lib/models.mjs';
import { loadContracts, loadPipelines, resolveStepInputs, checkAgainst } from './lib/pipelines.mjs';
import { loadMissions, validateMission } from './lib/missions.mjs';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const MAX_TOKENS = 8192;
const getArg = (argv, name, def) => { const i = argv.indexOf('--' + name); return i !== -1 && argv[i + 1] ? argv[i + 1] : def; };

const HELP = `mission — chain typed pipelines into one long, resumable piece of work.

  pm-claude-skills mission list                        the missions in missions/
  pm-claude-skills mission validate [id]               prove every link fits the contracts (no API)
  pm-claude-skills mission plan <id>                   stages, steps, checkpoints and the cost ceiling (no API)
  pm-claude-skills mission run <id> --input in.json    run it (ANTHROPIC_API_KEY, one call per step)
      [--out-dir <dir>]     step outputs and mission-state.json (default ./mission-out)
      [--model <m>]         default: the mission's model role in data/models.json
      [--effort <e>]        low | medium | high | xhigh | max (default: the mission's own)
      [--no-checkpoints]    do not stop for review between stages
      [--dry-run]           print the plan and the first step's inputs, call nothing
  pm-claude-skills mission run <id> --resume           carry on from mission-state.json

Write your own: docs/MISSIONS.md. A stage runs a pipeline from pipelines/.`;

function stripFences(text) {
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (m ? m[1] : text).trim();
  const start = raw.indexOf('{'), end = raw.lastIndexOf('}');
  return start !== -1 && end > start ? raw.slice(start, end + 1) : raw;
}

function modelOf(mission, argv) {
  const role = mission.model_role || 'default';
  return getArg(argv, 'model', modelFor(role));
}

function printPlan(mission, v, model, effort) {
  const info = modelInfo(model);
  console.log(`${mission.id}: ${mission.name}\n${mission.summary}\n`);
  console.log(`Model: ${model}${effort ? `, effort ${effort}` : ''}    Steps: ${v.plan.length}    Stages: ${v.stages.length}\n`);
  let n = 0;
  v.stages.forEach((stage, i) => {
    console.log(`Stage ${i + 1}: ${stage.id}  (pipeline ${stage.pipeline})`);
    for (const id of stage.steps) { n++; const s = v.plan.find((p) => p.id === id); console.log(`  ${String(n).padStart(2)}. ${id.padEnd(26)} ${s.skill}`); }
    if (stage.checkpoint && i < v.stages.length - 1) console.log(`  ⏸  checkpoint: ${stage.checkpoint}`);
  });
  if (info && Number.isFinite(info.output)) {
    const perCall = requestShape(model, MAX_TOKENS, effort).max_tokens;
    const ceiling = (v.plan.length * perCall * info.output) / 1e6;
    console.log(`\nOutput ceiling: ${v.plan.length} calls x ${perCall.toLocaleString('en-GB')} tokens at $${info.output} per million tokens = at most $${ceiling.toFixed(2)} of output.`);
    console.log('Input is extra and depends on what you supply; a real run usually costs a fraction of the ceiling.');
  }
}

export async function run(argv) {
  const sub = argv[0];
  if (!sub || sub === '--help' || sub === '-h' || sub === 'help') { console.log(HELP); return sub ? 0 : 1; }
  const contracts = loadContracts(PKG_ROOT);
  const pipelines = loadPipelines(PKG_ROOT);
  const missions = loadMissions(PKG_ROOT).filter((m) => m.def);

  if (sub === 'list') {
    if (!missions.length) { console.log('No missions found.'); return 0; }
    console.log('Missions (typed pipelines chained into one resumable run):\n');
    for (const { def } of missions) console.log(`  ${def.id.padEnd(22)} ${def.stages.map((s) => s.pipeline).join(' > ')}\n  ${' '.repeat(22)} ${def.summary}`);
    console.log('\nPlan:  pm-claude-skills mission plan <id>    Run:  pm-claude-skills mission run <id> --input in.json');
    return 0;
  }

  const id = argv[1] && !argv[1].startsWith('--') ? argv[1] : '';
  if (sub === 'validate') {
    const chosen = id ? missions.filter((m) => m.def.id === id) : missions;
    if (id && !chosen.length) { console.error(`Unknown mission "${id}". See: pm-claude-skills mission list`); return 1; }
    let bad = 0;
    for (const { def } of chosen) {
      const r = validateMission(def, pipelines, contracts);
      console.log(`${r.errors.length ? '✗' : '✓'} ${def.id}: ${def.stages.map((s) => s.pipeline).join(' > ')} (${r.plan.length} steps)`);
      for (const e of r.errors) console.log(`    ✗ ${e}`);
      for (const w of r.warnings) console.log(`    ! ${w}`);
      bad += r.errors.length;
    }
    return bad ? 1 : 0;
  }

  if (sub !== 'plan' && sub !== 'run') { console.error(`Unknown subcommand "${sub}".\n`); console.log(HELP); return 2; }
  const found = missions.find((m) => m.def.id === id);
  if (!found) { console.error(`Unknown mission "${id}". See: pm-claude-skills mission list`); return 1; }
  const mission = found.def;
  const v = validateMission(mission, pipelines, contracts);
  if (v.errors.length) { console.error(`✗ ${mission.id} does not validate against the contracts:`); for (const e of v.errors) console.error(`  ${e}`); return 1; }

  const outDir = resolve(getArg(argv, 'out-dir', 'mission-out'));
  const stateFile = join(outDir, 'mission-state.json');
  const resume = argv.includes('--resume');
  let state = null;
  if (resume) {
    if (!existsSync(stateFile)) { console.error(`✗ nothing to resume: ${stateFile} does not exist`); return 1; }
    try { state = JSON.parse(readFileSync(stateFile, 'utf8')); } catch (e) { console.error(`✗ ${stateFile}: ${e.message}`); return 1; }
    if (state.mission !== mission.id) { console.error(`✗ ${stateFile} belongs to the mission "${state.mission}", not "${mission.id}"`); return 1; }
  }
  const model = getArg(argv, 'model', state ? state.model : modelOf(mission, argv));
  const effort = getArg(argv, 'effort', state ? state.effort : mission.effort) || undefined;
  try { requestShape(model, MAX_TOKENS, effort); } catch (e) { console.error(`✗ ${e.message}`); return 1; }

  if (sub === 'plan') { printPlan(mission, v, model, effort); return 0; }

  let input;
  if (state) input = state.ctx.input;
  else {
    const inFile = getArg(argv, 'input');
    if (!inFile) { console.error('Pass --input <file.json> with the mission inputs, or --resume. Fields: ' + Object.keys((mission.inputs || {}).properties || {}).join(', ')); return 1; }
    try { input = JSON.parse(readFileSync(inFile, 'utf8')); } catch (e) { console.error(`✗ ${inFile}: ${e.message}`); return 1; }
    const problems = checkAgainst(input, mission.inputs || { type: 'object' }, 'inputs');
    if (problems.length) { for (const p of problems) console.error(`✗ ${p}`); return 1; }
  }

  const dryRun = argv.includes('--dry-run');
  if (dryRun) {
    printPlan(mission, v, model, effort);
    const first = v.def.steps[0];
    try {
      const stepInputs = resolveStepInputs(first, contracts.get(first.skill), { input });
      console.log(`\nFirst step (${first.id}) would receive:\n${JSON.stringify(stepInputs, null, 2)}`);
    } catch (e) { console.error(`✗ ${first.id}: ${e.message}`); return 1; }
    console.log('\n[dry-run] nothing called, nothing written.');
    return 0;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) { console.error('Set ANTHROPIC_API_KEY to run a mission (one API call per step), or pass --dry-run.'); return 1; }
  const stopAtCheckpoints = !argv.includes('--no-checkpoints');
  mkdirSync(outDir, { recursive: true });
  if (!state) {
    if (existsSync(stateFile)) { console.error(`✗ ${stateFile} already exists. Pass --resume to carry on, or choose another --out-dir.`); return 1; }
    state = { mission: mission.id, model, effort: effort || '', started: new Date().toISOString(), ctx: { input }, done: [], cleared: [], steps: [] };
  }
  const save = () => writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
  save();

  const order = v.def.steps;
  for (let s = 0; s < v.stages.length; s++) {
    const stage = v.stages[s];
    for (const stepId of stage.steps) {
      if (state.done.includes(stepId)) continue;
      const n = order.findIndex((x) => x.id === stepId) + 1;
      const step = order[n - 1];
      const contract = contracts.get(step.skill);
      let stepInputs;
      try { stepInputs = resolveStepInputs(step, contract, state.ctx); }
      catch (e) { console.error(`✗ ${step.id}: ${e.message}\n  State is saved; fix the earlier output in ${stateFile} and rerun with --resume.`); return 1; }
      const problems = checkAgainst(stepInputs, contract.inputs, `${step.id} inputs`);
      if (problems.length) { for (const p of problems) console.error(`✗ ${p}`); return 1; }
      const skillFile = join(PKG_ROOT, 'skills', step.skill, 'SKILL.md');
      if (!existsSync(skillFile)) { console.error(`✗ ${step.skill}: SKILL.md not found`); return 1; }
      const { body } = parseSkill(readFileSync(skillFile, 'utf8'));
      const system = body + '\n\n---\nThis is one step of a longer mission; later steps read your output as data. The inputs arrive as JSON. Do the skill\'s work in full, then reply with one JSON object that validates against the output schema given, with no prose around it and no Markdown fences. Put long-form text in the string fields the schema provides.';
      const user = `Inputs (JSON):\n${JSON.stringify(stepInputs, null, 2)}\n\nOutput schema (JSON Schema):\n${JSON.stringify(contract.outputs, null, 2)}`;
      console.error(`▶ ${n}/${order.length} ${step.id}: ${step.skill} with ${model}…`);
      let text;
      try { text = await complete({ apiKey, model, effort, system, messages: [{ role: 'user', content: user }], maxTokens: MAX_TOKENS }); }
      catch (e) { console.error(`✗ ${step.id}: ${e.message}\n  ${state.done.length} step(s) are saved; rerun with --resume to retry from here.`); return 1; }
      let out;
      try { out = JSON.parse(stripFences(text)); }
      catch { writeFileSync(join(outDir, `${n}-${step.id}.raw.txt`), text); console.error(`✗ ${step.id}: the model did not return JSON (raw reply saved in ${outDir}). Rerun with --resume to retry.`); return 1; }
      const outProblems = checkAgainst(out, contract.outputs, `${step.id} outputs`);
      for (const p of outProblems) console.error(`  ! ${p}`);
      const file = join(outDir, `${n}-${step.id}.json`);
      writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
      state.ctx[step.id] = out;
      state.done.push(step.id);
      state.steps.push({ id: step.id, skill: step.skill, file, contractWarnings: outProblems });
      save();
      console.error(`  ✓ ${file}`);
    }
    const last = s === v.stages.length - 1;
    if (!last && stage.checkpoint && stopAtCheckpoints && !state.cleared.includes(stage.id)) {
      state.cleared.push(stage.id);
      save();
      console.error(`\n⏸  Checkpoint after stage "${stage.id}" (${state.done.length} of ${order.length} steps done).\n   ${stage.checkpoint}\n   Outputs are in ${outDir}/. Carry on with:  pm-claude-skills mission run ${mission.id} --resume --out-dir ${outDir}`);
      return 0;
    }
  }
  state.finished = new Date().toISOString();
  save();
  console.error(`\n✅ ${mission.id}: ${order.length} steps across ${v.stages.length} stages, outputs in ${outDir}/`);
  return 0;
}
