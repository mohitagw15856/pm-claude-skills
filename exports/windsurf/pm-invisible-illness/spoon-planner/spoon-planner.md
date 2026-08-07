---
trigger: model_decision
description: "Budget limited energy the way spoon theory describes it — count your realistic daily 'spoons', price what each task actually costs (including the invisible ones), protect the non-negotiables, and plan for the days you'll have far fewer. Use when someone says 'I only have so much energy', 'help me pace with my chronic illness', 'I keep crashing', or lives with ME/CFS, long COVID, fibromyalgia, POTS, MS, or any limited-capacity condition. Produces a spoon budget, a task price list, and a pacing plan that respects payback and post-exertional crashes. A self-management tool, not medical advice."
---

# Spoon Planner Skill

Spoon theory names what healthy people never have to think about: with a chronic
illness, energy is a finite daily allowance, every task costs from it, and
overspending isn't "pushing through" — it's borrowing against tomorrow at brutal
interest (the crash, the flare, post-exertional malaise). Standard productivity
advice assumes infinite spoons and actively harms here. This skill runs the actual
math: what you've got, what things cost, what's worth spending on, and how to plan
so a good day doesn't buy three bad ones. Pacing, not pushing.

## What This Skill Produces

- A **spoon budget**: your realistic daily allowance (which varies — the skill
  plans for the range, not a fantasy average) and how it shifts with sleep, flares,
  and weather
- A **task price list**: what your recurring activities actually cost in spoons —
  including the invisible costs (showering, socializing, decisions, masking,
  digesting) that ambush people
- A **pacing plan**: spending the allowance across the day/week with rest banked
  *before* the cost, not after the crash — and the "boom-bust" trap named
- A **crash-day protocol**: the pre-planned low-spoon day so a bad morning doesn't
  require decisions you won't have the spoons to make

## Required Inputs

Ask for (if not already provided):
- What a good day, an average day, and a bad day look like in energy (the range
  matters more than a number)
- The tasks of a normal week and which ones wreck the user disproportionately
- The condition's pattern: is there payback/post-exertional malaise (exertion today
  → worse in 1–2 days)? flares? predictable bad times?
- The non-negotiables — what must get spoons even on a hard day (meds, the kid, the
  one thing that keeps them sane)

## Framework

1. **Count honestly, plan for the low end.** The allowance isn't a fixed number and
   it isn't the good-day number. Budget to a realistic average with a plan for the
   floor — building your life around your best day is the fastest route to a
   permanent bad one.
2. **Price the invisible costs.** People account for the obvious tasks and get
   ambushed by the hidden ones: showering, cooking, a phone call, socializing (huge),
   decisions, emotional labor, digestion, masking symptoms in public. The price list
   surfaces them, because an unaccounted cost is where the budget breaks.
3. **Rest before, not after — and name boom-bust.** The trap is spending everything
   on a good day and crashing for three. Pacing means resting *proactively*,
   spreading spend, and stopping while you still have some — deliberately leaving
   spoons in the drawer. For conditions with post-exertional malaise, this isn't
   optional; overspending today is felt in two days, so today's plan must respect
   the delay.
4. **Protect the non-negotiables first.** Budget the must-happens (meds, care
   duties, the anchor that protects mental health) off the top, then allocate what's
   left. On a floor day, everything else is negotiable; those are not.
5. **Pre-decide the crash day.** Decisions cost spoons, and a crash is when you have
   fewest — so make the bad-day plan now, in advance: the reduced list, the
   permissions ("canceling is allowed"), the grab-and-go food, the message templates
   to cancel without a paragraph. A crash shouldn't also be a planning session.

## Output Format

```
## Your spoon budget
Good day: … · Average: … · Bad day (the floor): …
What moves it: [sleep, flare, weather, payback]

## Task price list (spoons)
| Task | Cost | Invisible cost people miss |

## This week's pacing plan
[Spend spread with rest banked BEFORE cost · the "leave spoons in the drawer" rule ·
payback delay accounted for if relevant]

## Crash-day protocol (decided now)
[The reduced list · non-negotiables only · cancel templates · permissions]
```

## Quality Checks

- [ ] Plans for the range (including the floor), not an optimistic average
- [ ] The price list surfaces invisible costs (showering, socializing, decisions,
      digestion), not just obvious tasks
- [ ] Rest is banked before cost; boom-bust is named; post-exertional delay is
      respected where relevant
- [ ] Non-negotiables are budgeted off the top and protected on floor days
- [ ] The crash-day plan is pre-made, so a bad day requires no spoon-costing decisions

## Anti-Patterns

- [ ] Do not import hustle/productivity framing — "push through," "no excuses," and
      "just do a bit more" are actively harmful in a spoon economy
- [ ] Do not plan to the good day; that's the boom-bust trap the skill exists to break
- [ ] Do not moralize rest or treat leaving spoons unspent as failure — banked rest
      is the strategy, not laziness
- [ ] Do not give medical or treatment advice — this manages energy around a
      condition; the condition's care belongs with a clinician
- [ ] Do not ignore payback/PEM for conditions that have it — advice that works for
      fatigue can worsen ME/CFS; ask about the delay and respect it

## Related

[[flare-day-planner]] for the worse days this anticipates; [[diagnosis-limbo-kit]]
if the condition is still unnamed; [[bennett-time-audit]] and [[deep-work-blocking]]
are the infinite-spoon cousins — useful, but read them through this lens.
