---
name: hiring-rubric
description: "Generate a structured interview scorecard and interview guide for any role. Use when asked to create a hiring rubric, interview scorecard, structured interview guide, or assessment criteria for a job. Produces a scorecard with competencies, behavioural questions, and scoring guidance."
---

# Hiring Rubric Skill

This skill generates a complete structured interview scorecard and guide for any role. It reduces hiring bias, enables consistent evaluation across interviewers, and produces better hiring decisions.

## Required Inputs

Ask the user for these if not provided:
- **Role title and level** (e.g. Senior Product Manager, Junior Data Analyst)
- **Team or function** (e.g. Growth, Platform, Customer Success)
- **Top 3–5 things this person needs to do well** (the actual job requirements, not just the JD)
- **Interview format** (number of rounds, length of each)
- **Any known gaps or risks to probe for** (optional)
- **Company values or competencies** (optional — if provided, include as a competency section)

## Output Structure

---

# Interview Scorecard: [Role Title]
**Level:** [Junior / Mid / Senior / Staff / Manager]
**Team:** [Team name]
**Created:** [Date]

---

## Scorecard Overview

Each competency is scored 1–4:
- **4 — Strong Yes:** Clear evidence of exceptional ability. Hire signal.
- **3 — Yes:** Solid evidence. Meets the bar for this role.
- **2 — Lean No:** Some evidence but gaps that matter for this role.
- **1 — No:** Little to no evidence. Clear miss.

**Hiring recommendation:**
- 3+ competencies at 4, rest at 3 = Strong hire
- Majority at 3, no 1s = Hire
- Any 1s or majority 2s = No hire (unless specific mitigating factors)

---

## Competencies & Scoring

For each competency (generate 4–6 based on the role):

### Competency [N]: [Name — e.g. "Problem Structuring" / "Stakeholder Influence" / "Technical Depth"]

**Why this matters for this role:** [One sentence — connects to actual job requirements]

**What 4 looks like (Strong Yes):**
[Specific, observable behaviours. "Proactively decomposed an ambiguous problem into a structured approach without prompting. Could articulate tradeoffs clearly and made assumptions explicit."]

**What 2 looks like (Lean No):**
[Specific, observable behaviours at the lower end. "Could answer direct questions but struggled when the interviewer removed scaffolding. Required significant prompting to reach a structured answer."]

**Interview Questions (2–3 per competency):**

1. *[Behavioural STAR question — e.g. "Tell me about a time you had to make a decision with incomplete data."]*
   - **Good answer signals:** [What a strong answer includes]
   - **Weak answer signals:** [What a weak or scripted answer looks like]
   - **Follow-up probe:** [One follow-up to push deeper]

2. *[Situational or hypothetical question for this role]*
   - **Good answer signals:**
   - **Follow-up probe:**

---

## Role-Specific Technical Assessment (if applicable)

[If the role requires a technical screen, describe:]
- **Format:** [Take-home / Live coding / Case study / Portfolio review]
- **Duration:** [Time]
- **What you're assessing:** [Specific skills]
- **Scoring guidance:** [What distinguishes a 4 from a 2 on the technical component]

---

## Culture & Values Assessment

[2–3 values-based questions aligned to company values if provided, or general culture fit questions:]

1. *[Question]*
   - **What you're listening for:**

---

## Red Flags to Watch For

[5–7 specific red flags relevant to this role and level:]
- [e.g. "Speaks only about individual work — no mention of collaboration or team impact"]
- [e.g. "Can't give a specific example — pivots to hypotheticals when asked for real situations"]
- [e.g. "For senior roles: no evidence of influencing without authority"]

---

## Interview Panel Guide

Suggest how to divide competencies across interview rounds to avoid repetition:

| Round | Interviewer | Competencies to Assess |
|---|---|---|
| 1 — Recruiter Screen | Recruiter | Motivation, career narrative, basics |
| 2 — Hiring Manager | [Role] | [Assign 2 competencies] |
| 3 — Peer Interview | [Role] | [Assign 2 competencies] |
| 4 — Stakeholder | [Role] | [Assign 1–2 competencies + culture] |

---

## Quality Checks

- [ ] Scoring descriptions are observable (behaviours, not adjectives)
- [ ] 4 vs 2 distinction is clear and specific
- [ ] Questions have follow-up probes
- [ ] Red flags are specific to this role and level
- [ ] Panel guide avoids competency overlap between rounds

## Example Trigger Phrases

- "Create a hiring rubric for a [role]"
- "Build an interview scorecard for [job title]"
- "Give me structured interview questions for a [level] [role]"
- "We're hiring a [role] — help me build an assessment framework"
