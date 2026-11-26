#!/usr/bin/env node
// The year in review: one page per year, generated from what the repository
// already records, so it can be regenerated every January without writing it.
// Sources: git history (commits, authors, skills added, releases), the
// evolution log, .all-contributorsrc, the trust numbers, the public vitals
// ledger (stars and runs; fetched, optional) and the ROI ledger.
//
//   node scripts/build-year-in-review.mjs                 # web/report/<year>.html for every year with commits, plus index.html
//   node scripts/build-year-in-review.mjs --year 2026     # one year
//   node scripts/build-year-in-review.mjs --offline       # skip the vitals fetch
//   node scripts/build-year-in-review.mjs --pdf           # also web/report/<year>.pdf (needs PLAYWRIGHT_MODULE_DIR)
//
// The page carries print styles, so "Save as PDF" in any browser gives the
// document version; --pdf does the same headlessly when Playwright is present.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (n) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : ''; };
const offline = argv.includes('--offline');
const OUT = join(root, 'web', 'report');
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (n) => Number(n || 0).toLocaleString('en-GB');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const git = (args) => { try { return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); } catch { return ''; } };

// ── Git facts ────────────────────────────────────────────────────────────────
const commitLog = git(['log', '--format=%as\t%an', '--no-merges']).trim().split('\n').filter(Boolean).map((l) => { const [date, author] = l.split('\t'); return { date, author }; });
const years = [...new Set(commitLog.map((c) => c.date.slice(0, 4)))].sort();
// Skills added: the commit that first added each skills/<name>/SKILL.md.
const added = [];
for (const block of git(['log', '--diff-filter=A', '--format=%x1e%as', '--name-only', '--', 'skills/*/SKILL.md']).split('\x1e')) {
  const [date, ...files] = block.trim().split('\n');
  if (!date) continue;
  for (const f of files) { const m = f.match(/^skills\/([^/]+)\/SKILL\.md$/); if (m) added.push({ date, skill: m[1] }); }
}
const tags = git(['for-each-ref', '--sort=creatordate', '--format=%(creatordate:short)\t%(refname:short)', 'refs/tags']).trim().split('\n').filter(Boolean).map((l) => { const [date, tag] = l.split('\t'); return { date, tag }; });
const prs = commitLog.length ? git(['log', '--format=%as\t%s', '--grep=(#[0-9]*)$', '--extended-regexp']).trim().split('\n').filter(Boolean).length : 0;

// ── Data files ───────────────────────────────────────────────────────────────
const json = (p, d) => { try { return JSON.parse(readFileSync(join(root, p), 'utf8')); } catch { return d; } };
const evo = json('data/evolution-log.json', { entries: [] }).entries || [];
const contributors = json('.all-contributorsrc', { contributors: [] }).contributors || [];
const savings = json('data/savings.json', { entries: [] }).entries || [];
const milestones = json('data/star-milestones.json', { events: [] }).events || [];
let trust = {};
try { trust = JSON.parse(execFileSync(process.execPath, [join(root, 'scripts', 'build-trust-numbers.mjs'), '--json'], { cwd: root, encoding: 'utf8' })); } catch { /* optional */ }
let vitals = [];
if (!offline) {
  try {
    const r = await fetch('https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/vitals-data/history.json', { signal: AbortSignal.timeout(8000) });
    if (r.ok) vitals = await r.json();
  } catch { /* the page says so */ }
}
const liveSkills = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md'))).length;

// ── Per-year report ──────────────────────────────────────────────────────────
function yearData(y) {
  const inYear = (d) => (d || '').startsWith(y);
  const commits = commitLog.filter((c) => inYear(c.date));
  const byMonth = Array.from({ length: 12 }, (_, i) => commits.filter((c) => Number(c.date.slice(5, 7)) === i + 1).length);
  const authors = [...new Set(commits.map((c) => c.author))];
  const skillsAdded = added.filter((a) => inYear(a.date));
  const skillsByMonth = Array.from({ length: 12 }, (_, i) => skillsAdded.filter((a) => Number(a.date.slice(5, 7)) === i + 1).length);
  const releases = tags.filter((t) => inYear(t.date));
  const rewrites = evo.filter((e) => inYear(e.date));
  const kept = rewrites.filter((e) => e.kept);
  const v = vitals.filter((p) => inYear(p.d));
  const vFirst = v[0] || null, vLast = v[v.length - 1] || null;
  const yearSavings = savings.filter((s) => inYear(s.date));
  const events = milestones.filter((e) => inYear(e.date));
  const skillsAtEnd = added.filter((a) => a.date.slice(0, 4) <= y).length;
  const busiest = byMonth.indexOf(Math.max(...byMonth));
  return { y, commits: commits.length, byMonth, authors, skillsAdded: skillsAdded.length, skillsByMonth, skillsAtEnd, releases, rewrites: rewrites.length, kept: kept.length, vFirst, vLast, yearSavings, events, busiest, firstDate: commits.length ? commits[commits.length - 1].date : '', lastDate: commits.length ? commits[0].date : '' };
}

function bars(values, label) {
  const max = Math.max(1, ...values);
  return `<div class="bars" role="img" aria-label="${esc(label)}: ${values.map((v, i) => `${MONTHS[i]} ${v}`).join(', ')}">${values.map((v, i) => `<div class="bar"><div class="fill" style="height:${Math.round((v / max) * 100)}%"></div><span class="n">${v || ''}</span><span class="m">${MONTHS[i]}</span></div>`).join('')}</div>`;
}

function page(d, allYears) {
  const isCurrent = d.y === String(new Date().getFullYear());
  const stars = d.vLast && d.vLast.stars != null ? `${fmt(d.vLast.stars)} stars${d.vFirst && d.vFirst.stars != null && d.vFirst !== d.vLast ? ` (${d.vFirst.stars} at the start of the ledger)` : ''}` : 'not on the public ledger';
  const runs = d.vLast && d.vLast.runs != null ? `${fmt(d.vLast.runs)} free runs served all-time${d.vFirst && d.vFirst.runs != null && d.vFirst !== d.vLast ? `, ${fmt(d.vLast.runs - d.vFirst.runs)} of them this year` : ''}` : 'no run data';
  const cards = [
    [fmt(d.skillsAdded), 'skills added'], [fmt(d.skillsAtEnd), `skills in the library at year end`], [fmt(d.commits), 'commits'],
    [fmt(d.releases.length), 'releases'], [fmt(d.authors.length), 'commit authors'], [fmt(d.kept), `machine rewrites kept of ${fmt(d.rewrites)}`],
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PM Skills ${esc(d.y)} annual report</title>
<meta name="description" content="What the PM Skills library did in ${esc(d.y)}: skills added, commits, releases, contributors, machine rewrites kept, stars and free runs, generated from the repository's own records." />
<link rel="canonical" href="${SITE}/report/${esc(d.y)}.html" />
<link rel="stylesheet" href="../styles.css" />
<style>
  .r-wrap { max-width: 900px; margin: 0 auto; padding: 16px 22px 70px; }
  .r-wrap h1 { font-size: 30px; margin: 10px 0 4px; }
  .lead, .muted { color: var(--muted); line-height: 1.6; }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin: 18px 0; }
  .vcard { border: 1px solid var(--border); border-radius: 14px; background: var(--panel); padding: 14px; text-align: center; }
  .vcard b { display: block; font-size: 28px; }
  .vcard span { font-size: 12px; color: var(--muted); }
  h2 { font-size: 18px; margin: 28px 0 8px; }
  .bars { display: grid; grid-template-columns: repeat(12, 1fr); gap: 6px; height: 160px; align-items: end; border: 1px solid var(--border); border-radius: 13px; background: var(--panel); padding: 28px 12px 24px; position: relative; }
  .bar { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; }
  .bar .fill { background: var(--accent); border-radius: 4px 4px 0 0; min-height: 1px; }
  .bar .n { position: absolute; top: -20px; left: 0; right: 0; text-align: center; font-size: 11px; color: var(--muted); }
  .bar .m { position: absolute; bottom: -20px; left: 0; right: 0; text-align: center; font-size: 11px; color: var(--muted); }
  table { border-collapse: collapse; font-size: 13.5px; margin: 8px 0; width: 100%; }
  td, th { border: 1px solid var(--border); padding: 7px 10px; text-align: left; vertical-align: top; }
  .years a { margin-right: 10px; }
  @media print { .toolbar-nav, .years, .noprint { display: none !important; } body { background: #fff; color: #111; } .vcard, .bars, td, th { border-color: #999; background: #fff; } .bar .fill { background: #333; } @page { margin: 18mm; } h2 { page-break-after: avoid; } }
</style>
</head>
<body>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<main class="r-wrap">
  <p class="years">${allYears.map((y) => (y === d.y ? `<b>${y}</b>` : `<a href="${y}.html">${y}</a>`)).join('')}</p>
  <h1>PM Skills in ${esc(d.y)}</h1>
  <p class="lead">The year in the library's own records: git history, the evolution log, the contributor roll, the trust numbers and the public vitals ledger. Generated by <code>scripts/build-year-in-review.mjs</code>${isCurrent ? ', so the current year fills in as it happens' : ''}. Print this page for the document version.</p>

  <div class="cards">${cards.map(([b, s]) => `<div class="vcard"><b>${b}</b><span>${esc(s)}</span></div>`).join('')}</div>

  <h2>Commits by month</h2>
  ${bars(d.byMonth, 'Commits by month')}
  <p class="muted">${d.commits ? `First commit of the year ${esc(d.firstDate)}, last ${esc(d.lastDate)}; busiest month ${MONTHS[d.busiest]}.` : 'No commits this year.'}</p>

  <h2>Skills added by month</h2>
  ${bars(d.skillsByMonth, 'Skills added by month')}

  <h2>Releases</h2>
  ${d.releases.length ? `<table><thead><tr><th>Date</th><th>Tag</th></tr></thead><tbody>${d.releases.map((r) => `<tr><td>${esc(r.date)}</td><td><a href="${REPO}/releases/tag/${esc(r.tag)}">${esc(r.tag)}</a></td></tr>`).join('')}</tbody></table>` : '<p class="muted">No tagged releases this year.</p>'}

  <h2>Reach</h2>
  <ul>
    <li><b>Stars:</b> ${esc(stars)}.</li>
    <li><b>Free playground runs:</b> ${esc(runs)}.</li>
    ${d.events.length ? `<li><b>Milestones:</b> ${d.events.map((e) => `${esc(e.date)} ${esc(e.label)}`).join('; ')}.</li>` : ''}
  </ul>

  <h2>Quality and trust${isCurrent ? ' (today)' : ' (as of the latest build)'}</h2>
  ${Object.keys(trust).length ? `<ul>
    <li>${fmt(trust.withCases)} of ${fmt(trust.skills)} live skills carry eval cases; ${fmt(trust.scored)} have blind-judged scores averaging ${trust.avg}/5.</li>
    <li>${fmt(trust.examples)} skills have a worked example; ${fmt(trust.translations)} human translations in ${trust.languages} languages.</li>
    <li>${fmt(trust.highStakes)} skills are rated high-stakes; ${fmt(trust.reviewed)} ${trust.reviewed === 1 ? 'has' : 'have'} a current expert review. A prompt-injection suite of ${fmt(trust.injection)} hostile documents and the red-team corpus run on every change.</li>
  </ul>` : '<p class="muted">Trust numbers unavailable in this build.</p>'}
  <p class="muted">Machine rewrites: ${fmt(d.rewrites)} attempted in ${esc(d.y)}, ${fmt(d.kept)} kept after blind judging. Every one is in the <a href="../evolution.html">evolution log</a>.</p>

  <h2>People</h2>
  <p>${fmt(d.authors.length)} people committed this year. The contributor roll (${fmt(contributors.length)} credited, all time): ${contributors.map((c) => `<a href="${esc(c.profile || `https://github.com/${c.login}`)}">${esc(c.name || c.login)}</a>`).join(', ') || 'see the README'}.</p>

  <h2>Outcomes reported by users</h2>
  ${d.yearSavings.length ? `<p>${fmt(d.yearSavings.length)} accepted ROI stories this year (reporter-typed numbers; hours are never converted into money). See the <a href="../wins.html">Wall of Wins</a>.</p>` : '<p class="muted">No accepted ROI stories recorded this year. The <a href="../wins.html">Wall of Wins</a> takes submissions.</p>'}

  <p class="muted noprint">Sources: <a href="${REPO}">the repository</a>, <a href="${REPO}/blob/main/data/evolution-log.json">data/evolution-log.json</a>, <a href="${REPO}/tree/vitals-data">the vitals-data branch</a>, <a href="../status.html">Vitals</a>, <a href="../changes.html">What changed</a>.</p>
</main>
<script src="../nav.js" defer></script>
</body>
</html>
`;
}

mkdirSync(OUT, { recursive: true });
const pick = arg('year');
const chosen = pick ? [pick] : years;
const reports = chosen.map((y) => yearData(y));
for (const d of reports) writeFileSync(join(OUT, `${d.y}.html`), page(d, years));
const latest = years[years.length - 1];
writeFileSync(join(OUT, 'index.html'), `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>PM Skills annual reports</title><meta name="robots" content="noindex"><link rel="canonical" href="${SITE}/report/${latest}.html"><meta http-equiv="refresh" content="0; url=${latest}.html"></head><body><p>The latest report is <a href="${latest}.html">${latest}</a>.</p><script>location.replace('${latest}.html')</script></body></html>\n`);
console.log(`annual report: ${reports.map((d) => `${d.y} (${d.skillsAdded} skills added, ${d.commits} commits, ${d.releases.length} releases)`).join('; ')} -> web/report/${vitals.length ? '' : ' (vitals not fetched)'}`);

if (argv.includes('--pdf')) {
  const dir = process.env.PLAYWRIGHT_MODULE_DIR;
  if (!dir) { console.error('--pdf needs PLAYWRIGHT_MODULE_DIR=<node_modules with playwright>'); process.exit(2); }
  const { chromium } = createRequire(join(dir, 'package.json'))('playwright');
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  for (const d of reports) {
    const p = await browser.newPage();
    await p.goto('file://' + join(OUT, `${d.y}.html`), { waitUntil: 'load' });
    await p.pdf({ path: join(OUT, `${d.y}.pdf`), format: 'A4', printBackground: false });
    console.log(`  web/report/${d.y}.pdf`);
  }
  await browser.close();
}
