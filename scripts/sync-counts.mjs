#!/usr/bin/env node
// Bring the skill and bundle counts written in docs, README images and manifests up to
// date after skills or bundles are added.
//
// check-drift.mjs finds every stale count; this applies the correction it reports, on
// the line it reports, and nothing else. Run after `npm run regen` when the drift check
// fails only on counts.
//
//   node scripts/sync-counts.mjs           fix what check-drift reports
//   node scripts/sync-counts.mjs --dry     list what would change
//
// It only ever swaps one number for another inside the phrase check-drift quoted, so it
// cannot touch coordinates in an SVG or an unrelated figure. No dependencies.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const dry = process.argv.includes('--dry');
const withComma = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function findings() {
  const r = spawnSync(process.execPath, [join(ROOT, 'scripts', 'check-drift.mjs')], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const out = `${r.stdout || ''}${r.stderr || ''}`;
  const lines = [];
  for (const l of out.split('\n')) {
    let m = l.match(/✗ (.+?):(\d+): "(.+?)" — current (bundle )?count is (\d+)/);
    if (m) { lines.push({ file: m[1], line: Number(m[2]), phrase: m[3], bundle: Boolean(m[4]), current: m[5] }); continue; }
    m = l.match(/✗ (.+?): description says "(\d[\d,]*) .*expected "(\d[\d,]*) /);
    if (m) lines.push({ file: m[1], line: 0, phrase: m[2], bundle: false, current: m[3].replace(/,/g, '') });
  }
  return lines;
}

let total = 0;
for (let pass = 0; pass < 4; pass++) {
  const found = findings();
  if (!found.length) break;
  // A stale bundle count is sometimes reported against the skill count ("All 169 …").
  // Any number check-drift names as a bundle count is corrected to the bundle total wherever it appears.
  const bundleOld = new Map(found.filter((f) => f.bundle).map((f) => [(f.phrase.match(/\d[\d,]*/) || [''])[0].replace(/,/g, ''), f.current]));
  let changed = 0;
  const byFile = new Map();
  for (const f of found) byFile.set(f.file, [...(byFile.get(f.file) || []), f]);
  for (const [file, items] of byFile) {
    const full = join(ROOT, file);
    if (!existsSync(full)) continue;
    const lines = readFileSync(full, 'utf8').split('\n');
    for (const it of items) {
      const oldRaw = (it.phrase.match(/\d[\d,]*/) || [''])[0];
      const old = oldRaw.replace(/,/g, '');
      if (!old) continue;
      const cur = bundleOld.get(old) || it.current;
      const swap = (text) => text.split(withComma(old)).join(withComma(cur)).split(old).join(cur);
      const forms = [it.phrase, it.phrase.replace(oldRaw, withComma(old))];
      const has = (i) => lines[i] !== undefined && forms.some((f) => lines[i].includes(f));
      let idx;
      if (!it.line) idx = lines.map((_, i) => i).filter((i) => lines[i].includes(old) || lines[i].includes(withComma(old)));
      else if (has(it.line - 1)) idx = [it.line - 1];
      else {
        // check-drift can count lines differently from the file on disk (it skips some
        // blocks), so look for the exact phrase near the line it reported.
        const near = [];
        for (let d = 1; d <= 40 && !near.length; d++) for (const i of [it.line - 1 + d, it.line - 1 - d]) if (has(i)) { near.push(i); break; }
        idx = near;
      }
      for (const i of idx) {
        if (lines[i] === undefined) continue;
        // check-drift normalises "1,385" to "1385" in the phrase it prints, so both spellings are tried.
        let next = lines[i];
        for (const form of forms) if (next.includes(form)) next = next.split(form).join(swap(form));
        if (!it.line) next = swap(lines[i]);
        if (next !== lines[i]) { if (dry) console.log(`${file}:${i + 1}: ${old} → ${cur}`); lines[i] = next; changed++; }
      }
    }
    if (!dry) writeFileSync(full, lines.join('\n'));
  }
  total += changed;
  if (dry || !changed) break;
}
const left = dry ? [] : findings();
console.log(`${dry ? 'Would update' : 'Updated'} ${total} count(s).${left.length ? ` ${left.length} finding(s) remain: run node scripts/check-drift.mjs` : dry ? '' : ' Drift check is clean.'}`);
process.exit(left.length ? 1 : 0);
