# Example: pm-design-taste

## What this bundle does

Runs a five-stage UI design pipeline (direction, system, motion, critique, verification) so the result does not look like generic AI output, and points you to the five specialist skills that do each stage best.

Install:

```
/plugin install pm-design-taste@pm-claude-skills
```

## How to trigger it

### Example 1: the full pipeline, nothing installed

**You say:**
> "Design a pricing page for a bookkeeping tool aimed at UK sole traders. Run the design pipeline. No purple gradients."

**Claude produces:**

```
Design pipeline report: pricing page

Stage log
| Stage           | Skill used | Output file               | Status    |
| 1. Direction    | built-in   | design/DIRECTION.md       | confirmed |
| 2. System       | built-in   | design-system/MASTER.md   | written   |
| 3. Motion       | built-in   | design-system/MASTER.md   | written   |
| 4. Critique     | built-in   | design/CRITIQUE.md        | 5 fixed   |
| 5. Verification | none found | (waiting for screenshots) | blocked   |

Direction
Chosen: "ledger-like and exact". Tabular figures, ruled rows, one ink
colour plus a single receipt-red for the price that matters.
Rejected: "friendly high street" (too close to every neobank),
"quiet luxury" (wrong for a nine pound a month tool).

Missing skills
- playwright-cli: npm install -g @playwright/cli@latest
  then playwright-cli install --skills
  I cannot call this page verified until it has been opened in a browser.
```

---

### Example 2: detection only

**You say:**
> "Which design skills do I have installed, and what is missing for the pipeline?"

**Claude produces:**

```
frontend-design:  .claude/skills/frontend-design   (stage 1 ready)
ui-ux-pro-max:    missing                          (stage 2 uses built-in guidance)
emil-design-eng:  ~/.claude/skills/emil-design-eng (stage 3 ready)
impeccable:       missing                          (stage 4 uses built-in guidance)
playwright-cli:   binary present, skill present    (stage 5 ready)

To fill the gaps:
  /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
  /plugin install ui-ux-pro-max@ui-ux-pro-max-skill     (needs Python 3)
  npx impeccable install, then /impeccable init

I will load one of these at a time, at its own stage.
```

---

### Example 3: a pointer skill

**You say:**
> "I ran npx impeccable install. What do I run next, and when should I use it?"

**Claude produces:**

```
Pointer: impeccable
Fit:     Yes, once the page is built. It is the critique stage (4 of 5).
Install: done. Next, inside your coding tool, run once per project:
         /impeccable init
Check:   /impeccable critique on any page should respond.
Next:    stage 5, verification in a real browser.
Credit:  Impeccable by Paul Bakaus, Apache 2.0
         https://github.com/pbakaus/impeccable
```

---

### Example 4: verification on its own

**You say:**
> "Check the signup page in a real browser at mobile and desktop widths and screenshot each step."

**Claude produces:**

```
Pass 1
  signup-mobile-step1-pass1.png    headline wraps to four lines, button below the fold
  signup-mobile-step2-pass1.png    ok
  signup-desktop-step1-pass1.png   form column 920px wide, line length too long
Fixes applied: headline size at 390px, form max width 480px
Pass 2
  all six screenshots retaken, no findings
```

## More trigger prompts

| Skill | Try saying |
|---|---|
| `ui-design-pipeline` | "Take this screen through direction, system, motion, critique and verification." |
| `ui-design-pipeline` | "This dashboard looks AI-generated. Fix it properly." |
| `frontend-design-pointer` | "Which skill should set the visual direction for this page?" |
| `ui-ux-pro-max-pointer` | "Which skill can generate a design system and save it to a file?" |
| `emil-design-eng-pointer` | "My transitions feel sluggish. Which skill fixes that?" |
| `impeccable-pointer` | "Which skill can critique this page for hierarchy and polish?" |
| `playwright-cli-pointer` | "How do I install playwright-cli with its skill?" |

## Tips for best results

- Give the audience and the purpose in the first message. The direction stage depends on both.
- Confirm the direction before asking for code. Changing it at stage 4 means starting again.
- Install the specialist skills you want, but let the pipeline load them one at a time. Loaded together they give conflicting instructions.
- Treat the "current AI tells" list as a smell test. It dates quickly. Choices that come from your brief age better than choices that avoid a list.
- Keep the design system file in the repository so the next page reads it.

## Related skills

- `frontend-design`: this library's own skill for building one UI on an explicit token system, without the staged pipeline
- `design-critique`: a written critique of an existing design, no install needed
- `design-system-generate`: a first draft of a design system when no system skill is installed
- `accessibility-audit`: a WCAG 2.2 audit to run alongside the verification stage

## Credits

The specialist skills belong to their authors: Anthropic, nextlevelbuilder, Emil Kowalski, Paul Bakaus, Microsoft and Vercel. See `plugins/pm-design-taste/THIRD_PARTY.md` for licences and links. Library: https://github.com/mohitagw15856/pm-claude-skills
