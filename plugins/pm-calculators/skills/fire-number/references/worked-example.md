# Worked Example — FIRE Number

## The brief

Renata, 34, has $85k invested, adds $2,200/month, and spends about $48k/year. "When can I stop working? Give me the real number, not a vibe."

## The output

# FIRE Analysis: Renata

## The Number and the Path (script output — `fire_number.py --savings 85000 --monthly 2200 --spend 48000`)

```
FIRE number: 1,200,000  (spend 48,000 / 4% withdrawal — an assumption, not a law)
years to reach at 5% real return: 20.8
sensitivity (years to target):
   wr \ return        3%        5%        7%
3% (1,600,000)      31.6      25.0      20.8
3.5% (1,371,429)      28.3      22.7      19.1
4% (1,200,000)      25.7      20.8      17.7
not modeled: sequence-of-returns risk, taxes, variable spending — this is a model, not a plan.
```

## Reading the Grid

The honest answer is **"roughly 18 to 26 years, most likely near 21"** — not a date. Your plan is most hostage to the **withdrawal-rate choice**: the same savings behavior means $1.2M at the historical-US 4% rule but $1.6M at the 3% an early retiree with a 50-year horizon might prefer — a four-to-six-year difference from one assumption you control with a pencil, not with returns.

## What This Model Ignores

Sequence-of-returns risk — largest near the target date: a 2008 in year 20 versus year 5 are different retirements with identical average returns · taxes (account types shift the real number) · spending drift (the $48k of a 34-year-old is a guess about a 55-year-old, and healthcare sits inside that guess).

## The One Lever

Not returns — **spend**. Cutting $6k/year of permanent spending does double work: it lowers the target by $150k (at 4%) *and* raises the contribution. Rerun: `--monthly 2700 --spend 42000` → target $1,050,000, reached in **~16.6 years at 5%** — four years earlier than the base case, from a lever entirely in your hands. No plausible portfolio tweak buys four years.

*Educational model, not financial advice — verify with a licensed professional before acting on it.*

## Why it's shaped this way

- **The deliverable is the grid plus a range** ("18–26 years"), never a date — the skill's core refusal of false precision.
- **The hostage assumption is named and quantified** (4% vs 3% = $400k of target) — sensitivity is only useful when translated into years.
- **Sequence risk is explained by scenario**, not just named — "a 2008 in year 20 vs year 5" is the sentence that makes the limitation real.
- **The one-lever section reruns the model** with actual numbers — advice that re-invokes the tool teaches the tool.
- **Everything stays in real (inflation-adjusted) terms** — the classic silent error, prevented by saying so.
