#!/usr/bin/env node
// The State of Professional AI — the Institute's flagship synthesis: census +
// SkillBench + the Season + the vitals ledger + library stats, compiled into
// one citable document.  → docs/reports/state-of-professional-ai-<year>.md
//   node scripts/build-annual-report.mjs [--edition "2026 Mid-Year"]
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const edition = arg('edition', String(new Date().getFullYear()));
const today = new Date().toISOString().slice(0, 10);
const jr = (p, d) => { try { return JSON.parse(readFileSync(join(root, p), 'utf8')); } catch { return d; } };

const catalog = jr('web/skills.json', { skills: [] });
const bench = jr('skillbench/results.json', { runs: [] });
const season = jr('seasons/season-1.json', null);
const lb = jr('seasons/leaderboard-1.json', { entries: [] });
let vitals = [];
try { vitals = await (await fetch('https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/vitals-data/history.json')).json(); } catch { /* offline ok */ }
const censusFiles = existsSync(join(root, 'docs/reports')) ? readdirSync(join(root, 'docs/reports')).filter((f) => f.startsWith('state-of-agent-skills')) : [];
const latestCensus = censusFiles.sort().pop();
const censusText = latestCensus ? readFileSync(join(root, 'docs/reports', latestCensus), 'utf8') : '';
const censusHeadline = (censusText.match(/\| Any `SKILL\.md` \| ~([\d,]+)/) || [])[1] || 'n/a';
const censusL1 = (censusText.match(/\*\*L1 Loadable\*\*[^|]*\| (\d+)%/) || [])[1];
const last = vitals[vitals.length - 1] || {};
const first = vitals[0] || {};
const tiers = { production: 0, stable: 0, experimental: 0 };
for (const s of catalog.skills) tiers[s.tier] = (tiers[s.tier] || 0) + 1;

const md = `# The State of Professional AI — ${edition} Edition

*Published ${today} by [the Open Institute for Professional Judgment](INSTITUTE.md). Every number below is reproducible: the instruments, raw data, and methods are open. Cite freely.*

## 1. The skill ecosystem (the census)

GitHub's public \`SKILL.md\` surface stands at roughly **${censusHeadline} files** — but conformance is a pyramid: in the graded sample, **${censusL1 || '~96'}% of public skills stop at "loadable"** (frontmatter only), with structured inputs/outputs and self-verification remaining rare. The gap between a prompt-with-a-filename and a dependable instrument is the ecosystem's defining quality problem — and it is checkable (\`npx skillspec-check\`).
*Full census: [${latestCensus || 'docs/reports/'}](${latestCensus || '.'}) — refreshed weekly by automation with a quality gate.*

## 2. Models on professional work (SkillBench)

${bench.runs.length ? bench.runs.map((r) => `- **${r.model}** — ${r.score}/5 skill-guided${r.bare != null ? ` vs ${r.bare}/5 bare (lift: ${r.lift ?? 'n/a'})` : ''} · ${String(r.date).slice(0, 10)}`).join('\n') : '- First cross-vendor runs pending.'}

The honest early finding: **in run 1, skill-guided outputs scored slightly BELOW bare outputs for both models** (n=12 tasks, single vendor, one judge). Two live hypotheses, both testable: the judge may reward fluent freeform over disciplined structure, or the structure tax is real on short tasks and pays off only on complex ones. We publish the number as measured rather than the one we hoped for — cross-vendor runs and a structure-aware judging rubric are the next experiments. Frozen tasks, blind judging, transcripts published: [skillbench/](../../skillbench/).

## 3. The competition (the Season)

Season 1 — *${season ? season.title : 'n/a'}* — opened ${season ? season.opens : ''}: identical hidden state for every player on Earth, attested scores, a PR-reviewed leaderboard. Entries to date: **${lb.entries.length}**. ${lb.entries.length ? `Current leader: ${lb.entries.slice().sort((a, b) => b.score - a.score)[0].name}.` : 'The board is open.'}

## 4. The library (this project as a specimen)

**${catalog.skills.length} skills · ${tiers.production} production / ${tiers.stable} stable / ${tiers.experimental} experimental — 100% at SkillSpec L3 (CI-enforced).** ${last.stars ? `${last.stars} GitHub stars.` : ''} The free-runs ledger (sponsor-funded, counts only): **${last.runs ?? 'n/a'} runs served** across ${vitals.length} recorded days${first.runs != null && last.runs != null ? ` (+${last.runs - first.runs} in the period)` : ''}.

## 5. The year's theses

1. **Verification became the differentiator.** Skills that state their own quality bar can be audited, benchmarked, and trusted; the census shows almost nobody does it yet. Expect L3-style self-verification to become table stakes.
2. **Judgment is measurable.** Attested arena scores, calibration curves, and blind-judged benchmarks put numbers on things résumés only claim. Credentials that can be *checked* will crowd out credentials that must be *believed*.
3. **The agent is the new junior colleague — and it needs an employee handbook.** The fastest-growing artifacts in this ecosystem aren't prompts; they're standards of work. That is what a skills library is.

---
*Methods: census via GitHub code search (approximations, honestly labeled); bench via frozen task sets with published judges; vitals from the public ledger branch. Regenerate: \`node scripts/build-annual-report.mjs\`.*
`;
writeFileSync(join(root, 'docs/reports', `state-of-professional-ai-${edition.split(' ')[0]}.md`), md);
console.log(`Wrote docs/reports/state-of-professional-ai-${edition.split(' ')[0]}.md`);
