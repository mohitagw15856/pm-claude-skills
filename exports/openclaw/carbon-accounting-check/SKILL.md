---
name: carbon-accounting-check
description: "Sanity-check a greenhouse gas inventory before it goes into a report or gets audited. Use when asked to review a carbon footprint, check a GHG inventory, validate scope 1/2/3 numbers, explain a year-over-year emissions change, or prepare emissions data for assurance. Produces a boundary review, data-quality assessment, emission-factor sensitivity list, YoY bridge, and a fix-before-publishing list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/carbon-accounting-check.html
metadata:
  {
    "openclaw": { "emoji": "🌍" }
  }
---

# Carbon Accounting Check Skill

A GHG inventory fails audit (and credibility) on boundaries, factors, and data quality — rarely on arithmetic. This skill runs a structured sanity pass over an inventory so the weak points are found internally, not by an assurer or a journalist. It reviews rigor; it does not certify compliance.

## What This Skill Produces

- A scope 1/2/3 boundary review with gaps and out-of-boundary items named
- A data-quality tier map (measured / calculated / estimated / proxy) per emission source
- The top emission-factor sensitivities — where a factor choice swings the total
- A year-over-year bridge separating real reduction from methodology or boundary change
- Double-counting flags and a prioritized fix list

## Required Inputs

Ask for these if not provided; if the brief is thin, proceed with clearly labelled assumptions rather than refusing:

- **Inventory data** — emissions by scope and category, with units (tCO2e), and the reporting year
- **Organizational boundary** — operational control, financial control, or equity share, and which entities are in/out
- **Scope 2 method(s)** — location-based, market-based, or both; contractual instruments held (RECs, GOs, PPAs)
- **Emission factor sources** — which factor sets and vintages were used per category
- **Data provenance** — per major source: meter/invoice, activity-data calculation, estimate, or spend-based proxy
- **Prior-year inventory** (optional) — needed for the YoY bridge
- **Offsets or removals held** (optional) — reviewed separately, never netted

## Review Framework

Walk the inventory in this order:

**1. Boundary.** Confirm the consolidation approach is stated and applied consistently. For scope 3, check all 15 GHG Protocol categories were screened — a category may be excluded only with a stated reason and a rough size estimate.

**2. Scope 2 duality.** Both market- and location-based figures should exist. Flag market-based claims without matching contractual instruments (vintage, geography, retirement).

**3. Data-quality tiers.** Assign each material source a tier and estimate what share of the total sits in each:

| Tier | Basis | Typical uncertainty |
|---|---|---|
| Measured | Meters, fuel invoices, utility bills | Low |
| Calculated | Activity data × published factor | Low–medium |
| Estimated | Extrapolation, averages, occupancy models | Medium–high |
| Proxy | Spend-based, industry-average intensity | High — directional only |

Flag any headline claim (e.g. "-12% YoY") that rests mostly on proxy-tier data.

**4. Factor sensitivity.** Identify the 3–5 sources where switching to an equally defensible factor set or vintage moves the total by >2%. Recompute or estimate the swing.

**5. YoY bridge.** Decompose the change into: activity change, factor/vintage updates, boundary changes, methodology changes, and data-quality improvements. Only the first is a real emissions trend.

**6. Double-counting traps.** Check the classics: fleet fuel in both scope 1 and scope 3 category 6; electricity in scope 2 and again via spend-based scope 3; parent and subsidiary both claiming the same site; RECs claimed against grid averages already lowered by those RECs; leased assets counted by both lessor and lessee.

## Output Format

### GHG inventory check: [organization, reporting year]

**1. Summary verdict** — publishable as-is / publishable with caveats / fix first, with the two or three decisive reasons.

**2. Boundary review** — consolidation approach, scope 3 category screening table (included / excluded + reason + size estimate), gaps.

**3. Data-quality map** — table of major sources × tier × share of total, with the weakest material sources called out.

**4. Factor sensitivities** — the top swings, each with source, alternative factor, and estimated delta.

**5. YoY bridge** — waterfall from prior year to current year with each driver quantified or labelled as an estimate.

**6. Flags and fixes** — numbered list, each with severity (blocks publication / caveat needed / improve next cycle) and a concrete fix.

Include this line in the artifact: *"Verify boundary, methodology, and disclosure choices against the applicable standard (e.g. GHG Protocol, ISO 14064-1) and regulation with your compliance team and assurer."*

## Quality Checks

- [ ] Consolidation approach is stated and every in/out entity decision is visible
- [ ] All 15 scope 3 categories are screened; exclusions have a reason and a size estimate
- [ ] Both scope 2 methods are reported, or the absence of one is flagged
- [ ] Every material source has a data-quality tier; the share of total per tier is stated
- [ ] The YoY bridge separates real activity change from methodology and boundary effects
- [ ] Each flag has a severity and a concrete fix, not just an observation
- [ ] Assumptions made from a thin brief are labelled as assumptions

## Anti-Patterns

- [ ] Do not net offsets or removals against gross emissions in the headline number — report gross, then offsets separately
- [ ] Do not present a market-based scope 2 figure without naming the contractual instruments behind it
- [ ] Do not let a YoY "reduction" stand if it is driven by a factor-vintage update or boundary change — say so
- [ ] Do not treat spend-based proxy data as if it supports precise claims — flag it as directional
- [ ] Do not silently drop scope 3 categories — every exclusion needs a reason and a size estimate
- [ ] Do not certify compliance — this is a rigor review; assurance and legal sign-off stay with the professionals

## Based On

GHG Protocol Corporate Standard and Scope 2/Scope 3 guidance practice (boundaries, dual reporting, data-quality tiers, recalculation policy).

## Example Trigger Phrases

- "Review a carbon footprint."
- "Check a GHG inventory."
- "Validate scope 1/2/3 numbers."
- "Explain a year-over-year emissions change."
- "Prepare emissions data for assurance."
