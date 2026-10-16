---
name: aging-parent-talks
description: "Prepare the conversations with aging parents that everyone postpones — the driving talk, the money talk, the care-options talk, the moving talk — each with an opener that doesn't ambush, a dignity-first script, rehearsal against realistic resistance, and the fallback when it goes badly. Use when someone says 'I need to talk to my dad about driving', 'my mum won't discuss her finances', 'we need to talk about care', or is dreading a visit for exactly this reason. Produces the conversation plan, a rehearsal, and the small-steps fallback. A preparation tool, not family therapy — and it says so when the situation needs more."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/aging-parent-talks.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Aging Parent Talks Skill

These conversations get postponed because both framings feel impossible:
saying nothing (and waiting for the crisis to decide) or taking over (and
watching a parent's face close). The workable path runs between them —
raise it early, small, and *with* the parent rather than about them; anchor
on their goals ("you want to stay in this house — let's make that work")
rather than your fears; accept that the first conversation's only job is to
make a second one possible. This skill prepares one specific talk: the
opener, the script's spine, the rehearsal against the resistance you'll
actually meet, and the smallest-step fallback for when the full topic won't
land.

## What This Skill Produces

- A **conversation plan** for the chosen talk (driving, money, care,
  moving): timing/setting, who should raise it (not always the user), the
  opener, and the one goal of round one
- The **dignity-first script spine**: their-goals anchoring, the specific
  observations (never accusations), the ask sized to a first conversation
- A **rehearsal**: the assistant plays the parent with realistic resistance
  (deflection, hurt, "I'm fine", role-reversal guilt), then debriefs
  out-of-character — simulator DNA, pointed at the hardest room there is
- The **small-steps fallback**: what to ask for when the big topic won't
  land, and the crisis-line: which signs mean this stops being gradual
- **Verify-local flags** for anything legal/medical (license rules, powers
  of attorney, care assessments — named as things to look up, never
  asserted)

## Required Inputs

Ask for (if not already provided):
- Which talk, and what prompted it now — the specific incidents (the
  scrape, the unpaid bills, the fall), because specifics carry the
  conversation and vagueness kills it
- The parent as a person: what they're proudest of, what they fear (the
  care home? being a burden? losing the car = losing church and friends?),
  how they've reacted to adjacent topics
- Family cast: siblings aligned or not ([[sibling-care-summit]] first if
  not), who the parent actually listens to
- Honest stakes: inconvenient-worrying, or actively dangerous? (The
  dangerous branch changes the advice — and names when waiting is no
  longer an option)

## Framework

1. **Pick the moment; drop the ambush.** Private, unhurried, one topic,
   never at a family gathering, never mid-crisis if avoidable. The opener
   asks permission: "Dad, can we talk about the driving sometime this
   weekend? Not deciding anything — just talking." Permission converts an
   ambush into a conversation.
2. **Anchor on their goal, not your fear.** Every talk has a their-goal
   version: driving → "keeping your independence without an accident
   taking it all at once" · money → "making sure what you want is what
   happens" · care → "staying home as long as it's safe" · moving →
   "a place that takes less out of you." The user's fear is real; it's
   the fuel, not the script.
3. **Observations, specific and few.** Two or three concrete incidents,
   said plainly, no verdicts attached: "the scrape in March, and Tuesday
   you missed the turn to ours." Then the question, not the conclusion:
   "how did it feel to you?" Parents defend against verdicts; they can
   join investigations.
4. **Size the ask to round one.** Not "give up the keys" but "a driving
   assessment, and I'll come with you" · not "show me everything" but
   "a list of where things are, sealed if you want" · not "a home" but
   "one visit, just to see." The full destination is reached in steps or
   not at all.
5. **Rehearse the real resistance.** The assistant plays the parent —
   deflection ("I've driven 50 years"), hurt ("so I'm a child now?"),
   the counterattack ("worry about your own life") — at the honesty level
   the user requests. Debrief: which of the user's lines escalated, which
   opened, the one sentence to keep. The rehearsal's lesson is almost
   always the same: slower, fewer points, more silence.
6. **Know the stop lines.** Signs that gradual is over (dementia-scale
   confusion, genuine driving danger, exploitation) get the honest
   response: this needs professionals now — doctor, license authority
   process, elder-care/legal advice by jurisdiction — flagged as
   verify-local, and framed as *protecting* the parent. And the skill's own
   boundary, stated: entrenched family conflict or grief beyond logistics
   is therapy's territory, not a script's.

## Output Format

```
## The talk: [which one] — round one's only goal: [one line]

## Setting & opener
[When, where, who speaks · the permission-ask opener verbatim]

## Script spine
[Their-goal anchor · the 2-3 observations · the round-one ask ·
the closing line that leaves the door open]

## Rehearsal
[In-character exchange · — out of character — · debrief: escalators,
openers, the keep-sentence]

## If round one doesn't land
[The smaller ask · the retreat line that preserves round two ·
the crisis signs that end gradualism, with verify-local routes]
```

## Quality Checks

- [ ] The opener asks permission and defers the decision
- [ ] Observations are incident-specific and verdict-free
- [ ] The ask is round-one-sized; the full destination appears only in the
      user's private plan
- [ ] The rehearsal resistance matches this parent (from the inputs), not a
      generic grumpy elder
- [ ] Legal/medical routes are verify-local flags; the therapy boundary is
      stated when the inputs smell of more than logistics

## Anti-Patterns

- [ ] Do not script the parent into agreement — the rehearsal must be
      winnable-by-the-parent or it teaches nothing
- [ ] Do not stack all four talks into one conversation
- [ ] Do not use infantilizing language anywhere ("we've decided",
      "for your own good") — dignity is the strategy, not the garnish
- [ ] Do not assert license rules, POA law, or care procedures — flag and
      route
- [ ] Do not counsel waiting when the inputs describe active danger — say
      the hard thing: this one is now

## Related

[[sibling-care-summit]] to align the family first; [[caregiver-coordination]]
for the logistics after yes; [[the-visa-interview]] shares the rehearsal
bones; [[patient-communication]] for the clinical-side cousin.

## Example Trigger Phrases

- "I need to talk to my dad about driving."
- "My mum won't discuss her finances."
- "We need to talk about care."
