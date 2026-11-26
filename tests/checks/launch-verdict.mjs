#!/usr/bin/env node
// Launch-day verdict (scripts/launch-verdict.mjs): classifies each task by
// skilled-minus-bare uplift, flags verdicts that changed since the baseline,
// and refuses a model with no run. Synthetic results; no API calls.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = mkdtempSync(join(tmpdir(), 'verdict-'));
const task = (task, bare, skilled) => ({ task, domain: 'test', bare, skilled });
const results = { runs: [
  { model: 'old-model', date: '2026-01-01', taskSetVersion: 1, judge: 'j', score: 4, bare: 3.5, tasks: [task('a', 3, 4), task('b', 3, 4), task('c', 4, 4)] },
  { model: 'new-model', date: '2026-02-01', taskSetVersion: 1, judge: 'j', score: 4.5, bare: 4.6, tasks: [task('a', 3, 4.5), task('b', 4.9, 5), task('c', 5, 4.25)] },
] };
try {
  const file = join(dir, 'results.json'), out = join(dir, 'v.md');
  writeFileSync(file, JSON.stringify(results));
  const run = (...a) => execFileSync(process.execPath, [join(root, 'scripts', 'launch-verdict.mjs'), '--results', file, '--out', out, ...a], { encoding: 'utf8', stdio: 'pipe' });
  assert.match(run('--model', 'new-model'), /1 keep helping, 1 neutral, 1 hurt/);
  const md = readFileSync(out, 'utf8');
  assert.match(md, /Baseline: old-model/);
  assert.match(md, /\| a \|.*\| keeps helping \|/);
  assert.match(md, /\| b \|.*\| neutral \|.*keeps helping → neutral/);
  assert.match(md, /\| c \|.*\| hurts \|.*neutral → hurts/);
  assert.throws(() => run('--model', 'missing-model'), /Command failed/);
  console.log('launch-verdict: uplift verdicts, baseline changes and a missing model ✓');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
