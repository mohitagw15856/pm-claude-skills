---
name: system-design-interview
description: "Structure a complete system design answer for interview questions or real architecture sessions. Use when asked to design a system, answer a system design interview question, or architect a solution at scale. Produces a structured answer covering requirements, capacity estimates, high-level design, component deep-dives, trade-offs, and follow-up considerations. Optimised for Opus 4.7 and newer models."
---

# System Design Interview Skill

Structures a complete, interview-grade system design response — covering clarifying questions, requirements, capacity estimates, architecture, component design, and trade-offs. Works equally well for real architecture sessions.

## Required Inputs

Ask for these if not provided:
- **The system to design** (e.g. "design a URL shortener", "design a notification service", "design Twitter's feed")
- **Scope** (interview prep / real architecture decision / practice run)
- **Scale target** (rough numbers: DAU, requests/sec, data volume — or "assume typical web scale")
- **Constraints or priorities** (e.g. prioritise availability over consistency, minimise cost, low-latency reads)

## Output Structure

### 1. Clarifying Questions
Before designing, list 4–6 questions that would change the design. Examples:
- Read-heavy or write-heavy? (affects caching and DB choice)
- Global or single-region? (affects latency requirements)
- Strong or eventual consistency? (affects storage and replication)
- Acceptable latency targets? (p50 / p99)
- Any existing infrastructure constraints?

Then proceed with stated assumptions if answering an interview question.

### 2. Functional Requirements
**Core features (must have):**
- [Feature 1]
- [Feature 2]
- [Feature 3]

**Out of scope (for this design):**
- [What's deliberately excluded and why]

### 3. Non-Functional Requirements
| Requirement | Target |
|---|---|
| Availability | [e.g. 99.9% / 99.99%] |
| Latency | [e.g. p95 < 100ms for reads] |
| Throughput | [e.g. 10k writes/sec peak] |
| Consistency | [Strong / Eventual] |
| Durability | [e.g. 99.999% — no data loss] |

### 4. Capacity Estimation
**Traffic:**
- DAU: [X]
- Reads/sec: [X] (peak: [X])
- Writes/sec: [X] (peak: [X])

**Storage:**
- Per record size: [X bytes]
- Records per day: [X]
- 5-year storage: [X GB/TB]

**Bandwidth:**
- Inbound: [X MB/s]
- Outbound: [X MB/s]

### 5. High-Level Architecture

```
[Client] → [CDN/Edge] → [Load Balancer] → [API Servers] → [Cache] → [DB]
                                                         → [Message Queue] → [Workers]
```

Describe each layer in 1–2 sentences explaining its role and technology choice.

### 6. Component Deep-Dive

Pick the 2–3 most critical/interesting components and go deep:

**[Component 1: e.g. Database Layer]**
- Choice: [Technology and why — e.g. PostgreSQL for ACID guarantees, Cassandra for write throughput]
- Schema design (high-level): [Key tables/collections and their structure]
- Indexing strategy: [What gets indexed and why]
- Replication: [Primary-replica / Multi-primary — and why]

**[Component 2: e.g. Caching Strategy]**
- Cache type: [Redis / Memcached — and why]
- What gets cached: [Hot data — e.g. user sessions, frequent reads]
- Cache invalidation: [TTL / Write-through / Write-behind — trade-offs]
- Cache hit rate target: [e.g. 95%]

**[Component 3: e.g. API Design]**
- Key endpoints: [List the 3–5 most important API calls]
- Authentication: [JWT / OAuth / API keys]
- Rate limiting: [Where and at what rate]

### 7. Data Flow
Walk through the two most critical paths end-to-end:

**Write path:** [Step 1 → Step 2 → Step 3...]
**Read path:** [Step 1 → Step 2 → Step 3...]

### 8. Scaling Bottlenecks and Mitigations
| Bottleneck | Mitigation |
|---|---|
| [e.g. DB write throughput] | [e.g. sharding by user_id, write batching] |
| [e.g. Hot-key cache misses] | [e.g. local in-process cache, probabilistic early expiry] |
| [e.g. Single region latency] | [e.g. multi-region deployment, GeoDNS routing] |

### 9. Trade-offs and Alternatives
Be explicit about what was chosen and what was sacrificed:

| Decision | Why | Trade-off |
|---|---|---|
| [e.g. Eventual consistency] | [Higher availability, lower latency] | [Stale reads possible] |
| [e.g. SQL over NoSQL] | [Complex queries, ACID transactions] | [Harder to shard horizontally] |
| [e.g. Async processing via queue] | [Decoupled, more resilient] | [Eventual delivery, harder to debug] |

### 10. Follow-up Considerations
Things to tackle in production but out of scope for this design session:
- Monitoring and alerting (what metrics matter)
- Disaster recovery and backup strategy
- Security (auth, encryption at rest/transit, rate limiting)
- Cost optimisation at scale
- Gradual rollout and feature flagging

## Quality Checks
- [ ] Clarifying questions are design-changing (not generic filler)
- [ ] Capacity estimates use real numbers (not just "it scales")
- [ ] At least 2 component deep-dives with technology choices justified
- [ ] Trade-offs section is honest (not just benefits of chosen approach)
- [ ] Data flow is described end-to-end for the critical path

## Example Trigger Phrases
- "Help me answer a system design interview: [question]"
- "Design [system] for a system design interview"
- "How would I architect [system] at scale?"
- "I have a system design interview — the question is [X]"
- "Design a [URL shortener / chat system / notification service / feed]"
