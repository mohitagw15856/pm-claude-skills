---
name: contract-renewal-brief
description: "Write the decision brief for one supplier contract coming up for renewal: what was bought and used, how the supplier performed, what the market now offers, the options to renew, renegotiate, re-tender or exit with the cost and risk of each, a recommendation and a negotiation position. Use when asked to write a renewal brief, should we renew this contract, prepare the renewal paper for the committee, or renew or re-tender. Produces a one-page recommendation, an options table, usage and performance evidence, a negotiation plan and a timeline keyed to the notice date. Distinct from contract-renewal-tracker (all contracts and dates) and renewal-playbook (the vendor's side)."
version: 1.0.0
---

# Contract Renewal Brief

Most contracts renew because nobody wrote down a reason not to. This skill prepares the paper a budget holder or committee needs for one renewal: the evidence of use and performance, real alternatives, and a position to negotiate from before the notice date passes. It is written from the buyer's side.

## What This Skill Produces

- A one-page recommendation with the decision needed and the date it is needed by
- An options table: renew as is, renegotiate, re-tender, reduce scope, exit
- Evidence: spend, usage against entitlement, service performance, incidents
- A market check: alternatives, indicative prices, switching cost
- A negotiation plan: asks, trades, walk-away points, who speaks
- A timeline working back from the notice deadline

## Required Inputs

Ask for these if not provided:

- Supplier, what is bought, contract value and term
- Renewal date, notice period, auto-renewal terms and any price uplift clause
- Actual usage against what is paid for (licences, volumes, hours)
- Performance against service levels, incidents, complaints, credits received
- Who uses it and how hard it would be to replace
- Alternatives known, and any quotes or benchmarks
- Budget position and the organisation's procurement rules or thresholds
- Who decides and who must be consulted

## Framework

1. **Start from the notice date.** The decision deadline is the notice date minus the time needed to act on the decision.
2. **Usage first.** Paying for more than is used is the easiest saving and the strongest negotiating fact.
3. **Performance in the supplier's own terms.** Service levels met or missed, with dates.
4. **Total cost of each option.** Price, internal effort, switching and migration, dual running, exit fees, risk.
5. **Real alternatives.** At least one credible alternative, even if switching is unlikely. Without one there is no negotiation.
6. **Position.** Target, acceptable and walk-away for price, term, scope and terms. Decide what can be traded: a longer term for a lower price, case-study rights, payment timing.
7. **Compliance.** Check whether the value or the change triggers a tender or approval requirement under the organisation's rules. Ask the user for the rule.
8. **Recommendation.** One option, the reason, the saving or risk reduced, and what is needed from the decision-maker.

## Output Format

### Renewal brief: [supplier], [service]

**Decision needed by:** [date] (notice deadline [date]). **Recommendation:** [option] because [reason]. **Expected effect:** [saving or risk change].

**The contract today**
| Item | Value |
|---|---|
| Annual cost | |
| Term and renewal | |
| Notice and auto-renewal | |
| Uplift clause | |

**Evidence**
| Measure | Contracted | Actual | Note |
|---|---|---|---|

**Options**
| Option | Year-one cost | Three-year cost | Effort and switching | Risk | Verdict |
|---|---|---|---|---|---|

**Negotiation plan**
| Topic | Target | Acceptable | Walk away | What we can trade |
|---|---|---|---|---|

**Timeline**
| By | Step | Owner |
|---|---|---|

**Procurement rules to confirm:** [thresholds, approvals]

**Assumptions and gaps**
- [Figures estimated or missing]
- [The data that would most change the recommendation]

## Quality Checks

- [ ] The decision deadline is derived from the notice date
- [ ] Usage is compared with entitlement
- [ ] Each option shows cost beyond year one and switching effort
- [ ] At least one alternative is named or the lack of one is stated as a risk
- [ ] Walk-away points are set for price and term
- [ ] The recommendation fits in three lines

## Anti-Patterns

- **Do not recommend renewal because switching is tiresome** without costing it.
- **Do not open negotiations after the notice date.**
- **Do not quote a benchmark price you were not given.**
- **Do not ignore the uplift clause.**
- **Do not present five options as equal.** Recommend one.

## Example Trigger Phrases

- "Our CRM contract renews in March. Write the renewal paper."
- "We pay for 200 seats and use 130. Build the negotiation position."
- "Renew or re-tender the cleaning contract? Give me the options."
- "What should I ask for on the renewal call tomorrow?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/contract-renewal-brief.html
