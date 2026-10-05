#!/usr/bin/env node
// Policy freshness reminders for the China skills.
//
// Reads data/cn-policy-calendar.json and lists the rule changes due for review
// this month (Beijing time). With --open-issues it opens one GitHub issue per
// due entry, labelled policy-review, unless an issue with the same title is
// already open or was closed this year. Needs GITHUB_TOKEN and GITHUB_REPOSITORY.
//
//   node scripts/policy-reminders.mjs                    # what is due this month
//   node scripts/policy-reminders.mjs --month 7          # any month
//   node scripts/policy-reminders.mjs --all              # the whole calendar
//   node scripts/policy-reminders.mjs --open-issues      # used by .github/workflows/policy-reminders.yml
//   node scripts/policy-reminders.mjs --check            # validate the data file (skills exist, months valid)
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/policy-reminders.mjs [--month 1-12] [--all] [--open-issues] [--check]');
  process.exit(0);
}
const mi = argv.indexOf('--month');
const now = new Date(Date.now() + 8 * 3600e3);
const month = mi !== -1 ? Number(argv[mi + 1]) : now.getUTCMonth() + 1;
const year = now.getUTCFullYear();
if (!Number.isInteger(month) || month < 1 || month > 12) { console.error('--month must be 1 to 12'); process.exit(2); }
const { entries = [] } = JSON.parse(readFileSync(join(root, 'data', 'cn-policy-calendar.json'), 'utf8'));

if (argv.includes('--check')) {
  const bad = [];
  for (const e of entries) {
    if (!e.id || !e.name || !e.what) bad.push(`${e.id || '?'}: needs id, name and what`);
    if (!Array.isArray(e.review) || !e.review.length || e.review.some((m) => !Number.isInteger(m) || m < 1 || m > 12)) bad.push(`${e.id}: review must be a list of months 1-12`);
    for (const s of e.skills || []) if (!existsSync(join(root, 'skills', s, 'SKILL.md'))) bad.push(`${e.id}: skill ${s} does not exist`);
  }
  if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
  console.log(`Policy calendar: ${entries.length} entries, all skills exist. ✓`);
  process.exit(0);
}

const due = argv.includes('--all') ? entries : entries.filter((e) => (e.review || []).includes(month));
const titleOf = (e) => `[政策复核] ${e.name}（${year} 年 ${month} 月）`;
const bodyOf = (e) => `${e.what}

**需要复核的技能**
${e.skills.map((s) => `- [ ] [\`${s}\`](skills/${s}/SKILL.md)${existsSync(join(root, 'skills-i18n', 'zh', s, 'SKILL.md')) ? `（中文版：[skills-i18n/zh/${s}](skills-i18n/zh/${s}/SKILL.md)）` : ''}`).join('\n')}

**官方来源**：${e.source}

核对当年的数字和规则，有变化就修改技能（英文版为规范版本，中文版同步），在 PR 里写明来源和生效日期；没有变化就在这里说明并关闭。

<sub>由 \`scripts/policy-reminders.mjs\` 按 \`data/cn-policy-calendar.json\` 自动创建（条目 \`${e.id}\`）。</sub>`;

if (!argv.includes('--open-issues')) {
  console.log(due.length ? `Due for review in month ${month}:` : `Nothing due for review in month ${month}.`);
  for (const e of due) console.log(`- ${e.name} (${e.id}): ${e.skills.join(', ')}`);
  process.exit(0);
}

const token = process.env.GITHUB_TOKEN, repo = process.env.GITHUB_REPOSITORY;
if (!token || !repo) { console.error('--open-issues needs GITHUB_TOKEN and GITHUB_REPOSITORY'); process.exit(1); }
const api = async (path, opts = {}) => {
  const r = await fetch(`https://api.github.com/repos/${repo}${path}`, { ...opts, headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'content-type': 'application/json', 'user-agent': 'pm-skills-policy-reminders' } });
  if (!r.ok && r.status !== 422) throw new Error(`${opts.method || 'GET'} ${path}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};
await api('/labels', { method: 'POST', body: JSON.stringify({ name: 'policy-review', color: 'd93f0b', description: 'A yearly rule change the China skills depend on: check and update' }) }).catch(() => null);
const existing = await api(`/issues?state=all&labels=policy-review&since=${year}-01-01T00:00:00Z&per_page=100`);
const titles = new Set((existing || []).map((i) => i.title));
let opened = 0;
for (const e of due) {
  const title = titleOf(e);
  if (titles.has(title)) { console.log(`exists: ${title}`); continue; }
  const issue = await api('/issues', { method: 'POST', body: JSON.stringify({ title, body: bodyOf(e), labels: ['policy-review'] }) });
  console.log(`opened #${issue.number}: ${title}`); opened++;
}
console.log(`${opened} issue(s) opened, ${due.length - opened} already there.`);
