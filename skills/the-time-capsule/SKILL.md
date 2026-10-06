---
name: the-time-capsule
description: "Write a sealed memo to your future self or successor — the honest state of things, falsifiable predictions with confidence levels, and the advice you suspect they'll need — with an open-on date and a scoring ritual for when it's opened. Use when leaving a role, finishing a big project, at year-end or planning season, before a leave, or 'write a letter to my successor'. Produces the sealed capsule, its prediction ledger, and the opening-day ritual."
---

# The Time Capsule Skill

Handover docs describe systems; nobody writes down the thing successors
actually need — *what you believed and how sure you were*. A time capsule is a
memo with a seal date and an open date: the honest state of things, named
predictions with confidence levels, the advice you'd whisper across time — and
a scoring ritual, because a prediction you never score is just a mood. It's
calibration infrastructure wearing an emotionally sticky costume, and it works
on future-you exactly as well as on a successor.

## What This Skill Produces

- The **capsule memo**: honest state, the things-nobody-writes-down (fragile
  truces, bodies buried, bets in flight), and advice offered with humility
- A **prediction ledger**: 5–10 falsifiable predictions, each with a confidence
  percentage, a resolution date, and its scoring criterion
- The **seal**: open-on date and trigger ("when you're considering rewriting
  the billing system, open early")
- An **opening-day ritual**: how to score the ledger and what to do with what
  it reveals — feeds [[decision-journal]] and, at 90 days, dovetails with
  [[manager-first-90-days]] for role handovers

## Required Inputs

Ask for (if not already provided):
- Who opens it (successor, future you, the team) and roughly when (a date, or
  a trigger event)
- The occasion: leaving, project end, year-end, pre-leave
- The current state as they'd tell a trusted friend — including what's fragile,
  what's pretending to be fine, and what they'd do next if they stayed
- The calls they're least sure about (those become the best predictions)

## Process

1. **Write the state honestly.** Three registers: what's working (and *why*,
   which is what actually breaks), what's fragile (the truce with team X, the
   vendor coasting on goodwill), what's pretending (the metric everyone quotes
   that no longer means anything). The rule: nothing in the capsule the writer
   wouldn't want quoted back — it will be, on opening day, by them.
2. **Extract falsifiable predictions.** Convert beliefs to scoreable claims:
   "the migration lands by Q3" → *"Migration in production by Sept 30 —
   70%."* Each gets: claim, confidence %, resolution date, and what counts as
   true (settle the scoring argument now, not later). Push for at least two
   predictions the writer is *uncomfortable* writing — those carry the
   calibration signal.
3. **Give advice as bets, not commandments.** "If X happens, I'd do Y, because
   Z" ages well; "never reorganize the platform team" ages into a dare.
   Include one "permission slip" — the thing the successor will hesitate to
   change that the writer hereby blesses changing.
4. **Seal it properly.** Open-on date + early-open triggers + where it lives
   (a file with the date in its name; calendar reminder for the opener). Note
   what the writer commits to NOT doing: editing it after sealing.
5. **Script opening day.** Score each prediction right/wrong/unresolvable ·
   compute the honest hit rate vs stated confidence · one paragraph: "what
   would past-me be surprised by?" · log the misses worth learning from in
   [[decision-journal]]. Then — the ritual's point — write the next capsule.

## Output Format

```
# 🕰 Time capsule — sealed [date], open [date/trigger]
To: [opener] · From: [writer, role, occasion]

## The honest state
[Working & why · fragile · pretending]

## Prediction ledger
| # | Claim (falsifiable) | Confidence | Resolves | Counts as true if |

## Advice, offered as bets
[If-then-because lines · the permission slip]

## What I'd do next if I were staying
[The plan they never got to run]

---
## Opening-day ritual (don't read past the seal until then)
[Score the ledger · hit-rate vs confidence · surprises paragraph · log misses
 → decision-journal · write the next capsule]
```

## Quality Checks

- [ ] Every prediction is falsifiable with its scoring criterion pre-agreed —
      no "things will improve"
- [ ] Confidence percentages vary; a ledger of all-70% is hedging in costume
- [ ] At least one fragile-or-pretending item that would never appear in an
      official handover
- [ ] Advice is in if-then-because form; the permission slip exists
- [ ] The seal has both a date and an early-open trigger, and the memo commits
      the writer to not editing after sealing

## Anti-Patterns

- [ ] Do not write a legacy-polishing document — the opener scores it; vanity
      ages worst of all
- [ ] Do not let predictions hide in prose; the ledger table is the contract
- [ ] Do not settle scores or name-blame — "the truce with X is fragile" is
      information; "X is impossible" is a grenade with a delay fuse
- [ ] Do not skip the ritual section; an unopened capsule is a diary, and an
      unscored ledger is astrology

## Example Trigger Phrases

- "Leave a role."
- "Finishing a big project."
- "Plan season."
- "Before a leave."
- "Write a letter to my successor."
