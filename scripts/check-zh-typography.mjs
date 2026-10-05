#!/usr/bin/env node
// Chinese typography gate for the translations in skills-i18n/zh and zh-TW.
//
// Rules (prose only: code blocks, inline code, links and URLs are skipped):
//   spacing      a space between Chinese and Latin letters or digits ("A/B 测试", "3 天"),
//                which is the house style in 1,100+ places already
//   punctuation  full-width punctuation after Chinese text ("，" not ",", "：" not ":")
//   quotes       no straight double quotes around Chinese text (use “” or 「」)
//   simplified   zh-TW files contain no Simplified-only characters
//
// Existing files are held to a ratchet (data/zh-typography-baseline.json): a file
// may not get worse than its recorded count, only better. New files must be clean.
//
//   node scripts/check-zh-typography.mjs              # report
//   node scripts/check-zh-typography.mjs --check      # exit 1 on a regression
//   node scripts/check-zh-typography.mjs --update     # rewrite the baseline (after fixing files)
//   node scripts/check-zh-typography.mjs --file skills-i18n/zh/cn-weekly-report/SKILL.md
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/check-zh-typography.mjs [--check] [--update] [--file <path>]');
  process.exit(0);
}
const BASELINE = join(root, 'data', 'zh-typography-baseline.json');
const C = '[\\u4e00-\\u9fff]';
// Common characters that only exist in Simplified Chinese (their Traditional forms differ).
const SIMPLIFIED_ONLY = '这个们为发说时会对进过还动实学应业国关开经现问题让认资从产务当总简体单买卖计设证话选运钱银长门间见观规记读调'
  + '万两临乐书亚凉划双团圆处备复岁帮庆惊愿战扫报携数术条来极浓渐温满点热种笔红终结给续谷货财转还键阖马鸣麦苏节荐虫写气'
  + '车东问广园无视历际级习码网线内绍译优质达远连适尝识讲谢请价铺购纳灵剧订贺礼';
const RULES = [
  { id: 'spacing', re: new RegExp(`${C}[A-Za-z0-9]|[A-Za-z0-9]${C}`, 'g'), msg: 'add a space between Chinese and Latin letters or digits' },
  { id: 'punctuation', re: new RegExp(`${C}[,;:?!](?=\\s|${C}|$)`, 'gm'), msg: 'use full-width punctuation after Chinese text' },
  { id: 'quotes', re: new RegExp(`"${C}[^"\\n]{0,30}"`, 'g'), msg: 'use “” or 「」 around Chinese text, not straight quotes' },
];

const prose = (raw) => raw.replace(/\r\n/g, '\n')
  .replace(/^---\n[\s\S]*?\n---\n?/, '')
  .replace(/```[\s\S]*?```/g, '')
  .replace(/`[^`\n]*`/g, ' ')
  .replace(/\]\([^)]*\)/g, ']')
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/<[^>\n]+>/g, ' ');

function lint(file) {
  const rel = relative(root, file);
  const text = prose(readFileSync(file, 'utf8'));
  const found = [];
  for (const r of RULES) for (const m of text.matchAll(r.re)) found.push({ rule: r.id, at: m.index, sample: text.slice(Math.max(0, m.index - 6), m.index + 8).replace(/\n/g, ' ') });
  if (rel.includes('/zh-TW/')) {
    for (const m of text.matchAll(new RegExp(`[${SIMPLIFIED_ONLY}]`, 'g'))) found.push({ rule: 'simplified', at: m.index, sample: text.slice(Math.max(0, m.index - 6), m.index + 6).replace(/\n/g, ' ') });
  }
  return { rel, found };
}

const one = argv.indexOf('--file');
const files = one !== -1 ? [join(root, argv[one + 1])] : ['zh', 'zh-TW'].flatMap((lang) => {
  const dir = join(root, 'skills-i18n', lang);
  return existsSync(dir) ? readdirSync(dir).map((d) => join(dir, d, 'SKILL.md')).filter(existsSync) : [];
});
const results = files.map(lint);
const counts = Object.fromEntries(results.filter((r) => r.found.length).map((r) => [r.rel, r.found.length]));

if (argv.includes('--update')) {
  writeFileSync(BASELINE, JSON.stringify({ _comment: 'Ratchet for scripts/check-zh-typography.mjs: per-file counts of typography findings. Counts may only go down; run with --update after fixing files.', files: counts }, null, 2) + '\n');
  console.log(`Baseline written: ${Object.keys(counts).length} file(s) with findings, ${Object.values(counts).reduce((a, b) => a + b, 0)} in total.`);
  process.exit(0);
}
const base = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')).files || {} : {};
const regressions = [];
let total = 0;
for (const r of results) {
  total += r.found.length;
  const allowed = base[r.rel] || 0;
  if (r.found.length > allowed) {
    regressions.push(`${r.rel}: ${r.found.length} finding(s), baseline ${allowed}`);
    for (const f of r.found.slice(0, 5)) regressions.push(`    ${f.rule}: …${f.sample}…  (${RULES.find((x) => x.id === f.rule)?.msg || 'use the Traditional form in zh-TW files'})`);
  }
}
const improved = Object.entries(base).filter(([rel, n]) => (counts[rel] || 0) < n).length;
console.log(`Chinese typography: ${results.length} file(s), ${total} finding(s) in total${improved ? `, ${improved} file(s) better than the baseline (run --update to lock it in)` : ''}.`);
if (regressions.length) {
  console.log(`\n${regressions.join('\n')}`);
  if (argv.includes('--check')) process.exit(1);
} else console.log('No file is worse than its baseline. ✓');
