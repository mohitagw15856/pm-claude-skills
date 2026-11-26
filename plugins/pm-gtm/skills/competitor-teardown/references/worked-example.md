# Worked Example — Competitor Teardown Skill

## The brief

Northray makes a screenless recovery wearable (band + app, €249 hardware + €11.99/month) for serious amateur endurance athletes — 88,000 subscribers, €13.1M ARR, monthly churn 5.8%. Ahead of 2027 planning and a Series B narrative, the head of product commissions a detailed teardown of three competitors: **Pulsefirn** (the direct band-plus-subscription rival, fresh off an $80M raise), **Veloq** (a mass-market smartwatch maker whose Watch S now bundles free recovery scores), and **Restwell** (a software-only sleep app at €5.99/month). Primary use: internal strategy; secondary: investor deck. A known sensitivity: Northray's founder has said publicly and repeatedly that the product will "never gamify recovery" — and the churn data points somewhere awkward. Sources: competitor pricing/docs pages and trial accounts (captured June 2026), app-store data, and review-site synthesis; confidence labels applied throughout.

## The output

---

# Competitive Teardown: Northray vs Pulsefirn, Veloq, Restwell

**Prepared for:** 2027 strategy planning (secondary: Series B materials) | **Intel captured:** June 2026 — re-verify after two quarters

### 1. Competitive Landscape Overview

The recovery-tracking market is splitting into three camps: dedicated subscription wearables (Northray, Pulsefirn) selling depth and coaching to committed athletes; general-purpose smartwatches (Veloq) bundling "good-enough" recovery scores for free into hardware people already own; and software-only sleep/recovery apps (Restwell) harvesting the price-sensitive bottom of the market. The strategic pressure is asymmetric: Pulsefirn competes with us for the same 200k–400k serious-athlete niche in Europe, while Veloq erodes the *category's* willingness to pay a monthly fee at all. White space sits in prescriptive, sport-specific training guidance — everyone measures recovery; nobody yet closes the loop into "here is exactly what today's session should be", trusted enough that a coach would endorse it.

### 2. Positioning Map

**Axes:** *X — audience focus: casual wellness ↔ competitive performance. Y — product depth: raw metrics ↔ prescriptive guidance.* Chosen because price maps poorly here (Veloq's "free" is a bundling artefact), and these two axes are where buying decisions actually happen [assumed — validated against win/loss notes, n=31 exit interviews].

- **Veloq Watch S** — *casual / raw metrics*: recovery score is one number with a colour, no methodology exposed, aimed at the general fitness user [verified 2026-06 — trial device].
- **Restwell** — *casual / semi-prescriptive*: strong sleep-behaviour nudges, but no training-load side at all; it prescribes bedtime, not workouts [verified 2026-06 — trial account].
- **Pulsefirn** — *competitive / increasingly prescriptive*: shipped "Adaptive Training Plans" in April 2026 [verified — changelog]; execution quality is mixed per recurring 2–3★ reviews citing generic plan content [reported — G2/app-store synthesis, 40+ reviews].
- **Northray** — *competitive / raw-to-analytical*: deepest measurement stack (strain, HRV trend, sleep debt) but stops short of telling the athlete what to do with it — deliberately, per our "data not dopamine" philosophy.

**Strategic implication:** the prescriptive-competitive quadrant is being claimed by Pulsefirn while we hold the measurement high ground next door. Our position is defensible only if measurement depth converts into *trustworthy* guidance before their guidance becomes *good enough*. Uncomfortable but true: on this map, momentum is theirs.

### 3. Feature Comparison Table

| Feature / Capability | Northray | Pulsefirn | Veloq Watch S | Restwell | Strategic Notes |
|---|---|---|---|---|---|
| Continuous HRV (night) | ✅ [verified] | ✅ [verified] | 🟡 spot-checks [verified 2026-06] | ❌ (phone-sensor proxy) | Parity with Pulsefirn; our sampling rate is higher but no user-visible benefit yet |
| Recovery score with exposed methodology | ✅ [verified] | 🟡 score shown, method opaque [verified] | ❌ | 🟡 | Differentiator with coaches and data-literate athletes — lead with it |
| Prescriptive daily training recommendation | ❌ | ✅ shipped Apr 2026 [verified — changelog] | ❌ | ❌ | **The gap.** Their execution is weak [reported — recurring 2–3★ reviews] but the slot is theirs unless we move |
| Sport-specific load models (run/bike/swim) | ✅ [verified] | 🟡 run + bike only [verified — docs] | 🟡 | ❌ | Real edge for triathletes — niche but high-ARPU, low-churn segment [verified — cohort data] |
| Women's health / cycle-aware recovery | ❌ | ✅ [verified 2026-06] | ✅ | ✅ | We are the only player without it; recurring theme in our own churn interviews [verified — n=214 Q2 exits] |
| Coach / team dashboard | ✅ [verified] | 🟡 beta, invite-only [reported — community posts] | ❌ | ❌ | Moat candidate: 9% of subscribers are coach-attached and churn at 2.1%/mo vs 5.8% overall [verified] |
| Free tier / bundled offering | ❌ | ❌ | ✅ bundled with hardware | 🟡 limited free tier | Veloq resets price expectations for the whole category — threat to acquisition, not retention |
| Screenless form factor (no mid-activity distraction) | ✅ | ✅ | ❌ | n/a | Parity claim vs Pulsefirn; only differentiates against Veloq |
| Battery life 5+ days | ✅ 7d [verified] | 🟡 4d [verified — spec page] | ❌ 1.5d | n/a | Small but persistent review-driven win [reported — comparison threads] |
| Open API / data export | ✅ [verified] | 🟡 export only, no API [verified — docs] | 🟡 | ❌ | Underexploited: integration partners could deepen the coach moat |
| Native training-platform integrations | 🟡 2 platforms [verified] | ✅ 6 platforms [verified — integrations page] | ✅ | ❌ | They out-execute us on partnerships; visible in comparison content |
| Multi-language app (5+ languages) | 🟡 3 [verified] | ✅ 7 [verified] | ✅ | ✅ | Limits our DACH/Nordics expansion story before it starts |

### 4. Messaging Analysis

**Pulsefirn**
- **Their primary claim:** "Train exactly right, every day" — homepage hero, captured 2026-06 [verified]
- **Target audience signal:** ambitious amateurs with coaches or coach-envy; imagery is race-day and structured training blocks
- **Emotional hook:** aspiration ("your next PB is a plan away")
- **Gap or weakness in their messaging:** they promise prescription but hide methodology — "trust the black box" is fragile with exactly the data-literate athletes both of us court; their 2–3★ reviews already say the plans feel generic [reported]. The trust position is open, and it's ours to take.

**Veloq**
- **Their primary claim:** "Everything you are, on your wrist" — recovery is one bullet among thirty
- **Target audience signal:** mainstream fitness and lifestyle buyers; recovery is a checkbox feature, not the story
- **Emotional hook:** simplicity and belonging (one device for everything)
- **Gap or weakness in their messaging:** no credibility with serious athletes — no methodology, no sport depth. They don't want our niche; the danger is ambient ("why pay monthly when the watch does it free?"), which is a *sales objection* to arm against, not a positioning battle to fight.

**Restwell**
- **Their primary claim:** "Wake up ready" — sleep-first, hardware-free
- **Target audience signal:** wellness-curious professionals; price-led comparisons
- **Emotional hook:** ease (no device, €5.99, start tonight)
- **Gap or weakness in their messaging:** nothing to say about training. Irrelevant head-to-head, but a warning: they normalise a €5.99 anchor for "recovery insights" that shows up in our price-objection notes [reported — sales call synthesis].

### 5. SWOT Summary

- **Strengths:** deepest and most transparent measurement stack (exposed methodology is cited in 41% of our 5★ reviews [verified]); coach dashboard with demonstrably sticky cohort (2.1%/mo churn); 7-day battery and screenless focus.
- **Weaknesses:** monthly churn of 5.8% vs Pulsefirn's reported ~3.9% [reported — their Series C coverage; treat as directional]; no women's health features despite it being a top-3 churn-interview theme [verified]; no prescriptive layer while the market moves prescriptive; 3 app languages caps EU expansion.
- **Opportunities:** own the "trustworthy guidance" position before Pulsefirn's black-box plans improve; weaponise the coach channel (open API + team dashboard) as a distribution moat; cycle-aware recovery as both product gap-fill and churn fix.
- **Threats:** Pulsefirn's $80M war chest funds the integration and language gaps we currently exploit [verified — funding announcement]; Veloq's free bundling erodes category willingness-to-pay at the acquisition top-of-funnel; our "measurement, not guidance" stance reads increasingly as "incomplete product" in comparison content [reported — two influential review sites, June 2026].

### 6. Strategic Recommendations

1. **Given** Pulsefirn shipped prescriptive plans with opaque methodology and mixed reviews, **Northray should** ship guidance that *shows its work* — recommendation plus the "because" drawn from our exposed models, co-signed by coach partners — **to** take the trust-based guidance position while it is still unoccupied.
2. **Given** coach-attached subscribers churn at 2.1% vs 5.8%, **Northray should** make the coach dashboard and open API the centre of 2027 acquisition (coach referral programme, 2 more platform integrations by Q2) **to** grow the stickiest cohort rather than buying churny direct subscribers.
3. **Given** cycle-aware recovery is a top-3 churn-interview theme and we are the only player without it, **Northray should** ship it in H1 2027 **to** close a retention leak that competitors already market against us.
4. **Given** week-3-to-6 drop-off drives roughly half of early churn [verified — cohort data], **Northray should** pilot habit-anchored engagement mechanics (training-consistency streaks, weekly recovery digests). *Flagged honestly: this sits in visible tension with our founder's public "we will never gamify recovery" commitments, which have real brand value with our core users. The pilot should be framed — internally and externally — as consistency support rather than gamification, run opt-in behind a flag, and taken to the founder with the cohort data before any public positioning move. If the data doesn't clear that bar, we drop it; a public U-turn is worth paying for only with a large, proven retention effect.*
5. **Given** Veloq resets price expectations rather than competing for our niche, **Northray should** arm sales and lifecycle comms with a "free score vs recovery system" objection-handling narrative **to** defend acquisition conversion without being dragged into a feature war we don't need to fight.

---

## Why it's shaped this way

- **The positioning map does not flatter us.** Northray sits *next to* the winning quadrant, not in it, and the implication says "momentum is theirs" out loud — because the Anti-Patterns forbid placing the user's product in the most favourable quadrant without justification, and a self-serving map "provides no strategic value". The axes are market-specific (wellness↔performance, metrics↔guidance) rather than the lazy price/quality default, per the Quality Check on meaningful axes.
- **Every substantive claim carries a confidence label** — [verified] with capture dates, [reported] with the source named, [assumed] where it's inference — applying `references/intel-sourcing-guide.md`'s discipline. Pulsefirn's ~3.9% churn is explicitly downgraded to "directional" because it comes from funding-round press, which the guide classifies as the competitor's messaging with a byline.
- **Feature parity is never treated as quality parity.** Pulsefirn "has" prescriptive plans (✅) *and* the strategic note records that execution is weak per 2–3★ review synthesis — exactly the Anti-Pattern about equivalent checkmarks hiding meaningful quality differences, and exactly the fact recommendation #1 is built on.
- **The SWOT's weaknesses are the sharpest numbers in the document** (5.8% vs 3.9%, top-3 churn theme, 3 languages) because the Quality Checks demand weaknesses and threats "not be softened" — and because this doc feeds a Series B deck, where a discovered soft spot costs more than a disclosed one.
- **Recommendation #4 handles the political landmine diplomatically but doesn't bury it.** The founder's anti-gamification stance is named as a brand asset with real value, the pilot is scoped to be reversible (opt-in, flagged, reframed as "consistency support"), and the kill condition is explicit. Omitting it would sanitise the analysis; stating it without the framing would get the document — not the idea — rejected.
- **Every recommendation is in the Given/should/to format with a falsifiable action** ("2 more platform integrations by Q2", "ship in H1 2027"), not generic strategy advice — the Quality Check requires specific and actionable, and #5 even recommends *not* fighting, which is a decision, not a hedge.
- **Veloq is analysed as a category threat, not a rival** — the messaging section explicitly routes it to sales enablement rather than positioning. Treating every competitor as the same kind of threat is how teardowns turn into feature-war shopping lists.
- **The intel is dated ("captured June 2026, re-verify after two quarters")** because undated competitive facts rot; the document tells its future reader when to stop trusting it.
