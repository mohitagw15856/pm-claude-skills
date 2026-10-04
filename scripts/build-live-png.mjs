#!/usr/bin/env node
// PNG copies of the live README cards, for WeChat, Weibo and Xiaohongshu,
// which do not display SVG. Reads the SVGs that scripts/build-readme-live.mjs
// wrote to web/live/ and renders a still frame of each to web/live/png/ at 2x.
//
// Rendering uses @resvg/resvg-js, which is not a dependency of the package: CI
// installs it into a temporary folder and passes that folder in RESVG_MODULE_DIR.
// Without it the script says so and exits 0, so a local build never fails.
// CSS animations are ignored by resvg, so each PNG shows the card's resting state.
//
//   node scripts/build-live-png.mjs [--dir web/live]
//   RESVG_MODULE_DIR=/tmp/rv/node_modules node scripts/build-live-png.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/build-live-png.mjs [--dir web/live]  (needs @resvg/resvg-js; see the header comment)');
  process.exit(0);
}
const i = argv.indexOf('--dir');
const dir = resolve(root, i !== -1 && argv[i + 1] ? argv[i + 1] : 'web/live');

// Light variants: they read best in chat apps, which are mostly light.
const CARDS = ['skill-of-the-day-light', 'skill-of-the-day-zh-light', 'stats-light', 'stats-zh-light', 'whats-new-light', 'season', 'season-tw', 'modelbench-zh-light', 'cn-status-history-light'];

async function loadResvg() {
  try { return (await import('@resvg/resvg-js')).Resvg; } catch { /* not installed here */ }
  const extra = process.env.RESVG_MODULE_DIR;
  if (extra) {
    try { return createRequire(join(resolve(extra), 'noop.js'))('@resvg/resvg-js').Resvg; } catch (e) { console.error(`Could not load @resvg/resvg-js from ${extra}: ${e.message}`); }
  }
  return null;
}

const Resvg = await loadResvg();
if (!Resvg) {
  console.log('Skipping PNG cards: @resvg/resvg-js is not installed (set RESVG_MODULE_DIR to a folder that has it).');
  process.exit(0);
}
if (!existsSync(dir)) { console.error(`No ${dir}: run node scripts/build-readme-live.mjs first.`); process.exit(1); }
mkdirSync(join(dir, 'png'), { recursive: true });
let n = 0;
for (const name of CARDS) {
  const src = join(dir, `${name}.svg`);
  if (!existsSync(src)) continue;
  const svg = readFileSync(src, 'utf8');
  const width = +(svg.match(/width="(\d+)"/) || [, 860])[1];
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: width * 2 },
    font: { loadSystemFonts: true, defaultFontFamily: 'Noto Sans CJK SC' },
  }).render().asPng();
  writeFileSync(join(dir, 'png', `${name}.png`), png);
  n++;
}
console.log(`Wrote ${n} PNG card(s) to ${dir.replace(`${root}/`, '')}/png/.`);
