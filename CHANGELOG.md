# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project broadly follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html):
each new wave of skills bumps the **major** version, extensions and fixes bump
**minor** / **patch**.

## [Unreleased]

### Added
- **"Evaluate selected bundles" Action** ([`.github/workflows/eval-bundles.yml`](.github/workflows/eval-bundles.yml)) — pick which bundles to score and add to the leaderboard. A free `list` mode reports eval coverage per bundle (✅ complete / 🟡 partial / ⬜ unevaluated) in the job summary; `evaluate` mode scores the bundles you name (or every unevaluated one), keeps all existing scores, and opens a PR with the refreshed `evals/results.json`. Backed by a new [`scripts/eval-status.mjs`](scripts/eval-status.mjs) (CLI: `node scripts/eval-status.mjs`) and new `--bundles` / `--skills` / `--unevaluated` filters on the eval harness.

### Fixed
- **Header navigation on generated pages** — the Tools/Explore dropdowns broke on `catalog.html`, `leaderboard.html`, and `community.html` because those pages ship inline CSS and don't link `styles.css`, so the dropdown/CTA rules never loaded. [`web/nav.js`](web/nav.js) now injects its own styles, keeping it the single source of truth so the bar works on every page.
- **Guide skill count** — [`web/guide.html`](web/guide.html) now reads **288 skills across 23 professions** (was 244 / 21).
- **`resume` skill scored low (1.75/5)** — it told the model to *ask* for inputs, so on a brief it stalled instead of producing a resume. Added a **"Working from a brief"** rule (always deliver a complete resume; infer missing details and label them *(assumed — confirm)*; never silently inflate metrics) and a **curated eval case** so it's scored on a concrete brief like other top skills.

## [29.0.0] — Multilingual + a polished experience — 2026-06-23

### Added
- **Multilingual output** — run any of the 207 skills in **10 languages** (Spanish, Mandarin, Hindi, Arabic, Portuguese, French, German, Japanese, Russian, Indonesian; English default) via a language selector in the playground. The frameworks are language-agnostic, so the model localizes the whole output; the choice persists, and **RTL scripts (Arabic) render right-to-left**. Applied to the plain side of Compare too.
- **The Practical Guide** — a 15-page, example-driven manual ([`web/guide.html`](web/guide.html) → [`PM-Skills-Guide.pdf`](web/docs-assets/PM-Skills-Guide.pdf)): install, anatomy of a skill, three worked examples (PRD, exec update, RICE), chaining recipes, the Brain, running anywhere, and tips.
- **One-page cheatsheet** — [`CHEATSHEET.md`](CHEATSHEET.md) + a printable poster ([PNG](web/docs-assets/cheatsheet.png) / [PDF](web/docs-assets/cheatsheet.pdf)); both PDF covers carry the Product Notes logo.
- **Proof of ROI** — [`CASE_STUDIES.md`](CASE_STUDIES.md) (before→after time-saved template) + a "Share an ROI story" issue form.
- **Opt-in usage feedback** — a 👍/👎 bar after each playground run (anonymous event + a prefilled GitHub issue for "what I'd change"; never inputs/outputs/keys).

### Changed
- **Navigation & playground UX revamp** — an always-visible **GitHub repo link** in the toolbar (there was no way back to the repo), a **sticky** toolbar, the **Product Notes logo now links home**, plus a redesigned playground home (bigger hero, stat chip-cards, rounded controls, even card grid). Fixed a sticky-bar overlap and stale skill counts (→ 207).

### Quality
- **Eval regression gate** — the PR check now **fails if a changed skill's score drops** vs. main, so quality can't quietly rot as models change.

> Builds on the **v28.x** wave (not previously changelogged): the **Professional Brain** — a local-first markdown memory skills read, write back to (provenance-tagged, approval-gated), and act on via [`action-runner`](skills/action-runner/SKILL.md) — now also **in the browser**; the **n8n / Lovable / Obsidian** integrations + a read-only **REST API**; and a free, **no-credit-card** playground (Gemini free key / in-browser WebLLM).

## [28.1.0] — Integrations: n8n, Lovable & Obsidian + a REST API — 2026-06-22

### Added
- **REST API on the hosted Worker** (`mcp-remote/`) — a read-only, no-auth, CORS-open JSON API under `/v1` (`/v1/skills`, `/v1/skills/{name}` with `?format=md`, `/v1/search`, `/v1/workflows`) so HTTP / no-code tools can use the library without speaking MCP. Same catalogue as the MCP connector.
- **n8n integration** ([`connectors/n8n.md`](connectors/n8n.md)) — MCP Client node (zero-build) and HTTP Request node recipes, plus an importable example workflow ([`connectors/n8n-example-workflow.json`](connectors/n8n-example-workflow.json)).
- **Lovable integration** ([`connectors/lovable.md`](connectors/lovable.md)) — client-side BYO-key and Supabase edge-function patterns, plus a paste-in knowledge snippet that makes Lovable's generator skill-aware.
- **Obsidian integration** ([`connectors/obsidian.md`](connectors/obsidian.md)) + a new **`obsidian` export target** — all 205 skills regenerate as vault-ready notes ([`exports/obsidian/`](exports/obsidian/)) usable as Copilot-for-Obsidian / Text Generator / Templater prompts. 10 export platforms total.
- **Worker deploy Action** ([`.github/workflows/deploy-worker.yml`](.github/workflows/deploy-worker.yml)) — auto-deploys `mcp-remote/` to Cloudflare on changes (with a post-deploy `/v1` smoke test), so the REST API stays live without a manual `wrangler deploy`.

## [23.0.0] — 180 Skills + the Ask Experience — 2026-06-21

A milestone release (crossed 1,000 ⭐): the library turns into a developer Q&A surface.

### Added
- **Five developer skills** (bundled in `pm-engineering`, 38 → 43): **error-decoder** (decode an error/stack trace), **regex-builder** (build/explain regex with tests), **git-troubleshooter** (safe commands to undo a git mess), **dependency-conflict-resolver** (version-hell, ranked by safety), **code-explainer** (plain-English walkthrough). Library is now **180 skills**.
- **Ask** (`ask.html`) — a coding question routed to the best developer skill and answered instantly ("StackOverflow, but the answer's already written"), with a one-click path to the community Q&A.
- **Q&A Discussions** template + an ❓ Ask nav tab.
- **Eval cases for the 5 new skills** — eval coverage 15 → **20 skills**.

### Fixed
- Registered the new skills across all manifests (`marketplace.json`, `plugin.json`) and refreshed every count to 180; regenerated exports (906 files), OG cards, and the hero GIF/social preview.

## [22.3.0] — Monetization & a Polished Playground — 2026-06-21

### Added
- **Sponsors program** — tiers + value props ([SPONSORS.md](SPONSORS.md)), an auto-rendered sponsor wall on the Community page, and the GitHub Sponsors button (`FUNDING.yml`).
- **Embeddable widget** ([`web/embed.js`](web/embed.js)) — drop `<div data-pm-skill="…">` on any site for a branded "Run this skill" card that links back; copy-paste snippet on every skill page.
- **Pro / Teams page** (`pro.html`) — private skills, shared team context, custom packs; Partner tier today + a waitlist.
- **Playground polish:** a **⌘K command palette** (ranked fuzzy search of skills + tools), a **hero landing** with animated stats + the Auto-Agent demo, **favourites + recently-used**, a site-wide **light/dark theme** toggle, **compare-models** (Opus/Sonnet/Haiku side by side), and **save-as-image** (branded PNG of any result).
- **Repo social-preview image** for shareable links.

### Changed
- **README glow-up** — a native **Mermaid** lifecycle diagram, an honest **"How it compares"** table, and an animated typing header.
- **Shared navigation** (`web/nav.js`) is now the single source for the tools bar *and* theme, applied consistently across every page (fixes catalog/leaderboard drift + theme).

## [22.2.0] — Skill Studio, Auto-Agent & Editor Extension — 2026-06-20

Lower the bar to *create* skills, raise the ceiling on *using* them, and meet people in their editor.

### Added
- **Skill Studio** (`studio.html`) — describe a skill in the browser and generate a complete, standards-compliant `SKILL.md` (frontmatter, "work from a brief" rule, structured output, quality checks, anti-patterns), then **open a prefilled GitHub pull request in one click**. The frictionless on-ramp that feeds the eval-gated contribution flow.
- **Auto-Agent** (`agent.html`) — give a plain-English goal; the model **plans an ordered chain of skills** from the 175-skill catalog (with reasoning) and **runs them in sequence**, each step's output feeding the next.
- **VS Code / Cursor extension** (`vscode-extension/`) — search all 175 skills from the Command Palette and insert one as context for Copilot/Cursor chat, copy it, or open it in the Playground. Includes dev + publish docs.

### Changed
- **Shared navigation** (`web/nav.js`) — the tools bar is now a single source of truth injected into every static and generated page, eliminating per-page duplication (which had caused catalog/leaderboard to drift).

## [22.1.0] — The Skills Hub, Contribution Flow & a Redesign — 2026-06-20

The library becomes a community **platform** — with a benchmark, a contributor flow, a place to gather, and a much sharper look.

### Added
- **Skills Hub (GitHub-native, no backend):**
  - **Per-skill discussion threads** on every skill page via Giscus (backed by GitHub Discussions).
  - A **Community page** (`community.html`) with a live activity feed, contributor wall, and skill-of-the-week, generated from the GitHub API at deploy time.
  - **Discussion category templates** (Show & Tell, Recipes) + **Share-to-Hub** buttons in the Playground and Grade tool that open a prefilled Show & Tell post.
- **Eval-gated contribution flow:** a PR check validates structure and cheaply scores only the *changed* skills (`run-evals --changed`), posting the result on the PR; plus a submit-a-skill issue form.
- **Grade your work** (`grade.html`): paste a draft, get a rubric score + ranked gaps + a redline against any skill's framework. A "Grade your draft" CTA is on every skill page.
- **Public Benchmark page** (`benchmark.html`) framing the eval as an open standard for AI professional-work quality.
- A prominent **tools navigation bar** across all browser tools.

### Changed
- **Redesigned the web UI** — gradient header, accent-gradient nav and buttons, richer background, card hover states, and focus rings. Less bland, more product.
- **Cost-optimized the eval engine** — cheaper defaults (one model + Sonnet judge, ~$0.30/run), `--dry-run` estimate, skip-unchanged via content hash, `--changed` and `--max-skills`; removed all auto-spending crons. Hardened the API client (honor `Retry-After`, more retries).

## [22.0.0] — Closing the Loop — 2026-06-20

The library stops being a one-shot generator and starts closing loops — improving itself, grading your work, grounding in your data, and composing visually.

### Added
- **Self-improving skills** — `scripts/improve-skill.mjs` + a weekly workflow: eval → judge critique → rewrite the SKILL.md → re-eval, **keeping the rewrite only if the score rises**. Logged to `SKILL-IMPROVEMENTS.md`.
- **Critique mode** (Playground) — paste an existing draft and get a rubric score, ranked gaps, and a redline, graded against the skill's framework. Generate *or* evaluate.
- **Data grounding** — load a real file into your context in the Playground; documented MCP connector pattern so skills act on live sources (Linear, Drive, a database).
- **Workflow Canvas** (`web/canvas.html`) — drag skills into a custom chain and run it, each step feeding the next; shareable recipe links.
- **Red-Team Review skill** + `/red-team` — stress-test a plan against hostile expert personas, with ranked blind spots, a pre-mortem, and prioritised fixes. Library is now **175 skills**.
- **Eval-scored filter** in the Playground so the (now 15) eval badges are easy to find.

### Changed
- **Hardened the eval client** — honor `Retry-After`, retry 429/529/5xx up to 5× with capped backoff+jitter, lower eval concurrency (4 → 2). Leaderboard runs now complete reliably.
- **Fixed three skills the eval flagged** — `go-to-market`, `okr-builder`, `roadmap-narrative` went from ~2.0/5 to **4.75/5** with a "work from a brief" rule. Eval coverage expanded 6 → 15 skills.
- Hyphen/space-insensitive Playground search (so "red team" finds `red-team-review`).

## [21.1.1] — Framework Attribution & a Leaner README — 2026-06-20

### Added
- **Framework attribution** — `skill-sources.json` cites the canonical method each skill encodes
  (RICE, Jobs-to-be-Done, Continuous Discovery, Porter's Five Forces, the Pyramid Principle,
  Google SRE, WCAG, *Obviously Awesome*, and more). Shown as a "📚 Based on" line in the
  Playground and on every per-skill page. 50 skills attributed; the rest intentionally left
  unattributed rather than given a fabricated citation. `skill-sources.json` now ships in the package.

### Changed
- **README slimmed ~38%** (1,361 → ~850 lines): the full 174-skill catalog moved to
  [`SKILLS.md`](SKILLS.md), changelog history collapsed to latest + link, article series collapsed,
  positioning one-liner sharpened, and a Claude Cowork install path added.

## [21.1.0] — Skill Memory, Onboarding, Social Cards & ChatOps — 2026-06-19

Make the library personal, easy to start with, and shareable.

### Added
- **Skill Memory (context layer)** — set your company/product/audience/voice once and every
  skill personalizes its output. New `/setup-context` command + `templates/pm-context.example.md`
  for Claude Code; a saved "Your context" box in the Playground that's prepended to every run.
- **Role-based onboarding** — first-visit "what's your role?" prompt (PM / Founder / CSM /
  Marketing / Engineering) surfaces a curated starter pack, with a "show all 174" escape.
- **Branded social cards** — a 1200×630 Open Graph image per skill (`scripts/build-og-images.mjs`),
  wired into every per-skill page so shared links render a polished preview.
- **ChatOps Skill Bot** — comment `/skill <name>` on a GitHub issue/PR and the skill runs and
  replies inline (`.github/workflows/skill-bot.yml`); gated to repo collaborators.

### Changed
- `templates/` now ships in the npm package (so `/setup-context` can read the template).

## [21.0.0] — Workflow Recipes, Eval-Verified Quality & a Smarter Playground — 2026-06-19

The biggest update yet — the 174 skills become a *system*, not just a catalog.

### Added
- **Workflow Recipes** — chain skills into one flow, where each output feeds the next. Five
  cross-profession recipes ship as slash commands and over MCP: `/ship-a-feature`,
  `/close-the-quarter`, `/launch-a-product`, `/rescue-an-account`, `/run-discovery`. Defined in
  `workflows.json`, documented in `WORKFLOWS.md` (generated + validated by `scripts/build-workflows.mjs`).
- **Eval-verified quality** — real eval scores (structure, completeness, usefulness, grounding;
  judged by Opus 4.8) now surface as badges in the Playground and leaderboard. Eval coverage
  expanded from 6 to 15 skills.
- **One-click MCP** — `claude mcp add pm-skills -- npx -y pm-claude-skills-mcp` makes every skill
  and recipe available in any MCP client (Claude Code, Claude Desktop, Cursor, Windsurf). New
  `list_workflows` / `get_workflow` MCP tools.
- **Playground upgrades** — a "which skill do I need?" recommender, a Compare toggle (run inputs
  with vs. without the skill, side by side), and shareable deep-links that prefill inputs.
- **Sample-output gallery** (`examples.html`) — 18 real example outputs so you can see what each
  skill produces before running anything. Generated via a workflow using the API-key secret.
- **Skill of the week** — a scheduled workflow composes weekly X/LinkedIn posts; an optional
  webhook auto-publishes.

### Changed
- README leads with a problem-solution hook, a workflow lifecycle diagram, a "hero five"
  quick-start, and an animated demo (plus a Compare-mode demo).

## [20.2.0] — Community PRs & New Skill — 2026-06-18

### Added
- **New skill: YouTube Script Writer** (experimental) — retention-optimized video scripts with
  3 title/thumbnail concepts, 3 hook variations, a video/audio cue script table, and SEO
  metadata. Thanks @prajwal-28 (#50). Library is now **174 skills**.
- **Feature-prioritisation helper script** — a dependency-free (stdlib-only) Python helper that
  computes RICE/ICE rankings from JSON/CSV/stdin, so scoring is consistent across sessions.
  Thanks @zeotrix (#48, closes #39).

### Changed
- **Safer installs** — the CLI now resolves the install target and refuses system-critical
  directories (`/`, `/usr`, `/etc`, `/root`, …) so a mistyped `--target` can't clobber the
  system. Thanks @MatrixNeoKozak (#47).
- **README catalog reconciled to the real count** — the headline, badge, table of contents, and
  "All Skills" catalog now say **174** (was a stale 167); added catalog entries for Skill
  Security Auditor (#168), Launch Readiness (#169), and YouTube Script Writer (#170).

### Fixed
- **`skillcheck` frontmatter parser** tolerates leading whitespace and CRLF/LF line endings, so
  skills authored on Windows no longer produce false negatives. Thanks @MatrixNeoKozak (#47).
- **`npm run check` now guards `web/skills.json`** — it rebuilds the file and fails on any drift,
  so a stale playground index can't pass locally and then break CI.

## [20.1.0] — Star Nudges & Eval Hardening — 2026-06-18

### Added
- **Star the repo, from anywhere you use it.** Tasteful, non-spammy calls-to-action that turn
  npm/CLI users into stargazers — no `postinstall` hook: a prompt after a successful
  `npx pm-claude-skills add`, in `--help`, in `list`, in the MCP server's startup banner, a
  CTA below the README badges (npm renders it on the package page), and a `funding` field in
  `package.json` so npm shows a Fund/Sponsor link.
- **One-click leaderboard updates in CI** — `.github/workflows/eval-leaderboard.yml`
  ("Update Skill Leaderboard") runs the evals with the `ANTHROPIC_API_KEY` secret, commits
  `evals/results.json`, and the Pages deploy re-renders the public leaderboard with real
  numbers — no local key needed. The deploy workflow now also triggers on
  `evals/results.json`.

### Changed
- **Leaderboard workflow opens a PR** instead of pushing to `main` (which the branch
  ruleset blocks). After it runs, merge the auto-created results PR to publish real numbers.
- **Faster, hang-proof evals.** The Anthropic client now has a per-request timeout (120s)
  and limited retries (429/5xx/timeout); the eval harness runs cases concurrently
  (default 4). The leaderboard workflow has a 20-minute job timeout. A 24-call run that
  was sequential now finishes in a few minutes and can't stall a job indefinitely.

## [20.0.0] — Agentic Tooling — 2026-06-18

### Added
- **Dogfooded Action** — `.github/workflows/pr-description.yml` uses our own GitHub Action
  (`uses: ./action`) to auto-write this repo's PR descriptions when a PR opens with an
  empty body (skips quietly without the `ANTHROPIC_API_KEY` secret and on forks).
- **GitHub Action** ([`action/`](action/)) — run any skill in CI: `uses:
  mohitagw15856/pm-claude-skills/action@main` to auto-write PR descriptions,
  changelogs, release notes, or code-review checklists. Composite action +
  dependency-free runner.
- **`generate` command** — `npx pm-claude-skills generate --from <url|file>` turns a
  team's documentation into a `SKILL.md` that follows the authoring standard
  (`bin/generate.mjs`, needs `ANTHROPIC_API_KEY`).
- **Skill evals + Leaderboard** — `evals/run-evals.mjs` scores skill output across models
  with an LLM judge (structure / completeness / usefulness / grounding);
  `scripts/build-leaderboard.mjs` renders a public `web/leaderboard.html` (built in the
  Pages deploy, linked from the README, catalog, and playground).
- Shared, dependency-free Anthropic client (`bin/lib/anthropic.mjs`) used by all three.

## [19.0.0] — Security Auditor, Personas & Catalog — 2026-06-18

### Added
- **Skill Security Auditor** — `scripts/skill-audit.mjs` scans installable content
  (`skills/*/SKILL.md` + each skill's `scripts/`) for prompt injection, data
  exfiltration, dynamic code execution, destructive shell, hardcoded secrets, and hidden
  text. HIGH findings fail CI (`skill-audit.yml`); a `security audit` badge in the README.
  Plus a new **`skill-security-auditor`** skill that teaches the same review for any skill.
- **Personas (output-styles)** — 4 Claude Code output styles in [`output-styles/`](output-styles/)
  (Startup CTO, Growth Marketer, Solo Founder, Product Leader). `--agent claude` now also
  installs `~/.claude/output-styles/`.
- **Orchestration guide** — [`ORCHESTRATION.md`](ORCHESTRATION.md): Skill Chain,
  Multi-Agent Handoff, Domain Deep-Dive, and Solo Sprint patterns for combining skills,
  subagents, and commands.
- **Static skill catalog** — `scripts/build-docs.mjs` generates a server-rendered,
  SEO-indexable `web/catalog.html` of all skills (linked from the README and Playground;
  built in the Pages deploy).
- **Public roadmap** — [`ROADMAP.md`](ROADMAP.md) with now/next/later and a "good first
  issues" list to grow contributors.

## [18.0.0] — Windsurf, Aider & an MCP Server — 2026-06-17

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

[Unreleased]: https://github.com/mohitagw15856/pm-claude-skills/compare/v20.0.0...HEAD
[20.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v19.0.0...v20.0.0
[19.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v18.0.0...v19.0.0
[18.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v17.0.0...v18.0.0
[17.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v16.0.0...v17.0.0
[16.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v15.0.0...v16.0.0
[15.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v14.0.0...v15.0.0
[14.0.0]: https://github.com/mohitagw15856/pm-claude-skills/releases
