# Worked Example — Offer Comparison

## The brief

Jae has two offers: **BigCo** — $190k base, 15% bonus, $240k RSUs over 4 years (public stock, 1-year cliff then monthly), 4% 401(k) match. **Startup** (Series B) — $165k base, no bonus, options "worth $800k at our last valuation," same vesting shape. Jae expects to stay "2–3 years, honestly."

## The output

# Offer Comparison: BigCo vs Startup

## The risk conversation first

The startup's "$800k" is paper at the Series-B price. Agreed discount with Jae for a Series-B, pre-breakeven company: **50%** → **$400k modeled** *(labeled assumption — the ranking below is hostage to it)*.

## The Curves (script output — `offer_comparison.py offers.json`, startup equity entered at $400k)

```
  year           BigCo         Startup
     1         286,100         265,000
     2         286,100         265,000
     3         286,100         265,000
     4         286,100         265,000
cumulative:
     4       1,144,400       1,060,000
leader at year 4: BigCo · no crossover
```

BigCo leads every year: $286.1k vs $265k, $84.4k ahead cumulatively by year 4.

## At Jae's ACTUAL horizon (2–3 years)

The 4-year table understates the gap. Leaving at month 30: both cliffs vested plus monthly accrual — BigCo's vested RSUs are *sellable dollars*; the startup's vested options need exercising (cash out of pocket, ~90-day window if §grant says so — **check the exercise window**) and stay illiquid until an exit that may postdate Jae's tenure. Risk-adjusted at 2.5 years: **BigCo ≈ $715k realized vs Startup ≈ $580–620k mostly-paper**.

## What the Ranking Is Hostage To

| Assumption | Flip condition |
|---|---|
| 50% equity discount | At **0% discount** (full face value): Startup wins year 4, $1.26M vs $1.14M. If Jae genuinely believes in a 2–3× outcome, the discount is the entire decision. |
| The 2–3 year horizon | At 5+ years with a startup exit event, option upside dominates; without an exit, it never does. |

## Negotiation Levers

| Lever | Applied to | Moves 4-yr total by | Ask difficulty |
|---|---|---|---|
| Base +$10k | Startup | +$40k (+ bonus/match knock-ons at BigCo) | Medium |
| Extended exercise window (10yr) | Startup | Converts leave-early scenario from "forfeit or write a check" to "keep the lottery ticket" — worth more than any single cash lever at this horizon | Low — costs them ~nothing |
| Signing bonus $20k | Either | +$20k year 1 | Low |

**The honest read:** at Jae's stated horizon and risk view, BigCo pays more with certainty. The startup wins only in the world where Jae stays longer than Jae just said they would — decide on the horizon, not the offer letters.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

## Why it's shaped this way

- **The discount is negotiated with the user and labeled before any math** — the script values equity at exactly the number given; hiding the risk adjustment inside the model is the classic sin.
- **The stated horizon (2–3 years) gets its own section** — comparing at 4 years when the user said 2–3 is answering the wrong question precisely.
- **The exercise-window lever outranks cash asks** — horizon-aware advice; the skill's framework ranks levers by impact *for this user*, not by convention.
- **The hostage table shows the flipped result, not just the risk** — "at 0% discount the startup wins" is the honest sentence a cheerleading analysis omits.
- **Both cliffs and liquidity are distinguished** — vested ≠ sellable is the distinction that separates comp math from comp reality.
