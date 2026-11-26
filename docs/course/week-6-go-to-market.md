# Week 6: Go to market and communication

## Learning outcomes

- Analyse competitors from evidence and say where the product can win.
- Plan a launch with audiences, channels, timing and success measures.
- Write updates for different readers: a team, a board, an executive with two minutes.

## Skills used

- `competitive-analysis`: competitor profiles and a feature matrix.
- `go-to-market`: launch plan.
- `stakeholder-update`: status update for a team or stakeholders.
- `executive-summary`: a short summary for a senior reader.

## Case material

Short, fictional profiles of three competing meal-planning apps, with prices and one public review each.

## In-class exercise (60 minutes)

1. **Competition (20 min).** Run `competitive-analysis` on the three profiles. Highlight every claim about a competitor that is not in the profiles. Delete or source each one.
2. **Launch (20 min).** Run `go-to-market` for the smart shopping list, with the week 5 test result given as "positive: +3 points week-4 retention".
3. **Two readers (20 min).** Run `stakeholder-update` for the team and `executive-summary` for the founders. Read both aloud. Which sentences belong in only one of them?

## Graded assignment A6: launch pack and executive update (10%)

A launch plan, a competitive one-pager, and a 150-word executive update.

**Week-specific criteria (0 to 4 each):**

| Criterion | What a 4 looks like |
|---|---|
| Sourced claims | Every competitor claim traces to the case material; none is invented or inflated. |
| Audience fit | The executive update leads with the decision or the ask, fits in 150 words, and contains nothing the team update needed and the founders did not. |

Check the executive update with `node scripts/grade-output.mjs update.md` and fix what it flags before submitting.

## Instructor note

Competitive analysis is where models invent the most: plausible pricing tiers, features and market shares. The highlighting step is the lesson. Expect at least one invented "market share" figure per group.
