// `pm-claude-skills memory` — one plain-text file that every skill reads first.
//
// Skills personalise from a short memory: who you are, what you are working on,
// the facts you are tired of repeating. The convention (docs/MEMORY-CONVENTION.md)
// is a single Markdown file, project first then home:
//
//   ./.pm-skills/memory.md        this project (commit it, or add it to .gitignore)
//   ~/.pm-skills/memory.md        you, on this machine (PM_SKILLS_HOME overrides ~/.pm-skills)
//
//   pm-claude-skills memory show            # print the active file and where it is
//   pm-claude-skills memory set "text"      # append a line to the project file (--global for home)
//   pm-claude-skills memory set --file f.md # replace the file with f.md
//   pm-claude-skills memory clear           # delete the project file (--global for home)
//   pm-claude-skills memory path            # print the path skills should read
//
// Nothing here leaves your machine. The file is inert text until a skill reads it.
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync, appendFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';

const HOME_DIR = process.env.PM_SKILLS_HOME || join(homedir(), '.pm-skills');
const PROJECT = join(process.cwd(), '.pm-skills', 'memory.md');
const GLOBAL = join(HOME_DIR, 'memory.md');
const MAX_BYTES = 16 * 1024;

const TEMPLATE = `# Memory

Skills read this file first. Keep it short (under 16 KB) and factual.

## Who I am

## What I am working on

## Facts to remember
`;

function parseArgs(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--global' || a === '-g') o.global = true;
    else if (a === '--file') o.file = argv[++i];
    else if (a === '--json') o.json = true;
    else o._.push(a);
  }
  return o;
}

export async function run(argv) {
  const o = parseArgs(argv);
  const sub = o._[0] || 'show';
  const target = o.global ? GLOBAL : PROJECT;
  const active = existsSync(PROJECT) ? PROJECT : existsSync(GLOBAL) ? GLOBAL : null;

  if (sub === 'path') { console.log(active || PROJECT); return 0; }

  if (sub === 'show') {
    if (!active) {
      console.log(`No memory file yet. Start one with:\n  npx pm-claude-skills memory set "I am a product manager at a B2B fintech; we ship fortnightly"\nIt will live at ${PROJECT} (add --global for ${GLOBAL}).`);
      return 0;
    }
    const text = readFileSync(active, 'utf8');
    if (o.json) { console.log(JSON.stringify({ path: active, scope: active === PROJECT ? 'project' : 'global', bytes: Buffer.byteLength(text), text })); return 0; }
    console.log(`\x1b[2m${active} (${active === PROJECT ? 'project' : 'global'}, ${Buffer.byteLength(text)} bytes)\x1b[0m\n`);
    process.stdout.write(text.endsWith('\n') ? text : text + '\n');
    if (active === PROJECT && existsSync(GLOBAL)) console.log(`\x1b[2mA global file also exists at ${GLOBAL}; the project file wins.\x1b[0m`);
    return 0;
  }

  if (sub === 'set') {
    mkdirSync(join(target, '..'), { recursive: true });
    if (o.file) {
      const src = resolve(o.file);
      if (!existsSync(src)) { console.error(`Error: ${src} does not exist.`); return 2; }
      const text = readFileSync(src, 'utf8');
      if (Buffer.byteLength(text) > MAX_BYTES) { console.error(`Error: ${o.file} is over 16 KB. Memory is for facts, not documents.`); return 2; }
      writeFileSync(target, text.endsWith('\n') ? text : text + '\n');
      console.log(`Replaced ${target} from ${o.file}.`);
      return 0;
    }
    const line = o._.slice(1).join(' ').trim();
    if (!line) { console.error('Usage: pm-claude-skills memory set "a fact worth remembering"  (or --file notes.md)'); return 2; }
    if (!existsSync(target)) writeFileSync(target, TEMPLATE);
    const current = readFileSync(target, 'utf8');
    if (Buffer.byteLength(current) + line.length + 3 > MAX_BYTES) { console.error('Error: memory is at its 16 KB limit. Run: pm-claude-skills memory show, and trim it.'); return 2; }
    appendFileSync(target, `${current.endsWith('\n') ? '' : '\n'}- ${line}\n`);
    console.log(`Remembered in ${target}.`);
    return 0;
  }

  if (sub === 'clear') {
    if (!existsSync(target)) { console.log(`Nothing at ${target}.`); return 0; }
    rmSync(target);
    console.log(`Removed ${target}.`);
    return 0;
  }

  console.error(`Unknown memory command "${sub}". Use: show | set | clear | path`);
  return 2;
}
