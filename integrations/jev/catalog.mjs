// The skill catalogue as decision criteria. Loads the live index from the repo
// (web/skills-index.json) when present, else the snapshot bundled with the npm
// package (index.json). Also carries the keyword baseline every Jev route is
// benchmarked against and falls back to when there is no key.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');

export function loadCatalog({ root = ROOT, indexPath } = {}) {
  const candidates = [indexPath, join(root, 'web', 'skills-index.json'), join(HERE, 'index.json')].filter(Boolean);
  for (const p of candidates) {
    if (!existsSync(p)) continue;
    const raw = JSON.parse(readFileSync(p, 'utf8'));
    const skills = (raw.skills || raw).filter((s) => s && s.name && !s.deprecated).map(slim);
    return { source: p, skills, byName: Object.fromEntries(skills.map((s) => [s.name, s])) };
  }
  throw new Error('no skill index found — run `node web/build-skills.mjs` or `node integrations/jev/build-index.mjs`');
}

// Restrict a catalogue to the skills installed on this machine (for the hook).
export function installedOnly(catalog, dir) {
  if (!dir || !existsSync(dir)) return catalog;
  const names = new Set(readdirSync(dir).filter((n) => existsSync(join(dir, n, 'SKILL.md'))));
  const skills = catalog.skills.filter((s) => names.has(s.name));
  return skills.length ? { ...catalog, skills, byName: Object.fromEntries(skills.map((s) => [s.name, s])) } : catalog;
}

export function slim(s) {
  return { name: s.name, title: s.title || s.name, summary: (s.summary || firstSentence(s.description) || '').slice(0, 200), description: s.description || '', plugin: s.plugin || 'misc', tier: s.tier || null };
}
export function firstSentence(d = '') { return d.split(/(?<=\.)\s+/)[0].trim(); }

// pack → skills, from the plugin field (a skill may belong to several bundles on disk;
// the index records its primary one, which is what routing needs).
export function packsOf(catalog) {
  const packs = {};
  for (const s of catalog.skills) (packs[s.plugin] ||= []).push(s);
  return packs;
}

// Choice criteria: option → short description. Jev reads descriptions, not names.
export function criteriaFor(skills) {
  return Object.fromEntries(skills.map((s) => [s.name, `${s.title}: ${s.summary}`]));
}
export function packCriteria(packs, describe = describePack) {
  return Object.fromEntries(Object.entries(packs).map(([p, skills]) => [p, describe(p, skills)]));
}
export function describePack(name, skills) {
  const titles = skills.slice(0, 6).map((s) => s.title).join(', ');
  return `${name.replace(/^pm-/, '')} — ${skills.length} skills such as ${titles}`;
}

// ── keyword baseline (a port of hooks/suggest-skill.sh, plus title weighting) ──
const STOP = new Set(['this', 'that', 'with', 'from', 'have', 'what', 'when', 'your', 'about', 'into', 'them', 'they', 'will', 'been', 'were', 'than', 'then', 'there', 'their', 'here', 'just', 'like', 'want', 'need', 'help', 'make', 'some', 'more', 'also', 'should', 'would', 'could', 'write', 'draft', 'create', 'please', 'give']);
export function terms(text) {
  return [...new Set(String(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter((w) => w.length > 3 && !STOP.has(w)))];
}
export function keywordRank(prompt, skills, { topK = 5 } = {}) {
  const ts = terms(prompt);
  if (!ts.length) return [];
  const scored = skills.map((s) => {
    const name = s.name.toLowerCase(), title = (s.title || '').toLowerCase(), desc = (s.description || '').toLowerCase();
    let score = 0;
    for (const t of ts) { if (name.includes(t)) score += 3; else if (title.includes(t)) score += 2; else if (desc.includes(t)) score += 1; }
    return { skill: s.name, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score || a.skill.localeCompare(b.skill));
  return scored.slice(0, topK);
}

export function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const cat = loadCatalog();
  ok(cat.skills.length > 1000, `catalogue loads (${cat.skills.length})`);
  ok(cat.byName['prd-template'], 'prd-template present');
  const packs = packsOf(cat);
  ok(Object.keys(packs).length > 50 && Object.keys(packs).length <= 255, `packs fit one Choice (${Object.keys(packs).length})`);
  ok(Object.values(packs).every((s) => s.length <= 255), 'every pack fits one Choice');
  const kr = keywordRank('write the PRD for our referral feature', cat.skills);
  ok(kr[0] && /prd/.test(kr[0].skill), `keyword baseline finds a PRD skill (${kr[0]?.skill})`);
  ok(terms('Help me decode this lease!').join(',') === 'decode,lease', 'terms drops stopwords');
  console.log(`jev catalog self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv.includes('--selftest') && process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(selftest());
