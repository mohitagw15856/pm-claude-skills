// Risk-tier resolver + validator (trust idea #3).
//
// Resolves a tier for every skill from config/risk-tiers.json:
//   skill override  >  highest tier across the skill's bundles  >  default
// Bundle membership is derived from plugins/<bundle>/skills/<skill>/ on disk.
// Emits data/risk-tiers.json (resolved map) for the Playground/site to label
// skills and for check-human-review.mjs to know which skills need a review.
//
// Usage:  node scripts/check-risk-tiers.mjs             # validate + write data/risk-tiers.json
//         node scripts/check-risk-tiers.mjs --report    # print tier counts + high-stakes list
//         node scripts/check-risk-tiers.mjs --selftest

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CFG = join(ROOT, 'config', 'risk-tiers.json');
const OUT = join(ROOT, 'data', 'risk-tiers.json');
const RANK = { 'high-stakes': 3, consequential: 2, informational: 1 };

export function loadConfig(p = CFG) { return JSON.parse(readFileSync(p, 'utf8')); }

export function bundleMap(root = ROOT) {
  const map = {}; // skill -> [bundles]
  const pdir = join(root, 'plugins');
  if (!existsSync(pdir)) return map;
  for (const b of readdirSync(pdir)) {
    const sdir = join(pdir, b, 'skills');
    if (!existsSync(sdir)) continue;
    for (const s of readdirSync(sdir)) (map[s] ||= []).push(b);
  }
  return map;
}

export function resolveTier(skill, bundles, cfg) {
  for (const t of Object.keys(RANK)) if ((cfg.skills?.[t] || []).includes(skill)) return { tier: t, via: 'skill' };
  let best = null;
  for (const b of bundles || []) for (const t of Object.keys(RANK)) if ((cfg.bundles?.[t] || []).includes(b) && (!best || RANK[t] > RANK[best.tier])) best = { tier: t, via: `bundle:${b}` };
  return best || { tier: cfg.default || 'informational', via: 'default' };
}

export function resolveAll(cfg = loadConfig(), root = ROOT) {
  const bm = bundleMap(root), out = {}, skills = readdirSync(join(root, 'skills')).filter(s => existsSync(join(root, 'skills', s, 'SKILL.md')));
  for (const s of skills) out[s] = resolveTier(s, bm[s], cfg);
  return { map: out, bundles: new Set(Object.values(bm).flat()), skills: new Set(skills) };
}

function selftest() {
  const cfg = { default: 'informational', bundles: { 'high-stakes': ['pm-hardship'], consequential: ['pm-wealth'] }, skills: { 'high-stakes': ['salary-negotiation'] } };
  let pass = 0, fail = 0; const ok = (c, m) => c ? pass++ : (fail++, console.error('  ✗', m));
  ok(resolveTier('x', ['pm-hardship'], cfg).tier === 'high-stakes', 'bundle tier applies');
  ok(resolveTier('x', ['pm-wealth', 'pm-hardship'], cfg).tier === 'high-stakes', 'highest bundle tier wins');
  ok(resolveTier('salary-negotiation', ['pm-wealth'], cfg).tier === 'high-stakes', 'skill override beats bundle');
  ok(resolveTier('y', ['pm-nothing'], cfg).tier === 'informational', 'default when nothing matches');
  console.log(`risk-tiers self-test: ${pass} passed · ${fail} failed`); return fail ? 1 : 0;
}

const argv = process.argv.slice(2);
if (argv.includes('--selftest')) process.exit(selftest());
const cfg = loadConfig(); const { map, bundles, skills } = resolveAll(cfg);
// Validate that configured names exist (typos are silent otherwise).
const missing = [];
for (const t of Object.keys(RANK)) {
  for (const b of cfg.bundles?.[t] || []) if (!bundles.has(b)) missing.push(`bundle ${b}`);
  for (const s of cfg.skills?.[t] || []) if (!skills.has(s)) missing.push(`skill ${s}`);
}
const counts = {}; for (const v of Object.values(map)) counts[v.tier] = (counts[v.tier] || 0) + 1;
if (argv.includes('--report')) {
  console.log('Tier counts:', counts);
  console.log('High-stakes skills:', Object.entries(map).filter(([, v]) => v.tier === 'high-stakes').map(([k]) => k).sort().join(', '));
}
if (missing.length) { console.error('✗ risk-tiers.json references names that do not exist:\n  ' + missing.join('\n  ')); process.exit(1); }
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), counts, tiers: map }, null, 1) + '\n');
console.log(`Risk tiers resolved for ${Object.keys(map).length} skills → data/risk-tiers.json  (${Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(' · ')})`);
