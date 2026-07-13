#!/usr/bin/env node
// The Operator's Deck — generate a print-ready deck of skill cards (web/deck.html).
// One poker-sized card per skill: bundle, title, one-liner, and a QR that opens the
// skill in the playground. Print to PDF, cut along the guides — a physical object
// that puts the library on someone's desk. QR SVGs are baked in (self-contained, no
// runtime dependency); the qrcode lib is only needed to (re)generate.
//
//   npm i qrcode   # once, if not installed
//   node scripts/build-deck.mjs [--count 54]
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const countArg = process.argv.indexOf('--count');
const COUNT = countArg > 0 ? parseInt(process.argv[countArg + 1], 10) || 54 : 54;

const raw = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const all = Array.isArray(raw) ? raw : raw.skills || [];

// A real deck is ~54 cards: pick the strongest — production tier first, then by
// eval score, then a stable name sort — and spread across bundles for variety.
const tierRank = (t) => (t === 'production' ? 0 : t === 'stable' ? 1 : 2);
const top = all
  .slice()
  .sort((a, b) => tierRank(a.tier) - tierRank(b.tier) || ((b.eval && b.eval.score) || 0) - ((a.eval && a.eval.score) || 0) || a.name.localeCompare(b.name))
  .slice(0, COUNT);

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const oneLiner = (s) => (s.summary || s.description || '').split(/(?<=[.!?])\s/)[0];

const cards = await Promise.all(
  top.map(async (s) => {
    const url = `${SITE}/?skill=${encodeURIComponent(s.name)}`;
    const qr = await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });
    return `<div class="card">
      <div class="c-top"><span class="c-bundle">${esc(s.plugin || '')}</span>${s.eval && s.eval.score ? `<span class="c-eval">★ ${s.eval.score}</span>` : ''}</div>
      <div class="c-title">${esc(s.title || s.name)}</div>
      <div class="c-desc">${esc(oneLiner(s)).slice(0, 130)}</div>
      <div class="c-qr">${qr}</div>
      <div class="c-foot"><span>pm-claude-skills</span><span class="c-name">${esc(s.name)}</span></div>
    </div>`;
  })
);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>The Operator's Deck — ${top.length} printable skill cards | PM Skills</title>
<meta name="description" content="A print-ready deck of professional skill cards — scan a card's QR to run that skill. Print to PDF, cut along the guides, keep the library on your desk." />
<link rel="stylesheet" href="styles.css" />
<style>
  .screen-only { max-width: 760px; margin: 0 auto; padding: 18px 22px 6px; }
  .screen-only h1 { font-size: 24px; margin: 6px 0; }
  .screen-only p { color: var(--muted); font-size: 14px; }
  .deck { display: grid; grid-template-columns: repeat(3, 2.5in); gap: 0.14in; justify-content: center; padding: 0.2in; }
  .card {
    width: 2.5in; height: 3.5in; box-sizing: border-box; padding: 0.16in 0.16in 0.12in;
    border: 1px solid #c9ccd2; border-radius: 0.14in; background: #fff; color: #14161b;
    display: flex; flex-direction: column; page-break-inside: avoid; overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
  }
  .c-top { display: flex; justify-content: space-between; align-items: center; }
  .c-bundle { font-size: 8.5px; letter-spacing: .04em; text-transform: uppercase; color: #d9605a; font-weight: 700; }
  .c-eval { font-size: 9px; font-weight: 700; color: #0a7d55; }
  .c-title { font-size: 15px; font-weight: 800; line-height: 1.15; margin: 6px 0 4px; }
  .c-desc { font-size: 9.5px; line-height: 1.4; color: #4a4f57; flex: 1; }
  .c-qr { display: flex; justify-content: center; margin: 4px 0; }
  .c-qr svg { width: 1.15in; height: 1.15in; }
  .c-foot { display: flex; justify-content: space-between; align-items: center; font-size: 7.5px; color: #9aa0a8; border-top: 1px solid #ececee; padding-top: 4px; }
  .c-name { font-family: ui-monospace, Menlo, monospace; color: #6b7078; }
  @media print {
    .screen-only, .topbar, .toolbar-nav, .key-note { display: none !important; }
    body { background: #fff; }
    .deck { padding: 0; gap: 0.1in; }
    .card { border: 1px dashed #bbb; }
    @page { size: Letter; margin: 0.35in; }
  }
</style>
</head>
<body>
<header class="topbar">
  <div class="brand"><img src="assets/product-notes.jpg" alt="Product Notes" class="brand-logo" /><div class="brand-text"><h1>The Operator's Deck</h1><p class="tagline">${top.length} skills, as physical cards.</p></div></div>
</header>
<nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
<div class="key-note">🃏 A print-ready deck — scan a card's QR to run that skill. <b>Print to PDF</b> (⌘/Ctrl+P), then cut along the dashed guides.</div>
<div class="screen-only">
  <h1>Print this deck</h1>
  <p>Hit <b>⌘/Ctrl+P → Save as PDF</b> (Letter, default margins). Each card is poker-sized (2.5″×3.5″), 9 per page. Cut along the dashed lines and keep the library on your desk — every card's QR opens that skill in the browser. Regenerate with <code>node scripts/build-deck.mjs</code>.</p>
</div>
<div class="deck">
${cards.join('\n')}
</div>
<script src="nav.js"></script>
</body>
</html>
`;

writeFileSync(join(root, 'web', 'deck.html'), html);
console.log(`Wrote web/deck.html — ${top.length} skill cards with baked QR codes.`);
