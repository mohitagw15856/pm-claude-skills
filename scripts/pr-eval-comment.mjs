#!/usr/bin/env node
// Builds the markdown comment the Skill PR check posts: the structural-check result and
// which skills changed, with their eval-case readiness. Skills are NOT scored on the PR —
// scoring happens after merge via the "Evaluate selected bundles" Action — so the comment
// just confirms structure and flags any changed skill that still needs an eval case.
// Prints the comment to stdout. Env: BASE_REF (default origin/main), SKILLCHECK ("pass"/"fail").
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.BASE_REF || 'origin/main';
const skillcheck = process.env.SKILLCHECK || 'unknown';

function changedSkills() {
  try {
    const out = execSync(`git diff --name-only ${base}...HEAD -- skills/ 2>/dev/null || git diff --name-only ${base} -- skills/`, { cwd: root, encoding: 'utf8' });
    return [...new Set(out.split('\n').map((l) => (l.match(/^skills\/([^/]+)\//) || [])[1]).filter(Boolean))];
  } catch { return []; }
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
  L.push('**Changed skills** (not scored on the PR — see below):', '');
  L.push('| Skill | Eval case | Notes |', '|---|:---:|---|');
  for (const s of skills) {
    if (hasCase.has(s)) L.push(`| \`${s}\` | ✅ | Has a case — ready to be scored after merge. |`);
    else L.push(`| \`${s}\` | — | No eval case yet. Add one to \`evals/cases.json\` so it can be scored later. |`);
  }
}
L.push('', '<sub>Structure is auto-checked on every PR. Skills are **not scored on the PR** — scoring is decided after merge via the **Evaluate selected bundles** Action. Ship an eval case so a skill can be scored on the rubric (structure · completeness · usefulness · grounding), aiming for **≥ 4.0/5**.</sub>');
process.stdout.write(L.join('\n') + '\n');
