# Example: stakeholder-update

## What this skill does

Writes an executive stakeholder update using BLUF (Bottom Line Up Front): the conclusion first, then status, key metrics, risks, upcoming milestones and decisions needed, readable in under two minutes.

## How to trigger it

### Example 1: a monthly update that leads with the point

**You say:**
> "Stakeholder update for the data platform migration, month 3 of 5. We're on track overall but the reporting module slipped 2 weeks because the vendor API changed. 14 of 22 pipelines migrated, costs tracking 8% under budget. Need a decision on whether to migrate the legacy finance pipeline or retire it."

**Claude produces (excerpt):**

**Subject: Data platform migration: on track, one decision needed by 17 Oct**

**Bottom line:** The migration remains on track for the January cutover. The reporting module has slipped two weeks (vendor API change, now resolved); the slack in the plan absorbs it. One decision is needed from this group by 17 October.

**Status: 🟢 On track**
- 14 of 22 pipelines migrated (plan: 13 by this point)
- Spend tracking 8% under budget
- Reporting module: re-baselined to [date], absorbed within the existing buffer

**Risks:**
- 🟠 Vendor API stability: one unannounced breaking change already; mitigation is a pinned API version and a weekly vendor check-in
- 🟢 Cutover window: unchanged

**Decision needed by 17 Oct:** the legacy finance pipeline. Migrating costs ~3 engineer-weeks; its only consumer is a report opened 4 times last quarter. Recommendation: retire it and archive the data. Migrating later if needed costs the same 3 weeks.

**Next milestone:** remaining 8 pipelines by [date]; dry-run cutover the week after.

### Example 2: delivering bad news without burying it

**You say:**
> "Same project, next month. The dry run failed, cutover will slip from January to February. Write the update; leadership hates surprises more than slips."

**Claude produces (excerpt):**

**Bottom line:** The January cutover will slip to February. The dry run surfaced a data-integrity issue in 3 of the migrated pipelines; fixing it properly costs four weeks. We are telling you now, with the fix underway, rather than discovering it at cutover.

**What happened:** reconciliation checks showed row-count mismatches in the three oldest pipelines, traced to a timezone handling difference. The issue was invisible until full-volume dry run; no production data is affected.

**What it costs:** cutover moves to [February date]. Budget impact is [£X] of extended parallel running. No scope is cut.

**What we'd like from you:** nothing this cycle; the decision rights stay with the team. The February date has one dry run of buffer left, and we will flag within a week if it is at risk.

## Tips for best results

- Give the real status including the bad parts; BLUF only works when the bottom line is honest.
- Say which decisions you need and by when; updates without asks train people to skim.
- Name the audience; a board update and a working-group update carry different detail.

## Related skills

- `executive-summary` for condensing a long document rather than reporting ongoing work
- `sprint-brief` for the team-facing version of what is being built right now
