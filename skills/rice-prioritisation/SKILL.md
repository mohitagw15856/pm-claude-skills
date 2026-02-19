---
name: rice-prioritisation
description: Score and rank product initiatives using the RICE framework
tool_integration: Jira
---
# RICE Prioritisation Skill

## Purpose
Apply consistent, criteria-based RICE scoring to a list of features or initiatives to produce an objective prioritisation ranking.

## RICE Definitions (adapt to your context)
- **Reach:** Number of users affected per quarter (use actual DAU/MAU data where available)
- **Impact:** Effect on your primary metric — use scale: 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal
- **Confidence:** How certain are we about R and I estimates? 100%=high, 80%=medium, 50%=low
- **Effort:** Person-months required across all functions

## RICE Formula
RICE Score = (Reach × Impact × Confidence) / Effort

## Process
1. For each initiative provided, gather or estimate R, I, C, E values
2. Flag where estimates are weak and note what data would improve them
3. Calculate RICE score for each
4. Rank highest to lowest
5. Flag any "quick wins" (high RICE score, low effort) and "moonshots" (high impact, high effort)
6. Note dependencies between items that affect sequencing

## Output Format

### RICE Prioritisation: [Backlog/Quarter]
| Initiative | Reach | Impact | Confidence | Effort | RICE Score | Notes |
|------------|-------|--------|------------|--------|------------|-------|
| [name] | [n] | [score] | [%] | [months] | [score] | [flags] |

#### Recommended Sequence
[Top 5 initiatives with rationale]

#### Data Gaps to Address
[What information would most improve scoring accuracy]
