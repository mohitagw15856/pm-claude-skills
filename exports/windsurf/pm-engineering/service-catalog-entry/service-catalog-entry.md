---
trigger: model_decision
description: "Write a service catalog entry for a microservice or internal platform service — covering service identity, purpose, architecture context, SLAs, API contract summary, data classification, dependencies, operational runbooks, and known limitations. Use when asked to document a service for an internal developer portal, write a service README for a platform catalog, create a service overview page, or onboard a new service to a service registry. Produces a complete service catalog entry suitable for an internal developer portal or wiki."
---

# Service Catalog Entry Skill

Produce a complete service catalog entry for a microservice or internal platform service — giving any engineer at the company the context they need to understand what the service does, how to depend on it, what its reliability characteristics are, and where to go when something goes wrong. A well-written catalog entry eliminates "who owns this?" and "is this safe to use?" questions that slow down teams depending on shared services.

## Required Inputs

Ask for these if not already provided:
- **Service name** — the canonical identifier used in code, monitoring, and deployments
- **Team and owner** — team name, tech lead name, and on-call contact
- **Architecture overview** — what the service does, what calls it, and what it calls
- **SLA requirements** — availability target, latency SLO, support tier, and maintenance window
- **Key APIs** — the most important endpoints other teams use (method, path, brief description)
- **Data handled** — what data the service stores or processes, sensitivity classification, retention

## Output Format

---

# Service Catalog: [Service Name]

> **[One sentence — what this service does for consumers, in plain language]**
>
> *e.g. "The Payments Service processes charge, refund, and subscription billing events for all Acme products."*

---

## Identity

| Field | Value |
|---|---|
| **Service name** | `[service-name]` |
| **Canonical repository** | [https://github.com/[org]/[repo]] |
| **Owner team** | [Team name] |
| **Tech lead** | [Name] ([Slack: @handle]) |
| **On-call rotation** | [PagerDuty service link] |
| **Slack channel** | `#[team-channel]` |
| **Support tier** | [Tier 1 — 24/7 / Tier 2 — business hours / Tier 3 — best effort] |
| **Status** | [Active / Deprecated / Sunset date: YYYY-MM-DD] |
| **Language / runtime** | [e.g. Go 1.22 / Python 3.12 / Node 20] |
| **Deployment platform** | [Kubernetes / ECS / Lambda / etc.] |
| **Environments** | [Production: URL] | [Staging: URL] | [Dev: URL] |

---

## What It Does

[Two to three paragraphs in plain language — no jargon or acronyms without explanation.]

[Paragraph 1: The business problem this service solves. What would break or be missing if this service did not exist?]

[Paragraph 2: How it works at a high level — the main processing model (e.g. request/response API, event-driven consumer, batch processor), what triggers it, and what it produces.]

[Paragraph 3: What this service is NOT responsible for — the explicit boundaries. This prevents other teams from building incorrect assumptions about scope.]

---

## Architecture Context

### System Diagram

```
[Upstream callers]          [This Service]             [Downstream dependencies]
                                                        
  [Web App]  ──────────→                          ──→  [Primary Database — PostgreSQL]
  [Mobile API]  ────────→  [Service Name]         ──→  [Cache — Redis]
  [Partner API] ────────→  (Port 8080/gRPC)       ──→  [Message Queue — Kafka/SQS]
                                                   ──→  [External Service / API]
                           ↓ emits events to
                        [Event Bus / SNS]
                           ↓ consumed by
                  [Downstream Service A]
                  [Downstream Service B]
```

### Who Depends on This Service

| Caller | How they use it | Contact |
|---|---|---|
| [Service / Team A] | [e.g. "Calls POST /charges to initiate payments"] | [Slack: #team-a] |
| [Service / Team B] | [e.g. "Subscribes to payment.completed events via Kafka topic"] | [Slack: #team-b] |
| [Service / Team C] | [e.g. "Calls GET /subscriptions for billing status"] | [Slack: #team-c] |

### What This Service Depends On

| Dependency | Type | Criticality | Their on-call |
|---|---|---|---|
| [PostgreSQL instance] | Database | Critical — all writes fail without it | [DBA team: #db-oncall] |
| [Redis cluster] | Cache | High — latency degrades without it | [Infra team: #infra-oncall] |
| [Kafka cluster] | Message queue | High — async events queue | [Infra team: #infra-oncall] |
| [Stripe API] | External API | Critical — payment processing fails | [vendor status: status.stripe.com] |
| [Auth Service] | Internal service | Critical — all auth fails | [Auth team: #auth-oncall] |

---

## Service Level Agreement

### Availability and Latency

| SLO | Target | Measurement window | Error budget |
|---|---|---|---|
| Availability | [99.9%] | Rolling 30 days | [43 min/month] |
| p50 latency (key endpoints) | < [50] ms | Rolling 24 hours | — |
| p99 latency (key endpoints) | < [500] ms | Rolling 24 hours | — |
| p99.9 latency (key endpoints) | < [2000] ms | Rolling 24 hours | — |
| Error rate | < [0.1]% | Rolling 1 hour | — |

**SLO dashboard:** [Link to monitoring dashboard]
**Current error budget remaining:** [Link to SLO dashboard or inline value]

### Support Tiers

| Tier | Scope | Response time | Resolution time |
|---|---|---|---|
| P1 — Service down | All authenticated requests failing | 15 minutes | 1 hour |
| P2 — Significant degradation | Error rate >1% or p99 >2× SLO | 30 minutes | 4 hours |
| P3 — Minor issues | Non-critical endpoints degraded | Next business day | 3 business days |
| Feature requests / bugs | Via standard ticket process | [Ticket SLA] | Per roadmap |

**To raise an incident:** Page via [PagerDuty service link] or post in `#incidents`.
**To raise a feature request or bug:** File a ticket in [JIRA project / GitHub repo Issues].

### Maintenance Windows

- **Planned downtime:** [e.g. "Sundays 02:00–04:00 UTC — advance notice posted to #[team-channel] 48h before"]
- **Deployment window:** [e.g. "Weekdays 10:00–16:00 UTC — no deploys on Fridays or the day before a public holiday"]
- **Breaking changes notice:** [e.g. "Minimum 30 days notice for breaking API changes — see versioning policy below"]

---

## API Contract

### Authentication

All API calls require: [e.g. "Bearer token via Authorization header. Tokens are issued by the Auth Service (`/api/v1/token`)"]

```
Authorization: Bearer [jwt-token]
Content-Type: application/json
```

### Base URL

| Environment | Base URL |
|---|---|
| Production | `https://[service-name].internal.[company].com` |
| Staging | `https://[service-name].staging.[company].com` |
| Local development | `http://localhost:[port]` |

### Key Endpoints

| Method | Path | Description | Auth required | Rate limit |
|---|---|---|---|---|
| `GET` | `/health` | Liveness and readiness check | No | None |
| `GET` | `/api/v1/[resource]` | [Description — e.g. "List resources for the authenticated user"] | Yes | [100 req/min] |
| `GET` | `/api/v1/[resource]/:id` | [Description — e.g. "Get a single resource by ID"] | Yes | [500 req/min] |
| `POST` | `/api/v1/[resource]` | [Description — e.g. "Create a new resource"] | Yes | [50 req/min] |
| `PUT` | `/api/v1/[resource]/:id` | [Description — e.g. "Update an existing resource"] | Yes | [50 req/min] |
| `DELETE` | `/api/v1/[resource]/:id` | [Description] | Yes | [20 req/min] |

**Full API documentation:** [OpenAPI/Swagger spec URL] | [Postman collection URL]

### Versioning Policy

- API version is in the URL path (`/api/v1/`, `/api/v2/`)
- Minor additions (new optional fields, new endpoints) are non-breaking — no version bump
- Breaking changes (removed fields, changed types, authentication changes) require a new major version
- Deprecated versions are supported for [90 days] after the successor reaches GA
- Deprecation notices are posted to `#[team-channel]` and emailed to registered consumers

### Error Response Format

```json
{
  "error": {
    "code": "[ERROR_CODE]",
    "message": "[Human-readable description]",
    "request_id": "[UUID — include in support tickets]",
    "details": {}
  }
}
```

Common error codes:

| HTTP status | Error code | Meaning |
|---|---|---|
| 400 | `INVALID_REQUEST` | Request body or parameters fail validation |
| 401 | `UNAUTHENTICATED` | Missing or invalid auth token |
| 403 | `FORBIDDEN` | Token valid but lacks permission for this resource |
| 404 | `NOT_FOUND` | Resource does not exist |
| 409 | `CONFLICT` | Duplicate resource or state conflict |
| 422 | `UNPROCESSABLE_ENTITY` | Request is valid but violates business rules |
| 429 | `RATE_LIMITED` | Too many requests — back off and retry |
| 500 | `INTERNAL_ERROR` | Unexpected server error — include request_id in support ticket |
| 503 | `SERVICE_UNAVAILABLE` | Downstream dependency unavailable — retry with backoff |

### Events Published (if event-driven)

| Event | Topic / Queue | Schema | Published when |
|---|---|---|---|
| `[resource].created` | `[kafka-topic / sns-arn]` | [Schema URL] | [When a new resource is created] |
| `[resource].updated` | `[kafka-topic / sns-arn]` | [Schema URL] | [When a resource is modified] |
| `[resource].deleted` | `[kafka-topic / sns-arn]` | [Schema URL] | [When a resource is deleted] |

---

## Data Classification

| Data element | Sensitivity | Stored in | Retention | Encrypted at rest |
|---|---|---|---|---|
| [User PII — e.g. email, name] | [PII / Restricted] | [PostgreSQL `users` table] | [Until account deletion] | Yes |
| [Financial data — e.g. card last 4] | [PCI / Highly restricted] | [PostgreSQL `payment_methods` table] | [7 years per regulations] | Yes — field-level encryption |
| [Operational logs] | [Internal] | [CloudWatch / Datadog] | [90 days] | Yes (at rest, not searched) |
| [Anonymised analytics] | [Public] | [Data warehouse] | [Indefinite] | Yes |

**Data residency:** [e.g. "All data stored in us-east-1. EU customer data stored in eu-west-1 per GDPR requirements."]
**Compliance scope:** [e.g. SOC 2 Type II / PCI DSS Level 2 / HIPAA / GDPR]
**Data access policy:** [e.g. "Production database access requires [approval process]. Access logged and reviewed quarterly."]

---

## Operational Runbooks

| Runbook | Location | Use when |
|---|---|---|
| On-call runbook | [Wiki / GitHub link] | Responding to PagerDuty alerts |
| Deployment runbook | [Wiki / GitHub link] | Deploying a new version to production |
| Database migration runbook | [Wiki / GitHub link] | Running schema migrations |
| Rollback runbook | [Wiki / GitHub link] | Rolling back a bad deploy |
| Incident response runbook | [Wiki / GitHub link] | Declaring and managing incidents |
| Disaster recovery plan | [Wiki / GitHub link] | Zone/region failure or data loss |

**Monitoring dashboards:**

| Dashboard | Link | Use it for |
|---|---|---|
| Service overview | [Datadog / Grafana link] | Error rate, latency, throughput |
| Infrastructure | [Link] | CPU, memory, pod health |
| Database | [Link] | Query performance, connection pool |
| SLO / error budget | [Link] | Budget burn rate, availability |
| Dependency health | [Link] | Upstream dependency status |

---

## Known Limitations

Document limitations honestly — this section prevents other teams from building on incorrect assumptions.

| Limitation | Impact | Workaround | Planned fix |
|---|---|---|---|
| [e.g. No bulk write API — items must be created one at a time] | [Slow for large imports — N HTTP calls required] | [Use the batch import CLI tool for >100 items] | [Bulk API in Q3 — ticket: [URL]] |
| [e.g. List endpoints have a maximum page size of 100] | [Cannot retrieve more than 100 items in a single call] | [Paginate using `cursor` parameter] | [No current plan to increase — by design] |
| [e.g. Rate limits are per-token, not per-service] | [High-traffic consumers may hit limits for other consumers on the same token] | [Request dedicated service-account token] | [Per-service rate limits in roadmap] |
| [e.g. Eventual consistency on read-after-write for list endpoints] | [Record may not appear in list immediately after creation (<500ms lag)] | [Use GET /:id to confirm creation; do not rely on list for immediate consistency] | [Read-your-writes consistency available via `?consistent=true` — in progress] |

---

## Getting Started

**To start using this service:**

1. Request access: [Link to access request form or instructions]
2. Get your service account credentials: [Link to process]
3. Read the API docs: [OpenAPI spec URL]
4. Try the sandbox environment: `https://[service-name].sandbox.[company].com`
5. Join the consumer Slack channel: `#[service-name]-consumers`

**Client libraries (if available):**

| Language | Package | Installation |
|---|---|---|
| [Python] | [`[package-name]`] | `pip install [package-name]` |
| [Go] | [`github.com/[org]/[package]`] | `go get github.com/[org]/[package]` |
| [TypeScript/JS] | [`@[org]/[package]`] | `npm install @[org]/[package]` |

---

## Quality Checks

- [ ] "What It Does" is written without jargon — a new engineer from another team can understand it in under 2 minutes
- [ ] SLO targets are specific numbers agreed with stakeholders — not aspirational or copied from a template
- [ ] All direct upstream consumers are listed in the "Who Depends on This" table — no omissions
- [ ] API error codes are accurate and tested — not aspirational documentation
- [ ] Known limitations are honest — nothing is glossed over to make the service look better than it is
- [ ] All runbook links are live — not broken references or TODO placeholders
- [ ] Data classification includes retention period and encryption status — not just sensitivity level
- [ ] The entry has been reviewed by at least one consumer team to confirm it matches their experience of the service

## Anti-Patterns

- [ ] Do not write aspirational SLO targets — targets must be agreed with stakeholders and based on historical data, not copied from a template
- [ ] Do not leave runbook links as TODO placeholders — broken or missing links make the catalog entry worse than useless during an incident
- [ ] Do not omit the "Known Limitations" section to make the service look better — undisclosed limitations cause incorrect integrations and downstream incidents
- [ ] Do not list API error codes without testing them — aspirational error documentation misleads consumers
- [ ] Do not write the "What It Does" section with jargon — a new engineer from another team must understand it in under 2 minutes
