---
name: solar-breakeven
description: "Model whether solar panels pay for themselves for your roof — net cost after incentives, bill offset with degradation, electricity inflation, the inverter replacement, and the breakeven year, plus the policy risk no calculator controls. Use when asked are solar panels worth it, when does solar break even, check this solar quote's payback claim, or model solar for my bill. Produces the year-by-year table from the script, the breakeven year, the quote-vs-model comparison, and the not-modeled list led by net-metering risk."
---

# Solar Breakeven Skill

Every solar quote comes with a payback claim, and the claim always assumes the sunny version: full incentive eligibility, generous net metering forever, zero maintenance. This skill runs the honest model — net cost after *verified* incentives, offset that degrades ~0.5%/yr, electricity prices that inflate, and the inverter that dies around year 12 — and reports the breakeven year with its assumptions labeled. The biggest risk stays outside every model and gets named instead: net-metering policy is a regulatory decision that can change under you, and it moves paybacks by years.

## What This Skill Produces

- **The year-by-year table** — savings, cumulative, vs-cost — from the script
- **The breakeven year** — and the net gain at the 25-year warranty horizon
- **The quote check** — the installer's payback claim vs. this model, with the assumption gaps named
- **The not-modeled list** — net-metering risk first, financing interest, roof interactions

## Required Inputs

Ask for these if not provided:
- **The quote** — installed cost, claimed incentives (flagged verify-eligibility — incentives have income, tax-liability, and program caps), the claimed payback for comparison
- **The bill** — current monthly, and the offset % the installer claims (their number, tested; 80–95% is typical for a well-sized system)
- **Ownership horizon** — moving in 6 years changes everything; solar's value transfer at sale is uncertain and the model says so
- **Financing** — cash or loan; a loan adds interest the breakeven must also clear (run [the loan math] separately and add it — the script models the cash case)

## Programmatic Helper

```bash
python3 scripts/solar_breakeven.py --cost 22000 --incentive 6600 --bill 190
python3 scripts/solar_breakeven.py --cost 22000 --incentive 6600 --bill 190 --offset 90 --json
```

Deterministic. Defaults: 85% offset, 3% electricity inflation, 0.5%/yr degradation, $2,000 inverter at year 12, 25-year horizon — every one overridable to match the quote's claims, which is how quotes get tested.

## Framework: The Honest-Model Rules

1. **Net cost means verified incentives:** tax credits require tax liability to credit against; rebates have program caps and expiry — the model runs at face value with the verify flag, and a second run at zero-incentive shows what eligibility risk costs.
2. **Test the quote by adopting its assumptions:** run the script with the installer's offset and inflation numbers — if their payback claim still doesn't reproduce, the gap is usually missing degradation, the inverter, or arithmetic optimism; show the diff line by line.
3. **Electricity inflation cuts both ways:** it's the assumption doing the most quiet work — at 1% vs 5% the breakeven moves by years; the sensitivity line runs both and says which side of the bet the buyer is taking.
4. **Net metering is the named elephant:** the model implicitly assumes exported power keeps earning bill-rate credit; jurisdictions have changed these terms with real paybacks stranded mid-curve. It can't be modeled honestly — it gets *stated* honestly, every time, with "check your utility's current tariff and its grandfathering terms" as homework.
5. **The horizon question is the ownership question:** breakeven at year 9 is great for a 20-year owner and speculative for a 5-year one — resale value transfer is genuinely uncertain (and leased systems complicate sales enough to deserve their own warning). The read is delivered against *their* stated horizon.

## Output Format

---

# Solar Breakeven: [system cost] — [bill]/mo

## The Table and the Breakeven
[Script output: years 1–5 + milestones · breakeven year · net gain at horizon]

## Quote Check
[Their claimed payback vs. this model at their assumptions · the gap, itemized]

## Sensitivity
[Breakeven at electricity inflation 1% / 3% / 5% · at zero incentives — one line each]

## What This Model Ignores
**Net-metering policy risk** (the big one — verify the current tariff and grandfathering) · financing interest if loaned · roof repairs under panels · resale-value transfer uncertainty · lease-vs-own complications.

*Incentive eligibility and utility tariffs are jurisdiction-specific and change — verify both before signing. Educational model, not financial advice.*

---

## Quality Checks

- [ ] Incentives carry the verify-eligibility flag and a zero-incentive sensitivity run
- [ ] The quote's claim is reproduced-or-diffed at its own assumptions
- [ ] Degradation and the inverter replacement are in the model
- [ ] Net-metering risk is stated with its homework, unmodeled and unhidden
- [ ] The breakeven is read against the user's stated ownership horizon

## Anti-Patterns

- [ ] Do not accept the quote's payback as the baseline — reproduce it or show why it doesn't reproduce
- [ ] Do not model net metering as eternal — name it as policy, not physics
- [ ] Do not ignore the inverter — a known cost at a known-ish year is not a surprise
- [ ] Do not run only the sunny case — the zero-incentive and low-inflation runs are the honesty
- [ ] Do not moralize either way — solar pencils brilliantly on some roofs and poorly on others; the table decides, not the vibe
