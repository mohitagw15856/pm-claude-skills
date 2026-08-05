---
name: childcare-comparison
description: "Compare childcare options — nursery/daycare, childminder, nanny, family, or a mix — for your family's real needs, budget, and values. Use when asked to compare childcare options, nursery vs nanny, how to choose childcare, or find the right childcare. Produces a needs-and-values profile, a side-by-side of the realistic options on cost/flexibility/socialization/control, the questions to ask and red flags to check on visits, a total-cost read (including subsidies), and a decision that fits your priorities — not a generic ranking."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/childcare-comparison.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Childcare Comparison

Childcare is one of the biggest, most emotional decisions a family makes, and the "best" option is entirely personal — it depends on your hours, budget, values, and child. This builds a clear comparison of the realistic options against *your* priorities, arms you with the right questions and red flags for visits, and lands on a recommendation that fits your family rather than a one-size ranking.

## What This Skill Produces

- **A needs-and-values profile** — hours, budget, what matters most (socialization, flexibility, one-on-one, cost, values)
- **A side-by-side comparison** — nursery/daycare vs. childminder vs. nanny vs. family/mix on cost, flexibility, socialization, sickness backup, control, and continuity
- **Visit questions & red flags** — what to ask and observe (ratios, staff turnover, safety, warmth, licensing)
- **A true-cost read** — full cost including any subsidies, tax help, and hidden extras
- **A fitting recommendation** — the option (or combination) that best matches the family's priorities and constraints

## Required Inputs

Ask for these if not provided:
- **The need** — child's age, hours/days required, start date
- **Budget** — what's realistic, and awareness of any subsidies/support
- **Priorities** — socialization, flexibility, one-on-one care, cost, specific values
- **Constraints** — location, work schedules, backup for sick days, family nearby
- **Options considered** — what's available/appealing locally

## Framework: Match Options To Your Priorities

1. **Define priorities first.** There's no universal best — clarify what this family most needs (cost, flexibility, socialization, control) before comparing.
2. **Compare on what matters to them.** Line up the realistic options against those priorities plus the practical must-haves (sick-day backup, hours, continuity).
3. **Cost it honestly.** Compare *total* cost including subsidies/tax support and extras (meals, deposits, agency fees, holiday pay for a nanny).
4. **Equip the visit.** Give the questions to ask and red flags to watch (ratios, turnover, licensing, safety, and the hard-to-fake warmth of the place).
5. **Recommend for the family.** Land on the best fit — often a combination — tied explicitly to their stated priorities, not a generic verdict.

## Output Format

### Childcare: child age [x] · [hours needed] · budget [y] · priorities [z]

**Options side-by-side**
| Option | Cost (total) | Flexibility | Socialization | Sick backup | Control |
|---|---|---|---|---|---|
| Nursery/daycare | | | | | |
| Childminder | | | | | |
| Nanny | | | | | |
| Family/mix | | | | | |

**On visits — ask/observe:** [ratios · turnover · licensing · safety · warmth · daily routine].
**True cost:** include [subsidies/tax help + hidden extras].
**Best fit for you:** [option/combo] — because [ties to their priorities].

## Quality Checks
- [ ] Starts from the family's priorities, not a generic ranking
- [ ] Compares realistic options on the dimensions that matter to them
- [ ] Includes total cost with subsidies and hidden extras
- [ ] Provides visit questions and red flags
- [ ] Recommends a fit (often a combination) tied to their priorities
- [ ] Accounts for practical needs (sick backup, hours, continuity)

## Anti-Patterns
- **Declaring one option "best"** regardless of the family.
- **Comparing headline price** without subsidies/extras.
- **No visit guidance** — missing the red flags that matter.
- **Ignoring practical realities** like sick-day backup.
- **Overlooking a mix** that might fit better than any single option.

## Example Trigger Phrases
- "Nursery or a nanny — which is right for us?"
- "Help me compare childcare options for our 1-year-old."
- "What should I ask when visiting a daycare?"
- "How do I choose childcare on a tight budget?"
- "We need part-time care with backup for sick days — what fits?"
