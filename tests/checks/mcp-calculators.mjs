#!/usr/bin/env node
// The MCP server's calculator tools, exercised over stdio exactly as a client would.
// Checks that a bundled calculator runs and returns its real output, that files land in
// the temporary folder, and that arguments pointing outside that folder are refused.
import { spawn, spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
if (spawnSync('python3', ['--version']).status !== 0) { console.log('mcp calculators: python3 not available, skipped.'); process.exit(0); }

const child = spawn(process.execPath, [join(root, 'mcp', 'server.mjs')], { stdio: ['pipe', 'pipe', 'ignore'] });
const waiting = new Map();
let buffer = '';
child.stdout.on('data', (d) => {
  buffer += d;
  let i;
  while ((i = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, i); buffer = buffer.slice(i + 1);
    try { const m = JSON.parse(line); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } } catch { /* not ours */ }
  }
});
let nextId = 1;
const call = (name, args) => new Promise((resolve, reject) => {
  const id = nextId++;
  const timer = setTimeout(() => reject(new Error(`${name} timed out`)), 60000);
  waiting.set(id, (m) => { clearTimeout(timer); resolve(m.result); });
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method: 'tools/call', params: { name, arguments: args } }) + '\n');
});

let pass = 0; let fail = 0;
const ok = (label, cond, detail = '') => { if (cond) pass++; else { fail++; console.error(`  ✗ ${label} ${detail}`); } };

try {
  const list = await call('list_calculators', { query: 'cohort' });
  ok('lists the cohort calculator', list.structuredContent.calculators.some((c) => c.id === 'cohort-curve-model/cohort_model.py'));
  ok('test files are not listed', !(await call('list_calculators', {})).structuredContent.calculators.some((c) => /\/test_/.test(c.id)));

  const run = await call('run_calculator', { id: 'cohort-curve-model/cohort_model.py', args: ['fit', 'out.xlsx', '--observed', '[100,62,48,41,37,34,32]', '--arpu', '40'] });
  const s = run.structuredContent;
  ok('runs and returns the computed fit', s.ok && /a=0\.619 b=0\.371/.test(s.output), s.output);
  ok('output file is inside the temp folder', s.files.length === 1 && s.files[0].startsWith(tmpdir()) && existsSync(s.files[0]), JSON.stringify(s.files));

  const bad = await call('run_calculator', { id: 'cohort-curve-model/cohort_model.py', args: ['fit', 'out.xlsx', '--observed', '[100,50,40,0]'] });
  ok('a script error comes back as a result, not a crash', bad.structuredContent.ok === false && bad.structuredContent.exitCode !== 0);

  const refused = [
    { id: 'cohort-curve-model/cohort_model.py', args: ['fit', '/tmp/escape.xlsx', '--observed', '[100,62,48,41]'] },
    { id: 'cohort-curve-model/cohort_model.py', args: ['fit', '../escape.xlsx', '--observed', '[100,62,48,41]'] },
    { id: 'cohort-curve-model/cohort_model.py', args: ['fit', 'a.xlsx', '--observed-file=/etc/passwd'] },
    { id: 'cohort-curve-model/cohort_model.py', args: ['fit', '~/escape.xlsx'] },
    { id: 'cohort-curve-model/cohort_model.py', args: 'fit out.xlsx' },
    { id: 'cohort-curve-model/cohort_model.py', args: [1, 2] },
    { id: '../../etc/passwd', args: [] },
    { id: 'cohort-curve-model/../cohort-curve-model/cohort_model.py', args: [] },
    { id: 'no-such/thing.py', args: [] },
  ];
  for (const r of refused) {
    const res = await call('run_calculator', r);
    ok(`refuses ${JSON.stringify(r).slice(0, 80)}`, res.isError === true, JSON.stringify(res).slice(0, 160));
  }
} catch (e) { fail++; console.error(`  ✗ ${e.message}`); }
child.kill();
console.log(`mcp calculators: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
