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
//   npx pm-claude-skills team check                 is the setup complete and consistent?
//   node bin/team.mjs --selftest
//
// It only creates files. Installing is still `npx pm-claude-skills sync`, and pinning
// versions is still `npx pm-claude-skills lock`. No dependencies.
import { writeFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { loadConfig, satisfies } from './lib/teamconfig.mjs';
import { lint } from './doclint.mjs';

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// The agents the CLI can install for. Kept equal to cli.mjs by a self-test, which reads that file.
const AGENTS = new Set(['claude', 'hermes', 'codex', 'openclaw', 'copilot', 'gemini', 'qwen', 'iflow', 'kimi', 'cursor', 'windsurf', 'aider', 'kilocode', 'trae', 'qoder', 'lingma', 'codebuddy']);
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

// `team check`: is this team's setup in a usable state? Read-only.
export function check(dir, opts = {}) {
  const results = [];
  const add = (ok, label, hint = '') => results.push({ ok, label, hint });
  const cfgPath = join(dir, '.pm-skills.json');
  if (!existsSync(cfgPath)) add(false, '.pm-skills.json is missing', 'Run: npx pm-claude-skills team init');
  else {
    try {
      const cfg = loadConfig(cfgPath, [...AGENTS]);
      add(true, `.pm-skills.json is valid (${(cfg.bundles || []).length} bundle(s), ${(cfg.skills || []).length} extra skill(s), agents: ${(cfg.agents || []).join(', ') || 'none'})`);
      const version = opts.version || VERSION;
      if (cfg.version) add(satisfies(version, cfg.version), `this install is version ${version}; the team agreed on ${cfg.version}`, `Install a matching version: npx pm-claude-skills@${String(cfg.version).replace(/\.x/g, '')} sync`);
    } catch (e) { add(false, `.pm-skills.json is not valid: ${e.message}`); }
  }
  const ctxPath = join(dir, 'CONTEXT.md');
  if (!existsSync(ctxPath)) add(false, 'CONTEXT.md is missing', 'Run: npx pm-claude-skills team init');
  else {
    const { findings } = lint(readFileSync(ctxPath, 'utf8'), { type: 'context' });
    const errors = findings.filter((f) => f.severity === 'error');
    const warnings = findings.filter((f) => f.severity === 'warning');
    add(errors.length === 0, errors.length ? `CONTEXT.md is not finished: ${errors.length} item(s) to fill in (first at line ${errors[0].line}: ${errors[0].message})` : 'CONTEXT.md is filled in and has an owner', 'See them all: npx pm-claude-skills lint CONTEXT.md --type context');
    for (const w of warnings) add(true, `note: CONTEXT.md line ${w.line}: ${w.message}`);
  }
  add(existsSync(join(dir, 'TEAM-ONBOARDING.md')), existsSync(join(dir, 'TEAM-ONBOARDING.md')) ? 'TEAM-ONBOARDING.md is present' : 'TEAM-ONBOARDING.md is missing', 'Run: npx pm-claude-skills team init');
  return results;
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
    // The agent list must not drift from the CLI's own.
    const cli = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'cli.mjs'), 'utf8');
    const native = [...cli.match(/const NATIVE = new Set\(\[([^\]]*)\]\)/)[1].matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]);
    const rulefile = [...cli.match(/const RULEFILE = \{([^}]*)\}/)[1].matchAll(/([a-z0-9-]+):/g)].map((m) => m[1]);
    const generated = [...cli.slice(cli.indexOf('const GENERATED = {')).matchAll(/^  ([a-z][a-z0-9-]*): \{/gm)].map((m) => m[1]);
    eq('the agent list matches cli.mjs', [...AGENTS].sort(), [...new Set([...native, ...rulefile, ...generated])].sort());
    const fresh = mkdtempSync(join(tmpdir(), 'pm-team-check-'));
    try {
      eq('an empty folder fails every check', check(fresh).map((r) => r.ok), [false, false, false]);
      init(fresh, { name: 'Pay', version: '84.1.0', date: '2026-11-28' });
      const before = check(fresh, { version: '84.2.0' });
      eq('a fresh setup has a valid config and an unfinished context', [before[0].ok, before[1].ok, before.find((r) => /CONTEXT/.test(r.label)).ok, before[before.length - 1].ok], [true, true, false, true]);
      eq('a different major version is flagged', check(fresh, { version: '85.0.0' })[1].ok, false);
      writeFileSync(join(fresh, 'CONTEXT.md'), '# Team context: Pay\n\nOwner: Priya · Last reviewed: 2026-11-28\n\n## What we make\nRota software.\n\n## Who it is for\nCare homes.\n\n## Our terms\nShift swap.\n\n## The assistant must never\n- Invent numbers.\n');
      eq('a finished setup passes', check(fresh, { version: '84.2.0' }).every((r) => r.ok), true);
      writeFileSync(join(fresh, '.pm-skills.json'), '{ not json');
      eq('a broken config is reported, not thrown', check(fresh)[0].ok, false);
    } finally { rmSync(fresh, { recursive: true, force: true }); }
  } finally { rmSync(dir, { recursive: true, force: true }); }
  console.log(fails ? `team selftest: ${fails} failure(s)` : 'team selftest: 18 passed ✓');
  return fails ? 1 : 0;
}

export function run(argv = process.argv.slice(2)) {
  if (argv.includes('--selftest')) return selftest();
  const sub = argv.find((a) => !a.startsWith('--'));
  const opt = (name) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : undefined; };
  if (sub === 'check' && !argv.includes('--help')) {
    const results = check(resolve('.'));
    for (const r of results) console.log(`  ${r.ok ? '✓' : '✗'} ${r.label}${!r.ok && r.hint ? `\n      ${r.hint}` : ''}`);
    const failed = results.filter((r) => !r.ok).length;
    console.log(failed ? `\n${failed} thing(s) to fix.` : '\nThe team setup is in good shape. To confirm each laptop matches it: npx pm-claude-skills sync --check');
    return failed ? 1 : 0;
  }
  if (sub !== 'init' || argv.includes('--help')) {
    console.log('Usage: pm-claude-skills team init [--name "Team name"] [--agents claude,cursor] [--bundles pm-daily-ten,pm-team-setup] [--dry-run]\n       pm-claude-skills team check\n\ninit creates .pm-skills.json, CONTEXT.md and TEAM-ONBOARDING.md in the current folder. Existing files are left alone.\ncheck reports whether the config is valid, the context file is filled in and owned, and this install matches the agreed version.');
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
