// Records the "Compare vs. plain prompt" demo. Drives the real playground UI;
// mocks BOTH API calls so the contrast is visible without a key — the with-skill
// call (has a system prompt) streams a structured exec update, the plain call
// (no system) streams generic mush. Re-record live by removing the fetch override.
//
// Usage: node web/docs-assets/record-compare-demo.mjs   (serve web/ on :8080 first)
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pwPath = process.env.PLAYWRIGHT_PATH || 'playwright';
const pw = await import(pwPath);
const chromium = pw.chromium || (pw.default && pw.default.chromium);

const BASE = process.env.DEMO_URL || 'http://localhost:8080/';
const VIEWPORT = { width: 1180, height: 820 };

const WITH_SKILL = `# Executive Update — Q2, for the CEO

**Headline:** Activation up 14 pts after the onboarding redesign; on track for Q2 with one staffing risk.

## Key metrics
- Weekly active accounts: 12,400 (+18% QoQ)
- Activation rate: 61% (+14 pts)
- Net revenue retention: 112%

## Risk & decision needed
Backend hiring is two roles behind — the Q3 billing revamp is at risk. Approve contractor budget to hold the date.`;

const PLAIN = `Here is an update on the quarter. The team worked hard this quarter and made good progress on a number of initiatives. Onboarding was improved and we saw some positive movement in our metrics overall. There are a few things we are keeping an eye on going forward, and we will continue to monitor the situation and provide updates as needed. Overall it was a solid quarter with room to improve.`;

const chunk = (t) => t.match(/\S+\s*/g) || [t];

const initScript = ({ withChunks, plainChunks }) => {
  try { localStorage.setItem('anthropic_api_key', 'sk-ant-demo-key-not-real'); } catch (e) {}
  const realFetch = window.fetch.bind(window);
  window.fetch = (url, opts) => {
    const u = typeof url === 'string' ? url : (url && url.url) || '';
    if (!u.includes('api.anthropic.com')) return realFetch(url, opts);
    let hasSystem = false;
    try { hasSystem = !!JSON.parse(opts.body).system; } catch (e) {}
    const chunks = hasSystem ? withChunks : plainChunks;
    const enc = new TextEncoder();
    let i = 0;
    const stream = new ReadableStream({
      start(controller) {
        const push = () => {
          if (i >= chunks.length) {
            controller.enqueue(enc.encode('data: {"type":"message_stop"}\n\n'));
            controller.close();
            return;
          }
          const evt = { type: 'content_block_delta', delta: { type: 'text_delta', text: chunks[i++] } };
          controller.enqueue(enc.encode('data: ' + JSON.stringify(evt) + '\n\n'));
          setTimeout(push, 38);
        };
        setTimeout(push, 150);
      },
    });
    return Promise.resolve(new Response(stream, { status: 200, headers: { 'content-type': 'text/event-stream' } }));
  };
};

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, recordVideo: { dir: __dirname, size: VIEWPORT } });
const page = await context.newPage();
await page.addInitScript(initScript, { withChunks: chunk(WITH_SKILL), plainChunks: chunk(PLAIN) });

await page.goto(BASE + '?skill=executive-update', { waitUntil: 'networkidle' });
await page.waitForSelector('#inputForm input, #inputForm textarea');
await pause(700);

await page.locator('#f_0').type('Shipped onboarding redesign; activation up sharply; backend hiring behind, billing revamp at risk for Q3.', { delay: 6 });
await page.locator('#f_1').type('CEO', { delay: 22 });
await page.locator('#f_2').type('Q2', { delay: 22 });
await page.locator('#f_3').type('WAA, activation, NRR', { delay: 16 });
await pause(400);

await page.check('#compareToggle');
await pause(700);
await page.click('#runBtn');
await page.waitForFunction(() => document.querySelector('#status')?.textContent?.includes('Done'), { timeout: 15000 });
await pause(2200);

await context.close();
await browser.close();
console.log('Recorded compare demo into', __dirname);
