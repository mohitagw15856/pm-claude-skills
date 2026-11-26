# Worked Example — Customer Escalation Brief

## The brief

MediSlot sells an appointment-scheduling platform to hospital networks. St. Aldric Hospital Network (7 hospitals, $1.24M ARR, customer since March 2023) was hit by a double-booking defect during the late-January flu surge: roughly 2,300 appointments double-booked across 5 hospitals over 6 days, 61 formal patient complaints, front-desk staff doing manual reconciliation at peak volume. The renewal is 12 June 2026 — about 4 months out. On 6 February the CMO, Dr. Naomi Okafor, emailed MediSlot's CEO directly saying the network is "evaluating alternatives ahead of renewal." The CSM, Daniel Mercer, is raising an L3 escalation brief for the CCO on 9 February 2026.

## The output

---

# Escalation Brief: St. Aldric Hospital Network

**Escalation level:** L3 — Churn Risk
**Date raised:** 9 February 2026
**Raised by:** Daniel Mercer (CSM)
**Escalation owner:** Carla Yoon, Chief Customer Officer

---

## Account at a Glance

| Field | Detail |
|---|---|
| ARR | $1,240,000 |
| Tier | Enterprise |
| Customer since | March 2023 |
| Renewal date | 12 June 2026 — 123 days away |
| Renewal risk (pre-escalation) | Green |
| Renewal risk (current) | Red |
| Customer contact who escalated | Dr. Naomi Okafor, Chief Medical Officer — C-suite, final sign-off on renewal |
| Executive sponsor (customer) | Frank Delgado, COO — passive; has not engaged since the 2025 QBR |
| Executive sponsor (vendor) | Carla Yoon, CCO |

---

## What Happened — Summary

During the flu-season surge in the last week of January, St. Aldric's booking volume reached 5.1× baseline. Under that load, a defect in our slot-locking logic allowed two patients to be confirmed into the same appointment slot. Approximately 2,300 appointments were double-booked across 5 of the network's 7 hospitals over 6 days before the defect was contained. Front-desk teams absorbed the impact through manual reconciliation during their busiest week of the year, and the network logged 61 formal patient complaints. The issue was first reported through support on 27 January; on 6 February, CMO Dr. Naomi Okafor emailed our CEO stating the network is evaluating alternatives ahead of the June renewal and requesting executive engagement.

---

## Timeline

- **19 Dec 2025** — MediSlot release v9.4 enables the "optimistic slot-hold" booking path for enterprise tenants, including St. Aldric.
- **26 Jan 2026** — Flu surge begins; St. Aldric booking volume climbs to 5.1× baseline over 48 hours.
- **27 Jan 2026, 08:40** — Front-desk staff at St. Aldric Riverside report duplicate bookings. Ticket filed; triaged as P3 (suspected local calendar configuration).
- **29 Jan 2026, 11:15** — St. Aldric IT escalates to P1 after 400+ confirmed double-bookings across 3 hospitals. MediSlot engineering reproduces the defect within 4 hours and disables the optimistic slot-hold path via feature flag at 17:30.
- **30 Jan 2026** — Hotfix deployed; new double-bookings drop to zero. Cumulative impact confirmed at ~2,300 appointments across 5 hospitals. CSM Daniel Mercer stands up daily reconciliation support with the network's patient-access team.
- **2 Feb 2026** — Written acknowledgement and apology sent by VP Engineering Marcus Liem to Priya Raghavan, VP Patient Access (our champion).
- **3 Feb 2026** — Priya Raghavan formally requests a written root-cause analysis; tone strained but constructive.
- **6 Feb 2026, 16:05** — Dr. Okafor emails MediSlot CEO: network is "evaluating alternatives ahead of renewal"; requests executive engagement and references the incident at the network's quality-and-safety committee. Escalation raised to L3.
- **9 Feb 2026** — This brief prepared for CCO decision.

---

## Root Cause

**Primary cause:** A race condition in the slot-locking service: the optimistic slot-hold path released its hold before the confirmation write committed, so under sustained concurrent load (observed above ~4× baseline) two confirmations could commit against the same slot.

**Contributing factors:**
- Our load-test suite caps at 3× baseline volume; the surge hit 5.1×. The defect was unreachable in any test we run today — a gap we own.
- The first report sat at P3 for 36 hours because the support triage runbook had no signature for double-booking symptoms; it was read as a tenant configuration issue.
- The optimistic slot-hold flag was enabled for enterprise tenants in December without a surge-window review, two weeks before the highest-load period of the year.

**Is this a systemic issue or isolated?**
- [ ] Isolated to this account
- [x] Pattern seen in other accounts — details: Beacon Valley Health (2 hospitals) logged 14 double-bookings in the same week; contained by the same flag disable, not yet raised by the customer.
- [x] Product or process gap that needs fixing — surge-level load testing and triage runbook coverage.

---

## Customer's Stated Position

**What the customer says happened:** "MediSlot's system double-booked our sickest patients during the worst week of the year, and it took two days and our own IT department escalating before anyone treated it as serious." Dr. Okafor has framed this internally as a patient-safety event, not an IT inconvenience, and reports that clinic managers are asking whether the platform can be trusted through next winter.

**What they are asking for:**
1. A full written root-cause analysis within 10 business days.
2. A fee credit for Q1.
3. A surge-readiness plan committed before the next flu season.
4. A contract addendum adding a termination-for-convenience clause.

**Sentiment of escalating contact:** Angry — but engaged; no formal notice issued. Champion Priya Raghavan remains constructive and is still sharing internal context.

**Risk of public escalation:** Medium — Dr. Okafor's email referenced the state hospital association's quality forum in March; no press or legal language so far.

---

## Business Impact

| Impact type | Detail |
|---|---|
| ARR at risk | $1,240,000 |
| Potential churn probability | 60% (CMO-level exit language, active alternative evaluation, but champion engaged and no notice issued) |
| Reputational risk | High — patient-safety framing in a hospital network; CMO active in the state hospital association |
| Reference / case study status | Was a published case study and reference account — now at risk |
| Expansion pipeline at risk | $380,000 (planned onboarding of 2 additional hospitals in H2 2026, currently paused by the customer) |

---

## What Has Been Done So Far

1. Optimistic slot-hold path disabled via feature flag — Marcus Liem (VP Engineering) — 29 Jan — new double-bookings stopped within the hour.
2. Hotfix deployed and verified across all St. Aldric tenants — Marcus Liem — 30 Jan — zero recurrence since.
3. Daily reconciliation support for affected appointments — Daniel Mercer + enterprise support pod — 30 Jan to 4 Feb — all ~2,300 affected appointments reconciled with the patient-access team.
4. Written acknowledgement and apology to VP Patient Access — Marcus Liem — 2 Feb — received; RCA requested in response.
5. Preliminary internal RCA completed and reviewed — engineering + SRE — 5 Feb — forms the basis of the customer-facing RCA.

**Has a formal apology or acknowledgement been issued?** Yes — written, from VP Engineering, 2 Feb.

---

## Proposed Resolution Plan

**Immediate actions (next 24–48 hours):**

| Action | Owner | By when |
|---|---|---|
| CCO calls Dr. Okafor to acknowledge at exec level and commit to the plan below | Carla Yoon | 10 Feb |
| Preliminary written RCA delivered to Priya Raghavan and Dr. Okafor | Marcus Liem | 11 Feb |
| Scope check completed across all surge-exposed enterprise tenants; Beacon Valley CSM briefed | Anaya Bhat (SRE lead) | 11 Feb |

**Medium-term actions (next 2–4 weeks):**

| Action | Owner | By when |
|---|---|---|
| Service credit proposal delivered (pending approval below) | Rachel Donnelly (AE) | 13 Feb |
| Onsite executive review at St. Aldric HQ — CCO + VP Engineering | Carla Yoon | 18 Feb |
| Full RCA + surge-readiness plan: load testing to 8× baseline, concurrency test suite for slot-locking, triage runbook update | Marcus Liem | 27 Feb |
| Joint success-plan reset with milestones through renewal | Daniel Mercer | 6 Mar |

**What we are NOT offering:** A termination-for-convenience addendum (their ask #4) — we will address the underlying trust gap through the surge-readiness commitment and exec sponsorship instead. No refund beyond the service credit, and no mid-term SLA rewrite.

**Success criteria:** RCA accepted in writing by Priya Raghavan; Dr. Okafor confirms the renewal conversation is back on the table after the 18 Feb onsite; renewal risk returned to Amber by 31 March; zero double-booking recurrence through the end of flu season.

---

## Decision Required from Escalation Owner

We need two approvals from Carla Yoon by 12 February:
1. **A service credit of up to $93,000** (30% of one quarter's fees) as the concrete remedy for their ask #2 — offered at the 18 Feb onsite, not before, so it lands alongside the RCA and surge plan rather than as a standalone concession.
2. **CCO commitment to the 18 Feb onsite and a standing exec-sponsor role** (monthly call with Dr. Okafor's office) through the 12 June renewal.

---

## Communication Plan

| Audience | Message | Channel | Owner | By when |
|---|---|---|---|---|
| Dr. Naomi Okafor (CMO) | Exec acknowledgement; commitment to RCA date, onsite, and surge plan | Call | Carla Yoon | 10 Feb |
| Priya Raghavan (VP Patient Access) | Preliminary RCA; daily status until full RCA delivered | Email + standing call | Daniel Mercer | 11 Feb, then daily |
| Internal CS + revenue team | Situation summary, single-thread ownership, no ad-hoc outreach to the account | Slack + team meeting | Elena Ortiz (CS Manager) | 10 Feb |
| Beacon Valley Health CSM | Proactive heads-up on the pattern before the customer finds it themselves | Internal briefing | Anaya Bhat | 11 Feb |

---

## Why it's shaped this way

- **The root cause names a mechanism, not a mood.** "Race condition in the slot-locking service: hold released before the confirmation write committed, above ~4× baseline load" — never "a product gap" or "communication breakdown." The Quality Checks demand this specificity, and the contributing factors own two internal misses (the 3× load-test cap, the 36-hour P3 misclassification) rather than pinning either on a person.
- **The customer's position is quoted at full strength.** Dr. Okafor's patient-safety framing stings, and it stays in verbatim. The Anti-Patterns forbid minimising the customer's version; an exec who first hears that framing from the customer, not the brief, has been set up to fail.
- **Every impact number is a number.** ARR ($1.24M), churn probability (60%, with the reasoning behind it), expansion pipeline ($380k, paused) — the Anti-Patterns forbid describing churn risk vaguely, because the credit approval below is priced against these figures.
- **The systemic checkbox is honestly ticked.** Beacon Valley Health shows the same defect signature. Hiding a pattern in an L3 brief is how an account escalation becomes a portfolio escalation; surfacing it lets the CCO decide on proactive disclosure.
- **"What we are NOT offering" refuses the exit clause explicitly.** The customer asked for four things; the brief grants a path to three and draws a line on the fourth. Leaving that boundary unstated is how field teams accidentally negotiate contract terms.
- **The brief ends with a decision, not a discussion.** Two specific approvals, one with a dollar figure ($93,000) and a deadline (12 Feb), plus sequencing guidance (credit lands at the onsite, with the RCA). The Quality Checks reject any brief that ends with "what do you think?"
- **Timeline entries carry dates, times, and actors** so a reader can see the uncomfortable 36-hour gap between first report and P1 without the brief editorialising about it — facts plainly stated, blame withheld, exactly as the summary section instructs.
- **Every owner is a named person** — Yoon, Liem, Bhat, Donnelly, Mercer, Ortiz — with a date. The Quality Checks and Anti-Patterns both reject unassigned actions, because unowned actions in an L3 simply do not happen.
