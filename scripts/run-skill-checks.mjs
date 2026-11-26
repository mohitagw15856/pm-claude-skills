#!/usr/bin/env node
// Per-skill contract checks: deterministic pass criteria a contributor can ship
// next to a skill, cheap enough to run on every PR with no API key.
//
// A check file is skills/<name>/evals.json or evals/checks/<name>.json:
//   { "skill": "<name>", "cases": [ { "name": "...", "prompt": "...",
//       "pass": { "must_include": [..], "must_match": [regex.., matched case-insensitively],
//                 "forbid": [..], "min_lines": N } } ] }
//
// Two modes:
//   offline (default): criteria run against the skill's recorded example
//     (examples/<skill>-example.md, falling back to the SKILL.md itself), so CI
//     catches drift between a skill's output contract, its example and its
//     checks. min_lines is skipped offline (it describes live output length).
//   --live: each case's prompt runs against the model with the skill loaded
//     (needs ANTHROPIC_API_KEY; costs tokens) and the full criteria apply to
//     the model's output.
//
//   node scripts/run-skill-checks.mjs                 # all check files, offline
//   node scripts/run-skill-checks.mjs --skill prd-template
//   node scripts/run-skill-checks.mjs --changed       # only skills touched vs origin/main
//   node scripts/run-skill-checks.mjs --live --skill lease-decoder
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const val = (n) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : null; };
const LIVE = flag('live');
const MODEL = val('model') || 'claude-sonnet-5-5';

function checkFiles() {
  const out = new Map();
  const central = join(root, 'evals', 'checks');
  if (existsSync(central)) for (const f of readdirSync(central)) if (f.endsWith('.json')) out.set(basename(f, '.json'), join(central, f));
  for (const name of readdirSync(join(root, 'skills'))) {
    const f = join(root, 'skills', name, 'evals.json');
    if (existsSync(f)) out.set(name, f);   // the in-skill file wins
  }
  return out;
}

function changedSkills() {
  try {
    const diff = execFileSync('git', ['diff', '--name-only', 'origin/main...HEAD'], { cwd: root, encoding: 'utf8' });
    const set = new Set();
    for (const line of diff.split('\n')) {
      let m = line.match(/^skills\/([^/]+)\//); if (m) set.add(m[1]);
      m = line.match(/^evals\/checks\/([^/]+)\.json$/); if (m) set.add(m[1]);
    }
    return set;
  } catch { return null; }   // no origin/main (shallow CI checkout): run everything
}

async function liveOutput(skill, prompt) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { console.error('--live needs ANTHROPIC_API_KEY'); process.exit(2); }
  const body = readFileSync(join(root, 'skills', skill, 'SKILL.md'), 'utf8');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 2048, system: `Follow this skill exactly:\n\n${body}`, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return (data.content || []).map((c) => c.text || '').join('\n');
}

function applyCriteria(text, pass, { offline }) {
  const fails = [];
  for (const s of pass.must_include || []) if (!text.includes(s)) fails.push(`missing "${s}"`);
  for (const r of pass.must_match || []) if (!new RegExp(r, 'im').test(text)) fails.push(`no match for /${r}/`);
  for (const s of pass.forbid || []) if (text.includes(s)) fails.push(`contains forbidden "${s}"`);
  if (!offline && pass.min_lines && text.split('\n').length < pass.min_lines) fails.push(`under ${pass.min_lines} lines`);
  return fails;
}

const files = checkFiles();
let only = null;
if (val('skill')) only = new Set([val('skill')]);
else if (flag('changed')) { only = changedSkills(); if (only && !only.size) { console.log('Skill checks: no changed skills with checks. ✓'); process.exit(0); } }

let ran = 0, failed = 0;
for (const [skill, file] of [...files].sort()) {
  if (only && !only.has(skill)) continue;
  let spec;
  try { spec = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { console.error(`✗ ${skill}: unreadable check file (${e.message})`); failed++; continue; }
  if (spec.skill !== skill) { console.error(`✗ ${skill}: check file declares skill "${spec.skill}"`); failed++; continue; }
  if (!existsSync(join(root, 'skills', skill, 'SKILL.md'))) { console.error(`✗ ${skill}: no such skill`); failed++; continue; }
  const examplePath = join(root, 'examples', `${skill}-example.md`);
  const offlineText = existsSync(examplePath) ? readFileSync(examplePath, 'utf8') : readFileSync(join(root, 'skills', skill, 'SKILL.md'), 'utf8');
  for (const c of spec.cases || []) {
    ran++;
    const text = LIVE ? await liveOutput(skill, c.prompt) : offlineText;
    const fails = applyCriteria(text, c.pass || {}, { offline: !LIVE });
    if (fails.length) { failed++; console.error(`✗ ${skill} :: ${c.name}${LIVE ? ' [live]' : ''}\n    ${fails.join('\n    ')}`); }
    else console.log(`✓ ${skill} :: ${c.name}${LIVE ? ' [live]' : ''}`);
  }
}

if (!ran) { console.log('Skill checks: nothing to run.'); process.exit(0); }
if (failed) { console.error(`\nSkill checks: ${failed} failure(s) across ${ran} case(s).`); process.exit(1); }
console.log(`\nSkill checks: ${ran} case(s) passed${LIVE ? ' against the live model' : ' against recorded examples'}. ✓`);
