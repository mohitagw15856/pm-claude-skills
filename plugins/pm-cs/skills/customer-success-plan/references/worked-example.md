# Worked Example — Customer Success Plan

## The brief

Northstar Freight, a freight-visibility SaaS vendor, has just signed Harvest & Hearth, a 340-store regional grocery chain with six distribution centres. The deal: 18-month contract (2 March 2026 → 1 September 2027), 250 seats on the Enterprise plan, $312k ACV. The champion is Dana Whitfield, Director of Supply Chain Operations, who bought because late inbound refrigerated loads are driving spoilage write-offs and detention fees. Complications the CSM already knows about: Dana is simultaneously running a WMS migration and has limited bandwidth; the executive sponsor relationship (Marcus Ellison, SVP Operations) was warm in the sales cycle but not yet formalised; and Harvest & Hearth cannot currently measure inbound OTIF reliably — carrier status data lives in emails and spreadsheets, so there is no trustworthy baseline for the metric the whole deal was sold on.

## The output

---

# Customer Success Plan: Harvest & Hearth

**Product:** Northstar Freight Visibility Platform — Enterprise plan (250 seats)
**Contract term:** 2 March 2026 → 1 September 2027
**CSM:** Priya Raghavan (Northstar Freight)
**Customer champion:** Dana Whitfield, Director of Supply Chain Operations
**Customer executive sponsor:** Marcus Ellison, SVP Operations (engaged in sales cycle; formal sponsorship to be confirmed at kickoff — milestone below)
**Last updated:** 20 March 2026
**Status:** Active

---

## 1. Partnership Objectives

> *What does success look like for Harvest & Hearth at contract end?*

Harvest & Hearth loses money twice on every late inbound load: detention and late-arrival fees on the freight side, and spoilage write-offs when refrigerated product misses its receiving window. They bought Northstar to see loads coming before they are late, act on exceptions instead of discovering them, and cut the manual phone-and-email work their six DC dock teams do today. By renewal, Dana's team should be running exception-based receiving across all six DCs, with fee and shrink reductions she can put in front of Marcus Ellison's quarterly ops review.

**Primary business goal:** Reduce detention and late-arrival fees from ~$118k/quarter to ≤ $60k/quarter by Month 12
**Secondary goal:** Cut refrigerated spoilage write-offs attributable to late loads (currently ~$410k/year) by 25% by Month 15, and reduce dock-appointment rework time from ~45 to ≤ 15 minutes per exception
**Success statement (customer's words):** "If my dock leads stop finding out a reefer is late when it's already sitting in the yard, and I can show Marcus a fee number that's going down, this was worth it." — Dana Whitfield, kickoff call, 16 March 2026

---

## 2. Success Metrics

Define how both parties will measure success. Agreed in the kickoff call and tracked in QBRs.

| Metric | Baseline (today) | Target | By when | Data source |
|---|---|---|---|---|
| Inbound OTIF, all 6 DCs | Not reliably measurable — carrier data in email; baseline audit completes 17 Apr 2026 (est. ~71%) | ≥ 85% | Month 9 (Dec 2026) | Northstar delivery events + H&H TMS |
| Detention & late-arrival fees | $118k/quarter (Q4 2025 AP ledger) | ≤ $60k/quarter | Month 12 (Mar 2027) | H&H accounts-payable ledger |
| Refrigerated spoilage write-offs from late loads | $410k/year (FY2025 shrink report) | −25% ($307k annualised) | Month 15 (Jun 2027) | H&H shrink reporting |
| Dock exception handling time | ~45 min/exception (dock-lead time study, Feb 2026) | ≤ 15 min | Month 6 (Sep 2026) | Repeat time study by H&H dock leads |

**Leading indicators** (early signs the plan is on track):
- 200 of 250 seats activated within 30 days of kickoff
- All 6 DCs receiving live carrier events (EDI 214 + ELD feeds) by week 6
- Dana presents the exception dashboard at her weekly ops call by end of Month 1
- OTIF baseline audit complete by 17 April 2026 — without it, Month 9 target cannot be tracked

---

## 3. Milestone Roadmap

### Phase 1: Onboard (March 2026)

| Milestone | Owner | Due date | Status |
|---|---|---|---|
| Admin setup complete (SSO, permissions, TMS + EDI 214 integration for DCs 1–3) | Raj Patel (H&H IT Integration Lead) | 27 Mar 2026 | [x] |
| All 250 seats activated and users invited across 6 DCs | Dana Whitfield | 3 Apr 2026 | [ ] |
| Core exception-alert workflow configured and tested for refrigerated lanes | Priya Raghavan + Dana Whitfield | 3 Apr 2026 | [ ] |
| First training session delivered (dock leads + transport planners, all DCs) | Priya Raghavan | 10 Apr 2026 | [ ] |
| Kickoff call completed and success plan co-signed; Marcus Ellison confirms exec sponsor role | Priya Raghavan + Dana Whitfield | 16 Mar 2026 | [x] (co-sign done; Ellison confirmation carried to 24 Apr — see Risk 3) |

### Phase 2: Adopt (April–May 2026)

| Milestone | Owner | Due date | Status |
|---|---|---|---|
| OTIF baseline audit complete (90 days of carrier history normalised) | Raj Patel + Priya Raghavan | 17 Apr 2026 | [ ] |
| Exception-based receiving in active daily use by ≥ 120 users across DCs 1–3 | Dana Whitfield | 8 May 2026 | [ ] |
| First business outcome documented (first prevented late-reefer write-off) | Dana Whitfield + Priya Raghavan | 22 May 2026 | [ ] |
| 30-day check-in completed; DCs 4–6 integration live | Priya Raghavan / Raj Patel | 24 Apr 2026 | [ ] |
| Detention-fee dispute workflow enabled for transport planners | Priya Raghavan | 29 May 2026 | [ ] |

### Phase 3: Value (June–August 2026)

| Milestone | Owner | Due date | Status |
|---|---|---|---|
| QBR 1 delivered — fee and exception-time evidence presented to Marcus Ellison | Priya Raghavan + Tom Becker (AE) | 25 Jun 2026 | [ ] |
| Dock exception handling time ≤ 15 min confirmed by repeat time study | Dana Whitfield | 4 Sep 2026 | [ ] |
| Expansion use case introduced: outbound store-delivery visibility (85 tractor fleet) | Tom Becker | 25 Jun 2026 (QBR 1) | [ ] |
| Reference call or grocery-sector case study agreed | Dana Whitfield | 28 Aug 2026 | [ ] |

### Phase 4: Renew & Expand (September 2026 – September 2027)

| Milestone | Owner | Due date | Status |
|---|---|---|---|
| QBR 2 (Oct 2026) and QBR 3 (Jan 2027) delivered — OTIF and fee trajectory reviewed | Priya Raghavan + Tom Becker | 15 Oct 2026 / 21 Jan 2027 | [ ] |
| QBR 4 delivered — renewal conversation started, 5 months out | Priya Raghavan + Tom Becker | 15 Apr 2027 | [ ] |
| Renewal proposal sent (incl. outbound visibility expansion option) | Tom Becker | 11 Jun 2027 | [ ] |
| Expansion or flat renewal signed | Tom Becker | 13 Aug 2027 | [ ] |

---

## 4. Mutual Commitments

Success plans work when both parties commit. Document what each side will do:

**Northstar Freight commits to:**
- Dedicated CSM (Priya Raghavan) reachable by email within 24 hours, business days
- Monthly 30-minute call with Dana, plus async health summary in the shared channel
- QBR every 90 days with executive summary and fee/spoilage ROI report
- Priority support: 4-hour response SLA for P1 issues affecting live DC receiving
- Roadmap preview of the outbound-fleet visibility module before general release
- Integration engineering support for the WMS migration cutover window (committed in sales cycle, 8 Feb 2026 email)

**Harvest & Hearth commits to:**
- Dana available for the monthly 30-minute check-in
- Dock leads and transport planners complete onboarding training by 10 April 2026
- Raj Patel's team maintains the EDI/TMS feeds and flags schema changes ≥ 2 weeks ahead
- Marcus Ellison participates in QBR 1 (25 June 2026) and the renewal discussion
- Fee, shrink, and time-study data shared with Priya quarterly for ROI tracking

---

## 5. Stakeholder Engagement Plan

| Stakeholder | Role | Engagement frequency | Format | Owner |
|---|---|---|---|---|
| Dana Whitfield, Director Supply Chain Ops | Champion, day-to-day owner | Weekly (async) + monthly (call) | Shared channel + video call | Priya Raghavan (CSM) |
| Marcus Ellison, SVP Operations | Economic buyer / exec sponsor | Quarterly | QBR (video, in-person for QBR 4) | Priya Raghavan + Tom Becker |
| Raj Patel, IT Integration Lead | Integration owner | As needed; standing invite to monthly call | Email + ticket queue | Priya Raghavan |
| Lena Ortiz, DC Regional Manager (East) | Adoption multiplier, DCs 1–3 | Monthly during rollout | Group session | Priya Raghavan |
| Dock leads & transport planners (≈220 users) | End users | Training + office hours (Apr–May) | Group sessions | Priya Raghavan |

---

## 6. Risk & Mitigation

| Risk | Likelihood | Impact | Mitigation plan |
|---|---|---|---|
| Champion stretched thin — Dana is concurrently running the WMS migration and may deprioritise rollout | H | H | Priya runs rollout mechanics so Dana's role is decisions-only (≤ 30 min/week); Lena Ortiz owns DC-floor adoption; revisit load at 30-day check-in |
| Champion departure or role change | L | H | Multi-thread by Month 2: working relationships with Lena Ortiz and Raj Patel; Ellison sponsorship formalised so the plan survives any single contact |
| No trustworthy OTIF baseline — headline metric unprovable at renewal | M | H | Baseline audit is a named Phase 2 milestone (17 Apr 2026); fee and time-study metrics carry the ROI story until OTIF data matures |
| Exec sponsor not formalised — Ellison warm in sales cycle but no standing engagement | M | H | Confirmation moved to a dated action (24 Apr 2026, owner: Dana with Tom Becker support); QBR 1 attendance is the forcing function |
| Store/DC-floor adoption stalls after training (dock leads revert to phone-and-email) | H | M | Agree minimum viable adoption path (exception alerts on refrigerated lanes only, DCs 1–3 first); weekly usage review with Lena Ortiz through May |
| WMS migration cutover breaks the TMS/EDI feed mid-rollout | M | M | Raj flags schema changes ≥ 2 weeks ahead; Northstar integration engineer on standby for the cutover window |

---

## 7. Communication Plan

| Communication | Audience | Frequency | Format | Owner |
|---|---|---|---|---|
| Health update | Dana Whitfield | Monthly | Email summary (3 bullets: what's good, what needs attention, one ask) | Priya Raghavan |
| QBR | Dana + Marcus Ellison | Quarterly (Jun, Oct, Jan, Apr) | 45-min video call with deck + fee/spoilage ROI report | Priya Raghavan + Tom Becker |
| Product updates | Dana + Raj Patel | As released | Release notes email | Priya Raghavan |
| Support status | Dana + Raj Patel | While tickets are open | Shared channel | Northstar Support + Priya Raghavan |
| Rollout usage pulse | Lena Ortiz | Weekly through May 2026 | Dashboard link + 3-line note | Priya Raghavan |

---

## 8. Escalation Path

If the success plan falls off track:

| Trigger | Action | Owner | Timeline |
|---|---|---|---|
| Health drops to Amber | Internal review + call with Dana within 5 days | Priya Raghavan | Immediate |
| Health drops to Red | CS leadership + Tom Becker looped in; escalation brief drafted | Sofia Marchetti (CS Manager) | Within 24 hours |
| Dana unresponsive for >10 days | Tom Becker contacts Marcus Ellison | Tom Becker | After CSM attempt fails |
| Seat adoption <40% at Month 3 (June 2026) | Emergency enablement session with Lena Ortiz + revised milestone plan | Priya Raghavan | Within 1 week of flag |
| OTIF baseline audit slips past 15 May 2026 | Re-scope Month 9 OTIF target at QBR 1; fee metrics become primary renewal evidence | Priya Raghavan + Dana Whitfield | At QBR 1 |

---

## Why it's shaped this way

- **Every success metric is a Harvest & Hearth business number** — detention fees from their AP ledger, spoilage from their shrink report, exception time from their own time study. Seat activation and feed go-live appear only as *leading indicators*, honouring the quality check that metrics are the customer's, not the vendor's, and the anti-pattern against vendor-controlled metrics.
- **The OTIF baseline problem is surfaced, not papered over.** The metric the deal was sold on cannot be measured yet, so the plan makes the baseline audit a dated Phase 2 milestone and names a fallback (fee metrics) in the escalation path — rather than inventing a clean baseline number.
- **Every owner is a named person** — Dana Whitfield, Raj Patel, Lena Ortiz, Priya Raghavan, Tom Becker — never "CS team" or a blank, per the anti-pattern on unowned actions. Every date is concrete; the one genuinely unconfirmed item (Ellison's sponsorship) is expressed as a dated action with an owner instead of a vague open question.
- **Mutual Commitments are genuinely two-sided and specific**: the customer commits data-sharing, training completion, feed maintenance, and exec attendance with dates — not just "engage with the vendor" — because a plan listing only vendor obligations fails the mutuality quality check.
- **The risk register leads with champion overload and champion departure**, plus DC-floor adoption stalling — the two risks the quality checks explicitly require — and each mitigation is an action with an owner, not a hope.
- **The plan is written to be shared with the customer.** Risks are framed as joint problems ("no trustworthy baseline"), never as internal commentary about the account ("Dana is difficult to reach"), so it can be co-signed as-is.
- **Milestone dates were set in the kickoff call (16 March) and marked co-signed**, reflecting the anti-pattern against unilateral timelines: the roadmap records agreements, it does not impose them.
- **Adoption milestones and business outcomes are kept distinct**: Phase 2 tracks usage (120 users, feeds live) while Sections 1–2 track outcomes (fees, spoilage) — both present, never conflated, per the anti-pattern on confusing the two.
