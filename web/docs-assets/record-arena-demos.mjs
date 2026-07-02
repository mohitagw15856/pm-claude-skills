// Records the Boardroom and Firm demos as videos, driving the REAL pages with
// Playwright while a mocked SSE stream plays each model turn (so no API key is
// needed and the streaming UI genuinely streams). Convert to GIF afterwards:
//
//   node web/docs-assets/record-arena-demos.mjs
//   ffmpeg -i boardroom-demo.webm -vf "fps=9,scale=900:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" web/docs-assets/boardroom-demo.gif
//   (same for firm-demo.webm → firm-demo.gif)
//
// Playwright resolves from the local install or the npx cache (PLAYWRIGHT_DIR).
import { existsSync, readdirSync, renameSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, '..');
const require = createRequire(import.meta.url);
async function loadPW() {
  try { return await import('playwright'); } catch {}
  const npx = join(process.env.HOME || '', '.npm', '_npx');
  const dirs = [process.env.PLAYWRIGHT_DIR].filter(Boolean);
  if (existsSync(npx)) for (const d of readdirSync(npx)) dirs.push(join(npx, d, 'node_modules'));
  for (const d of dirs) { try { return await import(pathToFileURL(require.resolve('playwright', { paths: [d] })).href); } catch {} }
  throw new Error('playwright not found');
}
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const serve = (port) => new Promise((res) => {
  const s = createServer((req, r) => {
    try { const p = join(webRoot, decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/\/$/, '/index.html')); r.writeHead(200, { 'content-type': MIME[extname(p)] || 'text/plain' }); r.end(readFileSync(p)); }
    catch { r.writeHead(404); r.end(); }
  }); s.listen(port, () => res(s));
});

// Queue-based mock: each api.anthropic.com call pops the NEXT script line and
// streams it word by word, so multi-turn pages play out like a live session.
const initScript = ({ scripts, delayMs }) => {
  try { localStorage.setItem('pm_provider', 'anthropic'); localStorage.setItem('anthropic_api_key', 'sk-ant-demo-not-real'); localStorage.setItem('pm_firm', ''); } catch (e) {}
  let call = 0;
  const realFetch = window.fetch.bind(window);
  window.fetch = (url, opts) => {
    const u = typeof url === 'string' ? url : (url && url.url) || '';
    if (!u.includes('api.anthropic.com')) return realFetch(url, opts);
    const text = scripts[Math.min(call++, scripts.length - 1)];
    const chunks = text.match(/\S+\s*/g) || [text];
    const enc = new TextEncoder();
    let i = 0;
    const stream = new ReadableStream({
      start(c) {
        const push = () => {
          if (i >= chunks.length) { c.enqueue(enc.encode('data: {"type":"message_stop"}\n\n')); c.close(); return; }
          c.enqueue(enc.encode('data: ' + JSON.stringify({ type: 'content_block_delta', delta: { type: 'text_delta', text: chunks[i++] } }) + '\n\n'));
          setTimeout(push, delayMs);
        };
        setTimeout(push, 250);
      },
    });
    return Promise.resolve(new Response(stream, { status: 200, headers: { 'content-type': 'text/event-stream' } }));
  };
};
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

// ── The scripts (short, characterful — pacing beats completeness in a GIF) ────
const BOARD = [
  `[BLOCKER] The 30% self-serve target has no baseline — what share of enterprise closes without sales *today*? If it's 2%, this is a 15× claim with no maths.\n\n[RISK] Procurement doesn't buy $80k/yr on a credit card. Where is the invoicing and net-60 story?`,
  `[QUESTION] The doc says enterprise buyers "demand security review" — then removes the humans who run one. Which sentence is wrong?\n\n[RISK] Self-serve pricing is public pricing. Are we ready for that in competitive deals?`,
  `[RISK] The checkout touches the billing migration landing the same quarter. Two auth-stack changes in one window is how one incident becomes two.\n\n[QUESTION] Who owns rollback if a self-serve enterprise buys mid-migration?`,
  `Margaret, I'll go further than your blocker: the invoicing gap isn't a risk, it's the whole feature. Self-serve enterprise without procurement rails is a demo, not a tier.`,
  `Dev's right about the rails — but Riko's point cuts deeper. If security review is real, "self-serve" means *self-start*: buy online, clear review async. That reframe rescues the target.`,
  `**Verdict:** 🟡 APPROVE WITH CONDITIONS — the self-*start* reframe survives; pure self-serve doesn't.\n\n### Why\n- Amara's reframe answers Riko's contradiction (buy online, review async)\n- Margaret's baseline demand stands: no target until the 2%-or-20% question is answered\n- Dev's sequencing gap is accepted as a launch condition\n\n### Risks, ranked\n| Risk | Raised by | Severity | Owner |\n|---|---|---|---|\n| No self-serve baseline | CFO | High | PM |\n| Procurement rails absent | CFO/CTO | High | Payments |\n| Migration collision | CTO | Med | Eng lead |\n\n### The changes that would survive this room\n1. Rename the tier self-START; keep security review async\n2. Add the invoicing/net-60 path before GA\n3. Two-week gap after the billing migration\n4. Baseline the current no-touch close rate this sprint`,
];
const FIRM = [
  `**The number nobody put on the agenda: CAC payback crossed 14 months.** Support costs (+30% tickets) are eating the margin the enterprise tier should fund.\n\nSince last memo: growth held at 6%, but 71% of new logos came from the lowest-intent channel.\n\n**FOR THE BOARD:** gate the payments migration behind the enterprise tier, or run both and accept the queue getting worse first?\n\nPrediction: tickets back under 900/wk by 15 Aug or SMB churn crosses 4.5%/mo by 15 Sep.`,
  `**The churn isn't about price — it's silence.** Of 38 SMB logos lost in June, 26 filed zero tickets in their final 60 days. They didn't rage-quit; they drifted. Our health score counts tickets as risk, so the quiet ones looked *green*.\n\n**FOR THE BOARD:** the enterprise push pulls our two best support engineers into security questionnaires. Who owns SMB meanwhile?\n\nPrediction: a login-frequency early-warning flag identifies ≥60% of Q3 churners 30+ days early; check 30 Sep.`,
  `**Delivery is fine; sequencing is not.** Velocity held at 34pts, but the payments migration and enterprise tier both land mid-Q3 and both touch auth. Same-window shipping turns one incident into two.\n\n**FOR THE BOARD:** I want a two-week gap — enterprise GA slips to 9 Sep.\n\nPrediction: same-fortnight double-ship costs ≥15 engineer-days of incident response by 30 Sep; with the gap, ≤4.`,
  `**Panel's $30M is going into sales, not product — that's the threat.** Six AE openings, one engineer. They won't out-build us this year; they'll out-*presence* us in every deal we're slow to.\n\nDelta: they shipped SOC 2 Type I, loudly. Our "in progress" is losing deals *this* quarter.\n\nPrediction: Panel announces ≥3 enterprise logos in our segment by 30 Sep; unstick our two security reviews by 15 Aug and we still win both.`,
  `## Minutes — session 1\n\n**Agenda:** sequencing the quarter — migration vs enterprise GA, and who owns SMB while we hunt enterprise.\n\n### The discussion\n**Dev** demanded the two-week gap; GA slips to 9 Sep. **Margaret** accepted, with a tripwire: the gap only pays if support load is falling by then. **Riko** pushed back — Panel is hunting the same logos; SOC 2 is the blocker, not the date. **Amara** reframed: the stalled deals are stuck on *questionnaires* — people-time, not eng-time. Move them to CS and the reviews unstick without touching GA. Dev conceded the questionnaires; held the gap.\n\n### Decisions & asks\n| Decision | Proposed by | Needs from you |\n|---|---|---|\n| Two-week gap; GA 9 Sep | Dev | Approve the slip |\n| Questionnaires → CS this week | Amara | 0.5 FTE backfill |\n| SOC 2 auditor engaged now | Riko | ~$18k sign-off |\n\n### Dissent preserved\nRiko holds 9 Sep is too late if Panel announces first. Not settled.\n\n### Watch next\nTicket volume vs the 900/wk line — it decides two predictions.`,
];

const pw = await loadPW();
const chromium = pw.chromium || pw.default?.chromium;
const server = await serve(8951);
const VIEW = { width: 1180, height: 740 };

async function record(name, scripts, drive) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 2, recordVideo: { dir: __dirname, size: VIEW } });
  const page = await ctx.newPage();
  await page.addInitScript(initScript, { scripts, delayMs: 28 });
  await drive(page);
  const video = page.video();
  await ctx.close();
  const path = await video.path();
  renameSync(path, join(__dirname, name + '.webm'));
  await browser.close();
  console.log('recorded', name + '.webm');
}

await record('boardroom-demo', BOARD, async (page) => {
  await page.goto('http://localhost:8951/boardroom.html', { waitUntil: 'domcontentloaded' });
  await pause(1200);
  await page.locator('#doc').type('PRD: Self-serve enterprise tier. Let enterprise customers buy online without talking to sales. Target: 30% of enterprise revenue self-serve within two quarters. Pricing public at $79/seat (annual).', { delay: 6 });
  await pause(600);
  // Excuse counsel + growth so 3 execs debate: openings ×3, cross ×2? Session uses full bench order;
  // excuse two seats for pacing (CFO, VC, CTO stay).
  await page.locator('#seat-counsel').click();
  await pause(700);
  await page.locator('#runBtn').click();
  // openings (3 seated × ~streamed) + cross-exam + verdict — wait for the verdict card
  await page.waitForSelector('.msg.verdict', { timeout: 120000 });
  await pause(2500);
  await page.locator('.msg.verdict').scrollIntoViewIfNeeded();
  await pause(3000);
});

await record('firm-demo', FIRM, async (page) => {
  await page.goto('http://localhost:8951/firm.html', { waitUntil: 'domcontentloaded' });
  await pause(1200);
  await page.locator('#charter').type('Relay — B2B analytics SaaS, Series A. 2,140 customers at $99/mo; MRR $212k (+6%/mo); SMB churn 4.1% and rising. Q3: ship enterprise tier, 10 logos ≥$15k. Worries: 2 deals stalled at security review; tickets +30%; rival "Panel" raised $30M.', { delay: 5 });
  await pause(700);
  await page.locator('#runBtn').click();
  await page.waitForSelector('.inbox-item.minutes', { timeout: 120000 });
  await pause(1500);
  const minutes = page.locator('.inbox-item.minutes');
  await minutes.click();
  await minutes.scrollIntoViewIfNeeded();
  await pause(3500);
});

server.close();
console.log('done — convert with ffmpeg (see header)');
