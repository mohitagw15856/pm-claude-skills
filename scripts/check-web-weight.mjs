#!/usr/bin/env node
// Page-weight budget for web/.
//
// The playground grew to 93 MB across 94 pages without anything ever failing a
// build over it, and skills.json reached 7.1 MB while being fetched before
// first paint. Neither was a decision; both were an accumulation. This makes
// the size a number somebody has to raise on purpose.
//
// Text is measured gzipped, because that is what a visitor actually downloads —
// GitHub Pages and Vercel both negotiate it. Binaries are measured raw, since
// they are already compressed.
//
//   node scripts/check-web-weight.mjs           # report
//   node scripts/check-web-weight.mjs --check   # exit 1 on any breach
//   node scripts/check-web-weight.mjs --json
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const webDir = join(root, 'web');
const budgetFile = join(root, 'web-budget.json');
const check = process.argv.includes('--check');
const asJson = process.argv.includes('--json');

const budget = JSON.parse(readFileSync(budgetFile, 'utf8'));
const TEXT = new Set(['.html', '.js', '.mjs', '.css', '.json', '.txt', '.svg', '.xml', '.md']);
const MB = 1048576;

// Generated-but-gitignored files are absent in a bare checkout; a budget check
// that fails because a file has not been built yet is noise, not a signal.
const walk = (dir, acc = []) => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push({ path: relative(webDir, p), abs: p, raw: st.size });
  }
  return acc;
};

const files = walk(webDir).map((f) => {
  const isText = TEXT.has(extname(f.path).toLowerCase());
  // Wire weight: gzip for text, raw for already-compressed binaries.
  const wire = isText ? gzipSync(readFileSync(f.abs), { level: 6 }).length : f.raw;
  return { ...f, isText, wire };
});

const byPath = new Map(files.map((f) => [f.path, f]));
const problems = [];

// ── Rule 1: named files with their own ceiling ───────────────────────────────
for (const [path, limitMb] of Object.entries(budget.files || {})) {
  const f = byPath.get(path);
  if (!f) continue; // not built in this checkout
  if (f.wire > limitMb * MB) {
    problems.push(`${path}: ${(f.wire / MB).toFixed(2)} MB ${f.isText ? 'gzipped' : ''} exceeds ${limitMb} MB`);
  }
}

// ── Rule 2: directory totals ─────────────────────────────────────────────────
for (const [dir, limitMb] of Object.entries(budget.directories || {})) {
  const total = files.filter((f) => f.path === dir || f.path.startsWith(dir.replace(/\/?$/, '/')))
    .reduce((a, f) => a + f.raw, 0);
  if (total > limitMb * MB) {
    problems.push(`${dir}/: ${(total / MB).toFixed(1)} MB on disk exceeds ${limitMb} MB`);
  }
}

// ── Rule 3: no single asset over the cap, whatever it is ─────────────────────
const cap = budget.maxSingleAssetMb;
if (cap) {
  for (const f of files) {
    if (budget.files && budget.files[f.path] !== undefined) continue; // has its own ceiling
    if (f.wire > cap * MB) {
      problems.push(`${f.path}: ${(f.wire / MB).toFixed(2)} MB exceeds the ${cap} MB per-asset cap`);
    }
  }
}

const totalRaw = files.reduce((a, f) => a + f.raw, 0);
if (budget.totalMb && totalRaw > budget.totalMb * MB) {
  problems.push(`web/ total: ${(totalRaw / MB).toFixed(1)} MB exceeds ${budget.totalMb} MB`);
}

if (asJson) {
  console.log(JSON.stringify({
    totalMb: +(totalRaw / MB).toFixed(2),
    files: files.sort((a, b) => b.wire - a.wire).slice(0, 20)
      .map((f) => ({ path: f.path, rawMb: +(f.raw / MB).toFixed(2), wireMb: +(f.wire / MB).toFixed(2) })),
    problems,
  }, null, 2));
} else {
  console.log(`Web weight — ${files.length} files, ${(totalRaw / MB).toFixed(1)} MB on disk\n`);
  console.log('Heaviest over the wire (text gzipped):');
  for (const f of files.sort((a, b) => b.wire - a.wire).slice(0, 10)) {
    console.log(`  ${(f.wire / MB).toFixed(2).padStart(6)} MB  ${f.path}${f.isText ? `  (${(f.raw / MB).toFixed(1)} MB raw)` : ''}`);
  }
  if (problems.length) {
    console.error(`\n${problems.length} budget breach(es):`);
    for (const p of problems) console.error('  ✗ ' + p);
    console.error('\nShrink the asset, or raise the limit in web-budget.json on purpose.');
  } else {
    console.log('\nWithin budget. ✓');
  }
}

if (check && problems.length) process.exit(1);
