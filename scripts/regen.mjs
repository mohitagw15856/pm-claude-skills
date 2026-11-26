#!/usr/bin/env node
// One command for "I edited a SKILL.md, now regenerate everything that derives from it".
//
// Runs every generator in order, copies masters over the bundle copies in plugins/, and
// refreshes web/risk-tiers.json. This replaces the list of sixteen commands that had to
// be run by hand.
//
//   node scripts/regen.mjs          (npm run regen)
//   node scripts/regen.mjs --list   print the steps and exit
//
// build-zh-pinyin needs the pinyin-pro package, which is not a dependency. When it is
// not available the step is skipped with a note: it only matters when a Chinese-named
// skill is added or renamed (PINYIN_MODULE_DIR=<node_modules> to run it).
import { spawnSync } from 'node:child_process';
import { copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const GENERATORS = [
  'scripts/sync-bundles.mjs',
  'scripts/build-cursor-plugins.mjs',
  'web/build-skills.mjs',
  'extension/sync-skills.mjs',
  'scripts/build-skills-md.mjs',
  'scripts/build-disambiguation.mjs',
  'scripts/build-exports.mjs',
  'scripts/build-conformance-badge.mjs',
  'integrations/jev/build-index.mjs',
  'scripts/build-docs.mjs',
  'scripts/build-samples.mjs',
  'scripts/build-workflows.mjs',
  'scripts/build-tech-tree.mjs',
  'scripts/build-dify-templates.mjs',
  'scripts/build-listing-prompt.mjs',
  'scripts/build-zh-pinyin.mjs',
  'scripts/build-catalogue.mjs',
  'scripts/build-mirror-index.mjs',
  'scripts/build-model-guidance.mjs',
  'scripts/build-trust-numbers.mjs',
  'scripts/build-readme-onboarding.mjs',
];

function main() {
  if (process.argv.includes('--list')) { GENERATORS.forEach((g) => console.log(g)); return 0; }
  const failed = [];
  for (const g of GENERATORS) {
    if (g.endsWith('build-zh-pinyin.mjs') && !process.env.PINYIN_MODULE_DIR) {
      console.log(`- ${g}  (skipped: set PINYIN_MODULE_DIR to run it; needed only for new Chinese skill names)`);
      continue;
    }
    const r = spawnSync(process.execPath, [join(ROOT, g)], { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
    const ok = r.status === 0;
    console.log(`${ok ? '✓' : '✗'} ${g}`);
    if (!ok) { failed.push(g); console.log(`${r.stdout || ''}${r.stderr || ''}`.trimEnd().split('\n').slice(-15).map((l) => `    ${l}`).join('\n')); }
  }
  copyFileSync(join(ROOT, 'data/risk-tiers.json'), join(ROOT, 'web/risk-tiers.json'));
  copyFileSync(join(ROOT, 'web/skills.json'), join(ROOT, 'python/pm_skills/skills.json'));
  console.log('✓ copied data/risk-tiers.json to web/ and web/skills.json to python/pm_skills/');
  if (failed.length) { console.error(`\n${failed.length} generator(s) failed: ${failed.join(', ')}`); return 1; }
  console.log('\nRegenerated. If skills or bundles were added, run node scripts/sync-counts.mjs to update the counts in docs.\nThen review with git status and run npm run check.');
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main());
