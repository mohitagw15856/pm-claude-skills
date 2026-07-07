#!/usr/bin/env node
// Web smoke suite — loads every interactive page headlessly and fails on ANY
// console error or uncaught page error, plus a few load-bearing interaction
// checks (keyless-run guards, command-bar matching, artifact renderers).
// This is the insurance layer: it would have caught the Galaxy TDZ crash and
// the label-scaling bug before a human did.
//
//   node tests/web-smoke.mjs            # serves web/ itself on :8123
//   BASE=http://localhost:8000 node tests/web-smoke.mjs   # against your own server
//
// Plain node + playwright (resolved from local install, npx cache, or
// PLAYWRIGHT_DIR) — no test-runner dependency.
import { createServer } from 'node:http';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

async function loadPlaywright() {
  try { return await import('playwright'); } catch {}
  const dirs = [process.env.PLAYWRIGHT_DIR].filter(Boolean);
  // npx cache fallback (local dev convenience)
  const npx = join(process.env.HOME || '', '.npm', '_npx');
  if (existsSync(npx)) for (const d of readdirSync(npx)) dirs.push(join(npx, d, 'node_modules'));
  for (const d of dirs) {
    try { return await import(pathToFileURL(require.resolve('playwright', { paths: [d] })).href); } catch {}
  }
  throw new Error('playwright not found — npm i -D playwright (CI installs it)');
}

// ── Tiny static server for web/ ───────────────────────────────────────────────
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.txt': 'text/plain', '.xml': 'text/xml', '.jpg': 'image/jpeg' };
function serve(dir, port) {
  return new Promise((resolve) => {
    const srv = createServer((req, res) => {
      const p = join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/\/$/, '/index.html'));
      try {
        const body = readFileSync(p);
        res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
        res.end(body);
      } catch { res.writeHead(404); res.end('nope'); }
    });
    srv.listen(port, () => resolve(srv));
  });
}

// Errors we deliberately ignore: third-party analytics being blocked in CI.
const IGNORE = [/goatcounter/i, /gc\.zgo\.at/i, /net::ERR_(BLOCKED_BY_CLIENT|NAME_NOT_RESOLVED)/i, /favicon/i];
const ignorable = (t) => IGNORE.some((re) => re.test(t));

// ── The page matrix: every interactive page + optional per-page assertions ────
const PAGES = [
  { url: 'index.html', async check(p) {
      await p.waitForFunction(() => window.SKILLS === undefined || document.querySelectorAll('.skill-card').length > 0, null, { timeout: 15000 }).catch(() => {});
      // Command bar routes a plain-language task locally, no key needed.
      await p.fill('#cmdInput', 'a blameless postmortem for the outage');
      await p.waitForTimeout(400);
      if ((await p.locator('.cmd-hit').count()) < 1) throw new Error('command bar returned no matches');
      // Living-artifact renderer turns a tagged block into a component.
      const ok = await p.evaluate(() => {
        const d = document.createElement('div');
        d.innerHTML = '<pre><code class="language-artifact">{"renderer":"scorecard","items":[{"label":"t","score":5,"max":10}]}</code></pre>';
        document.body.appendChild(d); PMArtifacts.enhance(d);
        return !!d.querySelector('.pm-art');
      });
      if (!ok) throw new Error('PMArtifacts renderer failed');
    } },
  { url: 'boardroom.html', async check(p) {
      await p.fill('#doc', 'x'.repeat(120));
      await p.click('#runBtn'); await p.waitForTimeout(300);
      const s = await p.locator('#status').textContent();
      if (!/key/i.test(s || '')) throw new Error('keyless guard missing: ' + s);
    } },
  { url: 'defend.html', async check(p) {
      await p.fill('#doc', 'x'.repeat(120));
      await p.locator('#runBtn, button.primary').first().click(); await p.waitForTimeout(300);
      const s = await p.locator('.status').first().textContent();
      if (!/key/i.test(s || '')) throw new Error('keyless guard missing');
    } },
  { url: 'gym.html', async check(p) {
      await p.click('#startBtn'); await p.waitForTimeout(300);
      const s = await p.locator('#status').textContent();
      if (!/key/i.test(s || '')) throw new Error('keyless guard missing');
    } },
  { url: 'gauntlet.html', async check(p) {
      await p.fill('#jd', 'x'.repeat(250));
      await p.click('#b1'); await p.waitForTimeout(300);
      const s = await p.locator('#st1').textContent();
      if (!/key/i.test(s || '')) throw new Error('keyless guard missing');
    } },
  { url: 'firm.html', async check(p) {
      if ((await p.locator('.staff').count()) !== 6) throw new Error('staff roster wrong size');
      await p.fill('#charter', 'x'.repeat(80));
      await p.click('#runBtn'); await p.waitForTimeout(300);
      const s = await p.locator('#status').textContent();
      if (!/key/i.test(s || '')) throw new Error('keyless guard missing');
    } },
  { url: 'xray.html', async check(p) {
      const ok = await p.evaluate(() => {
        document.getElementById('scan').hidden = false;
        render({ sentences: [{ t: 'Churn rose 15% in Q2.', c: 'data', note: 'x' }, { t: 'We are the best.', c: 'superlative', note: 'y' }], loadBearing: [0], fixFirst: [1] });
        return document.querySelectorAll('#film .s').length === 2 && document.querySelectorAll('#fixFirst .worst').length === 1;
      });
      if (!ok) throw new Error('x-ray render pipeline broken');
    } },
  { url: 'galaxy.html', settle: 2500, async check(p) {
      await p.fill('#galaxySearch', 'rice prioritisation');
      await p.press('#galaxySearch', 'Enter');
      await p.waitForTimeout(1300);
      const t = await p.locator('#gpanel h2').textContent().catch(() => null);
      if (!t) throw new Error('search fly-to did not open the panel');
      await p.click('#warpBtn'); await p.waitForTimeout(1100);
    } },
  { url: 'verify.html', async check(p) {
      const cls = await p.evaluate(async () => {
        const doc = 'exact text '.repeat(20).trim();
        const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(doc));
        const hash = [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
        document.getElementById('doc').value = doc;
        document.getElementById('att').value = JSON.stringify({ spec: 'pm-skills-attestation/1', document: { sha256: hash }, session: {}, verdict: 'test' });
        document.getElementById('go').click();
        await new Promise((r) => setTimeout(r, 400));
        return document.getElementById('out').className;
      });
      if (!/ok/.test(cls)) throw new Error('attestation round-trip failed: ' + cls);
    } },
  { url: 'hiring.html', async check(p) {
      await p.fill('#role', 'Senior PM for a payments platform, owns onboarding');
      await p.click('#b1'); await p.waitForTimeout(300);
      const s = await p.locator('#st1').textContent();
      if (!/key/i.test(s || '')) throw new Error('keyless guard missing');
    } },
  { url: 'academy.html', async check(p) {
      if ((await p.locator('.track').count()) !== 3) throw new Error('expected 3 tracks');
      await p.click('.track[data-t="exec"]'); await p.waitForTimeout(200);
      if ((await p.locator('.drill').count()) !== 6) throw new Error('expected 6 drills');
      await p.click('.opt[data-d="0"][data-o="1"]'); await p.waitForTimeout(200);
      if ((await p.locator('.why').count()) !== 1) throw new Error('drill feedback missing');
    } },
  { url: 'wrapped.html', async check(p) {
      // Fresh browser context = empty state: one card with the arena CTAs.
      if ((await p.locator('.card').count()) < 1) throw new Error('no cards rendered');
      if (!(await p.locator('.card.on').textContent()).includes('Nothing here yet')) throw new Error('empty state missing');
    } },
  { url: 'campaign.html', async check(p) {
      if ((await p.locator('.day').count()) !== 8) throw new Error('expected 8 chapters');
      // false-completion guard: check-progress with no arena data must not advance
      await p.click('#check'); await p.waitForTimeout(200);
      if (!/not yet/i.test(await p.locator('#cnote').textContent())) throw new Error('completion guard missing');
    } },
  { url: 'reckoning.html', async check(p) {
      await p.fill('#ptext', 'Activation exceeds fifty percent by end of Q3');
      await p.click('#padd'); await p.waitForTimeout(200);
      if ((await p.locator('#openList .pred').count()) < 1) throw new Error('prediction not recorded');
    } },
  { url: 'handbook.html', settle: 2500, async check(p) {
      if ((await p.locator('h3.skill-h').count()) < 40) throw new Error('craft chapters did not render');
      if ((await p.locator('.alm-skill').count()) < 400) throw new Error('almanac did not render');
    } },
  { url: 'charter.html', async check(p) {
      if ((await p.locator('.req').count()) !== 4) throw new Error('expected 4 requirements');
      if (!(await p.locator('#progressLine').textContent()).includes('0/4')) throw new Error('should start locked');
    } },
  { url: 'tower.html', settle: 3000, async check(p) {
      await p.waitForFunction(() => window.__towerReady, null, { timeout: 20000 });
      await p.click('#demo'); await p.waitForTimeout(1200);
      if (!/9 blocks/.test(await p.locator('#status').textContent())) throw new Error('demo tower did not build');
    } },
  { url: 'stage.html', async check(p) {
      if (!(await p.locator('#enter').isVisible())) throw new Error('entry card missing');
    } },
  { url: 'galaxy3d.html', settle: 3000, async check(p) {
      await p.waitForFunction(() => window.__galaxyReady, null, { timeout: 25000 });
      const r = await p.evaluate(() => window.__galaxyReady);
      if (r.stars < 400) throw new Error('starfield incomplete: ' + r.stars);
    } },
  { url: 'city.html', settle: 3000, async check(p) {
      await p.waitForFunction(() => window.__cityReady, null, { timeout: 25000 });
    } },
  { url: 'trophy.html', settle: 2000, async check(p) {
      await p.waitForFunction(() => window.__trophyReady, null, { timeout: 20000 });
    } },
  { url: 'status.html', settle: 2500, async check(p) {
      if ((await p.locator('.vcard').count()) !== 4) throw new Error('vitals cards missing');
    } },
  { url: 'canvas.html' }, { url: 'agent.html' }, { url: 'studio.html' },
  { url: 'brain.html' }, { url: 'ask.html' }, { url: 'daily.html' },
  { url: 'jobs.html' }, { url: 'hub.html' }, { url: 'grade.html' },
  { url: 'learn.html' }, { url: 'examples.html' },
  // NOTE: catalog/leaderboard/community/coverage are GENERATED pages
  // (gitignored) — they don't exist in a fresh checkout, so CI can't load
  // them. They're covered indirectly: build scripts run in check-generated.
];

const base = process.env.BASE || '';
let server = null, origin = base;
if (!base) { server = await serve(join(root, 'web'), 8123); origin = 'http://localhost:8123'; }

const pw = await loadPlaywright();
const chromium = pw.chromium || pw.default?.chromium;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 850 } });
// The live free-trial endpoint must NEVER serve CI: block the production worker
// so the trial reads as disabled, keyless guards fire, and no sponsored runs burn.
await ctx.route(/pm-skills-mcp.*workers\.dev/, (route) => {
  const u = route.request().url();
  if (u.endsWith('/try') && route.request().method() === 'GET') return route.fulfill({ json: { enabled: false } });
  return route.fulfill({ status: 503, json: { error: 'blocked-in-ci' } });
});
let failures = 0;
for (const spec of PAGES) {
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !ignorable(m.text())) errs.push('console: ' + m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errs.push('pageerror: ' + String(e.message).slice(0, 200)));
  // Name the URL on any 4xx/5xx — console 404 messages omit it, which makes failures unreadable.
  page.on('response', (r) => { if (r.status() >= 400 && !ignorable(r.url())) errs.push('http ' + r.status() + ': ' + r.url().slice(-120)); });
  try {
    await page.goto(origin + '/' + spec.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(spec.settle || 1200);
    if (spec.check) await spec.check(page);
    if (errs.length) throw new Error(errs.join(' | '));
    console.log('✓ ' + spec.url);
  } catch (e) {
    failures++;
    console.error('✗ ' + spec.url + ' — ' + (e.message || e) + (errs.length ? ' | ' + errs.join(' | ') : ''));
  }
  await page.close();
}
await browser.close();
if (server) server.close();
console.log(failures ? `\n${failures} page(s) failing` : `\nAll ${PAGES.length} pages clean ✓`);
process.exit(failures ? 1 : 0);
