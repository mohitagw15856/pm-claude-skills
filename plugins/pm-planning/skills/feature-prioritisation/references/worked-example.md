# Worked Example — Feature Prioritisation

A gold-standard run of this skill: seven marketplace features RICE-scored against one conversion goal, with the CEO's pet feature ranked honestly, near-ties broken on risk, and every cut explained.

## The brief

Hearthly — a fictional two-sided marketplace connecting homeowners with vetted tradespeople — has 41,000 homeowners requesting quotes per quarter and 6,500 active tradespeople. Quote-to-booked conversion sits at 31%; the Q3 goal is 38%. Q2 analytics show quotes answered within 4 hours convert at 52% vs. 19% after 24 hours. Engineering capacity: ~14 person-months for the quarter. Seven candidate features are on the table, including an in-app materials-invoicing tool the CEO has championed twice in all-hands. PM Leah Okonkwo chooses RICE — reach and conversion data exist, and the team needs a defensible ranking, not a negotiation.

## The output

```markdown
### Feature Prioritisation — Hearthly Marketplace — July 7, 2026

**Framework Used:** RICE
**Scope:** Q3 2026 (≈14 person-months of engineering capacity)
**Goal being prioritised against:** Quote-to-booked conversion, 31% → 38% by end of Q3

| Feature | Reach | Impact | Confidence | Effort | RICE Score | Priority |
|---|---|---|---|---|---|---|
| Response-time badges on tradesperson search results | 41,000 | 0.5 | 80% | 1 | 16,400 | 1 |
| "Book again" rebooking flow for repeat homeowners | 22,000 | 1 | 80% | 2 | 8,800 | 2 |
| Photo-based instant quote estimator | 30,000 | 2 | 50% | 8 | 3,750 | 3 |
| Tradesperson calendar sync (external calendars) | 6,500 | 2 | 80% | 3 | 3,467 | 4 |
| Cancellation-fee protection for homeowners | 9,000 | 1 | 50% | 3 | 1,500 | 5 |
| Two-sided reviews rework | 15,000 | 0.5 | 80% | 5 | 1,200 | 6 |
| In-app materials invoicing for tradespeople | 2,100 | 1 | 50% | 4 | 263 | 7 |

**Recommended Build Order:**
1. **Response-time badges** — every searching homeowner sees them (full 41K reach); Q2 data directly links response speed to conversion (52% at <4h vs 19% at >24h); one person-month. The clearest quick win on the board.
2. **"Book again" rebooking flow** — repeat-eligible homeowners already trust their tradesperson; removing re-quote friction converts at near-certainty, and effort is modest.
3. **Tradesperson calendar sync** — ranked #4 by score but sequenced third: it beats the estimator on risk (see below) and compounds the badges — trades can only respond fast if their availability is accurate. Impact 2 is justified because double-booking declines are the #2 quote-death reason in Q2 funnel data.
4. **Photo quote estimator — 2-week discovery spike only, no build commitment.** Score #3, but see risk note.

**Similar scores, very different risk:** the estimator (3,750) and calendar sync (3,467) are near-tied. The estimator's score rests on 50% confidence and 8 person-months — more than half the quarter's capacity on our least-validated estimate. Calendar sync is 80% confidence, 3 person-months, proven pattern. When scores tie, spend goes to the lower-variance item; the estimator gets a spike to earn its confidence up before it can claim 8 person-months.

**Explicitly Deprioritised:**
- **In-app materials invoicing** — Reason: reach is 2,100 tradespeople (the subset billing materials through us) and its link to quote-to-booked conversion is indirect at best. **Named openly: this is the CEO's championed feature.** The framework score (263, last by 4.5×) is recorded separately from the final decision. If leadership overrides, the override and its rationale (e.g. supply-side retention, a different goal) should be documented — not laundered through inflated scores.
- **Cancellation-fee protection** — Reason: 50% confidence because we have no data on how often fee anxiety kills bookings; parked pending a funnel-survey question shipping in July. Revisit at mid-quarter.
- **Two-sided reviews rework** — Reason: worthy trust investment, wrong goal — its plausible impact is on long-term retention, not this quarter's conversion metric. Scoring it against a goal it doesn't serve would break the session's integrity; resubmit when the goal is retention.

**Assumptions Made:**
- Reach figures from Q2 analytics: 41K quote-requesting homeowners/quarter; 22K with a completed past job (rebooking-eligible); 30K submitting jobs with photos; 6,500 active trades.
- Impact anchors: 0.5 = measurable nudge on conversion; 1 = clear single-step improvement; 2 = removes a top-3 quote-death reason (per Q2 funnel analysis).
- Effort in person-months from engineering leads' planning-poker session July 3 — not PM estimates.
- Estimator confidence at 50%: pricing-accuracy risk untested; a bad instant quote could *lower* conversion by anchoring homeowners to wrong prices.
- Calendar sync reach counted as 6,500 trades, not the homeowners they serve — conservative choice; the score is understated if anything.
- Revisit this ranking at the mid-quarter checkpoint (August 18) or when the estimator spike reports.
```

## Why it's shaped this way

- **Every item is scored against one metric — and one item is ejected for not fitting it** — the quality checks demand every item scored "against the same goal or metric (not different goals per item)"; the reviews rework isn't scored low, it's removed with instructions to resubmit under a retention goal, which is the honest handling the anti-pattern requires.
- **The CEO's feature is ranked last, and the politics are named in writing** — the guidelines say when "stakeholder politics are influencing prioritisation, name it explicitly and suggest separating the framework score from the final decision"; the entry does exactly that, giving leadership a legitimate override path instead of tempting the PM to quietly inflate reach.
- **A near-tie is broken on risk, not on score** — the guidelines require flagging "when two features have similar scores but very different risk profiles"; 3,750 vs 3,467 is noise, but 50%-confidence-8-months vs 80%-confidence-3-months is signal, and the write-up shows the reasoning rather than silently reordering.
- **The moonshot gets a spike, not a slot** — committing 8 person-months on a 50% confidence estimate would bet half the quarter on the weakest number in the table; the spike converts "do not treat the output as final" into a concrete de-risking action with a report-back date.
- **Deprioritised items each carry a reason and a revisit trigger** — the anti-patterns insist "explicitly listing what was cut and why is as important as the ranked list"; cancellation protection is parked *pending a named data source*, not killed, so the list is revisitable when assumptions change.
- **Assumptions section makes the ranking auditable** — reach sources, impact anchors, and the July 3 engineering estimates are recorded because "assumptions change, and the list must be revisitable"; anyone re-running this in October can see exactly which inputs to refresh.
- **Effort comes from engineering, and the doc says so** — a one-line provenance note ("not PM estimates") pre-empts the classic RICE failure of optimistic PM-only effort figures skewing the entire ranking.
- **Top 3 and bottom 3 all get rationale** — the guidelines ban "a single-column ranked list without rationale"; the build order explains each pick and the deprioritised section explains each cut, so the table is evidence, not the argument itself.
