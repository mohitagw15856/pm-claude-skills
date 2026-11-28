---
applyTo: "**"
description: "Review a personal investment portfolio against the owner's own goals and rules: how it is spread, where it is concentrated, what it costs, how far it has drifted from its targets, and which questions to take to an adviser. Use when asked to review my portfolio, am I too concentrated, check my asset allocation, how far have I drifted from my targets, or prepare questions for my financial adviser. Produces an allocation breakdown computed from the holdings supplied, a concentration and cost check, a drift table against stated targets, and a list of decisions for the owner. It is general information, not personalised financial advice."
---

# Portfolio Review Skill

Most portfolio problems are visible in arithmetic the owner has never done: one holding that has quietly become a third of everything, three funds that own the same companies, fees that compound against the return, an allocation that has drifted far from the plan. This skill does that arithmetic on the holdings the owner supplies and holds the result up against the owner's own targets. It does not pick investments, forecast returns or tell anyone what to buy or sell. If there is no written plan yet, use `investing-policy-statement` first.

> **Not quite this?** Use `investing-policy-statement` to write the targets this review checks against, and `investing-for-beginners` if the terms here are new.

## What This Skill Produces

- **An allocation breakdown** by asset class, region and account, computed from the supplied values
- **A concentration check**: the largest positions and any single holding, sector or employer above the owner's limit
- **An overlap note** where several funds are likely to hold the same things, flagged for the owner to confirm from fund documents
- **A cost check**: the weighted ongoing charge from the fee figures supplied
- **A drift table** against the owner's targets, with the size of the gap
- **Decisions and questions** for the owner or their adviser

## Required Inputs

Ask for these if not provided:
- **The holdings**: name, type (share, fund, bond, cash, property, other), current value, and the account it sits in
- **Fees**, where known: the ongoing charge for each fund and any platform fee
- **The owner's targets and rules**: target allocation, any limit on a single holding, time horizon, and what the money is for
- **Constraints**: holdings that cannot be sold, employer shares, tax wrappers
- **The valuation date**

Compute only from the figures supplied. If a value, fee or target is missing, show the gap and do not fill it. Do not state a fund's holdings, charge or past return from memory; ask the owner to read it from the fund's current factsheet.

## Framework: Arithmetic First, Opinions Never

1. **Total and weight.** Sum the values; express each holding as a percentage of the whole. Show the working so the owner can check it.
2. **Group.** By asset class, by region where known, and by account. Mark anything that could not be classified.
3. **Look for concentration.** List the five largest positions. Flag any holding, and any group the owner named (an employer, a sector, a country), that exceeds the owner's stated limit. With no stated limit, show the weights and ask what limit they want.
4. **Note likely overlap.** Two broad funds covering the same market probably share their largest holdings. Flag the pair and ask the owner to compare the top holdings on the factsheets.
5. **Add up the cost.** Weighted ongoing charge = sum of (weight times fee) for holdings with a fee supplied. State what share of the portfolio the figure covers.
6. **Measure drift.** Actual weight minus target weight for each class. Show the gap in percentage points and in money.
7. **Hand back decisions, not instructions.** For each finding, state the choice in front of the owner and what they would need to know to make it. Tax and personal circumstances decide the answer, and those belong with the owner or a regulated adviser.

## Output Format

# Portfolio Review · valued [date]

*General information computed from figures supplied by the owner. Not personalised financial advice and not a recommendation to buy or sell. Tax and personal circumstances are not assessed.*

**Total:** [sum] across [N] holdings in [N] accounts

## Allocation
| Group | Value | Weight | Target | Gap (points) | Gap (money) |
|-------|-------|--------|--------|--------------|-------------|

## Largest Positions
| Holding | Value | Weight | Over the owner's limit? |
|---------|-------|--------|-------------------------|

## Likely Overlap (confirm from factsheets)
[Pairs of funds and why they may hold the same things]

## Cost
[Weighted ongoing charge, the working, and the share of the portfolio it covers]

## Missing Information
[Values, fees, classifications or targets not supplied]

## Decisions for You
| Finding | The choice | What you need to know first |
|---------|------------|-----------------------------|

## Questions for an Adviser
[Specific questions arising from the findings]

## Quality Checks

- [ ] Weights sum to 100% and the working is shown
- [ ] Every figure derives from the supplied holdings; nothing was looked up or remembered
- [ ] Limits and targets used are the owner's own, or their absence is stated
- [ ] The cost figure says how much of the portfolio it covers
- [ ] Findings are framed as choices, with no buy or sell instruction
- [ ] The disclaimer and valuation date are at the top

## Anti-Patterns

- [ ] Do not recommend buying or selling any holding
- [ ] Do not forecast returns or call the portfolio too risky or too safe in the abstract
- [ ] Do not state a fund's contents, charges or performance from memory
- [ ] Do not ignore cash, property or pensions the owner mentions because they are awkward to classify
- [ ] Do not give tax guidance

## Example Trigger Phrases

- "Review my portfolio."
- "Am I too concentrated in one stock?"
- "How far have I drifted from my target allocation?"
- "What should I ask my financial adviser about these holdings?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/portfolio-review.html

<!-- pm-claude-skills v84.1.0 | skill: portfolio-review | source: skills/portfolio-review/SKILL.md | sha256: ab338b540b6eed0ab7790ee711e3609f66f29ec615a10b1de7110dc857b8ffef | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
