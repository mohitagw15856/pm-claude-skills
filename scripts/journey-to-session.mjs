// Journeys → sessions (product ideas #11 + #12).
//
// A journey (journeys/<id>.json) is a chain of skills with context that
// CARRIES between steps — the packs in PACKS.md are reading lists; journeys
// are the runnable version. This script:
//   --check          validates every journey: skills exist, no duplicate steps, required fields
//   <id>             renders one journey as an ordered SESSION PLAN (markdown) — each step's
//                    prompt names the skill and the context carried in from prior steps,
//                    so the Playground/cockpit can run a whole pack as one guided session
//   --all            renders every journey to journeys/rendered/<id>.md
//   --selftest
//
// The plan is what a "run this pack as one session" mode consumes: step N's
// prompt = the skill + the boundary + "you already have: <carried context>".

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'journeys');

export function loadJourneys(dir = DIR) {
  return readdirSync(dir).filter(f => f.endsWith('.json')).map(f => ({ file: f, ...JSON.parse(readFileSync(join(dir, f), 'utf8')) }));
}

export function validate(j, skillExists) {
  const errs = [];
  for (const k of ['id', 'name', 'boundary', 'steps']) if (!j[k]) errs.push(`${j.id || j.file}: missing "${k}"`);
  if (!Array.isArray(j.steps) || !j.steps.length) errs.push(`${j.id}: no steps`);
  const seen = new Set();
  for (const s of j.steps || []) {
    if (!s.skill) { errs.push(`${j.id}: step without skill`); continue; }
    if (!skillExists(s.skill)) errs.push(`${j.id}: unknown skill "${s.skill}"`);
    if (seen.has(s.skill)) errs.push(`${j.id}: duplicate step "${s.skill}"`);
    seen.add(s.skill);
    if (!s.why) errs.push(`${j.id}/${s.skill}: missing "why"`);
  }
  return errs;
}

export function renderSession(j) {
  const lines = [`# ${j.emoji || ''} ${j.name} — guided session`, '', `> ${j.boundary}`, ''];
  if (j.ask_first) lines.push(`**Before step 1, ask:** ${j.ask_first}`, '');
  if (j.voice) lines.push('**Voice mode:** one short step at a time; the user says "next" or "repeat".', '');
  let carried = [];
  j.steps.forEach((s, i) => {
    lines.push(`## Step ${i + 1} — \`${s.skill}\`${s.optional ? ' *(optional — skip if it doesn\'t apply)*' : ''}`, '', `**Why now:** ${s.why}`, '');
    lines.push(`**Prompt for this step:**`, '> Run the `' + s.skill + '` skill. ' + (carried.length ? `You already have from earlier steps: ${carried.join('; ')}. Don't ask for these again.` : 'This is the first step; gather only what the skill needs.') + ` ${j.boundary}`, '');
    if (s.carry?.length) { lines.push(`**Carry forward:** ${s.carry.join(' · ')}`, ''); carried = carried.concat(s.carry); }
  });
  lines.push(`## Done when`, '', j.done_when || '—', '');
  return lines.join('\n');
}

function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => c ? pass++ : (fail++, console.error('  ✗', m));
  const exists = n => ['a', 'b'].includes(n);
  const good = { id: 'j', name: 'J', boundary: 'b', steps: [{ skill: 'a', why: 'w', carry: ['x'] }, { skill: 'b', why: 'w' }] };
  ok(validate(good, exists).length === 0, 'valid journey passes');
  ok(validate({ ...good, steps: [{ skill: 'zzz', why: 'w' }] }, exists).some(e => /unknown skill/.test(e)), 'unknown skill flagged');
  ok(validate({ ...good, steps: [{ skill: 'a', why: 'w' }, { skill: 'a', why: 'w' }] }, exists).some(e => /duplicate/.test(e)), 'duplicate step flagged');
  const md = renderSession(good);
  ok(md.includes('Step 2') && md.includes('You already have from earlier steps: x'), 'carried context appears in step 2');
  console.log(`journey-to-session self-test: ${pass} passed · ${fail} failed`); return fail ? 1 : 0;
}

const argv = process.argv.slice(2);
if (argv.includes('--selftest')) process.exit(selftest());
const skillExists = n => existsSync(join(ROOT, 'skills', n, 'SKILL.md'));
const journeys = loadJourneys();
if (argv.includes('--check')) {
  const errs = journeys.flatMap(j => validate(j, skillExists));
  if (errs.length) { console.error('✗ journeys invalid:\n  ' + errs.join('\n  ')); process.exit(1); }
  console.log(`Journeys valid — ${journeys.length} journey(s), ${journeys.reduce((n, j) => n + j.steps.length, 0)} steps, all skills exist.`); process.exit(0);
}
if (argv.includes('--all')) {
  mkdirSync(join(DIR, 'rendered'), { recursive: true });
  for (const j of journeys) writeFileSync(join(DIR, 'rendered', `${j.id}.md`), renderSession(j));
  console.log(`Rendered ${journeys.length} session plan(s) → journeys/rendered/`); process.exit(0);
}
const id = argv[0]; const j = journeys.find(x => x.id === id);
if (!j) { console.error(`usage: node scripts/journey-to-session.mjs <id> | --all | --check\n  ids: ${journeys.map(x => x.id).join(', ')}`); process.exit(2); }
process.stdout.write(renderSession(j));
