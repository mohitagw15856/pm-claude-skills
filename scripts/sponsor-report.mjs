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
//   node scripts/sponsor-report.mjs --update-docs                 also refresh the reach table in SPONSORS.md and every README language
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

// The reach table shown to possible sponsors. One block, written into every file that carries the markers.
export const REACH_START = '<!-- sponsor-reach:start (written by scripts/sponsor-report.mjs --update-docs) -->';
export const REACH_END = '<!-- sponsor-reach:end -->';

export function last14(log) {
  const rows = Object.entries(log.days || {}).sort().slice(-14);
  return { views: rows.reduce((n, [, v]) => n + v.views, 0), days: rows.length, first: rows.length ? rows[0][0] : null, last: rows.length ? rows[rows.length - 1][0] : null };
}

// Labels for the reach table in each README language. English is the fallback.
export const REACH_LABELS = {
  en: { asOf: (d) => `Figures as of ${d}:`, head: ['Measure', 'Figure', 'Source'], stars: 'GitHub stars', forks: 'Forks', views: 'Repository page views, last 14 days', uniques: 'Unique repository visitors, last 14 days', front: 'Views of the repository front page, where the README banner sits, last 14 days', unique: 'unique', week: 'npm downloads, last 7 days', month: 'npm downloads, last 30 days', traffic: 'GitHub traffic', top: (r, n) => `Top source of visitors in those 14 days: ${r}, ${n} views.`, locale: 'en-GB' },
  'zh-CN': { asOf: (d) => `数据截至 ${d}：`, head: ['指标', '数值', '来源'], stars: 'GitHub 星标', forks: 'Fork 数', views: '仓库页面浏览量（近 14 天）', uniques: '仓库独立访客（近 14 天）', front: '仓库首页浏览量，即 README 横幅所在页面（近 14 天）', unique: '独立访客', week: 'npm 下载量（近 7 天）', month: 'npm 下载量（近 30 天）', traffic: 'GitHub 流量统计', top: (r, n) => `这 14 天里最大的访客来源：${r}，${n} 次浏览。`, locale: 'zh-CN' },
  'zh-TW': { asOf: (d) => `資料截至 ${d}：`, head: ['指標', '數值', '來源'], stars: 'GitHub 星標', forks: 'Fork 數', views: '儲存庫頁面瀏覽量（近 14 天）', uniques: '儲存庫不重複訪客（近 14 天）', front: '儲存庫首頁瀏覽量，也就是 README 橫幅所在頁面（近 14 天）', unique: '不重複訪客', week: 'npm 下載量（近 7 天）', month: 'npm 下載量（近 30 天）', traffic: 'GitHub 流量統計', top: (r, n) => `這 14 天裡最大的訪客來源：${r}，${n} 次瀏覽。`, locale: 'zh-TW' },
  ko: { asOf: (d) => `${d} 기준 수치:`, head: ['지표', '수치', '출처'], stars: 'GitHub 스타', forks: '포크', views: '저장소 페이지 조회수 (최근 14일)', uniques: '저장소 순 방문자 (최근 14일)', front: 'README 배너가 놓인 저장소 첫 페이지 조회수 (최근 14일)', unique: '순 방문자', week: 'npm 다운로드 (최근 7일)', month: 'npm 다운로드 (최근 30일)', traffic: 'GitHub 트래픽', top: (r, n) => `이 14일 동안 가장 큰 유입 경로: ${r}, 조회 ${n}회.`, locale: 'ko-KR' },
  ja: { asOf: (d) => `${d} 時点の数値:`, head: ['指標', '数値', '出典'], stars: 'GitHub スター', forks: 'フォーク', views: 'リポジトリのページビュー（直近 14 日）', uniques: 'リポジトリのユニーク訪問者（直近 14 日）', front: 'README バナーが表示されるリポジトリのトップページのビュー（直近 14 日）', unique: 'ユニーク', week: 'npm ダウンロード（直近 7 日）', month: 'npm ダウンロード（直近 30 日）', traffic: 'GitHub トラフィック', top: (r, n) => `この 14 日間で最も多い流入元: ${r}、${n} ビュー。`, locale: 'ja-JP' },
  es: { asOf: (d) => `Cifras a ${d}:`, head: ['Medida', 'Cifra', 'Fuente'], stars: 'Estrellas en GitHub', forks: 'Forks', views: 'Vistas de páginas del repositorio, últimos 14 días', uniques: 'Visitantes únicos del repositorio, últimos 14 días', front: 'Vistas de la portada del repositorio, donde está el banner del README, últimos 14 días', unique: 'únicos', week: 'Descargas en npm, últimos 7 días', month: 'Descargas en npm, últimos 30 días', traffic: 'Tráfico de GitHub', top: (r, n) => `Principal origen de las visitas en esos 14 días: ${r}, ${n} vistas.`, locale: 'es-ES' },
  'pt-BR': { asOf: (d) => `Números em ${d}:`, head: ['Medida', 'Número', 'Fonte'], stars: 'Estrelas no GitHub', forks: 'Forks', views: 'Visualizações de páginas do repositório, últimos 14 dias', uniques: 'Visitantes únicos do repositório, últimos 14 dias', front: 'Visualizações da página inicial do repositório, onde fica o banner do README, últimos 14 dias', unique: 'únicos', week: 'Downloads no npm, últimos 7 dias', month: 'Downloads no npm, últimos 30 dias', traffic: 'Tráfego do GitHub', top: (r, n) => `Principal origem das visitas nesses 14 dias: ${r}, ${n} visualizações.`, locale: 'pt-BR' },
};
// Which language each document with a reach table is written in.
export const REACH_FILES = { 'README.md': 'en', 'SPONSORS.md': 'en', 'README.zh-CN.md': 'zh-CN', 'README.zh-TW.md': 'zh-TW', 'README.ko.md': 'ko', 'README.ja.md': 'ja', 'README.es.md': 'es', 'README.pt-BR.md': 'pt-BR' };

export function renderReach({ when, date, lang = 'en', stars, forks, views14, uniques14, front, npmWeek, npmMonth, topReferrer }) {
  const L = REACH_LABELS[lang] || REACH_LABELS.en;
  const num = (n) => Number(n).toLocaleString('en-GB');   // one number format everywhere, so figures match across languages
  if (when) date = when.toLocaleDateString(L.locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const row = (label, value, source) => (value == null ? null : `| ${label} | ${value} | ${source} |`);
  const lines = [
    REACH_START,
    L.asOf(date),
    '',
    `| ${L.head.join(' | ')} |`,
    '|---|---:|---|',
    row(L.stars, stars == null ? null : num(stars), 'GitHub'),
    row(L.forks, forks == null ? null : num(forks), 'GitHub'),
    row(L.views, views14 == null ? null : num(views14), L.traffic),
    row(L.uniques, uniques14 == null ? null : num(uniques14), L.traffic),
    row(L.front, front ? `${num(front.count)} (${num(front.uniques)} ${L.unique})` : null, L.traffic),
    row(L.week, npmWeek == null ? null : num(npmWeek), 'npm'),
    row(L.month, npmMonth == null ? null : num(npmMonth), 'npm'),
  ].filter((l) => l !== null);
  if (topReferrer) lines.push('', L.top(topReferrer.referrer, num(topReferrer.count)));
  lines.push(REACH_END);
  return lines.join('\n');
}

// Replace the marked block in a document. Returns null when the markers are missing or out of order.
export function replaceReach(text, block) {
  const a = text.indexOf(REACH_START); const b = text.indexOf(REACH_END);
  if (a < 0 || b < a) return null;
  return text.slice(0, a) + block + text.slice(b + REACH_END.length);
}

async function npmPoint(range) {
  try {
    const res = await fetch(`https://api.npmjs.org/downloads/point/${range}/${PACKAGE}`);
    if (!res.ok) return null;
    const body = await res.json();
    return Number.isFinite(body.downloads) ? body.downloads : null;
  } catch { return null; }
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
  const block = renderReach({ date: '1 December 2026', stars: 1608, forks: 0, views14: 14366, uniques14: null, front: { count: 1720, uniques: 1380 }, npmWeek: null, npmMonth: 11086, topReferrer: { referrer: 'Google', count: 4772 } });
  eq('reach block shows zero, skips unknown figures', [/\| Forks \| 0 \|/.test(block), /Unique repository visitors/.test(block), /last 7 days/.test(block), /1,720 \(1,380 unique\)/.test(block)], [true, false, false, true]);
  const doc = `intro\n${REACH_START}\nold\n${REACH_END}\noutro`;
  eq('the block is replaced in place and nothing else moves', replaceReach(doc, block), `intro\n${block}\noutro`);
  eq('replacing twice changes nothing', replaceReach(replaceReach(doc, block), block), `intro\n${block}\noutro`);
  eq('a document without markers is left alone', replaceReach('no markers here', block), null);
  eq('last14 takes the latest fourteen recorded days', last14({ days: Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`2026-11-${String(i + 1).padStart(2, '0')}`, { views: 1, uniques: 1 }])) }), { views: 14, days: 14, first: '2026-11-07', last: '2026-11-20' });
  const zh = renderReach({ when: new Date(Date.UTC(2026, 10, 26)), lang: 'zh-CN', stars: 1608, front: { count: 1720, uniques: 1380 }, topReferrer: { referrer: 'Google', count: 4772 } });
  eq('a translated table uses its own labels and date, the same digits', [zh.includes('数据截至 2026年11月26日：'), zh.includes('| GitHub 星标 | 1,608 | GitHub |'), zh.includes('1,720 (1,380 独立访客)'), zh.includes('Google，4,772 次浏览')], [true, true, true, true]);
  eq('every language has every label', Object.values(REACH_LABELS).map((l) => Object.keys(l).length), Object.values(REACH_LABELS).map(() => Object.keys(REACH_LABELS.en).length));
  eq('an unknown language falls back to English', renderReach({ date: 'x', lang: 'xx', stars: 1 }).includes('| GitHub stars | 1 | GitHub |'), true);
  console.log(fails ? `sponsor-report selftest: ${fails} failure(s)` : 'sponsor-report selftest: 15 passed ✓');
  return fails ? 1 : 0;
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) return selftest();
  const opt = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
  const month = opt('--month') || new Date().toISOString().slice(0, 7);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) { console.error('--month must look like 2026-11'); return 2; }
  let log = existsSync(LOG) ? JSON.parse(readFileSync(LOG, 'utf8')) : { _comment: 'Daily repository views recorded by scripts/sponsor-report.mjs. GitHub keeps 14 days; this file keeps the rest.', days: {} };
  let paths = []; let referrers = []; let summary = null;
  if (!argv.includes('--no-fetch')) {
    try {
      const traffic = gh(`repos/${REPO}/traffic/views`);
      summary = { views14: traffic.count, uniques14: traffic.uniques };
      log = mergeDays(log, traffic.views || []);
      paths = gh(`repos/${REPO}/traffic/popular/paths`).slice(0, 5);
      referrers = gh(`repos/${REPO}/traffic/popular/referrers`).slice(0, 8);
      writeFileSync(LOG, JSON.stringify(log, null, 2) + '\n');
    } catch (e) {
      console.error(`Could not read GitHub traffic (${String(e.stderr || e.message).trim().split('\n')[0]}). Is gh signed in with push access? Reporting from the log only.`);
    }
  }
  if (argv.includes('--update-docs')) {
    if (!summary) { console.error('--update-docs needs live GitHub traffic; nothing was changed.'); return 1; }
    let repo = {};
    try { repo = gh(`repos/${REPO}`); } catch { /* stars and forks are left out */ }
    const figures = {
      when: new Date(),
      stars: repo.stargazers_count ?? null, forks: repo.forks_count ?? null,
      views14: summary.views14, uniques14: summary.uniques14,
      front: paths.find((p) => p.path === `/${REPO}`) || null,
      npmWeek: await npmPoint('last-week'), npmMonth: await npmPoint('last-month'),
      topReferrer: referrers[0] || null,
    };
    for (const [file, lang] of Object.entries(REACH_FILES)) {
      const full = join(ROOT, file);
      if (!existsSync(full)) continue;
      const next = replaceReach(readFileSync(full, 'utf8'), renderReach({ ...figures, lang }));
      if (next === null) console.error(`${file}: reach markers not found, left unchanged.`);
      else { writeFileSync(full, next); console.log(`${file}: reach table refreshed.`); }
    }
    return 0;
  }
  const report = render({ month, sponsor: opt('--sponsor'), totals: monthTotals(log, month), paths, referrers, npm: await npmDownloads(month), generated: new Date().toISOString().slice(0, 10) });
  const out = opt('--out');
  if (out) { writeFileSync(out, report); console.log(`Wrote ${out}`); } else console.log(report);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(await main());
