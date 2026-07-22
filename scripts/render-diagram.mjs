#!/usr/bin/env node
// render-diagram — turn the Mermaid a diagram skill produces into a real,
// committable image (SVG/PNG), or a self-contained HTML preview. The 13 diagram
// skills (architecture-diagram, sequence-diagram, flowchart, gantt-roadmap, …)
// emit Mermaid that renders natively in Claude, Cowork, and GitHub — but not in
// email, a slide, or a PDF. This closes that gap: Mermaid → an image file.
//
//   node scripts/render-diagram.mjs diagram.mmd                 # → diagram.html (self-contained preview)
//   node scripts/render-diagram.mjs report.md --svg -o arch.svg # extract the ```mermaid block → SVG (needs mermaid-cli)
//   echo "graph TD; A-->B" | node scripts/render-diagram.mjs --png -o flow.png
//
// SVG/PNG use @mermaid-js/mermaid-cli via npx (rendered locally in headless
// Chromium — nothing uploaded). HTML output needs no dependency at all.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename } from 'node:path';

const args = process.argv.slice(2);
const flag = (n) => args.includes('--' + n);
// Output path: -o <file> or --out <file>.
const outIdx = Math.max(args.indexOf('-o'), args.indexOf('--out'));
const out = outIdx >= 0 && args[outIdx + 1] ? args[outIdx + 1] : null;
// Source = the lone positional that isn't a flag or the -o value.
const src = args.find((a, i) => !a.startsWith('-') && args[i - 1] !== '-o' && args[i - 1] !== '--out');

// Load the source: a file, or stdin.
let raw = '';
try { raw = src ? readFileSync(src, 'utf8') : readFileSync(0, 'utf8'); }
catch { console.error('Provide a .mmd/.md file or pipe Mermaid on stdin.'); process.exit(1); }

// Extract the Mermaid: a fenced ```mermaid block if present, else the whole input.
const fence = raw.match(/```mermaid\s*([\s\S]*?)```/i);
const mermaid = (fence ? fence[1] : raw).trim();
if (!mermaid) { console.error('No Mermaid found.'); process.exit(1); }
if (!/^(graph|flowchart|sequenceDiagram|gantt|classDiagram|stateDiagram|erDiagram|journey|mindmap|pie|timeline|gitGraph|quadrantChart)/m.test(mermaid)) {
  console.error('Input does not look like Mermaid (no known diagram header). Rendering anyway.');
}

const want = flag('svg') ? 'svg' : flag('png') ? 'png' : 'html';

if (want === 'html') {
  const file = out || (src ? basename(src).replace(/\.[^.]+$/, '') + '.html' : 'diagram.html');
  // Self-contained preview: pinned mermaid, renders on open. No build step, no repo dep.
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${file}</title>
<style>body{margin:0;display:grid;place-items:center;min-height:100vh;background:#fff}.mermaid{max-width:96vw}</style>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script>window.addEventListener('DOMContentLoaded',()=>window.mermaid&&mermaid.initialize({startOnLoad:true}));</script>
</head><body><pre class="mermaid">\n${mermaid}\n</pre></body></html>`;
  writeFileSync(file, html);
  console.log(`Wrote ${file} — open in a browser to view/print. For an image file: --svg or --png (uses mermaid-cli).`);
  process.exit(0);
}

// SVG/PNG via mermaid-cli (mmdc). Rendered locally; falls back with a clear message.
const tmp = `${process.env.TMPDIR || '/tmp'}/pm-diagram-${Date.now()}.mmd`;
writeFileSync(tmp, mermaid);
const target = out || `diagram.${want}`;
try {
  execFileSync('npx', ['-y', '@mermaid-js/mermaid-cli', '-i', tmp, '-o', target, '-b', 'white'], { stdio: 'inherit' });
  console.log(`Wrote ${target} (${want.toUpperCase()}) — rendered locally, nothing uploaded.`);
} catch (e) {
  console.error(`Could not render ${want.toUpperCase()} via @mermaid-js/mermaid-cli (${e.message}).\n` +
    `Install it once (npm i -g @mermaid-js/mermaid-cli) or use the HTML output (drop --${want}), which needs no dependency.`);
  process.exit(1);
}
