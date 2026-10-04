#!/usr/bin/env node
// Chinese text for the Xiaohongshu share-card maker (web/card.html).
//
// web/skills.json carries English only. This reads the Simplified Chinese
// translations in skills-i18n/zh and writes web/card-zh.json: for each
// translated skill, its Chinese name (the H1), description, a trigger prompt
// (the first quoted request in the description) and up to four bullet points
// from the body. The card page falls back to English when the file is absent.
//
//   node scripts/build-share-cards.mjs           # writes web/card-zh.json
//   node scripts/build-share-cards.mjs --check   # exit 1 if a translation yields no name
//
// Built in CI by deploy-playground.yml; the output is gitignored.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'skills-i18n', 'zh');
const OUT = join(ROOT, 'web', 'card-zh.json');
const check = process.argv.includes('--check');

// Frontmatter tolerant of CRLF line endings.
const splitFm = (raw) => {
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: text };
};
const fmValue = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!m) return '';
  let v = m[1].trim();
  if (v.startsWith('"')) { try { v = JSON.parse(v); } catch { v = v.slice(1, -1); } }
  else if (v.startsWith("'")) v = v.slice(1, -1).replace(/''/g, "'");
  return v;
};
const plain = (s) => s.replace(/\*\*|__|`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim();

// The first quoted request: '…', "…", “…”, ‘…’ or 「…」, at least four characters.
// Otherwise the first item of "当被要求…时使用", turned into a request.
export function triggerOf(desc) {
  const m = desc.match(/[“「‘'"]([^“”「」‘’'"]{4,60})[”」’'"]/);
  if (m) return m[1].trim();
  const w = desc.match(/当(?:被要求|被问到|被请求|用户要求|用户问|有人问|有人要求|有人请求)([^。]*?)时使用/);
  if (!w) return '';
  const first = w[1].split(/[、，,；;]|或者|或/)[0].replace(/^(?:到|你|帮忙)/, '').trim();
  if (first.length < 3) return '';
  if (/怎么|什么|还是|区别|多少|如何|吗$/.test(first)) return /[？?]$/.test(first) ? first : `${first}？`;
  return /^(帮我|我|请)/.test(first) ? first : `帮我${first}`;
}

export function cardEntry(raw) {
  const { fm, body } = splitFm(raw);
  const description = fmValue(fm, 'description');
  const h1 = (body.match(/^#\s+(.+)$/m) || [, ''])[1].trim();
  const title = plain(h1).replace(/(.{2,})技能$/, '$1');
  const points = [];
  for (const line of body.split('\n')) {
    const m = line.match(/^[-*]\s+(.+)/);
    if (!m) continue;
    const p = plain(m[1]).split(/[\u2014：:]/)[0].trim();
    if (p.length >= 4 && p.length <= 40) points.push(p);
    if (points.length === 4) break;
  }
  return { title, description, trigger: triggerOf(description), points };
}

// Chinese card data for every translated skill, keyed by skill name.
export function buildZhCards() {
  const out = {};
  const empty = [];
  if (!existsSync(SRC)) return { out, empty };
  for (const name of readdirSync(SRC).sort()) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) continue;
    const f = join(SRC, name, 'SKILL.md');
    if (!existsSync(f)) continue;
    const e = cardEntry(readFileSync(f, 'utf8'));
    if (!e.title) empty.push(name);
    out[name] = e;
  }
  return { out, empty };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { out, empty } = buildZhCards();
  writeFileSync(OUT, JSON.stringify({ generated: 'scripts/build-share-cards.mjs', count: Object.keys(out).length, skills: out }));
  console.log(`Wrote web/card-zh.json: ${Object.keys(out).length} Chinese skill(s)`);
  if (empty.length) {
    console[check ? 'error' : 'warn'](`${empty.length} translation(s) have no H1 title: ${empty.slice(0, 5).join(', ')}`);
    if (check) process.exit(1);
  }
}
