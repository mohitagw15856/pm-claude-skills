---
name: ai-roi-audit
description: "Audit whether the organisation's AI spend actually paid — measured against baselines, not vendor math or vibes. Use when a CFO asks what the AI tools returned, when renewing AI contracts, when consolidating overlapping AI subscriptions, or to build the measurement plan before the next spend. Produces an ROI audit with per-tool verdicts (keep/consolidate/cut), the honest-measurement method behind each number, and a baseline plan for whatever can't be scored yet. To forecast ROI before an investment use roi-estimator; this skill measures what already happened."
---

# AI ROI Audit Skill

Every org now spends real money on AI tools, and most justify it with adoption counts ("80% weekly active!") — which measure enthusiasm, not return. This skill audits what the spend *returned*, using methods that survive a sceptical CFO: baselines, counterfactuals, and quality deltas, with "we can't know yet" said out loud where it's true.

## What This Skill Produces

- A **per-tool verdict table**: keep / consolidate / renegotiate / cut, each with its evidence
- The **measurement behind each number** — method, baseline, confidence — so the audit is checkable
- A **hidden-cost ledger** (the part vendor ROI decks omit)
- A **baseline plan** for every "unknown", so next year's audit has data

## Required Inputs

Ask for (if not already provided):
- **The AI tool inventory with costs**: subscriptions, API spend, seats — and utilisation if known
- **What each tool was bought to do** (the promised outcome, from the original business case if it exists)
- **Available evidence**: usage data, before/after metrics, time studies, quality data, anecdotes (labelled as anecdotes)
- **The decision at stake**: renewal? consolidation? budget defence? (calibrates depth)

## Audit Method

1. **Reconstruct the promise.** Per tool: what outcome justified the purchase — time saved, quality improved, headcount avoided, revenue created? A tool without a stated outcome gets audited against the best-fit guess, *flagged as retrofitted*.
2. **Score with the strongest method the evidence allows**, in descending order of credibility:
   - **Natural experiment** — teams/periods with vs without the tool, same work (best available in most orgs)
   - **Before/after with baseline** — the metric before adoption vs after, seasonality noted
   - **Task-level time study** — 10-20 real tasks timed with/without (cheap to run *during* the audit — do it rather than skip to tier 4)
   - **Structured self-report** — users estimating time saved, discounted (self-reported AI savings run ~2× actuals; say so)
   Never present a tier-4 number with tier-1 confidence. Every figure carries its method and a confidence label.
3. **Count the hidden costs.** Verification time (humans checking AI output), rework from AI errors that shipped, licence sprawl (seats bought > seats active), integration/prompt-maintenance time, and training time. These come off the gross benefit — an ROI audit that skips them is a vendor deck.
4. **Convert honestly.** Time saved → money only via a stated loaded rate *and* a stated assumption about what the time became (more output? earlier finishes? — different values). "Saved 400 hours" that nobody redeployed is capacity, not cash; label which one you're claiming.
5. **Verdict per tool.** Keep (positive with tier ≤2 evidence) · Consolidate (positive but duplicative — name the overlap) · Renegotiate (positive but mispriced vs utilisation) · Cut (negative or unmeasurable after a fair baseline attempt). Ties break toward the tool with a measurement plan.
6. **Leave the audit better than you found it.** Every "unknown" verdict gets a baseline plan: the metric, how it's instrumented, and the review date. The first audit is mostly this; that's a finding, not a failure.

## Output Format

### AI ROI Audit: [org/team] — [period]

**Total AI spend:** [sum] · **Verdict summary:** [n keep / n consolidate / n renegotiate / n cut / n unknown]

| Tool | Annual cost | Promised outcome | Measured return | Method (tier) | Confidence | Verdict |
|---|---|---|---|---|---|---|

**Hidden-cost ledger:** [verification, rework, sprawl, maintenance — quantified where possible, listed where not]

**The math shown:** [for each material number: baseline, method, conversion assumptions]

**Baseline plan for the unknowns:** [tool → metric → instrumentation → review date]

**One-paragraph CFO summary:** [net position, the two decisions to make, and what will be measurable by next audit]

## Quality Checks

- [ ] Every figure carries its measurement method and confidence — no naked numbers
- [ ] Self-reported savings are discounted and labelled as self-reported
- [ ] Hidden costs appear as line items, not a caveat sentence
- [ ] Time→money conversions state the loaded rate and the capacity-vs-cash claim
- [ ] Every "unknown" has a baseline plan with a date — the audit compounds

## Anti-Patterns

- [ ] Do not use adoption or engagement as return — usage is a cost signal until an outcome moves
- [ ] Do not accept vendor ROI calculators as evidence — reconstruct from your own data or score it unknown
- [ ] Do not average across tools into one triumphant number — the verdict is per-tool or it decides nothing
- [ ] Do not claim headcount avoidance without the counterfactual hiring plan that was actually cancelled
- [ ] Do not punish honest "unknowns" by cutting them reflexively — cut requires a *failed* measurement attempt, not a missing one

## Example Trigger Phrases

- "What did our AI tools actually return?"
- "Should we renew these AI contracts?"
- "We pay for three overlapping AI subscriptions: which do we keep?"
- "Build the measurement plan before the next AI spend."
