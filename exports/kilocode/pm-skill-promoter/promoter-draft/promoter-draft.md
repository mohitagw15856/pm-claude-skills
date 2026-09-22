# Promoter Draft

A recurring prompt tells you what someone wants; a skill tells the assistant how to do it well every time. This skill takes one pattern from the scan report and writes the skill properly: the trigger description a model can match on, the inputs to ask for, the method, the output shape, and the checks that keep it honest. The worked examples come from the user's real prompts, generalised so the skill is useful to strangers.

Second step of the promote loop. Follows `promoter-scan`; feeds `promoter-test`.

## What This Skill Produces

- **`skills/<name>/SKILL.md`** in the library's format, with a description that has all three parts: what it does, "Use when ..." in the user's own vocabulary, "Produces ..." the concrete artefact
- **Three worked examples** inside the skill (input, abridged output), derived from the pattern's example prompts with anything specific to one person, employer or dataset removed
- **A `plugin.json` stanza** for the bundle it joins, and any supporting reference file the framework needs
- **A collision note**: the nearest existing skills by name and by job, and why this one is different

## Required Inputs

Ask for these if not provided:
- **The pattern**: its name, example prompts and score from the scan report, or the user's own description of the repeated ask
- **What good output looks like** to the user: the format they end up with after fixing the assistant's draft (this becomes the Output Format)
- **What always goes wrong** in the assistant's first attempt (this becomes the Anti-Patterns)
- **The bundle** it should join, if the user has one in mind

## Framework: From Prompt to Skill

1. **Name it for the job, not the verb.** `release-notes-from-git-log`, not `write-notes`. Check `skills/` for the exact name and for semantic neighbours; if one exists, extend it instead of drafting a duplicate.
2. **Write the description last, from the examples.** The "Use when" clause is made of the phrases the user actually typed, generalised: "release notes from this git log", "changelog entry from these commits". The "Produces" clause names the artefact.
3. **Turn the fixes into rules.** Every time the user corrected the assistant ("shorter", "group by feature", "user-facing tone"), that correction becomes a quality check or an anti-pattern.
4. **Ask for inputs; never invent them.** The Required Inputs section lists what the skill needs and what to ask for when it is missing.
5. **Generalise the examples.** Replace the user's product, team and customer names with plain roles. Keep the shape and the numbers illustrative; mark invented figures as examples.
6. **Match the house style.** Sections in the library's order; a scale or decision rule where the job has one; stdlib-only helper scripts if any; British spelling; no em dashes.

The section order and a fill-in template are in `references/skill-template.md`.

## Output Format

```
skills/<name>/
  SKILL.md            # the skill, complete
  references/         # only if the framework needs a lookup table or checklist
plugins/<bundle>/.claude-plugin/plugin.json   # new stanza, or the existing one with the skill added
```

Followed by a short note: the collision check (nearest three skills, why this differs), the three examples' provenance ("derived from prompts 1, 4 and 9 of the scan, names removed"), and the one thing the user should sanity-check before testing.

## Quality Checks
- [ ] The description contains all three parts and reads in the user's vocabulary, not the library's
- [ ] Every required section is present, in the library's order
- [ ] Three worked examples, each with an input and an abridged output, none naming a real person, company or dataset
- [ ] At least three quality checks and three anti-patterns come from the user's own corrections
- [ ] The nearest existing skills are named and the difference stated
- [ ] No em dashes, no image placeholders, British spelling

## Anti-Patterns
- **Copying the best prompt into a file and calling it a skill.** A prompt says what; a skill says how and what good looks like.
- **Keeping the user's company in the examples.** The skill must work for a stranger.
- **A description that is a summary.** It is a trigger; it must contain the phrases people say.
- **Inventing a framework for a job that does not have one.** Some skills are a template and a checklist; say so.

## Example Trigger Phrases
- "Draft a skill from pattern 1 in the scan."
- "Promote 'release notes from git log' into a skill."
- "Write the SKILL.md for the thing I keep asking for."
- "Turn this repeated prompt into a proper skill."
