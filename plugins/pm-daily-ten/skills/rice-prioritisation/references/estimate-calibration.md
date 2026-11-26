# Calibrating RICE Estimates

RICE rankings are only as honest as the four numbers behind them. This is the calibration to apply — and to challenge the user's inputs against — before computing scores.

## Reach — anchor to a system of record

- **Good sources, in order:** analytics for the actual flow → analytics for the nearest flow → support-ticket / sales-request counts → comparable past launches. Only then a reasoned guess, labelled as one.
- **The reach question is "who hits this per quarter", not "who could".** Total addressable users is a marketing number; RICE reach is the users who pass through the touched surface in the planning period.
- **Common inflation:** counting all users of the product for a feature only a segment uses. Force the segment: "of our 40k MAU, 6k use exports; this changes exports."

## Impact — the scale means something

The 3 / 2 / 1 / 0.5 / 0.25 scale drifts toward the top unless anchored:

| Score | Reserve it for | Example |
|---|---|---|
| 3 (massive) | Users change their behaviour or a top-line metric visibly moves | removes the #1 onboarding drop-off step |
| 2 (high) | Clearly noticeable improvement to the primary metric for affected users | halves time-to-first-report |
| 1 (medium) | Real but partial improvement | better defaults; fewer clicks in a common flow |
| 0.5 (low) | Users would notice if you pointed it at them | polish, minor speedups |
| 0.25 (minimal) | Hygiene; nobody's behaviour changes | copy fixes, edge-case handling |

**Rule of thumb:** in a backlog of 10+, at most one or two items deserve a 3. If more than a third of the list scores ≥2, re-anchor and rescore — the framework has stopped discriminating.

## Confidence — the honesty dial

Confidence exists to discount the other two estimates. Map it to *evidence*, not mood:

- **100%** — R and I both come from measured data or a directly comparable shipped feature.
- **80%** — one of R/I is measured, the other is a structured estimate.
- **50%** — plausible reasoning, no data. This is the correct default for most new ideas.
- **Below 50%** — a bet. Fine to keep in the table, but flag it: the right next step is usually a cheap validation (see `assumption-mapper`), not a build.

Never let confidence rescue a pet project ("low reach, low impact, but 100% confident!") — it multiplies, it doesn't add.

## Effort — get engineering's number

- Person-months **across all functions** (eng + design + PM + QA + rollout), not just engineering.
- PM-solo estimates run optimistic by 2-3× on anything touching infrastructure, migrations, or third parties. If engineering hasn't seen the estimate, cap confidence at 80% and say why.
- Keep granularity coarse — 0.5, 1, 2, 3, 5, 8 person-months. False precision ("2.25pm") signals invented numbers.

## Cross-checks before accepting the ranking

1. **Surprise test** — if the team wouldn't have picked the top item, find the inflated estimate before trusting the maths.
2. **Sensitivity test** — for the top 3, would a one-step impact downgrade or a 2× effort bump change the order? If yes, the ranking is fragile there; note it.
3. **Same-score clusters** — items within ~15% of each other are tied. Sequence ties by dependency and strategy, and say that's what you did.
