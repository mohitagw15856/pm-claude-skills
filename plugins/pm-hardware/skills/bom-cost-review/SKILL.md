---
name: bom-cost-review
description: "Review a bill of materials for cost, risk, and supply exposure — cost rollup, top-10 cost drivers, single-source and EOL risk, MOQ vs forecast mismatch, cost-down candidates, and tariff/logistics sensitivity. Use when asked to review a BOM, find cost-down opportunities, check component sourcing risk, or sanity-check BOM cost against target. Produces a structured BOM review with a cost driver Pareto, risk flags per line, and a prioritised cost-down list."
---

# BOM Cost Review Skill

A BOM is a list of promises: that each part will be buyable, at that price, at your volume, for the life of the product. This skill reviews a BOM the way a sourcing veteran does — Pareto the cost, flag the single-source and end-of-life traps before they become line-down events, and separate real cost-down candidates from wishful thinking.

## What This Skill Produces

- A cost rollup by commodity class with % of total
- Top-10 cost drivers (they usually carry 70–80% of BOM cost)
- Risk flags per line: single-source, lifecycle (EOL/NRND), MOQ mismatch, long lead time
- A prioritised cost-down candidate list with realistic savings and effort
- Tariff and logistics sensitivity notes

## Required Inputs

Ask for these if not provided; work with a partial BOM if that's all there is, labelling gaps `[missing — request from EE/sourcing]`:

- **The BOM** — part numbers, descriptions, quantities, unit costs (any format; structure it)
- **Annual forecast volume** — needed for MOQ math and price-break realism
- **Target BOM cost** — what "good" looks like
- **Sourcing detail if available** — approved vendors, country of origin, lead times, lifecycle status
- **Product stage** — EVT-stage BOMs get design-out suggestions; MP-stage BOMs get negotiation/resourcing ones

## Review Framework

**1. Rollup.** Group into commodity classes (PCBA/semiconductors, passives, display, battery, mechanicals/enclosure, cables & connectors, packaging & accessories). Show cost and % per class, and total vs target with the gap.

**2. Pareto.** Rank the top-10 lines by extended cost (unit × qty). Everything after these is noise until the big ten are handled.

**3. Risk flags** — apply per line, worst flag wins:

| Flag | Trigger | Why it matters |
|---|---|---|
| 🔴 Single-source | One qualified vendor, no drop-in alternate | One factory fire from line-down |
| 🔴 EOL / Obsolete | Lifecycle status EOL or last-time-buy announced | Forced redesign or LTB cash outlay |
| 🟠 NRND | Not recommended for new design | Fine now, redesign within product life |
| 🟠 MOQ mismatch | MOQ > ~13 weeks of forecast demand | Cash tied up, scrap risk on ECO |
| 🟠 Long lead | Lead time > 16 weeks | Forecast error becomes shortage |
| 🟡 Custom/tooled part | Custom silicon, tooled mechanical | Switching cost locks the vendor in |

**4. Cost-down candidates.** For each: the lever (negotiate at volume break / second-source and dual-run / value-engineer spec — e.g. tighter-than-needed tolerance, over-spec'd connector / design-out entirely), estimated saving per unit, effort, and earliest cut-in (which build or ECO).

**5. Tariff & logistics sensitivity.** Note country of origin concentration, HTS-code exposure for high-value lines, and what a duty change or freight spike does to landed cost.

## Output Format

### BOM review: [product / revision]

1. **Summary** — total BOM cost vs target, gap, one-line verdict
2. **Cost rollup** — table by commodity class (cost, % of total)
3. **Top-10 cost drivers** — table: part, qty, unit cost, extended cost, % of BOM, flags
4. **Risk register** — every 🔴/🟠 line with flag, evidence, and recommended action + owner
5. **Cost-down candidates** — ranked table: lever, est. saving/unit, effort, cut-in point, confidence
6. **Tariff/logistics sensitivity** — exposure summary and scenarios
7. **Data gaps** — lines missing cost, lifecycle, or sourcing data `[missing — request]`

## Quality Checks

- [ ] Rollup total reconciles with the sum of lines — no silent arithmetic drift
- [ ] Every top-10 line has a lifecycle and sourcing note, even if `[missing — request]`
- [ ] Each cost-down candidate names the lever, the saving, and the cut-in build/ECO
- [ ] MOQ flags are computed against the stated forecast, not gut feel
- [ ] Single-source flags distinguish "no alternate exists" from "alternate not yet qualified"

## Anti-Patterns

- [ ] Do not quote unit prices without a volume — a price without its quantity break is fiction
- [ ] Do not chase pennies on passives while a top-10 line is single-sourced and EOL
- [ ] Do not claim a cost-down saving without naming the lever and who has to act
- [ ] Do not treat distributor stock as supply security for a single-source part
- [ ] Do not ignore custom/tooled parts in risk review — they are the hardest to move
- [ ] Do not fabricate costs for missing lines — label them and carry the uncertainty into the total

## Example Trigger Phrases

- "Review a BOM."
- "Find cost-down opportunities."
- "Check component sourcing risk."
- "Sanity-check BOM cost against target."
