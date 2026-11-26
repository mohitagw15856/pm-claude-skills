# Worked Example — Refinance Breakeven

## The brief

The Okonkwos are 12 months into a 30-year mortgage: $285k balance remaining, 7.1%, 348 payments left. Their credit union offers 6.1% on a new 30-year with $5,400 closing costs. "The payment drops $200 — should we?" They think they'll stay "at least five more years, probably not forever."

## The output

# Refinance Analysis: 30yr @7.1% → 30yr @6.1%

## The Numbers (script output — `refinance_breakeven.py`)

```
payment: 1,934.57 -> 1,727.09  (delta +207.48/mo)
upfront cost: 5,400.00
breakeven: month 27  — if you sell or re-refi before month 27, don't.
total interest if you keep:            388,229.31
total interest if you refi (+costs):   342,150.65
⚠ term reset: 12 extra months — a lower payment can still cost more in total.
```

## The Verdict

**Refinance — but ask for the 25-year quote first.** Breakeven at month 27 clears your five-year horizon with room to spare, and even *with* the term reset this one genuinely saves: $46,079 less total interest, because a full point of rate outweighs 12 added months. But the reset still costs you — a 6.1% loan at your *current* remaining term (29 years) would save roughly $10k more than the 30-year restart, for a payment only ~$25 higher than the quoted one.

## What Would Change the Answer

- **Selling before month 27** — the refi becomes a $5,400 gift to the lender. Your "probably not forever" is fine; "maybe in two years" would not be.
- **A rate above ~6.6%** — the delta shrinks toward a 40-month breakeven, past comfortable certainty for your horizon.
- **The cash-out temptation** — the loan officer will mention it ("consolidate some cards?"). That's a *separate borrowing decision* at mortgage rates for 30 years; run it on its own, never inside this breakeven.

## The one question for the credit union

"Same 6.1% — what's the payment on a **25-year term**?" If it's within budget (~$1,860), you capture the rate *and* refuse the reset: the best of both lines in the table.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

## Why it's shaped this way

- **Both interest totals appear beside the payment delta** — the term-reset trap lives exactly in the gap between "payment dropped" and "total paid"; the script prints the warning itself.
- **Breakeven is judged against the STATED horizon** ("five more years" vs month 27) — a breakeven month in isolation is trivia.
- **The verdict recommends a better loan than the one quoted** — the 25-year counter-ask is the skill's judgment layer on top of the arithmetic.
- **The cash-out is pre-emptively quarantined** — named before the loan officer names it, per the framework's lie table.
- **Flip conditions are numeric** (month 27, ~6.6%) — "it depends" with thresholds is advice; without them it's weather.
