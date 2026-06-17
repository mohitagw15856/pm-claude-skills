---
trigger: model_decision
description: "Produce a capacity planning document for a service covering traffic forecasts, resource requirements, and scaling strategy. Use when asked to plan infrastructure capacity, forecast resource needs, model traffic growth, define scaling strategy, or produce a capacity review for a service. Produces a structured capacity plan covering current baseline metrics, growth projections, resource requirements per tier, scaling strategy, cost projections, capacity triggers, and an infrastructure action roadmap."
---

# Capacity Planning Skill

Produce a complete capacity planning document for a service. Capacity planning is not about predicting the future exactly — it is about understanding current headroom, modelling growth, and ensuring the team takes infrastructure action before a constraint becomes an incident.

A good capacity plan answers: what is running out first, how long before it runs out, what does it cost to fix it, and who decides when to act.

## Required Inputs

Ask for these if not already provided:
- **Service name and description** — what the service does and who depends on it
- **Current traffic and usage metrics** — requests per second (or per day), active users, data volume — whatever units are most natural for this service
- **Current resource utilisation** — CPU %, memory %, disk usage, connection pool utilisation, DB query throughput
- **Growth rate or projections** — historical growth rate, or known upcoming events (product launch, sales cycle, seasonal peak)
- **Tech stack and infrastructure** — cloud provider, compute type (VMs, containers, serverless), database, caching layer, CDN
- **Cost constraints** — current infrastructure spend, acceptable cost ceiling, or target cost per unit of traffic

## Output Format

---

# Capacity Plan: [Service Name]

**Service:** [Name] | **Team:** [Team name]
**Author:** [Name] | **Last updated:** [Date]
**Planning horizon:** [12 months — [Month Year] to [Month Year]]
**Review cadence:** [Quarterly]

---

## 1. Executive Summary

[3–5 sentences covering: current state, the most critical capacity constraint, the timeline before it becomes a risk, the recommended action, and the cost implication. Written for an engineering manager or VP who needs the key facts without reading the full document.]

**Critical finding:** [e.g. "The database connection pool will reach 90% utilisation within 6 weeks at current growth. Without action, this will cause request queueing and latency spikes under normal traffic."]

**Recommended immediate action:** [e.g. "Increase connection pool limit and add a read replica within the next 2 weeks."]

**Estimated cost impact:** [e.g. "Recommended changes add ~$[X]/month to infrastructure spend."]

---

## 2. Current Baseline

*All metrics are 30-day averages unless noted. Date captured: [Date]*

### Traffic

| Metric | Value | Peak (7-day) | Notes |
|---|---|---|---|
| Requests per second (avg) | [X req/s] | [X req/s] | [Peak time / day of week] |
| Requests per day | [X M/day] | [X M/day] | — |
| Active users (DAU/MAU) | [X] / [X] | — | — |
| [Service-specific metric — e.g. jobs processed/hour] | [X] | [X] | — |
| [Service-specific metric — e.g. GB ingested/day] | [X GB] | [X GB] | — |

### Compute

| Resource | Current utilisation | Instance type | Count | Notes |
|---|---|---|---|---|
| CPU (avg) | [X%] | [e.g. c5.2xlarge] | [X] | Peak: [X%] |
| Memory (avg) | [X%] | — | — | Peak: [X%] |
| Network egress | [X Mbps] | — | — | — |
| Container / pod count | [X] | [e.g. 2 vCPU / 4 GB] | — | Auto-scaling range: [X–Y] |

### Database

| Resource | Current utilisation | Spec | Notes |
|---|---|---|---|
| CPU | [X%] | [e.g. db.r5.2xlarge] | Peak: [X%] |
| Memory | [X%] | [X GB RAM] | — |
| Storage used | [X GB] of [Y GB] ([Z%]) | [X GB provisioned] | Growth: [~X GB/month] |
| IOPS (avg) | [X] of [Y provisioned] | [Y IOPS] | Peak: [X IOPS] |
| Connection pool | [X] of [Y max] ([Z%]) | Max connections: [Y] | [ORM pool size: X] |
| Query P99 latency | [X ms] | — | [Slowest query: X] |
| Read/write ratio | [X%] reads / [Y%] writes | — | — |

### Cache

| Resource | Current utilisation | Spec | Notes |
|---|---|---|---|
| Memory used | [X GB] of [Y GB] ([Z%]) | [e.g. cache.r6g.large] | Eviction rate: [X%] |
| Hit rate | [X%] | — | Miss rate: [Y%] |
| Connections | [X] | Max: [Y] | — |

### Storage / Object Store

| Resource | Current usage | Growth rate | Notes |
|---|---|---|---|
| [S3 / GCS / Blob] | [X GB / TB] | [~X GB/month] | [Lifecycle policies in place? Y/N] |
| Disk (if applicable) | [X GB] of [Y GB] | [~X GB/month] | [RAID / EBS type] |

### Cost Baseline

| Component | Current monthly cost | % of total |
|---|---|---|
| Compute (app servers) | $[X] | [X%] |
| Database | $[X] | [X%] |
| Cache | $[X] | [X%] |
| Storage | $[X] | [X%] |
| CDN / bandwidth | $[X] | [X%] |
| Other ([describe]) | $[X] | [X%] |
| **Total** | **$[X]** | 100% |

**Unit economics:** $[X] per [1,000 requests / 1,000 users / GB processed]

---

## 3. Growth Projections

### Assumptions

| Assumption | Value | Source | Confidence |
|---|---|---|---|
| Monthly traffic growth rate | [X%] | [Historical trend / product forecast] | [High / Medium / Low] |
| Seasonal peak factor | [+X% in [month(s)]] | [Last year's data / expected launch] | [High / Medium] |
| Upcoming events | [e.g. Marketing campaign — [Month], expected +[X]% traffic spike] | [Marketing plan] | [Medium] |
| User growth | [X new users/month] | [Sales pipeline / growth model] | [Medium] |
| Data growth | [X GB/month] | [Current trend] | [High] |

### Traffic Forecast

| Timeframe | Req/s (avg) | Req/s (peak) | DAU | Data volume (cumulative) |
|---|---|---|---|---|
| **Now** (baseline) | [X] | [X] | [X] | [X GB/TB] |
| **+3 months** | [X] | [X] | [X] | [X GB/TB] |
| **+6 months** | [X] | [X] | [X] | [X GB/TB] |
| **+12 months** | [X] | [X] | [X] | [X GB/TB] |

*Growth formula: [Baseline] × (1 + [monthly rate])^[months] + seasonal adjustment*

### Capacity Headroom Analysis

**When does each resource run out at current utilisation and projected growth?**

| Resource | Current utilisation | Safe ceiling | Headroom remaining | Months to ceiling |
|---|---|---|---|---|
| App CPU | [X%] | 70% | [X%] | [X months] |
| App memory | [X%] | 80% | [X%] | [X months] |
| DB CPU | [X%] | 70% | [X%] | [X months] |
| DB storage | [X GB] of [Y GB] | 80% = [Z GB] | [X GB] | [X months] |
| DB IOPS | [X] of [Y] | 80% = [Z] | [X IOPS] | [X months] |
| DB connections | [X] of [Y] | 80% = [Z] | [X] | [X months] |
| Cache memory | [X GB] of [Y GB] | 75% = [Z GB] | [X GB] | [X months] |
| Storage (object) | [X TB] | No hard limit — cost trigger | — | [Cost trigger: $X/month] |

**Red flags** (resources hitting ceiling within 3 months):
- [Resource]: [current]% → ceiling in [X weeks] — **Action required**
- [Resource]: [current]% → ceiling in [X weeks] — **Action required**

---

## 4. Resource Requirements

### Compute Requirements

| Timeframe | Required instances | Recommended instance type | Auto-scaling range | Notes |
|---|---|---|---|---|
| Now | [X] | [type] | [min: X, max: Y] | Current configuration |
| +3 months | [X] | [type] | [min: X, max: Y] | [Any instance type change needed?] |
| +6 months | [X] | [type or upgrade] | [min: X, max: Y] | [Consider [larger type / horizontal scale]] |
| +12 months | [X] | [type or upgrade] | [min: X, max: Y] | [State of horizontal vs vertical decision] |

**Memory headroom target:** Maintain ≥30% available memory at average load; ≥20% at peak.
**CPU headroom target:** Maintain ≥30% available CPU at average load; ≥15% at peak.

### Database Requirements

| Timeframe | Instance type | Storage | IOPS | Read replica | Notes |
|---|---|---|---|---|---|
| Now | [type] | [X GB] | [X] | [Y/N] | Current |
| +3 months | [type] | [X GB] | [X] | [Y/N] | [Upgrade storage / IOPS] |
| +6 months | [type or upgrade] | [X GB] | [X] | **Yes** | [Read replica recommended by this point] |
| +12 months | [type] | [X GB] | [X] | [X replicas] | [Consider sharding / partitioning at this scale] |

**Storage growth management:**
- Current growth: [~X GB/month]
- Storage auto-scaling: [Enabled / Not enabled — enable by [date]]
- Archiving policy: [Records older than X months moved to [cold storage / archive tier]]

### Cache Requirements

| Timeframe | Node type | Nodes | Memory | Notes |
|---|---|---|---|---|
| Now | [type] | [X] | [X GB] | Current |
| +6 months | [type] | [X] | [X GB] | [Scale out or upgrade] |
| +12 months | [type] | [X] | [X GB] | [Cluster mode if >Y GB required] |

---

## 5. Scaling Strategy

### Compute — Horizontal Scaling

**Decision: [Horizontal / Vertical / Both]**

[State the scaling strategy and the reasoning. E.g. "The application is stateless and CPU-bound; horizontal scaling is preferred. Vertical scaling is a short-term fallback only."]

**Auto-scaling configuration:**

```
Scale-out trigger:  CPU > [X%] for [Y minutes] OR memory > [X%] for [Y minutes]
Scale-in trigger:   CPU < [X%] for [Y minutes] AND memory < [X%] for [Y minutes]
Min instances:      [X] (ensures HA across [X] AZs)
Max instances:      [Y] (cost ceiling)
Cooldown period:    [X seconds]
Warmup time:        [X seconds] (time for new instance to be healthy)
```

**Limits of horizontal scaling:**
- [e.g. Database connection pool is the current bottleneck — adding more app instances without increasing DB connections will not help]
- [e.g. Session affinity required for WebSocket connections — limits pure stateless scaling]

### Database — Read Scaling

**Strategy:** [Read replica / Connection pooling via PgBouncer / Query caching / None needed yet]

**When to add a read replica:**
- DB CPU sustained >60% for >30 minutes, OR
- Read query P95 latency >50ms, OR
- Connection pool utilisation >70%

**Connection pooling:**
- Pooler: [PgBouncer / RDS Proxy / application-level / not configured]
- Pool size: [X connections per app instance × Y instances = Z total]
- Max DB connections: [configured to Z + 20% headroom]

### Caching Strategy

**Cache policy:** [Cache-aside / Write-through / Write-behind]
**TTL strategy:**

| Data type | TTL | Invalidation method |
|---|---|---|
| [e.g. User profile] | [5 minutes] | [Explicit invalidation on update] |
| [e.g. Product catalog] | [1 hour] | [TTL expiry — eventual consistency acceptable] |
| [e.g. Session data] | [24 hours] | [Explicit invalidation on logout] |

**Cache miss handling:** [Describe what happens on a cache miss — does it fall through gracefully or cause a thundering herd risk?]

---

## 6. Cost Projections

### Infrastructure Cost Forecast

| Component | Now (monthly) | +3 months | +6 months | +12 months |
|---|---|---|---|---|
| Compute | $[X] | $[X] | $[X] | $[X] |
| Database | $[X] | $[X] | $[X] | $[X] |
| Cache | $[X] | $[X] | $[X] | $[X] |
| Storage | $[X] | $[X] | $[X] | $[X] |
| CDN / bandwidth | $[X] | $[X] | $[X] | $[X] |
| **Total** | **$[X]** | **$[X]** | **$[X]** | **$[X]** |
| MoM growth % | — | [X%] | [X%] | [X%] |

**Unit economics trend:**

| Timeframe | Cost per 1k requests | Cost per user/month | Notes |
|---|---|---|---|
| Now | $[X] | $[X] | Baseline |
| +6 months | $[X] | $[X] | [Improving / worsening — why] |
| +12 months | $[X] | $[X] | [Target: $X per 1k requests] |

**Cost optimisation opportunities:**

| Opportunity | Estimated saving | Effort | Timeline |
|---|---|---|---|
| [e.g. Reserved instances for baseline compute] | $[X/month] | Low | Immediate |
| [e.g. S3 lifecycle policy — move objects >90 days to Glacier] | $[X/month] | Low | This sprint |
| [e.g. Right-size [instance] — current is overprovisioned] | $[X/month] | Low | This sprint |
| [e.g. Optimise top-5 slow queries — reduce DB compute need] | $[X/month] | Medium | Next quarter |

---

## 7. Capacity Triggers and Actions

Define the thresholds that require explicit action — not retrospective fixes after an incident.

| Resource | Watch (amber) | Act (red — schedule work) | Emergency (incident risk) |
|---|---|---|---|
| App CPU (sustained avg) | >60% | >70% | >85% |
| App memory | >70% | >80% | >90% |
| DB CPU | >55% | >65% | >80% |
| DB storage | >65% | >75% | >85% |
| DB connections | >60% | >70% | >85% |
| Cache memory / eviction | Hit rate <90% | Hit rate <85% | Hit rate <75% |
| Error rate | >0.5% | >1% | >2% |
| P99 latency | >2× baseline | >3× baseline | >5× baseline |

**When a Watch threshold is crossed:**
- Engineer who observes it creates a ticket with capacity label
- Ticket reviewed in next sprint planning

**When an Act threshold is crossed:**
- On-call engineer creates a ticket marked P2
- Tech lead reviews within 24 hours
- Action plan documented and scheduled within 1 sprint

**When an Emergency threshold is crossed:**
- Treat as a potential incident — page on-call
- Emergency scaling actions taken immediately (see runbook)
- Root cause investigation starts within 2 hours

**Emergency scaling runbook:** [Link to oncall-runbook for capacity incidents]

---

## 8. Infrastructure Action Roadmap

### Immediate Actions (next 2 weeks)

| Action | Owner | Effort | Justification |
|---|---|---|---|
| [e.g. Increase DB connection pool limit to X] | [Name] | [2 hours] | [DB connections at X% — hitting ceiling in X weeks] |
| [e.g. Enable storage auto-scaling on RDS] | [Name] | [30 min] | [Storage at X% — prevents emergency at X months] |
| [e.g. Add S3 lifecycle policy for [bucket]] | [Name] | [1 hour] | [Storage growing at $X/month unnecessarily] |

### This Quarter (within 3 months)

| Action | Owner | Effort | Justification |
|---|---|---|---|
| [e.g. Add read replica to production DB] | [Name] | [1 day] | [DB CPU projected to hit 65% in 2 months] |
| [e.g. Increase max auto-scaling limit from X to Y] | [Name] | [2 hours] | [Current max is too close to expected peak] |
| [e.g. Configure PgBouncer for connection pooling] | [Name] | [3 days] | [Reduce per-connection overhead; headroom for growth] |

### Next Quarter (3–6 months)

| Action | Owner | Effort | Justification |
|---|---|---|---|
| [e.g. Upgrade DB instance class — [current] → [next]] | [Name] | [2 hours — blue/green] | [DB CPU projected to hit 70% by Q[X]] |
| [e.g. Implement caching for [high-read endpoint]] | [Name] | [1 week] | [Reduce DB read load by estimated [X%]] |
| [e.g. Evaluate horizontal DB sharding] | [Name] | [2 weeks (spike)] | [At 12-month projections, single DB hits limits] |

### Horizon (6–12 months)

| Action | Description | Trigger condition |
|---|---|---|
| [e.g. Multi-region deployment] | [Active-passive setup in eu-west-2] | [DAU exceeds X or SLA requires 99.99%] |
| [e.g. Database sharding or migration to distributed DB] | [Evaluate CockroachDB / Vitess] | [Single-node DB projected to hit ceiling] |
| [e.g. CDN expansion] | [Add PoPs in [region]] | [Latency SLO breached for [geography]] |

---

## Anti-Patterns

- [ ] Do not set capacity trigger thresholds without knowing the baseline — a "CPU > 70%" alert is meaningless if you don't know what normal looks like
- [ ] Do not plan only for average traffic — capacity plans that don't model peak load will result in incidents during the events that matter most
- [ ] Do not conflate vertical and horizontal scaling — adding more app servers without addressing database connection limits will not resolve the constraint
- [ ] Do not present growth projections as certainties — all forecasts have uncertainty; state the confidence level and provide a conservative and optimistic scenario
- [ ] Do not defer action items without a named owner and a specific date — a roadmap with no owners is a wish list

## Quality Checks

- [ ] Every resource has a quantified current utilisation and a projected months-to-ceiling — no hand-waving
- [ ] The most critical constraint is called out in the executive summary with a specific timeline
- [ ] Growth projections state their assumptions and confidence level — not presented as certainties
- [ ] Capacity triggers define amber/red thresholds and name who acts at each level
- [ ] Cost projections include unit economics, not just absolute totals
- [ ] The infrastructure roadmap has named owners and effort estimates — not just a wish list
- [ ] Auto-scaling configuration includes both scale-out AND scale-in triggers, and a min/max range
- [ ] Actions are ordered by urgency — immediate items are genuinely immediate, not backlog filler
