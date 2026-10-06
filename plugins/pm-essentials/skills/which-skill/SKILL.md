---
name: which-skill
description: "Route a fuzzy request to the right skill in this library. Use when the user is unsure which skill fits, asks 'which skill should I use for X', describes a task without naming a skill, or when a request could plausibly match several skills. Produces a best-fit recommendation with the inputs to gather, a runner-up with the tie-breaker, and a workflow recipe when the job spans multiple skills."
---

# Which Skill Router

Given a fuzzy professional ask ("my boss wants an update on the Q3 launch"), pick the single best skill in this library to run — and say why — instead of making the user browse 400+ options.

## What This Skill Produces

- The **best-fit skill** for the request, with a one-line justification
- The **inputs to gather** before running it (from that skill's Required Inputs)
- A **runner-up skill** and the tie-breaker that separates them
- A **workflow recipe** recommendation instead, when the job genuinely spans 3+ skills

## Required Inputs

Ask for (if not already provided):
- **The task in the user's own words** (even one sentence is enough)
- **Who the output is for** (audience changes the pick: a board deck is not a team update)
- **One-off or recurring?** (a monitor/briefing skill differs from a one-time analysis)

## Routing Method

1. **Name the artifact.** What lands on someone's desk when this is done — a PRD, a ranked list, a briefing, a plan? Route on the deliverable, not on topic keywords.
2. **Search the catalog — never route from memory.** Read `SKILLS.md` (the auto-generated listing grouped by domain), or search with `npx pm-claude-skills list` / the MCP `search_skills` tool. Match the user's phrasing against skill `description` trigger phrases.
3. **Prefer the specific skill over the general one.** A skill built for the exact artifact (e.g. `ab-test-readout` for analysing a finished test) beats a broader neighbour (`experiment-designer`).
4. **Check the disambiguation table below** for the known look-alike clusters before answering.
5. **Escalate to a workflow recipe** (see `WORKFLOWS.md`, e.g. `/ship-a-feature`, `/launch-a-product`) when the ask needs 3+ chained skills — don't recommend the skills one by one.
6. **Recommend, don't interrogate.** Ask at most one clarifying question, and only when the answer would change the pick.

## Disambiguation Table — look-alike clusters

| You want… | Use | Not |
|---|---|---|
| A one-off deep teardown of a rival (SWOT, positioning map) | `competitor-teardown` | `competitive-analysis` |
| A full landscape doc: feature matrix, win/loss, battlecard inputs | `competitive-analysis` | `competitor-teardown` |
| A recurring "what changed in the market this week/month" briefing | `competitive-intelligence-monitor` | `competitor-signal-tracker` |
| A read on one specific competitor announcement | `competitor-signal-tracker` | `competitive-intelligence-monitor` |
| Release notes straight from a raw git log / commit list | `changelog-generator` | `changelog-writer` |
| A Keep-a-Changelog entry from an already-curated change list | `changelog-writer` | `changelog-generator` |
| Positioning, messaging pillars, use cases — the GTM *content* | `go-to-market` | `go-to-market-planner` |
| A tiered launch plan with cross-functional coordination — the GTM *operation* | `go-to-market-planner` | `go-to-market` |
| Themes from interview transcripts specifically | `user-interview-synthesis` | `user-research-synthesis` |
| Synthesis across mixed sources (surveys, feedback, transcripts) | `user-research-synthesis` | `user-interview-synthesis` |
| Pure RICE scoring of a backlog | `rice-prioritisation` | `feature-prioritisation` |
| Choosing/applying a framework (RICE, MoSCoW, Kano, ICE) | `feature-prioritisation` | `rice-prioritisation` |
| RICE blended with strategic-fit weighting | `rice-impact-matrix` | `rice-prioritisation` |
| A summary *of an existing document* for executives | `executive-summary` | `executive-update` |
| A standalone product briefing *written for* the C-suite | `executive-update` | `executive-summary` |
| A BLUF-style project status update for stakeholders | `stakeholder-update` | `executive-update` |
| Designing an experiment before it runs (sample size, guardrails) | `ab-test-planner` | `ab-test-readout` |
| Analysing a finished test and making the ship/no-ship call | `ab-test-readout` | `ab-test-planner` |

## Output Format

### Skill Recommendation

**Best fit:** `skill-name` — [one line: why this artifact matches the ask]

**Before you run it, have ready:**
- [input 1 from that skill's Required Inputs]
- [input 2]

**Runner-up:** `other-skill` — pick this instead if [the tie-breaker condition].

**Run it:** `/skill-name` in Claude Code, or open it in the [Playground](https://mohitagw15856.github.io/pm-claude-skills/).

*(If a workflow fits better)* **This is a multi-skill job** — run `/recipe-name` (chains `a` → `b` → `c`), because [why the chain beats a single skill].

## Quality Checks

- [ ] The pick was verified against the live catalog (SKILLS.md / search), not recalled from memory
- [ ] Every look-alike cluster the ask touches was checked against the disambiguation table
- [ ] The recommendation names the concrete artifact the user will get, not a topic
- [ ] The runner-up includes a real tie-breaker condition, not "also good"
- [ ] Multi-skill jobs point to one workflow recipe, not a list of 4 skills to run manually

## Anti-Patterns

- [ ] Do not recommend more than two skills — a router that returns a list has not routed
- [ ] Do not route on topic keywords ("competitor" ≠ always `competitive-analysis`); route on the deliverable
- [ ] Do not ask a chain of clarifying questions — one at most, and only if it changes the pick
- [ ] Do not invent skill names — if nothing in the catalog fits, say so and suggest `SKILL_REQUEST.md`
- [ ] Do not recommend a general skill when a specific one exists for the exact artifact

## Example Trigger Phrases

- "Which skill should I use for this?"
- "I don't know which skill fits."
- "Find the right skill for my task."
- "Which of these skills is the better match?"
