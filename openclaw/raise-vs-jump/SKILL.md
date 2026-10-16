---
name: raise-vs-jump
description: "Model staying for annual raises vs job-hopping for bigger bumps — cumulative earnings trajectories, the crossover year, and the costs the salary math hides (vesting resets, promotion paths, search risk). Use when asked should I switch jobs for more money, is job hopping worth it, model my salary if I stay vs leave, or raise versus new offer. Produces the year-by-year salary and cumulative-earnings table, the crossover year, and the not-in-the-model checklist that usually decides it."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/raise-vs-jump.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Raise vs Jump Skill

"Job hoppers earn more" is true on salary and incomplete on everything else: equity that vests on a cliff you keep resetting, the promotion you were two quarters from, the months of search time, the reputation cost of a short-stint résumé. This skill runs the salary math properly — trajectories, not single offers — and then insists on the checklist of what the salary math can't see, because that checklist decides more of these choices than the compounding does.

## What This Skill Produces

- **The trajectory table** — year-by-year salary and cumulative earnings for both paths
- **The crossover year** — when cumulative jump-earnings pass cumulative stay-earnings
- **The gap at horizon** — final salary gap and cumulative gap, on stated assumptions
- **The not-in-the-model checklist** — scored for this user's actual situation

## Required Inputs

Ask for these if not provided:
- **Current salary** and **realistic stay-raise %** — their employer's actual recent raises, not the poster in the break room (default 3%, labeled)
- **Jump assumptions** — bump per jump (default 15%), years between jumps (default 3), raises between jumps (default 2% — jumpers often land at the top of a band and stall)
- **The invisible items** — unvested equity and its schedule, pension/tenure benefits, promotion proximity, how they'd handle a search

## Programmatic Helper

```bash
python3 scripts/raise_vs_jump.py --salary 120000
python3 scripts/raise_vs_jump.py --salary 120000 --stay-raise 3.5 --jump-bump 18 --jump-every 3 --json
```

Deterministic. Models salary only — the script prints its own not-modeled list, and the skill's job is to make that list concrete for the user.

## Framework: What the Salary Math Hides

- **Vesting resets are the jump tax** — walking away from unvested equity and restarting a cliff is often worth more than the bump; compute it in dollars, not vibes
- **The stay path has step functions too** — a promotion is a 10–20% event; if one is genuinely close (named role, named timeline — not a vague "soon"), model it as a stay-side jump
- **Raises between jumps sag** — new hires land high in the band and then stall; that's the `--jump-year-raise 2` default, and it's why the crossover is later than the first bump suggests
- **Search risk is asymmetric** — a jump that takes 4 months of search or ends in a bad fit erases years of edge; weight it by how in-demand the user actually is
- **Three jumps is a pattern** — recruiters read tenure; the strategy that maximizes 5-year earnings can shrink 15-year options

## Output Format

---

# Raise vs Jump: [scenario]

## The Trajectories
[Script output: year-by-year table, crossover year, gaps at horizon]

## What the Table Says
[Two sentences: the size of the pure-salary edge and how sensitive it is to the bump/raise assumptions.]

## The Checklist the Table Can't See
| Item | This user | Weight |
|---|---|---|
| Unvested equity walked away from | [$ and schedule] | [often decisive] |
| Promotion proximity on the stay path | [named role/timeline or "vague"] | |
| Search risk | [in-demand? runway?] | |
| Résumé pattern | [tenure history] | |

## The Honest Read
[One paragraph: what the numbers plus the checklist actually suggest — a recommendation with its reasoning, not a dodge.]

*Educational model, not financial or career advice — the checklist items are prompts for the user's judgment, not scores from the model.*

---

## Quality Checks

- [ ] Trajectories and crossover shown — never just "the offer is 15% more"
- [ ] Unvested equity is computed in dollars if it exists
- [ ] A genuinely-close promotion is modeled, a vague one is named as vague
- [ ] The honest read takes a position with reasoning
- [ ] The disclaimer line appears in the artifact

## Anti-Patterns

- [ ] Do not compare a single offer number to a single current salary — trajectories or nothing
- [ ] Do not ignore equity because it's "complicated" — the complication is the money
- [ ] Do not treat "my manager hinted at promotion" as a modeled event — named role and timeline, or it's noise
- [ ] Do not assume the jump cadence repeats forever without naming the résumé-pattern cost
- [ ] Do not hide behind "it depends" — deliver the honest read with its reasoning

## Example Trigger Phrases

- "Should I switch jobs for more money?"
- "Model my salary if I stay vs leave."
- "Raise versus new offer."
