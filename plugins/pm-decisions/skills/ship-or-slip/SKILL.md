---
name: ship-or-slip
description: "Turn a release-readiness argument into one typed decision — ship, ship reduced, or slip — with a defined state, defined options, and a probability for each. Use when asked should we ship Friday, are we ready to release, do we slip the date, go/no-go for the release, or when a launch checklist is done and someone still has to call it. Produces a filled release state, the three-way decision with probabilities and confidence, the act-or-hold verdict against the thresholds, and the one fact that would flip it."
version: 1.0.0
---

# Ship or Slip

A go/no-go meeting is a decision pretending to be a discussion. This skill makes the decision typed: the release state is written down in a fixed schema, the three possible answers are defined *before* anyone argues, and the output is a probability for each option, not a paragraph. A program can act on the result; a person can overrule it, on the record.

## Where this sits

After [`product-launch-checklist`](../product-launch-checklist/SKILL.md) and [`launch-readiness`](../launch-readiness/SKILL.md) have produced the evidence. Those skills gather; this one decides.

## What This Skill Produces

- **The release state** — the six fields below, filled from evidence, gaps marked `unknown`
- **The decision** — `ship` / `ship_reduced` / `slip`, with a probability for each option and a confidence score
- **Act or hold** — whether the decision clears the thresholds (act) or goes back to the release owner (hold), and why
- **The flip fact** — the single unknown that, if resolved, would change the answer
- **The record line** — one line for the release log: decision, probabilities, who overruled (if anyone)

## Required Inputs

Ask for these if not provided; never invent them:
- **release** — name and target date
- **open_blockers** — count and one line each: severity, owner, ETA
- **test_status** — pass rate, flaky count, when the last green build was
- **rollback** — tested or not, and time to roll back
- **customer_commitments** — who was promised what, by when
- **scope_cuttable** — what could be dropped without breaking the promise

## Framework: A Typed Decision

**The options are fixed, so the argument is about the state, not the answer.**

| Option | It applies when |
|---|---|
| `ship` | No open severity-1 blocker, rollback tested, tests green — the date holds and the residual risk is named |
| `ship_reduced` | The promised core is ready but a non-core item is red — ship without it and say so to whoever was promised it |
| `slip` | A severity-1 blocker, an untested rollback, or a red core path — the date moves, because slipping is cheaper than a bad release |

**Thresholds.** Act automatically only when confidence ≥ 0.6 *and* the winning option's probability ≥ 0.7. Otherwise **hold**: present the distribution to the release owner with the two closest options and the fact that separates them.

**How to get probabilities.** Any calibrated decision model that answers a defined multiple-choice question with a probability per option works — the contract is the state schema and the options above. The repo ships a ready adapter: `node integrations/jev/decide.mjs ship-or-slip --state state.json` (contract in `integrations/jev/decisions/ship-or-slip.json`). Without a model, the assistant estimates the distribution itself and **labels it as an estimate**.

**Reading the distribution.** 0.55 ship / 0.40 slip is not "ship". It is a hold with one question: what makes the 0.40? A distribution that moves when one field changes tells you which field to go verify.

## Output Format

### Ship or slip: [release] · target [date]

**State**
| Field | Value |
|---|---|
| open_blockers | … |
| test_status | … |
| rollback | … |
| customer_commitments | … |
| scope_cuttable | … |

**Decision**
| Option | Probability |
|---|---|
| ship | 0.xx |
| ship_reduced | 0.xx |
| slip | 0.xx |

Confidence: 0.xx · Source: [model name / assistant estimate]

**Verdict:** **[act: option]** or **[hold — closest: a vs b]**
**Flip fact:** [the one unknown; who can answer it by when]
**Record line:** `[date] [release] → [option] (p=0.xx, conf=0.xx) · overruled by: [none / name, reason]`

## Quality Checks
- [ ] Every state field is filled from evidence or marked `unknown` — no invented test numbers
- [ ] The three options are used exactly as defined; no fourth option invented mid-meeting
- [ ] Probabilities are shown for *all* options and sum to about 1
- [ ] The act/hold verdict cites the thresholds explicitly
- [ ] The flip fact names an owner and a time
- [ ] A hold result does not quietly become a ship

## Anti-Patterns
- **Deciding in prose** — "we feel good about it" is not a decision anyone can audit
- **Moving the options** — adding "ship dark" at the last minute to avoid a slip
- **Treating 0.55 as a yes** — a close call is a hold, by definition
- **Hiding the overrule** — a human may overrule; the record must say so
- **Letting the model own it** — the release owner owns the decision; the distribution is evidence

## Example Trigger Phrases
- "Should we ship on Friday or slip a week?"
- "Go/no-go for the 3.2 release — here's the state."
- "Two blockers open, rollback untested — call it."
