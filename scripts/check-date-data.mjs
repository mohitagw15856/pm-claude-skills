#!/usr/bin/env node
// Freshness gate for the calendar data behind the live README cards.
//
//   data/cn-exam-dates.json  fails when an exam's latest dated sitting has
//                            passed and no later sitting is listed (the badge
//                            would be running on the fallback rule alone);
//                            warns 60 days before that happens.
//   data/solar-terms.json    fails when the solar-term table ends within 180
//                            days, or the festival table has no entry for next
//                            year; warns at 365 days.
//
//   node scripts/check-date-data.mjs                 # report, exit 0
//   node scripts/check-date-data.mjs --check         # exit 1 on a failure
//   node scripts/check-date-data.mjs --date 2027-01-01
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/check-date-data.mjs [--check] [--date YYYY-MM-DD]');
  process.exit(0);
}
const check = argv.includes('--check');
const di = argv.indexOf('--date');
const today = di !== -1 && /^\d{4}-\d{2}-\d{2}$/.test(argv[di + 1] || '') ? argv[di + 1] : new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
const days = (a, b) => Math.round((new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`)) / 864e5);
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const fails = [], warns = [];
const exams = read('data/cn-exam-dates.json').exams || {};
for (const [id, e] of Object.entries(exams)) {
  const dates = Object.values(e.dates || {}).map((x) => x && x.date).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d || '')).sort();
  const last = dates[dates.length - 1];
  if (!last) { fails.push(`${id}: no dated sitting in data/cn-exam-dates.json`); continue; }
  const left = days(today, last);
  if (left < 0) fails.push(`${id} (${e.label}): the latest listed sitting, ${last}, has passed; add the next one (rule: ${e.rule})`);
  else if (left <= 60) warns.push(`${id} (${e.label}): only ${last} is listed ahead; add the following sitting when it is announced`);
  for (const [k, v] of Object.entries(e.dates || {})) {
    const away = v && days(today, v.date);
    if (v && !v.confirmed && away >= 0 && away <= 45) warns.push(`${id} ${k}: ${v.date} is still marked unconfirmed and is ${away} days away`);
  }
}
const cal = read('data/solar-terms.json');
const terms = Object.values(cal.terms || {}).flat().map((t) => t[1]).sort();
const lastTerm = terms[terms.length - 1];
const termLeft = lastTerm ? days(today, lastTerm) : -1;
if (termLeft < 180) fails.push(`solar terms: the table ends ${lastTerm || 'nowhere'}; add the next year (HKO publishes them at https://www.hko.gov.hk/en/gts/astronomy/Solar_Term.htm)`);
else if (termLeft < 365) warns.push(`solar terms: the table ends ${lastTerm}, within a year`);
const nextYear = String(+today.slice(0, 4) + 1);
if (!(cal.festivals || {})[nextYear]) fails.push(`festivals: no entry for ${nextYear} in data/solar-terms.json`);

for (const w of warns) console.log(`warn  ${w}`);
for (const f of fails) console.log(`FAIL  ${f}`);
console.log(fails.length ? `\nDate data: ${fails.length} problem(s).` : `Date data is current for ${today} (${warns.length} warning(s)). ✓`);
process.exit(check && fails.length ? 1 : 0);
