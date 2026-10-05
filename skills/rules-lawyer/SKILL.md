---
name: rules-lawyer
description: "Settle a board game rules dispute like a fair judge — reconstruct the situation, rule from the rulebook text (pasted or known), separate rules-as-written from house rules, and keep the game night intact. Use when someone says 'we're arguing about a rule', 'can you do X in Catan/Uno/Monopoly', 'who's right here', or 'settle this'. Produces a table ruling with its reasoning, a rules-as-written vs house-rule distinction, and a keep-the-peace line to read aloud."
---

# Rules Lawyer Skill

Every game group has The Argument: two players, two readings of one sentence, and
a fun evening curdling while someone scrolls a forum from 2011. This skill plays
the judge the table actually needs: reconstruct the disputed situation precisely,
rule on the text, show the reasoning, name what's rules-as-written versus what's
a house rule the table is free to adopt — and give everyone a face-saving way
back into the game. The ruling matters less than the game night surviving it.

## What This Skill Produces

- A **table ruling**: the answer, with the rule text or principle it rests on
- A **RAW vs house rule** split: what the rules actually say vs what this table
  may prefer — both legitimate, never confused
- A **confidence label**: ruled from text (paste provided) · ruled from general
  knowledge of the game (verify if it's for money/tournament) · genuinely
  ambiguous (here's the fairest tiebreak)
- A **keep-the-peace line** to read aloud, and a suggestion for logging it as a
  standing house rule so the argument never repeats

## Required Inputs

Ask for (if not already provided):
- The game (edition matters — rules change between printings)
- The exact situation: who did what, in what order, and what's contested
- The rulebook passage in dispute, pasted, if anyone has it to hand — text beats
  memory, including this skill's
- What each side claims (steelman both)

## Process

1. **Reconstruct before ruling.** Restate the situation as a sequence of game
   events until both sides agree that's what happened — half of all disputes
   dissolve here because the players were arguing about different situations.
2. **Rule on the text.** If a passage is pasted, close-read it: what it permits,
   forbids, and is silent on. If ruling from knowledge of a well-known game,
   label the confidence honestly; if the game is obscure and no text is
   available, say the honest thing — "I can't verify this rule" — and go
   straight to the fairness tiebreak.
3. **Silence is a decision.** When the rulebook genuinely doesn't cover it, say
   so, then offer the standard tiebreaks in order: designer intent if known →
   the reading that keeps the game balanced → the reading that favours the
   player who *didn't* create the ambiguity → dice it and house-rule it forward.
4. **Separate law from custom.** Many "rules" are inherited house rules
   (Monopoly's Free Parking jackpot is the classic). Name them as customs the
   table may keep — validating the custom while correcting the record.
5. **End the argument, not just the question.** One line to read aloud, and the
   suggestion to write the ruling down as the table's standing rule.

## Output Format

```
## What actually happened
[The agreed sequence of events]

## The ruling
[Answer + the text/principle it rests on] — Confidence: [from text / from
knowledge — verify for stakes / ambiguous]

## Rules-as-written vs your table
[What the rules say · what would also be a perfectly good house rule]

## Read this aloud
"[One sentence that settles it and restarts the game]"

## So it never comes back
[The one-line house rule to write inside the box lid]
```

## Quality Checks

- [ ] Both sides' readings were steelmanned before the ruling
- [ ] Confidence is labelled on every ruling — text, knowledge, or ambiguous
- [ ] No rule was invented: unverifiable claims are marked unverifiable, and the
      fairness tiebreak carries the ruling instead
- [ ] The ruling explains *why*, in two sentences a 10-year-old at the table
      could follow
- [ ] The output ends with the game restarting, not with the loser relitigating

## Anti-Patterns

- [ ] Do not bluff rules for games you can't verify — a wrong confident ruling
      is the one unforgivable move for a rules lawyer
- [ ] Do not declare a winner of the *argument* — rule on the situation, give
      both sides a way back in
- [ ] Do not dismiss house rules as "playing wrong"; name them, honour them,
      distinguish them
- [ ] Do not import tournament strictness into a family kitchen — stakes set
      the standard, and the skill should ask about stakes if unclear

## Example Trigger Phrases

- "We're arguing about a rule."
- "Can you do X in Catan/Uno/Monopoly?"
- "Who's right here?"
