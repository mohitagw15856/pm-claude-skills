# Subagents

Claude Code **subagents** built from this library's skills — focused personas Claude can delegate to automatically based on their `description`.

| Agent | Use it for | Skills it leans on |
|---|---|---|
| `pm-partner` | PRDs, prioritisation, stakeholder updates, exec summaries | prd-template, rice-prioritisation, stakeholder-update, executive-summary |
| `sprint-master` | Sprint planning, retros, velocity, user stories | sprint-planning, retro-analysis, sprint-velocity-analysis, user-story-writer |
| `cs-guardian` | Account health, churn, renewals, escalations, QBRs | cs-health-scorecard, churn-analysis, renewal-playbook, qbr-deck |
| `launch-captain` | Positioning, GTM, launch checklists, competitor teardowns | product-positioning-doc, go-to-market, product-launch-checklist, competitor-teardown |
| `research-lead` | Interview guides, research synthesis, assumption tests | discovery-interview-guide, user-interview-synthesis, assumption-mapper, ux-research-plan |
| `data-analyst` | Metric definitions, experiment design, retention and cohort analysis | metrics-framework, ab-test-planner, cohort-analysis, cohort-curve-model |
| `product-director` | Work that spans the whole team: splits it, routes each part to one specialist, resolves conflicts and returns one answer | the six agents above |

## Install

```bash
./scripts/install.sh --agent claude       # installs skills + agents + commands into ~/.claude/
# or copy manually:
cp agents/*.md ~/.claude/agents/
```

Then in Claude Code, ask for the kind of work an agent covers and Claude will delegate to it — or invoke explicitly (e.g. "use the cs-guardian subagent"). Agents that ship a helper script will run it to compute results.

## Working as a team

`product-director` is the coordinator. It owns no artefact itself: it breaks a request into parts, gives each part to exactly one specialist, orders them by dependency (evidence, then definition, then delivery and launch) and consolidates the result. It escalates to you when a choice changes scope, date or cost, or when a specialist would otherwise have to invent an input. Ask for it by name ("use the product-director subagent") for work such as taking an idea to a shipped feature.
