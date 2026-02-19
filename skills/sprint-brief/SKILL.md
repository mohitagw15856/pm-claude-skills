---
name: sprint-brief
description: Generate a structured sprint brief from Jira sprint data and goals
tool_integration: Jira, Slack
---
# Sprint Brief Skill

## Purpose
Produce a clear, scannable sprint brief that every team member — engineer, designer, PM — can read in under three minutes and understand exactly what we're doing and why.

## Required Inputs
- Sprint name and number
- Sprint goal (1-2 sentences)
- Ticket list with owners
- Known dependencies or blockers
- Carry-over items from previous sprint

## Process
1. Read sprint goal and check it's specific and measurable — flag if it's too vague
2. Group tickets by theme or feature area
3. Identify the critical path — which tickets must complete for the sprint goal to be met?
4. Flag risks: tickets with unclear acceptance criteria, missing designs, unresolved dependencies
5. Note carry-over items and whether they affect this sprint's goal

## Output Format

### Sprint [Number] Brief — [Dates]
**Sprint Goal:** [1-2 sentences]
**Why This Sprint Matters:** [Connect to quarterly OKR in 2-3 sentences]

**What We're Building:**
- [Theme 1]: [tickets and owners]
- [Theme 2]: [tickets and owners]

**Critical Path:** [The 2-3 tickets everything else depends on]

**Risks to Flag:**
- [Risk 1 + mitigation]
- [Risk 2 + mitigation]

**Carry-over from Last Sprint:** [List + impact on current goal]

**Definition of Done:** [Specific, agreed criteria for sprint success]
