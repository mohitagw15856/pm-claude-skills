#!/usr/bin/env node
// Validates pipelines/*.json against the typed contracts in schemas/skills/:
// every step names a contracted skill, every required input is bound, every
// $.reference resolves to a real field of an earlier step, and the types fit.
// Runs in npm run check. No dependencies.
//
//   node scripts/check-pipelines.mjs          # exits 1 on any error
//   node scripts/check-pipelines.mjs --list   # also prints each plan
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContracts, loadPipelines, validatePipeline } from '../bin/lib/pipelines.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const list = process.argv.includes('--list');
const contracts = loadContracts(ROOT);
const pipelines = loadPipelines(ROOT);
let errors = 0, warnings = 0;
const ids = new Set();

for (const { file, def, error } of pipelines) {
  if (!def) { console.error(`✗ pipelines/${file}: ${error}`); errors++; continue; }
  if (def.id && file !== `${def.id}.json`) { console.error(`✗ pipelines/${file}: id "${def.id}" does not match the file name`); errors++; }
  if (ids.has(def.id)) { console.error(`✗ pipelines/${file}: duplicate id`); errors++; }
  ids.add(def.id);
  const r = validatePipeline(def, contracts);
  for (const e of r.errors) console.error(`✗ pipelines/${file}: ${e}`);
  for (const w of r.warnings) console.warn(`  ! pipelines/${file}: ${w}`);
  errors += r.errors.length; warnings += r.warnings.length;
  if (list && !r.errors.length) {
    console.log(`\n${def.id}: ${r.plan.map((s) => s.skill).join(' > ')}`);
    for (const s of r.plan) {
      console.log(`  ${s.id} (${s.skill})`);
      for (const [k, b] of Object.entries(s.inputs)) console.log(`    ${k} <- ${'ref' in b ? b.ref + (b.pick ? ` pick ${b.pick}` : '') + (b.map ? ` map ${JSON.stringify(b.map)}` : '') : JSON.stringify(b.literal)}`);
    }
  }
}
if (!pipelines.length) console.log('No pipelines/ directory or no pipelines in it.');
if (errors) { console.error(`\nPipelines: ${errors} error(s) in ${pipelines.length} pipeline(s).`); process.exit(1); }
console.log(`Pipelines: ${pipelines.length} valid against ${contracts.size} contracts${warnings ? ` (${warnings} warning(s))` : ''}.`);
