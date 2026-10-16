---
name: runway-calculator
description: "Calculate cash runway, burn, and the zero-cash date — and whether you're default alive or dead. Use when asked to work out runway, monthly burn, when the money runs out, or how much to raise/cut to reach a target. Produces a computed runway summary (net burn, months of runway, zero-cash date, default alive/dead) plus what it takes to extend it."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/runway-calculator.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Runway Calculator Skill

For any company spending more than it makes, one number governs everything: how many months of cash
are left. This skill computes net burn, runway, and the zero-cash date from your cash and P&L, judges
whether you're **default alive or dead** (Paul Graham's test — would you reach profitability on current
cash at current growth?), and shows the raise-or-cut needed to hit a target runway.

## Required Inputs

Ask for these only if they aren't already provided:

- **Cash in bank** (today).
- **Monthly revenue** and **monthly expenses** (or net monthly burn directly).
- **Monthly growth rate** of revenue, if you want the default-alive check.
- **Target** — a runway you want to reach (e.g. 18 months) or a raise you're considering.

## Output Format

### Runway: [company]

**1. The numbers** (computed via the helper):

| Metric | Value |
|---|---|
| Net monthly burn | |
| Cash in bank | |
| **Runway (months)** | |
| **Zero-cash date** | |
| Default alive? | yes / no |

**2. Default alive or dead** — on current cash and growth, do you reach profitability before the cash runs out? State it plainly; it's the question investors ask first.

**3. To extend it** — the concrete moves and their effect: cut $X/mo → +Y months; raise $Z → +W months; or the growth rate needed to turn default-alive. Show the trade-off.

**4. Caveats** — flag if burn is rising (these numbers assume flat burn), and the buffer to keep (don't plan to zero — most raises take months).

## Programmatic Helper

`scripts/runway.py` (stdlib only) computes runway and the zero-cash date:

```bash
# in.json: {"cash": 600000, "monthly_revenue": 40000, "monthly_expenses": 110000, "revenue_growth": 0.08}
python3 scripts/runway.py in.json
python3 scripts/runway.py in.json --json
```

## Quality Checks

- [ ] Net burn = expenses − revenue (not gross spend) — and the zero-cash date is an actual date
- [ ] The default-alive/dead question is answered explicitly
- [ ] "To extend it" gives concrete cut/raise/growth options with their month impact
- [ ] Flags that the figures assume flat burn if burn is actually growing
- [ ] Recommends a cash buffer rather than planning to literally zero

## Anti-Patterns

- [ ] Do not report runway off gross spend — net burn (after revenue) is the real number
- [ ] Do not assume flat burn silently — if headcount/spend is rising, say the runway is optimistic
- [ ] Do not plan to zero cash — a raise takes 3–6 months; runway should be measured to "must-raise-by," not "broke"
- [ ] Do not ignore growth — a fast-growing company can be default alive even while burning
- [ ] Do not present one scenario — show the cut-vs-raise-vs-grow trade-off

## Based On

Startup cash-management practice — net burn, runway, and "Default Alive or Dead" (Paul Graham, Y Combinator).

## Example Trigger Phrases

- "Work out our runway."
- "What's our monthly burn?"
- "When does the money run out?"
- "How much do we need to raise or cut?"
