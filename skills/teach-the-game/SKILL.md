---
name: teach-the-game
description: "Build a 5-minute teach script for any board game so the table starts playing instead of listening — theme first, goal second, a turn third, exceptions only when they come up. Use when someone says 'how do I explain Catan/Wingspan/this game', 'teaching my family a game tonight', 'my rules explanations kill the mood', or 'make a teach script'. Produces a spoken-word teach script with a first-turn walkthrough and a what-to-skip list."
---

# Teach The Game Skill

Every ruined game night dies the same way: someone reads the rulebook aloud for
twenty minutes to people who stopped listening at three. Good teachers invert the
rulebook: theme → goal → the shape of a turn → play immediately, rules arriving
only when they're needed. This skill writes that teach as a *script to say out
loud*, tuned to the actual table — the 8-year-old, the spouse who "doesn't do
complicated", the friend who min-maxes everything.

## What This Skill Produces

- A **5-minute teach script** in spoken language (not rulebook language), in the
  teach order: hook → goal → turn shape → first decisions
- A **first-turn walkthrough** ("Sarah, you go first: your options right now
  are…") that starts the game *during* the teach
- A **skip list**: rules deliberately left for when they trigger, with the
  one-line version to say when they do
- A **table-tuning note**: what to emphasise or drop for this specific group

## Required Inputs

Ask for (if not already provided):
- The game (and edition/expansions in play, if any)
- Who's at the table: count, ages, gaming experience, attention spans
- Has the teacher played it before, or is this a learn-and-teach?
- Time pressure: casual evening or a tight slot?

## Process

1. **Verify before teaching.** State the rules from knowledge of the named game,
   but flag anything uncertain with "check the rulebook here" rather than
   guessing — a confident wrong teach is worse than a pause. If the game is
   obscure or heavily house-ruled, ask the user to paste the rules summary and
   build the script from that.
2. **Open with theme + goal in two sentences.** "You're settlers on an island;
   first to 10 points wins. Points come from building." Never open with setup or
   components.
3. **Teach the turn, not the rules.** Describe one full turn's shape, then what
   the interesting decision is. Rule of thumb: if it doesn't happen every turn,
   it goes to the skip list.
4. **Script the first turn live.** The teach ends with the first player taking a
   real turn with coaching — playing is the last third of teaching.
5. **Tune to the table.** Younger/newer players get the "you can't really break
   anything" line and one strategy hint each; experienced players get the
   edge-case locations ("scoring exceptions are on the back page when you want
   them").

## Output Format

```
## The teach: [game] in ~5 minutes
[Spoken-word script, with (stage directions) — point at things, deal things]

## Start playing here
[First-turn walkthrough with the actual first player's options]

## Saved for later (say these one-liners when they come up)
- [rule]: "[one-line version]"

## For YOUR table
[2-3 adjustments for this specific group]
```

## Quality Checks

- [ ] Goal stated in the first three sentences of the script
- [ ] The script survives being read aloud in under 5 minutes at talking pace
      (~700 words max)
- [ ] Nothing in the skip list is needed to take the first two turns
- [ ] Uncertain rules are flagged for rulebook verification, never bluffed
- [ ] The script asks the teacher to put components in players' hands early —
      hands busy, attention held

## Anti-Patterns

- [ ] Do not follow the rulebook's chapter order — it's a reference document,
      not a teach
- [ ] Do not front-load exceptions and edge cases; that's what the skip list is for
- [ ] Do not invent or misstate rules for a named game — flag uncertainty; a
      table can wait ten seconds for the rulebook, not recover from a wrong teach
- [ ] Do not write a lecture — it's a script with the table participating by
      sentence three
- [ ] Do not exceed the table: an 8-year-old at the table changes every sentence

## Example Trigger Phrases

- "How do I explain Catan/Wingspan/this game?"
- "Teach my family a game tonight."
- "My rules explanations kill the mood."
- "Make a teach script."
