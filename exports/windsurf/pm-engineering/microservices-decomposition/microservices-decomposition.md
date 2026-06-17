---
trigger: model_decision
description: "Design a microservices decomposition for a monolith or new system, defining service boundaries, ownership, communication patterns, and migration plan. Use when asked to decompose a monolith, define service boundaries, design a microservices architecture, or plan a strangler-fig migration. Produces a bounded context map, service inventory table, communication pattern decisions, data ownership matrix, migration roadmap, and risk register."
---

# Microservices Decomposition

Produce a complete microservices decomposition design for a system — whether decomposing an existing monolith or designing service boundaries for a new system. Ground the decomposition in Domain-Driven Design (DDD) concepts: identify bounded contexts first, then derive service boundaries from them. Include communication pattern decisions (sync vs. async, event vs. RPC), data ownership rules, and a pragmatic migration plan if decomposing a monolith. Conway's Law is real — include an organizational alignment section. The deliverable should be specific enough that a team can begin implementation, not an abstract architectural diagram.

## Required Inputs

Ask for these if not already provided:
- **System or domain description** — what the system does, its core domain, and the key business processes it supports
- **Current architecture** — monolith (describe the tech stack and rough module structure), partial services (list existing services), or greenfield
- **Team structure** — number of teams, team names if known, and approximate team sizes; this drives service ownership
- **Performance and scalability requirements** — any specific SLAs, load characteristics, or scaling constraints per domain area
- **Migration constraints** — what cannot be rewritten all at once, hard deadlines, zero-downtime requirements, budget constraints
- **Integration points** — external systems, third-party APIs, or legacy systems that cannot be changed

If decomposing a monolith, also ask for: approximate codebase size, what is most painful to change today, and where the team experiences the most coupling-related friction.

## Output Format

---

# Microservices Decomposition: [System Name]

**Author:** [Name / Team]
**Date:** [Date]
**Architecture type:** [Monolith decomposition / New system design]
**Current state:** [One sentence describing what exists today]
**Target state:** [One sentence describing the desired end state]

---

## 1. Domain Analysis

### Core Domain

[One paragraph: what is the core domain of this system? What does the business fundamentally do? What gives it competitive differentiation? The core domain gets the most investment and the cleanest service boundaries.]

### Domain Map

List every significant subdomain before assigning service boundaries. Classify each subdomain:

| Subdomain | Type | Description | Current Location in Monolith |
|-----------|------|-------------|------------------------------|
| [Subdomain, e.g., Order Management] | Core | [What it does and why it matters] | [Module/package name or "new"] |
| [Subdomain, e.g., Inventory] | Core | [Description] | [Location] |
| [Subdomain, e.g., Notifications] | Supporting | [Description] | [Location] |
| [Subdomain, e.g., Billing] | Supporting | [Description] | [Location] |
| [Subdomain, e.g., Reporting] | Generic | [Description — candidates for off-the-shelf solutions] | [Location] |
| [Subdomain, e.g., User Auth] | Generic | [Description] | [Location] |

**Subdomain types:** Core = competitive differentiation, build with care; Supporting = necessary but not differentiating, build pragmatically; Generic = commodity, buy or use open source.

---

## 2. Bounded Context Map (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│                        [System Name]                            │
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐                  │
│  │  [Context A]     │    │  [Context B]      │                  │
│  │                  │─ ─►│                  │                  │
│  │  [key concepts]  │    │  [key concepts]  │                  │
│  └──────────────────┘    └──────────────────┘                  │
│           │                       │                             │
│           │ event                 │ sync                        │
│           ▼                       ▼                             │
│  ┌──────────────────┐    ┌──────────────────┐                  │
│  │  [Context C]     │    │  [Context D]      │                  │
│  │                  │    │                  │                  │
│  │  [key concepts]  │    │  [key concepts]  │                  │
│  └──────────────────┘    └──────────────────┘                  │
│                                   │                             │
│                          ┌────────┘                             │
│                          ▼                                      │
│                 ┌──────────────────┐                            │
│                 │  [Context E]     │                            │
│                 │  [key concepts]  │                            │
│                 └──────────────────┘                            │
│                                                                 │
│  External: [Third-party system] ──► [Context that owns it]      │
└─────────────────────────────────────────────────────────────────┘

Legend:  ──► sync call   - -► async event   ═══ shared kernel
```

Render this map using the actual bounded contexts derived from the domain analysis. Place contexts that communicate frequently closer together. Label relationship types on arrows.

### Context Relationships

| Upstream Context | Downstream Context | Relationship Type | Integration Pattern |
|-----------------|-------------------|------------------|---------------------|
| [Context A] | [Context B] | Customer-Supplier | REST API call |
| [Context B] | [Context C] | Published Language | Domain events via message bus |
| [Context X] | [Context Y] | Conformist | [Downstream conforms to upstream's model] |
| [Context X] | [Context Y] | Anti-Corruption Layer | [ACL translates upstream model to local model] |

---

## 3. Proposed Service Inventory

| Service Name | Bounded Context | Core Responsibility | Team Owner | Tech Stack | Priority |
|-------------|----------------|--------------------|-----------|-----------|---------| 
| [service-name] | [Context] | [One sentence: what this service owns and does] | [Team] | [Language/framework] | [P1/P2/P3] |
| [service-name] | [Context] | [Responsibility] | [Team] | [Stack] | [Priority] |
| [service-name] | [Context] | [Responsibility] | [Team] | [Stack] | [Priority] |
| [service-name] | [Context] | [Responsibility] | [Team] | [Stack] | [Priority] |
| [service-name] | [Context] | [Responsibility] | [Team] | [Stack] | [Priority] |

**Service count:** [N proposed services] for [M bounded contexts]. [Note if any context maps to multiple services and why — e.g., "the Orders context splits into order-intake and order-fulfillment because they have different scalability requirements."]

### Service Responsibility Rules (applied to every service above)

- Single bounded context ownership — a service does not straddle two bounded contexts
- Owns its own data — no direct database access by other services
- Independently deployable — no coordinated deploys required with other services
- Has a named team owner — no shared ownership of a single service across teams
- Exposes a defined API contract — not internal implementation

---

## 4. Inter-Service Communication Patterns

### Pattern Decision Matrix

| Communication Need | Recommended Pattern | Rationale |
|-------------------|--------------------|-----------| 
| Query another service's current state | Synchronous REST / gRPC | Low latency required; caller needs immediate response |
| Notify other services of a state change | Async domain event | Decouples services; multiple consumers; sender doesn't care when it's processed |
| Long-running workflow spanning services | Async saga (choreography or orchestration) | No single service owns the full workflow; rollback needed if steps fail |
| Read-heavy cross-service aggregation | CQRS read model / materialized view | Avoid chatty sync calls at read time; build purpose-fit read models |
| Real-time push to clients | WebSocket gateway service | Centralizes connection management; services emit events, gateway pushes |

### Per-Service Communication Decisions

| Service | Calls (sync) | Publishes (events) | Subscribes to (events) |
|---------|-------------|-------------------|----------------------|
| [service-name] | [service-name (endpoint)] | [EventName] | [EventName] |
| [service-name] | — | [EventName], [EventName] | [EventName] |
| [service-name] | [service-name (endpoint)] | — | [EventName] |

### Event Catalog

| Event Name | Producer | Consumers | Payload (key fields) | Trigger |
|-----------|---------|---------|---------------------|---------|
| [OrderPlaced] | [order-service] | [inventory-service, notification-service] | `orderId, customerId, lineItems, totalAmount` | Customer submits order |
| [InventoryReserved] | [inventory-service] | [order-service] | `orderId, reservationId, items` | Inventory successfully reserved |
| [PaymentProcessed] | [payment-service] | [order-service, notification-service] | `orderId, paymentId, amount, status` | Payment confirmed |

---

## 5. Data Ownership Matrix

Each piece of data has exactly one owning service. Other services may cache or project a read model, but they do not write to the owner's database.

| Data Entity | Owner Service | Authoritative Store | Consumers | Access Pattern |
|-------------|--------------|--------------------|-----------| ---------------|
| [Order] | [order-service] | [PostgreSQL] | [fulfillment-service, reporting-service] | Event subscription + read API |
| [Customer] | [customer-service] | [PostgreSQL] | [order-service, notification-service] | Sync API call |
| [Product Catalog] | [catalog-service] | [PostgreSQL] | [order-service, inventory-service] | Sync API + cached local copy |
| [Inventory Level] | [inventory-service] | [Redis + PostgreSQL] | [catalog-service (read only)] | Event subscription |
| [Payment Record] | [payment-service] | [PostgreSQL] | [order-service] | Event subscription |

### Data Migration (if decomposing a monolith)

| Data Entity | Current Location | Target Service | Migration Approach | Data Volume | Risk |
|-------------|-----------------|---------------|-------------------|-------------|------|
| [Entity] | [monolith.orders table] | [order-service] | Dual-write then cut over | [X rows] | [High/Med/Low] |
| [Entity] | [monolith.users table] | [customer-service] | Extract and sync via CDC | [X rows] | [High/Med/Low] |

---

## 6. API Contract Definitions

Define the surface area for each service. Full OpenAPI specs are written separately; this section establishes the contract boundaries.

### [service-name] API

**Base path:** `/api/v1/[resource]`
**Owner team:** [Team]
**SLA:** [p99 latency target, availability target]

| Endpoint | Method | Description | Auth Required | Rate Limit |
|----------|--------|-------------|--------------|------------|
| `/[resources]` | GET | List [resources] with pagination | Yes | [X req/min] |
| `/[resources]/{id}` | GET | Get single [resource] by ID | Yes | [X req/min] |
| `/[resources]` | POST | Create new [resource] | Yes | [X req/min] |
| `/[resources]/{id}` | PUT | Update [resource] | Yes | [X req/min] |
| `/[resources]/{id}` | DELETE | Soft-delete [resource] | Yes — elevated | [X req/min] |

[Repeat for each service.]

---

## 7. Strangler Fig Migration Plan (for monolith decomposition)

Use the strangler fig pattern: extract services incrementally, route traffic through a facade, and retire monolith modules one at a time.

### Migration Phases

```
Phase 1: Foundation (Weeks 1–[N])
  - Deploy service infrastructure (CI/CD, observability, service mesh)
  - Extract lowest-risk, highest-value service first
  - Monolith continues to serve all traffic

Phase 2: First Extractions (Weeks [N]–[M])
  - Extract P1 services
  - API gateway routes selected traffic to new services
  - Monolith handles remaining traffic via facade pattern
  - Both paths write to shared DB during transition (dual-write)

Phase 3: Core Domain Services (Weeks [M]–[P])
  - Extract P1 core domain services
  - Data migration for extracted services
  - Remove dual-write paths for completed migrations

Phase 4: Monolith Retirement (Weeks [P]–[Q])
  - Extract remaining services
  - Monolith serves no production traffic
  - Decommission monolith infrastructure
```

### Phase-by-Phase Roadmap

| Phase | Service to Extract | Migration Approach | Team | Duration | Dependencies | Success Criteria |
|-------|------------------|--------------------|------|----------|-------------|-----------------|
| 1 | [service-name] | [Strangler facade / Branch by abstraction / Event interception] | [Team] | [X weeks] | [Infra ready, CI/CD pipeline] | [Traffic fully on new service, zero errors for 2 weeks] |
| 2 | [service-name] | [Approach] | [Team] | [X weeks] | [Phase 1 complete] | [Success metric] |
| 3 | [service-name] | [Approach] | [Team] | [X weeks] | [Phase 2 complete] | [Success metric] |

### Rollback Plan

For each migration phase, define the rollback trigger and mechanism:
- **Rollback trigger:** Error rate on new service > [X%] sustained for [Y minutes], or p99 latency > [threshold]
- **Rollback mechanism:** API gateway feature flag reverts all traffic to monolith path in < 5 minutes
- **Data rollback:** Dual-write maintained for [X weeks] after cutover to allow replay if needed

---

## 8. Organizational Alignment (Conway's Law)

Conway's Law: the architecture of a system mirrors the communication structure of the organization that builds it. Design service ownership to match team boundaries — or change the team boundaries.

| Service | Proposed Owner Team | Current Team Assignment | Change Required |
|---------|--------------------|-----------------------|-----------------|
| [service-name] | [Team A] | [Same / Different] | [No change / Transfer to Team A / New team needed] |
| [service-name] | [Team B] | [Team A currently] | [Transfer ownership] |

**Misalignments identified:**
- [Misalignment 1: e.g., "The notification service spans two teams today. Assign it entirely to Team B which already owns the messaging domain."]
- [Misalignment 2: e.g., "The reporting service is owned by Data Eng but consumers are Product teams — establish a clear API contract and SLA."]

**Team topology recommendation:** [Describe the recommended team structure — stream-aligned teams, platform team, enabling team — and how it maps to the proposed services.]

---

## 9. Risk Register

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|-----------|--------|-----------|-------|
| Data consistency across services during migration | High | High | Dual-write with reconciliation job; event sourcing for critical domains | [Name] |
| Distributed transaction complexity (sagas) | Medium | High | Start with choreography; add orchestration only when choreography becomes unmanageable | [Name] |
| Service mesh operational overhead | Medium | Medium | Start without a mesh; add after 5+ services deployed | [Name] |
| Network latency replacing in-process calls | Medium | Medium | Cache aggressively; design read models to avoid chatty sync calls | [Name] |
| Conway's Law friction during transition | High | Medium | Align team structure before starting extraction, not after | [Name] |
| Over-decomposition (nanoservices) | Medium | High | Enforce minimum service size rule: a service must justify its own team/deployment overhead | [Name] |
| Observability gaps during migration | High | High | Deploy distributed tracing before first extraction; establish correlation IDs | [Name] |
| [Context-specific risk] | [Level] | [Level] | [Mitigation] | [Owner] |

---

*Questions about this design: [Slack channel or contact]*

---

## Quality Checks

- [ ] Bounded context map is an ASCII diagram with labeled relationships — not a prose description of the contexts
- [ ] Every service in the inventory table has a named team owner and a clear single-sentence responsibility statement
- [ ] Data ownership matrix assigns every key entity to exactly one owning service — no shared ownership
- [ ] Communication pattern decisions explain WHY sync vs. async was chosen for each interaction type
- [ ] If decomposing a monolith, the strangler fig migration plan has phases with durations, dependencies, and success criteria
- [ ] Risk register addresses at minimum: data consistency, distributed transactions, and Conway's Law alignment
- [ ] Organizational alignment section maps services to teams and identifies misalignments that need to be resolved

## Anti-Patterns

- [ ] Do not define service boundaries before completing the domain analysis — services derived without bounded context mapping will split the wrong things and couple the wrong things
- [ ] Do not assign multiple teams as co-owners of a single service — shared ownership is no ownership; every service needs exactly one team accountable for it
- [ ] Do not default to synchronous REST calls for all inter-service communication — using sync calls where async events would decouple services creates cascading failure modes
- [ ] Do not propose more than one service per bounded context without a clear justification — over-decomposition (nanoservices) creates operational overhead that exceeds the decomposition benefit
- [ ] Do not begin migration without deploying distributed tracing first — migrating without observability means flying blind when the first extraction causes a production incident
