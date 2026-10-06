---
name: the-maintainers-no
description: "Say no as an open-source maintainer without burning contributors or yourself — the feature that doesn't fit, the PR that took someone a weekend but can't merge, the company that wants free support, the fork suggestion said kindly. Use when a maintainer says 'how do I reject this PR nicely', 'a company is demanding support', 'this feature request won't die', or is avoiding an issue thread out of guilt. Produces the specific no for the situation, with reasoning shown and the relationship kept."
---

# The Maintainer's No Skill

Maintainer burnout is mostly unsent nos: the feature request at 40 comments,
the well-meant PR that would triple the maintenance surface, the company
that filed "urgent" on a volunteer's project. Every avoided no costs a
week of low-grade guilt; the sent no costs five minutes and is almost never
received as badly as feared. This skill writes the *specific* no each
situation needs — with the reasoning shown, the effort honored, and a real
alternative where one exists — because "no with a why and a path" keeps
contributors that "maybe someday" quietly loses.

## What This Skill Produces

- The **situation-fit no**, drafted ready to post: scope-no, PR-no,
  support-no, urgency-no, or the fork blessing
- The **reasoning paragraph**: the project-vision line that makes this no
  consistent instead of personal (and reusable next time)
- An **alternative that's real**: plugin/extension point, the fork blessing,
  a linked workaround, a paid-support pointer if one exists — or nothing,
  stated honestly, if nothing exists
- A **policy line** worth adding to CONTRIBUTING/README so the next no is
  half-written

## Required Inputs

Ask for (if not already provided):
- The thread/PR/request text, and how long it's been festering
- The real reason it's a no (doesn't fit vision? maintenance cost? just
  don't want to? — all valid; the phrasing differs)
- Who's asking: first-timer, regular contributor, company, drive-by
- What the maintainer could genuinely offer, if anything (review a smaller
  PR? accept behind a flag? nothing?)

## Framework

1. **Diagnose the no.** Scope-no (doesn't fit what this project is) ·
   cost-no (fits, but the maintenance is forever and it's mine) · PR-no
   (effort real, direction wrong) · support-no (this is unpaid volunteer
   time being invoiced) · capacity-no (fits, but not this year — the only
   no that may honestly become "someday").
2. **Honor effort before delivering direction.** For PRs especially: name
   something genuinely good in it first (one specific thing, not flattery).
   The order is: thanks-with-specifics → the no with the why → the path if
   real. Skipping straight to the no is efficient and expensive.
3. **Show the vision line, not the mood.** "This project deliberately stays
   [small/zero-dep/single-purpose]; features like X belong in
   [plugins/forks/other tools]" — a no anchored to a stated principle
   generalizes; a no anchored to today's energy invites relitigation.
   If the principle isn't written anywhere yet, this is the moment: the
   skill drafts the CONTRIBUTING line.
4. **Bless the fork sincerely.** "This is exactly what forks are for — the
   license means you don't need my permission, and I mean that as an
   invitation, not a brush-off" defuses more standoffs than any other
   sentence in open source.
5. **For companies: name the exchange.** Volunteer-maintained ≠ SLA. The
   reply states what's available free (the issue queue, at volunteer pace),
   what isn't (deadlines, priority), and — if the maintainer wants it —
   the paid path ("sponsorship/support contract gets your issue a
   scheduled slot"). No apology anywhere in it.
6. **Close the loop physically.** The no ends with the issue's fate:
   closed-wontfix, converted to discussion, or left open behind a named
   condition. A no that leaves the thread open re-accrues the guilt.

## Output Format

```
## Diagnosis
[Which no this is, and the real reason in one honest line]

## The reply (ready to post)
[Thanks-with-specifics → the no with the vision line → the real path or
honest nothing → the thread's fate]

## Add to CONTRIBUTING (so the next one is half-written)
[The policy line this no just established]

## If they push back
[The one-paragraph second reply — same decision, warmer, final]
```

## Quality Checks

- [ ] The no is unambiguous — a reader cannot mistake it for maybe
- [ ] Effort is honored with a specific, true observation, not a compliment
      template
- [ ] The reasoning cites a project principle that will still be true next
      month
- [ ] Any offered alternative is real — no "PR welcome" unless a PR would
      genuinely merge
- [ ] The thread's fate is stated (closed / converted / condition), and the
      pushback reply doesn't reopen the decision

## Anti-Patterns

- [ ] Do not soften into ambiguity — "maybe down the road" costs you this
      conversation again in six months, with interest
- [ ] Do not apologize for the project's boundaries; gratitude yes,
      apology no
- [ ] Do not match a demanding tone — the calm no in a heated thread is
      read by every future contributor, not just this one
- [ ] Do not invent roadmap promises to escape the moment
- [ ] Do not skip the fork blessing out of possessiveness — the license
      already said yes; saying it warmly is free

## Related

[[maintainer-triage]] — the system that catches these before they fester;
[[saying-no-kindly]] — the general craft; [[first-maintainer-month]] for
setting the boundaries early enough that nos stay rare.

## Example Trigger Phrases

- "How do I reject this PR nicely?"
- "Say no to this feature request."
- "A company wants free support from my project."
- "Suggest a fork without burning the contributor."
