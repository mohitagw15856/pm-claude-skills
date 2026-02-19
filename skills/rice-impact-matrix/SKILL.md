---
name: rice-impact-matrix
description: Score features using RICE and plot against strategic alignment for nuanced prioritisation
tool_integration: Miro, Jira
---
# RICE + Strategic Alignment Skill

## Purpose
Produce a prioritisation output that balances quantitative RICE scoring with qualitative strategic fit — because the highest RICE score isn't always the right next bet.

## Two-Stage Process

### Stage 1: RICE Scoring
- Reach: Users affected per quarter
- Impact: 3/2/1/0.5/0.25 scale
- Confidence: 100% / 80% / 50%
- Effort: Person-months
- RICE = (R × I × C) / E

### Stage 2: Strategic Alignment Score
Rate each initiative against your current strategic priorities (provide these as input):
- Directly supports top OKR: +3
- Supports secondary OKR: +2
- Neutral: +1
- Contradicts strategic direction: -1

### Final Priority Score
Combined Score = RICE Score + (Strategic Alignment × 10)

## Output Format

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
