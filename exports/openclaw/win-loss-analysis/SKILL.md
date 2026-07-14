---
name: win-loss-analysis
description: "Analyze why deals are won and lost and turn it into an action plan. Use when asked to run a win/loss analysis, review closed-won and closed-lost deals, understand why the team is losing to a competitor, or summarize sales feedback into patterns. Produces a structured win/loss report with themes, win/loss rates by segment and competitor, representative quotes, and prioritized actions for product, marketing, and sales."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/win-loss-analysis.html
metadata:
  {
    "openclaw": { "emoji": "📣" }
  }
---

# Win/Loss Analysis Skill

Turn raw deal outcomes and buyer feedback into a clear picture of *why* you win and lose — and what to do about it. The output should let a product marketer or revenue leader act on patterns, not anecdotes.

## What This Skill Produces

- A win/loss report with the top reasons deals were won and lost, ranked by frequency and deal value
- Win/loss rates cut by segment, deal size, competitor, and source where the data allows
- Representative buyer quotes that make each theme concrete
- A prioritized action list mapped to product, marketing, sales, and pricing owners

## Required Inputs

Ask for these if not provided:

- **Deal data** — a list of closed-won and closed-lost deals, ideally with amount, segment, competitor, and stage lost
- **Feedback source** — win/loss interview notes, CRM `closed_lost_reason` fields, survey responses, or call transcripts
- **Time window and any segmentation** you care about (segment, region, product line)
- **Primary competitors** to track explicitly
- **The decision** this feeds — a QBR, a roadmap review, a messaging refresh, an enablement push

If the data is thin, say so and analyze what exists rather than inventing outcomes.

## Process

1. **Normalize the reasons** — collapse free-text loss reasons into a consistent taxonomy (price, product gap, timing/no-decision, competitor, champion left, poor fit, etc.).
2. **Quantify** — count wins and losses per reason; weight by deal value; compute win rate overall and by cut.
3. **Separate controllable from structural** — a missing feature is controllable; a genuine no-budget is not. Focus action on the controllable.
4. **Pull evidence** — attach 1–2 real quotes per major theme. Never fabricate quotes; mark `[quote to add]` if none is available.
5. **Isolate competitor dynamics** — where you lose to each competitor and on what basis.
6. **Recommend actions** — for each top theme, the single highest-leverage move and who owns it.

## Output Format

---

# Win/Loss Analysis — [Period]

**Scope:** [N won · N lost · total value] · **Segments:** [list] · **Source:** [interviews / CRM / survey]

## Headline
[2–3 sentences: overall win rate, the biggest swing factor, and the one thing to fix first.]

## Why We Win (ranked)
| # | Reason | % of wins | Notable in |
|---|---|---|---|
| 1 | [Reason] | [%] | [segment/competitor] |

**Evidence:** *"[buyer quote]"*

## Why We Lose (ranked)
| # | Reason | % of losses | Controllable? | Est. value at stake |
|---|---|---|---|---|
| 1 | [Reason] | [%] | Yes/No/Partly | [$] |

**Evidence:** *"[buyer quote]"*

## Win Rate by Cut
| Cut | Win rate | Read |
|---|---|---|
| [Segment / competitor / deal size] | [%] | [what it means] |

## Competitive Read
- **vs [Competitor]:** [where and why we win/lose, and the counter]

## Actions
| Theme | Recommended action | Owner | Effort | Expected impact |
|---|---|---|---|---|
| [Theme] | [Specific move] | [Product/PMM/Sales] | S/M/L | [win-rate or deal-value effect] |

---

## Quality Checks

- [ ] Every reason is backed by counts, not vibes
- [ ] Losses are split into controllable vs structural
- [ ] Each major theme has a real quote or an explicit `[quote to add]`
- [ ] Actions name an owner and the highest-leverage single move
- [ ] Competitor findings are specific enough to change a battlecard

## Anti-Patterns

- [ ] Do not treat "price" as a root cause without checking whether it's really value perception
- [ ] Do not average away segment differences — a 60% overall win rate can hide a 20% enterprise rate
- [ ] Do not fabricate buyer quotes or inflate sample size; state the n
- [ ] Do not list 15 actions — rank ruthlessly and name the top few
- [ ] Do not blame sales or product reflexively; let the data assign the theme

## Example Trigger Phrases

- "Run a win/loss analysis on last quarter's closed deals"
- "Why are we losing enterprise deals to [Competitor]?"
- "Summarize these win/loss interviews into themes and actions"
- "Turn our CRM closed-lost reasons into a report for the QBR"
