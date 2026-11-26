#!/usr/bin/env node
// "State of the library", once a month: what changed in the skills, which
// machine rewrites won and lost, the live Firm's track record, the Skill Cup,
// reported savings, the quality numbers and the public scoreboard. Written from
// the repo's own data, no model calls, to newsletter/state/YYYY-MM.md.
//
//   node scripts/build-monthly-state.mjs                 # last month
//   node scripts/build-monthly-state.mjs --month 2026-10
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { savingsSummary, formatMoney } from './lib/savings.mjs';
import { fetchMetrics } from './firm-metrics.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const prev = new Date(); prev.setUTCDate(1); prev.setUTCMonth(prev.getUTCMonth() - 1);
const month = arg('month') || prev.toISOString().slice(0, 7);
if (!/^\d{4}-\d{2}$/.test(month)) { console.error('--month must be YYYY-MM.'); process.exit(1); }
const inMonth = (d) => String(d || '').startsWith(month);
const json = (p, d) => (existsSync(join(root, p)) ? JSON.parse(readFileSync(join(root, p), 'utf8')) : d);
const label = new Date(`${month}-01T00:00:00Z`).toLocaleString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// Skill changes this month, from git (library-wide edits counted once).
let log = '';
try { log = execFileSync('git', ['log', `--since=${month}-01`, `--until=${month}-31T23:59:59`, '--format=%x1e%s', '--name-only', '--', 'skills/*/SKILL.md'], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); } catch {}
const commits = log.split('\x1e').filter((b) => b.trim()).map((b) => { const [s, ...f] = b.trim().split('\n'); return { subject: s, skills: new Set(f.filter((x) => x.startsWith('skills/')).map((x) => x.split('/')[1])) }; });
const touched = new Set(commits.flatMap((c) => [...c.skills]));
let added = [];
try { added = execFileSync('git', ['log', `--since=${month}-01`, `--until=${month}-31T23:59:59`, '--diff-filter=A', '--format=', '--name-only', '--', 'skills/*/SKILL.md'], { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean).map((x) => x.split('/')[1]); } catch {}

const evo = (json('data/evolution-log.json', {}).entries || []).filter((e) => inMonth(e.date));
const firm = (json('data/firm-ledger.json', {}).sessions || []);
const sessions = firm.filter((s) => inMonth(s.date));
const scored = firm.filter((s) => s.result && inMonth(s.result.scored));
const cup = (json('data/skill-cup.json', {}).cups || []).find((c) => c.month === month);
const S = savingsSummary();
let trust = {};
try { trust = JSON.parse(execFileSync(process.execPath, [join(root, 'scripts', 'build-trust-numbers.mjs'), '--json'], { encoding: 'utf8' })); } catch {}
const metrics = await fetchMetrics().catch(() => ({}));
const report = existsSync(join(root, 'skillbench', 'reports', 'ai-at-work', `${month}.md`));

const md = [
  `# State of the library: ${label}`,
  '',
  `Generated from the repository's own records by \`scripts/build-monthly-state.mjs\`. Every number links to where it comes from.`,
  '',
  '## The skills',
  '',
  commits.length ? `- **${touched.size} skills changed** in ${commits.length} commit${commits.length === 1 ? '' : 's'}${added.length ? `, including **${added.length} new**: ${added.slice(0, 8).map((n) => `[${n}](${SITE}/skill/${n}.html)`).join(', ')}${added.length > 8 ? ' and more' : ''}` : ''}. Every edit: [what changed](${SITE}/changes.html).` : '- No skill changes this month.',
  ...commits.slice(0, 6).map((c) => `  - ${c.subject} (${c.skills.size} skill${c.skills.size === 1 ? '' : 's'})`),
  '',
  '## Self-rewrites',
  '',
  evo.length ? `- ${evo.length} machine rewrite${evo.length === 1 ? '' : 's'} attempted, **${evo.filter((e) => e.kept).length} kept**, ${evo.filter((e) => !e.kept).length} lost to the original. [Evolution log](${SITE}/evolution.html).` : `- No rewrites ran this month. [Evolution log](${SITE}/evolution.html).`,
  '',
  '## Which AI is best at your job?',
  '',
  report ? `- This month's edition: [${month}](${REPO}/blob/main/skillbench/reports/ai-at-work/${month}.md) · [live page](${SITE}/ai-at-work.html).` : `- No edition this month. [Live page](${SITE}/ai-at-work.html).`,
  '',
  '## The live Firm',
  '',
  `- ${sessions.length} session${sessions.length === 1 ? '' : 's'} held; ${scored.length} prediction${scored.length === 1 ? '' : 's'} came due: **${scored.filter((s) => s.result.hit).length} hit, ${scored.filter((s) => !s.result.hit).length} missed**. [Track record](${SITE}/firm-live.html).`,
  '',
  '## The Skill Cup',
  '',
  cup ? `- Theme: **${cup.theme}**. ${cup.entries.length} entr${cup.entries.length === 1 ? 'y' : 'ies'}.${cup.winner && cup.winner !== 'none' ? ` Winner: [@${cup.winner.author}](https://github.com/${cup.winner.author}) with \`${cup.winner.skill}\` (${cup.winner.score.toFixed(2)}).` : cup.winner === 'none' ? ' No winner (no entries).' : ' Still open.'} [Leaderboard](${SITE}/cup.html).` : `- No Cup this month. [Leaderboard](${SITE}/cup.html).`,
  '',
  '## Reported savings (all time)',
  '',
  S.stories ? `- ${S.hours.toLocaleString('en-GB')} hours${Object.keys(S.money).length ? ` and ${formatMoney(S.money)}` : ''} across ${S.stories} accepted stories. [Wall of Wins](${SITE}/wins.html).` : `- None recorded yet. [Add yours](${REPO}/issues/new?template=roi-story.yml).`,
  '',
  '## Quality',
  '',
  trust.skills ? `- ${trust.skills.toLocaleString('en-GB')} live skills; ${trust.withCases} with eval cases; ${trust.scored} blind-judged (average ${trust.avg}/5); ${trust.reviewed} of ${trust.highStakes} high-stakes skills expert-reviewed; ${trust.translations} translations in ${trust.languages} languages.` : '- Unavailable.',
  '',
  '## Scoreboard (at the time of writing)',
  '',
  `- ${metrics.stars ?? 'n/a'} GitHub stars · ${metrics.forks ?? 'n/a'} forks · ${metrics.npm_weekly_downloads ?? 'n/a'} npm downloads in the last week.`,
  '',
].join('\n');

const dir = join(root, 'newsletter', 'state');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `${month}.md`), md);
const issues = readdirSync(dir).filter((f) => /^\d{4}-\d{2}\.md$/.test(f)).sort().reverse();
writeFileSync(join(dir, 'README.md'), ['# State of the library', '', 'A monthly account of the library, written from its own records: what changed, what the self-rewrites did, the Firm\'s predictions, the Skill Cup, savings and quality. See also the weekly [PM Skills Weekly](../README.md).', '', ...issues.map((f) => `- [${f.slice(0, 7)}](${f})`), ''].join('\n'));
console.log(`Wrote newsletter/state/${month}.md (${touched.size} skills changed, ${evo.length} rewrites, ${sessions.length} Firm sessions).`);
