---
name: rma-failure-analysis
description: "Turn field returns into a structured failure-analysis report — RMA triage taxonomy (NTF vs real failures), Pareto by verified failure mode, 8D-style containment→root-cause→corrective-action structure, and cost-of-quality framing. Use when asked to analyse RMA data, investigate field returns, run failure analysis on returned units, write an 8D report, or figure out why return rates are climbing. Produces a failure-analysis report with a triage-clean Pareto, 8D actions, and the cost case for fixing each mode."
---

# RMA Failure Analysis Skill

Raw RMA data lies: it mixes buyer's remorse, user error, and shipping damage in with real design and manufacturing defects. This skill turns returns into decisions — triage first so the Pareto is of *verified* failure modes, run the top modes through 8D discipline (contain now, root-cause properly, correct permanently), and price each mode in cost-of-quality terms so the fix competes for resources on money, not anecdote.

## What This Skill Produces

- A triaged breakdown of returns using a standard RMA taxonomy
- A Pareto of verified failure modes with rates against units shipped
- An 8D-structured analysis for each top failure mode
- Cost-of-quality framing: cost per return, per mode, and the fix ROI
- Prioritised corrective actions with owners and cut-in points

## Required Inputs

Ask for these if not provided; analyse whatever slice exists, but state the denominator caveats plainly:

- **RMA records** — return reasons, dates, symptoms, any teardown/FA findings
- **Units shipped per period** — the denominator; return *counts* without it are useless
- **Product age mix** — manufacture date or batch, to separate infant mortality from wear-out
- **Cost inputs** — per-return logistics, refurb/scrap cost, support cost per case (estimate and label if unknown)
- **Known changes** — ECOs, factory or component changes that bracket the data in time

## Analysis Framework

**Step 1 — Triage taxonomy.** Bucket every return before any Pareto:

| Bucket | Meaning |
|---|---|
| NTF / CND | No trouble found — unit passes full test; count separately, it's a UX/expectation signal |
| CID | Customer-induced damage (drop, liquid) — a robustness signal, not a defect |
| OBF / DOA | Failed out of box — points at outgoing quality or transit |
| SW-resolvable | Fixed by update/reset — cheapest class to kill |
| Verified HW failure | Real defect, classified by subsystem and failure mode |
| Remorse / non-technical | Returned working — exclude from quality analysis, report separately |

**Step 2 — Pareto verified failures only**, by failure mode (not symptom — "won't charge" is a symptom; "USB connector solder crack" is a mode). Express each as % of units shipped in the exposed population, with the time window stated.

**Step 3 — 8D per top mode** (top 3–5 carry most of the cost): D1 team · D2 problem statement with data · D3 **containment** (screen stock, hold lots, factory rescreen — dated) · D4 root cause via evidence (teardown, cross-section, batch correlation), labelled `[verified]` or `[hypothesis]` · D5 corrective action chosen · D6 implementation with cut-in (ECO/date/serial break) · D7 recurrence prevention (test coverage, DFM rule, spec change) · D8 closure criteria (return rate for the mode falls to X by date Y).

**Step 4 — Cost of quality.** Cost per return = freight + refurb/scrap + support labour + replacement unit margin. Annualise per mode; compare fix cost vs failure cost; note warranty-accrual impact.

## Output Format

### RMA failure analysis: [product] — [period]

1. **Summary** — return rate vs target, headline modes, the one-paragraph verdict
2. **Triage breakdown** — table: bucket, count, % of returns, % of shipped
3. **Verified-failure Pareto** — mode, count, rate vs shipped, trend, batch correlation
4. **8D per top mode** — the eight disciplines, with D4 evidence labelled verified/hypothesis
5. **Cost of quality** — per-return cost, annualised per mode, fix ROI table
6. **Actions** — containment (now) and corrective (cut-in) with owners and dates
7. **Data caveats** — denominator gaps, lag effects, unteardown returns

## Quality Checks

- [ ] Every rate has a denominator and an exposure window — counts alone never appear
- [ ] NTF, CID, and remorse are separated out before the failure Pareto
- [ ] Pareto items are failure modes, not symptoms
- [ ] Every root cause is labelled `[verified]` or `[hypothesis]` with its evidence
- [ ] Containment actions are distinct from corrective actions, each dated and owned
- [ ] Cost of quality uses stated inputs; estimates are labelled as estimates

## Anti-Patterns

- [ ] Do not Pareto raw return reasons — triage first, or NTF and remorse will drown the real defects
- [ ] Do not report return counts without units shipped and the exposure window
- [ ] Do not close an 8D at D5 — a corrective action without cut-in verification and recurrence prevention is a wish
- [ ] Do not treat NTF as noise to discard — a high NTF rate is a product or support failure of its own
- [ ] Do not root-cause by vote — teardown evidence and batch correlation, or label it a hypothesis
- [ ] Do not compare return rates across cohorts with different time-in-field — young cohorts always look better

## Example Trigger Phrases

- "Analyse RMA data."
- "Investigate field returns."
- "Run failure analysis on returned units."
- "Write an 8D report."
- "Figure out why return rates are climbing."
