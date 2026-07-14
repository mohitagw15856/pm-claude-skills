---
name: assumption-mapper
description: "Extract and risk-rate hidden assumptions in a product brief or PRD. Use when asked to review a product brief for assumptions, audit a PRD for risks, find hidden assumptions, validate product plans, or run an assumption analysis. Produces a prioritised assumption map with confidence and impact scores, recommended validation methods, and critical assumption flags."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/assumption-mapper.html
metadata:
  {
    "openclaw": { "emoji": "🔍" }
  }
---

# Assumption Mapper Skill

Surface and prioritize the untested assumptions embedded in any product plan before development begins.

## Required Inputs

Ask the user for these if not provided:
- **Product brief, PRD, or concept description** (even rough notes work)
- **Stage** (concept / discovery / pre-build / post-launch — affects which assumptions matter most)

## Process
1. Read the provided brief, PRD, or concept description
2. Extract assumptions across four categories:
   - **Desirability** (do users want this?)
   - **Feasibility** (can we build it?)
   - **Viability** (will it sustain the business?)
   - **Usability** (can users actually use it?)
3. Score each assumption:
   - Confidence (1-5): How sure are we this is true?
   - Impact (1-5): How badly does the plan fail if this assumption is wrong?
   - Priority = Impact − Confidence (higher = test first)
4. **Validate completeness** — Ensure at least one assumption per category. If a category is empty, re-read the brief looking specifically for that type.
5. Output a ranked list with recommended validation methods

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
