---
name: sprint-brief
description: "Generate a structured sprint brief from sprint data and goals. Use when asked to write a sprint brief, create a sprint summary, document sprint goals and scope, or produce a team-facing sprint overview. Produces a scannable brief with sprint goal, rationale, grouped work, critical path, risks, and definition of done."
---

# Sprint Brief Skill

Produce a clear, scannable sprint brief that every team member — engineer, designer, PM — can read in under three minutes and understand exactly what we're doing and why.

## Required Inputs

Ask the user for these if not provided:
- **Sprint name and number**
- **Sprint goal** (1-2 sentences — flag if too vague)
- **Ticket list with owners** (or a description of the work)
- **Known dependencies or blockers**
- **Carry-over items from previous sprint** (if any)

## Process
1. Read sprint goal and check it's specific and measurable — flag if it's too vague
2. Group tickets by theme or feature area
3. Identify the critical path — which tickets must complete for the sprint goal to be met?
4. Flag risks: tickets with unclear acceptance criteria, missing designs, unresolved dependencies
5. Note carry-over items and whether they affect this sprint's goal
6. **Validate** — Confirm the sprint goal is achievable given the ticket scope and capacity. If the critical path items alone would fill the sprint, flag it as overloaded.

## Output Structure

### Sprint [Number] Brief — [Dates]
**Sprint Goal:** [1-2 sentences — specific and measurable]
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

## Quality Checks

- [ ] Sprint goal is specific enough to score pass/fail at the end of the sprint
- [ ] Critical path items are named — not just "the important ones"
- [ ] Every risk has a mitigation or owner (not just "this is a risk")
- [ ] Carry-over items are connected to their impact on this sprint's goal
- [ ] Definition of Done is agreed criteria, not a task list
