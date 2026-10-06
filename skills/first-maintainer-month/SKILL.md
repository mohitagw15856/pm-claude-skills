---
name: first-maintainer-month
description: "Set up a new open-source project's first month so it can grow without eating its maintainer — the README that routes people correctly, CONTRIBUTING boundaries written before there are contributors, issue templates that pre-triage, a release rhythm, and the sustainability defaults (what you owe no one). Use when someone says 'my repo is getting attention', 'I just open-sourced something', 'set up my project properly', or their first PR from a stranger just landed. Produces the docs set, the templates, and the month-one routine."
---

# First Maintainer Month Skill

The transition from "my code, public" to "a project with users" happens in
one surprising week — the first stranger's issue, the first PR, the first
demand — and the habits set in that month harden into the project's culture.
Most maintainer burnout traces back to boundaries never written: no
CONTRIBUTING to point at, no issue template doing the pre-triage, no stated
release rhythm, and an implicit promise of instant response that was never
sustainable. This skill sets the defaults while they're cheap: documents
that route people, templates that filter, and the load-bearing sentence
every new maintainer needs in writing — *this is a volunteer project;
responses happen when they happen.*

## What This Skill Produces

- A **README restructure**: what it does in one line, quickstart, the
  support-expectations paragraph, and where everything else routes
- **CONTRIBUTING.md** written for a project with 0–5 contributors: what's
  welcome, what needs an issue first, the vision line that powers future
  nos, PR standards kept minimal
- **Issue/PR templates** that pre-triage: bug template demanding the repro,
  feature template asking "why does this belong here?", the config that
  routes questions to discussions
- The **release rhythm**: versioning stance, a changelog habit
  ([[changelog-generator]] plugs in), and "releases happen when ready, not
  on demand"
- The **month-one routine** + sustainability defaults: response-time
  expectations stated publicly, the co-maintainer bar, the walk-away
  clause (archiving honestly is always allowed)

## Required Inputs

Ask for (if not already provided):
- The project: what it does, current traction (stars/users/issues so far),
  license already chosen or not
- The maintainer's real intent: hobby, portfolio, hoping-it-grows, or
  accidentally-load-bearing — the boundary strength scales with this
- Honest available hours per week, and the response-time promise they can
  actually keep (then halve it)
- What they dread most (drive-by demands? bad PRs? being ignored?) — the
  docs pre-answer the dread

## Framework

1. **README routes, not sells.** One-line what-it-is → 60-second quickstart
   → the honesty block: project status (active/hobby/experimental), support
   expectations ("volunteer-maintained; issues answered in batches"), links
   to CONTRIBUTING/discussions. The honesty block is the burnout vaccine —
   written now, it's context; written after complaints, it's defensive.
2. **CONTRIBUTING sets the vision line early.** One paragraph on what the
   project deliberately is and isn't — this sentence powers every future
   [[the-maintainers-no]]. Then: bugs welcome with repro · features need an
   issue before a PR · small PRs merge fast, big surprise PRs mostly don't ·
   the courtesy note that maintainer time is the scarce resource.
3. **Templates do the triage.** Bug: version, repro steps, expected/actual
   — incomplete reports get the template pointed at, kindly, once. Feature:
   the problem before the solution, and "would this belong in core or a
   plugin?" Questions route to Discussions so the issue queue stays a work
   queue.
4. **Release rhythm beats release pressure.** State the stance in README:
   semver-ish, changelog kept, releases batched ("roughly monthly when
   there's something to ship"). A stated rhythm converts "when will this
   release??" from pressure into a known answer.
5. **Month-one routine, sized honestly.** A fixed weekly block
   ([[maintainer-triage]]'s 30 minutes) · respond in batches, never on
   arrival (arrival-response trains the crowd to expect it) · say the
   walk-away clause out loud once: archiving a project honestly served is a
   legitimate ending, and knowing that is what makes continuing a choice.

## Output Format

```
## README restructure
[The new skeleton with the honesty block drafted verbatim]

## CONTRIBUTING.md (ready to commit)
[Vision line · what's welcome · issue-before-PR · PR standards]

## Templates (.github/)
[bug_report.yml · feature_request.yml · config.yml routing questions]

## Release stance (paste into README)
[Versioning · changelog habit · the rhythm sentence]

## Month one
[Weekly block · batch-response rule · the three habits · walk-away clause]
```

## Quality Checks

- [ ] The support-expectations paragraph exists and matches the maintainer's
      real hours (halved), not their guilt
- [ ] The vision line is specific enough to justify a concrete future no
- [ ] Bug template demands repro; feature template demands the problem
- [ ] Everything fits a 0-contributor project today — no governance LARP
      (CoC yes; steering committees no)
- [ ] The walk-away clause appears — sustainability includes the exit

## Anti-Patterns

- [ ] Do not import big-project governance onto a two-week-old repo —
      process should trail traction, not lead it
- [ ] Do not promise response times the maintainer can't keep on a bad
      month — under-promise in writing
- [ ] Do not write CONTRIBUTING as a wall of rules; it's a welcome with
      boundaries, in that order
- [ ] Do not let the first demanding user set the culture — the docs exist
      so the maintainer's defaults win

## Related

[[maintainer-triage]] when the backlog arrives; [[the-maintainers-no]] for
the moments docs can't pre-answer; [[changelog-generator]] and
[[pr-description-writer]] for the release rhythm's moving parts.

## Example Trigger Phrases

- "My repo is getting attention."
- "I just open-sourced something."
- "Set up my project properly."
