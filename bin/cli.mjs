#!/usr/bin/env node
// pm-claude-skills — cross-platform installer for the skill library.
// Works on Windows / macOS / Linux (pure Node, no bash, no git required).
//
//   npx pm-claude-skills add --agent codex
//   npx pm-claude-skills add --agent claude        # skills + subagents + commands
//   npx pm-claude-skills add --agent cursor        # .mdc rules into ./.cursor/rules
//   npx pm-claude-skills list
//
// Flags for `add`:
//   --agent <name>   claude | hermes | codex | openclaw | cursor   (required)
//   --target <path>  override the default install directory
//   --link           symlink instead of copy (native agents; falls back to copy)
//   --dry-run        print what would happen without writing
import { readdirSync, existsSync, mkdirSync, rmSync, cpSync, symlinkSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { createRequire } from 'node:module';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const VERSION = (() => {
  try { return createRequire(import.meta.url)('../package.json').version; } catch { return '0.0.0'; }
})();

const NATIVE = new Set(['claude', 'hermes', 'codex', 'openclaw']);
const defaultTarget = (agent) => ({
  claude: join(homedir(), '.claude', 'skills'),
  hermes: join(homedir(), '.hermes', 'skills'),
  codex: join(homedir(), '.codex', 'skills'),
  openclaw: join(homedir(), '.openclaw', 'skills'),
  cursor: join(process.cwd(), '.cursor', 'rules'),
}[agent]);

function parse(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--link') out.link = true;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else if (a === '--version' || a === '-v') out.version = true;
    else if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
    else out._.push(a);
  }
  return out;
}

function listMdc(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...listMdc(p));
    else if (p.endsWith('.mdc')) out.push(p);
  }
  return out;
}

function placeDir(src, dest, { link, dryRun }) {
  if (dryRun) { console.log(`  would install ${basename(src)} -> ${dest}`); return; }
  rmSync(dest, { recursive: true, force: true });
  if (link) {
    try { symlinkSync(src, dest, 'dir'); return; }
    catch { console.warn(`  (symlink unavailable, copying ${basename(src)})`); }
  }
  cpSync(src, dest, { recursive: true });
}

function add(opts) {
  const agent = opts.agent;
  if (!agent || !(NATIVE.has(agent) || agent === 'cursor')) {
    console.error(`Error: --agent must be one of: claude, hermes, codex, openclaw, cursor.`);
    process.exit(2);
  }
  const skillsDir = join(PKG_ROOT, 'skills');
  if (!existsSync(skillsDir)) { console.error(`Error: bundled skills/ not found at ${skillsDir}.`); process.exit(1); }
  const target = opts.target || defaultTarget(agent);
  let count = 0;

  console.log(`${opts.dryRun ? '[dry-run] ' : ''}Installing for '${agent}' into ${target}`);
  if (!opts.dryRun) mkdirSync(target, { recursive: true });

  if (agent === 'cursor') {
    const cursorDir = join(PKG_ROOT, 'exports', 'cursor');
    if (!existsSync(cursorDir)) { console.error(`Error: ${cursorDir} missing.`); process.exit(1); }
    for (const mdc of listMdc(cursorDir).sort()) {
      const dest = join(target, basename(mdc));
      if (opts.dryRun) console.log(`  would install ${basename(mdc)} -> ${dest}`);
      else copyFileSync(mdc, dest);
      count++;
    }
  } else {
    for (const name of readdirSync(skillsDir)) {
      const src = join(skillsDir, name);
      if (!existsSync(join(src, 'SKILL.md'))) continue;
      placeDir(src, join(target, name), opts);
      count++;
    }
    // Claude Code also gets subagents and slash commands.
    if (agent === 'claude') {
      const claudeRoot = dirname(target);
      for (const kind of ['agents', 'commands']) {
        const src = join(PKG_ROOT, kind);
        if (!existsSync(src)) continue;
        const dest = join(claudeRoot, kind);
        if (!opts.dryRun) mkdirSync(dest, { recursive: true });
        for (const f of readdirSync(src)) {
          if (!f.endsWith('.md') || f === 'README.md') continue;
          if (opts.dryRun) console.log(`  would install ${kind}/${f} -> ${join(dest, f)}`);
          else copyFileSync(join(src, f), join(dest, f));
          count++;
        }
      }
    }
  }

  console.log(`\n${opts.dryRun ? 'Would install' : 'Installed'} ${count} item(s) for '${agent}'.`);
  if (!opts.dryRun) {
    console.log(agent === 'cursor'
      ? `Cursor will pick up the rules in ${target} on its next session.`
      : `Restart ${agent} — it auto-discovers SKILL.md skills in ${target} by their description.`);
  }
}

function list() {
  console.log('Supported agents and default targets:\n');
  for (const a of ['claude', 'hermes', 'codex', 'openclaw', 'cursor']) {
    console.log(`  ${a.padEnd(9)} ${defaultTarget(a)}`);
  }
  console.log('\nNative SKILL.md agents: claude, hermes, codex, openclaw (install skill folders).');
  console.log('Claude also gets subagents + slash commands. Cursor installs .mdc rules.');
}

const HELP = `pm-claude-skills — install professional Agent Skills into any AI coding tool.

Usage:
  npx pm-claude-skills add --agent <claude|hermes|codex|openclaw|cursor> [--target <path>] [--link] [--dry-run]
  npx pm-claude-skills list
  npx pm-claude-skills --version

Examples:
  npx pm-claude-skills add --agent claude     # skills + subagents + commands
  npx pm-claude-skills add --agent cursor     # .mdc rules into ./.cursor/rules
  npx pm-claude-skills add --agent codex --link
`;

const opts = parse(process.argv.slice(2));
const cmd = opts._[0];
if (opts.version) console.log(VERSION);
else if (opts.help || !cmd || cmd === 'help') console.log(HELP);
else if (cmd === 'list') list();
else if (cmd === 'add') add(opts);
else { console.error(`Unknown command: ${cmd}\n`); console.log(HELP); process.exit(2); }
