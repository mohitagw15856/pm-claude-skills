// `pm-claude-skills githook` — a git pre-commit hook that checks only what the
// commit touches: SKILL.md files go through SkillCheck (and the repository's
// own skill audit when it is present), contracts through the schema check,
// pipelines and the red-team corpus through theirs. Contributors get a green
// first push and the project spends fewer Actions minutes.
//
//   pm-claude-skills githook install     # write .git/hooks/pre-commit (respects core.hooksPath)
//   pm-claude-skills githook remove      # take it out again, leaving anything else in the file
//   pm-claude-skills githook run         # what the hook runs; usable by hand or from another hook
//
// The hook calls this repository's bin/cli.mjs when the commit is inside the
// library (no network), and `npx -y pm-claude-skills` anywhere else.
import { readFileSync, writeFileSync, existsSync, chmodSync, mkdirSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const START = '# >>> pm-skills githook >>>';
const END = '# <<< pm-skills githook <<<';
const BLOCK = `${START}
# Checks only the staged SKILL.md, contract, pipeline and red-team files (pm-claude-skills githook).
if [ -f bin/cli.mjs ] && [ -d skills ]; then node bin/cli.mjs githook run || exit 1
else npx -y pm-claude-skills githook run || exit 1; fi
${END}
`;

const git = (args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

function hookPath() {
  const top = git(['rev-parse', '--show-toplevel']);
  let dir;
  try { dir = git(['config', '--get', 'core.hooksPath']); } catch { dir = ''; }
  dir = dir ? resolve(top, dir) : join(git(['rev-parse', '--git-dir']).replace(/^(?!\/)/, top + '/'), 'hooks');
  return join(dir, 'pre-commit');
}

function install() {
  const p = hookPath();
  mkdirSync(dirname(p), { recursive: true });
  let text = existsSync(p) ? readFileSync(p, 'utf8') : '#!/bin/sh\n';
  if (text.includes(START)) { console.log(`Already installed: ${p}`); return 0; }
  if (!text.startsWith('#!')) text = '#!/bin/sh\n' + text;
  if (!text.endsWith('\n')) text += '\n';
  writeFileSync(p, text + BLOCK);
  chmodSync(p, 0o755);
  console.log(`Installed the pre-commit check in ${p}${text.trim() !== '#!/bin/sh' ? ' (appended to the existing hook)' : ''}.`);
  return 0;
}

function remove() {
  const p = hookPath();
  if (!existsSync(p)) { console.log('No pre-commit hook to change.'); return 0; }
  const text = readFileSync(p, 'utf8');
  if (!text.includes(START)) { console.log(`Not installed in ${p}; nothing changed.`); return 0; }
  const out = text.slice(0, text.indexOf(START)) + text.slice(text.indexOf(END) + END.length + 1);
  writeFileSync(p, out);
  console.log(`Removed the pm-skills block from ${p}${out.trim() !== '#!/bin/sh' ? '; the rest of the hook is untouched' : ''}.`);
  return 0;
}

function staged() {
  try { return git(['diff', '--cached', '--name-only', '--diff-filter=ACMR']).split('\n').filter(Boolean); }
  catch { return []; }
}

function runStep(label, cmd, args) {
  process.stdout.write(`  ${label} … `);
  const r = spawnSync(cmd, args, { encoding: 'utf8' });
  if (r.status === 0) { console.log('ok'); return true; }
  console.log('failed');
  process.stdout.write((r.stdout || '') + (r.stderr || ''));
  return false;
}

function run() {
  const files = staged();
  const top = (() => { try { return git(['rev-parse', '--show-toplevel']); } catch { return process.cwd(); } })();
  const inLibrary = existsSync(join(top, 'scripts', 'skill-audit.mjs')) && existsSync(join(top, 'skills'));
  const skillFiles = files.filter((f) => /(^|\/)SKILL\.md$/.test(f));
  const schemaFiles = files.filter((f) => /^schemas\//.test(f));
  const pipelineFiles = files.filter((f) => /^pipelines\//.test(f));
  const adversarial = files.filter((f) => /^evals\/adversarial\//.test(f) || skillFiles.some((s) => /^skills\/(agent-|computer-use|human-in-the-loop|mcp-server|voice-agent)/.test(s)));
  if (!skillFiles.length && !schemaFiles.length && !pipelineFiles.length && !adversarial.length) return 0;

  console.log('pm-skills pre-commit:');
  let ok = true;
  if (skillFiles.length) {
    // SkillCheck validates a directory of skills, so the changed skills are staged
    // into a scratch folder (SKILL.md plus any sibling files) and checked there.
    const scratch = mkdtempSync(join(tmpdir(), 'pm-skills-hook-'));
    const names = [];
    for (const d of new Set(skillFiles.map((f) => dirname(f)))) {
      const name = d.split('/').pop();
      if (existsSync(join(top, d))) { cpSync(join(top, d), join(scratch, name), { recursive: true }); names.push(name); }
    }
    ok = runStep(`SkillCheck ${names.join(', ')}`, process.execPath, [join(PKG_ROOT, 'bin', 'skillcheck.mjs'), '--dir', scratch, '--strict']) && ok;
    rmSync(scratch, { recursive: true, force: true });
    if (inLibrary) ok = runStep('skill audit (prompt-injection and override phrases)', process.execPath, [join(top, 'scripts', 'skill-audit.mjs')]) && ok;
  }
  if (schemaFiles.length && inLibrary) ok = runStep('typed contracts', process.execPath, [join(top, 'scripts', 'check-skill-schemas.mjs')]) && ok;
  if ((pipelineFiles.length || schemaFiles.length) && inLibrary) ok = runStep('pipelines against contracts', process.execPath, [join(top, 'scripts', 'check-pipelines.mjs')]) && ok;
  if (adversarial.length && inLibrary) ok = runStep('red-team corpus', process.execPath, [join(top, 'scripts', 'check-adversarial.mjs')]) && ok;
  if (!ok) console.error('\nFix the findings above, or commit with --no-verify to skip this check once.');
  return ok ? 0 : 1;
}

export async function main(argv) {
  const sub = argv[0];
  if (!sub || sub === '--help' || sub === '-h') {
    console.log('githook — a pre-commit hook that checks only the staged skill files.\n  pm-claude-skills githook install | remove | run');
    return sub ? 0 : 1;
  }
  if (sub === 'install') return install();
  if (sub === 'remove') return remove();
  if (sub === 'run') return run();
  console.error(`Unknown subcommand "${sub}". Use install, remove or run.`);
  return 2;
}
