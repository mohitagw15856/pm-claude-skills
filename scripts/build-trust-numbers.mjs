#!/usr/bin/env node
// The "Trust and quality" numbers in README.md and README.zh-CN.md, computed from
// the repo so they cannot drift the way hand-typed counts did. Writes the text
// between the TRUST-NUMBERS markers in both READMEs.
//
//   node scripts/build-trust-numbers.mjs           # rewrite the marked blocks
//   node scripts/build-trust-numbers.mjs --check   # fail if a block is stale
//   node scripts/build-trust-numbers.mjs --json    # print the numbers
//
// Sources: skills/ (live = not deprecated), evals/cases.json, evals/results.json,
// data/risk-tiers.json, config/human-review.json, skills-i18n/, evals/injection/,
// examples/. Reviews count only while unexpired (review_validity_months).
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { savingsSummary, formatMoney } from './lib/savings.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));
const fmt = (n) => n.toLocaleString('en-GB');

const live = readdirSync(join(root, 'skills')).filter((n) => {
  const p = join(root, 'skills', n, 'SKILL.md');
  if (!existsSync(p)) return false;
  const fm = (readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
  return !/^deprecated:/m.test(fm);
});
const liveSet = new Set(live);

const casesRaw = json('evals/cases.json');
const cases = Array.isArray(casesRaw) ? casesRaw : casesRaw.cases || [];
const withCases = new Set(cases.map((c) => c.skill).filter((s) => liveSet.has(s)));

const byScore = {};
for (const r of json('evals/results.json').results || []) {
  if (!liveSet.has(r.skill) || typeof r.overall !== 'number') continue;
  (byScore[r.skill] ||= []).push(r.overall);
}
const scored = Object.keys(byScore);
const avg = scored.length ? scored.reduce((a, s) => a + byScore[s].reduce((x, y) => x + y, 0) / byScore[s].length, 0) / scored.length : 0;

const tiers = json('data/risk-tiers.json').tiers || {};
const highStakes = Object.entries(tiers).filter(([n, v]) => v.tier === 'high-stakes' && liveSet.has(n)).map(([n]) => n);
const hr = json('config/human-review.json');
const months = hr.review_validity_months || 12;
const today = new Date();
const reviewed = new Set((hr.reviews || []).filter((r) => {
  const exp = r.expires ? new Date(r.expires) : new Date(new Date(r.date).setMonth(new Date(r.date).getMonth() + months));
  return exp >= today && highStakes.includes(r.skill);
}).map((r) => r.skill));

const i18n = join(root, 'skills-i18n');
const langs = readdirSync(i18n).filter((l) => /^[a-z]{2}(-[A-Z]{2})?$/.test(l));
const translations = langs.reduce((n, l) => n + readdirSync(join(i18n, l)).filter((s) => existsSync(join(i18n, l, s, 'SKILL.md'))).length, 0);
const injection = existsSync(join(root, 'evals', 'injection', 'cases.json')) ? (json('evals/injection/cases.json').cases || []).length : 0;
const examples = readdirSync(join(root, 'examples')).filter((f) => f.endsWith('-example.md') && liveSet.has(f.replace(/-example\.md$/, ''))).length;

const S = savingsSummary();
const N = {
  skills: live.length, withCases: withCases.size, scored: scored.length, avg: Math.round(avg * 10) / 10,
  highStakes: highStakes.length, reviewed: reviewed.size, languages: langs.length, translations, injection, examples,
  savedHours: S.hours, savedMoney: formatMoney(S.money), savedStories: S.stories,
};

const en = `- **Checked on every change, in CI:** structure ([SkillCheck](SKILLSPEC.md), all ${fmt(N.skills)} skills at the L3 gate), a security audit, a near-duplicate check, a count-drift check, translation parity (${fmt(N.translations)} translations in ${N.languages} languages), and a prompt-injection suite of ${N.injection} hostile documents. A change that fails any of them does not merge.
- **Eval cases:** ${fmt(N.withCases)} of the ${fmt(N.skills)} skills carry eval cases ([\`evals/cases.json\`](evals/cases.json)), and ${fmt(N.examples)} have a worked example in [\`examples/\`](examples/).
- **Measured scores:** ${fmt(N.scored)} skills have blind-judged scores on the [leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html) (average ${N.avg}/5 across the models tested); the [benchmark report](skillbench/REPORT.md) publishes the negative findings too. Everything unscored is unscored, not assumed good.
- **Human review:** of the ${fmt(N.highStakes)} skills rated high-stakes in [risk tiers](docs/RISK-TIERS.md), **${fmt(N.reviewed)} ${N.reviewed === 1 ? 'has' : 'have'} a current review by a qualified professional**. The [expert-review programme](docs/EXPERT-REVIEW-PROGRAM.md) and its [ranked queue](docs/HUMAN-REVIEW-QUEUE.md) exist for exactly this; if you hold a relevant credential, reviewing one skill is the most valuable contribution available.
- **Reported savings:** ${N.savedStories ? `${fmt(N.savedHours)} hours${N.savedMoney ? ` and ${N.savedMoney}` : ''} saved, across ${N.savedStories} accepted [ROI stories](https://mohitagw15856.github.io/pm-claude-skills/wins.html)` : `none recorded yet. [Tell us what a skill saved you](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=roi-story.yml): hours and money only, added up in public on the [Wall of Wins](https://mohitagw15856.github.io/pm-claude-skills/wins.html)`}.`;

const zh = `每次提交都会在 CI 里跑结构检查（SkillSpec L3，全部 ${N.skills} 个技能）、安全扫描、重复检测、数量一致性检查、译文对齐检查（${N.languages} 种语言共 ${N.translations} 份译文）和提示注入测试（${N.injection} 份恶意文档）。${N.skills} 个技能中 ${N.withCases} 个带有评测用例，${N.examples} 个有完整示例，${N.scored} 个有盲评得分（各模型平均 ${N.avg}/5）；${N.highStakes} 个被标为高风险的技能（法律、税务、劳动等）目前 ${N.reviewed} 个经过执业人士审读，[专家审读计划](docs/EXPERT-REVIEW-PROGRAM.md) 欢迎有资质的朋友认领。${N.savedStories ? `用户报告共节省 ${N.savedHours} 小时${N.savedMoney ? `、${N.savedMoney}` : ''}（${N.savedStories} 个已采纳案例）。` : ''}`;

const START = '<!-- TRUST-NUMBERS:START (generated by scripts/build-trust-numbers.mjs; do not edit by hand) -->';
const END = '<!-- TRUST-NUMBERS:END -->';
const targets = { 'README.md': en, 'README.zh-CN.md': zh };

if (process.argv.includes('--json')) { console.log(JSON.stringify(N, null, 2)); process.exit(0); }
const stale = [];
for (const [file, body] of Object.entries(targets)) {
  const text = read(file);
  const a = text.indexOf(START), b = text.indexOf(END);
  if (a === -1 || b === -1) { console.error(`${file} is missing the TRUST-NUMBERS markers.`); process.exit(1); }
  const next = text.slice(0, a) + `${START}\n${body}\n${END}` + text.slice(b + END.length);
  if (next === text) continue;
  if (process.argv.includes('--check')) stale.push(file);
  else writeFileSync(join(root, file), next);
}
if (stale.length) { console.error(`Trust numbers out of date in ${stale.join(', ')}. Run node scripts/build-trust-numbers.mjs`); process.exit(1); }
console.log(`Trust numbers ${process.argv.includes('--check') ? 'up to date' : 'written'}: ${N.withCases} with eval cases, ${N.scored} scored (avg ${N.avg}), ${N.reviewed}/${N.highStakes} high-stakes reviewed, ${N.translations} translations in ${N.languages} languages. ✓`);
