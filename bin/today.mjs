// The skill of the day: one deterministic pick per Beijing calendar day, shared
// by the live README card (scripts/build-readme-live.mjs) and the CLI
// (`npx pm-claude-skills today`), so both always agree.
//
// Seasonal weighting: in a themed window (an exam's last 30 days, the 618 and
// Double 11 run-ups, year-end review season, campus recruiting season) six days
// in ten pick from the skills that fit the season; the rest pick from the
// whole library, so nothing is ever starved.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const fnv = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
export const beijingToday = () => new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);

export function frontmatter(raw) {
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
export function enPrompt(desc) {
  const q = desc.match(/(?:^|\s)["“‘']([A-Za-z][^"”’']{8,64}?)["”’'](?=[\s,.;:)]|$)/);
  if (q) return q[1][0].toUpperCase() + q[1].slice(1);
  const m = desc.match(/Use when (?:asked|someone asks|the user asks|you are asked)\s+(to|for|how to|how do I)\s+([^,.;]+)/i);
  if (!m) return null;
  const clause = m[2].trim().replace(/\s+(or|and)$/i, '');
  if (clause.length < 8 || clause.length > 64 || /\b(this|these)\b$/.test(clause)) return null;
  const kind = m[1].toLowerCase();
  if (kind === 'for') return `I need ${clause}.`;
  if (kind === 'how do i') return `How do I ${clause}?`;
  return `Help me ${clause}.`;
}

// Same idea for Chinese descriptions, Simplified or Traditional.
export function zhPrompt(desc) {
  const q = desc.match(/[‘“「']([^’”」']{3,24})[’”」']/);
  if (q) return q[1];
  const m = desc.match(/[当當](被要求|被問到|被问到|用户要求|使用者要求|有人问|有人問|需要)?([^。；]*?)[时時](?:使用)?/);
  if (!m) return null;
  const item = m[2].split(/[、，,]|或者|或/)[0].trim().replace(/^[“"'‘]|[”"'’]$/g, '');
  if (item.length < 3 || item.length > 22) return null;
  const help = /[們這個為發]/.test(desc) ? '幫我' : '帮我';
  if (/^(被问到|被問到|有人问|有人問)$/.test(m[1] || '')) return /[？?吗嗎呢]$/.test(item) ? item : `${item}？`;
  if (m[1]) return /^(帮我|幫我)/.test(item) ? item : `${help}${item}`;
  return /^(撰写|撰寫|写|寫|准备|準備|制定|分析|生成|规划|規劃|比较|比較|整理|做|起草)/.test(item) ? `${help}${item}` : null;
}

export function localSkill(root, lang, name) {
  const f = join(root, 'skills-i18n', lang, name, 'SKILL.md');
  if (!existsSync(f)) return null;
  const { fm, body } = frontmatter(readFileSync(f, 'utf8'));
  const title = ((body.match(/^# (.+)$/m) || [])[1] || name).trim();
  const desc = fm.description || '';
  return { name, title, desc, summary: `${desc.split('。')[0] || desc}。`, prompt: zhPrompt(desc) };
}

const CHUHAI = (s) => ['pm-chuhai', 'pm-zh-content'].includes(s.plugin);
// exams: [{ id, label, left, skill, skills }] from the countdown data, optional.
export function seasonalTheme(date, exams = []) {
  const m = +date.slice(5, 7), d = +date.slice(8, 10);
  const close = exams.filter((x) => x.left > 0 && x.left <= 30).sort((a, b) => a.left - b.left);
  if (close.length) {
    const names = new Set(close.flatMap((x) => x.skills || [x.skill]));
    return { id: `exam-${close[0].id}`, label: `${close[0].label}冲刺`, match: (s) => names.has(s.name) || s.plugin === 'pm-china-exams' };
  }
  if (m === 6 && d <= 18) return { id: '618', label: '618', match: CHUHAI };
  if ((m === 10 && d >= 20) || (m === 11 && d <= 11)) return { id: 's11', label: '双11', match: CHUHAI };
  if (m === 12 || m === 1) return { id: 'year-end', label: '年终', match: (s) => /year-end|shuzhi|next-year|self-review|performance-review|okr|annual|brag|retro/.test(s.name) };
  if (m === 3 || m === 4 || m === 9 || (m === 10 && d < 20)) return { id: 'recruiting', label: '招聘季', match: (s) => /resume|cover-letter|campus|interview|job-application|salary-negotiation|offer|bilingual-cv/.test(s.name) };
  return null;
}

function choose(pool, date, salt, theme) {
  if (!pool.length) return null;
  if (theme) {
    const themed = pool.filter(theme.match);
    if (themed.length && fnv(`${date}:${salt}:${theme.id}`) % 10 < 6) return themed[fnv(`${date}:${salt}`) % themed.length];
  }
  return pool[fnv(`${date}:${salt}`) % pool.length];
}

// catalogue: the skills array from web/skills.json. Returns { date, theme, en, zh, zhTW }.
export function pickSkillOfTheDay({ root, date = beijingToday(), catalogue, exams = [] }) {
  const skills = (catalogue || JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills || []).filter((s) => !s.deprecated);
  const byName = new Map(skills.map((s) => [s.name, s]));
  const theme = seasonalTheme(date, exams);
  const enPool = skills.filter((s) => s.summary && enPrompt(s.description || '')).sort((a, b) => a.name.localeCompare(b.name));
  const en = choose(enPool, date, 'en', theme);
  const local = (lang) => {
    const dir = join(root, 'skills-i18n', lang);
    const pool = (existsSync(dir) ? readdirSync(dir) : []).filter((n) => byName.has(n)).map((n) => localSkill(root, lang, n))
      .filter((s) => s && s.prompt).map((s) => ({ ...s, plugin: byName.get(s.name).plugin })).sort((a, b) => a.name.localeCompare(b.name));
    const p = choose(pool, date, lang, theme);
    if (!p) return null;
    const { plugin, ...rest } = p;
    return { ...rest, bundle: plugin };
  };
  return {
    date,
    theme: theme ? { id: theme.id, label: theme.label } : null,
    en: en && { name: en.name, title: en.title || en.name, summary: en.summary, prompt: enPrompt(en.description), bundle: en.plugin },
    zh: local('zh'),
    zhTW: local('zh-TW'),
  };
}

const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
// `npx pm-claude-skills today [--lang en|zh|zh-TW] [--json] [--offline]`
// Reads the published pick (so it matches the README card exactly); offline or
// on any network error it computes the pick locally from the bundled catalogue.
// The npm package does not ship the translations, so a local Chinese pick falls
// back to English with a note.
export async function runToday({ root, lang = 'en', json = false, offline = false }) {
  const date = beijingToday();
  let data = null, source = 'published';
  if (!offline) {
    try {
      const r = await fetch(`${SITE}/live/index.json`, { signal: AbortSignal.timeout(4000) });
      if (r.ok) { const j = await r.json(); if (j && j.date === date && j.skillOfTheDay) data = j.skillOfTheDay; }
    } catch { /* offline or slow: compute locally */ }
  }
  if (!data) { source = 'local'; data = pickSkillOfTheDay({ root, date }); }
  const key = lang === 'zh' ? 'zh' : /^zh-?tw$/i.test(lang) ? 'zhTW' : 'en';
  const s = data[key] || data.en;
  const fellBack = key !== 'en' && !data[key];
  if (!s) { console.error('No skill of the day available.'); return 1; }
  const url = `${SITE}/skill/${s.name}.html`;
  if (json) { console.log(JSON.stringify({ date, lang: fellBack ? 'en' : lang, source, theme: data.theme || null, ...s, url }, null, 2)); return 0; }
  const zh = key !== 'en' && !fellBack;
  console.log(`\n${zh ? '今日技能' : 'Skill of the day'} · ${date}${data.theme ? ` · ${data.theme.label}` : ''}\n`);
  console.log(`  ${s.title}  (${s.name}${s.bundle ? ` · ${s.bundle}` : ''})`);
  console.log(`  ${s.summary}`);
  console.log(`\n  ${zh ? '试着说' : 'Try saying'}: "${s.prompt}"`);
  console.log(`  ${zh ? '直接运行' : 'Run it'}:   npx pm-claude-skills run ${s.name} --text "..."`);
  console.log(`  ${url}\n`);
  if (fellBack) console.log('  (Offline, so this is the English pick: the npm package does not include the translations.)\n');
  else if (source === 'local') console.log(zh ? '  （离线计算：考试冲刺期间可能与网页上的不同。）\n' : '  (Computed offline; in exam sprint weeks it can differ from the README card.)\n');
  return 0;
}
