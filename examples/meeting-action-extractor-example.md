# Example: meeting-action-extractor

## What this skill does

Pulls the commitments out of meeting notes or a transcript: ticket-ready actions with owner, due date and context, decisions recorded separately from discussion, open questions, and a flag for every "someone should" that never got assigned.

## How to trigger it

### Example 1: a transcript into tickets

**You say:**
> "Extract the actions from this standup-plus-planning transcript [pasted: 40 minutes, 6 speakers, rambling]."

**Claude produces (excerpt):**

### Actions: product planning · [date]

| # | Action | Owner | Due | Context |
|---|---|---|---|---|
| 1 | Send revised API spec to mobile team | Priya | Fri | mobile can't estimate the sync feature without it |
| 2 | Book user calls for checkout research | Tomas | Wed | 5 calls needed before the design review on the 18th |
| 3 | Fix the staging data pipeline | Dev | [TBD] | blocking QA; Dev said "this week" but no day was stated |
| 4 | Draft the pricing-page copy test | Lena | next sprint | decided below; Lena volunteered at 31:40 |

### Decisions
- Pricing test ships as a 50/50 split, not the three-way Lena proposed (agreed after Marco's sample-size point)
- The sync feature slips to next sprint; mobile estimate (action 1) will confirm or revisit

### Open questions (no owner yet)
- Whether churned-user interviews are in scope for Tomas's research round; needs: Tomas and [head of product] to settle before Wednesday's booking

### ⚠ Orphans: raised, never assigned
- "Someone should tell support before the pricing test goes live" (raised twice, 12:05 and 38:30, taken by no one): assign to whom, or drop?
- "We should really document the pipeline": third meeting running per the transcript; either it becomes action 3's second line or it should be dropped honestly

### Example 2: the meeting where little was agreed

**You say:**
> "Pull the to-dos from these notes [pasted: an hour of architecture debate]."

**Claude produces (excerpt):**

### Actions: architecture discussion · [date]
| # | Action | Owner | Due | Context |
|---|---|---|---|---|
| 1 | Write up the two options as a one-page ADR | Sam | Mon | the only concrete commitment in the hour |

### Decisions
- None. The queue-vs-webhooks question was discussed at length but explicitly deferred to the ADR; recording it as decided would misstate the meeting.

### ⚠ Orphans
- "We need to benchmark both approaches": mentioned four times by three people, owned by zero. This is the meeting's real output risk: everyone left believing someone else is benchmarking.

## Tips for best results

- Paste the raw transcript or notes, not your summary; owners and hedges live in the exact wording.
- Expect [TBD] where no date was said; an invented deadline is worse than a flagged gap.
- Act on the orphans section first; it is the list of things everyone assumes are happening.

## Related skills

- `meeting-notes` for the full minutes rather than just the commitments
- `sprint-planning` when the extracted actions need estimating and scheduling
