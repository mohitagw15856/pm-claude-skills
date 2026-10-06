---
name: inventory-policy
description: "Set inventory policy for an item class: segmentation, safety stock, and replenishment method. Use when asked to set safety stock levels, segment items by ABC/XYZ, choose reorder points vs min-max, define stocking policy, or review excess and obsolete inventory. Produces a segmentation grid, per-segment service targets and safety-stock logic, a replenishment method choice per segment, and an E&O review cadence."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/inventory-policy.html
metadata:
  {
    "openclaw": { "emoji": "📦" }
  }
---

# Inventory Policy Skill

Inventory policy set item-by-item on gut feel produces the classic warehouse: too much of what doesn't sell, stockouts on what does. This skill sets policy by *segment* — classify items by value and demand variability, assign service targets and safety-stock logic per segment, choose the replenishment method that fits the demand pattern, and put excess & obsolescence review on a calendar so write-offs stop arriving as year-end surprises.

## What This Skill Produces

- An ABC/XYZ segmentation grid with the item class placed in it
- Per-segment service-level targets and safety-stock sizing logic
- A replenishment method recommendation (reorder point vs. min-max vs. order-to-demand) per segment
- Review frequencies: how often parameters get recalculated per segment
- An excess & obsolescence (E&O) review cadence with aging triggers and disposition paths

## Required Inputs

Ask for these if not provided:
- **Item scope** — the items or class under review; count, annual usage value, unit costs
- **Demand pattern** — average demand, how lumpy/variable it is, seasonality, item lifecycle stage
- **Lead times** — supplier replenishment lead time and its variability
- **Service expectations** — target fill rate or customer commitments; consequence of a stockout
- **Constraints** — MOQs, shelf life, storage limits, working-capital pressure

From a thin brief, place the item in the grid using stated context, label placements `[inferred — confirm with 12 months of usage data]`, and proceed.

## Segmentation & Policy Framework

**ABC** by annual usage value (A ≈ top 80% of value, B next 15%, C last 5%). **XYZ** by demand variability (X = steady/predictable; Y = variable but forecastable, e.g. seasonal; Z = lumpy/intermittent).

| | X (steady) | Y (variable) | Z (lumpy) |
|---|---|---|---|
| **A (high value)** | 97–99% service; lean SS; tight ROP, frequent review | 95–98%; SS sized to lead-time demand variability; ROP, monthly recalc | Do **not** blanket-stock: order-to-demand or contract supplier-held stock; each stocking decision is a named business call |
| **B** | 95–97%; ROP with standard SS | 92–95%; ROP or min-max | Min-max with small max, or make-to-order |
| **C (low value)** | 90–95%; min-max, generous max (cheap to hold, expensive to expedite) | 90%; min-max, quarterly review | Stock only if stockout stops a line or an A-item sale; else non-stocked |

**Safety-stock logic (z-score framing, no heavy math):** safety stock buffers demand *and* lead-time variability over the replenishment lead time. The service target sets a z multiplier on that variability — roughly z ≈ 1.28 at 90%, 1.65 at 95%, 2.05 at 98%, 2.33 at 99%. Two judgments matter more than the formula: the curve is nonlinear (95→99% costs far more stock than 90→95% — spend those points only on A-items), and for Z-items the variability estimate itself is unreliable, so formula-driven SS produces nonsense — use lead-time-demand coverage plus judgment, and say so.

**Reorder point vs. min-max:** ROP (order a fixed/economic quantity when stock hits demand-over-lead-time + SS) suits steady movers with continuous tracking — A/B items. Min-max (order up to max when stock falls to min) suits cheap, periodically reviewed, or lumpy items — most C and Z items. Respect MOQs: if MOQ ≫ the economic quantity, that's a supplier negotiation or a stocking-decision review, not a bigger max.

**E&O cadence:** monthly — flag items with >180 days of supply on hand or no usage in 90 days; quarterly — disposition review (rework / return / redeploy / discount / scrap) with finance, reserve recommendation per aging band; at lifecycle events — last-time-buy sizing when a supplier or product end-of-lifes.

## Output Format

### Inventory Policy: [item class / scope]

**1. Segmentation** — the grid populated with item counts and value per cell; method used.

**2. Policy table** — Segment | Service target | Safety-stock logic | Replenishment method | Parameter review frequency.

**3. Item-class recommendation** — for the specific scope: segment, target, SS sizing, method, and the parameters to set, with assumptions labelled.

**4. E&O cadence** — triggers, review calendar, disposition paths, reserve approach.

**5. Exceptions** — items policy must not automate (shelf-life, LTB, contractual stock) and their handling.

## Quality Checks

- [ ] Segmentation uses both value (ABC) and variability (XYZ) — never ABC alone
- [ ] Service targets differ by segment and the stock cost of high targets is acknowledged
- [ ] AZ cell is handled as named decisions, not a formula output
- [ ] Replenishment method matches demand pattern and review practicality, with MOQ conflicts flagged
- [ ] E&O review has thresholds, a calendar, and disposition paths — not "review periodically"
- [ ] Every inferred parameter is labelled with the data needed to confirm it

## Anti-Patterns

- [ ] Do not set one service level for everything — 98% across the board is working capital burned on C-items
- [ ] Do not apply z-score safety stock to lumpy Z-demand — the variability input is garbage and the output will be too
- [ ] Do not size safety stock off the forecast alone — lead-time variability is half the buffer's job
- [ ] Do not treat MOQ-driven stock as safety stock — it's a cost of the deal and should be challenged with the supplier
- [ ] Do not let E&O wait for the annual count — aging inventory loses disposition options every month it sits
- [ ] Do not recalculate parameters weekly for C-items or annually for A-items — review effort follows value

## Example Trigger Phrases

- "Set safety stock levels."
- "Choose reorder points vs min-max."
- "Define stocking policy."
- "Review excess and obsolete inventory."
