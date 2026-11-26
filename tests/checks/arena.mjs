#!/usr/bin/env node
// Agent Arena (docs/arena.md): every community SkillBench submission in
// skillbench/community/ is valid, web/modelbench.json ranks exactly those, and
// the validator rejects a headline score that its own tasks do not support.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { loadArena, validateSubmission } from '../../scripts/lib/arena.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const taskSet = JSON.parse(readFileSync(join(root, 'skillbench', 'tasks.json'), 'utf8'));

const { rows, errors } = loadArena(join(root, 'skillbench', 'community'), taskSet);
assert.deepEqual(errors, [], `invalid Arena submissions:\n${errors.join('\n')}`);
const page = JSON.parse(readFileSync(join(root, 'web', 'modelbench.json'), 'utf8'));
assert.deepEqual(page.arena, rows, 'web/modelbench.json is out of date: run node scripts/build-modelbench.mjs');

// A well-formed submission, built from the task set, passes.
const tasks = taskSet.tasks.map((t, i) => ({ task: t.id, domain: t.domain, bare: 3 + (i % 2), skilled: 4 }));
const m = (k) => +(tasks.reduce((a, t) => a + t[k], 0) / tasks.length).toFixed(2);
const good = {
  submitted_via: 'skillbench-byo',
  run: 'https://github.com/someone/pm-claude-skills/actions/runs/123',
  agent: 'Example agent 1.0',
  runs: [{ model: 'example-model', date: '2026-10-01', taskSetVersion: taskSet.version, harness: '1.1', judge: 'claude-sonnet-4-6', score: m('skilled'), bare: m('bare'), lift: +(m('skilled') - m('bare')).toFixed(2), tasks }],
};
assert.deepEqual(validateSubmission(good, taskSet, { stem: 'example-model' }), []);

const variant = (fn) => { const s = structuredClone(good); fn(s); return validateSubmission(s, taskSet, { stem: 'example-model', today: '2026-10-23' }); };
assert.ok(variant((s) => { s.runs[0].score = 5; }).some((e) => /does not match/.test(e)), 'an inflated score is rejected');
assert.ok(variant((s) => { s.runs[0].tasks.pop(); }).some((e) => /missing tasks/.test(e)), 'a missing task is rejected');
assert.ok(variant((s) => { s.runs[0].date = '2027-01-01'; }).length, 'a future date is rejected');
assert.ok(variant((s) => { delete s.run; }).some((e) => /outputs/.test(e)), 'no provenance is rejected');
assert.deepEqual(variant((s) => { delete s.run; s.outputs = 'https://gist.github.com/someone/abc'; }), [], 'a local run with saved outputs is accepted');
assert.ok(variant((s) => { s.run = 'javascript:alert(1)'; }).length, 'a non-Actions run link is rejected');
assert.ok(variant((s) => { s.runs.push(s.runs[0]); }).length, 'two runs in one file are rejected');
console.log(`arena: ${rows.length} community submission(s) valid and ranked; validator rejects bad files ✓`);
