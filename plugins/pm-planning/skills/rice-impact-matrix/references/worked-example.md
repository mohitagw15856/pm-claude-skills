# Worked Example — RICE + Strategic Alignment

A gold-standard run of this skill: eight competing initiatives scored on both axes, with the highest raw RICE score flagged as a strategy conflict instead of being waved through — and the founder's pet project dropped by name.

## The brief

Pawcrate — a fictional subscription pet-supplies company (48,000 active subscribers, ~9,000 cancellation attempts per quarter) — is planning Q1 2027. Strategic priorities: **OKR-1 (top):** cut 90-day new-subscriber churn from 34% to 25%; **OKR-2:** grow add-on attach rate from 11% to 18%. Eight initiatives compete for roughly 10 person-months of feature capacity (6 engineers minus keep-the-lights-on). The list includes a one-off gift-box shop the growth team loves and an iOS delivery widget the founder keeps asking about. Reach and effort estimates came from analytics and the eng leads; two initiatives have never been validated with data.

## The output

```
# Priority Matrix — Q1 2027 — Pawcrate

**Strategic priorities (input):** OKR-1 (top): 90-day new-subscriber churn 34% → 25%.
OKR-2: add-on attach rate 11% → 18%.

**Scale note:** Reach is expressed in thousands of subscribers/quarter so RICE scores land
in the same order of magnitude as the strategic term (alignment × 10). With raw user
counts the alignment weighting becomes a rounding error and the "combined" score is just
RICE wearing a costume.

## Stage 1 + 2 workings

| Initiative | Reach (k/qtr) | Impact | Confidence | Effort (pm) | RICE | Alignment (OKR) |
|---|---|---|---|---|---|---|
| Flexible cadence controls (skip/pause/swap) | 42 | 2 | 80% | 4 | 16.8 | +3 (OKR-1) |
| Cancel-flow save offers | 9 | 3 | 80% | 2 | 10.8 | +3 (OKR-1) |
| Add-to-next-box marketplace | 38 | 2 | 80% | 6 | 10.1 | +2 (OKR-2) |
| One-off gift-box shop | 60 | 2 | 80% | 3 | 32.0 | −1 (contradicts subscription-first) |
| Personalisation quiz revamp | 25 | 1 | 50% ⚠ | 4 | 3.1 | +2 (OKR-1) |
| Delivery-date accuracy (warehouse slotting) | 42 | 1 | 80% | 8 | 4.2 | +2 (OKR-1) |
| Referral program v2 | 48 | 1 | 50% ⚠ | 5 | 4.8 | +1 (no current OKR) |
| iOS delivery widget (founder request) | 12 | 0.5 | 50% ⚠ | 3 | 1.0 | +1 (no current OKR) |

⚠ = 50% confidence: no supporting data yet. Nothing on this list carries 100% — no
estimate here has been validated to that standard.

## Priority Matrix

| Initiative | RICE Score | Strategic Alignment | Combined Score | Quadrant | Recommendation |
|------------|------------|--------------------|----------------|----------|----------------|
| Flexible cadence controls | 16.8 | +3 | 46.8 | Now | Build first-half Q1 (4 pm) |
| Cancel-flow save offers | 10.8 | +3 | 40.8 | Now | Build weeks 1–4 (2 pm) — fastest churn payback |
| Add-to-next-box marketplace | 10.1 | +2 | 30.1 | Now | Start mid-Q1; expect completion early Q2 (capacity) |
| Delivery-date accuracy | 4.2 | +2 | 24.2 | Later | Revisit Q2 with ops; 8 pm doesn't fit this quarter |
| Personalisation quiz revamp | 3.1 | +2 | 23.1 | Later | Run a 2-week data study first to lift 50% confidence |
| One-off gift-box shop | 32.0 | −1 | 22.0 | Next | ⚠ CONFLICT — hold for strategy conversation (below) |
| Referral program v2 | 4.8 | +1 | 14.8 | Drop | Remove from Q1 backlog; re-score in Q3 when the acquisition OKR lands |
| iOS delivery widget | 1.0 | +1 | 11.0 | Drop | Remove from backlog; revisit only if mobile engagement becomes a strategic priority |

**Capacity check:** the three "Now" items total 12 pm against ~10 pm of Q1 feature
capacity. Sequencing above reflects that: save offers and cadence controls complete
inside Q1; the marketplace is expected to land early Q2 rather than pretending all three
fit.

## ⚠ Conflict flag — requires a conversation, not a score

**One-off gift-box shop** is the highest raw RICE score on the board (32.0 — nearly double
the next item) and the only negative alignment. It monetises non-subscribers, which cuts
against the subscription-first strategy both OKRs serve. The combined score parks it at
#6, but a formula must not quietly bury the best RICE score in the portfolio. Decision
meeting with the founder and head of growth before Q2 planning; one reframe worth scoring:
"gift a 3-month subscription" — same demand signal, likely +2 alignment.

## Recommendations (top 5)

1. **Cancel-flow save offers** — 2 pm against the top OKR with 9k cancellation attempts a
   quarter to intercept; cheapest churn lever on the board, so it goes first.
2. **Flexible cadence controls** — the biggest aligned score; skip/pause is the #1 stated
   cancellation reason, and it compounds with the save offers (a pause is a save).
3. **Add-to-next-box marketplace** — the only OKR-2 mover in "Now"; started mid-quarter
   with the explicit expectation it completes early Q2 rather than descoping quality.
4. **Gift-box strategy conversation** — scheduled, with the reframe option on the table;
   the matrix structures this conversation, it does not replace it.
5. **Quiz revamp data study** — 2 weeks of analytics work to move confidence off 50%
   before any build; if the data is weak, it joins the Drop column in Q2 with evidence.
```

## Why it's shaped this way

- **Reach is normalised (thousands) and the choice is stated out loud** — with raw user counts, RICE lands in the tens of thousands and "alignment × 10" becomes decoration; the scale note keeps the combined formula honest, which is the whole point of blending "without cooking the books."
- **The gift-box shop is the star of the document, not a buried row** — the validate step demands flagging any initiative "where RICE score and strategic alignment conflict sharply"; the anti-patterns add "do not ignore the conflict flag," so the highest RICE score gets its own section, a named meeting, and a scoreable reframe rather than a silent #6 ranking.
- **Every alignment rating names its OKR** — the quality checks reject "feels strategic"; the referral program and widget get +1 not because they're bad ideas but because no current OKR claims them, and the referral row says exactly when that changes (Q3 acquisition OKR).
- **Both Drops are specific, and one has a name attached** — "low priority, deprioritise" is banned; the widget row records that it's the founder's request and states the condition under which it returns, which is what makes the Drop survivable in the room.
- **Nothing scores 100% confidence** — the anti-patterns forbid unvalidated 100%s; the three 50% rows are flagged with ⚠, and for the quiz revamp the *recommendation is the validation study itself*, not a build on a coin-flip estimate.
- **The "Now" quadrant is checked against actual capacity** — 12 pm of "Now" against 10 pm available is stated, and the marketplace's slip into early Q2 is planned rather than discovered; a matrix where every winner also magically fits the quarter is the "all initiatives in Now" anti-pattern in disguise.
- **The recommendations sequence by payback, not by combined score order** — save offers (rank #2) go before cadence controls (rank #1) because 2 pm against 9k quarterly cancellations is the fastest learning loop; the skill is explicit that the combined score structures the conversation and doesn't replace it.
