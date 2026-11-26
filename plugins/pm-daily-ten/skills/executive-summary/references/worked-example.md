# Worked Example — Executive Summary

## The brief

Lendwell is a mid-market SMB lending fintech (~$180M annual originations). Its 18-month program to migrate credit decisioning from the legacy rules-based engine ("Atlas") to a new ML platform ("Keel") is at the end of Q2 2026: 60% of origination volume is live on Keel. The program was budgeted at $2.4M; the forecast at completion is now $3.1M, driven by data-vendor integration rework and an extended parallel-run period required by the model-risk review. Risk performance, however, is ahead of plan: 90-day early delinquency on Keel-approved loans is 1.8% vs 2.6% on Atlas, and approval rates are up 6 points at flat loss rates. The VP of Credit Platform must give the Executive Committee its quarterly program summary and secure a decision on the $700K overrun at the 24 July meeting. Audience: CEO and ExCo. Limit: one page.

## The output

---

### Keel Credit-Decisioning Migration — Q2 2026 Program Summary
**Executive Summary**
*Prepared for: Lendwell Executive Committee | Date: 10 July 2026 | Author: Dana Okafor, VP Credit Platform*

---

**Bottom line up front:**
The Keel migration will finish $700K (29%) over its approved $2.4M budget, and we are asking the Executive Committee to approve that additional $700K at the 24 July meeting so the program completes by 30 November 2026. The model itself is outperforming plan: early delinquency on Keel-approved loans is 1.8% against 2.6% on the legacy Atlas engine, and approval rates are up 6 points at flat loss rates. The risk case for the program has strengthened this quarter; the cost case has not, and this summary explains both.

---

**Background (why this matters):**
Keel replaces Atlas, our 2014-era rules engine, as the decisioning system for all SMB origination. 60% of volume is live on Keel today; the remaining 40% (equipment finance and the broker channel) runs on Atlas under a model-risk exemption that expires 31 December 2026. Until migration completes, we pay to run both systems.

---

**Key findings / analysis:**
- **Risk performance is ahead of the business case:** Keel's 90-day early-delinquency rate is 1.8% vs 2.6% on Atlas — a 31% improvement, reaching the target set for Q4 two quarters early — while approving 6 points more applicants.
- **The overrun has two identified causes, both now bounded:** $410K from rebuilding the bureau-data integration after our vendor's schema change, and $290K from the model-risk committee extending the mandated parallel run from 8 to 16 weeks. Neither is expected to recur in the remaining phases.
- **Dual-running is the silent cost:** operating Atlas and Keel together costs $85K per month in licences, infrastructure, and duplicated ops effort — every month of delay adds this on top of the program budget.

---

**Options considered:**

| Option | Benefit | Risk | Recommendation |
|---|---|---|---|
| Approve $700K; complete migration by 30 Nov 2026 | Ends dual-run costs; captures full approval-rate lift on 100% of volume | Total spend reaches $3.1M; requires ExCo approval now | Recommended |
| Pause at 60% migrated; hold remaining volume on Atlas | No new capital this year | $85K/month dual-run cost indefinitely; model-risk exemption lapses 31 Dec 2026, forcing a rushed migration in Q1 2027 | Not recommended |
| Descope broker channel permanently; migrate equipment finance only | Saves ~$250K of the overrun | Leaves two decisioning systems permanently; broker channel (22% of volume) never receives the delinquency improvement | Not recommended |

---

**Recommendation:**
We recommend approving the additional $700K at the 24 July ExCo because completing the migration by 30 November eliminates $85K/month in dual-run costs, extends the 31% delinquency improvement to all origination volume, and closes out the model-risk exemption before it expires. At current performance, the incremental margin from the higher approval rate recovers the overrun in approximately five months of full-volume operation.

---

**Immediate next steps:**
- Budget decision at ExCo — Marcus Bell (CFO) to table the $700K variance for approval, 24 July 2026
- Reissue the data-vendor statement of work with fixed-fee integration terms — Priya Raman (Program Director), by 1 August 2026
- Model-risk committee memo confirming the shortened parallel-run plan for the final two phases — Elena Vasquez (Head of Model Risk), by 8 August 2026

---

**Risks of inaction:** If no decision is made on 24 July, the program pauses at 60% migrated: dual-run costs continue at $85K/month, we forgo an estimated $310K per quarter in margin from the approval-rate lift on unmigrated volume, and the model-risk exemption expiring 31 December 2026 would force either a rushed Q1 2027 migration or a formal exemption renewal with the regulator.

**Full report:** Keel Migration Q2 2026 Program Review, document LW-CP-2026-014 (Credit Platform shared drive).

---

## Why it's shaped this way

- **The bad news carries the number, in sentence one.** The Core Principle says the conclusion comes upfront; the Quality Check says "bottom line in first 3 sentences." "$700K (29%) over" appears before any good news, so the reader cannot feel spun when they reach the ask — mixed news delivered straight builds the credibility the recommendation depends on.
- **The ask is explicit and dated in the opening paragraph.** The Anti-Patterns forbid burying the recommendation; the CEO guidance says "make the decision binary, ask in sentence one." The reader knows within two sentences that this is a $700K approval decision on 24 July.
- **It is standalone.** Every figure needed to decide ($2.4M budget, $3.1M forecast, 1.8% vs 2.6% delinquency, $85K/month dual-run, 31 Dec exemption) is in the summary itself — a Quality Check requires the reader never needs the source document. The full report is referenced by internal document ID only, as a pointer, not a dependency.
- **Findings are evidence, not narrative.** The Anti-Patterns rule out chronological summarising: there is no "in January we…, then in March we…". Each finding is one sentence, one claim, one number, chosen because it changes the decision (performance beats plan; overrun causes are bounded; delay has a monthly price).
- **The overrun causes are named and bounded.** "Both now bounded" with the $410K/$290K split pre-answers the CEO's first question — "will you be back for more money?" — which is what audience-fit means for an ExCo: anticipate the follow-up inside the length limit.
- **Options include the do-nothing path with its real cost.** The pause option is priced ($85K/month, lapsing exemption) rather than dismissed, and "Risks of inaction" quantifies the same numbers — the Anti-Patterns explicitly forbid a vague inaction section, because unpriced inaction always looks free.
- **Next steps have named owners and dates.** Bell/24 July, Raman/1 August, Vasquez/8 August — the Quality Check requires owners and dates, and specificity here signals the program is controlled despite the overrun.
- **Length is one genuine page.** Compression is the craft: the payback framing ("recovers the overrun in approximately five months") replaces what could have been a half-page ROI appendix, keeping the summary readable in under 3 minutes as the skill's description promises.
