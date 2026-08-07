---
aliases: ["Life Premortem"]
tags: [pm-skills, skill]
skill: life-premortem
description: "Write the failure story of your year, relationship, move, or big life bet in advance — imagine it's a year later and it went wrong, tell that story vividly, then mine it for the real risks and the cheap things that would have prevented them. Use when someone says 'I'm about to make a big life change', 'what could go wrong with this', 'de-risk my year', or is committing to something large and irreversible. Produces the failure narrative, the extracted risk list with preventatives, and the early-warning signs to watch. The life-scale sibling of a project premortem."
---

# Life Premortem Skill

Optimism is required to start big things and dangerous once you've started —
because a mind committed to a plan goes blind to how it fails. The premortem flips
that: instead of asking "what might go wrong?" (which the committed brain swats away),
it says "it's a year from now and this failed — tell me the story of how." That small
framing change unlocks honesty the forward-looking question can't. This skill runs it
at life scale — the move abroad, the marriage, the career pivot, the sabbatical, the
year's resolutions — turning a vivid failure story into a short list of real risks
and the often-cheap things that would prevent them.

## What This Skill Produces

- A **failure narrative**: a specific, vivid story told from one year (or the relevant
  horizon) in the future, in which the thing went wrong — concrete, not a risk list
  in disguise
- An **extracted risk list**: the real failure modes the story reveals, sorted by
  likelihood × how much they'd hurt
- **Cheap preventatives**: for each real risk, the small thing available *now* that
  would defuse it (most disasters have a five-dollar prevention that feels stupid to
  do and obvious in hindsight)
- **Early-warning signs**: the specific things that, if you notice them in month 3,
  mean the failure story is starting — so you can course-correct instead of
  discovering it at the end

## Required Inputs

Ask for (if not already provided):
- The big thing being committed to, and the horizon that matters (a year? the end of
  the sabbatical? the first year of the marriage?)
- Why it matters and what "success" would look like — you can't fail a goal you
  haven't named
- What the user is quietly worried about but talking themselves out of (this is often
  the real risk, pre-rationalized away)
- What's reversible vs not, and what's already committed

## Framework

1. **Tell the failure as a story, not a list.** The magic is in the narrative frame:
   "It's a year later. The move to Lisbon fell apart. Walk me through how it went."
   A story recruits honesty and detail that "list your risks" never does — the committed
   brain will defend a plan but will happily narrate a hypothetical failure. Make it
   vivid and specific.
2. **Mine the story for the real risks.** The narrative will surface failure modes the
   user actually believes in (the isolation, the money running out faster than planned,
   the relationship not surviving the stress) as opposed to the generic risks they'd
   list defensively. Extract those, rank by likelihood × pain.
3. **Find the stupidly-cheap preventative for each.** Most real risks have a small,
   almost embarrassing prevention: the friend you'd have called before it got bad, the
   three-months-more savings, the conversation you'd have had, the trial run. The gap
   between the cheap prevention and the expensive failure is the whole ROI of this
   exercise.
4. **Name the early-warning signs.** For each risk, the observable tell that the
   failure story is beginning — the month-3 signal (the loneliness that isn't lifting,
   the burn rate that's off, the resentment building). Catching the story early is how
   you rewrite it; the premortem hands you the alarms.
5. **Keep it a bet, not a veto.** The premortem de-risks; it doesn't talk the user out
   of brave things. The output ends by weighing the (now-mitigated) risks against the
   reason for doing it — because the point is to go in clear-eyed, not to not go.

## Output Format

```
## The failure story (one year on)
[A vivid, specific narrative of how this went wrong — told as a story]

## The real risks it revealed
| Risk | Likelihood | How much it'd hurt | (ranked) |

## The stupidly-cheap preventative for each
[Risk → the small thing available now that defuses it]

## Early-warning signs (your month-3 alarms)
[The observable tells that the failure story is starting]

## Still worth it?
[The mitigated risks weighed against why you're doing this — go in clear-eyed]
```

## Quality Checks

- [ ] The failure is told as a specific story, not a risk list wearing a narrative hat
- [ ] The extracted risks are ones the user actually believes, including the quiet
      worry they'd rationalized away
- [ ] Each real risk has a concrete, cheap-now preventative
- [ ] Early-warning signs are observable and time-anchored (you'd notice them by
      month 3), not vague
- [ ] It ends by weighing risk against reason — de-risking, not vetoing the dream

## Anti-Patterns

- [ ] Do not let it become a generic risk checklist — the story frame is the engine;
      without it the honesty doesn't come
- [ ] Do not use it to kill the user's brave thing — the goal is going in clear-eyed,
      and a mitigated risk is a reason to prepare, not to quit
- [ ] Do not surface only comfortable risks — the quiet, pre-rationalized worry is
      usually the real one; go there
- [ ] Do not skip the cheap-preventative step — a risk named without a defuse is just
      anxiety
- [ ] Do not confuse this with catastrophizing — it's one structured story with exits,
      not a spiral

## Related

[[premortem-assassin]] is the project/plan version; [[future-self-interview]] is the
hopeful mirror; [[the-time-capsule]] to log the predictions; [[franklin-decision-ledger]]
and [[regret-minimizer]] for the decide-or-not layer.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
