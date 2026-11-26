#!/usr/bin/env node
// XSS fuzz for the site: every page that reads URL parameters or the hash is
// loaded with script payloads in each of them, and the run fails if any payload
// executes. Two live bugs of this kind were fixed in October 2026 (credential.html
// rendered signed claims unescaped; find.html wrote ?q= into the page), and the
// site's origin holds visitors' API keys, so this runs in CI (web-tests.yml).
//
//   node tests/xss-fuzz.mjs                 # serves web/ itself on :8124
//   BASE=http://localhost:8000 node tests/xss-fuzz.mjs
//
// Payloads use words no skill matches, so search pages take their no-match path
// (the one that echoed the query). External requests are blocked: the test is
// about the page's own rendering. Not covered: payloads that must be signed
// first (credential.html's claims); that page escapes every claim instead.
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, extname, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const web = join(root, 'web');
const require = createRequire(import.meta.url);

async function loadPlaywright() {
  try { return await import('playwright'); } catch {}
  const dirs = [process.env.PLAYWRIGHT_DIR].filter(Boolean);
  const npx = join(process.env.HOME || '', '.npm', '_npx');
  if (existsSync(npx)) for (const d of readdirSync(npx)) dirs.push(join(npx, d, 'node_modules'));
  for (const d of dirs) { try { return await import(pathToFileURL(require.resolve('playwright', { paths: [d] })).href); } catch {} }
  throw new Error('playwright not found: npm i --no-save playwright (CI installs it)');
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
function serve(port) {
  return new Promise((resolve) => {
    const srv = createServer((req, res) => {
      const rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
      const p = join(web, rel || 'index.html');
      if (!p.startsWith(web)) { res.writeHead(403); return res.end(); }
      try { const body = readFileSync(p); res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' }); res.end(body); }
      catch { res.writeHead(404); res.end(); }
    });
    srv.listen(port, () => resolve(srv));
  });
}

// Which pages read what: query parameters by name, and whether the hash is used.
const targets = readdirSync(web).filter((f) => f.endsWith('.html')).map((f) => {
  const s = readFileSync(join(web, f), 'utf8');
  const params = [...new Set([...s.matchAll(/\.get\(\s*['"]([a-zA-Z_][\w-]*)['"]\s*\)/g)].map((m) => m[1]))];
  return { f, params, hash: /location\.hash/.test(s) };
}).filter((t) => t.params.length || t.hash);

const PAYLOADS = ['<iframe/onload=__xss=1>', '"><iframe/onload=__xss=1>', "'><iframe/onload=__xss=1>"];

const pw = await loadPlaywright();
const chromium = pw.chromium || (pw.default && pw.default.chromium);
const srv = process.env.BASE ? null : await serve(8124);
const BASE = process.env.BASE || 'http://localhost:8124';
// CHROMIUM_PATH points at a local browser build when Playwright's own is not installed.
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const ctx = await browser.newContext();
await ctx.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const hits = [];
let loads = 0;
for (const { f, params, hash } of targets) {
  for (const pay of PAYLOADS) {
    const urls = [];
    if (params.length) urls.push(`${f}?${params.map((k) => `${k}=${encodeURIComponent(pay)}`).join('&')}`);
    if (hash) urls.push(`${f}#${encodeURIComponent(pay)}`);
    for (const url of urls) {
      const page = await ctx.newPage();
      page.on('dialog', (d) => d.dismiss().catch(() => {}));
      try {
        await page.goto(`${BASE}/${url}`, { timeout: 10000 });
        await page.waitForTimeout(900);
        if (await page.evaluate(() => !!window.__xss)) hits.push(url);
      } catch { /* a page that fails to load is web-smoke's concern */ }
      loads++;
      await page.close();
    }
  }
}
await browser.close();
if (srv) srv.close();
if (hits.length) {
  console.error(`XSS fuzz: ${hits.length} payload(s) executed:`);
  for (const h of hits) console.error(`  ✗ ${h}`);
  console.error('Escape the value (textContent, or an esc() helper) before it reaches innerHTML.');
  process.exit(1);
}
console.log(`XSS fuzz: ${targets.length} pages, ${loads} loads, no payload executed. ✓`);
