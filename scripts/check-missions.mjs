#!/usr/bin/env node
// Validates missions/*.json: every stage names a pipeline in pipelines/, every
// required pipeline input is bound, and the mission, flattened into one long
// chain, fits the typed contracts in schemas/skills/. Runs in npm run check.
//
//   node scripts/check-missions.mjs          # exits 1 on any error
//   node scripts/check-missions.mjs --list   # also prints each plan
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContracts, loadPipelines } from '../bin/lib/pipelines.mjs';
import { loadMissions, validateMission } from '../bin/lib/missions.mjs';
import { REGISTRY } from '../bin/lib/models.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const list = process.argv.includes('--list');
const contracts = loadContracts(ROOT);
const pipelines = loadPipelines(ROOT);
const missions = loadMissions(ROOT);
let errors = 0, warnings = 0;
const ids = new Set();

for (const { file, def, error } of missions) {
  if (!def) { console.error(`✗ missions/${file}: ${error}`); errors++; continue; }
  const local = [];
  if (def.id && file !== `${def.id}.json`) local.push(`id "${def.id}" does not match the file name`);
  if (ids.has(def.id)) local.push('duplicate id');
  ids.add(def.id);
  if (def.model_role && !(def.model_role in REGISTRY.roles)) local.push(`model_role "${def.model_role}" is not a role in data/models.json (${Object.keys(REGISTRY.roles).join(', ')})`);
  const r = validateMission(def, pipelines, contracts);
  for (const e of [...local, ...r.errors]) console.error(`✗ missions/${file}: ${e}`);
  for (const w of r.warnings) console.warn(`  ! missions/${file}: ${w}`);
  errors += local.length + r.errors.length; warnings += r.warnings.length;
  if (list && !r.errors.length) {
    console.log(`\n${def.id}: ${r.stages.map((s) => s.pipeline).join(' > ')}`);
    for (const s of r.stages) console.log(`  ${s.id}: ${s.steps.join(', ')}${s.checkpoint ? '  [checkpoint]' : ''}`);
  }
}
if (!missions.length) console.log('No missions/ directory or no missions in it.');
if (errors) { console.error(`\nMissions: ${errors} error(s) in ${missions.length} mission(s).`); process.exit(1); }
console.log(`Missions: ${missions.length} valid, ${pipelines.length} pipelines, ${contracts.size} contracts${warnings ? ` (${warnings} warning(s))` : ''}.`);
