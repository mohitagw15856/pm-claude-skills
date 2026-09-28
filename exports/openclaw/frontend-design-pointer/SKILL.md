---
name: frontend-design-pointer
description: "Point to Anthropic's frontend-design skill and explain when to use it. Use when asked how to install frontend-design, which skill sets aesthetic direction for a UI, or what handles the direction stage of the design pipeline. Produces the install command, a check that the install worked, guidance on when it fits and when it does not, and credit to the author with a link. Contains no upstream skill content."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/frontend-design-pointer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Frontend Design (pointer)

This is a pointer, not a copy. It tells you when Anthropic's `frontend-design` skill is the right tool, how to install it from the source, and who to credit. The skill itself lives upstream and is not reproduced here.

## What This Skill Produces

- **A recommendation**: whether the upstream skill fits the task in front of you
- **The install command**, and a way to confirm it worked
- **Its place in the pipeline**: stage 1, Direction, in `ui-design-pipeline`
- **Attribution**: author, licence and link

## Required Inputs

Ask for these if not provided:
- **What is being designed** and whether a visual direction already exists
- **Where the skill should be installed**: this project only, or for every project

## Framework: When to Use It

Use it when:
- You are starting a new page or product and no aesthetic direction has been chosen
- Output keeps coming back competent but interchangeable
- You want a committed stance on typography and visual character before code is written

Look elsewhere when:
- A design system already exists and must be followed. Go to stage 2 of the pipeline.
- You need a review of something already built. Use `impeccable-pointer` or this library's `design-critique`.
- You need proof that it renders correctly. Use `playwright-cli-pointer`.

## Install

Single skill, using the open `skills` CLI:

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

Alternative, as documented in the upstream README, which installs the whole example set that contains it:

```
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

Confirm the install: start a new session and check that `frontend-design` appears in the skill list.

## Name Clash to Know About

This library has its own skill called `frontend-design` in the pm-design bundle. It is a separate, original skill with the same name. If both are installed, say which one you mean. Either can serve the Direction stage.

## Output Format

### Pointer: frontend-design
1. **Fit**: use it or not, in one sentence, with the reason
2. **Install**: the command for the chosen scope
3. **Check**: how to confirm it is loaded
4. **Next**: the pipeline stage that follows
5. **Credit**: author, licence, link

## Credit

- **Project**: frontend-design, part of Anthropic's skills repository
- **Author**: Anthropic
- **Licence**: Apache 2.0, stated in the skill's own `LICENSE.txt`. The repository has no single root licence, and some other skills in it are source-available only.
- **Link**: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- **Checked**: 2026-09-28

## Quality Checks
- [ ] The install command was given exactly as written above
- [ ] The author was credited with a link
- [ ] No upstream SKILL.md text was reproduced
- [ ] The name clash with this library's own skill was mentioned when relevant
- [ ] Only this one design skill was recommended for the Direction stage

## Anti-Patterns
- **Copying the upstream skill into this library.** Point to it, so users get the author's updates.
- **Installing it alongside every other design skill and loading them together.** Use one per stage.
- **Using it to override an existing brand.** A direction skill is for when no direction exists.

## Example Trigger Phrases
- "How do I install Anthropic's frontend-design skill?"
- "Which skill should set the visual direction for this page?"
- "What handles the direction stage of the design pipeline?"
- "Is frontend-design the right skill for a new landing page?"

---

Part of the pm-design-taste bundle in the library at https://github.com/mohitagw15856/pm-claude-skills.
