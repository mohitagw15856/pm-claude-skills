#!/usr/bin/env node
// Runs the bundle sync script's own self-test (scripts/sync-bundles.mjs --selftest).
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
process.exit(spawnSync(process.execPath, [join(root, 'scripts', 'sync-bundles.mjs'), '--selftest'], { stdio: 'inherit' }).status ?? 1);
