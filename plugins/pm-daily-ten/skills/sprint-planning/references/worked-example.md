# Worked Example — Sprint Planning

## The brief

Veyla Health runs a telehealth platform for mid-sized clinic networks. The Care Delivery squad (6 engineers, 2-week sprints, historical velocity 42 points) is planning Sprint 34 (Mon 2 Mar – Fri 13 Mar). The quarter's bet is self-serve rebooking: 31% of missed video consultations are never rebooked, and each one that reaches the support line costs ~$14 to recover. Complications: Priya starts parental leave after week 1, Jonas is at a health-tech conference for 2 days, Mon 9 Mar is a public holiday for everyone, and a 5-point insurance-eligibility story carried over from Sprint 33 because the payer sandbox was down. The rebooking epic arrived from the PM estimated as a single 13-point item. The clinical governance lead, Dr. Chen, has not approved rebooking patients into a *different* clinician's slot — she considers it a continuity-of-care risk.

## The output

### Sprint 34 — 2 Mar to 13 Mar

**Sprint Goal:**
> This sprint we will let patients rebook a missed video consultation themselves, so that missed appointments stop leaking to the support line, measured by the end-to-end rebook flow passing UAT and rebook-rate instrumentation live in production.

**Team Capacity:** 23 story points committed against 26 recommended (based on 6 team members, 78% availability)

Working the capacity formula rather than asserting it:

```
Nominal person-days:      6 members × 10 days           = 60
Public holiday 9 Mar:     −6   (all members)
Priya parental leave:     −5   (out from 9 Mar)
Jonas conference:         −2
Real person-days:                                        = 47
Availability factor:      47 / 60                        = 0.78
Focus hours:              47 days × 6 h                  = 282 h
Adjusted velocity:        42 × 0.78                      = 32.8 ≈ 33 points
Recommended commitment:   33 × 0.80 (commit ratio)       = 26 points
Less carry-over:          26 − 5                         = 21 points for new work
```

**Sprint Backlog:**

| Priority | Story | Points | Owner | Acceptance Criteria |
|---|---|---|---|---|
| 1 | Carry-over: insurance eligibility retry logic | 5 | Marta | When the payer API times out, then the check retries up to 3× and confirms the visit without the patient re-entering details |
| 2 | Missed-visit notification links to rebook entry point | 3 | Jonas | When a visit is marked missed, then the patient receives a notification whose link opens the rebook flow pre-filled with that visit |
| 3 | Slot search: same clinician within ±7 days | 5 | Dmitri | When a patient opens rebooking, then only their original clinician's open slots in the next 7 days are offered, soonest first |
| 4 | Rebook confirmation and calendar-hold release | 3 | Aisha | When a patient confirms a slot, then the old hold is released, the new visit is confirmed, and both calendars update within 60s |
| 5 | Empty and error states for the rebook flow | 3 | Aisha | When no slots exist or slot booking fails mid-flow, then the patient sees a specific message and a route to support — never a dead end |
| 6 | Rebook instrumentation (rebook rate, support deflection) | 2 | Marta | When a rebook completes or abandons, then events fire with visit ID and channel, visible in the analytics dashboard |
| 7 | Spike: clinical-safety rules for any-clinician fallback | 2 | Priya (timeboxed to week 1, before leave) | When the spike closes, then a one-page decision memo with Dr. Chen's signed position exists — pass/fail, no code |

**Committed: 23 points.** Deliberately under the 26 recommended — Priya's handover and the holiday both land in week 2, where slack matters most.

**Notes from estimation:**
- The rebooking epic came in at 13 points — above the 8-point ceiling — and was split into stories 2–5 before anything was committed.
- "Any-clinician fallback" (est. 5 points) was pulled **out** of the commitment: it has no acceptance criteria because clinical governance hasn't ruled. Per the no-AC rule it is a blocker, not a story. The spike (priority 7) exists to convert it into a committable story for Sprint 35.

**Carry-Overs from Previous Sprint:**
- Insurance eligibility retry logic (5 pts) — Reason for carry-over: payer sandbox was down for 4 of 10 days in Sprint 33; work is ~60% complete but untestable until now. Counted inside the 26, not on top of it.

**Risks & Dependencies:**
- Payer sandbox instability could strand the carry-over again → Mitigation: nightly contract test against the sandbox; if it fails 2 consecutive nights, Marta escalates to the payer-integrations team and swaps to story 6.
- Priya's leave starts 9 Mar and she owns the only committed spike → Mitigation: spike timeboxed to week 1; handover doc due day 3; Dmitri named as reader.
- Dr. Chen disagrees with any-clinician rebooking on continuity-of-care grounds → Mitigation: fallback story stays out of the commitment; spike memo is the decision vehicle, not a hallway debate.
- Holiday compresses week 2 to 4 days → Mitigation: mid-sprint checkpoint moved to Wed 11 Mar; stories 5–6 pre-agreed as the descope order if the checkpoint shows red.

**Sprint Planning Agenda:**
- 00:00–00:10 — Review sprint goal and team capacity (walk the 47-person-day math, not just the answer)
- 00:10–00:40 — Walk through backlog items, confirm estimates (re-vote story 3; Dmitri estimated 5, Jonas 3)
- 00:40–01:20 — Assign stories, identify dependencies (story 4 depends on 3; instrumentation last)
- 01:20–01:50 — Review acceptance criteria per story (confirm fallback story stays gated)
- 01:50–02:00 — Confirm sprint commitment and close (23 points, descope order agreed)

## Why it's shaped this way

- **The capacity math is shown, not asserted** — the skill's formula (focus hours, availability factor, 80% commit ratio) is worked line by line so the team can challenge an input rather than the conclusion. 47 real person-days out of 60 nominal is exactly the kind of number teams round up when it's hidden.
- **Commitment is 23 points against 33 adjusted velocity** because the skill bans planning to 100% of capacity — and the team went slightly *under* the 80% recommendation, with a stated reason (week-2 absences), not vibes.
- **The carry-over consumes capacity first.** The 5-point eligibility story sits at priority 1 and inside the 26-point budget, because the anti-patterns forbid pretending carry-overs are free.
- **The 13-point epic never reaches the backlog table intact** — the calibration table caps sprint-ready items at 8, so it was split into four estimable stories before commitment.
- **The fallback story is excluded, not squeezed in.** It has no acceptance criteria (clinical governance hasn't ruled), and the skill says stories without ACs are blockers. The 2-point spike converts a disagreement with Dr. Chen into a decision memo — a scoreable deliverable.
- **The sprint goal is pass/fail at sprint end** — "flow passes UAT and instrumentation is live" — not a task list, per the Sprint Goal Formula.
- **Every risk row pairs a threat with a named mitigation and an owner or trigger** (nightly contract test, day-3 handover doc, pre-agreed descope order), because a risk without a response is just a worry.
- **The agenda annotates the standard timings with this sprint's actual contention points** (the story-3 estimate split, the gated fallback), so the meeting spends time where the disagreement is.
