#!/usr/bin/env node
// Write the "Sponsored by" banner under the README title from sponsors.json.
//
// One sponsor holds the README banner at a time: the entry in sponsors.json whose
// "placement" is "readme-banner". Changing sponsor is then one data edit and one command,
// instead of hand edits in several places.
//
//   node scripts/build-sponsor-block.mjs           rewrite the banner block in README.md
//   node scripts/build-sponsor-block.mjs --check   exit 1 if README.md does not match sponsors.json
//
// --check also warns (without failing) when the sponsor's "until" date has passed, and
// when SPONSORS.md or the README's sponsor section does not name the current sponsor.
// The block's markup is fixed: label, link, light and dark images. No dependencies.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// The link keeps its own "&" separators, as sponsors supply them; only quotes and angle brackets are escaped.
const escUrl = (s) => String(s).replace(/"/g, '%22').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/\s/g, '%20');

export function current(sponsors) {
  return (sponsors || []).find((s) => s && s.placement === 'readme-banner' && s.banner) || null;
}

export function validate(s) {
  const b = s.banner || {};
  const problems = [];
  if (!/^https:\/\//.test(String(b.href || ''))) problems.push('banner.href must be an https address');
  for (const k of ['light', 'dark']) {
    if (!/^assets\/sponsors\/[A-Za-z0-9._-]+\.(png|jpg|jpeg|webp|svg)$/.test(String(b[k] || ''))) problems.push(`banner.${k} must be an image under assets/sponsors/`);
    else if (!existsSync(join(ROOT, b[k]))) problems.push(`banner.${k} (${b[k]}) does not exist`);
  }
  if (!String(b.alt || '').trim()) problems.push('banner.alt is required');
  if (!Number.isInteger(b.width) || b.width < 100 || b.width > 1200) problems.push('banner.width must be a whole number between 100 and 1200');
  if (s.until != null && !/^\d{4}-\d{2}-\d{2}$/.test(String(s.until))) problems.push('until must be YYYY-MM-DD or null');
  return problems;
}

export function render(s) {
  if (!s) return '';
  const b = s.banner;
  return [
    '<p align="center"><sub>Sponsored by</sub></p>',
    '<p align="center">',
    `  <a href="${escUrl(b.href)}">`,
    '    <picture>',
    `      <source media="(prefers-color-scheme: dark)" srcset="${esc(b.dark)}">`,
    `      <img src="${esc(b.light)}" alt="${esc(b.alt)}" width="${b.width}">`,
    '    </picture>',
    '  </a>',
    '</p>',
  ].join('\n');
}

const BLOCK = /<p align="center"><sub>Sponsored by<\/sub><\/p>\n<p align="center">\n[\s\S]*?\n<\/p>/;

// Replace the existing banner, or place a new one directly under the first heading.
export function apply(readme, block) {
  if (BLOCK.test(readme)) return block ? readme.replace(BLOCK, () => block) : readme.replace(new RegExp(`${BLOCK.source}\\n\\n?`), '');
  if (!block) return readme;
  const m = readme.match(/^# .*\n/m);
  if (!m) throw new Error('README.md has no title heading to place the banner under.');
  const at = m.index + m[0].length;
  return `${readme.slice(0, at)}\n${block}\n${readme.slice(at)}`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const data = JSON.parse(readFileSync(join(ROOT, 'sponsors.json'), 'utf8'));
  const sponsor = current(data.sponsors);
  if (sponsor) {
    const problems = validate(sponsor);
    if (problems.length) { console.error(problems.map((p) => `  ✗ ${sponsor.name}: ${p}`).join('\n')); process.exit(1); }
  }
  const path = join(ROOT, 'README.md');
  const readme = readFileSync(path, 'utf8');
  const next = apply(readme, render(sponsor));
  if (process.argv.includes('--check')) {
    if (next !== readme) { console.error('The README sponsor banner does not match sponsors.json. Run: node scripts/build-sponsor-block.mjs'); process.exit(1); }
    const today = new Date().toISOString().slice(0, 10);
    if (sponsor && sponsor.until && sponsor.until < today) console.log(`  ! ${sponsor.name}'s term ended on ${sponsor.until}. Renew it or change the sponsor in sponsors.json.`);
    if (sponsor) for (const f of ['SPONSORS.md', 'README.md']) if (!readFileSync(join(ROOT, f), 'utf8').includes(`**${sponsor.name}**`) && !readFileSync(join(ROOT, f), 'utf8').includes(`[${sponsor.name}]`)) console.log(`  ! ${f} does not name ${sponsor.name} as the current sponsor.`);
    console.log(`Sponsor banner: ${sponsor ? `${sponsor.name}, matches sponsors.json` : 'none'}. ✓`);
    process.exit(0);
  }
  if (next !== readme) { writeFileSync(path, next); console.log(`README banner updated: ${sponsor ? sponsor.name : 'removed'}.`); }
  else console.log('README banner already matches sponsors.json.');
}
