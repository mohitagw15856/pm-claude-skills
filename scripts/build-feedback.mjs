#!/usr/bin/env node
// Aggregate the playground's opt-in 👍/👎 ratings from GoatCounter → web/feedback.json, which
// the playground renders as a "👍 92% · 24 ratings" proof badge on skills that have enough
// signal. Mirrors build-trending.mjs: the API token stays in the environment (GOATCOUNTER_TOKEN),
// never in the client, and no token → no-op (leaves feedback.json unchanged). It surfaces ONLY
// real counts — nothing is shown until people actually rate.
//
//   GOATCOUNTER_TOKEN=… GOATCOUNTER_SITE=mohitagw node scripts/build-feedback.mjs
import { writeFileSync } from 'node:fs';
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

// Wide-but-safe window: ratings accrue slowly, so we look back 90 days (a 1-year window 404s
// because it predates GoatCounter free-plan data retention). Hour-rounded RFC3339, as the API wants.
const hour = (d) => d.toISOString().slice(0, 13) + ':00:00Z';
const start = hour(new Date(Date.now() - 90 * 864e5));
const end = hour(new Date());
const url = `https://${SITE}.goatcounter.com/api/v0/stats/hits?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&limit=200`;

const res = await fetch(url, { headers: { authorization: 'Bearer ' + TOKEN } });
if (!res.ok) {
  console.error(`GoatCounter API ${res.status} for ${url}\n${(await res.text()).slice(0, 300)}`);
  process.exit(1);
}
const data = await res.json();
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

let kept = 0;
for (const [name, v] of Object.entries(skills)) {
  v.total = v.up + v.down;
  v.pct = v.total ? Math.round((v.up / v.total) * 100) : 0;
  kept++;
}
const feedbackEvents = allHits.filter((h) => /^\/?feedback\//.test(h.path || '')).length;
console.error(`GoatCounter: ${allHits.length} paths, ${feedbackEvents} feedback events → ${kept} skills with ratings.`);

writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), skills }, null, 2) + '\n');
const top = Object.entries(skills).sort((a, b) => b[1].total - a[1].total)[0];
console.log(`Wrote web/feedback.json — ${kept} rated skill(s)${top ? ` (most-rated: ${top[0]}, ${top[1].pct}% of ${top[1].total})` : ''}.`);
