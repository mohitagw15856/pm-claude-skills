#!/usr/bin/env node
// Renders web/leaderboard.html from evals/results.json (or evals/results.example.json
// as a clearly-labelled placeholder). Run after evals/run-evals.mjs. No dependencies.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

const real = join(root, 'evals', 'results.json');
const example = join(root, 'evals', 'results.example.json');
const src = existsSync(real) ? real : example;
const data = JSON.parse(readFileSync(src, 'utf8'));
const isExample = !!data.example || src === example;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const skills = [...new Set(data.results.map((r) => r.skill))].sort();
const models = data.models || [...new Set(data.results.map((r) => r.model))];
const cell = (skill, model) => data.results.find((r) => r.skill === skill && r.model === model);
const colour = (v) => v >= 4.5 ? '#6ee7b7' : v >= 4 ? '#93c5fd' : v >= 3 ? '#fcd34d' : '#fca5a5';

const modelAvg = (m) => {
  const xs = data.results.filter((r) => r.model === m).map((r) => r.overall);
  return xs.length ? (xs.reduce((a, b) => a + b, 0) / xs.length) : 0;
};

const headRow = `<tr><th>Skill</th>${models.map((m) => `<th>${esc(m)}</th>`).join('')}</tr>`;
const rows = skills.map((s) => `<tr><td class="skill">${esc(s)}</td>${models.map((m) => {
  const c = cell(s, m);
  return c ? `<td><span class="score" style="color:${colour(c.overall)}">${c.overall.toFixed(2)}</span></td>` : '<td class="na">—</td>';
}).join('')}</tr>`).join('\n');
const avgRow = `<tr class="avg"><td>Average</td>${models.map((m) => `<td><strong>${modelAvg(m).toFixed(2)}</strong></td>`).join('')}</tr>`;

const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Skill Leaderboard — how pm-claude-skills score across Claude models</title>
<meta name="description" content="LLM-judged quality scores for professional Agent Skills across Claude models, on structure, completeness, usefulness, and grounding." />
<style>
  :root{--bg:#0f1115;--panel:#161a21;--panel2:#1d222b;--border:#2a313c;--text:#e7ebf0;--muted:#95a0b0;--accent2:#e89b82}
  html[data-theme="light"]{--bg:#f7f6f3;--panel:#fff;--panel2:#f1efe9;--border:#e4e0d8;--text:#1b2027;--muted:#667085}
  html[data-theme="light"] .toolbar-nav{background:rgba(255,255,255,.75)}
  body{margin:0;background:var(--bg);color:var(--text);font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  a{color:var(--accent2)} header{padding:28px 22px;border-bottom:1px solid var(--border);background:var(--panel)}
  header h1{margin:0 0 6px;font-size:23px} header p{margin:0;color:var(--muted);font-size:14px}
  .toolbar-nav{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:12px 22px;background:rgba(13,15,20,.7);border-bottom:1px solid var(--border)}
  .toolbar-nav .tool{font-size:13px;font-weight:600;text-decoration:none;padding:7px 14px;border-radius:99px;color:var(--muted);border:1px solid transparent;white-space:nowrap;transition:color .12s,background .12s,border-color .12s}
  .toolbar-nav .tool:hover{color:var(--text);background:var(--panel2);border-color:var(--border)}
  .toolbar-nav .tool.active{background:linear-gradient(135deg,#e0855f,#d9605a);color:#1a1207;border-color:transparent}
  main{max-width:900px;margin:0 auto;padding:22px}
  .banner{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.4);color:#fcd34d;padding:12px 14px;border-radius:10px;margin-bottom:18px;font-size:13.5px}
  table{width:100%;border-collapse:collapse;font-size:14px}
  th,td{padding:10px 12px;text-align:center;border-bottom:1px solid var(--border)}
  th:first-child,td:first-child{text-align:left}
  th{color:var(--accent2);font-size:12px;text-transform:uppercase;letter-spacing:.04em}
  td.skill{font-weight:600} .score{font-weight:700} .na{color:var(--muted)}
  tr.avg td{border-top:2px solid var(--border);color:var(--muted)}
  .meta{color:var(--muted);font-size:12.5px;margin-top:16px}
</style></head><body>
<header>
  <h1>🏆 Skill Leaderboard</h1>
  <p>LLM-judged quality (1–5) for each skill across Claude models — scored on structure, completeness, usefulness &amp; grounding by <code>${esc(data.judge || 'an LLM judge')}</code>.</p>
</header>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<script src="nav.js"></script>
<main>
  ${isExample ? '<div class="banner">⚠️ <strong>Example data</strong> — illustrative scores so this page renders. Run <code>ANTHROPIC_API_KEY=… node evals/run-evals.mjs</code> then <code>node scripts/build-leaderboard.mjs</code> for real numbers.</div>' : ''}
  <table>
    <thead>${headRow}</thead>
    <tbody>
${rows}
${avgRow}
    </tbody>
  </table>
  <p class="meta">Higher is better (max 5). ${esc(skills.length)} skills × ${esc(models.length)} models${data.generatedAt ? ` · generated ${esc(String(data.generatedAt).slice(0, 10))}` : ''}. Methodology and cases in <a href="${REPO}/tree/main/evals">evals/</a>.</p>
</main></body></html>
`;

writeFileSync(join(root, 'web', 'leaderboard.html'), html);
console.log(`Wrote web/leaderboard.html — ${skills.length} skills × ${models.length} models${isExample ? ' (EXAMPLE data)' : ''}.`);
