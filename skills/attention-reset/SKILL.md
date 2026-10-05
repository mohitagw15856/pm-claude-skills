---
name: attention-reset
description: "Get your attention back with a 30-day protocol that assumes you'll break it — a screen-time ledger without moralizing, friction engineering (what to delete, grayscale, where the phone sleeps), planned relapses, and honest replacement activities for the boredom that shows up on day 3. Use when someone says 'my screen time is 7 hours', 'I want a dumbphone', 'digital detox', 'I can't read books anymore', or 'my attention span is gone'. Produces the ledger, a personal friction plan, and the 30-day protocol with expected failure points."
---

# Attention Reset Skill

Attention didn't get weak — it got outbid. Apps engineered by thousands of
people compete for it against your unread book, and the book was never going
to win on willpower. So this protocol doesn't use willpower: it uses
*friction* — making the scroll slightly harder and the alternative slightly
easier — plus honest accounting, planned relapses (day 3 and day 12 are
coming; a plan that pretends otherwise is a plan for shame), and the missing
piece in every detox thread: you can't delete a habit, only replace it, so
the replacement gets designed with the same care as the deletions. Bennett
wrote the original time audit in 1908; this is the sequel his readers didn't
need yet — [[bennett-time-audit]] assumed your evening was empty; your phone
disagrees.

## What This Skill Produces

- An **attention ledger**: where the hours actually go (from their screen-
  time stats), split by *chosen* vs *captured* time — the distinction that
  replaces moralizing
- A **personal friction plan**: the delete/keep/cripple list for their
  actual apps, plus environmental moves (grayscale, where the phone sleeps,
  the launcher diet)
- The **30-day protocol**: week-by-week, with expected failure points
  pre-written and re-entry rules for after a relapse
- A **replacement menu**: what fills the specific moments the phone
  currently owns (the queue, the toilet, the 11pm bed scroll), matched to
  what they actually miss doing

## Required Inputs

Ask for (if not already provided):
- The screen-time screenshot or numbers: total, top 5 apps, pickups —
  today's truth, no editorializing
- The moments it happens: first-thing? queues? work escapes? the bed spiral?
  (the *when* determines the friction plan more than the *what*)
- What they miss being able to do (read? sit through a film? be bored?) —
  this becomes the replacement menu, and the motivation anchor
- Constraints: apps genuinely needed for work/family, past attempts and how
  they died

## Framework

1. **Ledger without judgment.** Sort the hours: CHOSEN (the show you meant
   to watch, the chat with your sister) vs CAPTURED (the 40-minute scroll
   you don't remember starting). The target is captured time only — this
   protocol defends chosen pleasures explicitly, or it becomes puritanism
   and dies by day 5.
2. **Engineer friction, not resolve.** Per app: DELETE (captured-only apps —
   the feed apps; the account survives, the pocket access doesn't) ·
   CRIPPLE (needed apps made boring: log-out-after-use, no notifications,
   moved off home screen, web-only) · KEEP (tools and chosen media, left
   alone). Environment: phone charges outside the bedroom (buy the £10
   alarm clock — this one change carries half the protocol) · grayscale ·
   home screen reduced to tools · one no-phone anchor block daily.
3. **Design the replacements before the void opens.** For each captured
   moment, a specific fitted replacement with *lower activation energy than
   the scroll*: the book already open on the nightstand, the podcast queued,
   the actual boredom (rehabilitating boredom is the end-boss and worth
   naming as a goal). Vague "read more" loses to a feed every time;
   the pre-opened book sometimes wins.
4. **The 30 days, with failure built in.** Week 1: ledger + environment
   moves only (no usage targets yet — change the terrain first). Week 2:
   deletions + replacements live; **expect day 2–4 to be irritable and say
   so in advance**. Week 3: the relapse window — the rule is written now:
   *a relapse ends at the next sleep, not the next Monday*; no streak
   resets, streaks are the enemy of restarts. Week 4: re-add ONE deleted
   thing deliberately if wanted, on the crippled tier — the goal is a
   phone that serves, not a monastery.
5. **Measure what matters.** Success metrics: captured hours ↓, the
   missed-thing returning (pages read, films finished), pickup count ↓.
   NOT total screen time — a 3-hour chosen movie is a win, and metrics that
   can't tell wins from losses train the wrong thing.

## Output Format

```
## Your attention ledger
| Where hours go | h/day | Chosen or captured? |
Captured total: X h/day — that's the whole target. Chosen stays.

## Friction plan
DELETE: … · CRIPPLE (how, per app): … · KEEP: …
Environment: [bedroom charge · grayscale · home screen · anchor block]

## Replacement menu (moment → fitted swap)
| The moment | What fills it (activation energy ≤ the scroll) |

## The 30 days
[Week-by-week · day 2-4 irritability forecast · the relapse rule verbatim ·
week-4 deliberate re-add]

## What we count
[Captured ↓ · the missed-thing returning · pickups ↓ — not total time]
```

## Quality Checks

- [ ] The ledger preserves chosen time explicitly — the protocol never
      touches the things the user actually loves
- [ ] Every deleted app's *moment* has a fitted replacement with named
      lower activation energy
- [ ] The relapse rule appears verbatim and no streak language survives
      anywhere in the output
- [ ] The bedroom-charging move and its £10 alarm clock appear unless
      genuinely impossible
- [ ] Metrics can distinguish a chosen movie night from a captured scroll —
      total screen time is never the headline number

## Anti-Patterns

- [ ] Do not moralize — "you spent 47 hours on TikTok" is data, not a
      character reading; shame relapses users faster than any app
- [ ] Do not prescribe the monastery — plans that ban chosen pleasures die
      by day 5 and take the user's confidence with them
- [ ] Do not rely on willpower anywhere a design change exists
- [ ] Do not medicalize — persistent compulsion that resists structural
      change, or scrolling that's masking something heavier, gets the honest
      "this might need a human" line, not a sterner protocol
- [ ] Do not promise a rewired brain in 30 days — the honest pitch is
      captured hours returned and the first finished book

## Related

[[bennett-time-audit]] for what to do with the reclaimed evening;
[[deep-work-blocking]] for the work-hours version; [[weekly-review-ritual]]
as the protocol's maintenance home after day 30.

## Example Trigger Phrases

- "My screen time is 7 hours."
- "I want a dumbphone."
- "I can't read books anymore."
- "My attention span is gone."
