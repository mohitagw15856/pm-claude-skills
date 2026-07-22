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
import { readdirSync, existsSync, mkdirSync, rmSync, cpSync, symlinkSync, copyFileSync, statSync, readFileSync } from 'node:fs';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import { createRequire } from 'node:module';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const STAR = '⭐ Find this useful? Star the repo: https://github.com/mohitagw15856/pm-claude-skills\n💛 The free playground runs are sponsor-funded — fund more: https://github.com/sponsors/mohitagw15856';
const VERSION = (() => {
  try { return createRequire(import.meta.url)('../package.json').version; } catch { return '0.0.0'; }
})();

const NATIVE = new Set(['claude', 'hermes', 'codex', 'openclaw']);
// Rule-file agents install generated files from exports/<agent> (ext per agent).
const RULEFILE = { cursor: '.mdc', windsurf: '.md', aider: '.md', kilocode: '.md' };
const defaultTarget = (agent) => ({
  claude: join(homedir(), '.claude', 'skills'),
  hermes: join(homedir(), '.hermes', 'skills'),
  codex: join(homedir(), '.codex', 'skills'),
  openclaw: join(homedir(), '.openclaw', 'skills'),
  cursor: join(process.cwd(), '.cursor', 'rules'),
  windsurf: join(process.cwd(), '.windsurf', 'rules'),
  aider: join(process.cwd(), '.aider', 'skills'),
  kilocode: join(process.cwd(), '.kilocode', 'rules'),
}[agent]);

function parse(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--link') out.link = true;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--json') out.json = true;
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

const PLAYGROUND = 'https://mohitagw15856.github.io/pm-claude-skills';

// Read a skill's YAML frontmatter (name + description) without a YAML dependency.
function readFrontmatter(file) {
  const txt = readFileSync(file, 'utf8');
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

// Build an index of the bundled skills from skills/<name>/SKILL.md frontmatter.
function readSkillIndex() {
  const skillsDir = join(PKG_ROOT, 'skills');
  if (!existsSync(skillsDir)) return [];
  const out = [];
  for (const e of readdirSync(skillsDir)) {
    const p = join(skillsDir, e, 'SKILL.md');
    if (!existsSync(p)) continue;
    const fm = readFrontmatter(p);
    out.push({ name: fm.name || e, description: fm.description || '' });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

// `search [query…]` — find skills by name/description. `--json` for tooling
// (Raycast / Alfred / scripts), `--limit N` to cap results.
function search(opts) {
  const terms = opts._.slice(1).map((t) => String(t).toLowerCase()).filter(Boolean);
  let items = readSkillIndex();
  if (terms.length) {
    items = items
      .map((s) => {
        const name = s.name.toLowerCase();
        const hay = `${name} ${s.description.toLowerCase()}`;
        let score = 0;
        for (const t of terms) {
          if (!hay.includes(t)) return { ...s, score: -1 };
          score += name.includes(t) ? 2 : 1;
          if (name === t) score += 3;
        }
        return { ...s, score };
      })
      .filter((s) => s.score >= 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  }
  let limit;
  if (opts.limit != null) {
    const parsed = Number(opts.limit);
    if (!Number.isInteger(parsed) || parsed < 1) {
      console.error(`Error: --limit must be a positive integer (got "${opts.limit}").`);
      process.exit(2);
    }
    limit = parsed;
  } else {
    limit = opts.json ? items.length : 25;
  }
  const shown = items.slice(0, limit);

  if (opts.json) {
    console.log(JSON.stringify(shown.map(({ name, description }) => ({
      name,
      description,
      summary: description.split(/(?<=[.!?])\s/)[0],
      url: `${PLAYGROUND}/?skill=${name}`,
    })), null, 2));
    return;
  }
  if (!shown.length) {
    console.log(`No skills match "${terms.join(' ')}". Try a broader term, or: npx pm-claude-skills search`);
    return;
  }
  const q = terms.length ? ` matching "${terms.join(' ')}"` : '';
  const more = items.length > shown.length ? `  (showing ${shown.length} of ${items.length} — narrow your query or pass --limit)` : '';
  console.log(`${items.length} skill(s)${q}:${more}\n`);
  for (const s of shown) {
    const summary = s.description.split(/(?<=[.!?])\s/)[0].slice(0, 100);
    console.log(`  \x1b[1m${s.name}\x1b[0m`);
    if (summary) console.log(`    ${summary}`);
    console.log(`    ▶ ${PLAYGROUND}/?skill=${s.name}`);
  }
  console.log(`\nRun one:   npx pm-claude-skills run <skill> --text "…"`);
  console.log(`Install:   npx pm-claude-skills add --agent claude`);
  console.log(`\n${STAR}`);
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
    console.error(`Error: --agent must be one of: claude, hermes, codex, openclaw, cursor, windsurf, aider, kilocode.`);
    process.exit(2);
  }
  const skillsDir = join(PKG_ROOT, 'skills');
  if (!existsSync(skillsDir)) { console.error(`Error: bundled skills/ not found at ${skillsDir}.`); process.exit(1); }
  const target = resolve(opts.target || defaultTarget(agent));

  // Guard against installing into system-critical directories (e.g. a typo'd --target).
  const criticalPaths = ['/', '/usr', '/bin', '/etc', '/var', '/root', '/boot', '/proc', '/sys', '/dev'];
  if (criticalPaths.includes(target)) {
    console.error(`Error: Cannot install into a system-critical directory: ${target}`);
    process.exit(1);
  }

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
    if (opts.private) console.log('  note: --private overlay applies to native agents (claude/hermes/codex/openclaw); for rule-file agents, use `serve --private` or export your private skills first.');
  } else {
    for (const name of readdirSync(skillsDir)) {
      const src = join(skillsDir, name);
      if (!existsSync(join(src, 'SKILL.md'))) continue;
      placeDir(src, join(target, name), opts);
      count++;
    }
    // Private overlay: a company's own skills merged on top of the public library
    // WITHOUT forking. Same-named private skills override the public one; the
    // rest are additive. (Mirrors `serve --private`; see docs/private-overlay.md.)
    if (opts.private) {
      const priv = resolve(opts.private);
      if (!existsSync(priv)) { console.error(`Error: --private dir not found: ${priv}`); process.exit(1); }
      let pc = 0;
      for (const name of readdirSync(priv)) {
        const src = join(priv, name);
        if (!statSync(src).isDirectory() || !existsSync(join(src, 'SKILL.md'))) continue;
        placeDir(src, join(target, name), opts);   // same name → overrides the public skill
        pc++; count++;
      }
      console.log(`  ${opts.dryRun ? 'would overlay' : 'overlaid'} ${pc} private skill(s) from ${priv}`);
    }
    // Claude Code also gets subagents, slash commands, and output-styles.
    if (agent === 'claude') {
      // Extras are siblings of `skills/` (…/.claude/{skills,agents,commands}),
      // so `dirname(target)` is only correct when the caller kept that layout.
      // With a custom --target that doesn't end in "skills", we'd otherwise
      // write agents/commands/output-styles into the parent of target and
      // pollute an unrelated directory. In that case, drop the extras next to
      // the skills instead of blindly walking up.
      const claudeRoot = basename(target) === 'skills' ? dirname(target) : target;
      for (const kind of ['agents', 'commands', 'output-styles']) {
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
      kilocode: `Kilo Code will pick up the rules in ${target} on its next session.`,
    }[agent] || `Restart ${agent} — it auto-discovers SKILL.md skills in ${target} by their description.`;
    console.log(note);
    console.log(`\n${STAR}`);
  }
}

function list() {
  console.log('Supported agents and default targets:\n');
  // Derive from the registries above so this can't drift from what `add` accepts.
  for (const a of [...NATIVE, ...Object.keys(RULEFILE)]) {
    console.log(`  ${a.padEnd(9)} ${defaultTarget(a)}`);
  }
  console.log('\nNative SKILL.md agents: claude, hermes, codex, openclaw (install skill folders).');
  console.log('Claude also gets subagents + slash commands. Cursor / Windsurf / Kilo Code install');
  console.log('rule files; Aider installs conventions you load with "aider --read".');
  console.log(`\n${STAR}`);
}

// --- `find` — natural-language task→skill router -----------------------------
// Unlike `search` (a substring AND-filter that returns nothing for a real sentence),
// `find` tokenizes a task, drops stopwords, and RANKS every skill by term overlap
// against title+description, nudged by tier and (existing) eval score. No API/network.
const FIND_STOP = new Set(('a an the of to in on or and for with your you i we my our need want help me please how do can could make write create build draft produce prepare prep get set run use using when asked into that this from each will able about more also not no is are be as at any one it its their them they then over same first start new mine give me').split(/\s+/));
const findTokens = (s) => (String(s).toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !FIND_STOP.has(w));
// Present the eval field honestly — a real measured score or an explicit "no claim",
// never an invented number. Mirrors the badge shown on the web catalog.
function evalBadge(ev) {
  if (ev && typeof ev.score === 'number') return `✅ measured ${ev.score}/5${ev.runs ? ` · ${ev.runs} run${ev.runs > 1 ? 's' : ''}` : ''}`;
  return '· unmeasured (no claim)';
}
// Prefer the rich catalog (title/tier/eval) if it's been built; else the lean index.
function catalogForFind() {
  const cat = join(PKG_ROOT, 'web', 'skills.json');
  if (existsSync(cat)) {
    try {
      const j = JSON.parse(readFileSync(cat, 'utf8'));
      const a = Array.isArray(j) ? j : j.skills;
      if (Array.isArray(a) && a.length) return a;
    } catch { /* fall through */ }
  }
  return readSkillIndex().map((s) => ({ ...s, title: s.name, tier: 'stable', eval: null, plugin: null }));
}
function find(opts) {
  const query = opts._.slice(1).join(' ').trim();
  if (!query) { console.error('Usage: pm-claude-skills find "<describe your task>" [--limit N] [--json]'); process.exit(2); }
  const qset = new Set(findTokens(query));
  if (!qset.size) { console.error('Nothing to search on — add a few descriptive words.'); process.exit(2); }
  const TIER_BOOST = { production: 1.15, stable: 1, experimental: 0.9 };
  const ql = query.toLowerCase();
  const scored = catalogForFind().map((s) => {
    const titleSet = new Set(findTokens(`${s.title || s.name} ${s.name}`));
    const hset = new Set([...titleSet, ...findTokens(s.description || '')]);
    let overlap = 0, titleHits = 0;
    for (const t of qset) { if (hset.has(t)) overlap++; if (titleSet.has(t)) titleHits++; }
    const phrase = (s.description || '').toLowerCase().includes(ql) ? 2 : 0;
    let score = (overlap + titleHits * 1.5 + phrase) * (TIER_BOOST[s.tier] || 1);
    if (s.eval && typeof s.eval.score === 'number') score += (s.eval.score - 4) * 0.15; // gentle nudge for measured-good
    return { s, score, overlap };
  }).filter((r) => r.overlap > 0).sort((a, b) => b.score - a.score || a.s.name.localeCompare(b.s.name));

  let limit = 8;
  if (opts.limit != null) {
    const n = Number(opts.limit);
    if (!Number.isInteger(n) || n < 1) { console.error(`Error: --limit must be a positive integer (got "${opts.limit}").`); process.exit(2); }
    limit = n;
  }
  const top = scored.slice(0, limit);
  if (opts.json) {
    console.log(JSON.stringify(top.map((r) => ({ name: r.s.name, title: r.s.title, plugin: r.s.plugin, tier: r.s.tier, eval: r.s.eval, score: Math.round(r.score * 100) / 100 })), null, 2));
    return;
  }
  if (!top.length) { console.log(`No skill matched "${query}". Try fewer or different words, or: npx pm-claude-skills list`); return; }
  console.log(`\nTop ${top.length} skill${top.length > 1 ? 's' : ''} for: "${query}"\n`);
  top.forEach((r, i) => {
    const s = r.s;
    console.log(`  ${String(i + 1).padStart(2)}. ${s.name}${s.plugin && s.plugin !== 'other' ? `  (${s.plugin})` : ''}`);
    console.log(`      ${(s.summary || s.description || '').slice(0, 104)}`);
    console.log(`      ${s.tier || 'stable'} · ${evalBadge(s.eval)}`);
  });
  console.log(`\nRun one:  npx pm-claude-skills run ${top[0].s.name} --text "…"\n`);
}

// `changelog <skill>` — what changed in a skill and when. Reads the built
// web/skill-changelog.json (per-skill git history) if present; otherwise falls
// back to live `git log` when run inside the repo. Honest about an empty history.
function changelog(opts) {
  const name = opts._[1];
  if (!name) { console.error('Usage: pm-claude-skills changelog <skill>'); process.exit(2); }
  let history = null;
  const built = join(PKG_ROOT, 'web', 'skill-changelog.json');
  if (existsSync(built)) {
    // The artifact enumerates every real skill, so a missing key = not a real skill.
    try {
      const skills = JSON.parse(readFileSync(built, 'utf8')).skills || {};
      if (!(name in skills)) { console.error(`No skill named "${name}". Try: pm-claude-skills find "${name}"`); process.exit(1); }
      history = skills[name];
    } catch { /* fall through to git */ }
  }
  if (history == null) {
    try {
      const out = execSync(`git log --pretty=format:"%as %h %s" -- "skills/${name}/"`, { cwd: PKG_ROOT, encoding: 'utf8' }).trim();
      history = out ? out.split('\n').map((l) => { const m = l.match(/^(\S+)\s+(\S+)\s+(.*)$/); return m ? { date: m[1], sha: m[2], subject: m[3] } : null; }).filter(Boolean) : [];
    } catch { history = null; }
  }
  if (history == null) { console.error(`No history available for "${name}". (Is it a real skill? Try: pm-claude-skills find "${name}")`); process.exit(1); }
  if (opts.json) { console.log(JSON.stringify({ skill: name, history }, null, 2)); return; }
  if (!history.length) { console.log(`${name}: no recorded changes yet.`); return; }
  console.log(`\n${name} — ${history.length} change${history.length > 1 ? 's' : ''}\n`);
  for (const e of history) console.log(`  ${e.date}  ${e.sha}  ${e.subject}`);
  console.log('');
}

const HELP = `pm-claude-skills — install professional Agent Skills into any AI coding tool.

👋 New here? Two fast ways to start:
  • No install — try any skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/
  • In your editor — run:  npx pm-claude-skills add --agent claude
(This is a CLI, not a library — you don't need \`npm install\`; \`npx …\` always runs the latest.)

Usage:
  npx pm-claude-skills add --agent <claude|hermes|codex|openclaw|cursor|windsurf|aider> [--target <path>] [--link] [--dry-run]
  npx pm-claude-skills run <skill> [--text "…" | --input <file>] [--model <m>] [--out <file>]
  npx pm-claude-skills find "<describe your task>" [--json] [--limit <n>]   # ranked task→skill router (start here)
  npx pm-claude-skills search [query…] [--json] [--limit <n>]
  npx pm-claude-skills install <owner/repo>   # install skills from ANY GitHub repo — security-scanned + SkillSpec-graded
  npx pm-claude-skills prove --skill <dir> --tasks <file>  # A/B-verify a skill: on vs off, real token counts\n  npx pm-claude-skills mcp-audit [--connect]        # your MCP servers are charging you rent - measure it
  npx pm-claude-skills verify                 # integrity check: detect drift in anything "install" brought in
  npx pm-claude-skills chain <workflow>       # run a whole multi-skill pipeline (chain --list to see them)
  npx pm-claude-skills council <skill>        # author -> cross-vendor critique -> arbiter (2+ provider keys)
  npx pm-claude-skills migrate <dir>          # convert a folder of prompts/SOPs into SkillSpec skills
  npx pm-claude-skills init        # scaffold the professional workspace here (brain/, context, arena folders)
  npx pm-claude-skills nightwatch  # AI staff work this directory while you sleep (install | --once | --dry-run)
  npx pm-claude-skills subscribe   # standing skills: scheduled runs that report what CHANGED
  npx pm-claude-skills brief       # the chief-of-staff: predictions due, latest verdicts, open hypotheses
  npx pm-claude-skills stats       # the project's public vitals (runs served, stars, benchmark)
  npx pm-claude-skills reckoning   # your prediction ledger: due calls, hit rate, calibration curve, Brier score
  npx pm-claude-skills doctor      # checkup: what's installed, what's stale, what to fix (read-only)
  npx pm-claude-skills changelog <skill>      # what changed in a skill, and when (per-skill git history)
  npx pm-claude-skills list
  npx pm-claude-skills --version

Examples:
  npx pm-claude-skills add --agent claude     # skills + subagents + commands
  npx pm-claude-skills add --agent cursor     # .mdc rules into ./.cursor/rules
  npx pm-claude-skills add --agent windsurf   # .md rules into ./.windsurf/rules
  npx pm-claude-skills add --agent codex --link

  npx pm-claude-skills find "prep a QBR for an at-risk account"   # describe the task, get ranked skills + a measured/unmeasured badge
  npx pm-claude-skills search board            # exact keyword filter by name/description
  npx pm-claude-skills search launch --json    # machine-readable (Raycast/Alfred/scripts)

  npx pm-claude-skills run prd-template --text "a referral program for B2B users"   # run a skill (needs ANTHROPIC_API_KEY)
  npx pm-claude-skills test prd-template --runs 3   # author's test bench: score a skill vs its eval case + variance
  cat notes.txt | npx pm-claude-skills run meeting-notes --out summary.md           # pipe input, write the artifact
  cat notes.txt | npx pm-claude-skills chain run-discovery --deck                   # notes → 4 artifacts + a real .pptx
  npx pm-claude-skills install acme/their-skills --dry-run                          # audit a third-party skill repo
  npx pm-claude-skills generate --from <url|file>   # turn your docs into a SKILL.md (needs ANTHROPIC_API_KEY)

${STAR}
`;

const opts = parse(process.argv.slice(2));
const cmd = opts._[0];
if (opts.version) console.log(VERSION);
else if (!cmd || cmd === 'help' || (opts.help && !['run', 'generate', 'install', 'chain', 'init', 'reckoning', 'council', 'migrate'].includes(cmd))) console.log(HELP);
else if (cmd === 'list') list();
else if (cmd === 'search') search(opts);
else if (cmd === 'find') find(opts);
else if (cmd === 'changelog') changelog(opts);
else if (cmd === 'add') add(opts);
else if (cmd === 'test') {
  const { run } = await import('./test.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'migrate') {
  const { run } = await import('./migrate.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'import') {
  const { run } = await import('./import.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'serve') {
  // Your company's skill library on your laptop in one command — the Org
  // Edition server (playground + /v1 API + private-skills overlay) without
  // docker. `--private <dir>` overlays your own skills.
  const { spawn } = await import('node:child_process');
  const { fileURLToPath } = await import('node:url');
  const path = await import('node:path');
  const server = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'org', 'server.mjs');
  const child = spawn(process.execPath, [server, ...process.argv.slice(3)], { stdio: 'inherit' });
  child.on('exit', (c) => process.exit(c || 0));
}
else if (cmd === 'hooks') {
  const { run } = await import('./hooks.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'outdated') {
  const { run } = await import('./outdated.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'init-library') {
  const { run } = await import('./init-library.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'skillpack') {
  const { run } = await import('./skillpack.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'council') {
  const { run } = await import('./council.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'mcp-audit') {
  const { run } = await import('./mcp-audit.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'prove') {
  const { run } = await import('./prove.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'verify') {
  const { run } = await import('./verify.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'nightwatch') {
  const { run } = await import('./nightwatch.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'subscribe') {
  const { run } = await import('./subscribe.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'brief' || cmd === 'stats') {
  const m = await import('./brief.mjs');
  try { process.exit(await (cmd === 'brief' ? m.brief() : m.stats())); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'reckoning') {
  const { run } = await import('./reckoning.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'init') {
  const { run } = await import('./init.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'chain') {
  const { run } = await import('./chain.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'install') {
  const { run } = await import('./install.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'doctor') {
  const { run } = await import('./doctor.mjs');
  try { process.exit(await run()); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'run') {
  const { run } = await import('./run.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else if (cmd === 'generate') {
  const { run } = await import('./generate.mjs');
  try { process.exit(await run(process.argv.slice(3))); }
  catch (e) { console.error(`Error: ${e.message}`); process.exit(1); }
}
else { console.error(`Unknown command: ${cmd}\n`); console.log(HELP); process.exit(2); }
