#!/usr/bin/env node
// The README banner and the GitHub social preview.
//   docs/readme-assets/banner{,-light}.svg       English, animated (CSS keyframes, no JS)
//   docs/readme-assets/banner-zh{,-light}.svg    Chinese
//   web/docs-assets/social-preview.png           1280x640, for Settings → Social preview
//
// Counts are read live from the repo (deprecated aliases excluded), so the banner
// never goes stale; scripts/check-drift.mjs also reads the SVG text.
//
//   node scripts/build-banner.mjs           write everything (the PNG needs Playwright)
//   node scripts/build-banner.mjs --check   fail if the SVGs are out of date
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs', 'readme-assets');
const SKILLS = readdirSync(join(root, 'skills')).filter((n) => {
  const p = join(root, 'skills', n, 'SKILL.md');
  if (!existsSync(p)) return false;
  const fm = (readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
  return !/^deprecated:/m.test(fm);
}).length;
const BUNDLES = JSON.parse(readFileSync(join(root, '.claude-plugin', 'marketplace.json'), 'utf8')).plugins.length;
const fmt = (n) => n.toLocaleString('en-GB');

const THEMES = {
  dark: { bg: '#15181d', bg2: '#1b1f26', card: '#1f242b', line: '#2f3640', ink: '#eef1f4', muted: '#9aa4b1', chip: '#3b2f4f', chipInk: '#e9dcff', accent: '#f2a65a', good: '#7cc4ae', glow: '#f2a65a' },
  light: { bg: '#f7f4ee', bg2: '#efe9de', card: '#ffffff', line: '#e3ddd2', ink: '#1f2328', muted: '#5d6670', chip: '#efe6fb', chipInk: '#4b2a7a', accent: '#c46f1f', good: '#2f6f5e', glow: '#f2a65a' },
};
const FONT = `-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans","Apple SD Gothic Neo","Noto Sans CJK SC","Malgun Gothic","Microsoft YaHei",sans-serif`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// What people say, and the skill that answers. Five scenes, one at a time.
const SCENES = {
  en: [
    ['"My landlord is keeping my deposit."', 'security-deposit-recovery'],
    ['"Write the PRD for referrals."', 'prd-template'],
    ['"帮我写这周的周报"', 'cn-weekly-report'],
    ['"연말정산 어떻게 해요?"', 'kr-year-end-tax-settlement'],
    ['"Should we ship on Friday?"', 'ship-or-slip'],
  ],
  zh: [
    ['“帮我把这些笔记整理成周报”', 'cn-weekly-report'],
    ['“公司要裁我，能拿多少补偿？”', 'cn-severance-calculator'],
    ['“下周三要开家长会”', 'cn-parent-meeting'],
    ['“帮我回一封询盘”', 'cn-inquiry-reply'],
    ['“这份合同有没有坑？”', 'cn-labour-contract-decoder'],
  ],
};
const COPY = {
  en: {
    title: 'PM Skills', kicker: 'Professional, not just product management',
    line1: 'The senior colleague’s notes,', line2: 'for any AI assistant.',
    stats: `${fmt(SKILLS)} skills · ${BUNDLES} bundles · 12 tools · MIT`,
    say: 'You say', loads: 'loads',
    tools: ['Claude', 'ChatGPT', 'Gemini', 'Cursor', 'Codex', 'Trae', '通义灵码', 'DeepSeek'],
    alt: `PM Skills: ${fmt(SKILLS)} professional skills for any AI assistant`,
  },
  zh: {
    title: 'PM Skills', kicker: '专业技能库 · 不只是产品经理',
    line1: '资深同事的工作笔记，', line2: '任何 AI 助手都能用。',
    stats: `${fmt(SKILLS)} 个技能 · ${BUNDLES} 个技能包 · 12 种工具 · MIT`,
    say: '你说', loads: '加载',
    tools: ['Trae', '通义灵码', 'CodeBuddy', 'Qoder', 'DeepSeek', 'Qwen', 'Claude', 'Cursor'],
    alt: `PM Skills：${fmt(SKILLS)} 个专业技能，任何 AI 助手都能用`,
  },
};
// Every skill named in the banner must exist.
for (const lang of Object.keys(SCENES)) for (const [, s] of SCENES[lang]) {
  if (!existsSync(join(root, 'skills', s, 'SKILL.md'))) { console.error(`build-banner: no skill ${s}`); process.exit(1); }
}

function banner(lang, theme, { width = 1280, height = 400, social = false } = {}) {
  const t = THEMES[theme], c = COPY[lang], scenes = SCENES[lang];
  const n = scenes.length, slot = 3, cycle = n * slot;
  const cardX = social ? 700 : 690, cardY = social ? 230 : 92, cardW = 520, cardH = 190;
  const textY = social ? 210 : 120;
  const pct = (s) => +(s / cycle * 100).toFixed(2);
  const sceneCss = scenes.map((_, i) => {
    const a = pct(i * slot), b = pct(i * slot + 0.4), cc = pct(i * slot + slot - 0.4), d = pct(i * slot + slot);
    return `@keyframes s${i}{0%{opacity:0}${a > 0 ? `${a}%{opacity:0}` : ''}${b}%{opacity:1}${cc}%{opacity:1}${d}%{opacity:0}100%{opacity:0}}.s${i}{opacity:${i === 0 ? 1 : 0};animation:s${i} ${cycle}s infinite}`;
  }).join('');
  const scenesSvg = scenes.map(([say, skill], i) => `
    <g class="s${i}">
      <text x="${cardX + 28}" y="${cardY + 58}" font-size="13" fill="${t.muted}" letter-spacing=".04em">${esc(c.say.toUpperCase())}</text>
      <text x="${cardX + 28}" y="${cardY + 90}" font-size="22" font-weight="600" fill="${t.ink}">${esc(say)}</text>
      <text x="${cardX + 28}" y="${cardY + 134}" font-size="13" fill="${t.muted}" letter-spacing=".04em">${esc(c.loads.toUpperCase())}</text>
      <rect x="${cardX + 28}" y="${cardY + 146}" rx="13" height="28" width="${Math.min(cardW - 56, 22 + skill.length * 9.6)}" fill="${t.chip}"/>
      <text x="${cardX + 41}" y="${cardY + 165}" font-size="15" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" fill="${t.chipInk}">${esc(skill)}</text>
      <circle cx="${cardX + cardW - 34}" cy="${cardY + 160}" r="7" fill="${t.good}"/>
    </g>`).join('');
  // Tool chips along the bottom-left.
  let x = 64;
  const chipsY = social ? 560 : 330;
  const chips = c.tools.map((name) => {
    const w = 18 + [...name].reduce((a, ch) => a + (/[^\x00-\x7f]/.test(ch) ? 15 : 8.2), 0);
    const g = `<rect x="${x}" y="${chipsY}" rx="12" height="26" width="${w.toFixed(0)}" fill="none" stroke="${t.line}"/><text x="${x + 9}" y="${chipsY + 18}" font-size="13" fill="${t.muted}">${esc(name)}</text>`;
    x += w + 8;
    return g;
  }).join('');
  const dots = Array.from({ length: 34 }, (_, i) => {
    const px = (i * 157) % width, py = (i * 83) % height, r = 1 + (i % 3) * 0.6;
    return `<circle cx="${px}" cy="${py}" r="${r}" fill="${t.muted}" opacity=".18"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(c.alt)}">
<title>${esc(c.alt)}</title>
<defs>
  <radialGradient id="glow" cx="78%" cy="40%" r="55%"><stop offset="0" stop-color="${t.glow}" stop-opacity="${theme === 'dark' ? '.20' : '.16'}"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></radialGradient>
  <linearGradient id="bgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.bg}"/><stop offset="1" stop-color="${t.bg2}"/></linearGradient>
</defs>
<style>
text{font-family:${FONT}}
${sceneCss}
@keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}.pulse{animation:pulse 3s ease-in-out infinite}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.rise{animation:rise .9s ease-out both}
@media (prefers-reduced-motion: reduce){${scenes.map((_, i) => `.s${i}{animation:none;opacity:${i === 0 ? 1 : 0}}`).join('')}.pulse,.rise{animation:none;opacity:1}}
</style>
<rect width="${width}" height="${height}" rx="${social ? 0 : 18}" fill="url(#bgg)"/>
<rect width="${width}" height="${height}" rx="${social ? 0 : 18}" fill="url(#glow)"/>
${dots}
<g class="rise">
  <text x="64" y="${textY - (social ? 84 : 56)}" font-size="14" font-weight="700" fill="${t.accent}" letter-spacing=".08em">${esc(c.kicker.toUpperCase())}</text>
  <text x="62" y="${textY + 10}" font-size="${social ? 86 : 72}" font-weight="800" fill="${t.ink}" letter-spacing="-.02em">${esc(c.title)}</text>
  <text x="64" y="${textY + 62}" font-size="${social ? 30 : 26}" fill="${t.ink}">${esc(c.line1)}</text>
  <text x="64" y="${textY + 98}" font-size="${social ? 30 : 26}" fill="${t.ink}">${esc(c.line2)}</text>
  <text x="64" y="${textY + 140}" font-size="16" font-weight="600" fill="${t.accent}">${esc(c.stats)}</text>
</g>
${chips}
<g>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="16" fill="${t.card}" stroke="${t.line}"/>
  <circle cx="${cardX + 22}" cy="${cardY + 22}" r="5" fill="#ff5f57"/><circle cx="${cardX + 38}" cy="${cardY + 22}" r="5" fill="#febc2e"/><circle class="pulse" cx="${cardX + 54}" cy="${cardY + 22}" r="5" fill="${t.good}"/>
  ${scenesSvg}
</g>
</svg>
`;
}

const files = {
  'banner.svg': banner('en', 'dark'), 'banner-light.svg': banner('en', 'light'),
  'banner-zh.svg': banner('zh', 'dark'), 'banner-zh-light.svg': banner('zh', 'light'),
};
if (process.argv.includes('--check')) {
  const stale = Object.entries(files).filter(([f, svg]) => !existsSync(join(out, f)) || readFileSync(join(out, f), 'utf8') !== svg).map(([f]) => f);
  if (stale.length) { console.error(`Banner out of date: ${stale.join(', ')}. Run node scripts/build-banner.mjs`); process.exit(1); }
  console.log(`Banner up to date (${fmt(SKILLS)} skills, ${BUNDLES} bundles). ✓`);
  process.exit(0);
}
for (const [f, svg] of Object.entries(files)) writeFileSync(join(out, f), svg);
const social = banner('en', 'dark', { width: 1280, height: 640, social: true });
writeFileSync(join(root, 'web', 'docs-assets', 'social-preview.svg'), social);
console.log(`Wrote the banner (${fmt(SKILLS)} skills, ${BUNDLES} bundles) and web/docs-assets/social-preview.svg.`);

// The PNG needs a browser. Playwright from PLAYWRIGHT_PATH, the local install or skip.
try {
  const req = createRequire(import.meta.url);
  const pw = req(process.env.PLAYWRIGHT_PATH || 'playwright-core');
  const exe = process.env.CHROMIUM_PATH;
  const browser = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 1280, height: 640 } });
  await page.setContent(`<html><body style="margin:0">${social.replace(/<style>/, '<style>*{animation:none!important}')}</body></html>`);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(root, 'web', 'docs-assets', 'social-preview.png') });
  await browser.close();
  console.log('Wrote web/docs-assets/social-preview.png (upload it under Settings → General → Social preview).');
} catch (e) {
  console.log(`Skipped the PNG (${e.code || e.message.split('\n')[0]}). Set PLAYWRIGHT_PATH and CHROMIUM_PATH to render it.`);
}
void homedir;
