# Writing Great Skills Skill

A skill is a promise: *given this kind of request, produce this kind of professional output, every time.* The best SKILL.md files win on two things — the model **triggers** them at the right moment, and once triggered it **produces the right artifact** without hand-holding. This skill helps you write one that does both.

## Working from a brief

Given a rough idea ("a skill for writing changelogs"), **produce the full SKILL.md anyway** — infer the deliverable, inputs, and structure, and mark genuinely open choices. Never hand back a skeleton with `<!-- TODO -->` left in; fill them.

## Required Inputs

Ask for (if not already provided), else infer and label:
- **What the skill should do** and the **concrete artifact** it produces
- **When it should trigger** (the phrasings a user would actually type)
- **The inputs** it needs from the user
- Any **framework or standard** it encodes (for attribution)

## The anatomy of a great SKILL.md

### 1. Frontmatter (this is what gets your skill *found*)
```yaml
---
name: kebab-case-name           # matches the folder; short, specific
description: "<one rich sentence>"
---
```
The **description is the most important line in the file** — it's all the model sees when deciding whether to load the skill (progressive disclosure: only names + descriptions are in context until one is invoked). A strong description has three parts:
- **What it does** + the concrete deliverable.
- **A "Use when …" trigger clause** listing the real phrasings ("Use when asked to write a postmortem, do a root-cause analysis, or document an incident").
- **A "Produces …" clause** naming the output ("Produces a blameless postmortem with timeline, root cause, and action items").

Write triggers the way users *speak*, not the way you'd categorise the skill. Cover synonyms.

### 2. One-line value statement
Open the body with a single sentence on the value, in the voice of a senior practitioner.

### 3. Working from a brief
State that the skill delivers a complete artifact even with thin input — infer and label assumptions, never leave bracketed placeholders, never refuse for missing context. This is what separates a skill that *works* from one that nags.

### 4. Required Inputs
A short list of what to ask for — and an instruction to proceed with labelled inferences if they're missing.

### 5. Output Format / Structure
The heart of the skill: a concrete template — real headings, tables, and sections — of the final artifact. Show the shape, don't describe it abstractly. This is where most of the quality lives.

### 6. Quality Checks
A short checklist the output must satisfy (the rubric a reviewer would apply). Make them *observable*.

### 7. Anti-Patterns
The specific failure modes to avoid — the lazy or generic outputs a weaker model would produce.

## Process

1. Nail the **deliverable** in one sentence before writing anything else.
2. Write the **description** and stress-test the triggers ("would the model pick this over a neighbouring skill?").
3. Draft the **Output Format** as a real template.
4. Add **Quality Checks** and **Anti-Patterns** that target this skill's specific failure modes.
5. Validate: `npm run skillcheck` (structure) and run it against a thin brief to confirm it doesn't beg for inputs.

## Output Format

Return:
1. The **complete SKILL.md** in a fenced block, ready to save to `skills/<name>/SKILL.md`.
2. A 3–5 bullet **"why this works"** note: the trigger phrases chosen, the deliverable, and the sharpest anti-pattern it guards against.

## Quality Checks

- [ ] `name` is kebab-case and matches the intended folder
- [ ] Description states what it does, has a "Use when …" trigger clause, and names what it **Produces**
- [ ] Body has: value line, working-from-a-brief, inputs, a concrete Output Format template, Quality Checks, Anti-Patterns
- [ ] No `TODO`/placeholder text left in
- [ ] Triggers are distinct from neighbouring skills (won't mis-fire or get skipped)
- [ ] Would pass `npm run skillcheck` with no errors

## Anti-Patterns

- A vague description with no trigger phrases — the skill never gets picked
- An Output Format that *describes* the artifact instead of *templating* it
- Quality Checks that aren't observable ("output should be good")
- Leaving `<!-- TODO -->` or `[bracketed]` placeholders in the final file
- Overlapping so heavily with an existing skill that the model can't choose between them
