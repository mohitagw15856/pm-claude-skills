// Tests for `setup`, `update` and `uninstall` (bin/cli.mjs), run as a real
// subprocess so they cover parsing, planning, backups, the manifest and the
// only-remove-what-we-wrote guarantee. State is isolated via PM_SKILLS_HOME.
//   node tests/setup-test.mjs
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLI = join(root, 'bin', 'cli.mjs');
const BUNDLE = 'pm-thinking';

let failures = 0;
const check = (name, cond, detail = '') => {
  if (cond) { console.log(`  ✓ ${name}`); } else { failures++; console.error(`  ✗ ${name}${detail ? ` :: ${detail}` : ''}`); }
};
const run = (args, env = {}) => execFileSync(process.execPath, [CLI, ...args], {
  cwd: root, encoding: 'utf8', env: { ...process.env, ...env },
});

const base = mkdtempSync(join(tmpdir(), 'pm-setup-test-'));
const state = join(base, 'state');
const target = join(base, 'claude', 'skills');   // basename "skills" exercises the Claude extras path
const env = { PM_SKILLS_HOME: state };

console.log('setup --dry-run writes nothing');
let out = run(['setup', '--yes', '--agents', 'claude', '--bundle', BUNDLE, '--target', target, '--dry-run'], env);
check('plan names the agent and target', out.includes('claude') && out.includes(target));
check('dry-run announces itself', /dry-run/i.test(out));
check('no files written', !existsSync(target));
check('no manifest written', !existsSync(join(state, 'installs.json')));

console.log('setup --yes installs and records a manifest');
out = run(['setup', '--yes', '--agents', 'claude', '--bundle', BUNDLE, '--target', target, '--no-profile'], env);
const installed = existsSync(target) ? readdirSync(target).filter((n) => existsSync(join(target, n, 'SKILL.md'))) : [];
check('skills installed', installed.length > 0, `found ${installed.length}`);
check('manifest records the install', existsSync(join(state, 'installs.json')) && readFileSync(join(state, 'installs.json'), 'utf8').includes('"claude"'));
check('next steps mention MCP', out.includes('claude mcp add pm-skills'));
const firstCount = installed.length;

console.log('re-run is idempotent and backs up the existing target');
out = run(['setup', '--yes', '--agents', 'claude', '--bundle', BUNDLE, '--target', target, '--no-profile'], env);
const second = readdirSync(target).filter((n) => existsSync(join(target, n, 'SKILL.md')));
check('same skill count after re-run', second.length === firstCount, `${second.length} vs ${firstCount}`);
const backups = existsSync(join(state, 'backups')) ? readdirSync(join(state, 'backups')) : [];
check('a backup was taken before overwriting', backups.length >= 1);
check('backup contains the previous install', backups.some((ts) => existsSync(join(state, 'backups', ts, 'claude'))));

console.log('uninstall removes only what the library wrote');
const foreign = join(target, 'my-own-skill');
mkdirSync(foreign, { recursive: true });
writeFileSync(join(foreign, 'SKILL.md'), '---\nname: my-own-skill\ndescription: mine\n---\nkeep me\n');
out = run(['uninstall', '--yes', '--agent', 'claude', '--target', target], env);
check('library skills removed', readdirSync(target).filter((n) => n !== 'my-own-skill' && existsSync(join(target, n, 'SKILL.md'))).length === 0);
check('foreign skill survives', existsSync(join(foreign, 'SKILL.md')));
check('manifest entry cleared', !readFileSync(join(state, 'installs.json'), 'utf8').includes('"claude"'));

console.log('update refuses politely with nothing recorded');
let refused = false;
try { run(['update'], { PM_SKILLS_HOME: join(base, 'empty-state') }); }
catch (e) { refused = true; check('update names the remedy', String(e.stderr || '').includes('setup')); }
check('update exits non-zero with no manifest', refused);

rmSync(base, { recursive: true, force: true });
if (failures) { console.error(`\n${failures} failure(s)`); process.exit(1); }
console.log('\nAll setup CLI tests passed. ✓');
