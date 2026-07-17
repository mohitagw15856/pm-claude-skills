// `pm-claude-skills hooks` — one-command ambient install. Copies the hook pack
// to ~/.claude/pm-skills-hooks/ and merges the hooks block into your Claude
// Code settings (backing the file up first). After this, every session has
// judgment ambient in it: context loading, skill nudges, the doc quality gate.
//
//   pm-claude-skills hooks             # install globally (~/.claude)
//   pm-claude-skills hooks --project   # install into ./.claude for this repo
//   pm-claude-skills hooks --remove    # take the pack back out
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, copyFileSync, chmodSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const HOOKS = ['load-context.sh', 'suggest-skill.sh', 'doc-quality-gate.sh', 'commit-changelog-nudge.sh'];
const EVENTS = {
  'load-context.sh': 'UserPromptSubmit',
  'suggest-skill.sh': 'UserPromptSubmit',
  'doc-quality-gate.sh': 'PostToolUse',
  'commit-changelog-nudge.sh': 'PostToolUse',
};

export async function run(argv) {
  if (argv.includes('--help')) {
    console.log('hooks — install the ambient hook pack into Claude Code.\n  pm-claude-skills hooks [--project] [--remove]');
    return 0;
  }
  const base = argv.includes('--project') ? join(process.cwd(), '.claude') : join(process.env.HOME || '', '.claude');
  const dest = join(base, 'pm-skills-hooks');
  const settingsPath = join(base, 'settings.json');
  let settings = {};
  if (existsSync(settingsPath)) {
    try { settings = JSON.parse(readFileSync(settingsPath, 'utf8')); }
    catch { console.error(`${settingsPath} is not valid JSON — fix it first (not touching it).`); return 1; }
    copyFileSync(settingsPath, settingsPath + '.bak');
  }
  settings.hooks = settings.hooks || {};

  if (argv.includes('--remove')) {
    for (const ev of Object.keys(settings.hooks)) {
      settings.hooks[ev] = (settings.hooks[ev] || []).filter((g) => !JSON.stringify(g).includes('pm-skills-hooks'));
      if (!settings.hooks[ev].length) delete settings.hooks[ev];
    }
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
    console.log(`🧹 pm-skills hooks removed from ${settingsPath} (scripts left in ${dest}; backup at settings.json.bak)`);
    return 0;
  }

  mkdirSync(dest, { recursive: true });
  for (const h of HOOKS) {
    copyFileSync(join(PKG_ROOT, 'hooks', h), join(dest, h));
    chmodSync(join(dest, h), 0o755);
  }
  for (const h of HOOKS) {
    const ev = EVENTS[h];
    settings.hooks[ev] = settings.hooks[ev] || [];
    const cmd = `bash ${join(dest, h)}`;
    if (JSON.stringify(settings.hooks[ev]).includes(h)) continue;  // already wired
    settings.hooks[ev].push(
      ev === 'PostToolUse'
        ? { matcher: h === 'doc-quality-gate.sh' ? 'Write|Edit' : 'Bash', hooks: [{ type: 'command', command: cmd }] }
        : { hooks: [{ type: 'command', command: cmd }] }
    );
  }
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
  console.log(`🪝 ambient pack installed → ${dest}
  wired in ${settingsPath} (backup: settings.json.bak)
  · CONTEXT.md auto-loads into every prompt
  · matching skills get nudged when your prompt fits one
  · docs you write get the skill's quality gate applied before you read them
Start a new Claude Code session to feel it. Remove any time: pm-claude-skills hooks --remove`);
  return 0;
}
