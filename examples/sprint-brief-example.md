# Example: sprint-brief

## What this skill does

Generates a scannable sprint brief from your sprint data: goal, why it matters, grouped work with owners, critical path, risks, carry-over and definition of done.

## How to trigger it

### Example 1: a brief the team will actually read

**You say:**
> "Sprint brief for Sprint 14, 6 to 17 Oct. Goal: ship self-serve billing. Tickets: BILL-201 checkout flow (Priya), BILL-204 invoice emails (Tomas), BILL-207 VAT handling (Priya), PLAT-88 payment webhook retries (Dev), plus two carry-overs from Sprint 13. Quarterly OKR is reducing sales-assisted conversions."

**Claude produces (excerpt):**

### Sprint 14 Brief: 6 to 17 October
**Sprint Goal:** A new customer can buy a paid plan end-to-end without talking to sales, including a correct VAT invoice in their inbox.
**Why This Sprint Matters:** Q4's OKR moves self-serve from 31% to 50% of new conversions. Billing is the last blocked step; everything after this sprint is optimisation, not capability.

**What We're Building:**
- Checkout: BILL-201 checkout flow, BILL-207 VAT handling (Priya)
- Billing comms: BILL-204 invoice emails (Tomas)
- Reliability: PLAT-88 webhook retries (Dev)

**Critical Path:** BILL-201 → BILL-207 → BILL-204. Invoice emails cannot be tested until VAT amounts are final.

**Risks to Flag:**
- VAT rules for [EU country list] unconfirmed with finance → confirm by day 3 or descope to UK-only
- Priya owns both critical-path tickets → Tomas pairs on BILL-207 from day 5 if BILL-201 slips

**Carry-over from Last Sprint:** BILL-198 pricing page copy (1 day left); no impact on the goal.

**Definition of Done:** A test customer completes purchase, receives a VAT-correct invoice, and the payment survives a simulated webhook failure.

### Example 2: a brief from messy standup notes

**You say:**
> "Turn this Slack thread of planning notes into a sprint brief [pasted thread: half-decided scope, two tickets with no owner]."

**Claude produces (excerpt):**

**What We're Building:**
- Search: SRCH-45 typo tolerance (Lena), SRCH-48 filters (unassigned, flagged below)

**Risks to Flag:**
- SRCH-48 and SRCH-52 have no owner; the thread assigns neither. Unowned critical-path work is the top slip risk; assign at standup Monday or cut them.
- The thread never states a sprint goal; drafted one from the ticket cluster: confirm or correct it before sharing.

## Tips for best results

- Give the quarterly goal; the "why this sprint matters" line is built from it.
- Name owners per ticket; the brief flags unowned work rather than hiding it.
- Say what carried over; a brief that pretends the sprint starts clean misleads everyone.

## Related skills

- `sprint-planning` for the full planning session with capacity and estimates before the brief
- `stakeholder-update` for the outward-facing progress version once the sprint is running
