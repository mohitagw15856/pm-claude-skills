#!/usr/bin/env node
// Builds the markdown comment the eval-gated PR check posts: which skills changed,
// their eval score (if scored), and the structural-check result. Reads
// evals/results.json (already refreshed by `run-evals --changed` in a prior step).
// Prints the comment to stdout. Env: BASE_REF (default origin/main), EVAL_RAN ("1" if
// the eval step ran), SKILLCHECK ("pass"/"fail").
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.BASE_REF || 'origin/main';
const evalRan = process.env.EVAL_RAN === '1';
const skillcheck = process.env.SKILLCHECK || 'unknown';

function changedSkills() {
  try {
    const out = execSync(`git diff --name-only ${base}...HEAD -- skills/ 2>/dev/null || git diff --name-only ${base} -- skills/`, { cwd: root, encoding: 'utf8' });
    return [...new Set(out.split('\n').map((l) => (l.match(/^skills\/([^/]+)\//) || [])[1]).filter(Boolean))];
  } catch { return []; }
}

const scores = {};
if (existsSync(join(root, 'evals', 'results.json'))) {
  for (const r of JSON.parse(readFileSync(join(root, 'evals', 'results.json'), 'utf8')).results || []) {
    (scores[r.skill] ||= []).push(r.overall);
  }
}
const hasCase = (() => {
  try { return new Set(JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8')).cases.map((c) => c.skill)); }
  catch { return new Set(); }
})();

const skills = changedSkills();
const L = [];
L.push('## 🤖 Skill PR check', '');
L.push(`**Structure (skillcheck):** ${skillcheck === 'pass' ? '✅ passed' : skillcheck === 'fail' ? '❌ failed — see the workflow log' : '—'}`, '');

if (!skills.length) {
  L.push('_No skill changes detected in this PR._');
} else {
  L.push('**Eval scores for changed skills:**', '');
  L.push('| Skill | Eval score | Notes |', '|---|:---:|---|');
  for (const s of skills) {
    const arr = scores[s];
    if (arr && arr.length) {
      const avg = Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100;
      const dot = avg >= 4.5 ? '🟢' : avg >= 3.5 ? '🟡' : '🔴';
      L.push(`| \`${s}\` | ${dot} **${avg}/5** | ${avg >= 4 ? 'meets the bar' : 'below 4.0 — consider improving before merge'} |`);
    } else if (!hasCase.has(s)) {
      L.push(`| \`${s}\` | — | No eval case yet. Add one to \`evals/cases.json\` to get scored. |`);
    } else if (!evalRan) {
      L.push(`| \`${s}\` | ⏳ | Eval skipped (no API key on this run — typical for fork PRs). A maintainer will score it. |`);
    } else {
      L.push(`| \`${s}\` | ⚠️ | Eval did not complete — check the workflow log. |`);
    }
  }
}
L.push('', '<sub>🔁 Eval-gated: structure is auto-checked; skills with a case in `evals/cases.json` are scored on the rubric (structure · completeness · usefulness · grounding). New skills should aim for **≥ 4.0/5**.</sub>');
process.stdout.write(L.join('\n') + '\n');
