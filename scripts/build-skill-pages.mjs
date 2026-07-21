#!/usr/bin/env node
// Generates one static, SEO-indexable HTML page per skill into web/skill/<name>.html,
// plus web/sitemap.xml and web/robots.txt. Every page carries a DETERMINISTIC
// GENERATIVE IDENTITY — a banner pattern, palette, and monogram seeded from the
// skill's name — so all 454 pages are visually unique yet stable across builds.
// Content is rendered from the skill's own craft: inputs, Quality Checks,
// Anti-Patterns, trigger phrases, deeper materials, sample output, and the
// interconnection graph. Run after web/build-skills.mjs. No dependencies.
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
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

const giscus = existsSync(join(root, 'giscus.json')) ? JSON.parse(readFileSync(join(root, 'giscus.json'), 'utf8')) : {};
const giscusReady = giscus.repoId && giscus.categoryId && giscus.repo;
function discussionBlock(s) {
  if (!giscusReady) {
    return `<h2>💬 Discussion</h2>\n<p>Used this skill? Share what you got, tweaks, or questions on <a href="${REPO}/discussions">GitHub Discussions</a>.</p>`;
  }
  return `<h2>💬 Discussion</h2>
<script src="https://giscus.app/client.js"
  data-repo="${giscus.repo}" data-repo-id="${giscus.repoId}"
  data-category="${esc(giscus.category || '')}" data-category-id="${giscus.categoryId}"
  data-mapping="specific" data-term="skill: ${s.name}"
  data-reactions-enabled="1" data-emit-metadata="0" data-input-position="top"
  data-theme="${giscus.theme || 'dark'}" data-lang="en" crossorigin="anonymous" async></script>`;
}

const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TIER = { production: ['🟢', 'Production-Ready'], stable: ['🔵', 'Stable'], experimental: ['🟡', 'Experimental'] };

const byBundle = {};
for (const s of skills) (byBundle[s.plugin] ||= []).push(s);
const bundleIndex = Object.fromEntries(Object.keys(byBundle).sort().map((b, i) => [b, i]));

// ── The generative identity: seeded, stable, unique per skill ─────────────────
function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function identity(s) {
  const seed = hash(s.name);
  const r = rng(seed);
  const baseHue = ((bundleIndex[s.plugin] || 0) * 0.618034 % 1) * 360;         // bundle family colour
  const hue = Math.round((baseHue + (r() * 40 - 20) + 360) % 360);             // per-skill shift
  const hue2 = Math.round((hue + 40 + r() * 60) % 360);
  const pattern = hash(s.name + "::pattern") % 5;
  const mono = s.title.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return { seed, hue, hue2, pattern, mono, r: rng(seed + 7) };
}

// Five banner families; every skill gets one, drawn with its own randomness.
function banner(id) {
  const { r, hue, hue2, pattern } = id;
  const W = 760, H = 190;
  const c1 = `hsl(${hue},62%,52%)`, c2 = `hsl(${hue2},58%,46%)`, dim = `hsl(${hue},35%,24%)`;
  let art = '';
  if (pattern === 0) {          // orbits — concentric arcs around an off-canvas star
    const cx = 90 + r() * 140, cy = H + 40;
    for (let i = 0; i < 7; i++) {
      const rad = 60 + i * (26 + r() * 10);
      art += `<circle cx="${cx.toFixed(0)}" cy="${cy}" r="${rad.toFixed(0)}" fill="none" stroke="${i % 2 ? c2 : c1}" stroke-opacity="${(0.5 - i * 0.055).toFixed(2)}" stroke-width="${(2 + r() * 2).toFixed(1)}"/>`;
    }
    for (let i = 0; i < 9; i++) art += `<circle cx="${(r() * W).toFixed(0)}" cy="${(r() * H).toFixed(0)}" r="${(1 + r() * 2.4).toFixed(1)}" fill="${c1}" fill-opacity="${(0.4 + r() * 0.5).toFixed(2)}"/>`;
  } else if (pattern === 1) {   // waves — layered sine ribbons
    for (let i = 0; i < 4; i++) {
      const amp = 14 + r() * 22, ph = r() * 6, yb = 40 + i * 38;
      let d = `M0 ${yb}`;
      for (let x = 0; x <= W; x += 20) d += ` L${x} ${(yb + Math.sin(x / (60 + i * 14) + ph) * amp).toFixed(1)}`;
      art += `<path d="${d}" fill="none" stroke="${i % 2 ? c1 : c2}" stroke-opacity="${(0.55 - i * 0.1).toFixed(2)}" stroke-width="${(2.5 - i * 0.4).toFixed(1)}"/>`;
    }
  } else if (pattern === 2) {   // circuit — right-angle traces with node dots
    for (let i = 0; i < 10; i++) {
      let x = r() * W, y = r() * H, d = `M${x.toFixed(0)} ${y.toFixed(0)}`;
      for (let k = 0; k < 3; k++) { if (r() > 0.5) x += (r() - 0.5) * 260; else y += (r() - 0.5) * 120; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`; }
      art += `<path d="${d}" fill="none" stroke="${i % 2 ? c1 : c2}" stroke-opacity="0.4" stroke-width="1.6"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="3" fill="${c1}" fill-opacity="0.8"/>`;
    }
  } else if (pattern === 3) {   // rays — beams from a corner sun
    const cx = W - 60 - r() * 120, cy = -30;
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI / 3) + (i / 12) * (Math.PI / 2.6) + r() * 0.04;
      art += `<line x1="${cx.toFixed(0)}" y1="${cy}" x2="${(cx - Math.cos(a) * 900).toFixed(0)}" y2="${(cy + Math.sin(a) * 900).toFixed(0)}" stroke="${i % 3 ? c1 : c2}" stroke-opacity="${(0.14 + r() * 0.22).toFixed(2)}" stroke-width="${(3 + r() * 9).toFixed(1)}"/>`;
    }
  } else {                      // constellation — connected scatter
    const pts = Array.from({ length: 9 }, () => [40 + r() * (W - 80), 24 + r() * (H - 48)]);
    for (let i = 1; i < pts.length; i++) art += `<line x1="${pts[i - 1][0].toFixed(0)}" y1="${pts[i - 1][1].toFixed(0)}" x2="${pts[i][0].toFixed(0)}" y2="${pts[i][1].toFixed(0)}" stroke="${c2}" stroke-opacity="0.35" stroke-width="1.4"/>`;
    for (const [x, y] of pts) art += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(2 + r() * 3.4).toFixed(1)}" fill="${c1}" fill-opacity="0.9"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${dim}"/><stop offset="1" stop-color="hsl(${hue2},40%,14%)"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>${art}
<rect width="${W}" height="${H}" fill="hsl(${hue},30%,8%)" fill-opacity="0.28"/></svg>`;
}

// ── Craft sections parsed from the skill body ─────────────────────────────────
function section(body, name) {
  const m = body.match(new RegExp(`##\\s*${name}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`, 'i'));
  if (!m) return [];
  return m[1].split('\n').map((l) => l.replace(/^-\s*\[\s*\]\s*/, '').replace(/^-\s*/, '').trim())
    .filter((l) => l && !l.startsWith('#') && !l.startsWith('|')).slice(0, 8);
}
function craft(s) {
  const body = s.instructions || '';
  return {
    checks: section(body, 'Quality Checks'),
    antis: section(body, 'Anti-Patterns'),
    triggers: section(body, 'Example Trigger Phrases').map((t) => t.replace(/^"|"$/g, '')).slice(0, 5),
    deeper: [...body.matchAll(/\[`?((?:references|templates|scripts)\/[^\]`]+)`?\]\(([^)]+)\)(?:\s*[—-]\s*([^\n]+))?/g)]
      .map((m) => ({ path: m[1], desc: (m[3] || '').trim() })).slice(0, 4),
    hasScript: /##\s*(Programmatic Helper|Execution)/i.test(body),
  };
}

const CSS = `*{box-sizing:border-box}body{margin:0;background:#0f1115;color:#e7ebf0;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
a{color:var(--acc,#e89b82);text-decoration:none}a:hover{text-decoration:underline}
.crumb{font-size:13px;color:#95a0b0;padding:14px 22px}
main{max-width:780px;margin:0 auto;padding:0 22px 70px}
.hero{position:relative;border-radius:18px;overflow:hidden;border:1px solid #2a313c;margin-bottom:18px}
.hero svg{display:block;width:100%;height:190px}
.hero .mono{position:absolute;top:18px;right:22px;font-size:44px;font-weight:800;color:#fff;opacity:.16;letter-spacing:-2px}
.hero .inner{position:absolute;left:24px;bottom:16px;right:24px}
.hero h1{font-size:clamp(22px,4.6vw,32px);margin:0 0 6px;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.55)}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.tier,.badge{font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;border:1px solid transparent;background:rgba(10,12,16,.55)}
.tier-production{color:#6ee7b7;border-color:rgba(16,185,129,.5)}
.tier-stable{color:#93c5fd;border-color:rgba(59,130,246,.5)}
.tier-experimental{color:#fcd34d;border-color:rgba(245,158,11,.5)}
.badge-eval{color:#6ee7b7;border-color:rgba(16,185,129,.5)}
.badge-l3{color:#c9a4ff;border-color:rgba(160,120,255,.5)}
.badge-script{color:#7fd6c2;border-color:rgba(90,200,170,.5)}
.bundle{font-size:11px;letter-spacing:.03em;text-transform:uppercase;color:var(--acc);font-weight:600}
h2{font-size:19px;margin:1.7em 0 .5em;border-bottom:1px solid #2a313c;padding-bottom:6px}
.lead{font-size:16.5px;color:#c7cfda}
.source{font-size:14px;color:#95a0b0;margin:6px 0 0}.source em{color:var(--acc);font-style:italic}
.cta{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}
.btn{display:inline-block;padding:10px 16px;border-radius:9px;font-weight:600;font-size:14px}
.btn-primary{background:var(--acc);color:#0f1115}.btn-ghost{background:#1d222b;border:1px solid #2a313c;color:#e7ebf0}
code,pre{background:#1d222b;border:1px solid #2a313c;border-radius:6px}
code{padding:1px 6px;font-size:13px}pre{padding:12px 14px;overflow:auto}
ul{padding-left:20px}li{margin:4px 0}
.card{background:#161a21;border:1px solid #2a313c;border-radius:13px;padding:14px 18px;margin:10px 0}
.check{display:flex;gap:10px;align-items:flex-start;padding:7px 0;border-bottom:1px dashed #232a36;font-size:14px}
.check:last-child{border:0}.check .m{color:#6ee7b7;flex:0 0 auto}
.anti{border-left:3px solid #e5534b;background:rgba(229,83,75,.06);border-radius:0 10px 10px 0;padding:9px 14px;margin:8px 0;font-size:14px}
.trig{display:inline-block;background:#1d222b;border:1px solid #2a313c;border-radius:99px;padding:6px 13px;margin:4px 6px 0 0;font-size:13px;color:#c7cfda;font-style:italic}
.deep a{font-weight:600}
.sample{background:#161a21;border:1px solid #2a313c;border-radius:12px;padding:6px 18px;margin-top:8px}
.sample .md{font-size:14.5px}.sample .md h1{font-size:20px}.sample .md h2{font-size:16px;border:0}
.related a{display:inline-block;background:#1d222b;border:1px solid #2a313c;border-radius:99px;padding:6px 12px;margin:4px 6px 0 0;font-size:13px;color:#e7ebf0}
.muted{color:#95a0b0}.foot{margin-top:40px;border-top:1px solid #2a313c;padding-top:16px;font-size:13px;color:#95a0b0}`;

function page(s) {
  const [dot, label] = TIER[s.tier] || TIER.stable;
  const id = identity(s);
  const cf = craft(s);
  const acc = `hsl(${id.hue},70%,66%)`;
  const url = `${BASE}/skill/${s.name}.html`;
  const playUrl = `${BASE}/index.html?skill=${s.name}`;
  const metaDesc = esc(s.description).slice(0, 300);
  const evalBadge = s.eval && s.eval.score ? `<span class="badge badge-eval">✅ ${s.eval.score}/5</span>` : '';

  const inputs = (s.inputs && s.inputs.length)
    ? `<h2>What to give it</h2>\n<div class="card">` + s.inputs.map((i) =>
        `<div class="check"><span class="m">▸</span><span><strong>${esc(i.label)}</strong>${i.optional ? ' <span class="muted">(optional)</span>' : ''}${i.hint ? ` — ${esc(i.hint)}` : ''}</span></div>`
      ).join('\n') + `</div>`
    : '';

  const checks = cf.checks.length
    ? `<h2>✅ The bar it holds itself to</h2>\n<p class="muted" style="font-size:13.5px;margin-top:-2px">Every skill in this library self-verifies — these are <em>this</em> skill's own quality checks, straight from its definition.</p>\n<div class="card">` +
      cf.checks.map((c) => `<div class="check"><span class="m">✓</span><span>${esc(c)}</span></div>`).join('\n') + `</div>`
    : '';

  const antis = cf.antis.length
    ? `<h2>⚠️ What it refuses to do</h2>\n` + cf.antis.slice(0, 5).map((a) => `<div class="anti">${esc(a)}</div>`).join('\n')
    : '';

  const triggers = cf.triggers.length
    ? `<h2>🗣 Say this to your agent</h2>\n<div>` + cf.triggers.map((t) => `<span class="trig">“${esc(t)}”</span>`).join('') + `</div>`
    : '';

  const deeper = cf.deeper.length
    ? `<h2>📚 Ships with</h2>\n<ul class="deep">` + cf.deeper.map((d) =>
        `<li><a href="${REPO}/blob/main/skills/${s.name}/${esc(d.path)}">${esc(d.path)}</a>${d.desc ? ` — ${esc(d.desc.slice(0, 120))}` : ''}</li>`).join('\n') + `</ul>`
    : '';

  const sample = sampleBySkill[s.name]
    ? `<h2>Example output</h2>\n<div class="sample"><div class="md" id="sample"></div></div>\n<p class="muted">Input: ${esc(sampleBySkill[s.name].input)} · ${esc(sampleBySkill[s.name].source)}</p>`
    : '';
  const sampleScript = sampleBySkill[s.name]
    ? `<script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js" integrity="sha384-NNQgBjjuhtXzPmmy4gurS5X7P4uTt1DThyevz4Ua0IVK5+kazYQI1W27JHjbbxQz" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js" integrity="sha384-3HPB1XT51W3gGRxAmZ+qbZwRpRlFQL632y8x+adAqCr4Wp3TaWwCLSTAJJKbyWEK" crossorigin="anonymous"></script>
<script>(function(){var n=document.getElementById('sample');n.innerHTML=DOMPurify.sanitize(marked.parse(${JSON.stringify(sampleBySkill[s.name].output)}));
['h1','h2','h3','h4'].reverse().forEach(function(t){var lvl=Math.min(6,parseInt(t[1])+2);n.querySelectorAll(t).forEach(function(el){var r=document.createElement('h'+lvl);r.innerHTML=el.innerHTML;el.replaceWith(r);});});})();</script>`
    : '';

  const byName = Object.fromEntries(skills.map((x) => [x.name, x]));
  const foundation = s.readsFirst ? byName[s.readsFirst] : null;
  let related = (s.related || []).map((n) => byName[n]).filter(Boolean).filter((x) => x.name !== s.readsFirst);
  if (!related.length) related = (byBundle[s.plugin] || []).filter((x) => x.name !== s.name).slice(0, 6);
  const foundationHtml = foundation
    ? `<h2>Start with</h2>\n<div class="related"><a href="${foundation.name}.html">${esc(foundation.title)}</a></div>`
    : '';
  const relatedHtml = related.length
    ? `${foundationHtml}<h2>Related skills</h2>\n<div class="related">` + related.map((r) => `<a href="${r.name}.html">${esc(r.title)}</a>`).join('') + `</div>`
    : foundationHtml;

  // FAQ structured data: the skill's own craft reshaped as questions Google
  // actually gets asked — programmatic SEO across all pages.
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What does the ${s.title} skill do?`,
        acceptedAnswer: { '@type': 'Answer', text: String(s.description).slice(0, 400) } },
      (s.inputs && s.inputs.length) ? { '@type': 'Question', name: `What do I need to use ${s.title}?`,
        acceptedAnswer: { '@type': 'Answer', text: s.inputs.map((i) => i.label + (i.optional ? ' (optional)' : '')).join('; ') + '.' } } : null,
      cf.checks.length ? { '@type': 'Question', name: `How do I know the ${s.title} output is good?`,
        acceptedAnswer: { '@type': 'Answer', text: 'The skill verifies itself against its own quality checks: ' + cf.checks.slice(0, 4).join('; ') + '.' } } : null,
      { '@type': 'Question', name: `Is ${s.title} free to use?`,
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — run it free in the browser playground (no API key needed for the sponsored trial, or bring any provider key), or install it into Claude Code, Cursor, ChatGPT and more via npx pm-claude-skills. MIT-licensed and open source.' } },
    ].filter(Boolean),
  };

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
<html lang="en" style="--acc:${acc}">
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
<script type="application/ld+json">${JSON.stringify(faq)}</script>
<style>${CSS}</style>
</head>
<body>
<div class="crumb"><a href="../index.html">Playground</a> › <a href="../catalog.html">Catalog</a> › ${esc(s.title)}</div>
<main>
  <div class="hero">
    ${banner(id)}
    <div class="mono">${esc(id.mono)}</div>
    <div class="inner">
      <h1>${esc(s.title)}</h1>
      <div class="row">
        <span class="tier tier-${s.tier}">${dot} ${label}</span>${s.updated ? `<span class="tier" title="last change to this skill">🕐 updated ${s.updated}</span>` : ''}
        ${evalBadge}
        <span class="badge badge-l3">🔷 SkillSpec L3</span>
        ${cf.hasScript ? '<span class="badge badge-script">⚙ ships an executable helper</span>' : ''}
        <span class="bundle">${esc(s.plugin)}</span>
      </div>
    </div>
  </div>

  <p class="lead">${esc(s.description)}</p>
  ${s.source && s.source !== 'None' ? `<p class="source">📚 Based on ${esc(s.source).replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>` : ''}

  <div class="cta">
    <a class="btn btn-primary" href="${playUrl}">▶ Run it free — no key needed</a>
    <a class="btn btn-ghost" href="${BASE}/grade.html?skill=${s.name}">📝 Grade your existing draft</a>
    <a class="btn btn-ghost" href="${REPO}/blob/main/skills/${s.name}/SKILL.md">View SKILL.md ↗</a>
  </div>

  ${triggers}
  ${inputs}
  ${checks}
  ${antis}
  ${deeper}

  <h2>Install</h2>
  <pre><code>npx pm-claude-skills add --agent claude   # or codex · cursor · gemini · hermes
# or one-line MCP (every skill, any client):
claude mcp add pm-skills -- npx -y pm-claude-skills-mcp</code></pre>

  ${sample}
  ${relatedHtml}

  <h2>🔌 Embed this skill</h2>
  <p>Drop this on your blog, docs, or site — it renders a "Run this skill" card:</p>
  <pre><code>&lt;div data-pm-skill="${s.name}"&gt;&lt;/div&gt;
&lt;script src="${BASE}/embed.js" async&gt;&lt;/script&gt;</code></pre>

  ${discussionBlock(s)}

  <div class="foot">
    <strong>${esc(s.title)}</strong> is one of ${skills.length} open-source professional AI agent skills — all SkillSpec L3.
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
  `${BASE}/`, `${BASE}/find.html`, `${BASE}/catalog.html`, `${BASE}/examples.html`, `${BASE}/leaderboard.html`,
  `${BASE}/coverage.html`, `${BASE}/canvas.html`, `${BASE}/firm.html`, `${BASE}/boardroom.html`, `${BASE}/defend.html`, `${BASE}/verify.html`, `${BASE}/gym.html`, `${BASE}/gauntlet.html`, `${BASE}/xray.html`, `${BASE}/grade.html`, `${BASE}/benchmark.html`, `${BASE}/hiring.html`, `${BASE}/wrapped.html`, `${BASE}/academy.html`, `${BASE}/campaign.html`, `${BASE}/reckoning.html`, `${BASE}/handbook.html`, `${BASE}/charter.html`, `${BASE}/tower.html`, `${BASE}/stage.html`, `${BASE}/galaxy3d.html`, `${BASE}/city.html`, `${BASE}/trophy.html`, `${BASE}/status.html`, `${BASE}/season.html`, `${BASE}/atlas.html`, `${BASE}/morningshow.html`, `${BASE}/institute.html`,
  ...skills.map((s) => `${BASE}/skill/${s.name}.html`),
  `${BASE}/museum.html`, `${BASE}/growth.html`,
  ...(existsSync(join(root, 'web', 'compare'))
    ? readdirSync(join(root, 'web', 'compare')).filter((f) => f.endsWith('.html')).map((f) => `${BASE}/compare/${f}`)
    : []),
  // profession landing pages (built by build-profession-pages.mjs)
  ...(existsSync(join(root, 'web', 'for'))
    ? readdirSync(join(root, 'web', 'for')).filter((f) => f.endsWith('.html')).map((f) => `${BASE}/for/${f}`)
    : []),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'web', 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'web', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);

console.log(`Wrote ${skills.length} skill pages (generative identities) → web/skill/, plus sitemap.xml (${urls.length} urls) and robots.txt.`);
