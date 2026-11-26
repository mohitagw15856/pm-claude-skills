# Worked Example — OKR Builder

A gold-standard run of this skill: a head of product's rough goal notes turned into a scored, baselined OKR set — with the output-shaped and uncontrollable goals refused on the record.

## The brief

Gridhaven — a fictional B2B software company that manages depot charging for commercial EV fleets — is setting Q1 2027 OKRs for its 12-person product org (three squads). North Star: managed kWh delivered per month, currently 8.2 GWh across 140 depot customers. The head of product's notes read: "ship scheduling v2, fix mid-market churn (5.1%/quarter vs 1.8% enterprise), get drivers using the app, and the VP Sales wants a KR for signing 25 utility partnerships." Two of the numbers the team wants to target have never been instrumented. Mid-market is 61% of ARR.

## The output

```
# Q1 2027 OKRs — Gridhaven Product Org

**North Star:** Managed kWh delivered per month (currently 8.2 GWh)

---

**Objective 1: Make managed charging the default, not the exception, at every live depot**

*Why this matters:* 41% of connected chargers still run "plug in and pray" — unmanaged
sessions that erode the energy-cost savings we sell and cap the North Star. Scheduling v2
ships in service of this objective; shipping it is not the goal, adoption is.

| # | Key Result | Baseline | Target | Measurement Method |
|---|---|---|---|---|
| KR1 | Share of connected chargers running managed schedules | 59% | 80% | Platform telemetry, weekly snapshot |
| KR2 | Managed kWh delivered per month | 8.2 GWh | 11.5 GWh | Billing pipeline (North Star metric) |
| KR3 | Utility tariff coverage across customer depots | 61% | 90% | Tariff database coverage report |
| KR4 | *Guardrail:* depot-reported charge-failure rate | 1.4% | ≤ 1.5% | Support tickets tagged charge-failure ÷ active depots |

*Owner:* Priya Raman (GPM, Charging)
*Check-in cadence:* Weekly

---

**Objective 2: Mid-market fleets renew because leaving would hurt**

*Why this matters:* 20–100-vehicle fleets are 61% of ARR but churn at 5.1%/quarter against
1.8% for enterprise. The squad proposed a 4.5% target — that is last quarter's trendline
continuing, i.e. sandbagging. Target is set at 3.0% so that a 0.7 score (~3.6%) is still a
genuinely good quarter.

| # | Key Result | Baseline | Target | Measurement Method |
|---|---|---|---|---|
| KR1 | Quarterly gross logo churn, 20–100-vehicle fleets | 5.1% | 3.0% | CRM renewal records |
| KR2 | Mid-market accounts active on ≥ 2 modules | 34% *(assumed — confirm)* | 55% | Product analytics module-usage query |
| KR3 | Days from depot go-live to first savings report | 45 | 14 | Onboarding pipeline timestamps |

*Owner:* Marco Deng (PM, Fleet Success)
*Check-in cadence:* Weekly

---

**Objective 3: Drivers trust the app enough to stop calling dispatch**

*Why this matters:* Every charge-status call to dispatch is a driver who doesn't trust the
app — and dispatch headcount is our customers' cost, not ours, which is why it shows up in
churn interviews.

| # | Key Result | Baseline | Target | Measurement Method |
|---|---|---|---|---|
| KR1 | Weekly active drivers ÷ eligible drivers | 22% | 45% | App analytics joined to fleet rosters |
| KR2 | Dispatch calls about charge status per 100 vehicles/week | 19 *(assumed — confirm)* | 8 | Sampled dispatch logs from 12 reference fleets |

*Owner:* Sofia Alvarez (PM, Driver Experience)
*Check-in cadence:* Weekly

---

## What we reframed or refused

- **"Ship scheduling v2"** — task masquerading as a KR. Rewritten as the adoption outcomes
  it exists to produce (O1 KR1/KR2). If v2 ships and unmanaged sessions stay at 41%, the
  quarter failed.
- **"Sign 25 utility partnerships" (VP Sales)** — outside the product org's control; a
  quarter of great product work could score 0.0 on it. The product-controllable slice is
  O1 KR3 (tariff coverage). The partnership count belongs in the sales org's OKRs.
- **Driver app-store rating** — vanity metric; replaced with dispatch-call volume, which is
  the pain driver behaviour actually reveals.

## Health check — baselines

- **O2 KR2 (module adoption, 34%)** — assumed from a one-off March query; re-run and
  confirm by Jan 16 or the KR cannot be scored honestly.
- **O3 KR2 (19 calls/100 vehicles)** — assumed from three fleets' anecdotal logs;
  instrument sampling across the 12 reference fleets by end of week 2, or replace the KR.
- All other KRs have live data sources today.

## Scoring guide (quarter end)

Score each KR 0.0–1.0. 0.7–1.0 = excellent — 0.7 is the sweet spot; a clean sweep of 1.0s
means we sandbagged. 0.4–0.6 = progress but missed. 0.0–0.3 = missed; bring to the retro.
OKRs are not performance reviews: O2 KR1 landing at 3.6% churn is a 0.7 and a good quarter.
```

## Why it's shaped this way

- **Both output-shaped goals are refused on the record, not silently rewritten** — the anti-patterns say any KR phrased as "launch X" must be "rewritten as an outcome with a baseline and target"; the "What we reframed or refused" section shows the rewrite *and* the reasoning, so the head of product and VP Sales see why their wording didn't survive.
- **The sales partnership KR fails the control test and is sent back** — the KR test asks "is it within the team's control?"; tariff coverage is the product-controllable slice of the same ambition, so the objective keeps the strategic intent without owning someone else's number.
- **Two baselines are marked *(assumed — confirm)* instead of blanks or invented facts** — the working-from-a-brief rule says a "clearly-labelled assumed baseline … is always better than a blank"; both then reappear in the health check with a deadline to instrument, because "OKRs without current baselines cannot be scored objectively at quarter end."
- **The sandbagging debate is preserved inside Objective 2's context** — the squad's 4.5% proposal was the trendline, not a stretch; naming that in *Why this matters* pre-commits the team to reading a 0.7 score (~3.6%) as success, which is what "aim for 70% attainment" means in practice.
- **O1 carries an explicit guardrail KR** — pushing managed-schedule adoption from 59% to 80% is exactly the kind of aggressive rollout that strands vehicles; the charge-failure ceiling makes "don't break depots while scaling" scoreable rather than assumed.
- **Three objectives, and no objective exceeds four KRs** — the guidelines cap focus at 3 objectives and the anti-patterns at 4 KRs each ("too many KRs dilute focus and make scoring ambiguous"); the driver objective stops at two KRs rather than padding with a vanity third.
- **Every objective ladders visibly to the North Star** — managed kWh appears as O1 KR2 outright, and churn/adoption KRs are framed by ARR and churn-interview evidence, so nobody can ask "why is this the quarter's bet?" without the answer already on the page.
- **The scoring guide is written into the artifact, not left to quarter end** — pre-committing that 1.0-across-the-board means sandbagging removes the argument later, and the 0.0–0.3 band routes to a retro rather than blame, per "OKRs are not performance reviews."
