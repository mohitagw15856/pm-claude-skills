#!/usr/bin/env node
// Scores how well three routers send 200 real-world Chinese requests (evals/zh-routing.json)
// to the skill a reviewer expects:
//   find      the CLI's `npx pm-claude-skills find` (what users run)
//   keyword   the decision layer's keywordRank (integrations/jev/catalog.mjs; MCP and hooks)
//   router    the ModelScope router model (integrations/router-model/pm_router.py)
// Writes evals/zh-routing-results.json and docs/ZH-ROUTING.md.
//   node scripts/zh-routing-eval.mjs [--check 0.6]   (fails if find's top-3 falls below the floor)
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCatalog, keywordRank } from '../integrations/jev/catalog.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { cases } = JSON.parse(readFileSync(join(root, 'evals', 'zh-routing.json'), 'utf8'));
const argIdx = process.argv.indexOf('--check');
const floor = argIdx > -1 ? Number(process.argv[argIdx + 1]) : null;

// 1. CLI find, one process per prompt (the real user path).
const find = cases.map(({ prompt }) => {
  const r = spawnSync('node', [join(root, 'bin', 'cli.mjs'), 'find', prompt, '--json', '--limit', '3'], { encoding: 'utf8' });
  try { return JSON.parse(r.stdout).map((x) => x.name); } catch { return []; }
});

// 2. keywordRank over the shipped index.
const { skills } = loadCatalog({ root });
const keyword = cases.map(({ prompt }) => keywordRank(prompt, skills, { topK: 3 }).map((x) => x.skill));

// 3. The router model, trained fresh and run in one Python process.
const dir = mkdtempSync(join(tmpdir(), 'zhroute-'));
const model = join(dir, 'router.json');
execFileSync('python3', [join(root, 'integrations', 'router-model', 'pm_router.py'), 'train', '--repo', root, '--out', model], { stdio: 'ignore' });
const py = `import json,sys\nsys.path.insert(0, ${JSON.stringify(join(root, 'integrations', 'router-model'))})\nfrom pm_router import Router\nr = Router.load(${JSON.stringify(model)})\nprompts = json.load(sys.stdin)\nprint(json.dumps([[s for s, _ in r.route(p, k=3)] for p in prompts]))`;
const router = JSON.parse(execFileSync('python3', ['-c', py], { input: JSON.stringify(cases.map((c) => c.prompt)), encoding: 'utf8' }));

const score = (preds) => {
  let top1 = 0, top3 = 0;
  preds.forEach((p, i) => { if (p[0] === cases[i].expected) top1++; if (p.includes(cases[i].expected)) top3++; });
  return { top1: +(top1 / cases.length).toFixed(3), top3: +(top3 / cases.length).toFixed(3) };
};
const results = { generated: new Date().toISOString().slice(0, 10), cases: cases.length, find: score(find), keyword: score(keyword), router: score(router) };
const misses = cases.map((c, i) => ({ ...c, find: find[i][0] || '(none)', router: router[i][0] || '(none)' })).filter((m) => m.find !== m.expected);
writeFileSync(join(root, 'evals', 'zh-routing-results.json'), JSON.stringify({ ...results, misses }, null, 1) + '\n');

const pct = (v) => `${Math.round(v * 100)}%`;
const md = `# Chinese routing: how often a Chinese request finds the right skill

Measured ${results.generated} on [${cases.length} real-world Chinese requests](../evals/zh-routing.json), phrased the way people ask rather than copied from the skills' own trigger lines, across ${new Set(cases.map((c) => c.expected)).size} skills. Regenerate with \`node scripts/zh-routing-eval.mjs\`.

| Router | Used by | Top-1 | Top-3 |
|---|---|---|---|
| \`find\` | \`npx pm-claude-skills find\` | ${pct(results.find.top1)} | ${pct(results.find.top3)} |
| keyword rank | MCP server, hooks, decision layer fallback | ${pct(results.keyword.top1)} | ${pct(results.keyword.top3)} |
| router model | [ModelScope pm-skills-router](https://www.modelscope.ai/models/mohitagw15856/pm-skills-router), Dify plugin | ${pct(results.router.top1)} | ${pct(results.router.top3)} |

Top-1 is the right skill first; top-3 is the right skill among the first three, which is what a person choosing from a short list sees.

**History.** The first measurement (2026-10-04, before Traditional Chinese descriptions and the short Chinese descriptions in [\`data/zh-aliases.json\`](../data/zh-aliases.json) were added for common untranslated skills) was: \`find\` 84% / 91%, keyword rank 83% / 91%, router model 83% / 89%. Those descriptions were written as plain descriptions of each skill, not from these test prompts, but they were added after seeing the misses, so treat the gain as optimistic until a fresh set of prompts confirms it.

## Where \`find\` misses (${misses.length})

| Request | Expected | \`find\` chose | Router chose |
|---|---|---|---|
${misses.slice(0, 40).map((m) => `| ${m.prompt} | \`${m.expected}\` | \`${m.find}\` | \`${m.router}\` |`).join('\n')}
${misses.length > 40 ? `\n…and ${misses.length - 40} more in \`evals/zh-routing-results.json\`.\n` : ''}
These misses are the to-do list: each points at a skill whose Chinese description or translation should carry that phrasing.
`;
writeFileSync(join(root, 'docs', 'ZH-ROUTING.md'), md);
console.log(`Chinese routing on ${cases.length} requests: find ${pct(results.find.top1)} / ${pct(results.find.top3)} · keyword ${pct(results.keyword.top1)} / ${pct(results.keyword.top3)} · router ${pct(results.router.top1)} / ${pct(results.router.top3)} (top-1 / top-3)`);
if (floor != null && results.find.top3 < floor) { console.error(`find top-3 ${pct(results.find.top3)} is below the floor ${pct(floor)}`); process.exit(1); }
