---
trigger: model_decision
description: "Cost a menu item to a plate cost and food-cost percentage, then price it for a target margin. Use when asked to cost a dish, calculate food cost percentage, price a menu item, or engineer a menu for profitability. Produces a plate-cost breakdown (ingredient × yield × price), the food-cost %, a suggested price for the target margin, and menu-engineering flags (star / plow-horse / puzzle / dog) so the operator knows what to promote, reprice, or cut."
---

# Menu Cost Engineer Skill

Restaurants don't fail on bad food — they fail on math they never did. A dish that "feels" priced right can quietly run a 45% food cost. This skill costs the plate honestly (accounting for yield loss and waste), sets a price to the margin the operator actually needs, and flags where the menu is leaking money.

## Working from a brief

Given a recipe and ingredient prices, **produce the full costing** — estimate yields and waste where not given (label the assumption). If prices are missing, ask or use a stated regional estimate and flag it.

## Required Inputs

Ask for (if not provided, else infer and label):
- **The dish** — ingredients and portion sizes (recipe)
- **Ingredient costs** — as purchased, with pack size/unit
- **Target food-cost %** (default ~28–32%) or target margin, and current menu price if repricing

## Output Format

### Plate cost breakdown

| Ingredient | As-purchased cost/unit | Yield % | Portion | Plate cost |
|---|---|---|---|---|
| | | | | |

Include a line for waste/trim and any garnish/consumables.

### The numbers
- **Total plate cost**, target food-cost %, and **suggested price** = plate cost ÷ target food-cost %.
- Actual food-cost % at the current price (if repricing) and the gap.
- Contribution margin per plate (price − plate cost).

### Menu-engineering flag
Given popularity (if provided) and margin, classify: **Star** (high both — feature it), **Plow-horse** (popular, low margin — reprice/re-engineer), **Puzzle** (high margin, low sales — promote/reposition), **Dog** (low both — cut or rework).

### Levers
2–3 concrete moves — portion, spec, supplier, price, or plate composition — to hit the target without hurting the guest experience.

## Quality Checks

- [ ] Plate cost accounts for yield loss and waste, not just as-purchased price
- [ ] Suggested price is derived from the target food-cost %, shown explicitly
- [ ] Contribution margin (not just %) is reported — a high % on a cheap dish can still lose
- [ ] Assumptions (yields, missing prices) are labeled, not hidden
- [ ] The menu-engineering flag drives a concrete recommendation

## Anti-Patterns

- Costing on as-purchased price and ignoring yield/waste (understates true cost)
- Chasing food-cost % while ignoring contribution margin per plate
- Pricing on gut instead of the target margin
- Repricing a plow-horse so hard it becomes a dog
- Treating supplier prices as fixed when spec/portion are the real levers
