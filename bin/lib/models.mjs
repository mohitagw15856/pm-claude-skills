// The Claude model registry, read from data/models.json.
//
// Code asks for a role ("default", "fast", "deep", "frontier", "judge") instead of
// naming a model, so a new line-up is a one-file change. Pages and workflow files
// that cannot import this module are checked against the same file by
// scripts/check-model-refs.mjs.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// A built-in copy of the roles keeps the CLI working if the data file is absent
// (an old or partial install). The file wins whenever it is present.
const FALLBACK = {
  roles: {
    default: { model: 'claude-sonnet-5-5' }, fast: { model: 'claude-haiku-5-5' },
    deep: { model: 'claude-opus-5-5' }, frontier: { model: 'claude-fable-5-2' },
    judge: { model: 'claude-sonnet-4-6', pinned: true },
  },
  current: [], legacy: [], aliases: {},
};

export const REGISTRY = (() => {
  try {
    const j = JSON.parse(readFileSync(join(ROOT, 'data', 'models.json'), 'utf8'));
    return { ...FALLBACK, ...j, roles: { ...FALLBACK.roles, ...(j.roles || {}) } };
  } catch { return FALLBACK; }
})();

/** The model id for a role. Throws on an unknown role so a typo cannot pick a model silently. */
export function modelFor(role) {
  const r = REGISTRY.roles[role];
  if (!r || !r.model) throw new Error(`Unknown model role "${role}". Roles: ${Object.keys(REGISTRY.roles).join(', ')}`);
  return r.model;
}

/** Resolve a dated or aliased id to the id the registry lists. */
export const canonical = (id) => REGISTRY.aliases[id] || id;

/** Registry entry for a model id, with `status` "current" or "legacy"; null when unlisted. */
export function modelInfo(id) {
  const c = canonical(id);
  const cur = REGISTRY.current.find((m) => m.id === c);
  if (cur) return { ...cur, status: 'current' };
  const old = REGISTRY.legacy.find((m) => m.id === c);
  return old ? { ...old, status: 'legacy' } : null;
}

export const knownModelIds = () => [
  ...REGISTRY.current.map((m) => m.id), ...REGISTRY.legacy.map((m) => m.id), ...Object.keys(REGISTRY.aliases),
];

// Current models think before they answer, and thinking is billed against the same
// max_tokens as the visible answer. A caller that asked for 300 tokens of output
// (a judge verdict, say) would get an empty answer if thinking used the 300. So for
// those models the request ceiling is the caller's figure plus room to think.
// Legacy models are left exactly as the caller asked.
export const THINKING_HEADROOM = 8000;

/**
 * The request fields that depend on the model: max_tokens and, when asked for, effort.
 * @param {string} model
 * @param {number} maxTokens  visible output the caller wants room for
 * @param {string} [effort]   low | medium | high | xhigh | max (current models only)
 */
export function requestShape(model, maxTokens, effort) {
  const info = modelInfo(model);
  if (!info || info.status !== 'current') return { max_tokens: maxTokens };
  const ceiling = Number.isFinite(info.maxOutput) ? info.maxOutput : 128000;
  const shape = { max_tokens: Math.min(ceiling, maxTokens + THINKING_HEADROOM) };
  if (effort !== undefined && effort !== null && effort !== '') {
    if (!['low', 'medium', 'high', 'xhigh', 'max'].includes(effort)) throw new Error(`Unknown effort "${effort}". Use low, medium, high, xhigh or max.`);
    shape.output_config = { effort };
  }
  return shape;
}

let guidanceCache;
/**
 * Where to start a skill: { model, effort, role } from data/model-guidance.json
 * (derived from risk tier and length, see docs/MODEL-GUIDANCE.md), or null when
 * the file or the skill is absent.
 */
export function guidanceFor(skill) {
  if (guidanceCache === undefined) {
    try { guidanceCache = JSON.parse(readFileSync(join(ROOT, 'data', 'model-guidance.json'), 'utf8')).skills || {}; }
    catch { guidanceCache = null; }
  }
  const g = guidanceCache && guidanceCache[skill];
  if (!g || !(g.role in REGISTRY.roles)) return null;
  return { role: g.role, model: modelFor(g.role), effort: g.effort };
}
