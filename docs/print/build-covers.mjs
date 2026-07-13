#!/usr/bin/env node
// Renders print covers: the Handbook wrap (front/spine/back, 6x9" + bleed) and
// (--deck) the Operator's Deck 9-up sheets. Playwright via PLAYWRIGHT_PATH.
//   node docs/print/build-covers.mjs [--pages 350] [--deck]
import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] && !process.argv[i+1].startsWith('--') ? process.argv[i + 1] : d; };
const pages = +arg('pages', 350);
const spineIn = (pages * 0.002252).toFixed(3);            // Lulu/KDP white paper formula
const W = (0.125 + 6 + +spineIn + 6 + 0.125).toFixed(3);  // bleed+back+spine+front+bleed
const H = (9 + 0.25).toFixed(3);
const { skills } = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const rules = 2297;
const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page { size: ${W}in ${H}in; margin: 0; } body { margin:0; width:${W}in; height:${H}in; display:flex; font-family:Georgia,serif; color:#f4e6bf; background:linear-gradient(160deg,#141018,#241a30 60%,#101318); }
.back,.front { width:6.125in; padding:.6in; box-sizing:border-box; } .spine { width:${spineIn}in; background:#c9a227; color:#141018; writing-mode:vertical-rl; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:14pt; }
h1{font-size:34pt;margin:.4in 0 .15in;line-height:1.15} .sub{font-size:13pt;color:#cbb87a;line-height:1.5} .big{font-size:60pt;color:#c9a227;font-weight:bold;margin:.35in 0 .05in} .back p{font-size:11pt;line-height:1.65;color:#e8dcc0}
.foot{position:absolute;bottom:.5in;font-size:9pt;color:#9a8f70}</style></head><body>
<div class="back"><div class="big" style="font-size:26pt;margin-top:.5in">What does experience actually know?</div>
<p>Every skill in this library ends with the mistakes that make smart people produce weak work. Collected, they read as one long answer — ${rules} rules of professional judgment, from PRDs to postmortems, negotiations to eulogies.</p>
<p>Part I: the craft, in full — the production tier of an open library used across Claude, ChatGPT, Gemini, and Cursor. Part II: the Anti-Pattern Almanac.</p>
<p>Free forever in digital form. This one is for your desk.</p>
<div class="foot">mohitagw15856.github.io/pm-claude-skills · MIT · the Open Institute for Professional Judgment</div></div>
<div class="spine">THE PROFESSIONAL WORK HANDBOOK</div>
<div class="front"><h1>The Professional<br/>Work Handbook</h1>
<div class="sub">${skills.length} skills. ${rules} rules.<br/>The craft of professional work,<br/>written to instruct AI —<br/>readable as a book for humans.</div>
<div class="big">${rules}</div><div class="sub">rules of professional judgment</div></div>
</body></html>`;
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const chromium = pw.chromium || pw.default?.chromium;
const b = await chromium.launch(); const pg = await b.newPage();
await pg.setContent(html); await pg.waitForTimeout(300);
await pg.pdf({ path: join(here, 'handbook-cover.pdf'), width: W + 'in', height: H + 'in', printBackground: true, pageRanges: '1' });
await b.close();
console.log(`Wrote docs/print/handbook-cover.pdf (${W}"×${H}", spine ${spineIn}" @ ${pages}pp)`);
