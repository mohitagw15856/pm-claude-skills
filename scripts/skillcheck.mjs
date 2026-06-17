#!/usr/bin/env node
// SkillCheck — validates every skills/<name>/SKILL.md against the project's
// authoring standard (see SKILL-AUTHORING-STANDARD.md). Errors fail the build;
// warnings are reported but don't fail unless --strict is passed.
//
// Usage:
//   node scripts/skillcheck.mjs            # validate all skills
//   node scripts/skillcheck.mjs --strict   # treat warnings as errors
//   node scripts/skillcheck.mjs --json     # machine-readable report
//
// No dependencies.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const asJson = args.includes('--json');

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: null, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      meta[kv[1]] = v;
    }
  }
  return { meta, body: m[2] };
}

// Validate one skill folder. Returns { name, errors[], warnings[] }.
function checkSkill(name) {
  const errors = [];
  const warnings = [];
  const file = join(skillsDir, name, 'SKILL.md');

  if (!existsSync(file)) {
    errors.push('No SKILL.md in folder.');
    return { name, errors, warnings };
  }

  const text = readFileSync(file, 'utf8');
  const { meta, body } = parseFrontmatter(text);

  if (!meta) {
    errors.push('Missing or malformed YAML frontmatter (--- name/description ---).');
    return { name, errors, warnings };
  }

  // --- Frontmatter: hard requirements ---
  if (!meta.name) errors.push('Frontmatter is missing `name`.');
  else if (meta.name !== name) errors.push(`Frontmatter name "${meta.name}" does not match folder "${name}".`);

  if (!meta.description) {
    errors.push('Frontmatter is missing `description`.');
  } else {
    const d = meta.description;
    if (/your-skill-name|one sentence\.|trigger condition|output description/i.test(d))
      errors.push('Description still contains template placeholder text.');
    if (!/\buse when\b/i.test(d)) warnings.push('Description has no "Use when …" trigger clause.');
    if (!/\bproduce(s|d)?\b/i.test(d)) warnings.push('Description does not state what it Produces.');
    if (d.length < 40) warnings.push(`Description is very short (${d.length} chars).`);
    if (d.length > 700) warnings.push(`Description is very long (${d.length} chars) — trim for the trigger budget.`);
  }

  // --- Body checks ---
  const trimmed = body.trim();
  if (!/^#\s+.+/m.test(trimmed)) errors.push('Body has no top-level `# Title` heading.');
  if (/\[Instructions for Claude to follow/i.test(trimmed)) errors.push('Body still contains the template stub line.');
  if (trimmed.length < 300) warnings.push(`Body is very short (${trimmed.length} chars) for a reusable skill.`);

  // --- Recommended sections (warn only) ---
  if (!/^#{2,3}\s+.*quality check/im.test(trimmed)) warnings.push('No "Quality Checks" section.');
  if (!/^#{2,3}\s+.*anti-?pattern/im.test(trimmed)) warnings.push('No "Anti-Patterns" section.');

  return { name, errors, warnings };
}

// --- Run across all skills ---
const names = readdirSync(skillsDir).filter((n) => statSync(join(skillsDir, n)).isDirectory());
const results = names.map(checkSkill);

// --- Cross-file: tier membership must reference real skills ---
const tierErrors = [];
const tiersFile = join(root, 'skill-tiers.json');
if (existsSync(tiersFile)) {
  const tiers = JSON.parse(readFileSync(tiersFile, 'utf8'));
  const valid = new Set(names);
  for (const key of ['productionReady', 'experimental']) {
    for (const n of tiers[key] || []) {
      if (!valid.has(n)) tierErrors.push(`skill-tiers.json "${key}" references unknown skill "${n}".`);
    }
  }
}

const totalErrors = results.reduce((a, r) => a + r.errors.length, 0) + tierErrors.length;
const totalWarnings = results.reduce((a, r) => a + r.warnings.length, 0);

if (asJson) {
  console.log(JSON.stringify(
    { skills: names.length, errors: totalErrors, warnings: totalWarnings, tierErrors, results: results.filter((r) => r.errors.length || r.warnings.length) },
    null, 2
  ));
} else {
  for (const r of results) {
    for (const e of r.errors) console.log(`  ✖ ${r.name}: ${e}`);
    for (const w of r.warnings) console.log(`  ⚠ ${r.name}: ${w}`);
  }
  for (const e of tierErrors) console.log(`  ✖ tiers: ${e}`);
  console.log(`\nSkillCheck — ${names.length} skills · ${totalErrors} error(s) · ${totalWarnings} warning(s)`);
}

const failed = totalErrors > 0 || (strict && totalWarnings > 0);
if (failed) {
  if (!asJson) console.log(strict && totalWarnings && !totalErrors ? 'Failed (--strict: warnings count as errors).' : 'Failed.');
  process.exit(1);
} else if (!asJson) {
  console.log('All skills valid. ✓');
}
