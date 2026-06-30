#!/usr/bin/env node
// Scaffold (or wire) a whole skill bundle in one command — the plugin.json, the
// plugins/<bundle>/skills/<name>/ copies, and a marketplace.json entry. Encodes the
// wiring so adding a bundle is one step instead of a checklist.
//
// Two modes, both driven by --skills:
//   • a skill that already exists in skills/<name>/  → it's *wired* into the bundle (copied)
//   • a skill that doesn't exist yet                 → a SkillCheck-passing *stub* is scaffolded
//
// Usage:
//   node scripts/new-bundle.mjs --name pm-foo --desc "What the bundle is" \
//        --skills skill-one,skill-two,skill-three [--keywords a,b,c] [--no-marketplace] [--force]
//   npm run new-bundle -- --name pm-foo --desc "..." --skills a,b,c
//
// After running: fill any stubbed SKILL.md, add eval cases, then:
//   node web/build-skills.mjs && node scripts/build-exports.mjs   (or: npm run check)
//
// No dependencies.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') out.force = true;
    else if (a === '--no-marketplace') out.noMarketplace = true;
    else if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
  }
  return out;
}

const titleCase = (name) => name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
const isKebab = (s) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);

// A stub that already satisfies SkillCheck structure (title + recommended sections).
function skillStub(name) {
  const title = titleCase(name);
  return `---
name: ${name}
description: "Summarise what ${title} does in one line. Use when asked to [trigger phrases the user would say]. Produces [the concrete artifact]."
---

# ${title} Skill

One-line summary of the value this skill delivers. <!-- TODO: rewrite -->

## Working from a brief

Deliver the full artifact even from a thin brief — infer and label assumptions, never refuse for missing context. <!-- TODO: tailor -->

## Required Inputs

Ask for (if not already provided), else infer and label:
- <!-- TODO: the inputs to gather -->

## Output Format

<!-- TODO: a concrete template (headings/tables) of the final artifact -->

## Quality Checks

- [ ] <!-- TODO: a check the output must pass before hand-off -->

## Anti-Patterns

- [ ] Do not <!-- TODO: the mistake this skill prevents -->
`;
}

function pluginJson({ name, desc, keywords }) {
  return JSON.stringify({
    $schema: 'https://anthropic.com/claude-code/plugin.schema.json',
    name,
    version: '1.0.0',
    description: desc,
    author: { name: 'Mohit Aggarwal', email: 'mohit15856@gmail.com' },
    homepage: REPO,
    license: 'MIT',
    keywords,
  }, null, 2) + '\n';
}

// Insert a marketplace entry textually (preserves the file's hand-formatting) right after
// the `"plugins": [` line. Idempotent: skips if an entry with this name already exists.
function addMarketplaceEntry({ name, desc }) {
  const mpPath = join(root, '.claude-plugin', 'marketplace.json');
  if (!existsSync(mpPath)) return 'skipped (no marketplace.json)';
  let text = readFileSync(mpPath, 'utf8');
  if (text.includes(`"name": "${name}"`)) return 'already present';
  const entry =
    `    {\n` +
    `      "name": ${JSON.stringify(name)},\n` +
    `      "description": ${JSON.stringify(desc)},\n` +
    `      "version": "1.0.0",\n` +
    `      "category": "productivity",\n` +
    `      "source": "./plugins/${name}",\n` +
    `      "homepage": ${JSON.stringify(REPO)}\n` +
    `    },\n`;
  const marker = text.match(/(\n\s*"plugins"\s*:\s*\[\s*\n)/);
  if (!marker) return 'skipped (could not find "plugins" array)';
  text = text.replace(marker[1], marker[1] + entry);
  JSON.parse(text); // sanity: still valid JSON
  writeFileSync(mpPath, text);
  return 'added';
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const name = args.name;
  if (!name || !isKebab(name)) { console.error('Error: --name pm-<kebab-case> is required.'); process.exit(1); }
  if (!args.skills) { console.error('Error: --skills a,b,c is required.'); process.exit(1); }
  const skills = args.skills.split(',').map((s) => s.trim()).filter(Boolean);
  const bad = skills.filter((s) => !isKebab(s));
  if (bad.length) { console.error(`Error: invalid skill name(s): ${bad.join(', ')} (use kebab-case).`); process.exit(1); }
  const desc = args.desc || `${titleCase(name.replace(/^pm-/, ''))} skills.`;
  const keywords = (args.keywords ? args.keywords.split(',').map((s) => s.trim()).filter(Boolean) : [name.replace(/^pm-/, '')]);

  // 1. plugin.json
  const pluginDir = join(root, 'plugins', name, '.claude-plugin');
  const pluginFile = join(pluginDir, 'plugin.json');
  if (existsSync(pluginFile) && !args.force) { console.error(`Error: ${pluginFile} exists (use --force).`); process.exit(1); }
  mkdirSync(pluginDir, { recursive: true });
  writeFileSync(pluginFile, pluginJson({ name, desc, keywords }));

  // 2. skills: wire existing, scaffold missing — and copy into the plugin
  const wired = [], scaffolded = [];
  for (const s of skills) {
    const srcDir = join(root, 'skills', s);
    const srcFile = join(srcDir, 'SKILL.md');
    if (!existsSync(srcFile)) { mkdirSync(srcDir, { recursive: true }); writeFileSync(srcFile, skillStub(s)); scaffolded.push(s); }
    else wired.push(s);
    const dstDir = join(root, 'plugins', name, 'skills', s);
    mkdirSync(dstDir, { recursive: true });
    copyFileSync(srcFile, join(dstDir, 'SKILL.md'));
  }

  // 3. marketplace entry
  const mp = args.noMarketplace ? 'skipped (--no-marketplace)' : addMarketplaceEntry({ name, desc });

  // Report
  console.log(`Bundle ${name} scaffolded:`);
  console.log(`  plugin.json:        plugins/${name}/.claude-plugin/plugin.json`);
  console.log(`  wired (existing):   ${wired.join(', ') || '(none)'}`);
  console.log(`  scaffolded (stubs): ${scaffolded.join(', ') || '(none)'}`);
  console.log(`  marketplace.json:   ${mp}`);
  console.log('\nNext:');
  if (scaffolded.length) console.log(`  1. Fill the TODO sections in the scaffolded SKILL.md files, then re-run this to re-copy (or copy manually).`);
  console.log(`  ${scaffolded.length ? 2 : 1}. Add a curated eval case per skill in evals/cases.json.`);
  console.log(`  ${scaffolded.length ? 3 : 2}. npm run check   # skillcheck + regenerate exports/skills.json/workflows`);
}

main();
