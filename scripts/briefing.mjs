#!/usr/bin/env node
// briefing — run a whole role's weekly cycle as ONE artifact. A briefing pack
// (config/briefings/*.json) sequences several skills into a single document:
// "PM Monday" = stakeholder update + roadmap health + the decision to force,
// composed into one brief instead of you running three skills by hand.
//
//   node scripts/briefing.mjs pm-monday --var notes=@notes.txt --var roadmap="Q3 …"
//   node scripts/briefing.mjs founder-weekly            # missing vars → labelled [FILL IN]
//   node scripts/briefing.mjs pm-monday --dry-run       # no API; show the plan
//   node scripts/briefing.mjs --list
// Vars fill {{name}} placeholders in each section's prompt. @file reads a file.
// Needs ANTHROPIC_API_KEY (unless --dry-run). → docs/reports/briefings/<id>-<date>.md
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete } from '../bin/lib/anthropic.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const has = (n) => args.includes('--' + n);
const dir = join(root, 'config', 'briefings');

if (has('list') || !args.find((a) => !a.startsWith('--'))) {
  const packs = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.json')) : [];
  console.log('Briefing packs:');
  for (const f of packs) { const p = JSON.parse(readFileSync(join(dir, f), 'utf8')); console.log(`  ${p.id.padEnd(18)} ${p.title} — ${p.role} · ${p.sections.length} sections`); }
  console.log('\nRun: node scripts/briefing.mjs <id> [--var name=value | --var name=@file] [--dry-run]');
  process.exit(0);
}

const id = args.find((a) => !a.startsWith('--'));
const path = join(dir, id + '.json');
if (!existsSync(path)) { console.error(`No briefing "${id}". Try --list.`); process.exit(1); }
const pack = JSON.parse(readFileSync(path, 'utf8'));

// Collect --var name=value (value may be @file).
const vars = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--var' && args[i + 1]) {
    const eq = args[i + 1].indexOf('='); if (eq < 0) continue;
    const k = args[i + 1].slice(0, eq); let v = args[i + 1].slice(eq + 1);
    if (v.startsWith('@') && existsSync(v.slice(1))) v = readFileSync(v.slice(1), 'utf8');
    vars[k] = v;
  }
}
const fill = (s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] || '(not provided — mark [FILL IN])');

const skills = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills || [];
const skillOf = (n) => skills.find((s) => s.name === n);

if (has('dry-run')) {
  console.log(`${pack.title} (${pack.role}) — ${pack.sections.length} sections:`);
  for (const s of pack.sections) { const ok = skillOf(s.skill); console.log(`  ${ok ? '·' : '✗ MISSING'} ${s.skill} → ${s.heading}`); }
  process.exit(0);
}
const key = process.env.ANTHROPIC_API_KEY;
if (!key) { console.error('ANTHROPIC_API_KEY not set (use --dry-run).'); process.exit(1); }

const stamp = new Date().toISOString().slice(0, 10);
let doc = `# ${pack.title} — ${stamp}\n\n> ${pack.intro}\n\n_Generated briefing · review before sending._\n`;
for (const sec of pack.sections) {
  const skill = skillOf(sec.skill);
  doc += `\n---\n\n## ${sec.heading}\n\n`;
  if (!skill) { doc += `_Skipped — skill \`${sec.skill}\` not found in this library._\n`; console.error(`  ✗ ${sec.skill} missing — skipped`); continue; }
  const out = await complete({ apiKey: key, system: skill.body || skill.instructions || skill.description, messages: [{ role: 'user', content: fill(sec.prompt) }], maxTokens: 1600 });
  doc += out.trim() + '\n';
  console.error(`  ✓ ${sec.heading} (${sec.skill})`);
}

const outDir = join(root, 'docs', 'reports', 'briefings');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const file = join(outDir, `${pack.id}-${stamp}.md`);
writeFileSync(file, doc);
console.log(`Wrote docs/reports/briefings/${pack.id}-${stamp}.md — ${pack.sections.length} sections.`);
