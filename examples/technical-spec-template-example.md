# Example: technical-spec-template

## What this skill does

Produces a complete technical specification bridging product requirements and engineering: problem statement, goals and non-goals, proposed solution with data model and API design, alternatives considered, security, testing plan and rollout strategy.

## How to trigger it

### Example 1: a spec from a feature brief

**You say:**
> "Tech spec for rate limiting on our public API. We're on Node behind an ALB, Redis available. Product wants per-key limits with different tiers (free: 60/min, pro: 600/min). Must not add more than 5ms latency."

**Claude produces (excerpt):**

### Technical Specification: Public API Rate Limiting

**Status:** Draft | **Reviewers:** [Eng Lead, Platform, Security]

#### 1. Problem Statement
> Free-tier keys currently generate 70% of API traffic with no cap, and two incidents last quarter traced to a single key retrying in a loop. We have no mechanism to protect paying customers from noisy neighbours.

#### 2. Goals & Non-Goals
**Goals:** per-key limits by tier (free 60/min, pro 600/min); 429 with Retry-After; added P95 latency under 5ms.
**Non-Goals:** per-endpoint limits, spike arrest, billing by usage (separate spec).

#### 4. Proposed Solution
**High-Level Approach:** sliding-window counter in Redis, checked in API middleware before auth-heavy work. Chosen over token bucket for simpler multi-node correctness at our scale.

**API Design:**
```
Any endpoint, on limit breach:
Response: 429 { "error": "rate_limited", "retry_after_seconds": 12 }
Headers: X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After
```

#### 5. Alternative Approaches Considered
| Option | Pros | Cons | Why Rejected |
|---|---|---|---|
| ALB/WAF rate rules | no code | per-IP not per-key; tiers impossible | cannot meet tier requirement |
| In-memory counters | fastest | wrong across nodes | multi-node counts drift |

#### 7. Performance & Scalability
- Expected load: 3,000 req/s peak; one Redis round-trip per request, pipelined with the key lookup
- Known bottleneck: Redis failover; fail-open with alert rather than blocking all traffic

### Example 2: tightening an existing draft

**You say:**
> "Review this half-written spec [pasted]; it jumps straight to the solution and security is one line."

**Claude produces (excerpt):**

**Gaps against the template:**
1. **Problem statement contains solution language** ("we need Redis-based limiting"); rewritten to state the incident history and the unprotected-tenant problem only.
2. **Non-goals absent**; added three, including the per-endpoint limits a reviewer will otherwise assume are included.
3. **Security section** expanded from "keys are secret" to: data stored (key hashes only), what a leaked limit header reveals, and the enumeration risk of per-key 429 timing.

## Tips for best results

- Give real constraints (latency budget, stack, scale); the alternatives table is only honest when the constraints are.
- State what is out of scope; non-goals prevent the longest review threads.
- Include the related PRD or incident links; the background section should cite, not re-argue.

## Related skills

- `architecture-decision-record` for recording the single contested decision rather than the whole design
- `prd-template` for the product-side document this spec implements

