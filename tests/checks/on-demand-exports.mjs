#!/usr/bin/env node
// The npm package no longer ships pre-built rule files; the CLI builds one tool's files
// on first use. This checks the two things that makes safe: the generator can write a
// single platform into a folder of the caller's choosing, and what it writes there is
// byte-identical to the committed export for the same skill.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const out = mkdtempSync(join(tmpdir(), 'pm-exports-check-'));
const errors = [];
const find = (dir, name) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) { const hit = find(p, name); if (hit) return hit; } else if (e === name) return p;
  }
  return null;
};
try {
  const r = spawnSync(process.execPath, [join(root, 'scripts', 'build-exports.mjs'), '--platform', 'cursor'], { cwd: root, encoding: 'utf8', env: { ...process.env, PM_SKILLS_EXPORTS_DIR: out } });
  if (r.status !== 0) errors.push(`generator exited ${r.status}: ${(r.stderr || '').trim().split('\n').pop()}`);
  const built = existsSync(join(out, 'cursor')) ? find(join(out, 'cursor'), 'prd-template.mdc') : null;
  const committed = find(join(root, 'exports', 'cursor'), 'prd-template.mdc');
  if (!built) errors.push('no cursor rule file was written to the chosen folder');
  else if (!committed) errors.push('committed export for prd-template not found');
  else if (readFileSync(built, 'utf8') !== readFileSync(committed, 'utf8')) errors.push('on-demand rule file differs from the committed export');
  if (existsSync(join(out, 'windsurf'))) errors.push('--platform cursor also wrote another platform');
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  if (pkg.files.includes('exports/')) errors.push('package.json ships exports/ again; the package is meant to build them on demand');
  if (!pkg.files.includes('scripts/build-exports.mjs')) errors.push('package.json must ship scripts/build-exports.mjs, which the CLI runs on first use');
} finally { rmSync(out, { recursive: true, force: true }); }
if (errors.length) { console.error(errors.map((e) => `  ✗ ${e}`).join('\n')); process.exit(1); }
console.log('on-demand exports: one platform builds into a chosen folder and matches the committed files. ✓');
