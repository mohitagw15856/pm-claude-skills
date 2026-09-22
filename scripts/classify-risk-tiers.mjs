#!/usr/bin/env node
// Risk-tier second opinion (decision-layer idea #6). config/risk-tiers.json assigns
// tiers by bundle; this scores each skill's own description against the three tier
// definitions and reports where the model would put it HIGHER than the assignment
// (under-tiering is the dangerous direction). Report-only; the config stays authoritative.
//   node scripts/classify-risk-tiers.mjs --changed [--base origin/main]   # skills changed in this PR
//   node scripts/classify-risk-tiers.mjs --skills a,b,c
//   node scripts/classify-risk-tiers.mjs --all --write      # data/risk-tier-audit.json
//   node scripts/classify-risk-tiers.mjs --selftest
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { ask, score, configured, mockTransport } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RANK = ['informational', 'consequential', 'high-stakes'];
const cfg = JSON.parse(readFileSync(join(ROOT, 'config', 'risk-tiers.json'), 'utf8'));
export const LEVELS = RANK.map((t) => `${t}: ${cfg.tiers[t]}`);

export function describe(name) {
  const p = join(ROOT, 'skills', name, 'SKILL.md'); if (!existsSync(p)) return null;
  const fm = (readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
  const m = fm.match(/^description:\s*"?([\s\S]*?)"?\s*$/m);
  return m ? m[1].replace(/\s+/g, ' ').slice(0, 600) : null;
}
export function assigned() { try { return JSON.parse(readFileSync(join(ROOT, 'data', 'risk-tiers.json'), 'utf8')).tiers || {}; } catch { return {}; } }
export function changedSkills(base = 'origin/main') {
  try {
    const out = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`, '--', 'skills'], { cwd: ROOT, encoding: 'utf8' });
    return [...new Set(out.split('\n').map((l) => l.match(/^skills\/([^/]+)\/SKILL\.md$/)?.[1]).filter(Boolean))];
  } catch { return []; }
}

export async function classify(names, { transport, env = process.env, minConfidence = 0.6 } = {}) {
  if (!transport && !configured(env)) return { method: 'off', rows: [], note: 'JEV_API_KEY not set — nothing classified' };
  const tiers = assigned(); const rows = [];
  for (const name of names) {
    const desc = describe(name); if (!desc) continue;
    const r = await ask({ skill: name, description: desc }, { tier: score('Which risk tier does a skill with this description belong to? Judge by what happens to the person if the output is wrong.', LEVELS) }, { transport, env });
    const model = RANK[+r.answers.tier.level]; const conf = r.answers.tier.confidence; const cur = tiers[name]?.tier || cfg.default;
    rows.push({ skill: name, assigned: cur, via: tiers[name]?.via || 'default', model, confidence: +conf.toFixed(2), underTiered: RANK.indexOf(model) > RANK.indexOf(cur) && conf >= minConfidence, overTiered: RANK.indexOf(model) < RANK.indexOf(cur) && conf >= minConfidence });
  }
  return { method: 'jev', rows, underTiered: rows.filter((r) => r.underTiered), overTiered: rows.filter((r) => r.overTiered) };
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  ok(LEVELS.length === 3 && /high-stakes/.test(LEVELS[2]), 'levels from config');
  ok(/PRD/i.test(describe('prd-template') || ''), 'reads a description');
  const t = mockTransport((k, q, state) => (/lease|deposit|medical/i.test(state.description) ? 2 : 0));
  const r = await classify(['prd-template', 'lease-decoder'], { transport: t });
  ok(r.rows.length === 2, 'classifies two skills');
  const lease = r.rows.find((x) => x.skill === 'lease-decoder');
  ok(lease.model === 'high-stakes', 'model tier read from level');
  ok(r.rows.find((x) => x.skill === 'prd-template').model === 'informational', 'PRD → informational');
  const off = await classify(['prd-template'], { env: {} });
  ok(off.method === 'off', 'no key → off, no rows');
  console.log(`classify-risk-tiers self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2); const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : d; };
  if (argv.includes('--selftest')) process.exit(await selftest());
  let names = [];
  if (argv.includes('--all')) names = readdirSync(join(ROOT, 'skills')).filter((n) => existsSync(join(ROOT, 'skills', n, 'SKILL.md')));
  else if (argv.includes('--changed')) names = changedSkills(arg('base', 'origin/main'));
  else if (arg('skills')) names = arg('skills').split(',').map((s) => s.trim()).filter(Boolean);
  if (!names.length) { console.log('classify-risk-tiers: no skills selected (use --all | --changed | --skills a,b)'); process.exit(0); }
  const r = await classify(names);
  if (r.method === 'off') { console.log(r.note); process.exit(0); }
  for (const x of r.underTiered) console.log(`⚠ under-tiered  ${x.skill}: assigned ${x.assigned} (${x.via}) · model says ${x.model} (conf ${x.confidence})`);
  for (const x of r.overTiered) console.log(`ℹ over-tiered   ${x.skill}: assigned ${x.assigned} · model says ${x.model} (conf ${x.confidence})`);
  console.log(`${r.rows.length} classified · ${r.underTiered.length} under-tiered · ${r.overTiered.length} over-tiered`);
  if (argv.includes('--write')) { writeFileSync(join(ROOT, 'data', 'risk-tier-audit.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), ...r }, null, 1)); console.log('→ data/risk-tier-audit.json'); }
  process.exit(argv.includes('--strict') && r.underTiered.length ? 1 : 0);
}
