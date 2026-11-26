#!/usr/bin/env node
// The monthly report a sponsor is promised in SPONSORS.md, from first-party sources.
//
// GitHub keeps traffic for 14 days only, so each run also merges the daily figures into
// data/sponsor-traffic.json. Run it every week or two and a full month is on record by
// the time the report is due. Needs the gh CLI signed in with push access (traffic is
// owner-only). npm downloads come from the public npm API.
//
//   node scripts/sponsor-report.mjs                               record traffic, print this month
//   node scripts/sponsor-report.mjs --month 2026-11 --sponsor FocuSee
//   node scripts/sponsor-report.mjs --month 2026-11 --out report.md
//   node scripts/sponsor-report.mjs --no-fetch --month 2026-11    report from the log only
//   node scripts/sponsor-report.mjs --selftest
//
// It reports views, not clicks: GitHub does not record outbound clicks, so the sponsor
// reads those from its own analytics under its UTM campaign. No dependencies.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOG = join(ROOT, 'data', 'sponsor-traffic.json');
const REPO = 'mohitagw15856/pm-claude-skills';
const PACKAGE = 'pm-claude-skills';

// Merge daily rows into the log. A later reading of the same day replaces the earlier one,
// because GitHub's figure for the current day keeps growing until the day ends.
export function mergeDays(log, rows) {
  const days = { ...(log.days || {}) };
  for (const r of rows) {
    const day = String(r.timestamp || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
    const count = Number(r.count); const uniques = Number(r.uniques);
    if (!Number.isFinite(count) || !Number.isFinite(uniques)) continue;
    days[day] = { views: count, uniques };
  }
  return { ...log, days: Object.fromEntries(Object.entries(days).sort()) };
}

export function monthTotals(log, month) {
  const rows = Object.entries(log.days || {}).filter(([d]) => d.startsWith(`${month}-`));
  const [y, m] = month.split('-').map(Number);
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return {
    views: rows.reduce((n, [, v]) => n + v.views, 0),
    // Daily unique counts cannot be added into a monthly unique count: one person on two days is counted twice.
    visitorDays: rows.reduce((n, [, v]) => n + v.uniques, 0),
    daysRecorded: rows.length,
    daysInMonth,
    first: rows.length ? rows[0][0] : null,
    last: rows.length ? rows[rows.length - 1][0] : null,
  };
}

const num = (n) => Number(n).toLocaleString('en-GB');

export function render({ month, sponsor, totals, paths, referrers, npm, generated }) {
  const partial = totals.daysRecorded < totals.daysInMonth;
  const lines = [
    `# Sponsor report: ${sponsor || 'PM Skills'} · ${month}`,
    '',
    `Prepared ${generated} from GitHub traffic and the npm downloads API.`,
    '',
    '## Repository traffic',
    '',
    '| Measure | Figure |',
    '|---|---:|',
    `| Repository page views | ${num(totals.views)} |`,
    `| Visitor-days (sum of daily unique visitors) | ${num(totals.visitorDays)} |`,
    `| Days on record | ${totals.daysRecorded} of ${totals.daysInMonth}${totals.first ? ` (${totals.first} to ${totals.last})` : ''} |`,
  ];
  if (npm != null) lines.push(`| npm downloads in the month | ${num(npm)} |`);
  if (partial) lines.push('', `Note: ${totals.daysInMonth - totals.daysRecorded} day(s) of this month are not on record, so the true totals are higher. GitHub keeps traffic for 14 days only.`);
  if (paths && paths.length) {
    lines.push('', '## Most viewed pages (latest 14 days)', '', '| Page | Views | Unique |', '|---|---:|---:|');
    for (const p of paths) lines.push(`| \`${String(p.path).replace(/\|/g, '\\|')}\` | ${num(p.count)} | ${num(p.uniques)} |`);
  }
  if (referrers && referrers.length) {
    lines.push('', '## Where visitors came from (latest 14 days)', '', '| Referrer | Views | Unique |', '|---|---:|---:|');
    for (const r of referrers) lines.push(`| ${String(r.referrer).replace(/\|/g, '\\|')} | ${num(r.count)} | ${num(r.uniques)} |`);
  }
  lines.push('', '## What this does not show', '', 'These are views of pages that carry the placement. GitHub does not record clicks on outbound links, so clicks are in your own analytics under the UTM campaign on your link.', '');
  return lines.join('\n');
}

function gh(path) { return JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })); }

async function npmDownloads(month) {
  const [y, m] = month.split('-').map(Number);
  const end = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
  try {
    const res = await fetch(`https://api.npmjs.org/downloads/point/${month}-01:${end}/${PACKAGE}`);
    if (!res.ok) return null;
    const body = await res.json();
    return Number.isFinite(body.downloads) ? body.downloads : null;
  } catch { return null; }
}

function selftest() {
  let fails = 0;
  const eq = (label, got, want) => { if (JSON.stringify(got) !== JSON.stringify(want)) { fails++; console.error(`  ✗ ${label}\n      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`); } };
  let log = mergeDays({}, [{ timestamp: '2026-11-02T00:00:00Z', count: 10, uniques: 4 }, { timestamp: '2026-11-01T00:00:00Z', count: 0, uniques: 0 }]);
  log = mergeDays(log, [{ timestamp: '2026-11-02T00:00:00Z', count: 25, uniques: 9 }, { timestamp: '2026-12-01T00:00:00Z', count: 7, uniques: 7 }, { timestamp: 'bad', count: 1, uniques: 1 }, { timestamp: '2026-11-03T00:00:00Z', count: 'x', uniques: 1 }]);
  eq('days are sorted and a later reading replaces an earlier one', Object.entries(log.days), [['2026-11-01', { views: 0, uniques: 0 }], ['2026-11-02', { views: 25, uniques: 9 }], ['2026-12-01', { views: 7, uniques: 7 }]]);
  const t = monthTotals(log, '2026-11');
  eq('month totals count only that month, and a zero day is still a recorded day', [t.views, t.visitorDays, t.daysRecorded, t.daysInMonth], [25, 9, 2, 30]);
  eq('February in a leap year has 29 days', monthTotals({}, '2028-02').daysInMonth, 29);
  const text = render({ month: '2026-11', sponsor: 'Acme', totals: t, paths: [{ path: '/a|b', count: 1234, uniques: 5 }], referrers: [], npm: 0, generated: '2026-12-01' });
  eq('a partial month is flagged', /28 day\(s\) of this month are not on record/.test(text), true);
  eq('zero npm downloads is reported, not hidden', /npm downloads in the month \| 0 \|/.test(text), true);
  eq('numbers are grouped and table pipes escaped', /`\/a\\\|b` \| 1,234 \| 5 \|/.test(text), true);
  eq('an empty month renders', /Days on record \| 0 of 31 \|/.test(render({ month: '2026-10', totals: monthTotals(log, '2026-10'), generated: 'x' })), true);
  console.log(fails ? `sponsor-report selftest: ${fails} failure(s)` : 'sponsor-report selftest: 7 passed ✓');
  return fails ? 1 : 0;
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) return selftest();
  const opt = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
  const month = opt('--month') || new Date().toISOString().slice(0, 7);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) { console.error('--month must look like 2026-11'); return 2; }
  let log = existsSync(LOG) ? JSON.parse(readFileSync(LOG, 'utf8')) : { _comment: 'Daily repository views recorded by scripts/sponsor-report.mjs. GitHub keeps 14 days; this file keeps the rest.', days: {} };
  let paths = []; let referrers = [];
  if (!argv.includes('--no-fetch')) {
    try {
      log = mergeDays(log, gh(`repos/${REPO}/traffic/views`).views || []);
      paths = gh(`repos/${REPO}/traffic/popular/paths`).slice(0, 5);
      referrers = gh(`repos/${REPO}/traffic/popular/referrers`).slice(0, 8);
      writeFileSync(LOG, JSON.stringify(log, null, 2) + '\n');
    } catch (e) {
      console.error(`Could not read GitHub traffic (${String(e.stderr || e.message).trim().split('\n')[0]}). Is gh signed in with push access? Reporting from the log only.`);
    }
  }
  const report = render({ month, sponsor: opt('--sponsor'), totals: monthTotals(log, month), paths, referrers, npm: await npmDownloads(month), generated: new Date().toISOString().slice(0, 10) });
  const out = opt('--out');
  if (out) { writeFileSync(out, report); console.log(`Wrote ${out}`); } else console.log(report);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(await main());
