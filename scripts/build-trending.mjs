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

const day = (d) => d.toISOString().slice(0, 10);
const start = day(new Date(Date.now() - 7 * 864e5));
const end = day(new Date());
const url = `https://${SITE}.goatcounter.com/api/v0/stats/hits?start=${start}&end=${end}&limit=200`;

const res = await fetch(url, { headers: { authorization: 'Bearer ' + TOKEN } });
if (!res.ok) {
  console.error(`GoatCounter API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  process.exit(1);
}
const data = await res.json();
// Our run events are recorded as path "run/<skill>" (a leading slash may be added).
const skills = (data.hits || [])
  .filter((h) => /^\/?run\//.test(h.path || ''))
  .map((h) => ({ name: (h.path || '').replace(/^\/?run\//, ''), count: h.count || (h.stats || []).reduce((a, s) => a + (s.daily || 0), 0) || 0 }))
  .filter((s) => s.name)
  .sort((a, b) => b.count - a.count)
  .slice(0, 8);

writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), window: '7d', skills }, null, 2) + '\n');
console.log(`Wrote web/trending.json — ${skills.length} trending skills${skills[0] ? ` (top: ${skills[0].name})` : ''}.`);
