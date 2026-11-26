# Worked Example — Exit Waterfall

## The brief

Two founders of Brightgate (6M common shares between them) raised a $2M seed (1.5M shares, 1× non-participating) and an $8M Series A (2.5M shares, 1× non-participating); a 1M-share option pool at $0.80 strike. An acquirer floats "$25–35M." Founders ask: "what do we actually take home across realistic prices?"

## The output

# Exit Waterfall: Brightgate

## Payout Table (script output — `exit_waterfall.py cap.json`)

```
          exit        Founders            Seed        Series A         Options  converts
    10,000,000               0       2,000,000       8,000,000               0  -
    30,000,000      16,094,118       4,023,529       8,000,000       1,882,353  Seed
    60,000,000      33,163,636       8,290,909      13,818,182       4,727,273  Seed,Series A
   120,000,000      65,890,909      16,472,727      27,454,545      10,181,818  Seed,Series A
```

## What This Means

- **Below $10M:** preferences consume everything — the $10M in preferences ($2M + $8M) is paid before a dollar reaches common. Founders' 54.5% ownership is worth **$0** at a $10M exit.
- **At $30M:** Seed converts (its 13.6% as-converted beats its $2M preference), but **Series A still takes its $8M preference** — its as-converted value ($7M) is below $8M. The floated "$25–35M" range sits exactly in this regime: founders take ~$13–19M, meaningfully less than ownership-percentage math suggests.
- **At $60M:** everyone converts; the cap table finally behaves like its percentages.
- **The sentence:** *"Your 54.5% is worth 54.5% only above ~$59M; below $10M it is worth nothing; in the deal range being discussed, expect ~54% of (price − $8M preference)."*

## Assumptions & Limitations

Pari passu preferences (no seniority stacking — check your actual documents: many A rounds are senior to seed), uncapped participation not present here, option strikes netted via the treasury method. Any deviation in the definitive documents shifts these numbers — this model informs the conversation, the documents decide it.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

## Why it's shaped this way

- **The table is the script's actual output** — computed conversion equilibria (Seed converts at $30M, Series A holds), never hand-asserted; the skill's core promise is arithmetic you can re-run.
- **The reading translates each regime into founder-take language** — cliff points are the information; percentages are the illusion the skill exists to correct.
- **The floated deal range gets its own sentence** — generic waterfalls inform; a waterfall evaluated *at the offer* decides.
- **Simplifications are named with their direction of error** (seniority stacking would make it worse for founders) — honest models state where they flatter.
- **The one-sentence summary is quotable in a board meeting** — that sentence is what the founders came for.
