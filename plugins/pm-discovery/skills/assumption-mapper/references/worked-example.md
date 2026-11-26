# Worked Example — Assumption Mapper

## The brief

Voltra Home sells smart home-battery systems — 18,400 installed units across 31 US states, spanning 41 electric utilities. PM Dana Okafor has written a PRD for **Battery Savings Autopilot**: the app automatically shifts battery charge and discharge around utility rate windows so customers save money without touching a setting. The CEO wants it announced at the September customer summit. The PRD budgets 2 engineers for 10 weeks and cites the GridFlow rate-data aggregator's claim of "80%+ US utility coverage." Head of engineering Priya Nair wants to skip a data audit and start the GridFlow integration next sprint. Stage: **pre-build**.

## The output

### Assumption Map: Battery Savings Autopilot

| Assumption | Category | Confidence | Impact | Priority | Validation Method |
|------------|----------|------------|--------|----------|-------------------|
| Machine-readable rate schedules exist for the utilities serving ≥80% of our installed base | Feasibility | 2 | 5 | 3 | Data audit: map all 18,400 accounts to their utilities, pull the top 15 utilities through the GridFlow sandbox, count parse failures (1 engineer-week spike) |
| Customers will let Autopilot dispatch their battery without per-event approval | Desirability | 2 | 5 | 3 | Fake-door "Enable Autopilot" toggle for 2,000 app users; measure opt-in rate, plus 5 behavioral interviews with customers who disabled storm mode |
| Autopilot savings are noticeable — ≥$12/month for a median time-of-use customer | Viability | 3 | 5 | 2 | Backtest the dispatch logic on 12 months of telemetry from 500 anonymized accounts (3 analyst-days, worst-case row filled) |
| Users can set an outage "reserve floor" correctly on the first try | Usability | 2 | 4 | 2 | Moderated prototype test (n=8) on the reserve-floor flow only |
| Daily automated cycling stays within warranty terms across our 3 battery hardware vendors | Feasibility | 3 | 5 | 2 | Desk check: legal + hardware team review all 3 warranty contracts (2 days) |
| Autopilot cuts, not creates, "why did my battery drain?" support tickets | Viability | 3 | 4 | 1 | Ticket taxonomy review now; ticket-rate comparison against a control cohort during beta |
| State regulators will not restrict automated residential dispatch within 18 months | Viability | 2 | 4 | 2 | None credible — flag as UNKNOWABLE; treat as a standing risk with quarterly policy monitoring owned by ops |
| Customers on flat-rate plans (~22% of base) will accept "Autopilot can't help you yet" | Desirability | 3 | 2 | -1 | In-app message test with the flat-rate segment; watch churn signal in NPS verbatims |
| Firmware command latency (<60s) is fast enough to hit rate-window boundaries | Feasibility | 4 | 3 | -1 | 1-day log review of existing storm-mode dispatch commands (already load-tested) |

#### Critical Assumptions (Impact 4+ and Confidence 2 or below)

- **Rate-data coverage (Feasibility, C2/I5).** The PRD's only evidence is GridFlow's marketing claim. A vendor's "80%+ coverage" is measured against *all* US utilities — Voltra's base skews toward municipal utilities and co-ops (34% of accounts), exactly the segment aggregators cover worst. Priya's plan to skip the audit and start integrating means we would discover coverage gaps in week 8, not week 1. The audit costs one engineer-week; being wrong costs the launch.
- **Automation trust (Desirability, C2/I5).** The team points to high storm-mode opt-in as proof customers trust automation — but storm mode *protects* the battery; Autopilot *spends* it. Different consent. Nobody has asked a customer whether they'll hand over daily dispatch.
- **Reserve-floor usability (Usability, C2/I4).** If users set the floor wrong, Autopilot drains the battery they were keeping for outages — the single fastest route to a trust-destroying incident and a support fire.
- **Regulatory drift (Viability, C2/I4) — UNKNOWABLE.** No test can settle what regulators do next year. Excluded from the validation queue; logged as a standing risk with a named owner and quarterly review instead.

#### Top 3 Assumptions to Validate First

1. **Rate-data coverage** — account-to-utility mapping plus GridFlow sandbox pull on the top 15 utilities. *Effort:* 1 engineer-week. *What the result changes:* below 70% coverage, we scope launch to the top 10 utilities and cut the "all customers" summit announcement; above 85%, integration proceeds as planned. Either way we stop arguing from a vendor brochure.
2. **Automation trust** — fake-door toggle to 2,000 users plus 5 behavioral interviews. *Effort:* 2 weeks, pre-committed threshold of ≥30% opt-in intent. *What the result changes:* whether Autopilot launches opt-out or opt-in, and whether the summit messaging leads with "hands-free" or with "you're always in control."
3. **Savings size** — telemetry backtest on 500 accounts. *Effort:* 3 analyst-days. *What the result changes:* if median savings land under $12/month, the viability case collapses and this becomes a "set-and-forget convenience" feature — which is a different PRD with a different price story, and the CEO should hear that before September, not after.

## Why it's shaped this way

- All four categories are populated, and the hardest digging went into Feasibility and Viability — the PRD read as a pure desirability document, and the Process step 4 re-read ("if a category is empty, re-read the brief looking for that type") is what surfaced the warranty and rate-data rows.
- Rate-data coverage stays at Confidence 2 despite the GridFlow claim — per the anti-pattern, an assumption doesn't earn high confidence just because nobody has challenged it; a vendor's aggregate claim has never been tested against Voltra's actual account mix.
- Only one validation method in nine is an interview — the anti-pattern forbids "user interviews" as the universal answer, so the map uses a data audit, a backtest, a desk check, a log review, and a fake-door where each fits.
- The regulatory assumption gets no fake test. The anti-pattern requires untestable assumptions to be flagged as unknowable and treated as risks — so it's in the critical list with an owner and a review cadence, but excluded from the validation queue.
- Negative priorities (flat-rate acceptance, firmware latency) are left visible rather than trimmed — the quality check demands consistent Impact − Confidence arithmetic, and low scores usefully tell the team where *not* to spend research budget.
- The CRITICAL flag is applied mechanically at Impact 4+/Confidence ≤2 — which catches automation trust even though the team believes storm-mode opt-in already proves it. The flag exists precisely for assumptions the team likes.
- Every top-3 recommendation states what the result would change, per the Output Structure — a test whose outcome changes no decision is a ritual, not validation.
