# Worked Example — Metrics Framework Skill

A gold-standard run of this skill: a marketplace metrics tree that demotes the number the exec team currently reports and pairs every optimisable metric with the way it will be gamed.

## The brief

Gearloop is a peer-to-peer marketplace for renting photo and film equipment — 60,000 registered renters, 9,000 gear owners, live in 12 metro areas. Stage: Growth. Business model: two-sided marketplace, 15% take rate. The exec team currently steers by monthly GMV, which grew 22% last quarter while renter complaints about last-minute owner cancellations also rose. Primary goal this quarter: increase repeat rentals. No framework preference stated; head of product asked PM Yuki Tanaka for "a metrics framework that stops GMV arguments."

## The output

### 1. Framework Recommendation

North Star + Metric Tree. A two-sided marketplace at growth stage needs one metric that both sides' health rolls into; AARRR alone tracks the renter funnel and goes blind on supply quality, which is exactly where Gearloop's cancellation problem lives. HEART is for UX-level questions, not business steering.

---

### 2. North Star Metric

**Successful Rental Days (SRD) per month:** the count of paid rental days from bookings that completed — gear handed over, returned, and no dispute opened within 7 days of return. A 3-day rental that ends well contributes 3; a booking cancelled by the owner contributes 0; a rental that ends in a damage dispute contributes 0 until the dispute resolves in favour of completion.

**Why this is the right North Star for this business:**
SRD counts value actually delivered to both sides — a renter got gear that showed up and worked, an owner got paid without drama. GMV, the current exec habit, is explicitly rejected as North Star: it is business activity, not customer value — it rises with price inflation, counts bookings that later cancel or end in disputes, and last quarter it grew 22% while the cancellation experience got worse. GMV stays on the exec dashboard as a financial outcome, but nothing in the tree optimises for it directly.

**How to measure it:** `SUM(rental_days)` over bookings with `status = completed` AND no dispute record opened within 7 days of the return date, computed monthly from the bookings and disputes tables.
**Current baseline:** [ADD BASELINE]
**Target:** [ADD TARGET]

---

### 3. Metric Tree

```
Successful Rental Days / month
├── Demand: renters who book and come back
│   ├── Search → booking-request conversion rate
│   └── Repeat-renter rate (90-day)
├── Supply: gear worth booking
│   ├── Active listings with availability in next 14 days
│   └── Owner acceptance rate within 12 hours
└── Trust: rentals that end well
    ├── Handover completion rate
    └── Dispute rate per 100 completed rentals
```

**Search → booking-request conversion rate**
- **Definition:** Sessions with ≥1 search that produce a booking request within 48h ÷ all sessions with ≥1 search, weekly.
- **Why it matters:** The widest controllable gate on new demand; every point of conversion compounds into SRD.
- **Leading or lagging?** Leading.
- **How to measure:** Event pipeline: `search_performed` → `booking_requested`, sessionised, 48h attribution window.

**Repeat-renter rate (90-day)**
- **Definition:** % of renters completing a rental in month M who complete another within 90 days.
- **Why it matters:** The quarter's stated goal, and the strongest signal the first rental delivered real value.
- **Leading or lagging?** Lagging — it confirms value after the fact; it does not predict next quarter. Honest label, resist relabelling it "leading" because it's the goal metric.
- **How to measure:** Cohorted query on completed bookings per renter ID.

**Active listings with availability in next 14 days**
- **Definition:** Listings with calendar availability marked within the next 14 days AND owner active (logged in or responded) in the last 30 days.
- **Why it matters:** Raw listing count is vanity; only bookable, attended supply converts demand into SRD.
- **Leading or lagging?** Leading.
- **How to measure:** Daily snapshot joining listings, calendars, and owner-activity tables.

**Owner acceptance rate within 12 hours**
- **Definition:** Booking requests accepted within 12h ÷ all booking requests, weekly.
- **Why it matters:** Slow or absent acceptance is the top renter-reported reason for abandoning a first booking; it gates both conversion and repeat behaviour.
- **Leading or lagging?** Leading.
- **How to measure:** Timestamp delta between `booking_requested` and `booking_accepted`.

**Handover completion rate**
- **Definition:** Accepted bookings where both parties confirm the in-app handover check-in ÷ all accepted bookings.
- **Why it matters:** The step where cancellations and no-shows destroy renter trust; every failed handover is an SRD of 0 and a likely lost repeat renter.
- **Leading or lagging?** Leading (predicts dispute rate and repeat rate).
- **How to measure:** `handover_confirmed` events (dual confirmation) ÷ accepted bookings.

**Dispute rate per 100 completed rentals**
- **Definition:** Disputes opened within 7 days of return ÷ completed rentals × 100, monthly.
- **Why it matters:** SRD's integrity check — it is the denominator condition of the North Star itself.
- **Leading or lagging?** Lagging.
- **How to measure:** Disputes table joined to completions.

---

### 4. Counter-Metrics

- **Owner-initiated cancellations within 24h of acceptance.** If teams push acceptance rate, owners learn to accept fast to protect their ranking and cancel later — the acceptance metric can be gamed into looking great while the renter experience worsens. This counter-metric catches exactly that move; the two must be reported side by side.
- **Contribution margin per completed rental.** The repeat-rental goal will tempt discount-driven reactivation campaigns; repeat rate bought with margin isn't retention, it's a subsidy. Watch margin whenever repeat-renter rate moves.
- **Stale-listing rate** (listings with no calendar update in 30 days ÷ all listings). Supply-growth pushes and bulk-upload tools inflate "active listings"; this catches ghost supply before it degrades search conversion.

---

### 5. Dashboard Recommendation

- **Exec view (weekly):** SRD, repeat-renter rate (90-day), dispute rate per 100, GMV, contribution margin per rental — outcomes only; GMV lives here as a financial mirror, not a target.
- **Team view (daily):** Search → request conversion, owner acceptance within 12h, listings with 14-day availability, handover completion rate, owner cancellations post-acceptance. Five metrics, deliberately capped — the marketplace team asked for eleven.
- **Diagnostic view (on demand):** Conversion by gear category and metro, time-to-first-owner-reply distribution, dispute reason taxonomy, renter cohort retention curves, supply/demand ratio by metro, cancellation reasons by owner tenure.

---

### 6. Metric Health Check Questions

1. Acceptance rate is up but post-acceptance cancellations are up too — are owners gaming the 12-hour clock rather than genuinely committing?
2. SRD is growing but repeat-renter rate is flat — are we acquiring one-off renters (event shoots) rather than building a habit, and is that fine or a ceiling?
3. Active listings grew but search conversion fell — did we add supply nobody wants (wrong categories, wrong metros), or ghost listings the stale-listing rate hasn't caught yet?
4. Dispute rate improved — did handover completion genuinely rise, or did we make disputes harder to file? Check dispute *starts* vs *submissions*.
5. GMV and SRD are diverging — is price inflation or dispute leakage driving the gap, and which team owns closing it?

## Why it's shaped this way

- **GMV is explicitly rejected as North Star and demoted to the exec view** — the anti-patterns forbid a North Star that "measures business activity (revenue, pageviews) rather than customer value delivered," and the brief's own tension (GMV up 22% while cancellations worsened) is used as the argument rather than smoothed over.
- **SRD's definition specifies its edge cases** (owner cancellation = 0, dispute window = 7 days) — the anti-pattern warns "an ambiguous metric will be measured differently by different people," so the definition settles the arguments before they happen.
- **The tree has three distinct drivers — demand, supply, trust** — per the quality check requiring "3–4 distinct drivers (not all one category)"; trust is a full driver because in a marketplace, rentals that end badly un-earn the North Star.
- **Repeat-renter rate and dispute rate are labelled lagging even though one is the quarter's goal** — the anti-pattern demands honesty about "which are lagging outcome metrics and which genuinely predict," and the note explicitly resists the temptation to relabel the goal metric as leading.
- **Every counter-metric is paired to the specific way its partner metric gets gamed** (accept-then-cancel, discount-bought retention, ghost listings) — the anti-pattern says optimising any single metric without a guardrail "will eventually produce perverse incentives," so each guardrail names the perverse move it exists to catch.
- **The daily team view holds at five metrics despite the team requesting eleven** — the anti-pattern caps the daily view at 4–5 because "a dashboard with 20 metrics is a dashboard nobody looks at"; the overflow lives in the diagnostic tier instead of being deleted.
- **Baseline and target are left as [ADD BASELINE] / [ADD TARGET] placeholders** — the Output Structure reserves those for the user, because a framework that invents a baseline gets trusted exactly once.
- **Health-check question 4 audits the metric system itself** ("did we make disputes harder to file?") — turning numbers into insights, per Section 6's purpose, includes asking whether an improvement is real or an artefact of measurement.
