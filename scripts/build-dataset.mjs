#!/usr/bin/env node
// Build the pm-skills instruction dataset from the repo's canonical sources —
// the first step toward distilling the library into a small model ("pm-skills-3b").
// Deterministic, stdlib-only. Regenerate after skills change:
//
//   node scripts/build-dataset.mjs
//
// Outputs (dataset/):
//   routing.jsonl   — chat-format pairs teaching skill routing (task → skill name),
//                     derived mechanically from each skill's "Use when …" triggers.
//   sft-seeds.jsonl — {system: full SKILL.md body, user: curated eval input,
//                     assistant: null, skill} — seeds for teacher-model completion
//                     generation (see dataset/README.md for the distillation recipe).
//   samples.jsonl   — full SFT triplets where a real graded sample output exists
//                     (web/samples.json).
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'dataset');
if (!existsSync(outDir)) mkdirSync(outDir);

// ── Load canonical sources ────────────────────────────────────────────────────
const skillsDir = join(root, 'skills');
const skills = [];
for (const name of readdirSync(skillsDir).sort()) {
  const f = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(f)) continue;
  const raw = readFileSync(f, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) continue;
  const desc = (m[1].match(/^description:\s*["']?([\s\S]*?)["']?\s*$/m) || [])[1] || '';
  skills.push({ name, description: desc.replace(/\s+/g, ' ').trim(), body: m[2].trim() });
}
const cases = JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases || [];
const samples = JSON.parse(readFileSync(join(root, 'web', 'samples.json'), 'utf8')).samples || [];
const byName = new Map(skills.map((s) => [s.name, s]));

// ── routing.jsonl — task phrasings → skill name ──────────────────────────────
// Mechanically derive realistic user phrasings from the description's trigger
// clause ("Use when asked to A, B, or C" → one pair per trigger).
const ROUTE_SYSTEM = 'You route professional tasks to the best skill from the pm-skills library. Reply with the skill name only.';
function triggerPhrases(desc) {
  const m = desc.match(/Use when ([^.]*)\./i);
  if (!m) return [];
  let t = m[1]
    .replace(/^asked (to|for) /i, '')
    .replace(/\basked (to|for) /gi, '')
    .replace(/\bthe user says\b/gi, '')
    .replace(/\bor when\b/gi, ',');
  return t
    .split(/,| or /i)
    .map((p) => p.trim().replace(/^(to|for|when|a|an) /i, '').replace(/["']/g, ''))
    .filter((p) => p.length > 12 && p.length < 140);
}
const routing = [];
for (const s of skills) {
  for (const phrase of triggerPhrases(s.description).slice(0, 4)) {
    routing.push({
      messages: [
        { role: 'system', content: ROUTE_SYSTEM },
        { role: 'user', content: phrase.charAt(0).toUpperCase() + phrase.slice(1) },
        { role: 'assistant', content: s.name },
      ],
    });
  }
}

// ── sft-seeds.jsonl — curated eval inputs paired with the skill body ─────────
// assistant is intentionally null: generate completions with a strong teacher
// model, filter with the eval rubric, then train. See dataset/README.md.
const seeds = [];
for (const c of cases) {
  const s = byName.get(c.skill);
  if (!s || !c.input) continue;
  seeds.push({ system: s.body, user: c.input, assistant: null, skill: c.skill });
}

// ── samples.jsonl — real triplets from the published sample outputs ──────────
const triplets = [];
for (const smp of samples) {
  const s = byName.get(smp.skill);
  if (!s || !smp.input || !smp.output) continue;
  triplets.push({ system: s.body, user: smp.input, assistant: smp.output, skill: smp.skill, source: smp.source || null });
}

// ── Write + self-verify ──────────────────────────────────────────────────────
const write = (file, rows) => {
  const text = rows.map((r) => JSON.stringify(r)).join('\n') + '\n';
  text.trimEnd().split('\n').forEach((l) => JSON.parse(l)); // every line must parse
  writeFileSync(join(outDir, file), text);
  console.log(`dataset/${file} — ${rows.length} rows`);
};
write('routing.jsonl', routing);
write('sft-seeds.jsonl', seeds);
write('samples.jsonl', triplets);
console.log(`from ${skills.length} skills · ${cases.length} eval cases · ${samples.length} samples`);
