#!/usr/bin/env node
// Builds the scan-to-try poster for Chinese social sharing (小红书 3:4) and a smaller copy for
// the README, then checks that the QR code in each PNG decodes to the playground URL:
//   docs/readme-assets/poster-zh.png         1080 x 1440
//   docs/readme-assets/poster-zh-small.png    540 x 720
// The QR code comes from the qrcode package (MIT, already a devDependency). The check uses
// jsQR (Apache-2.0) and pngjs (MIT) when they can be resolved; install them without saving:
//
//   npm i --no-save jsqr pngjs        # once, for the decode check
//   node scripts/build-zh-poster.mjs  # PLAYWRIGHT_PATH / CHROMIUM_PATH override as needed
//
// The calligraphy title is the finished frame of docs/readme-assets/calligraphy-zh-light.svg
// (build it first with node scripts/build-readme-zh.mjs).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assets = join(root, 'docs', 'readme-assets');
const PLAYGROUND = 'https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground';
const GITEE = 'gitee.com/mohitagw/pm-claude-skills';
const PROMPTS = [
  ['帮我把这些笔记整理成周报。', 'cn-weekly-report'],
  ['下个月公务员面试，帮我模拟一轮。', 'cn-civil-exam-interview'],
  ['公司要裁我，能拿多少补偿？', 'cn-severance-calculator'],
];
for (const [, s] of PROMPTS) if (!existsSync(join(root, 'skills', s, 'SKILL.md'))) throw new Error(`skill not found: ${s}`);
const COUNT = readdirSync(join(root, 'skills')).filter((n) => {
  const f = join(root, 'skills', n, 'SKILL.md');
  return existsSync(f) && !/^deprecated:/m.test(readFileSync(f, 'utf8').split('\n---')[0]);
}).length.toLocaleString('en-GB');

const QRCode = require('qrcode');
const qrSvg = await QRCode.toString(PLAYGROUND, { type: 'svg', errorCorrectionLevel: 'M', margin: 0, color: { dark: '#1b1a19', light: '#ffffff' } });
const hero = readFileSync(join(assets, 'calligraphy-zh-light.svg'), 'utf8')
  .replace(/<\?xml[^>]*>/, '')
  .replace('</style>', '[class]{animation:none!important}</style>')
  .replace(/width="860" height="320" viewBox="0 0 860 320"/, 'viewBox="100 16 700 204"'); // glyphs and seal only
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
html,body{width:1080px;height:1440px}
body{background:#f7f4ee;color:#1f2328;font-family:"PingFang SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif;padding:52px 64px;display:flex;flex-direction:column;gap:24px;position:relative;overflow:hidden}
body::before{content:"";position:absolute;inset:22px;border:2px solid #e2a59c;border-radius:28px;pointer-events:none}
.tag{align-self:center;background:#fff;border:1.5px solid #e3ddd2;border-radius:999px;padding:10px 26px;font-size:24px;color:#5d6670;letter-spacing:.08em}
.hero svg{display:block;width:100%;height:auto}
h1{font-size:58px;line-height:1.3;text-align:center;font-weight:800;letter-spacing:.02em}
h1 em{font-style:normal;color:#c0392b}
.prompts{display:flex;flex-direction:column;gap:18px}
.row{display:flex;align-items:center;justify-content:space-between;gap:18px;background:#fff;border:1.5px solid #e3ddd2;border-radius:20px;padding:18px 22px}
.ask{background:#95ec69;color:#111;border-radius:14px;padding:12px 20px;font-size:30px}
.chip{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:22px;color:#4b2a7a;background:#efe6fb;border-radius:999px;padding:8px 16px;white-space:nowrap}
.foot{margin-top:auto;display:flex;gap:36px;align-items:center;background:#fff;border:1.5px solid #e3ddd2;border-radius:28px;padding:30px}
.qr{width:280px;height:280px;flex:none;padding:14px;background:#fff;border:3px solid #1b1a19;border-radius:18px}
.qr svg{display:block;width:100%;height:100%}
.info{display:flex;flex-direction:column;gap:14px}
.scan{font-size:40px;font-weight:800}
.scan span{color:#c0392b}
.line{font-size:25px;color:#5d6670;line-height:1.45}
.line b{color:#1f2328;font-weight:600}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:19px;line-height:1.5;color:#1f2328;background:#f7f4ee;border-radius:8px;padding:4px 10px;display:inline-block}
</style></head><body>
<div class="tag">开源 · 免费 · MIT 协议 · ${COUNT} 个专业技能</div>
<div class="hero">${hero}</div>
<h1>写周报、练面试、算补偿<br><em>用中文说一句</em>就够了</h1>
<div class="prompts">${PROMPTS.map(([a, s]) => `<div class="row"><span class="ask">${esc(a)}</span><span class="chip">${s}</span></div>`).join('')}</div>
<div class="foot"><div class="qr">${qrSvg}</div><div class="info">
<div class="scan">扫码<span>在线试用</span></div>
<div class="line">魔搭创空间 · 可用魔搭每日免费额度，或你自己的 DeepSeek、通义千问、Kimi、智谱 Key</div>
<div class="line"><b>Gitee 镜像</b><br>${GITEE}</div>
<div class="line"><b>一行安装</b><br><code>npx --registry=https://registry.npmmirror.com<br>pm-claude-skills add</code></div>
</div></div>
</body></html>`;

const pwPath = process.env.PLAYWRIGHT_PATH || 'playwright';
const pw = await import(pwPath).catch(() => import(require.resolve('playwright')));
const chromium = pw.chromium || (pw.default && pw.default.chromium);
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const shots = [['poster-zh.png', 1], ['poster-zh-small.png', 0.5]];
for (const [name, scale] of shots) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: 'load' });
  const [h, w] = await page.evaluate(() => [document.body.scrollHeight, document.body.scrollWidth]);
  if (h > 1440 || w > 1080) throw new Error(`poster content is ${w} x ${h}, over 1080 x 1440`);
  await page.screenshot({ path: join(assets, name), clip: { x: 0, y: 0, width: 1080, height: 1440 } });
  await page.close();
  console.log(`  ${name}`);
}
await browser.close();

// Decode each PNG and confirm the QR code points at the playground.
let jsQR, PNG;
try { jsQR = require('jsqr'); ({ PNG } = require('pngjs')); } catch {
  console.warn('  QR decode check skipped: run npm i --no-save jsqr pngjs (or set NODE_PATH) to enable it');
  process.exit(0);
}
for (const [name] of shots) {
  const png = PNG.sync.read(readFileSync(join(assets, name)));
  const hit = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  if (!hit || hit.data !== PLAYGROUND) { console.error(`  ✗ ${name}: QR decodes to ${hit ? hit.data : 'nothing'}`); process.exit(1); }
  console.log(`  ✓ ${name}: QR decodes to ${hit.data}`);
}
