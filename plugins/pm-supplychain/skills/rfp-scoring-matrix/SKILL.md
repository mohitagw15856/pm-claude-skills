---
name: rfp-scoring-matrix
description: "Build a weighted RFP evaluation matrix and defensible award recommendation. Use when asked to score RFP responses, compare vendor bids, build a supplier evaluation matrix, run a sourcing event scorecard, or decide which bidder to award. Produces a criteria tree with weights, scoring anchors, normalized price scores, a consensus-scored comparison table, and an award recommendation with sensitivity check."
---

# RFP Scoring Matrix Skill

An award that can't survive a losing bidder's challenge — or a CFO's "why not the cheapest?" — wasn't really evaluated. This skill builds a weighted evaluation matrix with explicit scoring anchors, normalizes price so cost and capability are comparable, structures consensus scoring across evaluators, and stress-tests the winner before recommending an award.

## What This Skill Produces

- A criteria tree (categories → sub-criteria) with weights that sum to 100%
- Scoring anchors (what a 1, 3, and 5 looks like) for every criterion
- A normalized price-scoring method so cost comparisons are apples-to-apples
- A consensus-scoring protocol for the evaluation team
- A scored comparison table and award recommendation with a weight-sensitivity check

## Required Inputs

Ask for these if not provided:
- **What is being sourced** — category, scope, contract length, estimated annual spend
- **The bidders** — names or count, and their proposals or a summary of each
- **What matters most** — cost pressure vs. capability vs. risk vs. service, in the buyer's words
- **Evaluation team** — who scores (procurement, technical, quality, finance) and any mandatory pass/fail gates (certifications, financial health, compliance)
- **Pricing structure** — unit prices, tiers, one-time costs, so total cost of ownership can be framed

If the brief is thin, propose a default weighting and label it `[assumed — confirm weights before scoring]`. Never refuse to draft.

## Weighting & Scoring Framework

**Default category weights** (adjust to the category's risk profile, then lock before opening bids):

| Category | Default weight | Shift up when… |
|---|---|---|
| Total cost | 30% | Commodity item, many qualified suppliers |
| Capability & fit | 30% | Custom/engineered item, integration effort |
| Risk (financial, supply, geographic, compliance) | 20% | Single-source exposure, long lead times |
| Service & relationship (SLAs, support, flexibility) | 20% | High change-rate demand, aftermarket needs |

**Scoring anchors** — define per criterion on a 1–5 scale before scoring: **5** = exceeds requirement with evidence; **3** = meets requirement as written; **1** = material gap or unsubstantiated claim. Never let evaluators invent their own scale mid-scoring.

**Price normalization** — score on comparable total cost, not headline unit price: lowest compliant bid gets 5; others scored as `5 × (lowest bid ÷ this bid)`. State the volume scenario used. If bids have different tier structures, price them all at the same forecast volume.

**Consensus protocol** — evaluators score independently first; then reconcile only criteria where scores differ by ≥2 points, discussing evidence, not averaging silently. Pass/fail gates are applied *before* weighted scoring — a bidder who fails a gate is out regardless of score.

## Output Format

### RFP Evaluation: [category / event name]

**1. Scope & gates** — what's being sourced, spend, and the pass/fail gates applied.

**2. Criteria tree & weights** — table: Category | Sub-criterion | Weight | Anchor for 5 / 3 / 1.

**3. Scoring matrix** — table: Criterion | Weight | [Bidder A] | [Bidder B] | … with weighted totals; price row shows the normalization math.

**4. Consensus notes** — criteria where evaluators diverged ≥2 points and how each was resolved.

**5. Award recommendation** — recommended bidder, the margin over runner-up, and key negotiation points before signature.

**6. Sensitivity check** — shift each category weight ±10% (rebalancing the rest): does the winner change? If yes, name the swing criterion and say the decision is weight-sensitive — flag for stakeholder alignment before award.

## Quality Checks

- [ ] Weights sum to 100% and were set (or labeled assumed) before scores were assigned
- [ ] Every criterion has written anchors for 5 / 3 / 1 — no unanchored gut scores
- [ ] Price scores are normalized on total comparable cost at a stated volume scenario
- [ ] Pass/fail gates applied before weighting, with any eliminated bidders named
- [ ] Sensitivity check run — the recommendation states whether the winner is robust to ±10% weight shifts
- [ ] Recommendation is defensible to a losing bidder: every score traces to evidence in their proposal

## Anti-Patterns

- [ ] Do not average unit prices across volume tiers — price all bids at the same forecast volume
- [ ] Do not set or change weights after seeing the bids — that's reverse-engineering an award
- [ ] Do not let a low price rescue a bidder who failed a mandatory gate
- [ ] Do not average away a 2-point evaluator disagreement — reconcile it with evidence
- [ ] Do not score vendor claims without evidence — an unsubstantiated "yes we can" anchors at 1–2, not 3
- [ ] Do not present an award without the sensitivity check — a winner by 0.1 points at chosen weights is a coin flip, and the readout must say so

## Example Trigger Phrases

- "Score RFP responses."
- "Compare vendor bids."
- "Build a supplier evaluation matrix."
- "Run a sourcing event scorecard."
- "Decide which bidder to award."
