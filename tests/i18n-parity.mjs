#!/usr/bin/env node
// Translation parity gate — community translations stay reviewable because
// structure is machine-checked: same section count as the English source, the
// canonical name kept, a language marker, and the canonicity note up top.
// Judgment quality is human review; shape is CI's job.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = join(root, 'skills-i18n');
let pass = 0, fail = 0;
const bad = (m) => { fail++; console.error('  ✗ ' + m); };

if (!existsSync(base)) { console.log('no skills-i18n/ — nothing to check'); process.exit(0); }
for (const lang of readdirSync(base).filter((d) => /^[a-z]{2}(-[A-Z]{2})?$/.test(d))) {
  for (const name of readdirSync(join(base, lang)).filter((d) => existsSync(join(base, lang, d, 'SKILL.md')))) {
    const t = readFileSync(join(base, lang, name, 'SKILL.md'), 'utf8');
    const srcPath = join(root, 'skills', name, 'SKILL.md');
    if (!existsSync(srcPath)) { bad(`${lang}/${name}: no English source skill`); continue; }
    const src = readFileSync(srcPath, 'utf8');
    const secs = (x) => (x.match(/^## /gm) || []).length;
    if (secs(t) !== secs(src)) bad(`${lang}/${name}: ${secs(t)} sections vs source ${secs(src)}`);
    else pass++;
    if (!new RegExp(`^name: ${name}$`, 'm').test(t)) bad(`${lang}/${name}: frontmatter name must stay "${name}" (runtimes key on it)`);
    else pass++;
    if (!new RegExp(`^language: ${lang}$`, 'm').test(t)) bad(`${lang}/${name}: missing "language: ${lang}"`);
    else pass++;
    // one canonicity marker per supported language: es, fr, en, zh (规范版本), zh-TW (規範版本), ja (正本), vi (bản chuẩn), id (versi kanonis)
    if (!['canónica', 'canonique', 'canonical', '规范版本', '規範版本', '正本', 'bản chuẩn', 'versi kanonis'].some((m) => t.includes(m))) bad(`${lang}/${name}: missing the canonicity note`);
    else pass++;
  }
}
console.log(`\ni18n parity: ${pass} passed · ${fail} failed`);
process.exit(fail ? 1 : 0);
