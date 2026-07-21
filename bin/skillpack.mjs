// `pm-claude-skills skillpack` — the reference implementation of RFC-0001
// (Agent Skill Interchange). Pack skills into a verifiable .skillpack, verify
// one, or install from one. A .skillpack is a directory (optionally tar.gz'd)
// holding skillpack.json + skills/<name>/SKILL.md — provenance and sha256 per
// skill, so bundles of skills can move between vendors as artifacts, not vibes.
//
//   pm-claude-skills skillpack pack <skill…|--bundle name> --out my.skillpack [--tgz]
//   pm-claude-skills skillpack verify <dir|.tgz>
//   pm-claude-skills skillpack install <dir|.tgz> [--target <skills-dir>]
//
// Pure Node (system tar only for .tgz). Spec: docs/rfcs/0001-skill-interchange.md
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, cpSync, rmSync } from 'node:fs';
import { join, dirname, resolve, basename, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SPEC = 'agent-skill-interchange/0.1';
const VERSION = (() => { try { return JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8')).version; } catch { return '0.0.0'; } })();
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const arg = (argv, n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };

function skillMeta(file) {
  const text = readFileSync(file, 'utf8');
  const fm = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---/);
  const meta = {};
  if (fm) for (const l of fm[1].split(/\r?\n/)) { const m = l.match(/^(\w[\w-]*):\s*(.*)$/); if (m) meta[m[1]] = m[2].trim().replace(/^["']|["']$/g, ''); }
  return { text, meta };
}

function gitCommit() { try { return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: PKG_ROOT, encoding: 'utf8' }).trim(); } catch { return undefined; } }

export function pack(argv) {
  const out = arg(argv, 'out', 'pack.skillpack');
  const bundle = arg(argv, 'bundle');
  let names = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--out' && argv[i - 1] !== '--bundle' && argv[i - 1] !== '--name' && argv[i - 1] !== '--pack-version');
  if (bundle) {
    const dir = join(PKG_ROOT, 'plugins', bundle, 'skills');
    if (!existsSync(dir)) { console.error(`Unknown bundle: ${bundle}`); return 1; }
    names = readdirSync(dir);
  }
  if (!names.length) { console.error('Nothing to pack: pass skill names or --bundle <name>.'); return 1; }
  const dest = resolve(out.replace(/\.(tgz|tar\.gz)$/, ''));
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(join(dest, 'skills'), { recursive: true });
  const commit = gitCommit();
  const skills = [];
  for (const n of [...new Set(names)]) {
    const src = join(PKG_ROOT, 'skills', n, 'SKILL.md');
    if (!existsSync(src)) { console.error(`Unknown skill: ${n}`); return 1; }
    const { text, meta } = skillMeta(src);
    mkdirSync(join(dest, 'skills', n), { recursive: true });
    writeFileSync(join(dest, 'skills', n, 'SKILL.md'), text);
    skills.push({
      name: n, description: meta.description || '', version: meta.version || '0.0.0',
      path: `skills/${n}/SKILL.md`, format: 'skillmd', sha256: sha256(Buffer.from(text)),
      provenance: { source: 'https://github.com/mohitagw15856/pm-claude-skills', ...(commit ? { commit } : {}), registry: 'pm-claude-skills' },
    });
  }
  const manifest = {
    spec: SPEC,
    pack: { name: arg(argv, 'name', bundle || 'pack'), version: arg(argv, 'pack-version', '1.0.0'), license: 'MIT', generator: `pm-claude-skills/${VERSION}`, generated: new Date().toISOString() },
    integrity: 'required',
    compatibility: { runtimes: ['claude', 'openai', 'gemini', 'mcp'], minSkillspec: '1.0' },
    skills,
  };
  writeFileSync(join(dest, 'skillpack.json'), JSON.stringify(manifest, null, 2) + '\n');
  let final = dest;
  if (argv.includes('--tgz') || /\.(tgz|tar\.gz)$/.test(out)) {
    final = dest + '.tgz';
    execFileSync('tar', ['czf', final, '-C', dirname(dest), basename(dest)]);
    rmSync(dest, { recursive: true });
  }
  console.log(`📦 packed ${skills.length} skill(s) → ${final}`);
  return 0;
}

function open(src) {
  // Returns the directory form of the pack (extracting archives to tmp).
  if (/\.(tgz|tar\.gz)$/.test(src)) {
    const tmp = join(tmpdir(), 'skillpack-' + Date.now());
    mkdirSync(tmp, { recursive: true });
    execFileSync('tar', ['xzf', src, '-C', tmp]);
    const entries = readdirSync(tmp);
    return entries.length === 1 ? join(tmp, entries[0]) : tmp;
  }
  return resolve(src);
}

export function verify(argv, quiet = false) {
  const src = argv.find((a) => !a.startsWith('--'));
  if (!src || !existsSync(src)) { console.error('skillpack verify <dir|.tgz>'); return { code: 2 }; }
  const dir = open(src);
  const mf = join(dir, 'skillpack.json');
  if (!existsSync(mf)) { console.error('Not a skillpack: no skillpack.json'); return { code: 1 }; }
  const m = JSON.parse(readFileSync(mf, 'utf8'));
  if (m.spec !== SPEC) { console.error(`Unsupported spec "${m.spec}" (this implements ${SPEC}) — MUST reject.`); return { code: 1 }; }
  const seen = new Set();
  let bad = 0;
  for (const s of m.skills || []) {
    if (seen.has(s.name)) { console.error(`✗ duplicate skill name: ${s.name}`); bad++; continue; }
    seen.add(s.name);
    const base = resolve(dir);
    const p = resolve(base, s.path);
    const rel = relative(base, p);
    if (!rel || rel.startsWith('..') || isAbsolute(rel)) { console.error(`✗ ${s.name}: path escapes the pack — MUST reject.`); return { code: 1 } ; }
    if (!existsSync(p)) { console.error(`✗ ${s.name}: missing ${s.path}`); bad++; continue; }
    if (m.integrity === 'required') {
      const h = sha256(readFileSync(p));
      if (h !== s.sha256) { console.error(`✗ ${s.name}: sha256 mismatch`); bad++; continue; }
    }
    if (!quiet) console.log(`✓ ${s.name} (${(s.sha256 || '').slice(0, 12)}…)`);
  }
  if (bad) { console.error(`\n${bad} failure(s) — pack rejected.`); return { code: 1 }; }
  if (!quiet) console.log(`\n✅ valid ${SPEC} pack: ${m.pack.name}@${m.pack.version} · ${m.skills.length} skill(s) · integrity ${m.integrity}`);
  return { code: 0, dir, manifest: m };
}

export function install(argv) {
  const r = verify(argv, true);
  if (r.code !== 0) return r.code;
  const target = resolve(arg(argv, 'target', join(process.env.HOME || '', '.claude', 'skills')));
  mkdirSync(target, { recursive: true });
  for (const s of r.manifest.skills) {
    cpSync(join(r.dir, dirname(s.path)), join(target, s.name), { recursive: true });
    console.log(`→ ${s.name}`);
  }
  console.log(`✅ installed ${r.manifest.skills.length} skill(s) → ${target} (integrity verified)`);
  return 0;
}

export async function run(argv) {
  const sub = argv[0];
  if (sub === 'pack') return pack(argv.slice(1));
  if (sub === 'verify') return verify(argv.slice(1)).code;
  if (sub === 'install') return install(argv.slice(1));
  console.log(`skillpack — RFC-0001 Agent Skill Interchange (reference implementation)

  pm-claude-skills skillpack pack prd-template meeting-notes --out core.skillpack --tgz
  pm-claude-skills skillpack pack --bundle pm-decoders --out decoders.skillpack
  pm-claude-skills skillpack verify decoders.skillpack[.tgz]
  pm-claude-skills skillpack install decoders.skillpack --target ~/.claude/skills`);
  return sub ? 2 : 0;
}
