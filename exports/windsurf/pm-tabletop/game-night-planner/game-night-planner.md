---
trigger: model_decision
description: "Plan a game night that actually works for the specific people coming — the right lineup for player count, weight tolerance, and time, sequenced from icebreaker to main event, with the fallback for when someone bails. Use when someone says planning a game night, what board game should we play, games for six people, my partner hates long games, or we always end up arguing over what to play. Produces a sequenced lineup with reasoning, teach-time and play-time estimates, swaps for the non-gamers, and a plan B."
---

# Game Night Planner Skill

Game nights don't fail because the games are bad — they fail because someone
brought a 3-hour economic engine to a table that wanted snacks and laughing, or
because choosing took 40 minutes, or because seven people showed up for a
4-player game. This skill plans like a good host thinks: who is actually coming,
what's their tolerance, sequence light-to-heavy, and always know what happens
when the count changes at 7pm.

## What This Skill Produces

- A **sequenced lineup** (opener → main event → optional nightcap) with
  per-game: player count fit, realistic time *including the teach*, and why it
  suits this table
- **Plan B branches**: someone bails / someone brings a friend / running late
- A **from-their-shelf first** selection when the user lists what they own, with
  1–3 to-buy/borrow suggestions only if the shelf can't cover the night
- The **house logistics**: teach order, who teaches (pair with teach-the-game),
  when to call the last game

## Required Inputs

Ask for (if not already provided):
- Headcount (and how firm it is), plus ages and the experience mix
- The vibe wanted: competitive, cooperative, social/party, "just talking with
  something to do"
- Hard limits: total hours, any player's complexity ceiling, themes to avoid
- What they own or can borrow — plan from the shelf before the shop

## Process

1. **Plan for the people, not the games.** The least-enthusiastic guest sets the
   weight ceiling for the main event; the most-enthusiastic one gets the
   nightcap. Say who each pick serves.
2. **Sequence by energy.** Opener: ≤20 minutes, teachable in one, works while
   people arrive. Main event: the night's centrepiece, started while energy is
   high — never after 9pm for a heavy game. Nightcap: low-rules, high-laughs,
   quittable anytime.
3. **Budget honest time.** A "45-minute" game with a teach and a first play is
   90; say the real number per slot and total. If the lineup exceeds the stated
   window, cut a game, don't compress the estimates.
4. **Branch the plan.** Player counts are fiction until the doorbell stops: for
   each lineup slot, name the swap when N±1 shows up (many great games break at
   exactly one count — flag those).
5. **Recommend honestly.** Suggest well-known games by name where they genuinely
   fit, note "check availability/price" rather than asserting either, and if
   the user's shelf covers the night, say so — the best recommendation is often
   already owned.

## Output Format

```
## The night at a glance
[Who's coming, the vibe, total window · one-line theme of the plan]

## Lineup
1. OPENER — [game] ([count] players, ~[real minutes] incl. teach)
   Why for this table: … · Who it serves: …
2. MAIN EVENT — [game] …
3. NIGHTCAP (optional) — [game] …
Total honest time: [X]h[Y]m of your [window]

## When reality edits the guest list
- One fewer: … · One extra: … · Running an hour late: cut […], start at […]

## Logistics
[Who teaches what · setup while people arrive · the "last game" call time]
```

## Quality Checks

- [ ] Every pick names who at the table it serves — a lineup with no named
      beneficiary is a list, not a plan
- [ ] Times include teach + setup, and the total fits the stated window without
      wishful compression
- [ ] Player-count edge cases flagged (games that break at exactly this N±1)
- [ ] Shelf games considered before purchases; buys capped at three and marked
      "check availability"
- [ ] The weight ceiling respects the least-enthusiastic guest, not the host

## Anti-Patterns

- [ ] Do not build the host's dream lineup — the guest who came reluctantly
      decides whether there's a next game night
- [ ] Do not schedule a heavy teach late in the evening
- [ ] Do not recommend obscure games as if universally available, and never
      state prices as fact
- [ ] Do not plan zero slack — the gap between games is where game night
      actually happens
