---
name: sprint-brief
description: "Generate a structured sprint brief from sprint data and goals. Use when asked to write a sprint brief, create a sprint summary, document sprint goals and scope, or produce a team-facing sprint overview. Produces a scannable brief with sprint goal, rationale, grouped work, critical path, risks, and definition of done."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/sprint-brief.html
metadata:
  {
    "openclaw": { "emoji": "🚚" }
  }
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

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| **Goal scoreability** | Goal is a task list or a vague direction ("make progress on X") — nobody could score it at sprint end | Goal states one outcome but the pass/fail line is fuzzy (no number, date, or observable test) | Goal is a single outcome statement with an explicit pass/fail test anyone on the team could apply on the last day |
| **Critical path precision** | No critical path, or "the important tickets" — reader can't tell which slippage is fatal | Critical path tickets are named but without sequencing or the date/trigger at which the goal fails | Named tickets in dependency order, with the deadline that kills the goal and a clear fatal-vs-survivable split from the rest of the board |
| **Risk actionability** | Risks are a worry list — no mitigations, no owners | Each risk has a mitigation *or* an owner, but responses are generic ("monitor closely") | Every risk has a concrete mitigation with a ready-by date and a single named owner, and states whether it threatens the goal or just a ticket |
| **Capacity honesty** | Carry-over listed without impact; board is silently overloaded | Carry-over impact on the goal is stated, but the brief doesn't act on it — overload is flagged as a risk and left there | Carry-over is costed against capacity and the brief shows the resolution: named scope cuts, a de-scoped goal, or an explicit team-agreed overload acceptance |

## Quality Checks

- [ ] Sprint goal is specific enough to score pass/fail at the end of the sprint
- [ ] Critical path items are named — not just "the important ones"
- [ ] Every risk has a mitigation or owner (not just "this is a risk")
- [ ] Carry-over items are connected to their impact on this sprint's goal
- [ ] Definition of Done is agreed criteria, not a task list

## Anti-Patterns

- [ ] Do not write a sprint goal as a task list — the goal must be a single outcome-focused statement that can be scored pass/fail
- [ ] Do not leave the critical path unnamed — "the important tickets" is not a critical path
- [ ] Do not list risks without a mitigation or owner — a risk without a response is just a worry list
- [ ] Do not ignore carry-over items' impact on this sprint's capacity and goal
- [ ] Do not write a Definition of Done that mixes task completion with outcome criteria — they must be observable and agreed before the sprint starts
