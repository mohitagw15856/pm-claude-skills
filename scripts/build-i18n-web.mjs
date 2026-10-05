#!/usr/bin/env node
// Data for web/compare-lang.html, the side-by-side viewer: every translated skill
// next to its English original. Built at deploy (deploy-playground.yml) into
// web/i18n/, which is gitignored.
//
//   web/i18n/index.json            { langs: {zh: {label, skills: [...]}, ...}, skills: {name: {title, langs: [...]}} }
//   web/i18n/<lang>/<skill>.md     the translation, frontmatter removed
//   web/i18n/en/<skill>.md         the English original of every translated skill
//
//   node scripts/build-i18n-web.mjs
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'web', 'i18n');
const LABELS = { zh: '简体中文', 'zh-TW': '繁體中文', ja: '日本語', ko: '한국어', es: 'Español', fr: 'Français', pt: 'Português', hi: 'हिन्दी', ar: 'العربية', vi: 'Tiếng Việt', id: 'Bahasa Indonesia' };
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const REPO = 'https://github.com/mohitagw15856/pm-claude-skills/blob/main/';
// Repo-relative links (../../../skills/x/SKILL.md, references/…) do not resolve on
// the site, so they point at the files on GitHub instead.
const relink = (t, dir) => t.replace(/\]\((?!https?:|#|mailto:)([^)\s]+)\)/g, (m, href) => {
  const parts = (dir + '/' + href).split('/');
  const out = [];
  for (const p of parts) { if (p === '..') out.pop(); else if (p && p !== '.') out.push(p); }
  return `](${REPO}${out.join('/')})`;
});
const body = (t, dir = '') => relink(t.replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, '').trim() + '\n', dir);
const title = (t) => (body(t).match(/^# (.+)$/m) || [, ''])[1].trim();

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'en'), { recursive: true });
const index = { generated: new Date().toISOString().slice(0, 10), langs: {}, skills: {} };
const base = join(root, 'skills-i18n');
for (const lang of readdirSync(base).filter((d) => /^[a-z]{2}(-[A-Z]{2})?$/.test(d)).sort()) {
  const names = readdirSync(join(base, lang)).filter((n) => NAME.test(n) && existsSync(join(base, lang, n, 'SKILL.md')) && existsSync(join(root, 'skills', n, 'SKILL.md'))).sort();
  if (!names.length) continue;
  mkdirSync(join(OUT, lang), { recursive: true });
  for (const n of names) {
    const tr = readFileSync(join(base, lang, n, 'SKILL.md'), 'utf8');
    writeFileSync(join(OUT, lang, `${n}.md`), body(tr, `skills-i18n/${lang}/${n}`));
    if (!index.skills[n]) {
      const en = readFileSync(join(root, 'skills', n, 'SKILL.md'), 'utf8');
      writeFileSync(join(OUT, 'en', `${n}.md`), body(en, `skills/${n}`));
      index.skills[n] = { title: title(en) || n, langs: [] };
    }
    index.skills[n].langs.push(lang);
  }
  index.langs[lang] = { label: LABELS[lang] || lang, skills: names };
}
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index) + '\n');
const total = Object.values(index.langs).reduce((a, l) => a + l.skills.length, 0);
console.log(`Wrote web/i18n/: ${Object.keys(index.skills).length} skills, ${total} translations in ${Object.keys(index.langs).length} languages.`);
