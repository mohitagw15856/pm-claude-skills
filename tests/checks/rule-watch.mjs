#!/usr/bin/env node
// Rule-change watcher (scripts/watch-rule-sources.mjs), offline against a stub
// server: the first run records a baseline, menu and script noise is not a
// change, a text change names the dependent skills, an unreachable page keeps
// its old hash, and the state survives a round trip through the issue body.
// Also validates the real data/rule-sources.json.
import { execFileSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = join(root, 'scripts', 'watch-rule-sources.mjs');
execFileSync(process.execPath, [script, '--check'], { stdio: 'ignore' });

const rules = 'The standard rate is 20 per cent. The reduced rate is 5 per cent. Zero-rated goods include most food and children\'s clothes. '.repeat(3);
const page = (body, noise) => `<html><head><script>var token="${noise}"</script></head><body><nav>Menu ${noise}</nav><main><h1>VAT rates</h1><p>${body}</p></main><footer>${noise}</footer></body></html>`;
const pages = { '/vat': page(rules, 'a'), '/wage': page(rules.replace(/VAT/g, 'wage'), 'a') };
let down = false;
const server = createServer((req, res) => {
  if (down && req.url === '/wage') { res.statusCode = 503; return res.end('busy'); }
  res.setHeader('content-type', 'text/html');
  res.end(pages[req.url] || '');
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
const dir = mkdtempSync(join(tmpdir(), 'rule-watch-'));
try {
  const sources = join(dir, 'sources.json');
  writeFileSync(sources, JSON.stringify({ sources: [
    { id: 'vat', title: 'VAT rates', url: `${base}/vat`, skills: ['tax-planning-checklist', 'quarterly-tax-rhythm'] },
    { id: 'wage', title: 'Wage rates', url: `${base}/wage`, skills: ['payroll-eve-check'] },
  ] }));
  const state = join(dir, 'state.json'), summary = join(dir, 'summary.md'), body = join(dir, 'body.md');
  // Async: a synchronous child would block this process, and with it the stub server.
  const run = (st = state) => new Promise((resolve, reject) => {
    const p = spawn(process.execPath, [script, '--sources', sources, '--state', st, '--summary', summary, '--issue-body', body], { env: { ...process.env, GITHUB_OUTPUT: '' } });
    let out = '';
    p.stdout.on('data', (d) => { out += d; });
    p.stderr.on('data', (d) => { out += d; });
    p.on('close', (code) => (code === 0 ? resolve(out) : reject(new Error(out))));
  });

  let out = await run();
  assert.match(out, /0 changed · 2 new baseline/);
  assert.ok(!existsSync(summary), 'no summary on a baseline run');

  pages['/vat'] = page(rules, 'b');
  out = await run();
  assert.match(out, /0 changed · 0 new baseline/, 'script, nav and footer noise is not a change');

  pages['/vat'] = page(rules.replace('20 per cent', '22 per cent'), 'b');
  down = true;
  out = await run();
  assert.match(out, /1 changed/);
  assert.match(out, /1 unreachable/);
  const md = readFileSync(summary, 'utf8');
  assert.match(md, /VAT rates/);
  assert.match(md, /rules-reviewed\.mjs --review quarterly-tax-rhythm/);
  assert.match(md, /rules-reviewed\.mjs --review tax-planning-checklist/);
  assert.doesNotMatch(md, /--review payroll-eve-check/, 'an unreachable page is not reported as changed');
  assert.match(md, /Could not read this run: wage/);

  // The issue body carries the state: a run that reads it sees no change.
  down = false;
  const issueCopy = join(dir, 'issue.md');
  writeFileSync(issueCopy, readFileSync(body, 'utf8'));
  assert.match(readFileSync(issueCopy, 'utf8'), /<!-- rule-watch-state/);
  rmSync(summary);
  out = await run(issueCopy);
  assert.match(out, /0 changed · 0 new baseline/);
  console.log('rule-watch: baseline, noise, change, unreachable and issue-body state ✓');
} finally {
  server.close();
  rmSync(dir, { recursive: true, force: true });
}
