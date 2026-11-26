# Worked Example — Product Launch Checklist

A gold-standard run of this skill: a Tier 1 logistics launch where the Go/No-Go gate does its job — the launch slips four days instead of shipping with a legal hole in it.

## The brief

Portside Freight — a fictional freight-management SaaS with 1,900 shipper customers — is launching **Live ETA**, ML-predicted arrival times for ocean and road shipments (mean error 6.2 hours vs the 26-hour carrier-quoted average). It's a paid add-on at $450/month and the company's headline release of the year. The CEO called it "basically turning on a data feed" and suggested skipping ceremony; PM Anaïs Fournier tiered it as 1 — new pricing, an SLA-adjacent accuracy claim, and third-party carrier data licensed from a provider (fictional "TelemetryHub") whose attribution terms legal is still reviewing. Marketing wanted Friday 18 September to align with the monthly customer webinar. Eng lead is Tomas Ruiz; marketing Jess Park; support Omar Haddad; analytics Lena Vogt; legal Dev Chandra.

## The output

### Launch Checklist — Live ETA — Target Date: Thursday 17 September 2026

**Launch Tier:** 1 — new revenue line, public accuracy claims, licensed third-party data. (Downgraded from marketing's Friday-webinar plan: no weekend engineering coverage exists, so the date moved to Thursday. The CEO's "Tier 3, it's a data feed" read was rejected on record: pricing and legal exposure set the tier, not engineering effort.)
**Launch Owner:** Anaïs Fournier (PM)
**Engineering Lead:** Tomas Ruiz
**Go/No-Go Decision By:** Wednesday 16 September, 14:00 — decision owner: Anaïs Fournier

---

### 🔧 PRE-LAUNCH — Engineering & Product (T-2 weeks, by 3 Sept)
- [x] Feature flag `live_eta` created and tested in staging
- [x] All acceptance criteria signed off by PM (2 Sept)
- [x] Code reviewed and merged to main
- [x] QA sign-off completed — regression + prediction-display edge cases (stale data, port strikes)
- [x] Performance testing completed — ETA panel adds 110ms P95, within budget
- [x] Security review completed — TelemetryHub feed is read-only, no customer PII leaves Portside
- [x] Rollback procedure documented and **tested 10 Sept: flag off restores old ETAs in ~5 minutes**
- [x] Monitoring and alerting configured — prediction-staleness alarm at >4h, feed-outage pager
- [x] Error logging in place with correct severity levels
- [x] N/A — no database migrations in this release

### 📢 PRE-LAUNCH — Marketing & Comms (T-1 week, by 10 Sept)
- [x] Blog post written and reviewed — **accuracy claim ("4× more precise") held for legal wording**
- [x] In-app announcement configured behind the same flag
- [x] Email campaign drafted and QA'd (send gated on Go decision)
- [x] Social media posts drafted and scheduled
- [x] Add-on landing page live in staging
- [ ] **BLOCKED** — Press outreach (Tier 1): held until TelemetryHub attribution language clears legal
- [x] Community/forum post prepared (Tier 1)

### 🎓 PRE-LAUNCH — Sales & Support (T-1 week, by 10 Sept)
- [x] Sales enablement one-pager completed, including "what an ETA is not" (no SLA guarantee)
- [x] FAQ shared with sales and support
- [ ] **BLOCKED** — Help centre articles written but unpublished: legal (Dev Chandra) has not approved the accuracy-disclaimer wording — customers missing delivery SLAs because they trusted a prediction is the exposure
- [x] Support team demo completed 9 Sept (Omar Haddad)
- [x] CS briefed top 40 accounts; 12 already in the NDA'd beta
- [x] Pricing live in billing system — $450/mo add-on, 30-day trial
- [ ] **BLOCKED** — ToS addendum for licensed-data attribution: with legal, same review as above (due 18 Sept)

### 📊 PRE-LAUNCH — Analytics (T-1 week, by 10 Sept)
- [x] Events firing in staging: eta_viewed, eta_vs_actual_delta, addon_trial_started
- [x] Launch dashboard configured (Lena Vogt)
- [x] Baseline documented: 22% of shipment-detail views currently expand the ETA panel
- [x] Success criteria shared: 100 trial starts in 30 days; ETA panel engagement ≥35%; prediction MAE ≤8h in production
- [x] N/A — no A/B test; staged flag rollout instead

---

### ✅ GO / NO-GO DECISION — held Wednesday 16 September, 14:00

| Criteria | Status | Owner |
|---|---|---|
| All critical bugs resolved | 🟢 | Tomas Ruiz |
| QA sign-off complete | 🟢 | QA (via Tomas) |
| Rollback tested | 🟢 | Tomas Ruiz |
| Help centre articles live | 🔴 | Omar Haddad (blocked on legal) |
| Legal: disclaimer + ToS attribution approved | 🔴 | Dev Chandra |
| Monitoring active | 🟢 | Tomas Ruiz |
| PM sign-off | 🟢 | Anaïs Fournier |

**Go / No-Go Decision:** **NO-GO for 17 September public launch.** Two red criteria are legal-gated and cannot be waived — an unpublished disclaimer on a paid accuracy product is launch-blocking, not launch-adjacent.
**Revised plan:** flag stays at 10% (the NDA'd beta cohort, already covered by beta terms). Public launch re-gated to **Tuesday 22 September**, with a second Go/No-Go **Monday 21 September, 14:00** — same table, same owner. Dev Chandra committed legal review complete by 18 September.
**Decision Owner:** Anaïs Fournier (Tomas Ruiz consulted; not a joint or "team" decision)

---

### 🚀 LAUNCH DAY — Tuesday 22 September (post second Go/No-Go)
- [ ] Feature flag at 10% already (beta cohort) — expand to public 10% at 09:00
- [ ] Launch confirmed in #launch-live-eta
- [ ] Dashboard on the wall: staleness alarm, MAE, trial starts
- [ ] Error rate checked at T+15 min, T+1 hr, T+4 hr (Tomas)
- [ ] Blog post + email at 10:00, after T+15 check passes (Jess)
- [ ] Social posts live 10:30
- [ ] Support on standby first 4 hours (Omar)
- [ ] Anaïs reachable all day; no other meetings
- [ ] Expand to 50% if T+2hr checks pass (staleness <4h, no feed outages)
- [ ] Expand to 100% if T+4hr checks pass

---

### 📈 POST-LAUNCH
- [ ] D+7 (29 Sept): metrics review — trial starts, panel engagement, production MAE, ticket volume
- [ ] D+7: customer feedback synthesised from tickets + CS notes
- [ ] Retrospective **booked now for 1 October, 15:00** — includes why legal review started at T-1 week instead of T-4
- [ ] Learnings documented in the launch log
- [ ] D+30 (22 Oct): success metrics vs targets; pricing-page conversion reviewed
- [ ] Flag `live_eta` removed from codebase
- [ ] Follow-up backlog: air freight coverage, customer-facing MAE stat, webhook ETAs

## Why it's shaped this way

- **The tier was confirmed — and argued — before the checklist was generated**: the quality check makes tier the first gate ("scope determines depth"), and the anti-pattern cuts both ways; here the pressure was to *under*-tier a launch with pricing and legal exposure, so the rejection of "it's a data feed" is recorded in the tier line itself.
- **Friday 18 September died on contact with the rules** — the guideline "never launch on a Friday unless you have weekend engineering coverage" beat marketing's webinar alignment, and the checklist says so rather than quietly showing a Thursday date.
- **The Go/No-Go table shows two honest reds and produces a NO-GO** — a checklist whose gate always says GO is theatre; the revised plan keeps a named decision owner (Anaïs, not "PM + team") and a specific second decision time, per "the Go/No-Go decision has a named owner and a specific decision time."
- **The rollback line carries a tested number, not an intention** — "flag off restores old ETAs in ~5 minutes, tested 10 Sept" satisfies the guideline that revert time should be *known* before launch, and the quality check that rollback is "documented and tested (not just planned)."
- **Flag expansion is staged 10% → 50% → 100% with pass criteria attached to each step** — the quality check bans all-at-once expansion, and each expansion names the specific checks (staleness, feed outages) that authorise it.
- **The retrospective is booked at launch time with a date, time, and an agenda item** ("why legal started at T-1 week") — the anti-pattern forbids closing a launch with the retro unscheduled, and the agenda item turns this launch's failure mode into next launch's checklist change.
- **Blocked items say BLOCKED, name the blocker and the owner** — three items are visibly stuck on one legal review rather than checked off optimistically, which is exactly the information the Go/No-Go gate needs to function.
