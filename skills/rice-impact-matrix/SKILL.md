---
name: rice-impact-matrix
description: "Score features using RICE and plot against strategic alignment for nuanced prioritisation. Use when asked to prioritise features, build a priority matrix, combine quantitative scoring with strategic fit, or decide what to build next with multiple competing initiatives. Produces a scored priority matrix with RICE scores, strategic alignment ratings, quadrant placement, and sequencing recommendations."
---

# RICE + Strategic Alignment Skill

Produce a prioritisation output that balances quantitative RICE scoring with qualitative strategic fit — because the highest RICE score isn't always the right next bet.

## Required Inputs

Ask the user for these if not provided:
- **List of initiatives or features to prioritise** (names and brief descriptions)
- **Current strategic priorities or OKRs** (needed to rate strategic alignment)
- **Reach estimates** (users affected per quarter — even rough estimates work)
- **Effort estimates** (person-months — from engineering if available)
- **Quarter or planning period**

## Two-Stage Process

### Stage 1: RICE Scoring
- Reach: Users affected per quarter
- Impact: 3/2/1/0.5/0.25 scale
- Confidence: 100% / 80% / 50%
- Effort: Person-months
- RICE = (R × I × C) / E

### Stage 2: Strategic Alignment Score
Rate each initiative against your current strategic priorities (provided as input):
- Directly supports top OKR: +3
- Supports secondary OKR: +2
- Neutral: +1
- Contradicts strategic direction: -1

### Final Priority Score
Combined Score = RICE Score + (Strategic Alignment × 10)

**Validate** — Flag any initiative where RICE score and strategic alignment conflict sharply (e.g., high RICE, low alignment). These require an explicit team conversation before sequencing.

## Output Structure

### Priority Matrix — [Quarter]
| Initiative | RICE Score | Strategic Alignment | Combined Score | Quadrant | Recommendation |
|------------|------------|--------------------|--------------------|----------|----------------|
| [name] | [score] | [score] | [combined] | [Now/Next/Later/Drop] | [action] |

#### Quadrant Definitions
- **Now:** High RICE + High Strategic Alignment → Build this quarter
- **Next:** High RICE + Lower Alignment → Queue for next quarter
- **Later:** Lower RICE + High Alignment → Revisit when capacity allows
- **Drop:** Low RICE + Low Alignment → Remove from backlog

#### Recommendations
[Top 5 initiatives with rationale for sequencing]

## Quality Checks

- [ ] All RICE components have an estimate (even if low confidence — flag those)
- [ ] Strategic alignment is rated against specific OKRs, not general "feels strategic"
- [ ] Conflicts between RICE rank and strategic alignment are explicitly flagged
- [ ] "Drop" recommendations are specific — not just "low priority, deprioritise"
- [ ] Confidence levels on estimates are noted where weak (drives the 50% confidence flag)
