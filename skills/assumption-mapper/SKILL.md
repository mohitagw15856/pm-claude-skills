---
name: assumption-mapper
description: Extract and risk-rate all hidden assumptions in a product brief or PRD
tool_integration: Miro
---
# Assumption Mapping Skill

## Purpose
Surface and prioritize the untested assumptions embedded in any product plan before development begins.

## Process
1. Read the provided brief, PRD, or concept description
2. Extract all assumptions across four categories:
   - **Desirability** (do users want this?)
   - **Feasibility** (can we build it?)
   - **Viability** (will it sustain the business?)
   - **Usability** (can users actually use it?)
3. For each assumption, score:
   - Confidence (1-5): How sure are we this is true?
   - Impact (1-5): How badly does the plan fail if this assumption is wrong?
   - Priority = Impact minus Confidence (higher score = test this first)
4. Output a ranked list with recommended validation methods

## Output Format

### Assumption Map: [Feature/Product Name]
| Assumption | Category | Confidence | Impact | Priority Score | Recommended Validation |
|------------|----------|------------|--------|----------------|----------------------|
| [assumption] | [type] | [1-5] | [1-5] | [score] | [method] |

#### Top 3 Assumptions to Validate First
[Detailed recommendations for highest-priority items]

## Notes
- Flag any assumption that scores 4+ on Impact and 2 or below on Confidence as CRITICAL
- Suggest specific research methods: usability test, survey, prototype test, data analysis
