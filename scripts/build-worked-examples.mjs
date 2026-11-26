#!/usr/bin/env node
// Data for web/worked-examples.html: every examples/<skill>-example.md parsed into
// cards (what the skill does, each scenario's request and output excerpt, tips,
// related skills). Built at deploy into web/worked-examples.json (gitignored).
//
//   node scripts/build-worked-examples.mjs
//   node scripts/build-worked-examples.mjs --check   # fail if an example cannot be parsed
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const index = JSON.parse(readFileSync(join(root, 'web', 'skills-index.json'), 'utf8'));
const meta = Object.fromEntries((index.skills || []).filter((s) => !s.deprecated).map((s) => [s.name, s]));

// Sections end only at the example template's own headings: excerpts can contain
// ## headings of their own (an API doc, an ADR), which must not end the section.
const TOP = ['What this skill does', 'How to trigger it', 'Tips for best results', 'Related skills'];
function section(md, title) {
  const start = md.search(new RegExp(`^## ${title}[^\\n]*$`, 'm'));
  if (start === -1) return '';
  const body = md.slice(md.indexOf('\n', start) + 1);
  let end = body.length;
  for (const t of TOP) {
    if (t === title) continue;
    const i = body.search(new RegExp(`^## ${t}\\b`, 'm'));
    if (i !== -1 && i < end) end = i;
  }
  return body.slice(0, end).trim();
}

function parse(name, md) {
  // Scenarios are anchored on "**You say:**": excerpts can contain their own ###
  // headings, so the title is the last ### line before each marker.
  const scenarios = [];
  const how = section(md, 'How to trigger it');
  const marks = [...how.matchAll(/\*\*You say:\*\*/g)].map((m) => m.index);
  marks.forEach((at, i) => {
    const before = how.slice(0, at);
    const heads = [...before.matchAll(/^### (.+)$/gm)];
    const head = heads.length ? heads[heads.length - 1] : null;
    const title = head ? head[1].replace(/^Example \d+[:.]?\s*/i, '').trim() : '';
    // This scenario ends where the next one's ### heading starts.
    let end = how.length;
    if (i + 1 < marks.length) {
      const nextHeads = [...how.slice(0, marks[i + 1]).matchAll(/^### .+$/gm)];
      end = nextHeads.length ? nextHeads[nextHeads.length - 1].index : marks[i + 1];
    }
    const part = how.slice(at, end);
    const say = (part.match(/\*\*You say:\*\*\s*\n((?:>.*\n?)+)/) || [, ''])[1].replace(/^>\s?/gm, '').replace(/\s+/g, ' ').trim().replace(/^["“]|["”]$/g, '');
    const out = (part.match(/\*\*Claude produces[^\n]*\n([\s\S]*)$/) || [, ''])[1].replace(/\n---\s*$/, '').trim();
    if (say) scenarios.push({ title, say, excerpt: out.slice(0, 4000) });
  });
  const list = (t) => section(md, t).split('\n').filter((l) => /^\s*[-*] /.test(l)).map((l) => l.replace(/^\s*[-*]\s+/, '').trim());
  const s = meta[name];
  return {
    skill: name, title: s ? s.title : name, bundle: s ? s.plugin : '', tier: s ? s.tier : '',
    what: section(md, 'What this skill does').split('\n\n')[0].trim(),
    scenarios, tips: list('Tips for best results'), related: list('Related skills'),
  };
}

const problems = [];
const cards = [];
for (const f of readdirSync(join(root, 'examples')).sort()) {
  if (!f.endsWith('-example.md')) continue;
  const name = f.replace(/-example\.md$/, '');
  if (!meta[name]) continue; // deprecated or renamed skills are left out
  const card = parse(name, readFileSync(join(root, 'examples', f), 'utf8'));
  if (!card.what) problems.push(`${f}: no "What this skill does" section`);
  if (!card.scenarios.length) problems.push(`${f}: no "You say" scenario could be parsed`);
  cards.push(card);
}
if (process.argv.includes('--check')) {
  if (problems.length) { console.error(`Worked examples: ${problems.length} problem(s)`); for (const p of problems) console.error(`  ✗ ${p}`); process.exit(1); }
  console.log(`Worked examples: ${cards.length} parse cleanly. ✓`);
  process.exit(0);
}
writeFileSync(join(root, 'web', 'worked-examples.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), count: cards.length, examples: cards }));
console.log(`Wrote web/worked-examples.json: ${cards.length} worked examples${problems.length ? `, ${problems.length} with parse problems` : ''}.`);
