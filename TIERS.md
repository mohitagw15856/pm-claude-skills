# Skill Tiers

Not every skill in a 170+ library is at the same level of maturity — and pretending
otherwise wastes your time. This page tiers the skills honestly so you can start with the
strongest work and know what to expect from the rest.

| Tier | What it means |
|---|---|
| 🟢 **Production-Ready** | Battle-tested, stable output format, used in real work. Includes the skills with computed helper scripts. Start here. |
| 🔵 **Stable** | Solid and well-structured. Reliable output; smaller track record than Production-Ready. This is the default tier for most of the library. |
| 🟡 **Experimental** | Newer, niche, or dependent on an external tool/API/scrape (Gemini, Gmail, browser automation, social scraping). Useful, but more setup and more moving parts — expect rough edges. |

> ⚙️ = ships a stdlib-only Python helper script that computes part of the work.

---

## 🟢 Production-Ready (46)

These are the skills to reach for first — the most-used, most-refined frameworks in the
library.

**Product core**
`prd-template` · `meeting-notes` · `stakeholder-update` · `user-research-synthesis` · `competitive-analysis`

**Prioritisation & planning**
`rice-prioritisation` ⚙️ · `feature-prioritisation` · `okr-builder` · `roadmap-narrative` · `rice-impact-matrix`

**Delivery**
`sprint-planning` ⚙️ · `sprint-brief` · `user-story-writer` · `retro-analysis` · `ab-test-planner` · `product-launch-checklist` · `technical-spec-template`

**Discovery**
`customer-journey-map` · `assumption-mapper` · `user-interview-synthesis` · `discovery-interview-guide` · `job-story-mapper`

**Data & analytics**
`data-analysis-standard` · `retention-analysis` · `cohort-analysis` · `metrics-framework` · `product-health-analysis`

**Customer success**
`cs-health-scorecard` ⚙️ · `churn-analysis` · `qbr-deck` · `renewal-playbook` · `customer-success-plan` · `cs-escalation-brief`

**Engineering**
`code-review-checklist` · `incident-postmortem` · `architecture-decision-record` · `api-docs-writer` · `runbook-writer` · `changelog-generator` · `pr-description-writer` · `technical-debt-register`

**GTM & strategy**
`go-to-market` · `competitor-teardown` · `product-positioning-doc`

**Cross-profession**
`executive-summary` · `press-release`

---

## 🟡 Experimental

These depend on external services, scraping, or browser/desktop automation. They can be
genuinely useful, but they have more setup and more failure modes than a self-contained
markdown skill — treat output as a strong draft, and expect to adapt them to your
environment.

| Skill | Why it's experimental |
|---|---|
| `instagram-post-downloader` | Depends on Instagram's page structure; can break when the site changes. |
| `substack-notes-scraper` | Scrapes Substack engagement data; fragile to layout changes. |
| `thumbnail-creator` | Requires a Gemini API key and image generation. |
| `notebooklm-connector` | Drives NotebookLM via a Chrome extension / browser automation. |
| `email-triage` | Requires Gmail access and a configured time window. |
| `morning-intelligence` | Designed for scheduled-task / routine setups; depends on your news sources. |
| `last-30-days-research` | Relies on live Reddit / X / web search availability and quality. |
| `competitor-signal-tracker` | Depends on the live sources you point it at. |
| `multi-source-signal-synthesiser` | Quality depends on the breadth/quality of sources supplied. |

---

## 🔵 Stable (everything else)

Every skill not listed above is **Stable**: well-structured, reliable output, broadly
useful — just with a shorter track record than the Production-Ready set. Browse the full
list in the [README](README.md#️-all-167-skills).

---

*Tiers are reviewed as skills mature. New skills enter as Experimental and are promoted
once they have a stable output format and real-world use — see
[SKILL-AUTHORING-STANDARD.md](SKILL-AUTHORING-STANDARD.md#7-tiering). Think a skill is
mis-tiered? [Open an issue](../../issues).*

> **For tooling:** the machine-readable tier membership lives in
> [`skill-tiers.json`](skill-tiers.json) (the Skill Playground reads it to badge and
> filter skills). Keep this page and that file in sync when re-tiering.
