#!/usr/bin/env node
// Paid expert-skill registry rules (scripts/check-registry.mjs).
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
for (const f of ["tests/registry-paid-test.mjs"]) { const r = spawnSync(process.execPath, [join(root, f)], { stdio: "inherit" }); if (r.status !== 0) process.exit(r.status || 1); }
