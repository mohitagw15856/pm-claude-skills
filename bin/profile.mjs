// `pm-claude-skills profile`: a personal profile the skills personalise from.
//
//   npx pm-claude-skills profile init                       # asks for each field (Enter skips)
//   npx pm-claude-skills profile init --role "Product Manager" --city Shanghai --language 简体中文
//   npx pm-claude-skills profile set city=深圳 tone="concise and direct"
//   npx pm-claude-skills profile show [--json]
//   npx pm-claude-skills profile context                    # the block agents read
//   npx pm-claude-skills profile clear
//   npx pm-claude-skills profile path
//
// `add` installs the profile next to the skills when one exists (skip with --no-profile).
import { createInterface } from 'node:readline/promises';
import { FIELDS, profilePath, loadProfile, saveProfile, clearProfile, profileMarkdown, validate } from './lib/profile.mjs';

const HELP = `Usage: pm-claude-skills profile <init|set|show|context|clear|path>

  init [--field value …]   create or update the profile; asks for each field when run in a terminal
  set key=value …          change fields (an empty value removes one)
  show [--json]            print the profile
  context                  print the block that agents read next to the skills
  clear                    delete the profile
  path                     print where it is stored

Fields: ${Object.keys(FIELDS).join(', ')}
Stored only on this computer: ${profilePath()}
After changing it, run "npx pm-claude-skills add --agent <tool>" again to refresh the installed copy.`;

function flagValues(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const m = argv[i].match(/^--([a-z_]+)$/);
    if (m && Object.prototype.hasOwnProperty.call(FIELDS, m[1]) && argv[i + 1] !== undefined) { out[m[1]] = argv[i + 1]; i++; }
  }
  return out;
}

export async function run(argv) {
  const sub = argv[0];
  if (!sub || sub === '--help' || sub === '-h' || sub === 'help') { console.log(HELP); return sub ? 0 : 1; }
  if (sub === 'path') { console.log(profilePath()); return 0; }
  if (sub === 'clear') { console.log(`Removed ${clearProfile()}`); return 0; }
  const current = loadProfile() || {};
  if (sub === 'show') {
    if (argv.includes('--json')) { console.log(JSON.stringify(current, null, 2)); return 0; }
    if (!Object.keys(current).length) { console.log('No profile yet. Run: npx pm-claude-skills profile init'); return 0; }
    for (const k of Object.keys(FIELDS)) if (current[k]) console.log(`${k.padEnd(13)} ${current[k]}`);
    console.log(`\nStored at ${profilePath()}`);
    return 0;
  }
  if (sub === 'context') {
    if (!Object.keys(current).length) { console.error('No profile yet. Run: npx pm-claude-skills profile init'); return 1; }
    process.stdout.write(profileMarkdown(current));
    return 0;
  }
  if (sub === 'set') {
    const next = { ...current };
    const pairs = argv.slice(1).filter((a) => !a.startsWith('--'));
    if (!pairs.length) { console.error('Give at least one key=value, e.g. profile set city=Shanghai'); return 2; }
    for (const pair of pairs) {
      const i = pair.indexOf('=');
      if (i < 1) { console.error(`Expected key=value, got "${pair}".`); return 2; }
      const key = pair.slice(0, i), value = validate(key, pair.slice(i + 1));
      if (value) next[key] = value; else delete next[key];
    }
    console.log(`Saved ${saveProfile(next)}`);
    return 0;
  }
  if (sub === 'init') {
    const next = { ...current, ...flagValues(argv) };
    if (process.stdin.isTTY && !argv.includes('--yes')) {
      const rl = createInterface({ input: process.stdin, output: process.stdout });
      console.log('Press Enter to keep a value or skip a field. Everything stays on this computer.\n');
      for (const [k, hint] of Object.entries(FIELDS)) {
        const answer = (await rl.question(`${hint}\n${k}${next[k] ? ` [${next[k]}]` : ''}: `)).trim();
        if (answer) next[k] = validate(k, answer);
      }
      rl.close();
    }
    for (const k of Object.keys(next)) validate(k, next[k]);
    console.log(`Saved ${saveProfile(next)}`);
    console.log('Run "npx pm-claude-skills add --agent <tool>" to install it next to your skills.');
    return 0;
  }
  console.error(`Unknown profile command "${sub}".\n\n${HELP}`);
  return 2;
}
