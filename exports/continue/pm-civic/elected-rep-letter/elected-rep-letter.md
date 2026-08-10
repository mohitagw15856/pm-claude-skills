---
name: "Write to an elected representative in a way that actually ge"
description: "Write to an elected representative in a way that actually gets action — a specific ask, your local stake, why it's in their interest to respond, and the follow-up — instead of an angry email that gets auto-filed. Use when someone says 'write to my MP/congressperson/councillor', 'contact my representative about X', 'how do I get my rep to act', or 'my letter to the council got ignored'. Produces a targeted letter (or call script), tuned to the right representative and level of government, plus a follow-up plan."
---

# Elected Rep Letter Skill

Representatives' offices triage hundreds of messages by a simple filter: is this a
constituent, with a specific ask, that affects the representative's standing? Most
letters fail all three — they go to the wrong level of government, rage in
generalities, and ask for nothing actionable, so they're counted as a tally mark and
filed. This skill writes the version that lands: the right representative for the
issue, a concrete ask they can actually act on, your local stake stated plainly, and
a reason it's in their interest — then a follow-up that turns one letter into
pressure.

## What This Skill Produces

- The **right target**: which representative and level of government actually owns this
  issue (writing your national rep about a pothole wastes everyone's time)
- A **targeted letter or call script**: specific ask → your constituent stake → why it
  serves them → a requested response by a date, in a tone that's firm without being
  the rage-email that gets ignored
- The **credibility hooks**: you're a constituent (say so, with your area), the issue's
  local impact, and any personal story that makes it real
- A **follow-up plan**: what to do with silence, a template response, or a brush-off —
  because one letter is a data point; persistence plus visibility is leverage

## Required Inputs

Ask for (if not already provided):
- The issue and the *specific outcome* wanted (a vote, a meeting, an intervention, a
  service fix) — "do something about X" isn't an ask
- Where the user lives (to identify the right rep) and whether they know who represents
  them at each level
- Their personal stake and any story: how this affects them or their community
  concretely
- What's been tried (a prior ignored letter changes the strategy toward escalation/
  visibility)

## Framework

1. **Get the level of government right.** Pothole/parking/local-service → councillor/
   local. Schools, policing, state services → state/regional. National law, federal
   agencies → national rep. A letter to the wrong level is a guaranteed non-answer;
   identify the owner first (route to the "who represents me" lookup where needed).
2. **Lead with one specific, actionable ask.** Not "care about housing" but "vote yes
   on Bill 12," "hold a surgery on the ward closure," "instruct the council to fix the
   drainage on Elm Street." An office can act on a specific ask and can't act on a
   feeling. One ask per letter.
3. **Establish constituent standing immediately.** Reps prioritize the people who vote
   for them. State that you're a constituent and your area up top — it moves the letter
   from "public" to "must-log-and-respond" in most offices.
4. **Make it their interest, and make it human.** Briefly, why acting serves them
   (constituent concern, local visibility, a problem they'd own if it worsens), plus
   one concrete human detail that a staffer remembers. Anger without an ask reads as
   noise; a specific local story with an ask reads as a live issue.
5. **Request a response, then follow up.** Ask for a reply by a reasonable date. Then
   the escalation ladder for the likely outcomes: silence → a chasing note + a call →
   the ward surgery/town hall; a form reply → a pointed follow-up naming it; and,
   where appropriate, multiplying voices (neighbors sending their own) and local-press
   visibility. Persistence is the actual lever.

## Output Format

```
## The right target
[Which representative and level owns this · how to confirm who yours is]

## Your letter (or call script)
[Constituent line + area → the ONE specific ask → local stake + human detail →
why it serves them → "please respond by [date]"]

## Why this version works
[The specific ask, the standing, the interest — named, so the user can reuse the pattern]

## If they ignore you or fob you off
[Silence → … · form reply → … · the surgery/town hall · multiplying voices · press]
```

## Quality Checks

- [ ] The letter targets the representative/level that actually owns the issue
- [ ] There is exactly one specific, actionable ask — not a plea to "care"
- [ ] Constituent standing and local stake appear up top
- [ ] The tone is firm and specific, never the rage-email that gets filed
- [ ] A follow-up/escalation plan exists — the letter is step one, not the whole play

## Anti-Patterns

- [ ] Do not write a general rant — no ask means no action; specificity is the whole game
- [ ] Do not aim at the wrong level of government — the commonest reason for a
      non-response
- [ ] Do not fabricate a constituent relationship or a personal story — authenticity is
      the credibility, and offices can tell
- [ ] Do not threaten or abuse — it gets logged as such and helps the opposite case
- [ ] Do not promise the letter will work — it improves the odds and sets up the
      follow-up that's the real pressure

## Related

[[speak-at-the-council]] to show up in person; [[report-a-hazard]] for the service-
request route; [[media-pitch]] and [[press-release]] when it needs public visibility;
[[permit-navigator]] when your issue is a project the council controls.
