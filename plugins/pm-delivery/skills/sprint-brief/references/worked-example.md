# Worked Example — Sprint Brief

A gold-standard run of this skill: a 21-ticket planning board for a claims-platform team turned into a three-minute brief that names the critical path, cuts scope honestly, and gives every risk an owner.

## The brief

Bracken Mutual — a fictional small-business insurance carrier — is rebuilding its claims platform, **ClaimsDesk**, so adjusters stop swivel-chairing into the 2009 legacy system. Sprint 14 (July 6–17) has 5 engineers and 1 designer, roughly 50 points of capacity. The planning board holds 21 tickets, including 3 carry-overs from Sprint 13 (the payout-approval chain slipped when the payment vendor's sandbox went down for four days). The quarterly OKR: cut median simple-property-claim settle time from 11 days to 6. The PM's draft goal — "make progress on claims settlement" — is too vague to score, and the raw board is about 15 points overloaded once carry-over is counted.

## The output

```
### Sprint 14 Brief — July 6–17

**Sprint Goal:** An adjuster can settle a simple property claim (< $25k, no fraud
flag) end-to-end in ClaimsDesk — intake through payout approval — without opening
the legacy system. Scored pass/fail by settling 5 real pilot claims before July 17.

**Why This Sprint Matters:** The Q3 OKR is median settle time down from 11 days to
6. Today the single biggest delay is the legacy hand-off: adjusters re-key claim
data twice and wait a day for payout batch runs. This sprint closes the last gap in
the end-to-end path (payout approval), which is the prerequisite for every settle-
time gain the rest of the quarter is planned around.

**What We're Building:**
- **Payout approval chain (carry-over + completion):** CD-411 vendor payment
  integration (Priya), CD-412 two-step approval flow (Marcus), CD-419 payout audit
  log (Priya)
- **Settlement letters:** CD-430 settlement letter generation (Dana), CD-431 denial
  letter template (Dana + Elliot, design)
- **Adjuster workflow polish:** CD-436 claim timeline view (Marcus), CD-438
  duplicate-claim warning (Sofia)
- **Platform hygiene:** CD-440 legacy sync retry queue (Tom), CD-442 error
  telemetry on intake form (Tom)

**Critical Path:** CD-411 → CD-412 → CD-419. If the payment vendor integration
(CD-411) isn't merged by July 10, the approval flow and audit log cannot start and
the sprint goal fails. Everything else in this brief is valuable but survivable.

**Risks to Flag:**
- **Payment vendor sandbox instability** (took Sprint 13 down for 4 days).
  Mitigation: Priya has a recorded-response stub ready by July 7 so CD-412 can
  build against it if the sandbox drops again. Owner: Priya.
- **CD-431 denial letter has no approved design.** Compliance wording is still
  with Legal. Mitigation: Elliot delivers copy-locked design by July 9 or CD-431
  moves to Sprint 15 — it is off the critical path, so the goal survives. Owner:
  Elliot.
- **Fraud-flag service (owned by the Risk team) has no committed SLA** for the
  pilot claims. Mitigation: pilot scope is explicitly "no fraud flag" claims, so
  this cannot block the goal; Ana escalates the SLA ask for Sprint 15. Owner: Ana
  (PM).

**Carry-over from Last Sprint:** CD-411, CD-412, CD-419 (the entire payout chain,
~13 points). These ARE this sprint's critical path — the goal is only achievable
because we cut for them: CD-444 (bulk claim reassignment) and CD-447 (adjuster
dashboard filters, ~15 points combined) are moved to the Sprint 15 candidate list.
Without that cut, critical path + carry-over alone would have consumed the sprint.

**Definition of Done:** 5 real pilot claims settled end-to-end in ClaimsDesk by
adjusters (not engineers) with zero legacy-system touches, payout audit log entries
verified for each, and no P1/P2 defects open against the payout chain. Agreed with
the team and the claims-ops lead at planning on July 6.
```

## Why it's shaped this way

- **The goal is rewritten from "make progress on claims settlement" into a pass/fail sentence** — the process says to flag a vague goal, and the quality checks require a goal "specific enough to score pass/fail at the end of the sprint"; "5 real pilot claims settled before July 17" is scoreable, "progress" is not.
- **The critical path is three named tickets with a date trigger, not a vibe** — the anti-patterns ban leaving the critical path unnamed ("'the important tickets' is not a critical path"); naming CD-411 → CD-412 → CD-419 with a July 10 merge deadline tells the team exactly which slippage is fatal versus survivable.
- **Every risk carries a mitigation and a single owner** — "a risk without a response is just a worry list," so the sandbox risk gets a stub with a ready-by date, and the design gap gets an explicit fallback (slip CD-431 to Sprint 15) rather than hope.
- **Carry-over is connected to its cost, and the cost is paid on the page** — the skill requires carry-over "connected to their impact on this sprint's goal"; here the honest move is stating that carry-over *is* the critical path and that two named tickets (~15 points) were cut to make room, which is the validation step ("if the critical path items alone would fill the sprint, flag it as overloaded") acted on rather than just noted.
- **The Definition of Done is outcome evidence, not a task list** — the anti-patterns forbid mixing task completion with outcome criteria; "adjusters (not engineers) settle 5 real claims with zero legacy touches" is observable, and the brief records that it was "agreed at planning," per the rule that DoD is agreed before the sprint starts.
- **Two risks are deliberately off the critical path and say so** — separating "this can kill the goal" (sandbox) from "this slips a nice-to-have" (denial letter design) is what lets a reader triage in the promised under-three-minutes.
- **"Why This Sprint Matters" points at the OKR mechanism, not the OKR slogan** — it explains *how* this sprint moves settle time (removing the legacy hand-off), which is the 2–3 sentence connection the output structure asks for instead of restating the goal.
