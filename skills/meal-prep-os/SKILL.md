---
name: meal-prep-os
description: "Turn what's actually in the fridge and 90 minutes on Sunday into a week that mostly feeds itself — a cook-once-eat-thrice batch plan, the component method (bases, proteins, sauces that recombine so leftovers don't bore you), honest food-safety day-counts flagged, and the Thursday problem solved in advance. Use when someone says 'meal prep my week', 'what do I cook with what I have', 'we spend too much on takeaway', or 'I'm sick of eating the same thing four days'. Produces the Sunday cook plan, the recombination map, and the shopping delta."
---

# Meal Prep OS Skill

Meal prep fails two ways: the ambitious version (five new recipes, Sunday
dies, never again) and the boring version (one tray of chicken and rice
eaten with declining enthusiasm until Thursday's takeaway). The version
that survives is a *system*: cook components, not meals — two bases, two
proteins, two sauces — and recombine them so Wednesday tastes different
from Monday; start from what's already in the kitchen; keep Sunday under
90 minutes; and plan the Thursday dip on purpose, because the week's
weakest night is a design input, not a moral failure.

## What This Skill Produces

- A **Sunday cook plan**, ordered for one oven and two burners, timed to
  ~90 minutes: what goes on first, what happens in the gaps
- The **recombination map**: components × 4–5 distinct meals (bowls,
  wraps, salads, the fried-rice mercy move), so repetition isn't
  repetitive
- The **shopping delta**: what to buy given what's already there — the
  fridge inventory is the starting point, not the bin
- **Storage & safety notes**: what keeps how long, what freezes at the
  start (the Thursday insurance), each day-count flagged as
  general-guidance-verify-locally rather than gospel
- The **Thursday plan**: the deliberately-easiest meal or the blessed
  freezer pull, scheduled in advance

## Required Inputs

Ask for (if not already provided):
- What's actually there: fridge, freezer, cupboard staples (the honest
  list, wilting herbs included)
- The week's real shape: how many lunches/dinners needed, who's eating,
  which nights are hopeless
- Tastes and limits: dislikes, dietary rules, spice tolerance, the
  "I'll never eat that as leftovers" list
- Equipment and time: oven/hob/airfryer/rice-cooker, and the honest
  Sunday window

## Framework

1. **Inventory before recipes.** Everything gets a job or a verdict:
   use-first (the wilting spinach anchors Monday), staple, or freeze-now.
   The plan builds outward from what exists — this is where the takeaway
   money is found.
2. **Components, not dishes.** 2 bases (a grain, a roastable-starch) ·
   2 proteins cooked plain-ish (seasoning at assembly, not in the batch —
   the trick that keeps options open) · 2 sauces/dressings (the actual
   flavor variety) · 1 crunchy thing. Six-ish components = the whole
   cook.
3. **Order Sunday like a line cook.** Oven items first (they're passive) →
   grain on the hob → proteins while both run → sauces in the gaps →
   cool properly before boxing (food-safety basics: cool fast, box
   shallow, fridge within the safe window — flag exact hour/day numbers
   as verify-with-local-guidance rather than asserting them).
4. **Map the recombinations explicitly.** Monday bowl ≠ Wednesday wrap ≠
   Friday fried-rice, from the same components. Write the map down —
   variety that isn't scheduled doesn't happen; people eat the same bowl
   until morale fails.
5. **Design the dip.** The freezer portion made on Sunday IS the Thursday
   plan. Naming it in advance converts the week's failure point into the
   week's easiest win.

## Output Format

```
## Fridge verdicts
[Use-first / staple / freeze-now — everything sentenced]

## Sunday, 90 minutes (one oven, two burners)
| Time | Doing | Waiting on |

## The components
[Bases · proteins (seasoned at assembly!) · sauces · crunch]

## The week's map
| Day | Meal | Built from | 2-min assembly note |

## Shopping delta
[Only what's missing, grouped by aisle]

## Storage & the Thursday plan
[What keeps/freezes (day-counts flagged as general guidance) · the
scheduled easy night]
```

## Quality Checks

- [ ] The plan starts from the stated inventory — no recipe requiring a
      shop for its whole ingredient list
- [ ] Proteins are batch-cooked neutral with seasoning at assembly
- [ ] The Sunday timeline fits the stated window on the stated equipment
- [ ] Food-storage day-counts are flagged as general guidance, and
      anything genuinely risky (rice handling, reheating rules) points at
      official food-safety guidance rather than winging it
- [ ] The Thursday dip has a named plan, and at least one meal is
      structurally different from the others (not three bowls in a
      trenchcoat)

## Anti-Patterns

- [ ] Do not plan five distinct recipes — that's cooking all Sunday, and
      it's the version that dies
- [ ] Do not season the whole batch one way; flexibility lives at assembly
- [ ] Do not moralize about the takeaway habit — the system replaces it by
      being easier, not by shame
- [ ] Do not assert precise safety day-counts as fact — general guidance,
      flagged, with official sources for the risky items
- [ ] Do not ignore the "won't eat as leftovers" list — a plan the person
      won't eat is a compost schedule

## Related

[[grocery-budget-audit]] finds the money this system saves;
[[weekly-review-ritual]] is where the 10-minute plan-next-week step lives;
[[bennett-time-audit]] for what the reclaimed weeknights become.

## Example Trigger Phrases

- "What do I cook with what I have?"
- "We spend too much on takeaway."
- "I'm sick of eating the same thing four days."
