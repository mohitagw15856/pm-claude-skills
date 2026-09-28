---
name: ui-ux-pro-max-pointer
description: "Point to the ui-ux-pro-max skill by nextlevelbuilder and explain when to use it. Use when asked how to install ui-ux-pro-max, which skill generates and persists a design system, or what handles the system stage of the design pipeline. Produces the install commands, the Python 3 prerequisite check, guidance on when it fits and when it does not, and credit to the author with a link. Contains no upstream skill content."
version: 1.0.0
---

# UI UX Pro Max (pointer)

This is a pointer, not a copy. It tells you when the `ui-ux-pro-max` skill is the right tool, how to install it from the source, and who to credit. The skill and its data live upstream and are not reproduced here.

## What This Skill Produces

- **A recommendation**: whether the upstream skill fits the task in front of you
- **The install commands** and the prerequisite check
- **Its place in the pipeline**: stage 2, System, in `ui-design-pipeline`
- **Attribution**: author, licence and link

## Required Inputs

Ask for these if not provided:
- **The direction already chosen** in stage 1. Without one, a style database will pick for you.
- **The stack**: framework and styling approach
- **Whether Python 3 is available** on the machine

## Framework: When to Use It

Use it when:
- A direction exists and you need it turned into a concrete, written design system
- You want that system saved to a file that later pages read, so they do not drift
- You want searchable reference material for styles, palettes, type pairings and stack-specific guidance

Look elsewhere when:
- No direction has been chosen yet. Do stage 1 first, or the system will be a default.
- You only need motion guidance. Use `emil-design-eng-pointer`.
- Python 3 cannot be installed. Use this library's `design-system-generate` for the first draft.

## Install

In Claude Code:

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

Prerequisite: Python 3, standard library only.

```bash
python3 --version
```

If that fails, install Python 3 from python.org or your system package manager before using the skill. The upstream README also documents a CLI installer for other assistants.

Confirm the install: start a new session and check that `ui-ux-pro-max` appears in the skill list.

## How It Fits the Pipeline

Feed it the direction from stage 1 and ask it to generate and persist the design system. Upstream documents a persist option that writes a master file under `design-system/`. That file is the hand-off to stages 3 to 5. Unload the skill once the file is written.

## Output Format

### Pointer: ui-ux-pro-max
1. **Fit**: use it or not, in one sentence, with the reason
2. **Prerequisite**: Python 3 present or missing
3. **Install**: the two commands
4. **Check**: how to confirm it is loaded
5. **Next**: the pipeline stage that follows
6. **Credit**: author, licence, link

## Credit

- **Project**: UI UX Pro Max
- **Author**: nextlevelbuilder
- **Licence**: MIT
- **Link**: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Checked**: 2026-09-28

## Quality Checks
- [ ] Both install commands were given exactly as written above
- [ ] The Python 3 prerequisite was stated and checked
- [ ] The author was credited with a link
- [ ] No upstream skill text or data was reproduced
- [ ] A direction was confirmed before the skill was recommended

## Anti-Patterns
- **Letting the database choose the direction.** Pick the direction first, then use the skill to express it.
- **Generating a system and not saving it.** The persisted file is the point.
- **Keeping it loaded during the motion and critique stages.** Its guidance will compete with theirs.

## Example Trigger Phrases
- "How do I install ui-ux-pro-max?"
- "Which skill can generate a design system and save it to a file?"
- "What handles the system stage of the design pipeline?"
- "Does ui-ux-pro-max need Python?"

---

Part of the pm-design-taste bundle in the library at https://github.com/mohitagw15856/pm-claude-skills.
