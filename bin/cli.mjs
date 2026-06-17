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
// Rule-file agents install generated files from exports/<agent> (ext per agent).
const RULEFILE = { cursor: '.mdc', windsurf: '.md', aider: '.md' };
const defaultTarget = (agent) => ({
  claude: join(homedir(), '.claude', 'skills'),
  hermes: join(homedir(), '.hermes', 'skills'),
  codex: join(homedir(), '.codex', 'skills'),
  openclaw: join(homedir(), '.openclaw', 'skills'),
  cursor: join(process.cwd(), '.cursor', 'rules'),
  windsurf: join(process.cwd(), '.windsurf', 'rules'),
  aider: join(process.cwd(), '.aider', 'skills'),
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

function listFiles(dir, ext) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...listFiles(p, ext));
    else if (p.endsWith(ext)) out.push(p);
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
  if (!agent || !(NATIVE.has(agent) || agent in RULEFILE)) {
    console.error(`Error: --agent must be one of: claude, hermes, codex, openclaw, cursor, windsurf, aider.`);
    process.exit(2);
  }
  const skillsDir = join(PKG_ROOT, 'skills');
  if (!existsSync(skillsDir)) { console.error(`Error: bundled skills/ not found at ${skillsDir}.`); process.exit(1); }
  const target = opts.target || defaultTarget(agent);
  let count = 0;

  console.log(`${opts.dryRun ? '[dry-run] ' : ''}Installing for '${agent}' into ${target}`);
  if (!opts.dryRun) mkdirSync(target, { recursive: true });

  if (agent in RULEFILE) {
    const ext = RULEFILE[agent];
    const exportDir = join(PKG_ROOT, 'exports', agent);
    if (!existsSync(exportDir)) { console.error(`Error: ${exportDir} missing.`); process.exit(1); }
    for (const f of listFiles(exportDir, ext).sort()) {
      if (basename(f) === 'README.md') continue;   // skip the generated index
      const dest = join(target, basename(f));
      if (opts.dryRun) console.log(`  would install ${basename(f)} -> ${dest}`);
      else copyFileSync(f, dest);
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
    const note = {
      cursor: `Cursor will pick up the rules in ${target} on its next session.`,
      windsurf: `Windsurf will pick up the rules in ${target} on its next session.`,
      aider: `Load any of them with:  aider --read ${join(target, '<skill>.md')}`,
    }[agent] || `Restart ${agent} — it auto-discovers SKILL.md skills in ${target} by their description.`;
    console.log(note);
  }
}

function list() {
  console.log('Supported agents and default targets:\n');
  for (const a of ['claude', 'hermes', 'codex', 'openclaw', 'cursor', 'windsurf', 'aider']) {
    console.log(`  ${a.padEnd(9)} ${defaultTarget(a)}`);
  }
  console.log('\nNative SKILL.md agents: claude, hermes, codex, openclaw (install skill folders).');
  console.log('Claude also gets subagents + slash commands. Cursor/Windsurf install rule files;');
  console.log('Aider installs conventions you load with "aider --read".');
}

const HELP = `pm-claude-skills — install professional Agent Skills into any AI coding tool.

Usage:
  npx pm-claude-skills add --agent <claude|hermes|codex|openclaw|cursor|windsurf|aider> [--target <path>] [--link] [--dry-run]
  npx pm-claude-skills list
  npx pm-claude-skills --version

Examples:
  npx pm-claude-skills add --agent claude     # skills + subagents + commands
  npx pm-claude-skills add --agent cursor     # .mdc rules into ./.cursor/rules
  npx pm-claude-skills add --agent windsurf   # .md rules into ./.windsurf/rules
  npx pm-claude-skills add --agent codex --link
`;

const opts = parse(process.argv.slice(2));
const cmd = opts._[0];
if (opts.version) console.log(VERSION);
else if (opts.help || !cmd || cmd === 'help') console.log(HELP);
else if (cmd === 'list') list();
else if (cmd === 'add') add(opts);
else { console.error(`Unknown command: ${cmd}\n`); console.log(HELP); process.exit(2); }
