# RFC Writer Skill

Produce a complete engineering RFC (Request for Comments) for a technical decision or architectural change. An RFC is a structured proposal document — not a persuasion document. Its purpose is to expose a decision to scrutiny, surface trade-offs, document alternatives considered, and create a permanent record of why a choice was made.

A good RFC makes it possible for someone who wasn't in the room to understand years later why the team built something the way they did.

## Required Inputs

Ask for these if not already provided:
- **RFC title and author** — what this RFC is about and who is proposing it
- **Problem being solved** — what is broken, missing, or inadequate today; why action is needed now
- **Proposed solution** — the approach the author is recommending, at least at a high level
- **Context and constraints** — team size, existing architecture, timeline pressures, budget limits, compliance requirements
- **Alternatives considered** — at least 2 alternative approaches the author has thought about
- **Current status** — is this pre-decision (seeking feedback) or post-decision (documenting a made decision)?

## Output Format

---

# RFC [Number]: [Title]

**Author:** [Name] | **Team:** [Team name]
**Created:** [Date] | **Last updated:** [Date]
**Status:** Draft | In Review | Approved | Rejected | Superseded by RFC-[X]
**Ticket:** [JIRA-XXX] | **Slack thread:** [#channel link]
**Review deadline:** [Date — when comments should be submitted by]

---

## Abstract

[2–4 sentences summarising the entire RFC. Should stand alone — someone reading only this should understand what is being proposed, why, and what the main trade-off is. Write this last.]

---

## 1. Problem Statement

[Describe the problem being solved. Focus on the *problem*, not the solution. Be specific and quantified where possible.]

**Current state:**
[Describe how things work today — the existing system, process, or architecture. Include any relevant constraints or limitations.]

**Why this is a problem now:**
[Why is this being addressed now rather than earlier or later? Reference metrics, incidents, product requirements, or scaling thresholds that make this urgent or timely.]

**Example of the problem in practice:**
[A concrete scenario or incident that illustrates the problem. This helps reviewers understand the real-world impact, not just the abstract description.]

```
// Example: current behaviour that illustrates the problem
[code snippet, log output, or sequence description showing the problem]
```

**Impact of not solving this:**
- [Impact 1 — e.g. "New tenant onboarding requires 3 hours of manual configuration per account"]
- [Impact 2 — e.g. "Auth service handles 400 req/s; projected to hit capacity within 8 weeks at current growth"]
- [Impact 3 — e.g. "Current approach is incompatible with the upcoming multi-region requirement"]

---

## 2. Goals and Non-Goals

**Goals:**
- [ ] [Specific, measurable outcome — e.g. "Reduce tenant onboarding time from 3 hours to <5 minutes"]
- [ ] [e.g. "Support 2,000 req/s on the auth service with P99 latency ≤50ms"]
- [ ] [e.g. "Enable multi-region deployment without changes to the application layer"]

**Non-goals:** *(what this RFC explicitly does not address)*
- [e.g. "This RFC does not address authentication for internal service-to-service calls — see RFC-042"]
- [e.g. "Performance improvements to the existing system — this RFC replaces it"]
- [e.g. "Migration of historical data — covered in a follow-on RFC"]

**Success metrics:**
| Metric | Current | Target | Measurement method |
|---|---|---|---|
| [e.g. Onboarding time] | [3 hours] | [<5 minutes] | [Prometheus histogram on onboarding job duration] |
| [e.g. Auth latency P99] | [120ms] | [≤50ms] | [Datadog APM] |
| [e.g. Engineer setup time] | [4 hours] | [<30 minutes] | [Onboarding survey] |

---

## 3. Background and Motivation

[Provide the context a reviewer needs to evaluate the proposal. This is not a repeat of the problem statement — it is the surrounding technical and business context.]

**Existing system overview:**
[Describe the relevant parts of the current architecture. Include an ASCII diagram if the relationships between components help understanding.]

```
[ASCII diagram of current architecture — optional but strongly recommended for architectural RFCs]

  ┌──────────┐     ┌──────────────┐     ┌──────────────┐
  │  Client  │────▶│  [Service A] │────▶│  [Service B] │
  └──────────┘     └──────────────┘     └──────────────┘
                           │
                           ▼
                   ┌──────────────┐
                   │  [Database]  │
                   └──────────────┘
```

**Prior work and related decisions:**
- [RFC-XXX: Title — relevant previous decision; link]
- [ADR-XXX: Title — architectural decision record]
- [Any external standards, blog posts, or vendor documentation that informs this proposal]

**Constraints:**
- [e.g. Must remain backward compatible with v1 API clients for 12 months]
- [e.g. Team has no Rust expertise — solution must be in Python or Go]
- [e.g. Must be deployable without a maintenance window]

---

## 4. Proposed Solution

[Describe the proposed approach clearly and specifically. Include enough detail that an engineer could begin implementing from this document, but don't write the code — that is for the PR.]

### 4.1 High-Level Approach

[1–3 paragraphs describing the overall solution. Explain the key idea and why it solves the problem.]

### 4.2 Architecture

```
[ASCII diagram of the proposed architecture — what the system looks like after this RFC is implemented]

  ┌──────────┐     ┌──────────────────┐     ┌──────────────┐
  │  Client  │────▶│  [New Component] │────▶│  [Service B] │
  └──────────┘     └──────────────────┘     └──────────────┘
                           │                       │
                           ▼                       ▼
                   ┌──────────────┐       ┌──────────────┐
                   │  [Store A]   │       │  [Store B]   │
                   └──────────────┘       └──────────────┘
```

### 4.3 Detailed Design

[Break the solution into its key components or decisions. For each, explain what it does and why it was designed this way.]

**Component / Decision 1: [Name]**

[Description of this component — what it does, how it works, why this approach was chosen.]

```
// Example interface, API contract, or pseudocode (not implementation code)
[Relevant schema, API definition, data flow, or pseudocode]
```

**Component / Decision 2: [Name]**

[Description]

**Component / Decision 3: [Name]**

[Description]

### 4.4 API Changes

*Complete this section if the RFC introduces or modifies any API endpoints, events, or interfaces.*

**New endpoints / events:**
```
[HTTP method + path or event name]
Request: { ... }
Response: { ... }
```

**Modified endpoints:**
- `[endpoint]`: [what changes and why; backward compatibility note]

**Deprecated endpoints:**
- `[endpoint]`: deprecated in favour of `[new endpoint]` — removal timeline: [date/version]

### 4.5 Data Model Changes

*Complete this section if any database schema or data structure changes are required.*

[Describe schema changes at a high level. Reference the database-migration-plan skill for detailed migration steps.]

```sql
-- Key schema changes (abbreviated — full migration in [link])
[DDL statements for key additions/changes]
```

---

## 5. Alternatives Considered

*Every alternative must include an explicit reason why it was rejected. "We went with the proposed solution" is not a reason.*

### Alternative 1: [Name]

**Description:**
[What this alternative would involve.]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Why rejected:**
[Specific reason — e.g. "Requires 3× the infrastructure cost", "Incompatible with multi-region requirement", "Team has no expertise in this technology and the ramp-up would miss the Q3 deadline"]

---

### Alternative 2: [Name]

**Description:**
[What this alternative would involve.]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Why rejected:**
[Specific reason]

---

### Alternative 3: Do nothing / defer

**Description:**
Accept the current state and revisit the problem in [timeframe].

**Why rejected:**
[Why deferring is not acceptable — reference the impact of not solving this from Section 1.]

---

## 6. Implementation Plan

**Estimated effort:** [X engineer-weeks] | **Target completion:** [Date / Quarter]
**Team:** [Who is building this — names or roles]

| Phase | Description | Duration | Dependencies | Owner |
|---|---|---|---|---|
| 1 | [e.g. Core implementation — new component built and tested] | [X weeks] | [None] | [Name] |
| 2 | [e.g. Integration — connect new component to existing services] | [X weeks] | [Phase 1 complete] | [Name] |
| 3 | [e.g. Rollout — canary deploy, then full rollout] | [X weeks] | [Phase 2 + staging validated] | [Name] |
| 4 | [e.g. Cleanup — deprecate old system, remove feature flags] | [X weeks] | [Phase 3 stable for X weeks] | [Name] |

**Key milestones:**
- [ ] [Date]: [Milestone — e.g. "Core implementation complete and code-reviewed"]
- [ ] [Date]: [Milestone — e.g. "Staging environment validation complete"]
- [ ] [Date]: [Milestone — e.g. "10% canary traffic without regression"]
- [ ] [Date]: [Milestone — e.g. "Full rollout complete"]
- [ ] [Date]: [Milestone — e.g. "Old system decommissioned"]

---

## 7. Migration Plan

*Complete this section if the RFC requires migrating existing users, data, or API consumers.*

**Migration strategy:** [Big-bang / Phased / Parallel-run / Opt-in]

**Who is affected:**
- [e.g. All existing API v1 consumers — requires updated client libraries]
- [e.g. X million rows in the `orders` table require backfilling]

**Migration steps:**
1. [Step 1 — describe action, who does it, estimated duration]
2. [Step 2]
3. [Step 3]

**Backward compatibility window:** [How long will the old system/API remain available?]

**Communication plan:**
- [Who needs to be notified, when, and how — e.g. "API consumers will receive a deprecation notice 3 months before the old endpoint is removed"]

---

## 8. Security Implications

[Describe the security impact of this change. If there are no security implications, state that explicitly with reasoning — do not leave this section blank.]

| Concern | Impact | Mitigation |
|---|---|---|
| [e.g. New API endpoint exposed to internet] | [e.g. New attack surface] | [e.g. Rate limiting, auth required, WAF rules] |
| [e.g. New data stored — user PII] | [e.g. GDPR scope expanded] | [e.g. Encrypted at rest, access log, data retention policy] |
| [e.g. Service-to-service communication] | [e.g. Token forgery risk] | [e.g. mTLS between services] |

**Has a threat model been produced or updated?** [Yes — link / No — required before implementation / Not required — reason]

---

## 9. Performance Implications

[Describe the expected performance impact. Include projections for the new system and how it was estimated.]

| Metric | Current | Projected | Measurement method |
|---|---|---|---|
| [e.g. P99 latency — /api/auth] | [120ms] | [≤50ms] | [Load test results — link] |
| [e.g. Database query count per request] | [12] | [3] | [Query logging in staging] |
| [e.g. Memory per instance] | [512MB] | [768MB] | [Profiling — link] |
| [e.g. Infrastructure cost] | [$X/month] | [$Y/month] | [AWS cost calculator estimate] |

**Load testing:** [Has load testing been done? Link to results. If not, when will it be done?]

**Performance risks:**
- [Risk 1 — e.g. "New component adds a network hop that may increase tail latency under congestion — needs validation at 2× peak load"]

---

## 10. Observability Changes

*Describe what new or changed metrics, logs, traces, and alerts this RFC introduces.*

**New metrics:**
| Metric name | Type | Description | Alert threshold |
|---|---|---|---|
| `[service].[component].[metric]` | [counter/gauge/histogram] | [What it measures] | [e.g. P99 > 100ms for 5 min] |

**New log events:**
| Event | Level | When emitted | Key fields |
|---|---|---|---|
| `[event.name]` | INFO | [When] | `user_id`, `duration_ms`, `result` |

**Distributed tracing:** [Are spans added for new components? Which operations are instrumented?]

**Dashboard changes:** [New dashboard / updated existing dashboard — link]

---

## 11. Rollout Plan

**Rollout strategy:** [Feature flag / Canary / Blue-green / Gradual traffic shift / Full deploy]

| Stage | Traffic % | Duration | Success criteria | Rollback trigger |
|---|---|---|---|---|
| Internal testing | 0% (dogfood) | [X days] | [No errors in internal usage] | Any error |
| Canary | 1% | [X hours] | [Error rate <0.1%; P99 latency within budget] | Error rate >0.5% |
| Limited rollout | 10% | [X days] | [As above + business metrics stable] | Error rate >0.2% |
| Full rollout | 100% | — | [All success metrics from Section 2 met] | Any SLO breach |

**Feature flag:** [Name of feature flag, if applicable] — managed in [LaunchDarkly / Unleash / config]

**Rollback procedure:**
```
// How to roll back if the rollout needs to be reversed
1. [Step 1 — e.g. Toggle feature flag to off]
2. [Step 2 — e.g. Deploy previous version]
3. [Step 3 — e.g. Notify stakeholders]
```

---

## 12. Open Questions

[List any unresolved questions, design decisions not yet made, or areas where the author is specifically seeking feedback. Assign an owner and a resolution deadline for each.]

| # | Question | Owner | Deadline | Resolution |
|---|---|---|---|---|
| 1 | [e.g. Should we use optimistic or pessimistic locking for concurrent updates to [resource]?] | [Name] | [Date] | [Pending / [Answer]] |
| 2 | [e.g. What is the retention policy for [new data type]?] | [Name] | [Date] | [Pending / [Answer]] |
| 3 | [e.g. Do we need a read replica for this query pattern at launch, or can we defer it?] | [Name] | [Date] | [Pending / [Answer]] |

---

## 13. Decision

*To be filled in after the review period closes.*

**Decision:** [Approved / Rejected / Approved with modifications]
**Decision date:** [Date]
**Decision makers:** [Names]

**Summary of key feedback addressed:**
- [Feedback item and how it was resolved]

**Conditions of approval (if any):**
- [e.g. Must complete load testing before Phase 2 begins]

---

## Quality Checks

- [ ] The problem statement is specific and quantified — not "the current system is slow" but "P99 latency is 800ms; budget is 200ms"
- [ ] Goals section includes measurable success metrics, not aspirational statements
- [ ] Every alternative has an explicit rejection reason — not just a list of cons
- [ ] Security implications section is completed, not left blank
- [ ] Performance implications include projected numbers, not just "should be better"
- [ ] Open questions are assigned to named owners with deadlines — not floating
- [ ] The RFC is written to be read by someone who was not in the planning conversations
- [ ] Migration plan addresses all affected parties — users, API consumers, data — not just the technical steps

## Anti-Patterns

- [ ] Do not write the RFC as a persuasion document — its purpose is to expose trade-offs, not sell a decision
- [ ] Do not list alternatives without explicit rejection reasons — "we preferred the proposed solution" is not a reason
- [ ] Do not leave the security implications section blank or write "N/A" without a reasoned explanation
- [ ] Do not write open questions without assigning a named owner and a resolution deadline
- [ ] Do not skip the "impact of not solving this" section — without it, reviewers cannot assess urgency
