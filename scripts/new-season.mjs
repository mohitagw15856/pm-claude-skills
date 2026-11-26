#!/usr/bin/env node
// Scaffold the next season: season-N.json skeleton (dates computed, scenario
// marked TODO — authorship stays human), an empty leaderboard, and the exact
// go-live steps. Run when the rollover issue opens, or any time ahead of it.
//   node scripts/new-season.mjs            # scaffold next season, 30-day run
//   node scripts/new-season.mjs --days 45
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const days = (() => { const i = process.argv.indexOf('--days'); return i >= 0 ? +process.argv[i + 1] || 30 : 30; })();

const nums = readdirSync(join(root, 'seasons')).map((f) => (f.match(/^season-(\d+)\.json$/) || [])[1]).filter(Boolean).map(Number);
const last = Math.max(...nums);
const next = last + 1;
const target = join(root, 'seasons', `season-${next}.json`);
if (existsSync(target)) { console.error(`seasons/season-${next}.json already exists`); process.exit(1); }

const prev = JSON.parse(readFileSync(join(root, 'seasons', `season-${last}.json`), 'utf8'));
const opens = new Date(new Date(prev.closes).getTime() + 86400e3).toISOString().slice(0, 10);
const closes = new Date(new Date(opens).getTime() + days * 86400e3).toISOString().slice(0, 10);

writeFileSync(target, JSON.stringify({
  season: next,
  title: 'TODO — name the season',
  opens, closes,
  arena: prev.arena,
  world: {
    counterparty: { name: 'TODO', role: 'TODO', style: 'TODO — a style a player can read and plan against' },
    public_brief: 'TODO — the situation, the stakes, the constraint, the clock. Hand-written; the craft stays human.',
    hidden_state_note: prev.world.hidden_state_note || 'Hidden state lives here for the arena; reading it defeats the season.',
  },
  rules: { ...prev.rules, submit: prev.rules.submit.replace(`leaderboard-${last}`, `leaderboard-${next}`) },
}, null, 2) + '\n');
writeFileSync(join(root, 'seasons', `leaderboard-${next}.json`), JSON.stringify({ season: next, entries: [] }, null, 2) + '\n');

console.log(`Scaffolded seasons/season-${next}.json (${opens} → ${closes}) + empty leaderboard.`);
console.log(`Tease it now:  cp seasons/season-${next}.json web/season-next.json`);
console.log(`Go-live (after ${prev.closes}): fill the TODOs, then cp seasons/season-${next}.json web/season-current.json`);
