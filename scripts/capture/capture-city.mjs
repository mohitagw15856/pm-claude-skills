#!/usr/bin/env node
// Still of the 3D skill city (web/city.html) for the README: docs/readme-assets/city.webp
// Windows only light up for skills a visitor has used, so a sample practice (every ninth skill,
// a few runs each) is seeded into localStorage first; an empty city reads as a dark field.
// Needs network for three.js from jsDelivr, as the live page does.
//   NODE_PATH=/path/to/node_modules node scripts/capture/capture-city.mjs
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { launch, serve, root, assets } from './lib.mjs';

const W = 1400, H = 760;
const catalog = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const names = (catalog.skills || catalog).filter((s) => !s.deprecated).map((s) => s.name);
const sample = names.filter((_, i) => i % 9 === 0).flatMap((name, i) => Array.from({ length: 1 + (i % 3) }, () => ({ name, at: '2026-09-01T09:00:00Z' })));

const server = await serve(join(root, 'web'));
const browser = await launch();
const tmp = mkdtempSync(join(tmpdir(), 'city-'));
try {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: 'dark' });
  await page.addInitScript((runs) => { try { localStorage.setItem('pm_workspace', JSON.stringify(runs)); } catch { /* private mode */ } }, sample);
  await page.goto(`${server.url}/city.html`);
  await page.waitForFunction(() => window.__cityReady, null, { timeout: 60000 });
  await page.waitForTimeout(4000); // let the fly-over settle and the damping come to rest
  const png = join(tmp, 'city.png');
  await page.screenshot({ path: png });
  const out = join(assets, 'city.webp');
  const r = spawnSync(process.env.CWEBP || 'cwebp', ['-quiet', '-q', '90', '-m', '6', png, '-o', out], { stdio: 'inherit' });
  if (r.status !== 0) { console.error('cwebp failed (brew install webp)'); process.exit(1); }
  console.log(`city.webp: ${(statSync(out).size / 1024).toFixed(0)} KB`);
} finally {
  await browser.close();
  await server.close();
  rmSync(tmp, { recursive: true, force: true });
}
