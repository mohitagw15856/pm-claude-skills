---
name: capital-allocation
description: "Allocate a finite budget or headcount across competing initiatives by return and strategic fit. Use when asked to allocate budget, decide where to invest, build a funding/portfolio plan, or make trade-offs across initiatives under a cap. Produces a capital-allocation plan — initiatives scored by expected return × strategic fit per dollar, a funded/unfunded split against the cap, the cut line, and the reasoning."
---

# Capital Allocation Skill

Allocating capital is the core executive job: a fixed pot, more good ideas than money, and the need to
say no on the record. This skill scores initiatives by expected return *and* strategic fit per unit of
cost, allocates against the cap (honouring must-funds), and makes the **cut line** explicit — so funding
is a defensible portfolio choice, not the loudest voice in the room.

## Required Inputs

Ask for these only if they aren't already provided:

- **The cap** — the total budget or headcount to allocate, and the period.
- **The initiatives** — each with its cost, expected return (revenue, savings, or a strategic value), and strategic fit.
- **Constraints** — anything that *must* be funded (compliance, keep-the-lights-on) or can't be partially funded.
- **The objective** — what you're optimising: near-term return, strategic positioning, or a balance.

## Output Format

### Capital Allocation: [pot], [period]

**1. Objective & cap** — what you're optimising and the total available.

**2. Scored initiatives** — a table; score = expected value × strategic fit, normalised per unit cost:

| Initiative | Cost | Expected return | Strategic fit (1–5) | Score / $ | Must-fund? |
|---|---|---|---|---|---|

**3. The allocation** — funded vs. unfunded against the cap, with budget utilisation. Must-funds first, then highest score/$ until the cap binds.

**4. The cut line** — the marginal initiative that *just* missed, and what it would take to fund it (the most useful number for the debate).

**5. Rationale & trade-offs** — why the portfolio is balanced this way, what's deliberately not funded, and the reversibility of each bet.

**6. Re-evaluation triggers** — what would change the allocation mid-period (a bet pays off early, a must-fund grows).

## Programmatic Helper

`scripts/capital_allocate.py` (stdlib only) does the allocation deterministically — must-funds first, then
by score-per-cost until the cap binds — and reports the cut line:

```bash
# items.json: [{"name":"Mobile revamp","cost":300,"expected_return":900,"strategic_fit":5,"must_fund":false}, ...]
python3 scripts/capital_allocate.py items.json --budget 1000
python3 scripts/capital_allocate.py items.json --budget 1000 --json
```

## Quality Checks

- [ ] Initiatives are scored on expected return AND strategic fit, not return alone
- [ ] Score is expressed per unit of cost, so cheap-good beats expensive-good fairly
- [ ] Must-funds are honoured before discretionary allocation
- [ ] The cut line is explicit — the marginal initiative and what it'd take to fund it
- [ ] What's deliberately not funded is stated, with the trade-off

## Anti-Patterns

- [ ] Do not allocate by last year's split or by who argues hardest — score the portfolio
- [ ] Do not rank by absolute return — a $900 return on $300 beats $1000 on $900; use return per dollar
- [ ] Do not ignore strategic fit — the highest-ROI initiative can still be off-strategy
- [ ] Do not hide the cut line — the initiatives that just missed are the real decision, and the team deserves to see it
- [ ] Do not treat estimates as facts — expected returns are usually [hunch]/[external]; flag the confidence

## Based On

Portfolio capital-allocation practice — expected-value × strategic-fit scoring per unit cost, against a hard constraint.

## Example Trigger Phrases

- "Decide where to invest."
- "Build a funding/portfolio plan."
- "Make trade-offs across initiatives under a cap."
