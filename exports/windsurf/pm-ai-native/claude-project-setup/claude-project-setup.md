---
trigger: model_decision
description: "Set up a repo or project so an AI coding agent works well in it — the CLAUDE.md, the context, the guardrails, and the conventions the agent needs to be useful instead of lost. Use when asked how do I set up CLAUDE.md, configure my repo for Claude Code, my AI agent keeps getting my project wrong, or onboard an AI agent to my codebase. Produces a structured CLAUDE.md/project-context file (architecture, conventions, commands, do-nots), the right level of detail (enough to orient, not a novel), the guardrails that keep the agent safe (what not to touch, how to test), and a maintenance habit so it stays current — turning a repo an agent flails in into one it navigates like a teammate."
---

# Claude Project Setup

An AI coding agent is only as good as the context it starts with — drop it into a repo with no orientation and it guesses at your architecture, conventions, and commands. A good CLAUDE.md (or equivalent project-context file) is the onboarding doc that turns flailing into fluency. This builds yours: the architecture and conventions the agent needs, the commands to run, the guardrails on what not to touch, and a habit to keep it current.

## What This Skill Produces

- **A structured CLAUDE.md** — the sections an agent actually needs: what the project is, architecture/layout, key conventions, the commands (build/test/lint/run), and the do-nots
- **The right altitude** — enough to orient the agent fast, not an exhaustive doc it drowns in; signal over completeness
- **Guardrails** — what the agent must not touch, how to run tests before claiming done, and where irreversible actions need a human
- **Convention capture** — the implicit rules a human learns over months (naming, patterns, where things go) made explicit
- **A commands block** — the exact commands to build, test, lint, and run, so the agent verifies its own work
- **A maintenance habit** — updating it as the project changes so it doesn't drift into wrong

## Required Inputs

Ask for these if not provided:
- **The project** — what it is, the stack, rough architecture
- **The conventions** — the patterns and rules you'd tell a new hire
- **The commands** — how to build, test, lint, run
- **The danger zones** — what an agent should never touch or must be careful with
- **Your agent** — Claude Code, Cursor, etc. (file name/location may differ)

## Framework: Orient, Constrain, Verify, Maintain

1. **Orient fast.** Lead with what the project is and its architecture at a glance — the agent needs the map before the details.
2. **Capture the implicit conventions.** The rules a human absorbs over months (where files go, naming, preferred patterns) are exactly what an agent can't infer — write them down.
3. **Give the commands.** Build/test/lint/run commands let the agent verify its own work instead of guessing — this single section prevents most bad output.
4. **Set guardrails.** What not to touch, always-run-tests-before-done, and where a human must approve — so autonomy doesn't become damage.
5. **Keep the altitude right.** Enough to be useful, short enough to be read — prune anything that doesn't change the agent's behavior.
6. **Maintain it.** Update as the project evolves; a stale context file is worse than none because it misleads.

## Output Format

### CLAUDE.md for [project]

**What this is:** [one-paragraph orientation + architecture at a glance].
**Layout:** [key directories/modules and what they do].
**Conventions:** [naming · patterns · where things go · style].
**Commands:** `build:` · `test:` · `lint:` · `run:`.
**Guardrails:** [do-not-touch · run tests before done · human-approval zones].
**Maintenance:** [update when X changes — keep it current].

## Quality Checks
- [ ] Orients the agent to purpose and architecture first
- [ ] Makes implicit conventions explicit
- [ ] Includes the exact build/test/lint/run commands
- [ ] Sets guardrails on danger zones and verification
- [ ] Keeps the doc at a readable altitude; sets a maintenance habit

## Anti-Patterns
- **A novel** the agent won't read, or a stub that orients nothing.
- **Omitting the commands**, so the agent can't verify its work.
- **Missing guardrails** on irreversible or dangerous actions.
- **Assuming the agent infers conventions** it has no way to know.
- **Writing it once** and letting it drift out of date.

## Example Trigger Phrases
- "How do I set up a CLAUDE.md for my repo?"
- "Configure my project so Claude Code works well in it."
- "My AI agent keeps misunderstanding my codebase — how do I fix that?"
- "What should go in my project's AI context file?"
- "Onboard an AI coding agent to my project properly."
