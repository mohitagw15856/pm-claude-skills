#!/usr/bin/env node
// The Skill Cup's monthly turn and its public record (SKILL-CUP.md).
//
//   node scripts/close-skill-cup.mjs            # close a finished cup, open the next, write SKILL-CUP.md
//   node scripts/close-skill-cup.mjs --check    # fail if SKILL-CUP.md is stale or the data is malformed
//
// A cup closes the day after its `closes` date: the top score wins (ties go to
// the earlier PR), the next theme comes off the front of the queue, and the new
// cup runs to the end of the month. Free: no model calls.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUAGE_NAMES } from './lib/skill-language.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'data', 'skill-cup.json');
const MD = join(root, 'SKILL-CUP.md');
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const d = JSON.parse(readFileSync(FILE, 'utf8'));
// Funded prizes (config/cup-prizes.json), shown with the month they belong to.
const PRIZES = existsSync(join(root, 'config', 'cup-prizes.json')) ? JSON.parse(readFileSync(join(root, 'config', 'cup-prizes.json'), 'utf8')).prizes || [] : [];
const prizeLine = (month) => PRIZES.filter((p) => p.month === month).map((p) => `${p.currency === 'USD' ? '$' : ''}${p.amount}${p.currency && p.currency !== 'USD' ? ' ' + p.currency : ''} for the ${p.track && p.track !== 'overall' ? (LANGUAGE_NAMES[p.track] || p.track) + ' track' : 'winner'}${p.sponsor ? `, sponsored by ${p.sponsorUrl ? `[${p.sponsor}](${p.sponsorUrl})` : p.sponsor}` : ''}`).join('; ');
const check = process.argv.includes('--check');
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const problems = d.cups.flatMap((c, i) => [
  !/^\d{4}-\d{2}$/.test(c.month || '') && `cup ${i}: bad month`,
  (!DATE.test(c.opens || '') || !DATE.test(c.closes || '') || c.opens > c.closes) && `cup ${i}: bad window`,
  !Array.isArray(c.entries) && `cup ${i}: entries must be a list`,
  ...(c.entries || []).map((e, j) => (!Number.isInteger(e.pr) || typeof e.score !== 'number' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.skill || '')) && `cup ${i} entry ${j}: malformed`),
].filter(Boolean));

// Community requests (open issues labelled skill-request, ranked by 👍) are
// always on-theme, and a request with REQUEST_THEME_VOTES or more becomes the
// next month's theme. Fetched only when writing, so --check stays offline.
const REQUEST_THEME_VOTES = 3;
async function fetchRequests() {
  const headers = { 'user-agent': 'pm-skills-cup', accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
  const r = await fetch('https://api.github.com/repos/mohitagw15856/pm-claude-skills/issues?labels=skill-request&state=open&per_page=50', { headers }).catch(() => null);
  if (!r || !r.ok) return null;
  return (await r.json()).filter((i) => !i.pull_request)
    .map((i) => ({ number: i.number, title: String(i.title).replace(/^\[[^\]]*\]\s*/, '').slice(0, 100), votes: (i.reactions && i.reactions['+1']) || 0 }))
    .sort((a, b) => b.votes - a.votes || a.number - b.number).slice(0, 10);
}

let changed = false;
if (!check) {
  const reqs = await fetchRequests();
  if (reqs && JSON.stringify(reqs) !== JSON.stringify(d.requests || [])) { d.requests = reqs; changed = true; }
  const today = new Date().toISOString().slice(0, 10);
  let open = d.cups[d.cups.length - 1];
  while (open && !open.winner && open.closes < today) {
    const top = [...open.entries].sort((a, b) => b.score - a.score || a.pr - b.pr)[0];
    open.winner = top ? { pr: top.pr, author: top.author, skill: top.skill, score: top.score } : 'none';
    // Language tracks: entries written in another language also compete with each
    // other, so a strong Hindi or Polish skill wins its track even if English
    // entries outscore it overall.
    const tracks = {};
    for (const e of [...open.entries].sort((a, b) => b.score - a.score || a.pr - b.pr)) if (e.lang && e.lang !== 'en' && !tracks[e.lang]) tracks[e.lang] = { pr: e.pr, author: e.author, skill: e.skill, score: e.score };
    if (Object.keys(tracks).length) open.trackWinners = tracks;
    const used = new Set(d.cups.map((c) => c.request).filter(Boolean));
    const ask = (d.requests || []).find((r) => r.votes >= REQUEST_THEME_VOTES && !used.has(r.number));
    const next = ask
      ? { theme: `Most requested: ${ask.title}`, brief: `The community's most-wanted skill (issue #${ask.number}, ${ask.votes} 👍). Write it well.`, request: ask.number }
      : d.themes.shift() || { theme: 'Open theme', brief: 'Any skill the library does not have yet.' };
    const start = new Date(open.closes + 'T00:00:00Z'); start.setUTCDate(start.getUTCDate() + 1);
    const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0));
    open = { month: start.toISOString().slice(0, 7), theme: next.theme, brief: next.brief, ...(next.request ? { request: next.request } : {}), opens: start.toISOString().slice(0, 10), closes: end.toISOString().slice(0, 10), entries: [], winner: null };
    d.cups.push(open);
    changed = true;
    console.log(`Closed the ${d.cups[d.cups.length - 2].month} Cup; opened ${open.month}: "${open.theme}".`);
  }
  if (changed) writeFileSync(FILE, JSON.stringify(d, null, 2) + '\n');
}

const cur = d.cups[d.cups.length - 1];
const user = (a) => `[@${a}](https://github.com/${a})`;
const md = [
  '# 🏆 The Skill Cup',
  '',
  '<!-- Generated by scripts/close-skill-cup.mjs from data/skill-cup.json; do not edit by hand. -->',
  '',
  'A monthly contest for the best new skill on a theme. Write one skill on the month\'s theme, open a pull request, and it is scored the same way the library scores itself: it must pass SkillSpec L3, then it runs on its own eval cases and a pinned judge scores the output, blind, on a 1–5 rubric. The top score at the end of the month wins a permanent line below, a winner badge on the skill\'s page, and first pick of a future theme. Prizes are funded by sponsors, month by month: [sponsor a Cup](docs/SPONSOR-THE-CUP.md). (The Cup replaces the 2026 Seasons; their record stays in [seasons/HALL.md](seasons/HALL.md).)',
  '',
  `## This month: ${cur.theme} (${cur.opens} → ${cur.closes})`,
  '',
  cur.brief,
  '',
  prizeLine(cur.month) ? `**Prize:** ${prizeLine(cur.month)}.` : '**Prize:** none pledged for this month yet. [Sponsor it](docs/SPONSOR-THE-CUP.md).',
  '',
  '**Any language.** Write the skill in your own language and it competes in that language\'s track as well as overall, judged in that language. A Latin-script language needs `language: <code>` in the frontmatter (for example `language: es`); other scripts are detected.',
  '',
  '**To enter:** add `skills/<your-skill>/SKILL.md` and at least one eval case for it in `evals/cases.json`, in one pull request with `[Cup]` in the title. A maintainer runs the scoring; the result is posted on the PR. Check your skill first with `npx skillspec-check skills/<your-skill>`.',
  '',
  cur.entries.length ? '| Rank | Skill | Language | By | Score | PR |\n|---|---|---|---|---|---|\n' + cur.entries.map((e, i) => `| ${i + 1} | \`${e.skill}\` | ${LANGUAGE_NAMES[e.lang] || 'English'} | ${user(e.author)} | ${e.score.toFixed(2)} | [#${e.pr}](${REPO}/pull/${e.pr}) |`).join('\n') : 'No entries yet. The first one sets the bar.',
  '',
  '## Requested skills (always on-theme)',
  '',
  (d.requests || []).length
    ? 'Any of these counts for the Cup in any month. The [expert-to-skill compiler](https://mohitagw15856.github.io/pm-claude-skills/compile.html) builds one from your answers.\n\n' + d.requests.map((r) => `- [#${r.number}](${REPO}/issues/${r.number}) ${r.title} (${r.votes} 👍) · [start it in the compiler](https://mohitagw15856.github.io/pm-claude-skills/compile.html?title=${encodeURIComponent(r.title)})`).join('\n')
    : `None open. [Request a skill](${REPO}/issues/new?labels=skill-request&title=${encodeURIComponent('[Skill request] ')}); requests with ${REQUEST_THEME_VOTES}+ 👍 become a month's theme.`,
  '',
  '## Winners',
  '',
  'Each winner gets a short announcement video, published to the [media branch](https://github.com/mohitagw15856/pm-claude-skills/tree/media/video/cup) for sharing.',
  '',
  '| Month | Theme | Winner | Skill | Score |',
  '|---|---|---|---|---|',
  ...d.cups.filter((c) => c.winner).flatMap((c) => [c.winner === 'none' ? `| ${c.month} | ${c.theme} | no entries | | |` : `| ${c.month} | ${c.theme} | ${user(c.winner.author)} | \`${c.winner.skill}\` ([#${c.winner.pr}](${REPO}/pull/${c.winner.pr})) | ${c.winner.score.toFixed(2)} |`,
    ...Object.entries(c.trackWinners || {}).map(([l, w]) => `| ${c.month} | ${LANGUAGE_NAMES[l] || l} track | ${user(w.author)} | \`${w.skill}\` ([#${w.pr}](${REPO}/pull/${w.pr})) | ${w.score.toFixed(2)} |`)]),
  '',
  `**Coming up:** ${d.themes.slice(0, 3).map((t) => t.theme).join(' · ') || 'open themes'}.`,
  '',
].join('\n');

if (check) {
  if (problems.length) { console.error(`Skill Cup data: ${problems.join('; ')}`); process.exit(1); }
  if (!existsSync(MD) || readFileSync(MD, 'utf8') !== md) { console.error('SKILL-CUP.md is out of date. Run node scripts/close-skill-cup.mjs'); process.exit(1); }
  console.log(`Skill Cup up to date: ${cur.month} "${cur.theme}", ${cur.entries.length} entr${cur.entries.length === 1 ? 'y' : 'ies'}. ✓`);
  process.exit(0);
}
writeFileSync(MD, md);
console.log(`Wrote SKILL-CUP.md (${cur.month}: "${cur.theme}", ${cur.entries.length} entries).`);
