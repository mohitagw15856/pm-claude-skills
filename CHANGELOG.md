# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project broadly follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html):
each new wave of skills bumps the **major** version, extensions and fixes bump
**minor** / **patch**.

## [Unreleased]

### Added
- **Multi-platform export generator.** `scripts/build-exports.mjs` renders every skill
  into platform-ready files under `exports/` from a single source of truth (the
  `SKILL.md` body), so content is never maintained twice. Ships **ChatGPT**
  (`exports/chatgpt/.../SYSTEM_PROMPT.md`) and **Google Gemini**
  (`exports/gemini/.../GEM_INSTRUCTIONS.md`) exports, plus a `PLATFORMS` registry that
  makes adding Cursor/etc. a few lines. Includes a `--check` mode and a
  `check-generated` CI workflow that fails if exports or `web/skills.json` drift.
- **Programmatic helpers (stdlib Python) for three flagship skills.** Each runs with
  zero dependencies and computes part of the work instead of estimating by hand:
  - `sprint-planning/scripts/capacity_calculator.py` — recommended sprint commitment
    from team size, availability, velocity, and carry-over (caps at 80% of velocity).
  - `rice-prioritisation/scripts/rice_calculator.py` — calculates and ranks RICE
    scores from JSON/CSV and auto-flags quick wins, moonshots, and low-confidence items.
  - `cs-health-scorecard/scripts/health_score.py` — weighted health total out of 100
    with RAG banding and weight validation.
- **`CHANGELOG.md`** — this file, back-filled from the release history.
- **`SKILL-AUTHORING-STANDARD.md`** — the canonical structure every SKILL.md follows
  (frontmatter, required sections, quality bar, anti-patterns).
- **Skill tiers** — a `TIERS.md` reference and README section marking skills as
  **Production-Ready**, **Stable**, or **Experimental** so new users start with the
  strongest work.
- **Cross-tool compatibility** — README now documents which platforms the skills work
  on (Claude Code natively; the SKILL.md bodies port to other agents and chat LLMs).
- **Skill Playground upgrades** — the hosted web app gains a **tier filter** and per-tile
  tier badges, plus a *"Use this skill in another tool"* panel that copies the
  instructions formatted for ChatGPT, Gemini, or raw. Tier data comes from a single
  machine-readable source, `skill-tiers.json`.

### Fixed
- **`web/skills.json` is now deterministic.** Removed the wall-clock `generatedAt` field
  (it was unused by the UI and made every rebuild differ), so the new `check-generated`
  CI step can reliably verify the index is in sync with the source skills.
- **Related Projects** — README section linking to other community Claude Skills
  libraries and the `awesome-claude-skills` / `awesome-claude-code` lists.

### Changed
- `SECURITY.md` supported-versions table updated to the current release line.

## [14.0.0] — Writers & Content Creators + 7 Community Skills

### Added
- New profession **Writers & Content Creators** (`pm-writers`): Instagram Post
  Downloader, AEO Optimizer, Thumbnail Creator, Substack Notes Scraper, Notes Humanizer.
- `pm-cross` (+3): Sycophancy Challenger, Last 30 Days Research, NotebookLM Connector.
- `pm-operations` (+2): Email Triage, Morning Intelligence.
- `pm-engineering` (+2): Context Mode, Claude Superpowers.

Library now spans **167 skills** across **18 professions** + 4 agent templates.

## [13.0.0] — Social Media Profession

### Added
- New bundle `pm-social`: Social Media Audit, Influencer Brief, Community Management
  Playbook, Social Ad Campaign, Viral Content Framework.

## [12.0.0] — 150 Skills Milestone

### Added
- 15 skills across 10 bundles, including Cohort Analysis, Data Pipeline Spec, Renewal
  Playbook, Customer Success Plan, 360-Degree Feedback Template, Team Health Check, Risk
  Register, RACI Matrix, Social Media Strategy, Product Positioning Doc, Customer Journey
  Map, User Story Writer, AI Ethics Review, Partnership Proposal, Design System Audit.

Library reached **150 skills** across **16 professions**.

## [11.0.0] — Engineering Expansion (500 ⭐)

### Added
- `pm-engineering` expanded to 35 skills — CI/CD, SLOs, capacity planning, DR plans,
  threat models, schema/migration design, and more.

## [10.0.0] — Customer Success + Engineering

### Added
- **Customer Success** bundle (`pm-cs`, 250 ⭐ milestone): Customer Health Scorecard,
  QBR Deck, Escalation Brief, Churn Analysis.
- **Engineering** (500 ⭐ milestone): CI/CD Playbook, SLO & Error Budget, Developer
  Onboarding Doc, On-Call Runbook — plus Debugging Log Analyser, PR Description Writer,
  System Design Interview, Changelog Generator, Test Strategy Doc, Runbook Writer.

Library reached **114 skills** across **16 professions**.

## [6.0.0] — 100 Skills Milestone

### Added
- Quality rebuild across all existing skills, plus 10 Figma skills.
- 7 new skills: Teaching Lesson Plan, SEO Content Brief, Media Pitch, Change Management
  Plan, Workshop Facilitation Guide, Sales Forecasting Model, Tax Planning Checklist.

---

Earlier releases (v1.0.0 – v5.0.0) predate this changelog. See the
[article series](README.md#-the-article-series) for the full history of how the
library grew from the first PM toolkit to 100+ skills.

[Unreleased]: https://github.com/mohitagw15856/pm-claude-skills/compare/v14.0.0...HEAD
[14.0.0]: https://github.com/mohitagw15856/pm-claude-skills/releases
