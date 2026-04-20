---
name: assumption-mapper
description: "Extract and risk-rate hidden assumptions in a product brief or PRD. Use when asked to review a product brief for assumptions, audit a PRD for risks, find hidden assumptions, validate product plans, or run an assumption analysis. Produces a prioritised assumption map with confidence and impact scores, recommended validation methods, and critical assumption flags."
---

# Assumption Mapper

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
4. **Validate completeness**: Ensure at least one assumption per category. If a category is empty, re-read the brief looking specifically for that type.
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

## Quality Checks

- [ ] At least one assumption per category (Desirability, Feasibility, Viability, Usability)
- [ ] All Impact 4+ / Confidence 2− assumptions flagged as CRITICAL
- [ ] Each validation method is specific (not just "do research" — name the method and sample size)
- [ ] Priority scores are consistent (Impact − Confidence, higher = more urgent)
