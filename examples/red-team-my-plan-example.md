# Example: red-team-my-plan

## What this skill does

Attacks your plan the way a smart adversary would: ranked weakest points, the single killer move that breaks it fastest, the assumption you're quietly hoping holds, single points of failure, and prioritised fixes.

## How to trigger it

### Example 1: red-teaming a product launch plan

**You say:**
> "Red-team this: we launch the new pricing on 1 Nov. Plan: email existing customers 2 weeks ahead, grandfather them for 6 months, new pricing live for new signups same day, support gets an FAQ, we expect <2% churn impact."

**Claude produces (excerpt):**

### Red-teaming: 1 Nov pricing launch

**Weakest points (ranked):**
1. The <2% churn estimate has no source; it appears to be hope with a decimal point.
2. The 2-week email lands during half-term week in your biggest market; open rates drop, and "we told you" will be technically true and practically false.
3. Support gets an FAQ but no decision authority; the first angry enterprise customer escalates past the FAQ in minutes.

**The killer move:** a mid-size customer screenshots the old-vs-new pricing table and posts it in the community Slack where your prospects also sit. Your pricing change becomes a third-party story before your email is opened. Nothing in the plan owns the public narrative on day one.

**You're hoping this holds:** that grandfathering buys goodwill. It buys silence for six months, then delivers the same churn decision at month 6, except now clustered in one cohort in one week. The plan has no month-5 re-engagement step, which means the real churn event is scheduled and unstaffed.

**Single points of failure:** the billing migration script runs once, the night before, with no dry run on a copy of production. One malformed legacy plan and launch morning is refunds, not announcements.

**Fixes (prioritized):**
1. Dry-run the billing migration on a production snapshot this week.
2. Write the public post before launch; publish it the same hour as the email so the narrative starts as yours.
3. Give support three pre-approved concessions (extend grandfathering, annual-rate lock, downgrade path) with no escalation needed.
4. Diary a month-5 win-back sequence for the grandfathered cohort now.

### Example 2: red-teaming a negotiation position

**You say:**
> "Attack my plan for the renewal negotiation: we ask for 15% uplift, cite usage growth, fallback is 8%, walk-away is flat."

**Claude produces (excerpt):**

**The killer move:** they ask "what does usage growth cost you?" and the honest answer is "almost nothing" (software margins). Your entire 15% case rests on a number that argues *their* side under one question. 

**You're hoping this holds:** that they haven't benchmarked. Their procurement joined from [larger vendor] last quarter; assume the opposite.

**Fixes (prioritized):** rebuild the ask on value delivered (their outcomes), not your costs; bring the two features shipped for them this year as the uplift's justification.

## Tips for best results

- Paste the actual plan, dates and numbers; a red team of a summary only finds the summary's holes.
- Say who the real adversary is (competitor, procurement, reality); the killer move depends on it.
- Act on the fixes before the date, then red-team once more; plans patched under attack grow new seams.

## Related skills

- `assumption-mapper` to inventory what the plan believes before attacking it
- `ship-or-slip` when the stress-tested plan still needs a go/no-go call
