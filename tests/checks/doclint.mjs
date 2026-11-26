#!/usr/bin/env node
// Runs the document linter's own self-test (bin/doclint.mjs --selftest).
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
process.exit(spawnSync(process.execPath, [join(root, 'bin', 'doclint.mjs'), '--selftest'], { stdio: 'inherit' }).status ?? 1);
