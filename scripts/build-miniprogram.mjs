#!/usr/bin/env node
// Build the offline data the WeChat Mini Program ships with:
//   integrations/wechat-miniprogram/miniprogram/data/index.js   every live skill: name, title, descriptions, bundle
//   integrations/wechat-miniprogram/miniprogram/data/bodies.js  the full Chinese SKILL.md for skills that have one
//
// A Mini Program's main package is capped at 2 MB and may only call domains
// registered in its console, so the finder carries its data and never fetches.
// The data is generated, not committed: run this before opening the project in
// WeChat DevTools.
//
//   node scripts/build-miniprogram.mjs            write the data
//   node scripts/build-miniprogram.mjs --out DIR  write it somewhere else (tests)
//   node scripts/build-miniprogram.mjs --out integrations/utools/data --with-router   the uTools plugin's copy
//   node scripts/build-miniprogram.mjs --check    build to memory and enforce the size budget
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] ? args[i + 1] : d; };

const APP = join(root, 'integrations', 'wechat-miniprogram', 'miniprogram');
const OUT = opt('out', join(APP, 'data'));
const BUDGET = 1.9 * 1024 * 1024; // the platform limit is 2 MB for the main package
const DESC_MAX = 320;

const indexPath = join(root, 'web', 'skills-index.json');
if (!existsSync(indexPath)) { console.error('web/skills-index.json is missing. Run: node web/build-skills.mjs'); process.exit(1); }
const skills = JSON.parse(readFileSync(indexPath, 'utf8')).skills.filter((s) => !s.deprecated);

const clip = (s, n) => { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; };
const stripFrontmatter = (md) => md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();

const bodies = {};
const zhDir = join(root, 'skills-i18n', 'zh');
for (const s of skills) {
  const p = join(zhDir, s.name, 'SKILL.md');
  if (existsSync(p)) bodies[s.name] = stripFrontmatter(readFileSync(p, 'utf8'));
}

const index = skills.map((s) => {
  const row = { n: s.name, t: s.title || '', d: clip(s.description, DESC_MAX), p: s.plugin || '' };
  if (s.descriptionZh) row.z = clip(s.descriptionZh, DESC_MAX);
  if (bodies[s.name]) row.b = 1;
  return row;
});

const files = {
  'index.js': 'module.exports = ' + JSON.stringify(index) + ';\n',
  'bodies.js': 'module.exports = ' + JSON.stringify(bodies) + ';\n',
};

// Everything under miniprogram/ counts towards the package, not only the data.
function dirBytes(dir, skip) {
  let n = 0;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (p === skip) continue;
    const st = statSync(p);
    n += st.isDirectory() ? dirBytes(p, skip) : st.size;
  }
  return n;
}
const dataBytes = Object.values(files).reduce((n, c) => n + Buffer.byteLength(c), 0);
const total = dataBytes + dirBytes(APP, join(APP, 'data'));
const mb = (n) => (n / 1024 / 1024).toFixed(2) + ' MB';

if (total > BUDGET) {
  console.error(`Mini Program package would be ${mb(total)}, over the ${mb(BUDGET)} budget. Lower DESC_MAX or ship fewer bodies.`);
  process.exit(1);
}
if (flag('check')) {
  console.log(`miniprogram: ${index.length} skills, ${Object.keys(bodies).length} Chinese bodies, ${mb(total)} of ${mb(BUDGET)} ✓`);
  process.exit(0);
}
mkdirSync(OUT, { recursive: true });
for (const [name, content] of Object.entries(files)) writeFileSync(join(OUT, name), content);
// --with-router also drops the router beside the data, for launchers (uTools) that package one folder.
if (flag('with-router')) copyFileSync(join(APP, 'utils', 'router.js'), join(OUT, 'router.js'));
console.log(`Wrote ${index.length} skills and ${Object.keys(bodies).length} Chinese bodies to ${OUT} (${mb(total)} package).`);
