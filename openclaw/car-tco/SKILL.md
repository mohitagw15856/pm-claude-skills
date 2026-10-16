---
name: car-tco
description: "Compare the total cost of car ownership across buy-new, buy-used, lease, and keep-your-current-car — depreciation, insurance, maintenance ramp, and fuel over a real horizon, not just the monthly payment. Use when asked should I lease or buy a car, is it cheaper to keep my old car, what does this car really cost per month, or new vs used total cost. Produces the ranked scenario totals, per-month true cost, the assumption ledger, and the not-modeled list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/car-tco.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Car TCO Skill

Cars are sold on monthly payments and owned on total cost — and the two rank options differently. Depreciation (the biggest cost of a new car) never appears on a statement; maintenance (the biggest fear about an old car) is usually smaller than a year of new-car depreciation. This skill compares buy-new, buy-used, lease-forever, and keep-current on the same total-cost basis over the same horizon.

## What This Skill Produces

- **Ranked scenario totals** — every requested scenario over the same horizon, cheapest first
- **True per-month cost** — total ÷ months, the number to compare against the payment the dealer quotes
- **The assumption ledger** — depreciation curve, maintenance ramp, insurance deltas, all labeled
- **The not-modeled list** — financing interest, jurisdiction taxes, reliability luck

## Required Inputs

Ask for these if not provided:
- **Which scenarios to compare** — any of: new price, used-equivalent price, lease terms, current car's value + annual maintenance
- **Horizon** — years they realistically keep cars (default 8, labeled); short horizons flatter leasing, long ones flatter buying
- **Miles per year** and rough fuel/energy cost (defaults 12,000 mi / $0.14 per mile, labeled)

## Programmatic Helper

```bash
python3 scripts/car_tco.py --new-price 38000 --used-price 24000 --lease-month 420 --keep-value 9000
python3 scripts/car_tco.py --new-price 38000 --keep-value 9000 --keep-maint 1800 --horizon 6 --json
```

Deterministic. Depreciation: 20% year one then 10%/yr for new, gentler for used/current. Maintenance ramps 8%/yr (used cars start further up the ramp). Leases re-lease at each term end with a fresh drive-off. Resale value is credited back — TCO is what you spent minus what you can recover.

## Framework: The Payment Illusion Rules

- **Depreciation is the invisible line item** — a new car's largest cost has no bill; it's the resale-value credit shrinking
- **"My old car needs $2,000 of work" is usually cheap** — compare the repair to a year of the *replacement's* depreciation before calling it "not worth fixing"
- **Leasing buys flexibility, not savings** — lease-forever means paying peak depreciation years forever; price that honestly and let people buy flexibility knowingly
- **Margins under ~10% are noise** — the model's assumptions can't resolve differences that small; say "roughly a tie," not a winner
- **The horizon drives the ranking** — always name it; the same inputs rank differently at 3 years vs 10

## Output Format

---

# Car TCO: [scenarios] over [N] years

## The Ranking
[Script output: totals cheapest-first, per-month true cost]

## Reading the Ranking
[Two sentences: how far apart the options really are, and which assumption could flip the order.]

## What This Model Ignores
Financing interest (run the loan separately) · taxes and fees by jurisdiction · reliability variance (a lemon breaks any model) · the non-financials (safety features, the want).

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

---

## Quality Checks

- [ ] All scenarios use the same horizon and mileage
- [ ] Resale value is credited back in every ownership scenario
- [ ] Per-month true cost appears next to the totals
- [ ] Sub-10% margins are called ties, not winners
- [ ] The disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not rank on monthly payment — that's the illusion this skill exists to correct
- [ ] Do not omit depreciation or resale from ownership scenarios
- [ ] Do not treat maintenance fears as data — use the ramp, and compare repairs to replacement depreciation
- [ ] Do not extrapolate one scenario's horizon onto another (a 3-year lease vs 8-year ownership is not a comparison)
- [ ] Do not moralize the want — price the options honestly and let the user choose with open eyes

## Example Trigger Phrases

- "Should I lease?"
- "Buy a car."
- "Is it cheaper to keep my old car?"
- "What does this car really cost per month?"
