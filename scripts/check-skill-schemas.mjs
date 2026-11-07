#!/usr/bin/env node
// Validates the typed contracts in schemas/skills/<name>.json (SkillSpec section 9.2).
// No dependencies: a small structural walk rather than a full JSON Schema validator.
//
//   node scripts/check-skill-schemas.mjs          # exits 1 on any problem
//   node scripts/check-skill-schemas.mjs --list   # also prints the contract table
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'schemas', 'skills');
const TYPES = new Set(['object', 'array', 'string', 'number', 'integer', 'boolean', 'null']);
const problems = [];

function walk(node, path, file) {
  if (!node || typeof node !== 'object') { problems.push(`${file}: ${path} is not a schema object`); return; }
  if (node.$ref) return;
  if (node.const !== undefined) return;
  if (node.type && !TYPES.has(node.type)) problems.push(`${file}: ${path} has unknown type "${node.type}"`);
  if (node.enum && (!Array.isArray(node.enum) || !node.enum.length)) problems.push(`${file}: ${path} enum must be a non-empty array`);
  if (node.type === 'object') {
    const props = node.properties || {};
    for (const [k, v] of Object.entries(props)) walk(v, `${path}.${k}`, file);
    for (const r of node.required || []) if (!(r in props)) problems.push(`${file}: ${path} requires "${r}" which is not a property`);
    if (node.additionalProperties && typeof node.additionalProperties === 'object') walk(node.additionalProperties, `${path}.*`, file);
  }
  if (node.type === 'array') {
    if (!node.items) problems.push(`${file}: ${path} array has no items`);
    else walk(node.items, `${path}[]`, file);
  }
}

const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith('.json')).sort() : [];
const rows = [];
for (const f of files) {
  const name = basename(f, '.json');
  let c;
  try { c = JSON.parse(readFileSync(join(DIR, f), 'utf8')); } catch (e) { problems.push(`${f}: invalid JSON (${e.message})`); continue; }
  if (c.skill !== name) problems.push(`${f}: "skill" is "${c.skill}", expected "${name}"`);
  if (!Number.isInteger(c.version) || c.version < 1) problems.push(`${f}: "version" must be a positive integer`);
  if (!existsSync(join(ROOT, 'skills', name, 'SKILL.md'))) problems.push(`${f}: no skills/${name}/SKILL.md`);
  for (const side of ['inputs', 'outputs']) {
    const s = c[side];
    if (!s || s.type !== 'object' || !s.properties || !Object.keys(s.properties).length) { problems.push(`${f}: "${side}" must be an object schema with properties`); continue; }
    walk(s, side, f);
  }
  rows.push({ skill: name, inputs: Object.keys(c.inputs?.properties || {}).length, required: (c.inputs?.required || []).length, outputs: Object.keys(c.outputs?.properties || {}).length });
}

if (process.argv.includes('--list')) console.table(rows);
if (problems.length) {
  console.error(`check-skill-schemas: ${problems.length} problem(s)`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log(`check-skill-schemas: ${files.length} contract(s) valid`);
