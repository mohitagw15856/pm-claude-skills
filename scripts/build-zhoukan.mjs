#!/usr/bin/env node
// PM Skills 周刊: an auto-drafted weekly roundup in Chinese, ready to paste into
// a WeChat official account, Gitee or a group chat. Covers the last seven days:
// merged changes, new skills and new Chinese translations, the skill of the week,
// the Chinese benchmark, and what is coming up (exams, the next solar term).
//
// History comes from the GitHub API (compare and commits) so it works in a
// shallow CI checkout; locally it falls back to git log.
//
//   node scripts/build-zhoukan.mjs [--date YYYY-MM-DD] [--out web/live] [--offline]
//   → <out>/zhoukan.md and <out>/zhoukan.html
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { beijingToday, pickSkillOfTheDay, localSkill } from '../bin/today.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/build-zhoukan.mjs [--date YYYY-MM-DD] [--out web/live] [--offline]');
  process.exit(0);
}
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 && argv[i + 1] ? argv[i + 1] : d; };
const DATE = opt('date', beijingToday());
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE)) { console.error('--date must be YYYY-MM-DD'); process.exit(2); }
const OUT = resolve(root, opt('out', 'web/live'));
const OFFLINE = argv.includes('--offline');
const REPO = 'mohitagw15856/pm-claude-skills';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const D = (s) => new Date(`${s}T00:00:00Z`);
const addDays = (s, n) => new Date(D(s).getTime() + n * 864e5).toISOString().slice(0, 10);
const zhDate = (s) => `${+s.slice(5, 7)}月${+s.slice(8, 10)}日`;
const FROM = addDays(DATE, -7);
const readJSON = (p, d) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return d; } };
const catalogue = (readJSON(join(root, 'web', 'skills.json'), { skills: [] }).skills || []).filter((s) => !s.deprecated);
const byName = new Map(catalogue.map((s) => [s.name, s]));

async function gh(path) {
  if (OFFLINE) return null;
  const headers = { 'user-agent': 'pm-skills-zhoukan', accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
  try { const r = await fetch(`https://api.github.com/repos/${REPO}${path}`, { headers, signal: AbortSignal.timeout(15000) }); return r.ok ? r.json() : null; } catch { return null; }
}
const git = (args) => { try { return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };

// Merged changes and added files in the window.
let subjects = [], added = [];
const commits = await gh(`/commits?sha=main&since=${FROM}T16:00:00Z&until=${DATE}T16:00:00Z&per_page=100`);
if (Array.isArray(commits) && commits.length) {
  subjects = commits.map((c) => c.commit.message.split('\n')[0]);
  // Folder listings at the start of the window, compared with today's (compare caps at 300 files).
  const base = commits[commits.length - 1].parents?.[0]?.sha;
  const dirAt = async (sha, path) => {
    let tree = await gh(`/git/trees/${sha}`);
    for (const part of path.split('/')) {
      const e = (tree?.tree || []).find((x) => x.path === part && x.type === 'tree');
      if (!e) return null;
      tree = await gh(`/git/trees/${e.sha}`);
    }
    return new Set((tree?.tree || []).filter((x) => x.type === 'tree').map((x) => x.path));
  };
  const listNow = (path) => { try { return readdirSync(join(root, path)).filter((n) => existsSync(join(root, path, n, 'SKILL.md'))); } catch { return []; } };
  if (base) {
    for (const path of ['skills', 'skills-i18n/zh']) {
      const before = await dirAt(base, path);
      if (before) for (const n of listNow(path)) if (!before.has(n)) added.push(`${path}/${n}/SKILL.md`);
    }
  }
} else {
  subjects = git(['log', '--since', `${FROM} 00:00 +0800`, '--until', `${DATE} 00:00 +0800`, '--format=%s', 'origin/main']).split('\n').filter(Boolean);
  added = git(['log', '--since', `${FROM} 00:00 +0800`, '--until', `${DATE} 00:00 +0800`, '--diff-filter=A', '--name-only', '--format=', 'origin/main']).split('\n').filter(Boolean);
}
const merged = subjects.filter((s) => !/^(wip|chore|Merge)\b/i.test(s)).map((s) => s.replace(/\s*\(#\d+\)$/, '')).slice(0, 10);
const newSkills = [...new Set(added.map((f) => (f.match(/^skills\/([^/]+)\/SKILL\.md$/) || [])[1]).filter(Boolean))].filter((n) => byName.has(n));
const newZh = [...new Set(added.map((f) => (f.match(/^skills-i18n\/zh\/([^/]+)\/SKILL\.md$/) || [])[1]).filter(Boolean))];

const week = pickSkillOfTheDay({ root, date: DATE, catalogue }).zh;
const live = readJSON(join(OUT, 'index.json'), null);
const exams = (live?.exams || []).filter((x) => x.left > 0 && x.left <= 60).sort((a, b) => a.left - b.left);
const term = live?.season?.term;
const bench = readJSON(join(root, 'web', 'modelbench-zh.json'), { models: [] });
const zhName = (n) => (localSkill(root, 'zh', n)?.title || byName.get(n)?.title || n).replace(/技能$/, '');

const md = `# PM Skills 周刊 · ${zhDate(FROM)} 至 ${zhDate(addDays(DATE, -1))}

> 开源专业技能库 PM Skills 的一周动态。${catalogue.length.toLocaleString('en-GB')} 个技能，用中文说需求就能用。本稿由脚本自动生成，发布前请人工通读一遍。

## 本周更新
${merged.length ? merged.map((s) => `- ${s}`).join('\n') : '- 本周没有合并新的改动。'}

## 新技能
${newSkills.length ? `本周新增 ${newSkills.length} 个技能${newSkills.length > 12 ? '，挑 12 个列在这里' : ''}：\n\n` + newSkills.slice(0, 12).map((n) => `- **${zhName(n)}**（\`${n}\`）：${(byName.get(n).descriptionZh || byName.get(n).summary || '').split('。')[0]}`).join('\n') : '- 本周没有新增技能。'}

## 新的中文译文
${newZh.length ? `本周新增 ${newZh.length} 篇中文译文${newZh.length > 20 ? '，节选 20 篇' : ''}：\n\n` + newZh.slice(0, 20).map((n) => `- ${zhName(n)}（\`${n}\`）`).join('\n') : '- 本周没有新增中文译文。欢迎认领翻译：https://github.com/mohitagw15856/pm-claude-skills/issues?q=label%3A%22good+first+translation%22'}

## 本周推荐
${week ? `**${week.title.replace(/技能$/, '')}**：${week.summary}\n\n试着说：「${week.prompt}」 → ${SITE}/zh/${week.name}.html` : '（暂无）'}

## 中文模型评测
${bench.models?.length ? bench.models.slice(0, 5).map((m) => `- ${m.model}：加载技能 ${m.score}，不加载 ${m.bare}，增益 ${(m.score - m.bare).toFixed(2)}`).join('\n') : '- 中文任务集的第一轮评测还在进行中，结果出来后会在这里更新。'}

## 接下来
${[...exams.map((x) => `- ${x.label}：还有 ${x.left} 天（${zhDate(x.date)}${x.confirmed ? '' : '，预计'}），备考技能 \`${x.skill}\``), term ? `- 节气：当前是${term.name}` : ''].filter(Boolean).join('\n') || '- 近期没有考试节点。'}

---

安装（国内镜像）：\`npx --registry=https://registry.npmmirror.com pm-claude-skills add\`
源码：https://gitee.com/mohitagw/pm-claude-skills · 中文技能目录：${SITE}/zh/
`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PM Skills 周刊 · ${zhDate(FROM)} 至 ${zhDate(addDays(DATE, -1))}</title>
<meta name="robots" content="noindex" />
<style>body{margin:0;font-family:'PingFang SC','Noto Sans CJK SC','Microsoft YaHei',sans-serif;background:#f7f4ee;color:#1f2328;line-height:1.8}main{max-width:720px;margin:0 auto;padding:24px 22px 60px}pre{white-space:pre-wrap;background:#fff;border:1px solid #e3ddd2;border-radius:12px;padding:16px 18px;font-family:inherit;font-size:15px}button{border:1px solid #c46f1f;background:#c46f1f;color:#fff;border-radius:10px;padding:9px 16px;font-size:14px;cursor:pointer}</style>
</head>
<body>
<main>
<h1 style="font-size:22px">PM Skills 周刊草稿</h1>
<p>下面是 Markdown 原文，复制后粘贴到公众号编辑器或 Gitee 即可。<button type="button" id="copy">复制全文</button></p>
<pre id="md">${esc(md)}</pre>
</main>
<script>document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('md').textContent).then(()=>{document.getElementById('copy').textContent='已复制 ✓'});</script>
</body>
</html>
`;
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'zhoukan.md'), md);
writeFileSync(join(OUT, 'zhoukan.html'), html);
console.log(`Wrote zhoukan.md and zhoukan.html for ${FROM} to ${DATE}: ${merged.length} change(s), ${newSkills.length} new skill(s), ${newZh.length} new translation(s).`);
