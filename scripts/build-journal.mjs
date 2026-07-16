#!/usr/bin/env node
// The Operator's Journal — a printable, fill-in-the-blank analog workbook.
// Distinct from the deck (a reference) and the Handbook (a read): this is a
// WORKING notebook where each spread is a real skill's structure, with lined
// space to draft the artifact by hand. Generates a print-ready A4 HTML from the
// skills' own "Output Format / Template Structure" sections; render to PDF with
// web/docs-assets/shoot.mjs-style Playwright, or just open and Print → Save PDF.
//
//   node scripts/build-journal.mjs            # → docs/print/journal.html
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'docs', 'print', 'journal.html');
const skills = (JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills) || [];

// Curated, high-utility skills that make good hand-drafting spreads.
const WANT = ['prd-template', 'executive-update', 'incident-postmortem', 'one-pager', 'meeting-notes',
  'rice-prioritisation', 'competitor-teardown', 'okr-builder', 'stakeholder-update', 'product-launch-checklist',
  'user-research-synthesis', 'go-to-market-planner', 'press-release', 'cover-letter', 'sprint-planning',
  'decision-forensics', 'win-loss-analysis', 'performance-review', 'business-model-canvas', 'pitch-deck'];
const chosen = WANT.map((n) => skills.find((s) => s.name === n)).filter(Boolean);

const esc = (s) => String(s == null ? '' : s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// Pull the section headings a skill produces (its output structure) from the SKILL body.
function sections(instr) {
  const out = [];
  const body = (instr || '');
  // Prefer the "Output Format" / "Template Structure" block; fall back to all H2/H3.
  const lines = body.split('\n');
  let inFmt = false;
  for (const l of lines) {
    if (/^#{1,3}\s+(Output Format|Template Structure|Structure|The (Output|Deliverable))/i.test(l)) { inFmt = true; continue; }
    if (inFmt && /^#{1,3}\s+(Quality Checks|Anti-Patterns|Required Inputs|Process|Examples|Deeper)/i.test(l)) break;
    const m = l.match(/^\s*(?:#{2,4}|\*\*|\d+\.)\s*([A-Z][^\n*:#]{2,48})/);
    if (inFmt && m) out.push(m[1].trim().replace(/\*+$/, ''));
  }
  // If no explicit format block, grab the numbered/bulleted headings anywhere.
  if (out.length < 3) {
    for (const l of lines) { const m = l.match(/^\s*(?:#{2,4})\s+([A-Z][^\n#]{2,48})/); if (m && !/Skill$|Inputs|Anti-Pattern|Quality|Process|Example/i.test(m[1])) out.push(m[1].trim()); }
  }
  return [...new Set(out)].slice(0, 8);
}

const spread = (s, i) => {
  const secs = sections(s.instructions);
  const blanks = secs.length ? secs : ['Context', 'The core', 'Details', 'Risks / open questions', 'Next steps'];
  return `<section class="spread">
  <div class="hd"><span class="num">${String(i + 1).padStart(2, '0')}</span><div><h2>${esc(s.title)}</h2><p class="sub">${esc((s.summary || s.description || '').split(/(?<=[.!?])\s/)[0])}</p></div></div>
  <p class="prompt">Draft it by hand — fill each section below. (Digital version: <b>${esc(s.name)}</b> in the playground.)</p>
  ${blanks.map((b) => `<div class="field"><div class="label">${esc(b)}</div>${'<div class="rule"></div>'.repeat(3)}</div>`).join('')}
</section>`;
};

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>The Operator's Journal</title><style>
@page{size:A4;margin:0}*{box-sizing:border-box}
body{margin:0;font-family:Georgia,"Times New Roman",serif;color:#1a1a1a;background:#fff}
.cover{height:297mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;page-break-after:always;background:linear-gradient(160deg,#f5f2ea,#eae4d6)}
.cover h1{font-size:44pt;margin:0}.cover .s{font-size:15pt;color:#555;margin-top:10px;max-width:150mm}
.cover .meta{margin-top:26px;font-size:11pt;color:#777}
.spread{min-height:297mm;padding:22mm 20mm;page-break-after:always}
.hd{display:flex;gap:16px;align-items:flex-start;border-bottom:2px solid #c9a227;padding-bottom:12px}
.num{font-size:34pt;font-weight:700;color:#c9a227;line-height:1}
h2{font-size:22pt;margin:0}.sub{margin:4px 0 0;color:#555;font-size:11.5pt}
.prompt{font-size:10.5pt;color:#777;margin:12px 0 18px;font-style:italic}
.field{margin:0 0 16px}.label{font-size:11pt;font-weight:700;color:#333;margin-bottom:10px;text-transform:uppercase;letter-spacing:.04em}
.rule{border-bottom:1px solid #ccc;height:26px}
.foot{position:fixed;bottom:10mm;left:20mm;right:20mm;font-size:8.5pt;color:#aaa;text-align:center}
</style></head><body>
<div class="cover"><h1>The Operator's Journal</h1><div class="s">A working notebook for professional judgment — ${chosen.length} skills, one spread each, drafted by your own hand.</div><div class="meta">PM Skills · MIT · mohitagw15856.github.io/pm-claude-skills</div></div>
${chosen.map(spread).join('\n')}
</body></html>`;

if (!existsSync(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`Wrote docs/print/journal.html — ${chosen.length} skill spreads. Open and Print → Save as PDF, or render with Playwright.`);
