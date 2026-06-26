// Generates the README hero banner → web/docs-assets/professions-hero.png.
// Shows the value prop + every profession the library covers, as chips. Uses a
// future-proof "240+ skills" line and the profession list itself as the proof, so it
// doesn't go stale each release.
//
//   node scripts/build-readme-hero.mjs
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

// The professions the library covers (kept in sync with README's "All Skills" table).
const PROFESSIONS = [
  ['🛠️', 'Product Management'], ['👩‍💻', 'Engineering'], ['📣', 'Marketing & GTM'],
  ['🤝', 'Customer Success'], ['📊', 'Data & Analytics'], ['🧑‍💼', 'Leadership & People'],
  ['🎨', 'Design & UX'], ['🏢', 'Business & Strategy'], ['⚖️', 'Legal'],
  ['💰', 'Finance'], ['🚀', 'Founders & Startups'], ['🎓', 'Educators'],
  ['👥', 'HR'], ['💼', 'Sales'], ['⚙️', 'Operations'],
  ['🏥', 'Research & Healthcare'], ['🖼️', 'Figma'], ['📱', 'Social Media'],
  ['✍️', 'Writers & Content'], ['🌐', 'Cross-Profession'],
];

const chips = PROFESSIONS.map(([e, n]) => `<span class="chip"><span class="e">${e}</span>${n}</span>`).join('');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box;font-family:-apple-system,"Segoe UI",Roboto,sans-serif}
  body{width:1280px;height:720px;background:radial-gradient(1280px 720px at 78% -12%,#1d222b 0%,#0f1115 60%);color:#e7ebf0;padding:52px 70px;display:flex;flex-direction:column}
  .top{display:flex;align-items:center;gap:13px;margin-bottom:16px}
  .logo{font-size:30px}.brand{font-size:27px;font-weight:800;color:#e89b82;letter-spacing:.2px}
  h1{font-size:58px;line-height:1.06;font-weight:800;max-width:1160px}
  h1 .hl{color:#e89b82}
  .sub{font-size:25px;color:#aab4c0;line-height:1.4;margin:15px 0 26px;max-width:1140px}
  .chips{display:flex;flex-wrap:wrap;gap:12px;align-content:flex-start;flex:1}
  .chip{display:inline-flex;align-items:center;gap:9px;font-size:22px;font-weight:600;color:#dfe5ec;padding:10px 18px;border-radius:99px;border:1px solid #2a313c;background:#161a21}
  .chip .e{font-size:23px}
  .foot{display:flex;justify-content:space-between;align-items:center;font-size:23px;color:#95a0b0;margin-top:22px;border-top:1px solid #1c222b;padding-top:20px}
  .cta{color:#e89b82;font-weight:700}
</style></head><body>
  <div class="top"><span class="logo">🧠</span><span class="brand">PM Skills</span></div>
  <h1><span class="hl">240+</span> open-source AI skills — one for every profession</h1>
  <p class="sub">The structure a senior pro actually uses — PRDs, launches, postmortems, rubrics, contracts, pitch decks — as portable <b>SKILL.md</b> files.</p>
  <div class="chips">${chips}</div>
  <div class="foot"><span>Claude · ChatGPT · Gemini · Cursor · Codex · Hermes</span><span class="cta">▶ run any one free in your browser</span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: join(outDir, 'professions-hero.png') });
await browser.close();
console.log(`Wrote web/docs-assets/professions-hero.png (2560x1440) — ${PROFESSIONS.length} professions, future-proof "240+" headline.`);
