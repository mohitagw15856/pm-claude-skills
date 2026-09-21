// Human-review coverage check (trust ideas #1 + #4).
//
// For every HIGH-STAKES skill (from data/risk-tiers.json — run
// check-risk-tiers.mjs first), checks config/human-review.json for a current,
// un-expired human review. Reports coverage; --strict exits 1 when any
// high-stakes skill lacks one (leave off until coverage exists — it starts at 0).
//
// Usage:  node scripts/check-human-review.mjs            # report
//         node scripts/check-human-review.mjs --strict   # exit 1 if any high-stakes skill is unreviewed/overdue
//         node scripts/check-human-review.mjs --selftest

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REG = join(ROOT, 'config', 'human-review.json');
const TIERS = join(ROOT, 'data', 'risk-tiers.json');

export function isCurrent(review, months = 12, today = new Date()) {
  if (!review?.date) return false;
  const exp = review.expires ? new Date(review.expires) : new Date(new Date(review.date).setMonth(new Date(review.date).getMonth() + months));
  return exp >= today;
}

export function coverage(highStakes, registry, today = new Date()) {
  const months = registry.review_validity_months || 12;
  const latest = {};
  for (const r of registry.reviews || []) if (!latest[r.skill] || new Date(r.date) > new Date(latest[r.skill].date)) latest[r.skill] = r;
  const reviewed = [], overdue = [], missing = [];
  for (const s of highStakes) {
    const r = latest[s];
    if (!r) missing.push(s); else if (isCurrent(r, months, today)) reviewed.push(s); else overdue.push(s);
  }
  return { reviewed, overdue, missing };
}

function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => c ? pass++ : (fail++, console.error('  ✗', m));
  const today = new Date('2026-09-21');
  ok(isCurrent({ date: '2026-01-01' }, 12, today), 'review within 12 months is current');
  ok(!isCurrent({ date: '2025-01-01' }, 12, today), 'review older than 12 months is overdue');
  ok(isCurrent({ date: '2025-01-01', expires: '2027-01-01' }, 12, today), 'explicit expires overrides default');
  const c = coverage(['a', 'b', 'c'], { reviews: [{ skill: 'a', date: '2026-06-01' }, { skill: 'b', date: '2024-01-01' }] }, today);
  ok(c.reviewed.join() === 'a' && c.overdue.join() === 'b' && c.missing.join() === 'c', 'reviewed/overdue/missing split');
  console.log(`human-review self-test: ${pass} passed · ${fail} failed`); return fail ? 1 : 0;
}

const argv = process.argv.slice(2);
if (argv.includes('--selftest')) process.exit(selftest());
if (!existsSync(TIERS)) { console.error('data/risk-tiers.json missing — run: node scripts/check-risk-tiers.mjs'); process.exit(1); }
const tiers = JSON.parse(readFileSync(TIERS, 'utf8')).tiers;
const high = Object.entries(tiers).filter(([, v]) => v.tier === 'high-stakes').map(([k]) => k).sort();
const reg = JSON.parse(readFileSync(REG, 'utf8'));
const { reviewed, overdue, missing } = coverage(high, reg);
const pct = high.length ? Math.round(100 * reviewed.length / high.length) : 0;
console.log(`Human-review coverage of high-stakes skills: ${reviewed.length}/${high.length} (${pct}%) · overdue ${overdue.length} · missing ${missing.length}`);
if (overdue.length) console.log('Overdue:', overdue.join(', '));
if (missing.length && argv.includes('--verbose')) console.log('Missing:', missing.join(', '));
if (argv.includes('--strict') && (overdue.length || missing.length)) { console.error('✗ strict: high-stakes skills lack a current human review. See docs/EXPERT-REVIEW-PROGRAM.md'); process.exit(1); }
