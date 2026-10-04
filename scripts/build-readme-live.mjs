#!/usr/bin/env node
// Builds the README's live and animated images.
//
// Live cards (default): written to web/live/ at Pages build time and served from
//   https://mohitagw15856.github.io/pm-claude-skills/live/<name>.svg
// so nothing that changes daily is ever committed. deploy-playground.yml runs this
// on every deploy and on a daily schedule just after midnight Beijing time.
//   skill-of-the-day{,-zh}{,-light}.svg   deterministic pick by date
//   stats{,-zh}{,-light}.svg              skills, bundles, stars, npm weekly downloads, translations
//   cn-status-<channel>.svg               Gitee, npmmirror and ModelScope reachability, checked from GitHub
//   exam-<gaokao|kaoyan|guokao>.svg       countdown badges (data/cn-exam-dates.json)
//   season.svg + season.html              seasonal banner (data/solar-terms.json) and the page it links to
//   skill-of-the-day{,-zh}.html           redirect to today's pick, so the README link follows the card
//   modelbench-zh{,-en}{,-light}.svg      skill lift per Chinese model (web/modelbench-zh.json)
//   index.json                            everything above as data
//
// Static animations (--static): committed under docs/readme-assets/.
//   terminal{,-zh}{,-light}.svg           a 60-second install, ask, skill loads, result loop
//   constellation{,-zh}{,-light}.svg      skill names drift in and join into the wordmark
//
// Pure CSS keyframes inside the SVG (GitHub animates them in an <img>), system fonts,
// prefers-reduced-motion honoured. Network calls are optional and fall back cleanly.
//
//   node scripts/build-readme-live.mjs                     # live cards for today (Beijing date)
//   node scripts/build-readme-live.mjs --date 2027-02-06   # any day
//   node scripts/build-readme-live.mjs --offline           # no network: stars, downloads, status show as unknown
//   node scripts/build-readme-live.mjs --out /tmp/live --modelbench path/to/modelbench-zh.json
//   node scripts/build-readme-live.mjs --static            # terminal + constellation into docs/readme-assets/
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };

if (flag('help') || argv.includes('-h')) {
  console.log(`Usage: node scripts/build-readme-live.mjs [--date YYYY-MM-DD] [--offline] [--out DIR] [--modelbench FILE] [--static]
  Live README cards into web/live/ (default) or, with --static, the terminal and constellation animations into docs/readme-assets/.`);
  process.exit(0);
}
const beijingToday = () => new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
const DATE = opt('date', beijingToday());
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE) || new Date(`${DATE}T00:00:00Z`).toISOString().slice(0, 10) !== DATE) {
  console.error(`--date must be a real day as YYYY-MM-DD, got "${DATE}"`);
  process.exit(2);
}
const STATIC = flag('static');
const OFFLINE = flag('offline');
const OUT = resolve(root, opt('out', STATIC ? 'docs/readme-assets' : 'web/live'));
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

// ── Shared look (matches scripts/build-readme-animations.mjs) ────────────────
const THEMES = {
  dark: { bg: '#15181d', card: '#1f242b', line: '#2f3640', ink: '#eef1f4', muted: '#9aa4b1', user: '#2c3a4a', userInk: '#e6f0fa', chip: '#3b2f4f', chipInk: '#e9dcff', accent: '#f2a65a', good: '#7cc4ae', warn: '#e7c26b' },
  light: { bg: '#f7f4ee', card: '#ffffff', line: '#e3ddd2', ink: '#1f2328', muted: '#5d6670', user: '#e3eef8', userInk: '#16324a', chip: '#efe6fb', chipInk: '#4b2a7a', accent: '#c46f1f', good: '#2f6f5e', warn: '#9a6a00' },
};
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', Helvetica, Arial, sans-serif`;
const ZH_FONT = `'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', -apple-system, 'Segoe UI', sans-serif`;
const MONO = `ui-monospace, SFMono-Regular, Menlo, Consolas, 'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', monospace`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const REDUCED = (extra = '') => `@media (prefers-reduced-motion: reduce){*{animation:none!important}${extra}}`;

// Width estimate for system fonts: CJK is a full em, Latin roughly half.
const wide = (cp) => cp >= 0x2e80 && cp <= 0xffef;
const emoji = (cp) => cp >= 0x1f000 || (cp >= 0x2600 && cp <= 0x27bf) || cp === 0x2705;
function tw(s, size, mono = false) {
  let w = 0;
  for (const ch of String(s)) {
    const cp = ch.codePointAt(0);
    if (cp === 0xfe0f) continue;
    if (emoji(cp)) w += 1.2;
    else if (wide(cp)) w += 1;
    else if (mono) w += 0.6;
    else if (ch === ' ') w += 0.28;
    else if (/[A-Z]/.test(ch)) w += 0.64;
    else if (/[0-9]/.test(ch)) w += 0.56;
    else if (/[a-z]/.test(ch)) w += /[ijlft]/.test(ch) ? 0.3 : 0.53;
    else w += 0.36;
  }
  return w * size;
}
function wrap(s, maxW, size, maxLines) {
  const tokens = String(s).match(/[⺀-￯]|[^\s⺀-￯]+\s*|\s+/g) || [];
  const lines = []; let cur = '';
  for (const t of tokens) {
    if (cur && tw(cur + t, size) > maxW) { lines.push(cur.trimEnd()); cur = t.trimStart(); }
    else cur += t;
  }
  if (cur.trim()) lines.push(cur.trimEnd());
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last && tw(`${last}…`, size) > maxW) last = [...last].slice(0, -1).join('');
    kept[maxLines - 1] = `${last.replace(/[\s,，、;；:：]+$/, '')}…`;
    return kept;
  }
  return lines;
}
const clip = (s, maxW, size) => { let t = String(s); if (tw(t, size) <= maxW) return t; while (t && tw(`${t}…`, size) > maxW) t = [...t].slice(0, -1).join(''); return `${t}…`; };

// Deterministic, so the same date always gives the same pick.
const fnv = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
const rng = (seed) => { let x = fnv(seed) || 1; return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; };

// ── Dates (all as Beijing calendar days) ────────────────────────────────────
const D = (s) => new Date(`${s}T00:00:00Z`);
const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (s, n) => iso(new Date(D(s).getTime() + n * 864e5));
const diff = (a, b) => Math.round((D(b) - D(a)) / 864e5); // days from a to b
const YEAR = +DATE.slice(0, 4), MONTH = +DATE.slice(5, 7), DAY = +DATE.slice(8, 10);
const zhDate = (s) => `${+s.slice(5, 7)}月${+s.slice(8, 10)}日`;
const zhFull = (s) => `${+s.slice(0, 4)}年${zhDate(s)} 星期${'日一二三四五六'[D(s).getUTCDay()]}`;
const enDate = (s) => D(s).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const n0 = (n) => Number(n).toLocaleString('en-GB');

// ── Catalogue ───────────────────────────────────────────────────────────────
const readJSON = (p, d = null) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return d; } };
const catalogue = (readJSON(join(root, 'web', 'skills.json'), { skills: [] }).skills || []).filter((s) => !s.deprecated);
const COUNT = catalogue.length;
const BUNDLES = new Set(catalogue.map((s) => s.plugin).filter((p) => p && p !== 'other')).size; // 'other' is the catch-all, not a bundle
const byName = new Map(catalogue.map((s) => [s.name, s]));

function frontmatter(raw) {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return { fm, body: m[2] };
}

// A first-person prompt to try, taken from the skill's own trigger phrases.
function enPrompt(desc) {
  const q = desc.match(/(?:^|\s)["“‘']([A-Za-z][^"”’']{8,64}?)["”’'](?=[\s,.;:)]|$)/);
  if (q) return q[1][0].toUpperCase() + q[1].slice(1) + (/[?.!]$/.test(q[1]) ? '' : '');
  const m = desc.match(/Use when (?:asked|someone asks|the user asks|you are asked)\s+(to|for|how to|how do I)\s+([^,.;]+)/i);
  if (!m) return null;
  const clause = m[2].trim().replace(/\s+(or|and)$/i, '');
  if (clause.length < 8 || clause.length > 64 || /\b(this|these)\b$/.test(clause)) return null;
  const kind = m[1].toLowerCase();
  if (kind === 'for') return `I need ${clause}.`;
  if (kind === 'how do i') return `How do I ${clause}?`;
  return `Help me ${clause}.`;
}
function zhPrompt(desc) {
  const q = desc.match(/[‘“「']([^’”」']{3,24})[’”」']/);
  if (q) return q[1];
  const m = desc.match(/当(被要求|被问到|用户要求|有人问|需要)?([^。；]*?)时(?:使用)?/);
  if (!m) return null;
  let item = m[2].split(/[、，,]|或者|或/)[0].trim().replace(/^[“"'‘]|[”"'’]$/g, '');
  if (item.length < 3 || item.length > 22) return null;
  if (m[1] === '被问到' || m[1] === '有人问') return /[？?吗呢]$/.test(item) ? item : `${item}？`;
  if (m[1]) return item.startsWith('帮我') ? item : `帮我${item}`;
  return /^(撰写|写|准备|制定|分析|生成|规划|比较|整理|做|起草)/.test(item) ? `帮我${item}` : null;
}

function zhSkill(name) {
  const f = join(root, 'skills-i18n', 'zh', name, 'SKILL.md');
  if (!existsSync(f)) return null;
  const { fm, body } = frontmatter(readFileSync(f, 'utf8'));
  const title = ((body.match(/^# (.+)$/m) || [])[1] || name).trim();
  const desc = fm.description || '';
  return { name, title, desc, summary: (desc.split('。')[0] || desc) + '。', prompt: zhPrompt(desc) };
}

function skillOfTheDay() {
  const enPool = catalogue.filter((s) => s.summary && enPrompt(s.description || '')).sort((a, b) => a.name.localeCompare(b.name));
  const en = enPool[fnv(`${DATE}:en`) % enPool.length];
  const zhDir = join(root, 'skills-i18n', 'zh');
  const zhPool = (existsSync(zhDir) ? readdirSync(zhDir) : []).filter((n) => byName.has(n)).map(zhSkill).filter((s) => s && s.prompt).sort((a, b) => a.name.localeCompare(b.name));
  const zhPick = zhPool.length ? zhPool[fnv(`${DATE}:zh`) % zhPool.length] : null;
  return {
    en: en && { name: en.name, title: en.title || en.name, summary: en.summary, prompt: enPrompt(en.description), bundle: en.plugin },
    zh: zhPick && { ...zhPick, bundle: byName.get(zhPick.name).plugin },
  };
}

// ── Network (optional) ──────────────────────────────────────────────────────
async function get(url, { json = true, headers = {} } = {}) {
  if (OFFLINE) return { ok: false, offline: true };
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'pm-claude-skills-readme-live', ...headers }, signal: AbortSignal.timeout(12000), redirect: 'follow' });
    if (!r.ok) return { ok: false, status: r.status };
    return { ok: true, status: r.status, body: json ? await r.json() : await r.text() };
  } catch (e) { return { ok: false, error: e.name }; }
}

async function liveStats() {
  const gh = process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  const [repo, npm] = await Promise.all([
    get('https://api.github.com/repos/mohitagw15856/pm-claude-skills', { headers: gh }),
    get('https://api.npmjs.org/downloads/point/last-week/pm-claude-skills'),
  ]);
  let translations = 0; const langs = [];
  const i18n = join(root, 'skills-i18n');
  if (existsSync(i18n)) for (const lang of readdirSync(i18n)) {
    const dir = join(i18n, lang);
    let n = 0;
    try { for (const s of readdirSync(dir)) if (existsSync(join(dir, s, 'SKILL.md'))) n++; } catch { /* not a folder */ }
    if (n) { translations += n; langs.push(lang); }
  }
  return {
    skills: COUNT, bundles: BUNDLES, translations, languages: langs.length,
    stars: repo.ok && Number.isFinite(repo.body?.stargazers_count) ? repo.body.stargazers_count : null,
    npmWeekly: npm.ok && Number.isFinite(npm.body?.downloads) ? npm.body.downloads : null,
  };
}

const CHANNELS = [
  { id: 'gitee', label: 'Gitee 镜像', url: 'https://gitee.com/mohitagw/pm-claude-skills', api: 'https://gitee.com/api/v5/repos/mohitagw/pm-claude-skills', okIf: (b) => b && b.full_name },
  { id: 'npmmirror', label: 'npmmirror', url: 'https://npmmirror.com/package/pm-claude-skills', api: 'https://registry.npmmirror.com/pm-claude-skills/latest', okIf: (b) => b && b.version, detail: (b) => `v${b.version}` },
  { id: 'modelscope-studio', label: '魔搭创空间', url: 'https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground', api: 'https://www.modelscope.ai/api/v1/studio/mohitagw15856/pm-skills-playground', okIf: (b) => b && b.Code === 200 },
  { id: 'modelscope-dataset', label: '魔搭数据集', url: 'https://www.modelscope.ai/datasets/mohitagw15856/pm-skills-instruct', api: 'https://www.modelscope.ai/api/v1/datasets/mohitagw15856/pm-skills-instruct', okIf: (b) => b && b.Code === 200 },
];
async function chinaStatus() {
  return Promise.all(CHANNELS.map(async (c) => {
    const r = await get(c.api);
    const state = r.offline ? 'unknown' : r.ok && c.okIf(r.body) ? 'up' : 'down';
    return { id: c.id, label: c.label, url: c.url, state, detail: state === 'up' && c.detail ? c.detail(r.body) : '', checked: DATE };
  }));
}

// ── Badges (shields-style; one image reads on light and dark) ───────────────
function badge(label, value, color, title) {
  const s = 11, pad = 8;
  const lw = Math.ceil(tw(label, s)) + pad * 2, vw = Math.ceil(tw(value, s)) + pad * 2, W = lw + vw;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="20" viewBox="0 0 ${W} 20" role="img" aria-label="${esc(title || `${label}: ${value}`)}">
  <title>${esc(title || `${label}: ${value}`)}</title>
  <linearGradient id="g" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <clipPath id="r"><rect width="${W}" height="20" rx="3"/></clipPath>
  <g clip-path="url(#r)"><rect width="${lw}" height="20" fill="#555"/><rect x="${lw}" width="${vw}" height="20" fill="${color}"/><rect width="${W}" height="20" fill="url(#g)"/></g>
  <g fill="#fff" font-family="${esc(FONT)}" font-size="${s}" text-anchor="middle">
    <text x="${lw / 2}" y="14" fill="#010101" fill-opacity=".3">${esc(label)}</text><text x="${lw / 2}" y="13.5">${esc(label)}</text>
    <text x="${lw + vw / 2}" y="14" fill="#010101" fill-opacity=".3">${esc(value)}</text><text x="${lw + vw / 2}" y="13.5">${esc(value)}</text>
  </g>
</svg>
`;
}

// ── 1. Skill of the day ─────────────────────────────────────────────────────
function sotdCard(theme, lang, s) {
  const c = THEMES[theme]; const zh = lang === 'zh';
  const W = 860, H = 300, F = zh ? ZH_FONT : FONT;
  const L = zh
    ? { kicker: `今日技能 · ${zhFull(DATE)}`, try: '试着这样说', side: `每天换一个 · 共 ${n0(COUNT)} 个技能`, aria: `今日技能：${s.title}（${s.name}）。${s.summary} 试着这样说：${s.prompt}` }
    : { kicker: `Skill of the day · ${enDate(DATE)}`, try: 'Try saying', side: `A new one every day · ${n0(COUNT)} skills`, aria: `Skill of the day: ${s.title} (${s.name}). ${s.summary} Try saying: ${s.prompt}` };
  const title = clip(s.title, 780, 24);
  const desc = wrap(s.summary.replace(/\s*[\u2014\u2013]\s*/g, ', '), 780, 15, 2);
  const prompt = clip(s.prompt, 700, 15);
  const askW = Math.ceil(tw(prompt, 15)) + 30;
  const chipW = Math.ceil(tw(`⚡ ${s.name}`, 13, true)) + 28;
  const bunW = Math.ceil(tw(s.bundle || '', 13, true)) + 28;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L.aria)}">
  <style>
    text{font-family:${F}}
    .lbl{font-size:12px;fill:${c.muted};letter-spacing:.06em;${zh ? '' : 'text-transform:uppercase'}}
    .t{font-size:24px;font-weight:700;fill:${c.ink}}
    .d{font-size:15px;fill:${c.muted}}
    .chip{font-size:13px;fill:${c.chipInk};font-family:${MONO}}
    .ask{font-size:15px;fill:${c.userInk}}
    .side{font-size:12.5px;fill:${c.muted}}
    @keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    .u{animation:up .6s ease-out both}
    @keyframes ty{0%,8%{width:0}38%,92%{width:${askW}px}100%{width:${askW}px}}
    .ty{animation:ty 9s steps(28,end) infinite}
    @keyframes live{0%,100%{opacity:1}50%{opacity:.25}}
    .live{animation:live 2s ease-in-out infinite}
    ${REDUCED('.ty{width:' + askW + 'px}')}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="14" fill="${c.card}" stroke="${c.line}"/>
  <circle class="live" cx="44" cy="47" r="4.5" fill="${c.good}"/>
  <text x="56" y="51" class="lbl">${esc(L.kicker)}</text>
  <text x="${W - 40}" y="51" text-anchor="end" class="side">${esc(L.side)}</text>
  <g class="u" style="animation-delay:.1s"><text x="40" y="92" class="t">${esc(title)}</text></g>
  <g class="u" style="animation-delay:.3s">
    <rect x="40" y="106" width="${chipW}" height="28" rx="14" fill="${c.chip}"/><text x="54" y="125" class="chip">⚡ ${esc(s.name)}</text>
    <rect x="${52 + chipW}" y="106" width="${bunW}" height="28" rx="14" fill="none" stroke="${c.line}"/><text x="${66 + chipW}" y="125" class="chip" style="fill:${c.muted}">${esc(s.bundle || '')}</text>
  </g>
  <g class="u" style="animation-delay:.5s">${desc.map((l, i) => `<text x="40" y="${162 + i * 22}" class="d">${esc(l)}</text>`).join('')}</g>
  <text x="40" y="${H - 72}" class="lbl">${esc(L.try)}</text>
  <rect x="40" y="${H - 62}" width="${askW + 4}" height="38" rx="14" fill="${c.user}"/>
  <clipPath id="tc"><rect class="ty" x="46" y="${H - 58}" width="0" height="30"/></clipPath>
  <text x="54" y="${H - 38}" class="ask" clip-path="url(#tc)">${esc(prompt)}</text>
</svg>
`;
}

// ── 2. Stats ticker ─────────────────────────────────────────────────────────
function statsCard(theme, lang, st) {
  const c = THEMES[theme]; const zh = lang === 'zh';
  const W = 860, H = 176, F = zh ? ZH_FONT : FONT;
  const dash = zh ? '暂无' : 'n/a';
  const tiles = zh
    ? [[n0(st.skills), '个技能'], [n0(st.bundles), '个技能包'], [st.stars == null ? dash : n0(st.stars), 'GitHub 星标'], [st.npmWeekly == null ? dash : n0(st.npmWeekly), 'npm 周下载'], [n0(st.translations), `篇译文 · ${st.languages} 种语言`]]
    : [[n0(st.skills), 'skills'], [n0(st.bundles), 'bundles'], [st.stars == null ? dash : n0(st.stars), 'GitHub stars'], [st.npmWeekly == null ? dash : n0(st.npmWeekly), 'weekly npm downloads'], [n0(st.translations), `translated skills in ${st.languages} languages`]];
  const kicker = zh ? `实时数据 · ${zhDate(DATE)} 更新` : `Live numbers · updated ${enDate(DATE)}`;
  const note = (st.stars == null || st.npmWeekly == null) ? (zh ? '暂无：数据源今天没有响应' : 'n/a: the source did not answer today') : '';
  const aria = tiles.map(([v, l]) => `${v} ${l}`).join(', ');
  const tw0 = (W - 80 - 4 * 12) / 5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${kicker}: ${aria}`)}">
  <style>
    text{font-family:${F}}
    .lbl{font-size:12px;fill:${c.muted};letter-spacing:.06em;${zh ? '' : 'text-transform:uppercase'}}
    .v{font-size:28px;font-weight:700;fill:${c.ink};font-variant-numeric:tabular-nums}
    .k{font-size:12.5px;fill:${c.muted}}
    @keyframes roll{0%{opacity:0;transform:translateY(14px)}60%{opacity:1}100%{opacity:1;transform:none}}
    .r{animation:roll .9s cubic-bezier(.2,.8,.2,1) both}
    @keyframes live{0%,100%{opacity:1}50%{opacity:.25}}
    .live{animation:live 2s ease-in-out infinite}
    ${REDUCED()}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <circle class="live" cx="44" cy="39" r="4.5" fill="${c.good}"/>
  <text x="56" y="43" class="lbl">${esc(kicker)}</text>
  ${note ? `<text x="${W - 40}" y="43" text-anchor="end" class="k">${esc(note)}</text>` : ''}
  ${tiles.map(([v, l], i) => {
    const x = 40 + i * (tw0 + 12);
    return `<rect x="${x}" y="60" width="${tw0}" height="92" rx="12" fill="${c.card}" stroke="${c.line}"/>
  <g class="r" style="animation-delay:${(0.15 * i).toFixed(2)}s"><text x="${x + 16}" y="100" class="v" style="fill:${i === 0 ? c.accent : c.ink}">${esc(v)}</text></g>
  ${wrap(l, tw0 - 28, 12.5, 2).map((ln, j) => `<text x="${x + 16}" y="${124 + j * 15}" class="k">${esc(ln)}</text>`).join('')}`;
  }).join('\n  ')}
</svg>
`;
}

// ── 3. China status badges ──────────────────────────────────────────────────
function statusBadge(ch) {
  const md = `${zhDate(DATE)}检测`;
  const [value, color] = ch.state === 'up' ? [`在线 ✅ ${ch.detail ? `${ch.detail} ` : ''}· ${md}`, '#2e8b57']
    : ch.state === 'down' ? [`未响应 ⚠️ · ${md}`, '#c9821b'] : ['未检测', '#8a8f98'];
  const title = ch.state === 'unknown' ? `${ch.label}：本次构建未联网检测` : `${ch.label}：${ch.state === 'up' ? '在线' : '未响应'}（${DATE} 从 GitHub 服务器检测，不代表国内访问速度）`;
  return badge(ch.label, value, color, title);
}

// ── 4. Exam countdowns ──────────────────────────────────────────────────────
const lastSat = (y, m) => { const d = new Date(Date.UTC(y, m, 0)); while (d.getUTCDay() !== 6) d.setUTCDate(d.getUTCDate() - 1); return iso(d); };
const satBetween = (y, m, a) => { for (let dd = a; dd < a + 7; dd++) { const d = new Date(Date.UTC(y, m - 1, dd)); if (d.getUTCDay() === 6) return iso(d); } return null; };
const RULES = { gaokao: (y) => `${y}-06-07`, kaoyan: (y) => satBetween(y, 12, 19), guokao: (y) => lastSat(y, 11) };
const SPAN = { gaokao: 3, kaoyan: 1, guokao: 1 }; // extra exam days after the first
function examCountdowns() {
  const data = readJSON(join(root, 'data', 'cn-exam-dates.json'), { exams: {} }).exams || {};
  return Object.entries(RULES).map(([id, rule]) => {
    const e = data[id] || {};
    const dateFor = (y) => (e.dates && e.dates[y] && e.dates[y].date) || rule(y);
    const confirmedFor = (y) => !!(e.dates && e.dates[y] && e.dates[y].confirmed);
    let y = YEAR, date = dateFor(y);
    if (diff(date, DATE) > SPAN[id]) { y += 1; date = dateFor(y); }
    const left = diff(DATE, date);
    return { id, label: e.label || id, skill: e.skill, date, confirmed: confirmedFor(y), left };
  });
}
function examBadge(x) {
  const [value, color] = x.left > 0
    ? [`还有 ${x.left} 天 · ${zhDate(x.date)}${x.confirmed ? '' : '（预计）'}`, x.left <= 30 ? '#d0453a' : x.left <= 100 ? '#c9821b' : '#3a6fb0']
    : x.left === 0 ? ['今天开考，加油！', '#d0453a'] : ['考试进行中，加油！', '#d0453a'];
  return badge(x.label, value, color, `${x.label}：${value}。点击打开 ${x.skill} 技能`);
}

// ── 5. Seasonal banner ──────────────────────────────────────────────────────
const CAL = readJSON(join(root, 'data', 'solar-terms.json'), { terms: {}, festivals: {} });
const TERM_ORDER = ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'];
const TERM_NOTE = {
  立春: '春季开始，万物复苏', 雨水: '降雨增多，冰雪消融', 惊蛰: '春雷始鸣，蛰虫惊醒', 春分: '昼夜平分，春意正浓', 清明: '天清地明，踏青祭扫', 谷雨: '雨生百谷，播种正当时',
  立夏: '夏季开始，万物繁茂', 小满: '麦粒渐满，小得盈满', 芒种: '有芒之谷，忙种忙收', 夏至: '白昼最长，盛夏将至', 小暑: '暑气渐盛，尚未极热', 大暑: '一年最热，注意防暑',
  立秋: '秋季开始，暑去凉来', 处暑: '暑气至此而止', 白露: '天气转凉，露凝而白', 秋分: '昼夜再次平分，秋色正好', 寒露: '露水渐寒，深秋来临', 霜降: '天气渐冷，开始降霜',
  立冬: '冬季开始，万物收藏', 小雪: '气温下降，开始降雪', 大雪: '降雪增多，天寒地冻', 冬至: '白昼最短，数九开始', 小寒: '天气寒冷，尚未到最冷', 大寒: '一年最冷，岁末将至',
};
const allTerms = Object.values(CAL.terms || {}).flat().map(([name, date, time]) => ({ name, date, time })).sort((a, b) => a.date.localeCompare(b.date));
function solarTerm(date) {
  let cur = null, next = null;
  for (const t of allTerms) { if (t.date <= date) cur = t; else { next = t; break; } }
  if (!cur || !next) return null; // outside the table: no term shown rather than a guess
  return { ...cur, index: TERM_ORDER.indexOf(cur.name) + 1, today: cur.date === date, next, nextIn: diff(date, next.date) };
}
function season(date) {
  const y = +date.slice(0, 4), m = +date.slice(5, 7), d = +date.slice(8, 10);
  const F = CAL.festivals || {};
  const term = solarTerm(date);
  for (const yy of [y, y + 1]) {
    const f = F[yy]; if (!f) continue;
    const off = diff(f.chunjie, date);
    if (off >= -10 && off <= 14) return { kind: 'chunjie', off, zodiac: f.zodiac, chunjie: f.chunjie, term };
  }
  const zq = F[y] && F[y].zhongqiu;
  const inGuoqing = m === 10 && d <= 7;
  if (zq) { const off = diff(zq, date); if (off >= -5 && off <= 1) return { kind: 'zhongqiu', off, zhongqiu: zq, guoqing: inGuoqing || (m === 9 && d === 30 && off === 0), term }; }
  if (inGuoqing) return { kind: 'guoqing', day: d, term };
  if (m === 6 && d <= 18) return { kind: '618', left: 18 - d, term };
  if ((m === 10 && d >= 20) || (m === 11 && d <= 11)) return { kind: 's11', left: diff(date, `${y}-11-11`), term };
  return { kind: 'term', term };
}
const PALETTES = {
  chunjie: { b1: '#8f1d22', b2: '#c9343c', ink: '#fff3d6', sub: '#ffdca0', accent: '#f5c451' },
  zhongqiu: { b1: '#0f1830', b2: '#22325c', ink: '#f6eedb', sub: '#d8cfb8', accent: '#f2c46d' },
  guoqing: { b1: '#a5161c', b2: '#d8262f', ink: '#fff6dc', sub: '#ffe2a6', accent: '#ffd34d' },
  618: { b1: '#ff5a1f', b2: '#e4183c', ink: '#ffffff', sub: '#ffe7d6', accent: '#ffe066' },
  s11: { b1: '#e0193a', b2: '#6d1fc9', ink: '#ffffff', sub: '#ffe0f0', accent: '#ffd84d' },
  spring: { b1: '#eef6e8', b2: '#d6ebcf', ink: '#21402a', sub: '#46644c', accent: '#de7b94', big: '#2f6f3e' },
  summer: { b1: '#e2f4f2', b2: '#c4e7e3', ink: '#143b3b', sub: '#3c6262', accent: '#2a9d8f', big: '#1f6f66' },
  autumn: { b1: '#fbefdc', b2: '#f1d9b9', ink: '#4a2a12', sub: '#77512f', accent: '#d2691e', big: '#9c4a14' },
  winter: { b1: '#1d2a40', b2: '#2e4262', ink: '#eef3fa', sub: '#b9c7da', accent: '#ffffff', big: '#dce6f5' },
};
function particles(kind, p, n, seed) {
  const r = rng(seed);
  const shapes = {
    hongbao: `<symbol id="pt" viewBox="0 0 22 30" overflow="visible"><rect width="22" height="30" rx="3" fill="#e23b3b" stroke="${p.accent}" stroke-width="1.2"/><path d="M0 7 Q11 15 22 7" fill="none" stroke="${p.accent}" stroke-width="1.2"/><circle cx="11" cy="13" r="3.4" fill="${p.accent}"/></symbol>`,
    petal: `<symbol id="pt" viewBox="0 0 14 9" overflow="visible"><ellipse cx="7" cy="4.5" rx="7" ry="4.2" fill="${p.accent}" opacity=".85"/></symbol>`,
    leaf: `<symbol id="pt" viewBox="0 0 18 18" overflow="visible"><path d="M2 16C2 6 8 1 17 1C17 10 12 16 2 16Z" fill="${p.accent}" opacity=".85"/><path d="M2 16L13 5" stroke="#8a3c0d" stroke-width=".8"/></symbol>`,
    snow: `<symbol id="pt" viewBox="0 0 10 10" overflow="visible"><circle cx="5" cy="5" r="4" fill="#fff" opacity=".9"/></symbol>`,
    firefly: `<symbol id="pt" viewBox="0 0 10 10" overflow="visible"><circle cx="5" cy="5" r="3.2" fill="${p.accent}" opacity=".7"/></symbol>`,
    tag: `<symbol id="pt" viewBox="0 0 26 16" overflow="visible"><path d="M0 2Q0 0 2 0H20L26 8L20 16H2Q0 16 0 14Z" fill="${p.accent}" opacity=".9"/><circle cx="20" cy="8" r="2" fill="${p.b2}"/></symbol>`,
  };
  const rise = kind === 'firefly' || kind === 'tag';
  const sizes = { hongbao: [22, 30], petal: [14, 9], leaf: [18, 18], snow: [8, 8], firefly: [10, 10], tag: [26, 16] }[kind];
  let uses = '';
  for (let i = 0; i < n; i++) {
    const x = Math.round(500 + r() * 340), y = rise ? 150 + Math.round(r() * 60) : 150 + Math.round(r() * 60);
    const sc = (kind === 'hongbao' ? 1 + r() * 0.5 : 0.7 + r() * 0.6).toFixed(2), dur = (6 + r() * 5).toFixed(1), del = (-r() * 11).toFixed(1);
    uses += `<use href="#pt" x="${x}" y="${y}" width="${Math.round(sizes[0] * sc)}" height="${Math.round(sizes[1] * sc)}" class="pf" style="animation-duration:${dur}s;animation-delay:${del}s"/>`;
  }
  const kf = rise
    ? `@keyframes pf{0%{transform:translate(0,40px);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translate(-20px,-190px);opacity:0}}`
    : `@keyframes pf{0%{transform:translate(0,-230px) rotate(0);opacity:0}8%{opacity:1}90%{opacity:1}100%{transform:translate(-36px,40px) rotate(320deg);opacity:0}}`;
  return { defs: shapes[kind], uses, css: `${kf}.pf{transform-box:fill-box;transform-origin:center;animation:pf 8s linear infinite}` };
}
function seasonBanner(s, sotdZh) {
  const W = 860, H = 220;
  const t = s.term;
  const kindKey = s.kind === 'term' ? (t ? ['spring', 'summer', 'autumn', 'winter'][Math.floor((t.index - 1) / 6)] : 'autumn') : s.kind;
  const p = PALETTES[kindKey];
  let title, sub, tip, art = '', css = '', fx = null, tag = '', link;
  const tipSkill = sotdZh ? `今日推荐「${sotdZh.title.replace(/技能$/, '')}」，试着说：${sotdZh.prompt}` : `${n0(COUNT)} 个技能，用中文说需求就行`;
  if (s.kind === 'chunjie') {
    const o = s.off;
    title = o < -1 ? `春节倒计时 ${-o} 天` : o === -1 ? '除夕快乐，阖家团圆' : o === 14 ? '元宵节快乐' : `新春快乐 · ${s.zodiac}年大吉`;
    sub = o < 0 ? `${s.zodiac}年春节 ${zhDate(s.chunjie)} · 年货、年终总结、拜年话，一起备好` : o <= 6 ? `正月初${'一二三四五六七'[o]} · 恭喜发财，${s.zodiac}年行大运` : `${s.zodiac}年正月 · 新年新计划，从一份 OKR 开始`;
    tip = '拜年话不会写？打开拜年语生成器，选对象、选语气，一键复制';
    fx = particles('hongbao', p, 16, `${DATE}hb`);
    link = `${SITE}/bainian.html`;
    art = lanterns(p);
  } else if (s.kind === 'zhongqiu') {
    title = s.off < 0 ? `中秋倒计时 ${-s.off} 天` : s.guoqing ? '中秋国庆，双节快乐' : s.off === 0 ? '中秋快乐 · 月圆人团圆' : '中秋快乐';
    sub = `${zhDate(s.zhongqiu)} 中秋 · 但愿人长久，千里共婵娟`;
    tip = tipSkill;
    fx = particles('firefly', p, 10, `${DATE}zq`);
    art = moon(p);
    link = sotdZh ? `${SITE}/skill/${sotdZh.name}.html` : SITE;
  } else if (s.kind === 'guoqing') {
    title = `国庆快乐 · 假期第 ${s.day} 天`;
    sub = '出游、调休、复工，计划都可以交给技能来排';
    tip = tipSkill;
    art = fireworks(p);
    link = sotdZh ? `${SITE}/skill/${sotdZh.name}.html` : SITE;
  } else if (s.kind === '618' || s.kind === 's11') {
    const name = s.kind === '618' ? '618 年中大促' : '双 11 大促';
    title = s.left > 0 ? `${name} · 还有 ${s.left} 天` : `${name} · 就是今天`;
    sub = s.kind === '618' ? '跨境上新、平台打法、出海合规：用 pm-chuhai 技能包备战' : '种草笔记、直播话术、跨境 listing：两个技能包一起上';
    tip = s.kind === '618' ? '试着说：帮我写一条亚马逊 listing，卖点是便携和续航' : '试着说：帮我写一篇双 11 小红书种草笔记';
    fx = particles('tag', p, 12, `${DATE}sp`);
    art = countdownRing(p, s.left);
    link = `${REPO}/tree/main/plugins/${s.kind === '618' ? 'pm-chuhai' : 'pm-zh-content'}`;
  } else if (t) {
    title = t.today ? `今日${t.name}` : t.name;
    sub = `${TERM_NOTE[t.name]} · ${zhDate(t.date)} ${t.time} 交节 · 第 ${t.index} 个节气`;
    tip = `距${t.next.name}还有 ${t.nextIn} 天 · ${tipSkill}`;
    fx = particles(['petal', 'firefly', 'leaf', 'snow'][Math.floor((t.index - 1) / 6)], p, 14, `${DATE}t`);
    art = `<text x="${W - 52}" y="178" text-anchor="end" font-size="150" font-weight="700" fill="${p.big}" opacity=".12">${esc(t.name)}</text>`;
    link = sotdZh ? `${SITE}/skill/${sotdZh.name}.html` : SITE;
  } else {
    title = 'PM Skills 中文技能';
    sub = `${n0(COUNT)} 个技能，周报、考公、出海，一句话调用`;
    tip = tipSkill;
    link = SITE;
  }
  if (s.kind !== 'term' && t) tag = `${t.today ? '今日' : '节气 · '}${t.name}`;
  if (fx) css += fx.css;
  const tagW = tag ? Math.ceil(tw(tag, 12.5)) + 24 : 0;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${title}。${sub}。${tip}`)}">
  <style>
    text{font-family:${ZH_FONT}}
    .h{font-size:40px;font-weight:700;fill:${p.ink}}
    .s{font-size:17px;fill:${p.sub}}
    .tip{font-size:14px;fill:${p.ink}}
    .tag{font-size:12.5px;fill:${p.ink}}
    @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    .u{animation:up .7s ease-out both}
    ${css}
    ${REDUCED('.pf{opacity:.7}')}
  </style>
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.b1}"/><stop offset="1" stop-color="${p.b2}"/></linearGradient>${fx ? fx.defs : ''}</defs>
  <rect width="${W}" height="${H}" rx="18" fill="url(#bg)"/>
  <clipPath id="frame"><rect width="${W}" height="${H}" rx="18"/></clipPath>
  <g clip-path="url(#frame)">${art}${fx ? fx.uses : ''}</g>
  <text x="44" y="46" class="tag" opacity=".8">${esc(zhFull(DATE))}</text>
  ${tag ? `<rect x="${W - 40 - tagW}" y="28" width="${tagW}" height="26" rx="13" fill="${p.ink}" fill-opacity=".14"/><text x="${W - 40 - tagW / 2}" y="46" text-anchor="middle" class="tag">${esc(tag)}</text>` : ''}
  <g class="u" style="animation-delay:.1s"><text x="44" y="104" class="h">${esc(clip(title, 560, 40))}</text></g>
  <g class="u" style="animation-delay:.3s"><text x="44" y="140" class="s">${esc(clip(sub, 580, 17))}</text></g>
  <g class="u" style="animation-delay:.5s"><text x="44" y="184" class="tip">${esc(clip(`${tip} →`, 640, 14))}</text></g>
</svg>
`;
  return { svg, link, title };
}
function lanterns(p) {
  const one = (x, del) => `<g class="sw" style="transform-origin:${x}px 0px;animation-delay:${del}s"><path d="M${x} 0V40" stroke="${p.accent}" stroke-width="1.5"/><ellipse cx="${x}" cy="66" rx="30" ry="26" fill="#e8322f"/><path d="M${x - 30} 66H${x + 30}M${x} 40V92" stroke="${p.accent}" stroke-width="1" opacity=".7"/><rect x="${x - 12}" y="38" width="24" height="6" rx="2" fill="${p.accent}"/><rect x="${x - 12}" y="88" width="24" height="6" rx="2" fill="${p.accent}"/><path d="M${x - 4} 94V114M${x} 94V118M${x + 4} 94V114" stroke="${p.accent}" stroke-width="1.5"/><text x="${x}" y="74" text-anchor="middle" font-size="22" font-weight="700" fill="${p.accent}">福</text></g>`;
  return `<style>@keyframes sw{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}.sw{animation:sw 3.2s ease-in-out infinite}</style>${one(560, 0)}${one(670, -1.4)}`;
}
function moon(p) {
  return `<style>@keyframes glow{0%,100%{opacity:.35}50%{opacity:.6}}.glow{animation:glow 5s ease-in-out infinite}@keyframes tw{0%,100%{opacity:.2}50%{opacity:1}}.st{animation:tw 3s ease-in-out infinite}</style>
  <radialGradient id="mg"><stop offset="0" stop-color="${p.accent}" stop-opacity=".7"/><stop offset="1" stop-color="${p.accent}" stop-opacity="0"/></radialGradient>
  <circle class="glow" cx="730" cy="100" r="110" fill="url(#mg)"/><circle cx="730" cy="100" r="58" fill="#f7e9b8"/><circle cx="712" cy="88" r="9" fill="#e9d79a" opacity=".6"/><circle cx="744" cy="118" r="6" fill="#e9d79a" opacity=".6"/>
  ${[[560, 40, 0], [610, 170, 1.2], [820, 40, 0.6], [520, 120, 2], [660, 30, 1.6], [800, 190, 0.3]].map(([x, y, d]) => `<circle class="st" cx="${x}" cy="${y}" r="1.6" fill="#fff" style="animation-delay:${d}s"/>`).join('')}`;
}
function fireworks(p) {
  const burst = (cx, cy, del, col) => {
    let rays = '';
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; rays += `<path d="M${(cx + Math.cos(a) * 10).toFixed(1)} ${(cy + Math.sin(a) * 10).toFixed(1)}L${(cx + Math.cos(a) * 44).toFixed(1)} ${(cy + Math.sin(a) * 44).toFixed(1)}"/>`; }
    return `<g class="fw" stroke="${col}" stroke-width="2.4" stroke-linecap="round" style="transform-origin:${cx}px ${cy}px;animation-delay:${del}s">${rays}</g>`;
  };
  const star = (x, y, r) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5; const rr = i % 2 ? r * 0.42 : r; d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; } return `<path d="${d}Z" fill="${p.accent}" opacity=".85"/>`; };
  return `<style>@keyframes fw{0%{transform:scale(.1);opacity:0}15%{opacity:1}70%{transform:scale(1);opacity:.9}100%{transform:scale(1.15);opacity:0}}.fw{animation:fw 3s ease-out infinite}</style>
  ${burst(640, 80, 0, p.accent)}${burst(760, 130, -1, '#fff')}${burst(700, 60, -2, '#ffb3a6')}${star(812, 92, 12)}${star(590, 170, 9)}${star(840, 180, 7)}`;
}
function countdownRing(p, left) {
  return `<style>@keyframes ring{0%{transform:scale(.85);opacity:.6}100%{transform:scale(1.35);opacity:0}}.ring{animation:ring 2.4s ease-out infinite;transform-origin:730px 124px}</style>
  <circle class="ring" cx="730" cy="124" r="58" fill="none" stroke="${p.accent}" stroke-width="3"/><circle cx="730" cy="124" r="58" fill="${p.ink}" fill-opacity=".14" stroke="${p.accent}" stroke-width="2"/>
  <text x="730" y="${left > 0 ? 136 : 134}" text-anchor="middle" font-size="${left > 0 ? 44 : 30}" font-weight="700" fill="${p.ink}">${left > 0 ? left : '今天'}</text>${left > 0 ? `<text x="730" y="160" text-anchor="middle" font-size="13" fill="${p.ink}">天</text>` : ''}`;
}
function redirectPage(link, title, lang = 'zh-CN') {
  const zh = lang === 'zh-CN';
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)} | PM Skills</title>
<meta name="robots" content="noindex" />
<meta http-equiv="refresh" content="0; url=${esc(link)}" />
<link rel="canonical" href="${esc(link)}" />
</head>
<body>
<main>
<p>${zh ? '正在前往今天的推荐：' : 'Taking you to today’s pick: '}<a href="${esc(link)}">${esc(title)}</a></p>
</main>
</body>
</html>
`;
}

// ── 6. Chinese model leaderboard ────────────────────────────────────────────
function benchCard(theme, lang, mb) {
  const c = THEMES[theme]; const zh = lang === 'zh'; const F = zh ? ZH_FONT : FONT;
  const models = (mb && Array.isArray(mb.models) ? mb.models : []).filter((m) => Number.isFinite(m.score) && Number.isFinite(m.bare));
  const W = 860;
  const T = zh
    ? { title: '中文模型 · 技能增益榜', sub: `SkillBench 中文任务集 ${mb?.taskSetVersion || 'zh-1'} · ${mb?.taskCount || 10} 道题 · ${(mb?.domains || []).length || 4} 个领域 · 满分 5`, empty: '首次评测进行中', emptySub: '跑完第一轮后，这里会自动画出每个模型加载技能前后的得分', bare: '不加载技能', skilled: '加载技能', lift: '增益' }
    : { title: 'Skill lift on Chinese models', sub: `SkillBench Chinese task set ${mb?.taskSetVersion || 'zh-1'} · ${mb?.taskCount || 10} tasks · ${(mb?.domains || []).length || 4} domains · out of 5`, empty: 'First run in progress', emptySub: 'Scores with and without skills, per model, appear after the first run', bare: 'without skills', skilled: 'with skills', lift: 'lift' };
  const head = `<rect width="${W}" height="H_" rx="18" fill="${c.bg}"/>
  <text x="40" y="48" class="t">${esc(T.title)}</text>
  <text x="40" y="72" class="k">${esc(T.sub)}</text>`;
  const style = (extra) => `<style>
    text{font-family:${F}}
    .t{font-size:20px;font-weight:700;fill:${c.ink}}
    .k{font-size:12.5px;fill:${c.muted}}
    .m{font-size:13.5px;fill:${c.ink};font-family:${MONO}}
    .v{font-size:13px;fill:${c.ink};font-variant-numeric:tabular-nums}
    ${extra}
    ${REDUCED()}
  </style>`;
  if (!models.length) {
    const H = 260;
    const ghost = [0.82, 0.64, 0.73, 0.5].map((w, i) => `<rect class="gh" x="250" y="${104 + i * 32}" width="${Math.round(460 * w)}" height="16" rx="8" fill="${c.line}" style="animation-delay:${(i * 0.25).toFixed(2)}s"/><rect x="40" y="${104 + i * 32}" width="${120 + (i % 2) * 40}" height="16" rx="8" fill="${c.line}" opacity=".6"/>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${T.title}: ${T.empty}`)}">
  ${style(`@keyframes gh{0%,100%{opacity:.35}50%{opacity:.85}}.gh{animation:gh 2.4s ease-in-out infinite}`)}
  ${head.replace('H_', H)}
  ${ghost}
  <rect x="${W / 2 - 220}" y="118" width="440" height="84" rx="14" fill="${c.card}" stroke="${c.line}"/>
  <text x="${W / 2}" y="152" text-anchor="middle" class="t" style="font-size:19px">⏳ ${esc(T.empty)}</text>
  <text x="${W / 2}" y="180" text-anchor="middle" class="k">${esc(clip(T.emptySub, 410, 12.5))}</text>
</svg>
`;
  }
  const rows = models.slice(0, 10);
  const H = 152 + rows.length * 34;
  const x0 = 270, bw = 420, sx = (v) => x0 + (Math.max(0, Math.min(5, v)) / 5) * bw;
  const body = rows.map((m, i) => {
    const y = 108 + i * 34; const lift = m.score - m.bare;
    const col = lift > 0.05 ? c.good : lift < -0.05 ? c.accent : c.muted;
    return `<text x="40" y="${y + 13}" class="m">${esc(clip(m.model, 220, 13.5))}</text>
  <rect x="${x0}" y="${y}" width="${bw}" height="18" rx="9" fill="${c.line}" opacity=".5"/>
  <rect class="bar" x="${x0}" y="${y}" width="${(sx(m.score) - x0).toFixed(1)}" height="18" rx="9" fill="${c.accent}" style="animation-delay:${(i * 0.08).toFixed(2)}s"/>
  <path d="M${sx(m.bare).toFixed(1)} ${y - 3}V${y + 21}" stroke="${c.ink}" stroke-width="2.5"/>
  <text x="${x0 + bw + 14}" y="${y + 13}" class="v">${m.score.toFixed(2)}</text>
  <text x="${W - 40}" y="${y + 13}" text-anchor="end" class="v" style="fill:${col};font-weight:700">${lift >= 0 ? '+' : '−'}${Math.abs(lift).toFixed(2)}</text>`;
  }).join('\n  ');
  const ly = H - 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${T.title}. ${rows.map((m) => `${m.model}: ${m.score} ${T.skilled}, ${m.bare} ${T.bare}`).join('; ')}`)}">
  ${style(`@keyframes grow{from{transform:scaleX(0)}to{transform:none}}.bar{transform-box:fill-box;transform-origin:left;animation:grow 1s cubic-bezier(.2,.8,.2,1) both}`)}
  ${head.replace('H_', H)}
  <text x="${W - 40}" y="94" text-anchor="end" class="k">${esc(T.lift)}</text>
  ${body}
  <rect x="40" y="${ly - 10}" width="22" height="10" rx="5" fill="${c.accent}"/><text x="68" y="${ly}" class="k">${esc(T.skilled)}</text>
  <path d="M${150 + tw(T.skilled, 12.5)} ${ly - 12}V${ly + 2}" stroke="${c.ink}" stroke-width="2.5"/><text x="${160 + tw(T.skilled, 12.5)}" y="${ly}" class="k">${esc(T.bare)}</text>
</svg>
`;
}

// ── Static: terminal ────────────────────────────────────────────────────────
const TERM_SCRIPT = {
  en: {
    install: 'npx pm-claude-skills add',
    title: 'Terminal · install once, then just ask',
    screens: [
      { ask: 'Write a PRD for offline mode in our notes app', skill: 'prd-template', out: ['# PRD: Offline mode for Notes', 'Problem · Goals · Non-goals · 6 user stories · Metrics', 'Open question: who wins when two devices edit offline?', '✅ Saved as prd-offline-mode.md'] },
      { ask: 'Should we ship on Friday?', skill: 'ship-or-slip', out: ['ship 0.18 · ship reduced 0.71 · slip 0.11', 'The fact that flips it: payments sign-off', '✅ Ship reduced, with the EU flag off'] },
      { ask: 'Turn these notes into an update for the exec team', skill: 'stakeholder-update', out: ['TL;DR: launch moves a week; scope and budget unchanged', '🟢 Payments · 🟡 Onboarding (waiting on legal) · 🟢 Mobile', 'Decision needed: approve the extra QA contractor by Thursday', '✅ Ready to paste into Slack or email'] },
    ],
    aria: 'A terminal: npx pm-claude-skills add installs the skills, then three requests each load one skill and return finished work',
  },
  zh: {
    install: 'npx --registry=https://registry.npmmirror.com pm-claude-skills add',
    title: '终端 · 装一次，之后直接说需求',
    screens: [
      { ask: '帮我写周报：支付页改版上线了，转化率 3.1% 到 3.6%', skill: 'cn-weekly-report', out: ['一、本周完成：支付页改版上线，转化率 3.1% → 3.6%', '二、下周计划：灰度扩大到全量，补齐埋点', '三、问题与风险：埋点未就绪，A/B 测试可能延期', '✅ 一句话版本已生成，可以直接发群'] },
      { ask: '公司要裁我，工作 6 年 7 个月，能拿多少？', skill: 'cn-severance-calculator', out: ['适用情形：协商解除，N = 7 个月工资', '🟡 月工资超过当地社平三倍时有封顶，需核对', '✅ 签字前核对：未休年假工资、年终奖、社保'] },
      { ask: '下个月公务员面试，帮我模拟一轮', skill: 'cn-civil-exam-interview', out: ['第 1 题（应急应变）：暴雨导致窗口排长队', '用时 2:45 · 内容 4 · 结构 3 · 岗位匹配 4', '✅ 改进：先安抚，再分流，最后上报'] },
    ],
    aria: '终端演示：用 npmmirror 安装技能，然后三个中文请求各自加载一个技能并给出成品',
  },
};
function terminal(theme, lang) {
  const c = THEMES[theme]; const S = TERM_SCRIPT[lang];
  const W = 860, H = 370, CYCLE = 60, LH = 26, X = 40, Y0 = 92, fs = 14;
  const pct = (t) => `${Math.max(0, Math.min(100, (t / CYCLE) * 100)).toFixed(2)}%`;
  let css = '', body = '', k = 0;
  const show = (tin, tout) => {
    const n = `e${k++}`;
    css += `@keyframes ${n}{0%,${pct(tin - 0.01)}{opacity:0}${pct(tin)},${pct(tout - 0.3)}{opacity:1}${pct(tout)},100%{opacity:0}}.${n}{animation:${n} ${CYCLE}s infinite;opacity:0}`;
    return n;
  };
  const type = (text, x, y, tin, dur, tout, cls, prompt) => {
    const w = Math.ceil(tw(text, fs, true)) + 4;
    const n = show(tin, tout), ty = `t${k++}`;
    const steps = Math.max(8, Math.min(48, [...text].length));
    css += `@keyframes ${ty}{0%,${pct(tin)}{width:0}${pct(tin + dur)},100%{width:${w}px}}.${ty}{animation:${ty} ${CYCLE}s infinite steps(${steps},end)}`;
    css += `@keyframes ${ty}c{0%,${pct(tin)}{transform:translateX(0);opacity:.75}${pct(tin + dur)}{transform:translateX(${w}px);opacity:.75}${pct(tin + dur + 0.8)},100%{transform:translateX(${w}px);opacity:0}}.${ty}c{animation:${ty}c ${CYCLE}s infinite steps(${steps},end)}`;
    const pw = Math.ceil(tw(prompt, fs, true));
    body += `<g class="${n}"><text x="${x}" y="${y}" class="pr">${esc(prompt)}</text><clipPath id="${ty}k"><rect class="${ty}" x="${x + pw}" y="${y - 18}" width="0" height="26"/></clipPath><text x="${x + pw}" y="${y}" class="${cls}" clip-path="url(#${ty}k)">${esc(text)}</text><rect class="${ty}c cur" x="${x + pw + 1}" y="${y - 14}" width="8" height="17"/></g>`;
    reduced.push([n, ty, w]);
  };
  const line = (text, y, tin, tout, cls) => { const n = show(tin, tout); body += `<text x="${X}" y="${y}" class="${cls} ${n}">${esc(text)}</text>`; reduced.push([n]); };
  const reduced = [];
  // Screen 1: install, then the first request. Screens 2 and 3: one request each.
  const plan = [[0, 20], [20, 40], [40, 60]];
  S.screens.forEach((sc, i) => {
    const [t0, t1] = plan[i];
    let y = Y0, t = t0 + 0.6;
    if (i === 0) {
      type(S.install, X, y, t, 2.6, t1, 'cmd', '$ '); y += LH; t += 3.4;
      line(`Installing for 'claude' into ~/.claude/skills`, y, t, t1, 'dim'); y += LH; t += 1.1;
      line(`Installed ${n0(COUNT)} item(s) for 'claude'.`, y, t, t1, 'ok'); y += LH + 10; t += 1.2;
    } else {
      line(lang === 'zh' ? `# 同一个会话，${n0(COUNT)} 个技能都在，换个问题` : `# same session, all ${n0(COUNT)} skills on hand, a new request`, y, t0 + 0.2, t1, 'dim'); y += LH + 10; t += 0.5;
    }
    type(sc.ask, X, y, t, Math.min(3.2, 0.9 + [...sc.ask].length * 0.05), t1, 'ask', '› '); y += LH + 6; t += Math.min(3.2, 0.9 + [...sc.ask].length * 0.05) + 0.8;
    const n = show(t, t1); const cw = Math.ceil(tw(`⚡ ${sc.skill}`, 13, true)) + 26;
    body += `<g class="${n}"><rect x="${X}" y="${y - 19}" width="${cw}" height="28" rx="14" fill="${c.chip}"/><text x="${X + 13}" y="${y}" class="chip">⚡ ${esc(sc.skill)}</text><text x="${X + cw + 12}" y="${y}" class="dim">${lang === 'zh' ? '已加载技能' : 'skill loaded'}</text></g>`;
    reduced.push([n]);
    y += LH + 8; t += 1.0;
    sc.out.forEach((o) => { line(o, y, t, t1, o.startsWith('✅') ? 'ok' : 'out'); y += LH; t += 0.55; });
  });
  // Reduced motion: hold the first screen still, fully typed.
  const firstScreen = reduced.slice(0, 4 + S.screens[0].out.length + 1);
  const rm = firstScreen.map(([n, ty, w]) => `.${n}{opacity:1!important}${ty ? `.${ty}{width:${w}px!important}.${ty}c{transform:translateX(${w}px)!important}` : ''}`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(S.aria)}">
  <style>
    text{font-family:${MONO};font-size:${fs}px}
    .title{font-family:${FONT};font-size:13px;fill:${c.muted}}
    .pr{fill:${c.accent};font-weight:700}
    .cmd{fill:${c.ink}}
    .ask{fill:${c.userInk}}
    .dim{fill:${c.muted}}
    .ok{fill:${c.good}}
    .out{fill:${c.ink}}
    .chip{fill:${c.chipInk};font-size:13px}
    .cur{fill:${c.accent};opacity:.75}
    ${css}
    ${REDUCED(rm)}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="14" fill="${c.card}" stroke="${c.line}"/>
  <circle cx="40" cy="40" r="5" fill="#ff5f57"/><circle cx="58" cy="40" r="5" fill="#febc2e"/><circle cx="76" cy="40" r="5" fill="#28c840"/>
  <text x="96" y="44" class="title">${esc(S.title)}</text>
  <path d="M16 60H${W - 16}" stroke="${c.line}"/>
  ${body}
</svg>
`;
}

// ── Static: constellation wordmark ──────────────────────────────────────────
// "PM Skills" as stroke glyphs on a 100-unit cap height; each vertex becomes a star.
const GLYPHS = {
  P: { w: 56, s: [[[0, 100], [0, 0], [38, 0], [54, 12], [54, 38], [38, 50], [0, 50]]] },
  M: { w: 72, s: [[[0, 100], [0, 0], [36, 58], [72, 0], [72, 100]]] },
  S: { w: 58, s: [[[58, 14], [44, 0], [14, 0], [0, 14], [0, 36], [14, 48], [44, 52], [58, 64], [58, 86], [44, 100], [14, 100], [0, 86]]] },
  k: { w: 46, s: [[[0, 0], [0, 100]], [[44, 38], [0, 74]], [[14, 64], [46, 100]]] },
  i: { w: 0, s: [[[0, 40], [0, 100]]], dot: [0, 18] },
  l: { w: 0, s: [[[0, 0], [0, 100]]] },
  s: { w: 40, s: [[[40, 46], [30, 38], [10, 38], [0, 47], [0, 60], [10, 67], [30, 71], [40, 79], [40, 91], [30, 100], [10, 100], [0, 92]]] },
};
function wordmark() {
  const word = 'PM Skills'; const gap = 24; let x = 0; const strokes = []; const stars = [];
  for (const ch of word) {
    if (ch === ' ') { x += 38; continue; }
    const g = GLYPHS[ch];
    for (const s of g.s) {
      const pts = s.map(([a, b]) => [a + x, b]);
      strokes.push(pts);
      pts.forEach((p, i) => {
        stars.push(p);
        if (i) { const q = pts[i - 1]; const len = Math.hypot(p[0] - q[0], p[1] - q[1]); const n = Math.floor(len / 34); for (let j = 1; j <= n; j++) stars.push([q[0] + ((p[0] - q[0]) * j) / (n + 1), q[1] + ((p[1] - q[1]) * j) / (n + 1)]); }
      });
    }
    if (g.dot) stars.push([g.dot[0] + x, g.dot[1]]);
    x += g.w + gap;
  }
  const uniq = []; for (const p of stars) if (!uniq.some((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 6)) uniq.push(p);
  return { strokes, stars: uniq, width: x - gap, dots: Object.values(GLYPHS).filter((g) => g.dot) };
}
const CONSTELLATION_NAMES = ['prd-template', 'okr-builder', 'stakeholder-update', 'rice-prioritisation', 'competitor-teardown', 'ship-or-slip', 'user-story-writer', 'meeting-notes', 'incident-postmortem', 'go-to-market', 'resume', 'salary-negotiation', 'sprint-planning', 'ab-test-planner', 'pricing-strategy', 'board-deck-narrative', 'investor-update', 'security-deposit-recovery', 'executive-summary', 'launch-readiness', 'risk-register', 'contract-review', 'churn-analysis', 'cohort-analysis', 'tech-radar', 'rfc-writer', 'press-release', 'content-calendar', 'roadmap-narrative', 'customer-journey-map', 'hiring-rubric', 'budget-variance-analysis'];
function constellation(theme, lang) {
  const c = THEMES[theme]; const zh = lang === 'zh';
  const W = 860, H = 280, CYCLE = 16;
  const pct = (t) => `${((t / CYCLE) * 100).toFixed(2)}%`;
  const wm = wordmark(); const sc = 1.38, ox = (W - wm.width * sc) / 2, oy = 46;
  const P = ([a, b]) => [+(ox + a * sc).toFixed(1), +(oy + b * sc).toFixed(1)];
  let names;
  if (zh) {
    const zhDir = join(root, 'skills-i18n', 'zh');
    names = (existsSync(zhDir) ? readdirSync(zhDir) : []).map(zhSkill).filter(Boolean).map((s) => s.title.replace(/技能$/, '')).filter((t) => t.length <= 10);
  } else names = CONSTELLATION_NAMES.filter((n) => byName.has(n));
  const r = rng(`constellation-${lang}`);
  const order = names.map((n) => [r(), n]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  let css = '', stars = '';
  wm.stars.forEach((pt, i) => {
    const [tx, ty] = P(pt);
    // Start somewhere around the edge, drift to the letter.
    const ang = r() * Math.PI * 2, dist = 260 + r() * 220;
    const dx = Math.round(Math.cos(ang) * dist), dy = Math.round(Math.sin(ang) * dist * 0.5);
    const arrive = 2.6 + r() * 2.2;
    const n = `s${i}`;
    css += `@keyframes ${n}{0%{transform:translate(${dx}px,${dy}px);opacity:0}6%{opacity:1}${pct(arrive)}{transform:none;opacity:1}${pct(CYCLE - 1.4)}{transform:none;opacity:1}100%{transform:none;opacity:0}}.${n}{animation:${n} ${CYCLE}s cubic-bezier(.25,.7,.3,1) infinite}`;
    const label = i < order.length * 1 && i % 2 === 0 ? order[(i / 2) % order.length] : null;
    stars += `<g class="${n}"><circle cx="${tx}" cy="${ty}" r="${(2.2 + r() * 1.4).toFixed(1)}" class="star" style="animation-delay:${(r() * 3).toFixed(1)}s"/>${label ? `<text x="${tx + 7}" y="${ty - 6}" class="lb">${esc(label)}</text>` : ''}</g>`;
  });
  const lines = wm.strokes.map((s) => `<polyline points="${s.map((p) => P(p).join(',')).join(' ')}" pathLength="1" class="ln"/>`).join('');
  const sub = zh ? `${n0(COUNT)} 个技能，一句话变成成品` : `${n0(COUNT)} skills that turn one sentence into finished work`;
  const aria = zh ? `PM Skills：技能名称像星星一样聚拢，连成 PM Skills 字样。${sub}` : `PM Skills: skill names drift in like stars and join into the PM Skills wordmark. ${sub}`;
  const finalStars = wm.stars.map((pt) => P(pt));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">
  <style>
    text{font-family:${zh ? ZH_FONT : MONO}}
    .star{fill:${c.accent};animation:tw 3s ease-in-out infinite}
    @keyframes tw{0%,100%{opacity:1}50%{opacity:.45}}
    .lb{font-size:10.5px;fill:${c.muted};opacity:0;animation:lb ${CYCLE}s infinite}
    @keyframes lb{0%{opacity:0}5%{opacity:.95}${pct(2.2)}{opacity:.85}${pct(3.6)},100%{opacity:0}}
    .ln{fill:none;stroke:${c.accent};stroke-width:2.2;stroke-linejoin:round;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;opacity:.75;animation:ln ${CYCLE}s infinite}
    @keyframes ln{0%,${pct(4.6)}{stroke-dashoffset:1;opacity:.75}${pct(6.8)},${pct(CYCLE - 1.4)}{stroke-dashoffset:0;opacity:.75}100%{stroke-dashoffset:0;opacity:0}}
    .sub{font-family:${zh ? ZH_FONT : FONT};font-size:16px;fill:${c.ink};opacity:0;animation:sub ${CYCLE}s infinite}
    @keyframes sub{0%,${pct(6.4)}{opacity:0}${pct(7.4)},${pct(CYCLE - 1.4)}{opacity:1}100%{opacity:0}}
    .dust{fill:${c.muted};opacity:.35}
    ${css}
    ${REDUCED('.ln{stroke-dashoffset:0}.sub{opacity:1}.lb{opacity:0}')}
  </style>
  <rect width="${W}" height="${H}" rx="18" fill="${c.bg}"/>
  ${Array.from({ length: 40 }, () => `<circle cx="${Math.round(r() * W)}" cy="${Math.round(r() * H)}" r="${(0.6 + r()).toFixed(1)}" class="dust"/>`).join('')}
  ${lines}
  ${stars}
  <text x="${W / 2}" y="${H - 52}" text-anchor="middle" class="sub">${esc(sub)}</text>
  <desc>${finalStars.length} stars</desc>
</svg>
`;
}

// ── Run ─────────────────────────────────────────────────────────────────────
mkdirSync(OUT, { recursive: true });
const write = (name, body) => { writeFileSync(join(OUT, name), body); return name; };
const written = [];

if (STATIC) {
  for (const lang of ['en', 'zh']) for (const theme of ['dark', 'light']) {
    const sfx = (lang === 'zh' ? '-zh' : '') + (theme === 'light' ? '-light' : '');
    written.push(write(`terminal${sfx}.svg`, terminal(theme, lang)));
    written.push(write(`constellation${sfx}.svg`, constellation(theme, lang)));
  }
} else {
  const sotd = skillOfTheDay();
  const [stats, status] = await Promise.all([liveStats(), chinaStatus()]);
  const exams = examCountdowns();
  const s = season(DATE);
  const banner = seasonBanner(s, sotd.zh);
  const mbPath = resolve(root, opt('modelbench', 'web/modelbench-zh.json'));
  const mb = readJSON(mbPath, null);
  for (const theme of ['dark', 'light']) {
    const t = theme === 'light' ? '-light' : '';
    if (sotd.en) written.push(write(`skill-of-the-day${t}.svg`, sotdCard(theme, 'en', sotd.en)));
    if (sotd.zh) written.push(write(`skill-of-the-day-zh${t}.svg`, sotdCard(theme, 'zh', sotd.zh)));
    written.push(write(`stats${t}.svg`, statsCard(theme, 'en', stats)));
    written.push(write(`stats-zh${t}.svg`, statsCard(theme, 'zh', stats)));
    written.push(write(`modelbench-zh${t}.svg`, benchCard(theme, 'zh', mb)));
    written.push(write(`modelbench-zh-en${t}.svg`, benchCard(theme, 'en', mb)));
  }
  for (const ch of status) written.push(write(`cn-status-${ch.id}.svg`, statusBadge(ch)));
  for (const x of exams) written.push(write(`exam-${x.id}.svg`, examBadge(x)));
  written.push(write('season.svg', banner.svg));
  written.push(write('season.html', redirectPage(banner.link, banner.title)));
  if (sotd.en) written.push(write('skill-of-the-day.html', redirectPage(`${SITE}/skill/${sotd.en.name}.html`, sotd.en.title, 'en')));
  if (sotd.zh) written.push(write('skill-of-the-day-zh.html', redirectPage(`${SITE}/skill/${sotd.zh.name}.html`, sotd.zh.title)));
  written.push(write('index.json', JSON.stringify({
    _comment: 'Generated by scripts/build-readme-live.mjs at Pages build time. Not committed.',
    date: DATE, generated: new Date().toISOString(), offline: OFFLINE,
    skillOfTheDay: sotd, stats, chinaStatus: status, exams, season: { kind: s.kind, title: banner.title, link: banner.link, term: s.term && { name: s.term.name, date: s.term.date, today: s.term.today } },
    modelbench: { models: (mb && mb.models ? mb.models.length : 0) },
  }, null, 2) + '\n'));
}
const rel = OUT.startsWith(root) ? OUT.slice(root.length + 1) : OUT;
console.log(`Wrote ${written.length} file(s) to ${rel}/ for ${DATE}${OFFLINE ? ' (offline)' : ''}.`);
