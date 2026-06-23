#!/usr/bin/env node
// Regression gate for the eval leaderboard. Compares the freshly-scored skills in
// evals/results.json against a baseline (e.g. origin/main's results.json) and FAILS
// (exit 1) if any skill's average score dropped by more than --threshold. This locks
// quality: a SKILL.md edit that makes the output worse can't merge silently.
//
// Only skills present in BOTH files are compared, so an unscored or brand-new skill
// never trips the gate — and since CI re-scores only changed skills, unchanged ones
// carry identical scores and are no-ops.
//
// Usage:
//   git show origin/main:evals/results.json > /tmp/baseline.json
//   node scripts/eval-regression-gate.mjs --baseline /tmp/baseline.json
//   node scripts/eval-regression-gate.mjs --baseline /tmp/baseline.json --threshold 0.5
import { readFileSync, existsSync } from 'node:fs';

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
};

const baselinePath = arg('baseline');
const resultsPath = arg('results', 'evals/results.json');
const threshold = Number(arg('threshold', '0.5'));

if (!baselinePath || !existsSync(baselinePath)) {
  console.log(`No baseline at "${baselinePath}" — nothing to compare. Skipping gate.`);
  process.exit(0);
}
if (!existsSync(resultsPath)) {
  console.log(`No results at "${resultsPath}" — nothing scored. Skipping gate.`);
  process.exit(0);
}

// Average a skill's `overall` across whatever models were scored.
function bySkill(file) {
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const acc = {};
  for (const r of data.results || []) {
    if (typeof r.overall !== 'number') continue;
    (acc[r.skill] ||= []).push(r.overall);
  }
  const out = {};
  for (const [skill, xs] of Object.entries(acc)) out[skill] = xs.reduce((a, b) => a + b, 0) / xs.length;
  return out;
}

const base = bySkill(baselinePath);
const now = bySkill(resultsPath);

const regressions = [];
const changed = [];
for (const [skill, score] of Object.entries(now)) {
  if (!(skill in base)) continue; // new skill — not a regression
  const delta = score - base[skill];
  if (Math.abs(delta) >= 0.01) changed.push({ skill, before: base[skill], after: score, delta });
  if (delta <= -threshold) regressions.push({ skill, before: base[skill], after: score, delta });
}

const fmt = (n) => n.toFixed(2);
if (changed.length) {
  console.log('Skill score changes vs baseline:');
  for (const c of changed.sort((a, b) => a.delta - b.delta)) {
    const sign = c.delta >= 0 ? '+' : '';
    console.log(`  ${c.delta <= -threshold ? '🔴' : c.delta < 0 ? '🟡' : '🟢'} ${c.skill}: ${fmt(c.before)} → ${fmt(c.after)} (${sign}${fmt(c.delta)})`);
  }
} else {
  console.log('No changed skills had baseline scores to compare. Gate passes.');
}

if (regressions.length) {
  console.error(`\n::error::Eval regression gate failed — ${regressions.length} skill(s) dropped by ≥ ${threshold}:`);
  for (const r of regressions) console.error(`  ${r.skill}: ${fmt(r.before)} → ${fmt(r.after)} (${fmt(r.delta)})`);
  console.error('\nFix the skill so its score recovers, or justify the change. (Tune with --threshold.)');
  process.exit(1);
}

console.log(`\n✓ Regression gate passed (threshold ${threshold}).`);
