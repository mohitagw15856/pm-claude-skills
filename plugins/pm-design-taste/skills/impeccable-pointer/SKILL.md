---
name: impeccable-pointer
description: "Point to Paul Bakaus's Impeccable design skill and explain when to use it. Use when asked how to install impeccable, which skill critiques and audits a built UI, or what handles the critique stage of the design pipeline. Produces the install command, the one-time init step, guidance on when it fits and when it does not, and credit to the author with a link. Contains no upstream skill content."
version: 1.0.0
---

# Impeccable (pointer)

This is a pointer, not a copy. It tells you when Paul Bakaus's Impeccable is the right tool, how to install it from the source, and who to credit. The skill, its commands and its detector rules live upstream and are not reproduced here.

## What This Skill Produces

- **A recommendation**: whether the upstream skill fits the task in front of you
- **The install command and the init step**
- **Its place in the pipeline**: stage 4, Critique, in `ui-design-pipeline`
- **Attribution**: author, licence and link

## Required Inputs

Ask for these if not provided:
- **The page or component to review**, already built
- **The direction and system files** from stages 1 and 2, so the review judges against intent
- **Which assistant is in use**, since the installer supports several

## Framework: When to Use It

Use it when:
- A page is built and needs a design review covering hierarchy, clarity and polish
- You want a shared vocabulary of design commands to push a page bolder or quieter
- You want deterministic checks that run without a model as well as a model-led critique

Look elsewhere when:
- Nothing is built yet. Start at stage 1.
- You need to see the page rendered at real widths. Use `playwright-cli-pointer`.
- You want a written critique with no install. Use this library's `design-critique`.

## Install

From the project root:

```bash
npx impeccable install
```

Then, inside your AI coding tool, run once per project:

```
/impeccable init
```

The init step records product context in a `PRODUCT.md` file so later commands know the audience and purpose. In the pipeline, base that file on the direction from stage 1 so the two do not disagree.

Alternative for Claude Code, as documented upstream: `/plugin marketplace add pbakaus/impeccable`, then install it from the `/plugin` list.

Confirm the install: run `/impeccable critique` on a page and check that it responds.

## Output Format

### Pointer: impeccable
1. **Fit**: use it or not, in one sentence, with the reason
2. **Install**: the command, then the init step
3. **Check**: how to confirm it is loaded
4. **Next**: the pipeline stage that follows
5. **Credit**: author, licence, link

## Credit

- **Project**: Impeccable
- **Author**: Paul Bakaus
- **Licence**: Apache 2.0
- **Link**: https://github.com/pbakaus/impeccable
- **Docs**: https://impeccable.style
- **Lineage**: upstream states that it started from Anthropic's frontend-design skill
- **Checked**: 2026-09-28

## Quality Checks
- [ ] The install command and the init step were both given, in that order
- [ ] The author was credited with a link
- [ ] No upstream skill text, command text or detector rule was reproduced
- [ ] The critique was run on a built page, not on a plan

## Anti-Patterns
- **Skipping init.** Without product context the critique has nothing to judge against.
- **Running it together with the direction skill.** They share lineage and will still pull in different directions.
- **Treating a clean audit as proof the page looks right.** Rendering is checked in stage 5.

## Example Trigger Phrases
- "How do I install Impeccable?"
- "Which skill can critique this page for hierarchy and polish?"
- "What handles the critique stage of the design pipeline?"
- "Do I need to run anything after npx impeccable install?"

---

Part of the pm-design-taste bundle in the library at https://github.com/mohitagw15856/pm-claude-skills.
