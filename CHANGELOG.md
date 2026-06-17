# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project broadly follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html):
each new wave of skills bumps the **major** version, extensions and fixes bump
**minor** / **patch**.

## [Unreleased]

### Added
- **MCP server** — `mcp/server.mjs`, a zero-dependency Model Context Protocol server
  (stdio) exposing `list_skills`, `search_skills`, and `get_skill` so MCP clients (Claude
  Desktop, Cline, …) pull skills on demand. Published as a second bin,
  `npx pm-claude-skills-mcp`.
- **Windsurf & Aider targets** — two more export platforms (`exports/windsurf/*.md`
  workspace rules, `exports/aider/*.md` conventions) and install support in `install.sh`,
  the `npx` CLI, and one-line `windsurf-install.sh` / `aider-install.sh`. The library now
  exports to **5 platforms** (ChatGPT, Gemini, Cursor, Windsurf, Aider).
- **Hero demo placement** — README "See it in action" block linking to the live Playground,
  ready to swap a `playground-demo.gif` in (recording guide in `web/docs-assets/README.md`).
- **Automated npm publishing** — `.github/workflows/npm-publish.yml` publishes the package
  to npm (with provenance) when a GitHub Release is published. Requires a one-time
  `NPM_TOKEN` repo secret; no local npm needed.

## [17.0.0] — Agents, Commands & the npx CLI — 2026-06-17

### Added
- **`npx pm-claude-skills` CLI** — a cross-platform Node installer (`bin/cli.mjs`, no bash,
  no git, works on Windows) that installs skills into any agent:
  `npx pm-claude-skills add --agent <claude|hermes|codex|openclaw|cursor>` with
  `--link` / `--target` / `--dry-run`. For `claude` it installs skills + subagents +
  commands. `package.json` is now a publishable package (`bin`, `files`, keywords).
- **Subagents & slash commands** — the library now ships content beyond skills:
  4 Claude Code subagents in [`agents/`](agents/) (`pm-partner`, `sprint-master`,
  `cs-guardian`, `launch-captain`) and 6 slash commands in [`commands/`](commands/)
  (`/prd`, `/rice`, `/sprint-plan`, `/health-scorecard`, `/retro`, `/exec-summary`).
  `install.sh --agent claude` now installs skills **+** agents **+** commands.
- **Skill scaffolding generator** — `scripts/new-skill.mjs` (`npm run new-skill`) creates a
  `SKILL.md` that already passes SkillCheck, lowering the barrier to contributing.
- **`package.json`** — `npm run` entry points (`new-skill`, `skillcheck`, `build:exports`,
  `build:web`, `check`) so the repo reads as a real project.
- **README discoverability pass** — keyword-rich H1 (Agent Skills for Claude, ChatGPT,
  Gemini, Cursor, Codex & Hermes), subagent/command count badges, and a Star History chart.
- **SkillCheck validator** — `scripts/skillcheck.mjs` validates every `SKILL.md` against
  the authoring standard (frontmatter, name/folder match, trigger + produces clauses,
  required headings, tier referential integrity). Errors fail CI; `--strict` also fails on
  warnings. New `skillcheck.yml` workflow and a SkillCheck badge in the README.
- **Cursor export platform** — `build-exports.mjs` now also generates
  `exports/cursor/<bundle>/<skill>/<skill>.mdc` rule files (the registry now supports
  per-skill filenames).
- **Per-agent installers** — `scripts/install.sh` (a unified installer for
  claude · hermes · codex · openclaw · cursor, with `--link` / `--target` / `--dry-run`),
  plus curl-able one-liners `scripts/codex-install.sh`, `scripts/openclaw-install.sh`, and
  `scripts/cursor-install.sh` that clone the library and install in one command.

## [16.0.0] — Multi-Platform — 2026-06-17

The library stops being Claude-only and becomes a portable, single-source-of-truth project.

### Added
- **Hermes Agent support (native).** `scripts/sync-hermes-skills.py` installs the
  canonical `skills/` into `~/.hermes/skills/` (copy or `--link` symlink). Hermes reads
  the same open `SKILL.md` standard, so there is no format conversion — it auto-discovers
  skills by their `description`, exactly like Claude Code.
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
  on (Claude Code and Hermes natively; the SKILL.md bodies port to other agents and chat LLMs).
- **Skill Playground upgrades** — the hosted web app gains a **tier filter** and per-tile
  tier badges, plus a *"Use this skill in another tool"* panel that copies the
  instructions formatted for ChatGPT, Gemini, or raw. Tier data comes from a single
  machine-readable source, `skill-tiers.json`.
- **Related Projects** — README section linking to other community Claude Skills
  libraries and the `awesome-claude-skills` / `awesome-claude-code` lists.

### Changed
- **Multi-platform rebrand.** README title, tagline, intro, and badges now position the
  library for Claude, ChatGPT, Gemini, and Hermes — not Claude alone. (The repository
  name, marketplace ID, and install commands are unchanged.)
- `SECURITY.md` supported-versions table updated to the v16 release line.

### Fixed
- **`web/skills.json` is now deterministic.** Removed the wall-clock `generatedAt` field
  (it was unused by the UI and made every rebuild differ), so the new `check-generated`
  CI step can reliably verify the index is in sync with the source skills.

## [15.0.0] — Skill Playground — 2026-06-09

### Added
- **Skill Playground** — a zero-backend browser app (`web/`) to run any skill with your own
  Claude API key. Tile gallery with search + bundle filter, click-to-run forms generated from
  each skill's `Required Inputs`, live streaming output with copy / download-as-`.md`, and a
  model picker. `web/build-skills.mjs` generates `skills.json`; a GitHub Actions workflow
  auto-deploys to GitHub Pages on every push to `main`.

### Fixed
- Mid-stream API errors now surface to the user instead of being silently swallowed.
- `max_tokens` raised to 8192 to avoid truncating long outputs.

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

[Unreleased]: https://github.com/mohitagw15856/pm-claude-skills/compare/v17.0.0...HEAD
[17.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v16.0.0...v17.0.0
[16.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v15.0.0...v16.0.0
[15.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v14.0.0...v15.0.0
[14.0.0]: https://github.com/mohitagw15856/pm-claude-skills/releases
