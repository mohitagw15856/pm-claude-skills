# Example: pricing-sensitivity-model

## What this skill does

Computes Van Westendorp price sensitivity from real survey answers: the optimal price point, indifference point and acceptable range, found by interpolation via a bundled zero-dependency script, with a live what-if spreadsheet.

## How to trigger it

### Example 1: analysing a completed survey

**You say:**
> "I ran the four-question pricing survey on 42 trial users for our £-per-month plan. Here's the JSON of responses [attached]. What price does it support?"

**Claude produces (excerpt):**

Running the bundled script:

```bash
python3 scripts/van_westendorp.py analyze pricing.xlsx --responses-file survey.json
```

**The four points** (n=40 valid, 2 non-monotone responses dropped):
- **OPP £12.05**: the too-cheap and too-expensive curves cross here; the price with least purchase resistance.
- **IPP £12.75**: where "cheap" and "expensive" balance; the market's sense of a normal price.
- **Acceptable range £9.66 to £15.05** (PMC to PME): outside this, you lose people to suspicion or sticker shock.

**Data hygiene:** a 5% drop rate is healthy; respondents understood the category.

**The recommendation:** £14, inside the range but above OPP: OPP minimises resistance, it does not maximise revenue, and your positioning is premium. The workbook's what-if shows £14 yields ~8% fewer buyers than £12 at 16% more revenue per buyer.

**The caveat:** Van Westendorp measures perception, not demand; run a real willingness-to-pay test before rebuilding the pricing page.

### Example 2: planning the survey first

**You say:**
> "We haven't run the survey yet. Set it up for our team plan."

**Claude produces (excerpt):**

**The four questions, exactly:**
1. At what price would [product] be so cheap you would doubt its quality?
2. At what price would it be a bargain?
3. At what price does it start to feel expensive, but you would still consider it?
4. At what price is it too expensive to consider?

**Survey rules:** open numeric answers in your billing currency; ask after the respondent has used the product; n of 40+ for a stable crossing; keep segments separable (plan, company size) so curves can be split later.

**Output you will hand back:** the JSON shape the script consumes: one object of four numbers per respondent.

## Tips for best results

- Bring the raw per-respondent answers, not averages; crossings come from cumulative curves.
- Survey people who know the category; confused respondents show up as a high drop rate.
- Treat OPP as the floor of resistance, not the price; position inside the range deliberately.

## Related skills

- `pricing-your-services` for freelance pricing rather than survey-based product pricing
- `tornado-sensitivity` to see which pricing assumption moves revenue most
