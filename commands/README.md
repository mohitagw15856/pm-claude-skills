# Slash Commands

Claude Code **slash commands** that run a skill on whatever you pass them.

| Command | Does | Skill |
|---|---|---|
| `/prd` | Draft a PRD from an idea | prd-template |
| `/rice` | Score & rank initiatives (RICE) | rice-prioritisation |
| `/sprint-plan` | Plan a sprint with a calibrated commitment | sprint-planning |
| `/health-scorecard` | Weighted customer health scorecard | cs-health-scorecard |
| `/retro` | Structured sprint retrospective | retro-analysis |
| `/exec-summary` | Crisp executive summary | executive-summary |

## Install

```bash
./scripts/install.sh --agent claude       # installs skills + agents + commands into ~/.claude/
# or copy manually:
cp commands/*.md ~/.claude/commands/
```

Then run, e.g. `/rice` followed by your initiatives. Commands whose skill ships a Python helper (RICE, sprint, health) will run it to compute results.
