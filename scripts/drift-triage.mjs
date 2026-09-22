#!/usr/bin/env node
// Drift triage (decision-layer idea #13). check-drift.mjs lists every stale count
// claim; this classifies each finding as cosmetic / semantic / breaking so the weekly
// regen only pages a human for the third bucket.
//   breaking — a manifest or install path (package.json, server.json, marketplace) is wrong
//   semantic — a headline claim a reader relies on (README, QUICKSTART, PACKS, web pages)
//   cosmetic — a stale number in a secondary doc
//   node scripts/drift-triage.mjs [--json]     # exit 1 only on breaking
//   node scripts/drift-triage.mjs --selftest
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ask, choice, configured, mockTransport } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export function parseFindings(stderr) {
  return stderr.split('\n').map((l) => l.match(/^\s*✗\s+([^:]+):(?:(\d+):)?\s*(.*)$/)).filter(Boolean).map((m) => ({ file: m[1], line: m[2] ? +m[2] : null, claim: m[3] }));
}
export function heuristicClass(f) {
  if (/^(package\.json|server\.json|\.claude-plugin\/marketplace\.json)$/.test(f.file)) return 'breaking';
  if (/^(README\.md|QUICKSTART\.md|PACKS\.md|CHEATSHEET\.md)$|^web\/index\.html$/.test(f.file)) return 'semantic';
  return 'cosmetic';
}
export async function triage(findings, { transport, env = process.env } = {}) {
  const live = transport || configured(env); const out = [];
  for (const f of findings) {
    if (!live) { out.push({ ...f, class: heuristicClass(f), method: 'heuristic' }); continue; }
    const r = await ask(f, { cls: choice('How serious is this stale count claim for a reader or an installer?', {
      breaking: 'a manifest, registry entry or install command carries the wrong number — tooling or a store listing is wrong',
      semantic: 'a headline claim a reader relies on to decide (README, quick start, a landing page) is wrong',
      cosmetic: 'a number in a secondary or historical document is out of date; nothing depends on it',
    }) }, { transport, env });
    out.push({ ...f, class: r.answers.cls.choice, p: +(r.answers.cls.probabilities?.[r.answers.cls.choice] || 0).toFixed(2), method: 'jev' });
  }
  return out;
}
export function runDrift() {
  const r = spawnSync(process.execPath, [join(ROOT, 'scripts', 'check-drift.mjs')], { encoding: 'utf8' });
  return { code: r.status, findings: parseFindings(r.stderr || ''), stdout: r.stdout };
}
export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const f = parseFindings('Drift check failed:\n\n  ✗ README.md:12: "1100 skills" — current count is 1166\n  ✗ package.json: description says "…" — expected "1166 professional …"\n  ✗ training/README.md:3: "900 skills" — current count is 1166\n');
  ok(f.length === 3 && f[0].line === 12 && f[1].line === null, 'parses findings with and without line numbers');
  const h = await triage(f, { env: {} });
  ok(h.map((x) => x.class).join(',') === 'semantic,breaking,cosmetic', `heuristic classes: ${h.map((x) => x.class).join(',')}`);
  const t = mockTransport((k, q, state) => (/package\.json/.test(state.file) ? 'breaking' : 'cosmetic'));
  const j = await triage(f, { transport: t });
  ok(j[1].class === 'breaking' && j[1].method === 'jev', 'model path classifies');
  const live = runDrift(); ok(typeof live.code === 'number', `check-drift runs (exit ${live.code}, ${live.findings.length} finding(s))`);
  console.log(`drift-triage self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) process.exit(await selftest());
  const { code, findings, stdout } = runDrift();
  if (code === 0) { console.log(stdout.trim() || 'Drift check clean.'); process.exit(0); }
  const rows = await triage(findings);
  if (argv.includes('--json')) console.log(JSON.stringify(rows, null, 1));
  else for (const cls of ['breaking', 'semantic', 'cosmetic']) { const g = rows.filter((r) => r.class === cls); if (g.length) { console.log(`${cls.toUpperCase()} (${g.length})`); for (const r of g) console.log(`  ${r.file}${r.line ? ':' + r.line : ''}  ${r.claim}`); } }
  const breaking = rows.filter((r) => r.class === 'breaking').length;
  console.log(`${rows.length} stale claim(s): ${breaking} breaking · ${rows.filter((r) => r.class === 'semantic').length} semantic · ${rows.filter((r) => r.class === 'cosmetic').length} cosmetic (${rows[0]?.method})`);
  process.exit(breaking ? 1 : 0);
}
