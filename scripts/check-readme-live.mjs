#!/usr/bin/env node
// README image gate: every live image or page a README links under
// https://mohitagw15856.github.io/pm-claude-skills/live/ must be one that
// scripts/build-readme-live.mjs (or build-live-png.mjs) actually produces, so a
// renamed card can never leave a README pointing at a 404.
//
// Builds the live cards offline into a temporary folder and compares.
//
//   node scripts/check-readme-live.mjs                  # exit 1 on a missing file
//   node scripts/check-readme-live.mjs --dir web/live   # check an existing build instead
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/check-readme-live.mjs [--dir <built web/live>]');
  process.exit(0);
}
const i = argv.indexOf('--dir');
let dir = i !== -1 && argv[i + 1] ? resolve(root, argv[i + 1]) : null;
let tmp = null;
if (!dir) {
  tmp = mkdtempSync(join(tmpdir(), 'readme-live-'));
  execFileSync(process.execPath, [join(root, 'scripts', 'build-readme-live.mjs'), '--offline', '--out', tmp], { stdio: 'ignore' });
  dir = tmp;
}

const BASE = 'https://mohitagw15856.github.io/pm-claude-skills/live/';
// PNG copies need resvg, which a bare checkout may not have; a PNG is fine when its SVG exists.
const PNG_OK = (p) => /^png\/[a-z0-9-]+\.png$/.test(p) && existsSync(join(dir, p.replace(/^png\//, '').replace(/\.png$/, '.svg')));
const readmes = readdirSync(root).filter((f) => /^README(\.[\w-]+)?\.md$/.test(f));
const missing = [];
let refs = 0;
for (const f of readmes) {
  const text = readFileSync(join(root, f), 'utf8');
  for (const m of text.matchAll(/https:\/\/mohitagw15856\.github\.io\/pm-claude-skills\/live\/([A-Za-z0-9._\/-]+)/g)) {
    const path = m[1].replace(/[).,]+$/, '');
    refs++;
    if (path.includes('..')) { missing.push(`${f}: ${path} (path traversal)`); continue; }
    if (!existsSync(join(dir, path)) && !PNG_OK(path)) missing.push(`${f}: ${BASE}${path}`);
  }
}
if (tmp) rmSync(tmp, { recursive: true, force: true });
if (missing.length) {
  console.error(`README live images: ${missing.length} link(s) to files the build does not produce:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}
console.log(`README live images: ${refs} link(s) across ${readmes.length} README(s), all produced by the build. ✓`);
