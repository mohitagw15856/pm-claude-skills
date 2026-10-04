#!/usr/bin/env node
// Builds the Chinese-audience README animations, each in a dark and a light variant:
//   docs/readme-assets/calligraphy-zh{,-light}.svg     技能库 written stroke by stroke, then a PM seal
//   docs/readme-assets/calligraphy-zh-tw{,-light}.svg  技能庫, the Traditional Chinese variant
//   docs/readme-assets/day-zh{,-light}.svg             打工人的一天: one skill for each moment of the day
//   docs/readme-assets/chats-zh{,-light}.svg           four short chats (周报, 申论, 考研, 小红书)
// Pure CSS keyframes inside the SVG (GitHub animates them in an <img>), system fonts only,
// prefers-reduced-motion shows the finished state.
//
// Glyph strokes and medians come from Make Me a Hanzi (graphics.txt), which is under the
// Arphic Public License; the extracted entries and the licence live in docs/readme-assets/hanzi/.
// See docs/readme-assets/LICENCES.md.
//
//   node scripts/build-readme-zh.mjs
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs', 'readme-assets');
const COUNT = readdirSync(join(root, 'skills')).filter((n) => {
  const f = join(root, 'skills', n, 'SKILL.md');
  return existsSync(f) && !/^deprecated:/m.test(readFileSync(f, 'utf8').split('\n---')[0]);
}).length.toLocaleString('en-GB');

// The skills these images name must exist; fail loudly rather than ship a dead name.
const need = (name) => {
  if (!existsSync(join(root, 'skills', name, 'SKILL.md'))) throw new Error(`skill not found: ${name}`);
  return name;
};

// Same palette as scripts/build-readme-animations.mjs (demo-chat-zh.svg), plus the
// calligraphy and chat-bubble colours.
const THEMES = {
  dark: {
    bg: '#15181d', card: '#1f242b', line: '#2f3640', ink: '#eef1f4', muted: '#9aa4b1', chip: '#3b2f4f', chipInk: '#e9dcff',
    accent: '#f2a65a', good: '#7cc4ae',
    paper: '#15181d', brush: '#ece6da', grid: '#7a3b36', ghost: '#e07a6c', seal: '#d9534f', sealInk: '#fff4ec',
    head: '#232931', chatBg: '#181c21', me: '#3eb575', meInk: '#0d1f14', them: '#2c333c', themInk: '#eef1f4',
  },
  light: {
    bg: '#f7f4ee', card: '#ffffff', line: '#e3ddd2', ink: '#1f2328', muted: '#5d6670', chip: '#efe6fb', chipInk: '#4b2a7a',
    accent: '#c46f1f', good: '#2f6f5e',
    paper: '#f7f4ee', brush: '#1b1a19', grid: '#e2a59c', ghost: '#d9534f', seal: '#c0392b', sealInk: '#fff8f0',
    head: '#f7f7f7', chatBg: '#ededed', me: '#95ec69', meInk: '#111111', them: '#ffffff', themInk: '#1f2328',
  },
};
const SANS_SC = `"PingFang SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif`;
const SANS_TC = `"PingFang TC","Noto Sans CJK TC","Microsoft JhengHei",sans-serif`;
const SERIF = `"Songti SC","STSong","Noto Serif CJK SC",serif`;
const MONO = `ui-monospace,SFMono-Regular,Menlo,monospace`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Rough text width for system fonts: CJK and full-width forms are one em, the rest about 0.56 em.
const measure = (s, size, mono = false) => [...s].reduce((n, ch) => n + (ch.codePointAt(0) > 0x2e80 ? size : size * (mono ? 0.6 : 0.56)), 0);
const pct = (t, T) => `${((t / T) * 100).toFixed(2)}%`;
const REDUCED = `@media (prefers-reduced-motion: reduce){[class]{animation:none!important}}`;

// ── 1. Calligraphy hero ─────────────────────────────────────────────────────
const HANZI = JSON.parse(readFileSync(join(out, 'hanzi', 'strokes.json'), 'utf8')).characters;
const polyLen = (pts) => pts.slice(1).reduce((n, p, i) => n + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

function calligraphy(themeName, variant) {
  const t = THEMES[themeName];
  const chars = variant === 'tw' ? ['技', '能', '庫'] : ['技', '能', '库'];
  const W = 860, H = 320, B = 180, GAP = 24, SEAL = 64, TOP = 30;
  const x0 = (W - (chars.length * B + (chars.length - 1) * GAP)) / 2 - 20;
  const T = 14; // seconds per loop
  const k = B / 1024;
  // Timeline: each stroke's duration follows its length, a breath between strokes and characters.
  let clock = 0.4;
  const plan = chars.map((c) => {
    const { strokes, medians } = HANZI[c];
    const s = strokes.map((d, i) => {
      const L = Math.round(polyLen(medians[i]));
      const dur = Math.max(0.16, Math.min(0.42, L / 2400));
      const item = { d, m: medians[i], L, start: clock, end: clock + dur };
      clock += dur + 0.06;
      return item;
    });
    clock += 0.25;
    return s;
  });
  const inkDone = clock;
  const sealAt = inkDone + 0.15, fadeOut = T - 1.2;
  if (fadeOut - sealAt < 3) throw new Error('calligraphy loop too short for its strokes');

  const css = [];
  const defs = [];
  const body = [];
  let g = 0;
  chars.forEach((c, ci) => {
    const bx = x0 + ci * (B + GAP), by = TOP;
    // 米字格: the practice grid, outer box solid, guides dashed.
    body.push(`<g stroke="${t.grid}" fill="none" stroke-width="1.2">` +
      `<rect x="${bx}" y="${by}" width="${B}" height="${B}"/>` +
      `<path d="M${bx} ${by + B / 2}h${B}M${bx + B / 2} ${by}v${B}M${bx} ${by}l${B} ${B}M${bx + B} ${by}l${-B} ${B}" stroke-dasharray="5 5" opacity=".7"/></g>`);
    const m = `matrix(${k.toFixed(5)} 0 0 ${(-k).toFixed(5)} ${bx} ${(by + 900 * k).toFixed(2)})`;
    // 描红: the faint red tracing copy underneath.
    body.push(`<g transform="${m}" fill="${t.ghost}" opacity=".16">${HANZI[c].strokes.map((d) => `<path d="${d}"/>`).join('')}</g>`);
    const inked = [];
    plan[ci].forEach((s) => {
      const id = `k${g}`;
      defs.push(`<clipPath id="c${g}"><path d="${s.d}"/></clipPath>`);
      const D = s.L + 4;
      css.push(`@keyframes ${id}{0%,${pct(s.start, T)}{stroke-dashoffset:${D};opacity:0}${pct(s.start + 0.01, T)}{opacity:1}${pct(s.end, T)},${pct(fadeOut, T)}{stroke-dashoffset:0;opacity:1}${pct(fadeOut + 0.7, T)},100%{stroke-dashoffset:0;opacity:0}}.${id}{animation:${id} ${T}s infinite;stroke-dasharray:${s.L} ${s.L + 600};stroke-dashoffset:0}`);
      inked.push(`<path class="${id}" clip-path="url(#c${g})" d="M${s.m.map((p) => p.join(' ')).join('L')}"/>`);
      g++;
    });
    body.push(`<g filter="url(#brush)"><g transform="${m}" fill="none" stroke="${t.brush}" stroke-width="140" stroke-linecap="round" stroke-linejoin="round">${inked.join('')}</g></g>`);
  });
  // The seal: stamped after the last stroke, slightly rotated like a hand-pressed 印章.
  const lastX = x0 + (chars.length - 1) * (B + GAP) + B + 16;
  const sx = lastX, sy = TOP + B - SEAL;
  css.push(`@keyframes seal{0%,${pct(sealAt, T)}{opacity:0;transform:scale(1.35)}${pct(sealAt + 0.35, T)}{opacity:1;transform:scale(.96)}${pct(sealAt + 0.55, T)},${pct(fadeOut, T)}{opacity:1;transform:scale(1)}${pct(fadeOut + 0.7, T)},100%{opacity:0;transform:scale(1)}}.seal{animation:seal ${T}s infinite;transform-box:fill-box;transform-origin:center}`);
  body.push(`<g transform="rotate(-4 ${sx + SEAL / 2} ${sy + SEAL / 2})"><g class="seal" filter="url(#brush)">` +
    `<rect x="${sx}" y="${sy}" width="${SEAL}" height="${SEAL}" rx="7" fill="${t.seal}"/>` +
    `<rect x="${sx + 5}" y="${sy + 5}" width="${SEAL - 10}" height="${SEAL - 10}" rx="4" fill="none" stroke="${t.sealInk}" stroke-width="2"/>` +
    `<text x="${sx + SEAL / 2}" y="${sy + SEAL / 2 + 9}" text-anchor="middle" font-size="25" font-weight="700" font-family='${SERIF}' fill="${t.sealInk}" letter-spacing="1">PM</text></g></g>`);

  const font = variant === 'tw' ? SANS_TC : SANS_SC;
  const sub = variant === 'tw'
    ? `${COUNT} 個專業技能，用中文提問就能用`
    : `${COUNT} 个专业技能，用中文提问就能用`;
  const tag = variant === 'tw' ? '一個技能，一份 Markdown 檔案 · MIT 開源 · 免費' : '一个技能，一份 Markdown 文件 · MIT 开源 · 免费';
  const titleW = measure('PM Skills', 24) + 14 + measure(sub, 19);
  const tx = (W - titleW) / 2;
  const aria = variant === 'tw'
    ? `書法動畫：「技能庫」三個字一筆一畫寫出來，最後蓋上 PM 印章。PM Skills，${sub}`
    : `书法动画：“技能库”三个字一笔一画写出来，最后盖上 PM 印章。PM Skills，${sub}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">
<!-- Glyph strokes and medians: Make Me a Hanzi graphics.txt (https://github.com/skishore/makemeahanzi), derived from Arphic PL KaitiM GB and Arphic PL UKai, under the Arphic Public License (docs/readme-assets/hanzi/ARPHICPL.TXT). Modified 2026-10-04 by scripts/build-readme-zh.mjs: scaled, placed and animated stroke by stroke. -->
<style>
text{font-family:${font}}
${css.join('\n')}
${REDUCED}
</style>
<defs>
<filter id="brush" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .45  0 0 0 0 .4  0 0 0 .07 0"/></filter>
${defs.join('')}
</defs>
<rect width="${W}" height="${H}" rx="16" fill="${t.paper}"/>
<rect width="${W}" height="${H}" rx="16" filter="url(#grain)"/>
${body.join('\n')}
<text x="${tx}" y="${TOP + B + 56}" font-size="24" font-weight="700" fill="${t.ink}" font-family='-apple-system,"Segoe UI",${font}'>PM Skills</text>
<text x="${tx + measure('PM Skills', 24) + 14}" y="${TOP + B + 56}" font-size="19" fill="${t.ink}">${esc(sub)}</text>
<text x="${W / 2}" y="${TOP + B + 86}" text-anchor="middle" font-size="14" fill="${t.muted}">${esc(tag)}</text>
</svg>
`;
}

// ── 2. 打工人的一天 ─────────────────────────────────────────────────────────
const ICONS = {
  standup: '<circle cx="-6" cy="-2" r="2.6"/><circle cx="6" cy="-2" r="2.6"/><circle cx="0" cy="-5" r="3"/><path d="M-11 7c0-4 2.5-6 5-6M11 7c0-4-2.5-6-5-6M-5 7c0-5 2.2-7.5 5-7.5s5 2.5 5 7.5"/>',
  review: '<rect x="-7" y="-9" width="14" height="18" rx="2"/><path d="M-3.5 0.5l2.5 2.5 4.5-5M-3.5-5.5h7"/>',
  boss: '<path d="M-9 8h18M-6 8V2M-1 8V-2M4 8V-6M2.5-8.5h4v4"/>',
  fupan: '<path d="M7.5 0A7.5 7.5 0 1 1 3.5-6.5"/><path d="M2-10l2.6 3.4-3.6 2.4"/><path d="M0-3.5V0l2.5 2"/>',
  weekly: '<rect x="-8" y="-7" width="16" height="15" rx="2"/><path d="M-8-2h16M-4-10v5M4-10v5M-4 3h3M2 3h3"/>',
  promo: '<path d="M-9 7l5-5 4 3 8-9"/><path d="M2-4h6v6"/>',
  study: '<path d="M0-5v13M0-5c-3-2.2-6-2.2-8.5-1v12.5c2.5-1.2 5.5-1.2 8.5 1M0-5c3-2.2 6-2.2 8.5-1v12.5c-2.5-1.2-5.5-1.2-8.5 1"/>',
};
const DAY = [
  { time: '9:00', scene: '站会', icon: 'standup', skill: 'async-standup-compiler', note: '汇总大家的进展' },
  { time: '10:30', scene: '需求评审', icon: 'review', skill: 'cn-prd-review', note: '会前先挑出 PRD 漏洞' },
  { time: '14:00', scene: '向老板汇报', icon: 'boss', skill: 'stakeholder-update', note: '结论先行，三行说清' },
  { time: '16:00', scene: '项目复盘', icon: 'fupan', skill: 'cn-fupan', note: '不追责，找规律' },
  { time: '17:30', scene: '写周报', icon: 'weekly', skill: 'cn-weekly-report', note: '零散笔记变周报' },
  { time: '19:30', scene: '晋升答辩', icon: 'promo', skill: 'cn-promotion-defence', note: '模拟评委连环追问' },
  { time: '21:30', scene: '下班后考研', icon: 'study', skill: 'cn-kaoyan-planner', note: '倒排每天复习计划' },
];
DAY.forEach((d) => need(d.skill));

function day(themeName) {
  const t = THEMES[themeName];
  const W = 860, H = 340, LY = 186, X0 = 100, X1 = 760, CW = 176, CH = 74;
  const T = 14, step = 1.3, first = 0.6, fadeOut = T - 1.2;
  const last = first + (DAY.length - 1) * step;
  const xs = DAY.map((_, i) => X0 + (i * (X1 - X0)) / (DAY.length - 1));
  const css = [
    `@keyframes run{0%,${pct(first, T)}{stroke-dashoffset:${X1 - X0}}${pct(last, T)},${pct(fadeOut, T)}{stroke-dashoffset:0;opacity:1}${pct(fadeOut + 0.7, T)},100%{stroke-dashoffset:0;opacity:0}}.run{animation:run ${T}s infinite linear;stroke-dasharray:${X1 - X0};stroke-dashoffset:0}`,
    `@keyframes dot{0%,${pct(first, T)}{transform:translateX(0);opacity:1}${pct(last, T)},${pct(fadeOut, T)}{transform:translateX(${X1 - X0}px);opacity:1}${pct(fadeOut + 0.7, T)},100%{transform:translateX(${X1 - X0}px);opacity:0}}.dot{animation:dot ${T}s infinite linear;transform:translateX(${X1 - X0}px)}`,
  ];
  const body = [];
  DAY.forEach((d, i) => {
    const x = xs[i], at = first + i * step, up = i % 2 === 0;
    css.push(`@keyframes p${i}{0%,${pct(at, T)}{opacity:0;transform:scale(.4)}${pct(at + 0.3, T)}{opacity:1;transform:scale(1.12)}${pct(at + 0.45, T)},${pct(fadeOut, T)}{opacity:1;transform:scale(1)}${pct(fadeOut + 0.7, T)},100%{opacity:0;transform:scale(1)}}.p${i}{animation:p${i} ${T}s infinite;transform-box:fill-box;transform-origin:center}`);
    css.push(`@keyframes c${i}{0%,${pct(at + 0.15, T)}{opacity:0;transform:translateY(${up ? 8 : -8}px)}${pct(at + 0.55, T)},${pct(fadeOut, T)}{opacity:1;transform:none}${pct(fadeOut + 0.7, T)},100%{opacity:0}}.c${i}{animation:c${i} ${T}s infinite}`);
    const cy = up ? LY - 44 - CH : LY + 44;
    const cx = x - CW / 2;
    body.push(`<g class="c${i}">` +
      `<path d="M${x} ${up ? cy + CH : cy}V${up ? LY - 20 : LY + 20}" stroke="${t.line}" stroke-width="1.5" stroke-dasharray="3 3"/>` +
      `<rect x="${cx}" y="${cy}" width="${CW}" height="${CH}" rx="12" fill="${t.card}" stroke="${t.line}"/>` +
      `<text x="${cx + 12}" y="${cy + 23}" font-size="15"><tspan fill="${t.accent}" font-weight="700">${d.time}</tspan><tspan fill="${t.ink}" font-weight="600" dx="7">${esc(d.scene)}</tspan></text>` +
      `<rect x="${cx + 10}" y="${cy + 32}" width="${Math.min(CW - 20, measure(d.skill, 11.5, true) + 16)}" height="20" rx="10" fill="${t.chip}"/>` +
      `<text x="${cx + 18}" y="${cy + 46}" font-size="11.5" fill="${t.chipInk}" font-family='${MONO}'>${d.skill}</text>` +
      `<text x="${cx + 12}" y="${cy + 67}" font-size="12.5" fill="${t.muted}">${esc(d.note)}</text></g>`);
    body.push(`<g class="p${i}"><circle cx="${x}" cy="${LY}" r="18" fill="${t.card}" stroke="${t.accent}" stroke-width="2"/>` +
      `<g transform="translate(${x} ${LY})" fill="none" stroke="${t.ink}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[d.icon]}</g></g>`);
  });
  const aria = `打工人的一天：${DAY.map((d) => `${d.time} ${d.scene}，技能 ${d.skill}`).join('；')}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">
<style>
text{font-family:${SANS_SC}}
${css.join('\n')}
${REDUCED}
</style>
<rect width="${W}" height="${H}" rx="16" fill="${t.bg}"/>
<text x="32" y="38" font-size="20" font-weight="700" fill="${t.ink}">打工人的一天</text>
<text x="${32 + measure('打工人的一天', 20) + 14}" y="38" font-size="14" fill="${t.muted}">从早会到深夜，每个时刻都有一个现成的技能</text>
<path d="M${X0 - 40} ${LY}H${X1 + 40}" stroke="${t.line}" stroke-width="3" stroke-linecap="round"/>
<path class="run" d="M${X0} ${LY}H${X1}" stroke="${t.accent}" stroke-width="3" stroke-linecap="round"/>
${body.join('\n')}
<g class="dot"><circle cx="${X0}" cy="${LY}" r="5" fill="${t.accent}"/></g>
<text x="${W - 32}" y="${H - 16}" text-anchor="end" font-size="12" fill="${t.muted}">${COUNT} 个技能 · 每个都是一份 Markdown 文件</text>
</svg>
`;
}

// ── 3. Four chats ───────────────────────────────────────────────────────────
const CHATS = [
  { title: '写周报', ask: '帮我把这周的笔记整理成周报', skill: 'cn-weekly-report',
    out: ['一、本周完成：新注册流程上线，转化 +12%', '二、下周计划：灰度到 50%，补齐埋点', '三、风险：设计排期紧张，需要协调'] },
  { title: '申论', ask: '申论大作文写基层治理，帮我列提纲', skill: 'cn-civil-exam-essay',
    out: ['总论点：基层治理贵在精细，重在为民', '分论点：数字赋能 · 多元共治 · 为基层减负', '✓ 附开头示范段和 3 个可用素材'] },
  { title: '考研', ask: '离考研还剩 80 天，数学才复习一半', skill: 'cn-kaoyan-planner',
    out: ['阶段：强化收尾，转入真题，倒排到考前', '每天：数学 4h · 专业课 3h · 英语 2h', '✓ 每周日整套真题模考，按错题调整'] },
  { title: '小红书', ask: '写一篇小红书，推荐通勤咖啡杯', skill: 'xiaohongshu-note',
    out: ['标题：通勤党闭眼入｜一只杯子撑一整天', '正文：3 个痛点 + 真实用了 30 天的感受', '标签：#通勤好物 #打工人 #咖啡杯'] },
];
CHATS.forEach((c) => need(c.skill));

function chats(themeName) {
  const t = THEMES[themeName];
  const W = 860, PW = 412, PH = 278, M = 12, G = 12, H = M * 2 + PH * 2 + G;
  const T = 16, fadeOut = T - 1.2;
  const css = [
    `@keyframes blink{0%,100%{opacity:.25}50%{opacity:1}}.d1,.d2,.d3{animation:blink 1s infinite}.d2{animation-delay:.2s}.d3{animation-delay:.4s}`,
  ];
  const body = [];
  CHATS.forEach((c, i) => {
    const px = M + (i % 2) * (PW + G), py = M + Math.floor(i / 2) * (PH + G);
    const s = 0.4 + i * 2.6;
    const show = (cls, a) => css.push(`@keyframes ${cls}{0%,${pct(a, T)}{opacity:0;transform:translateY(6px)}${pct(a + 0.3, T)},${pct(fadeOut, T)}{opacity:1;transform:none}${pct(fadeOut + 0.7, T)},100%{opacity:0}}.${cls}{animation:${cls} ${T}s infinite}`);
    show(`u${i}`, s);
    show(`r${i}`, s + 1.9);
    css.push(`@keyframes t${i}{0%,${pct(s + 0.7, T)}{opacity:0}${pct(s + 0.8, T)},${pct(s + 1.85, T)}{opacity:1}${pct(s + 1.9, T)},100%{opacity:0}}.t${i}{animation:t${i} ${T}s infinite;opacity:0}`);
    // Panel frame, header and input bar.
    body.push(`<rect x="${px}" y="${py}" width="${PW}" height="${PH}" rx="14" fill="${t.chatBg}" stroke="${t.line}"/>` +
      `<path d="M${px} ${py + 38}V${py + 14}a14 14 0 0 1 14-14H${px + PW - 14}a14 14 0 0 1 14 14V${py + 38}Z" fill="${t.head}"/>` +
      `<path d="M${px} ${py + 38}H${px + PW}" stroke="${t.line}"/>` +
      `<path d="M${px + 20} ${py + 13}l-6 6 6 6" fill="none" stroke="${t.ink}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<text x="${px + PW / 2}" y="${py + 25}" text-anchor="middle" font-size="14.5" font-weight="600" fill="${t.ink}">${esc(c.title)}</text>` +
      `<g fill="${t.ink}"><circle cx="${px + PW - 30}" cy="${py + 19}" r="1.8"/><circle cx="${px + PW - 23}" cy="${py + 19}" r="1.8"/><circle cx="${px + PW - 16}" cy="${py + 19}" r="1.8"/></g>` +
      `<path d="M${px} ${py + PH - 40}H${px + PW}" stroke="${t.line}"/>` +
      `<rect x="${px + 12}" y="${py + PH - 31}" width="${PW - 24}" height="22" rx="6" fill="${t.head}" stroke="${t.line}"/>` +
      `<text x="${px + 22}" y="${py + PH - 15.5}" font-size="11.5" fill="${t.muted}">用中文说出你要做的事…</text>`);
    // The question: green bubble on the right, with the avatar.
    const askW = measure(c.ask, 13.5) + 30;
    const ax = px + PW - 12 - 30 - 8 - askW, ay = py + 52;
    body.push(`<g class="u${i}"><rect x="${px + PW - 42}" y="${ay}" width="30" height="30" rx="6" fill="${t.accent}"/>` +
      `<text x="${px + PW - 27}" y="${ay + 20}" text-anchor="middle" font-size="13" font-weight="600" fill="${t.card}">我</text>` +
      `<path d="M${ax + askW} ${ay + 11}l6 4-6 4Z" fill="${t.me}"/>` +
      `<rect x="${ax}" y="${ay}" width="${askW}" height="32" rx="6" fill="${t.me}"/>` +
      `<text x="${ax + 12}" y="${ay + 21}" font-size="13.5" fill="${t.meInk}">${esc(c.ask)}</text></g>`);
    // Typing dots, then the answer: white bubble on the left with the skill chip.
    const rx = px + 12 + 30 + 8, ry = ay + 46;
    const bot = `<rect x="${px + 12}" y="${ry}" width="30" height="30" rx="6" fill="${t.good}"/><text x="${px + 27}" y="${ry + 20}" text-anchor="middle" font-size="13" font-weight="600" fill="${t.card}">技</text>`;
    body.push(`<g class="t${i}">${bot}<path d="M${rx} ${ry + 11}l-6 4 6 4Z" fill="${t.them}"/><rect x="${rx}" y="${ry}" width="58" height="32" rx="6" fill="${t.them}"/>` +
      `<g fill="${t.muted}"><circle class="d1" cx="${rx + 17}" cy="${ry + 16}" r="3"/><circle class="d2" cx="${rx + 29}" cy="${ry + 16}" r="3"/><circle class="d3" cx="${rx + 41}" cy="${ry + 16}" r="3"/></g></g>`);
    const chipW = measure(`⚡ ${c.skill}`, 12, true) + 14;
    const repW = Math.max(chipW, ...c.out.map((l) => measure(l, 13))) + 34;
    if (rx + repW > px + PW - 12) throw new Error(`chat ${c.title}: reply too wide (${Math.round(repW)})`);
    const repH = 34 + c.out.length * 23 + 8;
    body.push(`<g class="r${i}">${bot}<path d="M${rx} ${ry + 11}l-6 4 6 4Z" fill="${t.them}"/><rect x="${rx}" y="${ry}" width="${repW}" height="${repH}" rx="6" fill="${t.them}"/>` +
      `<rect x="${rx + 10}" y="${ry + 9}" width="${chipW}" height="22" rx="11" fill="${t.chip}"/>` +
      `<text x="${rx + 17}" y="${ry + 24}" font-size="12" fill="${t.chipInk}" font-family='${MONO}'>⚡ ${c.skill}</text>` +
      c.out.map((l, j) => `<text x="${rx + 12}" y="${ry + 52 + j * 23}" font-size="13" fill="${t.themInk}">${esc(l)}</text>`).join('') + `</g>`);
  });
  const aria = `四段聊天演示：${CHATS.map((c) => `${c.title}，“${c.ask}”，由技能 ${c.skill} 回答`).join('；')}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">
<style>
text{font-family:${SANS_SC}}
${css.join('\n')}
${REDUCED}
</style>
<rect width="${W}" height="${H}" rx="16" fill="${t.bg}"/>
${body.join('\n')}
</svg>
`;
}

const files = [];
for (const theme of ['dark', 'light']) {
  const sfx = theme === 'light' ? '-light' : '';
  files.push([`calligraphy-zh${sfx}.svg`, calligraphy(theme, 'sc')]);
  files.push([`calligraphy-zh-tw${sfx}.svg`, calligraphy(theme, 'tw')]);
  files.push([`day-zh${sfx}.svg`, day(theme)]);
  files.push([`chats-zh${sfx}.svg`, chats(theme)]);
}
for (const [name, svg] of files) {
  writeFileSync(join(out, name), svg);
  console.log(`  ${name}  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
