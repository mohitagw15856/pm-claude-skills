#!/usr/bin/env node
// Route a prompt to a skill with one or two typed Choice calls.
//
//   node integrations/jev/route.mjs "my landlord kept my deposit"        # two-stage: pack → skill
//   node integrations/jev/route.mjs --flat "…"                            # chunked flat choice
//   node integrations/jev/route.mjs --json "…"                            # machine-readable
//   node integrations/jev/route.mjs --selftest
//
// Without JEV_API_KEY it falls back to the keyword baseline and says so.
import { fileURLToPath } from 'node:url';
import { ask, choice, decide, chunk, configured, mockTransport } from './client.mjs';
import { loadCatalog, packsOf, criteriaFor, packCriteria, keywordRank } from './catalog.mjs';

let RISK = null;
function riskTier(name) {
  if (RISK === null) { try { RISK = JSON.parse(readFileSync(new URL('../../data/risk-tiers.json', import.meta.url), 'utf8')).tiers || {}; } catch { RISK = {}; } }
  return RISK[name]?.tier || null;
}
import { readFileSync } from 'node:fs';

const PACK_Q = 'Which family of professional skills best fits what this person is asking for? Pick the bundle whose skills would produce the artifact they need.';
const SKILL_Q = 'Which single skill would a senior professional reach for to answer this request? Pick the one whose output is what the person actually needs.';

export async function routePrompt(prompt, { catalog = loadCatalog(), transport, twoStage = true, thresholds = {}, env = process.env } = {}) {
  const t0 = Date.now();
  if (!transport && !configured(env)) {
    const kr = keywordRank(prompt, catalog.skills);
    const top = kr[0];
    return { method: 'keyword', skill: top?.skill || null, pack: top ? catalog.byName[top.skill]?.plugin : null, tier: top ? riskTier(top.skill) : null, confidence: null, probability: null, alternatives: kr.slice(1, 4).map((x) => x.skill), ms: Date.now() - t0, note: 'JEV_API_KEY not set — keyword baseline' };
  }
  const opts = { transport, env };
  const stages = [];
  let candidates;
  let pack = null;
  if (twoStage) {
    const packs = packsOf(catalog);
    const r1 = await ask(prompt, { pack: choice(PACK_Q, packCriteria(packs)) }, opts);
    const d1 = decide(r1.answers.pack, thresholds);
    pack = d1.pick;
    stages.push({ stage: 'pack', pick: pack, probability: d1.probability, confidence: d1.confidence, ms: r1.ms });
    candidates = packs[pack] || [];
    // A weak pack pick: widen to the top-3 packs so the skill stage can still be right.
    if (!d1.ok) {
      const top3 = Object.entries(r1.answers.pack.probabilities || {}).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([p]) => p);
      candidates = top3.flatMap((p) => packs[p] || []);
      stages[0].widened = top3;
    }
  } else {
    candidates = catalog.skills;
  }
  // Skill stage — chunked when >255 (flat mode or a widened pack set).
  let winners = candidates;
  while (winners.length > 255) {
    const round = [];
    for (const c of chunk(winners)) {
      const r = await ask(prompt, { skill: choice(SKILL_Q, criteriaFor(c)) }, opts);
      round.push(catalog.byName[r.answers.skill.choice]);
      stages.push({ stage: 'chunk', size: c.length, pick: r.answers.skill.choice, ms: r.ms });
    }
    winners = round.filter(Boolean);
  }
  if (winners.length === 1) {
    const only = winners[0];
    return { method: twoStage ? 'jev-two-stage' : 'jev-flat', skill: only.name, pack: only.plugin, tier: riskTier(only.name), confidence: 1, probability: 1, alternatives: [], stages, ms: Date.now() - t0 };
  }
  if (!winners.length) return { method: 'jev', skill: null, pack, tier: null, confidence: 0, probability: 0, alternatives: [], stages, ms: Date.now() - t0, note: 'no candidates' };
  const r2 = await ask(prompt, { skill: choice(SKILL_Q, criteriaFor(winners)) }, opts);
  const d2 = decide(r2.answers.skill, thresholds);
  const alternatives = Object.entries(r2.answers.skill.probabilities || {}).sort((a, b) => b[1] - a[1]).slice(1, 4).map(([s]) => s);
  stages.push({ stage: 'skill', pick: d2.pick, probability: d2.probability, confidence: d2.confidence, ms: r2.ms });
  return { method: twoStage ? 'jev-two-stage' : 'jev-flat', skill: d2.pick, pack: catalog.byName[d2.pick]?.plugin || pack, tier: riskTier(d2.pick), confidence: d2.confidence, probability: d2.probability, auto: d2.ok, alternatives, stages, ms: Date.now() - t0 };
}

// Mock that "knows" the answer by keyword — lets every dependent script self-test offline.
export function keywordMock(catalog) {
  return mockTransport((key, q, state) => {
    const opts = Object.keys(q.criteria);
    if (key === 'pack') {
      const kr = keywordRank(state, catalog.skills)[0];
      return kr ? catalog.byName[kr.skill].plugin : opts[0];
    }
    const kr = keywordRank(state, opts.map((o) => catalog.byName[o]).filter(Boolean))[0];
    return kr ? kr.skill : opts[0];
  });
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const catalog = loadCatalog();
  const transport = keywordMock(catalog);
  const a = await routePrompt('write the PRD for our referral feature', { catalog, transport });
  ok(a.method === 'jev-two-stage' && /prd/.test(a.skill || ''), `two-stage routes PRD ask (${a.skill})`);
  ok(a.stages.length === 2, 'two calls for a confident pack');
  const b = await routePrompt('my landlord kept my security deposit', { catalog, transport, twoStage: false });
  ok(b.method === 'jev-flat' && /deposit/.test(b.skill || ''), `flat routes deposit ask (${b.skill})`);
  ok(b.stages.filter((s) => s.stage === 'chunk').length >= 4, 'flat mode chunks the catalogue');
  const c = await routePrompt('write the PRD for our referral feature', { catalog, env: {} });
  ok(c.method === 'keyword' && c.note, 'no key → keyword baseline, labelled');
  ok(typeof a.ms === 'number' && a.tier !== undefined, 'carries timing and tier');
  console.log(`jev route self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) process.exit(await selftest());
  const flat = argv.includes('--flat'), json = argv.includes('--json');
  const prompt = argv.filter((a) => !a.startsWith('--')).join(' ').trim();
  if (!prompt) { console.error('usage: node integrations/jev/route.mjs [--flat] [--json] "<prompt>"'); process.exit(2); }
  const r = await routePrompt(prompt, { twoStage: !flat });
  if (json) console.log(JSON.stringify(r, null, 2));
  else {
    console.log(`${r.skill || '(none)'}  ·  pack ${r.pack || '-'}  ·  tier ${r.tier || '-'}  ·  ${r.method}  ·  ${r.ms} ms`);
    if (r.confidence != null) console.log(`confidence ${r.confidence.toFixed(2)} · p ${r.probability.toFixed(2)} · ${r.auto ? 'auto' : 'confirm with the user'}`);
    if (r.alternatives?.length) console.log(`also: ${r.alternatives.join(', ')}`);
    if (r.note) console.log(r.note);
  }
}
