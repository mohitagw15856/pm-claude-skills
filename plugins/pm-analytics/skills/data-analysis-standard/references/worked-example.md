# Worked Example — Data Analysis Standard Skill

A gold-standard run of this skill: a three-week conversion slide traced to a single platform, a single funnel step, and a single app release — with the tempting wrong answer explicitly ruled out.

## The brief

Harvest Lane — a fictional UK online grocery delivery service — sees cart-to-order conversion slide from ~57.9% to 51.8% over three weeks in April. Two things shipped in the window: iOS app v8.2 (released 31 March, new card-vault SDK) and a delivery-fee A/B test (£2.49 → £3.49 variant, launched 6 April, 50/50 across all platforms). The Growth team is already blaming the fee test and wants it killed. The analytics lead, Femi Adeyemi, has platform-level funnel events, app-version tags, and support-ticket counts. Audience: Monday trading meeting (exec).

## The output

### Cart-to-Order Conversion Drop — 20 April 2026

**Question being answered:** Why did cart-to-order conversion fall ~6pp in the first three weeks of April, and is the delivery-fee test responsible?
**Time period:** Weeks commencing 30 Mar – 13 Apr 2026, vs a 4-week baseline ending 29 Mar
**Data source:** Checkout funnel events (app + web), app-version tags, Zendesk ticket taxonomy

**Finding:**
> The drop is not a general conversion problem and it is not the fee test. It is confined to iOS app v8.2, at the payment step, among returning customers with a saved card — consistent with the new card-vault SDK failing to load stored cards.

**Key chart / table:**

Conversion by platform (share-weighted; blended baseline 57.9% → 51.8%, −6.1pp):

| Platform | Share of cart sessions | Baseline conv. | w/c 13 Apr | Δ |
|---|---|---|---|---|
| iOS | 55% | 61.0% | 50.2% | −10.8pp |
| Android | 30% | 55.0% | 54.6% | −0.4pp |
| Web | 15% | 52.0% | 51.8% | −0.2pp |

iOS checkout funnel, w/c 13 Apr vs baseline (weekly volumes):

| Stage | Current | Baseline | Drop-off % (current) | Drop-off % (baseline) |
|---|---|---|---|---|
| Cart viewed | 100,000 | 100,000 | — | — |
| Delivery slot selected | 84,100 | 84,600 | 15.9% | 15.4% |
| Payment method confirmed | 58,900 | 71,400 | **30.0%** | **15.6%** |
| Order placed | 50,200 | 61,000 | 14.8% | 14.6% |

The entire iOS decline sits at one step: slot → payment drop-off has nearly doubled. Steps before and after are flat.

**Root cause:** Best explanation — iOS v8.2's card-vault migration is failing to surface saved cards, forcing manual re-entry that many customers abandon. Evidence:

1. **App version:** within iOS in w/c 13 Apr, v8.2 sessions convert at 47.4% vs 60.1% on v8.1-or-older (v8.2 is 78% of iOS sessions; weighted = 50.2%, matching the platform table).
2. **Saved-card segment:** iOS returning customers with a saved card fell 68.0% → 51.3% (−16.7pp); customers with no saved card are flat (48.6% → 48.2%).
3. **Support signal:** "my card disappeared" tickets up 4.1× (~70/wk → ~290/wk), starting 1 April — the day after the v8.2 release, five days before the fee test.
4. **Ruled out — delivery-fee test:** the test is 50/50 on all platforms, yet Android and Web are flat. Within Android, fee-variant vs control conversion differs by only 0.6pp. The decline also began w/c 30 Mar, before the test launched 6 Apr. Correlation of timing made the fee test the popular suspect; the segmentation kills it.

**Confidence level:** High that the drop is localised to the iOS v8.2 payment step (three independent cuts agree). Medium on the exact SDK failure mechanism — this is still a hypothesis until engineering reproduces it; we have correlation with the release, not an observed defect.

**Recommended action:**
1. **Immediate:** feature-flag rollback of the card-vault SDK on v8.2 — Priya Shah (payments eng lead), by 22 Apr. Impact of waiting: ~10,800 lost iOS orders/week ≈ £691k GMV (AOV £64), ~£90k contribution at 13% margin.
2. **Investigation:** engineering repro on accounts with pre-migration vault tokens; confirm whether failure is silent (card simply absent) or an error state — payments squad, by 24 Apr.
3. **Monitoring:** daily iOS slot→payment drop-off by app version; alert if any version exceeds 18% (baseline 15.6%). Keep the fee test running — it is currently unindicted and killing it now would destroy the read.

**What this analysis does NOT tell us:** We cannot see *why* the card fails to load (no session replay on the payment screen, for PCI reasons) — the mechanism is inferred. We also cannot yet say how much GMV is deferred rather than lost (some blocked iOS customers may reorder on web; a cross-device follow-up query is queued). Finally, Marketing's dashboard shows only a −2.1pp "conversion" drop because they define conversion as orders ÷ app opens — a different denominator, not a contradiction; the definitions need aligning before this goes in the exec pack.

## Why it's shaped this way

- **All four questions of the 4-Question Method are answered in order** — what changed (−6.1pp, stated window, stated baseline), why (v8.2 payment step), so what (£691k GMV/week), now what (rollback with owner and date). The skill is explicit: "a chart with no narrative is not an analysis."
- **The movement is never stated without its window and baseline** — "w/c 30 Mar – 13 Apr vs a 4-week baseline ending 29 Mar" — because the anti-patterns forbid reporting a metric movement without the time window and comparison baseline.
- **Segmentation runs before conclusions**: platform → app version → saved-card status, exactly the segmentation-check ladder in the Metric Triage Template. The aggregate −6.1pp masked a −10.8pp iOS problem sitting next to two flat platforms — the anti-pattern about aggregates hiding opposing sub-segments, in action.
- **The popular hypothesis (fee test) is explicitly ruled out with evidence, not ignored** — the triage template requires a "Ruling out" entry with the elimination reason. Cross-platform flatness plus the timing mismatch does that work.
- **Confidence is split, not blanket** — High on localisation, Medium on mechanism — because the anti-patterns say never overstate confidence and to label hypotheses clearly, naming what data (an engineering repro) would confirm them. Correlation with the release date is flagged as exactly that.
- **"What this analysis does NOT tell us" carries real caveats** — invisible mechanism, deferred-vs-lost GMV, and Marketing's conflicting definition — per the quality check that what the data cannot tell us is explicitly named. The definition clash is surfaced rather than silently picking one number.
- **Every recommended action has an owner and a date**, and the monitoring item has a numeric alert threshold — the quality checklist requires owner and timeline, and "watch conversion" without a trigger level is monitoring theatre.
