---
aliases: ["Tornado Sensitivity"]
tags: [pm-skills, skill]
skill: tornado-sensitivity
description: "Which assumption actually moves the answer — one-at-a-time sensitivity, ranked into a tornado. Use when a model's output is being argued about (LTV, ROI, forecast) and the room is debating drivers that don't matter, or before spending diligence effort: swing every driver low→high and see which one owns the outcome. Produces the ranked tornado table, share-of-swing per driver, and a real .xlsx — via the bundled zero-dependency script with a safely restricted formula evaluator."
---

# Tornado Sensitivity

Every model has four drivers people argue about and one that actually controls the answer — usually not the same one. The tornado ranks them: hold everything at base, swing one driver to its low and high, measure the output range, sort. Diligence goes to the top bar; the bottom bars stop hijacking meetings.

## Required Inputs

- **The model** — output name, a formula over named drivers (arithmetic + min/max/abs/sqrt/log/exp only), and per-driver low/base/high. The lows and highs should be *defensible bounds* ("the worst quarter we've seen", "the vendor's contractual ceiling"), not ±10% ritual.
- If the requester has a spreadsheet instead of a formula: extract the output cell's driver chain into a formula first, and show it for confirmation.

## Output Format

1. **The tornado table** — drivers sorted by output swing, with input range, output at each end, and **share of total swing**. The top driver's share is the headline ("lifetime owns 33% of the uncertainty").
2. **The meeting verdict** — one paragraph: what deserves diligence, what deserves a decision-and-move-on, and any driver whose *bounds* are the real problem (huge swing because nobody actually knows the range).
3. **The interaction caveat** — one-at-a-time ignores correlated drivers; if two move together in reality (price and churn), say so and model the pair as one driver.

## Programmatic Helper

Ships `scripts/tornado.py` — **zero dependencies**, with a restricted evaluator (driver names + six math functions; anything else is rejected — injection-tested):

```bash
python3 scripts/tornado.py run tornado.xlsx --model model.json
```

Prints `base=1.371 · top driver: lifetime (swing 1.097, 33% of total)` and writes Summary + Tornado sheets. Requires a code-execution environment.

## Quality Checks

- [ ] Swings computed by the script, quoted — never reasoned in prose
- [ ] Bounds provenance is stated per driver (measured / contractual / guess) — a tornado of guesses is honestly labelled one
- [ ] Share-of-swing sums are shown so the ranking's decisiveness is visible
- [ ] Correlated drivers are named and the caveat applied to them specifically
- [ ] The verdict names what to STOP arguing about — the negative guidance is half the value

## Anti-Patterns

- [ ] Do not use symmetric ±X% on every driver — uniform ranges produce a tornado shaped by formula structure, not by knowledge
- [ ] Do not read the top bar as "most likely to be wrong" — it's "most consequential if wrong"; confidence and consequence are different columns
- [ ] Do not run tornado on a model whose formula the owner hasn't confirmed — sensitivity on the wrong model is confidently useless
- [ ] Do not let a huge-swing driver with made-up bounds stand — the recommendation there is "go find the real range", not "panic"
- [ ] Do not present this as risk analysis — it's attention allocation; downstream probability work still exists

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
