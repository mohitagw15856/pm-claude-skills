#!/usr/bin/env node
// Prepares integrations/dify-plugin for packaging: trains the skill router into
// data/router.json, writes data/index.json (name -> short description, has-Chinese flag),
// and copies the router module. Package afterwards with Dify's CLI:
//   node scripts/build-dify-plugin.mjs
//   dify plugin package integrations/dify-plugin      (writes pm_skills.difypkg)
// The release workflow does both and attaches the package to the GitHub release.
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const plugin = join(root, 'integrations', 'dify-plugin');
const data = join(plugin, 'data');
mkdirSync(data, { recursive: true });

if (!existsSync(join(root, 'dataset', 'routing.jsonl'))) execFileSync('node', [join(root, 'scripts', 'build-dataset.mjs')], { stdio: 'inherit' });
execFileSync('python3', [join(root, 'integrations', 'router-model', 'pm_router.py'), 'train', '--repo', root, '--out', join(data, 'router.json')], { stdio: ['ignore', 'ignore', 'inherit'] });
copyFileSync(join(root, 'integrations', 'router-model', 'pm_router.py'), join(plugin, 'pm_router.py'));

const desc = (file) => {
  const m = readFileSync(file, 'utf8').replace(/\r\n/g, '\n').match(/^---\n[\s\S]*?^description:\s*"?(.*?)"?\s*$/m);
  return m ? m[1].replace(/\\"/g, '"').replace(/\s*\u2014\s*/g, ', ') : '';
};
const index = {};
for (const name of readdirSync(join(root, 'skills')).sort()) {
  const file = join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(file) || /^deprecated:/m.test(readFileSync(file, 'utf8').split('\n---')[0])) continue;
  const d = desc(file);
  index[name] = { d: d.length > 300 ? d.slice(0, 297).replace(/\s+\S*$/, '') + '…' : d, zh: existsSync(join(root, 'skills-i18n', 'zh', name, 'SKILL.md')) };
}
writeFileSync(join(data, 'index.json'), JSON.stringify(index));
console.log(`Dify plugin data ready: ${Object.keys(index).length} skills, router and index in integrations/dify-plugin/data/`);
