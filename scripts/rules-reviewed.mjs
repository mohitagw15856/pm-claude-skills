#!/usr/bin/env node
// "Last checked" stamps for the skills whose answers depend on rules that change:
// every high-stakes skill, plus the consequential regional ones (China, Hong Kong,
// Taiwan, Korea, Japan, Singapore, Malaysia). data/rules-reviewed.json records when
// a person last checked each one against the current rules; skill pages show the
// date, amber after 12 months and red after 24.
//
//   node scripts/rules-reviewed.mjs --seed                 # add missing skills, dated from the
//                                                          # last commit that changed their text
//   node scripts/rules-reviewed.mjs --review cn-severance-calculator --by mohitagw15856 [--note "…"]
//   node scripts/rules-reviewed.mjs --check                # fail if a rule-based skill has no stamp
//   node scripts/rules-reviewed.mjs --report               # list amber and red stamps
//
// Seeded dates say when the skill was last written or edited, which is when its
// rules were last looked at; a --review stamp replaces that with a real check.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'data', 'rules-reviewed.json');
const REGIONAL = /^(cn|hk|tw|kr|jp|sg|my|singapore|malaysia|huawen)-/;
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : d; };
const has = (n) => process.argv.includes(`--${n}`);
const today = () => new Date().toISOString().slice(0, 10);

export function ruleBased() {
  const { tiers } = JSON.parse(readFileSync(join(root, 'data', 'risk-tiers.json'), 'utf8'));
  return Object.entries(tiers)
    .filter(([name, v]) => v.tier === 'high-stakes' || (v.tier === 'consequential' && REGIONAL.test(name)))
    .map(([name]) => name)
    .filter((name) => existsSync(join(root, 'skills', name, 'SKILL.md')))
    .sort();
}

export function age(date, now = new Date()) {
  const days = Math.floor((now - new Date(`${date}T00:00:00Z`)) / 86400000);
  return { days, state: days > 730 ? 'red' : days > 365 ? 'amber' : 'fresh' };
}

function load() {
  return existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : { skills: {} };
}

function save(data) {
  const sorted = Object.fromEntries(Object.entries(data.skills).sort(([a], [b]) => a.localeCompare(b)));
  const out = {
    $comment: 'When each rule-based skill was last checked against current rules. Seeded entries (by: "seed") are dated from the last commit that changed the skill; replace them with node scripts/rules-reviewed.mjs --review <skill> --by <handle> after a real check.',
    skills: sorted,
  };
  writeFileSync(FILE, JSON.stringify(out, null, 2) + '\n');
}

function lastChange(name) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', `skills/${name}/SKILL.md`], { cwd: root, encoding: 'utf8' }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : today();
  } catch { return today(); }
}

const data = load();
if (has('seed')) {
  let added = 0;
  for (const name of ruleBased()) if (!data.skills[name]) { data.skills[name] = { reviewed: lastChange(name), by: 'seed' }; added++; }
  save(data);
  console.log(`Seeded ${added} stamp(s); ${Object.keys(data.skills).length} in total.`);
} else if (arg('review')) {
  const name = arg('review');
  const by = arg('by');
  if (!NAME.test(name) || !existsSync(join(root, 'skills', name, 'SKILL.md'))) { console.error(`No skill named ${name}.`); process.exit(2); }
  if (!by || !/^[A-Za-z0-9-]{1,39}$/.test(by)) { console.error('--by needs the reviewer\'s GitHub handle.'); process.exit(2); }
  data.skills[name] = { reviewed: today(), by, ...(arg('note') ? { note: String(arg('note')).slice(0, 200) } : {}) };
  save(data);
  console.log(`Stamped ${name}: checked ${today()} by ${by}.`);
} else {
  const missing = ruleBased().filter((n) => !data.skills[n]);
  const stale = Object.entries(data.skills).map(([n, v]) => ({ n, ...v, ...age(v.reviewed) })).filter((x) => x.state !== 'fresh');
  if (has('report') || stale.length) {
    for (const s of stale) console.log(`${s.state === 'red' ? '🔴' : '🟠'} ${s.n}: last checked ${s.reviewed} (${s.days} days ago)`);
  }
  if (missing.length) {
    console.error(`Rules-reviewed: ${missing.length} rule-based skill(s) have no stamp. Run node scripts/rules-reviewed.mjs --seed.`);
    for (const n of missing.slice(0, 20)) console.error(`  ✗ ${n}`);
    process.exit(1);
  }
  console.log(`Rules-reviewed: ${Object.keys(data.skills).length} rule-based skills stamped, ${stale.length} past 12 months. ✓`);
}
