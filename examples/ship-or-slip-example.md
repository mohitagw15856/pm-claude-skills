# Example: ship-or-slip

## What this skill does

Turns a release-readiness argument into one typed decision: ship, ship reduced, or slip, with a filled release state, a probability per option, an act-or-hold verdict against fixed thresholds, and the one fact that would flip it.

## How to trigger it

### Example 1: the Friday go/no-go

**You say:**
> "Should we ship Friday? State: one open bug (checkout retry shows a double-charge warning that's cosmetic, sev-2), tests green, rollback tested Tuesday, we promised the new checkout to two enterprise customers for Monday, the loyalty-points part could be cut."

**Claude produces (excerpt):**

### Ship or slip: checkout release · target Friday

**State**
| Field | Value |
|---|---|
| open_blockers | 1 sev-2 (cosmetic double-charge warning on retry) |
| test_status | green |
| rollback | tested (Tuesday, staging) |
| customer_commitments | 2 enterprise, Monday |
| scope_cuttable | loyalty points |

**Decision**
| Option | Probability |
|---|---|
| ship | 0.72 |
| ship_reduced | 0.18 |
| slip | 0.10 |

Confidence: 0.70 · Source: assistant estimate (labelled as such)

**Verdict:** **act: ship.** Confidence 0.70 ≥ 0.6 and ship at 0.72 ≥ 0.7; no sev-1, rollback tested, tests green. The residual risk is named: a cosmetic warning that *mentions charging* on a payments flow will generate support tickets; ship with the warning text fixed or a support macro ready.
**Flip fact:** whether the "cosmetic" warning ever accompanies an actual duplicate charge. Payments engineer can answer from logs by Thursday noon; if any real double charge exists, this becomes slip, not ship.
**Record line:** `[Fri] checkout → ship (p=0.72, conf=0.70) · overruled by: none`

### Example 2: a distribution that says hold

**You say:**
> "Rollback hasn't been re-tested since the schema change, and QA is 80% through regression. Same Friday date."

**Claude produces (excerpt):**

**Decision:** ship 0.38 / ship_reduced 0.22 / slip 0.40 · Confidence: 0.55

**Verdict:** **hold, closest: slip vs ship.** No option reaches 0.7 and confidence is under 0.6, so nobody should act on this automatically. The distribution is not a stalemate; it points at its own resolution: an untested rollback after a schema change is the 0.40.
**Flip fact:** one rollback rehearsal against the new schema. If it passes, ship climbs past 0.7; if it fails, Friday was never real. Cheapest single test in the whole state.

## Tips for best results

- Fill every state field honestly, including customer commitments; the options are fixed so the state is the argument.
- A 0.55/0.40 split is a hold with a question, not a mandate; ask what makes the 0.40.
- Keep the record line; a log of calls and overrules is how the process earns trust.

## Related skills

- `product-launch-checklist` for the readiness work before the call has to be made
- `schedule-monte-carlo` when the question is the date itself, not a single go/no-go
