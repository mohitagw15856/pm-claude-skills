---
name: budget-tracker-design
description: "Design a budget-vs-actuals tracker that stays alive past February — the category grain that matches real statements, the variance view that answers 'are we okay', the update ritual small enough to survive, and the honest handling of irregular expenses. Use when asked build me a budget spreadsheet, track team spend against budget, why do we always blow the budget invisibly, or design a household/project budget tracker. Produces the tracker structure, the variance logic, the irregulars ledger, and the monthly fifteen-minute ritual."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/budget-tracker-design.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Budget Tracker Design Skill

Budget trackers die two deaths: too granular (forty categories nobody can code a coffee receipt into — abandoned by February) or too vague (three buckets that hide every overrun until it's structural). The living tracker matches its grain to *how spending actually arrives* (statement lines, invoices), answers one question at a glance — "are we okay, and where not?" — handles irregular expenses honestly (the annual insurance bill is not a "shock"), and costs fifteen minutes a month, because the ritual's survivability is the design's real constraint.

## What This Skill Produces

- **The structure** — categories at statement-grain (8–15, not 40), the month × category grid, budget column with its source
- **The variance view** — actual vs. budget with the month-and-YTD dual read, conditional signals at honest thresholds
- **The irregulars ledger** — annual/lumpy expenses spread as monthly accruals so they stop being surprises
- **The ritual** — the fifteen-minute monthly update, sourced from statements, calendared

## Required Inputs

Ask for these if not provided:
- **The scope** — household, team, or project budget; and the currency of pain ("we get surprised" vs "we can't approve spend" vs "the money just goes")
- **The spend sources** — cards, invoices, payroll, reimbursements; categories must match how these report, or every update becomes archaeology
- **The budget numbers** — from where (last year +X%? A plan? First-time guesses marked as guesses to be re-based at month 3)?
- **The irregulars** — the annual/quarterly lumps (insurance, subscriptions ([subscription-audit](../subscription-audit/SKILL.md) finds them), taxes, conferences) — listed, because the design accrues them

## Framework: The Design Rules

1. **Grain follows the statement:** categories are what spending *arrives labeled as* — if the card statement says "Software," a tracker with nine software sub-categories requires a coder, and the coder quits. 8–15 categories; anything needing more is two budgets.
2. **The dual read is the view:** this-month variance (the early warning) AND year-to-date variance (the truth) — monthly noise means YTD is where "are we okay" actually lives, and trackers showing only months train panic-then-complacency cycles.
3. **Accrue the irregulars:** every lumpy expense becomes a monthly twelfth in its category (the insurance is $60/month that *bills* annually) — the single design move that ends the "shock" pattern, because the shocks were scheduled all along. The irregulars ledger lists each lump, its month, and its accrual.
4. **Thresholds mean something:** the variance signal fires at a level worth attention (±10% or a real amount, scaled to the category) — a tracker that flags $3 overruns in red teaches signal-blindness by March.
5. **The ritual is the moat:** monthly, 15 minutes, from statements: fill actuals (statement-grain makes this transcription, not judgment), scan the dual read, write ONE sentence ("okay except software, +22% YTD — the new tool stack"). The sentence is the tracker's product; a tracker updated but unread is a diary, and one demanding an hour is abandoned.

## Output Format

# Budget Tracker: [scope] — [year]

## Structure
[Categories (statement-grained) × months · budget column + source note · the guesses marked for month-3 rebase]

## Variance View
[Month + YTD columns · signal thresholds per category · the one-glance "are we okay" row]

## Irregulars Ledger
| Lump | Bills in | Annual | Monthly accrual |
|---|---|---|---|

## The Ritual (15 min, calendared)
[Fill from statements → scan dual read → the one sentence → done]

## Quality Checks

- [ ] Categories map 1:1-ish to how spend arrives — no receipt requires judgment to code
- [ ] Both month and YTD variance are visible; YTD carries the verdict
- [ ] Every known lump is accrued monthly in the ledger
- [ ] Thresholds are set at attention-worthy levels per category
- [ ] The ritual fits in 15 minutes and ends in one written sentence

## Anti-Patterns

- [ ] Do not build 40 categories — granularity that outruns the statements kills the tracker
- [ ] Do not read only the current month — noise up, noise down, lesson: read YTD
- [ ] Do not let annual bills be "surprises" — they have dates; accrue them
- [ ] Do not alert on trivial variance — red must mean something or it means nothing
- [ ] Do not skip the sentence — an updated tracker nobody reads is maintenance cosplay

## Example Trigger Phrases

- "Build me a budget spreadsheet."
- "Track team spend against budget."
- "Why do we always blow the budget invisibly?"
- "Design a household/project budget tracker."
