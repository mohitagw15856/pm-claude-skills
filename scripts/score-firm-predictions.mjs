#!/usr/bin/env node
// Score the live Firm's due predictions (data/firm-ledger.json) against the real
// numbers, once each, and never again: a scored entry is final. No API key needed.
//
//   node scripts/score-firm-predictions.mjs           # score what is due today
//   node scripts/score-firm-predictions.mjs --check   # validate the ledger only
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { METRICS, fetchMetrics } from './firm-metrics.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'data', 'firm-ledger.json');
if (!existsSync(FILE)) { console.log('No firm ledger yet.'); process.exit(0); }
const ledger = JSON.parse(readFileSync(FILE, 'utf8'));
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const problems = ledger.sessions.flatMap((s, i) => [
  !DATE.test(s.date || '') && `session ${i}: bad date`,
  s.prediction && (!METRICS[s.prediction.metric] || !['>=', '<='].includes(s.prediction.op) || !DATE.test(s.prediction.by || '')) && `session ${i}: malformed prediction`,
  s.result && typeof s.result.hit !== 'boolean' && `session ${i}: malformed result`,
].filter(Boolean));
if (process.argv.includes('--check')) {
  if (problems.length) { console.error(`Firm ledger: ${problems.join('; ')}`); process.exit(1); }
  console.log(`Firm ledger valid: ${ledger.sessions.length} sessions. ✓`);
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const due = ledger.sessions.filter((s) => s.prediction && !s.result && s.prediction.by <= today);
if (!due.length) { console.log('No predictions due.'); process.exit(0); }
const now = await fetchMetrics();
let scored = 0;
for (const s of due) {
  const actual = now[s.prediction.metric];
  if (actual == null) { console.warn(`${s.date}: ${s.prediction.metric} unavailable; will retry.`); continue; }
  const hit = s.prediction.op === '>=' ? actual >= s.prediction.value : actual <= s.prediction.value;
  s.result = { scored: today, actual, hit };
  scored++;
  console.log(`${s.date}: ${s.prediction.metric} ${s.prediction.op} ${s.prediction.value} by ${s.prediction.by} → actual ${actual}: ${hit ? 'HIT' : 'MISS'}`);
}
writeFileSync(FILE, JSON.stringify(ledger, null, 2) + '\n');
console.log(`Scored ${scored} prediction(s).`);
