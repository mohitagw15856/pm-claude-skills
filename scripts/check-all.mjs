#!/usr/bin/env node
// The repository's check suite: every gate, in order, with a full report.
//
// "npm run check" used to be one long "a && b && c" line in package.json, so the first
// failing gate hid every gate after it. This runner keeps the same steps in the same
// order, runs them all, and prints one line per gate plus the output of any that failed.
//
//   node scripts/check-all.mjs              run everything (npm run check)
//   node scripts/check-all.mjs --bail       stop at the first failure (the old behaviour)
//   node scripts/check-all.mjs --only drift run the steps whose command contains "drift"
//   node scripts/check-all.mjs --list       print the steps and exit
//   node scripts/check-all.mjs --verbose    stream every step's output
//
// Order matters: the first steps build files that later steps read. To add a gate,
// add its command to STEPS. No dependencies.
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const STEPS = [
  "node web/build-skills.mjs",
  "node extension/sync-skills.mjs",
  "cp web/skills.json python/pm_skills/skills.json",
  "node scripts/skillcheck.mjs --strict",
  "node scripts/check-a11y.mjs --check",
  "node scripts/check-web-weight.mjs --check",
  "node scripts/skill-dupes.mjs --check",
  "node scripts/check-drift.mjs",
  "node tests/lite-test.mjs",
  "node scripts/check-injection.mjs",
  "node scripts/check-adversarial.mjs",
  "node scripts/check-skill-schemas.mjs",
  "node scripts/check-pipelines.mjs",
  "node scripts/check-missions.mjs",
  "node tests/mission-test.mjs",
  "node tests/anthropic-client-test.mjs",
  "node scripts/check-model-refs.mjs",
  "node scripts/build-model-guidance.mjs --check",
  "node scripts/prompt-audit.mjs --check",
  "node scripts/build-mirror-index.mjs --check",
  "node scripts/build-miniprogram.mjs --check",
  "node tests/miniprogram-test.mjs",
  "node tests/utools-test.mjs",
  "node integrations/ussd/test.mjs",
  "node scripts/translate-skills.mjs --check --strict",
  "node scripts/rules-reviewed.mjs --check",
  "node tests/teams-test.mjs",
  "node tests/run-checks.mjs",
  "node tests/setup-test.mjs",
  "node scripts/build-catalogue.mjs --check",
  "node scripts/build-contributors.mjs --check",
  "node scripts/build-banner.mjs --check",
  "node scripts/build-trust-numbers.mjs --check",
  "node scripts/build-worked-examples.mjs --check",
  "node scripts/build-ai-at-work-report.mjs --check",
  "node scripts/build-evolution-log.mjs --check",
  "node scripts/score-firm-predictions.mjs --check",
  "node scripts/close-skill-cup.mjs --check",
  "node scripts/build-overlays.mjs --check",
  "node scripts/check-glossaries.mjs --check",
  "node scripts/build-readme-onboarding.mjs --check",
  "node scripts/build-conformance-badge.mjs --check",
  "node scripts/build-starters.mjs --check",
  "node scripts/build-exports.mjs",
  "node scripts/build-workflows.mjs --check",
  "node scripts/build-samples.mjs",
  "node scripts/build-skills-md.mjs",
  "node tests/exports-lint.mjs",
  "node tests/i18n-parity.mjs",
  "node scripts/build-disambiguation.mjs",
  "node scripts/check-eval-coverage.mjs --check --base origin/main",
  "node scripts/sync-bundles.mjs --check",
  "node scripts/check-skill-homes.mjs",
  "node scripts/build-mcpb.mjs --check",
  "node scripts/build-sponsor-block.mjs --check",
  "node scripts/build-cursor-plugins.mjs --check",
  "node scripts/skill-audit.mjs",
];

// Generated files that must be committed up to date. Checked last, after the builds above.
export const MUST_BE_COMMITTED = "git diff --exit-code -- web/samples.json SKILLS.md DISAMBIGUATION.md";

function main() {
  const argv = process.argv.slice(2);
  const flag = (f) => argv.includes(f);
  const only = flag('--only') ? argv[argv.indexOf('--only') + 1] : null;
  let steps = [...STEPS, MUST_BE_COMMITTED];
  if (only) steps = steps.filter((s) => s.includes(only));
  if (flag('--list')) { steps.forEach((s, i) => console.log(`${String(i + 1).padStart(2)}. ${s}`)); return 0; }
  if (!steps.length) { console.error(`No step matches "${only}".`); return 1; }

  const failed = [];
  const t0 = Date.now();
  for (const [i, cmd] of steps.entries()) {
    const start = Date.now();
    const r = spawnSync(cmd, { cwd: ROOT, shell: true, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: flag('--verbose') ? 'inherit' : 'pipe' });
    const ok = r.status === 0;
    console.log(`${ok ? '✓' : '✗'} ${String(i + 1).padStart(2)}/${steps.length} ${cmd}  (${((Date.now() - start) / 1000).toFixed(1)}s)`);
    if (!ok) {
      failed.push(cmd);
      if (!flag('--verbose')) {
        const out = `${r.stdout || ''}${r.stderr || ''}`.trimEnd().split('\n');
        console.log(out.slice(-40).map((l) => `    ${l}`).join('\n'));
      }
      if (flag('--bail')) break;
    }
  }
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  if (failed.length) {
    console.error(`\n${failed.length} of ${steps.length} check(s) failed in ${secs}s:`);
    for (const f of failed) console.error(`  ✗ ${f}`);
    if (failed.includes(MUST_BE_COMMITTED)) console.error('  (the last one means generated files changed: review and commit them)');
    return 1;
  }
  console.log(`\nAll ${steps.length} checks passed in ${secs}s. ✓`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main());
