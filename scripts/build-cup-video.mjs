#!/usr/bin/env node
// A 12-second vertical video (1080x1920) announcing a Skill Cup winner, for
// Shorts, Reels and LinkedIn: the month, the theme, the winner, the skill and
// its score, animated in CSS, recorded in headless Chromium and encoded with
// ffmpeg (the same approach as build-readme-video.mjs).
//
//   PLAYWRIGHT_MODULE_DIR=/path/node_modules [CHROMIUM_PATH=…] node scripts/build-cup-video.mjs --month 2026-10 [--out dir]
//   … --sample   # render with sample data, for checking the design
// Output: <out>/cup-<month>.mp4 (default out: dist/cup-video). The workflow
// publishes it to the media branch.
import { readFileSync, mkdirSync, rmSync, readdirSync, renameSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const sample = process.argv.includes('--sample');
const month = arg('month');
const OUT = arg('out') || join(root, 'dist', 'cup-video');
const SECONDS = 12;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let cup;
if (sample) cup = { month: '2026-10', theme: 'Health paperwork', winner: { author: 'example-author', skill: 'medical-letter-decoder', score: 4.62 }, entries: [{}, {}, {}] };
else {
  if (!/^\d{4}-\d{2}$/.test(month || '')) { console.error('--month YYYY-MM is required (or --sample).'); process.exit(1); }
  cup = (JSON.parse(readFileSync(join(root, 'data', 'skill-cup.json'), 'utf8')).cups || []).find((c) => c.month === month);
  if (!cup || !cup.winner || cup.winner === 'none') { console.log(`No winner for ${month}; no video.`); process.exit(0); }
}
const skillPath = join(root, 'skills', cup.winner.skill, 'SKILL.md');
const title = existsSync(skillPath) ? (readFileSync(skillPath, 'utf8').match(/^# (.+)$/m) || [, cup.winner.skill])[1].replace(/ Skill$/, '') : cup.winner.skill;
const label = new Date(`${cup.month}-01T00:00:00Z`).toLocaleString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:linear-gradient(160deg,#15181d 0%,#1f242b 55%,#2a1f14 100%);color:#eef1f4;font-family:-apple-system,'Segoe UI',sans-serif}
.b{position:absolute;left:80px;right:80px;opacity:0;transform:translateY(40px);animation:in .8s ease-out forwards}
@keyframes in{to{opacity:1;transform:none}}
@keyframes glow{0%,100%{text-shadow:0 0 0 rgba(242,166,90,0)}50%{text-shadow:0 0 40px rgba(242,166,90,.7)}}
.k{top:300px;font-size:40px;letter-spacing:.2em;color:#f2a65a;font-weight:700;animation-delay:.2s}
.m{top:370px;font-size:72px;font-weight:800;animation-delay:.6s}
.t{top:480px;font-size:44px;color:#9aa4b1;animation-delay:1.2s}
.cup{top:640px;font-size:220px;text-align:center;animation:in .8s ease-out 2s forwards,glow 2s ease-in-out 3s infinite}
.w{top:960px;font-size:46px;color:#9aa4b1;animation-delay:3.2s}
.n{top:1030px;font-size:80px;font-weight:800;animation-delay:3.6s;overflow-wrap:anywhere}
.s{top:1180px;font-size:56px;font-weight:700;color:#f2a65a;animation-delay:4.6s;overflow-wrap:anywhere}
.sc{top:1330px;font-size:44px;color:#eef1f4;animation-delay:5.6s}
.f{top:1640px;font-size:34px;color:#9aa4b1;animation-delay:7s}
</style></head><body>
<div class="b k">THE SKILL CUP</div>
<div class="b m">${esc(label)}</div>
<div class="b t">Theme: ${esc(cup.theme)}</div>
<div class="b cup">🏆</div>
<div class="b w">Winner</div>
<div class="b n">@${esc(cup.winner.author)}</div>
<div class="b s">${esc(title)}</div>
<div class="b sc">Scored ${Number(cup.winner.score).toFixed(2)} / 5 by a blind judge${cup.entries.length > 1 ? `, against ${cup.entries.length - 1} other entr${cup.entries.length === 2 ? 'y' : 'ies'}` : ''}</div>
<div class="b f">Enter next month: mohitagw15856.github.io/pm-claude-skills/cup.html</div>
</body></html>`;

let chromium;
try {
  const req = createRequire(join(process.env.PLAYWRIGHT_MODULE_DIR || join(root, 'node_modules'), 'x.js'));
  try { chromium = req('playwright').chromium; } catch { chromium = req('playwright-core').chromium; }
} catch { console.error('Needs Playwright: set PLAYWRIGHT_MODULE_DIR to a node_modules folder with playwright or playwright-core.'); process.exit(1); }
try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); } catch { console.error('Needs ffmpeg on PATH.'); process.exit(1); }

mkdirSync(OUT, { recursive: true });
const tmp = join(tmpdir(), `pm-cup-video-${process.pid}`);
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, recordVideo: { dir: tmp, size: { width: 1080, height: 1920 } } });
const page = await ctx.newPage();
const started = Date.now();
await page.setContent(html);
const lead = (Date.now() - started) / 1000;
await page.waitForTimeout(SECONDS * 1000 + 300);
await ctx.close();
await browser.close();
const webm = join(tmp, readdirSync(tmp).find((f) => f.endsWith('.webm')));
const mp4 = join(OUT, `cup-${cup.month}.mp4`);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', lead.toFixed(2), '-i', webm, '-t', String(SECONDS), '-r', '30',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', `${mp4}.tmp.mp4`]);
renameSync(`${mp4}.tmp.mp4`, mp4);
rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote ${mp4} (${(statSync(mp4).size / 1048576).toFixed(1)} MB, ${SECONDS}s)`);
