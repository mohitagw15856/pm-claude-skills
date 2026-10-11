#!/usr/bin/env node
// Read the A/B tests (data/ab-tests.json) against the playground ratings
// (web/feedback.json, where tested skills are rated as <skill>@a and <skill>@b)
// and say what each shows. Conservative on purpose: B is recommended only when
// both sides have minVotes ratings and B's worst plausible thumbs-up rate (the
// Wilson lower bound, 95%) beats A's observed rate. Writes web/ab-status.json.
//
//   node scripts/ab-decide.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(root, 'data', 'ab-tests.json'), 'utf8'));
const fbPath = join(root, 'web', 'feedback.json');
const fb = existsSync(fbPath) ? JSON.parse(readFileSync(fbPath, 'utf8')).skills || {} : {};
const wilsonLow = (up, n, z = 1.96) => {
  if (!n) return 0;
  const p = up / n, den = 1 + (z * z) / n;
  return (p + (z * z) / (2 * n) - z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / den;
};
const out = d.tests.map((t) => {
  const a = fb[`${t.skill}@a`] || { up: 0, total: 0 }, b = fb[`${t.skill}@b`] || { up: 0, total: 0 };
  const rate = (x) => (x.total ? x.up / x.total : 0);
  let verdict = 'collecting';
  if (a.total >= d.minVotes && b.total >= d.minVotes) {
    if (wilsonLow(b.up, b.total) > rate(a)) verdict = 'promote-b';
    else if (wilsonLow(a.up, a.total) > rate(b)) verdict = 'keep-a';
    else verdict = 'no-clear-difference';
  }
  return { skill: t.skill, started: t.started, a: { up: a.up || 0, total: a.total || 0 }, b: { up: b.up || 0, total: b.total || 0 }, verdict };
});
writeFileSync(join(root, 'web', 'ab-status.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), minVotes: d.minVotes, tests: out }, null, 2) + '\n');
for (const t of out) console.log(`${t.skill}: A ${t.a.up}/${t.a.total} · B ${t.b.up}/${t.b.total} → ${t.verdict}`);
if (!out.length) console.log('No A/B tests running.');
for (const t of out.filter((x) => x.verdict === 'promote-b')) console.log(`::notice::${t.skill}: version B wins. Promote it: copy proposals/ab/${t.skill}.md over skills/${t.skill}/SKILL.md in a PR, then node scripts/ab-start.mjs --stop ${t.skill}`);
