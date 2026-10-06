---
name: budget-builder
description: "Build a realistic personal monthly budget from someone's income and expenses. Use when asked to make a budget, plan monthly spending, allocate income, or get finances under control. Produces a categorized budget (a 50/30/20-style allocation tuned to their reality), a surplus/shortfall number, and concrete next moves. Educational, not regulated financial advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/budget-builder.html
metadata:
  {
    "openclaw": { "emoji": "💵" }
  }
---

# Budget Builder Skill

Most budgets fail because they're aspirational fiction. This skill builds a **realistic** monthly budget from
someone's actual income and spending — categorized, with a clear surplus-or-shortfall number and a couple of
specific moves to fix the gap. It's an educational planning aid, not personalized financial advice.

## Required Inputs

Ask for these only if they aren't already provided:

- **Monthly take-home income** (after tax), and whether it's steady or variable.
- **Fixed costs** — rent/mortgage, utilities, insurance, loan/debt minimums, subscriptions.
- **Variable spending** — groceries, transport, eating out, fun, shopping (estimates are fine).
- **Goals & obligations** — emergency fund, debt payoff, saving for something, dependents.

If numbers are rough, work with ranges and say so.

## Output Format

### Monthly budget — [name/household]

**Income (take-home):** $X

| Category | Type | Amount | % of income |
|---|---|---|---|
| Housing | Need | $ | % |
| Utilities & bills | Need | $ | % |
| Groceries | Need | $ | % |
| Transport | Need | $ | % |
| Debt minimums | Need | $ | % |
| Dining / fun | Want | $ | % |
| Subscriptions | Want | $ | % |
| Savings / goals | Save | $ | % |
| **Total** | | **$** | **100%** |

**Needs / Wants / Savings split:** X% / Y% / Z% — with a one-line read vs. a 50/30/20 guideline (a reference point, not a rule).

**Bottom line:** **surplus of $X** (allocate it) or **shortfall of $X** (must cut/earn).

**Top 3 moves** — the specific, highest-impact changes (e.g. "renegotiate the $X subscription stack", "cap dining at $Y", "auto-transfer $Z on payday").

**Notes** — assumptions, and for variable income, budget against a conservative (low) month.

## Quality Checks

- [ ] Every dollar is assigned (expenses + savings = income; surplus/shortfall is explicit)
- [ ] Categories are split into needs / wants / savings, with percentages
- [ ] The plan is realistic for their actual spending — not an aspirational fantasy
- [ ] Variable income is handled conservatively (budget the low month)
- [ ] The top moves are specific and quantified, not "spend less"

## Anti-Patterns

- [ ] Do not present a budget that doesn't balance to income — name the surplus or shortfall
- [ ] Do not set unrealistic cuts that won't survive week one — anchor to their real numbers
- [ ] Do not ignore irregular costs (annual insurance, holidays) — prorate them monthly
- [ ] Do not give generic advice — every recommendation should reference their figures
- [ ] Do not present this as personalized financial advice — it's an educational plan to adapt

## Based On

Personal budgeting practice (zero-based budgeting + the 50/30/20 needs/wants/savings guideline).

## Example Trigger Phrases

- "Make a budget."
- "Plan monthly spending."
- "Get finances under control."
