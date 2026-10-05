#!/usr/bin/env node
// `profile` and `sync` end to end, in a throwaway folder: the profile is private
// and validated, sync installs exactly the configured set with the profile beside
// it, and sync --check catches missing, edited and wrong-version installs.
import { mkdtempSync, writeFileSync, readFileSync, existsSync, statSync, appendFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = mkdtempSync(join(tmpdir(), 'pm-teams-'));
const env = { ...process.env, XDG_CONFIG_HOME: join(tmp, 'cfg'), PM_SKILLS_PROFILE: '', HOME: tmp };
delete env.PM_SKILLS_PROFILE;
const cli = (args, cwd = tmp) => spawnSync(process.execPath, [join(root, 'bin', 'cli.mjs'), ...args], { cwd, env, encoding: 'utf8', input: '' });
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

try {
  let r = cli(['profile', 'init', '--role', 'Product Manager', '--city', '上海', '--language', '简体中文', '--yes']);
  const pf = join(tmp, 'cfg', 'pm-skills', 'profile.json');
  check('profile init saves', r.status === 0 && existsSync(pf), r.stderr);
  if (process.platform !== 'win32') check('profile is private (0600)', (statSync(pf).mode & 0o777) === 0o600);
  check('profile rejects unknown fields', cli(['profile', 'set', 'salary=1']).status !== 0);
  check('profile rejects markup', cli(['profile', 'set', 'city=<b>']).status !== 0);
  r = cli(['profile', 'context']);
  check('profile context names the city', r.status === 0 && r.stdout.includes('上海'));

  const proj = join(tmp, 'proj');
  spawnSync('mkdir', ['-p', proj]);
  const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
  writeFileSync(join(proj, '.pm-skills.json'), JSON.stringify({ version: `${version.split('.')[0]}.x`, agents: ['claude', 'trae'], bundles: ['pm-korea'], skills: ['lease-decoder'], targets: { claude: 'skills' } }));
  check('check fails before sync', cli(['sync', '--check'], proj).status === 1);
  r = cli(['sync'], proj);
  check('sync installs', r.status === 0, r.stderr);
  check('sync --check passes after sync', cli(['sync', '--check'], proj).status === 0);
  check('native agent gets the profile skill', existsSync(join(proj, 'skills', 'pm-profile', 'SKILL.md')));
  check('generated agent gets an always-on profile rule', /alwaysApply: true/.test(readFileSync(join(proj, '.trae', 'rules', 'pm-profile.md'), 'utf8')));
  check('only the configured skills are installed', !existsSync(join(proj, 'skills', 'prd-template')) && existsSync(join(proj, 'skills', 'kr-work-report')));
  appendFileSync(join(proj, 'skills', 'lease-decoder', 'SKILL.md'), '\nedited\n');
  check('check catches an edited skill', cli(['sync', '--check'], proj).status === 1);
  writeFileSync(join(proj, '.pm-skills.json'), JSON.stringify({ version: '1.x', agents: ['claude'], skills: ['lease-decoder'] }));
  check('check catches a version mismatch', cli(['sync', '--check'], proj).status === 1);
  writeFileSync(join(proj, '.pm-skills.json'), JSON.stringify({ agents: ['claude'], skills: ['../../etc'] }));
  check('bad names are refused', cli(['sync'], proj).status === 2);
  writeFileSync(join(proj, '.pm-skills.json'), JSON.stringify({ agents: ['notatool'], skills: ['lease-decoder'] }));
  check('unknown agents are refused', cli(['sync'], proj).status === 2);
  r = cli(['add', '--agent', 'claude', '--target', join(tmp, 'np', 'skills'), '--bundle', 'pm-korea', '--no-profile']);
  check('--no-profile leaves the profile out', r.status === 0 && !existsSync(join(tmp, 'np', 'skills', 'pm-profile')));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

const failed = results.filter((x) => !x.ok);
for (const f of failed) console.error(`  ✗ ${f.name}${f.detail ? `: ${f.detail.slice(0, 200)}` : ''}`);
console.log(`Teams test: ${results.length - failed.length} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
