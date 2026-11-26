#!/usr/bin/env node
// /.well-known/agent-skills.json (scripts/build-well-known.mjs): builds it into a
// temporary file, then runs the public validator on it with local hash checks,
// and makes sure the validator rejects a tampered hash.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = mkdtempSync(join(tmpdir(), 'well-known-'));
try {
  const out = join(dir, 'agent-skills.json');
  const run = (file, ...extra) => execFileSync(process.execPath, [join(root, 'scripts', 'check-well-known.mjs'), file, ...extra], { encoding: 'utf8', stdio: 'pipe' });
  execFileSync(process.execPath, [join(root, 'scripts', 'build-well-known.mjs'), '--out', out], { stdio: 'ignore' });
  const doc = JSON.parse(readFileSync(out, 'utf8'));
  assert.ok(doc.count > 1000, `expected the whole library, got ${doc.count}`);
  assert.ok(doc.skills.some((s) => s.name === 'standing-orders'));
  run(out, '--verify', '40', '--root', root);

  doc.skills[0].sha256 = 'f'.repeat(64);
  const bad = join(dir, 'bad.json');
  writeFileSync(bad, JSON.stringify(doc));
  assert.throws(() => run(bad, '--verify', '1', '--root', root), /status 1|Command failed/);
  console.log('well-known: agent-skills.json builds, validates and rejects a tampered hash ✓');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
