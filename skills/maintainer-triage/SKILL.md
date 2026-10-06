---
name: maintainer-triage
description: "Get an open-source repo's issue backlog from 400-and-drowning to triaged-and-honest in one pass — a label taxonomy that encodes decisions, batch triage rules you can apply in seconds per issue, saved replies that stay kind at scale, and stale-bot policy set with a conscience. Use when a maintainer says 'my issues are out of control', 'triage my backlog', 'set up labels for my repo', or dreads opening GitHub. Produces the taxonomy, the triage pass rules, saved replies, and a sustainable weekly routine."
---

# Maintainer Triage Skill

An untriaged backlog isn't a to-do list — it's 400 open loops charging
interest on a volunteer's conscience. The fix isn't heroic issue-closing
weekends (they don't repeat); it's a system where every issue gets a
*decision* in under a minute — reproduce/needs-info/accepted/wontfix/
someday — encoded in labels, communicated by saved replies that stay human,
and maintained by a 30-minute weekly routine. Honest triage closes issues
politely that will never be done, because "open forever" is the cruelest
answer of all.

## What This Skill Produces

- A **label taxonomy** that encodes decisions, not just topics: status
  (needs-repro, needs-info, accepted, help-wanted, wontfix, someday) ×
  type (bug, feature, docs, question) × effort (good-first-issue,
  deep-water)
- **Batch triage rules**: the 30-second decision tree per issue, and the
  order to eat the backlog (newest-first, oldest closed honestly in bulk)
- **Saved replies** for the eight recurring moments — needs-repro,
  duplicate, wontfix-with-respect, stale-close, "PR welcome" (said only
  when meant), the excited-first-contributor welcome
- A **sustainable routine**: the 30-minute weekly triage block + the
  stale-policy settings, with the conscience switch: bugs never auto-stale
- The **backlog burn-down plan** for the existing 400

## Required Inputs

Ask for (if not already provided):
- The repo: what it does, issue count, open PR count, other maintainers or
  solo, current label mess
- The honest capacity: hours/week the maintainer actually has (the system
  is sized to this, not to the backlog)
- The sore points: what fills the backlog (support questions? feature
  wishlists? real bugs?) and what the maintainer feels worst about
- Project stance: is this a hobby, a career asset, or accidentally
  load-bearing infrastructure? (wontfix courage scales with clarity here)

## Framework

1. **Labels are decisions.** Every open issue carries exactly one status
   label — an issue with no status is untriaged, and the goal state is
   zero untriaged. Topics are optional garnish; status is the system.
2. **The 30-second tree.** Bug without repro → needs-repro + saved reply +
   14-day clock. Repro'd bug → accepted + severity. Feature aligned with
   project vision → accepted or help-wanted; not aligned → wontfix *now*,
   kindly — parking unaligned features in "someday" is deferral disguised
   as kindness, use someday only for genuinely-yes-later. Question → answer
   or convert to discussion/docs issue. Duplicate → link + close.
3. **Eat the backlog newest-first.** Newest issues have live reporters and
   fresh context; the oldest 200 get the honest bulk pass: a pinned
   announcement ("triage sweep this week — issues inactive >12 months close
   with this message; comment to reopen") then the sweep. Reopens are
   *signal*, not failure — that's the mechanism finding the living issues.
4. **Saved replies stay human.** Each is 2–4 sentences, warm, and ends with
   a clear next step. "PR welcome" appears only where a PR would genuinely
   be reviewed and merged — as a brush-off it's the most resented phrase in
   open source.
5. **The routine that survives.** Weekly 30 minutes: new issues to zero
   untriaged → needs-info clock expiries → one accepted issue advanced.
   Stale-bot only on needs-info and question labels, never on accepted
   bugs. The maintainer's dread is the metric: if opening the repo stops
   hurting, the system is working.

## Output Format

```
## Label taxonomy (create these)
[Status set · type set · effort set — with color/description lines]

## The 30-second tree
[Decision tree, one branch per issue shape]

## Saved replies (paste into GitHub)
[The eight, each 2-4 sentences]

## Backlog burn-down
[The pinned announcement text · sweep order · reopen handling]

## Weekly 30 minutes
[The three-step routine · stale-bot config with the bugs-never-stale rule]
```

## Quality Checks

- [ ] Every issue shape in the tree ends in a decision + a saved reply —
      no branch ends in "leave it"
- [ ] Wontfix replies give the reason and thank the reporter — respect at
      scale is the whole trick
- [ ] The bulk-close announcement runs BEFORE the sweep, and reopen
      instructions are in the close message
- [ ] Stale automation exempts accepted bugs explicitly
- [ ] The routine fits the stated real hours, not the aspirational ones

## Anti-Patterns

- [ ] Do not build a 40-label topic museum — status labels are the system;
      taxonomy sprawl is procrastination with colors
- [ ] Do not use "someday" as a polite graveyard — unaligned features get
      an honest wontfix
- [ ] Do not auto-stale confirmed bugs; nothing burns trust faster
- [ ] Do not write saved replies that could double as form rejections —
      each names the specific next step
- [ ] Do not size the system to the backlog instead of the maintainer's
      hours

## Related

[[the-maintainers-no]] for the requests that need a personal no;
[[first-maintainer-month]] for new maintainers; [[email-triage-system]] —
the same discipline pointed at an inbox.

## Example Trigger Phrases

- "My issues are out of control."
- "Triage my backlog."
- "Set up labels for my repo."
