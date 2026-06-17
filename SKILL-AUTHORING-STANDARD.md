# Skill Authoring Standard

This is the canonical structure every skill in this library follows. It exists so
that 160+ skills feel like one coherent product rather than a folder of loose prompts,
and so contributors know exactly what "done" looks like. If you are adding or editing a
skill, match this standard.

It complements [CONTRIBUTING.md](CONTRIBUTING.md) (how to submit) — this document is
about *what a good skill contains*.

---

## 1. File layout

```
skills/
  your-skill-name/
    SKILL.md            # required — the skill itself
    scripts/            # optional — stdlib-only helper programs
      your_helper.py
```

- One skill per folder. Folder name = skill name = `name` in the frontmatter.
- Use lowercase, hyphenated names (`customer-journey-map`, not `CustomerJourneyMap`).
- A skill must be useful with `SKILL.md` alone. Scripts are an enhancement, never a
  prerequisite.
- **Never hand-edit `exports/`.** Those platform files (e.g. ChatGPT `SYSTEM_PROMPT.md`)
  are generated from the `SKILL.md` body by `scripts/build-exports.mjs`. Edit the source
  skill and regenerate; CI fails if they drift.

## 2. Frontmatter (required)

```yaml
---
name: your-skill-name
description: "One sentence on what it does. Use when [trigger conditions]. Produces [the concrete output]."
---
```

The `description` is the single most important line — it is all the model sees when
deciding whether to load the skill. It must contain three things:

1. **What** the skill does, in one clause.
2. **Use when…** — explicit trigger phrases a user would actually say.
3. **Produces…** — the concrete artifact, so the model knows the payoff.

Keep it under ~3 sentences. Write triggers from the user's vocabulary, not internal jargon.

## 3. Body sections

Use this section order. Not every skill needs every section, but strong skills include
most of them, and the **bold** ones are required.

| Section | Purpose |
|---|---|
| `# Skill Title` + one-line summary | **Required.** Restate the value in plain language. |
| **What This Skill Produces** | Bullet list of the deliverables. Sets expectations. |
| **Required Inputs** | What to ask the user for if it isn't provided. Prevents guessing. |
| Framework / Formula / Scale | The method, rubric, weights, or formula the skill applies. |
| Programmatic Helper | If the skill has a script, show how to run it and what it returns. |
| **Output Format** | A concrete template (headings, tables) of the final artifact. |
| **Quality Checks** | A checklist the output must pass before it's handed over. |
| **Anti-Patterns** | Explicit "Do not…" rules — the mistakes this skill prevents. |

## 4. Quality bar

A skill is ready to merge when:

- [ ] The `description` has all three parts (what / use when / produces).
- [ ] It solves a **recurring** professional workflow, not a one-off task.
- [ ] It asks for missing inputs rather than inventing them.
- [ ] The output format is concrete enough that two runs look like the same product.
- [ ] It includes **Quality Checks** and **Anti-Patterns** — these are what make a skill
      trustworthy, not just a prompt.
- [ ] It works with no setup beyond reading the file (scripts excepted, and those are
      stdlib-only).

## 5. Helper scripts (optional)

Some skills ship a `scripts/` folder that computes part of the work. Rules:

- **Standard library only.** No `pip install`. No third-party imports.
- **No network access, no surprise file writes.** Read input, print output.
- Accept input via flags *and* JSON (file or stdin); offer `--json` output for chaining.
- Include a module docstring with runnable examples and a `--help` via `argparse`.
- The script augments the skill — the SKILL.md must still produce a good result without it.

See `skills/rice-prioritisation/scripts/rice_calculator.py` for a reference example.

## 6. Tone and safety

- Write instructions *to the model* ("Ask for…", "Flag any…", "Never write…").
- British or American spelling is fine; be consistent within a skill.
- No prompt injection, no instructions to override model guidelines, no requests to
  collect or transmit user data. See [SECURITY.md](SECURITY.md).

## 7. Tiering

New skills enter as **Experimental**. Once a skill has a stable output format, quality
checks, and real-world use, it can be promoted to **Stable** or **Production-Ready** in
[TIERS.md](TIERS.md). Tiering is honest signposting, not a value judgement on effort.
