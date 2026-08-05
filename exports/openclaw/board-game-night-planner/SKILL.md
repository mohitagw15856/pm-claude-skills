---
name: board-game-night-planner
description: "Plan a board game night that actually lands — the right games for your group size, mix, and time, in a running order that keeps energy up. Use when asked to plan a game night, what board game should we play, games for [N] people, or what to play with a mixed group. Produces game picks matched to player count and experience, a warm-up-to-main running order, teach-time and play-time estimates, and swaps for the non-gamers or the one player who hates losing."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/board-game-night-planner.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Board Game Night Planner

A game night dies when the game doesn't fit the group — too long, too heavy for casual players, or bad at your player count. This picks games that fit who's actually coming and how long you've got, orders them so the night builds instead of stalling on a 20-minute rules explanation, and plans for the friend who "doesn't really do board games."

## What This Skill Produces

- **Game picks that fit the count** — games that shine at *your* number (a great 4-player game can be dull at 2 or 6)
- **A running order** — a quick warm-up, a main event, a filler for the tail end
- **Teach + play estimates** — how long to explain and to play, so the night fits the window
- **Group-fit swaps** — lighter picks for casual players, a party game to include everyone
- **The "sore loser / late arrival" plan** — co-op or team options and drop-in-friendly games

## Required Inputs

Ask for these if not provided:
- **Who & how many** — player count, ages, and experience (casual vs into it)
- **Time** — total window and any hard end
- **What you own or can get** — your shelf, or open to suggestions
- **The vibe** — competitive, co-op, party/laughs, strategy
- **Constraints** — non-gamers present, kids, language, someone who hates conflict/losing

## Framework: Fit The Group, Build The Arc

1. **Player count first.** Filter to games that play well at your exact number — the most common reason a night flops.
2. **Match weight to the room.** Casual crowd → light/party games; a heavy euro will lose them. Save the brain-burner for the people who want it.
3. **Order for energy.** Open with a short, easy game while people arrive; peak with the main event; end on a light filler.
4. **Budget the teach time.** A 25-minute rules lecture kills momentum — pick games whose teach fits the group's patience.
5. **Include everyone.** Have a co-op or team option and a party game so no one's frozen out or crushed.

## Output Format

### Game night: [N players] · [experience] · [time window] · [vibe]

**Running order**
1. **Warm-up:** [game] — teach ~[x]m, play ~[y]m. Why: [fits arriving/casual].
2. **Main:** [game] — teach ~[x]m, play ~[y]m. Why: [shines at N, matches vibe].
3. **Filler:** [game] — quick, light close.

**If there are non-gamers:** [party/co-op swap].
**If someone hates losing:** [co-op or team game].
**Fits the window?** [yes / trim to X].

## Quality Checks
- [ ] Every pick plays well at the stated player count
- [ ] Game weight matches the group's experience
- [ ] Running order builds energy (warm-up → main → filler)
- [ ] Teach + play times are estimated against the time window
- [ ] Includes an option so non-gamers/sore-losers aren't excluded

## Anti-Patterns
- **Ignoring player count** — recommending a 3–4 player game for 6.
- **A heavy strategy game** for a casual, tipsy crowd.
- **All main events, no warm-up** — momentum stalls on rules.
- **Forgetting the non-gamer** who then sits out all night.
- **Overstuffing the window** so the main game gets cut mid-play.

## Example Trigger Phrases
- "Game night for 5, mixed group, about 3 hours — what should we play?"
- "What board game is good for exactly 2 people?"
- "We've got non-gamers coming — pick something everyone can enjoy."
- "Plan an order of games for a 6-person party night."
- "Something co-op so my competitive friend doesn't rage-quit."
