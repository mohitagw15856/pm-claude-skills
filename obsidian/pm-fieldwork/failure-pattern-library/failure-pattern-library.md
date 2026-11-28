---
aliases: ["Failure Pattern Library"]
tags: [pm-skills, skill]
skill: failure-pattern-library
description: "Check a plan, launch or system against a catalogue of named ways that projects and systems commonly fail, and report which patterns it is exposed to with the early warning sign for each. Use when asked what usually goes wrong with this, check this plan against known failure modes, which failure patterns apply here, learn from other teams' postmortems, or build our own failure pattern list. Produces a matched-pattern table with evidence from the plan, the earliest observable warning sign for each, a mitigation, and new patterns to add from the user's own incidents."
---

# Failure Pattern Library Skill

Most failures are reruns. The details change, but the shape repeats: a migration with no way back, a launch that depended on a team nobody told, a metric that went up while the product got worse. Teams relearn these because the lessons sit in separate postmortems that nobody reads together. This skill keeps the shapes as a named catalogue and matches a plan against it. It complements `pre-mortem-panel`, which imagines failure from scratch, and `incident-postmortem`, which records one failure after the fact.

## What This Skill Produces

- **A matched-pattern table**: which catalogue patterns the plan is exposed to, with the line of the plan that shows it
- **The earliest warning sign** for each match, as something a person could observe
- **A mitigation** sized to the risk
- **Patterns that do not apply**, briefly, so the coverage is visible
- **New patterns** distilled from incidents the user describes, written in the catalogue's format

## Required Inputs

Ask for these if not provided:
- **The plan**: a launch plan, a migration plan, a roadmap, an architecture, or a process
- **The context**: team size, how reversible the change is, who depends on it
- **Past incidents**, if the user wants their own patterns added: what happened, in their words

The catalogue below describes general shapes. It contains no statistics. Do not attach a frequency, a percentage or a named company's incident to a pattern unless the user supplies the source.

## Framework: The Catalogue

Match each pattern by evidence in the plan, not by topic.

**Planning and scope**
1. **The date without a scope.** A deadline is fixed and the contents are not. Sign: the plan lists a date and a wish list with no cut line.
2. **The hidden dependency.** Success needs another team that is not in the plan. Sign: a step that begins with "then they will".
3. **The second system.** A rewrite that must match every behaviour of the old system before it is useful. Sign: no intermediate release.
4. **Success with no test.** Nobody can say what result would count as failure. Sign: goals without a number or an observable.

**Delivery and change**
5. **The one-way migration.** A data or schema change with no rollback. Sign: the rollback section says "restore from backup" and no restore has been rehearsed.
6. **The big bang.** Everything changes for everyone at once. Sign: no staged rollout, no flag.
7. **The untested path.** The recovery procedure has never been run. Sign: a runbook with no last-exercised date.
8. **The silent partial.** A job can half succeed and report success. Sign: no reconciliation step.

**Systems**
9. **The retry storm.** Clients retry a struggling service and finish it off. Sign: retries with no backoff or cap.
10. **The shared fate.** Primary and fallback rely on the same thing. Sign: the fallback uses the same database, region or credential.
11. **The unbounded queue.** Work is accepted faster than it is done, with no limit. Sign: no back-pressure and no alert on age of oldest item.
12. **The stale cache as truth.** A cached answer outlives the fact. Sign: no invalidation on write and no expiry.

**Product and metrics**
13. **The proxy that drifted.** A metric is pushed up while the thing it stood for gets worse. Sign: one number, no counter-metric.
14. **The launch without a listener.** Nobody is assigned to watch the first days. Sign: no named owner for post-launch signals.
15. **The demo path.** It works on the path shown and nowhere else. Sign: empty, error and slow states are undefined.

**People and process**
16. **The single holder.** One person knows how it works. Sign: a step with a name instead of a role.
17. **The unowned handoff.** Work crosses a boundary and each side thinks the other has it. Sign: a step with no owner or two owners.
18. **The normalised warning.** An alert has been firing so long that it is ignored. Sign: known noisy alerts on the system being changed.

To add a pattern from the user's incident, write: a short name, the shape in one sentence, the earliest sign, and the mitigation that would have worked.

## Output Format

# Failure Pattern Check: [plan]

**Most exposed to:** [the one or two patterns that matter most]

## Matches
| Pattern | Evidence in the plan | Earliest warning sign | Mitigation | Owner |
|---------|----------------------|-----------------------|------------|-------|

## Checked and Not Found
[Pattern names, one line]

## Could Not Assess
[Patterns that need information the plan does not contain]

## New Patterns From Your Incidents
[Name · shape · earliest sign · mitigation]

## Quality Checks

- [ ] Every match quotes or points to the part of the plan that shows it
- [ ] Each warning sign is observable by a named role
- [ ] Patterns that could not be assessed are listed separately from those not found
- [ ] No frequency or company example was added without a source from the user
- [ ] Mitigations are proportionate; a small plan does not get an enterprise process

## Anti-Patterns

- [ ] Do not match by keyword: a plan that mentions a queue is not automatically an unbounded queue
- [ ] Do not report every pattern as a risk to look thorough
- [ ] Do not invent incident histories or statistics to make a pattern persuasive
- [ ] Do not stop at naming the pattern; give the sign and the mitigation
- [ ] Do not treat the catalogue as complete; add the user's own

## Example Trigger Phrases

- "What usually goes wrong with a plan like this?"
- "Check this migration plan against known failure modes."
- "Turn our last three incidents into reusable patterns."
- "Which failure patterns are we exposed to in this launch?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/failure-pattern-library.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.1.0 | skill: failure-pattern-library | source: skills/failure-pattern-library/SKILL.md | sha256: 460f52b55f634c2ba713b3b9b9c62b5b9f99cad875104355861c88d5659d5143 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
