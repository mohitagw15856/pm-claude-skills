// Records the Skill Playground hero demo as a video, driving the real UI with
// Playwright. The navigation, skill selection, and form-fill are genuine; only
// the streamed model output is mocked (a representative Executive Update) so the
// recording needs no API key. Re-run with a live key to capture a real call.
//
// Usage:  node web/docs-assets/record-demo.mjs
// Then convert the .webm to playground-demo.gif (see record-demo.sh).

import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

// Playwright may be installed locally or only in the npx cache; resolve either.
const require = createRequire(import.meta.url);
const pwPath = process.env.PLAYWRIGHT_PATH || 'playwright';
const pw = await import(pwPath).catch(() =>
  import(require.resolve('playwright', { paths: [process.env.PLAYWRIGHT_DIR].filter(Boolean) }))
);
const chromium = pw.chromium || (pw.default && pw.default.chromium);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.DEMO_URL || 'http://localhost:8080/';
const VIEWPORT = { width: 1180, height: 760 };

// Representative output, streamed in small chunks for a natural typing effect.
const OUTPUT = `# Executive Update — Q2, for the CEO

**Headline:** Activation is up 14% after the onboarding redesign; we are on track for the Q2 target with one staffing risk to flag.

## Key metrics
- **Weekly active accounts:** 12,400 (+18% QoQ)
- **Activation rate:** 61% (+14 pts) — best quarter on record
- **Net revenue retention:** 112% (flat)

## Progress
We shipped the redesigned onboarding flow to 100% of new accounts. Early cohorts show faster time-to-value (median 2.1 days, down from 4.6).

## Risks & decisions needed
- **Risk:** Backend hiring is two roles behind plan, putting the billing revamp at risk for Q3.
- **Decision:** Approve contractor budget to hold the Q3 date.

## Next steps
- Roll the activation experiment into the core product (next sprint).
- Bring a Q3 staffing plan to the next leadership review.`;

function chunk(text) {
  // Split into word-ish pieces so the stream renders progressively.
  return text.match(/\S+\s*/g) || [text];
}

const initScript = ({ chunks }) => {
  try { localStorage.setItem('anthropic_api_key', 'sk-ant-demo-key-not-real'); } catch (e) {}
  const realFetch = window.fetch.bind(window);
  window.fetch = (url, opts) => {
    const u = typeof url === 'string' ? url : (url && url.url) || '';
    if (!u.includes('api.anthropic.com')) return realFetch(url, opts);
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
          setTimeout(push, 45);
        };
        setTimeout(push, 200);
      },
    });
    return Promise.resolve(new Response(stream, { status: 200, headers: { 'content-type': 'text/event-stream' } }));
  };
};

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

const run = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    recordVideo: { dir: __dirname, size: VIEWPORT },
  });
  const page = await context.newPage();
  await page.addInitScript(initScript, { chunks: chunk(OUTPUT) });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('.skill-card');
  await pause(900); // shows the gallery with eval-score badges on cards

  // Use the "which skill do I need?" recommender — describe a task in plain English.
  await page.locator('#recommendInput').type('write an executive update for my CEO', { delay: 22 });
  await page.waitForSelector('.recommend-chip', { timeout: 3000 });
  await pause(800);

  // Click the recommended Executive Update skill.
  await page.locator('.recommend-chip', { hasText: 'Executive Update' }).first().click();
  await page.waitForSelector('#inputForm input, #inputForm textarea');
  await pause(500);

  // Fill the form like a real user would.
  await page.locator('#f_0').type(
    'Shipped onboarding redesign to all new accounts. Activation up sharply. Backend hiring behind plan, billing revamp at risk for Q3.',
    { delay: 8 }
  );
  await pause(150);
  await page.locator('#f_1').type('CEO', { delay: 25 });
  await page.locator('#f_2').type('Q2', { delay: 25 });
  await page.locator('#f_3').type('WAA, activation rate, NRR', { delay: 18 });
  await pause(500);

  // Run — the intercepted stream renders progressively.
  await page.click('#runBtn');
  await page.waitForFunction(() => document.querySelector('#status')?.textContent?.includes('Done'), { timeout: 15000 });
  await pause(1600); // hold on the finished result

  await context.close(); // flushes the video file
  await browser.close();
  console.log('Recorded video into', __dirname);
};

run().catch((e) => { console.error(e); process.exit(1); });
