---
name: emil-design-eng-pointer
description: "Point to Emil Kowalski's emil-design-eng skill and explain when to use it. Use when asked how to install emil-design-eng, which skill covers UI animation and interaction polish, or what handles the motion stage of the design pipeline. Produces the install command, a check that the install worked, guidance on when it fits and when it does not, and credit to the author with a link. Contains no upstream skill content."
version: 1.0.0
---

# Emil Design Eng (pointer)

This is a pointer, not a copy. It tells you when Emil Kowalski's `emil-design-eng` skill is the right tool, how to install it from the source, and who to credit. The skill itself lives upstream and is not reproduced here.

## What This Skill Produces

- **A recommendation**: whether the upstream skill fits the task in front of you
- **The install command**, and a way to confirm it worked
- **Its place in the pipeline**: stage 3, Motion, in `ui-design-pipeline`
- **Attribution**: author, licence and link

## Required Inputs

Ask for these if not provided:
- **What should move and why**: the state change or relationship the motion explains
- **The stack**: CSS only, or an animation library
- **How often the user triggers the interaction**

## Framework: When to Use It

Use it when:
- The layout and system are settled and the interface needs motion and interaction polish
- Animations feel slow, floaty or decorative and you want them corrected
- You want a design engineer's judgement on small details that make an interface feel finished

Look elsewhere when:
- No direction or system exists yet. Motion comes third, not first.
- You need a whole-page design review. Use `impeccable-pointer`.
- The page has no state changes worth animating. Skip the stage and record why.

## Install

```bash
npx skills@latest add emilkowalski/skills
```

The repository holds several skills. Choose `emil-design-eng` when prompted, or add `--skill emil-design-eng` to install only that one.

Note: the repository was renamed from `emilkowalski/skill` to `emilkowalski/skills`. The old address redirects, and older write-ups still show it.

Confirm the install: start a new session and check that `emil-design-eng` appears in the skill list.

## Pipeline Defaults If You Skip the Install

`ui-design-pipeline` carries three fallback rules for this stage: enter animations ease out, most interface motion stays under 300ms, and animation is used only where it helps. They are a floor. The upstream skill goes much further.

## Output Format

### Pointer: emil-design-eng
1. **Fit**: use it or not, in one sentence, with the reason
2. **Install**: the command
3. **Check**: how to confirm it is loaded
4. **Next**: the pipeline stage that follows
5. **Credit**: author, licence, link

## Credit

- **Project**: emil-design-eng, part of Emil Kowalski's skills repository
- **Author**: Emil Kowalski
- **Licence**: MIT
- **Link**: https://github.com/emilkowalski/skills
- **Checked**: 2026-09-28

## Quality Checks
- [ ] The install command uses the current repository name
- [ ] The author was credited with a link
- [ ] No upstream SKILL.md text was reproduced
- [ ] The direction and system stages were complete before this skill was recommended

## Anti-Patterns
- **Adding motion to fix a weak layout.** Animation does not repair hierarchy.
- **Installing every skill in the repository and loading them together.** Pick the one the stage needs.
- **Animating actions the user repeats all day.** Frequency is a reason to remove motion.

## Example Trigger Phrases
- "How do I install Emil Kowalski's design skill?"
- "Which skill should I use for animation and interaction polish?"
- "What handles the motion stage of the design pipeline?"
- "My transitions feel sluggish. Which skill fixes that?"

---

Part of the pm-design-taste bundle in the library at https://github.com/mohitagw15856/pm-claude-skills.
