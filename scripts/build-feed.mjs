#!/usr/bin/env node
// Build an Atom feed of the newest skills + a public newsletter archive — so
// people can follow new skills WITHOUT email (any RSS reader) and read past
// announcements at a permalink.
//
// Outputs (all served on GitHub Pages under /pm-claude-skills/):
//   web/feed.xml               Atom feed of the most-recently-updated skills
//   web/newsletters/<tag>.html copies of each announcement email
//   web/newsletters/index.html a simple archive page listing them
//   web/newsletters/index.json machine-readable archive index
//
//   node scripts/build-feed.mjs
// No dependencies.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const BRAND = '#d9605a';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Atom feed of newest skills ───────────────────────────────────────────────
const skills = JSON.parse(readFileSync(join(root, 'web/skills.json'), 'utf8')).skills || [];
const dated = skills
  .map((s) => ({ ...s, _d: s.updated || '2025-01-01' }))
  .sort((a, b) => (a._d < b._d ? 1 : a._d > b._d ? -1 : a.name < b.name ? -1 : 1));
const recent = dated.slice(0, 50);
const feedUpdated = (recent[0]?._d || '2025-01-01') + 'T00:00:00Z';

const entries = recent.map((s) => {
  const link = `${REPO}/blob/main/skills/${s.name}/SKILL.md`;
  const summary = s.summary || s.description || '';
  return `  <entry>
    <title>${esc(s.title || s.name)}</title>
    <link href="${link}"/>
    <id>tag:pm-claude-skills,${s.name}</id>
    <updated>${s._d}T00:00:00Z</updated>
    <category term="${esc(s.plugin || 'skill')}"/>
    <summary>${esc(summary)}</summary>
  </entry>`;
}).join('\n');

const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>PM Skills — new Agent Skills</title>
  <subtitle>New professional Agent Skills as they land. Follow without email.</subtitle>
  <link href="${SITE}/feed.xml" rel="self"/>
  <link href="${SITE}/"/>
  <id>${SITE}/feed.xml</id>
  <updated>${feedUpdated}</updated>
  <author><name>PM Skills</name></author>
${entries}
</feed>
`;
writeFileSync(join(root, 'web/feed.xml'), feed);

// ── Newsletter archive ───────────────────────────────────────────────────────
const nlSrc = join(root, 'newsletters');
const nlOut = join(root, 'web/newsletters');
mkdirSync(nlOut, { recursive: true });

const issues = existsSync(nlSrc)
  ? readdirSync(nlSrc).filter((f) => f.endsWith('.html')).sort().reverse()
  : [];

const index = [];
for (const f of issues) {
  copyFileSync(join(nlSrc, f), join(nlOut, f));
  const tag = f.replace(/\.html$/, '');
  // Pull the <h1> as a human title, if present.
  const html = readFileSync(join(nlSrc, f), 'utf8');
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = (m ? m[1].replace(/<[^>]+>/g, '').trim() : tag) || tag;
  index.push({ tag, title, href: `${f}` });
}
writeFileSync(join(nlOut, 'index.json'), JSON.stringify({ count: index.length, issues: index }, null, 2));

const rows = index.length
  ? index.map((i) => `      <li><a href="${esc(i.href)}">${esc(i.title)}</a> <span class="tag">${esc(i.tag)}</span></li>`).join('\n')
  : '      <li class="empty">No issues published yet — subscribe to get the first one.</li>';

const archive = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>PM Skills — newsletter archive</title>
<link rel="alternate" type="application/atom+xml" title="PM Skills — new skills" href="${SITE}/feed.xml">
<style>
  :root{color-scheme:light dark}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:680px;margin:0 auto;padding:48px 20px;line-height:1.6;color:#1a1a1a;background:#faf8f6}
  @media (prefers-color-scheme:dark){body{color:#eee;background:#151317}a{color:#f0938c}.tag{color:#888}}
  h1{font-size:26px;margin:0 0 6px}
  .sub{color:#888;margin:0 0 28px}
  a{color:${BRAND};font-weight:600;text-decoration:none}
  a:hover{text-decoration:underline}
  ul{list-style:none;padding:0}
  li{padding:14px 0;border-bottom:1px solid rgba(128,128,128,.2)}
  .tag{font-size:12px;color:#aaa;margin-left:8px}
  .empty{color:#999}
  .cta{display:inline-block;margin-top:28px;background:${BRAND};color:#fff;padding:12px 22px;border-radius:10px;font-weight:700}
  .feed{display:block;margin-top:18px;font-size:14px}
</style></head>
<body>
  <h1>📬 Newsletter archive</h1>
  <p class="sub">Every "new skills" announcement, in one place.</p>
  <ul>
${rows}
  </ul>
  <a class="feed" href="${SITE}/feed.xml">🛰️ Prefer RSS? Follow new skills via the Atom feed — no email needed.</a>
  <a class="cta" href="https://site-jet-seven-34.vercel.app/#subscribe">Subscribe by email</a>
</body></html>
`;
writeFileSync(join(nlOut, 'index.html'), archive);

process.stderr.write(`✓ web/feed.xml (${recent.length} skills) · web/newsletters/ (${index.length} issue(s))\n`);
