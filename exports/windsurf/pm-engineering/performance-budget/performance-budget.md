---
trigger: model_decision
description: "Define and document performance budgets for a web service or application. Use when asked to set performance targets, define SLOs for latency or throughput, establish Core Web Vitals targets, create a performance baseline, or document performance regression policy. Produces a structured performance budget covering key user journeys, Core Web Vitals, backend latency SLOs, measurement tooling, CI enforcement, and breach response process."
---

# Performance Budget Skill

Produce a complete, actionable performance budget document for a web service or application. A performance budget is not a wishlist — it is a set of measurable, enforced constraints that define what "acceptable performance" means and who is responsible when those constraints are violated.

A good performance budget answers: what are the targets, how are they measured, what triggers an investigation, and what happens when a budget is breached.

## Required Inputs

Ask for these if not already provided:
- **Service name and type** — web app, API service, mobile app, or combination
- **Key user journeys** — the 3–5 most important flows users take (e.g. "search → product page → checkout")
- **Current baseline metrics** — P50/P95/P99 latency, LCP, CLS, INP if available (state "no baseline" if not collected yet)
- **Tech stack** — frontend framework, backend language/framework, CDN, database
- **Deployment environment** — cloud provider, region(s), edge/CDN configuration
- **Cost constraints** — any budget or infrastructure limits that affect headroom

## Output Format

---

# Performance Budget: [Service Name]

**Service:** [Name] | **Team:** [Team name]
**Last updated:** [Date] | **Owner:** [Name / role]
**Environment:** [Production / Staging baseline] | **Review cadence:** [Quarterly / per-sprint]

---

## Overview

[2–3 sentences describing the service, its user-facing performance requirements, and why performance is a priority. Reference the business impact of latency — e.g. conversion rate, user retention, SLA obligations.]

**Performance philosophy:** [e.g. "Performance is a feature. Every engineer is responsible for keeping the service within budget. Regressions must be caught in CI before they reach production."]

---

## Key User Journeys

Define the critical paths that the performance budget is designed to protect.

| Journey ID | Journey name | Entry point | Exit point | Criticality |
|---|---|---|---|---|
| UJ-1 | [e.g. New user sign-up] | [Landing page] | [Dashboard] | Critical |
| UJ-2 | [e.g. Core workflow task] | [e.g. /app/tasks] | [e.g. Task complete] | High |
| UJ-3 | [e.g. Search and select] | [e.g. /search] | [e.g. Detail page] | High |
| UJ-4 | [e.g. API data fetch] | [e.g. GET /api/items] | [e.g. 200 response] | Medium |

---

## Frontend Performance Budget

*Complete this section for web and mobile applications. Skip for API-only services.*

### Core Web Vitals Targets

Targets apply to the 75th percentile of real user sessions (field data), measured on a mid-range Android device on a 4G connection unless otherwise stated.

| Metric | Description | Good | Needs Improvement | Poor | **Our Target** | Current baseline |
|---|---|---|---|---|---|---|
| **LCP** | Largest Contentful Paint — perceived load speed | ≤2.5s | 2.5–4.0s | >4.0s | **[≤X.Xs]** | [Xs / not measured] |
| **INP** | Interaction to Next Paint — responsiveness | ≤200ms | 200–500ms | >500ms | **[≤Xms]** | [Xms / not measured] |
| **CLS** | Cumulative Layout Shift — visual stability | ≤0.1 | 0.1–0.25 | >0.25 | **[≤0.X]** | [X.XX / not measured] |
| **FCP** | First Contentful Paint | ≤1.8s | 1.8–3.0s | >3.0s | **[≤X.Xs]** | [Xs / not measured] |
| **TTFB** | Time to First Byte | ≤800ms | 800ms–1.8s | >1.8s | **[≤Xms]** | [Xms / not measured] |

### Page Weight Budget

| Asset type | Max size (compressed) | Current | Status |
|---|---|---|---|
| Total page weight | [e.g. 500KB] | [XKB / unknown] | [Within / Over / Unknown] |
| JavaScript (initial load) | [e.g. 200KB] | [XKB / unknown] | [Within / Over / Unknown] |
| CSS | [e.g. 50KB] | [XKB / unknown] | [Within / Over / Unknown] |
| Images (above fold) | [e.g. 150KB] | [XKB / unknown] | [Within / Over / Unknown] |
| Web fonts | [e.g. 50KB] | [XKB / unknown] | [Within / Over / Unknown] |
| Third-party scripts | [e.g. 100KB] | [XKB / unknown] | [Within / Over / Unknown] |

### Per-Journey Frontend Targets

| Journey | LCP | INP | CLS | FCP | TTFB |
|---|---|---|---|---|---|
| UJ-1: [Journey name] | [≤Xs] | [≤Xms] | [≤0.X] | [≤Xs] | [≤Xms] |
| UJ-2: [Journey name] | [≤Xs] | [≤Xms] | [≤0.X] | [≤Xs] | [≤Xms] |
| UJ-3: [Journey name] | [≤Xs] | [≤Xms] | [≤0.X] | [≤Xs] | [≤Xms] |

---

## Backend Performance Budget

### API Latency SLOs

Targets measured at the service boundary (not including client-side network latency).

| Endpoint / operation | Method | P50 | P95 | P99 | Max (hard limit) | Error rate |
|---|---|---|---|---|---|---|
| [e.g. /api/auth/login] | POST | [≤Xms] | [≤Xms] | [≤Xms] | [≤Xms] | [<X%] |
| [e.g. /api/items] | GET | [≤Xms] | [≤Xms] | [≤Xms] | [≤Xms] | [<X%] |
| [e.g. /api/items/:id] | GET | [≤Xms] | [≤Xms] | [≤Xms] | [≤Xms] | [<X%] |
| [e.g. /api/items] | POST | [≤Xms] | [≤Xms] | [≤Xms] | [≤Xms] | [<X%] |
| [e.g. Background job: sync] | — | [≤Xs] | [≤Xs] | [≤Xs] | [≤Xs] | [<X%] |

**Overall service SLOs:**

| SLO | Target | Measurement window |
|---|---|---|
| Availability | [99.X%] | 30-day rolling |
| P95 latency (all endpoints) | [≤Xms] | 30-day rolling |
| Error rate (5xx) | [<X%] | 30-day rolling |
| Throughput (sustained) | [≥X req/s] | Peak hour |

### Database Query Budget

| Query / operation | P50 | P95 | Max | Notes |
|---|---|---|---|---|
| [e.g. User lookup by ID] | [≤Xms] | [≤Xms] | [≤Xms] | Index on `user_id` |
| [e.g. List items for user] | [≤Xms] | [≤Xms] | [≤Xms] | Paginated, max 100 rows |
| [e.g. Full-text search] | [≤Xms] | [≤Xms] | [≤Xms] | Elasticsearch / pg_trgm |

---

## Measurement Methodology

### Real User Monitoring (RUM)

**Tool:** [e.g. Google CrUX, SpeedCurve, Datadog RUM, Sentry Performance, custom]
**Data source:** [Field data from real users / Lab data from synthetic tests / Both]
**Sample rate:** [X% of sessions]
**How to access:** [Dashboard URL or tool access instructions]

**What is measured:**
- [ ] Core Web Vitals (LCP, INP, CLS) per page and journey
- [ ] Custom performance marks for business-critical interactions
- [ ] Resource timing for key assets
- [ ] Long tasks (>50ms on main thread)

### Synthetic Monitoring

**Tool:** [e.g. Lighthouse CI, WebPageTest, k6, Artillery, Playwright with performance assertions]
**Frequency:** [Every X minutes / on every deploy / nightly]
**Test location(s):** [e.g. eu-west-1, us-east-1]
**Device profile:** [Desktop 10Mbps / Mobile 4G Moto G4 / both]

**Synthetic test suite location:** [Link to test files]

### Backend Observability

**APM tool:** [e.g. Datadog, Grafana + Prometheus, New Relic, AWS X-Ray]
**Metrics collected:**
- Request rate, error rate, duration (RED metrics) per endpoint
- Database query duration and connection pool utilisation
- Cache hit/miss rates
- Background job queue depth and processing latency

**Dashboard:** [Link to primary performance dashboard]

---

## CI/CD Performance Enforcement

Performance budgets are enforced at two gates:

### Gate 1 — Build-time Bundle Analysis

**Tool:** [e.g. bundlesize, size-limit, webpack-bundle-analyzer with CI assertion]
**Config file:** [`[.bundlesizerc / .size-limit.js / etc.]`]
**Trigger:** Every PR targeting `main`
**Blocking:** Yes — PR cannot merge if bundle size budget is exceeded

```json
// Example .size-limit.js
[
  {
    "path": "dist/js/*.js",
    "limit": "200 KB"
  },
  {
    "path": "dist/css/*.css",
    "limit": "50 KB"
  }
]
```

### Gate 2 — Synthetic Performance Tests in CI

**Tool:** [e.g. Lighthouse CI, k6, Artillery]
**Trigger:** On deploy to staging
**Blocking:** Yes — production deploy is blocked if thresholds fail
**Thresholds checked:**
- LCP ≤ [Xs]
- CLS ≤ [0.X]
- P95 API latency ≤ [Xms]
- Error rate < [X%]

**CI config location:** [`[.github/workflows/perf.yml / ci/performance.yaml]`]

**How to run locally:**
```bash
# Run Lighthouse CI against local build
[command — e.g. lhci autorun --config=lighthouserc.js]

# Run load test locally
[command — e.g. k6 run load-tests/api-smoke.js]
```

---

## Budget Breach Response Process

A budget breach is when a measured metric exceeds its target for [X consecutive measurements / X minutes sustained / a single deploy].

### Breach Severity Levels

| Severity | Condition | Response time | Who acts |
|---|---|---|---|
| P1 — Critical | >2× budget threshold in production | Immediate | On-call engineer + team lead |
| P2 — High | >1.5× budget threshold in production | Within 4 hours | On-call engineer |
| P3 — Medium | Threshold exceeded in production | Within 1 sprint | PR author + team |
| P4 — Low | Threshold exceeded in staging only | Before merge | PR author |

### Breach Investigation Checklist

When a breach is detected, work through this checklist in order:

**1. Identify the regression commit**
```bash
# Compare performance across recent deploys
[command — e.g. datadog metrics query, lighthouse-ci compare, git bisect]
```

**2. Classify the breach**
- [ ] Is this a code change? (new feature, refactor, dependency bump)
- [ ] Is this an infrastructure change? (new instance type, config change)
- [ ] Is this an external factor? (CDN issue, DNS, upstream dependency)
- [ ] Is this a measurement anomaly? (test environment issue, sample size)

**3. Immediate actions**
- If P1/P2 in production and a code cause is confirmed: roll back or disable the feature flag
- If cause is unknown: do not roll back immediately — gather more data first
- Notify [#performance / #incidents Slack channel] with: metric name, current value, budget target, suspected cause

**4. Resolution**
- Fix the root cause — do not just adjust the budget threshold
- Budget thresholds should only change after a team discussion and explicit approval from [tech lead / EM]
- Document the breach in the [performance log / incident record]

**Budget change policy:** Budget thresholds may only be relaxed if: (a) the feature delivering the regression has measurable business value that outweighs the performance cost, and (b) the change is reviewed and approved by [tech lead].

---

## Performance Review Cadence

| Trigger | Action |
|---|---|
| Every sprint | Review P95/P99 latency trends; flag any creeping degradation |
| Every quarter | Full performance budget review — update baselines, adjust targets, audit tooling |
| After major feature launch | Re-measure all Core Web Vitals and API SLOs; update baselines |
| After infrastructure change | Re-run full synthetic test suite; confirm no regression |
| After dependency upgrade | Run bundle size diff; confirm no unexpected size increase |

**Next scheduled review:** [Date]
**Review owner:** [Name / role]

---

## Quality Checks

- [ ] Every budget threshold is a specific number — not a range or "TBD"
- [ ] Both frontend (if applicable) and backend targets are defined — not just one or the other
- [ ] Measurement tooling is named with a link to the dashboard or config file
- [ ] CI enforcement is configured for at least one gate (build-time or deploy-time)
- [ ] Budget breach response process names specific Slack channels and owners
- [ ] Budget thresholds are anchored to baseline measurements or a justified target — not pulled from thin air
- [ ] Per-journey targets are defined for critical user journeys, not just global averages

## Anti-Patterns

- [ ] Do not set budget thresholds without measuring a current baseline first — targets must be anchored to reality
- [ ] Do not define global averages only — critical user journeys need individual budgets as they may diverge significantly
- [ ] Do not omit CI enforcement — a performance budget that is not enforced in the build pipeline will not be respected
- [ ] Do not leave the breach response process without named owners and escalation channels
- [ ] Do not set budgets that apply only to one environment — production and staging targets should be documented separately if they differ
