// `pm-claude-skills subscribe` — skills as standing subscriptions. A skill that
// runs on a schedule against a living input (a CSV export, a notes file), files
// dated artifacts into brain/artifacts, and DIFFS against last time: the run's
// headline is what CHANGED, not what is.
//
//   pm-claude-skills subscribe churn-analysis --input ./exports/latest.csv --weekly monday
//   pm-claude-skills subscribe run churn-analysis --input ./exports/latest.csv   # run one cycle now
//   pm-claude-skills subscribe list | unsubscribe <skill>
//
// Scheduled runs need ANTHROPIC_API_KEY visible to launchd/cron. Artifacts:
// brain/subscriptions/<skill>/<date>.md (+ latest.md symlink-copy + CHANGES.md).
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { install, uninstall, list } from './lib/scheduler.mjs';
import { complete, parseSkill } from './lib/anthropic.mjs';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const getArg = (argv, n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const DAYS = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };
const today = () => new Date().toISOString().slice(0, 10);

async function runCycle(skill, inputPath, model) {
  const file = join(PKG_ROOT, 'skills', skill, 'SKILL.md');
  if (!existsSync(file)) { console.error(`Unknown skill "${skill}".`); return 1; }
  if (!existsSync(inputPath)) { console.error(`Input not found: ${inputPath}`); return 1; }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { console.error('ANTHROPIC_API_KEY not set.'); return 1; }
  const dir = join(process.cwd(), 'brain', 'subscriptions', skill);
  mkdirSync(dir, { recursive: true });
  const prev = existsSync(join(dir, 'latest.md')) ? readFileSync(join(dir, 'latest.md'), 'utf8') : null;
  const { body } = parseSkill(readFileSync(file, 'utf8'));
  const input = readFileSync(inputPath, 'utf8').slice(0, 60000);
  console.error(`⏰ ${skill} ← ${inputPath}${prev ? ' (diffing vs last run)' : ' (first run)'}`);
  const out = await complete({ apiKey, model: model || 'claude-sonnet-4-6', maxTokens: 8192,
    system: body + '\n\n---\nExecute this skill on the input below. This is a RECURRING run.' +
      (prev ? ' The previous run\'s output is provided — begin your output with a "## What changed since last run" section (3-6 bullets, most decision-relevant first, honest "nothing material" if true), THEN the full artifact.' : ''),
    messages: [{ role: 'user', content: 'INPUT:\n' + input + (prev ? '\n\nPREVIOUS RUN OUTPUT:\n' + prev.slice(0, 20000) : '') }] });
  const dated = join(dir, today() + '.md');
  writeFileSync(dated, out + '\n');
  copyFileSync(dated, join(dir, 'latest.md'));
  const changes = (out.match(/## What changed[\s\S]*?(?=\n## |$)/) || [''])[0];
  if (changes) writeFileSync(join(dir, 'CHANGES.md'), `# ${skill} — last delta (${today()})\n\n${changes}\n`);
  console.error(`✅ ${dated}${changes ? ' · delta → CHANGES.md' : ''}`);
  return 0;
}

export async function run(argv) {
  const a0 = argv[0];
  if (a0 === 'list') { const l = list().filter((n) => n.startsWith('sub-')); console.log(l.length ? l.map((x) => '  ⏰ ' + x.slice(4)).join('\n') : 'No subscriptions.'); return 0; }
  if (a0 === 'unsubscribe') { console.log(uninstall('sub-' + argv[1]) ? '⏰ Unsubscribed ' + argv[1] : 'No such subscription.'); return 0; }
  if (a0 === 'run') return runCycle(argv[1], getArg(argv, 'input'), getArg(argv, 'model'));

  const skill = a0 && !a0.startsWith('--') ? a0 : null;
  const input = getArg(argv, 'input');
  if (!skill || !input) {
    console.log(`Standing skills — a skill that runs on a schedule and reports what CHANGED.

  pm-claude-skills subscribe <skill> --input <file> [--weekly monday | --daily] [--hour 6]
  pm-claude-skills subscribe run <skill> --input <file>     # one cycle now
  pm-claude-skills subscribe list | unsubscribe <skill>

Artifacts land in brain/subscriptions/<skill>/ — dated runs, latest.md, and
CHANGES.md (the delta since last run, which is the part worth reading).`);
    return skill ? 0 : 1;
  }
  const weekly = getArg(argv, 'weekly', null);
  const hour = +getArg(argv, 'hour', 6);
  const cron = weekly ? `0 ${hour} * * ${DAYS[weekly.toLowerCase()] ?? 1}` : null;
  const r = install('sub-' + skill,
    [process.execPath, join(dirname(fileURLToPath(import.meta.url)), 'cli.mjs'), 'subscribe', 'run', skill, '--input', input],
    { hour, minute: 0, cron });
  mkdirSync(join(process.cwd(), '.pm-skills'), { recursive: true });
  console.log(`⏰ Subscribed: ${skill} ← ${input}  (${r.kind}, ${weekly ? 'weekly ' + weekly : r.when})\n   First cycle now:  pm-claude-skills subscribe run ${skill} --input ${input}`);
  return 0;
}
