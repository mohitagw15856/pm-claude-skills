// The public evolution log: every machine rewrite of a skill, kept or not, in
// data/evolution-log.json (append-only). Written by the three rewrite loops
// (scripts/self-improve.mjs, evolve-skills.mjs, improve-skill.mjs) and rendered
// by scripts/build-evolution-log.mjs into EVOLUTION.md and web/evolution.html.
// Losses are logged too: a rewrite that did not beat the original is evidence.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data', 'evolution-log.json');

export function logEvolution({ skill, loop, model, judge, before, after, kept, note }) {
  const log = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : { entries: [] };
  const num = (x) => (typeof x === 'number' && Number.isFinite(x) ? Math.round(x * 100) / 100 : null);
  log.entries.push({
    date: new Date().toISOString().slice(0, 10), skill, loop,
    ...(model ? { model } : {}), ...(judge ? { judge } : {}),
    before: num(before), after: num(after), kept: Boolean(kept),
    ...(process.env.GITHUB_RUN_ID ? { run: Number(process.env.GITHUB_RUN_ID) } : {}),
    ...(note ? { note: String(note).slice(0, 200) } : {}),
  });
  writeFileSync(FILE, JSON.stringify(log, null, 2) + '\n');
}
