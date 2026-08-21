#!/usr/bin/env node
// Builds DISAMBIGUATION.md — the "you want X, not Y" index.
//
// At four figures, discovery is the constraint, not supply. Someone looking for
// a threat model finds two; someone about to write a new skill cannot tell
// whether the thing they want already exists under a different noun. That
// second failure is how the library accumulated 40-odd near-duplicate pairs in
// the first place.
//
// Nothing here is authored twice. The page is assembled from decisions already
// recorded elsewhere:
//   * skill-dupes-allow.json — every reviewed look-alike pair and why both stay
//   * deprecated/supersededBy frontmatter — every retired name and its heir
//   * plugins/ — which bundle each skill belongs to, for the confusable-name index
//
// So the index cannot drift from the decisions: change the allowlist or retire
// a skill, and this regenerates.
//
//   node scripts/build-disambiguation.mjs           # write DISAMBIGUATION.md
//   node scripts/build-disambiguation.mjs --check   # exit 1 if it is stale
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const out = join(root, 'DISAMBIGUATION.md');
const check = process.argv.includes('--check');

function parseFrontmatter(text) {
  const m = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    meta[kv[1]] = v;
  }
  return { meta, body: m[2] };
}

// ── Load skills ──────────────────────────────────────────────────────────────
const skills = new Map();
for (const name of readdirSync(skillsDir).sort()) {
  const file = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(file) || !statSync(join(skillsDir, name)).isDirectory()) continue;
  const { meta, body } = parseFrontmatter(readFileSync(file, 'utf8'));
  const title = (body.split(/\r?\n/).find((l) => /^#\s+\S/.test(l)) || '')
    .replace(/^#\s+/, '').replace(/\s+Skill$/i, '').trim();
  skills.set(name, {
    name,
    title: title || name,
    // The first sentence of the description is what a chooser actually needs.
    gist: (meta.description || '').split(/(?<=\.)\s+/)[0] || '',
    deprecated: meta.deprecated || null,
    supersededBy: meta.supersededBy || null,
  });
}

// ── Which bundle owns each skill ─────────────────────────────────────────────
const bundleOf = {};
const pluginsDir = join(root, 'plugins');
if (existsSync(pluginsDir)) {
  for (const plugin of readdirSync(pluginsDir)) {
    const dir = join(pluginsDir, plugin, 'skills');
    if (!existsSync(dir)) continue;
    for (const s of readdirSync(dir)) bundleOf[s] = plugin;
  }
}

const allowFile = join(root, 'skill-dupes-allow.json');
const pairs = existsSync(allowFile) ? (JSON.parse(readFileSync(allowFile, 'utf8')).pairs || []) : [];

// ── Compose ──────────────────────────────────────────────────────────────────
const live = [...skills.values()].filter((s) => !s.deprecated);
const retired = [...skills.values()].filter((s) => s.deprecated);

const L = [];
L.push('# 🧭 Disambiguation — you want *this* one, not that one', '');
L.push(`> **Generated — do not edit.** Run \`node scripts/build-disambiguation.mjs\`.`);
L.push(`> ${live.length} live skills across ${new Set(Object.values(bundleOf)).size} bundles, plus ${retired.length} retired names that still resolve.`, '');
L.push('At this size the hard part is not finding *a* skill — it is telling two similar ones apart, and');
L.push('knowing whether the thing you are about to write already exists under a different noun.');
L.push('This page answers both. It is assembled from decisions recorded elsewhere in the repo, so it');
L.push('cannot drift from them.', '');
L.push('**Writing a new skill?** Check here first, then run `node scripts/skill-dupes.mjs` — CI runs it');
L.push('on every PR that touches `skills/`, and a new near-duplicate fails the build.', '');

// Deliberate look-alikes.
L.push('## Pairs that look alike and both stay', '');
L.push('Each of these scored as a near-duplicate and was reviewed and kept. The reason is the rule for');
L.push('choosing between them.', '');
L.push('| These two get confused | | | How to choose |');
L.push('|---|---|---|---|');
const sorted = pairs.slice().sort((x, y) => x.a.localeCompare(y.a) || x.b.localeCompare(y.b));
for (const p of sorted) {
  const a = skills.get(p.a);
  const b = skills.get(p.b);
  if (!a || !b) continue;
  const reason = (p.reason || '').replace(/\|/g, '\\|');
  // The reason already reads "X vs Y"; present the pair symmetrically rather
  // than inventing a preferred side the review never expressed.
  L.push(`| ${escape(a.title)} / ${escape(b.title)} | \`${a.name}\` | \`${b.name}\` | ${reason} |`);
}
L.push('');

// Retired names.
if (retired.length) {
  L.push('## Retired names that still work', '');
  L.push('These resolve for `add`, `run`, and the MCP server — they are hidden from the catalogue and');
  L.push('point at their successor. See [docs/DEPRECATION.md](docs/DEPRECATION.md).', '');
  L.push('| Retired | Use instead | Retired on |');
  L.push('|---|---|---|');
  for (const s of retired.sort((x, y) => x.name.localeCompare(y.name))) {
    const heir = s.supersededBy && skills.get(s.supersededBy);
    L.push(`| \`${s.name}\` | ${heir ? `\`${heir.name}\` — ${escape(heir.title)}` : '—'} | ${s.deprecated} |`);
  }
  L.push('');
}

// Confusable prefixes — families sharing a leading word, which is where a
// searcher lands when they guess a name.
const families = new Map();
for (const s of live) {
  const head = s.name.split('-')[0];
  if (head.length < 3) continue;
  if (!families.has(head)) families.set(head, []);
  families.get(head).push(s);
}
const big = [...families.entries()].filter(([, v]) => v.length >= 4).sort((a, b) => b[1].length - a[1].length);
if (big.length) {
  L.push('## Name families', '');
  L.push('Groups sharing a first word — where a guessed name usually lands. Skim the family before');
  L.push('assuming the skill you want is missing.', '');
  for (const [head, members] of big) {
    L.push(`**\`${head}-*\`** (${members.length})`, '');
    for (const m of members.sort((x, y) => x.name.localeCompare(y.name))) {
      L.push(`- \`${m.name}\`${bundleOf[m.name] ? ` · ${bundleOf[m.name]}` : ''} — ${escape(m.gist)}`);
    }
    L.push('');
  }
}

function escape(s) {
  return String(s || '').replace(/\|/g, '\\|').trim();
}

const text = L.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';

if (check) {
  const current = existsSync(out) ? readFileSync(out, 'utf8') : '';
  if (current !== text) {
    console.error('DISAMBIGUATION.md is stale — run: node scripts/build-disambiguation.mjs');
    process.exit(1);
  }
  console.log('DISAMBIGUATION.md up to date. ✓');
} else {
  writeFileSync(out, text);
  console.log(`Wrote DISAMBIGUATION.md — ${sorted.length} reviewed pairs, ${retired.length} retired names, ${big.length} name families.`);
}
