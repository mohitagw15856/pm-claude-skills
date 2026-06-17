---
trigger: model_decision
description: "Write a weekly engineering status report for a team, service, or initiative. Use when asked to write a team update, weekly engineering report, sprint status email, or standing team communication to stakeholders. Produces a concise, scannable weekly report covering shipping progress, metrics, decisions, blockers, and next-week priorities."
---

# Engineering Weekly Report

Produce a weekly engineering status report that a team can send to stakeholders, their engineering manager, and the team itself. The format is fixed week-over-week so readers know exactly where to look — shipping progress at the top, decisions in the middle, risks and next steps at the bottom. The report must be readable in under 2 minutes. Avoid prose walls: use bullet points, status tags, and short tables. If metrics are not provided, leave the metrics section with [data needed] markers rather than fabricating numbers.

## Required Inputs

Ask for these if not already provided:
- **Team name and report period** — team name plus week number or date range (e.g., "Platform Team, Week 21, May 12–16")
- **Work items shipped this week** — what was completed and released or merged
- **Work items in progress** — what is actively being worked on, with rough percent-complete if known
- **Blocked items** — what is blocked, who owns the block, and what is needed to unblock
- **Key decisions made** — any architecture, process, or priority decisions made this week
- **Decisions needed next week** — any decisions that need to be made soon and who needs to make them
- **Risks and escalations** — anything that threatens next week's commitments or needs leadership visibility
- **Next week's top priorities** — the 3–5 things the team plans to accomplish next week

Optional but useful:
- **Key metrics** — reliability (error rate, p99 latency), velocity (story points completed), or other health indicators
- **Team health notes** — PTO, new joins, attrition, morale signals worth noting
- **Sprint or iteration number** — if the team runs sprints

## Output Format

---

# Engineering Weekly Report — [Team Name]
**Week:** [Week Number] | [Date Range, e.g., May 12–16, 2025]
**Author:** [Name or Team Lead]
**Distribution:** [e.g., Eng leadership, Product, Team]

---

## Shipping Progress

### Shipped This Week

| Item | Description | Impact |
|------|-------------|--------|
| [Feature / Fix / Infra change] | [One-line description] | [Who benefits / what it unblocks] |
| [Feature / Fix / Infra change] | [One-line description] | [Who benefits / what it unblocks] |
| [Feature / Fix / Infra change] | [One-line description] | [Who benefits / what it unblocks] |

### In Progress

| Item | Owner | Status | Target Ship |
|------|-------|--------|-------------|
| [Work item] | [Name] | [~40% / On Track / At Risk] | [Date or Sprint] |
| [Work item] | [Name] | [~70% / On Track / At Risk] | [Date or Sprint] |
| [Work item] | [Name] | [~20% / On Track / At Risk] | [Date or Sprint] |

### Blocked

| Item | Blocked Since | Blocker Description | Owner | Needed To Unblock |
|------|--------------|--------------------|----|-------------------|
| [Work item] | [Date] | [What is blocking progress] | [Name] | [Specific ask — decision, resource, dependency] |

If no items are blocked: *No active blockers.*

---

## Key Metrics

*Metrics reported as of [Date]. Prior week in parentheses.*

| Metric | This Week | Last Week | Trend | Target |
|--------|-----------|-----------|-------|--------|
| Error rate (5xx) | [X%] | [X%] | [↑ / ↓ / →] | < [threshold] |
| p99 latency | [Xms] | [Xms] | [↑ / ↓ / →] | < [threshold] |
| Deployment frequency | [X deploys] | [X deploys] | [↑ / ↓ / →] | [target] |
| Story points completed | [X] | [X] | [↑ / ↓ / →] | [sprint target] |
| On-call page volume | [X pages] | [X pages] | [↑ / ↓ / →] | < [threshold] |

**Metrics notes:** [Any context that makes the numbers meaningful — e.g., "Error rate spike on Tuesday tied to downstream dependency outage, resolved by EOD."]

If metrics are not provided: replace table rows with `[data needed — provide metric values for this section]`.

---

## Decisions

### Made This Week

| Decision | Rationale | Owner | Stakeholders Informed |
|----------|-----------|-------|----------------------|
| [Decision description] | [Why — 1 sentence] | [Name] | [Yes / No — who] |
| [Decision description] | [Why — 1 sentence] | [Name] | [Yes / No — who] |

If no decisions were made: *No major decisions this week.*

### Needed Next Week

| Decision | Context | Deadline | Decision Owner |
|----------|---------|----------|----------------|
| [What needs to be decided] | [Why it matters, what happens if delayed] | [Date] | [Name or role] |

If no decisions are pending: *No decisions pending.*

---

## Risks and Escalations

| Risk | Likelihood | Impact | Mitigation | Escalate To |
|------|-----------|--------|-----------|-------------|
| [Risk description] | [High/Med/Low] | [High/Med/Low] | [What we're doing about it] | [Name/role if escalation needed] |

**Escalations this week:** [Any item that needs immediate leadership attention — call it out explicitly here, do not bury it in a table row. If none: "None."]

---

## Team Health

| Item | Status |
|------|--------|
| Team capacity this week | [X of Y people at full capacity] |
| PTO / out of office | [Names and dates, or "None"] |
| New joins / departures | [Name, role, and date, or "None"] |
| On-call this week | [Name] |
| On-call next week | [Name] |

**Team notes:** [Any morale, workload, or team dynamic signals worth surfacing — keep this factual and constructive. If nothing to note: omit this line.]

---

## Next Week's Priorities

*The [3–5] things this team will ship or meaningfully advance next week.*

1. **[Priority item]** — [One sentence: what done looks like and who owns it]
2. **[Priority item]** — [One sentence: what done looks like and who owns it]
3. **[Priority item]** — [One sentence: what done looks like and who owns it]
4. **[Priority item]** — [One sentence: what done looks like and who owns it]
5. **[Priority item]** — [One sentence: what done looks like and who owns it]

**Capacity risk:** [If the team is at reduced capacity next week (PTO, incidents, etc.), note it here so stakeholders calibrate expectations.]

---

## Appendix: Sprint Scorecard (if applicable)

| Sprint | Committed | Completed | Completion Rate | Carried Over |
|--------|-----------|-----------|----------------|--------------|
| Sprint [N-1] | [X pts] | [X pts] | [X%] | [X pts] |
| Sprint [N] (current) | [X pts] | [X pts — partial] | [X% at midpoint] | TBD |

---

*Questions or corrections: [Slack channel or email] | Next report: [Date]*

---

## Quality Checks

- [ ] Every blocked item names a specific owner and states what is concretely needed to unblock it — not just "waiting on X"
- [ ] Decisions-needed table includes a deadline and a named decision owner, not a vague "TBD"
- [ ] Metrics table is either populated with real numbers or explicitly marked `[data needed]` — no fabricated metrics
- [ ] Next week's priorities are written as outcomes ("ship X", "complete Y migration") not as activities ("work on X")
- [ ] Escalations that need leadership attention are called out explicitly in the Risks section — not just buried in a table row
- [ ] The entire report is readable in under 2 minutes — if it is longer than one printed page, trim it
- [ ] Report period (week number and date range) is clearly stated in the header

## Anti-Patterns

- [ ] Do not fabricate metrics — if data is not available, mark the field as `[data needed]` rather than estimating; stakeholders making decisions on invented numbers is actively harmful
- [ ] Do not write next week's priorities as activities ("work on X") — they must be outcomes ("ship X", "complete Y migration") so stakeholders can evaluate whether the team delivered
- [ ] Do not bury escalations inside a risk table row — anything needing leadership attention must be called out explicitly in the Escalations section
- [ ] Do not list blocked items without naming a specific owner and a concrete unblocking action — "waiting on X" is not a blocker entry, it is a placeholder
- [ ] Do not write a report that exceeds two printed pages — length signals the author has not done the editorial work of deciding what matters to stakeholders
