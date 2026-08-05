---
name: wine-pairing
description: "Pick a wine that flatters tonight's meal — at your budget, from what's actually available — without the sommelier mystique. Use when asked what wine goes with [dish], help me pick a wine, what should I drink with dinner, or recommend a bottle for. Produces a couple of specific bottle styles (not just 'a red'), why each works with the dish, a budget-tier pick, an easy-to-find fallback, and a non-alcoholic option — with a plain reason you can remember next time."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/wine-pairing.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Wine Pairing

Pairing isn't a secret code — it's a few rules about matching weight, acidity, and intensity, plus what you can actually buy nearby. This gives you specific styles to ask for (or grab off the shelf), a reason each works, and options across price — so you walk in confident instead of grabbing the bottle with the nicest label.

## What This Skill Produces

- **Two or three specific styles** — grape/style you can ask for by name, not "a nice red"
- **Why it works** — the one-line reason (weight, acidity, sweetness, tannin) so it sticks
- **A budget pick and a step-up** — a good everyday option and one worth a little more
- **An easy-to-find fallback** — something almost any shop or restaurant list will have
- **A no/low-alcohol option** — because not everyone's drinking

## Required Inputs

Ask for these if not provided:
- **The dish** — main ingredient, sauce/richness, spice level, how it's cooked
- **The setting** — casual weeknight, dinner party, gift, or restaurant list
- **Preferences** — red/white/rosé/sparkling leanings, sweet vs dry, anything disliked
- **Budget** — rough per-bottle range
- **What's available** — a specific shop, a restaurant list to pick from, or "whatever's typical"

## Framework: Match Weight, Then Contrast

1. **Match intensity.** Light dish → light wine; rich dish → fuller wine. A big red flattens delicate fish; a crisp white vanishes under a stew.
2. **Use acidity as a reset.** High-acid wines cut through fat, cream, and salt — the reason bright whites love fried and creamy food.
3. **Tame heat and sweetness.** Spicy food wants a touch of sweetness and lower alcohol; sweet dishes want a wine at least as sweet.
4. **Respect the sauce over the protein.** The sauce/prep usually drives the pairing more than the meat itself.
5. **Give a name and a reason.** Recommend a style they can actually ask for, and why — so they learn the pattern, not just the answer.

## Output Format

### Pairing: [dish] · [setting] · [budget]

**🍷 [Style/grape]** — works because [weight/acidity/etc.]. Ask for: [example].
**🍷 [Style/grape]** — works because […].

**Budget pick:** [style + rough price] · **Step up:** [style].
**Easy to find anywhere:** [safe fallback].
**No/low-alcohol:** [option].

**Remember this:** [the one rule that made it work].

## Quality Checks
- [ ] Recommends specific styles you can ask for by name, not just a color
- [ ] Each pick has a one-line reason tied to a pairing principle
- [ ] Options span at least two price points
- [ ] Includes an easy-to-find fallback and a no/low-alcohol option
- [ ] Respects stated preferences and dislikes

## Anti-Patterns
- **"Just get a nice red"** — no style, no reason, no help.
- **Ignoring budget** — recommending a $60 bottle for a Tuesday.
- **Snobbery** — dismissing supermarket wine or boxed options.
- **Pairing the protein, not the sauce** when the sauce is the star.
- **Forgetting non-drinkers** at the table.

## Example Trigger Phrases
- "What wine goes with mushroom risotto?"
- "Pick me a bottle under $20 for grilled salmon."
- "We're having spicy Thai — what should we drink?"
- "Bringing wine to a dinner party, they're serving lamb. Help."
- "What pairs with a cheese board, and something non-alcoholic too?"
