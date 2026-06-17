---
trigger: model_decision
description: "Define a RACI matrix for a cross-functional project or process. Use when asked to build a RACI, create a responsibility matrix, clarify ownership across teams, or document decision rights. Produces a complete RACI matrix with role definitions, decision mapping, and a process for resolving conflicts."
---

# RACI Matrix Skill

This skill produces a complete RACI (Responsible, Accountable, Consulted, Informed) matrix for a project, product launch, or ongoing process. Output is ready to share with teams to clarify ownership, reduce decision bottlenecks, and eliminate duplication of effort.

## Required Inputs

Ask the user for these if not provided:
- **Project or process name**
- **Key activities or decisions** to map (or the user can describe the project and the skill will derive them)
- **Teams or roles involved** (list team names and key individuals if helpful)
- **Primary purpose** — clarifying launch ownership / onboarding a new team / reducing bottlenecks / governance documentation
- **RACI variant** — standard RACI, or RASCI (adds Supportive), or DACI (Driver, Approver, Contributors, Informed)?

## Output Structure

---

# RACI Matrix: [Project / Process Name]

**Version:** [1.0]
**Owner:** [Programme lead / PM]
**Date:** [Date]
**Teams involved:** [List teams]

---

## 1. Role Definitions

Before reading the matrix, agree on what each letter means for this project:

| Letter | Role | Definition | Rules |
|---|---|---|---|
| **R** | Responsible | Does the work. One or more people actually execute the task. | Multiple Rs are allowed — but if there are many, consider splitting the task |
| **A** | Accountable | Owns the outcome. Signs off on decisions. Answers if something goes wrong. | **There must be exactly one A per row.** Never two. Never zero. |
| **C** | Consulted | Provides expertise or input before work is done. Two-way communication. | Consulted parties must be engaged — not just available. Cap at 3 per row or it becomes noise |
| **I** | Informed | Notified of progress or outcomes. One-way communication. | Informed only — they don't review or approve |

**Golden rules:**
- Every row has exactly one **A**
- The same person or team should not be **A** for more than [X] rows — spreads accountability too thin
- **C** is expensive — consulting someone means they must respond. Use it intentionally
- If someone is **R** they cannot also be **A** for the same task unless they are the decision-maker (common in small teams)

---

## 2. RACI Matrix

Columns = teams or roles. Rows = activities or decisions.

| Activity / Decision | [Role 1] | [Role 2] | [Role 3] | [Role 4] | [Role 5] | Notes |
|---|---|---|---|---|---|---|
| **[Phase 1: Discovery]** | | | | | | |
| Define project scope and objectives | A/R | C | I | I | — | PM leads; engineering consulted on technical feasibility |
| Conduct user research | R | A | C | I | — | UX researcher executes; PM accountable |
| Approve discovery findings | C | A | I | R | — | |
| **[Phase 2: Design]** | | | | | | |
| Define solution approach | A | R | C | I | I | |
| Design system / UI designs | C | A/R | I | I | — | |
| Design review and sign-off | C | R | A | I | — | |
| Accessibility review | I | R | A | C | — | |
| **[Phase 3: Build]** | | | | | | |
| Technical architecture decision | C | C | A/R | I | — | |
| Sprint planning | A | C | R | I | I | |
| Code review and merge | I | C | R | A | — | |
| Security review | I | C | C | A/R | — | |
| **[Phase 4: Launch]** | | | | | | |
| Launch go / no-go decision | A | C | C | R | I | PM holds final authority |
| Release to production | C | I | A/R | I | — | |
| Customer communications | A/R | I | I | I | C | |
| Post-launch monitoring | C | I | R | A | — | |
| **[Ongoing / BAU]** | | | | | | |
| Incident response | I | C | R | A | — | |
| Feature prioritisation | A/R | C | C | I | I | |
| Stakeholder reporting | A/R | I | I | I | C | |

---

## 3. Decision Map

For high-stakes decisions, document the decision type, who holds authority, and how disagreements are resolved:

| Decision | Authority (A) | Must consult (C) | Escalation path if disagreed |
|---|---|---|---|
| Scope change >20% effort | [Exec sponsor / Programme lead] | [PM, Engineering lead] | [Steering committee] |
| Budget overrun >10% | [Finance / Exec] | [PM, Programme lead] | [CFO / Board] |
| Architecture pattern change | [Engineering lead] | [Tech lead, Security] | [CTO] |
| Go-live date change | [PM] | [Engineering, Comms, CS] | [Programme sponsor] |
| Feature cut from scope | [PM] | [Product, UX, Engineering] | [CPO] |

---

## 4. Common RACI Anti-Patterns — and Fixes

Review the completed matrix against these failure modes:

| Anti-pattern | Symptom | Fix |
|---|---|---|
| **Multiple As** | Two teams both think they own an outcome | Agree one A; the other becomes C or I |
| **No A** | Decisions stall; no one feels responsible | Assign the most senior stakeholder as A |
| **Everyone is C** | Every decision goes to a committee | Audit each C — does this person actually provide input that changes outcomes? If not, move to I |
| **R without A** | Work gets done but no one owns quality | Add an A; usually the manager of the R |
| **A without R** | Accountability without execution — manager is disconnected | Add an R from the team; or combine A/R if appropriate |
| **Too many Rs** | Diffusion of responsibility | Split the task into sub-tasks, each with one clear R |
| **Key team missing from matrix** | They're affected but not in the RACI | Add them; assign at minimum I for relevant rows |

---

## 5. Communication Template

Once the RACI is agreed, use this template to communicate it to all involved teams:

---

**Subject:** [Project Name] — Roles and Responsibilities Agreed

We've finalised the RACI matrix for [Project Name]. Here's what it means for you:

**[Role 1 team]:** You are **Accountable** for [X, Y, Z activities]. This means you make the final call on those decisions and answer if outcomes are not met.

**[Role 2 team]:** You are **Responsible** for [A, B, C]. You execute the work. For [D], you are **Consulted** — we need your input before decisions are finalised.

**[Role 3 team]:** You are **Informed** on [E, F] — we'll send you updates at [weekly / milestone / launch]. No action required unless you see something that needs escalation.

Please review the full matrix here: [Link]. Raise any concerns by [Date] — after that, we'll treat it as agreed.

---

## 6. RACI Review Cadence

| Trigger | Action |
|---|---|
| New team member joins | Review rows relevant to their role — update R as needed |
| Phase change (e.g. discovery → delivery) | Review full matrix — some Rs and As will shift |
| Escalation or confusion about ownership | Use the matrix to diagnose — find the missing A |
| 3 months into a long programme | Full RACI review — roles drift over time |
| Team restructure or reorganisation | Full rebuild — ownership assumptions change |

---

## Quality Checks

- [ ] Every row has exactly one **A**
- [ ] No individual or team is **A** for more than their realistic sphere of authority
- [ ] **C** columns are sparse — consulting everyone dilutes the process
- [ ] Matrix was reviewed and agreed by at least one representative from each role column
- [ ] A communication plan exists to share the RACI with all involved parties
- [ ] Decision map covers the top 5–10 highest-stakes decisions in the project

## Anti-Patterns

- [ ] Do not assign more than one Accountable per task — shared accountability means no accountability
- [ ] Do not create a RACI with more than 5–6 roles — it becomes unreadable and unenforceable
- [ ] Do not include tasks so broad that the RACI cannot be acted upon — break down to decision-level granularity
- [ ] Do not skip the conflict resolution process — RACI matrices without a process for disputes are unused after the first disagreement
- [ ] Do not confuse Responsible with Accountable — document the distinction clearly for each role

## Example Trigger Phrases

- "Build a RACI matrix for our product launch"
- "Create a responsibility matrix for our new cross-functional project"
- "Who owns what on this initiative? Help me build a RACI"
- "Map out decision rights for our engineering and product teams"
- "Generate a RACI for a [migration / launch / process] involving [teams]"
