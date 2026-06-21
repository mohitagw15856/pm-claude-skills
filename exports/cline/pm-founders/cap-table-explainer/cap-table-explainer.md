# Cap Table Explainer Skill

Dilution math quietly decides how much of your company you keep. This skill walks through it with real numbers — pre/post-money, SAFEs, option pools, and conversions — so the founder sees exactly who owns what and why. **Not legal or financial advice; confirm with counsel before signing.**

## Working from a brief

Given partial terms, **work the full example anyway** with the numbers provided, and clearly state every assumption (e.g. *assumed $1M pre-existing on a $X pre-money*). If numbers are missing, pick clean illustrative ones and label them. Never leave the math as "[calculate]".

## Required Inputs

Ask for (if not already provided), else use labelled illustrative figures:
- **Current ownership** (founders %, existing investors, current option pool)
- **The round**: amount raised, pre- or post-money valuation, instrument (priced equity, SAFE, convertible note)
- **SAFE/note terms** if any: cap, discount, MFN
- **New option pool** target, and whether it's pre- or post-money ("the pool shuffle")

## Output Format

### 1. Plain-English summary
What this round does to ownership, in 3 sentences.

### 2. Ownership before → after

| Holder | Shares / % before | % after this round |
|---|---|---|
| Founders | | |
| Existing investors | | |
| Option pool | | |
| New investor(s) | | |
| **Total** | 100% | 100% |

### 3. The math, step by step
- Post-money = pre-money + amount raised (or the reverse for post-money SAFEs)
- New investor % = amount ÷ post-money
- Show SAFE conversion (cap vs discount — whichever is better for the investor) explicitly
- Show the **option pool shuffle**: a "pre-money pool" dilutes founders, not the new investor — quantify it

### 4. What this costs the founder
The single dilution number that matters, and the one term quietly driving it.

### 5. Traps & watch-outs
- Pre-money option pool (dilutes you, not the VC)
- Stacked SAFEs converting at once (often more dilution than founders expect)
- Liquidation preferences / participation (economics ≠ ownership %)

## Quality Checks

- [ ] Before/after table sums to 100% both columns
- [ ] SAFE conversion uses the investor-favourable of cap vs discount, shown explicitly
- [ ] The option-pool shuffle is quantified, not hand-waved
- [ ] Includes the "not legal/financial advice — confirm with counsel" disclaimer

## Anti-Patterns

- Confusing pre- and post-money (the most common, most expensive error)
- Ignoring the option pool's dilution effect
- Treating ownership % as the whole story while ignoring liquidation preferences
- Presenting math without stating assumptions
