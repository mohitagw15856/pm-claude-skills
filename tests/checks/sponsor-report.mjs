#!/usr/bin/env node
// Runs the sponsor report's own self-test (scripts/sponsor-report.mjs --selftest). No network.
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
process.exit(spawnSync(process.execPath, [join(root, 'scripts', 'sponsor-report.mjs'), '--selftest'], { stdio: 'inherit' }).status ?? 1);
