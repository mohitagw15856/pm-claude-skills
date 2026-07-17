# 👤 Personas — curated role loadouts

> **A persona = a skill loadout + a workflow recipe + a subagent.** Pick the role closest to your job
> and you get the handful of skills to start with, the chained recipe for your most common end-to-end
> task, and (where one exists) a specialist subagent. It's the fastest way in — no scrolling 520 skills.

Personas drive the **"What do you do?"** chips in the [playground](https://mohitagw15856.github.io/pm-claude-skills/)
and are defined once in [`web/personas.json`](web/personas.json). Use a loadout three ways:

- **Playground:** pick your role on first visit → your starter skills are featured.
- **Recipe:** run the persona's [Workflow Recipe](WORKFLOWS.md) to chain its skills end-to-end (in the [Canvas](https://mohitagw15856.github.io/pm-claude-skills/canvas.html) or as a `/slash-command`).
- **Subagent:** where listed, the [agent template](agents/) is a specialist you can delegate to in Claude Code.

| Persona | Loadout | Recipe | Subagent |
|---|---|---|---|
| 📦 **Product Manager** | prd-template · rice-prioritisation · roadmap-narrative · metrics-framework · user-research-synthesis · executive-update | `/ship-a-feature` | [`pm-partner`](agents/pm-partner.md) |
| 🚀 **Founder / Exec** | strategy-memo · decision-memo · board-pre-read · capital-allocation · investor-update · go-to-market | `/grow-a-product` | [`launch-captain`](agents/launch-captain.md) |
| 🛠️ **Engineering Lead** | technical-spec-template · architecture-decision-record · rfc-writer · code-review-checklist · incident-postmortem · runbook-writer | `/ship-a-feature` | — |
| 🤖 **AI/ML Engineer** | ai-feature-prd · rag-design-doc · agent-spec · ai-eval-plan · llm-cost-latency-budget · model-card | `/launch-an-ai-feature` | — |
| 🤝 **Customer Success** | cs-health-scorecard · churn-analysis · cs-escalation-brief · renewal-playbook · qbr-deck · account-plan | `/rescue-an-account` | [`cs-guardian`](agents/cs-guardian.md) |
| 📈 **Growth / Marketing** | marketing-funnel-plan · growth-experiment-backlog · retention-loop-design · lifecycle-crm-plan · paid-acquisition-plan · messaging-framework | `/grow-a-product` | — |
| 🛡️ **Compliance / Security Lead** | soc2-readiness · gdpr-compliance · iso-27001-isms · vendor-security-review · data-retention-policy · security-threat-model | — | — |
| 🎨 **Designer** | figma-design-review · design-critique · customer-journey-map · design-system-audit · accessibility-audit · design-handoff-brief | — | — |

**Add or edit a persona:** edit [`web/personas.json`](web/personas.json) (name, emoji, loadout, recipe, subagent). The playground onboarding and this table both read from it.
