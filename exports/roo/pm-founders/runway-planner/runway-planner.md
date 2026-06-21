# Runway Planner Skill

Runway is the number that decides everything else. This skill turns cash and burn into months of runway, a default-alive/dead verdict (à la Paul Graham), and the dated triggers for when to raise or cut — so the founder isn't surprised. **Not financial advice; confirm with your finance lead.**

## Working from a brief

Given partial numbers, **do the full calculation anyway** with labelled illustrative figures where needed. Show the arithmetic. Never leave it as "[calculate runway]."

## Required Inputs

Ask for (if not already provided), else use clearly-labelled illustrative numbers:
- **Cash in bank** today
- **Monthly net burn** (gross burn minus revenue) and whether it's growing
- **Revenue** today and its growth rate (if any)
- **Planned changes** — hires, spend increases, or cuts being considered
- **Context** — when they last raised, what they're optimising for

## Output Format

### 1. Runway today
- **Net burn:** $X/mo · **Cash:** $Y · **Runway:** Y ÷ X = **N months** (to ~[month/year])
- If burn is growing or revenue ramping, show a simple month-by-month projection, not just a flat divide.

### 2. Default-alive or default-dead?
On current growth and burn, will revenue cover costs *before* the money runs out? State the verdict and the gap.

### 3. Scenarios

| Scenario | Net burn | Runway | Effect |
|---|---|---|---|
| Current | | | |
| With planned hires | | | |
| Lean (cuts) | | | |

### 4. Trigger points (dated)
- **Start raising by:** [date] — typically when ~6 months of runway remain (raising takes 3–6 months)
- **Decision/cut point:** [date] — if [milestone] isn't hit, what changes
- **Out of cash:** [date] — the hard floor

### 5. The one lever
The single highest-impact move (a cut, a price change, a growth push) and what it does to the runway date.

## Quality Checks

- [ ] Runway math is shown, not just stated; accounts for growing burn / ramping revenue if relevant
- [ ] Gives a clear default-alive vs default-dead verdict
- [ ] Trigger dates work back from the 3–6 months a raise actually takes
- [ ] Includes the "not financial advice" disclaimer

## Anti-Patterns

- Flat cash ÷ burn when burn is clearly growing
- Ignoring that raising takes months (planning to start at 2 months left)
- Vague advice ("extend runway") instead of a quantified lever and date
- Treating gross burn as net (ignoring revenue)
