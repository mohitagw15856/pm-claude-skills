#!/usr/bin/env node
// 翻译认领板 + 译者榜 · Translation claim board and translators' leaderboard.
//
// Lists the skills that have no Simplified (skills-i18n/zh/) or Traditional
// (skills-i18n/zh-TW/) Chinese translation yet, ranks them by how useful a
// translation would be to Chinese-speaking users, and turns the top of the list
// into claimable issues. Also credits the people who translated, from git log.
//
//   node scripts/translation-board.mjs                       # summary + top 20 to stdout
//   node scripts/translation-board.mjs --write               # docs/zh/translation-board.md + docs/readme-assets/translators.svg
//   node scripts/translation-board.mjs --json                # ranked list, machine-readable
//   node scripts/translation-board.mjs --leaderboard         # 译者榜 as Markdown
//   node scripts/translation-board.mjs --create-issues --limit 10            # DRY RUN: prints the issues
//   node scripts/translation-board.mjs --create-issues --limit 10 --yes      # really creates them (gh CLI)
//   ... --lang zh-TW      board/issues for Traditional Chinese instead of Simplified
//   ... --gitee           also create Gitee issues (needs GITEE_TOKEN; only with --yes)
//
// Ranking (higher first): China-specific skills and bundles, careers and core PM
// bundles, production tier, eval score, an existing Chinese description or a
// translation in the other script (both make the job easier and signal demand).
// Skills built around US-only rules (401(k), IRS, HOA ...) are pushed down.
// No dependencies beyond node and, for --yes, the gh CLI.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const arg = (f, d = '') => { const i = argv.indexOf(f); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };

if (has('--help') || has('-h')) {
  console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 22).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
  process.exit(0);
}

const REPO = 'mohitagw15856/pm-claude-skills';
const GITHUB = `https://github.com/${REPO}`;
const GITEE_OWNER = 'mohitagw', GITEE_REPO = 'pm-claude-skills';
const LABEL = 'good first translation';
const LANG = arg('--lang', 'zh');
if (!['zh', 'zh-TW'].includes(LANG)) { console.error('--lang must be zh or zh-TW'); process.exit(2); }
const LANG_NAME = { zh: '简体中文', 'zh-TW': '繁體中文' };

// ── Data ────────────────────────────────────────────────────────────────────
const translated = (lang) => {
  const dir = join(root, 'skills-i18n', lang);
  return new Set(existsSync(dir) ? readdirSync(dir).filter((n) => existsSync(join(dir, n, 'SKILL.md'))) : []);
};
const done = { zh: translated('zh'), 'zh-TW': translated('zh-TW') };
const skills = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills.filter((s) => !s.deprecated);
let aliases = {};
try { aliases = JSON.parse(readFileSync(join(root, 'data', 'zh-aliases.json'), 'utf8')).aliases || {}; } catch { /* optional */ }

const BUNDLE_WEIGHT = [
  [/^pm-china|^pm-chuhai|^pm-cn-/, 40, '中国本地化技能包'],
  [/^pm-(career|cv|recruiting|interview)/, 25, '求职与职业发展'],
  [/^pm-(delivery|strategy|discovery|data|growth|pmm|comms|people|operations|method|thinking)$/, 20, '产品与职场核心技能'],
  [/^pm-(ai|ai-native|aiwork|agentops|agentnative|engineering|architecture|qa|devrel)$/, 15, 'AI 与工程'],
  [/^pm-(ecommerce|founders|business|freelance|sales|cs|research|teaching)$/, 12, '创业、电商与研究'],
];
const US_ONLY = /\b(401\(k\)|IRS|HOA|FICO|Medicare|Medicaid|Social Security|W-2|1099|Roth|HSA|FMLA|ADA|COBRA|SSDI|U\.S\.|US-only|state law)\b/;

export function scoreSkill(s, lang = LANG) {
  const reasons = [];
  let score = 0;
  // Mainland skills matter most in Simplified; Hong Kong and Taiwan skills in Traditional.
  const home = lang === 'zh' ? /^cn-/ : /^(hk|tw)-/;
  if (home.test(s.name)) { score += 45; reasons.push('面向中文用户'); }
  else if (/^(cn|hk|tw)-/.test(s.name)) { score += 10; reasons.push('华语地区技能'); }
  for (const [re, w, why] of BUNDLE_WEIGHT) {
    if (!re.test(s.plugin || '')) continue;
    score += lang === 'zh-TW' && w === 40 ? 10 : w; // mainland bundles help Traditional readers less
    reasons.push(why);
    break;
  }
  if (s.tier === 'production') { score += 25; reasons.push('生产级'); }
  if (s.tier === 'experimental') score -= 10;
  if (s.eval && typeof s.eval.score === 'number') { score += Math.round((s.eval.score - 3) * 10); reasons.push(`评测 ${s.eval.score}`); }
  if (s.descriptionZh || aliases[s.name]) { score += 10; reasons.push('已有中文简介'); }
  const other = lang === 'zh' ? 'zh-TW' : 'zh';
  if (done[other].has(s.name)) { score += 15; reasons.push(`已有${LANG_NAME[other]}版可参考`); }
  if (US_ONLY.test(s.description || '')) { score -= 30; reasons.push('含美国专属规则'); }
  return { score, reasons };
}

export function rank(lang = LANG) {
  return skills
    .filter((s) => !done[lang].has(s.name))
    .map((s) => ({ name: s.name, title: s.title || s.name, plugin: s.plugin || 'other', tier: s.tier,
      zh: (s.descriptionZh || aliases[s.name] || '').replace(/\s+/g, ' '), ...scoreSkill(s, lang) }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}
const priority = (score) => (score >= 50 ? 'P0' : score >= 25 ? 'P1' : 'P2');

// ── Leaderboard from git log ────────────────────────────────────────────────
const BOT = /\[bot\]|(^|[-_ ])bot$|github-actions|dependabot|renovate/i;
let handles = {};
try { handles = JSON.parse(readFileSync(join(root, 'data', 'translators.json'), 'utf8')).aliases || {}; } catch { /* optional */ }

export function leaderboard() {
  let log = '';
  try {
    log = execFileSync('git', ['log', '--use-mailmap', '--format=@@%aN%x09%aE', '--name-only', '--', 'skills-i18n/'],
      { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch { return []; }
  const people = new Map();
  let who = null;
  for (const line of log.split('\n')) {
    if (line.startsWith('@@')) {
      const [name, email] = line.slice(2).split('\t');
      if (BOT.test(name) || BOT.test(email)) { who = null; continue; }
      // Never print email addresses: key by GitHub handle when we can tell it, else by name.
      const noreply = (email.match(/^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/i) || [])[1];
      const handle = handles[name] || noreply || '';
      const key = handle || name;
      if (!people.has(key)) people.set(key, { name: handle ? `@${handle}` : name, handle, commits: 0, files: new Set() });
      who = people.get(key);
      who.commits++;
      continue;
    }
    const m = who && line.match(/^skills-i18n\/([^/]+)\/([^/]+)\/SKILL\.md$/);
    if (m) who.files.add(`${m[1]}/${m[2]}`);
  }
  return [...people.values()].filter((p) => p.files.size)
    .map((p) => ({ name: p.name, handle: p.handle, commits: p.commits, translations: p.files.size }))
    .sort((a, b) => b.translations - a.translations || b.commits - a.commits || a.name.localeCompare(b.name));
}

function leaderboardMd(rows) {
  if (!rows.length) return '还没有记录。第一个翻译就是你的。\n';
  const out = ['| 名次 | 译者 | 翻译的技能 | 提交 |', '|---:|---|---:|---:|'];
  rows.slice(0, 20).forEach((r, i) => {
    const who = r.handle ? `[@${r.handle}](https://github.com/${r.handle})` : r.name.replace(/[|<>]/g, '');
    out.push(`| ${i + 1} | ${who} | ${r.translations} | ${r.commits} |`);
  });
  return out.join('\n') + '\n';
}

const xml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function leaderboardSvg(rows, totals) {
  const top = rows.slice(0, 8);
  const W = 640, rowH = 34, T = 92, H = T + Math.max(1, top.length) * rowH + 44;
  const max = Math.max(1, ...top.map((r) => r.translations));
  const BRAND = '#d97757';
  const body = top.map((r, i) => {
    const y = T + i * rowH;
    const bw = Math.max(4, Math.round((r.translations / max) * 300));
    return `<text x="32" y="${y + 21}" font-size="14" font-weight="700" fill="#8a909a">${i + 1}</text>` +
      `<text x="60" y="${y + 21}" font-size="14" fill="#1a1d23">${xml(r.name.slice(0, 24))}</text>` +
      `<rect x="250" y="${y + 8}" width="${bw}" height="16" rx="4" fill="${BRAND}" opacity="${(1 - i * 0.08).toFixed(2)}"/>` +
      `<text x="${258 + bw}" y="${y + 21}" font-size="13" fill="#5b6672">${r.translations}</text>`;
  }).join('\n  ');
  const empty = top.length ? '' : `<text x="${W / 2}" y="${T + 22}" text-anchor="middle" font-size="14" fill="#5b6672">第一个翻译就是你的 · Be the first translator</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="译者榜 Translators: ${xml(top.map((r) => `${r.name} ${r.translations}`).join(', '))}" font-family="-apple-system,'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',Segoe UI,Roboto,sans-serif">
  <rect width="${W}" height="${H}" rx="14" fill="#ffffff"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="none" stroke="#e6e8ec"/>
  <text x="32" y="40" font-size="20" font-weight="800" fill="#1a1d23">译者榜 · Translators</text>
  <text x="32" y="64" font-size="13" fill="#5b6672">简体 ${totals.zh} · 繁體 ${totals.zhTW} 个技能已翻译，还有 ${totals.open} 个等你认领</text>
  <text x="${W - 32}" y="40" text-anchor="end" font-size="13" font-weight="700" fill="${BRAND}">good first translation</text>
  ${body}${empty}
  <text x="32" y="${H - 18}" font-size="11" fill="#b0b5bd">github.com/${REPO} · 认领：docs/zh/translation-board.md</text>
</svg>
`;
}

// ── Board ───────────────────────────────────────────────────────────────────
const claimUrl = (name, lang) => `${GITHUB}/issues/new?template=zh-translation.yml&labels=${encodeURIComponent(`translation,${LABEL}`)}&title=${encodeURIComponent(`[翻译] ${name} → ${lang}`)}`;

function boardMd(lb) {
  const zh = rank('zh'), tw = rank('zh-TW');
  const twSet = new Set(tw.map((r) => r.name));
  const groups = { P0: [], P1: [], P2: [] };
  for (const r of zh) groups[priority(r.score)].push(r);
  const LIMIT = { P0: 60, P1: 60, P2: 0 };
  const cell = (s) => s.replace(/\|/g, '/').slice(0, 60) + (s.length > 60 ? '…' : '');
  const lines = [
    '<!-- Generated by scripts/translation-board.mjs --write. Do not edit by hand. -->',
    '# 翻译认领板 · Translation claim board', '',
    `PM Skills 共有 ${skills.length} 个技能，其中 **${done.zh.size}** 个有简体中文翻译，**${done['zh-TW'].size}** 个有繁體中文翻译。下面按"对中文用户有多大用处"排好了序，挑一个认领就可以开始。`, '',
    '## 怎么认领', '',
    '1. 在下表里挑一个技能，点"认领"打开 GitHub Issue（模板已填好）。用不了 GitHub 的话，在 [Gitee Issue](https://gitee.com/mohitagw/pm-claude-skills/issues) 选"认领翻译"模板，或者直接留言。',
    '2. 如果已经有人认领（看 [good first translation](https://github.com/mohitagw15856/pm-claude-skills/labels/good%20first%20translation) 标签下的 Issue），请换一个，或者在 Issue 下留言一起做。',
    '3. 翻译放在 `skills-i18n/zh/<技能名>/SKILL.md`（简体）或 `skills-i18n/zh-TW/<技能名>/SKILL.md`（繁体）。二级标题数量与英文版一致，`name` 不变，加 `language:` 字段和"英文版本为规范版本"的说明。参考 [`skills-i18n/zh/cn-weekly-report/SKILL.md`](../../skills-i18n/zh/cn-weekly-report/SKILL.md)。',
    '4. 不要逐字直译：把例子、货币、法规换成中文读者熟悉的说法；英文原文里只适用于美国的内容，在译文里注明。',
    '5. 提交 PR，CI 会检查结构。合并后你的名字会出现在下面的译者榜上。', '',
    '分数怎么算：中国本地化技能和技能包、求职与核心产品技能包优先；生产级技能、评测分高、已有中文简介、已有另一种中文版本的加分；依赖美国专属规则的减分。', '',
  ];
  for (const p of ['P0', 'P1']) {
    const title = p === 'P0' ? '## P0 · 最值得先翻译' : '## P1 · 很有用';
    lines.push(`${title}（${groups[p].length} 个）`, '', '| 技能 | 中文简介 | 技能包 | 分数 | 也缺繁體 | 认领 |', '|---|---|---|---:|:---:|---|');
    for (const r of groups[p].slice(0, LIMIT[p])) {
      lines.push(`| [\`${r.name}\`](../../skills/${r.name}/SKILL.md) | ${cell(r.zh || r.title)} | ${r.plugin} | ${r.score} | ${twSet.has(r.name) ? '是' : ''} | [认领](${claimUrl(r.name, 'zh')}) |`);
    }
    if (groups[p].length > LIMIT[p]) lines.push('', `还有 ${groups[p].length - LIMIT[p]} 个，运行 \`node scripts/translation-board.mjs --json\` 查看全部。`);
    lines.push('');
  }
  lines.push(`## P2 · 其他（${groups.P2.length} 个）`, '', '其余技能同样欢迎翻译，运行 `node scripts/translation-board.mjs --json` 查看完整排序。', '');
  const twTop = tw.filter((r) => done.zh.has(r.name)).slice(0, 30);
  lines.push('## 繁體中文：已有简体版，只差繁體', '', '这些技能已经有简体中文翻译，转写成繁體并按台湾、香港用语调整即可。', '',
    twTop.map((r) => `[\`${r.name}\`](${claimUrl(r.name, 'zh-TW')})`).join(' · ') || '暂无。', '');
  lines.push('## 译者榜', '', '<p><img src="../readme-assets/translators.svg" width="640" alt="译者榜" /></p>', '', leaderboardMd(lb),
    '统计 `skills-i18n/` 下每位作者提交过的翻译文件数，不含机器人。用别的名字提交过？把名字加进 [`data/translators.json`](../../data/translators.json)。', '');
  return lines.join('\n');
}

// ── Issues (dry run unless --yes) ───────────────────────────────────────────
function issueBody(r, lang) {
  return [
    `## 翻译 \`${r.name}\` → ${LANG_NAME[lang]}`, '',
    `- 英文原文：${GITHUB}/blob/main/skills/${r.name}/SKILL.md`,
    `- 译文位置：\`skills-i18n/${lang}/${r.name}/SKILL.md\``,
    `- 为什么优先：${r.reasons.join('、') || '欢迎翻译'}`,
    r.zh ? `- 现有中文简介：${r.zh}` : '', '',
    '要求：二级标题数量与英文版一致，`name` 不变，加 `language:` 字段和"英文版本为规范版本"的说明。参考 `skills-i18n/zh/cn-weekly-report/SKILL.md`。',
    '认领：在下面留言"我来"，维护者会把 Issue 分配给你。两周没有进展会重新开放。', '',
    `看板：${GITHUB}/blob/main/docs/zh/translation-board.md`,
  ].filter((l) => l !== null).join('\n');
}

async function createIssues() {
  const limit = Math.max(1, Math.min(50, parseInt(arg('--limit', '10'), 10) || 10));
  const real = has('--yes');
  const gitee = has('--gitee');
  let picks = rank(LANG);
  if (real) {
    // Skip skills that already have an issue (any state) with the same title.
    const existing = JSON.parse(execFileSync('gh', ['issue', 'list', '--repo', REPO, '--label', LABEL, '--state', 'all', '--limit', '1000', '--json', 'title'], { encoding: 'utf8' }));
    const titles = new Set(existing.map((i) => i.title));
    picks = picks.filter((r) => !titles.has(`[翻译] ${r.name} → ${LANG}`));
    execFileSync('gh', ['label', 'create', LABEL, '--repo', REPO, '--color', 'd97757', '--description', '认领一个技能的中文翻译', '--force'], { stdio: 'ignore' });
  }
  picks = picks.slice(0, limit);
  console.log(`${real ? 'Creating' : 'DRY RUN, would create'} ${picks.length} GitHub issue(s)${gitee ? ' and Gitee issue(s)' : ''} for ${LANG}:`);
  for (const r of picks) {
    const title = `[翻译] ${r.name} → ${LANG}`;
    const body = issueBody(r, LANG);
    if (!real) { console.log(`  · ${title}  (score ${r.score}: ${r.reasons.join(', ')})`); continue; }
    const url = execFileSync('gh', ['issue', 'create', '--repo', REPO, '--title', title, '--body', body, '--label', LABEL, '--label', 'translation'], { encoding: 'utf8' }).trim();
    console.log(`  ✓ ${url}`);
    if (gitee) {
      const token = process.env.GITEE_TOKEN || '';
      if (!token) { console.error('  ! GITEE_TOKEN not set, skipping Gitee'); continue; }
      // Gitee API v5: POST /repos/{owner}/issues with repo, title, body, labels (comma-separated).
      const res = await fetch(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/issues`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: token, repo: GITEE_REPO, title, body: `${body}\n\nGitHub: ${url}`, labels: `${LABEL},translation` }),
      });
      console.log(res.ok ? `  ✓ Gitee #${(await res.json()).number}` : `  ! Gitee HTTP ${res.status}`);
    }
  }
  if (!real) console.log('\nNothing was created. Add --yes to create them (needs gh auth; --gitee also needs GITEE_TOKEN).');
}

// ── Main ────────────────────────────────────────────────────────────────────
const lb = leaderboard();
const totals = { zh: done.zh.size, zhTW: done['zh-TW'].size, open: rank('zh').length };
if (has('--create-issues')) {
  await createIssues();
} else if (has('--json')) {
  console.log(JSON.stringify({ lang: LANG, total: skills.length, translated: done[LANG].size, ranked: rank(LANG).map((r) => ({ ...r, priority: priority(r.score) })) }, null, 2));
} else if (has('--leaderboard')) {
  process.stdout.write(leaderboardMd(lb));
} else if (has('--write')) {
  mkdirSync(join(root, 'docs', 'zh'), { recursive: true });
  writeFileSync(join(root, 'docs', 'zh', 'translation-board.md'), boardMd(lb));
  writeFileSync(join(root, 'docs', 'readme-assets', 'translators.svg'), leaderboardSvg(lb, totals));
  console.log(`Wrote docs/zh/translation-board.md (${totals.open} untranslated for zh) and docs/readme-assets/translators.svg (${lb.length} translator(s)).`);
} else {
  const r = rank(LANG);
  console.log(`${LANG}: ${done[LANG].size} translated, ${r.length} to go. Top 20:`);
  for (const x of r.slice(0, 20)) console.log(`  ${priority(x.score)} ${String(x.score).padStart(3)}  ${x.name}  (${x.reasons.join(', ')})`);
  console.log('\nTranslators:'); process.stdout.write(leaderboardMd(lb));
}
