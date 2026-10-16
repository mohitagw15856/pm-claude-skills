---
name: roommate-agreement
description: "Write the flat's constitution before the first passive-aggressive note — money, chores, guests, noise, food, and the exit plan, decided while everyone still likes each other, in language that's firm without being corporate. Use when moving in with roommates, when the dishes cold-war has started, when a partner basically lives there rent-free, or when someone's moving out mid-lease. Produces a signed-feeling one-page agreement plus the house meeting script to agree it."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/roommate-agreement.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Roommate Agreement Skill

No flat share is ruined by rent. They're ruined by the fourth "gentle
reminder" note about dishes, the partner who's there five nights but pays
zero, the mystery utilities split, and the moment someone moves out mid-lease
and everyone discovers nobody agreed what that means. A roommate agreement
isn't corporate paranoia — it's deciding the annoying things *while everyone
still likes each other*, which is the only time they're easy. This skill
writes that one-pager in human language, and scripts the slightly awkward
house meeting that turns it from a document into a deal.

## What This Skill Produces

- A **one-page agreement** covering the eight fights before they happen:
  money, chores, guests & partners, noise & shared space, food & supplies,
  temperature (the thermostat war is real), communication norms, and the exit
  plan
- A **house meeting script**: how to propose this without sounding like HR,
  the questions to actually discuss, and how to handle the roommate who says
  "we don't need this, we're chill"
- **Decision defaults** for the classic stalemates, offered as menu options
  (chore wheel vs zones vs hire-a-cleaner-split)
- A **revisit clause**: when the agreement gets re-opened (new person,
  partner-creep threshold crossed, someone's income changes)

## Required Inputs

Ask for (if not already provided):
- Who's in the flat: how many, relationships (strangers? friends? couple +
  one?), whose name is on the lease — lease-liability asymmetry shapes the
  exit plan
- Current sore points if any (or "we haven't moved in yet" — the best case)
- Money facts: rent split today, utilities handling, any shared subscriptions
- House realities: sizes of rooms (equal-split of unequal rooms is fight #1),
  work-from-home patterns, existing partner situations

## Framework: the eight fights, pre-decided

1. **Money** — rent split *with reasoning* (equal? by room size/en-suite? —
   name the method so resentment has nowhere to live) · utilities: one owner
   per bill, settle monthly via app, receipts visible · shared kitty for
   house stuff · late-payment protocol before it's personal.
2. **Chores** — pick a system, any system: wheel, zones, or pay-to-escape
   (cleaner split). The rule that matters: *standards are the agreement, not
   effort* — define "kitchen is done" in one sentence. Dishes get their own
   line: the sink is not a queue.
3. **Guests & partners** — the partner-creep threshold, decided kindly and
   in advance: N nights/week for M weeks = conversation about contributing.
   Overnight-guest heads-up norms; parties need everyone's yes.
4. **Noise & shared space** — quiet hours by schedule reality (who has 8am
   shifts?) · headphones threshold · the living room is nobody's second
   bedroom.
5. **Food & supplies** — labeled = yours, unlabeled = ask; the shared-staples
   list (and its kitty); the "I ate your leftovers" repair norm (replace
   within 48h, no trial).
6. **Temperature & fabric of the flat** — thermostat range + who pays for
   deviance (heating is money, see fight #1); what needs a house vote
   (furniture, décor in shared space, pets, smoking anything).
7. **Communication** — the house channel and what belongs there; the
   anti-passive-aggression pact: issues get said to faces (or the channel)
   within a week, or they expire — no note-leaving, no six-month ledgers.
8. **The exit** — notice period to the house (not just the landlord) ·
   who finds/approves the replacement · deposit handling and the
   damage-vs-wear line · what happens to shared purchases. Cross-check
   against the actual lease; the agreement can't override it, only fill its
   silences.

## Output Format

```
# [Address] house agreement — v1, [date]
[Eight sections, each 2-4 plain-language lines, decided not vague]
Signed-ish: [names] · Revisit when: [triggers]

## The house meeting (20 minutes, snacks mandatory)
[Opening line that isn't corporate · the 5 real discussion questions ·
handling "we're chill, we don't need this" · how to end with agreement]

## Stalemate menu
[For each classic deadlock: 2-3 workable options to pick from]
```

## Quality Checks

- [ ] Every section ends in a decision or a named default — "be considerate"
      appears nowhere
- [ ] The partner-creep threshold has actual numbers in it
- [ ] The exit plan was checked against lease reality (joint liability
      named if present)
- [ ] Tone check: reads like flatmates wrote it on a good day, not like a
      landlord or an HR portal
- [ ] The meeting script includes the "we're chill" rebuttal: chill flats are
      chill *because* the defaults are agreed

## Anti-Patterns

- [ ] Do not write legalese — this document works by being read, remembered,
      and quotable in one line ("sink's not a queue!")
- [ ] Do not encode one roommate's preferences as house law — every
      contested default is presented as a menu, decided at the meeting
- [ ] Do not skip the exit section because move-in day feels optimistic —
      it's the section that saves the friendship later
- [ ] Do not position the agreement as distrust; frame stays "deciding while
      we like each other"
- [ ] Do not offer legal advice on leases/deposits — flag lease conflicts and
      point at [[lease-decoder]] and, for deposits, [[security-deposit-recovery]]

## Related

[[lease-decoder]] before signing the lease itself; [[security-deposit-recovery]]
when the exit goes wrong; [[working-agreements]] — the office version of the
same peace treaty.

## Example Trigger Phrases

- "Write a roommate agreement."
- "We're moving in together: set the house rules."
- "The dishes cold war has started."
- "Someone's moving out mid-lease."
