#!/usr/bin/env node
// The Wall of Wins — renders web/wins.html from GitHub issues labeled
// `roi-story` (the intake form is .github/ISSUE_TEMPLATE/roi-story.yml).
// Users file the story once; this turns them into the social-proof page.
//
//   node scripts/build-wins.mjs            # fetches open+closed roi-story issues
//   GITHUB_TOKEN=… node scripts/build-wins.mjs   # higher rate limit in CI
//
// Honest by construction: only real issues render, each card links back to its
// issue, and an empty wall says so instead of faking momentum.
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { savingsSummary, formatMoney } from './lib/savings.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'mohitagw15856/pm-claude-skills';

const headers = { 'user-agent': 'pm-skills-wins', accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
const res = await fetch(`https://api.github.com/repos/${REPO}/issues?labels=roi-story&state=all&per_page=100`, { headers });
if (!res.ok) { console.error(`GitHub API ${res.status} — leaving existing wins.html untouched.`); process.exit(0); }
const issues = (await res.json()).filter((i) => !i.pull_request);

// Issue-form bodies render fields as "### <Label>\n\n<value>" — parse them back.
const field = (body, label) => {
  const m = (body || '').match(new RegExp(`###\\s*${label}[^\\n]*\\n+([\\s\\S]*?)(?=\\n###\\s|$)`, 'i'));
  return m ? m[1].trim().replace(/^_No response_$/i, '') : '';
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const stories = issues.map((i) => ({
  role: field(i.body, 'Your role'), skills: field(i.body, 'Which skill'),
  story: field(i.body, 'What happened') || field(i.body, 'Before'), saved: field(i.body, 'saved') || field(i.body, 'After'),
  user: i.user?.login, url: i.html_url, date: (i.created_at || '').slice(0, 10),
})).filter((s) => s.story || s.saved);

const cards = stories.map((s) => `
  <div class="win">
    <div class="w-story">${esc((s.story || s.saved).slice(0, 400))}</div>
    ${s.saved && s.story ? `<div class="w-saved">💰 ${esc(s.saved.slice(0, 140))}</div>` : ''}
    <div class="w-meta">${esc(s.role || 'anonymous')}${s.skills ? ` · <code>${esc(s.skills)}</code>` : ''} · <a href="${esc(s.url)}">@${esc(s.user)}</a> · ${esc(s.date)}</div>
  </div>`).join('\n');

const empty = `
  <div class="win" style="text-align:center">
    <div class="w-story">No stories on the wall yet — the form below takes two minutes, and the first stories set the tone for everyone after.</div>
  </div>`;

// The counter: accepted stories only (a maintainer labels them roi-accepted).
const S = savingsSummary();
const counter = `
<div class="counter">
  <div><b>${S.hours.toLocaleString('en-GB')}</b><span>hours saved, as reported</span></div>
  <div><b>${S.money && Object.keys(S.money).length ? esc(formatMoney(S.money)) : '0'}</b><span>money not spent, as reported</span></div>
  <div><b>${S.stories}</b><span>accepted stories</span></div>
</div>
<p class="c-note">The counter adds up only what users reported in accepted stories: hours per use times uses, and money they actually did not spend. Hours are never turned into money, and currencies are never converted. Data: <a href="https://github.com/${REPO}/blob/main/data/savings.json">data/savings.json</a>.</p>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="google-site-verification" content="osZgdSLYnqidzCKt4CxjqAxo44OqGvlKi-Bmg0UmxFQ" />
<title>The Wall of Wins — real savings from real users | PM Skills</title>
<meta name="description" content="Real stories from PM Skills users: money saved, mistakes caught, hours returned — each linked to its source. Add yours in two minutes." />
<link rel="stylesheet" href="styles.css" />
<style>
  .ww { max-width: 760px; margin: 0 auto; padding: 16px 22px 70px; }
  .win { border: 1px solid var(--border); border-left: 4px solid #3fb950; border-radius: 12px; background: var(--panel); padding: 16px 18px; margin: 12px 0; }
  .w-story { font-size: 15px; line-height: 1.55; }
  .w-saved { color: #3fb950; font-weight: 600; margin-top: 8px; font-size: 14px; }
  .w-meta { color: var(--muted); font-size: 12px; margin-top: 10px; }
  .counter { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin: 16px 0 6px; }
  .counter div { border: 1px solid var(--border); border-radius: 12px; background: var(--panel); padding: 12px 14px; }
  .counter b { display: block; font-size: 26px; color: #3fb950; overflow-wrap: anywhere; }
  .counter span { color: var(--muted); font-size: 13px; }
  .c-note { color: var(--muted); font-size: 13px; line-height: 1.5; }
  .cta { display: inline-block; background: var(--accent); color: #fff; border-radius: 10px; padding: 10px 16px; text-decoration: none; margin-top: 10px; }
</style>
</head>
<body>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<div class="ww">
<h1>📈 The Wall of Wins</h1>
<p style="color:var(--muted)">Every card is a real user's filed story, linked to its source — ${stories.length} so far. Generated from <code>roi-story</code> issues; nothing here is invented.</p>
${counter}
${stories.length ? cards : empty}
<p><a class="cta" href="https://github.com/${REPO}/issues/new?template=roi-story.yml">➕ Add your win (2 minutes)</a></p>
</div>
<script src="nav.js"></script>
</body>
</html>
`;
writeFileSync(join(root, 'web', 'wins.html'), html);
console.log(`wins: wrote web/wins.html with ${stories.length} story(ies) from ${issues.length} roi-story issue(s)`);
