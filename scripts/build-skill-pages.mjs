#!/usr/bin/env node
// Generates one static, SEO-indexable HTML page per skill into web/skill/<name>.html,
// plus web/sitemap.xml and web/robots.txt. Each page is server-rendered (crawlable)
// with title/description/inputs, Open Graph + Twitter + JSON-LD metadata, a sample
// output (if available), and internal links to related skills. Run after
// web/build-skills.mjs (and optionally build-samples.mjs). No dependencies.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

const skillsJson = join(root, 'web', 'skills.json');
if (!existsSync(skillsJson)) { console.error('web/skills.json not found — run: node web/build-skills.mjs'); process.exit(1); }
const { skills } = JSON.parse(readFileSync(skillsJson, 'utf8'));

const samplesFile = join(root, 'web', 'samples.json');
const samples = existsSync(samplesFile) ? JSON.parse(readFileSync(samplesFile, 'utf8')).samples : [];
const sampleBySkill = Object.fromEntries(samples.map((s) => [s.skill, s]));

const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TIER = { production: ['🟢', 'Production-Ready'], stable: ['🔵', 'Stable'], experimental: ['🟡', 'Experimental'] };

const byBundle = {};
for (const s of skills) (byBundle[s.plugin] ||= []).push(s);

const CSS = `*{box-sizing:border-box}body{margin:0;background:#0f1115;color:#e7ebf0;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
a{color:#e89b82;text-decoration:none}a:hover{text-decoration:underline}
header{padding:22px;border-bottom:1px solid #2a313c;background:#161a21}
.crumb{font-size:13px;color:#95a0b0;margin-bottom:10px}
main{max-width:780px;margin:0 auto;padding:26px 22px 70px}
h1{font-size:30px;margin:.2em 0 .3em}h2{font-size:19px;margin:1.6em 0 .5em;border-bottom:1px solid #2a313c;padding-bottom:6px}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px}
.tier,.badge{font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;border:1px solid transparent}
.tier-production{color:#6ee7b7;background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.35)}
.tier-stable{color:#93c5fd;background:rgba(59,130,246,.12);border-color:rgba(59,130,246,.35)}
.tier-experimental{color:#fcd34d;background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35)}
.badge-eval{color:#6ee7b7;background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.35)}
.bundle{font-size:11px;letter-spacing:.03em;text-transform:uppercase;color:#e89b82;font-weight:600}
.lead{font-size:17px;color:#c7cfda}
.source{font-size:14px;color:#95a0b0;margin:6px 0 0}.source em{color:#e89b82;font-style:italic}
.cta{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}
.btn{display:inline-block;padding:10px 16px;border-radius:9px;font-weight:600;font-size:14px}
.btn-primary{background:#d97757;color:#0f1115}.btn-ghost{background:#1d222b;border:1px solid #2a313c;color:#e7ebf0}
code,pre{background:#1d222b;border:1px solid #2a313c;border-radius:6px}
code{padding:1px 6px;font-size:13px}pre{padding:12px 14px;overflow:auto}
ul{padding-left:20px}li{margin:4px 0}
.sample{background:#161a21;border:1px solid #2a313c;border-radius:12px;padding:6px 18px;margin-top:8px}
.sample .md{font-size:14.5px}.sample .md h1{font-size:20px}.sample .md h2{font-size:16px;border:0}
.related a{display:inline-block;background:#1d222b;border:1px solid #2a313c;border-radius:99px;padding:6px 12px;margin:4px 6px 0 0;font-size:13px;color:#e7ebf0}
.muted{color:#95a0b0}.foot{margin-top:40px;border-top:1px solid #2a313c;padding-top:16px;font-size:13px;color:#95a0b0}`;

function page(s) {
  const [dot, label] = TIER[s.tier] || TIER.stable;
  const url = `${BASE}/skill/${s.name}.html`;
  const playUrl = `${BASE}/index.html?skill=${s.name}`;
  const metaDesc = esc(s.description).slice(0, 300);
  const evalBadge = s.eval ? `<span class="badge badge-eval">✅ Eval-scored ${s.eval.score}/5</span>` : '';

  const inputs = (s.inputs && s.inputs.length)
    ? `<h2>What to give it</h2>\n<ul>` + s.inputs.map((i) =>
        `<li><strong>${esc(i.label)}</strong>${i.optional ? ' <span class="muted">(optional)</span>' : ''}${i.hint ? ` — ${esc(i.hint)}` : ''}</li>`
      ).join('\n') + `</ul>`
    : '';

  const sample = sampleBySkill[s.name]
    ? `<h2>Example output</h2>\n<div class="sample"><div class="md" id="sample"></div></div>\n<p class="muted">Input: ${esc(sampleBySkill[s.name].input)} · ${esc(sampleBySkill[s.name].source)}</p>`
    : '';
  const sampleScript = sampleBySkill[s.name]
    ? `<script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js"></script>
<script>(function(){var n=document.getElementById('sample');n.innerHTML=DOMPurify.sanitize(marked.parse(${JSON.stringify(sampleBySkill[s.name].output)}));
// Demote sample headings so the page keeps a single <h1> (h1→h3, h2→h4…).
['h1','h2','h3','h4'].reverse().forEach(function(t){var lvl=Math.min(6,parseInt(t[1])+2);n.querySelectorAll(t).forEach(function(el){var r=document.createElement('h'+lvl);r.innerHTML=el.innerHTML;el.replaceWith(r);});});})();</script>`
    : '';

  const related = (byBundle[s.plugin] || []).filter((x) => x.name !== s.name).slice(0, 6);
  const relatedHtml = related.length
    ? `<h2>Related skills</h2>\n<div class="related">` + related.map((r) => `<a href="${r.name}.html">${esc(r.title)}</a>`).join('') + `</div>`
    : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${s.title} — AI Agent Skill`,
    description: s.description,
    url,
    author: { '@type': 'Person', name: 'Mohit Aggarwal' },
    isPartOf: { '@type': 'WebSite', name: 'PM Claude Skills', url: BASE },
    keywords: ['Claude', 'AI agent skill', 'SKILL.md', s.title, s.plugin].join(', '),
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="google-site-verification" content="osZgdSLYnqidzCKt4CxjqAxo44OqGvlKi-Bmg0UmxFQ" />
<title>${esc(s.title)} — AI Agent Skill for Claude, ChatGPT &amp; Gemini</title>
<meta name="description" content="${metaDesc}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(s.title)} — AI Agent Skill" />
<meta property="og:description" content="${metaDesc}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${BASE}/og/${s.name}.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(s.title)} — AI Agent Skill" />
<meta name="twitter:description" content="${metaDesc}" />
<meta name="twitter:image" content="${BASE}/og/${s.name}.jpg" />
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>${CSS}</style>
</head>
<body>
<header>
  <div class="crumb"><a href="../index.html">Playground</a> › <a href="../catalog.html">Catalog</a> › ${esc(s.title)}</div>
  <div class="row"><span class="tier tier-${s.tier}">${dot} ${label}</span>${evalBadge}<span class="bundle">${esc(s.plugin)}</span></div>
</header>
<main>
  <h1>${esc(s.title)}</h1>
  <p class="lead">${esc(s.description)}</p>
  ${s.source ? `<p class="source">📚 Based on ${esc(s.source).replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>` : ''}

  <div class="cta">
    <a class="btn btn-primary" href="${playUrl}">▶ Run it free in the Playground</a>
    <a class="btn btn-ghost" href="${BASE}/grade.html?skill=${s.name}">📝 Grade your existing draft</a>
    <a class="btn btn-ghost" href="${REPO}/blob/main/skills/${s.name}/SKILL.md">View SKILL.md ↗</a>
  </div>

  <h2>Install</h2>
  <pre><code>npx pm-claude-skills add --agent claude   # or codex · cursor · gemini · hermes
# or one-line MCP (every skill, any client):
claude mcp add pm-skills -- npx -y pm-claude-skills-mcp</code></pre>

  ${inputs}
  ${sample}
  ${relatedHtml}

  <div class="foot">
    <strong>${esc(s.title)}</strong> is one of ${skills.length} open-source professional AI agent skills.
    <a href="../index.html">Try them all in the browser</a> · <a href="${REPO}">⭐ Star on GitHub</a> · <a href="../catalog.html">Browse the full catalog</a>
  </div>
</main>
${sampleScript}
</body>
</html>
`;
}

// Write pages
const outDir = join(root, 'web', 'skill');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
for (const s of skills) writeFileSync(join(outDir, `${s.name}.html`), page(s));

// Sitemap (top-level pages + every skill page)
const today = new Date().toISOString().slice(0, 10);
const urls = [
  `${BASE}/`, `${BASE}/catalog.html`, `${BASE}/examples.html`, `${BASE}/leaderboard.html`,
  ...skills.map((s) => `${BASE}/skill/${s.name}.html`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'web', 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'web', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);

console.log(`Wrote ${skills.length} skill pages → web/skill/, plus sitemap.xml (${urls.length} urls) and robots.txt.`);
