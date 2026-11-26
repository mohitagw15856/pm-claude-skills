#!/usr/bin/env node
// Make this repository installable as a Cursor plugin marketplace.
//
// Cursor's plugin format (github.com/cursor/plugins) is a root
// .cursor-plugin/marketplace.json listing plugins, each a folder with its own
// .cursor-plugin/plugin.json whose "skills" field points at a folder of SKILL.md
// skills. The bundles in plugins/ already have that shape for Claude, so this
// writes only the Cursor manifests next to the Claude ones: no skill is copied.
//
//   node scripts/build-cursor-plugins.mjs           write the manifests
//   node scripts/build-cursor-plugins.mjs --check   exit 1 if any manifest is stale or missing
//
// Source of truth: .claude-plugin/marketplace.json and plugins/<bundle>/.claude-plugin/plugin.json.
// No dependencies.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const check = process.argv.includes('--check');
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const titleCase = (name) => name.replace(/^pm-/, '').split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const claude = read('.claude-plugin/marketplace.json');
const stale = [];
function emit(path, value) {
  const text = JSON.stringify(value, null, 2) + '\n';
  const full = join(ROOT, path);
  if (existsSync(full) && readFileSync(full, 'utf8') === text) return;
  if (check) { stale.push(path); return; }
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, text);
}

const listed = [];
for (const entry of claude.plugins) {
  const source = String(entry.source || '').replace(/^\.\//, '');
  // Only bundles that live in this repository and ship skills can be Cursor plugins here.
  if (!/^plugins\/[a-z0-9-]+$/.test(source) || !existsSync(join(ROOT, source, 'skills'))) continue;
  const manifestPath = join(source, '.claude-plugin', 'plugin.json');
  const own = existsSync(join(ROOT, manifestPath)) ? read(manifestPath) : {};
  const description = own.description || entry.description || '';
  emit(join(source, '.cursor-plugin', 'plugin.json'), {
    name: entry.name,
    displayName: `PM Skills: ${titleCase(entry.name)}`,
    version: own.version || entry.version || '1.0.0',
    description,
    author: own.author || claude.owner,
    homepage: REPO,
    repository: REPO,
    license: own.license || 'MIT',
    keywords: own.keywords || [],
    category: 'productivity',
    skills: './skills/',
  });
  listed.push({ name: entry.name, source, description });
}

emit('.cursor-plugin/marketplace.json', {
  name: 'pm-claude-skills',
  owner: claude.owner,
  metadata: { description: 'Professional agent skills in bundles: product management, engineering, customer success, careers and more. The same SKILL.md files that ship for Claude.' },
  plugins: listed,
});

if (check) {
  if (stale.length) { console.error(`Cursor plugin manifests out of date (${stale.length}): ${stale.slice(0, 5).join(', ')}${stale.length > 5 ? ', …' : ''}\nRun: node scripts/build-cursor-plugins.mjs`); process.exit(1); }
  console.log(`Cursor plugin manifests: ${listed.length} bundle(s) up to date. ✓`);
} else console.log(`Wrote .cursor-plugin/marketplace.json and ${listed.length} plugin manifest(s).`);
