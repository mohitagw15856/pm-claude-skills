# Worked Example — Meeting Notes

A gold-standard run of this skill: a messy 55-minute steering meeting reduced to notes someone can act on without having attended.

## The brief

Caldwell Health Network — a fictional six-hospital regional system — holds its monthly steering meeting for **MyCaldwell v2**, the patient portal rebuild. 55 minutes, five attendees, three contentious topics: when to release lab results to patients, whether to pilot caregiver proxy access, and the fact that Marketing reports portal activation at 38% while IT reports 26%. The CMIO and the Patient Experience Director openly disagree on results release. The PM, Dana Whitfield, took raw notes and needs to send structured minutes within two hours. Meeting type: stakeholder sync.

## The output

```
# MyCaldwell v2 Steering Committee — March 2026
**Date**: March 11, 2026
**Attendees**: Priya Nair (VP Digital, sponsor), Dr. Elena Vasquez (CMIO), Sam Okafor (IT Security Director), Marcus Lee (Patient Experience Director), Dana Whitfield (PM)
**Note Taker**: Dana Whitfield
**Duration**: 55 minutes

## Status Overview
Portal rebuild is in month 4 of 9. Messaging and appointments modules live at two pilot hospitals; lab results module in build. One item escalated this session (activation metric discrepancy — see Escalations).

## Agenda
- [x] Lab results release timing policy
- [x] Caregiver proxy access pilot — go/no-go
- [x] Activation metric discrepancy (38% vs 26%)
- [ ] Spanish-language rollout plan *(deferred to April session — ran out of time)*

## Decisions Made

**Decision**: Release routine lab results to patients immediately on finalisation; clinicians get a per-order "hold for conversation" flag (max 7 days) for sensitive results.
**Context**: Federal information-blocking rules make broad delays untenable, and pilot-site data shows 62% of results-related call volume comes from patients waiting on known-ready results. Dr. Vasquez advocated a blanket 14-day delay for oncology and pathology results and **formally dissented from immediate release**; the per-order hold flag is the negotiated middle. Committee agreed to revisit if clinician complaints exceed 10/month.
**Owner**: Marcus Lee (policy rollout and patient comms); Dr. Vasquez (clinician briefing on the hold flag)
**Deadline**: Policy live with the lab module, May 4

**Decision**: Caregiver proxy access pilot is **deferred, not killed** — no build until Sam Okafor's team completes the access-control review of adolescent-record edge cases.
**Context**: The proxy model as designed would expose 13–17-year-old records to parents in ways state law treats differently across the three states Caldwell operates in. Building first and patching later was judged the riskier path.
**Owner**: Sam Okafor (review and written recommendation)
**Deadline**: Review delivered April 8; go/no-go at April steering

**Decision**: Adopt a single activation definition — "distinct patient logged in within 90 days of discharge or visit" — owned by the analytics team, replacing both Marketing's and IT's counts.
**Context**: Marketing counted registered accounts (38%); IT counted 30-day logins (26%). Neither is wrong; they measure different things, which made every prior status report unreliable. The 90-day-login definition matches how peer systems report and is the harder, more honest number.
**Owner**: Dana Whitfield with analytics team
**Deadline**: Single number in the April steering pack, April 10

## Action Items
- [ ] **Draft lab-results release policy + hold-flag clinician guide** - @Marcus - Due: Apr 1
- [ ] **Brief department chairs on hold flag and dissent rationale** - @Elena - Due: Apr 4
- [ ] **Deliver adolescent proxy-access security review with recommendation** - @Sam - Due: Apr 8
- [ ] **Publish single activation metric definition and backfilled trend** - @Dana - Due: Apr 10
- [ ] **Add results-related call volume to monthly dashboard as release-policy guardrail** - @Dana - Due: Apr 10
- [ ] **Confirm legal read on three-state adolescent record rules to feed Sam's review** - @Priya - Due: Mar 25

## Discussion Notes

**Lab Results Release Timing**
- Pilot data: 62% of results-related calls are patients chasing results already finalised
- Dr. Vasquez's concern: patients reading an abnormal oncology result at 9pm with no clinician reachable; cited two incidents at pilot site
- Marcus's counter: delay policies at peer network (fictional Brightstone Health) drove portal-trust complaints and didn't reduce distress calls
- Hold flag agreed as exception path, not default; usage will be monitored for over-use by department

**Proxy Access Pilot**
- Demand is real: proxy access is the #2 requested feature in patient feedback (412 requests YTD)
- Blocker is legal/security, not engineering; engineering estimate (6 weeks) is not the constraint
- Sam: "I'd rather lose a quarter than be the network that leaked a teenager's visit history to the wrong parent"

**Activation Metric Discrepancy**
- Root cause: two teams answering different questions with the same word since launch
- Priya flagged this affects board reporting — the January board pack used the 38% figure; correction memo needed
- Escalated (below) because the correction is outside this committee's authority

## Escalations
- **Board pack correction**: January's reported 38% activation must be restated under the new definition. Priya Nair owns raising it with the executive team by March 20.

## Approvals Obtained
- Priya Nair (sponsor) approved the lab-results policy direction and the proxy-pilot deferral on the record.

## Open Questions / Follow-Up
- **Question**: Does the hold flag itself create an information-blocking compliance risk if over-used?
  **Owner**: Priya (via legal counsel)
  **By When**: April 4
- **Question**: What did the two pilot-site incidents actually cost in clinical follow-up time (to size the 9pm-abnormal-result concern with data rather than anecdote)?
  **Owner**: Elena
  **By When**: April 8

## Next Steps
1. Dana sends these notes to attendees + department chairs mentioned in actions by 3pm today
2. Sam's proxy review lands April 8; go/no-go is the first agenda item at April steering
3. April steering: April 14, 10:00 — proxy go/no-go, single activation number, Spanish-language rollout (carried over)

---
**Next Meeting**: April 14, 2026 — Proxy go/no-go + restated activation baseline
**Notes Sent**: March 11, 2026 12:40 PM
```

## Why it's shaped this way

- **Every action item has exactly one named owner and a date** — the skill bans "team" ownership outright ("no 'team' ownership"); even the shared lab-policy decision splits into two separately-owned actions rather than one co-owned blob.
- **Dr. Vasquez's dissent is recorded inside the decision block, not smoothed over** — the best-practices section says to note dissenting opinions on important decisions, and the "revisit if complaints exceed 10/month" clause makes the dissent actionable rather than decorative.
- **Each decision carries its context** — the anti-patterns forbid decisions without rationale ("useless when someone asks 'why did we do that?' six months later"); the proxy deferral explains *why* legal risk beat a 6-week engineering estimate.
- **The proxy pilot is a deferred decision with an owner and a date, not a dropped thread** — an unanswered question with no follow-up assigned is a blocked decision, so the deferral itself gets an owner (Sam) and a go/no-go date (April 14).
- **Discussion notes are synthesis, not transcript** — quotes appear only where they carry decision weight (Sam's one-liner explains the deferral better than a paragraph); the skill explicitly bans verbatim capture.
- **The activation-metric ambiguity is resolved into a decision plus an escalation**, because the board-pack correction exceeds the committee's authority — the stakeholder-sync adaptation exists precisely to separate what the room decided from what must go up.
- **The unfinished agenda item is visibly carried over** rather than silently vanishing — the agenda checkboxes are a tracking device, and the deferred topic reappears in Next Steps with a date.
- **Notes timestamp shows a 100-minute turnaround** — inside the 2-hour send window the anti-patterns enforce, while owners can still act on fresh commitments.
