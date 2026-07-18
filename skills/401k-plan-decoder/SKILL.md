---
name: 401k-plan-decoder
description: "Decode a 401k or workplace retirement plan — the real cost of its funds, the match's fine print, vesting math, and the plan features worth using or avoiding. Use when someone asks 'is my 401k any good', 'decode my 401k plan', 'which funds should I look at', or 'what fees am I paying'. Produces a fee decode in dollars-over-time, match and vesting math, a fund-lineup triage by cost, and the questions for HR or the plan administrator."
---

# 401k Plan Decoder Skill

Nobody reads the 401k enrollment packet, which is how a 0.9% expense ratio quietly eats six figures of a career's compounding. This skill reads it: what the funds actually cost in dollars over time, what the match really promises once vesting and true-up fine print are applied, and which plan features (Roth option, brokerage window, loan terms) matter for this person. It decodes cost and structure — it never picks investments.

## What This Skill Produces

- The fee decode: each relevant expense ratio and admin fee converted to dollars-over-career on the user's numbers
- Match math with the fine print applied: per-paycheck vs. annual true-up, vesting schedule, what leaving at year N forfeits
- Fund-lineup triage by cost tier — where the cheap broad-market building blocks are, and which funds cost 10× a near-identical neighbor
- Feature decode (Roth 401k, after-tax + conversions if offered, loans, brokerage window) and the questions for HR/administrator

## Required Inputs

Ask for these only if they aren't already provided:

- **The plan documents** — fund lineup with expense ratios (the fee disclosure / 404a-5 notice is the gold source), match formula, vesting schedule, summary plan description excerpts. Decode what's provided; list what's missing by name.
- **Their numbers** — salary, current contribution %, balance, and age band — needed to make fees and match concrete.
- **Tenure expectation** — vesting math is meaningless without it.

## Framework: Severity Scale

- 🔴 **Can cost you real money** — expense ratios ≥ ~0.75% on funds with cheap index alternatives in the same lineup (compute the career cost), per-participant admin fees charged to the employee on small balances, match computed per-paycheck *without* an annual true-up (front-loading or uneven contributions forfeit match — quote the formula), long cliff vesting against their expected tenure, contributing below the full match threshold (the only guaranteed 50–100% return in finance, being declined).
- 🟡 **Unusual — check before relying on it** — target-date funds built from expensive underlying funds (decode the layered cost), loan provisions that require immediate repayment at separation, forced rollout of small balances, revenue-sharing arrangements buried in the fee notice.
- 🟢 **Standard** — ordinary match formulas, graded vesting, a lineup containing low-cost index options; label the good parts explicitly — a decent plan deserves to be trusted.

Always show the arithmetic:
1. **Fee drag** — balance and contributions compounded at a stated assumed return, with and without the fee delta, over the years to retirement age band; present the gap in dollars with assumptions labeled.
2. **Match math** — the formula applied to their salary; the per-paycheck-vs-true-up check with a concrete forfeiture scenario if applicable.
3. **Vesting math** — dollars forfeited if they leave at their stated expected tenure.

## Output Format

### 401k Decode: [employer plan]

**1. The verdict** — is the match fully captured, what the fees cost over a career, and the one change worth making this week.

**2. The fee decode** — admin fees + expense ratios in dollars-over-time, arithmetic shown, assumptions labeled.

**3. Match & vesting math** — formula applied, true-up check, forfeiture at stated tenure.

**4. Fund lineup triage**

| Fund | Expense ratio | Cost tier | Note (cheap-neighbor comparison, layered costs) |
|---|---|---|---|

**5. Feature decode** — Roth option, after-tax/conversion availability, loans, brokerage window — what each is, who it tends to matter for, flagged `[to confirm]` where the documents are silent.

**6. Questions for HR / the administrator** — missing documents, true-up confirmation in writing, fee-disclosure request.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Every fee is converted to dollars-over-time with assumptions labeled, never left as a percentage
- [ ] The per-paycheck vs. true-up distinction is checked and quoted from the documents
- [ ] Vesting forfeiture is computed at the user's stated tenure
- [ ] Cost-tier triage compares funds *within this lineup*, not against the whole market
- [ ] Missing documents are listed by name, and silent features are `[to confirm]`
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not recommend specific funds or allocations — decode cost and structure; the picking is the user's (or their advisor's)
- [ ] Do not invent fees or plan terms that aren't in the documents
- [ ] Do not present the fee-drag projection as a prediction — it's an illustration with labeled assumptions
- [ ] Do not soften the below-the-match finding — declining free money is the headline, say it plainly
- [ ] Do not treat jurisdiction- and plan-specific rules (loans, withdrawals, protections) as universal

## Based On

Participant-side plan review practice — fee-disclosure auditing, match-formula fine print, vesting math, lineup cost triage.
