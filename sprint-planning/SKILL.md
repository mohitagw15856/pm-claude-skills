---
name: sprint-planning
description: Structures and facilitates sprint planning sessions. Use when asked to plan a sprint, organise backlog items, assign story points, create sprint goals, or prepare sprint planning meeting agendas. Triggers on phrases like "plan sprint", "sprint planning", "sprint goal", "sprint backlog".
---

# Sprint Planning Skill

Transform raw backlog items into a structured, achievable sprint with clear goals, velocity-calibrated scope, and team-ready output.

## What This Skill Produces

- **Sprint Goal** — single, outcome-focused sentence the whole team can rally around
- **Sprint Backlog** — prioritised list of user stories with story point estimates and acceptance criteria
- **Capacity Plan** — team availability breakdown accounting for holidays, meetings, and focus time
- **Sprint Planning Agenda** — structured 2-hour meeting agenda with timings
- **Risk Flags** — blockers or dependencies that could derail the sprint

## Inputs to Request From User

Ask for (if not already provided):
- Sprint duration (1 or 2 weeks)
- Team size and velocity (average story points per sprint)
- Top 3–5 backlog items or epics to pull from
- Any known absences, holidays, or team events
- Previous sprint's incomplete items (carry-overs)

## Sprint Goal Formula

Use this structure:
> "This sprint we will [deliver X outcome] so that [user/business benefit], measured by [success indicator]."

Never write sprint goals as task lists. Always outcome-first.

## Story Point Calibration

| Complexity | Points | Description |
|---|---|---|
| Trivial | 1 | Clearly understood, no unknowns |
| Small | 2 | Straightforward, minor effort |
| Medium | 3 | Some complexity, clear path |
| Large | 5 | Complex, needs design or research |
| Very Large | 8 | High uncertainty, may need splitting |
| Epic | 13+ | Too large — must be split before sprint |

Flag any item estimated at 8+ and recommend splitting.

## Capacity Formula

```
Available capacity = (Team size × Sprint days × Focus hours/day) × Availability factor
Focus hours/day: 6 (accounting for meetings, Slack, admin)
Availability factor: 0.7–0.85 depending on holidays/events
Story points to commit = Historical velocity × Availability factor
```

## Output Format

### Sprint [N] — [Start Date] to [End Date]

**Sprint Goal:**
> [Goal statement]

**Team Capacity:** [X] story points available (based on [Y] team members, [Z]% availability)

**Sprint Backlog:**

| Priority | Story | Points | Owner | Acceptance Criteria |
|---|---|---|---|---|
| 1 | [Story title] | [N] | [Team member] | [When X then Y] |

**Carry-Overs from Previous Sprint:**
- [Item] — Reason for carry-over: [brief explanation]

**Risks & Dependencies:**
- [Risk description] → Mitigation: [action]

**Sprint Planning Agenda:**
- 00:00–00:10 — Review sprint goal and team capacity
- 00:10–00:40 — Walk through backlog items, confirm estimates
- 00:40–01:20 — Assign stories, identify dependencies
- 01:20–01:50 — Review acceptance criteria per story
- 01:50–02:00 — Confirm sprint commitment and close

## Guidelines

- Always challenge stories missing acceptance criteria — flag them explicitly
- Recommend the team commits to 80% of available capacity, not 100%
- If no velocity data is provided, assume 20–30 points for a 5-person team as a starting point
- Highlight any story with unclear ownership as a blocker
