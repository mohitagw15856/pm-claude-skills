#!/usr/bin/env node
// Staleness board — which skills has nobody looked at since they were written?
//
// Two timestamps per skill, with different meanings:
//   updated    last git touch of the SKILL.md (already tracked in
//              web/skills.json). Proves someone edited it; says nothing about
//              whether it still works well.
//   verified   optional frontmatter (`verified: YYYY-MM-DD`): the date a human
//              last ran the skill against a current model and confirmed the
//              output passes the skill's own Quality Checks. This is the claim
//              that matters, and before this script nothing recorded it.
//
// The board ranks skills by how long they have gone without either signal, so
// review effort goes to the oldest-untouched corner of the library instead of
// wherever attention happens to land. Production-tier skills are flagged
// louder: a stale flagship costs more than a stale niche skill.
//
// Output is date-relative, so the board is a REPORT, not a committed artifact —
// regenerating it on different days gives different buckets, and committing it
// would trip the determinism the generated-file checks rely on. The weekly
// vitals run publishes a copy to the vitals-data branch.
//
//   node scripts/check-staleness.mjs                # board, oldest first
//   node scripts/check-staleness.mjs --json
//   node scripts/check-staleness.mjs --md > out.md  # markdown for publishing
//   node scripts/check-staleness.mjs --days 120     # threshold (default 90)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (f) => process.argv.includes(f);
const arg = (f, d) => { const i = process.argv.indexOf(f); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const DAYS = Number(arg('--days', '90')) || 90;
const NOW = Date.now();

const catalog = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills;
const tiers = JSON.parse(readFileSync(join(root, 'skill-tiers.json'), 'utf8'));
const prod = new Set(tiers.productionReady);

const rows = [];
for (const s of catalog) {
  if (s.deprecated) continue;
  const file = join(root, 'skills', s.name, 'SKILL.md');
  if (!existsSync(file)) continue;
  const fm = readFileSync(file, 'utf8').split('---')[1] || '';
  const verified = (fm.match(/^verified:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1] || null;
  const freshest = verified && verified > (s.updated || '') ? verified : s.updated;
  const ageDays = freshest ? Math.floor((NOW - new Date(freshest).getTime()) / 86400e3) : Infinity;
  rows.push({ name: s.name, tier: s.tier, updated: s.updated, verified, ageDays });
}
rows.sort((a, b) => b.ageDays - a.ageDays || (a.tier === 'production' ? -1 : 1));

const stale = rows.filter((r) => r.ageDays > DAYS);
const staleProd = stale.filter((r) => r.tier === 'production');
const verifiedCount = rows.filter((r) => r.verified).length;

const buckets = [
  ['≤ 30 days', rows.filter((r) => r.ageDays <= 30).length],
  ['31–90 days', rows.filter((r) => r.ageDays > 30 && r.ageDays <= 90).length],
  ['91–180 days', rows.filter((r) => r.ageDays > 90 && r.ageDays <= 180).length],
  ['> 180 days', rows.filter((r) => r.ageDays > 180).length],
];

if (has('--json')) {
  console.log(JSON.stringify({
    generated: new Date(NOW).toISOString().slice(0, 10),
    thresholdDays: DAYS,
    skills: rows.length, verified: verifiedCount,
    stale: stale.length, staleProduction: staleProd.length,
    buckets: Object.fromEntries(buckets),
    oldest: rows.slice(0, 50),
  }, null, 2));
} else if (has('--md')) {
  const L = [];
  L.push(`# Staleness board — ${new Date(NOW).toISOString().slice(0, 10)}`, '');
  L.push(`${rows.length} live skills · ${verifiedCount} carry a \`verified:\` date · ${stale.length} untouched for over ${DAYS} days (${staleProd.length} of them Production-tier).`, '');
  L.push('| Age | Skills |', '|---|---|');
  for (const [k, v] of buckets) L.push(`| ${k} | ${v} |`);
  L.push('', `## Oldest ${Math.min(30, rows.length)} — review these first`, '');
  L.push('| Skill | Tier | Last touched | Verified | Age (days) |', '|---|---|---|---|---|');
  for (const r of rows.slice(0, 30)) {
    L.push(`| \`${r.name}\` | ${r.tier} | ${r.updated || '—'} | ${r.verified || '—'} | ${r.ageDays} |`);
  }
  L.push('', 'To mark a skill verified, run it against a current model, confirm the output passes its own Quality Checks, and add `verified: YYYY-MM-DD` to its frontmatter.');
  console.log(L.join('\n'));
} else {
  console.log(`Staleness — ${rows.length} live skills · ${verifiedCount} verified · ${stale.length} older than ${DAYS} days (${staleProd.length} Production-tier)\n`);
  for (const [k, v] of buckets) console.log(`  ${k.padEnd(12)} ${String(v).padStart(5)}`);
  console.log(`\nOldest 15:`);
  for (const r of rows.slice(0, 15)) {
    console.log(`  ${String(r.ageDays).padStart(4)}d  ${r.tier === 'production' ? '🟢' : '  '} ${r.name}  (updated ${r.updated || '—'}${r.verified ? `, verified ${r.verified}` : ''})`);
  }
  console.log(`\nMark one verified: run it, check the output against its Quality Checks, add \`verified: YYYY-MM-DD\` to the frontmatter.`);
}
