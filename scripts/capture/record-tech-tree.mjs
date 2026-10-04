#!/usr/bin/env node
// Records a zoom and pan through the skill tech tree as an animated WebP:
//   docs/readme-assets/tech-tree-tour.webp   (about 10 s, loops seamlessly)
// Needs site/tech-tree/data.json: node scripts/build-tech-tree.mjs
// The camera is driven through the page's own view/apply(), frame by frame, so the motion is
// smooth whatever the machine's speed.
//   NODE_PATH=/path/to/node_modules node scripts/capture/record-tech-tree.mjs [--lang zh]
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { launch, serve, encodeWebp, root, assets } from './lib.mjs';

const dir = join(root, 'site', 'tech-tree');
if (!existsSync(join(dir, 'data.json'))) { console.error('Run node scripts/build-tech-tree.mjs first.'); process.exit(1); }
const lang = process.argv.includes('--lang') ? process.argv[process.argv.indexOf('--lang') + 1] : 'en';
const W = 1040, H = 620, FPS = 12;
// Camera keyframes: [seconds, world x at centre, world y at centre, zoom]. Last equals first, so it loops.
const KEYS = [[0, 800, 900, 0.5], [1.2, 800, 900, 0.5], [3.6, 520, 230, 1.0], [5.0, 520, 230, 1.0], [8.4, 520, 1450, 1.0], [10.8, 800, 900, 0.5]];
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
function camera(t) {
  let i = 0; while (i < KEYS.length - 2 && t > KEYS[i + 1][0]) i++;
  const [t0, x0, y0, k0] = KEYS[i], [t1, x1, y1, k1] = KEYS[i + 1];
  const u = ease(Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));
  return { cx: x0 + (x1 - x0) * u, cy: y0 + (y1 - y0) * u, k: Math.exp(Math.log(k0) + (Math.log(k1) - Math.log(k0)) * u) };
}

const server = await serve(dir);
const browser = await launch();
const tmp = mkdtempSync(join(process.env.KEEP_FRAMES || tmpdir(), 'tree-'));
try {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: 'dark' });
  await page.addInitScript((l) => { try { localStorage.setItem('tt-lang', l); } catch { /* private mode */ } }, lang);
  await page.goto(`${server.url}/`);
  await page.waitForFunction(() => typeof DATA !== 'undefined' && DATA && document.querySelector('#world g'));
  await page.addStyleTag({ content: '.zoom{display:none!important}' });
  const frames = [];
  const total = KEYS[KEYS.length - 1][0];
  for (let f = 0; f < Math.round(total * FPS); f++) {
    const { cx, cy, k } = camera(f / FPS);
    await page.evaluate(({ cx, cy, k }) => { const w = el('wrap'); view.k = k; view.x = w.clientWidth / 2 - cx * k; view.y = w.clientHeight / 2 - cy * k; apply(); }, { cx, cy, k });
    const file = join(tmp, `f${String(f).padStart(4, '0')}.png`);
    await page.screenshot({ path: file });
    frames.push({ file, ms: 1000 / FPS });
  }
  const out = join(assets, lang === 'zh' ? 'tech-tree-tour-zh.webp' : 'tech-tree-tour.webp');
  encodeWebp(frames, out, Number(process.env.QUALITY || 60));
  console.log(`${out.split('/').pop()}: ${frames.length} frames, ${(statSync(out).size / 1048576).toFixed(2)} MB`);
} finally {
  await browser.close();
  await server.close();
  if (!process.env.KEEP_FRAMES) rmSync(tmp, { recursive: true, force: true });
}
