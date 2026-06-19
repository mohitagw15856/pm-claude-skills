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

## 🧩 Workflow recipes — chained commands

These run **several skills in sequence**, passing each output forward as context. Full detail in [WORKFLOWS.md](../WORKFLOWS.md).

| Command | Chains | Lifecycle |
|---|---|---|
| `/ship-a-feature` | ambiguity-resolver → prd-template → rice-prioritisation → roadmap-narrative → go-to-market | Discover → Ship |
| `/close-the-quarter` | metrics-framework → churn-analysis → executive-update → board-deck-narrative | Measure → Communicate |
| `/launch-a-product` | competitor-teardown → product-positioning-doc → go-to-market → product-launch-checklist → press-release | Decide → Ship |
| `/rescue-an-account` | cs-health-scorecard → churn-analysis → cs-escalation-brief → renewal-playbook | Measure → Communicate |
| `/run-discovery` | ambiguity-resolver → discovery-interview-guide → user-research-synthesis → rice-prioritisation | Discover → Decide |

## 🧠 Skill Memory

`/setup-context` builds a `pm-context.md` (company, audience, voice, metrics). Once it exists, run skills as usual — they read it as standing context, so output is tailored to you instead of generic. Template: [`templates/pm-context.example.md`](../templates/pm-context.example.md).

## Install

```bash
./scripts/install.sh --agent claude       # installs skills + agents + commands into ~/.claude/
# or copy manually:
cp commands/*.md ~/.claude/commands/
```

Then run, e.g. `/rice` followed by your initiatives. Commands whose skill ships a Python helper (RICE, sprint, health) will run it to compute results.
