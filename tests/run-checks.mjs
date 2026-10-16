#!/usr/bin/env node
// Runs every check in tests/checks/ (one small file per feature), so a new check
// is a new file rather than another edit to the one-line "check" script in
// package.json. Part of npm run check; stops at the first failure.
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), 'checks');
const files = readdirSync(dir).filter((f) => f.endsWith('.mjs')).sort();
for (const f of files) {
  const r = spawnSync(process.execPath, [join(dir, f)], { stdio: 'inherit' });
  if (r.status !== 0) { console.error(`✗ tests/checks/${f} failed`); process.exit(r.status || 1); }
}
console.log(`tests/checks: ${files.length} check(s) passed. ✓`);
