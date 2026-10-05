#!/usr/bin/env node
// Lite skills (bin/lib/lite.mjs): every live skill, condensed for small models,
// must keep what drives its output and its safety lines.
//
//   node tests/lite-test.mjs            # assert over the whole library
//   node tests/lite-test.mjs --report   # also print the size report
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { liteify, liteStats } from '../bin/lib/lite.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fails = [];
let n = 0, full = 0, lite = 0;
const KEPT = ['## Required Inputs', '## Quality Checks'];
const DISCLAIMER = /not (legal|tax|medical|financial) advice|不构成|免责/i;

for (const name of readdirSync(join(root, 'skills')).sort()) {
  const p = join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(p)) continue;
  const text = readFileSync(p, 'utf8');
  if (/^deprecated:/m.test(text)) continue;
  n++;
  const out = liteify(text);
  const s = liteStats(text);
  full += s.fullTokens; lite += s.liteTokens;
  if (!/^---\n[\s\S]*?\nlite: true\n---\n/.test(out)) fails.push(`${name}: lite frontmatter missing`);
  if (!out.includes(`name: ${name}`)) fails.push(`${name}: name lost`);
  for (const h of KEPT) if (text.includes(`\n${h}`) && !out.includes(`\n${h}`)) fails.push(`${name}: ${h} dropped`);
  if (DISCLAIMER.test(text) && !DISCLAIMER.test(out)) fails.push(`${name}: disclaimer dropped`);
  if (liteify(out) !== out) fails.push(`${name}: not idempotent`);
  if (out.length > text.length + 200) fails.push(`${name}: lite is longer than the full skill`);
}

if (process.argv.includes('--report')) {
  console.log(`Lite skills: ${n} skills, average ${Math.round(full / n)} → ${Math.round(lite / n)} tokens (${Math.round((1 - lite / full) * 100)}% smaller).`);
}
if (fails.length) {
  console.error(`Lite test: ${fails.length} failure(s)`);
  for (const f of fails.slice(0, 30)) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`Lite test: ${n} skills condensed, inputs, checks and disclaimers kept. ✓`);
