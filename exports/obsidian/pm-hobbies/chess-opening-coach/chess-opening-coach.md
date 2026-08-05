---
aliases: ["Chess Opening Coach"]
tags: [pm-skills, skill]
skill: chess-opening-coach
description: "Build a small, coherent opening repertoire that fits your style and level — the few lines actually worth learning, plus the plans and traps behind them. Use when asked what chess opening should I learn, build me a repertoire, help with my openings, or what to play against [opening]. Produces a compact repertoire for White and Black keyed to your rating and style, the main ideas and typical plans (not just moves to memorize), the common traps to know from both sides, and what to study next — kept small enough to actually learn."
---

# Chess Opening Coach

Most improving players lose games not in the opening but by drowning in opening theory they don't understand. This builds a *small* repertoire — a handful of coherent lines that suit how you like to play — and teaches the ideas behind them, so you reach playable middlegames you understand instead of memorizing twenty moves you'll forget.

## What This Skill Produces

- **A compact repertoire** — one main choice for White, and answers for Black vs 1.e4 and 1.d4, sized to your level
- **The ideas, not just moves** — the plan behind each opening: pawn breaks, piece placement, where your pieces belong
- **Traps both ways** — the common tricks to avoid falling for and the ones you can use
- **Move-order essentials** — the few critical points where accuracy matters, and where you can play on understanding
- **A study path** — what to learn first and what to add later, so it stays small

## Required Inputs

Ask for these if not provided:
- **Rating/level** — rough strength (beginner, club, intermediate) — sets how much theory is worth it
- **Style** — attacking/tactical, solid/positional, or "just something reliable"
- **Colors & gaps** — do you want White, Black, or both; anything you already play
- **Time** — how much you'll realistically study
- **Trouble spots** — openings you keep losing against

## Framework: Small, Understood, Coherent

1. **Fit the style.** Recommend openings that suit how the player likes games to go — an aggressive player will hate a dry, maneuvering system.
2. **Teach plans over moves.** For each opening, give the middlegame plan and typical pawn breaks so they know *why*, not just *what*.
3. **Keep it small.** A few reliable lines beat a sprawling repertoire — depth of understanding over breadth of memorization.
4. **Cover the real replies.** Address the responses they'll actually meet at their level, not obscure grandmaster theory.
5. **Know the traps.** Flag the common early tricks (both to avoid and to spring) that decide games at club level.

## Output Format

### Repertoire: [level] · style: [x] · [colors]

**As White:** [opening] — plan: [pawn breaks / piece setup]. Key point: [where accuracy matters].
**As Black vs 1.e4:** [defense] — main idea: […].
**As Black vs 1.d4:** [defense] — main idea: […].

**Traps to know:** [avoid: … / use: …].
**Study first → later:** [the 2–3 lines to learn now] → [what to add once comfortable].

## Quality Checks
- [ ] Repertoire size matches the player's level (small for beginners)
- [ ] Each opening comes with plans/ideas, not just move lists
- [ ] Recommendations fit the stated style
- [ ] Covers the replies they'll actually face
- [ ] Includes common traps from both sides and a study order

## Anti-Patterns
- **A 20-move memorization dump** the player won't retain or understand.
- **Style mismatch** — a sharp gambit for someone who wants solid.
- **Only moves, no plans** — leaving them lost once theory ends.
- **Obscure theory** irrelevant at their level.
- **Too many openings** to ever learn properly.

## Example Trigger Phrases
- "What opening should I learn as a beginner who likes attacking?"
- "Build me a simple repertoire for White and Black."
- "I keep losing against 1.e4 — what should I play?"
- "Give me a solid, low-theory opening system."
- "Explain the plan behind the London System."

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
