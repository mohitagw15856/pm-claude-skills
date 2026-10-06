# Example: incident-postmortem

## What this skill does

Writes a blameless postmortem: executive summary, impact, timeline, root cause with contributing factors, and action items with owners, in the standard format reviewers expect.

## How to trigger it

### Example 1: a P1 outage writeup

**You say:**
> "Postmortem: API down 47 minutes yesterday 14:02 to 14:49 UTC. Cause: a config deploy set the connection pool to 5 instead of 500, DB connections exhausted. Caught by alerts at 14:09, rolled back 14:41. ~12,000 requests failed, 3 enterprise customers raised tickets."

**Claude produces (excerpt):**

# Incident Postmortem: API outage from connection pool misconfiguration

**Severity:** P1
**Duration:** 14:02 → 14:49 UTC (47 minutes)
**Status:** Resolved

## Executive Summary

A configuration change deployed at 14:02 set the database connection pool to 5 connections instead of 500. The API exhausted available connections within minutes and returned errors for most requests until the change was rolled back at 14:41. Around 12,000 requests failed; three enterprise customers reported the issue. No data was lost or corrupted.

## Timeline
- 14:02 config deploy lands (pool: 500 → 5, a missing zero in review)
- 14:09 error-rate alert fires; on-call acknowledges
- 14:22 cause narrowed to DB connections; rollback prepared
- 14:41 rollback complete; error rate recovering
- 14:49 error rate at baseline; incident closed

## Root Cause
A hand-edited config value passed review because the diff showed the number without context of its previous value. Contributing factors: no validation range on pool size; staging runs a pool of 10, so the error did not reproduce there.

## Action Items
| Action | Owner | Priority | Due |
|---|---|---|---|
| Schema validation: pool size minimum 50 in production profiles | [owner] | P1 | [date] |
| Config diffs show old → new values in review | [owner] | P2 | [date] |

### Example 2: a near-miss review

**You say:**
> "Same format, but nothing went down: we caught a bad migration in staging that would have dropped an index used by checkout. Write it as a near-miss postmortem."

**Claude produces (excerpt):**

**Severity:** Near miss (would-have-been P1)

## Executive Summary
A database migration scheduled for [date] would have removed an index that supports checkout queries. Staging load tests surfaced 30x query degradation before production rollout; the migration was amended. Customer impact: none.

## Why it was caught (keep doing)
Staging load test runs checkout at production-shaped volume; this is the control that worked.

## Why it nearly happened
The index appeared unused in the ORM layer; raw SQL in the checkout service was not in the search.

## Tips for best results

- Give times in one timezone and the skill keeps the timeline honest and ordered.
- Name systems and controls, not people; the format is blameless by design.
- Include what went well; postmortems that only list failures teach half the lesson.

## Related skills

- `customer-outage-notice` for the external message while the incident is live
- `runbook-writer` to turn the fix into the runbook the next on-call needs
