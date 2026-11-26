#!/usr/bin/env node
// Publish the translated descriptions (i18n/<lang>/descriptions.json, from
// translate-skills.mjs --descriptions) for the site's search pages:
// web/i18n-desc/<lang>.json ({name: description}) and web/i18n-desc/index.json
// (which languages exist, and how many skills each covers). Built at deploy.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'web', 'i18n-desc');
mkdirSync(out, { recursive: true });
const index = {};
for (const lang of existsSync(join(root, 'i18n')) ? readdirSync(join(root, 'i18n')) : []) {
  const f = join(root, 'i18n', lang, 'descriptions.json');
  if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(lang) || !existsSync(f)) continue;
  const d = JSON.parse(readFileSync(f, 'utf8')).descriptions || {};
  const clean = Object.fromEntries(Object.entries(d).filter(([n, t]) => /^[a-z0-9-]+$/.test(n) && typeof t === 'string' && !/[<>]/.test(t)));
  if (!Object.keys(clean).length) continue;
  writeFileSync(join(out, `${lang}.json`), JSON.stringify(clean));
  index[lang] = Object.keys(clean).length;
}
writeFileSync(join(out, 'index.json'), JSON.stringify({ languages: index }));
console.log(`i18n-desc: ${Object.keys(index).length} language(s) published${Object.keys(index).length ? ': ' + Object.entries(index).map(([l, n]) => `${l} ${n}`).join(', ') : ''}.`);
