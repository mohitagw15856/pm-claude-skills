// The public savings counter, summarised from data/savings.json (accepted ROI
// stories, recorded by scripts/record-savings.mjs). Shared by build-wins.mjs and
// build-trust-numbers.mjs so the page and the README cannot disagree.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data', 'savings.json');

export function savingsSummary() {
  const entries = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')).entries || [] : [];
  const money = {};
  for (const e of entries) if (e.money && e.currency) money[e.currency] = (money[e.currency] || 0) + e.money;
  return {
    stories: entries.length,
    hours: Math.round(entries.reduce((a, e) => a + (e.hours || 0), 0)),
    money, // per currency, never converted
    skills: new Set(entries.flatMap((e) => e.skills || [])).size,
  };
}

export const formatMoney = (money) => Object.entries(money).sort((a, b) => b[1] - a[1]).map(([c, v]) => `${Math.round(v).toLocaleString('en-GB')} ${c}`).join(' + ');
