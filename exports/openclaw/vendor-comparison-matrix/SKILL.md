---
name: vendor-comparison-matrix
description: "Compare vendors on a matrix that decides instead of decorates — the criteria weighted before the demos (so the shiny demo can't rewrite them), the evidence-based scoring with the marketing-vs-verified flags, the total-cost row that includes switching, and the reference-check questions that get honest answers. Use when asked compare these vendors/tools, build the selection matrix, the demo wowed us now what, or make this procurement decision defensible. Produces the weighted matrix, the scoring evidence rules, the TCO row, and the reference-call script."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/vendor-comparison-matrix.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Vendor Comparison Matrix Skill

Vendor selections get decided by the best demo and then justified by a matrix built afterward — criteria reverse-engineered to bless the favorite, which is how the shiny interface wins over the boring integration that actually mattered. The honest matrix inverts the order: criteria and weights are set *before* the demos (from the requirements, with the must-have/nice-to-have line drawn), scores cite evidence (the [competitive-scan-lite](../competitive-scan-lite/SKILL.md) claimed/observed/verified flags), the cost row is *total* cost (license + implementation + training + the switching cost both ways), and references get called with questions designed to pierce the happy-customer screen.

## What This Skill Produces

- **The weighted matrix** — criteria × weights, set pre-demo, with the must-have gate separate from the scored nice-to-haves
- **The evidence-scored grid** — every score flagged: 📢 vendor-claimed / 👁 demo-observed / ✅ verified (trial, reference, docs)
- **The TCO row** — the all-in number per vendor: license, implementation, training, integration, and the exit cost
- **The reference script** — the questions that get past the curated happy customer

## Required Inputs

Ask for these if not provided:
- **The requirements, from the users** — what the actual users need done (not the feature wishlist — the jobs); must-haves separated from nice-to-haves *before* any vendor contact ([proposal-skeleton](../proposal-skeleton/SKILL.md) honesty applied to procurement)
- **The vendor set** — the candidates, including the incumbent/do-nothing option scored on the same matrix
- **The weights' owners** — who says integration matters more than UI? Weights are decisions with owners, set in a room, pre-demo
- **The switching context** — what leaving the current tool costs (data migration, retraining, the [vendor-breakup-email](../vendor-breakup-email/SKILL.md) terms) — TCO's most-forgotten row

## Framework: The Matrix Rules

1. **Criteria before demos, weights before scores:** the matrix is built and weighted from requirements *before* vendor contact — because demos are professionally designed to rewrite your criteria ("we didn't know we needed that!" is the demo working as intended; new criteria discovered mid-process go through the weight-owners, explicitly). Must-haves gate (fail one = out, regardless of sparkle); nice-to-haves score.
2. **Scores carry evidence flags:** vendor-claimed (📢, worth little until verified), demo-observed (👁, better — but demos are their golden path, per [demo-script](../demo-script/SKILL.md) — you're watching their rehearsed best), verified (✅ — your trial on your data, the reference's testimony, the docs' actual limits). A matrix full of 📢 scores is the vendor's marketing, formatted as your diligence.
3. **The trial beats the demo:** for the finalists, the structured trial — your data, your workflow, your users, 2 weeks, with the success criteria written first ([survey-design-basics](../survey-design-basics/SKILL.md) pre-commitment logic) — converts 👁 to ✅ on the criteria that matter most. Vendors who resist a trial on the load-bearing features are answering the question in their own way.
4. **TCO includes both switching costs:** license + implementation + training + integration + *the cost of leaving the current tool* + — the row everyone omits — *the cost of leaving THIS vendor later* (export formats, contract terms, the lock-in read). The cheap license with proprietary data formats is quoting you the entry price of a room with expensive exits.
5. **References get piercing questions:** the vendor's references are curated — the script compensates: "What surprised you after go-live?" · "What would you do differently in implementation?" · "When something broke, walk me through the support experience" · "Who shouldn't buy this?" (the honest reference answers that one; the scripted one stumbles) — and the off-list move: find a customer they *didn't* offer ([the user-community forum is the uncurated reference pool]).

## Output Format

# Vendor Matrix: [decision] — [N] candidates incl. incumbent

## The Gate + Weights (set [date], pre-demo, owners: [names])
[Must-haves: pass/fail per vendor · Nice-to-haves × weights]

## The Scored Grid
| Criterion (weight) | [A] | [B] | [Incumbent] |
|---|---|---|---|
[Every cell: score + 📢/👁/✅ flag · the flag-count summary per vendor]

## The TCO Row
[Per vendor: license + implementation + training + integration + switch-in + exit-later = all-in over [term]]

## Reference Calls
[The script's piercing set · the off-list candidate found · findings per call]

## Quality Checks

- [ ] Criteria and weights predate all demos, with owners named
- [ ] Must-haves gate before any scoring charm applies
- [ ] Every score carries its evidence flag; finalists' key criteria reached ✅
- [ ] TCO includes both switching costs
- [ ] At least one reference question pierced the curation

## Anti-Patterns

- [ ] Do not build the matrix after the favorite emerges — that's a justification wearing a grid
- [ ] Do not let demos add criteria silently — discoveries route through the weight-owners
- [ ] Do not score marketing claims as facts — the flags exist because 📢 and ✅ are different knowledge
- [ ] Do not compare license prices as costs — TCO or the cheap option costs the most
- [ ] Do not skip the incumbent row — every selection is versus something, and do-nothing has a score

## Example Trigger Phrases

- "Compare these vendors/tools."
- "Build the selection matrix."
- "Make this procurement decision defensible."
