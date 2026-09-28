# Worked Example — Stakeholder Update

A gold-standard run of this skill: a mixed week on a route-optimization rollout — costs improving, service quality slipping — reported to the exec team in one honest, BLUF-led page.

## The brief

**Parcelport Logistics** (fictional) runs last-mile delivery from 11 urban depots. The Atlas route-optimization engine is live in 3 pilot depots, 8 weeks into a 6-month rollout. Cost per drop is down 9% in pilot depots — but failed-first-delivery attempts have climbed from 5.1% to 6.8%, and driver interviews suggest the tighter ETAs are pushing drivers to skip doorstep protocol. Meanwhile the geocoding vendor has quoted a 40% price increase at renewal (contract lapses in 6 weeks). The PM, Leah Osei, writes the weekly update for the COO and exec team. Status call: 🟡. A decision on rollout pace is needed this week.

## The output

```
# Atlas Rollout — Weekly Update
**Week of July 6 · Leah Osei · Audience: COO + exec team**

## BLUF
**Status**: 🟡 At Risk
**Key Takeaway**: Atlas is delivering the cost win (–9% cost per drop in pilot depots)
but failed first deliveries are up 5.1% → 6.8%; the routing is faster than our
doorstep protocol allows. Expansion to depots 4–6 should hold for 2 weeks while we
ship the ETA-buffer fix.
**Action Needed**: (1) Approve 2-week hold on depot 4–6 expansion — decision this
week to re-sequence driver training. (2) Geocoding vendor renewal decision needed by
Aug 1 (options below).

## Progress Summary
- Cost per drop in pilot depots hit £2.41, best 4-week figure on record; annualised
  ~£1.9M at 11-depot scale
- Root cause of failed-delivery rise isolated: Atlas ETAs assume 45s per stop; doorstep
  protocol (photo + 2-knock wait) takes 70–90s — drivers are skipping protocol to keep
  pace, confirmed in 14 of 18 driver interviews
- ETA-buffer fix scoped and in build; ships to pilot depots July 17
- Depot 4–6 driver training was due to start Monday — this is what forces the pace
  decision now

## Key Metrics
| Metric | Current | Target | Trend | Status |
|--------|---------|--------|-------|--------|
| Cost per drop (pilot depots) | £2.41 | £2.30 | ↓ | 🟢 |
| Stops per route-hour | 11.8 | 12.5 | ↑ | 🟡 |
| Failed first delivery | 6.8% | ≤5.5% | ↑ | 🔴 |
| Driver monthly churn (pilot) | 7.2% | ≤6.0% | → | 🟡 |

## Risks & Blockers

**HIGH: Failed-delivery rate degrading customer experience**
- **Impact**: each failed first attempt costs ~£3.10 in redelivery — at current rates
  it consumes roughly a third of Atlas's cost win, and two retail clients have
  flagged complaint upticks
- **Mitigation**: ETA-buffer fix live in pilots July 17; doorstep-protocol time
  becomes a routing input, not a driver problem. Success = back under 5.5% within
  2 weeks of the fix
- **Help Needed**: none beyond the expansion-hold decision below

**MEDIUM: Geocoding vendor renewal (+40% quoted)**
- **Impact**: contract lapses Aug 15; without renewal or migration, Atlas loses
  address precision in exactly the dense urban areas where it earns its keep
- **Mitigation**: engineering spike on migrating to our warehouse-system provider's
  geocoder ran last week — viable, but 10 engineer-weeks and a quality regression
  risk in the two hardest metros
- **Help Needed**: COO decision by Aug 1 (options in Decisions Needed)

## Upcoming Milestones
**Next 30 Days:**
- ETA-buffer fix live in pilot depots (Jul 17)
- Failed-delivery rate back ≤5.5% in pilots (target Jul 31)
- Depot 4–6 go/no-go review (Jul 28, assuming hold approved)

**Next 90 Days:**
- Depots 4–6 live (Aug), depots 7–9 (Sep)
- Geocoding decision executed — renewal signed or migration started (Aug)
- Full-network business case refresh with real failed-delivery costs (Sep)

## Decisions Needed

**1. Hold depot 4–6 expansion for 2 weeks? — needed this week**
- **Option A: Hold 2 weeks (recommended)** — expand with the fix proven, not
  promised. Cost: ~£70K of deferred savings. Avoids training 90 drivers on routing
  behaviour we're about to change.
- **Option B: Expand on schedule** — protects the Q3 savings number, but scales a
  known service regression to 3 more depots and two national retail clients.
- **Recommendation**: Option A. We keep the cost story credible by not exporting the
  service problem. Re-baselined expansion still completes the 11-depot rollout in Q4.

**2. Geocoding vendor: renew at +40% or migrate? — needed by Aug 1**
- **Option A: Renew 12 months (+£96K/yr, recommended)** — buys a year to migrate
  properly; negotiate with the migration spike as leverage.
- **Option B: Migrate now** — saves the uplift but puts 10 engineer-weeks on the
  critical path of the rollout and risks address quality mid-expansion.
- **Recommendation**: Option A, with a termination-for-convenience clause and a
  funded migration track targeting next renewal.

---
**Questions?** Reply here or find me on the ops channel.
```

## Why it's shaped this way

- **The bad news is the second clause of the BLUF, not paragraph four** — the anti-patterns forbid burying the status assessment; the takeaway pairs the win and the regression in one sentence so no reader can leave with half the story.
- **The status is 🟡 even though the headline metric is beating target** — the deeper-materials guide exists for exactly this "watermelon" temptation (green outside, red inside); a 🔴 service metric plus an unresolved vendor blocker makes 🟢 dishonest, and the update says why rather than hiding behind the emoji.
- **Every metric row carries target, trend, and status** — the quality checks require "a target comparison (not just a raw number)"; the failed-delivery row is allowed to be 🔴 in an otherwise-positive update because that's what makes the other rows believable.
- **The failed-delivery risk is quantified against the win it erodes** — "~£3.10 per redelivery… roughly a third of Atlas's cost win" follows "connect metrics to business outcomes"; execs can now weigh the trade instead of sensing a vibe.
- **Both decisions come with two costed options and a recommendation** — the anti-patterns ban "decisions needed as questions without a clear recommendation"; each also states *when* it's needed and what forces the timing (driver training on Monday, contract lapse Aug 15).
- **Root cause is stated as fact with its evidence, not as blame** — "Atlas ETAs assume 45s per stop; protocol takes 70–90s, confirmed in 14 of 18 driver interviews" leads with conclusions per the writing guidelines, and frames drivers skipping protocol as a routing input problem, which is what makes the fix credible.
- **It fits on one page** — progress is 4 bullets, metrics are 4 rows, risks are 2; the anti-patterns are explicit that if it needs more than a page "the message needs editing, not expanding".
