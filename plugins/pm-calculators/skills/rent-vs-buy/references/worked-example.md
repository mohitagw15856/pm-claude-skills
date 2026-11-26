# Worked Example — Rent vs Buy

A gold-standard run of this skill: a couple sure that "rent is throwing money away," walked through the symmetric model to a breakeven-year answer that depends on the one input they hadn't considered — how long they'll stay.

## The brief

Ana and Jules pay $2,200/month for a two-bedroom and are looking at buying a comparable $450,000 two-bedroom condo four blocks away. They have the 20% down payment saved. Jules opens with "every month renting is money down the drain." Pressed on how long they'd stay: "five years, maybe more — Ana's job might move us in 2029." They accept the defaults after having each one explained: 6.5% mortgage (their pre-approval), 3% appreciation, 3% rent growth, 5% return on invested savings, 2% carry, 3%-in/7%-out transaction costs, 15-year model.

## The output

### Rent vs Buy: $450k condo vs $2,200 comparable rent

**The Table and the Breakeven** (script: `python3 scripts/rent_vs_buy.py --price 450000 --rent 2200`)

```
mortgage: 2,275.44/mo · buy-in: 103,500
year   owner net    renter net       edge
   1      75,079       118,850    -43,772
   3     110,204       150,309    -40,105
   5     148,157       182,757    -34,601
   8     210,979       233,206    -22,227
  10     257,235       267,950    -10,715
  12     307,391       303,507      3,884
  15     390,796       358,176     32,620
breakeven: year 12
```

**What the Breakeven Means:** On these assumptions, buying doesn't pass renting until **year 12** — and you told me year 5 is a real exit scenario. Selling in year 5 leaves you roughly **$34,600 behind** the renting-and-investing path, mostly because the $103,500 buy-in and the 7% exit cost haven't had time to be outrun by equity. The conclusion is most hostage to two assumptions: appreciation (at 4% instead of 3%, breakeven pulls in to roughly year 8; at 2% it pushes past 15) and whether you'd genuinely invest the difference — the renter column assumes the $103,500 stays invested at 5% and the annual owner-cost gap gets invested too. If the honest answer is "we'd spend it," the renting column is fiction and buying wins on forced-savings grounds alone — that's a behavior finding, not a math finding, and it's worth saying out loud.

**What This Model Ignores:** Taxes and deductions (jurisdiction-specific — could favor either side), renovation surprises, refinancing if rates drop, and the non-financials: the yard you can dig in, the landlord you never call again, the flexibility a 2029 job move would want. Those are allowed to outvote the math — but now they'd be outvoting it knowingly.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

## Why it's shaped this way

- **The deliverable is a breakeven horizon, not a verdict** — "buying wins if you stay past year 12" is the skill's honest output shape, and it converts Jules's certainty into a question about the 2029 job move, which is the actual decision variable.
- **"Rent is thrown away" got answered with symmetry, not debate** — the model charges the owner their real non-equity costs (interest, 2% carry, 7% exit) exactly as it charges the renter their rent; that's the framework's core rule, applied silently by the table instead of argued.
- **The renter-invests-the-difference assumption is named as load-bearing** — per the quality checks, the artifact says explicitly that a spent difference flips the conclusion, because that single behavioral honesty question decides more rent-vs-buy outcomes than any rate.
- **Selling costs live inside every year's owner net** — equity you can't access without paying 7% isn't fully yours, which is why year-5 owner net looks so much worse than the mortgage statement would suggest.
- **One sensitivity (appreciation ±1%) is shown moving breakeven by ~4 years** — the framework requires the conclusion's hostage-taker be identified; here it's appreciation, and showing the swing inoculates against false confidence in either direction.
- **The non-financials get explicit permission to win** — the skill's anti-patterns forbid letting the math silently overrule stated life priorities; the 2029 move and the never-call-the-landlord line both appear beside the numbers, not beneath them.
