#!/usr/bin/env node
// Validates the glossary packs in web/glossaries/ (see its README) and writes
// web/glossaries/index.json: which output languages have a glossary.
//   node scripts/check-glossaries.mjs [--check]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'web', 'glossaries');
const problems = [], index = {};
for (const f of readdirSync(dir).filter((x) => /^[a-z]{2,3}(-[A-Z]{2})?\.json$/.test(x))) {
  let g; try { g = JSON.parse(readFileSync(join(dir, f), 'utf8')); } catch { problems.push(`${f}: not valid JSON`); continue; }
  const code = f.replace(/\.json$/, '');
  if (g.code !== code) problems.push(`${f}: code must be "${code}"`);
  if (!g.language) problems.push(`${f}: needs a language name`);
  if (!['draft', 'reviewed'].includes(g.status)) problems.push(`${f}: status must be draft or reviewed`);
  const regions = Object.keys(g.regions || {});
  if (!regions.length) problems.push(`${f}: list at least one region`);
  (g.terms || []).forEach((t, i) => {
    if (!t.en || regions.every((r) => !t[r])) problems.push(`${f}: term ${i} needs "en" and at least one region`);
    if (/[<>]/.test(JSON.stringify(t))) problems.push(`${f}: term ${i} contains < or >`);
  });
  if (!(g.terms || []).length) problems.push(`${f}: no terms`);
  index[g.language] = { code, status: g.status, regions: g.regions, terms: (g.terms || []).length };
}
if (problems.length) { console.error(`Glossaries: ${problems.join('; ')}`); process.exit(1); }
const json = JSON.stringify({ glossaries: index }, null, 2) + '\n';
if (process.argv.includes('--check')) {
  let cur = ''; try { cur = readFileSync(join(dir, 'index.json'), 'utf8'); } catch {}
  if (cur !== json) { console.error('web/glossaries/index.json is out of date. Run node scripts/check-glossaries.mjs'); process.exit(1); }
  console.log(`Glossaries: ${Object.keys(index).length} valid. ✓`); process.exit(0);
}
writeFileSync(join(dir, 'index.json'), json);
console.log(`Glossaries: ${Object.keys(index).length} pack(s) → web/glossaries/index.json`);
