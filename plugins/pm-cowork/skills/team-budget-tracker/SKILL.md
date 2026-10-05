---
name: team-budget-tracker
description: "Track a team's budget so surprises die young — the commitment-based view (spent + committed + planned, not just invoiced), the category grain that matches how the team actually spends, the monthly close with its one-sentence read, and the forecast honesty for the year-end question. Use when asked track my team's budget, are we going to blow the budget, why did finance's number surprise us, or set up budget visibility for the team. Produces the three-lane tracker (spent/committed/planned), the monthly close ritual, the variance signals, and the year-end forecast method."
---

# Team Budget Tracker Skill

Team budgets surprise their owners for one structural reason: the official number tracks *invoices* (what finance has processed), while the truth includes *commitments* (the signed contract not yet billed, the accepted quote, the hire with an offer out) — so a team can be "under budget" while being catastrophically over-committed. The tracker runs three lanes — **spent** (invoiced), **committed** (contractually owed), **planned** (intended but not yet signed) — against the budget line, at the [budget-tracker-design](../budget-tracker-design/SKILL.md) statement-grain, with the monthly close and its one-sentence read. The remaining-to-spend number the team actually needs is budget − spent − committed, and most surprise stories are the word "committed" going untracked.

## What This Skill Produces

- **The three-lane tracker** — spent / committed / planned per category, with true-remaining computed
- **The commitment intake** — the rule that signatures, POs, and offers enter the tracker at commitment-time ([contract-renewal-tracker](../contract-renewal-tracker/SKILL.md) intake logic, budget edition)
- **The monthly close** — reconcile with finance's actuals, roll the lanes, write the one sentence
- **The forecast method** — the year-end projection: run-rate + committed + planned, with the honesty bands

## Required Inputs

Ask for these if not provided:
- **The budget and its shape** — the number, its categories (matched to how finance reports back — reconciliation dies across mismatched taxonomies), and what's in/out (headcount usually tracked separately — confirm)
- **The current commitments, hunted** — the signed-not-billed contracts, the annual licenses ([the renewal inventory](../contract-renewal-tracker/SKILL.md) supplies these), the accepted quotes, the outstanding offers; the first tracker build is mostly this archaeology
- **The spend flow** — who can commit money (everyone who can sign is a tracker input source), and where invoices land
- **Finance's rhythm** — when actuals arrive, in what format; the close reconciles against them monthly

## Framework: The Tracker Rules

1. **Three lanes, one truth:** spent (finance's actuals) + committed (signed/ordered/offered, dated by when it bills) + planned (the intended spend, explicitly soft) — and **true remaining = budget − spent − committed** (planned shown but not subtracted — it's intention, not obligation). The lane discipline is the entire fix; every budget surprise autopsy finds a commitment that lived in someone's inbox instead of the tracker.
2. **Commitments enter at signature, not invoice:** the intake rule — any signature/PO/offer creates its tracker row *that day*, with its billing schedule (the annual license bills once; the contractor bills monthly) — because the gap between commit-day and invoice-day is exactly where the surprise gestates.
3. **The monthly close is reconcile-roll-read:** finance's actuals vs. the spent lane (mismatches chased — often a mis-categorized invoice, occasionally a real leak) → committed items that billed move lanes → the one sentence ("on track; true remaining $84k; the Q4 contractor renewal is the next big commit") ([budget-tracker-design](../budget-tracker-design/SKILL.md) ritual discipline, team edition).
4. **Signals fire on the *combined* trajectory:** the variance thresholds watch spent+committed against the year's elapsed fraction — a team 40% through the year with 70% committed is in trouble *today*, whatever the invoiced number says; that's the signal the invoice-only view structurally cannot fire.
5. **The forecast is arithmetic plus honesty bands:** year-end = spent + committed + (planned × its confidence) + (run-rate for the unplanned residual) — with the band stated ("$310–335k against $320k — the range is the planned-lane uncertainty") and the [proposal-skeleton](../proposal-skeleton/SKILL.md)-grade honesty when the answer is "over": early bad news buys options ([saying-no-kindly](../saying-no-kindly/SKILL.md) tradeoff boards for the spend that must move); November bad news buys apologies.

## Output Format

# Team Budget: [team] — [$X] for [period] · true remaining: [$Y]

## The Three Lanes
| Category | Budget | Spent | Committed | Planned | True remaining |
|---|---|---|---|---|---|

## Commitment Intake
[The at-signature rule · the sources (who can commit) · the billing-schedule field]

## The Monthly Close ([date])
[Reconcile vs. finance → roll billed commitments → the one sentence, written]

## The Forecast
[Year-end arithmetic with the confidence band · the trajectory signal status · the early-warning conversation if warranted]

## Quality Checks

- [ ] True remaining subtracts commitments, not just spend
- [ ] Every signature/PO/offer has a same-day tracker row with its billing schedule
- [ ] The close reconciles against finance's actuals monthly, mismatches chased
- [ ] Signals watch spent+committed trajectory, not invoiced-only
- [ ] The forecast carries its band and bad news ships early

## Anti-Patterns

- [ ] Do not track invoices and call it a budget — commitments are where surprises live
- [ ] Do not let signers bypass intake — everyone who can commit money is a tracker source or a leak
- [ ] Do not skip the finance reconcile — two diverging truths get discovered in the worst meeting
- [ ] Do not subtract planned spend from remaining — intentions aren't obligations; the lanes exist to keep them distinct
- [ ] Do not sit on an over forecast — November's honesty is just an apology with a spreadsheet

## Example Trigger Phrases

- "Track my team's budget."
- "Are we going to blow the budget?"
- "Why did finance's number surprise us?"
- "Set up budget visibility for the team."
