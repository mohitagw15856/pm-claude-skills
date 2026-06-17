---
trigger: model_decision
description: "Define Service Level Objectives (SLOs) and an error budget policy for a service. Use when asked to write SLOs, define SLIs, calculate an error budget, set reliability targets, or create an error budget policy. Produces a complete SLO document with SLI definitions, target calculation, error budget policy, burn rate alerts, and review cadence."
---

# SLO and Error Budget Skill

Produce a complete, implementable SLO document for a service — covering what to measure, what target to set, how to calculate the error budget, and what to do when it burns.

A good SLO is not a target to hit. It is an agreement about what reliability means for your users — and a framework for making principled trade-offs between reliability and velocity.

## Required Inputs

Ask for these if not already provided:
- **Service name** and brief description of what it does
- **Primary users** — who depends on this service and how
- **User-facing interactions** to protect — e.g. API calls, page loads, transactions
- **Current reliability data** — error rate, latency, uptime (last 30–90 days if available)
- **Existing on-call setup** — who responds to alerts?
- **Deployment frequency** — how often does the team ship?
- **Any existing SLAs** with customers — these constrain SLO targets

## Key Definitions

Always establish these before writing the SLO:

| Term | Definition |
|---|---|
| **SLI** (Service Level Indicator) | The metric being measured — e.g. "% of requests completing successfully in <500ms" |
| **SLO** (Service Level Objective) | The target for that metric — e.g. "99.5% of requests" |
| **SLA** (Service Level Agreement) | The contractual commitment to customers — must be looser than the SLO |
| **Error budget** | The allowed headroom below 100% — the budget for planned and unplanned downtime |
| **Burn rate** | How fast the error budget is being consumed |

---

## Output Format

---

# SLO Document: [Service Name]

**Service:** [Name] | **Team:** [Team name]
**Owner:** [Name / role] | **Approved by:** [Name]
**Effective date:** [Date] | **Review date:** [Date + 3 months]
**Version:** [1.0]

---

## Why This SLO Exists

[2–3 sentences. What reliability problem are we solving? What was happening before this SLO that made us need it? What decision-making does this SLO enable?]

---

## Service Overview

**What this service does:** [One sentence]
**Who depends on it:** [Internal teams / external customers / both — describe]
**Critical user journeys protected by this SLO:**
1. [Journey 1 — e.g. "User completes a payment"]
2. [Journey 2]
3. [Journey 3]

---

## SLIs — What We Measure

Define one SLI per user journey or reliability dimension. Keep it to 3–5 SLIs maximum.

### SLI 1: [Name — e.g. Request Success Rate]

| Field | Detail |
|---|---|
| **What it measures** | [e.g. "% of API requests that return a non-5xx response"] |
| **Good event definition** | [e.g. "HTTP response with status 2xx or 4xx, completed within 500ms"] |
| **Bad event definition** | [e.g. "HTTP response with status 5xx, or any response taking >500ms"] |
| **Measurement source** | [e.g. "Application load balancer access logs / Datadog APM / Prometheus"] |
| **Measured over** | Rolling 28-day window |
| **Exclusions** | [e.g. "Health check endpoints excluded / Requests during planned maintenance excluded"] |

### SLI 2: [Name — e.g. Latency]

| Field | Detail |
|---|---|
| **What it measures** | [e.g. "P99 response time for the /checkout endpoint"] |
| **Good event definition** | [e.g. "Request completes in ≤500ms at P99"] |
| **Bad event definition** | [e.g. "Request takes >500ms at P99"] |
| **Measurement source** | [Source] |
| **Measured over** | Rolling 28-day window |
| **Exclusions** | [Any exclusions] |

### SLI 3: [Name — e.g. Data Freshness / Queue Depth / etc.]

[Same structure]

---

## SLO Targets

| SLI | Target | Window | Error Budget |
|---|---|---|---|
| [SLI 1 name] | [X]% | 28-day rolling | [100 - X]% = [Y minutes/month] |
| [SLI 2 name] | [X]% | 28-day rolling | [100 - X]% = [Y minutes/month] |
| [SLI 3 name] | [X]% | 28-day rolling | [100 - X]% = [Y minutes/month] |

**How targets were set:**
- Historical baseline (last 90 days): [X]%
- Target is set [above / at] historical baseline to [improve reliability / reflect current reality while formalising the commitment]
- Rationale: [1–2 sentences]

**What 100% is NOT the target:** [Brief explanation of why targeting 100% is counterproductive — it discourages feature development and doesn't reflect user reality]

---

## Error Budget Calculation

**For SLI 1 ([Name]), at [X]% target:**

```
Error budget = (100% - SLO target) × measurement window
             = (100% - [X]%) × 28 days × 24 hours × 60 minutes
             = [Y]% × [Z total minutes]
             = [N] minutes of allowed failure per 28-day window
```

**In plain terms:** We can afford [N] minutes of [bad events] in any rolling 28-day window before we breach the SLO.

---

## Burn Rate Alerts

Burn rate = how fast the error budget is being consumed relative to the budget window.
A burn rate of 1 = consuming the budget at exactly the rate that would exhaust it over 28 days.

| Alert | Burn rate | Window | Severity | Response |
|---|---|---|---|---|
| Page (critical) | >14× | 1 hour | P1 | Page on-call immediately — budget exhausted in <2 hours |
| Page (high) | >6× | 6 hours | P2 | Page on-call — budget exhausted in <5 days |
| Ticket (warning) | >3× | 3 days | P3 | Create ticket — review at next team meeting |
| Info | >1× | 28 days | Info | Log only — budget on track to exhaust by end of window |

**Alert implementation:** [Link to alert config in monitoring tool — e.g. Datadog, Prometheus/Alertmanager, Grafana]

---

## Error Budget Policy

This policy defines what to do with the error budget — both when it's healthy and when it's burning.

### When budget is healthy (>50% remaining)

- Feature development and deployments proceed at normal pace
- The team may take on riskier experiments
- Reliability improvements are scheduled but not urgent

### When budget is at risk (25–50% remaining)

- Deployment frequency reduced — team ships only well-tested changes
- One reliability improvement added to current sprint
- Weekly error budget review added to team standup

### When budget is nearly exhausted (<25% remaining)

- Feature work paused in favour of reliability improvements
- No new deployments without explicit on-call approval
- Daily review of error budget burn rate
- CSM / support notified to manage customer expectations

### When budget is exhausted (0% remaining — SLO breached)

- All feature work stops
- On-call engineer and engineering manager notified immediately
- Post-incident review (PIR) required within 5 business days
- SLO target may be temporarily relaxed (with stakeholder approval) while root cause is addressed

---

## Dashboard and Reporting

**SLO dashboard:** [Link to Datadog / Grafana / etc. dashboard]

**Metrics exposed:**
- Current SLO compliance (rolling 28-day)
- Error budget remaining (% and minutes)
- Burn rate (current and trend)
- Incident count and MTTR this window

**Reporting cadence:**

| Audience | Frequency | Format |
|---|---|---|
| Engineering team | Weekly | Slack summary — #[service]-slo |
| Engineering manager | Monthly | SLO review meeting |
| Stakeholders / customers | Quarterly | SLO compliance summary |

---

## Exclusions and Edge Cases

**Planned maintenance:** Error budget is not consumed during pre-announced maintenance windows. Maintenance must be communicated [X hours] in advance via [channel].

**Dependency failures:** If SLO breach is caused by an upstream dependency outside our control, document it — but it still counts against our error budget (our users don't distinguish between our failures and our dependencies' failures).

**Force majeure:** [Policy for cloud provider outages, major infrastructure events]

---

## SLO Review Cadence

| Review | When | Who | Output |
|---|---|---|---|
| Error budget review | Weekly | Team | Budget health check — adjust if burning fast |
| SLO target review | Quarterly | Team + EM | Adjust targets if baseline has shifted significantly |
| Annual SLO audit | Annually | Team + Stakeholders | Review SLIs — are we measuring the right things? |

**When to change the SLO target:**
- Historical baseline has improved significantly and target no longer reflects real reliability
- User feedback indicates the target is misaligned with what users actually experience
- The SLO is being gamed (metric is healthy but users are unhappy)

---

## Quality Checks

- [ ] SLIs are user-facing — they measure what users experience, not internal system metrics
- [ ] Good and bad events are precisely defined — no ambiguity about what counts
- [ ] Targets are based on historical data, not aspirational round numbers
- [ ] Error budget policy has clear triggers and clear actions — not "discuss as a team"
- [ ] Burn rate alerts have different windows to catch both fast burns and slow burns
- [ ] Exclusions are documented so they don't silently inflate the SLO number

## Anti-Patterns

- [ ] Do not set SLO targets at 100% — this discourages feature development and does not reflect how users experience reliability
- [ ] Do not measure internal system metrics as SLIs — SLIs must reflect what users directly experience, not internal CPU or memory
- [ ] Do not write an error budget policy with vague triggers — "discuss as a team" is not an actionable policy; triggers must be specific percentages
- [ ] Do not base targets on aspirational round numbers — always derive from historical baseline data
- [ ] Do not configure only one burn-rate alert window — a single window misses both fast burns and slow burns that exhaust the budget quietly
