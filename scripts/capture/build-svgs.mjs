#!/usr/bin/env node
// Builds the README capture SVGs (pure CSS keyframes, so GitHub animates them inside an <img>):
//   docs/readme-assets/before-after{,-light}.svg      same request: generic AI vs. with the skill (3 scenes, 15 s loop)
//   docs/readme-assets/before-after-zh{,-light}.svg   Chinese variant (补偿金, 申论, 周报)
//   docs/readme-assets/listen-banner{,-light}.svg     static "▶ 听一听" banner linking to web/listen.html
// Content is excerpted from each skill's SKILL.md (lease-decoder, prd-template, cn-weekly-report,
// cn-severance-calculator, cn-civil-exam-essay). System fonts only.
//   node scripts/capture/build-svgs.mjs
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const out = join(root, 'docs', 'readme-assets');
mkdirSync(out, { recursive: true });
const COUNT = readdirSync(join(root, 'skills')).filter((n) => {
  const f = join(root, 'skills', n, 'SKILL.md');
  return existsSync(f) && !/^deprecated:/m.test(readFileSync(f, 'utf8').split('\n---')[0]);
}).length.toLocaleString('en-GB');

const THEMES = {
  dark: { bg: '#15181d', card: '#1f242b', line: '#2f3640', ink: '#eef1f4', muted: '#9aa4b1', faint: '#6f7884', panelA: '#191d22', panelB: '#232a33', user: '#2c3a4a', userInk: '#e6f0fa', chip: '#3b2f4f', chipInk: '#e9dcff', accent: '#f2a65a', good: '#7cc4ae', bad: '#e58a8a' },
  light: { bg: '#f7f4ee', card: '#ffffff', line: '#e3ddd2', ink: '#1f2328', muted: '#5d6670', faint: '#7d858f', panelA: '#f3f1ed', panelB: '#fbf8f2', user: '#e3eef8', userInk: '#16324a', chip: '#efe6fb', chipInk: '#4b2a7a', accent: '#c46f1f', good: '#2f6f5e', bad: '#a33b3b' },
};
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', Helvetica, Arial, sans-serif`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const textW = (s, latin = 7.6, cjk = 14.5) => [...s].reduce((n, ch) => n + (ch.codePointAt(0) > 0x2e80 ? cjk : latin), 0);

const WEEKLY = {
  ask: '帮我把这些笔记整理成周报。', skill: 'cn-weekly-report',
  generic: ['本周各项工作顺利推进中。', '相关任务持续跟进。', '下周继续努力。'],
  skilled: ['一、本周完成：支付页改版上线，转化率 3.1% → 3.6%', '三、风险：埋点未就绪，A/B 测试可能延期', '四、下周计划：埋点上线｜李明｜10 月 9 日', '✅ 一句话版本已生成，可以直接发群'],
};

const LOCALES = {
  en: {
    title: 'Same request, two answers', you: 'You', generic: 'Generic AI', skilled: 'With the skill',
    verdictBad: '✗ Nothing you can act on', verdictGood: '✓ Ready to use', foot: `${COUNT} skills · one markdown file each`,
    aria: 'Before and after: the same three requests answered by a generic AI and by a skill. A lease, a PRD and a Chinese weekly report.',
    scenes: [
      { ask: 'What am I signing? Here is my lease, £1,800 a month.', skill: 'lease-decoder',
        generic: ['Leases can be complex legal documents.', 'Read every clause carefully before signing.', 'Consider consulting a professional.'],
        skilled: ['🔴 §14 auto-renews for 12 months unless 60 days\' notice', '🔴 §9 leaving at month 6 costs £3,600 (two months)', '🟡 §11 entry "at any reasonable time": ask for 24 h', '🟢 §3 rent and §5 utilities: standard, skip these'] },
      { ask: 'Turn these notes into a PRD for the support dashboard.', skill: 'prd-template',
        generic: ['A PRD should cover goals and requirements.', 'Align with your stakeholders early.', 'Think about what your users need.'],
        skilled: ['Problem: agents lose 2.3 h a day across 3 tools', 'Metric: response time 4 h → 1 h, CSAT 3.8 → 4.5', 'US1 Unified inbox: email, chat and social in one queue', 'Open questions: each with an owner and a date'] },
      WEEKLY,
    ],
  },
  zh: {
    title: '同一个请求，两种回答', you: '你', generic: '普通 AI', skilled: '加载技能后',
    verdictBad: '✗ 看完还是不知道怎么做', verdictGood: '✓ 拿来就能用', foot: `${COUNT} 个技能 · 每个都是一份 Markdown 文件`,
    aria: '对比：同样三个请求，普通 AI 的回答与加载技能后的回答。补偿金、申论、周报。',
    scenes: [
      { ask: '公司要和我协商解除，工作 6 年 7 个月，月薪 2.5 万。', skill: 'cn-severance-calculator',
        generic: ['补偿金额取决于多种因素。', '建议咨询专业律师。', '请参考当地相关规定。'],
        skilled: ['适用情形：协商解除，按 N 计算（第 36、46 条）', '年限：6 年 7 个月，满半年按 1 年，计 7 个月', '估算：2.5 万 × 7 = 17.5 万元（核对三倍封顶）', '✅ 另算：未休年假工资、已挣年终奖'] },
      { ask: '这道申论题怎么答？归纳概括，200 字以内。', skill: 'cn-civil-exam-essay',
        generic: ['申论需要多读多练。', '答题要条理清晰。', '注意字数要求。'],
        skilled: ['题型：归纳概括，考查要点提取与归纳', '要点 1–5：逐段提取，标注来源段落', '参考答案：196 字 / 限 200 字', '✅ 批改：漏 1 个要点，大致二类文'] },
      WEEKLY,
    ],
  },
};

const SCENE = 5, N = 3, CYCLE = SCENE * N;
const pct = (t) => `${Math.max(0, Math.min(100, (t / CYCLE) * 100)).toFixed(2)}%`;

function beforeAfter(theme, L) {
  const c = THEMES[theme];
  const W = 900, H = 384;
  let css = '', body = '';
  const reduced = [];
  L.scenes.forEach((s, i) => {
    const t0 = i * SCENE, fadeOut = t0 + SCENE - 0.3;
    const show = (name, tin) => {
      css += `@keyframes ${name}{0%,${pct(tin - 0.01)}{opacity:0;transform:translateY(5px)}${pct(tin + 0.25)},${pct(fadeOut)}{opacity:1;transform:none}${pct(fadeOut + 0.2)},100%{opacity:0}}.${name}{animation:${name} ${CYCLE}s infinite;opacity:0}`;
      if (i === 0) reduced.push(`.${name}`);
    };
    const askW = Math.min(W - 112, 28 + textW(s.ask, 8.2, 15.5));
    show(`b${i}`, t0 + 0.05);
    css += `@keyframes ty${i}{0%,${pct(t0 + 0.1)}{width:0}${pct(t0 + 0.95)},100%{width:${askW}px}}.ty${i}{animation:ty${i} ${CYCLE}s infinite steps(22,end)}`;
    s.generic.forEach((_, k) => show(`g${i}_${k}`, t0 + 1.05 + k * 0.12));
    show(`k${i}`, t0 + 1.45);
    s.skilled.forEach((_, k) => show(`s${i}_${k}`, t0 + 1.8 + k * 0.38));
    show(`v${i}`, t0 + 3.4);
    const chipW = 30 + s.skill.length * 7.9;
    body += `
  <g class="b${i}">
    <rect x="40" y="72" width="${askW + 20}" height="40" rx="13" fill="${c.user}"/>
    <clipPath id="c${i}"><rect class="ty${i}" x="50" y="76" width="0" height="32"/></clipPath>
    <text x="56" y="97" class="ask" clip-path="url(#c${i})">${esc(s.ask)}</text>
  </g>
  ${s.generic.map((g, k) => `<text x="58" y="${196 + k * 30}" class="g${i}_${k} gen">${esc(g)}</text>`).join('\n  ')}
  <g class="k${i}"><rect x="${W - 52 - chipW}" y="${139}" width="${chipW}" height="26" rx="13" fill="${c.chip}"/><text x="${W - 52 - chipW + 13}" y="${157}" class="chip">⚡ ${esc(s.skill)}</text></g>
  ${s.skilled.map((o, k) => `<text x="482" y="${196 + k * 30}" class="s${i}_${k} out">${esc(o)}</text>`).join('\n  ')}
  <g class="v${i}"><text x="58" y="324" class="vb">${esc(L.verdictBad)}</text><text x="482" y="324" class="vg">${esc(L.verdictGood)}</text></g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L.aria)}">
  <style>
    text{font-family:${FONT}}
    .lbl{font-size:12px;fill:${c.muted};letter-spacing:.06em;text-transform:uppercase;font-weight:600}
    .ask{font-size:15px;fill:${c.userInk}}
    .chip{font-size:12.5px;fill:${c.chipInk};font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .gen{font-size:14px;fill:${c.faint};font-style:italic}
    .out{font-size:14px;fill:${c.ink}}
    .vb{font-size:13px;fill:${c.bad};font-weight:600}
    .vg{font-size:13px;fill:${c.good};font-weight:600}
    .title{font-size:13px;fill:${c.muted}}
    ${css}
    @media (prefers-reduced-motion: reduce){[class]{animation:none!important}${reduced.join(',')}{opacity:1!important}.ty0{width:${W - 112}px!important}}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="14" fill="${c.card}" stroke="${c.line}"/>
  <circle cx="40" cy="40" r="5" fill="#ff5f57"/><circle cx="58" cy="40" r="5" fill="#febc2e"/><circle cx="76" cy="40" r="5" fill="#28c840"/>
  <text x="96" y="44" class="title">${esc(L.title)}</text>
  <rect x="36" y="128" width="404" height="214" rx="12" fill="${c.panelA}" stroke="${c.line}"/>
  <rect x="460" y="128" width="404" height="214" rx="12" fill="${c.panelB}" stroke="${c.accent}" stroke-opacity=".55"/>
  <circle cx="62" cy="152" r="5" fill="${c.faint}"/><text x="76" y="156" class="lbl">${esc(L.generic)}</text>
  <circle cx="486" cy="152" r="5" fill="${c.accent}"/><text x="500" y="156" class="lbl">${esc(L.skilled)}</text>
  <text x="${W - 40}" y="${H - 22}" text-anchor="end" class="title">${esc(L.foot)}</text>${body}
</svg>
`;
}

function banner(theme) {
  const c = THEMES[theme];
  const W = 560, H = 96;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="听一听：在浏览器里朗读四段中文示例对话 (Listen to four Mandarin demo exchanges in your browser)">
  <style>text{font-family:${FONT}}.h{font-size:24px;font-weight:700;fill:${c.ink}}.s{font-size:13.5px;fill:${c.muted}}.t{font-size:12px;fill:${c.chipInk}}</style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="14" fill="${c.card}" stroke="${c.line}"/>
  <circle cx="54" cy="48" r="26" fill="${c.accent}"/>
  <path d="M46 35v26l21-13z" fill="${c.bg}"/>
  <text x="98" y="44" class="h">听一听</text>
  <text x="196" y="44" class="s">Listen in Mandarin</text>
  <text x="98" y="70" class="s">周报 · 补偿金 · 申论 · 小红书，浏览器朗读，无需下载</text>
  ${[52, 60, 44, 66, 38, 58, 48].map((h, k) => `<rect x="${470 + k * 10}" y="${48 - h / 4}" width="5" height="${h / 2}" rx="2.5" fill="${c.accent}" opacity="${0.45 + (k % 3) * 0.2}"/>`).join('')}
</svg>
`;
}

for (const theme of ['dark', 'light']) {
  const t = theme === 'light' ? '-light' : '';
  writeFileSync(join(out, `before-after${t}.svg`), beforeAfter(theme, LOCALES.en));
  writeFileSync(join(out, `before-after-zh${t}.svg`), beforeAfter(theme, LOCALES.zh));
  writeFileSync(join(out, `listen-banner${t}.svg`), banner(theme));
}
console.log('Wrote docs/readme-assets/{before-after,before-after-zh,listen-banner}{,-light}.svg');
