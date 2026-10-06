# Example: runway-planner

## What this skill does

Turns burn and cash into a runway picture and a raise decision: months left, a default-alive or default-dead verdict, scenarios with hires or cuts, dated trigger points, and the one highest-impact lever. Not financial advice.

## How to trigger it

### Example 1: the basic reckoning

**You say:**
> "Calculate our runway: £620k cash, costs £85k/month, revenue £22k/month growing ~8% monthly. We want to hire 2 engineers at £7k/month each from January."

**Claude produces (excerpt):**

### 1. Runway today
- **Net burn:** £63k/mo · **Cash:** £620k · **Flat divide:** **9.8 months** (to ~August 2027)
- With revenue growing 8%/month, the month-by-month projection stretches that to **~11 months**; growth is doing real work, so the flat divide understates you.

### 2. Default-alive or default-dead?
**Default-dead, narrowly.** At 8% monthly growth, revenue reaches your £85k cost base in ~18 months; cash lasts ~11. The gap is roughly 7 months. You need growth nearer 14%/month, lower costs, or a raise; one of the three, chosen on purpose.

### 3. Scenarios

| Scenario | Net burn (start) | Runway | Effect |
|---|---|---|---|
| Current | £63k | ~11 mo | default-dead by ~7 months |
| With 2 hires (Jan) | £77k | ~8.5 mo | gap widens to ~12 months |
| Lean (no hires, −£8k costs) | £55k | ~13 mo | gap narrows to ~4 months |

### 4. Trigger points (dated)
- **Start raising by:** February 2027 (6 months of runway left; raises take 3-6 months)
- **Decision point:** December 2026; if monthly growth is still under 10%, the January hires don't happen
- **Out of cash:** ~August 2027, the hard floor

### 5. The one lever
The hires are the lever, in reverse: they buy speed only if speed converts to growth. Make them conditional on the December growth gate and you keep both futures open for free.

### Example 2: deciding between a bridge and cuts

**You say:**
> "Same company, growth stalled at 3%. An insider offers a £200k bridge at a 20% discount. Take it or cut?"

**Claude produces (excerpt):**

### 2. Default-alive or default-dead?
At 3% growth the revenue line never catches the cost base inside any plausible runway: **structurally default-dead**. That changes what the bridge is: at 11 months of runway it would buy time to fix growth; at 3% growth with no diagnosis, it buys 3 more months of the same chart. 

**The sequence that protects you:** cut to the lean plan first (13 months), spend one month diagnosing why growth stalled, and only then decide on the bridge. A bridge taken *after* a credible fix story is cheaper and larger; one taken during a stall prices the stall in.

Not financial advice; the numbers are the argument, the decision stays yours.

## Tips for best results

- Give cash, costs and revenue separately with growth rates; net burn alone hides the trajectory.
- Date everything; "6 months of runway" is a fact, "start raising by February" is a plan.
- Revisit monthly; a runway plan decays the moment either growth or burn moves.

## Related skills

- `runway-monte-carlo` to turn this single-path view into a distribution with volatility
- `investor-cold-email` when the trigger date arrives and the raise starts
