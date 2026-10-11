#!/usr/bin/env node
// Aggregate the playground's opt-in 👍/👎 ratings from GoatCounter → web/feedback.json, which
// the playground renders as a "👍 92% · 24 ratings" proof badge on skills that have enough
// signal. Mirrors build-trending.mjs: the API token stays in the environment (GOATCOUNTER_TOKEN),
// never in the client, and no token → no-op (leaves feedback.json unchanged). It surfaces ONLY
// real counts — nothing is shown until people actually rate.
//
//   GOATCOUNTER_TOKEN=… GOATCOUNTER_SITE=mohitagw node scripts/build-feedback.mjs
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'web', 'feedback.json');
const SITE = process.env.GOATCOUNTER_SITE || 'mohitagw';
const TOKEN = process.env.GOATCOUNTER_TOKEN || '';

if (!TOKEN) {
  console.log('No GOATCOUNTER_TOKEN set — leaving web/feedback.json unchanged.');
  process.exit(0);
}

// Incremental: GoatCounter's API now 404s on windows reaching past its free-plan
// retention (a 90-day window failed every week from July to October 2026 while
// the 7-day trending window worked). So each run fetches only what is new since
// the last run's window end (at most 7 days back) and adds it to the stored
// totals. Hour-rounded RFC3339, as the API wants.
const hour = (d) => d.toISOString().slice(0, 13) + ':00:00Z';
const prev = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {};
const weekAgo = new Date(Date.now() - 7 * 864e5);
const since = prev.windowEnd && new Date(prev.windowEnd) > weekAgo ? new Date(prev.windowEnd) : weekAgo;
if (prev.windowEnd && new Date(prev.windowEnd) < weekAgo) console.warn(`Gap: ratings between ${prev.windowEnd} and ${hour(weekAgo)} are no longer available from GoatCounter.`);
const start = hour(since);
const end = hour(new Date());
const url = `https://${SITE}.goatcounter.com/api/v0/stats/hits?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&limit=200`;

// Best-effort refresh: GoatCounter being down, rate-limiting, or changing the
// endpoint must NOT break CI — this is a proof-badge refresh, not a build gate.
// On any non-OK or non-JSON response we warn and leave web/feedback.json as-is,
// exactly like the no-token path above.
let res;
try {
  res = await fetch(url, { headers: { authorization: 'Bearer ' + TOKEN } });
} catch (e) {
  console.warn(`GoatCounter fetch failed (${e.message}) — leaving web/feedback.json unchanged.`);
  process.exit(0);
}
if (!res.ok) {
  console.warn(`GoatCounter API ${res.status} for ${url} — leaving web/feedback.json unchanged.\n${(await res.text()).slice(0, 200)}`);
  process.exit(0);
}
let data;
try {
  data = await res.json();
} catch (e) {
  console.warn(`GoatCounter returned non-JSON (${e.message}) — leaving web/feedback.json unchanged.`);
  process.exit(0);
}
const allHits = data.hits || [];
const num = (c) => Array.isArray(c) ? (c[0] || 0) : (typeof c === 'number' ? c : 0);
const count = (h) => num(h.count) || (h.stats || []).reduce((a, s) => a + (s.daily || s.count || 0), 0) || 0;

// Events are recorded as path "feedback/<skill>/<up|down>" (a leading slash may be added).
const skills = {};
allHits
  .filter((h) => /^\/?feedback\//.test(h.path || ''))
  .forEach((h) => {
    const m = (h.path || '').replace(/^\//, '').match(/^feedback\/(.+)\/(up|down)$/);
    if (!m) return;
    const [, name, kind] = m;
    (skills[name] = skills[name] || { up: 0, down: 0 })[kind] += count(h);
  });

// Add the stored totals: this window is only the new part.
for (const [name, v] of Object.entries(prev.skills || {})) {
  const t = (skills[name] = skills[name] || { up: 0, down: 0 });
  t.up += v.up || 0; t.down += v.down || 0;
}
let kept = 0;
for (const [name, v] of Object.entries(skills)) {
  v.total = v.up + v.down;
  v.pct = v.total ? Math.round((v.up / v.total) * 100) : 0;
  kept++;
}
const feedbackEvents = allHits.filter((h) => /^\/?feedback\//.test(h.path || '')).length;
console.error(`GoatCounter: ${allHits.length} paths, ${feedbackEvents} feedback events → ${kept} skills with ratings.`);

writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), windowEnd: end, skills }, null, 2) + '\n');
const top = Object.entries(skills).sort((a, b) => b[1].total - a[1].total)[0];
console.log(`Wrote web/feedback.json — ${kept} rated skill(s)${top ? ` (most-rated: ${top[0]}, ${top[1].pct}% of ${top[1].total})` : ''}.`);
