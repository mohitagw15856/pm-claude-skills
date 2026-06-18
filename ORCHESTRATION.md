# Orchestration — Combining Skills, Subagents & Commands

A single skill answers one question well. Real work is a sequence of them. This guide
shows four patterns for chaining the library's [skills](skills/), [subagents](agents/), and
[slash commands](commands/) into end-to-end workflows.

> These are usage patterns, not new software — they work today in Claude Code (and any
> tool that has the skills installed). Install everything first:
> `npx pm-claude-skills add --agent claude`.

---

## 1. Skill Chain (sequential)

Run skills in order, feeding each output into the next. Best for a known process.

**Example — "new feature, from idea to sprint":**

```
/rice          → rank the candidate features
/prd           → write the PRD for the top one
/sprint-plan   → break it into a calibrated sprint
```

Each step's output becomes the next step's input. The helper scripts (RICE, capacity)
compute the numbers so the chain stays grounded in data, not vibes.

## 2. Multi-Agent Handoff

Delegate phases to focused [subagents](agents/); each owns its domain and hands off.

**Example — "launch a feature":**

```
pm-partner      → frames the problem, writes the PRD
sprint-master   → plans delivery, tracks the sprint
launch-captain  → positioning, GTM plan, launch checklist
cs-guardian     → post-launch account health & churn watch
```

In Claude Code, just describe the work and Claude delegates by each subagent's
`description`; or name one explicitly ("use the launch-captain subagent").

## 3. Domain Deep-Dive

Pick one bundle and run its skills together for a thorough, single-domain pass.

**Example — Customer Success review of an account:**

```
cs-health-scorecard  → score the account (weighted /100 + RAG)
churn-analysis       → diagnose risk drivers
renewal-playbook     → build the renewal plan
qbr-deck             → package it for the QBR
```

Use the `cs-guardian` subagent to run the whole sequence with shared context.

## 4. Solo Sprint (one assistant, many skills)

No subagents — a single session pulls in whichever skills the task needs, on demand.
This is the natural mode for the [MCP server](mcp/): the assistant calls `search_skills`,
then `get_skill`, and applies the result.

**Example:** *"Search the skills for anything about pricing, then apply the best one to
this offering."* → `search_skills("pricing")` → `get_skill("pricing-strategy")` → output.

---

## Picking a pattern

| You have… | Use |
|---|---|
| A known, repeatable process | **Skill Chain** |
| Distinct phases with different expertise | **Multi-Agent Handoff** |
| One domain to cover thoroughly | **Domain Deep-Dive** |
| An open-ended ask, tools installed via MCP | **Solo Sprint** |

## Tips

- **Carry context forward.** Paste or reference the previous step's output so each skill
  builds on the last instead of starting cold.
- **Compute, don't guess.** When a skill ships a helper script (RICE, sprint capacity,
  customer health), run it — chained estimates drift fast.
- **Audit anything you didn't write.** Before chaining a skill from elsewhere, run it
  through `skill-security-auditor` (or `node scripts/skill-audit.mjs`).
