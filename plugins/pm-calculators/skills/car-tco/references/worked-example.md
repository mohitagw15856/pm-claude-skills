# Worked Example — Car TCO

A gold-standard run of this skill: a "my old car needs $2,000 of work, should I just get something new?" question, answered by putting all four options on the same total-cost basis.

## The brief

Rafael's 9-year-old sedan (worth about $9,000) needs roughly $2,000 of suspension and brake work, and the repair quote has him browsing: a new compact SUV at $38,000, a 3-year-old certified version at $24,000, or a lease at $420/month. He drives about 12,000 miles a year and historically keeps cars "until they die" — call it an 8-year planning horizon. His current maintenance run-rate, repair years included, is about $1,800/year. His instinct: "Putting $2,000 into a $9,000 car feels like throwing good money after bad."

## The output

### Car TCO: keep vs used vs new vs lease, over 8 years

**The Ranking** (script: `python3 scripts/car_tco.py --new-price 38000 --used-price 24000 --lease-month 420 --keep-value 9000 --keep-maint 1800`)

```
total cost of ownership over 8 years (12,000 mi/yr):
  keep_current      45,487   (474/mo)
  buy_used          51,485   (536/mo)
  buy_new           56,882   (593/mo)
  lease_forever     75,540   (787/mo)
cheapest on these assumptions: keep_current
```

**Reading the Ranking:** Keeping the sedan wins by about **$6,000 over the certified used option** and $11,400 over new — even with its maintenance modeled at $1,800/year *ramping 8% annually* (the model already assumes it keeps getting needier). The $2,000 repair that triggered this question is about **one year of the new SUV's depreciation** — the invisible line item that never appears on a payment statement. The gap between keep and buy-used (~$750/year) is real but not enormous; the assumption that could flip it is a major failure — if the sedan needs a transmission at year 3, keep-current's number converges on buy-used's, which is exactly the "margins under 10% are noise" territory the model warns about. Lease-forever trails by $30,000 because eight years of leasing means eight years of paying peak-depreciation pricing with two drive-off fees — it buys flexibility and a permanent new-car experience, and it's honest to price that as the luxury it is.

**What This Model Ignores:** Financing interest (a loan on the $38k option widens its gap further — run the loan separately), taxes and fees by jurisdiction, reliability luck in both directions (the sedan could die; the used SUV could be a lemon), and the non-financials — safety-feature generations, and the plain wanting of a new car, which is allowed to win *knowingly* at a stated price of ~$1,400/year over keeping.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

## Why it's shaped this way

- **The $2,000 repair is compared to the replacement's depreciation, not to the car's value** — "good money after bad" mentally weighs the repair against the $9,000 car; the framework's payment-illusion rule weighs it against year one of the alternative's depreciation, which is the comparison that actually prices the decision.
- **All four scenarios share one horizon and mileage** — 8 years, 12,000 miles — because the classic error (3-year lease math vs. 8-year ownership math) makes leasing look competitive by comparing different questions; the quality checks forbid it.
- **Resale value is credited in every ownership scenario** — TCO is spend minus recovery, which is why the $38,000 new car costs $56,882 rather than $38,000-plus-gas: depreciation, not price, is the real number.
- **The keep-current option got an honest maintenance ramp, not a fear premium** — $1,800 ramping at 8%/yr already encodes "old cars get needier"; per the anti-patterns, maintenance fears are modeled, not vibed.
- **The near-miss between keep and used is flagged as fragile** — the sub-10%-margins-are-noise rule appears exactly where it applies, with the transmission scenario named as the flip condition, so the reader knows which future events invalidate the ranking.
- **The want is priced, not moralized** — the final section states what choosing the new car costs per year over keeping, and explicitly permits it; the skill's job is open eyes, not austerity.
