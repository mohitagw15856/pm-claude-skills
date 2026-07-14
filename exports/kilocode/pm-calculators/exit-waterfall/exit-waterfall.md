# Exit Waterfall Skill

A cap table is a promise about percentages; an exit waterfall is what actually happens to the money. The difference — liquidation preferences, participation, option strikes — routinely stuns founders at the worst possible moment. This skill computes the waterfall across exit prices and, more importantly, translates it: the price below which your shares are worth nothing, and the price where everyone finally converts.

## What This Skill Produces

- **The payout table** — every stakeholder's dollars at each exit price, with conversion decisions shown
- **The cliff points** — where preferences stop dominating, where options come into the money
- **The plain-English reading** — "you need a $X exit for your common to mean anything" stated as a sentence

## Required Inputs

Ask for these if not provided:
- **Share classes** — for each: name, share count, type (common / preferred / options); for preferred: amount invested, preference multiple, participating or not; for options: strike
- **Exit prices to test** — or default to a spread around the last round's valuation (label it as a default)

## Programmatic Helper

The math ships as a deterministic script — run it rather than arithmetic-by-hand:

```bash
python3 scripts/exit_waterfall.py cap.json
python3 scripts/exit_waterfall.py cap.json --exit 50000000 --json
```

Input shape and worked example are in the script docstring. It brute-forces the conversion equilibrium (each non-participating preferred converts only when as-converted beats its preference) and applies the treasury method to options. **Stated simplifications:** preferences are pari passu (no seniority stacking) and participation is uncapped — flag both when the real cap table differs, and say the numbers shift accordingly.

## Formula (readable form)

- Non-participating preferred takes **max(preference, as-converted value)** — preference = invested × multiple
- Participating preferred takes **preference + pro-rata of the remainder** (why "participating" is the term sheet word worth fighting)
- Options exercise only when per-share common value > strike; strike proceeds join the pool
- Remainder splits pro-rata among common + converted + participating shares

## Output Format

---

# Exit Waterfall: [Company]

## Payout Table
[The script's table: exit price × stakeholder, with the converts column]

## What This Means
- **Below $[X]:** preferences consume everything — common gets zero
- **At $[Y]:** [class] converts; the structure starts behaving like percentages
- **The sentence:** "Your [n]% is worth [n]% only above $[Z]; below $[W] it is worth nothing."

## Assumptions & Limitations
[Pari passu, uncapped participation, valuation of the classes as supplied — every deviation from the real documents named.]

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

---

## Quality Checks

- [ ] Conversion decisions are computed, not asserted — the table shows who converts at each price
- [ ] The zero-for-common threshold is stated explicitly as a price
- [ ] Every simplification the model makes vs the real documents is named
- [ ] Payouts at each price sum to the exit value (plus/minus rounding)
- [ ] The disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not present ownership percentages as payout percentages — the gap between them is this skill's entire reason to exist
- [ ] Do not model participation caps or seniority stacking silently — the script doesn't; say so
- [ ] Do not average across exit prices — the cliff structure IS the information
- [ ] Do not run the numbers without the plain-English sentence — founders remember sentences, not tables
