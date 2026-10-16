---
name: supplier-scorecard
description: "Build a quarterly supplier performance scorecard with a weighted grade and a clear escalate/develop/exit call. Use when asked to review supplier performance, prepare a quarterly business review for a vendor, score a supplier on OTIF and quality, or decide whether to escalate or exit a supplier. Produces a weighted scorecard with trend arrows, per-dimension evidence, corrective-action status, and a recommendation."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/supplier-scorecard.html
metadata:
  {
    "openclaw": { "emoji": "📦" }
  }
---

# Supplier Scorecard Skill

A supplier review that ends with "keep monitoring" is a meeting, not a decision. This skill turns delivery, quality, responsiveness, and cost data into a weighted quarterly grade with trend direction — and forces one of three outcomes: escalate, develop, or exit. It also audits whether last quarter's corrective actions actually closed, because a supplier who commits and doesn't deliver is telling you something.

## What This Skill Produces

- A weighted performance grade (0–100) across five dimensions with trend arrows vs. prior quarters
- Per-dimension evidence: OTIF %, PPM/defect rate, response metrics, cost behavior
- Corrective-action follow-through audit (committed vs. closed)
- A classification — Preferred / Approved / Conditional / Exit-candidate — and a recommended action path
- Talking points for the supplier business review

## Required Inputs

Ask for these if not provided:
- **Supplier & spend** — name, category, annual spend, share of category, single/dual-sourced
- **Delivery data** — OTIF % (on-time in-full) for the quarter, plus 2–3 prior quarters for trend
- **Quality data** — PPM or defect rate, customer complaints traced to this supplier, any stop-ships
- **Responsiveness** — quote turnaround, engineering-change response, escalation behavior
- **Cost behavior** — price changes vs. market/index, cost-reduction commitments delivered
- **Open corrective actions** — CAPAs/SCARs from prior reviews and their status

If history is missing, score the current quarter and label trends `[no baseline — first scored quarter]`. Infer reasonable dimension detail from a thin brief and label it `[inferred]`.

## Scoring Framework

**Default weights** (adjust for category — e.g., quality-critical items shift quality to 35%):

| Dimension | Weight | 5 (excellent) | 3 (acceptable) | 1 (failing) |
|---|---|---|---|---|
| Delivery (OTIF) | 30% | ≥98% | 93–95% | <90% |
| Quality (PPM / defects) | 25% | ≤100 PPM, no escapes | ≤1,000 PPM | >5,000 PPM or a stop-ship |
| Responsiveness | 15% | Same-day acknowledgment, proactive alerts | Meets agreed SLAs | Chased for answers |
| Cost behavior | 15% | Beats index, delivers savings commitments | Tracks index | Above-index increases, missed commitments |
| Corrective-action follow-through | 15% | All closed on time with verified effectiveness | Closed late but closed | Repeat findings, open past due |

Grade = Σ(score × weight) × 20 → 0–100. **Bands:** ≥85 Preferred · 70–84 Approved · 55–69 Conditional (development plan required) · <55 Exit-candidate.

**Trend arrows:** ↑ improved ≥5 points vs. prior quarter, → within ±5, ↓ declined ≥5. A ↓ trend in Conditional triggers escalation even if the band hasn't changed yet.

**Recommendation logic:** score AND trajectory AND strategic dependence. A 60-score sole-source supplier gets a development plan with executive sponsorship; a 60-score supplier with two qualified alternates gets a requalification/exit timeline. Say which case applies.

## Output Format

### Supplier Scorecard: [supplier] — [quarter]

**1. Summary** — grade, band, trend, and the recommendation in two sentences.

**2. Scorecard** — table: Dimension | Weight | Metric this quarter | Prior quarter | Score (1–5) | Trend | Evidence.

**3. Corrective-action audit** — table: Action | Committed date | Status | Verified effective? Flag any repeat finding explicitly.

**4. Cost detail** — price moves vs. relevant index, savings pipeline status.

**5. Recommendation** — Escalate / Develop / Exit (or Maintain for Preferred), with the specific next step, owner, and review date. For Exit-candidates: transition risk, requalification lead time, and interim containment.

**6. QBR talking points** — 3–5 items: what to recognize, what to demand, what to decide.

## Quality Checks

- [ ] Every dimension score cites a number or named event, not an impression
- [ ] Trend arrows computed against actual prior-quarter data, or labeled as first-quarter baseline
- [ ] Corrective-action follow-through scored — commitments without closure pulled the grade down
- [ ] Recommendation accounts for sourcing dependence (sole-source vs. alternates available)
- [ ] Exit recommendations include transition lead time and interim risk containment
- [ ] The review ends in a decision with owner and date — not "continue monitoring"

## Anti-Patterns

- [ ] Do not let a good price excuse failing OTIF — cheap parts that don't arrive cost more than the savings
- [ ] Do not score quality on PPM alone if there was a customer escape or stop-ship — a single escape caps quality at 2
- [ ] Do not average the year — score the quarter and show the trend, or improvement and decline both hide
- [ ] Do not recommend exit for a sole-source supplier without a qualified alternative and transition plan
- [ ] Do not carry the same corrective action across two reviews without escalating — repeat findings are a follow-through failure, not a new item
- [ ] Do not soften the band to avoid an awkward QBR — the scorecard is the conversation

## Example Trigger Phrases

- "Review supplier performance."
- "Prepare a quarterly business review for a vendor."
- "Score a supplier on OTIF and quality."
- "Decide whether to escalate."
- "Exit a supplier."
