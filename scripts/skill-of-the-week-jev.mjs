#!/usr/bin/env node
// Skill of the week, chosen on signal (decision-layer idea #18). The rotation in
// skill-of-the-week.mjs is fair; this is timely: it asks one Choice over candidates
// with the week's signals attached — demand from the gap-miner, open requests,
// staleness, what shipped this release — and prints the pick with the reason.
//   node scripts/skill-of-the-week-jev.mjs [--json]      # no key → highest-signal candidate, labelled
//   node scripts/skill-of-the-week-jev.mjs --selftest
// Wire: run this first in .github/workflows/skill-of-the-week.yml and pass the pick to the
// existing script's output, or leave the rotation as the fallback (both are deterministic).
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { ask, choice, configured, mockTransport } from '../integrations/jev/client.mjs';
import { loadCatalog } from '../integrations/jev/catalog.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p, d) => { try { return JSON.parse(readFileSync(join(ROOT, p), 'utf8')); } catch { return d; } };

export function signals(catalog) {
  const demand = {}; for (const r of readJson('data/skill-requests.json', { requests: [] }).requests || []) if (r.covered_by) demand[r.covered_by] = (demand[r.covered_by] || 0) + (r.count || 1);
  let shipped = [];
  try { shipped = execFileSync('git', ['diff', '--name-only', 'HEAD~30..HEAD', '--', 'skills'], { cwd: ROOT, encoding: 'utf8' }).split('\n').map((l) => l.match(/^skills\/([^/]+)\/SKILL\.md$/)?.[1]).filter(Boolean); } catch {}
  const tiers = readJson('skill-tiers.json', { productionReady: [] }).productionReady || [];
  const week = isoWeek(new Date());
  const rows = catalog.skills.map((s) => ({ skill: s.name, title: s.title, summary: s.summary, demand: demand[s.name] || 0, shippedRecently: shipped.includes(s.name), production: tiers.includes(s.name), seasonal: seasonHint(s.name, week) }));
  rows.forEach((r) => (r.score = r.demand * 3 + (r.shippedRecently ? 2 : 0) + (r.production ? 1 : 0) + (r.seasonal ? 2 : 0)));
  return rows.sort((a, b) => b.score - a.score || a.skill.localeCompare(b.skill));
}
function isoWeek(d) { const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day); return Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7); }
function seasonHint(name, week) { if (week >= 48 || week <= 2) return /gift|holiday|year-in-review|annual|resolution|budget/.test(name); if (week >= 12 && week <= 16) return /tax/.test(name); if (week >= 34 && week <= 38) return /school|back-to|iep|q4|planning|okr/.test(name); return false; }

export async function pickWeek({ transport, env = process.env, catalog = loadCatalog(), top = 40 } = {}) {
  const rows = signals(catalog); const cand = rows.slice(0, top);
  if (!transport && !configured(env)) { const r = cand[0]; return { method: 'signal', skill: r.skill, why: reason(r), candidates: cand.length }; }
  const criteria = Object.fromEntries(cand.map((r) => [r.skill, `${r.title}: ${r.summary} — demand ${r.demand}, ${r.shippedRecently ? 'just shipped' : 'established'}${r.seasonal ? ', seasonal now' : ''}${r.production ? ', production tier' : ''}`]));
  const r = await ask({ week: isoWeek(new Date()), goal: 'feature the skill most people need this week; prefer demand and seasonality over novelty' }, { pick: choice('Which skill should be featured this week?', criteria) }, { transport, env });
  const a = r.answers.pick; const row = cand.find((x) => x.skill === a.choice) || cand[0];
  return { method: 'jev', skill: a.choice, why: reason(row), probability: +(a.probabilities?.[a.choice] || 0).toFixed(2), confidence: +a.confidence.toFixed(2), candidates: cand.length };
}
function reason(r) { const bits = []; if (r.demand) bits.push(`${r.demand} requests`); if (r.shippedRecently) bits.push('shipped this release'); if (r.seasonal) bits.push('seasonal'); if (r.production) bits.push('production tier'); return bits.join(' · ') || 'rotation'; }
export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const catalog = loadCatalog(); const s = signals(catalog); ok(s.length === catalog.skills.length && s[0].score >= s[1].score, 'signals rank the catalogue');
  const off = await pickWeek({ env: {}, catalog }); ok(off.method === 'signal' && off.skill, `no key → top signal (${off.skill}: ${off.why})`);
  const t = mockTransport((k, q) => Object.keys(q.criteria)[1]);
  const on = await pickWeek({ transport: t, catalog }); ok(on.method === 'jev' && on.skill === s[1].skill, 'model pick honoured');
  console.log(`skill-of-the-week-jev self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes('--selftest')) process.exit(await selftest());
  const r = await pickWeek();
  if (process.argv.includes('--json')) console.log(JSON.stringify(r)); else console.log(`${r.skill} — ${r.why} (${r.method}${r.confidence != null ? `, confidence ${r.confidence}` : ''}; ${r.candidates} candidates)`);
}
