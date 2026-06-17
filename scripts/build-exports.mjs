#!/usr/bin/env node
// Generates per-platform skill exports from the canonical skills/ directory.
//
// The body of each skills/<name>/SKILL.md is the single source of truth. This
// script renders that body into platform-specific artifacts so the same
// framework can be used on ChatGPT, Claude, and (in future) other tools without
// maintaining the content more than once.
//
// Usage:
//   node scripts/build-exports.mjs                 # (re)generate all platforms
//   node scripts/build-exports.mjs --platform chatgpt
//   node scripts/build-exports.mjs --check         # CI: fail if exports are stale
//
// No dependencies.
import {
  readFileSync, readdirSync, writeFileSync, existsSync, statSync,
  mkdirSync, rmSync,
} from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');
const pluginsDir = join(root, 'plugins');
const exportsDir = join(root, 'exports');

// ── Platform registry ───────────────────────────────────────────────────────
// To add a new platform (Gemini, Cursor, …), add an entry here. `render` gets
// { name, description, title, body, bundle } and returns the file contents.
const PLATFORMS = {
  chatgpt: {
    label: 'ChatGPT — Custom GPT instructions',
    dir: 'exports/chatgpt',
    file: 'SYSTEM_PROMPT.md',
    groupByBundle: true,
    // A Claude skill body is already a complete system prompt. ChatGPT keeps the
    // "Description" field separate, so we emit the body only (no frontmatter).
    render: ({ body }) => `${body.trim()}\n`,
  },
  // Example of how a future platform slots in (kept commented, not generated):
  // cursor: {
  //   label: 'Cursor — project rule (.mdc)',
  //   dir: 'exports/cursor',
  //   file: 'rule.mdc',
  //   groupByBundle: false,
  //   render: ({ description, body }) =>
  //     `---\ndescription: ${JSON.stringify(description)}\nalwaysApply: false\n---\n\n${body.trim()}\n`,
  // },
};

// ── Helpers (shared shape with web/build-skills.mjs) ────────────────────────
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      meta[kv[1]] = v;
    }
  }
  return { meta, body: m[2] };
}

function titleFromName(name) {
  return name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// skill name -> plugin bundle (for grouping)
function buildBundleMap() {
  const map = {};
  if (!existsSync(pluginsDir)) return map;
  for (const plugin of readdirSync(pluginsDir)) {
    const pSkills = join(pluginsDir, plugin, 'skills');
    if (existsSync(pSkills) && statSync(pSkills).isDirectory()) {
      for (const s of readdirSync(pSkills)) map[s] = plugin;
    }
  }
  return map;
}

function loadSkills() {
  const bundleMap = buildBundleMap();
  const skills = [];
  for (const name of readdirSync(skillsDir)) {
    const file = join(skillsDir, name, 'SKILL.md');
    if (!existsSync(file)) continue;
    const { meta, body } = parseFrontmatter(readFileSync(file, 'utf8'));
    const titleHeading = body.match(/^#\s+(.+)$/m);
    skills.push({
      name: meta.name || name,
      title: (titleHeading ? titleHeading[1] : titleFromName(meta.name || name)).replace(/\s+Skill$/i, ''),
      description: meta.description || '',
      body,
      bundle: bundleMap[name] || 'other',
    });
  }
  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

// Build the full path->content map a platform should produce.
function planPlatform(key, platform, skills) {
  const files = new Map();
  const base = join(root, platform.dir);
  for (const skill of skills) {
    const parts = [base];
    if (platform.groupByBundle) parts.push(skill.bundle);
    parts.push(skill.name, platform.file);
    files.set(join(...parts), platform.render(skill));
  }
  // Generated index for the platform.
  const index = [
    `# ${platform.label}`,
    '',
    `> Auto-generated from \`skills/*/SKILL.md\` by \`scripts/build-exports.mjs\`.`,
    `> **Do not edit these files by hand** — edit the source skill and regenerate.`,
    '',
    `${skills.length} skills exported. Copy a \`${platform.file}\` into the tool to use it.`,
    '',
    '| Skill | Bundle | Path |',
    '|---|---|---|',
    ...skills.map((s) => {
      const rel = relative(base, [...(platform.groupByBundle ? [join(base, s.bundle)] : [base]), s.name, platform.file].reduce((a, b) => join(a, b)));
      return `| ${s.title} | \`${s.bundle}\` | \`${rel}\` |`;
    }),
    '',
  ].join('\n');
  files.set(join(base, 'README.md'), index);
  return files;
}

function listExistingFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listExistingFiles(full));
    else out.push(full);
  }
  return out;
}

function writeRootReadme(activePlatforms, skillCount) {
  const lines = [
    '# Multi-Platform Exports',
    '',
    'These folders are **generated** from the canonical `skills/*/SKILL.md` files —',
    'the skill body is the single source of truth. Do not edit anything in `exports/`',
    'by hand; edit the source skill and run:',
    '',
    '```bash',
    'node scripts/build-exports.mjs',
    '```',
    '',
    `Currently exporting **${skillCount} skills** to:`,
    '',
    ...activePlatforms.map(([, p]) => `- **${p.label}** → \`${p.dir}/\``),
    '',
    'Adding a new platform is a few lines in the `PLATFORMS` registry of',
    '`scripts/build-exports.mjs` — no content is duplicated.',
    '',
  ];
  return lines.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const checkMode = args.includes('--check');
const platIdx = args.indexOf('--platform');
const onlyPlatform = platIdx !== -1 ? args[platIdx + 1] : null;

const skills = loadSkills();
const active = Object.entries(PLATFORMS).filter(([k]) => !onlyPlatform || k === onlyPlatform);
if (onlyPlatform && active.length === 0) {
  console.error(`Unknown platform '${onlyPlatform}'. Known: ${Object.keys(PLATFORMS).join(', ')}`);
  process.exit(2);
}

// Plan every file we intend to produce.
const planned = new Map();
for (const [key, platform] of active) {
  for (const [path, content] of planPlatform(key, platform, skills)) planned.set(path, content);
}
planned.set(join(exportsDir, 'README.md'), writeRootReadme(active, skills.length));

if (checkMode) {
  let drift = 0;
  for (const [path, content] of planned) {
    if (!existsSync(path) || readFileSync(path, 'utf8') !== content) {
      console.error(`stale: ${relative(root, path)}`);
      drift++;
    }
  }
  // Orphans: files under an active platform dir that we no longer plan to emit.
  for (const [, platform] of active) {
    for (const path of listExistingFiles(join(root, platform.dir))) {
      if (!planned.has(path)) { console.error(`orphan: ${relative(root, path)}`); drift++; }
    }
  }
  if (drift) {
    console.error(`\n${drift} file(s) out of date. Run: node scripts/build-exports.mjs`);
    process.exit(1);
  }
  console.log(`Exports are up to date (${skills.length} skills × ${active.length} platform(s)).`);
  process.exit(0);
}

// Write mode: clean each active platform dir for deterministic output, then write.
for (const [, platform] of active) {
  rmSync(join(root, platform.dir), { recursive: true, force: true });
}
let written = 0;
for (const [path, content] of planned) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  written++;
}
console.log(`Wrote ${written} files — ${skills.length} skills × ${active.length} platform(s): ${active.map(([k]) => k).join(', ')}.`);
