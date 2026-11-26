#!/usr/bin/env node
// Usage signals that are visible from mainland China, in one file.
//
// The project's other counters (GoatCounter on workers.dev, GitHub traffic, the
// country counter) are blind or unreachable in mainland China, so they cannot say
// whether a Chinese audience exists. These three sources can:
//
//   npmmirror   downloads of the npm package through the mainland npm mirror
//   Gitee       stars, forks and watchers on the mirror repository
//   ModelScope  downloads of the dataset and the router model
//
// npmjs.org downloads are fetched too, only to give the mirror number a scale.
// Every source is public and needs no key. Gitee clone counts need a token with
// repository access; set GITEE_TOKEN to include them.
//
//   node scripts/build-china-usage.mjs            fetch and write web/china-usage.json
//   node scripts/build-china-usage.mjs --dry-run  fetch and print, write nothing
//
// A source that fails is recorded under "errors" and its last good values are
// kept, so one flaky mirror never blanks the page. Counts only; nothing about
// who downloaded.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'web', 'china-usage.json');
const dry = process.argv.includes('--dry-run');

const PKG = 'pm-claude-skills';
const GITEE = 'mohitagw/pm-claude-skills';
const MS_HOST = process.env.MODELSCOPE_HOST || 'www.modelscope.ai';
const MS_DATASET = 'mohitagw15856/pm-skills-instruct';
const MS_MODEL = 'mohitagw15856/pm-skills-router';
const DAYS = 90;
const HISTORY_MAX = 400;

const day = (d) => d.toISOString().slice(0, 10);
const today = new Date();
const end = new Date(today.getTime() - 86400000);            // yesterday: today's count is partial
const start = new Date(end.getTime() - (DAYS - 1) * 86400000);

async function getJson(url, headers = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 20000);
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'pm-skills-china-usage', accept: 'application/json', ...headers }, signal: ctl.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } finally { clearTimeout(timer); }
}

const num = (v) => (Number.isFinite(Number(v)) && v !== null && v !== '' ? Number(v) : null);
const sumLast = (daily, n) => daily.slice(-n).reduce((a, d) => a + d.downloads, 0);

function downloads(json) {
  const rows = Array.isArray(json && json.downloads) ? json.downloads : null;
  if (!rows) throw new Error('no downloads array in the response');
  const daily = rows.filter((r) => /^\d{4}-\d{2}-\d{2}$/.test(String(r.day)) && num(r.downloads) !== null)
    .map((r) => ({ day: r.day, downloads: num(r.downloads) }))
    .sort((a, b) => (a.day < b.day ? -1 : 1));
  return { daily, last7: sumLast(daily, 7), last30: sumLast(daily, 30), last90: sumLast(daily, 90) };
}

const SOURCES = {
  npmmirror: async () => downloads(await getJson(`https://registry.npmmirror.com/downloads/range/${day(start)}:${day(end)}/${PKG}`)),
  npm: async () => downloads(await getJson(`https://api.npmjs.org/downloads/range/${day(start)}:${day(end)}/${PKG}`)),
  gitee: async () => {
    const j = await getJson(`https://gitee.com/api/v5/repos/${GITEE}`);
    const out = { stars: num(j.stargazers_count), forks: num(j.forks_count), watchers: num(j.watchers_count), pushed_at: j.pushed_at || null };
    if (out.stars === null) throw new Error('no stargazers_count in the response');
    if (process.env.GITEE_TOKEN) {
      try {
        const r = await fetch(`https://gitee.com/api/v5/repos/${GITEE}/traffic-data`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'user-agent': 'pm-skills-china-usage' },
          body: JSON.stringify({ access_token: process.env.GITEE_TOKEN, start_day: day(new Date(end.getTime() - 29 * 86400000)), end_day: day(end) }),
        });
        if (r.ok) {
          const t = await r.json();
          const total = (t && t.summary && (t.summary.pull ?? t.summary.clone)) ?? null;
          if (num(total) !== null) out.clones30 = num(total);
        }
      } catch { /* optional figure */ }
    }
    return out;
  },
  modelscope: async () => {
    const [d, m] = await Promise.all([
      getJson(`https://${MS_HOST}/api/v1/datasets/${MS_DATASET}`),
      getJson(`https://${MS_HOST}/api/v1/models/${MS_MODEL}`),
    ]);
    const dataset = num(d && d.Data && d.Data.Downloads), model = num(m && m.Data && m.Data.Downloads);
    if (dataset === null && model === null) throw new Error('no Downloads field in either response');
    return { dataset_downloads: dataset, model_downloads: model };
  },
};

const previous = (() => { try { return JSON.parse(readFileSync(OUT, 'utf8')); } catch { return {}; } })();
const sources = {}, errors = [];
for (const [name, load] of Object.entries(SOURCES)) {
  try { sources[name] = await load(); } catch (e) {
    errors.push({ source: name, error: String(e && e.message ? e.message : e).slice(0, 200) });
    if (previous.sources && previous.sources[name]) sources[name] = { ...previous.sources[name], stale: true };
  }
}

// Stars and ModelScope downloads are running totals, so a dated row per run is
// the only way to see them move. One row per day; a rerun replaces today's row.
const row = {
  date: day(today),
  npmmirror_30d: sources.npmmirror ? sources.npmmirror.last30 : null,
  npm_30d: sources.npm ? sources.npm.last30 : null,
  gitee_stars: sources.gitee ? sources.gitee.stars : null,
  ms_dataset: sources.modelscope ? sources.modelscope.dataset_downloads : null,
  ms_model: sources.modelscope ? sources.modelscope.model_downloads : null,
};
const history = (Array.isArray(previous.history) ? previous.history : []).filter((h) => h && h.date !== row.date);
history.push(row);
history.sort((a, b) => (a.date < b.date ? -1 : 1));

const share = sources.npmmirror && sources.npm && sources.npm.last30 > 0
  ? Math.round((sources.npmmirror.last30 / (sources.npmmirror.last30 + sources.npm.last30)) * 1000) / 10 : null;

const out = {
  updated: today.toISOString(),
  window_days: DAYS,
  note: 'Counts only. npmmirror, Gitee and ModelScope are reachable in mainland China; npmjs.org is included for scale. Mirror downloads include bots and CI.',
  mirror_share_30d_percent: share,
  sources,
  history: history.slice(-HISTORY_MAX),
  errors,
};

if (dry) {
  const brief = JSON.parse(JSON.stringify(out));
  for (const k of ['npmmirror', 'npm']) if (brief.sources[k]) brief.sources[k].daily = `<${brief.sources[k].daily.length} days>`;
  console.log(JSON.stringify(brief, null, 2));
} else {
  if (!Object.keys(sources).length) { console.error('Every source failed; keeping the existing file.', errors); process.exit(existsSync(OUT) ? 0 : 1); }
  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
  console.log(`web/china-usage.json: npmmirror ${row.npmmirror_30d ?? '?'} / npm ${row.npm_30d ?? '?'} downloads in 30 days, Gitee ${row.gitee_stars ?? '?'} stars, ModelScope ${row.ms_dataset ?? '?'} + ${row.ms_model ?? '?'} downloads${errors.length ? `, ${errors.length} source(s) failed` : ''}`);
}
