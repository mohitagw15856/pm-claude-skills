#!/usr/bin/env node
// Keep every bundle copy of a skill identical to its master in skills/<name>/.
//
// Bundles are installed straight from this repository (the marketplace entry points at
// ./plugins/<bundle>), so each bundle carries its own copy of the skills it ships and
// those copies must be committed. Copying them by hand after an edit is the step that
// gets forgotten; this script does it, and --check fails when a copy has drifted.
//
//   node scripts/sync-bundles.mjs            copy masters over stale bundle copies
//   node scripts/sync-bundles.mjs --check    exit 1 and list the stale copies (npm run check)
//   node scripts/sync-bundles.mjs --selftest
//
// A bundle skill with no master in skills/ is left alone and reported. No dependencies.
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['.DS_Store', '__pycache__']);

function walk(dir, base = dir, out = []) {
  for (const name of readdirSync(dir).sort()) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, base, out);
    else out.push(relative(base, p));
  }
  return out;
}

// Returns the list of differences for one copy, and fixes them when write is true.
export function syncOne(master, copy, write) {
  const diffs = [];
  const want = walk(master);
  const have = existsSync(copy) ? walk(copy) : [];
  for (const rel of want) {
    const a = readFileSync(join(master, rel));
    const b = existsSync(join(copy, rel)) ? readFileSync(join(copy, rel)) : null;
    if (b && a.equals(b)) continue;
    diffs.push(`${b ? 'stale' : 'missing'}: ${rel}`);
    if (write) { mkdirSync(dirname(join(copy, rel)), { recursive: true }); writeFileSync(join(copy, rel), a); }
  }
  for (const rel of have) {
    if (want.includes(rel)) continue;
    diffs.push(`extra: ${rel}`);
    if (write) rmSync(join(copy, rel));
  }
  return diffs;
}

export function syncAll(root, write) {
  const report = { stale: [], orphans: [], copies: 0 };
  const plugins = join(root, 'plugins');
  for (const bundle of readdirSync(plugins).sort()) {
    const dir = join(plugins, bundle, 'skills');
    if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;
    for (const name of readdirSync(dir).sort()) {
      const copy = join(dir, name);
      if (SKIP.has(name) || !statSync(copy).isDirectory()) continue;
      const master = join(root, 'skills', name);
      if (!existsSync(master)) { report.orphans.push(`${bundle}/${name}`); continue; }
      report.copies++;
      const diffs = syncOne(master, copy, write);
      if (diffs.length) report.stale.push({ copy: `plugins/${bundle}/skills/${name}`, diffs });
    }
  }
  return report;
}

function selftest() {
  const t = join(tmpdir(), `sync-bundles-${process.pid}`);
  const put = (p, s) => { mkdirSync(dirname(join(t, p)), { recursive: true }); writeFileSync(join(t, p), s); };
  let fails = 0;
  const eq = (label, a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) { fails++; console.error(`  ✗ ${label}: got ${JSON.stringify(a)}, wanted ${JSON.stringify(b)}`); } };
  try {
    put('skills/demo/SKILL.md', 'new'); put('skills/demo/scripts/a.py', 'a');
    put('plugins/pm-x/skills/demo/SKILL.md', 'old'); put('plugins/pm-x/skills/demo/scripts/gone.py', 'x');
    put('plugins/pm-x/skills/orphan/SKILL.md', 'o');
    const before = syncAll(t, false);
    eq('check finds the stale copy', before.stale.length, 1);
    eq('check lists each difference', before.stale[0].diffs, ['stale: SKILL.md', 'missing: scripts/a.py', 'extra: scripts/gone.py']);
    eq('check leaves files alone', readFileSync(join(t, 'plugins/pm-x/skills/demo/SKILL.md'), 'utf8'), 'old');
    eq('orphan is reported, not touched', before.orphans, ['pm-x/orphan']);
    syncAll(t, true);
    eq('write makes the copy clean', syncAll(t, false).stale.length, 0);
    eq('write removed the extra file', existsSync(join(t, 'plugins/pm-x/skills/demo/scripts/gone.py')), false);
    eq('orphan survives a write', existsSync(join(t, 'plugins/pm-x/skills/orphan/SKILL.md')), true);
  } finally { rmSync(t, { recursive: true, force: true }); }
  console.log(fails ? `sync-bundles selftest: ${fails} failure(s)` : 'sync-bundles selftest: 7 passed ✓');
  process.exit(fails ? 1 : 0);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes('--selftest')) selftest();
  const check = process.argv.includes('--check');
  const r = syncAll(ROOT, !check);
  for (const s of r.stale) console.log(`${check ? '✗ stale' : '↻ synced'} ${s.copy}  (${s.diffs.join('; ')})`);
  if (r.orphans.length) console.log(`note: ${r.orphans.length} bundle skill(s) have no master in skills/: ${r.orphans.slice(0, 8).join(', ')}${r.orphans.length > 8 ? ', …' : ''}`);
  if (check && r.stale.length) { console.error(`\n${r.stale.length} bundle copy(ies) differ from skills/. Run: node scripts/sync-bundles.mjs`); process.exit(1); }
  console.log(`Bundle copies: ${r.copies} checked, ${r.stale.length} ${check ? 'stale' : 'synced'}. ✓`);
}
