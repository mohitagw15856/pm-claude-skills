---
name: credit-memo
description: "Write a credit memo for a lending decision: borrower story, facility structure, repayment sources, financial-ratio spread with covenant headroom, risk factors with mitigants, risk-rating rationale, and a recommendation. Use when asked to write a credit memo, credit application, credit paper, loan write-up, or prepare a deal for credit committee. Produces a complete credit memo ready for committee review."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/credit-memo.html
metadata:
  {
    "openclaw": { "emoji": "🏦" }
  }
---

# Credit Memo Skill

A credit memo has one job: let a committee member who has never met the borrower decide whether the bank gets its money back. This skill writes that document — the story, the structure, the numbers, and the risks — with the discipline that every risk carries a mitigant or an explicit acceptance, and every rating has a stated rationale.

## What This Skill Produces

- A borrower story (business, ownership, management, why they need the money)
- A facility structure table (amount, tenor, pricing, security, guarantees, covenants)
- Repayment sources: primary, secondary, tertiary — each tested
- A financial-ratio spread with trends and covenant headroom
- Risk factors, each paired with a mitigant or an explicit acceptance
- Risk-rating rationale and a clear recommendation

## Required Inputs

Ask for what's missing; from a thin brief, draft with every inferred figure labelled `[assumed — verify]`:

- **Borrower** — business, ownership, years operating, management
- **Request** — facility type, amount, tenor, purpose, proposed pricing and security
- **Financials** — 2–3 years of revenue, EBITDA, debt, interest expense, working capital; projections if available
- **Existing exposure** and relationship history
- **Proposed covenants** and the institution's rating scale, if available

## Credit Framework

**Borrower story.** What the business does, who owns and runs it, and *why they need the money now* — growth, refinance, working-capital cycle, or distress dressed as growth. The purpose must match the tenor and structure (don't fund long-term assets with short-term debt).

**Repayment sources — the core of the memo:**
- **Primary: operating cash flow.** Test with DSCR = cash available for debt service ÷ total debt service. Common framing: ≥1.25x is conventional comfort; 1.0–1.25x is tight and needs a covenant fence; <1.0x means the deal relies on the secondary source — say so in those words.
- **Secondary: collateral.** State value, valuation date and basis, advance rate, and realistic liquidation value under stress — not appraisal value.
- **Tertiary: guarantor/sponsor support.** Verified net worth and liquidity, and the honest note that guarantees are a negotiating position, not cash.

**Ratio spread.** Show at least: leverage (Debt/EBITDA), DSCR, interest coverage, current ratio, and any sector-critical metric — 2–3 years of trend, not a snapshot. Frame thresholds as conventional reference points and calibrate to the institution's grid. For each proposed covenant, compute day-one headroom: (actual − required) ÷ required.

**Risks and mitigants.** Every risk gets a structural mitigant (covenant, security, guarantee, pricing) or an explicit acceptance with rationale ("accepted: single-customer concentration, mitigated partially by 3-year contract; residual risk accepted given…"). A mitigant-free risk list is a memo that hasn't finished its job.

**Rating and recommendation.** State the rating driver in one sentence (cash-flow strength, leverage, collateral quality, or sector) and what would move it a notch either way. Recommend: approve / approve with conditions (name them) / decline.

## Output Format

### Credit memo: [borrower / facility / date]

**1. Recommendation & rating** — up front: approve/conditions/decline, proposed rating, one-paragraph why.
**2. Borrower story** — business, ownership, management, purpose.
**3. Facility structure** — table: facility | amount | tenor | pricing | security | guarantees.
**4. Repayment sources** — primary / secondary / tertiary, each tested with numbers.
**5. Financial spread** — table: metric | FY-2 | FY-1 | current | proj | covenant | headroom.
**6. Risks & mitigants** — table: risk | mitigant or explicit acceptance | residual.
**7. Conditions & covenants** — with day-one headroom.

End with: *"This memo is analytical support, not a credit decision. Approval authority, rating, and terms follow your institution's credit policy and applicable regulation."*

## Quality Checks

- [ ] Purpose, tenor, and structure are consistent (no long assets on short money)
- [ ] All three repayment sources are addressed; if primary DSCR <1.0x the memo says the deal leans on collateral
- [ ] Collateral is valued on realistic liquidation basis with valuation date stated
- [ ] Every risk has a mitigant or an explicit, reasoned acceptance — none is bare
- [ ] Ratios show trend, not a single year; covenant headroom is computed
- [ ] Rating rationale names its driver and the notch-mover in both directions
- [ ] Assumed figures are labelled `[assumed — verify]`

## Anti-Patterns

- [ ] Do not list a risk without a mitigant or an explicit acceptance — bare risk lists are unfinished analysis
- [ ] Do not let the borrower's narrative substitute for the numbers — reconcile story and spread, and flag where they disagree
- [ ] Do not count a guarantee as a repayment source without verified guarantor liquidity
- [ ] Do not use appraisal value as liquidation value
- [ ] Do not bury the recommendation at the end — committee reads it first
- [ ] Do not fabricate financials from a thin brief — label every inferred number

## Example Trigger Phrases

- "Write a credit memo."
- "Write up this loan for credit committee."
- "Prepare a deal for credit committee."
- "Spread these financials and check covenant headroom."
