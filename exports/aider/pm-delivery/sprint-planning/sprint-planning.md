# Sprint Planning Skill

Transform raw backlog items into a structured, achievable sprint with clear goals, velocity-calibrated scope, and team-ready output.

## What This Skill Produces

- **Sprint Goal** — single, outcome-focused sentence the whole team can rally around
- **Sprint Backlog** — prioritised list of user stories with story point estimates and acceptance criteria
- **Capacity Plan** — team availability breakdown accounting for holidays, meetings, and focus time
- **Sprint Planning Agenda** — structured 2-hour meeting agenda with timings
- **Risk Flags** — blockers or dependencies that could derail the sprint

## Required Inputs

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

## Programmatic Helper

This skill ships with a stdlib-only Python script that computes capacity instead of estimating it by hand. Use it whenever the team's numbers are known — it applies the availability and 80% commit-ratio rules consistently.

```bash
# Quick estimate from flags
python3 scripts/capacity_calculator.py --team 5 --days 10 --velocity 30 --availability 0.8 --carryover 5

# Detailed estimate from per-member availability (JSON via stdin or --input file.json)
echo '{"sprint_days":10,"historical_velocity":40,"carryover_points":8,
       "members":[{"name":"Ada","available_days":10},{"name":"Linus","available_days":7}]}' \
  | python3 scripts/capacity_calculator.py --input -
```

The script returns available focus hours, a velocity figure adjusted for real availability, the **recommended commitment** (capped at 80% of velocity), and the remaining **capacity for new work** after carry-overs. Run it first, then build the sprint backlog to fit the recommended number. Add `--json` to pipe the result into other tooling.

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

## Quality Checks

- [ ] Sprint goal is outcome-focused (not "implement X" — something like "users can do Y")
- [ ] Team capacity is calculated using actual availability, not theoretical 100%
- [ ] Every story has an acceptance criterion (flag any that don't)
- [ ] Stories estimated at 8+ points are flagged for splitting
- [ ] Carry-overs from last sprint are accounted for in capacity

## Anti-Patterns

- [ ] Do not write sprint goals as task lists — goals must be outcome-focused and scoreable pass/fail at sprint end
- [ ] Do not commit to 100% of available capacity — always recommend 80% to preserve slack for unplanned work
- [ ] Do not carry stories with no acceptance criteria into the sprint — flag them as blockers before committing
- [ ] Do not allow stories estimated at 8+ points into the sprint without splitting them first
- [ ] Do not ignore carry-over items when calculating capacity — they consume capacity and must be accounted for before new work is pulled in
