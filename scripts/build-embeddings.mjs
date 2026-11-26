#!/usr/bin/env node
// Meaning-based search: one embedding per live skill (title and description), for
// two small models, saved as int8 vectors the browser compares against an
// embedded query. English browsers use all-MiniLM-L6-v2 (23 MB, downloaded once,
// only when the visitor turns smart search on); others use
// paraphrase-multilingual-MiniLM-L12-v2 (118 MB), which matches questions
// in the 20 languages against the English skills (e5-small ranked near-randomly here). Rebuilt by the
// embeddings workflow when skills change; needs @huggingface/transformers.
//
//   npm i --no-save @huggingface/transformers && node scripts/build-embeddings.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { pipeline } = await import(process.env.TRANSFORMERS_PATH || '@huggingface/transformers');
const MODELS = {
  en: { id: 'Xenova/all-MiniLM-L6-v2', dtype: 'q8', passage: '', query: '' },
  multi: { id: 'Xenova/paraphrase-multilingual-MiniLM-L12-v2', dtype: 'q8', passage: '', query: '' },
};
const skills = JSON.parse(readFileSync(join(root, 'web', 'skills-index.json'), 'utf8')).skills.filter((s) => !s.deprecated);
const texts = skills.map((s) => `${s.title}. ${s.description}`.slice(0, 1000));
const out = join(root, 'web', 'embeddings');
mkdirSync(out, { recursive: true });
const index = { generated: new Date().toISOString().slice(0, 10), names: skills.map((s) => s.name), models: {} };
for (const [key, m] of Object.entries(MODELS)) {
  const embed = await pipeline('feature-extraction', m.id, { dtype: m.dtype });
  let dim = 0; const rows = [];
  for (let i = 0; i < texts.length; i += 32) {
    const t = await embed(texts.slice(i, i + 32).map((x) => m.passage + x), { pooling: 'mean', normalize: true });
    for (const v of t.tolist()) { dim = v.length; rows.push(v); }
    process.stdout.write(`\r${key}: ${Math.min(i + 32, texts.length)}/${texts.length}`);
  }
  // Normalised vectors, quantised to int8 (x127): a quarter of the size, same ranking.
  const buf = new Int8Array(rows.length * dim);
  rows.forEach((v, r) => v.forEach((x, c) => { buf[r * dim + c] = Math.max(-127, Math.min(127, Math.round(x * 127))); }));
  writeFileSync(join(out, `${key}.bin`), Buffer.from(buf.buffer));
  index.models[key] = { id: m.id, dtype: m.dtype, dim, query: m.query };
  console.log(`\n${key}: ${rows.length} × ${dim} → web/embeddings/${key}.bin`);
}
writeFileSync(join(out, 'index.json'), JSON.stringify(index));
