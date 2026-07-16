#!/usr/bin/env node
// The Operator — a print-and-play card game built from the real library.
// Two decks: SITUATION cards (a messy professional moment) and SKILL cards
// (a real skill with its tell-tale outputs). On your turn you draw a situation,
// everyone secretly picks the SKILL card they'd reach for, and the table argues
// who's right — the judge (a rotating role) awards the situation card as a point.
// It's a party game that teaches professional pattern-matching by playing it.
//
//   node scripts/build-tabletop.mjs        # → docs/print/tabletop.html (A4, print-and-play)
//
// Print double-sided on cardstock, cut on the guides, sleeve, play. The rules
// sheet is page 1; cards are 9-up on A4.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'docs', 'print', 'tabletop.html');
const skills = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills || [];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// 48 skill cards — the most game-legible, broadly-known professional skills.
const WANT = ['prd-template', 'executive-update', 'incident-postmortem', 'one-pager', 'meeting-notes',
  'rice-prioritisation', 'competitor-teardown', 'okr-builder', 'stakeholder-update', 'product-launch-checklist',
  'user-research-synthesis', 'go-to-market-planner', 'press-release', 'cover-letter', 'sprint-planning',
  'decision-forensics', 'win-loss-analysis', 'performance-review', 'business-model-canvas', 'pitch-deck',
  'ab-test-planner', 'churn-analysis', 'roadmap-builder', 'standup-update', 'retro-facilitator',
  'negotiation-prep', 'pricing-strategy', 'crisis-comms', 'brand-voice', 'content-calendar',
  'hiring-scorecard', 'onboarding-plan', 'okr-check-in', 'discovery-plan', 'positioning-statement',
  'sales-email', 'customer-interview', 'feature-spec', 'bug-triage', 'release-notes',
  'quarterly-review', 'team-charter', 'raci-matrix', 'risk-register', 'change-plan',
  'value-prop-canvas', 'north-star-metric', 'stakeholder-map'];
let skillCards = WANT.map((n) => skills.find((s) => s.name === n)).filter(Boolean);
// Top up to a full 48-card deck from the highest-signal skills (eval-scored,
// then by title length as a proxy for concreteness), skipping ones already in.
if (skillCards.length < 48) {
  const have = new Set(skillCards.map((s) => s.name));
  const pool = skills
    .filter((s) => !have.has(s.name) && s.title && (s.summary || s.description))
    .sort((a, b) => ((b.eval && b.eval.score) || 0) - ((a.eval && a.eval.score) || 0));
  for (const s of pool) { if (skillCards.length >= 48) break; skillCards.push(s); have.add(s.name); }
}
skillCards = skillCards.slice(0, 48);

// 24 situation cards — messy professional moments. Each names the "par" skill(s)
// on the back (the answer the judge leans toward, though the table can argue).
const SITUATIONS = [
  ['The board meets Thursday and all you have is a Slack thread and three dashboards.', 'executive-update'],
  ['A senior eng says the migration is "basically done." It is not basically done.', 'decision-forensics'],
  ['Two features, one sprint, and the loudest stakeholder wants the wrong one.', 'rice-prioritisation'],
  ['Prod went down for 40 minutes. Leadership wants to know it won\'t happen again.', 'incident-postmortem'],
  ['A competitor just shipped the thing on your roadmap. Everyone is in your DMs.', 'competitor-teardown'],
  ['Sales lost the Meridian deal and no one can agree on why.', 'win-loss-analysis'],
  ['You have 90 minutes to explain a feature to an exec who reads one page.', 'one-pager'],
  ['The quarter\'s "OKRs" are secretly just a task list with aspirations on top.', 'okr-builder'],
  ['You\'re launching in six weeks and no one owns the checklist.', 'product-launch-checklist'],
  ['Twelve user interviews, forty sticky notes, zero decisions.', 'user-research-synthesis'],
  ['A price change is going out and support has no idea what to say.', 'crisis-comms'],
  ['Churn ticked up two points and the CEO asked "why" in a one-line email.', 'churn-analysis'],
  ['You need to tell a good performer a hard truth without breaking them.', 'performance-review'],
  ['The A/B test came back "marginal" and everyone reads it their own way.', 'ab-test-planner'],
  ['A new hire starts Monday and their first week is a blank calendar.', 'onboarding-plan'],
  ['Marketing, sales, and product each describe the product differently.', 'positioning-statement'],
  ['The roadmap is a wish-list and the CEO wants a story by Friday.', 'roadmap-builder'],
  ['You\'re walking into a renewal negotiation with a nervous champion.', 'negotiation-prep'],
  ['Legal, security, and design all need to sign off and nobody knows who decides.', 'raci-matrix'],
  ['The release is done; now write the thing customers actually read.', 'release-notes'],
  ['A cross-team project keeps stalling and everyone points at someone else.', 'team-charter'],
  ['You have raw numbers and a skeptical room, and ten minutes.', 'executive-update'],
  ['The pitch is in two days and the deck is forty slides of nouns.', 'pitch-deck'],
  ['A risky change ships next week and no one has written down what could break.', 'risk-register'],
];

const skillFace = (s) => `<div class="card skill">
  <div class="ctag">SKILL</div>
  <div class="ctitle">${esc(s.title)}</div>
  <div class="cdesc">${esc((s.summary || s.description || '').split(/(?<=[.!?])\s/).slice(0, 2).join(' ')).slice(0, 150)}</div>
  <div class="cfoot">${esc(s.plugin || 'core')}</div>
</div>`;

const sitFace = ([text, par]) => `<div class="card sit">
  <div class="ctag">SITUATION</div>
  <div class="csit">${esc(text)}</div>
  <div class="cpar">par: <b>${esc(par)}</b></div>
</div>`;

// 9-up sheets.
function sheets(cards, cls) {
  const pages = [];
  for (let i = 0; i < cards.length; i += 9) {
    pages.push(`<section class="sheet ${cls}">${cards.slice(i, i + 9).join('')}</section>`);
  }
  return pages.join('\n');
}

const rules = `<section class="rules">
  <h1>The Operator</h1>
  <p class="tag">A print-and-play party game about professional judgment — built from the real skill library.</p>
  <div class="rbox">
    <h2>The idea</h2>
    <p>Every round, a messy work <b>situation</b> hits the table. Everyone secretly commits the <b>skill</b> they'd reach for. Then you argue. The judge awards the point to the most convincing operator — not always the "par" answer on the card.</p>
    <h2>Setup (2–6 players)</h2>
    <ol>
      <li>Print, cut, and split into two decks: <b>Situations</b> (${SITUATIONS.length}) and <b>Skills</b> (${skillCards.length}). Shuffle each.</li>
      <li>Deal <b>5 skill cards</b> to each player. Place the situation deck face-down.</li>
      <li>Youngest player judges first; the role rotates left each round.</li>
    </ol>
    <h2>A round</h2>
    <ol>
      <li>The judge flips the top <b>situation</b> and reads it aloud.</li>
      <li>Every non-judge plays <b>one skill card face-down</b>.</li>
      <li>Reveal together. In turn, each player gets <b>20 seconds</b> to argue why their skill is the move.</li>
      <li>The judge awards the <b>situation card</b> (1 point) to the best case. Ties: the judge picks.</li>
      <li>Everyone draws back up to 5. Judge role passes left.</li>
    </ol>
    <h2>Winning</h2>
    <p>First to <b>5 situation cards</b> wins — or play a timed round and count points. The "par" line on each situation is the library's suggested answer: use it to settle a deadlock, or ignore it and reward the better argument. Half the fun is beating par.</p>
    <h2>Variants</h2>
    <ul>
      <li><b>Speed round:</b> 10-second arguments, judge decides instantly.</li>
      <li><b>Coop:</b> no judge — the table must reach consensus on one skill per situation before a 60s timer.</li>
      <li><b>Deep end:</b> play the actual skill in the <a>playground</a> after the round and compare it to your argument.</li>
    </ul>
  </div>
  <p class="foot">PM Skills · MIT · mohitagw15856.github.io/pm-claude-skills — this sheet + ${skillCards.length + SITUATIONS.length} cards.</p>
</section>`;

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>The Operator — print &amp; play</title><style>
@page{size:A4;margin:8mm}*{box-sizing:border-box}
body{margin:0;font-family:"Segoe UI",Helvetica,Arial,sans-serif;color:#16181d;background:#fff}
.rules{page-break-after:always;padding:6mm}
.rules h1{font-size:30pt;margin:0;color:#b3402f}
.rules .tag{font-size:12pt;color:#555;margin:2px 0 10px}
.rbox h2{font-size:13pt;margin:12px 0 4px;color:#b3402f}
.rbox p,.rbox li{font-size:10.5pt;line-height:1.4}
.rules .foot{margin-top:14px;font-size:8.5pt;color:#999}
.sheet{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:0;page-break-after:always;height:281mm}
.card{border:1px dashed #bbb;padding:5mm;display:flex;flex-direction:column;position:relative;overflow:hidden}
.card .ctag{font-size:8pt;font-weight:700;letter-spacing:.12em;color:#fff;background:#333;align-self:flex-start;padding:2px 7px;border-radius:4px}
.skill .ctag{background:#1f6f5c}.sit .ctag{background:#b3402f}
.ctitle{font-size:15pt;font-weight:800;margin:8px 0 6px;line-height:1.1}
.cdesc{font-size:9pt;color:#333;line-height:1.35;flex:1}
.cfoot{font-size:8pt;color:#888;text-transform:uppercase;letter-spacing:.08em;border-top:1px solid #eee;padding-top:4px}
.csit{font-size:12.5pt;font-weight:600;line-height:1.3;flex:1;margin-top:8px}
.cpar{font-size:8.5pt;color:#999;border-top:1px solid #eee;padding-top:4px}
.sheet.sit .card{background:linear-gradient(160deg,#fff,#fdf3f1)}
.sheet.skill .card{background:linear-gradient(160deg,#fff,#f0f7f4)}
</style></head><body>
${rules}
${sheets(skillCards.map(skillFace), 'skill')}
${sheets(SITUATIONS.map(sitFace), 'sit')}
</body></html>`;

if (!existsSync(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`Wrote docs/print/tabletop.html — ${skillCards.length} skill cards + ${SITUATIONS.length} situations + rules. Print double-sided on cardstock, cut on the dashed guides.`);
