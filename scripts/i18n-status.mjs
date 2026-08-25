#!/usr/bin/env node
// Translation coverage & review status, per language.
//
// There are three separate translation surfaces and this used to report only
// one of them, which made the honest picture impossible to see:
//   i18n/<lang>/skills/       machine-translated full skill bodies
//   i18n/<lang>/descriptions.json   machine-translated descriptions — the
//                             discovery layer, and the cheap high-leverage unit
//   skills-i18n/<lang>/       human/community translations, parity-gated by
//                             tests/i18n-parity.mjs
// All three are counted here, because "4.3% translated" was only ever true of
// the first one.
//
//   node scripts/i18n-status.mjs             # table
//   node scripts/i18n-status.mjs --json      # machine-readable (for web/)
//   node scripts/i18n-status.mjs --lang es   # one language, list unreviewed
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (n) => process.argv.includes(`--${n}`);
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : ''; };

const skillsDir = join(root, 'skills');
const i18nDir = join(root, 'i18n');
const total = readdirSync(skillsDir).filter((n) => existsSync(join(skillsDir, n, 'SKILL.md'))).length;

const langs = existsSync(i18nDir)
  ? readdirSync(i18nDir).filter((l) => statSync(join(i18nDir, l)).isDirectory() && existsSync(join(i18nDir, l, 'skills')))
  : [];
const pick = arg('lang');

const report = [];
for (const lang of langs) {
  if (pick && lang !== pick) continue;
  const dir = join(i18nDir, lang, 'skills');
  const names = readdirSync(dir).filter((n) => existsSync(join(dir, n, 'SKILL.md')));
  let reviewed = 0, stale = 0;
  const unreviewed = [];
  for (const n of names) {
    const fm = (readFileSync(join(dir, n, 'SKILL.md'), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
    const rev = (fm.match(/^review:\s*(.+)$/m) || [, 'pending'])[1].trim();
    if (rev && rev !== 'pending') reviewed++; else unreviewed.push(n);
    if (!existsSync(join(skillsDir, n, 'SKILL.md'))) stale++;
  }
  const descFile = join(i18nDir, lang, 'descriptions.json');
  const descs = existsSync(descFile)
    ? Object.keys(JSON.parse(readFileSync(descFile, 'utf8')).descriptions || {}).length : 0;
  report.push({
    lang, translated: names.length, reviewed, pending: names.length - reviewed, stale,
    coverage: +(100 * names.length / total).toFixed(1),
    descriptions: descs, descriptionCoverage: +(100 * descs / total).toFixed(1),
    unreviewed,
  });
}

// Community translations live in a different tree with a different contract.
const communityDir = join(root, 'skills-i18n');
const community = [];
if (existsSync(communityDir)) {
  for (const lang of readdirSync(communityDir).filter((l) => /^[a-z]{2}(-[A-Z]{2})?$/.test(l))) {
    const n = readdirSync(join(communityDir, lang)).filter((d) => existsSync(join(communityDir, lang, d, 'SKILL.md'))).length;
    if (n) community.push({ lang, translated: n, coverage: +(100 * n / total).toFixed(1) });
  }
}

if (has('json')) {
  console.log(JSON.stringify({
    totalSkills: total,
    machine: report.map(({ unreviewed, ...r }) => r),
    community,
  }, null, 2));
} else {
  console.log(`English skills (canonical): ${total}\n`);
  console.log('Machine-translated (i18n/) — bodies and descriptions');
  console.log('lang  bodies  coverage  reviewed  pending  stale   descriptions  coverage');
  for (const r of report) console.log([
    r.lang.padEnd(4), String(r.translated).padStart(6), (r.coverage + '%').padStart(8),
    String(r.reviewed).padStart(8), String(r.pending).padStart(7), String(r.stale).padStart(5),
    String(r.descriptions).padStart(13), (r.descriptionCoverage + '%').padStart(9),
  ].join('  '));
  if (!report.length) console.log('  (none yet — run scripts/translate-skills.mjs)');
  console.log('\nCommunity-translated (skills-i18n/) — parity-gated, human-written');
  console.log('lang  skills  coverage');
  for (const c of community) console.log([c.lang.padEnd(4), String(c.translated).padStart(6), (c.coverage + '%').padStart(8)].join('  '));
  if (!community.length) console.log('  (none)');
  if (pick && report[0]) {
    console.log(`\nAwaiting native-speaker review in ${pick} (${report[0].unreviewed.length}):`);
    for (const n of report[0].unreviewed.slice(0, 40)) console.log('  - ' + n);
    if (report[0].unreviewed.length > 40) console.log(`  … and ${report[0].unreviewed.length - 40} more`);
  }
}
