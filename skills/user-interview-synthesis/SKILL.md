---
name: user-interview-synthesis
description: "Synthesise user interview transcripts into structured research findings. Use when asked to analyse interview notes, synthesise qualitative research, identify themes from user interviews, or turn raw interview data into actionable product insights. Produces a themed synthesis with supporting quotes, 'so what' implications, and recommended next steps."
---

# User Interview Synthesis Skill

Transform raw interview transcripts into a structured synthesis document that surfaces themes, pain points, and actionable insights.

## Required Inputs

Ask the user for these if not provided:
- **Interview transcripts or notes** (even rough notes work)
- **Number of participants and their profiles** (role, company size, context)
- **Research questions** (what was the study trying to answer?)
- **Date range** of research (for context)

## Process
1. Read all provided transcripts fully before drawing conclusions
2. Identify recurring themes (minimum 3 mentions to qualify as a theme)
3. Categorize findings into: Pain Points, Workflow Insights, Feature Requests, Delight Moments
4. Select 2-3 verbatim quotes per theme that best represent the pattern
5. Draft "So What" implications for each theme — what does this mean for the product?
6. **Validate** — Confirm every theme has quotes from at least 3 participants. Flag any insight resting on fewer as low-confidence.

## Output Structure

### Research Synthesis: [Study Name]
**Participants:** [n]
**Date Range:** [dates]
**Research Questions:** [list]

#### Theme 1: [Theme Name]
- Summary (2-3 sentences)
- Supporting quotes (from at least 3 participants)
- Implication for product

[Repeat for each theme]

#### Low-Confidence Signals (1-2 participants only)
[Findings worth tracking but not acting on yet — note what further research would confirm or deny]

#### Recommended Next Steps
[Specific, actionable recommendations based on findings]

## Quality Checks

- [ ] Every theme is supported by quotes from at least 3 participants
- [ ] Implications connect to specific product decisions, not just observations
- [ ] Researcher bias check: no leading language, findings don't all support one hypothesis
- [ ] Single-source signals are flagged separately, not mixed into main themes
- [ ] Research questions from the study brief are each addressed (even if the answer is "inconclusive")
