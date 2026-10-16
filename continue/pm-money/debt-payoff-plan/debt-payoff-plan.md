---
name: "Build a debt-payoff plan across multiple debts using the ava"
description: "Build a debt-payoff plan across multiple debts using the avalanche or snowball method. Use when asked to pay off debt, tackle credit cards/loans, or choose between avalanche and snowball. Produces an ordered payoff schedule, the total interest and time for each method, and a clear recommendation. Educational, not regulated financial advice."
---

# Debt Payoff Plan Skill

Juggling several debts without a plan means paying more interest for longer. This skill turns a list of debts
plus a monthly amount available into an **ordered payoff plan** — comparing the **avalanche** (highest rate
first, least interest) and **snowball** (smallest balance first, fastest wins) methods so the person can pick
with eyes open. Educational planning, not personalized financial advice.

## Required Inputs

Ask for these only if they aren't already provided:

- **Each debt** — name, balance, interest rate (APR), and minimum payment.
- **Total monthly amount** available for debt (must cover all minimums + extra).
- **Preference** (optional) — save the most money, or get motivating quick wins.

## Output Format

### Debt payoff plan — [name]

**Debts**

| Debt | Balance | APR | Minimum |
|---|---|---|---|
| | $ | % | $ |

**Method comparison** (paying $X/month total):

| Method | Order | Debt-free in | Total interest paid |
|---|---|---|---|
| Avalanche (highest APR first) | … | ~N months | $ |
| Snowball (smallest balance first) | … | ~N months | $ |

**Recommended order** — the chosen method's payoff sequence, with the "attack" target each phase and roughly when each debt clears (roll each freed-up minimum into the next debt — the snowball/avalanche effect).

**The trade-off** — avalanche saves $X in interest; snowball gives the first win ~N months sooner. State which fits their stated preference and why.

**Watch-outs** — keep paying every minimum (missed minimums = fees + credit damage), and avoid adding new debt mid-plan.

## Quality Checks

- [ ] Both avalanche and snowball are quantified (months + total interest), not just described
- [ ] The recommended order rolls freed-up payments into the next debt
- [ ] The recommendation matches the person's stated preference (savings vs. momentum)
- [ ] The math is internally consistent and the assumptions (fixed APR, no new debt) are stated
- [ ] Minimums-must-always-be-paid is flagged

## Anti-Patterns

- [ ] Do not recommend a method without showing the interest/time trade-off in numbers
- [ ] Do not forget the minimums on non-target debts — the plan must cover all of them
- [ ] Do not ignore the person's psychology — the mathematically optimal plan they quit isn't optimal
- [ ] Do not assume variable-rate debt stays fixed without flagging it
- [ ] Do not present this as personalized financial advice — it's an educational model to adapt

## Based On

Debt-reduction methods — the debt avalanche (highest-interest-first) and debt snowball (smallest-balance-first).
