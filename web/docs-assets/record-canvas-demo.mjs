// Records the Workflow Canvas demo: build a recipe from skills, then run it with
// each step feeding the next. Drives the real UI; mocks the API so no key is needed.
// Usage: serve web/ on :8080, then node web/docs-assets/record-canvas-demo.mjs
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const chromium = pw.chromium || (pw.default && pw.default.chromium);
const VIEWPORT = { width: 1180, height: 860 };

const STAGE_TEXT = {
  prd: '# PRD — Referral Program\n**Goal:** +15% signups in Q3. Activated B2B users invite peers; both get a credit.',
  rice: '# RICE\nReferral program: Reach 5k · Impact 3 · Confidence 80% · Effort 2 → **score 6000**. Top priority.',
  gtm: '# GTM Plan\nAudience: activated admins. Channels: in-app, lifecycle email, CSM. Launch: phased 10%→100%.',
};
const chunk = (t) => t.match(/\S+\s*/g) || [t];

const initScript = ({ stages }) => {
  try { localStorage.setItem('anthropic_api_key', 'sk-ant-demo'); } catch (e) {}
  let call = 0;
  const realFetch = window.fetch.bind(window);
  window.fetch = (url, opts) => {
    const u = typeof url === 'string' ? url : (url && url.url) || '';
    if (!u.includes('api.anthropic.com')) return realFetch(url, opts);
    const chunks = stages[Math.min(call, stages.length - 1)]; call++;
    const enc = new TextEncoder(); let i = 0;
    const stream = new ReadableStream({ start(c) {
      const push = () => {
        if (i >= chunks.length) { c.enqueue(enc.encode('data: {"type":"message_stop"}\n\n')); c.close(); return; }
        c.enqueue(enc.encode('data: ' + JSON.stringify({ type: 'content_block_delta', delta: { text: chunks[i++] } }) + '\n\n'));
        setTimeout(push, 40);
      }; setTimeout(push, 120);
    } });
    return Promise.resolve(new Response(stream, { status: 200 }));
  };
};
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, recordVideo: { dir: __dirname, size: VIEWPORT } });
const page = await ctx.newPage();
await page.addInitScript(initScript, { stages: [chunk(STAGE_TEXT.prd), chunk(STAGE_TEXT.rice), chunk(STAGE_TEXT.gtm)] });

await page.goto('http://localhost:8080/canvas.html', { waitUntil: 'networkidle' });
await page.waitForSelector('.palette-item');
await pause(700);

// Build a recipe: PRD → RICE → GTM
for (const [term, title] of [['prd template', 'PRD Template'], ['rice', 'RICE Prioritisation'], ['go-to-market', 'Go-To-Market']]) {
  await page.fill('#paletteSearch', term);
  await pause(450);
  await page.locator('.palette-item', { hasText: title }).first().click();
  await pause(450);
}
await page.fill('#paletteSearch', '');
await pause(300);

await page.fill('#kickoff', 'a referral program for activated B2B users — goal +15% signups in Q3');
await pause(500);
await page.click('#runBtn');
await page.waitForFunction(() => document.querySelector('#status')?.textContent?.includes('complete'), { timeout: 15000 });
await pause(1800);

await ctx.close();
await browser.close();
console.log('Recorded canvas demo into', __dirname);
