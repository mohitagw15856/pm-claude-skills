#!/usr/bin/env node
// Generates web/catalog.html — a static, SEO-indexable catalog of every skill,
// grouped by bundle, from web/skills.json. Server-rendered HTML so search engines
// index each skill's name + description (the playground is client-rendered and
// isn't crawlable). Run after web/build-skills.mjs. No dependencies.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsJson = join(root, 'web', 'skills.json');
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

if (!existsSync(skillsJson)) {
  console.error('web/skills.json not found — run: node web/build-skills.mjs');
  process.exit(1);
}
const { skills } = JSON.parse(readFileSync(skillsJson, 'utf8'));

const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TIER = {
  production: ['🟢', 'Production-Ready'],
  stable: ['🔵', 'Stable'],
  experimental: ['🟡', 'Experimental'],
};

// Group by bundle, sorted; skills sorted by title within.
const byBundle = {};
for (const s of skills) (byBundle[s.plugin] ||= []).push(s);
const bundles = Object.keys(byBundle).sort();
for (const b of bundles) byBundle[b].sort((a, b2) => a.title.localeCompare(b2.title));

const cards = (list) => list.map((s) => {
  const [dot, label] = TIER[s.tier] || TIER.stable;
  return `      <article class="card" id="${esc(s.name)}">
        <div class="row"><span class="tier tier-${s.tier}">${dot} ${label}</span><span class="bundle">${esc(s.plugin)}</span></div>
        <h3><a href="skill/${esc(s.name)}.html">${esc(s.title)}</a></h3>
        <p>${esc(s.description)}</p>
        <div class="links">
          <a href="skill/${esc(s.name)}.html">Details →</a>
          <a href="${REPO}/blob/main/skills/${esc(s.name)}/SKILL.md">SKILL.md ↗</a>
          <a href="https://mohitagw15856.github.io/pm-claude-skills/index.html?skill=${esc(s.name)}">Run in Playground →</a>
        </div>
      </article>`;
}).join('\n');

const sections = bundles.map((b) =>
  `    <section class="bundle-section">\n      <h2 id="bundle-${esc(b)}">${esc(b)} <span class="count">${byBundle[b].length}</span></h2>\n${cards(byBundle[b])}\n    </section>`
).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="google-site-verification" content="osZgdSLYnqidzCKt4CxjqAxo44OqGvlKi-Bmg0UmxFQ" />
<title>Skill Catalog — ${skills.length} Agent Skills for Claude, ChatGPT, Gemini, Cursor & more</title>
<meta name="description" content="Browse all ${skills.length} professional Agent Skills (SKILL.md) — product, engineering, customer success, marketing, design, finance, HR, sales and more. Works with Claude, ChatGPT, Gemini, Cursor, Codex, Hermes." />
<link rel="canonical" href="https://mohitagw15856.github.io/pm-claude-skills/catalog.html" />
<style>
  :root{--bg:#0f1115;--panel:#161a21;--panel2:#1d222b;--border:#2a313c;--text:#e7ebf0;--muted:#95a0b0;--accent:#d97757;--accent2:#e89b82}
  html[data-theme="light"]{--bg:#f7f6f3;--panel:#fff;--panel2:#f1efe9;--border:#e4e0d8;--text:#1b2027;--muted:#667085}
  html[data-theme="light"] .toolbar-nav{background:rgba(255,255,255,.75)}
  *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  a{color:var(--accent2);text-decoration:none}a:hover{text-decoration:underline}
  header{padding:28px 22px;border-bottom:1px solid var(--border);background:var(--panel)}
  header h1{margin:0 0 6px;font-size:24px}header p{margin:0;color:var(--muted);font-size:14px}
  .toolbar-nav{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:12px 22px;background:rgba(13,15,20,.7);border-bottom:1px solid var(--border)}
  .toolbar-nav .tool{font-size:13px;font-weight:600;text-decoration:none;padding:7px 14px;border-radius:99px;color:var(--muted);border:1px solid transparent;white-space:nowrap;transition:color .12s,background .12s,border-color .12s}
  .toolbar-nav .tool:hover{color:var(--text);background:var(--panel2);border-color:var(--border)}
  .toolbar-nav .tool.active{background:linear-gradient(135deg,#e0855f,#d9605a);color:#1a1207;border-color:transparent}
  .controls{position:sticky;top:0;z-index:5;background:var(--bg);padding:14px 22px;border-bottom:1px solid var(--border)}
  .controls input{width:100%;max-width:520px;padding:10px 12px;background:var(--panel2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px}
  main{max-width:1100px;margin:0 auto;padding:8px 22px 60px}
  .bundle-section{margin-top:30px}
  .bundle-section h2{font-size:16px;border-bottom:1px solid var(--border);padding-bottom:8px;text-transform:uppercase;letter-spacing:.04em;color:var(--accent2)}
  .count{color:var(--muted);font-size:12px;font-weight:400}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin:12px 0}
  .card h3{margin:6px 0 6px;font-size:16px}.card p{margin:0 0 10px;color:var(--muted);font-size:13.5px}
  .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
  .tier{font-size:10px;font-weight:600;padding:2px 7px;border-radius:99px;border:1px solid transparent}
  .tier-production{color:#6ee7b7;background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.35)}
  .tier-stable{color:#93c5fd;background:rgba(59,130,246,.12);border-color:rgba(59,130,246,.35)}
  .tier-experimental{color:#fcd34d;background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35)}
  .bundle{font-size:10.5px;letter-spacing:.03em;text-transform:uppercase;color:var(--accent2);font-weight:600;margin-left:auto}
  .links{display:flex;gap:14px;font-size:12.5px}
  .empty{color:var(--muted);padding:40px;text-align:center}
</style>
</head>
<body>
<header>
  <h1>🧠 Skill Catalog — ${skills.length} professional Agent Skills</h1>
  <p>Structured <code>SKILL.md</code> skills for Claude, ChatGPT, Gemini, Cursor, Codex &amp; Hermes. Install all with <code>npx pm-claude-skills add --agent &lt;tool&gt;</code>.</p>
</header>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<script src="nav.js"></script>
<div class="controls"><input id="q" type="search" placeholder="Filter ${skills.length} skills…" oninput="filter()" /></div>
<main id="main">
${sections}
  <p class="empty" id="empty" hidden>No skills match.</p>
</main>
<script>
  function filter(){
    var q=document.getElementById('q').value.toLowerCase().trim();
    var any=false;
    document.querySelectorAll('.bundle-section').forEach(function(sec){
      var shown=0;
      sec.querySelectorAll('.card').forEach(function(c){
        var hit=!q||c.textContent.toLowerCase().includes(q);
        c.hidden=!hit; if(hit){shown++;any=true;}
      });
      sec.hidden=shown===0;
    });
    document.getElementById('empty').hidden=any;
  }
</script>
</body>
</html>
`;

writeFileSync(join(root, 'web', 'catalog.html'), html);
console.log(`Wrote web/catalog.html — ${skills.length} skills across ${bundles.length} bundles.`);
