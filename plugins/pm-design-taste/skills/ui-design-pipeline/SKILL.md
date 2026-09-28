---
name: ui-design-pipeline
description: "Run a five-stage UI design pipeline (direction, system, motion, critique, verification) so the result does not look like generic AI output. Use when asked to design or restyle a page, landing page, dashboard or app screen, to make a UI look less AI-generated, or to run the design pipeline. Detects which specialist design skills are installed, hands off to one per stage, and falls back to built-in guidance with the install command when one is missing. Produces a committed direction, a persisted design system file, a motion spec, a critique with fixes, and browser screenshots at mobile and desktop widths."
version: 1.0.0
---

# UI Design Pipeline

Generic AI interfaces come from skipping decisions, not from a lack of rules. This skill forces the decisions in order: commit to a direction, lock it into a file, add motion sparingly, critique the result, then prove it in a real browser.

It is an orchestrator. It owns the sequence and the hand-offs; the specialist skills own the craft at each stage.

## What This Skill Produces

- **A direction statement**: audience, purpose and one committed aesthetic stance, written before any code
- **A persisted design system file** that every later page reads, so pages do not drift
- **A motion spec**: what animates, how long, which easing, and what stays still
- **A critique** covering hierarchy, spacing, typography and "too safe vs too loud", with fixes applied
- **Verification evidence**: screenshots at mobile and desktop widths from a real browser, re-taken after each fix
- **A stage log** naming which skill handled each stage, or that the built-in fallback was used

## Required Inputs

Ask for these if not provided:
- **Audience**: who will use the page and what they already know
- **Purpose**: the one thing the page must get the visitor to do or understand
- **Surface**: marketing page, product screen, dashboard, docs, email
- **Constraints**: existing brand, framework, component library, accessibility target
- **A reference the user likes or dislikes**, if they have one. One is enough.

## Rule Zero: One Stage, One Skill, In Sequence

Run the five stages one after another. Never run them in parallel and never load every design skill into context at once.

The specialist skills were written independently and they disagree: one pushes bold expressive choices, another pushes restraint, a third holds a database of styles to pick from. Loaded together they average out into exactly the safe, generic result this pipeline exists to avoid. Load the skill for the current stage, finish the stage, write its output to a file, then move on. The file carries the decision forward, not the skill.

## Step 0: Detect What Is Installed

Check before stage 1 and record the result in the stage log.

```bash
for s in frontend-design ui-ux-pro-max emil-design-eng impeccable playwright-cli; do
  hit=""
  for d in .claude/skills "$HOME/.claude/skills" .agents/skills; do
    if [ -f "$d/$s/SKILL.md" ]; then hit="$d/$s"; fi
  done
  if [ -z "$hit" ] && grep -q "\"$s@" "$HOME/.claude/plugins/installed_plugins.json" 2>/dev/null; then hit="plugin"; fi
  echo "$s: ${hit:-missing}"
done
command -v playwright-cli >/dev/null 2>&1 && echo "playwright-cli binary: present" || echo "playwright-cli binary: missing"
```

Notes on reading the result:
- Match the exact folder name. The pointer skills in this bundle end in `-pointer` so they are never mistaken for the real thing.
- Anthropic's `frontend-design` may arrive inside the `example-skills` plugin, which the loop will not see by name. If the skill list in the session shows a `frontend-design` skill, count it as present.
- This library ships its own `frontend-design` skill in the pm-design bundle. Either one can serve stage 1. Say which one you are using.

If a skill is missing, do not stop. Use the built-in guidance for that stage and tell the user the install command once, at the end of the stage.

| Stage | Hands off to | If missing, install with | Pointer skill |
|---|---|---|---|
| 1. Direction | `frontend-design` | `npx skills add https://github.com/anthropics/skills --skill frontend-design` | `frontend-design-pointer` |
| 2. System | `ui-ux-pro-max` | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` | `ui-ux-pro-max-pointer` |
| 3. Motion | `emil-design-eng` | `npx skills@latest add emilkowalski/skills` | `emil-design-eng-pointer` |
| 4. Critique | `impeccable` | `npx impeccable install` then `/impeccable init` | `impeccable-pointer` |
| 5. Verification | `playwright-cli` | `npm install -g @playwright/cli@latest` then `playwright-cli install --skills` | `playwright-cli-pointer` |

## Framework: The Five Stages

### Stage 1: Direction

Commit to an aesthetic stance before any code exists.

Built-in guidance when no direction skill is installed:
1. Write one sentence each for audience, purpose and the feeling the page should leave.
2. Propose three directions that differ in kind, not in shade. Name each in two or three words and tie it to the brief ("ledger-like and exact" for an accounting tool, not "modern and clean").
3. Pick one and say why the other two lost.
4. Fix the four choices that carry a direction: typeface pairing, colour strategy, density, and shape language.

Output: `design/DIRECTION.md`. Gate: the user confirms the direction. No code before this.

### Stage 2: System

Lock the direction into a file so page five looks like page one.

Built-in guidance when no system skill is installed:
- Write tokens, not adjectives: a type scale, a spacing scale, colour roles (background, surface, text, muted, accent, danger), radii, shadows, breakpoints.
- Every value must trace to the direction. If a token cannot be justified by stage 1, remove it.
- Record what is forbidden as well as what is allowed (for example "no second accent colour").
- This library's `design-system-generate` skill can produce the first draft.

Output: one persisted file, `design-system/MASTER.md` by default, or the file the installed skill writes. Every later page reads this file first. Page-specific exceptions go in a separate override file and must state the reason.

### Stage 3: Motion

Add motion last among the build stages and only where it helps the user understand a change.

Built-in rules:
- Elements that enter use ease-out. They should arrive quickly and settle.
- Most interface motion stays under 300ms. Longer durations need a reason.
- Animate only where it helps: state changes, spatial relationships, feedback on an action. Decoration is not a reason.
- Anything the user triggers many times a day gets little or no animation.
- Prefer transform and opacity. Honour `prefers-reduced-motion`.

Output: a motion table in the system file listing element, trigger, duration, easing and reason. An empty "reason" cell means the animation is removed.

### Stage 4: Critique

Review the built page as a stranger would.

Built-in checklist:
- **Hierarchy**: can you name the first, second and third thing the eye lands on, and is that the right order?
- **Spacing**: does spacing group related things and separate unrelated ones, using only the scale from stage 2?
- **Typography**: line length, line height, weight contrast, and no more sizes than the scale allows
- **Too safe vs too loud**: place the page on that line. Too safe means it could belong to any product. Too loud means style is competing with the task. State which way to move and by how much.

This library's `design-critique` skill is the fallback reviewer. Output: a findings list ranked by impact, each with a fix. Apply the fixes before stage 5.

### Stage 5: Verification

A page is not done until it has been seen in a real browser.

1. Open the page at a mobile width (390 by 844) and a desktop width (1440 by 900).
2. Take a screenshot at each width and at each step of the main flow.
3. Look at the screenshots. Check overflow, wrapping, tap target size, contrast, and that the hierarchy from stage 4 survives at both widths.
4. Fix what is wrong, then take the screenshots again. Repeat until a pass finds nothing.

If no browser tool is available, say so plainly and ask the user to open the page and share screenshots. Never report a page as verified from reading the code.

Optional: run an interface guidelines audit as a final pass (see `playwright-cli-pointer`).

## Current AI Tells (checked 2026-09-28)

Use this list to spot a page that has drifted into the default. It is a smell test, not a rulebook.

- A purple-to-blue gradient on a white or near-black background
- One default sans-serif used for everything, at similar weights
- A centred hero with a small pill badge above the headline and two buttons below
- Three identical feature cards, each with an icon in a rounded square
- The same large corner radius and soft shadow on every surface
- Gradient-filled headline text
- Emoji standing in for icons
- Every section fading up on scroll
- Headlines that could sell any product ("Build faster. Ship smarter.")
- Glass blur panels and neon glow in dark mode

**This list goes stale.** Once a tell is widely known, models swap it for the next default, and avoiding ten patterns only produces an eleventh. So prefer choices that come from the brief over choices that merely avoid the list. The test that does not age: could this page belong to a different product if you swapped the logo? If yes, go back to stage 1.

## Output Format

### Design pipeline report: [page name]
1. **Stage log**: a table of stage, skill used or "built-in", output file, status
2. **Direction**: the chosen stance in three lines, with the two rejected options
3. **System file**: path, plus the tokens added or changed
4. **Motion table**: element, trigger, duration, easing, reason
5. **Critique findings**: ranked, each marked fixed or deferred with a reason
6. **Verification**: screenshot paths per width and per step, and what changed between passes
7. **Missing skills**: the install command for each, and the pointer skill to read

## Quality Checks
- [ ] Stages ran in order, one at a time, with no two design skills loaded together
- [ ] The direction was written and confirmed before any code
- [ ] A design system file exists on disk and the page uses only its tokens
- [ ] Every animation has a stated reason, and enter animations use ease-out
- [ ] Screenshots exist for both mobile and desktop widths, taken after the last fix
- [ ] The stage log names the skill or fallback used at each stage
- [ ] Every missing skill was reported with its install command

## Anti-Patterns
- **Loading all design skills at once.** Their instructions conflict and the output regresses to the average.
- **Running stages in parallel.** Motion designed before the system exists has nothing to be consistent with.
- **Designing by banned list.** Avoiding known tells is not a direction.
- **Keeping the system in the conversation.** If it is not in a file, the next page will drift.
- **Verifying by reading code.** Layout bugs live in the rendering.
- **Stopping because a skill is missing.** Fall back, finish the stage, then suggest the install.

## Example Trigger Phrases
- "Run the design pipeline on this landing page."
- "This dashboard looks AI-generated. Fix it properly."
- "Design the pricing page, and do not give me the usual purple gradient."
- "Take this screen through direction, system, motion, critique and verification."
- "Which design skills do I have installed, and what is missing for the pipeline?"

---

Part of the pm-design-taste bundle in the library at https://github.com/mohitagw15856/pm-claude-skills. The specialist skills are third-party projects; see `THIRD_PARTY.md` in the bundle for authors and licences.
