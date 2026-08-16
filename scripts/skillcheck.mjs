#!/usr/bin/env node
// SkillCheck, for this repo's own skills.
//
// The validator itself lives in bin/skillcheck.mjs because that directory is
// published — it is what `npx pm-claude-skills skillcheck` and the GitHub
// Action both run. Keeping one implementation means this repo is checked by
// exactly the same rules everyone else's is, which is the only honest way to
// ship a linter.

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
process.argv = [process.argv[0], process.argv[1], '--dir', join(root, 'skills'), ...process.argv.slice(2)];
const { run } = await import('../bin/skillcheck.mjs');
run();
