---
aliases: ["Session Handoff"]
tags: [pm-skills, skill]
skill: session-handoff
description: "Write a handoff summary so another agent or person (or a fresh session) can pick up the work with full context. Use when ending a work session, hitting a context limit, switching agents, or pausing a task mid-flight. Produces a structured handoff: what the goal is, what's done, the current state, what's next, and the gotchas — so no context is lost across the boundary."
---

# Session Handoff Skill

Work gets dropped at boundaries — a context window fills, a session ends, a task passes to someone else — and
the next person (or agent) re-derives everything from scratch. This skill writes a tight **handoff** that
carries the state across that boundary: the goal, what's done, where things stand, the exact next step, and
the landmines. Optimised to be the first thing a fresh session reads.

## Required Inputs

Ask for these only if they aren't already provided (or infer from the session so far):

- **The objective** — what we're ultimately trying to achieve.
- **Progress** — what's been done and decided so far.
- **Current state** — what's in-flight right now, what's working/broken, where files/branches are.
- **Next step** — the single most important thing to do next.
- **Gotchas** — dead ends tried, constraints, things that will bite the next person.

## Output Format

### Handoff: [task]

**🎯 Objective** — the goal in 1–2 lines, and the definition of done.

**✅ Done so far** — key work completed and decisions made (with the *why* for non-obvious calls), as tight bullets.

**📍 Current state** — exactly where things stand: branch/PR, what runs, what's failing, files touched, any half-finished change.

**⏭️ Next step** — the very next action, concrete enough to start immediately. Then the following 2–3 steps.

**⚠️ Gotchas & dead ends** — what was tried and didn't work (so it isn't repeated), constraints, sharp edges, anything surprising.

**🔗 Pointers** — key files (`path:line`), commands to run, links (PR, issue, docs) the next person needs.

Keep it skimmable — the next reader should grasp the state in under a minute.

## Quality Checks

- [ ] Objective and definition-of-done are stated up front
- [ ] Current state is concrete (branch/PR, what runs, what's broken) — not "made progress"
- [ ] The next step is specific enough to act on immediately
- [ ] Dead ends and gotchas are captured so they aren't repeated
- [ ] Pointers (files, commands, links) are included; the whole thing is skimmable in ~a minute

## Anti-Patterns

- [ ] Do not write a vague status ("worked on the feature") — state exactly what's done and what's not
- [ ] Do not omit dead ends — repeating failed attempts is the most common handoff waste
- [ ] Do not bury the next step — it should be obvious and immediately actionable
- [ ] Do not assume shared memory — the reader may have zero prior context
- [ ] Do not pad it — a handoff nobody reads is worthless; keep it tight and scannable

## Based On

Engineering handoff / pairing-rotation practice and incident-handoff (SBAR-style) structure adapted for agent and human work.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
