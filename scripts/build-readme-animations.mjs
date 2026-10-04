#!/usr/bin/env node
// Builds the animated README SVGs in light and dark variants:
//   docs/readme-assets/demo-chat{,-light}.svg   three scenes: ask, skill loads, finished work
//   docs/readme-assets/how-it-works{,-light}.svg  the three steps with a travelling pulse
//   ...-zh variants of both, for README.zh-CN.md (and the Gitee front page)
// Pure CSS keyframes inside the SVG, so GitHub animates them in an <img>. System fonts only.
//   node scripts/build-readme-animations.mjs
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'readme-assets');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Live skill count (deprecated aliases excluded), so the footer never goes stale.
const COUNT = readdirSync(join(root, 'skills')).filter((n) => {
  const f = join(root, 'skills', n, 'SKILL.md');
  return existsSync(f) && !/^deprecated:/m.test(readFileSync(f, 'utf8').split('\n---')[0]);
}).length.toLocaleString('en-GB');
mkdirSync(out, { recursive: true });

const THEMES = {
  dark: { bg: '#15181d', card: '#1f242b', line: '#2f3640', ink: '#eef1f4', muted: '#9aa4b1', user: '#2c3a4a', userInk: '#e6f0fa', chip: '#3b2f4f', chipInk: '#e9dcff', accent: '#f2a65a', good: '#7cc4ae' },
  light: { bg: '#f7f4ee', card: '#ffffff', line: '#e3ddd2', ink: '#1f2328', muted: '#5d6670', user: '#e3eef8', userInk: '#16324a', chip: '#efe6fb', chipInk: '#4b2a7a', accent: '#c46f1f', good: '#2f6f5e' },
};
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Helvetica, Arial, sans-serif`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const LOCALES = {
  en: {
    you: 'You', loaded: 'Skill loaded', title: 'your assistant + PM Skills', foot: `${COUNT} skills · one markdown file each`,
    aria: 'Three requests and the skill that answers each: a deposit dispute, a Chinese weekly report, and a ship-or-slip decision',
    steps: [['Say what you need', 'in your own words, any language'], ['One skill loads', 'a markdown file, read only when it fits'], ['Finished work', 'the document, not advice about it']],
    scenes: [
      { ask: 'My landlord kept my £900 deposit.', skill: 'security-deposit-recovery',
        out: ['🔴 £350 "cleaning" is normal wear and tear', '🟡 No check-in inventory: the burden is on them', '✅ Demand letter drafted, 14-day deadline'] },
      { ask: '帮我把这些笔记整理成周报。', skill: 'cn-weekly-report',
        out: ['一、本周完成：支付页改版上线，转化率 3.1% → 3.6%', '三、问题与风险：埋点未就绪，A/B 测试可能延期', '✅ 一句话版本已生成，可以直接发群'] },
      { ask: 'Should we ship on Friday?', skill: 'ship-or-slip',
        out: ['ship 0.18 · ship reduced 0.71 · slip 0.11', 'The fact that flips it: payments sign-off', '✅ Ship reduced, with the EU flag off'] },
    ],
  },
  zh: {
    you: '你', loaded: '已加载技能', title: '你的 AI 助手 + PM Skills', foot: `${COUNT} 个技能 · 每个都是一份 Markdown 文件`,
    aria: '三个请求以及回答它们的技能：裁员补偿、周报、公务员面试模拟',
    steps: [['说出你的需求', '用自己的话，中英文都可以'], ['加载一个技能', '一份 Markdown，只在需要时读取'], ['拿到成品', '是完成的文档，而不是建议']],
    scenes: [
      { ask: '公司要裁我，工作 6 年 7 个月，能拿多少？', skill: 'cn-severance-calculator',
        out: ['适用情形：协商解除，N = 7 个月工资', '🟡 月工资超过当地社平三倍时有封顶，需核对', '✅ 签字前核对：未休年假工资、年终奖、社保'] },
      { ask: '帮我把这些笔记整理成周报。', skill: 'cn-weekly-report',
        out: ['一、本周完成：支付页改版上线，转化率 3.1% → 3.6%', '三、问题与风险：埋点未就绪，A/B 测试可能延期', '✅ 一句话版本已生成，可以直接发群'] },
      { ask: '下个月公务员面试，帮我模拟一轮。', skill: 'cn-civil-exam-interview',
        out: ['第 1 题（应急应变）：暴雨导致窗口排长队', '用时 2:45 · 内容 4 · 结构 3 · 岗位匹配 4', '✅ 改进：先安抚，再分流，最后上报'] },
    ],
  },
};
const CYCLE = 12; // seconds; four per scene
const pct = (t) => `${Math.max(0, Math.min(100, (t / CYCLE) * 100)).toFixed(2)}%`;

function chat(theme, L) {
  const c = THEMES[theme]; const SCENES = L.scenes;
  const W = 860, H = 300;
  let css = '', body = '';
  SCENES.forEach((s, i) => {
    const t0 = i * 4, fadeOut = t0 + 3.75;
    const show = (name, tin) => {
      css += `@keyframes ${name}{0%,${pct(tin - 0.01)}{opacity:0;transform:translateY(6px)}${pct(tin + 0.25)},${pct(fadeOut)}{opacity:1;transform:none}${pct(fadeOut + 0.2)},100%{opacity:0}}.${name}{animation:${name} ${CYCLE}s infinite;opacity:0}`;
    };
    const askW = Math.min(360, 26 + [...s.ask].reduce((n, ch) => n + (ch.charCodeAt(0) > 0x2e80 ? 15 : 8.2), 0));
    show(`b${i}`, t0 + 0.05);
    css += `@keyframes ty${i}{0%,${pct(t0 + 0.1)}{width:0}${pct(t0 + 1.1)},100%{width:${askW}px}}.ty${i}{animation:ty${i} ${CYCLE}s infinite steps(24,end)}`;
    show(`p${i}`, t0 + 1.2);
    show(`k${i}`, t0 + 1.45);
    s.out.forEach((_, k) => show(`o${i}_${k}`, t0 + 1.9 + k * 0.45));
    body += `
  <g class="b${i}">
    <text x="40" y="92" class="lbl">${L.you}</text>
    <rect x="40" y="102" width="${askW + 20}" height="44" rx="14" fill="${c.user}"/>
    <clipPath id="c${i}"><rect class="ty${i}" x="50" y="108" width="0" height="34"/></clipPath>
    <text x="54" y="130" class="ask" clip-path="url(#c${i})">${esc(s.ask)}</text>
  </g>
  <g class="p${i}"><circle cx="430" cy="124" r="5" fill="${c.accent}"/><path d="M405 124h40" stroke="${c.accent}" stroke-width="2" stroke-dasharray="4 4"/></g>
  <g class="k${i}">
    <rect x="460" y="102" width="${34 + s.skill.length * 8.4}" height="30" rx="15" fill="${c.chip}"/>
    <text x="474" y="122" class="chip">⚡ ${esc(s.skill)}</text>
  </g>
  ${s.out.map((o, k) => `<text x="460" y="${172 + k * 30}" class="o${i}_${k} out">${esc(o)}</text>`).join('\n  ')}`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L.aria)}">
  <style>
    text{font-family:${FONT}}
    .lbl{font-size:12px;fill:${c.muted};letter-spacing:.06em;text-transform:uppercase}
    .ask{font-size:15px;fill:${c.userInk}}
    .chip{font-size:13px;fill:${c.chipInk};font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .out{font-size:14.5px;fill:${c.ink}}
    .title{font-size:13px;fill:${c.muted}}
    ${css}
    @media (prefers-reduced-motion: reduce){[class]{animation:none!important}.b0,.p0,.k0,.o0_0,.o0_1,.o0_2{opacity:1!important}.ty0{width:360px!important}}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="14" fill="${c.card}" stroke="${c.line}"/>
  <circle cx="40" cy="40" r="5" fill="#ff5f57"/><circle cx="58" cy="40" r="5" fill="#febc2e"/><circle cx="76" cy="40" r="5" fill="#28c840"/>
  <text x="96" y="44" class="title">${esc(L.title)}</text>
  <text x="460" y="92" class="lbl">${esc(L.loaded)}</text>
  <text x="${W - 40}" y="${H - 34}" text-anchor="end" class="title">${esc(L.foot)}</text>${body}
</svg>
`;
}

function how(theme, L) {
  const c = THEMES[theme];
  const W = 860, H = 170;
  const steps = L.steps.map(([h, t], i) => [String(i + 1), h, t]);
  const xs = [140, 430, 720];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="How it works: say what you need, one skill loads, you get finished work">
  <style>
    text{font-family:${FONT}}
    .n{font-size:20px;font-weight:600;fill:${c.bg}}
    .h{font-size:16px;font-weight:600;fill:${c.ink}}
    .s{font-size:13px;fill:${c.muted}}
    @keyframes travel{0%{transform:translateX(0);opacity:0}6%{opacity:1}44%{transform:translateX(290px)}50%{transform:translateX(290px)}94%{transform:translateX(580px);opacity:1}100%{transform:translateX(580px);opacity:0}}
    .dot{animation:travel 4.5s ease-in-out infinite}
    @keyframes pulse{0%,100%{r:24}50%{r:27}}
    .ring{animation:pulse 2.2s ease-in-out infinite}
    @media (prefers-reduced-motion: reduce){.dot,.ring{animation:none}}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <path d="M${xs[0]} 62H${xs[2]}" stroke="${c.line}" stroke-width="3" stroke-linecap="round"/>
  <circle class="dot" cx="${xs[0]}" cy="62" r="7" fill="${c.accent}"/>
  ${steps.map(([n, h, s], i) => `<circle class="ring" cx="${xs[i]}" cy="62" r="24" fill="${i === 2 ? c.good : c.accent}" style="animation-delay:${i * 0.7}s"/>
  <text x="${xs[i]}" y="69" text-anchor="middle" class="n">${n}</text>
  <text x="${xs[i]}" y="118" text-anchor="middle" class="h">${esc(h)}</text>
  <text x="${xs[i]}" y="140" text-anchor="middle" class="s">${esc(s)}</text>`).join('\n  ')}
</svg>
`;
}

for (const [lang, L] of Object.entries(LOCALES)) {
  for (const theme of ['dark', 'light']) {
    const sfx = (lang === 'zh' ? '-zh' : '') + (theme === 'light' ? '-light' : '');
    writeFileSync(join(out, `demo-chat${sfx}.svg`), chat(theme, L));
    writeFileSync(join(out, `how-it-works${sfx}.svg`), how(theme, L));
  }
}
console.log('Wrote docs/readme-assets/{demo-chat,how-it-works}{,-zh}{,-light}.svg');
