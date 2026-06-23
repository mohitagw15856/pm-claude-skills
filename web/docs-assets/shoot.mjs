// Screenshots the Skill Galaxy, the in-browser Brain, and the cheatsheet poster
// into web/docs-assets/. galaxy/brain come from the live site (or BASE_URL); the
// cheatsheet renders from the local web/cheatsheet.html and also exports a PDF.
//
// Usage:
//   npx playwright install chromium                 # one-time, if needed
//   node web/docs-assets/shoot.mjs                  # all of them
//   PAGES=cheatsheet node web/docs-assets/shoot.mjs # just one (galaxy|brain|cheatsheet)
//   BASE_URL=http://localhost:8080 node web/docs-assets/shoot.mjs   # local `web/` server
//   IGNORE_HTTPS_ERRORS=1 node web/docs-assets/shoot.mjs            # behind a TLS proxy
//
// Mirrors the record-*.mjs demo scripts: same Playwright resolution, deviceScaleFactor 2.
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const chromium = pw.chromium || (pw.default && pw.default.chromium);

const BASE = (process.env.BASE_URL || 'https://mohitagw15856.github.io/pm-claude-skills').replace(/\/$/, '');

const ALL = [
  // galaxy is a live canvas animation — give it longer to settle into a clean frame.
  { id: 'galaxy', url: `${BASE}/galaxy.html`, out: 'galaxy.png', viewport: { width: 1600, height: 1000 }, settle: 6000 },
  { id: 'brain', url: `${BASE}/brain.html`, out: 'brain.png', viewport: { width: 1440, height: 1000 }, settle: 3000 },
  // cheatsheet renders from the local file → a full-page PNG and a single-page PDF.
  {
    id: 'cheatsheet', url: pathToFileURL(path.join(repoRoot, 'web', 'cheatsheet.html')).href,
    out: 'cheatsheet.png', pdf: 'cheatsheet.pdf', viewport: { width: 1240, height: 1400 }, settle: 500, fullPage: true,
  },
  // guide renders from the local file → a multi-page A4 PDF (no PNG).
  {
    id: 'guide', url: pathToFileURL(path.join(repoRoot, 'web', 'guide.html')).href,
    pdf: 'PM-Skills-Guide.pdf', pdfFormat: 'A4', viewport: { width: 1000, height: 1400 }, settle: 400, noPng: true,
  },
];
const only = (process.env.PAGES || '').split(',').map((s) => s.trim()).filter(Boolean);
const shots = only.length ? ALL.filter((s) => only.includes(s.id)) : ALL;

const browser = await chromium.launch();
try {
  for (const s of shots) {
    // IGNORE_HTTPS_ERRORS=1 lets it run behind a TLS-intercepting proxy (some CI/sandboxes).
    const ctx = await browser.newContext({ viewport: s.viewport, deviceScaleFactor: 2, ignoreHTTPSErrors: !!process.env.IGNORE_HTTPS_ERRORS });
    const page = await ctx.newPage();
    console.error(`→ ${s.url}`);
    // 'load' not 'networkidle' — an animated canvas page never goes network-idle.
    await page.goto(s.url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(s.settle); // let the canvas / animation settle
    if (!s.noPng) {
      const png = path.join(__dirname, s.out);
      await page.screenshot({ path: png, fullPage: !!s.fullPage });
      console.error(`  wrote ${path.relative(process.cwd(), png)}`);
    }
    if (s.pdf) {
      const pdf = path.join(__dirname, s.pdf);
      if (s.pdfFormat) {
        // Multi-page document: let the CSS @page size/margins drive pagination.
        await page.pdf({ path: pdf, format: s.pdfFormat, printBackground: true, preferCSSPageSize: true });
      } else {
        // Single-page poster: size the page to the content height.
        const h = await page.evaluate(() => document.body.scrollHeight);
        await page.pdf({ path: pdf, printBackground: true, width: `${s.viewport.width}px`, height: `${h + 24}px`, pageRanges: '1' });
      }
      console.error(`  wrote ${path.relative(process.cwd(), pdf)}`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
