---
name: follow-up-chaser
description: "Chase unanswered emails without being annoying — the escalating-gently sequence with timing rules, the re-ask that makes replying easy, and the close-the-loop discipline that ends zombie threads. Use when asked they haven't replied what do I send, write a follow-up that isn't pushy, how long do I wait before chasing, or manage my waiting-on list. Produces the follow-up sequence with dates, drafts per rung, and the give-up-gracefully exit."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/follow-up-chaser.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Follow-Up Chaser Skill

Unanswered email dies in two ways: never chased (the ask silently expires) or chased badly ("just bumping this!" seven times, each one easier to ignore than the last). Good chasing is engineered: each follow-up *lowers the cost of replying* — restating the ask smaller, offering a default, adding a deadline with a reason — and the sequence escalates channel or stakes, not temperature. Three rungs, then a graceful close that converts silence into an answer.

## What This Skill Produces

- **The sequence** — 2–3 follow-ups with dates, each drafted, each easier to answer than the last
- **The re-ask engineering** — the original request shrunk to its yes/no core with a default attached
- **The channel escalation** — when rung 3 moves from email to chat/call, and how to do it without ambush
- **The graceful close** — the final note that ends the thread with the relationship intact

## Required Inputs

Ask for these if not provided:
- **The original ask and its date** — what was requested, how big the ask is (a signature vs. a favor vs. a decision), and any real deadline
- **The relationship and power direction** — chasing a report, a peer, a boss, and a customer are four different cadences
- **The stakes** — blocking your work? Nice-to-have? The sequence's pace and the close's shape follow

## Framework: The Chase Rules

1. **Wait right:** internal asks get 2–3 business days before rung one; external/senior get 4–5; anything with a stated deadline gets chased at deadline-minus-buffer regardless. Chasing at 24 hours reads as pressure; at two weeks the thread is cold and the chase restarts from context.
2. **Rung 1 — reduce the ask:** don't "bump" — *shrink*. Restate in one line, convert to yes/no where possible, attach a default: "If I don't hear by Friday I'll go with option A — flag if that's wrong." Defaults convert silence into a decision, which is the whole trick.
3. **Rung 2 — add legitimate urgency:** the reason the timing matters, stated plainly ("the vendor quote expires Thursday"), plus the smallest possible version of the ask ("even a one-word yes works"). Never manufactured urgency — one fake deadline poisons all future real ones.
4. **Rung 3 — change channel, kindly:** "Sending a quick ping here in case email got buried" — chat or a 2-minute call ask. Channel escalation reads as helpful persistence; a third identical email reads as nagging.
5. **The close:** after rung 3, silence *is* the answer — close explicitly: "Haven't heard back, so I'll [default/drop it]. Reopen anytime." Closing converts a zombie thread into a decision, protects the relationship, and — often — finally triggers the reply.

## Output Format

# Chase Plan: [the ask] — sent [date]

## The Sequence
| Rung | Send date | Channel | The move |
|---|---|---|---|

## The Drafts
[Rung 1: the shrunk ask + default, verbatim · Rung 2: urgency + smallest ask · Rung 3: the channel ping · The close]

## Waiting-On Hygiene
[The @waiting entry: what, who, next rung date — reviewed weekly]

## Quality Checks

- [ ] Rung 1 shrinks the ask rather than bumping it
- [ ] Every deadline cited is real, with its reason
- [ ] The default-on-silence appears wherever a default legitimately exists
- [ ] Channel escalation happens once, framed as buried-email courtesy
- [ ] The close is drafted before the sequence starts — silence has a planned meaning

## Anti-Patterns

- [ ] Do not send "just bumping this" — a bump adds nothing and costs attention
- [ ] Do not escalate temperature (guilt, passive aggression) — escalate channel and clarity instead
- [ ] Do not chase without a waiting-list entry — untracked chases become the zombie threads
- [ ] Do not fake urgency — the first discovered fake deadline devalues every future real one
- [ ] Do not let threads die unclosed — an explicit close beats an awkward silence in every relationship that matters

## Example Trigger Phrases

- "Write a follow-up that isn't pushy."
- "How long do I wait before chasing?"
- "Manage my waiting-on list."
