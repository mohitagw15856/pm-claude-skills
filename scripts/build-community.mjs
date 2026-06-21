#!/usr/bin/env node
// Generates web/community.html — the Skills Hub landing: a live pulse of the project
// (recent activity, contributor wall, skill of the week) + prominent links into the
// GitHub Discussions hub. Data is pulled from the GitHub API at build time; uses
// GITHUB_TOKEN if present (higher rate limit) and degrades gracefully if a call fails.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'mohitagw15856/pm-claude-skills';
const BASE = 'https://mohitagw15856.github.io/pm-claude-skills';
const token = process.env.GITHUB_TOKEN || '';
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function gh(path) {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: { accept: 'application/vnd.github+json', 'user-agent': 'pm-skills-build', ...(token ? { authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

const ago = (iso) => {
  const d = (Date.now() - new Date(iso)) / 86400000;
  if (d < 1) return 'today'; if (d < 2) return 'yesterday';
  if (d < 14) return `${Math.floor(d)}d ago`; return `${Math.floor(d / 7)}w ago`;
};

const [repo, contributors, commits, releases] = await Promise.all([
  gh(`/repos/${REPO}`),
  gh(`/repos/${REPO}/contributors?per_page=30`),
  gh(`/repos/${REPO}/commits?per_page=15`),
  gh(`/repos/${REPO}/releases?per_page=3`),
]);

const sotw = existsSync(join(root, 'web', 'skill-of-the-week.json'))
  ? JSON.parse(readFileSync(join(root, 'web', 'skill-of-the-week.json'), 'utf8')) : null;

const stars = repo?.stargazers_count ?? '—';
const forks = repo?.forks_count ?? '—';

const contribHtml = (contributors || []).filter((c) => c.type === 'User').slice(0, 24).map((c) =>
  `<a class="contrib" href="${c.html_url}" title="${esc(c.login)} · ${c.contributions} contributions"><img src="${c.avatar_url}&s=80" alt="${esc(c.login)}" loading="lazy" /></a>`
).join('') || '<span class="muted">Be the first — open a PR!</span>';

const feed = [];
for (const r of (releases || []).slice(0, 2)) feed.push({ icon: '🏷️', text: `Released <strong>${esc(r.tag_name)}</strong> — ${esc(r.name || '')}`, when: r.published_at, url: r.html_url });
for (const c of (commits || []).slice(0, 12)) {
  const msg = esc((c.commit?.message || '').split('\n')[0]).slice(0, 90);
  feed.push({ icon: '✏️', text: `${msg} <span class="muted">— ${esc(c.author?.login || c.commit?.author?.name || '')}</span>`, when: c.commit?.author?.date, url: c.html_url });
}
feed.sort((a, b) => new Date(b.when) - new Date(a.when));
const feedHtml = feed.slice(0, 14).map((f) =>
  `<li><span class="fi">${f.icon}</span> <a href="${f.url}">${f.text}</a> <span class="when">${f.when ? ago(f.when) : ''}</span></li>`
).join('');

// Sponsors (from sponsors.json) — tiers + wall.
const sp = existsSync(join(root, 'sponsors.json')) ? JSON.parse(readFileSync(join(root, 'sponsors.json'), 'utf8')) : { tiers: [], sponsors: [], sponsorUrl: '#' };
const tierHtml = (sp.tiers || []).map((t) =>
  `<div class="tier"><div class="tname">${esc(t.name)}</div><div class="tprice">${esc(t.price)}</div><ul>${(t.perks || []).map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>`
).join('');
const wallHtml = (sp.sponsors && sp.sponsors.length)
  ? sp.sponsors.map((s) => `<a class="sponsor" href="${esc(s.url || '#')}" title="${esc(s.name)}">${s.logo ? `<img src="${esc(s.logo)}" alt="${esc(s.name)}" />` : esc(s.name)}</a>`).join('')
  : `<span class="muted">No sponsors yet — <a href="${esc(sp.sponsorUrl)}">be the first</a> and your logo lands here, in the README, and on every skill page.</span>`;


const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="google-site-verification" content="osZgdSLYnqidzCKt4CxjqAxo44OqGvlKi-Bmg0UmxFQ" />
<title>Community Hub — PM Skills</title>
<meta name="description" content="The PM Skills community hub: recent activity, contributors, skill of the week, and the discussions where people share outputs, recipes, and requests." />
<link rel="stylesheet" href="styles.css" />
<style>
  .hub { max-width: 1000px; margin: 0 auto; padding: 16px 22px 70px; }
  .stats { display: flex; gap: 22px; margin: 6px 0 18px; }
  .stat b { font-size: 22px; } .stat span { color: var(--muted); font-size: 13px; }
  .grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; } @media(max-width:760px){.grid{grid-template-columns:1fr;}}
  .card { border: 1px solid var(--border); border-radius: 12px; background: var(--panel); padding: 14px 16px; }
  .card h2 { font-size: 16px; margin: 0 0 10px; }
  .feed { list-style: none; margin: 0; padding: 0; } .feed li { padding: 7px 0; border-bottom: 1px solid var(--border); font-size: 13.5px; }
  .feed .fi { margin-right: 6px; } .feed .when { color: var(--muted); font-size: 12px; float: right; }
  .contribs { display: flex; flex-wrap: wrap; gap: 6px; } .contrib img { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border); }
  .hub-cta { display: flex; gap: 10px; flex-wrap: wrap; margin: 8px 0 18px; }
  .btn { padding: 10px 15px; border-radius: 9px; font-weight: 600; font-size: 14px; text-decoration: none; }
  .btn-primary { background: var(--accent); color: #0f1115; } .btn-ghost { background: var(--panel-2); border: 1px solid var(--border); color: var(--text); }
  .sotw { font-size: 14px; } .sotw a { font-weight: 600; }
</style>
</head>
<body>
<header class="topbar">
  <div class="brand"><img src="assets/product-notes.jpg" alt="Product Notes" class="brand-logo" />
    <div class="brand-text"><h1>Community Hub</h1><p class="tagline">Share what you built. Swap recipes. Shape the library.</p></div></div>
</header>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<script src="nav.js"></script>
<div class="hub">
  <div class="stats">
    <div class="stat"><b>⭐ ${stars}</b><br><span>stars</span></div>
    <div class="stat"><b>🍴 ${forks}</b><br><span>forks</span></div>
    <div class="stat"><b>180</b><br><span>skills</span></div>
  </div>

  <div class="hub-cta">
    <a class="btn btn-primary" href="${'https://github.com/' + REPO}/discussions">💬 Join the discussions</a>
    <a class="btn btn-ghost" href="${'https://github.com/' + REPO}/discussions/new?category=show-and-tell">📣 Show & Tell what you built</a>
    <a class="btn btn-ghost" href="${'https://github.com/' + REPO}/discussions/new?category=recipes">🧩 Share a recipe</a>
    <a class="btn btn-ghost" href="${'https://github.com/' + REPO}/issues/new?template=submit-skill.yml">🧠 Submit a skill</a>
  </div>

  ${sotw ? `<div class="card sotw" style="margin-bottom:18px">🛠️ <strong>Skill of the week:</strong> <a href="${BASE}/skill/${sotw.skill}.html">${esc(sotw.title)}</a> — ${esc(sotw.summary || '')}</div>` : ''}

  <div class="grid">
    <div class="card">
      <h2>📡 Recent activity</h2>
      <ul class="feed">${feedHtml || '<li class="muted">Activity will appear here.</li>'}</ul>
    </div>
    <div class="card">
      <h2>👥 Contributors</h2>
      <div class="contribs">${contribHtml}</div>
      <p style="margin-top:12px"><a href="https://github.com/${REPO}/blob/main/CONTRIBUTING.md">Add yourself → contribute a skill</a></p>
    </div>
  </div>

  <div class="card" style="margin-top:20px">
    <h2>❤️ Sponsors</h2>
    <p class="muted" style="margin-top:0">Keep this free, independent, and ad-free — and get your logo in front of everyone who uses it.</p>
    <div class="wall">${wallHtml}</div>
    <div class="tiers">${tierHtml}</div>
    <div class="hub-cta" style="margin-top:14px">
      <a class="btn btn-primary" href="${esc(sp.sponsorUrl)}">💖 Become a sponsor</a>
      <a class="btn btn-ghost" href="${esc(sp.coffeeUrl || sp.sponsorUrl)}">☕ Buy me a coffee</a>
    </div>
  </div>
</div>
<style>
  .wall{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:6px 0 16px}
  .wall .sponsor img{height:42px;border-radius:8px}
  .tiers{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}
  .tier{border:1px solid var(--border);border-radius:10px;padding:12px 14px;background:var(--panel-2)}
  .tname{font-weight:700} .tprice{color:var(--accent-2);font-size:13px;margin-bottom:6px}
  .tier ul{margin:0;padding-left:18px;font-size:12.5px;color:var(--muted)} .tier li{margin:3px 0}
</style>
</body>
</html>`;

writeFileSync(join(root, 'web', 'community.html'), html);
console.log(`Wrote web/community.html — ${(contributors || []).length} contributors, ${feed.length} activity items${token ? '' : ' (unauthenticated — limited API)'}.`);
