---
name: project-status-report
description: "Write a structured project status report for any project. Use when asked to write a project update, status report, RAG report, project dashboard narrative, or weekly project communication. Produces a clear status report with RAG ratings, milestone progress, risks, and decisions needed."
---

# Project Status Report Skill

Produces a clear, structured project status report — the weekly communication that keeps stakeholders informed without requiring a meeting.

## Required Inputs
- **Project name**
- **Reporting period**
- **Current RAG status** (Red / Amber / Green)
- **Key milestones** (due, delivered, coming)
- **Issues or blockers**
- **Decisions needed from stakeholders**
- **Budget status** (if tracked)
- **Audience** (steering committee / sponsor / PMO / full team)

## Output Structure

---

# Project Status Report: [Project Name]
**Period:** [Date range] | **Author:** [PM] | **Next report:** [Date]

---

### Overall Status

| Dimension | Status | Last period | Trend |
|---|---|---|---|
| Overall | Red / Amber / Green | [Last] | Improving / Stable / Declining |
| Schedule | | | |
| Budget | | | |
| Scope | | | |
| Risks | | | |

RAG definitions:
- Green: On track. No significant issues.
- Amber: At risk. Issues identified but mitigations in place.
- Red: Off track. Escalation or decisions required to recover.

---

### Executive Summary
[3-5 sentences. Headline story. If it is Red, say so immediately and why. Never bury bad news after good news.]

---

### Milestone Progress

| Milestone | Due date | Status | Comment |
|---|---|---|---|
| [Milestone] | [Date] | Complete / At risk / Delayed / On track | [One line] |

**Completed this period:** [What was delivered]
**Due next period:** [What is expected]

---

### Issues and Blockers

**[Issue title] — Critical / High / Low**
- **Description:** [What the issue is]
- **Impact:** [What happens if unresolved]
- **Owner:** [Who is resolving]
- **Action:** [What is being done]
- **Resolution date:** [When it will be closed]

---

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| [Risk] | H/M/L | H/M/L | [Action] | [Name] |

---

### Decisions Required

| Decision | Background | Options | Recommendation | Needed by |
|---|---|---|---|---|
| [Decision] | [Context] | [Options] | [Recommendation] | [Date] |

---

### Budget Summary

| | Budget | Actual to date | Forecast | Variance |
|---|---|---|---|---|
| Total | £ | £ | £ | £ F/A |

---

### Next Period Plan
[3-5 specific bullet points — what will happen next period]

## Writing Rules
- Never soften a Red status
- Milestones are binary: complete or not complete
- Decisions must be genuinely actionable
- Keep to one page where possible

## Quality Checks

- [ ] Red status is stated immediately (not buried after positives)
- [ ] Every issue has a named owner and a resolution date
- [ ] Decisions required are genuinely actionable by the audience
- [ ] Milestones are binary (complete or not complete — no "85% done")
- [ ] Executive summary can stand alone for a stakeholder who reads nothing else

## Example Trigger Phrases
- "Write a project status report for [project]"
- "Generate a RAG status update for [project]"
- "Write the steering committee report for [project]"
