---
trigger: model_decision
description: "Compute a financial-independence (FIRE) target and years-to-reach with every assumption labeled as an assumption — plus a sensitivity table instead of a single false-precision answer. Use when asked what's my FIRE number, when can I retire early, how much do I need to be financially independent, or model my savings trajectory. Produces the FIRE number, years-to-target at stated assumptions, a return × withdrawal-rate sensitivity grid, and the honest list of what the model ignores."
---

# FIRE Number Skill

Every FIRE calculation is three assumptions wearing a number's clothing: a withdrawal rate, a real return, and the pretense that returns arrive in a convenient order. This skill does the math properly and refuses the false precision — the deliverable is a *surface* of outcomes with the assumptions labeled, not a single date to organize a life around.

## What This Skill Produces

- **The FIRE number** — annual spend ÷ withdrawal rate, with the withdrawal rate named as the choice it is
- **Years to target** — at stated savings, contributions, and real return
- **The sensitivity grid** — years-to-target across return (3/5/7%) × withdrawal rate (3/3.5/4%)
- **The ignored-risks list** — sequence-of-returns, taxes, spending drift — stated, not buried

## Required Inputs

Ask for these if not provided:
- **Current invested savings** (invested — not home equity, not emergency cash)
- **Monthly contribution** (realistic, not aspirational — ask which)
- **Target annual spend in retirement** (today's dollars; if unknown, current spend is the honest starting guess, labeled)
- **Return and withdrawal assumptions** (defaults: 5% real, 4% withdrawal — both labeled as defaults)

## Programmatic Helper

```bash
python3 scripts/fire_number.py --savings 120000 --monthly 3000 --spend 60000
python3 scripts/fire_number.py --savings 120000 --monthly 3000 --spend 60000 --return 5 --wr 4 --json
```

Deterministic monthly compounding at a constant *real* return (inflation already removed — never stack an inflation adjustment on top). The script prints the sensitivity grid and its own not-modeled list.

## Framework: The Honesty Rules

- **The 4% rule is a study, not a law** — one country, one era, 30-year horizons; early retirees have longer horizons, which is why the grid includes 3% and 3.5%
- **Sequence risk is unmodeled and largest near the finish** — a crash in year 1 of retirement ≠ a crash in year 20; say this every time
- **Real vs nominal discipline** — everything here is in today's dollars; mixing in nominal market returns (~+3%) silently is the classic error
- **A range is the deliverable** — "17–24 years depending on returns" is honest; "August 2043" is astrology with a spreadsheet

## Output Format

---

# FIRE Analysis: [name/scenario]

## The Number and the Path
[Script output: FIRE number, years at base assumptions, sensitivity grid]

## Reading the Grid
[Two sentences: the realistic range, and which assumption the user's plan is most hostage to.]

## What This Model Ignores
Sequence-of-returns risk (largest near the target date) · taxes · spending drift · [anything scenario-specific].

## The One Lever
[Of spend, contribution, and return: which change moves the date most for THIS user — usually spend, since it hits both sides.]

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

---

## Quality Checks

- [ ] Every assumption is labeled at point of use, not in a footnote
- [ ] The sensitivity grid appears — never a single years-to-target alone
- [ ] Real-vs-nominal is explicit and consistent
- [ ] Sequence-of-returns risk is named
- [ ] The disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not output a retirement *date* — output a range with its drivers
- [ ] Do not stack inflation adjustments on a real return, or skip them on a nominal one
- [ ] Do not treat 4% as physics — it's a parameter the grid varies
- [ ] Do not count home equity or emergency funds in invested savings without flagging it
- [ ] Do not present the model's output without its assumptions
