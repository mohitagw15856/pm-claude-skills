#!/usr/bin/env node
// Boardroom review for CI — documents get code review. Three executives read the
// changed docs and file their objections; the Chair issues a severity verdict.
// Designed for the doc-review-boardroom.yml recipe (PR comment + optional gate),
// usable locally too.
//
//   node scripts/boardroom-review.mjs --files "docs/plan.md,docs/prd.md" --out review.md
//   node scripts/boardroom-review.mjs --files-from /tmp/changed.txt --fail-on red
//   node scripts/boardroom-review.mjs --files docs/plan.md --dry-run     # no API call
//
// Needs ANTHROPIC_API_KEY (one call total, whatever the doc count). Exit codes:
// 0 ok · 1 usage/error · 3 the Chair issued a 🔴 verdict and --fail-on red was set.
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete } from '../bin/lib/anthropic.mjs';

const getArg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const has = (n) => process.argv.includes('--' + n);

const BENCH = `THE BENCH (each reads the documents through their own lens; they are sceptical but fair):
- 📉 Margaret Cho, CFO — every number must reconcile; unpriced plans and hockey-stick assumptions are her prey. Quotes the doc when she objects.
- 🔧 Dev Sharma, CTO — feasibility, hidden complexity, "what breaks at 10x", and timelines invented without engineering.
- ❤️ Amara Okafor, CCO — the customer's actual experience, edge cases as people, promises support will have to keep.
- ⚖️ The Chair — neutral; weighs the objections, issues the verdict.`;

const FORMAT = `Respond in markdown:
## 🏛 Boardroom review
For each executive with a real objection (skip any with none): "**<emoji> <name>:**" then 1-3 objections, each quoting the document it targets (file + the quoted line). Severity-tag each objection [minor]/[major]/[blocking]. Do not invent facts not in the documents; judge only what is written.
Then:
## ⚖️ The Chair's verdict
One paragraph, then exactly one line: "VERDICT: 🟢 proceed" (no blocking, ≤1 major) / "VERDICT: 🟡 proceed with repairs" (majors to fix) / "VERDICT: 🔴 not ready" (any blocking objection). List the repairs in priority order.`;

async function main() {
  let files = (getArg('files', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const fromFile = getArg('files-from');
  if (fromFile && existsSync(fromFile)) files.push(...readFileSync(fromFile, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean));
  files = [...new Set(files)].filter((f) => existsSync(f)).slice(0, 8);
  if (!files.length) { console.error('No existing files to review. Pass --files a,b or --files-from <list>.'); return 1; }

  let input = 'DOCUMENTS UNDER REVIEW:\n';
  for (const f of files) input += `\n=== ${f} ===\n${readFileSync(f, 'utf8').slice(0, 24000)}\n`;

  const system = `You convene a board of executives to review documents in a pull request. ${BENCH}\n\n${FORMAT}`;

  if (has('dry-run')) {
    console.log(`[dry-run] would review ${files.length} file(s): ${files.join(', ')}`);
    console.log(`[dry-run] system prompt ${system.length} chars, input ${input.length} chars, model ${getArg('model', 'claude-sonnet-4-6')} — no API call made.`);
    return 0;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { console.error('ANTHROPIC_API_KEY not set (use --dry-run to preview without spending).'); return 1; }

  const out = await complete({ apiKey, model: getArg('model', 'claude-sonnet-4-6'), system, messages: [{ role: 'user', content: input }], maxTokens: 3000 });
  const dest = getArg('out', 'boardroom-review.md');
  writeFileSync(dest, out + '\n');
  console.error(`✅ Review written to ${dest}`);

  const red = /VERDICT:\s*🔴/.test(out);
  const yellow = /VERDICT:\s*🟡/.test(out);
  console.error(`Verdict: ${red ? '🔴 not ready' : yellow ? '🟡 proceed with repairs' : '🟢 proceed'}`);
  if (red && getArg('fail-on', 'none') === 'red') return 3;
  return 0;
}
main().then((c) => process.exit(c)).catch((e) => { console.error(`Error: ${e.message}`); process.exit(1); });
