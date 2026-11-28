#!/usr/bin/env node
// Runs the team init command's own self-test (bin/team.mjs --selftest).
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
process.exit(spawnSync(process.execPath, [join(root, 'bin', 'team.mjs'), '--selftest'], { stdio: 'inherit' }).status ?? 1);
