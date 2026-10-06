---
name: template-designer
description: "Turn a document the team keeps rewriting into a template that actually helps — extract the recurring skeleton, mark what varies with real placeholder prompts, keep it lighter than the ceremony it replaces, and pilot it before decreeing it. Use when asked make a template from this doc, we write this same thing every week, standardize our status updates or briefs, or why does nobody use our templates. Produces the extracted template with prompting placeholders, the keep-it-light rules, the example-filled twin, and the adoption path."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/template-designer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Template Designer Skill

Templates fail in two familiar ways: the empty-headings ghost (`## Background` — helpfully blank) that guides nobody, and the forty-field bureaucratic form that takes longer than freeform writing did. A working template is extracted from documents the team *already writes repeatedly*, keeps only the sections that recur with purpose, and — the difference-maker — its placeholders are *prompts* ("One sentence: what changed since last update, and does the date still hold?") rather than labels ("Update:"). It ships with a filled example, because the example teaches what the skeleton can't.

## What This Skill Produces

- **The template** — the recurring skeleton with prompting placeholders, each section justified by recurrence
- **The filled twin** — a realistic example completed end-to-end; templates travel in pairs or don't travel
- **The light-ness audit** — what was deliberately left out, and the freeform escape-hatch section
- **The adoption path** — pilot with the next real instance, revise from friction, then propose as default (not decree)

## Required Inputs

Ask for these if not provided:
- **The recurring documents** — 3+ past instances of the thing being templated; extraction needs a pattern, and one document is an anecdote
- **The reader's use** — what the reader does with this document (skim for risk? approve? file?) — sections serve the *reader's* recurring needs, not the writer's completeness
- **The pain being fixed** — inconsistency between authors? Missing sections discovered late? Slow drafting? The template optimizes for its actual complaint
- **The mandate reality** — can this be piloted, or is someone demanding a decree? (Piloted templates survive; decreed ones get malicious compliance)

## Framework: The Design Rules

1. **Extract from the recurrences:** lay the past instances side by side — sections appearing in all of them with real content are the skeleton; sections appearing once are not; sections appearing empty-or-boilerplate in all ("Risks: none") get interrogated, not inherited. The template is the pattern, cleaned.
2. **Placeholders prompt, labels don't:** every placeholder is a question or instruction that produces the right content from a rushed author — "[The one decision you need from readers, as a question]" beats "[Decision]". The prompts carry the institutional knowledge of what good looks like; this is 60% of the template's value.
3. **Lighter than the ceremony it replaces:** the template's fill-time must undercut freeform drafting or adoption is irrational — target: fewer sections than the worst past instance, plus one `## Anything else` escape hatch (its absence is why people abandon templates the first time reality doesn't fit the boxes).
4. **The filled twin is mandatory:** a complete, realistic example lives beside the blank — authors pattern-match from examples far better than they interpret skeletons, and the example settles length questions ("oh, three bullets, not three paragraphs") that prompts can't.
5. **Pilot, revise, then propose:** the next real instance uses the draft template; every friction point (a section that didn't fit, a prompt that confused) revises it; *then* it's proposed as the default with the pilot as evidence. Templates decreed before contact with reality collect workarounds instead of documents.

## Output Format

# Template: [document type] — replaces [the freeform ritual]

## The Template
[The skeleton: sections with prompting placeholders · the escape hatch · fill-time target stated]

## The Filled Twin
[A realistic complete example — the length-and-tone teacher]

## The Light-ness Audit
[Cut from the pattern: X (appeared once), Y (always boilerplate) · kept: each section's recurrence + reader-use justification]

## Adoption Path
[Pilot on the next real one → friction revisions → propose-with-evidence · the owner who maintains it]

## Quality Checks

- [ ] Every section survived the recurrence test across past instances
- [ ] Every placeholder is a prompt that would guide a rushed author
- [ ] Fill-time beats the freeform baseline; the escape hatch exists
- [ ] The filled twin ships with the blank
- [ ] The path is pilot-then-propose, with a named maintainer

## Anti-Patterns

- [ ] Do not template from imagination — three real instances or it's speculation with headings
- [ ] Do not ship label-placeholders — "[Background]" teaches nothing; the prompt is the product
- [ ] Do not exceed the ceremony being replaced — heavier-than-freeform templates are adopted at gunpoint only
- [ ] Do not omit the escape hatch — the first non-fitting reality kills rigid templates
- [ ] Do not decree v1 — pilot friction is cheap; organizational resentment is not

## Example Trigger Phrases

- "Make a template from this doc."
- "We write this same thing every week."
- "Standardize our status updates."
- "Why does nobody use our templates?"
