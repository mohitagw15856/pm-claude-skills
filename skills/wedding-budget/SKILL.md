---
name: wedding-budget
description: "Build a wedding budget that survives to the wedding — allocation by real shares, the per-guest lever made explicit, the routinely-forgotten line items priced in from day one, and a contingency that isn't decorative. Use when asked make a wedding budget, how do people split X across a wedding, we have N dollars and M guests, or why is our wedding over budget. Produces the allocation table from the script, the guest-count math, the forgotten-items audit, and the track-against-actuals discipline."
---

# Wedding Budget Skill

Wedding budgets die two deaths: the guest list (every name is a per-head catering multiple) and the forgotten line items (vendor meals, alterations, service charges, overtime — the ~10% that appears in month eleven with no budget line waiting for it). This skill builds the budget with both priced in from day one: allocation across categories with the shares stated as defaults not laws, the per-guest lever computed so trade-offs are conscious, and a contingency line defended as load-bearing rather than skimmed first.

## What This Skill Produces

- **The allocation table** — every category with its share and amount, from the script, overridable per real quotes
- **The guest math** — per-guest cost and what cutting/adding 10 names actually moves
- **The forgotten-items audit** — the standard omissions, each assigned to a category's line now
- **The tracking discipline** — budget vs. quoted vs. actual, and the rule for when a category busts

## Required Inputs

Ask for these if not provided:
- **The all-in number** — the real total including everything (rings, attire, the honeymoon in or out — decide and label), and who's contributing what (money with strings gets its strings written down)
- **The guest count, honestly** — the draft list's realistic size, not the aspirational cut; it's the budget's biggest single input
- **The two priorities** — the couple's non-negotiables (photography? the band? the venue?) — allocation bends toward them *by explicit trade*, not by silent overspend
- **Real quotes, as they arrive** — the defaults exist to be replaced; a budget of defaults is a sketch, a budget of quotes is a plan

## Programmatic Helper

```bash
python3 scripts/wedding_budget.py --budget 30000 --guests 110
python3 scripts/wedding_budget.py --budget 30000 --guests 110 --venue-food-pct 45 --json
```

Deterministic. Default shares are planning conventions (venue+catering ~42%, photo/video ~12%, 9% contingency…) — every one is a flag to override as real quotes land. The per-guest and cut-10-guests numbers print with the table.

## Framework: The Survival Rules

1. **The guest list is the budget:** venue+catering is ~40–50% of everything and scales per head — the script's cut-10-guests number makes the trade explicit ("ten names ≈ the photographer upgrade"). Every guest-list argument is secretly a budget argument; giving it the number makes it an honest one.
2. **The forgotten items get lines now:** vendor meals, alterations, overtime clauses, service charges + gratuities (often 20%+ on catering and quoted *separately* — the classic surprise), postage, trials, day-of transport — each assigned to a category at budget time. A surprise with a budget line is just a bill.
3. **Contingency is load-bearing, not skimmable:** ~9–10% held for the unquoted and the changed-mind; the rule is written down: contingency pays for *surprises*, not upgrades — upgrades come from explicit trades between categories.
4. **Priorities buy by trading, not creeping:** "photography matters most" is implemented as photo +5 points / flowers −3 / favors −2 — a visible reallocation, so the budget still sums. The alternative (every category quietly "just a bit more") is how 30k becomes 38k without one decision being made.
5. **Track quoted-vs-budget the day each quote arrives:** category busts announce themselves early if anyone is looking — the tracking table (budget / quoted / actual per category) turns "we're probably fine" into a number, and the bust rule is pre-agreed: re-trade between categories, cut scope, or consciously raise the total — silence is not on the list.

## Output Format

# Wedding Budget: [total] · [guests] guests — [date]

## The Allocation
[Script output table · priorities noted with their funding trades]

## The Guest Lever
[Per-guest cost · the cut/add-10 number · the current list vs. the budget's assumption]

## Forgotten Items — Now Budgeted
| Item | Assigned to category | Est. |
|---|---|---|

## Tracking
| Category | Budget | Quoted | Actual | Status |
|---|---|---|---|---|
**Bust rule:** [re-trade / cut scope / raise total — decided now, in writing]

*Shares are conventions, not rules — real quotes override defaults. Educational model, not financial advice.*

## Quality Checks

- [ ] The total is all-in with honeymoon/rings in-or-out stated
- [ ] The per-guest lever and cut-10 number appear
- [ ] Every forgotten item has a category and an estimate
- [ ] Priorities show their funding trades — no category grew without another shrinking
- [ ] The bust rule is written before any category busts

## Anti-Patterns

- [ ] Do not budget the aspirational guest list — the realistic list, or the venue line is fiction
- [ ] Do not skim the contingency for upgrades — it's for the surprises the audit couldn't name
- [ ] Do not let service charges and gratuities live outside the table — 20% of the biggest category is not a footnote
- [ ] Do not average competing quotes into the budget — pick the likely vendor's number and track it
- [ ] Do not moralize the spending level — the skill's job is that the chosen number survives, whatever it is
