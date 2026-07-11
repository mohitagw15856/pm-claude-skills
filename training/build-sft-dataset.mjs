#!/usr/bin/env node
// Build the SFT dataset for pm-skills-7b: every skill becomes training pairs —
// (professional task in the skill's domain) → (skill-structured response contract).
// Two tracks: ROUTING (task → which skill + why) and STRUCTURE (task → the
// skill's output skeleton with its quality bar). This teaches a small model the
// library's *judgment shape* without needing API-generated completions.
//
//   node training/build-sft-dataset.mjs        # → training/sft.jsonl
// For higher-quality completions, generate teacher outputs first (costs API):
//   node training/build-sft-dataset.mjs --teacher  # uses evals/cases.json inputs (153) via your key
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { skills } = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const cases = JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases;
const caseBySkill = {};
for (const c of cases) (caseBySkill[c.skill] ||= []).push(c.input);

const rows = [];
for (const s of skills) {
  const body = s.instructions || '';
  const checks = (body.match(/##\s*Quality Checks\s*\n([\s\S]*?)(?=\n##\s|$)/i) || [, ''])[1]
    .split('\n').map((l) => l.replace(/^-\s*\[\s*\]\s*/, '').trim()).filter(Boolean).slice(0, 5);
  const desc = String(s.description);
  // ROUTING pair: a task phrasing → skill selection + reason.
  const useWhen = (desc.match(/Use when ([^.]+)/i) || [])[1];
  if (useWhen) rows.push({
    messages: [
      { role: 'user', content: `Which professional skill applies here, and why: ${useWhen.trim()}?` },
      { role: 'assistant', content: `**${s.name}** — ${desc.split(/\.\s/)[0]}. It fires ${useWhen.trim()}, and verifies itself against checks like: ${checks.slice(0, 2).join('; ') || 'its declared quality bar'}.` },
    ], track: 'routing', skill: s.name });
  // STRUCTURE pair: real eval input (if any) → the disciplined response contract.
  for (const input of (caseBySkill[s.name] || []).slice(0, 2)) {
    rows.push({
      messages: [
        { role: 'user', content: input },
        { role: 'assistant', content: `I'll approach this with the ${s.title} discipline.\n\n${sectionSkeleton(body)}\n\nBefore delivering, I verify against this bar:\n${checks.map((c) => '- ' + c).join('\n')}` },
      ], track: 'structure', skill: s.name });
  }
}
function sectionSkeleton(body) {
  const heads = [...body.matchAll(/^##\s+(?!Quality Checks|Anti-Patterns|Example|Based On|Deeper|Reads from)(.+)$/gm)].map((m) => m[1]).slice(0, 5);
  return heads.length ? 'Structure:\n' + heads.map((h, i) => `${i + 1}. ${h}`).join('\n') : 'Structure: per the skill\'s declared output format.';
}
writeFileSync(join(root, 'training', 'sft.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
console.log(`Wrote training/sft.jsonl — ${rows.length} pairs (${rows.filter((r) => r.track === 'routing').length} routing, ${rows.filter((r) => r.track === 'structure').length} structure) from ${skills.length} skills.`);
