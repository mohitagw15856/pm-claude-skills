---
name: loan-covenant-review
description: "Run a quarterly loan covenant compliance review: covenant table with required vs actual vs headroom, trend and trajectory-to-breach analysis, waiver and amendment options with pricing implications, early-warning indicators, and a watch-list recommendation. Use when asked to review covenant compliance, check covenant headroom, assess a potential covenant breach, or prepare a quarterly borrower monitoring review. Produces a structured covenant review with headroom table, trajectory analysis, and recommended actions."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/loan-covenant-review.html
metadata:
  {
    "openclaw": { "emoji": "🏦" }
  }
---

# Loan Covenant Review Skill

Covenants are the bank's smoke detectors — but only if someone reads them as trends, not snapshots. This skill runs the quarterly discipline: where is each covenant now, which direction is it moving, when does the trend cross the line, and what do we do before it does.

## What This Skill Produces

- A covenant compliance table: required vs actual vs headroom, with trend
- Trajectory-to-breach analysis for any tightening covenant
- Waiver/amendment options with typical pricing implications
- Qualitative early-warning indicators checked
- A watch-list / risk-grade recommendation

## Required Inputs

Ask for what's missing; with partial data, compute what's computable and mark the rest `[awaiting financials]`:

- **Facility & covenant package** — each covenant's definition, required level, test frequency, cure rights
- **Current-quarter financials** and at least 2–4 prior quarters for trend
- **Compliance certificate** figures if the borrower has submitted one
- **Relationship context** — prior waivers, recent management contact, sector conditions

## Review Framework

**1. Covenant table.** For each covenant: required level, actual, headroom % = (actual − required) ÷ required (sign-adjusted so positive = compliant for both maximum-leverage and minimum-coverage covenants). Recompute actuals from the definitions in the agreement — borrower certificates use borrower-friendly add-backs; note any definitional divergence.

**2. Headroom bands:**

| Headroom | Status | Response |
|---|---|---|
| >20% | Comfortable | Routine monitoring |
| 10–20% | Monitor | Note trend; quarterly attention |
| <10% | Early warning | Trajectory analysis, proactive borrower dialogue |
| Breached | Breach | Reservation of rights, waiver/amendment track, risk-grade review |

**3. Trajectory-to-breach.** For anything under 20% or trending down 2+ quarters: extend the trend 2–4 quarters and state the projected breach quarter with the assumption ("on the last 3 quarters' EBITDA slope, leverage crosses 3.5x in Q2"). Label it a trend projection, not a forecast. Seasonality: compare year-on-year quarters before calling a trend.

**4. Options if breach is likely or occurred.** Frame the menu with typical pricing logic (calibrate to institution practice): one-off **waiver** (waiver fee, often bps on commitment); **reset/amendment** (amendment fee + margin step-up, often with tightened baskets, added reporting, or a sweep); **equity cure** if documented; **standstill/reservation of rights** while options are assessed. Note: accepting payment or staying silent after a known breach can prejudice rights — flag "reserve rights promptly" whenever a breach exists.

**5. Early-warning indicators (qualitative).** Check: late or requalified financials, auditor change or going-concern language, CFO/management turnover, maxed revolver utilisation creep, stretched payables, delayed compliance certificates, adverse sector news. Two or more present → recommend watch-list consideration even with numeric compliance.

## Output Format

### Covenant review: [borrower / facility / test date]

**1. Summary verdict** — compliant / early warning / breach, one paragraph.
**2. Covenant table** — covenant | definition source | required | actual | headroom % | 4-quarter trend | status.
**3. Trajectory analysis** — projected breach quarter and assumptions, per tightening covenant.
**4. Early-warning indicators** — checklist with evidence.
**5. Options & pricing implications** — if relevant: waiver / amend / cure / reserve rights, with trade-offs.
**6. Recommendation** — grade/watch-list action, borrower conversation points, next review date.

End with: *"This review is analytical support, not a credit or enforcement decision. Waivers, grading, and rights reservations follow your institution's credit policy and applicable regulation."*

## Quality Checks

- [ ] Headroom computed with correct sign for max vs min covenants
- [ ] Actuals recomputed from agreement definitions, or the reliance on borrower certificate is stated
- [ ] Every <20%-headroom or 2-quarter-declining covenant has a trajectory projection with stated assumptions
- [ ] Seasonality considered before a trend is called
- [ ] Any existing breach triggers an explicit reservation-of-rights flag
- [ ] Qualitative indicators reviewed, not just the numbers

## Anti-Patterns

- [ ] Do not report compliance as a snapshot — a compliant covenant with three quarters of decay is the finding
- [ ] Do not accept borrower add-backs without checking them against the agreement's EBITDA definition
- [ ] Do not project a breach without stating the assumption the projection rides on
- [ ] Do not stay silent on a known breach — flag reservation of rights immediately
- [ ] Do not recommend a waiver without naming what the bank gets for it (fee, margin, information, structure)

## Example Trigger Phrases

- "Review covenant compliance."
- "Check covenant headroom."
- "Assess a potential covenant breach."
- "Prepare a quarterly borrower monitoring review."
