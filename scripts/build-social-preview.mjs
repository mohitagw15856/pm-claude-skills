// Generates the repo social-preview image → web/docs-assets/social-preview.png (1920x960, 2:1).
// Uses a future-proof "190+ skills" headline so it does NOT need regenerating every release.
// Renders an HTML card and screenshots it with Playwright.
//
//   node scripts/build-social-preview.mjs
//
// Playwright resolves from the local install or the npx cache (PLAYWRIGHT_PATH override).
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pwPath = process.env.PLAYWRIGHT_PATH || 'playwright';
const pw = await import(pwPath).catch(() => import(require.resolve('playwright')));
const chromium = pw.chromium || (pw.default && pw.default.chromium);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'web', 'docs-assets');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box;font-family:-apple-system,"Segoe UI",Roboto,sans-serif}
  body{width:1280px;height:640px;background:radial-gradient(1280px 640px at 80% -10%,#1d222b 0%,#0f1115 62%);color:#e7ebf0;padding:74px 78px;display:flex;flex-direction:column;justify-content:space-between}
  .top{display:flex;align-items:center;gap:14px}
  .logo{font-size:34px}.brand{font-size:30px;font-weight:800;color:#e89b82;letter-spacing:.2px}
  h1{font-size:82px;line-height:1.04;margin:26px 0 18px;font-weight:800;max-width:1120px}
  h1 .hl{color:#e89b82}
  p{font-size:31px;color:#aab4c0;line-height:1.42;max-width:1080px}
  .pills{display:flex;gap:14px;margin-top:26px}
  .pill{font-size:22px;font-weight:700;padding:9px 18px;border-radius:99px;border:1px solid #2a313c;background:#161a21;color:#cfd6df}
  .pill-eval{color:#6ee7b7;background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.4)}
  .foot{display:flex;justify-content:space-between;align-items:center;font-size:25px;color:#95a0b0}
  .cta{color:#e89b82;font-weight:700}
</style></head><body>
  <div>
    <div class="top"><span class="logo">🧠</span><span class="brand">PM Skills</span></div>
    <h1><span class="hl">190+</span> AI skills<br>for every profession</h1>
    <p>PRDs · roadmaps · launches · postmortems — the structure a senior pro uses, for Claude, ChatGPT &amp; Gemini.</p>
    <div class="pills">
      <span class="pill pill-eval">✅ Eval-verified</span>
      <span class="pill">🔁 Workflow recipes</span>
      <span class="pill">🔌 MCP</span>
      <span class="pill">💬 Community hub</span>
    </div>
  </div>
  <div class="foot"><span>github.com/mohitagw15856/pm-claude-skills</span><span class="cta">▶ run free in your browser</span></div>
</body></html>`;

const browser = await chromium.launch();
// 1280x640 @ 1.5x = 1920x960 (matches the prior asset; GitHub social-preview is 2:1).
const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1.5 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: join(outDir, 'social-preview.png') });
await browser.close();
console.log('Wrote web/docs-assets/social-preview.png (1920x960) — "190+ AI skills" (future-proof, no count to update).');
