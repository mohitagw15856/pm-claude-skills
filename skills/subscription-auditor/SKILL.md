---
name: subscription-auditor
description: "Find the subscriptions you forgot you pay for — a tool-using agent audits statements and inboxes, prices the waste annually, and preps (never executes) the cancellations. Use when asked to audit my subscriptions, find recurring charges, what am I paying for, or help me cancel unused services. Produces the subscription inventory with keep/cancel/downgrade verdicts, the annual-waste number, and approval-gated cancellation prep."
---

# Subscription Auditor Skill

Every card statement hides a museum of past enthusiasms billing monthly. This skill runs the audit an accountant would: inventory every recurring charge, price the waste *annually* (monthly numbers anesthetize), verdict each one — and stop exactly at the line where money moves. Cancellation is prepared, never performed.

## What This Skill Produces

- **The inventory** — every recurring charge: service, amount, cadence, last-used evidence, renewal date
- **The annual-waste number** — the headline: what "unused + forgotten" costs per year
- **Verdicts** — keep / cancel / downgrade / share-a-seat, each with the one-line case
- **Cancellation prep** — per cancel-verdict: the how (portal path, email draft, phone script), the deadline before next billing, retention-offer guidance

## Required Inputs

Ask for these if not provided:
- **The data** — statement exports (CSV/PDF), a receipts-email folder, or app-store subscription pages the agent can read
- **Usage signals** — the user's honest read on what they still use; where available, last-login evidence
- **Household scope** — just theirs, or family plans and duplicates across the household
- **The keep-regardless list** — subscriptions that are load-bearing whatever the numbers say

## Framework

1. **Recurrence detection:** same merchant at regular intervals ± a few days; catch the annuals (the expensive ambush) by scanning 13 months back, not 3.
2. **Annualize everything:** $12.99/mo reads as harmless; $156/yr across nine services reads as a holiday. Always print both.
3. **The evidence bar for "cancel":** no usage signal + no user-claimed use + not on the keep list. One signal short → verdict is "confirm", not "cancel".
4. **Duplicates & overlaps:** two streaming services with the same catalog niche, storage plans on three clouds, the family paying twice — the overlap table is often the biggest line.
5. **Trial-trap scan:** anything that started as a trial in the last 90 days gets its renewal date bolded.

## Output Format

# Subscription Audit: [scope] — [date]
**The number: $[n]/year in cancel-verdict subscriptions.**
| Service | $/mo | $/yr | Last used | Renewal | Verdict | Case |
|---|---|---|---|---|---|---|
**Overlaps found:** … · **Trial traps:** …
**Cancellation prep** (per cancel): the path · the deadline · the draft.

## Quality Checks
- [ ] 13 months scanned — annuals caught
- [ ] Every verdict cites its evidence; "confirm" used where evidence is one signal short
- [ ] Both monthly and annual figures printed for every line
- [ ] Cancellation prep includes the before-next-billing deadline per service
- [ ] Money-moving actions: prepared only, per the Execution gate

## Anti-Patterns
- [ ] Do not cancel-verdict on price alone — an expensive daily tool is the best line on the statement
- [ ] Do not miss the family dimension — half of subscription waste is duplication between people
- [ ] Do not present retention offers as wins by default — a 40% discount on an unused service is 60% waste
- [ ] Do not touch anything financial without the gate below — this skill's authority ends at preparation

## Execution

For tool-using agents with statement/inbox read access and (optionally) browser control. Without tools, run on user-pasted statements. Rules per [SKILLSPEC.md §5](../../SKILLSPEC.md).

### Preconditions
- The inventory + verdicts reviewed and **explicitly approved by a human**, service by service.
- Read access (statements/inbox) was granted by the user for this audit's scope only.
- For any portal navigation: the user established the login; the agent never handles credentials.

### Allowed actions
- Read the named statement exports / receipt folders to build the inventory.
- Navigate cancellation portals **up to but never through** the final confirm; screenshot the confirm screen for the user.
- Draft (never send) cancellation emails; prepare phone scripts.
- Nothing else: **no completing cancellations, no accepting retention offers, no payment-method changes, no purchases, no credential entry.**

### Verification
- Per prepared cancellation: the confirm-screen screenshot + the renewal deadline it must beat.
- The final ledger: verdicts, deadlines, and what remains for the user's hand.

### Rollback
- Preparation has nothing to roll back — that's the point of the gate.
- Stop and ask a human if: a portal demands identity verification, a retention offer changes the economics, or any page requests payment or credentials.
