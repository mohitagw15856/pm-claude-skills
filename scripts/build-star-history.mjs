#!/usr/bin/env node
// Self-hosted star-history chart. The README used to embed star-history.com's
// SVG, but that service makes *anonymous* GitHub API calls and gets rate-limited
// (the image then shows a "please add a token" message). This generates the chart
// ourselves — in CI, with the repo's GITHUB_TOKEN (5,000 req/hr) — and writes a
// self-contained SVG committed to web/docs-assets/star-history.svg. No third party.
//
//   GITHUB_TOKEN=… node scripts/build-star-history.mjs
import { writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'web', 'docs-assets', 'star-history.svg');
const REPO = process.env.STAR_REPO || 'mohitagw15856/pm-claude-skills';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const BRAND = '#d97757';

async function fetchStargazers() {
  const stars = [];
  for (let page = 1; page <= 500; page++) { // cap ~50k stars
    const res = await fetch(`https://api.github.com/repos/${REPO}/stargazers?per_page=100&page=${page}`, {
      headers: {
        Accept: 'application/vnd.github.star+json',
        'User-Agent': 'pm-claude-skills-star-history',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${(await res.text()).slice(0, 160)}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const s of batch) if (s.starred_at) stars.push(new Date(s.starred_at).getTime());
    if (batch.length < 100) break;
  }
  return stars.sort((a, b) => a - b);
}

const fmt = (t) => new Date(t).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

export function renderSVG(times) {
  const W = 760, H = 420, L = 62, R = 24, T = 52, B = 44;
  const pw = W - L - R, ph = H - T - B;
  const total = times.length;
  const t0 = times[0], t1 = times[total - 1] || t0 + 1;
  const span = Math.max(1, t1 - t0);
  // cumulative points, downsampled to ~120 for a smooth path
  const step = Math.max(1, Math.ceil(total / 120));
  const pts = [];
  for (let i = 0; i < total; i += step) pts.push([times[i], i + 1]);
  pts.push([t1, total]);
  const x = (t) => L + ((t - t0) / span) * pw;
  const y = (c) => T + (1 - c / Math.max(1, total)) * ph;
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join('');
  const area = `${line}L${x(t1).toFixed(1)},${(T + ph).toFixed(1)}L${L},${(T + ph).toFixed(1)}Z`;
  // y gridlines / labels (0, ¼, ½, ¾, max)
  let grid = '', ylabels = '';
  for (let i = 0; i <= 4; i++) {
    const val = Math.round((total * i) / 4);
    const gy = (T + ph - (i / 4) * ph).toFixed(1);
    grid += `<line x1="${L}" y1="${gy}" x2="${W - R}" y2="${gy}" stroke="#e6e8ec" stroke-width="1"/>`;
    ylabels += `<text x="${L - 8}" y="${(+gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#8a909a">${val.toLocaleString()}</text>`;
  }
  const xlabels = `<text x="${L}" y="${H - 16}" font-size="11" fill="#8a909a">${esc(fmt(t0))}</text>` +
    `<text x="${W - R}" y="${H - 16}" text-anchor="end" font-size="11" fill="#8a909a">${esc(fmt(t1))}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <rect width="${W}" height="${H}" rx="14" fill="#ffffff"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="none" stroke="#e6e8ec"/>
  <text x="${L}" y="30" font-size="17" font-weight="700" fill="#1a1d23">⭐ Star History</text>
  <text x="${W - R}" y="30" text-anchor="end" font-size="17" font-weight="800" fill="${BRAND}">${total.toLocaleString()} stars</text>
  ${grid}
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BRAND}" stop-opacity="0.28"/><stop offset="1" stop-color="${BRAND}" stop-opacity="0.02"/></linearGradient></defs>
  <path d="${area}" fill="url(#g)"/>
  <path d="${line}" fill="none" stroke="${BRAND}" stroke-width="2.5" stroke-linejoin="round"/>
  ${ylabels}${xlabels}
  <text x="${(W / 2).toFixed(0)}" y="${H - 16}" text-anchor="middle" font-size="10.5" fill="#b0b5bd">github.com/${esc(REPO)} · auto-generated weekly</text>
</svg>
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const times = await fetchStargazers();
    if (!times.length) { console.error('No stargazer timestamps returned — leaving existing chart in place.'); process.exit(0); }
    writeFileSync(OUT, renderSVG(times));
    console.log(`Wrote web/docs-assets/star-history.svg — ${times.length} stars, ${fmt(times[0])} → ${fmt(times[times.length - 1])}.`);
  } catch (e) {
    // Never fail the whole job on an API blip; keep the last good committed chart.
    console.error(`Could not refresh star history (${e.message}) — keeping the existing chart.`);
    if (!existsSync(OUT)) process.exitCode = 0;
  }
}
