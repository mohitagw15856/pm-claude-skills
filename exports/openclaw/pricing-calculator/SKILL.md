---
name: pricing-calculator
description: "Model pricing scenarios — tiers, margins, break-even, and the revenue impact of a price change. Use when asked to calculate pricing, model a price increase, find break-even volume, set tier prices to a margin target, or estimate the revenue effect of a pricing change. Produces a computed pricing model (per-tier margin, break-even units, price-change revenue impact with an elasticity assumption) and a recommendation."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/pricing-calculator.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Pricing Calculator Skill

Pricing decisions are usually made on gut and defended with a spreadsheet built under deadline. This
skill does the math cleanly: the margin on each tier, the break-even volume, and the revenue impact of
a price change under an explicit elasticity assumption — so a pricing proposal rests on numbers, with
the assumptions visible. (For the *strategy* — model, packaging, positioning — pair with
[`pricing-strategy`](../pricing-strategy/SKILL.md); this runs the numbers.)

## Required Inputs

Ask for these only if they aren't already provided:

- **The scenario** — set a tier price to a margin target, find break-even, or model a price change.
- **Costs** — variable cost per unit/seat, and fixed costs if you want break-even.
- **Current price & volume** (for a price-change model).
- **Elasticity assumption** — expected % volume change per % price change (state it; it's the key lever and it's an estimate).

## Output Format

### Pricing Model: [product / scenario]

**1. The numbers** (via the helper):

- **Per tier:** price, variable cost, **gross margin %**, contribution per unit.
- **Break-even:** units (or MRR) to cover fixed costs at this price/margin.
- **Price-change impact:** at +X% price with an assumed Y% volume change → net revenue and margin effect, vs. status quo.

| Scenario | Price | Volume | Revenue | Margin |
|---|---|---|---|---|
| Today | | | | |
| Proposed | | | | |

**2. The recommendation** — what the math supports, and the volume drop you could absorb before the change loses money (the break-even elasticity — the most decision-useful number).

**3. Assumptions** — elasticity is an estimate; state it, and how sensitive the conclusion is to it.

## Programmatic Helper

`scripts/pricing.py` (stdlib only) runs the margin / break-even / price-change math:

```bash
# in.json: {"current_price":50,"variable_cost":10,"current_volume":1000,"price_change_pct":0.2,"volume_change_pct":-0.1,"fixed_costs":20000}
python3 scripts/pricing.py in.json
python3 scripts/pricing.py in.json --json
```

## Quality Checks

- [ ] Margins are computed on price minus variable cost, shown as % and absolute
- [ ] The elasticity assumption is stated explicitly (not hidden in the result)
- [ ] The price-change model reports the **break-even volume drop** you can absorb
- [ ] Break-even uses fixed costs and contribution margin correctly
- [ ] The conclusion notes how sensitive it is to the elasticity guess

## Anti-Patterns

- [ ] Do not model a price rise assuming volume holds — always state an elasticity, even a conservative one
- [ ] Do not compute margin on revenue — use contribution (price − variable cost)
- [ ] Do not present one elasticity as fact — show the break-even elasticity so the reader judges the risk
- [ ] Do not ignore fixed costs in break-even — contribution must cover them before profit
- [ ] Do not confuse this with strategy — the number doesn't decide the model/packaging; pair with pricing-strategy

## Based On

Pricing & break-even analysis — contribution margin, break-even volume, price-elasticity sensitivity.

## Example Trigger Phrases

- "Calculate pricing."
- "Model a price increase."
- "Find break-even volume."
- "Set tier prices to a margin target."
- "Estimate the revenue effect of a pricing change."
