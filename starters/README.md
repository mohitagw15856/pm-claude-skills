# Starter templates

One ready-to-clone project per persona: the team config (`.pm-skills.json`), a CI check that keeps every laptop on the same skills, agent instructions (`CLAUDE.md`) and a README that explains the loadout. Generated from [`web/personas.json`](../web/personas.json) by `scripts/build-starters.mjs`; do not edit by hand.

| Starter | For | Loadout |
|---|---|---|
| [`product-manager`](product-manager/) | You own a product area — discovery to launch. | 6 skills + pm-essentials |
| [`founder-exec`](founder-exec/) | You set direction and answer to a board. | 6 skills + pm-essentials |
| [`engineering-lead`](engineering-lead/) | You own architecture, delivery, and on-call. | 6 skills + pm-essentials |
| [`ai-engineer`](ai-engineer/) | You're shipping an AI/LLM feature responsibly. | 6 skills + pm-essentials |
| [`customer-success`](customer-success/) | You own retention, renewals, and escalations. | 6 skills + pm-essentials |
| [`growth-marketing`](growth-marketing/) | You own acquisition, activation, and retention loops. | 6 skills + pm-essentials |
| [`compliance-lead`](compliance-lead/) | You own trust, audits, and regulated data. | 6 skills + pm-essentials |
| [`designer`](designer/) | You own the experience, from flows to handoff. | 6 skills + pm-essentials |

**Use one:** copy the folder into a new repository, or, once published, click "Use this template" on `pm-skills-starter-product-manager` and friends. Then `npx pm-claude-skills sync`.

**Publish them as GitHub template repositories (owner step, needs `gh`):** `scripts/publish-starters.sh` creates or updates one `pm-skills-starter-<persona>` repository per folder and marks it as a template.
