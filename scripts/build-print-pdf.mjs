// Printable one-pagers (reach idea #8).
//
// Renders a skill's SKILL.md to a clean, print-friendly PDF — for the people
// who need PAPER: a grief checklist on the fridge, a go-bag list, a
// what-to-pay-first triage on the kitchen table. Output: print/<skill>.pdf
//
// Usage:
//   node scripts/build-print-pdf.mjs notify-everyone-of-a-death go-bag-builder
//   PW_EXEC=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/build-print-pdf.mjs <skill>
//
// If playwright isn't installed locally, point at a global install — either
//   NODE_PATH=/opt/node22/lib/node_modules   (lets the require.resolve fallback find it)
// or PLAYWRIGHT_PATH=/path/to/playwright/index.mjs  (an entry FILE, not the package dir —
//   ESM can't import a bare directory).
//
// No markdown dependency: a small, deliberate converter covers the subset
// SKILL.md uses (headings, lists, checkboxes, bold/italic/code, tables,
// paragraphs). Playwright renders HTML -> PDF; PW_EXEC points it at a local
// Chromium when the pinned headless-shell isn't installed. No eval, no shell.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'print');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = s => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // links -> text (paper has no links)

// Strip frontmatter; return {name, description, body}.
export function parseSkill(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm = m ? m[1] : '', body = m ? m[2] : md;
  const name = (fm.match(/^name:\s*(.+)$/m) || [, ''])[1].trim();
  const description = (fm.match(/description:\s*"([^"]*)"/) || [, ''])[1];
  return { name, description, body };
}

export function mdToHtml(body) {
  const out = []; let list = null, table = null, para = [];
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const flushTable = () => { if (table) { out.push('</tbody></table>'); table = null; } };
  for (const raw of body.split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim()) { flushPara(); flushList(); flushTable(); continue; }
    let h;
    if ((h = line.match(/^(#{1,6})\s+(.*)$/))) { flushPara(); flushList(); flushTable(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    if (/^\|/.test(line)) {
      flushPara(); flushList();
      if (/^\|\s*-{2,}/.test(line)) continue; // separator row
      const cells = line.split('|').slice(1, -1).map(c => inline(c.trim()));
      if (!table) { table = true; out.push(`<table><thead><tr>${cells.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>`); }
      else out.push(`<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`);
      continue;
    }
    flushTable();
    let li;
    if ((li = line.match(/^\s*[-*]\s+\[( |x)\]\s+(.*)$/))) { flushPara(); if (list !== 'ul') { flushList(); list = 'ul'; out.push('<ul class="check">'); } out.push(`<li><span class="box">${li[1] === 'x' ? '☑' : '☐'}</span> ${inline(li[2])}</li>`); continue; }
    if ((li = line.match(/^\s*[-*]\s+(.*)$/))) { flushPara(); if (list !== 'ul') { flushList(); list = 'ul'; out.push('<ul>'); } out.push(`<li>${inline(li[1])}</li>`); continue; }
    if ((li = line.match(/^\s*\d+\.\s+(.*)$/))) { flushPara(); if (list !== 'ol') { flushList(); list = 'ol'; out.push('<ol>'); } out.push(`<li>${inline(li[1])}</li>`); continue; }
    if (/^>\s?/.test(line)) { flushPara(); flushList(); out.push(`<blockquote>${inline(line.replace(/^>\s?/, ''))}</blockquote>`); continue; }
    para.push(line.trim());
  }
  flushPara(); flushList(); flushTable();
  return out.join('\n');
}

export function pageHtml({ name, description, body }) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(name)}</title>
<style>
 @page{margin:18mm 16mm} body{font:11.5pt/1.45 Georgia,"Times New Roman",serif;color:#111;max-width:180mm}
 h1{font:700 20pt/1.2 Helvetica,Arial,sans-serif;margin:0 0 4pt} h2{font:700 13pt/1.3 Helvetica,Arial,sans-serif;margin:16pt 0 6pt;border-bottom:1px solid #999;padding-bottom:2pt}
 h3{font:700 11.5pt Helvetica,Arial,sans-serif;margin:12pt 0 4pt} .desc{color:#444;font-style:italic;margin:0 0 10pt}
 ul,ol{margin:4pt 0 8pt 18pt;padding:0} li{margin:2pt 0} ul.check{list-style:none;margin-left:2pt} .box{display:inline-block;width:14pt}
 table{border-collapse:collapse;width:100%;margin:6pt 0;font-size:10pt} th,td{border:1px solid #888;padding:3pt 5pt;vertical-align:top;text-align:left}
 code{font:10pt Menlo,Consolas,monospace;background:#f2f2f2;padding:0 2pt} blockquote{margin:6pt 0;padding:4pt 8pt;border-left:3px solid #999;color:#333}
 .foot{margin-top:18pt;padding-top:6pt;border-top:1px solid #999;font:9pt Helvetica,Arial,sans-serif;color:#555}
</style></head><body>
<h1>${esc(name.replace(/-/g, ' '))}</h1><p class="desc">${esc(description)}</p>
${mdToHtml(body)}
<div class="foot">Printed from PM Skills — an open-source, MIT-licensed library · github.com/mohitagw15856/pm-claude-skills · Educational, not legal, medical or financial advice — confirm specifics locally.</div>
</body></html>`;
}

async function main(names) {
  if (!names.length) { console.error('usage: node scripts/build-print-pdf.mjs <skill> [<skill>...]'); process.exit(2); }
  const pwPath = process.env.PLAYWRIGHT_PATH || 'playwright';
  const pw = await import(pwPath).catch(() => import(require.resolve('playwright')));
  const chromium = pw.chromium || pw.default?.chromium;
  const browser = await chromium.launch(process.env.PW_EXEC ? { executablePath: process.env.PW_EXEC } : undefined);
  mkdirSync(OUT_DIR, { recursive: true });
  let n = 0;
  for (const name of names) {
    const f = join(ROOT, 'skills', name, 'SKILL.md');
    if (!existsSync(f)) { console.error(`✗ no such skill: ${name}`); continue; }
    const page = await browser.newPage();
    await page.setContent(pageHtml(parseSkill(readFileSync(f, 'utf8'))), { waitUntil: 'load' });
    await page.pdf({ path: join(OUT_DIR, `${name}.pdf`), format: 'A4', printBackground: true });
    await page.close(); n++; console.log(`✓ print/${name}.pdf`);
  }
  await browser.close();
  console.log(`Wrote ${n} printable PDF(s) → print/`);
}

const argv = process.argv.slice(2);
if (argv.includes('--selftest')) {
  const p = parseSkill('---\nname: x\ndescription: "d"\n---\n## A\n- [ ] one\n| h | i |\n|---|---|\n| 1 | 2 |\n');
  const html = mdToHtml(p.body);
  const ok = p.name === 'x' && html.includes('<h2>A</h2>') && html.includes('☐') && html.includes('<th>h</th>') && html.includes('<td>2</td>');
  console.log(`build-print-pdf self-test: ${ok ? '5 passed · 0 failed' : 'FAILED'}`); process.exit(ok ? 0 : 1);
}
main(argv);
