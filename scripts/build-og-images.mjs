// Generates a branded 1200x630 Open Graph image per skill into web/og/<name>.png,
// by rendering an HTML card and screenshotting it with Playwright. Run when skills
// change (output is committed, since the Pages deploy runs Node-only without a browser):
//
//   node scripts/build-og-images.mjs              # all skills
//   node scripts/build-og-images.mjs prd-template # one skill (fast iteration)
//
// Playwright resolves from the local install or the npx cache (PLAYWRIGHT_PATH override).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pwPath = process.env.PLAYWRIGHT_PATH || 'playwright';
const pw = await import(pwPath).catch(() => import(require.resolve('playwright')));
const chromium = pw.chromium || (pw.default && pw.default.chromium);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { skills } = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const outDir = join(root, 'web', 'og');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const only = process.argv[2];
const targets = only ? skills.filter((s) => s.name === only) : skills;
const esc = (s) => String(s || '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const TIER = { production: ['🟢', 'Production-Ready'], stable: ['🔵', 'Stable'], experimental: ['🟡', 'Experimental'] };

function card(s) {
  const [dot, label] = TIER[s.tier] || TIER.stable;
  const evalLine = s.eval ? `<span class="pill pill-eval">✅ Eval-scored ${s.eval.score}/5</span>` : '';
  const summary = esc((s.summary || s.description || '').slice(0, 140));
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box;font-family:-apple-system,"Segoe UI",Roboto,sans-serif}
  body{width:1200px;height:630px;background:radial-gradient(1200px 630px at 80% -10%,#1d222b 0%,#0f1115 60%);color:#e7ebf0;padding:70px;display:flex;flex-direction:column;justify-content:space-between}
  .top{display:flex;align-items:center;gap:14px}
  .logo{font-size:30px}.brand{font-size:26px;font-weight:700;color:#e89b82}
  .pills{display:flex;gap:12px;margin-top:8px}
  .pill{font-size:20px;font-weight:700;padding:8px 16px;border-radius:99px;border:1px solid #2a313c;background:#161a21}
  .pill-eval{color:#6ee7b7;background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.4)}
  .pill-tier{color:#cfd6df}
  h1{font-size:72px;line-height:1.05;margin:18px 0 14px;max-width:1040px}
  p{font-size:30px;color:#aab4c0;line-height:1.4;max-width:1040px}
  .foot{display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#95a0b0}
  .cta{color:#e89b82;font-weight:600}
  </style></head><body>
    <div>
      <div class="top"><span class="logo">🧠</span><span class="brand">PM Skills</span></div>
      <h1>${esc(s.title)}</h1>
      <p>${summary}</p>
      <div class="pills">${evalLine}<span class="pill pill-tier">${dot} ${label}</span></div>
    </div>
    <div class="foot"><span>174 open-source AI agent skills · Claude · ChatGPT · Gemini</span><span class="cta">▶ run free in your browser</span></div>
  </body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
let n = 0;
for (const s of targets) {
  await page.setContent(card(s), { waitUntil: 'networkidle' });
  await page.screenshot({ path: join(outDir, `${s.name}.jpg`), type: 'jpeg', quality: 82 });
  n++;
}
await browser.close();
console.log(`Wrote ${n} OG image(s) → web/og/`);
