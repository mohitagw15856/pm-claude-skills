# EV vs Gas Skill

The EV question is a crossover question: a higher price tag melting under lower running costs, with the answer living in *your* numbers — miles driven, electricity price (home vs. public charging are different products), and how long you keep cars. This skill runs the cumulative math year by year and reports where the lines cross, then is honest about what the model can't see: battery risk, a resale market still finding its feet, and the charger install that belongs in the purchase price.

## What This Skill Produces

- **The cumulative table** — EV vs gas total cost per year over the horizon, from the script
- **The crossover year** — where the EV pulls ahead, or the finding that it doesn't within the horizon
- **The per-year energy math** — miles ÷ efficiency × price, both sides, shown not asserted
- **The not-modeled list** — battery, resale, charger install, price drift — stated up front

## Required Inputs

Ask for these if not provided:
- **The two candidates' prices** — the actual EV and the *comparable* gas car (same class — comparing a luxury EV to an economy gas car answers a different question); applicable incentives, flagged as verify-eligibility
- **Annual miles** — the single biggest lever; low-mileage drivers should see how far the crossover moves
- **Electricity reality** — home charging rate if they have it, or an honest blended rate if they'd rely on public charging (often 2–3× home rates — it can erase the fuel advantage; say so)
- **Ownership horizon** — a crossover at year 6 means opposite things to a 3-year and a 10-year keeper

## Programmatic Helper

```bash
python3 scripts/ev_vs_gas.py --ev-price 42000 --gas-price 33000 --incentive 7500
python3 scripts/ev_vs_gas.py --ev-price 42000 --gas-price 33000 --miles 15000 --kwh-price 0.16 --gas-price-gal 3.60 --json
```

Deterministic. Defaults are labeled and overridable: 3.3 mi/kWh, 32 mpg, $0.15/kWh, $3.50/gal, maintenance $500 vs $900, +$150/yr EV insurance. Home-charger install cost belongs added to `--ev-price`.

## Framework: The Honest-Comparison Rules

- **Comparable cars or no comparison** — the EV premium is only measurable against the same class and trim ambition
- **Charging mix is the hidden variable** — a driveway and a garage outlet make the EV case; apartment dwellers on public fast-charging should run the number with the real blended rate and often watch the advantage halve
- **Miles drive everything** — the crossover year scales inversely with annual miles; run 8k/12k/16k when the user is unsure, because the answer often flips inside that range
- **Incentives are real but conditional** — income caps, model eligibility, lease pass-throughs; count them at face value only with the verify flag attached
- **The not-modeled items are not tie-breakers, they're error bars** — battery warranty terms and resale uncertainty argue for humility near close calls, not for either side automatically

## Output Format

---

# EV vs Gas: [candidates] over [N] years

## The Table and the Crossover
[Script output: upfront gap, per-year deltas, cumulative table, crossover year]

## Reading It
[Two sentences: what the crossover means against their stated ownership horizon, and which input the answer is most hostage to — usually miles or charging mix.]

## Sensitivity
[The crossover at miles −25% / stated / +25%, or home-vs-public charging rates — one line each]

## What This Model Ignores
Battery replacement risk (and its warranty) · resale-value differences in an evolving market · home-charger install (add it to the EV price) · fuel/electricity price drift · the non-financials (driving feel, emissions, refueling time) — which are allowed to decide close calls.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

---

## Quality Checks

- [ ] The gas comparator is genuinely the same vehicle class
- [ ] Charging mix is asked about, and public-heavy charging is priced honestly
- [ ] The crossover is read against the user's stated ownership horizon
- [ ] At least one sensitivity line varies miles or charging rate
- [ ] Incentives carry the verify-eligibility flag

## Anti-Patterns

- [ ] Do not compare across vehicle classes and call it an EV premium
- [ ] Do not default everyone to home-charging rates — it's the assumption that most flatters the EV
- [ ] Do not present the crossover as a verdict for short-horizon owners — before the crossover, the gas car is winning, and some owners live entirely there
- [ ] Do not let advocacy (either direction) into the arithmetic — the model is agnostic; the not-modeled list keeps it honest
- [ ] Do not model fuel/electricity price predictions — drift is named, not forecast
