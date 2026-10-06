---
name: franklin-decision-ledger
description: "Run a hard two-option decision through Benjamin Franklin's 'moral or prudential algebra' — the weighted pro/con method he described to Joseph Priestley in 1772 — including the part everyone skips: striking out reasons that cancel, and letting the ledger sit before deciding. Use when weighing job offers, relocations, build-vs-buy, take-the-promotion, shut-it-down decisions, or any 'I keep going back and forth'. Produces a completed decision ledger with a leaning, its strongest counter, and a revisit date."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/franklin-decision-ledger.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Franklin Decision Ledger Skill

In a 1772 letter to Joseph Priestley, Franklin laid out why hard decisions feel
impossible: the reasons for and against are never "present to the mind at the same
time" — whichever set you thought about most recently feels decisive. His fix, which
he called **moral or prudential algebra**, is a ledger kept over days, with weights,
where reasons of equal weight are struck out in pairs until one column visibly
outweighs. This skill runs the full method — not the flattened pros-and-cons list it
degenerated into.

## What This Skill Produces

- A two-column **decision ledger** with every motive the user can surface, weighted
- The **cancellation pass**: equal weights struck out in pairs, remainder shown
- The **leaning** the algebra produces, its strongest surviving counter-reason, and
  what evidence would flip it
- A **sit-on-it plan**: what to add to the ledger over the next 1–2 days before
  committing (Franklin's "farther consideration" step)

## Required Inputs

Ask for (if not already provided):
- The two options, stated as the user would say them (if there are three, split the
  decision or run twice — the algebra is pairwise)
- Everything currently pulling them each way, however small or embarrassing
- The deadline, and what happens if they decide nothing
- Who else the decision lands on (family, team) — their motives belong in the ledger

## Framework: the algebra, as Franklin described it

1. **Divide the paper** — one column *Pro*, one *Con*, for Option A over Option B.
2. **Collect over time, not in one sitting** — Franklin's instruction is to gather
   motives "during three or four days consideration" as they occur. In one session:
   do three passes — practical, emotional, reputational — because different passes
   surface different motives. Then schedule the real-time additions (see output).
3. **Weight each motive** — the user assigns weights (1–5 works), not the assistant.
   Probe the suspicious ones: a 5 that can't survive one "why?" is a 2 wearing fear.
4. **Strike out equals** — the step that makes it algebra: one Pro-3 cancels one
   Con-3; two Con-2s cancel a Pro-4. Cross them out visibly. What remains after
   cancellation is the actual decision surface — usually two or three motives, which
   is why the method clears heads.
5. **Find where the balance lies, then wait** — if a day or two of further thought
   adds nothing new to either column, decide accordingly. Franklin's claim was
   modest and right: the weights aren't precise, but with each motive considered
   *comparatively*, "I think I can judge better, and am less liable to make a rash
   step."

## Output Format

```
## The decision
[Option A vs Option B, one line each, deadline]

## The ledger — A over B
| Pro | w | Con | w |
[every motive, user-weighted]

## Cancellation pass
[struck pairs listed: "quiet team (3) cancels commute (3)" …]
Remaining: Pro [names + total] · Con [names + total]

## The leaning
[Which way the remainder points · the strongest SURVIVING counter-reason, stated
better than the user stated it · what single piece of evidence would flip this]

## Before you commit (Franklin's waiting step)
[2-3 motives likely to surface late — prompts, not inventions: "you haven't priced
X yet" · a revisit date within the deadline]
```

## Quality Checks

- [ ] Weights came from the user — the assistant proposed none, but challenged at
      least one
- [ ] The cancellation pass actually happened, pairs named — without it this is an
      ordinary pros/cons list and the skill has failed
- [ ] The strongest counter-reason is presented in its best form (steelman), not
      its dismissible form
- [ ] Motives affecting other people appear in the ledger, attributed
- [ ] The output ends with a revisit date, not just a verdict — the waiting period
      is part of the method

## Anti-Patterns

- [ ] Do not decide for the user — the algebra's output is a *leaning* plus its
      strongest counter; the user decides
- [ ] Do not fill the ledger with invented motives to look thorough; every entry
      traces to something the user said or confirmed
- [ ] Do not let weights masquerade as objectivity — surface that a 5-point fear
      and a 5-point salary bump were made commensurable by feel, and say so
- [ ] Do not skip the emotional pass because the decision "should be rational";
      Franklin put prudence *and* inclination in the same ledger on purpose

## Related

Log the final call in [[decision-journal]] with its falsifiable predictions — the
ledger decides, the journal keeps you honest later.

## Example Trigger Phrases

- "Help me decide between these two options."
- "Weigh the pros and cons properly."
- "Run Franklin's pro and con method on this choice."
- "I can't decide whether to take the job."
