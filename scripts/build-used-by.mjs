#!/usr/bin/env node
// "Used by": public places that reference PM Skills, found through GitHub search,
// so adoption shows without any telemetry. Three kinds, kept apart honestly:
//   listed in   awesome lists and directories whose README links the repo
//   vendored    repos that copy the skills or the package into their own tree
//   mentions    other files that name the repo
// Built at deploy into web/used-by.html (+ used-by.json). Needs a token for code
// search; the Actions GITHUB_TOKEN may not be allowed to search code, in which
// case the page shows the repository search alone and says so.
//
//   GITHUB_TOKEN=… node scripts/build-used-by.mjs [--out web]
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: GITHUB_TOKEN=… node scripts/build-used-by.mjs [--out web]');
  process.exit(0);
}
const oi = argv.indexOf('--out');
const OUT = resolve(root, oi !== -1 && argv[oi + 1] ? argv[oi + 1] : 'web');
const OWNER = 'mohitagw15856';
const token = process.env.USED_BY_TOKEN || process.env.GITHUB_TOKEN;
const headers = { 'user-agent': 'pm-skills-used-by', accept: 'application/vnd.github+json', ...(token ? { authorization: `Bearer ${token}` } : {}) };
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(kind, q) {
  try {
    const r = await fetch(`https://api.github.com/search/${kind}?q=${encodeURIComponent(q)}&per_page=100${kind === 'repositories' ? '&sort=stars' : ''}`, { headers, signal: AbortSignal.timeout(20000) });
    if (!r.ok) return { ok: false, status: r.status, items: [] };
    const j = await r.json();
    return { ok: true, total: j.total_count, items: j.items || [] };
  } catch (e) { return { ok: false, status: e.name, items: [] }; }
}

const notes = [];
const listed = new Map(), vendored = new Map(), mentions = new Map();
const repoInfo = (r) => ({ name: r.full_name, url: r.html_url, stars: r.stargazers_count ?? null, description: r.description || '' });

const repos = await search('repositories', `"${OWNER}/pm-claude-skills" in:readme fork:false -user:${OWNER}`);
if (repos.ok) for (const r of repos.items) listed.set(r.full_name, repoInfo(r));
else notes.push(`repository search failed (${repos.status})`);

const CODE = [
  ['listed', `"${OWNER}/pm-claude-skills" filename:README.md -user:${OWNER}`],
  ['vendored', `"pm-claude-skills" path:skills -user:${OWNER}`],
  ['vendored', `"pm-claude-skills" filename:package.json -user:${OWNER}`],
  ['mentions', `"npx pm-claude-skills" -user:${OWNER}`],
];
let codeOk = true;
for (const [bucket, q] of CODE) {
  await sleep(2500); // code search allows about ten requests a minute
  const res = await search('code', q);
  if (!res.ok) { codeOk = false; notes.push(`code search unavailable (${res.status})`); break; }
  for (const it of res.items) {
    const r = it.repository; if (!r || r.owner?.login === OWNER) continue;
    const target = bucket === 'listed' ? listed : bucket === 'vendored' ? vendored : mentions;
    if (!listed.has(r.full_name) && !vendored.has(r.full_name)) target.set(r.full_name, { ...repoInfo(r), path: it.path });
  }
}
for (const k of [...mentions.keys()]) if (listed.has(k) || vendored.has(k)) mentions.delete(k);

// Code search results carry no star counts; fill them in for the top entries.
const all = [...listed.values(), ...vendored.values(), ...mentions.values()];
for (const e of all.filter((x) => x.stars == null).slice(0, 60)) {
  try { const r = await fetch(`https://api.github.com/repos/${e.name}`, { headers, signal: AbortSignal.timeout(10000) }); if (r.ok) { const j = await r.json(); e.stars = j.stargazers_count; e.description = e.description || j.description || ''; } } catch { /* keep null */ }
}
const sorted = (m) => [...m.values()].sort((a, b) => (b.stars || 0) - (a.stars || 0));
const data = { generated: new Date().toISOString(), codeSearch: codeOk, notes, listedIn: sorted(listed), vendored: sorted(vendored), mentions: sorted(mentions) };

const section = (title, intro, rows) => `<section class="panel"><h2>${title} <span class="n">${rows.length}</span></h2><p class="note">${intro}</p>${rows.length ? `<ul>${rows.map((r) => `<li><a href="${esc(r.url)}">${esc(r.name)}</a>${r.stars != null ? ` <span class="star">★ ${Number(r.stars).toLocaleString('en-GB')}</span>` : ''}${r.description ? `<br><span class="note">${esc(r.description.slice(0, 140))}</span>` : ''}</li>`).join('')}</ul>` : '<p class="note">None found today.</p>'}</section>`;
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Used by: where PM Skills shows up | PM Skills</title>
<meta name="description" content="Public repositories that list, vendor or mention PM Skills, found through GitHub search and rebuilt daily. No telemetry." />
<link rel="canonical" href="https://mohitagw15856.github.io/pm-claude-skills/used-by.html" />
<link rel="stylesheet" href="styles.css" />
<style>
  .ub-wrap { max-width: 820px; margin: 0 auto; padding: 16px 22px 70px; }
  .ub-wrap h1 { font-size: 26px; margin-bottom: 6px; }
  .panel { border: 1px solid var(--border); border-radius: 16px; background: var(--panel); padding: 16px 22px; margin: 18px 0; }
  .panel h2 { font-size: 17px; margin: 0 0 4px; }
  .panel ul { padding-left: 18px; line-height: 1.6; }
  .panel li { margin: 6px 0; }
  .n { color: var(--muted); font-weight: 400; }
  .star { color: var(--muted); font-size: 13px; }
  .note { color: var(--muted); font-size: 13px; line-height: 1.55; }
</style>
</head>
<body>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<main class="ub-wrap">
  <h1>🌍 Used by</h1>
  <p class="note">Public repositories that reference PM Skills, found through GitHub search and rebuilt every day. PM Skills has no telemetry, so this is the only adoption signal there is, and it only sees public code. Updated ${esc(data.generated.slice(0, 10))}.${notes.length ? ` (${esc(notes.join('; '))}.)` : ''}</p>
  ${section('Listed in', 'Awesome lists, directories and catalogues that link the repository.', data.listedIn)}
  ${section('Vendored or installed', 'Repositories that copy the skills or depend on the npm package.', data.vendored)}
  ${section('Mentioned in', 'Other public files that name the repository or its install command.', data.mentions)}
  <p class="note">Missing? If your project uses PM Skills, add a link to the repository in your README and it will show up here.</p>
</main>
<script src="nav.js"></script>
</body>
</html>
`;
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'used-by.html'), html);
writeFileSync(join(OUT, 'used-by.json'), JSON.stringify(data, null, 2) + '\n');
console.log(`Wrote used-by.html: ${data.listedIn.length} listed, ${data.vendored.length} vendored, ${data.mentions.length} mentions${codeOk ? '' : ' (code search unavailable)'}.`);
