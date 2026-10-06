# Example: architecture-decision-record

## What this skill does

Captures a technical decision as a structured ADR: the context and constraints, the options considered with trade-offs, the decision, and its consequences, written for the engineer who joins in 18 months.

## How to trigger it

### Example 1: recording a database choice

**You say:**
> "Write an ADR: we chose Postgres over DynamoDB for the orders service. Constraints: team knows SQL, we need multi-row transactions, we're on AWS, traffic is about 200 writes/second peak."

**Claude produces (excerpt):**

# ADR-014: Postgres for the orders service

**Date:** [date]
**Status:** Accepted
**Deciders:** [platform team lead, CTO]

## Context

The orders service needs a primary datastore before the Q2 build starts. Orders span 3 to 5 rows across tables and must commit atomically. Peak load is modest (~200 writes/second). The team of six has deep SQL experience and no production DynamoDB experience.

**Key constraints:**
- Multi-row transactional writes are non-negotiable
- Must run on AWS with managed operations
- No budget for a data-layer rewrite this year

## Options Considered

### Option 1: Amazon RDS Postgres
**Pros:** native transactions; team fluency; mature tooling
**Cons:** vertical scaling ceiling; failover measured in seconds, not milliseconds

### Option 2: DynamoDB
**Pros:** effectively unlimited scale; no instance management
**Cons:** transactions limited to 100 items; team would be learning on a critical path

## Decision

RDS Postgres (db.r6g.xlarge, Multi-AZ). At 200 writes/second we are an order of magnitude below where Postgres becomes the constraint.

### Example 2: an ADR for a decision made under pressure

**You say:**
> "We hard-coded the EU region for the pilot customer to hit their go-live. Write the ADR so it's honest that this is temporary."

**Claude produces (excerpt):**

# ADR-021: Hard-coded EU region for pilot go-live

**Status:** Accepted (time-boxed; revisit by [date])

## Consequences

- Positive: pilot ships on time; no multi-region machinery built on guesswork
- Negative: a second region requires code change, not configuration; flagged as tech debt item TD-88
- Trigger to revisit: any signed customer outside the EU, or [date], whichever is first

## Tips for best results

- State the real constraints (team skills, deadlines, budget); they justify the decision later.
- Name the options you rejected and why; the rejected pros are what future readers ask about.
- Give every "temporary" decision a revisit trigger, not just a hope.

## Related skills

- `technical-spec-template` for designing the system the ADR decides about
- `technical-debt-register` when the consequence of a decision is debt to track
