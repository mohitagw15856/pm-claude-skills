#!/usr/bin/env node
// Builds the README onboarding assets, so a newcomer is not overwhelmed by a huge repo:
//   docs/readme-assets/path-<id>{,-zh}{,-light}.svg   "Pick your path" tiles (six)
//   docs/readme-assets/funnel{,-zh}{,-light}.svg      "<count> skills, you need 5" animated funnel
//   docs/readme-assets/quest-1..5.svg                 quest log level badges (theme-neutral)
//   docs/readme-assets/nib-<pose>{,-light}.svg        Nib the mascot: wave, point, idea
//   docs/readme-assets/quiz/<q>-<a|b>.svg             quiz answer buttons (theme-neutral)
//   docs/quiz/q1..q15.md, docs/quiz/result-<bundle>.md the no-JavaScript "Which professional are you?" quiz
// Pure CSS keyframes inside each SVG, so GitHub animates them in an <img>. System fonts only.
// The skill and bundle counts are read live (deprecated aliases excluded), so nothing goes stale.
//   node scripts/build-readme-onboarding.mjs           write everything
//   node scripts/build-readme-onboarding.mjs --check   exit 1 if any output is out of date
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assets = join(root, 'docs', 'readme-assets');
const quizDir = join(root, 'docs', 'quiz');
const CHECK = process.argv.includes('--check');

// Live counts, computed the same way as scripts/build-readme-animations.mjs and check-drift.mjs.
const COUNT_N = readdirSync(join(root, 'skills')).filter((n) => {
  const f = join(root, 'skills', n, 'SKILL.md');
  return existsSync(f) && !/^deprecated:/m.test(readFileSync(f, 'utf8').split('\n---')[0]);
}).length;
const COUNT = COUNT_N.toLocaleString('en-GB');
const BUNDLES = JSON.parse(readFileSync(join(root, '.claude-plugin', 'marketplace.json'), 'utf8')).plugins.length;

// House palette from build-readme-animations.mjs, plus a few tile tints.
const THEMES = {
  dark: { bg: '#15181d', card: '#1f242b', line: '#2f3640', ink: '#eef1f4', muted: '#9aa4b1', chip: '#3b2f4f', chipInk: '#e9dcff', accent: '#f2a65a', good: '#7cc4ae', blue: '#8cb8e6', page: '#eef1f4', pageInk: '#1f2328' },
  light: { bg: '#f7f4ee', card: '#ffffff', line: '#e3ddd2', ink: '#1f2328', muted: '#5d6670', chip: '#efe6fb', chipInk: '#4b2a7a', accent: '#c46f1f', good: '#2f6f5e', blue: '#2d5f8f', page: '#ffffff', pageInk: '#1f2328' },
};
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Helvetica, Arial, sans-serif`;
const MONO = `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const RM = (sel) => `@media (prefers-reduced-motion: reduce){${sel}{animation:none!important}}`;
// Rough text width for layout checks (CJK glyphs are about a full em).
const textW = (s, size) => [...s].reduce((n, ch) => n + (ch.charCodeAt(0) > 0x2e80 ? size : size * 0.5), 0);

const outputs = new Map(); // absolute path -> content
const emit = (path, content) => outputs.set(path, content);

// ── 1. Pick your path tiles ──────────────────────────────────────────────────
const PATHS = [
  { id: 'product-manager', icon: '🧭', tint: 'accent', en: ['Product manager', 'PRDs, updates, meeting notes'], zh: ['产品经理', 'PRD、周报、会议纪要'] },
  { id: 'engineer', icon: '🛠️', tint: 'blue', en: ['Engineer', 'PRs, errors, code review'], zh: ['工程师', 'PR 描述、报错、代码评审'] },
  { id: 'job-seeker', icon: '💼', tint: 'good', en: ['Job seeker', 'Applying and interviewing'], zh: ['求职者', '读懂 JD、准备面试'] },
  { id: 'student', icon: '🎓', tint: 'chipInk', en: ['Student', 'Exams, notes, applications'], zh: ['学生', '备考、笔记、申请文书'] },
  { id: 'founder', icon: '🚀', tint: 'accent', en: ['Founder', 'Ideas, runway, fundraising'], zh: ['创业者', '验证想法、算跑道、融资'] },
  { id: 'chinese', icon: '中', tint: 'good', en: ['中文用户', 'In Chinese: 周报、考公'], zh: ['中文用户', '周报、考公、裁员补偿'] },
];

function tile(theme, p, lang) {
  const c = THEMES[theme];
  const W = 280, H = 132;
  const [title, sub] = p[lang];
  const cta = lang === 'zh' ? '3 个入门技能 →' : '3 starter skills →';
  const tint = c[p.tint];
  const glyph = p.icon === '中'
    ? `<text x="52" y="61" text-anchor="middle" class="zhicon">中</text>`
    : `<text x="52" y="61" text-anchor="middle" class="icon">${p.icon}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${title}: ${sub}. ${cta}`)}">
  <style>
    text{font-family:${FONT}}
    .t{font-size:18px;font-weight:600;fill:${c.ink}}
    .s{font-size:13px;fill:${c.muted}}
    .cta{font-size:13px;font-weight:600;fill:${tint}}
    .icon{font-size:24px}
    .zhicon{font-size:22px;font-weight:700;fill:${c.bg}}
    @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
    .ic{animation:bob 3.2s ease-in-out infinite;transform-box:fill-box}
    @keyframes nudge{0%,70%,100%{transform:translateX(0)}82%{transform:translateX(4px)}}
    .go{animation:nudge 3.2s ease-in-out infinite}
    ${RM('.ic,.go')}
  </style>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="16" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>
  <rect x="1" y="1" width="6" height="${H - 2}" rx="3" fill="${tint}"/>
  <g class="ic"><circle cx="52" cy="52" r="24" fill="${p.icon === '中' ? tint : c.bg}" stroke="${tint}" stroke-width="2"/>${glyph}</g>
  <text x="90" y="47" class="t">${esc(title)}</text>
  <text x="90" y="68" class="s">${esc(sub)}</text>
  <g class="go"><text x="24" y="110" class="cta">${esc(cta)}</text></g>
</svg>
`;
}

// ── 2. The funnel ────────────────────────────────────────────────────────────
const FUNNEL = {
  en: {
    title: `${COUNT} skills. You need 5.`,
    aria: `A funnel: ${COUNT} skills in the library, ${BUNDLES} bundles, one path picked for you, and the 5 skills you will actually use.`,
    rows: [[`${COUNT} skills`, 'the whole library, one markdown file each'], [`${BUNDLES} bundles`, 'grouped by profession and life moment'], ['1 path', 'picked for who you are'], ['5 skills', 'the ones you will actually use']],
  },
  zh: {
    title: `${COUNT} 个技能，你只需要 5 个。`,
    aria: `漏斗图：库里有 ${COUNT} 个技能、${BUNDLES} 个技能包，选出适合你的一条路径，最后是你真正会用的 5 个技能。`,
    rows: [[`${COUNT} 个技能`, '整个技能库，每个技能一份 Markdown'], [`${BUNDLES} 个技能包`, '按职业和人生阶段分组'], ['1 条路径', '按你的身份挑选'], ['5 个技能', '你真正会用到的那几个']],
  },
};
function funnel(theme, lang) {
  const c = THEMES[theme]; const L = FUNNEL[lang];
  const W = 860, H = 340, cx = 230, top = 74, bh = 42, gap = 12;
  const lastY = top + 4 * (bh + gap) - gap;
  const widths = [380, 290, 200, 120];
  const fills = [c.line, c.chip, c.blue, c.good];
  const inks = [c.ink, c.chipInk, c.bg, c.bg];
  let css = '', body = '';
  L.rows.forEach(([big, small], i) => {
    const y = top + i * (bh + gap), w = widths[i], wn = widths[i + 1] ?? widths[i] - 40;
    const d = `M${cx - w / 2} ${y}H${cx + w / 2}L${cx + wn / 2 + 6} ${y + bh}H${cx - wn / 2 - 6}Z`;
    const t0 = (i * 0.5).toFixed(2);
    css += `.r${i}{animation:rin 8s ${t0}s infinite both}`;
    body += `
  <g class="r${i}">
    <path d="${d}" fill="${fills[i]}"/>
    <text x="${cx}" y="${y + 27}" text-anchor="middle" class="big" fill="${inks[i]}">${esc(big)}</text>
    <path d="M${cx + w / 2 + 20} ${y + 21}H498" stroke="${c.line}" stroke-width="1.5" stroke-dasharray="3 4"/>
    <circle cx="506" cy="${y + 21}" r="4" fill="${fills[i] === c.line ? c.muted : fills[i] === c.chip ? c.chipInk : fills[i]}"/>
    <text x="522" y="${y + 26}" class="small">${esc(small)}</text>
  </g>`;
  });
  // Falling "skills": dots that drop through the funnel and settle as the chosen five.
  const dots = [-120, -60, 0, 60, 120, -90, 30, 90].map((dx, i) => {
    const delay = (i * 0.45).toFixed(2);
    css += `@keyframes drop${i}{0%{transform:translate(0,0);opacity:0}8%{opacity:1}70%{transform:translate(${-dx * 0.9}px,${lastY - top + 4}px);opacity:1}82%,100%{transform:translate(${-dx * 0.9}px,${lastY - top + 4}px);opacity:0}}.d${i}{animation:drop${i} 3.6s ${delay}s ease-in infinite}`;
    return `<circle cx="${cx + dx}" cy="${top - 14}" r="4" fill="${c.accent}" class="dot d${i}"/>`;
  }).join('\n  ');
  const five = [0, 1, 2, 3, 4].map((k) => `<rect x="${cx - 62 + k * 26}" y="${lastY + 12}" width="20" height="24" rx="4" fill="${c.card}" stroke="${c.good}" stroke-width="2" class="f" style="animation-delay:${(2 + k * 0.15).toFixed(2)}s"/><path d="M${cx - 57 + k * 26} ${lastY + 21}h10M${cx - 57 + k * 26} ${lastY + 27}h7" stroke="${c.good}" stroke-width="1.6" stroke-linecap="round" class="f" style="animation-delay:${(2 + k * 0.15).toFixed(2)}s"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L.aria)}">
  <style>
    text{font-family:${FONT}}
    .ttl{font-size:20px;font-weight:700;fill:${c.ink}}
    .big{font-size:16px;font-weight:700}
    .small{font-size:14.5px;fill:${c.ink}}
    @keyframes rin{0%{opacity:0;transform:translateY(8px)}6%,100%{opacity:1;transform:none}}
    ${css}
    .dot{opacity:0}
    @keyframes pop{0%,40%{opacity:0;transform:translateY(-6px)}55%,100%{opacity:1;transform:none}}
    .f{animation:pop 8s infinite both}
    @media (prefers-reduced-motion: reduce){.r0,.r1,.r2,.r3,.f{animation:none!important;opacity:1!important}.dot{animation:none!important;opacity:0!important}}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <text x="40" y="44" class="ttl">${esc(L.title)}</text>${body}
  ${dots}
  ${five}
</svg>
`;
}

// ── 3. Quest badges (theme-neutral: solid fills read on both backgrounds) ────
const QUEST_COLOURS = ['#2f6f5e', '#2d5f8f', '#5b3a8f', '#b4561a', '#8a6d00'];
function quest(n) {
  const fill = QUEST_COLOURS[n - 1];
  const S = 72;
  const stars = Array.from({ length: n }, (_, k) => {
    const x = 36 - (n - 1) * 4 + k * 8;
    return `<circle cx="${x}" cy="56" r="2.6" fill="#ffffff"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" role="img" aria-label="Quest level ${n} badge">
  <style>
    text{font-family:${FONT}}
    .n{font-size:26px;font-weight:800;fill:#ffffff}
    .lv{font-size:9px;font-weight:700;fill:#ffffff;letter-spacing:.12em}
    @keyframes shine{0%,60%{transform:translateX(-80px)}85%,100%{transform:translateX(80px)}}
    .sh{animation:shine 4s ease-in-out infinite;animation-delay:${(n * 0.3).toFixed(1)}s}
    ${RM('.sh')}
  </style>
  <defs><clipPath id="hx${n}"><path d="M36 3L65 19.5V52.5L36 69L7 52.5V19.5Z"/></clipPath></defs>
  <path d="M36 3L65 19.5V52.5L36 69L7 52.5V19.5Z" fill="${fill}" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>
  <g clip-path="url(#hx${n})"><rect class="sh" x="10" y="-10" width="14" height="100" fill="#ffffff" opacity=".22" transform="rotate(20)"/></g>
  <text x="36" y="24" text-anchor="middle" class="lv">LEVEL</text>
  <text x="36" y="47" text-anchor="middle" class="n">${n}</text>
  ${stars}
</svg>
`;
}

// ── 4. Nib the mascot: a small, friendly page with a folded corner ───────────
// Original design: a rounded page, two dot eyes, a smile, a folded corner, stubby arms.
function nib(theme, pose) {
  const c = THEMES[theme];
  const S = 80;
  const stroke = theme === 'dark' ? '#0b0d10' : '#1f2328';
  const limb = theme === 'dark' ? '#c9d1d9' : '#1f2328';
  const body = `<path d="M22 14h28l12 12v38a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="${c.page}" stroke="${stroke}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M50 14v8a4 4 0 0 0 4 4h8" fill="${c.chip}" stroke="${stroke}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M24 56h18M24 61h12" stroke="${c.line}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="31" cy="38" r="2.8" fill="${stroke}" class="eye"/><circle cx="45" cy="38" r="2.8" fill="${stroke}" class="eye"/>
    <circle cx="27" cy="45" r="2.6" fill="${c.accent}" opacity=".45"/><circle cx="49" cy="45" r="2.6" fill="${c.accent}" opacity=".45"/>
    <path d="M33 45q5 4 10 0" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  const armL = `<path d="M17 50q-6 2-8 8" fill="none" stroke="${limb}" stroke-width="2.6" stroke-linecap="round"/>`;
  let extra = '', css = '', label = '';
  if (pose === 'wave') {
    label = 'Nib, a small page character, waving hello';
    extra = `${armL}<g class="arm"><path d="M61 46q8-4 9-14" fill="none" stroke="${limb}" stroke-width="2.6" stroke-linecap="round"/><circle cx="70" cy="31" r="3" fill="${c.page}" stroke="${limb}" stroke-width="2"/></g>`;
    css = `@keyframes wave{0%,100%{transform:rotate(0)}20%{transform:rotate(-18deg)}40%{transform:rotate(8deg)}60%{transform:rotate(-14deg)}80%{transform:rotate(0)}}
    .arm{animation:wave 2.4s ease-in-out infinite;transform-origin:61px 46px}`;
  } else if (pose === 'point') {
    label = 'Nib, a small page character, pointing to the right';
    extra = `${armL}<g class="arm"><path d="M61 46h12" fill="none" stroke="${limb}" stroke-width="2.6" stroke-linecap="round"/><path d="M70 42l5 4-5 4" fill="none" stroke="${c.accent}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    css = `@keyframes poke{0%,100%{transform:translateX(0)}50%{transform:translateX(3px)}}
    .arm{animation:poke 1.4s ease-in-out infinite}`;
  } else {
    label = 'Nib, a small page character, with a bright idea';
    extra = `${armL}<path d="M61 50q6 2 8 8" fill="none" stroke="${limb}" stroke-width="2.6" stroke-linecap="round"/>
    <g class="bulb"><circle cx="68" cy="13" r="6.5" fill="#ffd25e" stroke="${stroke}" stroke-width="2"/><path d="M65 21h6" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
    <path d="M58 12h-3M78 12h3M61 6l-2-2M75 6l2-2" stroke="#e0a800" stroke-width="2" stroke-linecap="round"/></g>`;
    css = `@keyframes glow{0%,100%{opacity:.55}50%{opacity:1}}
    .bulb{animation:glow 1.8s ease-in-out infinite}`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" role="img" aria-label="${esc(label)}">
  <style>
    @keyframes hop{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
    .me{animation:hop 2.4s ease-in-out infinite}
    @keyframes blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
    .eye{animation:blink 4s infinite;transform-box:fill-box;transform-origin:center}
    ${css}
    @media (prefers-reduced-motion: reduce){.me,.eye,.arm,.bulb{animation:none!important;opacity:1!important}}
  </style>
  <g class="me">
    ${body}
    ${extra}
  </g>
</svg>
`;
}

// ── 5. Quiz: a chain of markdown pages with image-link answer buttons ───────
// Every path answers four questions; sixteen answer paths fold into six results.
const QUIZ = {
  q1: { n: 1, q: 'What brought you here today?', a: ['My work', 'q2'], b: ['My next step', 'q3'] },
  q2: { n: 2, q: 'What fills most of your week?', a: ['Code and systems', 'q4'], b: ['Meetings, docs and decisions', 'q5'] },
  q3: { n: 2, q: 'What is the next step?', a: ['A course, an exam or an application', 'q6'], b: ['A new job, or sorting out life', 'q7'] },
  q4: { n: 3, q: 'Whose company is it?', a: ["Someone else's", 'q8'], b: ['Mine, or it will be', 'q9'] },
  q5: { n: 3, q: 'Whose company is it?', a: ["Someone else's", 'q10'], b: ['Mine, or it will be', 'q11'] },
  q6: { n: 3, q: 'Where are you in it?', a: ['In the middle of studying', 'q12'], b: ['Finishing and applying for what is next', 'q13'] },
  q7: { n: 3, q: 'Which one is it?', a: ['A new job', 'q14'], b: ['Bills, letters and life admin', 'q15'] },
  q8: { n: 4, q: 'What would help most this week?', a: ['Faster reviews and fewer mystery errors', 'result-pm-engineering'], b: ['Deciding what we build next', 'result-pm-essentials'] },
  q9: { n: 4, q: 'What keeps you up at night?', a: ['Runway and investors', 'result-pm-founders'], b: ['Shipping the code itself', 'result-pm-engineering'] },
  q10: { n: 4, q: 'What do you write most?', a: ['Specs, updates and meeting notes', 'result-pm-essentials'], b: ['My CV, because I am on my way out', 'result-pm-jobsearch'] },
  q11: { n: 4, q: 'What is the hardest part right now?', a: ['Money: runway and the next raise', 'result-pm-founders'], b: ['Getting the product plan written', 'result-pm-essentials'] },
  q12: { n: 4, q: 'What is on your desk?', a: ['Notes to revise and exams to plan', 'result-pm-students'], b: ['Rent, forms and other paperwork', 'result-pm-lifeadmin'] },
  q13: { n: 4, q: 'What are you applying for?', a: ['A university place or a scholarship', 'result-pm-students'], b: ['My first proper job', 'result-pm-jobsearch'] },
  q14: { n: 4, q: 'Which job?', a: ["Someone else's: I am applying", 'result-pm-jobsearch'], b: ['My own: I want to start something', 'result-pm-founders'] },
  q15: { n: 4, q: 'What needs sorting?', a: ['A complaint, a refund or a claim', 'result-pm-lifeadmin'], b: ['A move, a repair or a pile of paperwork', 'result-pm-lifeadmin'] },
};
// Results reuse the same starter skills as the "Pick your path" pages, where one exists.
const RESULTS = {
  'pm-essentials': { who: 'The Product Thinker', why: 'You turn messy input into decisions people can act on. Start with the documents a product person writes every week.', start: 'product-manager',
    skills: [['prd-template', 'A complete PRD: problem, user stories, scope, success metrics and open questions.', 'Write a PRD for a referral programme. Here are my notes: ...'], ['stakeholder-update', 'A short update for leadership with the bottom line first.', 'Turn this week into a BLUF update for my VP: ...'], ['meeting-notes', 'Decisions, owned actions with deadlines, and open questions from any meeting.', 'Turn these meeting notes into decisions and owned actions: ...']] },
  'pm-engineering': { who: 'The Builder', why: 'You make the thing. These three take the writing and the head-scratching out of shipping code.', start: 'engineer',
    skills: [['pr-description-writer', 'A clear PR description from a diff: summary, motivation, changes and how it was tested.', 'Write a PR description from this diff: ...'], ['error-decoder', 'An error or stack trace in plain English, with the exact fix and how to stop it coming back.', 'What does this stack trace mean and how do I fix it? ...'], ['code-review-checklist', 'A review checklist tailored to the language, the kind of change and the risk.', 'Give me a review checklist for this TypeScript PR that touches auth.']] },
  'pm-founders': { who: 'The Founder', why: 'You are betting on something of your own. Test the idea, know your runway, then ask for money well.', start: 'founder',
    skills: [['startup-idea-validator', 'Your idea tested the way a sharp investor would: problem, market, wedge, moat, why now, and the cheapest test.', 'Pressure-test my idea: a booking tool for independent physios.'], ['runway-planner', 'Months of runway left, whether you are default alive, and when to raise.', 'We have £400k in the bank and burn £38k a month. When do we need to raise?'], ['investor-cold-email', 'A short, specific investor email with traction up front and a clear ask.', 'Write a cold email to a seed investor. Our traction: ...']] },
  'pm-jobsearch': { who: 'The Next-Mover', why: 'You are heading somewhere new. Read the job properly, reach the right person, walk in prepared.', start: 'job-seeker',
    skills: [['jd-decoder', 'What a job ad really wants: the true must-haves versus the nice-to-haves.', 'Decode this job description. What do they really want? ...'], ['outreach-message', 'Short notes to recruiters and hiring managers that actually get replies.', 'Write a short note to the hiring manager for this role: ...'], ['interview-prep', 'Prep for one specific interview at one specific company, not interviews in general.', 'Prep me for a product manager interview at a fintech next Tuesday.']] },
  'pm-students': { who: 'The Learner', why: 'You are studying or applying. Plan the revision, turn notes into a guide, and write applications that sound like you.', start: 'student',
    skills: [['exam-prep-planner', 'A realistic revision plan built on spaced repetition and retrieval practice.', 'I have three exams in five weeks. Build me a study plan.'], ['study-notes-synthesizer', 'Lecture notes, slides and readings turned into one exam-ready study guide.', 'Turn these lecture notes into one exam-ready study guide: ...'], ['personal-statement', 'A personal statement that shows fit and motivation, and sounds like you.', 'Help me write my personal statement for a computer science degree.']] },
  'pm-lifeadmin': { who: 'The Fixer', why: 'Life keeps sending paperwork. These skills write the letter, plan the move and get the money back.', start: null,
    skills: [['complaint-letter', 'A firm complaint letter with the facts, what you want and a deadline.', 'My sofa arrived broken and the shop refuses a refund. Write the complaint. Details: ...'], ['flight-delay-compensation', 'Whether a delayed or cancelled flight owes you money, and the claim drafted with the right rule cited.', 'My flight from Manchester was delayed five hours. What can I claim?'], ['moving-house-checklist', 'A move date turned into a calm, timed plan so nothing gets missed.', 'I am moving flat on the 28th. Build me a checklist from today.']] },
};
const BTN_FILL = { a: '#2f6f5e', b: '#5b3a8f' };
function button(id, which, label) {
  const W = 400, H = 52;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${which.toUpperCase()}: ${label}`)}">
  <style>text{font-family:${FONT}}.l{font-size:15px;font-weight:600;fill:#ffffff}.k{font-size:14px;font-weight:800;fill:${BTN_FILL[which]}}</style>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="26" fill="${BTN_FILL[which]}" stroke="#ffffff" stroke-opacity=".35" stroke-width="2"/>
  <circle cx="28" cy="26" r="13" fill="#ffffff"/>
  <text x="28" y="31" text-anchor="middle" class="k">${which.toUpperCase()}</text>
  <text x="52" y="31" class="l">${esc(label)}</text>
</svg>
`;
}
const GEN = '<!-- Generated by scripts/build-readme-onboarding.mjs from its QUIZ and RESULTS data. Edit the script, not this file. -->';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
function quizPage(id) {
  const q = QUIZ[id];
  const dots = [1, 2, 3, 4].map((k) => (k <= q.n ? '●' : '○')).join(' ');
  const link = (to) => `${to}.md`;
  const btn = (w) => `<a href="${link(q[w][1])}"><img src="../readme-assets/quiz/${id}-${w}.svg" width="400" alt="${esc(`${w.toUpperCase()}: ${q[w][0]}`)}"></a>`;
  return `${GEN}

# Which professional are you?

**Question ${q.n} of 4** &nbsp; ${dots}

## ${q.q}

${btn('a')}

${btn('b')}

<sub>${q.n > 1 ? '[Start again](q1.md) · ' : ''}[Skip the quiz and pick your path](../start/README.md) · [Back to the README](../../README.md)</sub>
`;
}
function resultPage(bundle) {
  const r = RESULTS[bundle];
  const skills = r.skills.map(([s, what, prompt], i) => {
    return `### ${i + 1}. [${s}](../../skills/${s}/SKILL.md)

${what}

\`\`\`text
${prompt}
\`\`\``;
  }).join('\n\n');
  return `${GEN}

# You are: ${r.who}

**Your bundle: [${bundle}](../../plugins/${bundle}/)**

${r.why}

## Your 3 starter skills

${skills}

## Install the bundle when you are ready

\`\`\`bash
npx pm-claude-skills add --bundle ${bundle}
\`\`\`

In Claude Code: \`/plugin install ${bundle}@pm-claude-skills\`

<sub>${r.start ? `[More on this path](../start/${r.start}.md) · ` : ''}[Take the quiz again](q1.md) · [Back to the README](../../README.md)</sub>
`;
}

// ── Validate data before writing anything ────────────────────────────────────
const problems = [];
for (const [id, q] of Object.entries(QUIZ)) {
  for (const w of ['a', 'b']) {
    const to = q[w][1];
    if (to.startsWith('result-') ? !RESULTS[to.slice(7)] : !QUIZ[to]) problems.push(`quiz ${id}.${w} points at missing ${to}`);
    if (textW(q[w][0], 15) > 330) problems.push(`quiz ${id}.${w} label too long for its button: ${q[w][0]}`);
  }
}
for (const [b, r] of Object.entries(RESULTS)) {
  if (!existsSync(join(root, 'plugins', b))) problems.push(`result bundle missing: plugins/${b}`);
  for (const [s] of r.skills) if (!existsSync(join(root, 'skills', s, 'SKILL.md'))) problems.push(`result ${b} names missing skill ${s}`);
}
for (const p of PATHS) for (const lang of ['en', 'zh']) {
  if (textW(p[lang][1], 13) > 184) problems.push(`path tile ${p.id} (${lang}) subtitle too long: ${p[lang][1]}`);
  if (textW(p[lang][0], 18) > 176) problems.push(`path tile ${p.id} (${lang}) title too long: ${p[lang][0]}`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

// ── Emit ─────────────────────────────────────────────────────────────────────
for (const theme of ['dark', 'light']) {
  const t = theme === 'light' ? '-light' : '';
  for (const lang of ['en', 'zh']) {
    const l = lang === 'zh' ? '-zh' : '';
    for (const p of PATHS) emit(join(assets, `path-${p.id}${l}${t}.svg`), tile(theme, p, lang));
    emit(join(assets, `funnel${l}${t}.svg`), funnel(theme, lang));
  }
  for (const pose of ['wave', 'point', 'idea']) emit(join(assets, `nib-${pose}${t}.svg`), nib(theme, pose));
}
for (let n = 1; n <= 5; n++) emit(join(assets, `quest-${n}.svg`), quest(n));
for (const [id, q] of Object.entries(QUIZ)) {
  for (const w of ['a', 'b']) emit(join(assets, 'quiz', `${id}-${w}.svg`), button(id, w, q[w][0]));
  emit(join(quizDir, `${id}.md`), quizPage(id));
}
for (const b of Object.keys(RESULTS)) emit(join(quizDir, `result-${b}.md`), resultPage(b));

let stale = 0;
for (const [p, content] of outputs) {
  if (Buffer.byteLength(content) > 60 * 1024) { console.error(`too large (>60 KB): ${relative(root, p)}`); process.exit(1); }
  const same = existsSync(p) && readFileSync(p, 'utf8') === content;
  if (CHECK) { if (!same) { stale++; console.error(`stale: ${relative(root, p)}`); } continue; }
  if (!same) { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, content); }
}
if (CHECK && stale) { console.error(`\n${stale} onboarding file(s) out of date. Run: node scripts/build-readme-onboarding.mjs`); process.exit(1); }
console.log(`${CHECK ? 'Checked' : 'Wrote'} ${outputs.size} onboarding files (${COUNT} skills, ${BUNDLES} bundles).`);
