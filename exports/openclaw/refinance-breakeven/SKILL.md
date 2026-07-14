---
name: refinance-breakeven
description: "Compute the month a refinance actually starts saving money — payment delta, breakeven month, and total interest on both paths including the term-reset trap. Use when asked should I refinance, when does a refi break even, compare my loan to a refi offer, or is this refinance worth the closing costs. Produces the breakeven analysis with both interest totals, the if-you-sell-before-month-N warning, and the cases where the breakeven math lies."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/refinance-breakeven.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Refinance Breakeven Skill

"Lower monthly payment" and "saves money" are different claims, and lenders profit from the confusion. This skill computes when a refinance genuinely breaks even — and names the two standard ways the simple math lies: the term reset that trades a lower payment for more total interest, and the cash-out that relabels borrowing as saving.

## What This Skill Produces

- **The breakeven analysis** — payment delta, upfront costs, the month cumulative savings pass them
- **Both interest totals** — keep vs refi, side by side, costs included
- **The honest verdict** — refinance / don't / refinance-but-shorter-term, with the reason

## Required Inputs

Ask for these if not provided:
- **Current loan:** remaining balance, rate, months left
- **The offer:** rate, term, closing costs, points (if any)
- **The horizon:** how long the user realistically expects to keep this home/loan — breakeven beyond the horizon is a loss dressed as a saving
- **Cash-out?** — if the refi increases the balance, say so; the analysis changes character

## Programmatic Helper

```bash
python3 scripts/refinance_breakeven.py --balance 380000 --rate 6.9 --months-left 336 \
    --new-rate 5.6 --new-term 360 --closing 6500
python3 scripts/refinance_breakeven.py --json-input refi.json --json
```

Standard amortization, simple-savings breakeven (cumulative payment delta vs upfront costs). The script prints the term-reset warning itself when the new term extends the payoff date. Not modeled — and say so: reinvestment of savings, tax deductibility, ARM resets.

## Framework: When Breakeven Math Lies

| The lie | The tell | The honest comparison |
|---|---|---|
| **Term reset** | 26 years left → "new 30-year loan" | Total interest both paths (the script prints it) — or price the refi at the *same remaining term* |
| **Cash-out gravity** | "…and take $40k out while rates are good" | That's a new loan decision; analyze it separately at its own rate |
| **Points seduction** | Lower rate via points | Points go into upfront cost; breakeven moves — recompute, don't eyeball |
| **Horizon blindness** | Breakeven month 38, moving in ~2 years | If sell-month < breakeven month, the refi is a donation to the lender |

## Output Format

---

# Refinance Analysis: [loan]

## The Numbers
[Script output: payments, delta, breakeven month, both interest totals, term-reset warning if applicable]

## The Verdict
**[Refinance / Don't / Refinance at a shorter term]** — because [breakeven vs horizon, and the interest-total comparison in one sentence].

## What Would Change the Answer
[Rate threshold where the verdict flips; the horizon below which it flips; whether a same-term refi dominates the offered one.]

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

---

## Quality Checks

- [ ] Breakeven month is compared against the user's stated horizon, not shown in isolation
- [ ] Total interest on both paths appears whenever the term changes
- [ ] Points are inside the upfront cost, not footnoted
- [ ] The verdict names its reason in one sentence
- [ ] The disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not equate a lower payment with saving money — the term reset is the whole trap
- [ ] Do not fold a cash-out into the breakeven — it's a separate borrowing decision
- [ ] Do not report a breakeven month without the sell-before-month-N warning
- [ ] Do not present the model's output without what it doesn't model
