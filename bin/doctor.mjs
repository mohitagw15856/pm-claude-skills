// pm-claude-skills doctor — a read-only checkup of your local setup.
// Audits what's installed (skills per agent, Claude extras, hooks, MCP, brain),
// compares installed skills against the bundled versions, and prescribes the
// top 3 fixes. Touches nothing; needs no network and no API key.
import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { readAnnouncement, formatAnnouncement } from './lib/announce.mjs';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const HOME = homedir();
const ok = (s) => `  \x1b[32m✔\x1b[0m ${s}`;
const warn = (s) => `  \x1b[33m▲\x1b[0m ${s}`;
const bad = (s) => `  \x1b[31m✘\x1b[0m ${s}`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const AGENT_DIRS = {
  claude: join(HOME, '.claude', 'skills'),
  hermes: join(HOME, '.hermes', 'skills'),
  codex: join(HOME, '.codex', 'skills'),
  openclaw: join(HOME, '.openclaw', 'skills'),
};

function bundledSkills() {
  const dir = join(PKG_ROOT, 'skills');
  if (!existsSync(dir)) return new Map();
  const out = new Map();
  for (const e of readdirSync(dir)) {
    const p = join(dir, e, 'SKILL.md');
    if (existsSync(p)) out.set(e, readFileSync(p, 'utf8'));
  }
  return out;
}

function auditAgent(name, dir, bundled) {
  if (!existsSync(dir)) return null;
  let installed = 0, ours = 0, stale = 0;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e, 'SKILL.md');
    try { if (!statSync(join(dir, e)).isDirectory() || !existsSync(p)) continue; } catch { continue; }
    installed++;
    if (!bundled.has(e)) continue;
    ours++;
    if (readFileSync(p, 'utf8') !== bundled.get(e)) stale++;
  }
  return { installed, ours, stale };
}

function readJson(p) { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } }

export async function run() {
  const bundled = bundledSkills();
  const lines = [];
  const rx = []; // prescriptions: [severity 0=critical 1=important 2=nice, text]

  lines.push(`\x1b[1m🩺 pm-skills doctor\x1b[0m ${dim(`— read-only checkup · library has ${bundled.size} skills`)}\n`);

  // ── 0. The current announcement, if one is active (read from the package) ──
  const notice = readAnnouncement(PKG_ROOT);
  if (notice) lines.push(`${formatAnnouncement(notice)}\n`);

  // ── 1. Skills installed per agent ─────────────────────────────────────────
  lines.push('\x1b[1mSkills\x1b[0m');
  let anyAgent = false;
  for (const [agent, dir] of Object.entries(AGENT_DIRS)) {
    const a = auditAgent(agent, dir, bundled);
    if (!a || !a.ours) continue;
    anyAgent = true;
    if (a.stale) {
      lines.push(warn(`${agent}: ${a.ours} library skills in ${dir} — ${a.stale} differ from this version (stale or locally edited)`));
      rx.push([1, `Refresh stale skills: \x1b[1mnpx pm-claude-skills add --agent ${agent}\x1b[0m (${a.stale} installed skills differ from the current library)`]);
    } else {
      lines.push(ok(`${agent}: ${a.ours} library skills installed, all current ${dim(`(${dir})`)}`));
    }
    if (a.ours < bundled.size) {
      lines.push(warn(`${agent}: ${bundled.size - a.ours} library skills not installed`));
    }
  }
  if (!anyAgent) {
    lines.push(bad('No skills installed for any supported agent (claude, hermes, codex, openclaw)'));
    rx.push([0, 'Install the library: \x1b[1mnpx pm-claude-skills add --agent claude\x1b[0m — skills, subagents, and slash commands in one command']);
  }

  // ── 2. Claude Code extras: subagents, commands, output-styles ─────────────
  lines.push('\n\x1b[1mClaude Code extras\x1b[0m');
  const claudeRoot = join(HOME, '.claude');
  if (!existsSync(claudeRoot)) {
    lines.push(warn('~/.claude not found — Claude Code not set up on this machine (skip if you use another agent)'));
  } else {
    for (const [kind, label] of [['agents', 'subagents'], ['commands', 'slash commands'], ['output-styles', 'output styles']]) {
      const srcDir = join(PKG_ROOT, kind);
      if (!existsSync(srcDir)) continue;
      const want = readdirSync(srcDir).filter((f) => f.endsWith('.md') && f !== 'README.md');
      const destDir = join(claudeRoot, kind);
      const have = want.filter((f) => existsSync(join(destDir, f)));
      if (have.length === want.length) lines.push(ok(`${label}: ${have.length}/${want.length} installed`));
      else {
        lines.push(warn(`${label}: ${have.length}/${want.length} installed`));
        if (kind === 'agents') rx.push([2, 'Missing subagents (pm-partner, sprint-master…): \x1b[1mnpx pm-claude-skills add --agent claude\x1b[0m installs them alongside the skills']);
      }
    }
    // Hooks — look for our hook scripts referenced anywhere in settings.json.
    const settings = readJson(join(claudeRoot, 'settings.json'));
    const hookNames = existsSync(join(PKG_ROOT, 'hooks')) ? readdirSync(join(PKG_ROOT, 'hooks')).filter((f) => f.endsWith('.sh')) : [];
    const settingsTxt = settings ? JSON.stringify(settings) : '';
    const wired = hookNames.filter((h) => settingsTxt.includes(h));
    if (wired.length) lines.push(ok(`hooks: ${wired.length} pm-skills hooks wired in settings.json (${wired.join(', ')})`));
    else if (hookNames.length) {
      lines.push(warn(`hooks: none of the ${hookNames.length} pm-skills hooks are wired (session-brief, suggest-skill, doc-quality-gate…)`));
      rx.push([2, 'Wire a hook: copy from hooks/settings.example.json in the repo — session-brief.sh alone makes every session open with your brain\'s context']);
    }
  }

  // ── 3. MCP ─────────────────────────────────────────────────────────────────
  lines.push('\n\x1b[1mMCP\x1b[0m');
  const claudeJson = readJson(join(HOME, '.claude.json'));
  const mcpTxt = JSON.stringify(claudeJson?.mcpServers || {}) + JSON.stringify(
    Object.fromEntries(Object.entries(claudeJson?.projects || {}).map(([k, v]) => [k, v?.mcpServers || {}])));
  if (/pm-skills|pm-claude-skills/.test(mcpTxt)) lines.push(ok('pm-skills MCP server registered with Claude Code'));
  else {
    lines.push(warn('pm-skills MCP server not registered — agents can\'t search/fetch skills on demand'));
    rx.push([1, 'Register the MCP server: \x1b[1mclaude mcp add pm-skills -- npx -y pm-claude-skills-mcp\x1b[0m (or use the hosted URL from the README in any MCP client)']);
  }

  // ── 4. The brain & workspace (current directory) ──────────────────────────
  lines.push(`\n\x1b[1mThis directory\x1b[0m ${dim(process.cwd())}`);
  const brainDir = join(process.cwd(), 'brain');
  if (existsSync(brainDir)) {
    const files = readdirSync(brainDir).filter((f) => f.endsWith('.md'));
    const preds = existsSync(join(brainDir, 'predictions')) ? readdirSync(join(brainDir, 'predictions')).length : 0;
    lines.push(ok(`brain/: ${files.length} memory file(s)${preds ? `, ${preds} prediction(s)` : ''}`));
  } else {
    lines.push(dim('  · no brain/ here — skills run without durable memory in this project (fine for one-offs)'));
  }
  for (const d of ['firm-minutes', 'boardroom']) {
    if (existsSync(join(process.cwd(), d))) lines.push(ok(`${d}/: web-arena artifacts land here (workspace bridge connected at some point)`));
  }

  // ── 5. Environment ─────────────────────────────────────────────────────────
  lines.push('\n\x1b[1mEnvironment\x1b[0m');
  const major = parseInt(process.versions.node, 10);
  if (major >= 18) lines.push(ok(`node ${process.versions.node}`));
  else { lines.push(bad(`node ${process.versions.node} — the CLI needs ≥18 (built-in fetch)`)); rx.push([0, 'Upgrade Node to ≥18 — `run`, `generate`, and the MCP server all need built-in fetch']); }
  if (process.env.ANTHROPIC_API_KEY) lines.push(ok('ANTHROPIC_API_KEY set — `run` and `generate` will work'));
  else lines.push(dim('  · ANTHROPIC_API_KEY not set — install/search/doctor work; `run` and `generate` won\'t (only needed for those)'));

  // ── Prescription ───────────────────────────────────────────────────────────
  rx.sort((a, b) => a[0] - b[0]);
  lines.push('\n\x1b[1m℞ Prescription\x1b[0m');
  if (!rx.length) lines.push(ok('Nothing to fix — this setup is in fighting shape. Go use it: https://mohitagw15856.github.io/pm-claude-skills/'));
  else rx.slice(0, 3).forEach(([sev, t], i) => lines.push(`  ${i + 1}. ${sev === 0 ? '\x1b[31m' : sev === 1 ? '\x1b[33m' : ''}${t}\x1b[0m`));

  console.log(lines.join('\n'));
  return rx.some(([s]) => s === 0) ? 1 : 0;
}
