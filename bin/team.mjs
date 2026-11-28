#!/usr/bin/env node
// `pm-claude-skills team init`: start a team's shared setup in the current project.
//
// Writes three files and never overwrites one that exists:
//   .pm-skills.json      the skills the team has agreed on, installed with `sync`
//   CONTEXT.md           the shared company context, as a template to fill in
//                        (the load-context hook reads a file with this name)
//   TEAM-ONBOARDING.md   a checklist each person works through
//
//   npx pm-claude-skills team init
//   npx pm-claude-skills team init --name "Payments team" --agents claude,cursor --bundles pm-daily-ten,pm-team-setup
//   npx pm-claude-skills team init --dry-run
//   node bin/team.mjs --selftest
//
// It only creates files. Installing is still `npx pm-claude-skills sync`, and pinning
// versions is still `npx pm-claude-skills lock`. No dependencies.
import { writeFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const AGENTS = new Set(['claude', 'cursor', 'codex', 'windsurf', 'gemini', 'copilot', 'cline', 'zed', 'aider', 'kilocode']);
const VERSION = (() => { try { return createRequire(import.meta.url)('../package.json').version; } catch { return '0.0.0'; } })();

const list = (value, fallback) => (value === undefined ? fallback : String(value).split(',').map((s) => s.trim()).filter(Boolean));

export function plan(opts = {}) {
  const team = String(opts.name ?? 'Our team').replace(/[\r\n]+/g, ' ').trim().slice(0, 80) || 'Our team';
  const agents = list(opts.agents, ['claude']);
  const bundles = list(opts.bundles, ['pm-daily-ten', 'pm-team-setup']);
  for (const a of agents) if (!AGENTS.has(a)) throw new Error(`Unknown agent "${a}". Known: ${[...AGENTS].join(', ')}`);
  for (const b of bundles) if (!NAME.test(b)) throw new Error(`"${b}" is not a bundle name (lowercase letters, numbers and hyphens).`);
  if (!agents.length) throw new Error('Give at least one agent.');
  if (!bundles.length) throw new Error('Give at least one bundle.');
  const major = String(opts.version || VERSION).split('.')[0];
  const date = opts.date || new Date().toISOString().slice(0, 10);

  const config = {
    $schema: 'https://mohitagw15856.github.io/pm-claude-skills/schemas/pm-skills.schema.json',
    version: `${major}.x`,
    agents,
    bundles,
  };
  const context = `# Team context: ${team}

Owner: [name] · Last reviewed: ${date} · Review every: [interval]

This file is read by the assistant on every request. Keep it under about two pages, put
stable facts first, and date anything that changes often. The \`team-context-interview\`
skill will interview you and fill it in.

## What we make
[Two sentences: the product, and what a customer uses it to do. What it is not.]

## Who it is for
[Segments by name. Who buys, who uses. Which segment matters most this year.]

## Our terms
| We say | Not | Meaning |
|--------|-----|---------|
| | | |

## Goals and metrics
| Goal | Metric | Definition | Source |
|------|--------|------------|--------|
| | | | |

## How we write
[Document types, the template for each, tone, length, a good example to copy.]

## Current state (changes often)
[Roadmap themes, recent releases, known issues. Date each line.]

## Constraints
[Regulation, security rules, commitments to customers, what legal must review.]

## The assistant must never
- Invent a customer name, a number, a date or a quote.
- [Add your own rules. For example: include personal data, promise a delivery date.]

## How this file changes
[Who edits it, how to propose a change, when it is next reviewed.]
`;
  const onboarding = `# Onboarding: ${team}

Work through this once. It takes about half an hour.

## Install
- [ ] Install the team's skills: \`npx pm-claude-skills sync\`
- [ ] Check what is installed: \`npx pm-claude-skills doctor\`

## Read
- [ ] Read [CONTEXT.md](CONTEXT.md) and tell the owner about anything wrong or missing.
- [ ] Read the rules below.

## Try it on real work
- [ ] Run one skill on something due this week. Suggested: \`prd-template\`, \`stakeholder-update\` or \`meeting-notes\`.
- [ ] Note where the output was wrong or off-style, and send that to the context owner.

## Rules
1. A person reads everything before it is sent or filed. The assistant drafts; it does not publish.
2. Numbers, dates, names and quotes come from a source, never from the assistant's memory.
3. Do not give the assistant data the company has said must not be shared. [List it here.]
4. When output is wrong, fix the shared file so it is right for everyone, not only your copy.

## Keeping in step
- Skills the team uses are listed in \`.pm-skills.json\`. Change that file in a pull request.
- \`npx pm-claude-skills sync --check\` tells you when your install has drifted.
- \`npx pm-claude-skills lock\` pins exact versions when the team wants them frozen.
`;
  return [
    { path: '.pm-skills.json', content: JSON.stringify(config, null, 2) + '\n' },
    { path: 'CONTEXT.md', content: context },
    { path: 'TEAM-ONBOARDING.md', content: onboarding },
  ];
}

export function init(dir, opts = {}) {
  const files = plan(opts);
  const result = { written: [], skipped: [] };
  for (const f of files) {
    const full = join(dir, f.path);
    if (existsSync(full)) { result.skipped.push(f.path); continue; }
    if (!opts.dryRun) writeFileSync(full, f.content, { flag: 'wx' });
    result.written.push(f.path);
  }
  return result;
}

function selftest() {
  let fails = 0;
  const eq = (label, got, want) => { if (JSON.stringify(got) !== JSON.stringify(want)) { fails++; console.error(`  ✗ ${label}\n      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`); } };
  const throws = (label, fn) => { try { fn(); fails++; console.error(`  ✗ ${label}: did not throw`); } catch { /* expected */ } };
  const dir = mkdtempSync(join(tmpdir(), 'pm-team-'));
  try {
    eq('dry run writes nothing', [init(dir, { dryRun: true }).written.length, existsSync(join(dir, 'CONTEXT.md'))], [3, false]);
    eq('first run writes three files', init(dir, { name: 'Payments', version: '84.1.0', date: '2026-11-28' }), { written: ['.pm-skills.json', 'CONTEXT.md', 'TEAM-ONBOARDING.md'], skipped: [] });
    const cfg = JSON.parse(readFileSync(join(dir, '.pm-skills.json'), 'utf8'));
    eq('config pins the major version and the default set', [cfg.version, cfg.agents, cfg.bundles], ['84.x', ['claude'], ['pm-daily-ten', 'pm-team-setup']]);
    eq('context carries the team name and date', /# Team context: Payments\n\nOwner: \[name\] · Last reviewed: 2026-11-28/.test(readFileSync(join(dir, 'CONTEXT.md'), 'utf8')), true);
    writeFileSync(join(dir, 'CONTEXT.md'), 'edited by the team');
    eq('second run overwrites nothing', init(dir, { name: 'Other' }), { written: [], skipped: ['.pm-skills.json', 'CONTEXT.md', 'TEAM-ONBOARDING.md'] });
    eq('the team\'s edit survived', readFileSync(join(dir, 'CONTEXT.md'), 'utf8'), 'edited by the team');
    eq('a name cannot inject lines', plan({ name: 'A\n## Injected\r\nB' })[1].content.split('\n')[0], '# Team context: A ## Injected B');
    eq('an empty name falls back', plan({ name: '   ' })[1].content.split('\n')[0], '# Team context: Our team');
    eq('agents and bundles are parsed', (() => { const c = JSON.parse(plan({ agents: 'claude, cursor', bundles: 'pm-seo' })[0].content); return [c.agents, c.bundles]; })(), [['claude', 'cursor'], ['pm-seo']]);
    throws('unknown agent is refused', () => plan({ agents: 'notepad' }));
    throws('a bundle name with a path is refused', () => plan({ bundles: '../../etc' }));
    throws('an empty bundle list is refused', () => plan({ bundles: ' , ' }));
  } finally { rmSync(dir, { recursive: true, force: true }); }
  console.log(fails ? `team selftest: ${fails} failure(s)` : 'team selftest: 12 passed ✓');
  return fails ? 1 : 0;
}

export function run(argv = process.argv.slice(2)) {
  if (argv.includes('--selftest')) return selftest();
  const sub = argv.find((a) => !a.startsWith('--'));
  const opt = (name) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : undefined; };
  if (sub !== 'init' || argv.includes('--help')) {
    console.log('Usage: pm-claude-skills team init [--name "Team name"] [--agents claude,cursor] [--bundles pm-daily-ten,pm-team-setup] [--dry-run]\n\nCreates .pm-skills.json, CONTEXT.md and TEAM-ONBOARDING.md in the current folder. Existing files are left alone.');
    return sub === 'init' || argv.includes('--help') ? 0 : 2;
  }
  let result;
  try { result = init(resolve('.'), { name: opt('--name'), agents: opt('--agents'), bundles: opt('--bundles'), dryRun: argv.includes('--dry-run') }); }
  catch (e) { console.error(`Error: ${e.message}`); return 2; }
  for (const f of result.written) console.log(`  ${argv.includes('--dry-run') ? 'would write' : 'wrote'}  ${f}`);
  for (const f of result.skipped) console.log(`  kept         ${f} (already exists)`);
  if (!argv.includes('--dry-run') && result.written.length) console.log('\nNext:\n  1. Fill in CONTEXT.md (the team-context-interview skill will interview you).\n  2. Commit the three files.\n  3. Each person runs: npx pm-claude-skills sync');
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(run());
