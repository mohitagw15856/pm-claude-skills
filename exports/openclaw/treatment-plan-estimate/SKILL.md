---
name: treatment-plan-estimate
description: "Build a veterinary treatment plan with tiered options and a cost estimate to discuss with a pet owner. Use when asked to prepare a treatment plan, create an estimate for an owner, present diagnostic/treatment options, or have the cost conversation in a vet practice. Produces a clear plan (recommended vs. acceptable-alternative vs. minimum), line-item cost ranges, the medical rationale in plain language, and how to frame the money conversation with empathy so the owner can make an informed, unpressured decision."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/treatment-plan-estimate.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Treatment Plan Estimate Skill

The hardest conversation in a vet practice is money, and avoiding it hurts everyone — the owner feels ambushed by the bill, the pet gets under-treated, the practice eats the loss. This skill builds a plan with honest options at different price points and frames the estimate so the owner can choose with full information and no shame.

## Working from a brief

Given the presentation and the recommended workup/treatment, **produce the full plan and estimate** — offer tiered options, use plain owner-facing language, and label cost figures as estimate ranges to be confirmed by the practice. Never diagnose beyond the information given or state prices as exact.

## Required Inputs

Ask for (if not provided, else infer and label):
- **The patient** (species, age, presenting problem) and the **recommended diagnostics/treatment**
- **Practice pricing** (or a note to fill from the fee schedule) and typical ranges
- **Owner context if known** — budget sensitivity, attachment, prior decisions

## Output Format

### The plan, in plain language
What's going on (or what we need to find out), and why each step is recommended — jargon translated for the owner.

### Tiered options

| Tier | What it includes | Why | Estimated cost (range) |
|---|---|---|---|
| **Recommended** (gold standard) | full workup/treatment | best outcome/certainty | |
| **Acceptable alternative** | the pragmatic middle | good care within constraints | |
| **Minimum / palliative** | comfort + essentials | when budget is tight or prognosis guarded | |

Line items with ranges; note what could change the total (findings, complications).

### The money conversation
How to present it with empathy: normalize asking about cost, present options without judgment, avoid pressure, and offer any payment options/financing the practice supports. Make clear a "no" to the top tier is a valid, respected choice.

### Consent & next step
What the owner is agreeing to, the deposit/authorization, and the decision point (what happens if findings change the plan mid-procedure).

## Quality Checks

- [ ] At least two tiers are offered (not a single take-it-or-leave-it number)
- [ ] Medical rationale is in plain, owner-friendly language
- [ ] Costs are honest ranges with what could change them, labeled as estimates
- [ ] The framing is empathetic and pressure-free; declining the top tier is respected
- [ ] Consent and the mid-procedure "if findings change" decision point are covered
- [ ] No exact-price claims or diagnoses beyond the information provided

## Anti-Patterns

- One expensive plan with no alternative (owner declines everything or feels trapped)
- Vet jargon the owner can't act on
- Hiding or downplaying cost until the invoice
- Guilt or pressure ("if you loved your pet…")
- Stating estimates as fixed prices
- No plan for when intra-op findings change the scope and cost
