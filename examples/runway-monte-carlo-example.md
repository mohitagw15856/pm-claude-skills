# Example: runway-monte-carlo

## What this skill does

Simulates cash runway as a distribution rather than one number: P10/P50/P90 months, month-by-month death probabilities, the raise-by line, and a live spreadsheet, via a bundled zero-dependency simulator.

## How to trigger it

### Example 1: when to start the raise

**You say:**
> "Cash £840k. Net burn averages £70k/month but swings: revenue £30k ± £10k monthly, costs £100k ± £8k. When do we have to start fundraising?"

**Claude produces (excerpt):**

Running the bundled simulator (seeded, 10,000 paths):

**The distribution:**
- Naive cash ÷ burn: 12.0 months
- **P50: 11.8 months | P10 (unlucky): 9.4 | P90 (lucky): 14.6**
- Survival probability at 12 months: 47%

**The death curve:** paths start dying at month 8 (2%), steepening through months 10 to 12 (9% per month). Months 10 to 12 are the danger window.

**The decision line:** raise while **P10 exceeds your fundraise time**. At a 7-month raise cycle, your P10 clock crosses the line in roughly **2.4 months**. Start materially preparing now; open conversations within the quarter, not after the summer.

**Stated model limits:** normal noise, no fat tails, no seasonality, no bridge modelled. With two enterprise invoices making up most revenue, treat P10 as optimistic.

### Example 2: testing a cost cut

**You say:**
> "Same company. If we cut £15k/month of costs from month 3, what changes?"

**Claude produces (excerpt):**

**Re-run with the cut:**
- P50: 11.8 → 15.1 months | P10: 9.4 → 12.2 | Survival at 12 months: 47% → 71%

**What the cut buys in decision terms:** the P10-versus-raise-time crossing moves from ~2.4 months away to ~5 months away; you regain a quarter of optionality before fundraising becomes forced.

**The sharper framing for the board:** the cut is not "3 extra months of runway"; it is the difference between raising on your timeline and raising on the market's.

## Tips for best results

- Give burn and revenue with their monthly swing, even estimated; volatility is the point of the method.
- Say your realistic fundraise duration; the raise-by line is computed against it.
- Flag lumpy revenue (few large invoices); the model will tell you its P10 is optimistic and by how much to distrust it.

## Related skills

- `runway-planner` for the deterministic budget view behind the simulation inputs
- `schedule-monte-carlo` for the same honesty applied to delivery dates
