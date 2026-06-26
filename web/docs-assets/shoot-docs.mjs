// Render a few representative skill outputs through the themed PDF design system into
// PNG thumbnails + real PDFs, for the README's "designed documents" gallery. The sample
// markdown is representative (hand-authored, no API key needed); the CSS mirrors the themes
// in web/export-doc.js so the previews match what users actually get.
//
//   npx playwright install chromium      # one-time
//   node web/docs-assets/shoot-docs.mjs  # writes web/docs-assets/samples/*.png + *.pdf
import { fileURLToPath } from 'url';
import path from 'path';
import { mkdirSync, writeFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'samples');
mkdirSync(outDir, { recursive: true });

const pw = await import('playwright');
const chromium = pw.chromium || (pw.default && pw.default.chromium);

// ── Themes (mirrors web/export-doc.js) ───────────────────────────────────────
const THEMES = {
  paper: { canvas: '#f5f4ed', ink: '#1a1a1a', accent: '#1B365D', muted: '#5a5a52', rule: '#d8d5c8', serif: true, body: "15px/1.5 Charter,'Iowan Old Style',Georgia,'Times New Roman',serif" },
  modern: { canvas: '#ffffff', ink: '#111418', accent: '#d9605a', muted: '#5b626b', rule: '#e6e6e6', serif: false, body: "15px/1.6 'Inter',-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" },
  mono: { canvas: '#fbfbfa', ink: '#16181d', accent: '#0b6b5b', muted: '#5b626b', rule: '#e3e3df', serif: false, body: "14px/1.6 'IBM Plex Sans',-apple-system,Segoe UI,Roboto,Arial,sans-serif" },
};
function themeCSS(t, accentOverride) {
  const accent = accentOverride || t.accent;
  return [
    '*{box-sizing:border-box}',
    `body{font:${t.body};color:${t.ink};background:${t.canvas};max-width:760px;margin:0 auto;padding:44px 48px}`,
    `h1,h2,h3,h4{line-height:1.2;color:${t.ink};margin:1.25em 0 .35em;${t.serif ? '' : 'letter-spacing:-.01em;'}font-weight:700}`,
    `h1{font-size:2em;margin-top:0;border-bottom:2px solid ${accent};padding-bottom:.2em;color:${accent}}`,
    `h2{font-size:1.4em;border-bottom:1px solid ${t.rule};padding-bottom:.15em}`,
    'h3{font-size:1.15em}',
    `a{color:${accent};text-decoration:none}strong{color:${t.ink}}`,
    'table{border-collapse:collapse;width:100%;margin:14px 0;font-size:.95em}',
    `th,td{border:1px solid ${t.rule};padding:7px 11px;text-align:left;vertical-align:top}`,
    `th{background:${accent};color:#fff;font-weight:600;border-color:${accent}}`,
    'tr:nth-child(even) td{background:rgba(0,0,0,.025)}',
    `code{background:rgba(0,0,0,.05);padding:1px 5px;border-radius:4px;font-family:"IBM Plex Mono",Consolas,monospace;font-size:.9em}`,
    `blockquote{border-left:3px solid ${accent};margin:1em 0;padding:.1em 0 .1em 16px;color:${t.muted}}`,
    `hr{border:0;border-top:1px solid ${t.rule};margin:1.6em 0}`,
    'ul,ol{padding-left:1.3em}li{margin:.2em 0}',
    `.pm-foot{margin-top:34px;padding-top:10px;border-top:1px solid ${t.rule};font-size:11px;color:${t.muted}}`,
  ].join('');
}

// ── Sample outputs (representative; what these skills produce) ────────────────
const SAMPLES = [
  { id: 'resume', theme: 'paper', label: 'Resume', md: `# Jordan Avery
Senior Product Manager · San Francisco / Remote · jordan@example.com · linkedin.com/in/jordanavery

**Summary**

Senior PM with 8 years in B2B SaaS, taking products from messy 0→1 to scaled growth. Shipped the onboarding revamp that lifted activation 41%→52%; led a 3-team platform migration with zero downtime. I turn fuzzy problems into shipped outcomes.

## Experience

**Senior Product Manager**, Northwind Software · 2022–present
- Cut onboarding drop-off 18% → 9%, unlocking ~$140k ARR, by redesigning the 3-step signup flow.
- Drove a cross-team platform migration (3 squads, 6 months) with zero customer downtime.
- Built the experiment program: 24 tests/quarter, 31% win rate, feeding the roadmap.

**Product Manager**, Acme Cloud · 2019–2022
- Launched the analytics dashboard now used by 70% of weekly-active accounts.
- Grew the mobile NPS from 14 → 38 over four quarters.

## Skills

Product strategy · Discovery & user research · RICE/OKRs · SQL & analytics · A/B testing · Roadmapping · Stakeholder management

## Education

B.S. Computer Science, UC Berkeley` },

  { id: 'one-pager', theme: 'modern', label: 'One-Pager', md: `# Loop — close the feedback gap

*Turn scattered customer feedback into a ranked, shippable backlog — automatically.*

## The problem

Product teams drown in feedback across email, Slack, tickets and calls. It takes ~6 hours a week to collect, and the signal gets lost — so roadmaps get built on the loudest voice, not the strongest evidence.

## The solution

Loop ingests every feedback channel, clusters it by theme, and ranks themes by reach × revenue × strategic fit — a live, evidence-backed backlog your whole team trusts. No more manual triage.

## Why now

| Signal | Detail |
|---|---|
| Market | Feedback tools are point solutions; none rank by business impact |
| Traction | 40 teams in beta · 92% weekly retention · $9k MRR |
| Wedge | The only tool that ties feedback to revenue, not just volume |

## The ask

Raising a $1.5M pre-seed to reach $30k MRR and 200 teams in 12 months. **Let's talk → jordan@loop.so**` },

  { id: 'cover-letter', theme: 'paper', label: 'Cover Letter', md: `# Cover Letter

Jordan Avery · jordan@example.com · June 2026

Dear Hiring Team,

I've watched Northwind quietly become the default for mid-market ops teams — and the new automation suite is exactly the kind of "make the hard thing one click" product I love to build. I'd like to lead it.

At Acme Cloud I owned the analytics dashboard from a vague "we need insights" brief to a feature 70% of weekly-active accounts now rely on — by cutting scope to the one chart that answered the user's real question. When mobile NPS stalled at 14, I ran the discovery that traced it to a broken first-run, and shipped the fix that took it to 38. I don't start from features; I start from the job the user is hiring us for.

What draws me to Northwind specifically is that you measure success by customer outcomes, not output — that's how I work, and it's rarer than it should be.

I'd love to talk about where the automation suite goes next.

Sincerely,
Jordan Avery` },

  { id: 'prd', theme: 'mono', label: 'PRD', md: `# PRD: Multi-Channel Support Inbox

**Status:** In review · **Author:** Jordan Avery · **Updated:** June 2026

## Overview

**Problem.** Support agents juggle email, chat, and social in three separate tools — wasting ~2.3h/day switching and losing conversation history, which drags response time to 4h.

**Solution.** A unified inbox that aggregates every channel, keeps cross-channel history, and routes by agent expertise.

**Success metrics**
- Median response time 4h → 1h
- Tool-switching time −80% (2.3h → <0.5h)
- CSAT 3.8 → 4.5

## User stories

| As a… | I want to… | So that… |
|---|---|---|
| Support agent | see all channels in one queue | I never miss an urgent request |
| Agent | view full cross-channel history | I don't ask customers to repeat themselves |
| Lead | route by expertise | the right person answers first |

## Requirements

- **P0:** unified queue, cross-channel history, priority sort
- **P1:** expertise-based routing, canned responses
- **P2:** sentiment tagging

## Open questions

- Do we build social ingestion in-house or via a provider?
- What's the data-retention policy for DM content?` },

  { id: 'linkedin-profile', theme: 'modern', label: 'LinkedIn', md: `# LinkedIn Profile

## Headline

Senior PM · B2B SaaS & PLG · I turn messy roadmaps into shipped outcomes (activation, retention, revenue)

## About

Most products don't fail for lack of ideas — they fail for lack of *focus*. My job is to find the one thing that moves the metric, and ship it.

Over 8 years in B2B SaaS I've taken products from 0→1 and scaled them: I cut onboarding drop-off in half (unlocking ~$140k ARR), lifted mobile NPS from 14 to 38, and built an experiment program running 24 tests a quarter.

I work from the job the customer is hiring us for — not the feature list. Discovery first, then ruthless prioritisation, then a roadmap people actually believe.

**Specialties:** product strategy · continuous discovery · RICE/OKRs · activation & retention · experimentation · stakeholder alignment.

*Open to senior/principal PM roles in B2B SaaS. Reach out — I'd love to talk.*

## Featured skills

Product Strategy · User Research · A/B Testing · Roadmapping · SQL · OKRs · Go-to-Market` },

  { id: 'portfolio-page', theme: 'paper', label: 'Portfolio', md: `# Jordan Avery — Product, end to end

I take fuzzy problems to shipped outcomes. Selected work below; full case studies on request.

## Onboarding revamp — activation 41% → 52%

- **Context:** new users hit value too late; week-1 activation had stalled for three quarters.
- **My role:** owned discovery, the PRD, and cross-functional delivery (eng + design + lifecycle).
- **What I did:** cut the signup flow from 5 steps to 3, added a guided first action, instrumented the funnel.
- **Outcome:** activation 41% → 52%, drop-off 18% → 9%, ~$140k ARR unlocked. Now the team's north-star play.

## Platform migration — zero downtime

- **Context:** legacy monolith blocked the roadmap; a migration had been deferred twice as "too risky".
- **My role:** drove the plan across 3 squads over 6 months; owned sequencing and the rollback gates.
- **What I did:** phased cutover behind flags, contract tests at every seam, a go/no-go per phase.
- **Outcome:** shipped with zero customer downtime; unblocked the next year of roadmap.

## How I work

Discovery before solutions · the smallest test that proves it · ruthless about the one metric that matters.` },

  { id: 'personal-bio', theme: 'modern', label: 'Bio', md: `# Personal Bio

## One-liner

Jordan Avery is a senior product manager who turns messy roadmaps into shipped outcomes.

## Short (≈50 words)

Jordan Avery is a senior PM with 8 years in B2B SaaS. They've taken products from 0→1 to scale — halving onboarding drop-off to unlock ~$140k ARR and lifting mobile NPS from 14 to 38. Jordan works from the customer's job to be done, not the feature list.

## Long (≈150 words)

Jordan Avery is a senior product manager who builds products people actually adopt. Over eight years in B2B SaaS they've owned discovery-to-launch for products from pre-seed to scale: a signup redesign that lifted activation from 41% to 52%, a zero-downtime platform migration across three teams, and an experiment program shipping 24 tests a quarter at a 31% win rate.

Jordan's approach is unfashionably simple — start from the job the customer is hiring you for, find the one metric that matters, and ship the smallest thing that moves it. Roadmaps people believe; decisions backed by evidence, not the loudest voice.

Outside work, Jordan mentors first-time PMs and is a reliably over-confident five-a-side goalkeeper.` },

  { id: 'brand-onepager', theme: 'modern', accent: '#6d28d9', label: 'One-Pager (brand tint)', md: `# Aster — your design system, on autopilot

*Keep every team on-brand without a single Slack ping to the design team.*

## The problem

Design systems rot. Components drift, tokens fork, and by month six every team has its own "almost right" button. Keeping it consistent is a full-time job nobody owns.

## The solution

Aster watches your codebase and Figma, flags drift the moment it happens, and opens the fix as a PR. Your design system stays alive — automatically.

## Why now

| Signal | Detail |
|---|---|
| Traction | 60 teams · 88% monthly retention · $14k MRR |
| Wedge | The only tool that auto-*fixes* drift, not just reports it |
| Timing | Design-engineering is finally a budget line |

## The ask

Raising a $2M seed to reach $50k MRR. **Let's talk → team@aster.design**` },
];

const browser = await chromium.launch();
for (const s of SAMPLES) {
  const t = THEMES[s.theme];
  // very small, dependency-free markdown → HTML (headings, tables, lists, bold/italic/code, hr, blockquote)
  const html = mdToHtml(s.md);
  const page = await browser.newPage({ viewport: { width: 820, height: 1060 }, deviceScaleFactor: 2 });
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>${themeCSS(t, s.accent)}</style></head>` +
    `<body>${html}<div class="pm-foot">Made with PM Skills · ${s.label} · ${s.theme} theme${s.accent ? ' · brand ' + s.accent : ''}</div></body></html>`,
    { waitUntil: 'networkidle' }
  );
  await page.screenshot({ path: path.join(outDir, `${s.id}.png`), fullPage: true });
  await page.pdf({ path: path.join(outDir, `${s.id}.pdf`), printBackground: true, format: 'A4', margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' } });
  await page.close();
  console.log(`✓ ${s.id}.png + ${s.id}.pdf (${s.label}, ${s.theme})`);
}
await browser.close();

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+?)\*/g, '$1<em>$2</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}
function mdToHtml(md) {
  const lines = md.split('\n');
  let html = '', i = 0, inUl = false;
  const closeUl = () => { if (inUl) { html += '</ul>'; inUl = false; } };
  while (i < lines.length) {
    const ln = lines[i];
    if (/^\|/.test(ln) && /^\|/.test(lines[i + 1] || '') && /^[\s|:-]+$/.test(lines[i + 1])) {
      closeUl();
      const head = ln.trim().replace(/^\||\|$/g, '').split('|').map((c) => `<th>${inline(c.trim())}</th>`).join('');
      i += 2; let rows = '';
      while (i < lines.length && /^\|/.test(lines[i])) {
        rows += '<tr>' + lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => `<td>${inline(c.trim())}</td>`).join('') + '</tr>';
        i++;
      }
      html += `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`; continue;
    }
    const h = ln.match(/^(#{1,4})\s+(.*)/);
    if (h) { closeUl(); html += `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`; i++; continue; }
    if (/^[-*]\s+/.test(ln)) { if (!inUl) { html += '<ul>'; inUl = true; } html += `<li>${inline(ln.replace(/^[-*]\s+/, ''))}</li>`; i++; continue; }
    if (/^>\s?/.test(ln)) { closeUl(); html += `<blockquote>${inline(ln.replace(/^>\s?/, ''))}</blockquote>`; i++; continue; }
    if (/^---+$/.test(ln.trim())) { closeUl(); html += '<hr>'; i++; continue; }
    if (ln.trim() === '') { closeUl(); i++; continue; }
    closeUl(); html += `<p>${inline(ln)}</p>`; i++;
  }
  closeUl();
  return html;
}
