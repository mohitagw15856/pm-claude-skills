# Starter templates

The fastest way into the library is not an install command but a repository that already has the set chosen. [`starters/`](../starters/) holds one ready-to-clone project per persona: the team config (`.pm-skills.json`), a CI workflow that keeps every laptop on the same skills, agent instructions (`CLAUDE.md`), an ignore file and a README that explains the loadout.

| Starter | Loadout |
|---|---|
| `product-manager` | prd-template, rice-prioritisation, roadmap-narrative, metrics-framework, user-research-synthesis, executive-update |
| `founder-exec` | strategy-memo, decision-memo, board-pre-read, capital-allocation, investor-update, go-to-market |
| `engineering-lead` | technical-spec-template, architecture-decision-record, rfc-writer, code-review-checklist, incident-postmortem, runbook-writer |
| `ai-engineer` | ai-feature-prd, rag-design-doc, agent-spec, ai-eval-plan, llm-cost-latency-budget, model-card |
| `customer-success` | cs-health-scorecard, churn-analysis, cs-escalation-brief, renewal-playbook, qbr-deck, account-plan |
| `growth-marketing` | marketing-funnel-plan, growth-experiment-backlog, retention-loop-design, lifecycle-crm-plan, paid-acquisition-plan, messaging-framework |
| `compliance-lead` | soc2-readiness, gdpr-compliance, iso-27001-isms, vendor-security-review, data-retention-policy, security-threat-model |
| `designer` | figma-design-review, design-critique, design-system-generate, design-system-audit, accessibility-audit, design-handoff-brief |

Every starter also installs the `pm-essentials` bundle, and the ones with a persona subagent say so in their README.

## Use one

Copy the folder into a new repository (or, once published, press **Use this template** on `pm-skills-starter-<persona>`), then:

```bash
npx pm-claude-skills sync      # installs the set for Claude Code and Cursor
npx pm-claude-skills lock      # pins the exact contents; commit pm-skills.lock
```

The lockfile is deliberately not shipped in the starter: the team generates its own after the first sync, so the pins are theirs and never stale on day one. The workflow runs `sync --check` on every pull request and `lock --check` once the lock exists.

## Keep them current

The folders are generated from [`web/personas.json`](../web/personas.json) by `scripts/build-starters.mjs` (`--check` runs in `npm run check`), so a persona change regenerates its starter. Publishing them as GitHub template repositories is an owner step: `scripts/publish-starters.sh` creates or updates `pm-skills-starter-<persona>` for each folder and marks it as a template (needs `gh` with repo scope; `OWNER=` selects the account or organisation).
