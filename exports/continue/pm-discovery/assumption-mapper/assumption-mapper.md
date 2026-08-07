---
name: "Extract and risk-rate hidden assumptions in a product brief "
description: "Extract and risk-rate hidden assumptions in a product brief or PRD. Use when asked to review a product brief for assumptions, audit a PRD for risks, find hidden assumptions, validate product plans, or run an assumption analysis. Produces a prioritised assumption map with confidence and impact scores, recommended validation methods, and critical assumption flags."
---

# Assumption Mapper Skill

Surface and prioritize the untested assumptions embedded in any product plan before development begins.

## Required Inputs

Ask the user for these if not provided:
- **Product brief, PRD, or concept description** (even rough notes work)
- **Stage** (concept / discovery / pre-build / post-launch — affects which assumptions matter most)

## Where this sits — the spine's entry point

This is the front of the product-decision spine: **`assumption-mapper` → `/prd-template`
→ `/rice-prioritisation` → `/roadmap-narrative`**. It takes a raw idea or brief and
hands the next skill one thing: **the riskiest assumption, and whether it survived a
cheap test.** Shared terms (assumption, load-bearing, confidence, provenance) are
defined once in [`docs/craft/product-decisions.md`](../../docs/craft/product-decisions.md) —
consult it rather than re-deriving them. Writing a PRD on top of an untested
load-bearing assumption is the failure this skill exists to prevent, so run it *before*
`/prd-template`, not after.

## The loop

Four phases. Phase 3 is the skill; the rest feed it. Each ends on a completion
criterion — don't advance until it's met.

1. **Surface across all four lenses.** Extract assumptions in *Desirability* (do users
   want it?), *Feasibility* (can we build it?), *Viability* (will the business
   sustain it?), *Usability* (can users actually use it?). The dangerous assumptions
   are the ones so obvious no one wrote them down.
   **Done when:** at least one assumption per lens, and re-reading the brief for the
   emptiest lens surfaces nothing new.
2. **Rate on the two axes only.** For each: *load-bearing* (1–5, does the plan collapse
   if it's false?) and *confidence* (1–5, how sure are we it's true?). Priority =
   load-bearing − confidence. Tag each fact's provenance ([data]/[hunch]).
   **Done when:** every assumption has both scores and a provenance tag, and the
   highest-priority one is genuinely the scariest — not the easiest to test.
3. **Find and pressure the riskiest.** The top-priority assumption (high-load-bearing ×
   low-confidence) is the one that can sink the whole plan. Name the *cheapest test*
   that could disprove it before a line of code is written (see the disclosed
   [cheap-tests](references/cheap-tests.md) reference for the menu).
   **Done when:** the single riskiest assumption is named, with a test that could run
   this week and a clear "what a fail looks like."
4. **Hand off.** Output the ranked map, and state explicitly which assumption
   `/prd-template` must treat as validated-or-open. An unresolved riskiest assumption
   becomes an Open Question in the PRD, not a silent bet.
   **Done when:** the downstream skill could start from this output without re-asking
   what the risky bet is.

## Output Structure

### Assumption Map: [Feature/Product Name]

| Assumption | Category | Confidence | Impact | Priority | Validation Method |
|------------|----------|------------|--------|----------|-------------------|
| [assumption] | [type] | [1-5] | [1-5] | [score] | [method] |

#### Critical Assumptions (Impact 4+ and Confidence 2 or below)
[Flagged items with detailed validation recommendations]

#### Top 3 Assumptions to Validate First
[Detailed recommendations including specific research method, estimated effort, and what the result would change]

## Example (Partial)

Input: *"We're building a self-serve onboarding flow to reduce time-to-value for SMB customers."*

| Assumption | Category | Confidence | Impact | Priority | Validation Method |
|------------|----------|------------|--------|----------|-------------------|
| SMB users can complete onboarding without human help | Usability | 2 | 5 | 3 | Unmoderated usability test (n=8) |
| Faster onboarding correlates with higher retention | Viability | 3 | 4 | 1 | Cohort analysis of current onboarding times vs. 90-day retention |
| The current onboarding is the primary reason for slow time-to-value | Desirability | 2 | 4 | 2 | User interviews with recent churned SMB accounts |

## Anti-Patterns

- [ ] Do not only surface desirability assumptions — feasibility and viability assumptions are equally likely to kill a product and are often overlooked
- [ ] Do not assign high confidence to an assumption just because it hasn't been challenged yet — absence of evidence is not evidence
- [ ] Do not recommend "user interviews" as the validation method for every assumption — some assumptions require quantitative data, competitive analysis, or technical spikes
- [ ] Do not list assumptions that cannot be tested — every assumption in the map must have a plausible validation method, or it should be flagged as unknowable and treated as a risk

## Deeper Materials

This skill ships with support files — use them when they are available:

- **`references/cheap-tests.md`** — The Cheap-Test Catalog: Right-Sizing Validation. Apply it while producing the output; it carries the calibration and judgment calls the method summary above compresses.
- **`templates/assumption-board.md`** — a fill-in version of the deliverable with the quality gates inline. Offer it when the user wants to work the document themselves rather than have it generated.

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Category coverage | Desirability-only — the feasibility and viability assumptions most likely to kill the plan are absent | Three categories populated, but the empty one wasn't re-mined from the brief; coverage is token (one throwaway row) | All four categories populated with substantive rows, with visible digging into whichever category the brief itself neglected |
| Scoring discipline | Confidence/impact numbers arbitrary or missing; priority arithmetic inconsistent; no critical flags | Scores present and Priority = Impact − Confidence holds, but confidence is inflated for unchallenged assumptions and critical flags applied selectively | Scores defensible (unchallenged ≠ high confidence), arithmetic consistent including negative priorities left visible, and the CRITICAL flag applied mechanically at Impact 4+ / Confidence ≤2 — even to assumptions the team likes |
| Validation method fit | "User interviews" (or "do research") pasted into every row | Methods vary but several are mismatched to the assumption type, missing sample sizes, or unpriced | Each method matched to the assumption (data audit, backtest, fake door, desk check, spike…) with sample size and effort; untestable assumptions flagged unknowable and converted to owned risks, not given fake tests |
| Decision leverage | Top-3 list missing, or tests whose outcome would change nothing | Top 3 named with effort, but "what the result changes" is vague or the tests validate comfortable assumptions over dangerous ones | Top 3 are the highest-priority testable assumptions, each with effort, a pre-committed threshold where relevant, and a concrete decision the result would change |

## Quality Checks

- [ ] At least one assumption per category (Desirability, Feasibility, Viability, Usability)
- [ ] All Impact 4+ / Confidence 2− assumptions flagged as CRITICAL
- [ ] Each validation method is specific (not just "do research" — name the method and sample size)
- [ ] Priority scores are consistent (Impact − Confidence, higher = more urgent)
