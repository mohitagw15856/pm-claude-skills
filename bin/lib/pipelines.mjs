// Typed skill pipelines: pipelines/<id>.json chains skills by their contracts
// (schemas/skills/<name>.json, SkillSpec section 9.2). Each step binds the
// skill's inputs to the pipeline's own inputs or to an earlier step's outputs,
// and the validator proves the chain fits before anything runs: every required
// input is bound, every reference resolves to a field that exists, and the
// types agree. Shared by scripts/check-pipelines.mjs (CI) and bin/pipeline.mjs.
//
// A binding is one of:
//   "$.input.product"                    a pipeline input
//   "$.teardown.opportunities[0]"        a field of an earlier step's output
//   { "from": "$.stories.stories[]", "pick": "title" }          array of one field
//   { "from": "$.stories.stories[]", "map": { "item": "title" } } array, fields renamed
//   42, "product_planning", true         a literal
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REF = /^\$\.([A-Za-z0-9_-]+)((?:\.[A-Za-z0-9_]+|\[\d*\])*)$/;

export function loadContracts(root) {
  const dir = join(root, 'schemas', 'skills');
  const out = new Map();
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    try { const c = JSON.parse(readFileSync(join(dir, f), 'utf8')); if (c.skill) out.set(c.skill, c); } catch { /* reported by check-skill-schemas */ }
  }
  return out;
}

export function loadPipelines(root) {
  const dir = join(root, 'pipelines');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => {
    try { return { file: f, def: JSON.parse(readFileSync(join(dir, f), 'utf8')) }; }
    catch (e) { return { file: f, def: null, error: e.message }; }
  });
}

/** Split "$.step.a.b[0][]" into { step, segments: ['a', 'b', '0', '[]'] }. */
export function parseRef(ref) {
  const m = typeof ref === 'string' && ref.match(REF);
  if (!m) return null;
  const segments = [];
  for (const s of m[2].match(/\.[A-Za-z0-9_]+|\[\d*\]/g) || []) {
    if (s.startsWith('.')) segments.push(s.slice(1));
    else segments.push(s === '[]' ? '[]' : s.slice(1, -1));
  }
  return { step: m[1], segments, each: segments[segments.length - 1] === '[]' };
}

/** Walk a JSON Schema node along path segments; returns the node or null. */
export function schemaAt(node, segments) {
  for (const s of segments) {
    if (!node) return null;
    if (s === '[]' || /^\d+$/.test(s)) { if (node.type !== 'array' || !node.items) return null; node = node.items; }
    else { if (node.type !== 'object' || !node.properties || !node.properties[s]) return null; node = node.properties[s]; }
  }
  return node || null;
}

const typeOf = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v);
const fits = (from, to) => from === to || (from === 'integer' && to === 'number');
const describe = (n) => (n ? `${n.type}${n.items ? ` of ${n.items.type}` : ''}` : 'unknown');

function compatible(src, dst, where, errors, opts = {}) {
  if (!src || !dst) return;
  if (!fits(src.type, dst.type)) { errors.push(`${where}: ${describe(src)} does not fit ${describe(dst)}`); return; }
  if (dst.enum && src.enum && !src.enum.every((v) => dst.enum.includes(v))) errors.push(`${where}: enum ${JSON.stringify(src.enum)} is wider than ${JSON.stringify(dst.enum)}`);
  if (dst.type === 'array' && src.items && dst.items) {
    if (opts.pick) {
      const p = src.items.properties && src.items.properties[opts.pick];
      if (!p) errors.push(`${where}: pick "${opts.pick}" is not a field of the source items (${Object.keys(src.items.properties || {}).join(', ') || 'none'})`);
      else if (!fits(p.type, dst.items.type)) errors.push(`${where}: picked "${opts.pick}" is ${p.type}, items need ${dst.items.type}`);
      return;
    }
    if (opts.map) {
      const sp = src.items.properties || {}, dp = dst.items.properties || {};
      for (const [to, from] of Object.entries(opts.map)) {
        if (!dp[to]) errors.push(`${where}: map target "${to}" is not a field of the items (${Object.keys(dp).join(', ')})`);
        if (!sp[from]) errors.push(`${where}: map source "${from}" is not a field of the source items (${Object.keys(sp).join(', ')})`);
        if (dp[to] && sp[from] && !fits(sp[from].type, dp[to].type)) errors.push(`${where}: map ${from} (${sp[from].type}) to ${to} (${dp[to].type}) changes type`);
      }
      for (const r of dst.items.required || []) if (!(r in opts.map)) errors.push(`${where}: map leaves the required item field "${r}" unbound`);
      return;
    }
    if (!fits(src.items.type, dst.items.type)) { errors.push(`${where}: items are ${src.items.type}, need ${dst.items.type} (use pick or map)`); return; }
    if (dst.items.type === 'object' && dst.items.required && src.items.properties) {
      const missing = dst.items.required.filter((r) => !src.items.properties[r]);
      if (missing.length) errors.push(`${where}: source items lack required field(s) ${missing.join(', ')} (add a map)`);
    }
  }
}

/**
 * Validate one pipeline definition against the contracts.
 * Returns { errors, warnings, steps } where steps carries the resolved plan.
 */
export function validatePipeline(def, contracts) {
  const errors = [], warnings = [], plan = [];
  if (!def || typeof def !== 'object') return { errors: ['not a JSON object'], warnings, plan };
  if (!ID.test(def.id || '')) errors.push(`id "${def.id}" must be lower-case words joined by hyphens`);
  if (!def.name) errors.push('name is missing');
  if (!def.summary) errors.push('summary is missing');
  const inputs = def.inputs || { type: 'object', properties: {} };
  if (inputs.type !== 'object' || !inputs.properties) errors.push('inputs must be an object schema with properties');
  if (!Array.isArray(def.steps) || !def.steps.length) { errors.push('steps must be a non-empty list'); return { errors, warnings, plan }; }

  const outputsOf = { input: inputs };
  const seen = new Set();
  def.steps.forEach((step, i) => {
    const where = `step ${i + 1} (${step.id || '?'})`;
    if (!ID.test(step.id || '')) errors.push(`${where}: id must be lower-case words joined by hyphens`);
    if (step.id === 'input') errors.push(`${where}: "input" is reserved`);
    if (seen.has(step.id)) errors.push(`${where}: duplicate id`);
    seen.add(step.id);
    const contract = contracts.get(step.skill);
    if (!contract) { errors.push(`${where}: skill "${step.skill}" has no contract in schemas/skills/ (pipelines only chain typed skills)`); return; }
    const props = contract.inputs.properties || {};
    const bound = step.inputs || {};
    for (const r of contract.inputs.required || []) if (!(r in bound)) errors.push(`${where}: required input "${r}" is not bound`);
    const resolved = {};
    for (const [key, binding] of Object.entries(bound)) {
      const dst = props[key];
      if (!dst) { errors.push(`${where}: "${key}" is not an input of ${step.skill} (${Object.keys(props).join(', ')})`); continue; }
      const at = `${where}: ${key}`;
      const isObj = binding && typeof binding === 'object' && !Array.isArray(binding) && 'from' in binding;
      const refStr = isObj ? binding.from : binding;
      const ref = parseRef(refStr);
      if (typeof refStr === 'string' && refStr.startsWith('$.') && !ref) { errors.push(`${at}: malformed reference ${refStr}`); continue; }
      if (!ref) {
        // literal
        const t = typeOf(binding);
        if (!fits(t, dst.type)) errors.push(`${at}: literal is ${t}, input is ${dst.type}`);
        if (dst.enum && !dst.enum.includes(binding)) errors.push(`${at}: literal ${JSON.stringify(binding)} is not one of ${JSON.stringify(dst.enum)}`);
        resolved[key] = { literal: binding };
        continue;
      }
      if (!(ref.step in outputsOf)) { errors.push(`${at}: ${refStr} refers to ${ref.step === 'input' ? 'inputs' : `"${ref.step}"`}, which is not an earlier step`); continue; }
      const src = schemaAt(outputsOf[ref.step], ref.segments.filter((s) => s !== '[]'));
      if (!src) { errors.push(`${at}: ${refStr} does not exist in ${ref.step === 'input' ? 'the pipeline inputs' : `the outputs of ${ref.step}`}`); continue; }
      if (ref.step !== 'input' && !ref.each) {
        // a field that the producing skill is not required to emit: warn, do not fail
        const parentReq = (schemaAt(outputsOf[ref.step], ref.segments.slice(0, -1).filter((s) => s !== '[]')) || {}).required || [];
        const last = ref.segments[ref.segments.length - 1];
        if (!/^\d+$/.test(last) && !parentReq.includes(last)) warnings.push(`${at}: ${refStr} is optional in the ${ref.step} contract; the run fails if it is absent`);
      }
      // "$.x.list[]" with pick/map yields an array; "$.x.list" too. "$.x.list[0]" yields one item.
      compatible(src, dst, at, errors, isObj ? { pick: binding.pick, map: binding.map } : {});
      if (isObj && binding.pick && binding.map) errors.push(`${at}: use pick or map, not both`);
      if (isObj && (binding.pick || binding.map) && !ref.each) errors.push(`${at}: pick and map need an array reference ending in []`);
      resolved[key] = { ref: refStr, ...(isObj ? { pick: binding.pick, map: binding.map } : {}) };
    }
    outputsOf[step.id] = contract.outputs;
    plan.push({ id: step.id, skill: step.skill, inputs: resolved, produces: Object.keys(contract.outputs.properties || {}) });
  });
  return { errors, warnings, plan };
}

/** Resolve one binding at run time from the pipeline input and earlier outputs. */
export function resolveBinding(binding, ctx) {
  const isObj = binding && typeof binding === 'object' && !Array.isArray(binding) && 'from' in binding;
  const refStr = isObj ? binding.from : binding;
  const ref = parseRef(refStr);
  if (!ref) return binding;
  let v = ctx[ref.step];
  for (const s of ref.segments) {
    if (v === undefined || v === null) break;
    if (s === '[]') break;
    v = v[/^\d+$/.test(s) ? Number(s) : s];
  }
  if (v === undefined) throw new Error(`${refStr} is absent at run time`);
  if (isObj && Array.isArray(v)) {
    if (binding.pick) return v.map((x) => (x && typeof x === 'object' ? x[binding.pick] : undefined)).filter((x) => x !== undefined);
    if (binding.map) return v.map((x) => Object.fromEntries(Object.entries(binding.map).map(([to, from]) => [to, x ? x[from] : undefined]).filter(([, val]) => val !== undefined)));
  }
  return v;
}

/** Shallow structural check of a value against an object schema: required keys and top-level types. */
export function checkAgainst(value, schema, label) {
  const problems = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [`${label}: not a JSON object`];
  for (const r of schema.required || []) if (!(r in value)) problems.push(`${label}: missing required "${r}"`);
  for (const [k, v] of Object.entries(value)) {
    const p = (schema.properties || {})[k];
    if (p && p.type && !fits(typeOf(v), p.type)) problems.push(`${label}: "${k}" is ${typeOf(v)}, contract says ${p.type}`);
  }
  return problems;
}

/**
 * Resolve every input of one step. An optional input bound to a pipeline input
 * the person did not supply is left out; anything else that is absent throws.
 */
export function resolveStepInputs(step, contract, ctx) {
  const required = (contract.inputs && contract.inputs.required) || [];
  const out = {};
  for (const [key, binding] of Object.entries(step.inputs || {})) {
    const ref = binding && typeof binding === 'object' && !Array.isArray(binding) && 'from' in binding ? binding.from : binding;
    try { out[key] = resolveBinding(binding, ctx); }
    catch (e) {
      if (typeof ref === 'string' && ref.startsWith('$.input.') && !required.includes(key)) continue;
      throw e;
    }
  }
  return out;
}
