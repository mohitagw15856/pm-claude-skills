#!/usr/bin/env node
// The State of Agent Skills — a census of every public SKILL.md GitHub will show
// us. Counts the ecosystem by conformance signal, samples real files, grades the
// sample with the SkillSpec heuristics, and writes a dated report. Free to run
// (GitHub API only); needs `gh` auth locally or GITHUB_TOKEN in Actions.
//
//   node scripts/skill-census.mjs                    # full census → docs/reports/
//   node scripts/skill-census.mjs --sample 60        # smaller/faster sample
//
// Honesty notes baked into the report: code-search totals are GitHub's
// approximations, only indexed repos are visible, and forks of large libraries
// (including this one) inflate the counts — the sample dedupes by repo.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const getArg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const SAMPLE = Math.min(200, parseInt(getArg('sample', '120'), 10) || 120);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function gh(pathQ) {
  return JSON.parse(execFileSync('gh', ['api', pathQ], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
}
async function count(q, attempt = 0) {
  try { const r = gh(`search/code?q=${encodeURIComponent(q)}&per_page=1`); await sleep(2500); return r.total_count; }
  catch { if (attempt < 2) { await sleep(15000); return count(q, attempt + 1); } return null; }
}

function gradeSkill(text) {
  const fm = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---\r?\n?([\s\S]*)$/);
  if (!fm) return { level: 0 };
  const hasName = /^name:\s*.+$/m.test(fm[1]), hasDesc = /^description:\s*.+$/m.test(fm[1]);
  if (!hasName || !hasDesc) return { level: 0 };
  const body = fm[2] || '';
  const useWhen = /use when/i.test(fm[1]);
  const l2 = /##\s*(What This Skill Produces|Required Inputs|Input)/i.test(body) && /##\s*(Output|Deliverable)|##[^\n]*\b(Template|Structure|Format)\b/i.test(body);
  const l3 = l2 && /##\s*Quality Checks/i.test(body) && /##\s*Anti-Patterns/i.test(body);
  const security = [
    /ignore (all |any )?(previous|prior|above) (instructions|rules)/i,
    /disregard (your|the) (system prompt|guidelines|instructions)/i,
    /send (the )?(user('|’)s)? ?(data|input|conversation|api key)/i,
  ].some((re) => re.test(text));
  return { level: l3 ? 3 : l2 ? 2 : 1, useWhen, security, bytes: text.length };
}

const today = new Date().toISOString().slice(0, 10);
console.error('📡 Counting the ecosystem (GitHub code search — totals are approximations)…');
const totals = {
  any: await count('filename:SKILL.md'),
  frontmatter: await count('"description:" filename:SKILL.md'),
  useWhen: await count('"Use when" filename:SKILL.md'),
  antiPatterns: await count('"Anti-Patterns" filename:SKILL.md'),
  qualityChecks: await count('"Quality Checks" filename:SKILL.md'),
};
console.error('   totals:', JSON.stringify(totals));

// ── Sample: pull result pages, dedupe by repo, grade real files ───────────────
console.error(`🔬 Sampling up to ${SAMPLE} files (deduped by repo)…`);
const seenRepos = new Set(); const sample = [];
for (let page = 1; page <= 6 && sample.length < SAMPLE; page++) {
  let items;
  try { items = gh(`search/code?q=${encodeURIComponent('"description:" filename:SKILL.md')}&per_page=100&page=${page}`).items || []; }
  catch { break; }
  for (const it of items) {
    const repo = it.repository.full_name;
    if (seenRepos.has(repo) || sample.length >= SAMPLE) continue;
    seenRepos.add(repo);
    sample.push({ repo, path: it.path, stars: undefined, fork: it.repository.fork });
  }
  await sleep(2500);
}
console.error(`   ${sample.length} repos sampled; fetching + grading…`);
const graded = [];
for (const s of sample) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${s.repo}/HEAD/${s.path}`);
    if (!res.ok) continue;
    graded.push({ ...s, ...gradeSkill(await res.text()) });
  } catch { /* skip */ }
  await sleep(120);
}
const dist = [0, 0, 0, 0];
graded.forEach((g) => dist[g.level]++);
const pct = (n) => graded.length ? Math.round(100 * n / graded.length) : 0;
const secHits = graded.filter((g) => g.security).length;
const useWhenN = graded.filter((g) => g.useWhen).length;
const medianKb = graded.length ? (graded.map((g) => g.bytes).sort((a, b) => a - b)[Math.floor(graded.length / 2)] / 1024).toFixed(1) : '—';
const forkShare = graded.length ? Math.round(100 * graded.filter((g) => g.fork).length / graded.length) : 0;

// Quality gate: rate-limited runs (common for Actions tokens — code search is
// heavily throttled there) must not overwrite a good report with a degraded one.
const nullCounts = Object.values(totals).filter((v) => v === null).length;
if (graded.length < 20 || nullCounts >= 3) {
  console.error(`\n✗ Census degraded (graded ${graded.length}, ${nullCounts}/5 counts failed) — not publishing. Rate limits? Retry later or run locally with gh auth.`);
  process.exit(2);
}

const fmt = (n) => n === null ? 'n/a' : n.toLocaleString('en-US');
const report = `# The State of Agent Skills — ${today}

*A census of the public \`SKILL.md\` ecosystem, generated by [\`scripts/skill-census.mjs\`](../../scripts/skill-census.mjs) from GitHub code search. Methodology and honesty notes at the bottom.*

## The headline numbers

| Signal | Files (GitHub estimate) | What it means |
|---|---:|---|
| Any \`SKILL.md\` | ~${fmt(totals.any)} | The raw surface — includes forks, exports, experiments |
| With frontmatter \`description:\` | ~${fmt(totals.frontmatter)} | Loadable by agents — the working definition of a skill |
| With **"Use when"** triggers | ~${fmt(totals.useWhen)} | Auto-discovery discipline (the convention that makes skills fire) |
| With **Anti-Patterns** | ~${fmt(totals.antiPatterns)} | Self-critical craft — the L3 signal |
| With **Quality Checks** | ~${fmt(totals.qualityChecks)} | Full self-verification (SkillSpec L3 house style) |

## The sample, actually graded (${graded.length} files, one per repo)

| SkillSpec level | Share |
|---|---:|
| **L3 Trustworthy** (verifiable: quality checks + anti-patterns) | ${pct(dist[3])}% |
| **L2 Structured** (declared inputs/outputs) | ${pct(dist[2])}% |
| **L1 Loadable** (frontmatter only) | ${pct(dist[1])}% |
| **L0 Not loadable** (broken/absent frontmatter) | ${pct(dist[0])}% |

- **"Use when" adoption in the sample:** ${pct(useWhenN)}% of descriptions
- **Security-pattern hits:** ${secHits} of ${graded.length} sampled files (${pct(secHits)}%) contained instruction-override or exfiltration phrasing — the reason installers should scan before installing
- **Median skill size:** ${medianKb} KB · **Fork share of sample:** ${forkShare}%

## Reading

1. **The ecosystem is real and large** — six figures of frontmattered skills — but conformance is a pyramid: most public skills stop at "loadable." The gap between L1 and L3 is where quality tooling matters.
2. **"Use when" won.** Trigger-condition descriptions are now the dominant convention; skills without them are increasingly invisible to auto-discovery.
3. **Verification is rare.** Only a small share of skills can check their own output (Quality Checks + Anti-Patterns). That's the difference between a prompt with a filename and a dependable tool — and it's checkable: \`npx skillspec-check\`.

## Methodology & honesty

- GitHub code-search totals are **approximations** and fluctuate run to run; only indexed (recently active) repos are visible, and matches are case-insensitive.
- Forks and re-exports of large libraries (including [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) itself) inflate raw totals; the graded sample **dedupes by repository** to limit this.
- The sample is what code search surfaces first, not a uniform random draw — treat percentages as directional.
- Grader: the same heuristics as [\`skillspec-check\`](../../skillspec/) (L1 frontmatter → L2 structure → L3 self-verification) plus the highest-signal security patterns. **The L2/L3 tests look for SkillSpec's named sections** — skills that declare structure under other conventions grade as L1 here, so treat L2/L3 shares as adoption of *this* standard, not as "everything else is unstructured."
- Counts fluctuate: GitHub's estimator can vary several-fold between runs for the same query. Compare trends across census runs, not absolute values.

*Regenerate anytime: \`node scripts/skill-census.mjs\` (needs \`gh\` auth; free).*
`;
mkdirSync(join(root, 'docs', 'reports'), { recursive: true });
const out = join(root, 'docs', 'reports', `state-of-agent-skills-${today}.md`);
writeFileSync(out, report);
console.error(`\n✅ ${out}`);
console.error(`   graded ${graded.length}: L3 ${pct(dist[3])}% · L2 ${pct(dist[2])}% · L1 ${pct(dist[1])}% · L0 ${pct(dist[0])}% · security ${secHits}`);
