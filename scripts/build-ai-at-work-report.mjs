#!/usr/bin/env node
// "Which AI is best at your job?" — the monthly report. SkillBench scores models on
// fixed professional tasks (skillbench/tasks.json, tasks-zh.json); this regroups
// those scores by job, so a reader looks up their own work instead of a domain code.
//
//   node scripts/build-ai-at-work-report.mjs                    # web/ai-at-work.json (built at deploy)
//   node scripts/build-ai-at-work-report.mjs --edition 2026-10  # also write skillbench/reports/ai-at-work/2026-10.md
//   node scripts/build-ai-at-work-report.mjs --check            # fail if a task's domain maps to no job
//
// Honest by construction: a job with one tested model says "not enough models to
// rank", runs older than STALE_DAYS are marked stale, and failed runs (null scores)
// are listed as failed rather than dropped silently. Only models someone has
// actually run appear; adding a provider key to the monthly workflow adds a model.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const STALE_DAYS = 120;
const REPORTS = join(root, 'skillbench', 'reports', 'ai-at-work');

// Job → the SkillBench domains that test it, in the reader's own words.
const JOBS = [
  { id: 'product-managers', job: 'Product managers', lang: 'en', domains: ['product'], work: 'PRDs and prioritisation' },
  { id: 'engineering-leads', job: 'Engineering and SRE leads', lang: 'en', domains: ['engineering-ops'], work: 'incident post-mortems and migration plans' },
  { id: 'analysts', job: 'Data and growth analysts', lang: 'en', domains: ['analysis'], work: 'churn analysis and A/B test plans' },
  { id: 'people-managers', job: 'People managers and HR', lang: 'en', domains: ['people'], work: 'OKRs and performance reviews' },
  { id: 'customer-facing', job: 'Customer success and communications', lang: 'en', domains: ['communication'], work: 'stakeholder updates and escalation briefs' },
  { id: 'founders', job: 'Founders and strategy roles', lang: 'en', domains: ['strategy'], work: 'competitor teardowns and pricing' },
  { id: 'cn-office', job: '中国职场（打工人）', lang: 'zh', domains: ['china-work'], work: '周报、PRD 评审、述职、企业微信通知' },
  { id: 'cn-life', job: '生活事务（劳动合同、补偿金）', lang: 'zh', domains: ['china-life'], work: '经济补偿金计算、劳动合同解读' },
  { id: 'cn-exams', job: '考生与求职者', lang: 'zh', domains: ['china-exams'], work: '申论、校招' },
  { id: 'cn-content', job: '内容创作者', lang: 'zh', domains: ['zh-content'], work: '小红书笔记、公众号文章' },
];

function load(file, label) {
  const p = join(root, 'skillbench', file);
  if (!existsSync(p)) return { runs: [], missing: `${label}: no scored run merged yet` };
  return { runs: JSON.parse(readFileSync(p, 'utf8')).runs || [] };
}
const sets = [
  { lang: 'en', tasks: JSON.parse(readFileSync(join(root, 'skillbench', 'tasks.json'), 'utf8')).tasks, ...load('results.json', 'English task set') },
  { lang: 'zh', tasks: JSON.parse(readFileSync(join(root, 'skillbench', 'tasks-zh.json'), 'utf8')).tasks, ...load('results-zh.json', 'Chinese task set') },
];

const covered = new Set(JOBS.flatMap((j) => j.domains));
const unmapped = sets.flatMap((s) => s.tasks.map((t) => t.domain)).filter((d) => !covered.has(d));
if (process.argv.includes('--check')) {
  if (unmapped.length) { console.error(`AI-at-work report: domains with no job: ${[...new Set(unmapped)].join(', ')}`); process.exit(1); }
  console.log('AI-at-work report: every SkillBench domain maps to a job. ✓');
  process.exit(0);
}

const now = new Date();
const mean = (xs) => (xs.length ? Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 100) / 100 : null);
const ageDays = (d) => Math.floor((now - new Date(d)) / 86400000);

const failed = [];
const jobs = JOBS.map((j) => {
  const set = sets.find((s) => s.lang === j.lang);
  const taskIds = set.tasks.filter((t) => j.domains.includes(t.domain)).map((t) => t.id);
  const rows = [];
  for (const run of set.runs) {
    const ts = (run.tasks || []).filter((t) => taskIds.includes(t.task));
    const skilled = ts.map((t) => t.skilled).filter((x) => typeof x === 'number');
    const bare = ts.map((t) => t.bare).filter((x) => typeof x === 'number');
    if (!skilled.length && !bare.length) { if (ts.length) failed.push(`${run.model} (${run.date}, ${j.lang})`); continue; }
    rows.push({
      model: run.model, date: run.date, judge: run.judge, tasks: ts.length,
      skilled: mean(skilled), bare: mean(bare),
      lift: skilled.length && bare.length ? Math.round((mean(skilled) - mean(bare)) * 100) / 100 : null,
      stale: ageDays(run.date) > STALE_DAYS,
    });
  }
  // Ranked by the better of the two modes: what a reader can get from that model today.
  rows.sort((a, b) => Math.max(b.skilled ?? 0, b.bare ?? 0) - Math.max(a.skilled ?? 0, a.bare ?? 0) || a.model.localeCompare(b.model));
  const top = rows[0];
  const verdict = rows.length < 2 ? 'Not enough models tested to rank.'
    : Math.max(top.skilled ?? 0, top.bare ?? 0) - Math.max(rows[1].skilled ?? 0, rows[1].bare ?? 0) < 0.25 ? `Too close to call between ${top.model} and ${rows[1].model}.`
    : `${top.model} leads.`;
  return { ...j, taskIds, models: rows, verdict };
});

const allRuns = sets.flatMap((s) => s.runs);
const tested = [...new Set(allRuns.filter((r) => typeof r.score === 'number').map((r) => r.model))];
const editions = existsSync(REPORTS) ? readdirSync(REPORTS).filter((f) => /^\d{4}-\d{2}\.md$/.test(f)).map((f) => f.slice(0, 7)).sort().reverse() : [];
const edition = arg('edition');
if (edition && !/^\d{4}-\d{2}$/.test(edition)) { console.error('--edition must be YYYY-MM.'); process.exit(2); }
if (edition && !editions.includes(edition)) editions.unshift(edition);

const out = {
  generated: now.toISOString().slice(0, 10), editions, staleDays: STALE_DAYS,
  modelsTested: tested, failedRuns: [...new Set(failed)], missing: sets.filter((s) => s.missing).map((s) => s.missing), jobs,
};
writeFileSync(join(root, 'web', 'ai-at-work.json'), JSON.stringify(out, null, 2) + '\n');

if (edition) {
  const f = (x) => (x == null ? 'n/a' : x.toFixed(2));
  const lines = [
    `# Which AI is best at your job? — ${edition}`,
    '',
    `Monthly edition, generated by \`scripts/build-ai-at-work-report.mjs\` from SkillBench runs. Each model does each task twice, on its own ("bare") and with the matching skill from this library ("with skill"); a pinned judge scores both on a fixed 1–5 rubric. Ranked by the better of the two.`,
    '',
    `**Models tested so far:** ${tested.length ? tested.join(', ') : 'none'}. A model appears only once someone has run it; the [monthly workflow](../../../.github/workflows/ai-at-work-report.yml) runs every model whose provider key is set.`,
    '',
  ];
  for (const j of jobs) {
    lines.push(`## ${j.job}`, '', `*Tested on: ${j.work}.* ${j.verdict}`, '');
    if (!j.models.length) { lines.push('No scored runs yet.', ''); continue; }
    lines.push('| Model | With skill | Bare | Skill lift | Run |', '|---|---|---|---|---|');
    for (const m of j.models) lines.push(`| ${m.model} | ${f(m.skilled)} | ${f(m.bare)} | ${m.lift == null ? 'n/a' : (m.lift > 0 ? '+' : '') + m.lift.toFixed(2)} | ${m.date}${m.stale ? ' (stale)' : ''} |`);
    lines.push('');
  }
  lines.push('## Caveats', '',
    `- Two to four tasks per job, judged by a model (${[...new Set(allRuns.map((r) => r.judge).filter(Boolean))].join(', ') || 'n/a'}). Treat differences under 0.25 as noise.`,
    '- The judge is a Claude model; that can favour Claude-style answers. Runs with other judges are welcome (`--judge`).',
    `- Runs older than ${STALE_DAYS} days are marked stale.`,
    ...(out.failedRuns.length ? [`- Runs that returned no scores (provider errors or quota): ${out.failedRuns.join('; ')}.`] : []),
    ...(out.missing.length ? [`- ${out.missing.join('; ')}.`] : []),
    '');
  mkdirSync(REPORTS, { recursive: true });
  writeFileSync(join(REPORTS, `${edition}.md`), lines.join('\n'));
}
console.log(`AI-at-work report: ${jobs.filter((j) => j.models.length).length}/${jobs.length} jobs with data, ${tested.length} models tested${edition ? `, edition ${edition} written` : ''}.`);
