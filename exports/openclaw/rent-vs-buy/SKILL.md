---
name: rent-vs-buy
description: "Model rent-vs-buy honestly — year-by-year net position for both paths including the assumption everyone drops (the renter invests the difference), with a breakeven horizon instead of a verdict. Use when asked should I rent or buy, does buying beat renting in my city, when does buying break even, or run the rent-vs-buy numbers. Produces the year-by-year comparison table, the breakeven year, the assumption list with defaults labeled, and the not-modeled list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/rent-vs-buy.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Rent vs Buy Skill

Rent-vs-buy arguments are usually two people comparing different questions: one counts equity and forgets transaction costs and carry; the other counts rent as "thrown away" and forgets the renter can invest the difference. This skill runs the symmetric model — both paths get their real costs and their real compounding — and delivers a breakeven *horizon*, because the honest answer is almost always "it depends how long you stay."

## What This Skill Produces

- **The year-by-year table** — owner net position (equity minus selling costs) vs renter net position (invested savings), per year
- **The breakeven year** — before it, renting won; after it, buying won, on the stated assumptions
- **The assumption ledger** — every input labeled, defaults flagged as defaults
- **The not-modeled list** — taxes/deductions, renovation risk, the non-financials — stated up front

## Required Inputs

Ask for these if not provided:
- **Home price** and **comparable monthly rent** — same home, same neighborhood; comparing a condo rent to a house purchase is the classic apples-to-oranges error
- **Down payment %, mortgage rate, term** (defaults 20% / 6.5% / 30yr, labeled)
- **How long they expect to stay** — the single most decision-relevant input
- **Growth assumptions** — appreciation, rent growth, investment return (defaults 3/3/5%, labeled)

## Programmatic Helper

```bash
python3 scripts/rent_vs_buy.py --price 450000 --rent 2200
python3 scripts/rent_vs_buy.py --price 450000 --rent 2200 --horizon 10 --appreciation 2 --json
```

Deterministic. The renter's pot starts at the down payment + closing costs (the money a buyer parts with on day one) and each year absorbs the difference between owner outflow and rent. Selling costs are applied at every horizon — equity you can't access without paying 7% isn't fully yours.

## Framework: The Symmetry Rules

- **The renter invests the difference** — the model's load-bearing assumption; a renter who spends the difference makes buying win almost automatically, and that's a behavior question, not a math question. Say so.
- **Carry costs are real** — tax, insurance, maintenance (~2%/yr of value) never build equity; "my mortgage is like rent" omits them
- **Transaction costs decide short horizons** — ~3% in and ~7% out is why breakeven is measured in years, not months
- **Appreciation is an assumption, not a birthright** — vary it before trusting a conclusion; a 1-point change often moves breakeven by years
- **The output is a horizon, not a verdict** — "buying wins if you stay past year N" is the honest deliverable

## Output Format

---

# Rent vs Buy: [scenario]

## The Table and the Breakeven
[Script output: year-by-year net positions, breakeven year]

## What the Breakeven Means
[Two sentences: how the user's expected stay compares to the breakeven, and which assumption the conclusion is most hostage to.]

## What This Model Ignores
Taxes and deductions (jurisdiction-specific) · renovation and repair surprises · rate refinancing · the non-financials (stability, flexibility, the yard) — which are allowed to outvote the math.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

---

## Quality Checks

- [ ] The renter-invests-the-difference assumption is stated explicitly
- [ ] Selling costs are inside the owner's net position at every horizon
- [ ] The breakeven year is compared against how long the user expects to stay
- [ ] At least one sensitivity note (appreciation or investment return varied)
- [ ] The disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not declare a universal winner — the deliverable is a breakeven horizon
- [ ] Do not count rent as "thrown away" without counting interest, tax, and maintenance the same way
- [ ] Do not compare non-comparable homes (rent a 1BR vs buy a 3BR)
- [ ] Do not model jurisdiction-specific tax benefits — name them as unmodeled instead
- [ ] Do not let the math silently overrule stated non-financial priorities — surface the tension

## Example Trigger Phrases

- "Should I rent or buy?"
- "Does buying beat renting where I live?"
- "Run the rent-vs-buy numbers."
- "How long until buying breaks even?"
