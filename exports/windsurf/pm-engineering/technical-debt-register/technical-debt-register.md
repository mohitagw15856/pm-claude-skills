---
trigger: model_decision
description: "Document and prioritize a technical debt backlog with business impact, effort estimates, and resolution strategy. Use when asked to audit technical debt, create a debt register, prioritize tech debt for a quarter, document architectural shortcuts, or build a debt reduction roadmap. Produces a structured technical debt register covering debt inventory by category, business impact per item, effort and priority scores, top-item resolution plans, and a quarterly debt reduction roadmap."
---

# Technical Debt Register Skill

Produce a complete technical debt register for a team or service. A debt register is not a complaint list — it is a prioritized, business-impact-aware inventory that lets an engineering team make deliberate choices about which debt to pay down, in what order, and with what expected return.

Good debt management is not eliminating all debt. It is ensuring debt is visible, owned, and resolved when the interest cost exceeds the cost of fixing it.

## Required Inputs

Ask for these if not already provided:
- **Team or service name** — what team and/or service this register covers
- **Known debt items** — list of known technical debt, or ask Claude to elicit them by asking about: legacy code, missing tests, outdated dependencies, architectural shortcuts, manual processes, observability gaps, security backlogs
- **Tech stack** — language, frameworks, infrastructure (helps Claude categorise and score items correctly)
- **Team size and velocity** — number of engineers and approximate story points or days per sprint (needed for effort estimates)
- **Current quarter / planning period** — so the roadmap targets the right timeframe

## Output Format

---

# Technical Debt Register: [Team / Service Name]

**Team:** [Name] | **Service(s):** [Name(s)]
**Author:** [Name] | **Last updated:** [Date]
**Planning period:** [Q[X] [Year]] | **Review cadence:** [Monthly / Quarterly]

---

## Overview

[2–3 sentences describing the team's current debt situation, the main categories of debt, and the business context — e.g. are they in a growth phase where velocity matters, or approaching a compliance deadline where security debt is critical?]

**Total items in register:** [X]
**Unresolved items:** [X]
**Critical/High priority items:** [X]
**Estimated total resolution effort:** [X story points / X engineer-weeks]

---

## Debt Category Definitions

| Category | Description | Examples |
|---|---|---|
| **Code quality** | Code that works but is hard to change safely | Duplicated logic, deeply nested conditionals, inconsistent error handling, missing abstraction |
| **Architecture** | Structural decisions that limit scalability or increase coupling | Monolith that should be decomposed, sync calls that should be async, missing domain boundaries |
| **Testing** | Gaps in test coverage that increase regression risk | Missing unit tests, no integration tests, flaky test suite, no test data management |
| **Security** | Known vulnerabilities or missing security controls | Outdated dependencies with CVEs, missing rate limiting, hard-coded secrets, insufficient auth |
| **Dependencies** | Outdated or risky external dependencies | End-of-life libraries, major version lag, abandoned packages |
| **Infrastructure** | Infrastructure that limits reliability or developer productivity | Manual deployment steps, no IaC, single-AZ, missing autoscaling |
| **Observability** | Gaps in visibility that slow incident response | Missing metrics, no distributed tracing, poor log structure, no alerting on key SLIs |
| **Process** | Manual or error-prone operational processes | Manual DB migrations, no runbooks, tribal knowledge not documented |

---

## Debt Register

### Scoring Method

**Business impact (1–5):**
- 5 — Blocking growth, causing production incidents, or creating compliance risk
- 4 — Significantly slowing delivery or increasing incident likelihood
- 3 — Noticeable slowdown; manageable but accumulating
- 2 — Minor friction; low immediate risk
- 1 — Cosmetic or aspirational; no current business impact

**Effort to resolve (1–5, lower = easier):**
- 1 — <0.5 day; single engineer
- 2 — 0.5–2 days; single engineer
- 3 — 3–5 days; single engineer or small pair
- 4 — 1–2 weeks; team collaboration required
- 5 — >2 weeks; significant planning and coordination

**Priority score = Business impact × (6 − Effort)** *(rewards high-impact, low-effort items)*

---

| ID | Item | Category | Business impact (1–5) | Effort (1–5) | Priority score | Status | Owner |
|---|---|---|---|---|---|---|---|
| TD-001 | [e.g. No integration tests for payment flow] | Testing | 5 | 3 | 15 | Open | [Name] |
| TD-002 | [e.g. Authentication library 3 major versions behind] | Security | 5 | 2 | 20 | Open | [Name] |
| TD-003 | [e.g. Database queries not using connection pooling] | Architecture | 4 | 2 | 16 | Open | [Name] |
| TD-004 | [e.g. Manual deployment process for [service]] | Infrastructure | 4 | 3 | 12 | In progress | [Name] |
| TD-005 | [e.g. 200-line God function in order processing] | Code quality | 3 | 3 | 9 | Open | [Name] |
| TD-006 | [e.g. No structured logging — plain text only] | Observability | 3 | 2 | 12 | Open | [Name] |
| TD-007 | [e.g. ORM version has known N+1 query issue] | Dependencies | 3 | 3 | 9 | Open | [Name] |
| TD-008 | [e.g. No runbook for [critical operation]] | Process | 3 | 1 | 15 | Open | [Name] |
| TD-009 | [e.g. Test coverage at 34% — no meaningful safety net] | Testing | 4 | 4 | 8 | Open | [Name] |
| TD-010 | [e.g. Hard-coded config values in application code] | Code quality | 2 | 1 | 10 | Open | [Name] |
| TD-011 | [e.g. Service deployed single-AZ with no failover] | Infrastructure | 5 | 4 | 10 | Open | [Name] |
| TD-012 | [e.g. No alerting on P95 latency for [endpoint]] | Observability | 4 | 1 | 20 | Open | [Name] |

---

## Category Breakdown

```
Category distribution (by item count):
─────────────────────────────────────────────
Code quality     ████████░░  [X items]  ([X]%)
Architecture     ██████░░░░  [X items]  ([X]%)
Testing          █████████░  [X items]  ([X]%)
Security         ████░░░░░░  [X items]  ([X]%)
Dependencies     ███░░░░░░░  [X items]  ([X]%)
Infrastructure   ████░░░░░░  [X items]  ([X]%)
Observability    ████░░░░░░  [X items]  ([X]%)
Process          ██░░░░░░░░  [X items]  ([X]%)
─────────────────────────────────────────────

Priority distribution:
Critical (score 20–25): [X items]
High     (score 12–19): [X items]
Medium   (score  6–11): [X items]
Low      (score   1–5): [X items]
```

---

## Top 5 Priority Items — Resolution Plans

### TD-XXX: [Highest priority item name]

**Priority score:** [Score] | **Category:** [Category] | **Owner:** [Name]

**Problem:**
[2–3 sentences describing what the debt is, how it manifests, and what pain it currently causes. Be specific — reference actual incidents, slowdowns, or risks.]

**Business impact:**
[What happens if this is not resolved? Reference any incidents, near-misses, or growth blockers. E.g. "This caused 2 production incidents in the last quarter and adds ~30 minutes of debugging time to any change in this area."]

**Resolution approach:**
[Clear description of the fix. Not "improve the code" — describe the actual work: "Extract the payment processing logic into a dedicated `PaymentService` class, write unit tests to 80% coverage, and update the 3 call sites."]

**Steps:**
1. [Specific, ticketable step]
2. [Specific, ticketable step]
3. [Specific, ticketable step]

**Acceptance criteria:**
- [ ] [Measurable criterion — e.g. "Zero hard-coded config values remain in application code"]
- [ ] [Measurable criterion — e.g. "CI pipeline passes with new tests"]
- [ ] [Measurable criterion]

**Effort estimate:** [X story points / X days]
**Suggested sprint:** [Q[X] Sprint [Y] / When [dependency] is complete]

---

### TD-XXX: [Second priority item name]

**Priority score:** [Score] | **Category:** [Category] | **Owner:** [Name]

**Problem:**
[Description]

**Business impact:**
[Impact description]

**Resolution approach:**
[Approach description]

**Steps:**
1. [Step]
2. [Step]
3. [Step]

**Acceptance criteria:**
- [ ] [Criterion]
- [ ] [Criterion]

**Effort estimate:** [X story points / X days]
**Suggested sprint:** [Sprint or timeframe]

---

### TD-XXX: [Third priority item]

*(Follow same format as above)*

---

### TD-XXX: [Fourth priority item]

*(Follow same format as above)*

---

### TD-XXX: [Fifth priority item]

*(Follow same format as above)*

---

## Debt Reduction Roadmap

### Guiding principles

- Allocate [X%] of each sprint's capacity to debt resolution — recommended 15–20% for healthy teams
- Security and dependency debt is addressed on a fixed cadence regardless of priority score
- No new feature work in modules with Critical debt unless the debt is scheduled for the current sprint
- Debt items closed without a resolution (accepted/deferred) must have a named owner and a review date

### Quarterly plan

| Quarter | Focus area | Items targeted | Estimated capacity | Expected outcome |
|---|---|---|---|---|
| **[Q1 Year]** (current) | Security + observability | TD-002, TD-012, TD-006 | [X] points / [Y] eng-days | Auth library current; latency alerting live; structured logging shipped |
| **[Q2 Year]** | Architecture + reliability | TD-003, TD-011, TD-004 | [X] points / [Y] eng-days | Connection pooling fixed; multi-AZ deployed; deploy automation complete |
| **[Q3 Year]** | Testing coverage | TD-001, TD-009 | [X] points / [Y] eng-days | Payment flow integration tests live; overall coverage ≥60% |
| **[Q4 Year]** | Code quality + process | TD-005, TD-008, TD-010 | [X] points / [Y] eng-days | God functions refactored; runbooks complete; zero hard-coded config |

### Sprint allocation model

```
Sprint capacity: [X] story points

Allocation:
  ├── Feature work:        [X * 0.75 = ~Y] points  (75%)
  ├── Debt resolution:     [X * 0.15 = ~Y] points  (15%)
  └── Unplanned/bugs:      [X * 0.10 = ~Y] points  (10%)

Debt items that fit in one sprint ([≤Y] points each):
  ✓ TD-002 ([X] points)
  ✓ TD-012 ([X] points)
  ✓ TD-006 ([X] points)
  ✓ TD-008 ([X] points)

Multi-sprint debt items (break into phases):
  ~ TD-001: Phase 1 ([X] pts) → Phase 2 ([X] pts)
  ~ TD-009: Requires dedicated debt sprint or pairing
```

---

## Accepted / Deferred Debt

Items where the cost of remediation currently exceeds the business value, accepted with explicit review dates.

| ID | Item | Reason for deferral | Review date | Owner |
|---|---|---|---|---|
| TD-XXX | [Item] | [e.g. "Rewrite would require 3 weeks with no user-facing value at current scale; revisit at 10× traffic"] | [Date] | [Name] |
| TD-XXX | [Item] | [e.g. "Dependency has a CVE but no upgrade path exists until Q3; mitigated by WAF rule"] | [Date] | [Name] |

**Policy:** No item may be deferred more than twice without escalation to the engineering manager.

---

## Quality Checks

- [ ] Every item has a named owner — no unowned debt
- [ ] Priority scores are calculated using the formula, not assigned arbitrarily
- [ ] Security and dependency items are not scored below their actual business impact because they feel "technical"
- [ ] Top-5 resolution plans include specific, ticketable steps — not vague descriptions like "improve test coverage"
- [ ] The quarterly roadmap allocates realistic capacity — debt allocation does not exceed actual sprint budget
- [ ] Accepted/deferred items have a review date and a named owner — no permanently deferred items
- [ ] The register distinguishes between debt (deliberate or accumulated shortcuts) and bugs (unintended defects)
- [ ] Items are closed as resolved only when acceptance criteria are met — not when the PR is merged

## Anti-Patterns

- [ ] Do not score debt items arbitrarily — priority scores must be calculated using the documented formula
- [ ] Do not conflate technical debt (deliberate shortcuts) with bugs (unintended defects) — they require different remediation strategies
- [ ] Do not underrate security and dependency items because they feel abstract — score based on actual business impact
- [ ] Do not create "permanently deferred" items — every accepted item must have a review date and named owner
- [ ] Do not include resolution plans that are vague descriptions — each plan must have specific, ticketable steps
