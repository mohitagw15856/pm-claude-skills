#!/usr/bin/env node
// Profession landing pages → web/for/<slug>.html + web/for/index.html.
// The long-tail front door: "AI skills for construction managers" is what a
// construction manager actually searches — none of them search "agent skills
// library". One page per profession: the pitch in their vocabulary, their
// bundle's skills, and the playground CTA. Regenerated from skills.json.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { skills } = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));

// Curated profession map — slug, audience-voiced title, bundles, and the pitch.
const PROFESSIONS = [
  ['construction-managers', 'Construction Managers & Contractors', ['pm-construction'], 'Bid reviews that catch front-loading, change orders that hold up, punch lists that close jobs, and delay claims with the notice clause cited.'],
  ['hardware-engineers', 'Hardware & Manufacturing Teams', ['pm-hardware'], 'EVT/DVT/PVT gates with real exit criteria, BOM reviews that flag the single-source traps, and 8D failure analysis that finds the actual root cause.'],
  ['supply-chain', 'Supply Chain & Procurement', ['pm-supplychain'], 'RFP scoring that survives an audit, supplier scorecards with teeth, and S&OP readouts that end in decisions.'],
  ['sustainability-teams', 'Sustainability & ESG Teams', ['pm-climate'], 'GHG inventories that never net offsets against the gross line, CSRD-shaped disclosures, and a greenwashing audit that runs before the regulator does.'],
  ['insurance-professionals', 'Insurance Professionals', ['pm-insurance'], 'Claims triage with coverage triggers checked, underwriting narratives that hold together, and coverage-gap analysis clients can act on.'],
  ['bankers-lenders', 'Credit & Lending Teams', ['pm-banking'], 'Credit memos with covenant headroom computed, compliance escalations documented properly, and portfolio briefs that name the watch list.'],
  ['product-managers', 'Product Managers', ['pm-essentials', 'pm-discovery', 'pm-planning'], 'PRDs your engineers can build from, prioritisation that shows its math, and discovery synthesis that finds the theme.'],
  ['engineers', 'Software Engineers & EMs', ['pm-engineering'], 'Blameless postmortems that find systems, ADRs that survive re-reads, runbooks your on-call can follow at 3am.'],
  ['founders', 'Founders', ['pm-founders', 'pm-money'], 'Board packs, investor updates that build the next round, unit economics with the assumptions labeled.'],
  ['customer-success', 'Customer Success Teams', ['pm-cs'], 'Health scorecards, QBR decks, renewal playbooks, and escalation briefs that get exec attention.'],
  ['marketers', 'Marketers & GTM Teams', ['pm-gtm', 'pm-pmm', 'pm-growth'], 'Positioning that names the real alternative, launch plans with owners, and messaging with proof points.'],
  ['sales-teams', 'Sales Teams', ['pm-sales'], 'Battlecards, discovery frameworks, demo scripts that lead with the pain, and win/loss analysis that changes behavior.'],
  ['designers', 'Designers & UX', ['pm-design', 'pm-figma', 'pm-uxwriting'], 'Design critiques, accessibility audits, UX copy with a voice, and handoffs that engineers thank you for.'],
  ['data-analysts', 'Data & Analytics Teams', ['pm-analytics', 'pm-data', 'pm-dataeng'], 'Analyses that answer so-what, retention and cohort work with honest denominators, and metric definitions that stop the arguments.'],
  ['hr-people-teams', 'HR & People Teams', ['pm-hr', 'pm-people', 'pm-recruiting'], 'Performance reviews, career ladders, structured interviews, and the difficult-conversation prep everyone postpones.'],
  ['legal-teams', 'Legal & Contract Teams', ['pm-legal'], 'Contract reviews, redline summaries, and the opposing-counsel stress test before the other side runs it for real.'],
  ['finance-teams', 'Finance & FP&A', ['pm-finance', 'pm-accounting', 'pm-calculators'], 'Budgets, variance analysis, forecasts with stated assumptions, and calculators whose outputs are CI-tested.'],
  ['consultants', 'Consultants & Agencies', ['pm-consulting'], 'Proposals, engagement letters, workshop designs, and readouts that clients quote back.'],
  ['support-teams', 'Support Teams', ['pm-support'], 'Macros with empathy, escalation summaries, incident comms, and knowledge-base articles people actually find.'],
  ['educators', 'Educators & Trainers', ['pm-education'], 'Lesson plans, rubrics, feedback that improves the work, and curriculum design with honest learning objectives.'],
  ['healthcare-professionals', 'Healthcare Operations', ['pm-health'], 'Clinical-adjacent operations writing: intake summaries, protocols, and communications — analytical support, never medical determinations.'],
  ['real-estate', 'Real Estate Professionals', ['pm-realestate'], 'Listings that sell the story, market analyses, and transaction checklists that keep deals alive.'],
  ['ecommerce-operators', 'E-commerce Operators', ['pm-ecommerce'], 'Product pages that convert, category briefs, promo calendars, and marketplace operations.'],
  ['content-creators', 'Writers & Content Creators', ['pm-writers', 'pm-copy', 'pm-creator', 'pm-social'], 'Drafts with a voice, repurposing pipelines, brand kits, and scripts with hooks that hold.'],
  ['nonprofit-teams', 'Nonprofit Teams', ['pm-nonprofit'], 'Grant narratives, donor communications, impact reports, and board materials on a volunteer budget.'],
  ['operations', 'Operations Teams', ['pm-operations', 'pm-compliance'], 'SOPs someone can actually follow, vendor management, compliance checklists, and process docs with owners.'],
  ['researchers', 'Researchers', ['pm-research'], 'Study designs, synthesis with provenance, literature structure, and findings that decision-makers read.'],
  ['job-seekers', 'Job Seekers', ['pm-jobsearch', 'pm-personal'], 'Resumes that survive the six-second scan, cover letters with a spine, interview prep, and offer comparison with real math.'],
  ['everyone', 'Everyone Signing Things', ['pm-decoders', 'pm-lifeadmin'], 'Your lease, medical bill, job offer, and terms of service — decoded into plain English with the red flags ranked.'],
];

const BASE = 'https://mohitagw15856.github.io/pm-claude-skills';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const outDir = join(root, 'web', 'for');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const page = ([slug, title, bundles, pitch]) => {
  const list = skills.filter((s) => bundles.includes(s.plugin)).slice(0, 14);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AI skills for ${esc(title)} — free, open-source, runs in your browser</title>
<meta name="description" content="${esc(pitch)} ${list.length}+ free open-source AI skills for ${esc(title.toLowerCase())} — work with Claude, ChatGPT, Gemini and Cursor, no signup." />
<link rel="canonical" href="${BASE}/for/${slug}.html" />
<meta property="og:title" content="AI skills for ${esc(title)}" />
<meta property="og:description" content="${esc(pitch)}" />
<meta property="og:image" content="${BASE}/docs-assets/professions-hero.png" />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: `What are AI skills for ${title.toLowerCase()}?`, acceptedAnswer: { '@type': 'Answer', text: `${pitch} Each skill is an open-source SKILL.md file that teaches Claude, ChatGPT, Gemini, or Cursor the structure a senior professional uses — free, no signup.` } },
    { '@type': 'Question', name: 'Are they really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — MIT-licensed, usable in the browser playground with sponsored runs or your own API key, and copyable into any AI tool.' } },
  ],
})}</script>
<link rel="stylesheet" href="../styles.css" />
<style>
  .p-wrap { max-width: 780px; margin: 0 auto; padding: 16px 22px 70px; }
  .p-hero { text-align: center; margin: 30px 0 22px; }
  .p-hero h2 { font-size: 30px; margin: 0 0 10px; }
  .p-hero p { color: #c7cfda; font-size: 15.5px; }
  .sk { border: 1px solid var(--border); border-radius: 12px; background: var(--panel); padding: 12px 16px; margin: 8px 0; }
  .sk a { color: var(--accent); font-weight: 700; text-decoration: none; }
  .sk .d { color: #aab4c0; font-size: 13px; margin-top: 3px; }
  .cta { text-align: center; margin: 26px 0; }
</style>
</head>
<body>
<header class="topbar">
  <div class="brand"><img src="../assets/product-notes.jpg" alt="" class="brand-logo" />
    <div class="brand-text"><h1>PM Skills</h1><p class="tagline">for ${esc(title)}</p></div></div>
</header>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<div class="p-wrap">
  <div class="p-hero">
    <h2>AI that knows how ${esc(title.toLowerCase())} actually work</h2>
    <p>${esc(pitch)} Free and open-source — each skill teaches Claude, ChatGPT, Gemini, or Cursor the structure a senior professional uses, with the quality checks and the mistakes to avoid built in.</p>
  </div>
  <div class="cta"><a class="primary" style="display:inline-block;text-decoration:none;padding:12px 26px;border-radius:11px" href="../index.html">▶ Run any of these free, right now</a></div>
  ${list.map((s) => `<div class="sk"><a href="../skill/${s.name}.html">${esc(s.title)}</a><div class="d">${esc(s.summary)} · <a href="../index.html?skill=${s.name}">run it →</a></div></div>`).join('\n  ')}
  <div class="cta" style="color:var(--muted);font-size:13px">All ${skills.length} skills · <a href="../catalog.html">browse the catalog</a> · <a href="https://github.com/mohitagw15856/pm-claude-skills">GitHub</a> (MIT, free forever)</div>
</div>
<script src="../i18n.js"></script>
<script src="../nav.js"></script>
</body>
</html>
`;
};

for (const p of PROFESSIONS) writeFileSync(join(outDir, `${p[0]}.html`), page(p));
writeFileSync(join(outDir, 'index.html'), `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AI skills by profession — ${PROFESSIONS.length} fields covered</title>
<meta name="description" content="Free open-source AI skills, organized by profession: ${PROFESSIONS.map((p) => p[1]).slice(0, 8).join(', ')} and more." />
<link rel="stylesheet" href="../styles.css" /></head>
<body>
<header class="topbar"><div class="brand"><img src="../assets/product-notes.jpg" alt="" class="brand-logo" /><div class="brand-text"><h1>By profession</h1><p class="tagline">${PROFESSIONS.length} fields, one library</p></div></div></header>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<div style="max-width:780px;margin:0 auto;padding:20px 22px 70px">
${PROFESSIONS.map((p) => `  <div style="padding:10px 0;border-bottom:1px solid var(--border)"><a style="color:var(--accent);font-weight:700;text-decoration:none" href="${p[0]}.html">${esc(p[1])}</a><div style="color:#aab4c0;font-size:13px">${esc(p[3])}</div></div>`).join('\n')}
</div>
<script src="../i18n.js"></script><script src="../nav.js"></script>
</body></html>
`);
console.log(`Wrote ${PROFESSIONS.length} profession pages + index → web/for/`);
