// `pm-claude-skills verify` — integrity check for installed skills. The
// installer records a lockfile of content hashes (.pm-skills-lock.json in the
// target dir); this command recomputes them and reports drift: a skill that
// changed on disk after install is either your edit or someone else's — either
// way you should know. Curated-library staleness is `doctor`'s job; this is
// tamper/drift detection for everything `install` brought in.
//
//   pm-claude-skills verify                 # default agent (claude)
//   pm-claude-skills verify --agent codex
//   pm-claude-skills verify --release       # installed curated skills vs the signed release SBOM
//
// Exit codes: 0 clean · 1 drift or missing files found · 2 no lockfile.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { createHash } from 'node:crypto';

const AGENT_DIRS = {
  claude: join(homedir(), '.claude', 'skills'),
  hermes: join(homedir(), '.hermes', 'skills'),
  codex: join(homedir(), '.codex', 'skills'),
  openclaw: join(homedir(), '.openclaw', 'skills'),
};
const getArg = (argv, n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };

// `verify --release`: check the curated skills installed in an agent folder
// against the SBOM published with the signed release bundle (see
// scripts/build-release-bundle.mjs). A SKILL.md whose hash matches the SBOM is
// byte-for-byte what was released; one that differs was edited or tampered with.
async function verifyRelease(argv) {
  const agent = getArg(argv, 'agent', 'claude');
  const target = getArg(argv, 'target', AGENT_DIRS[agent]);
  const SITE = 'https://mohitagw15856.github.io/pm-claude-skills/releases';
  let version = getArg(argv, 'version', null);
  if (!version) { try { version = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version; } catch { version = null; } }
  let sbom = null, source = '';
  const local = getArg(argv, 'sbom', null); // a downloaded SBOM file, for offline checks
  if (local) { try { sbom = JSON.parse(readFileSync(local, 'utf8')); source = local; } catch { console.error(`Cannot read ${local}`); return 2; } }
  if (!sbom) for (const url of [version && `${SITE}/pm-skills-${version}.sbom.cdx.json`, `${SITE}/latest.json`].filter(Boolean)) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) continue;
      const j = await r.json();
      if (j.sbom) { const r2 = await fetch(`${SITE}/${j.sbom}`, { signal: AbortSignal.timeout(20000) }); if (r2.ok) { sbom = await r2.json(); source = `${SITE}/${j.sbom}`; break; } }
      else { sbom = j; source = url; break; }
    } catch { /* try the next */ }
  }
  if (!sbom) { console.error('Could not download the release SBOM (offline, or this version predates signed bundles).'); return 2; }
  const rel = sbom.metadata?.component?.version;
  const want = new Map((sbom.components || []).filter((c) => c.group === 'skills').map((c) => [c.name, c.hashes?.[0]?.content]));
  if (!target || !existsSync(target)) { console.error(`No skills folder at ${target}.`); return 2; }
  const { readdirSync } = await import('node:fs');
  let ok = 0, changed = 0, unknown = 0;
  const diffs = [];
  for (const name of readdirSync(target)) {
    const f = join(target, name, 'SKILL.md');
    if (!existsSync(f)) continue;
    const expected = want.get(name);
    if (!expected) { unknown++; continue; }
    const got = createHash('sha256').update(readFileSync(f)).digest('hex');
    if (got === expected) ok++; else { changed++; diffs.push(name); }
  }
  console.log(`Release ${rel} SBOM: ${source}`);
  console.log(`  ${ok} skill(s) match the signed release byte for byte`);
  if (changed) console.log(`  ${changed} differ from it (edited locally, from another version, or tampered with): ${diffs.slice(0, 12).join(', ')}${diffs.length > 12 ? ', …' : ''}`);
  if (unknown) console.log(`  ${unknown} are not in this release (your own skills, or from elsewhere)`);
  console.log(`\nTo prove the bundle itself came from this repository (needs the GitHub CLI):\n  curl -LO ${SITE}/pm-skills-${rel}.tar.gz\n  gh attestation verify pm-skills-${rel}.tar.gz -R mohitagw15856/pm-claude-skills`);
  console.log('npm installs are signed too: run `npm audit signatures` in a project that depends on pm-claude-skills.');
  return changed ? 1 : 0;
}

export async function run(argv) {
  if (argv.includes('--release')) return verifyRelease(argv);
  const agent = getArg(argv, 'agent', 'claude');
  const target = getArg(argv, 'target', AGENT_DIRS[agent]);
  if (!target) { console.error(`--agent must be one of: ${Object.keys(AGENT_DIRS).join(', ')}`); return 1; }
  const lockPath = join(target, '.pm-skills-lock.json');
  if (!existsSync(lockPath)) {
    console.log(`No lockfile at ${lockPath} — nothing installed via \`pm-claude-skills install\` yet (curated-library health is \`doctor\`'s job).`);
    return 2;
  }
  let lock;
  try { lock = JSON.parse(readFileSync(lockPath, 'utf8')); }
  catch { console.error(`Lockfile at ${lockPath} is corrupt — reinstall with --force to rebuild it.`); return 1; }

  let clean = 0, drifted = 0, missing = 0;
  for (const [name, rec] of Object.entries(lock.skills || {})) {
    const problems = [];
    for (const [rel, hash] of Object.entries(rec.files || {})) {
      const p = join(target, name, rel);
      if (!existsSync(p)) { problems.push(`missing: ${rel}`); continue; }
      const actual = 'sha256:' + createHash('sha256').update(readFileSync(p)).digest('hex');
      if (actual !== hash) problems.push(`modified: ${rel}`);
    }
    if (!problems.length) { clean++; continue; }
    const gone = problems.every((x) => x.startsWith('missing'));
    gone ? missing++ : drifted++;
    console.log(`  ${gone ? '✂' : '⚠'} ${name}  (${rec.repo}@${rec.ref}, installed ${rec.installedAt})`);
    for (const pr of problems.slice(0, 6)) console.log(`      ${pr}`);
  }
  console.log(`\n🔏 verify — ${clean} intact · ${drifted} drifted · ${missing} removed  (${Object.keys(lock.skills || {}).length} locked skill(s) in ${target})`);
  if (drifted) console.log('Drift = the files changed after install. If you edited them, fine — reinstall with --force to re-lock. If you didn\'t: investigate before an agent runs them.');
  return drifted || missing ? 1 : 0;
}
