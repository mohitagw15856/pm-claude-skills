# "Build your own skill in 2 minutes" flow (#20)

Every skill a user creates is a new distribution node and a reason to star. You have `skill-creator` and `SKILL-AUTHORING-STANDARD.md` — this lowers the bar from "read the standard" to "answer a few prompts."

## The flow (guided, not blank-page)
1. **"What repetitive task do you wish your AI did well?"** — free text.
2. The `skill-creator` skill drafts a spec-compliant `SKILL.md` (name, trigger-first description, framework, output, quality checks, anti-patterns).
3. **Preview + tweak** — the user edits inline.
4. **One-click paths:**
   - Use it locally now (copy to their tool).
   - **Submit it** to the public library (the `submit-skill.yml` issue/PR template).
   - Keep it private (fork / Team tier).

## Where it lives
- **Now (zero build):** document the flow — "make your own skill" → run `skill-creator`, then `submit-skill`. A README/`CONTRIBUTING` callout.
- **Better:** a Playground mode ("Create a skill") that runs `skill-creator` in-browser and outputs a downloadable `SKILL.md` + a pre-filled submit link.

## Why it converts downloads → community + stars
- A user who *builds* something feels ownership → stars, shares, returns.
- Each shared skill is new SEO/discovery surface.
- It scales supply without you writing every skill.

## Guardrails
- Run submissions through `skillcheck` + `skill-audit` (already gate the repo) so quality/security stay high.
- The `skill-vetting` skill covers auditing community skills before install.

## First step
Add a "🛠️ Make your own skill" section to the README pointing at `skill-creator` + `submit-skill`, so the 55.5k know they *can* — most don't realize creating is this easy.
