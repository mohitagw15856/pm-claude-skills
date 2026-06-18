# Output Styles (Personas)

Claude Code **output styles** that change the assistant's overall voice and default skill
loadout. Switch with `/output-style` in Claude Code, or install them with the skills.

| Persona | Voice | Leans on |
|---|---|---|
| `Startup CTO` | Decisive, cost-aware, ships | architecture, specs, tech debt |
| `Growth Marketer` | Funnel & experiment driven | positioning, GTM, content, A/B tests |
| `Solo Founder` | Ruthless prioritisation, leverage | prioritisation, positioning, ops |
| `Product Leader` | Outcome-oriented, crisp comms | PRDs, OKRs, roadmap, stakeholder comms |

## Install

```bash
./scripts/install.sh --agent claude     # installs skills + agents + commands + output-styles
# or copy manually:
cp output-styles/*.md ~/.claude/output-styles/
```

Then run `/output-style` in Claude Code and pick one.
