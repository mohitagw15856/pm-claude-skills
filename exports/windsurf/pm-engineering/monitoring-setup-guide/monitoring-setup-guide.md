---
trigger: model_decision
description: "Write a monitoring setup guide for a service — defining what to measure, how to alert on it, and how to build the observability stack covering the four golden signals, business metrics, log strategy, distributed tracing, alerting rules, dashboard layout, and observability debt. Use when asked to set up monitoring for a service, define alerting strategy, write an observability plan, create a dashboard specification, or document logging standards for a team. Produces a metric definitions table, alert rules specification, dashboard layout wireframe, log schema, tracing setup checklist, and monitoring gap analysis."
---

# Monitoring Setup Guide Skill

Produce a complete monitoring setup guide for a service — defining exactly what to measure, how to structure logs, how to configure alerts with actionable thresholds, and how to build dashboards that answer real operational questions. A good monitoring guide eliminates "we don't know what's happening in production" as a root cause category, and gives on-call engineers a single source of truth for what healthy looks like.

## Required Inputs

Ask for these if not already provided:
- **Service name and description** — what the service does and its role in the system
- **Tech stack** — language, framework, and infrastructure (e.g. Go/gRPC on Kubernetes, Python/FastAPI on ECS)
- **Current monitoring tooling** — Datadog, Prometheus + Grafana, CloudWatch, New Relic, Honeycomb, or none yet
- **Key user journeys** — the 2–4 most important things a user or consumer does with the service (these drive what to alert on)
- **Existing alerts** — paste any existing alert configurations or describe what's currently monitored

## Output Format

---

# Monitoring Setup Guide: [Service Name]

**Team:** [Team name] | **Tech lead:** [Name]
**Stack:** [Language/Framework] on [Infrastructure]
**Monitoring platform:** [Datadog / Prometheus+Grafana / CloudWatch / etc.]
**Date:** [Date] | **Review cycle:** Quarterly

---

## 1. Monitoring Philosophy

Good monitoring answers three questions:
1. **Is the service healthy right now?** (alerting)
2. **Was it healthy in the past, and is it trending worse?** (dashboards + SLO tracking)
3. **Why did something fail?** (logs + traces)

This guide defines the answers for [Service Name]. Every alert must be actionable — if an on-call engineer cannot take a specific action in response to the alert, the alert should not exist.

**Key user journeys monitored:**
- Journey 1: [e.g. "User submits a payment — POST /charges, receives confirmation"]
- Journey 2: [e.g. "User views transaction history — GET /transactions"]
- Journey 3: [e.g. "Subscription renewal job runs — background worker processes billing events"]

---

## 2. The Four Golden Signals

Apply the four golden signals specifically to [Service Name]:

### Latency

Latency measures how long requests take to complete. Track it separately for successful and failed requests — slow failures hide behind fast errors if you only measure aggregate latency.

| Metric | Description | Source | Dimensions |
|---|---|---|---|
| `[service].request.duration_ms` | End-to-end request latency | Application instrumentation | `endpoint`, `method`, `status_code` |
| `[service].db.query_duration_ms` | Database query latency | ORM / query instrumentation | `query_name`, `table` |
| `[service].external.request_duration_ms` | Outbound call latency to dependencies | HTTP client instrumentation | `target_service`, `endpoint` |
| `[service].queue.processing_duration_ms` | Time to process one message (if applicable) | Consumer instrumentation | `queue_name`, `message_type` |

**Latency SLO targets:**

| Endpoint / operation | p50 target | p95 target | p99 target |
|---|---|---|---|
| `GET /api/v1/[resource]` | < [50] ms | < [200] ms | < [500] ms |
| `POST /api/v1/[resource]` | < [100] ms | < [400] ms | < [1000] ms |
| `GET /health` | < [10] ms | < [20] ms | < [50] ms |
| [Background job name] | < [5] sec | < [15] sec | < [60] sec |

### Traffic

Traffic measures demand on the system. Use it to detect unexpected spikes, traffic drops (which can indicate upstream failures), and to capacity-plan.

| Metric | Description | Source |
|---|---|---|
| `[service].request.count` | Requests per second | Application / load balancer |
| `[service].request.count_by_endpoint` | RPS broken down by endpoint | Application |
| `[service].queue.messages_consumed_per_second` | Consumer throughput | Queue consumer |
| `[service].queue.depth` | Messages waiting in queue | Queue metrics |

**Traffic baselines (update after observing production for 2+ weeks):**

| Time period | Expected RPS | Low-traffic floor | Spike ceiling |
|---|---|---|---|
| Peak (weekday business hours) | [N] RPS | [N × 0.5] RPS | [N × 5] RPS |
| Off-peak (nights/weekends) | [N × 0.2] RPS | [N × 0.05] RPS | [N] RPS |

### Errors

Errors measure the fraction of requests that fail. Distinguish between client errors (4xx — caller is doing something wrong) and server errors (5xx — the service is broken).

| Metric | Description | Alert on? |
|---|---|---|
| `[service].request.error_rate` | 5xx errors / total requests | Yes — see alert rules |
| `[service].request.client_error_rate` | 4xx errors / total requests | Threshold alert — sudden spike may indicate API misuse |
| `[service].dependency.error_rate` | Errors calling downstream dependencies | Yes — upstream health signal |
| `[service].queue.dlq_depth` | Messages in dead-letter queue | Yes — indicates processing failures |

### Saturation

Saturation measures how "full" the service is — how close to maximum capacity are the constrained resources.

| Resource | Metric | Alert threshold | Source |
|---|---|---|---|
| CPU | `[service].cpu.utilisation_pct` | >80% sustained 5 min | Container / VM metrics |
| Memory | `[service].memory.utilisation_pct` | >85% sustained 5 min | Container / VM metrics |
| DB connections | `[service].db.connection_pool.utilisation_pct` | >75% | Application / DB metrics |
| Thread pool / goroutines | `[service].runtime.goroutine_count` / `thread_count` | >N (establish baseline) | Runtime metrics |
| Disk (if applicable) | `[service].disk.utilisation_pct` | >75% | Infrastructure |
| Queue depth (if applicable) | `[service].queue.depth` | >[backlog threshold] | Queue metrics |

---

## 3. Business Metrics

Beyond the golden signals, track metrics that measure whether the service is delivering business value. These matter for SLO reporting and product dashboards.

| Metric | Description | Source | Alert? |
|---|---|---|---|
| `[service].[primary_action].success_rate` | [e.g. "Payment success rate"] | Application | Yes — if drops >5% vs 1h average |
| `[service].[primary_action].count` | [e.g. "Payments processed per minute"] | Application | Yes — sudden drop (traffic anomaly) |
| `[service].[resource].created_per_hour` | [e.g. "New accounts created"] | Application / DB | No — informational |
| `[service].cache.hit_rate` | Fraction of requests served from cache | Cache instrumentation | Yes — if drops below [60]% |
| `[service].job.[name].success_rate` | [Background job success rate] | Job framework | Yes — if drops below [99]% |

---

## 4. Log Strategy

### Structured Logging Schema

All logs must be structured JSON. Do not emit unstructured text logs in production. Every log line must include the mandatory fields.

**Mandatory fields (every log line):**

```json
{
  "timestamp": "2024-01-15T10:23:45.123Z",
  "level": "info",
  "service": "[service-name]",
  "version": "[git-sha-short]",
  "trace_id": "[uuid-from-request-context]",
  "span_id": "[span-uuid]",
  "request_id": "[uuid-per-request]",
  "message": "[human readable description]"
}
```

**Request log (emit for every HTTP request):**

```json
{
  "timestamp": "...",
  "level": "info",
  "service": "[service-name]",
  "event": "http_request",
  "method": "POST",
  "path": "/api/v1/[resource]",
  "status_code": 201,
  "duration_ms": 45,
  "user_id": "[uuid — DO NOT log PII directly]",
  "request_id": "[uuid]",
  "trace_id": "[uuid]"
}
```

**Error log (emit for every error with context):**

```json
{
  "timestamp": "...",
  "level": "error",
  "service": "[service-name]",
  "event": "error",
  "error_code": "[application-error-code]",
  "error_message": "[description — no sensitive data]",
  "stack_trace": "[stack trace]",
  "request_id": "[uuid]",
  "trace_id": "[uuid]",
  "context": {
    "[key]": "[relevant context without PII]"
  }
}
```

### Log Levels — When to Use Each

| Level | Use when | Example |
|---|---|---|
| `error` | Something failed that requires attention — this should page on-call eventually | Database query failed, external API returned 5xx, required config missing |
| `warn` | Something unexpected happened but service is still functioning | Retry succeeded after failure, cache miss on expected hit, rate limit approaching |
| `info` | Significant business events and request lifecycle | Request received, payment processed, user authenticated, job started/completed |
| `debug` | Detailed diagnostic information — off in production by default | Query parameters, intermediate computation results, cache key lookups |

### What NOT to Log

**Never log:**
- Passwords, tokens, API keys, or secrets (even hashed)
- Full credit card numbers or PAN data
- Social security numbers or government IDs
- Full names + dates of birth + contact info in the same log line (PII aggregation)
- Request/response bodies in full (use field-level extraction instead)
- Health check requests (too noisy — exclude `GET /health` from access logs)

---

## 5. Distributed Tracing Setup

Distributed tracing is mandatory for any service that calls other services. It enables root-cause analysis across service boundaries.

### Instrumentation Checklist

```
[ ] Tracing library installed:
    - Go: go.opentelemetry.io/otel
    - Python: opentelemetry-sdk, opentelemetry-instrumentation
    - Node: @opentelemetry/sdk-node
    - Java: opentelemetry-java-instrumentation

[ ] Tracer initialized at service startup with service name and version

[ ] Trace context propagated via W3C Trace Context headers:
    traceparent: 00-[trace-id]-[span-id]-01
    tracestate: [optional vendor-specific]

[ ] Automatic instrumentation enabled for:
    [ ] Inbound HTTP/gRPC requests (creates root span)
    [ ] Outbound HTTP/gRPC calls (creates child spans)
    [ ] Database queries (creates child spans with sanitized query)
    [ ] Cache operations (Redis, Memcached)
    [ ] Message queue produce/consume

[ ] Custom spans added for:
    [ ] Key business operations ([e.g. payment processing, user lookup])
    [ ] Background jobs (each job execution = root span)
    [ ] Third-party API calls with custom attributes

[ ] Span attributes to capture on all spans:
    - user.id (if authenticated — no PII)
    - deployment.environment (production/staging)
    - service.version (git SHA)
    - [service-specific key attributes]

[ ] Trace exporter configured to: [Datadog / Jaeger / Tempo / OTLP endpoint]

[ ] Sampling rate configured:
    - Production: [1–10]% of requests (adjust based on volume and cost)
    - Always sample: errors, slow requests (>p99 threshold), and 100% of [critical endpoint]
```

### Trace Instrumentation Examples

```python
# Python — OpenTelemetry example
from opentelemetry import trace

tracer = trace.get_tracer("[service-name]")

def process_payment(payment_data):
    with tracer.start_as_current_span("process_payment") as span:
        span.set_attribute("payment.amount_cents", payment_data["amount"])
        span.set_attribute("payment.currency", payment_data["currency"])
        # Never: span.set_attribute("payment.card_number", ...)
        try:
            result = _do_process(payment_data)
            span.set_status(trace.StatusCode.OK)
            return result
        except PaymentError as e:
            span.set_status(trace.StatusCode.ERROR, str(e))
            span.record_exception(e)
            raise
```

---

## 6. Alert Rules Specification

Every alert must have: a name, a condition, a threshold, a severity, and a clear on-call action. Alerts without a clear action should not exist.

### Alert Definitions

| Alert name | Condition | Threshold | Severity | On-call action |
|---|---|---|---|---|
| `[Service]HighErrorRate` | 5xx error rate, 5-min rolling window | >1% for 2 consecutive windows | P1 | Check recent deploys; inspect error logs; see runbook [link] |
| `[Service]CriticalErrorRate` | 5xx error rate, 2-min rolling window | >5% | P1 — immediate | Same as above — page immediately, do not wait |
| `[Service]HighP99Latency` | p99 latency on key endpoints | >2× SLO target for 3 min | P2 | Check DB latency, cache hit rate, and upstream dependencies |
| `[Service]LatencySLOBreach` | p99 latency | >SLO target for 5 consecutive minutes | P1 | SLO burn — page on-call, escalate if not resolved in 20 min |
| `[Service]HighCPU` | CPU utilisation | >80% sustained for 5 min | P2 | Check for traffic spike; scale up if needed; check for runaway processes |
| `[Service]HighMemory` | Memory utilisation | >85% sustained for 5 min | P2 | Check for memory leak (especially after deploys); restart pod if OOM imminent |
| `[Service]DBConnectionPoolHigh` | DB connection pool utilisation | >75% | P2 | Check for long-running queries; consider scaling service or increasing pool size |
| `[Service]DLQDepthHigh` | Dead-letter queue depth | >10 messages | P2 | Inspect DLQ messages for error pattern; fix bug and replay if safe |
| `[Service]TrafficDropAnomaly` | RPS, compared to same hour yesterday | >50% drop sustained 5 min | P1 | Upstream may be down; check caller health; check load balancer |
| `[Service]PrimaryActionSuccessRateDrop` | [Business metric success rate] | <[95]% over 10 min | P1 | [Service-specific action — e.g. "Check payment provider status"] |
| `[Service]DownstreamDependencyErrors` | Error rate calling [dependency] | >5% over 5 min | P2 | Check [dependency] status page; enable fallback if available |

### Alert Configuration Examples

```yaml
# Prometheus / Grafana alerting rules (adapt for your platform)
groups:
  - name: [service-name]-alerts
    rules:

      - alert: [Service]HighErrorRate
        expr: |
          (
            sum(rate([service]_http_requests_total{status=~"5.."}[5m]))
            /
            sum(rate([service]_http_requests_total[5m]))
          ) > 0.01
        for: 2m
        labels:
          severity: critical
          team: [team-name]
        annotations:
          summary: "High error rate on [Service Name]"
          description: "Error rate is {{ $value | humanizePercentage }} (threshold: 1%)"
          runbook_url: "[runbook link]"

      - alert: [Service]HighP99Latency
        expr: |
          histogram_quantile(0.99,
            sum(rate([service]_http_request_duration_seconds_bucket[5m])) by (le, endpoint)
          ) > [0.5]
        for: 3m
        labels:
          severity: warning
          team: [team-name]
        annotations:
          summary: "p99 latency elevated on [Service Name]"
          description: "p99 latency on {{ $labels.endpoint }} is {{ $value | humanizeDuration }}"
          runbook_url: "[runbook link]"
```

```python
# Datadog monitor configuration (Python SDK or Terraform)
import datadog

datadog.initialize(api_key="[key]", app_key="[key]")

datadog.api.Monitor.create(
    type="metric alert",
    query=f"sum(last_5m):sum:{{service}}.http.errors{{service:[service-name]}} / sum:{{service}}.http.requests{{service:[service-name]}} > 0.01",
    name="[Service] High Error Rate",
    message="Error rate exceeded 1%. @pagerduty-[service-oncall]\n\nRunbook: [link]",
    tags=["service:[service-name]", "team:[team-name]"],
    options={
        "thresholds": {"critical": 0.01, "warning": 0.005},
        "notify_no_data": False,
        "evaluation_delay": 60,
    }
)
```

---

## 7. Dashboard Layout Specification

The primary service dashboard must answer "is the service healthy right now?" at a glance. Use this layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│  [SERVICE NAME] — Service Health Dashboard           [Time range ▼] │
├───────────────┬───────────────┬───────────────┬─────────────────────┤
│  Error rate   │  p99 Latency  │  RPS (current)│  SLO budget remaining│
│  [BIG NUMBER] │  [BIG NUMBER] │  [BIG NUMBER] │  [BIG NUMBER / days] │
│  vs SLO: 0.1% │  vs SLO: 500ms│  vs avg: [N]  │  [Error budget gauge]│
├───────────────┴───────────────┴───────────────┴─────────────────────┤
│                   Error rate over time (24h)                        │
│  [Time series: 5xx rate line, SLO threshold line]                   │
├─────────────────────────────────┬───────────────────────────────────┤
│  Latency percentiles over time  │  Request throughput over time     │
│  [Lines: p50, p95, p99, p999]   │  [Bars: RPS by endpoint]          │
│  [SLO threshold horizontal line]│                                   │
├─────────────────────────────────┴───────────────────────────────────┤
│  Latency heatmap (all requests — shows distribution shape)          │
├─────────────────────────────────┬───────────────────────────────────┤
│  CPU utilisation over time      │  Memory utilisation over time     │
│  [All instances/pods — lines]   │  [All instances/pods — lines]     │
│  [Alert threshold: 80%]         │  [Alert threshold: 85%]           │
├─────────────────────────────────┴───────────────────────────────────┤
│  DB: connection pool utilisation│  DB: query latency (p99 per query)│
├─────────────────────────────────┴───────────────────────────────────┤
│  [Business metric 1 over time]  │  [Business metric 2 over time]    │
│  e.g. Payment success rate      │  e.g. Orders created/min          │
└─────────────────────────────────┴───────────────────────────────────┘
```

**Second dashboard — Dependency Health:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  [SERVICE NAME] — Dependency Health                                 │
├─────────────────────────────────────────────────────────────────────┤
│  For each dependency: error rate | latency | current status         │
│  [Database]    [N]% errors | [N]ms p99 | ● Healthy / ⚠ Degraded    │
│  [Redis]       [N]% errors | [N]ms p99 | ● Healthy                 │
│  [External API][N]% errors | [N]ms p99 | ● Healthy                 │
├─────────────────────────────────────────────────────────────────────┤
│  Outbound call latency over time (one line per dependency)          │
├─────────────────────────────────────────────────────────────────────┤
│  Circuit breaker / fallback state (if implemented)                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. Observability Debt Analysis

Honest assessment of what is missing today and what the priority to add it is:

| Gap | Impact | Priority | Effort | Owner | Target date |
|---|---|---|---|---|---|
| [e.g. No distributed tracing — can't see cross-service latency] | High — blind to dependency issues | P1 | [2 days] | [Name] | [Date] |
| [e.g. No business metric alerts — only infra alerts] | High — silent business failures | P1 | [1 day] | [Name] | [Date] |
| [e.g. Logs are unstructured text — not searchable] | Medium — slow incident investigation | P2 | [3 days] | [Name] | [Date] |
| [e.g. No dead-letter queue monitoring] | Medium — failed messages go unnoticed | P2 | [4 hours] | [Name] | [Date] |
| [e.g. Alert thresholds not calibrated to production baseline] | Medium — alert fatigue or missed alerts | P2 | [1 day] | [Name] | [Date] |
| [e.g. No latency heatmap — outliers invisible in averages] | Low — harder to spot tail latency issues | P3 | [2 hours] | [Name] | [Date] |

**Total observability debt: [N] items | Estimated effort: [N days]**

---

## Quality Checks

- [ ] Every alert has a named on-call action — no alert says "investigate" without specifying what to investigate first
- [ ] Alert thresholds are calibrated against production baselines, not set to default values from a template
- [ ] Structured logging is implemented — no unstructured text log lines in production
- [ ] PII is explicitly excluded from logs — a named engineer has verified this
- [ ] Distributed tracing is propagating trace IDs across all service boundaries (verify with a test request)
- [ ] The primary dashboard answers "is the service healthy?" in under 10 seconds — no hunting for the right panel
- [ ] Business metrics are tracked alongside infrastructure metrics — not just four golden signals
- [ ] Observability debt items have owners and dates — not just "would be nice to have"

## Anti-Patterns

- [ ] Do not create alerts without a specific on-call action — an alert that just says "investigate" trains engineers to ignore it
- [ ] Do not set alert thresholds from a template without calibrating against production baselines — uncalibrated thresholds cause either alert fatigue or missed incidents
- [ ] Do not log PII, tokens, or secrets — a logging standard is incomplete without an explicit list of what must never be logged
- [ ] Do not measure only the four golden signals without adding at least one business metric alert — infrastructure health can be green while the business-critical path is silently failing
- [ ] Do not deploy distributed tracing without verifying that trace IDs propagate across all service boundaries — partial tracing is worse than no tracing because it produces misleading incomplete traces
