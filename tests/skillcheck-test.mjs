#!/usr/bin/env node
// Tests for bin/skillcheck.mjs — the validator this repo publishes.
//
// It ships three ways: `npx pm-claude-skills skillcheck`, the standalone
// `skillspec-check` package, and a GitHub Action. Other people's CI fails on
// its verdict. It had no tests, which meant its own rules were only ever
// verified against this repo's 1153 skills — a corpus that passes, so a rule
// that silently stopped firing would look identical to one that was working.
//
// Each case is a fixture skill written to a temp dir and validated through the
// real CLI, so the exit code and the message are both under test.
//
//   node tests/skillcheck-test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLI = join(root, 'bin', 'skillcheck.mjs');

const VALID_BODY = `# Widget Planner

Plans a widget.

## What This Skill Produces
- **A plan** — the plan

## Required Inputs
Ask for these if not provided:
- **The widget** — which one

## Output Format
### Plan
Some plan.

## Quality Checks
- [ ] It planned

## Anti-Patterns
- **Not planning.** Bad.
`;

const valid = (name = 'widget-planner') => `---
name: ${name}
description: "Plan a widget end to end. Use when asked to plan a widget or scope widget work. Produces a widget plan with steps and owners."
---

${VALID_BODY}`;

/** Write skill folders into a fresh temp dir and run the CLI over it. */
function check(skills, args = []) {
  const dir = mkdtempSync(join(tmpdir(), 'skillcheck-'));
  try {
    for (const [name, content] of Object.entries(skills)) {
      mkdirSync(join(dir, name), { recursive: true });
      if (content !== null) writeFileSync(join(dir, name, 'SKILL.md'), content);
    }
    const r = spawnSync(process.execPath, [CLI, '--dir', dir, ...args], { encoding: 'utf8' });
    return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('a well-formed skill passes', () => {
  const r = check({ 'widget-planner': valid() });
  assert.equal(r.code, 0, r.out);
});

test('frontmatter name must match the folder', () => {
  const r = check({ 'widget-planner': valid('something-else') });
  assert.equal(r.code, 1);
  assert.match(r.out, /does not match folder/i);
});

test('missing frontmatter is an error', () => {
  const r = check({ 'widget-planner': VALID_BODY });
  assert.equal(r.code, 1);
  assert.match(r.out, /frontmatter/i);
});

test('missing description is an error', () => {
  const r = check({ 'widget-planner': `---\nname: widget-planner\n---\n\n${VALID_BODY}` });
  assert.equal(r.code, 1);
  assert.match(r.out, /description/i);
});

test('a folder with no SKILL.md is an error', () => {
  const r = check({ 'widget-planner': null });
  assert.equal(r.code, 1);
  assert.match(r.out, /SKILL\.md/i);
});

test('body must have a top-level heading', () => {
  const noHeading = valid().replace('# Widget Planner', 'Widget Planner');
  const r = check({ 'widget-planner': noHeading });
  assert.equal(r.code, 1);
  assert.match(r.out, /heading/i);
});

// The CRLF case is a standing bug class in this repo's tooling: a Windows-
// authored SKILL.md must not read as "no frontmatter".
test('CRLF line endings still parse', () => {
  const r = check({ 'widget-planner': valid().replace(/\n/g, '\r\n') });
  assert.equal(r.code, 0, r.out);
});

test('a leading blank line before --- still parses', () => {
  const r = check({ 'widget-planner': '\n' + valid() });
  assert.equal(r.code, 0, r.out);
});

// An unwritten scaffold must never validate green. These are the exact strings
// the repo's own scaffolders emit.
for (const [label, desc] of [
  ['bare TODO', 'TODO — describe what this skill does. Use when TODO. Produces TODO.'],
  ['new-bundle stub', 'Summarise what Widget Planner does in one line. Use when asked to [trigger phrases the user would say]. Produces [the concrete artifact].'],
  ['legacy template', 'One sentence. Use when trigger condition. Produces output description.'],
]) {
  test(`template placeholder text is rejected — ${label}`, () => {
    const stub = `---\nname: widget-planner\ndescription: "${desc}"\n---\n\n${VALID_BODY}`;
    const r = check({ 'widget-planner': stub });
    assert.equal(r.code, 1, `should have failed:\n${r.out}`);
    assert.match(r.out, /placeholder|template/i);
  });
}

test('a description with no "Use when" trigger warns but does not fail', () => {
  const noTrigger = valid().replace(
    /description: "[^"]*"/,
    'description: "Plan a widget end to end. Produces a widget plan with steps and owners."',
  );
  const r = check({ 'widget-planner': noTrigger });
  assert.equal(r.code, 0, 'warnings must stay advisory');
  assert.match(r.out, /use when/i);
});

test('--json emits parseable output', () => {
  const r = check({ 'widget-planner': valid() }, ['--json']);
  const start = r.out.indexOf('{');
  assert.ok(start >= 0, `no JSON in output:\n${r.out}`);
  const parsed = JSON.parse(r.out.slice(start));
  assert.ok(typeof parsed === 'object' && parsed !== null);
});

test('a missing --dir is reported, not crashed on', () => {
  const r = spawnSync(process.execPath, [CLI, '--dir', join(tmpdir(), 'definitely-not-here-9f3a')], { encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.doesNotMatch((r.stderr || '') + (r.stdout || ''), /TypeError|ENOENT: .*stack/i);
});

test('one bad skill among good ones still fails the run', () => {
  const r = check({
    'widget-planner': valid(),
    'gadget-planner': valid('mismatched-name'),
  });
  assert.equal(r.code, 1);
  assert.match(r.out, /gadget-planner/);
});
