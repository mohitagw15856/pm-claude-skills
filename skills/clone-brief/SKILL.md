---
name: clone-brief
description: "Send your position to a meeting instead of your body — a one-page brief carrying your stances, fallbacks, red lines, tradables, and delegation limits, readable by the colleague (or agent) representing you. Use when you can't attend a decision-making meeting, when double-booked, when briefing someone to negotiate for you, or 'what would you need from me to represent me?'. Produces the clone brief plus a 60-second verbal version for the person carrying it."
---

# Clone Brief Skill

"Sorry, can't make it — can you represent me?" usually transmits a vibe and a
prayer. Then your representative gets asked the one question you didn't cover,
guesses, and you spend Thursday unwinding it. A clone brief is what should have
gone instead of you: your positions *with their reasoning*, your fallbacks in
order, the red lines that end the conversation, what you'd happily trade — and
the explicit boundary of what your representative may agree to versus must
bring back. One page, readable in two minutes by a colleague, and structured
enough that an agent could carry it too. In a world of A2A meetings, this is
the artifact that attends.

## What This Skill Produces

- The **clone brief**: context in three lines, then stances / fallbacks / red
  lines / tradables / delegation boundary, each with the *why* attached
- A **60-second verbal version** for briefing the carrier in the corridor
- A **question-anticipation table**: the questions likely to come up, with your
  answers — including the honest "I haven't decided; here's my leaning"
- A **debrief ask**: the 3 things you want reported back

## Required Inputs

Ask for (if not already provided):
- The meeting: decision at stake, who's in the room, what they each want (as
  far as known)
- Your position and — this is the load-bearing part — *why*; the reasoning is
  what lets a representative handle the unanticipated
- What you'd accept as fallback, what's tradable, what's a walk-away
- Who carries the brief (peer? report? someone from another team? an agent?)
  and how much you trust their judgment on this topic

## Process

1. **Compress context ruthlessly.** Three lines: what's being decided, why it
   matters to you, where the tension is. The carrier has two minutes; history
   lessons stay home.
2. **Ladder the positions.** For each issue at stake: IDEAL (open with this) →
   ACCEPTABLE (agree without checking) → BRING BACK (don't agree; capture and
   return) → RED LINE (say no in the room, with the scripted sentence to say).
   Attach one-line reasoning to each rung — reasoning is what travels;
   conclusions alone can't handle follow-ups.
3. **Name the tradables.** What you'd concede happily and what you want in
   exchange — a representative who knows your currency can negotiate; one who
   only knows your demands can only repeat them.
4. **Draw the delegation boundary explicitly.** The sentence that prevents the
   Thursday unwind: "You may commit up to X; beyond that, 'I'll take it back
   to [name] by [time]' — that sentence is always a win, never a failure."
5. **Anticipate the questions.** The 3–6 things the room will ask, answered.
   Where you're genuinely undecided, say so with your leaning — a
   representative bluffing certainty in your name is worse than one honestly
   deferring.
6. **Script the debrief.** Three asks: what was decided · what was said about
   [the thing you care about] · what surprised you. Anything more won't be
   remembered.

## Output Format

```
# Clone brief: [meeting] — [date] · carried by [name]
## Context (3 lines)
## Position ladder
| Issue | Ideal | Acceptable | Bring back | Red line (+ the sentence) | Why |
## Tradables
[Give happily ↔ want in return]
## Your authority
[May commit up to … · beyond that, the take-it-back sentence]
## They'll probably ask
| Question | Your answer (or honest leaning) |
## Report back
[The three asks]

— 60-second corridor version —
[Spoken: the one decision, your one must, your one flexible, the boundary]
```

## Quality Checks

- [ ] Every ladder rung carries reasoning — the brief works when the
      unanticipated happens, or it doesn't work
- [ ] The red-line sentence is scripted verbatim, sayable by someone who isn't
      you
- [ ] The delegation boundary is a number or a named scope, not "use judgment"
- [ ] At least one they'll-ask answer is an honest "undecided, leaning X" —
      a brief with total certainty on everything is posturing
- [ ] The whole brief fits one page; the corridor version speaks in 60 seconds

## Anti-Patterns

- [ ] Do not send conclusions without reasoning — that's instructions for a
      puppet, and puppets fail on question two
- [ ] Do not hide the real red line to seem flexible; the carrier discovers it
      by crossing it, in public, as you
- [ ] Do not skip the authority boundary — its absence is how "represent me"
      becomes "apparently I agreed to a June deadline"
- [ ] Do not write it agent-readable but human-hostile: the colleague is the
      primary reader; structure serves both

## Related

[[delegation-brief]] hands off ongoing WORK; this hands off a POSITION for a
single room. [[stakeholder-influence-mapper]] for reading the room you're
sending it into; [[the-understudy]] for the deeper version of "represent me."

## Example Trigger Phrases

- "I can't make the meeting: brief someone to decide for me."
- "Brief someone to negotiate for me."
- "What would you need from me to represent me?"
- "Write my red lines and fallbacks for the meeting."
