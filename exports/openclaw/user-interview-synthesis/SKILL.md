---
name: user-interview-synthesis
description: "Synthesises user interview transcripts into structured research findings. Use when asked to analyse interview notes, synthesise qualitative research, identify themes from interviews, or turn raw interview data into actionable product insights. Produces a themed synthesis with supporting quotes per theme, 'so what' implications, and recommended next steps. For mixed sources beyond interviews (surveys, tickets, feedback) use user-research-synthesis instead."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/user-interview-synthesis.html
metadata:
  {
    "openclaw": { "emoji": "🔍" }
  }
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

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Evidence traceability | Themes asserted with no quotes or participant attribution | Most themes carry quotes, but some rest on 1–2 participants or unattributed paraphrase | Every theme carries verbatim quotes from ≥3 distinct participants, with frequency counts ("6 of 9") consistent with the roster |
| Implication actionability | Implications restate the observation ("users find X frustrating") | Implications gesture at direction but name no decision, owner, or change | Every implication enables a specific product decision someone could act on this quarter |
| Contradiction honesty | All findings conveniently support the sponsor's hypothesis; inconvenient data absent | Contradictory evidence present but buried or softened; both-ways quotes trimmed to the helpful half | Findings that contradict the hypothesis are surfaced prominently, and ambiguous quotes are kept whole with the tension flagged |
| Signal separation & question coverage | Single-source anecdotes mixed into main themes; research questions ignored | Low-confidence signals segregated but with no follow-up path, or one research question left unaddressed | Every 1–2-participant signal sits in its own section with the cheap test that would confirm it, and every research question gets an explicit answer — including "inconclusive" |

## Quality Checks

- [ ] Every theme is supported by quotes from at least 3 participants
- [ ] Implications connect to specific product decisions, not just observations
- [ ] Researcher bias check: no leading language, findings don't all support one hypothesis
- [ ] Single-source signals are flagged separately, not mixed into main themes
- [ ] Research questions from the study brief are each addressed (even if the answer is "inconclusive")

## Anti-Patterns

- [ ] Do not mix single-source signals into main themes — insights cited by only one participant must be flagged separately
- [ ] Do not write implications that are observations restated rather than product decisions enabled
- [ ] Do not include themes that only support the project hypothesis — contradictory findings must be surfaced, not omitted
- [ ] Do not present findings without quotes — every theme requires verbatim evidence from at least 3 participants
- [ ] Do not leave research questions unanswered — each question from the study brief must be explicitly addressed, even if the answer is inconclusive
