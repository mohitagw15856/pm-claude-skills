# Subagents

Claude Code **subagents** built from this library's skills — focused personas Claude can delegate to automatically based on their `description`.

| Agent | Use it for | Skills it leans on |
|---|---|---|
| `pm-partner` | PRDs, prioritisation, stakeholder updates, exec summaries | prd-template, rice-prioritisation, stakeholder-update, executive-summary |
| `sprint-master` | Sprint planning, retros, velocity, user stories | sprint-planning, retro-analysis, sprint-velocity-analysis, user-story-writer |
| `cs-guardian` | Account health, churn, renewals, escalations, QBRs | cs-health-scorecard, churn-analysis, renewal-playbook, qbr-deck |
| `launch-captain` | Positioning, GTM, launch checklists, competitor teardowns | product-positioning-doc, go-to-market, product-launch-checklist, competitor-teardown |

## Install

```bash
./scripts/install.sh --agent claude       # installs skills + agents + commands into ~/.claude/
# or copy manually:
cp agents/*.md ~/.claude/agents/
```

Then in Claude Code, ask for the kind of work an agent covers and Claude will delegate to it — or invoke explicitly (e.g. "use the cs-guardian subagent"). Agents that ship a helper script will run it to compute results.
