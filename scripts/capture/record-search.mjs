#!/usr/bin/env node
// Records the skill finder (web/find.html) as an animated WebP for the README:
// the query is typed a character at a time and the ranked skills appear.
//   docs/readme-assets/search-demo.webp      types "weekly report"
//   docs/readme-assets/search-demo-zh.webp   types "帮我写周报"
// Frames are deterministic screenshots, each held for a set time, then encoded with img2webp.
//   NODE_PATH=/path/to/node_modules node scripts/capture/record-search.mjs [--theme light|dark]
// KEEP_FRAMES=<dir> keeps the PNG frames there for checking.
import { mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { launch, serve, encodeWebp, root, assets } from './lib.mjs';

const theme = process.argv.includes('--theme') ? process.argv[process.argv.indexOf('--theme') + 1] : 'dark';
const RUNS = [
  { query: 'weekly report', out: 'search-demo.webp', perChar: 110 },
  { query: '帮我写周报', out: 'search-demo-zh.webp', perChar: 260 },
];
const W = 1000, H = 700;

const server = await serve(join(root, 'web'));
const browser = await launch();
try {
  for (const run of RUNS) {
    const tmp = mkdtempSync(join(process.env.KEEP_FRAMES || tmpdir(), 'search-'));
    const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: theme });
    await page.goto(`${server.url}/find.html`);
    await page.waitForFunction(() => /\d/.test(document.getElementById('total').textContent));
    // The tool menu is not the point of the clip; hiding it leaves room for the results.
    await page.addStyleTag({ content: '.toolbar-nav{display:none!important}' });
    const input = page.locator('#q');
    await input.click();
    const frames = [];
    let n = 0;
    const snap = async (ms) => { const file = join(tmp, `f${String(n++).padStart(4, '0')}.png`); await page.screenshot({ path: file }); frames.push({ file, ms }); };
    await snap(900);
    for (const ch of run.query) { await page.keyboard.insertText(ch); await snap(run.perChar); }
    await snap(1600);
    // Point at the best match, then hold so it can be read.
    await page.locator('.hit h3 a').first().hover();
    await page.locator('.hit').first().evaluate((el) => { el.style.outline = '2px solid var(--accent, #d97757)'; el.style.outlineOffset = '2px'; });
    await snap(3400);
    await page.close();
    const outFile = join(assets, run.out);
    encodeWebp(frames, outFile, 72);
    console.log(`${run.out}: ${frames.length} frames, ${(statSync(outFile).size / 1024).toFixed(0)} KB`);
    if (!process.env.KEEP_FRAMES) rmSync(tmp, { recursive: true, force: true });
  }
} finally {
  await browser.close();
  await server.close();
}
