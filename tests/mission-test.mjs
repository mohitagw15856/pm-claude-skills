#!/usr/bin/env node
// Missions: flattening, validation, and a full run with checkpoints and resume
// against a local stand-in server (ANTHROPIC_BASE_URL). No network, no API spend:
// the server builds a minimal instance of the output schema each step sends.
import { createServer } from 'node:http';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let pass = 0, fail = 0;
const check = (name, ok) => { if (ok) pass++; else { fail++; console.error('  ✗ ' + name); } };

const sample = (s) => {
  if (!s || !s.type) return 'x';
  if (s.enum) return s.enum[0];
  if (s.type === 'object') return Object.fromEntries(Object.entries(s.properties || {}).map(([k, v]) => [k, sample(v)]));
  if (s.type === 'array') return [sample(s.items)];
  if (s.type === 'integer' || s.type === 'number') return 3;
  if (s.type === 'boolean') return true;
  return 'sample text';
};
const seen = [];
let failOn = -1;
const server = createServer((req, res) => {
  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', () => {
    const body = JSON.parse(raw);
    seen.push(body);
    if (seen.length === failOn) { res.writeHead(400, { 'content-type': 'application/json' }); res.end(JSON.stringify({ error: { message: 'stand-in failure' } })); return; }
    const user = body.messages[0].content;
    const schema = JSON.parse(user.slice(user.indexOf('Output schema (JSON Schema):') + 28));
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ model: body.model, content: [{ type: 'thinking', thinking: '' }, { type: 'text', text: JSON.stringify(sample(schema)) }], stop_reason: 'end_turn', usage: { input_tokens: 1, output_tokens: 1 } }));
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
process.env.ANTHROPIC_BASE_URL = `http://127.0.0.1:${server.address().port}`;
process.env.ANTHROPIC_API_KEY = 'test-key';
const tmp = mkdtempSync(join(tmpdir(), 'mission-test-'));
const quiet = async (fn) => { const e = console.error, l = console.log; console.error = () => {}; console.log = () => {}; try { return await fn(); } finally { console.error = e; console.log = l; } };

try {
  const { loadContracts, loadPipelines } = await import(join(root, 'bin', 'lib', 'pipelines.mjs'));
  const { loadMissions, flattenMission, validateMission } = await import(join(root, 'bin', 'lib', 'missions.mjs'));
  const { run } = await import(join(root, 'bin', 'mission.mjs'));
  const { modelFor } = await import(join(root, 'bin', 'lib', 'models.mjs'));
  const contracts = loadContracts(root), pipelines = loadPipelines(root), missions = loadMissions(root);
  const get = (id) => JSON.parse(JSON.stringify(missions.find((m) => m.def && m.def.id === id).def));

  check('at least two missions ship', missions.filter((m) => m.def).length >= 2);
  for (const { def } of missions) check(`${def.id} validates`, validateMission(def, pipelines, contracts).errors.length === 0);

  // Flattening.
  const rq = get('retention-quarter');
  const flat = flattenMission(rq, pipelines);
  check('steps are named stage-step', flat.def.steps.map((s) => s.id).join(',') === 'diagnose-churn,diagnose-okrs,diagnose-roadmap,build-teardown,build-prd,build-stories,build-sprint');
  check('a pipeline-local reference is renamed', flat.def.steps[1].inputs.priorities.from === '$.diagnose-churn.recommendations[]');
  check('a cross-stage reference reaches the earlier stage', flat.def.steps[4].inputs.feature_name === '$.diagnose-roadmap.ranked[0].name');
  check('an unbound optional pipeline input is dropped', !('success_metrics' in flat.def.steps[4].inputs));
  check('a literal in the pipeline passes through', flat.def.steps[3].inputs.use_case === 'product_planning');

  // Validation failures.
  const errs = (m) => validateMission(m, pipelines, contracts).errors.join(' | ');
  let m = get('retention-quarter'); m.stages[1].pipeline = 'nope';
  check('an unknown pipeline is refused', /not in pipelines/.test(errs(m)));
  m = get('retention-quarter'); delete m.stages[1].inputs.team_size;
  check('an unbound required pipeline input is refused', /required input "team_size"/.test(errs(m)));
  m = get('retention-quarter'); m.stages[1].inputs.feature_name = '$.later.roadmap.ranked[0].name';
  check('a reference to a stage that has not run is refused', /not an earlier stage/.test(errs(m)));
  m = get('retention-quarter'); m.stages[1].inputs.feature_name = '$.diagnose.nostep.ranked[0].name';
  check('a reference to a step the stage lacks is refused', /has no step "nostep"/.test(errs(m)));
  m = get('retention-quarter'); m.stages[1].inputs.feature_name = '$.diagnose.roadmap.ranked';
  check('a type mismatch across stages is refused', /does not fit/.test(errs(m)));
  m = get('retention-quarter'); m.stages[1].inputs.feature_name = '$.diagnose.roadmap.nofield';
  check('a field the contract lacks is refused', /does not exist/.test(errs(m)));
  m = get('retention-quarter'); m.stages[1].inputs.extra = 1;
  check('a binding the pipeline does not take is refused', /is not an input of competitor-to-sprint/.test(errs(m)));
  m = get('retention-quarter'); m.stages[1].id = 'diagnose';
  check('a duplicate stage id is refused', /duplicate id/.test(errs(m)));
  m = get('retention-quarter'); m.effort = 'extreme';
  check('an unknown effort is refused', /effort "extreme"/.test(errs(m)));

  // A full run: stops at the checkpoint, resumes, finishes.
  const input = { period: 'Q3 2026', customers_start: 400, customers_churned: 36, owner: 'Head of Product', okr_period: 'Q4 2026', product: { name: 'Ledgerly' }, competitors: ['Acme'], target_user: 'Finance lead', sprint_length_weeks: 2, team_size: 5 };
  const inFile = join(tmp, 'in.json'); writeFileSync(inFile, JSON.stringify(input));
  const out = join(tmp, 'out');
  let code = await quiet(() => run(['run', 'retention-quarter', '--input', inFile, '--out-dir', out]));
  const state1 = JSON.parse(readFileSync(join(out, 'mission-state.json'), 'utf8'));
  check('the run stops cleanly at the checkpoint', code === 0 && seen.length === 3 && state1.done.length === 3 && !state1.finished);
  check('the mission model role is used', seen[0].model === modelFor('frontier'));
  check('the mission effort is sent', seen[0].output_config && seen[0].output_config.effort === 'high');
  check('thinking headroom is added', seen[0].max_tokens > 8192);
  check('a second fresh run on the same folder is refused', (await quiet(() => run(['run', 'retention-quarter', '--input', inFile, '--out-dir', out]))) === 1 && seen.length === 3);
  code = await quiet(() => run(['run', 'retention-quarter', '--resume', '--out-dir', out]));
  const state2 = JSON.parse(readFileSync(join(out, 'mission-state.json'), 'utf8'));
  check('resume finishes without repeating a step', code === 0 && seen.length === 7 && state2.done.length === 7 && !!state2.finished);
  check('every step wrote its output', existsSync(join(out, '7-build-sprint.json')) && existsSync(join(out, '1-diagnose-churn.json')));
  check('a cross-stage value reached the later step', /"feature_name": "sample text"/.test(seen[4].messages[0].content));

  // A failure mid-mission keeps what is done; resume retries only the failed step.
  const out2 = join(tmp, 'out2');
  seen.length = 0; failOn = 2;
  code = await quiet(() => run(['run', 'retention-quarter', '--input', inFile, '--out-dir', out2, '--no-checkpoints']));
  check('a failed step exits 1 and keeps the earlier step', code === 1 && JSON.parse(readFileSync(join(out2, 'mission-state.json'), 'utf8')).done.length === 1);
  failOn = -1;
  code = await quiet(() => run(['run', 'retention-quarter', '--resume', '--out-dir', out2, '--no-checkpoints']));
  check('resume after a failure completes with no checkpoint stop', code === 0 && seen.length === 2 + 6);

  // No key, dry run, wrong resume.
  check('resume without state is refused', (await quiet(() => run(['run', 'retention-quarter', '--resume', '--out-dir', join(tmp, 'none')]))) === 1);
  check('resume refuses another mission\'s state', (await quiet(() => run(['run', 'bad-quarter-reset', '--resume', '--out-dir', out]))) === 1);
  const before = seen.length;
  check('dry-run calls nothing', (await quiet(() => run(['run', 'retention-quarter', '--input', inFile, '--dry-run', '--out-dir', join(tmp, 'dry')]))) === 0 && seen.length === before && !existsSync(join(tmp, 'dry')));
  check('plan needs no input', (await quiet(() => run(['plan', 'bad-quarter-reset']))) === 0);
  writeFileSync(inFile, JSON.stringify({ ...input, team_size: 'five' }));
  check('inputs of the wrong type are refused before any call', (await quiet(() => run(['run', 'retention-quarter', '--input', inFile, '--out-dir', join(tmp, 'bad')]))) === 1 && seen.length === before);
  delete process.env.ANTHROPIC_API_KEY;
  writeFileSync(inFile, JSON.stringify(input));
  check('a run without a key is refused', (await quiet(() => run(['run', 'retention-quarter', '--input', inFile, '--out-dir', join(tmp, 'nokey')]))) === 1);
} finally {
  server.close();
  rmSync(tmp, { recursive: true, force: true });
}
console.log(`mission tests: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
