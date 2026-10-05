// .pm-skills.json: a team's shared skill set, committed to a project so every
// laptop installs the same skills with `npx pm-claude-skills sync`.
//
//   {
//     "$schema": "https://mohitagw15856.github.io/pm-claude-skills/schemas/pm-skills.schema.json",
//     "version": "81.x",                       // library versions the team has agreed on
//     "agents": ["claude", "cursor"],
//     "bundles": ["pm-essentials", "pm-china-work"],
//     "skills": ["lease-decoder"],
//     "lite": false,                           // condensed skills for small local models
//     "targets": { "cursor": ".cursor/rules" } // optional per-agent install folders
//   }
import { readFileSync, existsSync } from 'node:fs';

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KEYS = new Set(['$schema', 'version', 'agents', 'bundles', 'skills', 'lite', 'targets', 'locale']);

/** Does `version` (x.y.z) satisfy `range`: exact "81.2.0", "81.x", "81.2.x", ">=81.2.0" or "*". */
export function satisfies(version, range) {
  if (!range || range === '*') return true;
  const v = String(version).split('.').map(Number);
  const r = String(range).trim();
  const ge = r.match(/^>=\s*(\d+)\.(\d+)\.(\d+)$/);
  if (ge) {
    const w = ge.slice(1).map(Number);
    for (let i = 0; i < 3; i++) { if (v[i] > w[i]) return true; if (v[i] < w[i]) return false; }
    return true;
  }
  const parts = r.split('.');
  if (!parts.length || parts.length > 3 || !parts.every((p) => p === 'x' || p === '*' || /^\d+$/.test(p))) throw new Error(`Unsupported version range "${range}" (use 81.2.0, 81.x, 81.2.x or >=81.2.0).`);
  return parts.every((p, i) => p === 'x' || p === '*' || Number(p) === v[i]);
}

export function loadConfig(path, agentsKnown) {
  if (!existsSync(path)) throw new Error(`No ${path}. Create one (see docs/TEAMS.md) or pass --config <file>.`);
  let cfg;
  try { cfg = JSON.parse(readFileSync(path, 'utf8')); } catch (e) { throw new Error(`${path} is not valid JSON: ${e.message}`); }
  if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) throw new Error(`${path} must hold a JSON object.`);
  for (const k of Object.keys(cfg)) if (!KEYS.has(k)) throw new Error(`Unknown key "${k}" in ${path}.`);
  const list = (k) => {
    const v = cfg[k] ?? [];
    if (!Array.isArray(v) || !v.every((x) => typeof x === 'string')) throw new Error(`"${k}" must be a list of names.`);
    return v;
  };
  const agents = list('agents');
  if (!agents.length) throw new Error('"agents" needs at least one agent, e.g. ["claude"].');
  for (const a of agents) if (!agentsKnown.includes(a)) throw new Error(`Unknown agent "${a}". Agents: ${agentsKnown.join(', ')}.`);
  const bundles = list('bundles'), skills = list('skills');
  for (const n of [...bundles, ...skills]) if (!NAME.test(n)) throw new Error(`"${n}" is not a valid bundle or skill name.`);
  if (!bundles.length && !skills.length) throw new Error('List at least one bundle or skill.');
  const targets = cfg.targets ?? {};
  if (typeof targets !== 'object' || Array.isArray(targets)) throw new Error('"targets" must map agent names to folders.');
  for (const [a, t] of Object.entries(targets)) {
    if (!agents.includes(a)) throw new Error(`"targets" names agent "${a}", which is not in "agents".`);
    if (typeof t !== 'string' || !t || /\0/.test(t)) throw new Error(`The target for "${a}" must be a folder path.`);
  }
  if (cfg.lite !== undefined && typeof cfg.lite !== 'boolean') throw new Error('"lite" must be true or false.');
  if (cfg.version !== undefined) satisfies('0.0.0', cfg.version); // validates the range syntax
  return { version: cfg.version, agents, bundles, skills, lite: !!cfg.lite, targets };
}
