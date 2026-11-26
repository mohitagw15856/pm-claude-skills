// Long-horizon missions: missions/<id>.json chains typed pipelines into one
// piece of work that can run for a long time, stop at a human checkpoint, and
// resume from saved state. A mission adds nothing to the type system: it is
// flattened into one long pipeline (stage "diagnose", step "churn" becomes the
// step "diagnose-churn") and validated by the same validator as any pipeline,
// so a mission that validates is a chain whose every link is proven to fit.
//
// A stage binds the inputs of its pipeline to:
//   "$.input.period"                         a mission input
//   "$.diagnose.roadmap.ranked[0].name"      a field of an earlier stage's step output
//   { "from": "$.diagnose.okrs.objectives[]", "pick": "objective" }   as in pipelines
//   42, "text", true                         a literal
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { validatePipeline } from './pipelines.mjs';

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STAGE_REF = /^\$\.([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)(.*)$/;
const INPUT_REF = /^\$\.input\.([A-Za-z0-9_]+)(.*)$/;
const EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'];
const isFrom = (b) => b && typeof b === 'object' && !Array.isArray(b) && 'from' in b;
const isRef = (b) => typeof b === 'string' && b.startsWith('$.');

export function loadMissions(root) {
  const dir = join(root, 'missions');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => {
    try { return { file: f, def: JSON.parse(readFileSync(join(dir, f), 'utf8')) }; }
    catch (e) { return { file: f, def: null, error: e.message }; }
  });
}

/** "$.diagnose.roadmap.ranked[0]" (stage.step.path) becomes "$.diagnose-roadmap.ranked[0]". */
function stageRef(ref, stageSteps, errors, where) {
  if (!isRef(ref) || ref.startsWith('$.input.') || ref === '$.input') return ref;
  const m = ref.match(STAGE_REF);
  if (!m) { errors.push(`${where}: ${ref} must name a stage and a step, as $.<stage>.<step>.<field>`); return ref; }
  const steps = stageSteps.get(m[1]);
  if (!steps) { errors.push(`${where}: ${ref} refers to "${m[1]}", which is not an earlier stage`); return ref; }
  if (!steps.includes(m[2])) { errors.push(`${where}: ${ref}: stage "${m[1]}" has no step "${m[2]}" (${steps.join(', ')})`); return ref; }
  return `$.${m[1]}-${m[2]}${m[3]}`;
}

/** Rewrite one binding of a pipeline step so that it reads from the mission instead of the pipeline. */
function rebind(binding, stage, stageBindings, localSteps, errors, where) {
  const from = isFrom(binding);
  const ref = from ? binding.from : binding;
  if (!isRef(ref)) return binding; // literal
  const m = ref.match(INPUT_REF);
  if (!m) {
    // a reference to an earlier step of the same pipeline
    const s = ref.match(/^\$\.([A-Za-z0-9_-]+)(.*)$/);
    const next = s && localSteps.includes(s[1]) ? `$.${stage.id}-${s[1]}${s[2]}` : ref;
    return from ? { ...binding, from: next } : next;
  }
  const [, field, rest] = m;
  if (!(field in stageBindings)) return undefined; // the stage leaves this pipeline input unbound
  const outer = stageBindings[field];
  if (!rest && !from) return outer; // whole value: any binding form passes through
  if (!isRef(outer)) {
    if (isFrom(outer) && !rest && from) { errors.push(`${where}: "${field}" is bound with pick or map, and the pipeline applies its own pick or map to it`); return undefined; }
    if (!from && rest) { errors.push(`${where}: the pipeline reads ${ref}, so "${field}" must be bound to a plain reference, not a literal or a pick`); return undefined; }
    if (from && !isFrom(outer)) { errors.push(`${where}: the pipeline reads ${ref} as a list, so "${field}" must be bound to a plain reference`); return undefined; }
  }
  const next = `${outer}${rest}`;
  return from ? { ...binding, from: next } : next;
}

/**
 * Flatten a mission into one pipeline definition.
 * Returns { def, errors, stages } where stages lists { id, pipeline, steps: [flat ids], checkpoint }.
 */
export function flattenMission(mission, pipelines) {
  const errors = [], stages = [];
  const byId = new Map(pipelines.filter((p) => p.def).map((p) => [p.def.id, p.def]));
  if (!mission || typeof mission !== 'object') return { def: null, errors: ['not a JSON object'], stages };
  if (!ID.test(mission.id || '')) errors.push(`id "${mission.id}" must be lower-case words joined by hyphens`);
  if (!mission.name) errors.push('name is missing');
  if (!mission.summary) errors.push('summary is missing');
  if (mission.effort && !EFFORTS.includes(mission.effort)) errors.push(`effort "${mission.effort}" is not one of ${EFFORTS.join(', ')}`);
  if (!Array.isArray(mission.stages) || !mission.stages.length) return { def: null, errors: [...errors, 'stages must be a non-empty list'], stages };

  const stageSteps = new Map();
  const steps = [];
  mission.stages.forEach((stage, i) => {
    const where = `stage ${i + 1} (${stage.id || '?'})`;
    if (!ID.test(stage.id || '')) { errors.push(`${where}: id must be lower-case words joined by hyphens`); return; }
    if (stage.id === 'input') { errors.push(`${where}: "input" is reserved`); return; }
    if (stageSteps.has(stage.id)) { errors.push(`${where}: duplicate id`); return; }
    const pipe = byId.get(stage.pipeline);
    if (!pipe) { errors.push(`${where}: pipeline "${stage.pipeline}" is not in pipelines/`); return; }
    const bindings = stage.inputs || {};
    const props = (pipe.inputs || {}).properties || {};
    for (const k of Object.keys(bindings)) if (!(k in props)) errors.push(`${where}: "${k}" is not an input of ${pipe.id} (${Object.keys(props).join(', ')})`);
    for (const r of (pipe.inputs || {}).required || []) if (!(r in bindings)) errors.push(`${where}: required input "${r}" of ${pipe.id} is not bound`);
    const outer = Object.fromEntries(Object.entries(bindings).map(([k, b]) => {
      const at = `${where}: ${k}`;
      return [k, isFrom(b) ? { ...b, from: stageRef(b.from, stageSteps, errors, at) } : stageRef(b, stageSteps, errors, at)];
    }));
    const local = pipe.steps.map((s) => s.id);
    const flat = [];
    for (const step of pipe.steps) {
      const inputs = {};
      for (const [k, b] of Object.entries(step.inputs || {})) {
        const v = rebind(b, stage, outer, local, errors, `${where}: ${step.id}.${k}`);
        if (v !== undefined) inputs[k] = v;
      }
      const id = `${stage.id}-${step.id}`;
      steps.push({ id, skill: step.skill, inputs });
      flat.push(id);
    }
    stageSteps.set(stage.id, local);
    stages.push({ id: stage.id, pipeline: pipe.id, steps: flat, checkpoint: stage.checkpoint || '' });
  });
  const def = { id: mission.id, name: mission.name, summary: mission.summary, inputs: mission.inputs || { type: 'object', properties: {} }, steps };
  return { def, errors, stages };
}

/** Validate a mission: flatten it, then prove the flat chain against the contracts. */
export function validateMission(mission, pipelines, contracts) {
  const flat = flattenMission(mission, pipelines);
  if (!flat.def || !flat.def.steps.length) return { ...flat, warnings: [], plan: [] };
  const r = validatePipeline(flat.def, contracts);
  return { def: flat.def, stages: flat.stages, errors: [...flat.errors, ...r.errors], warnings: r.warnings, plan: r.plan };
}
