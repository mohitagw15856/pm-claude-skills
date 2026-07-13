#!/usr/bin/env node
// Build "The Professional Work Handbook" — the skill library compiled as a book.
// Part I: the Production-Ready skills in full, chaptered by bundle (the craft).
// Part II: the Anti-Pattern Almanac — every rule from all skills' Anti-Patterns
// sections (the judgment). Output: web/handbook.html (committed, print-friendly,
// renders markdown client-side like the skill pages). Regenerate when skills
// change:  node scripts/build-handbook.mjs
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tiers = JSON.parse(readFileSync(join(root, 'skill-tiers.json'), 'utf8'));
const catalog = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const production = new Set(tiers.productionReady || []);

// skill name → plugin (bundle) from the generated catalog, the single source of truth
const bundleOf = {};
for (const s of catalog.skills || []) bundleOf[s.name] = s.plugin || 'other';
const NICE = { cs: 'Customer Success', gtm: 'Go-to-Market', hr: 'People & HR', aiwork: 'AI at Work', agentnative: 'Agent-Native', pmm: 'Product Marketing', uxwriting: 'UX Writing' };
const bundleTitle = (id) => {
  const base = id.replace(/^pm-/, '');
  return NICE[base] || base.replace(/(^|-)(\w)/g, (_, d, c) => (d ? ' ' : '') + c.toUpperCase()).trim();
};

function parseSkill(name) {
  const p = join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(p)) return null;
  const text = readFileSync(p, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const desc = (m[1].match(/^description:\s*["']?([\s\S]*?)["']?\s*$/m) || [])[1] || '';
  const body = m[2].trim();
  const anti = (body.match(/##\s*Anti-Patterns\s*\n([\s\S]*?)(?=\n##\s|$)/i) || [])[1] || '';
  const items = anti.split('\n').map((l) => l.replace(/^-\s*\[\s*\]\s*/, '').replace(/^-\s*/, '').trim())
    .filter((l) => l && !l.startsWith('#')).map((l) => l.replace(/^Do not\s/i, 'Never '));
  return { name, desc: desc.split(/\.\s/)[0] + '.', body, anti: items };
}

const allNames = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md'))).sort();
const skills = allNames.map(parseSkill).filter(Boolean);

// ── Part I: production skills, chaptered by bundle ────────────────────────────
const chapters = new Map();
for (const s of skills) {
  if (!production.has(s.name)) continue;
  const b = bundleOf[s.name] || 'other';
  if (!chapters.has(b)) chapters.set(b, []);
  chapters.get(b).push(s);
}
const chapterList = [...chapters.entries()].sort((a, b) => b[1].length - a[1].length);

// ── Part II: the almanac (every skill's anti-patterns) ────────────────────────
const almanac = skills.filter((s) => s.anti.length).map((s) => ({ name: s.name, items: s.anti }));
const ruleCount = almanac.reduce((n, s) => n + s.items.length, 0);

const payload = {
  built: new Date().toISOString().slice(0, 10),
  stats: { skills: skills.length, production: production.size, chapters: chapterList.length, rules: ruleCount },
  chapters: chapterList.map(([b, list], i) => ({ n: i + 1, title: bundleTitle(b),
    skills: list.map((s) => ({ name: s.name, desc: s.desc, body: s.body })) })),
  almanac,
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>The Professional Work Handbook — ${payload.stats.skills} skills, ${ruleCount} rules of the craft</title>
<meta name="description" content="The pm-claude-skills library compiled as a book: the Production-Ready skills in full as craft chapters, plus the Anti-Pattern Almanac — ${ruleCount} rules of professional judgment extracted from all ${payload.stats.skills} skills. Free, printable, generated from the library itself." />
<link rel="stylesheet" href="styles.css" />
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js" integrity="sha384-NNQgBjjuhtXzPmmy4gurS5X7P4uTt1DThyevz4Ua0IVK5+kazYQI1W27JHjbbxQz" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js" integrity="sha384-3HPB1XT51W3gGRxAmZ+qbZwRpRlFQL632y8x+adAqCr4Wp3TaWwCLSTAJJKbyWEK" crossorigin="anonymous"></script>
<style>
  .book { max-width: 780px; margin: 0 auto; padding: 20px 26px 80px; font-size: 15px; line-height: 1.62; }
  .cover { text-align: center; padding: 70px 20px 50px; border-bottom: 1px solid var(--border); margin-bottom: 30px; }
  .cover h1 { font-size: clamp(30px, 6vw, 44px); margin: 0 0 10px; letter-spacing: -0.5px; }
  .cover .sub { color: var(--muted); font-size: 16px; max-width: 520px; margin: 0 auto 18px; }
  .cover .meta { font-size: 13px; color: var(--muted); }
  .toc { columns: 2; column-gap: 34px; font-size: 13.5px; margin: 18px 0 40px; }
  .toc a { display: block; color: var(--text); text-decoration: none; padding: 3px 0; border-bottom: 1px dotted var(--border); }
  .toc a:hover { color: var(--accent); }
  .toc .part { column-span: all; font-weight: 800; font-size: 15px; margin: 14px 0 6px; color: var(--accent); }
  h2.chapter { font-size: 24px; margin: 54px 0 4px; padding-top: 22px; border-top: 2px solid var(--border); }
  .chapter-sub { color: var(--muted); font-size: 13px; margin: 0 0 20px; }
  h3.skill-h { font-size: 19px; margin: 40px 0 2px; color: var(--accent); }
  .skill-desc { color: var(--muted); font-style: italic; font-size: 13.5px; margin: 0 0 12px; }
  .skill-body { border-left: 2px solid var(--border); padding-left: 18px; }
  .skill-body h2 { font-size: 15.5px; margin: 20px 0 8px; }
  .skill-body h3 { font-size: 14px; }
  .skill-body code { background: rgba(217,119,87,.1); padding: 1px 5px; border-radius: 4px; font-size: 12.5px; }
  .skill-body pre { background: var(--panel); border: 1px solid var(--border); border-radius: 10px; padding: 12px; overflow-x: auto; font-size: 12px; }
  .skill-body table { border-collapse: collapse; font-size: 13px; } .skill-body td, .skill-body th { border: 1px solid var(--border); padding: 5px 9px; }
  .alm-skill { margin: 22px 0; }
  .alm-skill h4 { margin: 0 0 6px; font-size: 14.5px; color: var(--accent); }
  .alm-skill li { margin: 4px 0; font-size: 13.8px; }
  .rule-count { font-size: 40px; font-weight: 800; }
  @media print {
    .topbar, .toolbar-nav, .no-print { display: none !important; }
    body { background: #fff; color: #111; }
    .book { max-width: none; font-size: 11pt; }
    h2.chapter { page-break-before: always; border-top: none; }
    .cover { page-break-after: always; border: none; }
    .skill-body pre { white-space: pre-wrap; }
    a { color: #111; text-decoration: none; }
  }
</style>
</head>
<body>
<header class="topbar no-print">
  <div class="brand"><img src="assets/product-notes.jpg" alt="Product Notes" class="brand-logo" />
    <div class="brand-text"><h1>The Handbook</h1><p class="tagline">The library, as a book. Print it (Cmd/Ctrl-P → PDF).</p></div></div>
</header>
<nav class="toolbar-nav no-print" id="toolbar" aria-label="Tools"></nav>

<div class="book">
  <div class="cover">
    <h1>The Professional Work Handbook</h1>
    <p class="sub">The craft of ${payload.stats.skills} professional skills, compiled from the open-source <a href="https://github.com/mohitagw15856/pm-claude-skills">pm-claude-skills</a> library — written to instruct AI, readable as a book for humans.</p>
    <p class="meta">Part I — ${payload.stats.chapters} chapters of craft (the Production-Ready tier, in full)<br/>Part II — The Anti-Pattern Almanac: <b>${ruleCount} rules</b> of professional judgment<br/>Edition ${payload.built} · CC-licensed · regenerated from the library with every release</p>
  </div>
  <div id="toc" class="toc no-print"></div>
  <div id="body"></div>
</div>

<script>
const DATA = ${JSON.stringify(payload)};
const md=(s)=>DOMPurify.sanitize(marked.parse(s));
const esc=(s)=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
let toc=['<div class="part">Part I — The Craft</div>'], out=[];
for(const ch of DATA.chapters){
  toc.push('<a href="#ch'+ch.n+'">'+ch.n+'. '+esc(ch.title)+' ('+ch.skills.length+')</a>');
  out.push('<h2 class="chapter" id="ch'+ch.n+'">Chapter '+ch.n+' — '+esc(ch.title)+'</h2><p class="chapter-sub">'+ch.skills.length+' skill'+(ch.skills.length===1?'':'s')+'</p>');
  for(const s of ch.skills){
    out.push('<h3 class="skill-h" id="s-'+s.name+'">'+esc(s.name)+'</h3><p class="skill-desc">'+esc(s.desc)+'</p><div class="skill-body">'+md(s.body)+'</div>');
  }
}
toc.push('<div class="part">Part II — The Anti-Pattern Almanac</div>');
toc.push('<a href="#almanac">'+DATA.stats.rules+' rules from all '+DATA.stats.skills+' skills</a>');
out.push('<h2 class="chapter" id="almanac">Part II — The Anti-Pattern Almanac</h2>');
out.push('<p><span class="rule-count">'+DATA.stats.rules+'</span> rules of professional judgment — every skill in the library ends with the mistakes that make smart people produce weak work. Collected, they read as one long answer to "what does experience actually know?"</p>');
for(const a of DATA.almanac){
  out.push('<div class="alm-skill"><h4>'+esc(a.name)+'</h4><ul>'+a.items.map(i=>'<li>'+md(i).replace(/^<p>|<\\/p>\\n?$/g,'')+'</li>').join('')+'</ul></div>');
}
document.getElementById('toc').innerHTML=toc.join('');
document.getElementById('body').innerHTML=out.join('');
if(window.pmTrack) pmTrack('handbook/open');
</script>
<script src="nav.js"></script>
</body>
</html>
`;
writeFileSync(join(root, 'web', 'handbook.html'), html);
const kb = Math.round(html.length / 1024);
console.log(`Wrote web/handbook.html — ${payload.stats.chapters} craft chapters (${production.size} production skills in full) + almanac of ${ruleCount} rules from ${skills.length} skills (${kb} KB).`);
