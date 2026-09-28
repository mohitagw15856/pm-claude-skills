#!/usr/bin/env node
// Versioned skill releases. A release is a frozen copy of one skill's folder,
// so a team can pin the exact text they reviewed and keep it while the live
// skill moves on.
//
//   skill-releases/<skill>/releases.json      the list, oldest first
//   skill-releases/<skill>/<version>/         the frozen copy (SKILL.md, references/, templates/, scripts/)
//
// Usage:
//   node scripts/skill-release.mjs cut prd-template --version 1.0.0 --notes "First pinned release"
//   node scripts/skill-release.mjs list
//   node scripts/skill-release.mjs --check            # snapshots untouched; warns on unreleased edits
//   node scripts/skill-release.mjs --check --strict   # unreleased edits fail too
//   node scripts/skill-release.mjs --selftest
//
// `cut` also writes `version:` into the skill's frontmatter, in skills/ and in
// every bundle copy under plugins/. No dependencies.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

export const isSkillName = (s) => typeof s === 'string' && KEBAB.test(s);
export const isVersion = (v) => typeof v === 'string' && SEMVER.test(v);

export function compareVersions(a, b) {
  const pa = a.match(SEMVER).slice(1).map(Number);
  const pb = b.match(SEMVER).slice(1).map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1;
  return 0;
}

// Every file under a folder, as forward-slash relative paths, sorted. Dotfiles are skipped.
export function listFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(d).sort()) {
      if (name.startsWith('.')) continue;
      const p = join(d, name);
      if (statSync(p).isDirectory()) walk(p);
      else out.push(relative(dir, p).split(sep).join('/'));
    }
  };
  walk(dir);
  return out.sort();
}

// One hash for a folder: each path and its bytes, in sorted order. The
// `version:` line is left out of SKILL.md so that stamping a version does not
// itself count as an edit.
export function hashFolder(dir) {
  const h = createHash('sha256');
  for (const rel of listFiles(dir)) {
    let bytes = readFileSync(join(dir, rel));
    if (rel === 'SKILL.md') bytes = Buffer.from(stripVersion(bytes.toString('utf8')), 'utf8');
    h.update(`${rel}\0`);
    h.update(bytes);
    h.update('\0');
  }
  return h.digest('hex');
}

function splitFrontmatter(text) {
  const m = text.match(/^---(\r?\n)([\s\S]*?)\r?\n---(\r?\n|$)/);
  if (!m) return null;
  return { eol: m[1], body: m[2], rest: text.slice(m[0].length), close: m[3] };
}

export function readVersion(text) {
  const fm = splitFrontmatter(text);
  if (!fm) return null;
  const m = fm.body.match(/^version:\s*["']?([^"'\r\n]+?)["']?\s*$/m);
  return m ? m[1] : null;
}

export function stripVersion(text) {
  const fm = splitFrontmatter(text);
  if (!fm) return text;
  const lines = fm.body.split(/\r?\n/).filter((l) => !/^version:/.test(l));
  return `---${fm.eol}${lines.join(fm.eol)}${fm.eol}---${fm.close}${fm.rest}`;
}

export function setVersion(text, version) {
  const fm = splitFrontmatter(text);
  if (!fm) throw new Error('no frontmatter');
  const lines = fm.body.split(/\r?\n/).filter((l) => !/^version:/.test(l));
  lines.push(`version: ${version}`);
  return `---${fm.eol}${lines.join(fm.eol)}${fm.eol}---${fm.close}${fm.rest}`;
}

function copyFolder(from, to) {
  for (const rel of listFiles(from)) {
    const dest = join(to, ...rel.split('/'));
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(join(from, ...rel.split('/')), dest);
  }
}

function readReleases(root, skill) {
  const p = join(root, 'skill-releases', skill, 'releases.json');
  if (!existsSync(p)) return [];
  const list = JSON.parse(readFileSync(p, 'utf8'));
  if (!Array.isArray(list)) throw new Error(`${relative(root, p)} must hold a list`);
  return list;
}

export function cut(root, skill, version, notes, today = new Date().toISOString().slice(0, 10)) {
  if (!isSkillName(skill)) throw new Error(`"${skill}" is not a skill name (use kebab-case)`);
  if (!isVersion(version)) throw new Error(`"${version}" is not a version (use 1.2.3)`);
  const live = join(root, 'skills', skill);
  if (!existsSync(join(live, 'SKILL.md'))) throw new Error(`skills/${skill}/SKILL.md does not exist`);
  if (typeof notes !== 'string' || notes.trim() === '') throw new Error('--notes is required: say what changed');

  const releases = readReleases(root, skill);
  const latest = releases[releases.length - 1];
  if (latest && compareVersions(version, latest.version) <= 0) throw new Error(`${version} is not newer than the latest release, ${latest.version}`);
  const target = join(root, 'skill-releases', skill, version);
  if (existsSync(target)) throw new Error(`skill-releases/${skill}/${version} already exists. Releases are never overwritten`);

  // Stamp the version on the live skill and every bundle copy.
  const copies = [join(live, 'SKILL.md')];
  const plugins = join(root, 'plugins');
  if (existsSync(plugins)) {
    for (const bundle of readdirSync(plugins)) {
      const p = join(plugins, bundle, 'skills', skill, 'SKILL.md');
      if (existsSync(p)) copies.push(p);
    }
  }
  for (const p of copies) writeFileSync(p, setVersion(readFileSync(p, 'utf8'), version));

  copyFolder(live, target);
  const entry = { version, releasedAt: today, notes: notes.trim(), dir: version, files: listFiles(target).length, sha256: hashFolder(target) };
  releases.push(entry);
  writeFileSync(join(root, 'skill-releases', skill, 'releases.json'), `${JSON.stringify(releases, null, 2)}\n`);
  return { entry, stamped: copies.length };
}

export function check(root) {
  const errors = [];
  const warnings = [];
  const base = join(root, 'skill-releases');
  if (!existsSync(base)) return { errors, warnings, skills: 0, releases: 0 };
  let skills = 0;
  let count = 0;
  for (const skill of readdirSync(base).sort()) {
    if (skill.startsWith('.') || !statSync(join(base, skill)).isDirectory()) continue;
    skills++;
    if (!isSkillName(skill)) { errors.push(`${skill}: folder name is not kebab-case`); continue; }
    let releases;
    try { releases = readReleases(root, skill); } catch (e) { errors.push(`${skill}: ${e.message}`); continue; }
    if (releases.length === 0) { errors.push(`${skill}: releases.json is empty or missing`); continue; }

    let previous = null;
    for (const r of releases) {
      count++;
      if (!isVersion(r.version)) { errors.push(`${skill}: "${r.version}" is not a version`); continue; }
      if (r.dir !== r.version) errors.push(`${skill} ${r.version}: dir must equal the version`);
      if (previous && compareVersions(r.version, previous) <= 0) errors.push(`${skill}: ${r.version} is listed after ${previous}`);
      previous = r.version;
      const dir = join(base, skill, r.version);
      if (!existsSync(join(dir, 'SKILL.md'))) { errors.push(`${skill} ${r.version}: the frozen copy is missing`); continue; }
      if (hashFolder(dir) !== r.sha256) errors.push(`${skill} ${r.version}: the frozen copy was changed after release. Restore it and cut a new version`);
    }

    const live = join(root, 'skills', skill);
    const latest = releases[releases.length - 1];
    if (!existsSync(join(live, 'SKILL.md'))) { warnings.push(`${skill}: released, but skills/${skill} no longer exists`); continue; }
    if (!isVersion(latest.version)) continue;
    const liveVersion = readVersion(readFileSync(join(live, 'SKILL.md'), 'utf8'));
    if (hashFolder(live) !== latest.sha256) {
      warnings.push(`${skill}: edited since ${latest.version}. Cut a new release when the change is ready`);
    } else if (liveVersion !== latest.version) {
      warnings.push(`${skill}: frontmatter says version ${liveVersion ?? 'none'}, the latest release is ${latest.version}`);
    }
  }
  return { errors, warnings, skills, releases: count };
}

function list(root) {
  const base = join(root, 'skill-releases');
  if (!existsSync(base)) return [];
  const rows = [];
  for (const skill of readdirSync(base).sort()) {
    if (skill.startsWith('.') || !statSync(join(base, skill)).isDirectory()) continue;
    for (const r of readReleases(root, skill)) rows.push({ skill, ...r });
  }
  return rows;
}

function selftest() {
  const t = [];
  const eq = (name, got, want) => t.push({ name, ok: JSON.stringify(got) === JSON.stringify(want), got, want });
  const throws = (name, fn) => { try { fn(); t.push({ name, ok: false, got: 'no error', want: 'an error' }); } catch { t.push({ name, ok: true }); } };

  eq('skill name ok', isSkillName('prd-template'), true);
  eq('skill name rejects traversal', isSkillName('../etc'), false);
  eq('skill name rejects slash', isSkillName('a/b'), false);
  eq('version ok', isVersion('1.0.0'), true);
  eq('version rejects two parts', isVersion('1.0'), false);
  eq('compare: 1.10.0 is after 1.9.0', compareVersions('1.10.0', '1.9.0'), 1);
  eq('compare: equal', compareVersions('2.0.0', '2.0.0'), 0);
  eq('compare: 0.0.0 is before 0.0.1', compareVersions('0.0.0', '0.0.1'), -1);

  const md = '---\nname: demo\ndescription: "Use when asked. Produces a thing."\n---\n\n# Demo\n';
  eq('read version: none', readVersion(md), null);
  eq('set then read', readVersion(setVersion(md, '1.2.3')), '1.2.3');
  eq('set replaces, never duplicates', (setVersion(setVersion(md, '1.0.0'), '1.1.0').match(/^version:/gm) || []).length, 1);
  eq('strip undoes set', stripVersion(setVersion(md, '1.0.0')), md);
  const crlf = md.replace(/\n/g, '\r\n');
  eq('CRLF: set then read', readVersion(setVersion(crlf, '1.0.0')), '1.0.0');
  eq('CRLF: line endings kept', setVersion(crlf, '1.0.0').includes('\r\nversion: 1.0.0\r\n'), true);
  eq('quoted version read', readVersion('---\nname: x\nversion: "2.0.0"\n---\n'), '2.0.0');
  throws('set without frontmatter throws', () => setVersion('# no frontmatter', '1.0.0'));

  const root = mkdtempSync(join(tmpdir(), 'skill-release-'));
  try {
    mkdirSync(join(root, 'skills', 'demo', 'references'), { recursive: true });
    mkdirSync(join(root, 'plugins', 'pm-x', 'skills', 'demo'), { recursive: true });
    writeFileSync(join(root, 'skills', 'demo', 'SKILL.md'), md);
    writeFileSync(join(root, 'skills', 'demo', 'references', 'notes.md'), 'notes\n');
    writeFileSync(join(root, 'skills', 'demo', '.DS_Store'), 'junk');
    writeFileSync(join(root, 'plugins', 'pm-x', 'skills', 'demo', 'SKILL.md'), md);

    throws('cut rejects traversal', () => cut(root, '../demo', '1.0.0', 'x'));
    throws('cut rejects a missing skill', () => cut(root, 'absent', '1.0.0', 'x'));
    throws('cut rejects empty notes', () => cut(root, 'demo', '1.0.0', '  '));
    throws('cut rejects a bad version', () => cut(root, 'demo', 'one', 'x'));

    const first = cut(root, 'demo', '1.0.0', 'First release', '2026-01-01');
    eq('cut stamps master and bundle copy', first.stamped, 2);
    eq('cut counts files, skipping dotfiles', first.entry.files, 2);
    eq('bundle copy carries the version', readVersion(readFileSync(join(root, 'plugins', 'pm-x', 'skills', 'demo', 'SKILL.md'), 'utf8')), '1.0.0');
    eq('check is clean after cut', check(root), { errors: [], warnings: [], skills: 1, releases: 1 });
    throws('cut rejects the same version twice', () => cut(root, 'demo', '1.0.0', 'again'));
    throws('cut rejects an older version', () => cut(root, 'demo', '0.9.0', 'older'));

    writeFileSync(join(root, 'skills', 'demo', 'references', 'notes.md'), 'edited\n');
    const drift = check(root);
    eq('an unreleased edit is a warning', [drift.errors.length, drift.warnings.length], [0, 1]);

    cut(root, 'demo', '1.1.0', 'Edited notes', '2026-02-01');
    eq('check is clean after the second cut', check(root).warnings.length, 0);

    writeFileSync(join(root, 'skill-releases', 'demo', '1.0.0', 'SKILL.md'), 'tampered');
    eq('a changed snapshot is an error', check(root).errors.length, 1);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }

  const failed = t.filter((x) => !x.ok);
  for (const x of failed) console.error(`✗ ${x.name}: got ${JSON.stringify(x.got)}, want ${JSON.stringify(x.want)}`);
  console.log(`skill-release selftest: ${t.length - failed.length} passed · ${failed.length} failed`);
  process.exit(failed.length ? 1 : 0);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) return selftest();
  const flag = (name) => { const i = argv.indexOf(name); return i === -1 ? undefined : argv[i + 1]; };

  if (argv[0] === 'cut') {
    try {
      const { entry, stamped } = cut(REPO, argv[1], flag('--version'), flag('--notes'));
      console.log(`Released ${argv[1]} ${entry.version}: ${entry.files} file(s) frozen in skill-releases/${argv[1]}/${entry.version}, version stamped on ${stamped} SKILL.md file(s).`);
      console.log('Next: node scripts/build-exports.mjs && node web/build-skills.mjs');
    } catch (e) {
      console.error(`Error: ${e.message}`);
      process.exit(1);
    }
    return;
  }

  if (argv[0] === 'list') {
    const rows = list(REPO);
    if (rows.length === 0) return console.log('No skill releases yet.');
    console.log('| Skill | Version | Released | Files | Notes |\n|---|---|---|---|---|');
    for (const r of rows) console.log(`| ${r.skill} | ${r.version} | ${r.releasedAt} | ${r.files} | ${r.notes} |`);
    return;
  }

  if (argv.includes('--check')) {
    const strict = argv.includes('--strict');
    const { errors, warnings, skills, releases } = check(REPO);
    for (const w of warnings) console.log(`  ▲ ${w}`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    const failed = errors.length + (strict ? warnings.length : 0);
    console.log(`Skill releases: ${releases} release(s) across ${skills} skill(s) · ${errors.length} error(s) · ${warnings.length} warning(s)`);
    process.exit(failed ? 1 : 0);
  }

  console.log('Usage: skill-release.mjs cut <skill> --version 1.2.3 --notes "..." | list | --check [--strict] | --selftest');
  process.exit(1);
}

const invokedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invokedDirectly) main();
