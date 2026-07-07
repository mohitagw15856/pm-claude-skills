#!/usr/bin/env node
// skillspec — the standalone SKILL.md validator. Lint any repo's Agent Skills
// against SkillSpec (https://github.com/mohitagw15856/pm-claude-skills/blob/main/SKILLSPEC.md):
// structural conformance (L1 Loadable → L3 Trustworthy) plus the security-pattern
// scan used by the pm-skills curated library and community registry.
//
//   npx skillspec-check                          # scan the current directory
//   npx skillspec-check skills/ path/to/SKILL.md # specific dirs/files
//   npx skillspec-check --min-level 2 --strict   # gate CI on conformance
//   npx skillspec-check --json                   # machine-readable
//
// Exit codes: 0 clean · 1 errors (or warnings with --strict, or below --min-level).
// No dependencies, Node ≥ 18.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const asJson = args.includes('--json');
const minLevel = (() => { const i = args.indexOf('--min-level'); return i >= 0 ? parseInt(args[i + 1], 10) || 0 : 0; })();
const paths = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--min-level');

// Security patterns — mirrored from the pm-skills registry validator.
// The four BANNED patterns are unambiguous → errors. The curl rule is
// context-dependent (engineering docs legitimately contain install/health-check
// examples) → it warns for human review instead of failing the build; localhost
// is exempt entirely.
const BANNED = [
  [/ignore (all |any )?(previous|prior|above) (instructions|rules)/i, 'instruction-override phrasing'],
  [/disregard (your|the) (system prompt|guidelines|instructions)/i, 'instruction-override phrasing'],
  [/send (the )?(user('|’)s)? ?(data|input|conversation|api key)/i, 'data-exfiltration instruction'],
  [/\b(api[_-]?key|token|password)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}/, 'embedded credential'],
];
const CURL_REVIEW = /curl\s+-?[a-z]*\s*https?:\/\/(?!localhost|127\.0\.0\.1|raw\.githubusercontent|github\.com|docs\.)/i;

function findSkillFiles(p) {
  const st = statSync(p);
  if (st.isFile()) return p.endsWith('.md') ? [p] : [];
  const out = [];
  for (const e of readdirSync(p)) {
    if (e === 'node_modules' || e.startsWith('.')) continue;
    const c = join(p, e);
    try {
      if (statSync(c).isDirectory()) out.push(...findSkillFiles(c));
      else if (basename(c) === 'SKILL.md') out.push(c);
    } catch { /* broken symlink etc. */ }
  }
  return out;
}

function check(file) {
  const text = readFileSync(file, 'utf8');
  const errors = [], warnings = [];
  const fm = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---\r?\n?([\s\S]*)$/);

  if (!fm) return { file, level: 0, errors: ['no YAML frontmatter — not loadable (below L1)'], warnings };
  const meta = {};
  for (const line of fm[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  const body = fm[2] || '';

  // L1 — loadable: name + description that lets an agent decide when to fire.
  if (!meta.name) errors.push('frontmatter missing `name`');
  else {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.name)) errors.push(`name "${meta.name}" must be lowercase-kebab`);
    const folder = basename(dirname(file));
    if (folder !== meta.name && basename(file) === 'SKILL.md' && folder !== '.' && !paths.some((p) => resolve(p) === resolve(file)))
      warnings.push(`folder "${folder}" ≠ frontmatter name "${meta.name}" — most agents key on the folder`);
  }
  if (!meta.description) errors.push('frontmatter missing `description`');
  else {
    if (meta.description.length < 60) warnings.push(`description is ${meta.description.length} chars — too thin for an agent to know when to use it (aim 100-400)`);
    if (!/use when/i.test(meta.description)) warnings.push('description has no "Use when …" — trigger conditions are what make auto-discovery work');
  }
  const level0 = errors.length > 0;

  // L2 — structured: declared inputs and outputs.
  const l2 = /##\s*(What This Skill Produces|Required Inputs|Input)/i.test(body) && /##\s*(Output|Deliverable)|##[^\n]*\b(Template|Structure|Format)\b/i.test(body);
  if (!l2) warnings.push('missing input/output sections ("What This Skill Produces"/"Required Inputs" + an Output section) — stops at L1');

  // L3 — trustworthy: self-verification.
  const l3 = l2 && /##\s*Quality Checks/i.test(body) && /##\s*Anti-Patterns/i.test(body);
  if (l2 && !l3) warnings.push('missing "Quality Checks" and/or "Anti-Patterns" — stops at L2');

  // Security scan (any level).
  for (const [re, why] of BANNED) if (re.test(text)) errors.push(`SECURITY — ${why}`);
  if (CURL_REVIEW.test(text)) warnings.push('contains a curl to an external URL — fine in docs/examples; review that it is not an instruction to exfiltrate');

  // Hygiene.
  if (text.length > 64 * 1024) warnings.push(`SKILL.md is ${Math.round(text.length / 1024)} KB — agents load this whole file; consider moving depth to references/`);
  if (/\bTODO\b|\bTBD\b|lorem ipsum/i.test(body)) warnings.push('contains TODO/TBD/placeholder text');

  const level = level0 ? 0 : l3 ? 3 : l2 ? 2 : 1;
  return { file, name: meta.name || null, level, errors, warnings };
}

// ── Run ────────────────────────────────────────────────────────────────────────
const roots = paths.length ? paths : ['.'];
let files = [];
for (const p of roots) {
  if (!existsSync(p)) { console.error(`Path not found: ${p}`); process.exit(2); }
  files.push(...findSkillFiles(p));
}
files = [...new Set(files)];
if (!files.length) { console.error('No SKILL.md files found.'); process.exit(2); }

const results = files.map(check);
const L = ['L0 not loadable', 'L1 Loadable', 'L2 Structured', 'L3 Trustworthy'];

if (asJson) {
  console.log(JSON.stringify({ spec: 'skillspec/1', results }, null, 2));
} else {
  for (const r of results) {
    const flag = r.errors.length ? '✗' : r.warnings.length ? '⚠' : '✓';
    console.log(`${flag} ${r.file}  [${L[r.level]}]`);
    for (const e of r.errors) console.log(`    ✗ ${e}`);
    for (const w of r.warnings) console.log(`    ⚠ ${w}`);
  }
  const counts = [0, 0, 0, 0];
  results.forEach((r) => counts[r.level]++);
  console.log(`\n${results.length} skill(s): ${counts[3]} × L3 · ${counts[2]} × L2 · ${counts[1]} × L1 · ${counts[0]} × not loadable`);
}

const hasErrors = results.some((r) => r.errors.length);
const hasWarnings = results.some((r) => r.warnings.length);
const belowMin = minLevel > 0 && results.some((r) => r.level < minLevel);
if (belowMin && !asJson) console.log(`✗ ${results.filter((r) => r.level < minLevel).length} skill(s) below --min-level ${minLevel}`);
process.exit(hasErrors || belowMin || (strict && hasWarnings) ? 1 : 0);
