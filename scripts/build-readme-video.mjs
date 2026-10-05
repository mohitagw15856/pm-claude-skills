#!/usr/bin/env node
// Short vertical videos (1080×1920) of the README animations, for 抖音, 视频号,
// YouTube Shorts and Reels: the terminal demo and the constellation wordmark,
// framed with a title and the install line.
//
// Records the animated SVGs in headless Chromium (Playwright) and encodes MP4
// with ffmpeg. Neither is a dependency of the package; point the script at them:
//   PLAYWRIGHT_MODULE_DIR=/path/node_modules [CHROMIUM_PATH=…] node scripts/build-readme-video.mjs
//   node scripts/build-readme-video.mjs --only terminal-zh      # one clip
// Output: docs/readme-assets/video/<name>.mp4 (committed; rebuild when the SVGs change).
import { existsSync, mkdirSync, readFileSync, rmSync, readdirSync, renameSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: PLAYWRIGHT_MODULE_DIR=<node_modules> node scripts/build-readme-video.mjs [--only <name>]');
  process.exit(0);
}
const only = (() => { const i = argv.indexOf('--only'); return i !== -1 ? argv[i + 1] : null; })();
const ASSETS = join(root, 'docs', 'readme-assets');
const OUT = join(ASSETS, 'video');
const COUNT = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).count.toLocaleString('en-GB');

const CLIPS = [
  { name: 'terminal-zh', svg: 'terminal-zh.svg', seconds: 60, zh: true, title: '一句话，AI 交付成品', sub: `${COUNT} 个专业技能 · 开源免费`, foot: 'npx --registry=https://registry.npmmirror.com pm-claude-skills add' },
  { name: 'terminal', svg: 'terminal.svg', seconds: 60, zh: false, title: 'Say it once. Get finished work.', sub: `${COUNT} professional skills · open source`, foot: 'npx pm-claude-skills add' },
  { name: 'constellation-zh', svg: 'constellation-zh.svg', seconds: 16, zh: true, title: 'PM Skills', sub: '周报、述职、考公、出海，一句话调用', foot: 'gitee.com/mohitagw/pm-claude-skills' },
].filter((c) => !only || c.name === only);

let chromium;
try {
  const dir = process.env.PLAYWRIGHT_MODULE_DIR;
  const req = createRequire(dir ? join(resolve(dir), 'noop.js') : import.meta.url);
  try { chromium = req('playwright').chromium; } catch { chromium = req('playwright-core').chromium; }
} catch { console.error('Needs Playwright: set PLAYWRIGHT_MODULE_DIR to a node_modules folder that has playwright or playwright-core.'); process.exit(1); }
try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); } catch { console.error('Needs ffmpeg on PATH.'); process.exit(1); }

const frame = (c, svgB64) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:linear-gradient(160deg,#15181d 0%,#1f242b 55%,#2a1f14 100%);color:#eef1f4;
font-family:${c.zh ? "'PingFang SC','Noto Sans CJK SC','Microsoft YaHei'," : ''}-apple-system,'Segoe UI',sans-serif}
.t{position:absolute;top:380px;left:0;right:0;text-align:center;font-size:${c.zh ? 76 : 64}px;font-weight:800;letter-spacing:.02em}
.s{position:absolute;top:500px;left:0;right:0;text-align:center;font-size:38px;color:#f2a65a}
.v{position:absolute;top:720px;left:30px;width:1020px}.v img{width:1020px;display:block;border-radius:24px;box-shadow:0 30px 80px rgba(0,0,0,.45)}
.f{position:absolute;bottom:330px;left:60px;right:60px;text-align:center;font:30px ui-monospace,SFMono-Regular,Menlo,monospace;color:#9aa4b1;word-break:break-all}
</style></head><body><div class="t">${c.title}</div><div class="s">${c.sub}</div><div class="v"><img src="data:image/svg+xml;base64,${svgB64}"></div><div class="f">${c.foot}</div></body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const c of CLIPS) {
  const tmp = join(tmpdir(), `pm-video-${c.name}-${process.pid}`);
  rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, recordVideo: { dir: tmp, size: { width: 1080, height: 1920 } } });
  const page = await ctx.newPage();
  const started = Date.now();
  await page.setContent(frame(c, readFileSync(join(ASSETS, c.svg)).toString('base64')));
  const lead = (Date.now() - started) / 1000;
  await page.waitForTimeout(c.seconds * 1000 + 300);
  await ctx.close();
  const webm = join(tmp, readdirSync(tmp).find((f) => f.endsWith('.webm')));
  const mp4 = join(OUT, `${c.name}.mp4`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', lead.toFixed(2), '-i', webm, '-t', String(c.seconds), '-r', '30',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', `${mp4}.tmp.mp4`]);
  renameSync(`${mp4}.tmp.mp4`, mp4);
  rmSync(tmp, { recursive: true, force: true });
  console.log(`Wrote docs/readme-assets/video/${c.name}.mp4 (${(statSync(mp4).size / 1048576).toFixed(1)} MB, ${c.seconds}s)`);
}
await browser.close();
