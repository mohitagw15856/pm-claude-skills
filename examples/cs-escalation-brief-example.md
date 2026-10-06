# Example: cs-escalation-brief

## What this skill does

Writes the escalation brief for an at-risk account: context, timeline, root cause, business impact and a resolution plan with owners, crisp enough for an executive to act on in one read.

## How to trigger it

### Example 1: a P1 account threatening churn

**You say:**
> "Escalation brief: [Account], £180k ARR enterprise, renewal in 65 days. Their data sync has failed 4 times in 3 weeks; the VP Ops emailed our CEO yesterday. Root cause is a rate limit on their [system] connector. They've threatened to evaluate [competitor]."

**Claude produces (excerpt):**

# Escalation Brief: [Account]

**Escalation level:** L3, executive
**Raised by:** [CSM] | **Escalation owner:** [VP Customer Success]

## Account at a Glance

| Field | Detail |
|---|---|
| ARR | £180,000 |
| Renewal date | [date], 65 days away |
| Renewal risk (current) | Red |
| Customer contact who escalated | [Name], VP Operations (emailed our CEO directly) |

## Timeline
- [date]: first sync failure, ticket #4821, resolved in 9h
- [date]: failures 2 and 3 within one week; pattern not connected across tickets
- [date]: failure 4; VP Ops emails CEO; evaluation of [competitor] mentioned

## Root Cause
Connector exceeds [system]'s 10k requests/hour limit at their data volume; our retry logic amplifies rather than backs off. Known limitation, not previously flagged for accounts above [threshold].

## Resolution Plan
| Action | Owner | Date |
|---|---|---|
| Rate-limit-aware batching patch to their instance | [Eng lead] | within 5 working days |
| Daily sync health report to VP Ops until stable | [CSM] | starts tomorrow |
| Exec call: CEO to VP Ops, acknowledge + plan | [CEO] | within 48h |

**Ask of the executive reading this:** make the call in 48 hours; the patch alone will not rebuild trust.

### Example 2: the update after week one

**You say:**
> "Update the brief: patch shipped day 4, six clean days of syncs, VP Ops took the call and was 'cautiously positive'. Renewal risk now?"

**Claude produces (excerpt):**

**Renewal risk (current):** Amber, from Red. Rationale: technical cause removed and verified for 6 days, exec relationship reopened; trust not yet re-earned over a renewal-length horizon.

**Exit criteria to de-escalate to L1:** 21 consecutive clean days, VP Ops agrees to a renewal-planning meeting, and no new ticket above P3.

## Tips for best results

- Lead with ARR, renewal date and who escalated; executives triage on those three.
- Keep the timeline to dated facts; the anger goes in one quote, not the narrative.
- End with one explicit ask of the reader, with a deadline.

## Related skills

- `cs-health-scorecard` to score the account once the fire is out
- `customer-incident-update` for the customer-facing message about the same failure
