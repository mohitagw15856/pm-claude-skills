# Example: 401k-plan-decoder

## What this skill does

Decodes a 401k plan into what it actually costs and pays: fee drag in dollars over a career, match and vesting maths with the true-up check, a fund-lineup triage by cost, and the questions to put to HR in writing.

## How to trigger it

### Example 1: "is my 401k any good?"

**You say:**
> "Decode my 401k [pasted plan summary]: salary $95k, match is 50% of the first 6%, per-paycheck, 3-year cliff vesting. The target-date fund I'm in charges 0.68%; I see an S&P index at 0.04% in the lineup. I'm 31 and might leave in 2 years."

**Claude produces (excerpt):**

### 401k Decode: [employer plan]

**1. The verdict:** the match is good and you should capture all of it, but two items need attention this week: the cliff vesting against your 2-year horizon (forfeits ~$5,700 of match), and a fee gap worth six figures over your career. One fund switch and one calendar note fix most of this.

**2. The fee decode:** 0.68% vs 0.04% on a growing balance (current $38k + $8.5k/year contributions, 6% assumed return, 34 years to 65): the fee delta alone compounds to roughly **$180,000 less at retirement** [assumptions labelled; sensitive to return and contribution assumptions, but the direction is not in doubt]. The S&P fund plus a bond index replicates most of the target-date fund at ~1/15th the cost; the convenience is real, the price for it here is not.

**3. Match & vesting math:** 50% × 6% × $95k = **$2,850/year of match**; you contribute 6%+, so it is fully captured. Per-paycheck match with **no true-up stated** 🔴: if you front-load contributions and hit the annual limit early, late-year paychecks have no contribution to match and the match is silently forfeited; spread contributions evenly until HR confirms a true-up in writing. Vesting: 3-year cliff means leaving at month 23 forfeits **all ~$5,700** of accumulated match. If the departure is yours to time, month 37 beats month 35 by thousands of dollars.

**4. Fund lineup triage (excerpt)**

| Fund | Expense ratio | Cost tier | Note |
|---|---|---|---|
| S&P 500 index | 0.04% | 🟢 | the anchor; cheap-neighbour benchmark for everything else |
| Target-date 2060 | 0.68% | 🔴 | 17× the index for an allocation you can hold in two funds |

**6. Questions for HR:** true-up yes/no in writing; the full 404(a)(5) fee disclosure; whether admin fees are employer-paid or deducted from balances.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

### Example 2: below the match

**You say:**
> "I contribute 3% because money's tight. Same plan. How bad is that?"

**Claude produces (excerpt):**

**The arithmetic, plainly:** at 3% you receive $1,425 of match; at 6% you'd receive $2,850. The forgone $1,425 is a guaranteed 50% return on the extra $2,850 of contributions, which nothing else in finance offers. Before accepting the gap, check two cheaper sources: the 0.68% fund switch (recovers ~$250/year immediately at your balance) and whether the extra 3% ($109/paycheck, ~$82 after the tax deferral) can come from anywhere else. If it genuinely can't, that is a budget fact, not a mistake; revisit at the next raise.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

## Tips for best results

- Paste the fee disclosure and fund lineup, not just the match line; the money hides in the expense ratios.
- Say your expected tenure; vesting maths is only meaningful against a real leaving date.
- Get the true-up answer in writing; it is the fine print most likely to cost silently.

## Related skills

- `benefits-decoder` for the whole package this plan sits inside
- `closing-disclosure-decoder` for the same treatment on a home purchase
