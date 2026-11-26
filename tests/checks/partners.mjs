#!/usr/bin/env node
// Partner registry and its rules (scripts/check-partners.mjs).
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
for (const f of ["scripts/check-partners.mjs", "tests/partners-test.mjs"]) { const r = spawnSync(process.execPath, [join(root, f)], { stdio: "inherit" }); if (r.status !== 0) process.exit(r.status || 1); }
