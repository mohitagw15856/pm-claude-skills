#!/usr/bin/env node
// Fetch the most-run skills from GoatCounter → web/trending.json, which the playground
// renders as the "🔥 Trending this week" strip. Reads the GoatCounter API token from the
// environment (GOATCOUNTER_TOKEN) so it never touches the client. No token → no-op (leaves
// trending.json as-is), so this is safe to run anywhere.
//
//   GOATCOUNTER_TOKEN=… GOATCOUNTER_SITE=mohitagw node scripts/build-trending.mjs
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'web', 'trending.json');
const SITE = process.env.GOATCOUNTER_SITE || 'mohitagw';
const TOKEN = process.env.GOATCOUNTER_TOKEN || '';

if (!TOKEN) {
  console.log('No GOATCOUNTER_TOKEN set — leaving web/trending.json unchanged.');
  process.exit(0);
}

// GoatCounter wants hour-rounded RFC3339 timestamps for start/end.
const hour = (d) => d.toISOString().slice(0, 13) + ':00:00Z';
const start = hour(new Date(Date.now() - 7 * 864e5));
const end = hour(new Date());
const url = `https://${SITE}.goatcounter.com/api/v0/stats/hits?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&limit=200`;

// Best-effort refresh: a GoatCounter outage, rate-limit, or endpoint change must
// NOT break CI. On any non-OK or non-JSON response we warn and leave the output
// unchanged, exactly like the no-token path above.
let res;
try {
  res = await fetch(url, { headers: { authorization: 'Bearer ' + TOKEN } });
} catch (e) {
  console.warn(`GoatCounter fetch failed (${e.message}) — leaving the trending data unchanged.`);
  process.exit(0);
}
if (!res.ok) {
  console.warn(`GoatCounter API ${res.status} for ${url} — leaving the trending data unchanged.\n${(await res.text()).slice(0, 200)}`);
  process.exit(0);
}
let data;
try {
  data = await res.json();
} catch (e) {
  console.warn(`GoatCounter returned non-JSON (${e.message}) — leaving the trending data unchanged.`);
  process.exit(0);
}
const allHits = data.hits || [];
console.error(`GoatCounter: ${allHits.length} paths, ${allHits.filter((h) => h.event).length} events, ${allHits.filter((h) => /^\/?run\//.test(h.path || '')).length} run/ events in the window.`);
// Our run events are recorded as path "run/<skill>" (event:true). A leading slash may be added.
const num = (c) => Array.isArray(c) ? (c[0] || 0) : (typeof c === 'number' ? c : 0);
const skills = (data.hits || [])
  .filter((h) => h.event || /^\/?run\//.test(h.path || ''))
  .filter((h) => /^\/?run\//.test(h.path || ''))
  .map((h) => ({ name: (h.path || '').replace(/^\/?run\//, ''), count: num(h.count) || (h.stats || []).reduce((a, s) => a + (s.daily || s.count || 0), 0) || 0 }))
  .filter((s) => s.name)
  .sort((a, b) => b.count - a.count)
  .slice(0, 8);

writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), window: '7d', skills }, null, 2) + '\n');
console.log(`Wrote web/trending.json — ${skills.length} trending skills${skills[0] ? ` (top: ${skills[0].name})` : ''}.`);
