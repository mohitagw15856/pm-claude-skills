// `pm-claude-skills install <owner/repo>[@ref]` — install skills from ANY public
// GitHub repo, not just this library. Every skill is security-scanned and
// SkillSpec-graded on the way in: the installer that audits before it installs.
//
//   npx pm-claude-skills install someone/their-skills                 # all skills found
//   npx pm-claude-skills install someone/their-skills --only a,b      # a subset
//   npx pm-claude-skills install someone/repo@v2 --agent codex        # a tag/branch, another agent
//   npx pm-claude-skills install someone/repo --dry-run               # audit only, write nothing
//
// Pure Node ≥18 (global fetch), no dependencies, GitHub API unauthenticated
// (60 req/h is plenty: 2 API calls + 1 raw fetch per file).
import { readdirSync, existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const STAR = '⭐ Find this useful? Star the repo: https://github.com/mohitagw15856/pm-claude-skills\n💛 The free playground runs are sponsor-funded — fund more: https://github.com/sponsors/mohitagw15856';

const AGENT_DIRS = {
  claude: join(homedir(), '.claude', 'skills'),
  hermes: join(homedir(), '.hermes', 'skills'),
  codex: join(homedir(), '.codex', 'skills'),
  openclaw: join(homedir(), '.openclaw', 'skills'),
};

// Same highest-signal patterns the community registry bans (scripts/check-registry.mjs).
const BANNED = [
  [/ignore (all |any )?(previous|prior|above) (instructions|rules)/i, 'instruction-override phrasing'],
  [/disregard (your|the) (system prompt|guidelines|instructions)/i, 'instruction-override phrasing'],
  [/curl\s+-?[a-z]*\s*https?:\/\/(?!raw\.githubusercontent|github\.com|docs\.)/i, 'network call to an unvetted URL'],
  [/send (the )?(user('|’)s)? ?(data|input|conversation|api key)/i, 'data-exfiltration instruction'],
  [/\b(api[_-]?key|token|password)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}/, 'embedded credential'],
];
const MAX_FILE = 1024 * 1024;       // per-file cap
const MAX_FILES_PER_SKILL = 40;

const getArg = (argv, name, def) => { const i = argv.indexOf('--' + name); return i !== -1 && argv[i + 1] ? argv[i + 1] : def; };

async function gh(path) {
  const res = await fetch('https://api.github.com' + path, { headers: { 'User-Agent': 'pm-claude-skills-install', Accept: 'application/vnd.github+json' } });
  if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') throw new Error('GitHub API rate limit hit — try again in a few minutes.');
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${path}`);
  return res.json();
}
// --cdn (or PM_SKILLS_CDN=jsdelivr) fetches through jsDelivr instead of GitHub,
// for networks where GitHub's API and raw files are blocked or slow (mainland
// China). jsDelivr caches branches for up to 12 hours; pin a tag for freshness.
let CDN = false;
async function jd(path) {
  const res = await fetch('https://data.jsdelivr.com' + path, { headers: { 'User-Agent': 'pm-claude-skills-install' } });
  if (!res.ok) {
    const msg = await res.json().then((j) => j.message).catch(() => '');
    throw new Error(`jsDelivr ${res.status} for ${path}${msg ? `: ${msg}` : ''}`);
  }
  return res.json();
}
async function raw(owner, repo, ref, path) {
  const url = CDN ? `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${ref}/${path}` : `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'pm-claude-skills-install' } });
  if (!res.ok) throw new Error(`fetch failed (${res.status}) for ${path}`);
  return res.text();
}

function specLevel(text) {
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fm) return { level: 0, name: null };
  const name = (fm[1].match(/^name:\s*["']?([\w-]+)["']?\s*$/m) || [])[1] || null;
  const hasDesc = /^description:/m.test(fm[1]);
  if (!name || !hasDesc) return { level: 0, name };
  const body = fm[2] || '';
  const l2 = /##\s*(What This Skill Produces|Required Inputs|Input)/i.test(body) && /##\s*(Output|Deliverable)|##[^\n]*\b(Template|Structure|Format)\b/i.test(body);
  const l3 = l2 && /##\s*Quality Checks/i.test(body) && /##\s*Anti-Patterns/i.test(body);
  return { level: l3 ? 3 : l2 ? 2 : 1, name };
}
function scan(text) {
  return BANNED.filter(([re]) => re.test(text)).map(([, why]) => why);
}

export async function run(argv) {
  const spec = argv[0] && !argv[0].startsWith('--') ? argv[0] : '';
  if (!spec || argv.includes('--help') || argv.includes('-h')) {
    console.log(`Install skills from ANY public GitHub repo — security-scanned and SkillSpec-graded on the way in.

Usage:
  pm-claude-skills install <owner/repo>[@ref] [--agent claude|hermes|codex|openclaw] [--only a,b] [--dry-run] [--force] [--cdn]

What happens:
  1. The repo is scanned for SKILL.md folders (any layout).
  2. Every file is checked against the security patterns the curated library bans
     (prompt-injection phrasing, unvetted network calls, data exfiltration, embedded credentials).
  3. Each skill's SkillSpec conformance level is reported (L1 Loadable → L3 Trustworthy).
  4. Clean skills are installed; flagged skills are NEVER installed. Existing skills are never
     overwritten without --force; names that shadow the curated library are warned about.

--dry-run audits and reports without writing anything.
--cdn fetches through jsDelivr instead of GitHub (also PM_SKILLS_CDN=jsdelivr), for networks
  where GitHub is blocked or slow. Branches are cached up to 12 hours there; pin a tag.`);
    return spec ? 0 : 1;
  }

  const m = spec.match(/^([\w.-]+)\/([\w.-]+?)(?:@([\w./-]+))?$/);
  if (!m) { console.error(`Expected <owner>/<repo> or <owner>/<repo>@<ref>, got "${spec}".`); return 1; }
  const [, owner, repo, refArg] = m;
  const agent = getArg(argv, 'agent', 'claude');
  const target = getArg(argv, 'target', AGENT_DIRS[agent]);
  if (!target) { console.error(`--agent must be one of: ${Object.keys(AGENT_DIRS).join(', ')} (rule-file agents like cursor need generated exports — not supported for third-party repos).`); return 1; }
  const only = (getArg(argv, 'only', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const dryRun = argv.includes('--dry-run');
  const force = argv.includes('--force');
  CDN = argv.includes('--cdn') || process.env.PM_SKILLS_CDN === 'jsdelivr';

  console.error(`🔎 Scanning github.com/${owner}/${repo}${refArg ? '@' + refArg : ''}${CDN ? ' through jsDelivr' : ''} …`);
  let ref, tree;
  if (CDN) {
    // The latest tag if there is one, otherwise the usual default branch names.
    const tries = refArg ? [refArg] : [(await jd(`/v1/packages/gh/${owner}/${repo}/resolved`).catch(() => ({}))).version, 'main', 'master'].filter(Boolean);
    let pkg = null;
    let lastErr = null;
    for (const r of tries) {
      try { pkg = await jd(`/v1/packages/gh/${owner}/${repo}@${encodeURIComponent(r)}?structure=flat`); ref = r; break; } catch (e) { lastErr = e; }
    }
    if (!pkg) throw new Error(`jsDelivr could not serve that repo or ref (${lastErr ? lastErr.message : 'not found'}). Repos over 50 MB are not served from GitHub there; for this library use npm instead (see docs/CDN.md).`);
    tree = { tree: (pkg.files || []).map((f) => ({ type: 'blob', path: f.name.replace(/^\//, '') })) };
  } else {
    ref = refArg || (await gh(`/repos/${owner}/${repo}`)).default_branch;
    tree = await gh(`/repos/${owner}/${repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`);
  }
  if (tree.truncated) console.error('  (repo tree truncated by GitHub — very large repo; some skills may be missed)');

  // Group the tree by skill folder: any directory that directly contains a SKILL.md.
  const files = (tree.tree || []).filter((e) => e.type === 'blob');
  const skillDirs = files.filter((e) => e.path.endsWith('/SKILL.md') || e.path === 'SKILL.md')
    .map((e) => e.path === 'SKILL.md' ? '' : e.path.slice(0, -'/SKILL.md'.length));
  if (!skillDirs.length) { console.error('No SKILL.md files found in this repo.'); return 1; }

  const curated = existsSync(join(PKG_ROOT, 'skills')) ? new Set(readdirSync(join(PKG_ROOT, 'skills'))) : new Set();
  const lockPath = join(target, '.pm-skills-lock.json');
  let lock = { spec: 'pm-skills-lock/1', skills: {} };
  try { if (existsSync(lockPath)) lock = JSON.parse(readFileSync(lockPath, 'utf8')); } catch { /* rebuild */ }
  lock.skills = lock.skills || {};
  const results = [];

  for (const dir of skillDirs.sort()) {
    const skillName = dir ? dir.split('/').pop() : repo;
    if (only.length && !only.includes(skillName)) continue;
    const members = files.filter((e) => (dir ? e.path.startsWith(dir + '/') : !e.path.includes('/')) && e.size <= MAX_FILE).slice(0, MAX_FILES_PER_SKILL);
    const r = { name: skillName, dir, flags: [], warnings: [], level: 0, files: [] };

    try {
      const skillText = await raw(owner, repo, ref, dir ? dir + '/SKILL.md' : 'SKILL.md');
      const sp = specLevel(skillText);
      r.level = sp.level;
      if (sp.name && sp.name !== skillName) r.warnings.push(`frontmatter name "${sp.name}" ≠ folder name — installing as "${sp.name}"`), (r.name = sp.name);
      if (curated.has(r.name)) r.warnings.push(`shadows the curated skill "${r.name}" — make sure that's intentional`);
      r.flags.push(...scan(skillText).map((w) => `SKILL.md: ${w}`));
      r.files.push({ path: 'SKILL.md', content: skillText });

      // Fetch and scan every other file in the folder (scripts, references, templates).
      for (const e of members) {
        const rel = dir ? e.path.slice(dir.length + 1) : e.path;
        if (rel === 'SKILL.md') continue;
        if (/\.(png|jpg|jpeg|gif|pdf|zip|xlsx|docx|pptx|woff2?)$/i.test(rel)) { r.warnings.push(`binary file skipped: ${rel}`); continue; }
        const content = await raw(owner, repo, ref, e.path);
        r.flags.push(...scan(content).map((w) => `${rel}: ${w}`));
        if (/\.(sh|py|mjs|js|rb|ps1)$/i.test(rel)) r.warnings.push(`contains executable script: ${rel} — review before letting an agent run it`);
        r.files.push({ path: rel, content });
      }
    } catch (e) { r.flags.push(`fetch error: ${e.message}`); }
    results.push(r);
  }

  // ── Report + install ─────────────────────────────────────────────────────────
  const L = ['✗ not loadable (no valid frontmatter)', 'L1 Loadable', 'L2 Structured', 'L3 Trustworthy'];
  let installed = 0, blocked = 0, skipped = 0;
  console.error('');
  for (const r of results) {
    const head = `${r.name}  [SkillSpec ${L[r.level]}] (${r.files.length} file${r.files.length === 1 ? '' : 's'})`;
    if (r.flags.length) {
      blocked++;
      console.error(`  🚫 ${head}\n${r.flags.map((f) => `      SECURITY — ${f}`).join('\n')}\n      → NOT installed.`);
      continue;
    }
    if (r.level === 0) { blocked++; console.error(`  🚫 ${head} → NOT installed.`); continue; }
    for (const w of r.warnings) console.error(`  ⚠ ${r.name}: ${w}`);
    const dest = join(target, r.name);
    if (existsSync(dest) && !force) { skipped++; console.error(`  ↷ ${head} — already installed (use --force to overwrite)`); continue; }
    if (dryRun) { console.error(`  ✔ ${head} — would install to ${dest}`); installed++; continue; }
    for (const f of r.files) {
      const p = join(dest, f.path);
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, f.content);
    }
    // Integrity lockfile: record the hash of every installed file, so `verify`
    // can detect drift/tampering later.
    lock.skills[r.name] = { repo: `${owner}/${repo}`, ref, installedAt: new Date().toISOString().slice(0, 10),
      files: Object.fromEntries(r.files.map((f) => [f.path, 'sha256:' + createHash('sha256').update(f.content).digest('hex')])) };
    installed++;
    console.error(`  ✔ ${head} → ${dest}`);
  }

  if (installed && !dryRun) writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
  console.error(`\n${dryRun ? '[dry-run] Would install' : 'Installed'} ${installed} · blocked ${blocked} · skipped ${skipped}  (agent: ${agent})`);
  if (installed && !dryRun) console.error(`Integrity hashes recorded in ${lockPath} — check later with: pm-claude-skills verify`);
  if (installed && !dryRun) console.error(`Restart ${agent} to pick up the new skills.\n\n${STAR}`);
  return blocked && !installed ? 1 : 0;
}
