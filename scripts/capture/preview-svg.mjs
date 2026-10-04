#!/usr/bin/env node
// Renders an animated README SVG to PNG stills at given times, to eyeball each scene.
//   NODE_PATH=... node scripts/capture/preview-svg.mjs docs/readme-assets/before-after.svg /tmp/ba 4 9 14
import { resolve } from 'node:path';
import { launch } from './lib.mjs';

const [file, outPrefix, ...times] = process.argv.slice(2);
if (!file || !outPrefix) { console.error('usage: preview-svg.mjs <svg> <out-prefix> [seconds...]'); process.exit(1); }
const browser = await launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.goto('file://' + resolve(file));
for (const t of times.length ? times : ['0']) {
  await page.evaluate((ms) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; }), Number(t) * 1000);
  await page.locator('svg').screenshot({ path: `${outPrefix}-${t}.png` });
}
await browser.close();
