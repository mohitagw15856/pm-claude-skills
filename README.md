# 🧠 PM Skills — 167 Professional Agent Skills for Claude, ChatGPT, Gemini, Cursor, Codex & Hermes

> Open-source **Agent Skills** (`SKILL.md`) + subagents + slash commands for every profession — one source, every AI coding tool.

[![Stars](https://img.shields.io/github/stars/mohitagw15856/pm-claude-skills?style=social)](https://github.com/mohitagw15856/pm-claude-skills/stargazers)
[![Skills](https://img.shields.io/badge/skills-167-blue)](https://github.com/mohitagw15856/pm-claude-skills)
[![Subagents](https://img.shields.io/badge/subagents-4-blueviolet)](agents/)
[![Commands](https://img.shields.io/badge/slash%20commands-6-blueviolet)](commands/)
[![Platforms](https://img.shields.io/badge/works%20with-Claude%20%7C%20ChatGPT%20%7C%20Gemini%20%7C%20Cursor%20%7C%20Codex%20%7C%20Hermes-8A2BE2)](#-works-with--cross-tool-compatibility)
[![SkillCheck](https://img.shields.io/github/actions/workflow/status/mohitagw15856/pm-claude-skills/skillcheck.yml?branch=main&label=SkillCheck)](.github/workflows/skillcheck.yml)
[![Version](https://img.shields.io/badge/version-16.0.0-brightgreen)](https://github.com/mohitagw15856/pm-claude-skills/releases)
[![Install](https://img.shields.io/badge/Install%20in%20Claude%20Code-2%20minutes-orange)](https://github.com/mohitagw15856/pm-claude-skills#-quick-install-2-minutes)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-❤️-ff69b4)](https://github.com/sponsors/mohitagw15856)

> **PM stands for Professional, not just Product Management.**
> 167 professional skills + 4 agent templates across 26 bundles covering 18 professions. Built for Claude Code — and now portable to ChatGPT, Gemini, and Hermes Agent. Built by a PM, used by everyone.

A community-built library of professional skills for every field — product management, engineering, customer success, marketing, social media, writers, design, legal, finance, HR, sales, operations, research, and more. Each skill is a structured `SKILL.md` file that teaches an AI assistant how to produce professional-grade outputs for your workflows. Skills run natively in **Claude Code** and **Hermes Agent** (same open `SKILL.md` standard), and ship as ready-to-paste exports for **ChatGPT** and **Gemini** — see [Works With](#-works-with--cross-tool-compatibility).

**🆕 Latest release (v16.0.0 — Multi-Platform):** the library goes cross-tool. A single-source export generator produces ready-to-use ChatGPT and Gemini prompts from every skill, native Hermes Agent install support, three stdlib Python helper scripts, explicit skill tiers, and an upgraded Skill Playground. See the [changelog](#-changelog).
---

## Contents

- [🚀 Quick Install](#-quick-install-2-minutes)
- [🔌 Works With — Cross-Tool Compatibility](#-works-with--cross-tool-compatibility)
- [🤖 Subagents & Slash Commands](#-subagents--slash-commands)
- [🌐 Skill Playground — try any skill in your browser](#-skill-playground--try-any-skill-in-your-browser)
- [📦 Plugin Directory](#-plugin-directory)
- [🤖 Building Blocks for Agent Templates](#-building-blocks-for-agent-templates)
- [🏷️ Skill Tiers — start with the strongest](#️-skill-tiers--start-with-the-strongest)
- [🗂️ All 167 Skills](#️-all-167-skills)
- [📋 Changelog](#-changelog)
- [🤝 Contributing](#-contributing--add-your-skill)
- [🔗 Related Projects](#-related-projects)

---

## 🚀 Quick Install (2 minutes)

In Claude Code, run:

/plugin marketplace add mohitagw15856/pm-claude-skills

Or install by profession:

claude plugin install pm-essentials@pm-claude-skills     # Core PM + Word tracked changes

claude plugin install pm-delivery@pm-claude-skills       # Delivery + PowerPoint auditor

claude plugin install pm-engineering@pm-claude-skills    # Engineering (35 skills) 🆕

claude plugin install pm-cs@pm-claude-skills             # Customer Success 🆕

claude plugin install pm-data@pm-claude-skills           # Data + chart data extractor

claude plugin install pm-legal@pm-claude-skills          # Legal

claude plugin install pm-finance@pm-claude-skills        # Finance

claude plugin install pm-hr@pm-claude-skills             # HR

claude plugin install pm-sales@pm-claude-skills          # Sales

claude plugin install pm-operations@pm-claude-skills     # Operations

claude plugin install pm-research@pm-claude-skills       # Research & Healthcare

claude plugin install pm-cross@pm-claude-skills          # Cross-profession

claude plugin install pm-figma@pm-claude-skills          # Figma

claude plugin install pm-social@pm-claude-skills         # Social Media 🆕

claude plugin install pm-writers@pm-claude-skills        # Writers & Content Creators 🆕


Or clone and symlink for auto-updates:

git clone https://github.com/mohitagw15856/pm-claude-skills.git ~/pm-claude-skills
mkdir -p ~/.claude/skills
ln -s ~/pm-claude-skills/skills/* ~/.claude/skills/

---

## 🔌 Works With — Cross-Tool Compatibility

These skills were built for Claude Code, but they aren't locked to it. Each `SKILL.md` is
two portable parts: a small **frontmatter** block (`name` + `description`) and a
**markdown body** that is just a well-structured set of instructions and output templates.
The body is plain English — so it works anywhere a capable model reads instructions.

There are two kinds of support. **Native `SKILL.md` agents** read the file as-is and
auto-discover skills from the `description` frontmatter. **Other tools** take the markdown
body as a system prompt — for those we ship ready-made [exports](#ready-to-use-exports).

| Platform | How it works | Auto-trigger? |
|---|---|---|
| **Claude Code** (CLI / desktop / web / IDE) | Native. Install via the plugin marketplace; Claude loads a skill automatically when your request matches its description. | ✅ Yes |
| **Hermes Agent** (Nous Research) | Native — same open `SKILL.md` standard. Run `python3 scripts/sync-hermes-skills.py` to install into `~/.hermes/skills/`; Hermes auto-discovers them. | ✅ Yes |
| **OpenAI Codex · OpenClaw** | Native `SKILL.md`. One-line install (see [below](#one-line-install-for-coding-agents)) or `./scripts/install.sh --agent codex`. | ✅ Yes |
| **Cursor** | Generated `.mdc` rules. One-line install into `.cursor/rules/`, or copy from [`exports/cursor/`](exports/cursor/). | ⚙️ By description |
| **Claude.ai & Claude API** | Upload a skill, or paste the body in as a system prompt / project instruction. | ⚙️ Manual |
| **Other `SKILL.md`-aware agents** (Gemini CLI, Aider, Windsurf, …) | Point the agent at `skills/`, or use `./scripts/install.sh`. The frameworks are tool-agnostic; only discovery differs per tool. | ⚙️ Varies by tool |
| **ChatGPT & Gemini** | Copy a ready-made export (below) into a Custom GPT or Gem's instructions. You keep the full framework and output format. | ❌ Paste per use |

**What's verified vs. what varies:** the skill **bodies** — the frameworks, rubrics, and
output templates that do the actual work — are model-agnostic and have been used across
Claude and other chat LLMs. Native `SKILL.md` agents (Claude Code, Hermes) also get the
convenience layer: automatic skill discovery from the `description`. On chat LLMs you paste
the body in manually and lose only the auto-triggering, not the substance.

### Ready-to-use exports

You don't have to strip frontmatter by hand. Every skill is exported to platform-ready
files under [`exports/`](exports/), generated from the same source so nothing is
maintained twice:

- **ChatGPT** — copy any [`exports/chatgpt/<bundle>/<skill>/SYSTEM_PROMPT.md`](exports/chatgpt/) straight into a Custom GPT's instructions.
- **Google Gemini** — copy any [`exports/gemini/<bundle>/<skill>/GEM_INSTRUCTIONS.md`](exports/gemini/) into a Gem's instructions.
- **Cursor** — copy any [`exports/cursor/<bundle>/<skill>/<skill>.mdc`](exports/cursor/) into `.cursor/rules/` (or use the one-liner below).

### One-line install for coding agents

Native `SKILL.md` agents (Claude Code, Hermes, Codex, OpenClaw) and Cursor can install every skill with a single command — each clones the library and drops the skills where the agent discovers them:

```bash
# OpenAI Codex
bash <(curl -fsSL https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/scripts/codex-install.sh)

# OpenClaw
bash <(curl -fsSL https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/scripts/openclaw-install.sh)

# Cursor (.mdc rules into ./.cursor/rules)
bash <(curl -fsSL https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/scripts/cursor-install.sh)
```

Already cloned? Use the unified installer for any agent (add `--link`, `--target`, or `--dry-run`):

```bash
./scripts/install.sh --list                      # claude · hermes · codex · openclaw · cursor
./scripts/install.sh --agent codex               # install for a specific agent
python3 scripts/sync-hermes-skills.py            # Hermes equivalent (copy, or --link / --dry-run)
```

The skill body in `skills/<name>/SKILL.md` is the single source of truth. Regenerate the
chat-LLM / Cursor exports (or add a new platform — it's a few lines in the `PLATFORMS` registry) with:

```bash
node scripts/build-exports.mjs            # regenerate all platform exports
node scripts/build-exports.mjs --check    # CI: fail if exports are stale
```

> Prefer a hand-curated ChatGPT collection? There's also a [companion Custom GPT library](#-companion-repository--chatgpt-custom-gpts) built from the same frameworks.

---

## 🤖 Subagents & Slash Commands

It's not just skills. The library also ships **Claude Code subagents** and **slash commands** built on top of the strongest skills, so common workflows are one delegation or one command away.

**Subagents** ([`agents/`](agents/)) — focused personas Claude delegates to automatically by description:

| Agent | Use it for |
|---|---|
| [`pm-partner`](agents/pm-partner.md) | PRDs, prioritisation, stakeholder updates, exec summaries |
| [`sprint-master`](agents/sprint-master.md) | Sprint planning, retros, velocity, user stories |
| [`cs-guardian`](agents/cs-guardian.md) | Account health, churn, renewals, escalations, QBRs |
| [`launch-captain`](agents/launch-captain.md) | Positioning, GTM, launch checklists, competitor teardowns |

**Slash commands** ([`commands/`](commands/)) — run a skill on whatever you pass:

`/prd` · `/rice` · `/sprint-plan` · `/health-scorecard` · `/retro` · `/exec-summary`

Install everything for Claude Code in one go (skills **+** subagents **+** commands):

```bash
./scripts/install.sh --agent claude       # ~/.claude/{skills,agents,commands}
```

Commands whose skill ships a Python helper (RICE, sprint capacity, customer health) run it to **compute** results, not estimate them.

---

## 🌐 Skill Playground — Try Any Skill in Your Browser

**▶ Live: [mohitagw15856.github.io/pm-claude-skills](https://mohitagw15856.github.io/pm-claude-skills/)**

Don't want to install anything yet? Run any of these skills from a **zero-backend web app** using **your own Claude API key**. Pick a skill, fill in the auto-generated form, and Claude streams the result. Your key is stored only in your browser (`localStorage`) and sent directly to the Anthropic API — nothing touches a server we own.

![Skill Playground — pick a skill, fill the form, run it with your own Claude key](web/docs-assets/playground.png)

**Run it locally:**

```bash
git clone https://github.com/mohitagw15856/pm-claude-skills.git
cd pm-claude-skills
node web/build-skills.mjs               # generate the skill index (skills.json)
cd web && python3 -m http.server 8000   # serve over HTTP (not file://)
# open http://localhost:8000 and paste a key from console.anthropic.com
```

It's fully static — deploy the `web/` folder to GitHub Pages, Netlify, or Vercel with no environment variables. Full details in [`web/README.md`](web/README.md).

---

## 📦 Plugin Directory

Not sure which plugin to install? Here's what each one covers:

| Plugin | Skills | Best for |
|---|---|---|
| **pm-essentials** | competitive-analysis, meeting-notes, prd-template, stakeholder-update, user-research-synthesis, docx-tracked-changes | The core PM toolkit — start here if you're new. Covers the documents you write every week: PRDs, stakeholder updates, meeting notes, and competitive analysis. |
| **pm-advanced** | ai-ethics-review, ai-product-canvas, experiment-designer, design-handoff-brief, multi-source-signal-synthesiser | For PMs working on AI products or running sophisticated experiments. Covers ethical review of AI features, AI-native product canvases, and experiment design. |
| **pm-analytics** | data-analysis-standard, product-health-analysis, retention-analysis | Turn raw data into PM-ready narratives. Use when you need to frame an analysis, explain health metrics to leadership, or diagnose retention drop-offs. |
| **pm-business** | board-deck-narrative, investor-update, job-application | For PMs operating at the business layer — writing board narratives, investor updates, or crafting a standout job application. |
| **pm-cross** | executive-summary, grant-proposal, last-30-days-research, notebooklm-connector, press-release, sycophancy-challenger, teaching-lesson-plan | Cross-profession utility skills that work outside a single domain — writing executive summaries, press releases, running research, and challenging sycophantic AI output. |
| **pm-cs** | churn-analysis, cs-escalation-brief, cs-health-scorecard, customer-success-plan, qbr-deck, renewal-playbook | For PMs or CSMs responsible for retention. Covers churn diagnosis, escalation briefs, QBR decks, health scorecards, and renewal plays. |
| **pm-data** | chart-data-extractor, cohort-analysis, dashboard-brief, data-pipeline-spec, metrics-framework, sql-query-explainer | Data-heavy work: extracting insights from charts, building metrics frameworks, explaining SQL queries, designing dashboards, and speccing data pipelines. |
| **pm-delivery** | ab-test-planner, go-to-market-planner, pptx-slide-auditor, product-launch-checklist, retro-analysis, sprint-brief, sprint-planning, technical-spec-template, user-story-writer | Everything you need to ship: sprint planning, user stories, launch checklists, A/B test design, retros, and PowerPoint auditing. The most-used plugin for day-to-day delivery. |
| **pm-design** | accessibility-audit, design-critique, design-system-audit, ux-research-plan | For PMs who work closely with design. Covers accessibility audits, structured design critiques, design system reviews, and UX research planning. |
| **pm-discovery** | assumption-mapper, customer-journey-map, discovery-interview-guide, job-story-mapper, user-interview-synthesis | The discovery toolkit: map assumptions, build journey maps, write interview guides, synthesise user interviews, and reframe features as job stories. |
| **pm-engineering** | 37 skills across API docs, architecture, CI/CD, incident response, security, observability, and more | The largest plugin — built for PMs embedded in engineering teams. Covers technical specs, runbooks, on-call processes, architecture decisions, and engineering hiring. |
| **pm-figma** | figma-annotation-guide, figma-component-audit, figma-design-brief, figma-design-critique-pm, figma-design-qa, figma-design-review, figma-prototype-plan, figma-spacing-system, figma-user-flow-planner, figma-variant-matrix | Purpose-built for Figma workflows. Covers design QA, component audits, spacing systems, user flow planning, variant matrices, and design briefs — all from a PM perspective. |
| **pm-finance** | budget-variance-analysis, financial-due-diligence, financial-model-narrative, investor-pitch-deck, tax-planning-checklist | For PMs who touch financials — explaining budget variances, building investor pitch decks, narrating financial models, and running due diligence reviews. |
| **pm-gtm** | competitor-teardown, content-calendar, email-campaign, go-to-market, media-pitch, product-positioning-doc, seo-content-brief, social-media-strategy | The go-to-market toolkit: positioning docs, competitor teardowns, GTM plans, content calendars, email campaigns, and SEO briefs. Best for PMs who own launch and demand. |
| **pm-hr** | change-management-plan, employee-engagement-survey, job-description-writer, onboarding-plan, redundancy-consultation | People operations skills — writing job descriptions, managing change, designing onboarding, running engagement surveys, and handling redundancy consultations. |
| **pm-legal** | compliance-checklist, contract-review, legal-brief, nda-analyser | For PMs navigating legal and compliance work: reviewing NDAs, summarising contracts, creating compliance checklists, and preparing legal briefs. |
| **pm-operations** | email-triage, morning-intelligence, process-documentation, project-status-report, raci-matrix, risk-register, sop-writer, vendor-evaluation, workshop-facilitation-guide | Operational efficiency skills — managing your inbox, running status reports, documenting processes, evaluating vendors, writing SOPs, and facilitating workshops. |
| **pm-people** | 360-feedback-template, hiring-rubric, performance-review, team-health-check, team-offsite-planner | For people managers and team leads: writing performance reviews, running 360 feedback, designing hiring rubrics, checking team health, and planning offsites. |
| **pm-planning** | feature-prioritisation, okr-builder, pricing-strategy, rice-impact-matrix, rice-prioritisation, roadmap-narrative, roadmap-presentation | Strategic planning from roadmaps to OKRs — prioritising features with RICE, writing roadmap narratives, setting pricing, building OKRs, and presenting strategy to stakeholders. |
| **pm-research** | clinical-case-summary, literature-review, patient-communication, research-protocol | For PMs in healthcare and research settings. Covers clinical case summaries, literature reviews, research protocols, and patient-facing communication. |
| **pm-rituals** | pm-weekly-review | A single powerful skill for the PM weekly review ritual — reflecting on progress, blockers, and priorities in a structured, consistent format. |
| **pm-sales** | account-plan, discovery-call-prep, partnership-proposal, proposal-writer, sales-battlecard, sales-forecasting-model | For PMs who work alongside sales — writing battlecards, preparing for discovery calls, building account plans, crafting partnership proposals, and forecasting. |
| **pm-social** | community-management-playbook, influencer-brief, social-ad-campaign, social-media-audit, viral-content-framework | Social media and community skills: running ad campaigns, briefing influencers, auditing social presence, building community playbooks, and designing viral content. |
| **pm-strategy** | ambiguity-resolver, competitive-intelligence-monitor, competitor-signal-tracker, executive-update, stakeholder-influence-mapper, strategic-narrative-generator | Senior PM and strategic work — resolving ambiguity, tracking competitive signals, mapping stakeholder influence, writing executive updates, and building strategic narratives. |
| **pm-writers** | aeo-optimizer, instagram-post-downloader, notes-humanizer, substack-notes-scraper, thumbnail-creator | For content creators and writers using Claude: optimising for AI search engines, humanising notes, scraping research from Substack, and generating thumbnail concepts. |

---

## 🎬 See It in Action

**Debugging Log Analyser** — paste a stack trace or error log, get a structured root cause diagnosis with probable cause, affected code path, a specific fix, and next debugging steps.

**PR Description Writer** — share your diff or commit list, get a reviewer-friendly PR description with summary, changes made, testing steps, and reviewer notes.

**Sprint Planning Skill** — paste your sprint goals and backlog items, get a complete structured sprint plan with capacity, commitments, risks, and a day-one kickoff agenda.

> 📹 Drop a demo in [Discussions](../../discussions) and we'll feature it here.

---

## 🤖 Building Blocks for Agent Templates

On May 5, 2026, Anthropic [released their first agent templates](https://www.anthropic.com/news/finance-agents) — pre-packaged Claude agents that combine **skills, connectors, and subagents** into ready-to-run workflows for financial services.

This library is the largest open-source collection of professional skills available — covering 17 professions beyond financial services. **The 167 skills here are the building blocks for agent templates outside of finance.**

### What is an agent template?

An agent template packages three things into one runnable workflow:

| Component | What it is | Example from this library |
|---|---|---|
| **Skills** | Markdown files that teach Claude how to produce structured professional outputs | `sprint-planning`, `contract-review`, `investor-update` |
| **Connectors** | Governed access to your team's data sources | Linear, Jira, Slack, Google Drive, Notion |
| **Subagents** | Focused Claude models for sub-tasks within the larger workflow | Capacity analyst, risk scorer, comparables selector |

A skill alone gives Claude a structured output format. An agent template gives Claude a complete workflow — pulling data, running specialised analysis, producing the output, and routing it where it needs to go.

### How to use this library to build your own agent template

Pick a recurring workflow on your team. Identify which existing skills cover the structured outputs that workflow needs. Add the connectors that let Claude reach the data. Add subagents for the analytical sub-tasks. That's the template.

Examples of agent templates this library supports:

| Template | Skills used | Connectors needed | Subagents |
|---|---|---|---|
| **PM Sprint Agent** | sprint-planning, sprint-brief, retro, project-status-report | Linear or Jira, Slack | Capacity analyst, risk scorer |
| **Legal Contract Review Agent** | contract-review, nda-analyser, compliance-checklist | Google Drive or SharePoint | Clause-by-clause risk scorer |
| **PM Discovery Agent** | discovery-interview-guide, user-interview-synthesis, assumption-mapper | Granola or Otter, Notion | Theme synthesiser |
| **Sales Pursuit Agent** | sales-battlecard, discovery-call-prep, proposal-writer, account-plan | Salesforce or HubSpot, Gong | Competitive intel analyst |
| **HR Onboarding Agent** | onboarding-plan, job-description-writer, change-management-plan | Workday or BambooHR, Slack | First-week scheduler |
| **Finance Board Pack Agent** | investor-update, board-deck-narrative, financial-model-narrative | NetSuite or Xero, Google Drive | KPI variance analyst |
| **Marketing Launch Agent** | go-to-market, content-calendar, email-campaign, media-pitch | HubSpot, Notion | Channel strategist |


### Available agent templates

The pm-claude-skills library now includes four working agent templates, each built from existing skills in this library combined with subagents and connectors. All four follow the architecture Anthropic introduced for [financial services agent templates](https://www.anthropic.com/news/finance-agents) on May 5, 2026.

| Template | What it does | Skills used | Connectors | Time saved |
|---|---|---|---|---|
| **[PM Sprint Agent](./templates/pm-sprint-agent/)** | End-to-end sprint planning — pulls backlog, calculates capacity, drafts plan, scores risks | sprint-planning, sprint-brief | Linear, Jira | 90 min → 90 sec |
| **[PM Discovery Agent](./templates/pm-discovery-agent/)** | Customer discovery synthesis — reads interview notes, finds themes, scores assumption confidence | user-interview-synthesis, job-story-mapper | Notion, Google Drive | 1 day → 5 min |
| **[PM Stakeholder Comms Agent](./templates/pm-stakeholder-comms-agent/)** | Audience-tailored stakeholder updates — exec, investor, cross-functional, or board | executive-update, investor-update, stakeholder-update, board-deck-narrative | Linear, Jira, Google Drive | 90 min → 1 min |
| **[PM Launch Agent](./templates/pm-launch-agent/)** | End-to-end launch coordination — content for every channel, calendar, metrics, checklist | go-to-market, content-calendar, media-pitch, email-campaign, launch-checklist | Notion (optional) | 4-6 hours → 3 min |

Each template includes:
- Working orchestration script
- Two or more focused subagents
- Connector configurations with documented setup
- Working examples (input + output)
- Smoke test for verifying installations

### How to install a template

All templates are part of the main library — installing the marketplace gives you all four.

/plugin marketplace add mohitagw15856/pm-claude-skills


Then navigate to the template you want and follow its README:

cd templates/pm-sprint-agent      # or pm-discovery-agent, etc.
cat README.md                       # full setup instructions


### Building your own template

If you want to build a template for a workflow not covered above — Legal Contract Review, Sales Pursuit, Finance Board Pack, HR Onboarding, Marketing Campaign — see the [template contribution guide](./templates/CONTRIBUTING.md).

The pattern is consistent: pick a multi-step workflow, identify which existing skills cover the structured outputs, add connectors for data access, and define subagents for specialised analysis. The four templates above are reference implementations.


It combines four skills, two connectors, and two subagents into a single workflow that handles end-to-end sprint planning.

Documentation, working orchestration script, and example outputs are included in the template folder.

More templates will follow. If you want to contribute one, see the [template contribution guide](./templates/CONTRIBUTING.md).

---

## 📋 Changelog

The highlights are below. For the structured, [Keep a Changelog](https://keepachangelog.com/)-format history, see **[CHANGELOG.md](CHANGELOG.md)**.

### 🆕 What's New in v16.0.0 — Multi-Platform

The library stops being Claude-only and becomes a portable, single-source-of-truth project:

- **Runs on more platforms.** Native install for **Hermes Agent** (same open `SKILL.md` standard) via `scripts/sync-hermes-skills.py`, plus ready-to-paste **ChatGPT** and **Gemini** exports generated from every skill.
- **One source, many targets.** `scripts/build-exports.mjs` renders per-platform files from each `SKILL.md` body — nothing is maintained twice — with a `PLATFORMS` registry that makes adding a tool a few lines, and a CI guard that fails on drift.
- **Three stdlib Python helpers** for flagship skills (sprint capacity, RICE scoring, customer-health scoring).
- **Explicit skill tiers** (`TIERS.md` + `skill-tiers.json`): 46 Production-Ready, a curated Experimental set, Stable as default — surfaced in the README and the playground.
- **Upgraded Skill Playground**: tier filter + badges and a "use this skill in another tool" copy panel.
- **Repo hygiene**: `CHANGELOG.md`, `SKILL-AUTHORING-STANDARD.md`, refreshed `SECURITY.md`, `.gitignore`, and a Related Projects section.

<details>
<summary><strong>Release history — v6.0.0 → v15.0.0</strong> (click to expand)</summary>

### 🆕 What's New in v15.0.0 — Skill Playground (browser UI) 🌐

Run any skill **without installing anything** — a zero-backend web app that executes skills in your browser with your own Claude API key. Tile gallery with search and bundle filter, click-to-run forms auto-generated from each skill's inputs, live streaming output with copy / download, and an auto-deploy to GitHub Pages on every push to `main`. **▶ Live: [mohitagw15856.github.io/pm-claude-skills](https://mohitagw15856.github.io/pm-claude-skills/)**

### 🆕 What's New in v14.0.0 — Writers & Content Creators + 7 Community Skills

**12 new community-inspired skills across 4 bundles:**

### New profession: ✍️ Writers & Content Creators (`pm-writers`)

| Skill | What It Does |
|---|---|
| **Instagram Post Downloader** 🆕 | Downloads Instagram images and carousels as high-res files; stitches carousel slides into a single PDF |
| **AEO Optimizer** 🆕 | Restructures articles for AI citation — rewrites H2s as questions, adds 50–80 word answer capsules, audits paragraph length and trust signals |
| **Thumbnail Creator** 🆕 | Generates brand-aligned thumbnail candidates via Gemini API from article copy; Claude evaluates results via computer vision |
| **Substack Notes Scraper** 🆕 | Scrapes Substack Notes engagement data (likes, comments, restacks) and exports a formatted .xlsx with filters and conditional formatting |
| **Notes Humanizer** 🆕 | Strips AI writing patterns (em dashes, filler phrases, uniform rhythm) and injects genuine human signals — opinion, varied rhythm, specific detail |

### Extended: `pm-cross` (+3 skills)

| Skill | What It Does |
|---|---|
| **Sycophancy Challenger** 🆕 | Flips Claude's default — argues the strongest case *against* your idea first, holds its position under pushback, and only backs down with new evidence |
| **Last 30 Days Research** 🆕 | Searches Reddit, X, and the web for the last 30 days on any topic and returns a structured report: consensus, disagreements, pain points, and signal confidence |
| **NotebookLM Connector** 🆕 | Automates NotebookLM from Claude Code via Chrome extension — create notebooks, add sources, generate mindmaps and audio overviews |

### Extended: `pm-operations` (+2 skills)

| Skill | What It Does |
|---|---|
| **Email Triage** 🆕 | Reads Gmail for a configurable window, filters out receipts/notifications, and surfaces only what needs a reply or decision — with priority, urgency, and a reply starter |
| **Morning Intelligence** 🆕 | 15-question interview that writes a personalised master prompt for your morning news brief, ready to drop into a Cowork Scheduled Task or Claude Code Routine |

### Extended: `pm-engineering` (+2 skills — for Claude Code users)

| Skill | What It Does |
|---|---|
| **Context Mode** 🆕 | Solves Claude Code context bloat and memory loss — filters raw command output and maintains a session log so Claude resumes exactly where it left off after a reset |
| **Claude Superpowers** 🆕 | Forces Claude Code to plan before coding, work in isolation, write tests first, and review its own work twice — from 60% first pass to 80%+ |

The library now includes **167 skills** across **18 professions** + 4 working agent templates.

---

### 🆕 What's New in v13.0.0 — Social Media Profession

**5 new skills — a complete Social Media profession bundle:**

| Skill | Bundle | What It Does |
|---|---|---|
| **Social Media Audit** 🆕 | pm-social | Scored audit across all platforms — profile completeness, content performance, competitive benchmarking, and a prioritised action plan |
| **Influencer Brief** 🆕 | pm-social | Complete creator partnership brief with deliverables, creative guidelines, approval workflow, commercial terms, and campaign measurement |
| **Community Management Playbook** 🆕 | pm-social | Response frameworks, moderation rules, escalation tiers, DM templates, tone-of-voice guidance, and community health metrics |
| **Social Ad Campaign** 🆕 | pm-social | Full-funnel paid social campaign plan with audience targeting, ad set architecture, copy for every format (video, static, carousel, lead gen), budget allocation, and A/B testing plan |
| **Viral Content Framework** 🆕 | pm-social | Psychology of sharing, 6 proven hook formulas, 5 content structures, platform-specific playbooks for LinkedIn/TikTok/Instagram/X/YouTube, and a repeatable content testing system |

The library now includes **167 skills** across **18 professions** + 4 working agent templates.

Install the new bundle:

claude plugin install pm-social@pm-claude-skills


---

### 🆕 What's New in v12.0.0 — 150 Skills Milestone

**15 new skills across 10 bundles:**

| Skill | Bundle | What It Does |
|---|---|---|
| **Cohort Analysis** 🆕 | pm-data | Retention curves, LTV projection, behavioural segmentation, and churn leading indicators — with SQL reference queries |
| **Data Pipeline Spec** 🆕 | pm-data | ETL/ELT pipeline design with sources, transforms, SLAs, DQ rules, error handling, and security/compliance notes |
| **Renewal Playbook** 🆕 | pm-cs | Renewal brief with health snapshot, stakeholder map, value story, commercial scenarios, objection responses, and a 16-week timeline |
| **Customer Success Plan** 🆕 | pm-cs | Joint success plan with business goals, success metrics, milestone roadmap, mutual commitments, and escalation path |
| **360-Degree Feedback Template** 🆕 | pm-people | Either a complete survey instrument with GWT acceptance criteria, or a structured narrative feedback report with themes and development actions |
| **Team Health Check** 🆕 | pm-people | Spotify-model health assessment across 7 dimensions — delivery, safety, morale, speed, purpose, and collaboration — with facilitation guide |
| **Risk Register** 🆕 | pm-operations | L×I risk scoring, RAG heat map, top-risk executive summary, and per-risk mitigation and contingency plans |
| **RACI Matrix** 🆕 | pm-operations | Complete RACI with role definitions, decision map, anti-pattern guide, and a communication template for all involved teams |
| **Social Media Strategy** 🆕 | pm-gtm | Audience profile, platform rationale, content pillars, posting cadence, tone of voice, KPIs, and a 4-week starter calendar |
| **Product Positioning Doc** 🆕 | pm-gtm | April Dunford-style positioning doc with category, target customer, competitive alternatives, differentiation, proof points, messaging hierarchy, and persona messaging |
| **Customer Journey Map** 🆕 | pm-discovery | Stage-by-stage journey from awareness to advocacy with touchpoints, emotions, pain points, an emotion curve, and prioritised opportunities |
| **User Story Writer** 🆕 | pm-delivery | Production-ready user stories with Given/When/Then ACs, edge cases, out-of-scope, definition of done, and epic decomposition |
| **AI Ethics Review** 🆕 | pm-advanced | Structured ethical review covering fairness, bias, transparency, privacy, safety, accountability, and societal impact — with risk tier and pre-deployment checklist |
| **Partnership Proposal** 🆕 | pm-sales | B2B partnership proposal with mutual value, commercial model, joint GTM plan, governance, and risks |
| **Design System Audit** 🆕 | pm-design | Component coverage audit, token consistency, documentation quality, WCAG 2.2 accessibility, adoption barriers, and a remediation roadmap |

The library now includes **150 skills** across **16 professions** + 4 working agent templates.

---

### 🆕 What's New in v10.0.0

**Two star milestones unlocked — 8 new skills shipped:**

**Customer Success bundle (250 ⭐ milestone):**

| Skill | Bundle | What It Does |
|---|---|---|
| **Customer Health Scorecard** 🆕 | pm-cs | Weighted health score across adoption, engagement, outcomes, support, and commercial — with RAG status and renewal forecast |
| **QBR Deck** 🆕 | pm-cs | Slide-by-slide quarterly business review structure with talking points, value narrative, and mutual commitments |
| **Escalation Brief** 🆕 | pm-cs | Structured escalation brief for at-risk accounts — root cause, business impact, resolution plan, and decision required |
| **Churn Analysis** 🆕 | pm-cs | Churn rate breakdown by category and segment, early warning signals, and prioritised interventions |

**Engineering expansion (500 ⭐ milestone):**

| Skill | Bundle | What It Does |
|---|---|---|
| **CI/CD Playbook** 🆕 | pm-engineering | Complete pipeline playbook covering every stage, rollback procedures, secrets management, and on-call responsibilities |
| **SLO & Error Budget** 🆕 | pm-engineering | SLI definitions, SLO targets, error budget calculation, burn rate alerts, and error budget policy |
| **Developer Onboarding Doc** 🆕 | pm-engineering | Everything a new engineer needs in their first week — architecture, local setup, testing, deployment, and key contacts |
| **On-Call Runbook** 🆕 | pm-engineering | Per-alert response procedures, escalation matrix, diagnostic cheat sheet, and handoff template |

The library now includes **114 skills** across **16 professions** + 4 working agent templates.


| Skill | Bundle | What It Does |
|---|---|---|
| **Debugging Log Analyser** 🆕 | pm-engineering | Parse stack traces and error logs into a structured root cause diagnosis with a specific fix |
| **PR Description Writer** 🆕 | pm-engineering | Write reviewer-friendly PR descriptions from a diff, commit list, or change summary |
| **System Design Interview** 🆕 | pm-engineering | Structure complete system design answers with capacity estimates, component deep-dives, and trade-offs |
| **Changelog Generator** 🆕 | pm-engineering | Convert git commits into a polished, user-facing changelog following Keep a Changelog format |
| **Test Strategy Doc** 🆕 | pm-engineering | Write a complete test strategy with risk assessment, test types, coverage targets, and P0/P1 test cases |
| **Runbook Writer** 🆕 | pm-engineering | Write operational runbooks for deployments, incidents, and maintenance with exact commands and rollback steps |

The `pm-engineering` bundle now has **10 skills** — the most complete engineering toolkit in the library.

**Read the full story:** [Part 14 — I Rebuilt All 93 Skills and Added 7 More: What 100 Skills Taught Me About What Makes a Great Skill](https://medium.com/product-powerhouse/a-pull-request-made-me-rebuild-all-93-of-my-claude-skills-then-i-added-7-more-16d5fe3e7f85)

---

### 📖 v6.0.0 — 100 Skills Milestone

**7 skills added:**

| Skill | Bundle | What It Does |
|---|---|---|
| **Teaching Lesson Plan** | pm-cross | Structured lesson plans for any subject, audience, or setting — with objectives, activities, and formative assessment |
| **SEO Content Brief** | pm-gtm | Complete SEO briefs with search intent analysis, competitor gaps, content outline, and on-page requirements |
| **Media Pitch** | pm-gtm | Story-first journalist pitches with angle development framework and pitch rules |
| **Change Management Plan** | pm-hr | Full change plan covering stakeholder analysis, communication strategy, training, and adoption metrics |
| **Workshop Facilitation Guide** | pm-operations | Complete facilitation guides with activity instructions, decision protocols, and facilitator moves |
| **Sales Forecasting Model** | pm-sales | Pipeline-based forecast with stage model, scenario analysis, assumption log, and activity sanity check |
| **Tax Planning Checklist** | pm-finance | Year-end tax planning review framework across income, pension, CGT, business reliefs, and ISAs |

</details>

---

## 📚 The Article Series

This repo was built alongside a published article series. Read the full story:

| Part | Title | Link |
|---|---|---|
| Part 1 | Claude Skills: The AI Feature That's Quietly Changing How PMs Work | [Read →](https://medium.com/product-powerhouse/claude-skills-the-ai-feature-thats-quietly-changing-how-product-managers-work-aad5d8d0640a) |
| Part 2 | Claude Skills vs Prompts: How PMs and Developers Can 10x Their AI Productivity | [Read →](https://medium.com/@mohit15856/claude-skills-vs-prompts-how-pms-and-developers-can-10x-their-ai-productivity-facb5eed5b12) |
| Part 3 | 12 Claude Skills for Product Managers: The Complete Toolkit | [Read →](https://medium.com/@mohit15856/12-claude-skills-for-product-managers-the-complete-toolkit-with-skill-files-for-jira-figma-fcc73a4c1e58) |
| Part 4 | Claude Skills: Advanced Guide — What 3 Months of Daily PM Use Actually Taught Me | [Read →](https://medium.com/@mohit15856/claude-skills-advanced-guide-what-3-months-of-daily-pm-use-actually-taught-me-18324d6ef7bc) |
| Part 5 | What Google, Meta and Anthropic Want From PMs — And the Claude Skills That Deliver It | [Read →](https://medium.com/@mohit15856/what-google-meta-and-anthropic-want-from-pms-and-the-claude-skills-that-deliver-it-b0f2b6cd9340) |
| Part 6 | I Tested Anthropic's Skill Creator Plugin on My Own Skills | [Read →](https://medium.com/all-about-claude/i-tested-anthropics-skill-creator-plugin-on-my-own-skills-here-s-what-i-found-23ad406b0825) |
| Part 7 | 33 Claude Skills for PMs Are Now in the Claude Code Marketplace | [Read →](https://medium.com/product-powerhouse/33-claude-skills-for-pms-are-now-in-the-claude-code-marketplace-heres-how-to-install-them-7968ab6bb1e1) |
| Part 8 | I Added 20 New Claude Skills Beyond Product Management | [Read →](https://medium.com/product-powerhouse/i-built-20-new-claude-skills-for-every-profession-heres-the-full-library-50278e00bf72) |
| Part 9 | 80 Claude Skills for Every Profession — Lawyers, Doctors, Finance, HR, Sales and More | [Read →](https://medium.com/@mohit15856/80-claude-skills-for-every-profession-lawyers-doctors-finance-hr-sales-and-more-3dfde9ec0033) |
| Part 10 | A Day in the Life With 80 Claude Skills | [Read →](https://medium.com/@mohit15856/a-day-in-the-life-with-80-claude-skills-what-actually-gets-triggered-7caf9f5c159e) |
| Part 11 | 10 Figma Claude Skills for PMs and Designers | [Read →](https://medium.com/@mohit15856/10-figma-claude-skills-for-pms-and-designers-the-complete-figma-toolkit-784441d07a78)|
| Part 12 | I Built the Same Skills Library for ChatGPT — Here's What's Different | [Read →](https://medium.com/product-powerhouse/i-built-the-same-skills-library-for-chatgpt-heres-what-s-different-a9305f9c20b9) |
| Part 13 | I Re-Tested My 90 Claude Skills on Opus 4.7 — Here's What Got Better | [Read →](https://medium.com/all-about-claude/i-re-tested-my-90-claude-skills-on-opus-4-7-heres-what-actually-got-better-dd4b9369329e)|
| Part 14 | I Rebuilt All 93 Skills and Added 7 More: What 100 Skills Taught Me About What Makes a Great Skill | [Read →](https://medium.com/product-powerhouse/a-pull-request-made-me-rebuild-all-93-of-my-claude-skills-then-i-added-7-more-16d5fe3e7f85) |
| Part 15 | I’m a Product Manager. I Just Shipped 6 Engineering Skills to My Open-Source Claude Library. | [Read →](https://medium.com/product-powerhouse/im-a-product-manager-i-just-shipped-6-engineering-skills-to-my-open-source-claude-library-8745aaa2ecf9) |
| Part 16 | Anthropic Just Released 10 Agent Templates. Here’s the First One I Built Using My 106 Skills. | [Read →](https://medium.com/product-powerhouse/anthropic-just-released-10-agent-templates-heres-the-first-one-i-built-using-my-106-skills-a6708f9bd3ea) |

---

## 🏷️ Skill Tiers — Start With the Strongest

A 170+ skill library doesn't have 170 equally-mature skills, and pretending otherwise
wastes your time. Skills are tiered honestly so you can start with the best work:

- 🟢 **Production-Ready (46)** — battle-tested, stable output, used in real work. Includes the three skills with computed Python helpers (sprint planning, RICE, customer health). **Start here.**
- 🔵 **Stable** — solid, reliable, well-structured; the default for most of the library.
- 🟡 **Experimental** — newer or dependent on an external tool/API/scrape (Gemini, Gmail, browser automation, social scraping). Useful, but more setup and more moving parts.

**👉 Full breakdown: [TIERS.md](TIERS.md)** — every Production-Ready and Experimental skill listed by name.

If you're new, install `pm-essentials` and try a couple of Production-Ready skills before going wide.

---

## 🗂️ All 167 Skills

The [Plugin Directory](#-plugin-directory) above summarises every bundle. Expand below for the full per-skill breakdown with folder paths.

<details>
<summary><strong>Browse all 167 skills by profession</strong> (click to expand)</summary>

### 🛠️ Product Management (Skills 1–37)
**Bundles:** `pm-essentials` · `pm-discovery` · `pm-planning` · `pm-delivery` · `pm-analytics` · `pm-strategy` · `pm-advanced` · `pm-rituals`

> The original toolkit covering the full PM lifecycle — discovery, prioritisation, delivery, strategy, stakeholder comms, and weekly rituals. Now includes Word tracked changes and PowerPoint slide auditing.

| # | Skill | What It Does |
|---|---|---|
| 1–6 | **pm-essentials** | PRD Template, Meeting Notes, Stakeholder Update, User Research Synthesis, Competitive Analysis, **Word Doc Tracked Changes** |
| 7–11 | **pm-discovery** | Discovery Interview Guide, Job Story Mapper, User Interview Synthesis, Assumption Mapper, **Customer Journey Map** 🆕 |
| 12–17 | **pm-planning** | OKR Builder, Feature Prioritisation (RICE/MoSCoW/Kano/ICE), Roadmap Presentation, Pricing Strategy, RICE Impact Matrix, Roadmap Narrative |
| 18–26 | **pm-delivery** | Sprint Planning, Technical Spec, A/B Test Planner, Go-to-Market Planner, Launch Checklist, Sprint Brief, Retro, PPTX Slide Auditor, **User Story Writer** 🆕 |
| 27–29 | **pm-analytics** | Data Analysis Standard, Retention Analysis, Product Health Analysis |
| 30–35 | **pm-strategy** | Competitor Signal Tracker, Competitive Intelligence Monitor, Stakeholder Influence Mapper, Strategic Narrative, Executive Update, Ambiguity Resolver |
| 36–37 | **pm-advanced** | AI Product Canvas, Multi-Source Signal Synthesiser, Experiment Designer, Design Handoff Brief, **AI Ethics Review** 🆕 |

> See [Part 7 article](https://medium.com/product-powerhouse/33-claude-skills-for-pms-are-now-in-the-claude-code-marketplace-heres-how-to-install-them-7968ab6bb1e1) for full PM skills detail.

---

### 📣 Marketing & GTM (Skills 38–45)
**Bundle:** `pm-gtm`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 38 | **Go-To-Market** | `skills/go-to-market/` | Positioning statements, messaging pillars, feature/benefit mapping, role-specific use cases |
| 39 | **Content Calendar** | `skills/content-calendar/` | Multi-channel content calendars with opening hooks, formats, and repurposing map |
| 40 | **Competitor Teardown** | `skills/competitor-teardown/` | Full competitive analysis: positioning map, feature comparison, messaging gaps, SWOT, recommendations |
| 41 | **Email Campaign** | `skills/email-campaign/` | Sequenced email campaigns with subject lines, preview text, body copy, and CTAs |
| 42 | **SEO Content Brief** | `skills/seo-content-brief/` | Complete SEO briefs with search intent, competitor gap analysis, content outline, and on-page requirements |
| 43 | **Media Pitch** | `skills/media-pitch/` | Story-first journalist pitches with angle development framework and pitch writing rules |
| 44 | **Social Media Strategy** 🆕 | `skills/social-media-strategy/` | Audience profile, platform rationale, content pillars, posting cadence, KPIs, and a 4-week starter calendar |
| 45 | **Product Positioning Doc** 🆕 | `skills/product-positioning-doc/` | April Dunford-style positioning with category, differentiation, proof points, messaging hierarchy, and persona messaging |

---

### 👩‍💻 Engineering & Tech (Skills 46–80, 166–167)
**Bundle:** `pm-engineering`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 46 | **Code Review Checklist** | `skills/code-review-checklist/` | Tailored PR review checklists by language, type, and risk level |
| 47 | **Incident Postmortem** | `skills/incident-postmortem/` | Blameless postmortems with timeline, RCA, impact, and action items |
| 48 | **API Docs Writer** | `skills/api-docs-writer/` | Developer-facing API docs: endpoints, parameters, response schemas, code examples |
| 49 | **Architecture Decision Record** | `skills/architecture-decision-record/` | ADRs with context, options considered, decision, consequences, and risks |
| 50 | **Debugging Log Analyser** | `skills/debugging-log-analyser/` | Parse stack traces and error logs into a structured root cause diagnosis with a specific fix |
| 51 | **PR Description Writer** | `skills/pr-description-writer/` | Write reviewer-friendly PR descriptions from a diff, commit list, or change summary |
| 52 | **System Design Interview** | `skills/system-design-interview/` | Structure complete system design answers with capacity estimates, component deep-dives, and trade-offs |
| 53 | **Changelog Generator** | `skills/changelog-generator/` | Convert git commits into a polished, user-facing changelog following Keep a Changelog format |
| 54 | **Test Strategy Doc** | `skills/test-strategy-doc/` | Write a complete test strategy with risk assessment, test types, coverage targets, and P0/P1 test cases |
| 55 | **Runbook Writer** | `skills/runbook-writer/` | Write operational runbooks for deployments, incidents, and maintenance with exact commands and rollback steps |
| 56 | **CI/CD Playbook** | `skills/cicd-playbook/` | Complete pipeline playbook covering every stage, rollback procedures, secrets management, and on-call responsibilities |
| 57 | **SLO & Error Budget** | `skills/slo-error-budget/` | SLI definitions, SLO targets, error budget calculation, burn rate alerts, and error budget policy |
| 58 | **Developer Onboarding Doc** | `skills/developer-onboarding-doc/` | Everything a new engineer needs in their first week — architecture, local setup, testing, deployment, and key contacts |
| 59 | **On-Call Runbook** | `skills/oncall-runbook/` | Per-alert response procedures, escalation matrix, diagnostic cheat sheet, and handoff template |
| 60 | **Security Threat Model** 🆕 | `skills/security-threat-model/` | STRIDE-based threat model with asset register, trust boundaries, per-component threat enumeration, risk scores, and mitigations |
| 61 | **Performance Budget** 🆕 | `skills/performance-budget/` | Performance budgets for Core Web Vitals and backend latency SLOs with CI enforcement and breach response policy |
| 62 | **Database Schema Design** 🆕 | `skills/database-schema-design/` | Database schema documentation with ER diagram, DDL definitions, index strategy, and access pattern analysis |
| 63 | **Database Migration Plan** 🆕 | `skills/database-migration-plan/` | Safe zero-downtime migration plan using expand-contract pattern with per-step rollback and data validation queries |
| 64 | **Technical Debt Register** 🆕 | `skills/technical-debt-register/` | Debt inventory with business impact scoring, effort estimates, priority matrix, and quarterly resolution roadmap |
| 65 | **RFC Writer** 🆕 | `skills/rfc-writer/` | Engineering Request for Comments covering problem, proposed solution, alternatives-with-rejection-reasons, and rollout plan |
| 66 | **Capacity Planning** 🆕 | `skills/capacity-planning/` | Traffic forecasts, resource requirements per tier, scaling strategy, cost projections, and infrastructure action roadmap |
| 67 | **Load Testing Plan** 🆕 | `skills/load-testing-plan/` | Load test plan with scenario definitions (baseline/stress/spike/soak), k6/Locust skeleton, thresholds, and CI gates |
| 68 | **Disaster Recovery Plan** 🆕 | `skills/disaster-recovery-plan/` | DR plan with RPO/RTO targets, per-scenario runbooks, backup procedures, game day testing, and communication templates |
| 69 | **Feature Flag Guide** 🆕 | `skills/feature-flag-guide/` | Feature flag lifecycle playbook — taxonomy, rollout strategy, monitoring requirements, cleanup policy, and governance |
| 70 | **Dependency Audit** 🆕 | `skills/dependency-audit/` | Dependency audit for CVE vulnerabilities, license compliance, outdated packages, and 30-day remediation plan |
| 71 | **Service Catalog Entry** 🆕 | `skills/service-catalog-entry/` | Microservice catalog entry with ownership, SLAs, API contract, data classification, and operational runbook links |
| 72 | **Monitoring Setup Guide** 🆕 | `skills/monitoring-setup-guide/` | Four golden signals applied to a service, alert rules spec, structured log schema, tracing setup, and dashboard layout |
| 73 | **Local Dev Setup** 🆕 | `skills/local-dev-setup/` | Local development setup guide — prerequisites, env vars, dependencies, test commands, and 5 common failure fixes |
| 74 | **API Versioning Strategy** 🆕 | `skills/api-versioning-strategy/` | API versioning scheme, lifecycle policy, breaking change classification table, deprecation process, and migration guide template |
| 75 | **Infra-as-Code Review** 🆕 | `skills/infra-as-code-review/` | IaC review for Terraform/CloudFormation/Pulumi — security, naming, state, cost, and drift risk with severity-classified findings |
| 76 | **Engineering Weekly Report** 🆕 | `skills/engineering-weekly-report/` | Weekly engineering status in a consistent format — shipped/in-progress/blocked, metrics, decisions, risks, and next week |
| 77 | **Tech Radar** 🆕 | `skills/tech-radar/` | ThoughtWorks-format technology radar with Adopt/Trial/Assess/Hold quadrants, per-blip rationale, and maintenance process |
| 78 | **Sprint Velocity Analysis** 🆕 | `skills/sprint-velocity-analysis/` | Velocity trend analysis, completion rate patterns, blocker frequency, improvement recommendations, and capacity forecast |
| 79 | **Microservices Decomposition** 🆕 | `skills/microservices-decomposition/` | Domain-driven service boundary design with bounded context map, communication patterns, data ownership, and strangler fig migration plan |
| 80 | **Engineering Hiring Rubric** 🆕 | `skills/engineering-hiring-rubric/` | Technical interview rubric with level expectations, coding scorecard, system design guide, behavioural question bank, and debrief template |
| 166 | **Context Mode** 🆕 | `skills/context-mode/` | Filters command output noise and maintains a session log so Claude resumes exactly where it left off after a context reset |
| 167 | **Claude Superpowers** 🆕 | `skills/claude-superpowers/` | Forces Claude Code to plan first, work in isolation, write tests before code, and double-review its own output — consistently better first passes |

---

### 🤝 Customer Success (Skills 76–81)
**Bundle:** `pm-cs`

> Install:

claude plugin install pm-cs@pm-claude-skills


| # | Skill | Folder | What It Does |
|---|---|---|---|
| 76 | **Customer Health Scorecard** | `skills/cs-health-scorecard/` | Weighted health score across adoption, engagement, outcomes, support, and commercial — RAG status and renewal forecast |
| 77 | **QBR Deck** | `skills/qbr-deck/` | Slide-by-slide quarterly business review with talking points, value narrative, and mutual commitments |
| 78 | **Escalation Brief** | `skills/cs-escalation-brief/` | Structured brief for at-risk accounts — root cause, business impact, resolution plan, and decision required |
| 79 | **Churn Analysis** | `skills/churn-analysis/` | Churn breakdown by category and segment, early warning signals, and prioritised interventions |
| 80 | **Renewal Playbook** 🆕 | `skills/renewal-playbook/` | Renewal brief with health snapshot, value story, commercial scenarios, objection responses, and 16-week execution timeline |
| 81 | **Customer Success Plan** 🆕 | `skills/customer-success-plan/` | Joint success plan with business goals, success metrics, milestone roadmap, mutual commitments, and escalation path |

---

### 📊 Data & Analytics (Skills 82–87)
**Bundle:** `pm-data`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 82 | **Metrics Framework** | `skills/metrics-framework/` | North Star + metric tree, dashboard tiers, counter-metrics |
| 83 | **SQL Query Explainer** | `skills/sql-query-explainer/` | Explain, optimise, write, and document SQL in plain English |
| 84 | **Dashboard Brief** | `skills/dashboard-brief/` | Complete dashboard spec: KPIs, charts, filters, layout, data requirements |
| 85 | **Chart Data Extractor** | `skills/chart-data-extractor/` | Extract pixel-level data from chart images into structured data tables |
| 86 | **Cohort Analysis** 🆕 | `skills/cohort-analysis/` | Retention curves, LTV projection, behavioural segmentation, churn leading indicators, and SQL reference queries |
| 87 | **Data Pipeline Spec** 🆕 | `skills/data-pipeline-spec/` | ETL/ELT pipeline design with sources, transforms, SLAs, DQ rules, error handling, and compliance notes |

---

### 🧑‍💼 Leadership & People (Skills 88–92)
**Bundle:** `pm-people`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 88 | **Performance Review** | `skills/performance-review/` | Structured reviews from bullet-point notes — self, manager, peer, and upward |
| 89 | **Hiring Rubric** | `skills/hiring-rubric/` | Interview scorecards with competencies, behavioural questions, and panel guide |
| 90 | **Team Offsite Planner** | `skills/team-offsite-planner/` | Full offsite agenda, session facilitation notes, and logistics checklist |
| 91 | **360-Degree Feedback Template** 🆕 | `skills/360-feedback-template/` | Survey instrument with GWT-anchored questions, or a structured narrative report with strengths and development themes |
| 92 | **Team Health Check** 🆕 | `skills/team-health-check/` | Spotify-model assessment across 7 dimensions — delivery, safety, morale, speed, purpose, and collaboration |

---

### 🎨 Design & UX (Skills 93–96)
**Bundle:** `pm-design`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 93 | **UX Research Plan** | `skills/ux-research-plan/` | Research plans with screener, discussion guide, and synthesis framework |
| 94 | **Design Critique** | `skills/design-critique/` | Structured feedback using JTBD, Gestalt principles, and Nielsen's heuristics |
| 95 | **Accessibility Audit** | `skills/accessibility-audit/` | WCAG 2.2 audit with prioritised remediation and quick wins |
| 96 | **Design System Audit** 🆕 | `skills/design-system-audit/` | Audit component coverage, token consistency, documentation quality, WCAG compliance, adoption barriers, and remediation roadmap |

---

### 🏢 Business & Strategy (Skills 97–99)
**Bundle:** `pm-business`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 97 | **Investor Update** | `skills/investor-update/` | Monthly/quarterly investor updates: metrics, highlights, challenges, and asks |
| 98 | **Board Deck Narrative** | `skills/board-deck-narrative/` | Slide-by-slide board presentation structure with narrative beats and talking points |
| 99 | **Job Application** | `skills/job-application/` | Tailored CV summary, ATS keyword optimisation, and cover letter for any JD |

---

### ⚖️ Legal (Skills 100–103)
**Bundle:** `pm-legal`

> ⚠️ All legal skills include a disclaimer. Not a substitute for qualified legal advice.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 100 | **Contract Review** | `skills/contract-review/` | Structured review with key terms, flagged clauses, risk rating, and plain English summary |
| 101 | **NDA Analyser** | `skills/nda-analyser/` | Clause-by-clause NDA analysis with risk flags and negotiation checklist |
| 102 | **Legal Brief** | `skills/legal-brief/` | Legal memos and argument outlines in IRAC format (Issue, Rule, Application, Conclusion) |
| 103 | **Compliance Checklist** | `skills/compliance-checklist/` | GDPR, SOC 2, ISO 27001, FCA, HIPAA compliance checklists with prioritised gap analysis |

---

### 💰 Finance (Skills 104–108)
**Bundle:** `pm-finance`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 104 | **Financial Model Narrative** | `skills/financial-model-narrative/` | Turns P&L and model outputs into board-ready written narratives |
| 105 | **Budget Variance Analysis** | `skills/budget-variance-analysis/` | Variance table with root cause commentary and management summary |
| 106 | **Investor Pitch Deck** | `skills/investor-pitch-deck/` | Slide-by-slide pitch deck structure with what each slide must prove |
| 107 | **Financial Due Diligence** | `skills/financial-due-diligence/` | DD document request list, analytical questions, and red flags checklist |
| 108 | **Tax Planning Checklist** | `skills/tax-planning-checklist/` | Year-end tax planning framework across income, pension, CGT, business reliefs, and ISAs |

---

### 👥 HR (Skills 109–113)
**Bundle:** `pm-hr`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 109 | **Job Description Writer** | `skills/job-description-writer/` | Inclusive, structured JDs with built-in language review and salary range nudge |
| 110 | **Onboarding Plan** | `skills/onboarding-plan/` | 30/60/90-day plans with week-by-week structure, milestones, and manager checklist |
| 111 | **Employee Engagement Survey** | `skills/employee-engagement-survey/` | Survey design + results analysis mode with eNPS and action planning template |
| 112 | **Redundancy Consultation** | `skills/redundancy-consultation/` | Process timeline, at-risk letter, consultation script, and confirmation letter — UK law |
| 113 | **Change Management Plan** | `skills/change-management-plan/` | Full change plan covering stakeholder analysis, communication strategy, training, and adoption metrics |

---

### 🤝 Sales (Skills 114–119)
**Bundle:** `pm-sales`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 114 | **Sales Battlecard** | `skills/sales-battlecard/` | One-page competitive battlecard with objection responses and landmine questions |
| 115 | **Discovery Call Prep** | `skills/discovery-call-prep/` | Call brief with research summary, hypothesis, structured questions, and success criteria |
| 116 | **Proposal Writer** | `skills/proposal-writer/` | Commercial proposals structured around the prospect's problem, not the product |
| 117 | **Account Plan** | `skills/account-plan/` | Strategic account plan with relationship map, whitespace analysis, risks, and 90-day actions |
| 118 | **Sales Forecasting Model** | `skills/sales-forecasting-model/` | Pipeline-based forecast with stage model, scenario analysis, assumption log, and activity sanity check |
| 119 | **Partnership Proposal** 🆕 | `skills/partnership-proposal/` | B2B partnership proposal with mutual value, commercial model, joint GTM plan, governance, and risk register |

---

### ⚙️ Operations (Skills 120–126, 164–165)
**Bundle:** `pm-operations`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 120 | **Process Documentation** | `skills/process-documentation/` | Clear process docs with steps, roles, edge cases — followable by a new starter |
| 121 | **SOP Writer** | `skills/sop-writer/` | Formal, audit-ready SOPs with version control, quality checks, and non-conformance process |
| 122 | **Vendor Evaluation** | `skills/vendor-evaluation/` | Weighted vendor scorecard, RFP questions, reference check template, and recommendation |
| 123 | **Project Status Report** | `skills/project-status-report/` | RAG status reports with milestone progress, issues, risks, and decisions required |
| 124 | **Workshop Facilitation Guide** | `skills/workshop-facilitation-guide/` | Complete facilitation guides with activity instructions, decision protocols, and facilitator moves |
| 125 | **Risk Register** 🆕 | `skills/risk-register/` | L×I risk scoring, RAG heat map, top-risk executive summary, and per-risk mitigation and contingency plans |
| 126 | **RACI Matrix** 🆕 | `skills/raci-matrix/` | RACI with role definitions, decision map, anti-pattern guide, and a communication template for all teams |
| 164 | **Email Triage** 🆕 | `skills/email-triage/` | Reads Gmail for a configurable window and surfaces only what needs action — priority-ranked with urgency ratings and reply starters |
| 165 | **Morning Intelligence** 🆕 | `skills/morning-intelligence/` | 15-question interview that writes a personalised master prompt for your daily news brief, ready for Cowork Scheduled Tasks or Claude Code Routines |

---

### 🏥 Research & Healthcare (Skills 127–130)
**Bundle:** `pm-research`

> ⚠️ Healthcare skills are for documentation and educational purposes only. All clinical content must be reviewed by a qualified professional.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 127 | **Clinical Case Summary** | `skills/clinical-case-summary/` | SBAR handovers, SOAP notes, and case reports for educational and documentation use |
| 128 | **Research Protocol** | `skills/research-protocol/` | Complete study protocols with objectives, methodology, ethics, and analysis plan |
| 129 | **Patient Communication** | `skills/patient-communication/` | Plain English patient letters, leaflets, and results communications at Grade 6 reading level |
| 130 | **Literature Review** | `skills/literature-review/` | Thematically organised literature reviews with synthesis, critical analysis, and gap identification |

---

### 🌐 Cross-Profession (Skills 131–134, 161–163)
**Bundle:** `pm-cross`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 131 | **Press Release** | `skills/press-release/` | Journalist-ready press releases with headline rules, boilerplate, and journalist test |
| 132 | **Grant Proposal** | `skills/grant-proposal/` | Complete grant applications aligned to funder priorities with budget narrative |
| 133 | **Executive Summary** | `skills/executive-summary/` | Decision-ready executive summaries with bottom line upfront, adapted for any audience |
| 134 | **Teaching Lesson Plan** | `skills/teaching-lesson-plan/` | Complete lesson plans for any subject, audience, or setting — with objectives, activities, and formative assessment |
| 161 | **Sycophancy Challenger** 🆕 | `skills/sycophancy-challenger/` | Argues the strongest case *against* your idea first — a genuine thinking partner that holds its position under pressure |
| 162 | **Last 30 Days Research** 🆕 | `skills/last-30-days-research/` | Searches Reddit, X, and the web for the last 30 days on any topic and returns consensus, disagreements, pain points, and signal confidence |
| 163 | **NotebookLM Connector** 🆕 | `skills/notebooklm-connector/` | Automates NotebookLM via Chrome extension — create notebooks, add sources, generate mindmaps and audio overviews from Claude Code |

---

### 🖼️ Figma (Skills 135–144)
**Bundle:** `pm-figma`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 135 | **Figma Component Audit** | `skills/figma-component-audit/` | Audit component library for naming issues, coverage gaps, and variant completeness |
| 136 | **Figma Design Brief** | `skills/figma-design-brief/` | Convert PRDs and feature requests into structured Figma design briefs |
| 137 | **Figma Annotation Guide** | `skills/figma-annotation-guide/` | Generate complete developer handoff annotations covering all states and edge cases |
| 138 | **Figma Design Review** | `skills/figma-design-review/` | PM design review against requirements with explicit approval status |
| 139 | **Figma User Flow Planner** | `skills/figma-user-flow-planner/` | Map all screens, states, and decision points before opening Figma |
| 140 | **Figma Variant Matrix** | `skills/figma-variant-matrix/` | Define all component variants, properties, and states before building |
| 141 | **Figma Spacing System** | `skills/figma-spacing-system/` | Design a complete spacing scale, grid, and token system |
| 142 | **Figma Prototype Plan** | `skills/figma-prototype-plan/` | Plan prototype scope, interactions, and test task scripts for user testing |
| 143 | **Figma Design QA** | `skills/figma-design-qa/` | Pre-handoff QA checklist covering file hygiene, states, accessibility, and handoff readiness |
| 144 | **Figma Design Critique (PM)** | `skills/figma-design-critique-pm/` | PM-perspective design critique focused on product outcomes, not aesthetics |

claude plugin install pm-figma@pm-claude-skills


---

### 📅 PM Rituals (Skills 145–150)
**Bundle:** `pm-rituals`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 145 | **PM Weekly Review** | `skills/pm-weekly-review/` | Weekly PM review and planning ritual — metrics, shipping progress, blockers, and next week's priorities |

---

### 📱 Social Media (Skills 151–155)
**Bundle:** `pm-social`

> Install:

```
claude plugin install pm-social@pm-claude-skills
```

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 151 | **Social Media Audit** 🆕 | `skills/social-media-audit/` | Scored audit across all platforms — profile completeness, content performance, competitive benchmarking, and a prioritised action plan with 30-day quick wins |
| 152 | **Influencer Brief** 🆕 | `skills/influencer-brief/` | Complete creator partnership brief with deliverables spec, creative guidelines, key messages, approval workflow, commercial terms, and campaign measurement |
| 153 | **Community Management Playbook** 🆕 | `skills/community-management-playbook/` | Response frameworks, moderation rules, escalation tiers, DM templates, tone-of-voice guidance, platform-specific notes, and community health metrics |
| 154 | **Social Ad Campaign** 🆕 | `skills/social-ad-campaign/` | Full-funnel paid social plan with audience targeting, ad set architecture, copy for every format (video, static, carousel, lead gen), budget allocation, bidding strategy, and A/B testing plan |
| 155 | **Viral Content Framework** 🆕 | `skills/viral-content-framework/` | Psychology of sharing, 6 proven hook formulas, 5 content structures, platform-specific playbooks for LinkedIn/TikTok/Instagram/X/YouTube, and a repeatable content testing system |

---

### ✍️ Writers & Content Creators (Skills 156–160)
**Bundle:** `pm-writers`

> Install:

```
claude plugin install pm-writers@pm-claude-skills
```

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 156 | **Instagram Post Downloader** 🆕 | `skills/instagram-post-downloader/` | Downloads Instagram images and full carousels as high-res files; stitches carousel slides into a single PDF. Requires `*.cdninstagram.com` on domain allowlist |
| 157 | **AEO Optimizer** 🆕 | `skills/aeo-optimizer/` | Restructures any article for AI citation — rewrites H2s as questions, adds 50–80 word answer capsules under each, audits paragraph length, and flags trust signals |
| 158 | **Thumbnail Creator** 🆕 | `skills/thumbnail-creator/` | Generates brand-aligned thumbnail candidates via Gemini API; Claude evaluates results via computer vision and returns ranked candidates with rationale |
| 159 | **Substack Notes Scraper** 🆕 | `skills/substack-notes-scraper/` | Scrapes Substack Notes and exports likes, comments, and restacks to a formatted .xlsx with frozen headers, filters, and top-performer highlighting |
| 160 | **Notes Humanizer** 🆕 | `skills/notes-humanizer/` | Strips AI writing patterns (em dashes, filler phrases, uniform rhythm) across 3 phases: audit, strip, inject — returns side-by-side comparison and clean final text |

</details>

---

## ❤️ Sponsor This Work

Building and maintaining 167 skills across 26 bundles takes real time — testing skills against new model releases, building new ones from community requests, writing the article series, and keeping documentation current.

If these skills save you time at work, consider sponsoring:

**[💖 Become a Sponsor →](https://github.com/sponsors/mohitagw15856)**

Sponsorships from $5/month (coffee tier) up to $500/month (sustaining sponsor with logo placement). Every sponsor directly funds:

- New skills based on community votes in [SKILL_REQUEST.md](SKILL_REQUEST.md)
- Updates to existing skills when new Claude models ship
- Continued free, ad-free Medium articles documenting what works
- Quality improvements across the library

Higher tiers include custom skill development for your team, direct access for support, and logo placement in this README. See the [sponsor page](https://github.com/sponsors/mohitagw15856) for full tier details.

---

## 🤝 Contributing — Add Your Skill

This is an open-source community library. If you've built a skill that saves you time, share it here.

**Found a bug?** [Open a bug report →](../../issues/new?template=bug-report.md) — use the template so it's easy to triage.

**How to contribute:**

1. Fork this repo
2. Scaffold a skill that already passes validation: `npm run new-skill -- --name your-skill-name`
   (or copy the template below into `skills/your-skill-name/SKILL.md`)
3. Fill in the sections, then check it: `npm run skillcheck`
4. Raise a pull request with a short description of what the skill does and why you built it

> CI runs **SkillCheck** on every PR — `node scripts/skillcheck.mjs` validates structure and must pass.

**SKILL.md template:**
---
name: your-skill-name
description: "One sentence. Use when [trigger condition]. Produces [output description]."
---

# Skill Title

[Instructions for Claude to follow when this skill is invoked]


**What makes a good skill:**
- Solves a recurring professional workflow (not a one-off task)
- Has a clear trigger description so Claude knows when to activate it
- Produces consistent, structured output
- Works without needing extensive setup or context

**Before you submit:** read the **[Skill Authoring Standard](SKILL-AUTHORING-STANDARD.md)** — it documents the exact section structure, frontmatter rules, and quality bar every skill in this library follows (including optional stdlib-only helper scripts).

**Skills wishlist** (most requested — up for grabs):

| Skill | Profession | Use Case |
|---|---|---|
| `grant-report` | Non-profit | Funder progress reports against grant objectives |
| `architectural-spec` | Architecture | Project specifications and technical drawing briefs |
| `clinical-guideline-summary` | Healthcare | Plain English summaries of clinical guidelines |
| `pitch-deck-feedback` | Startup | Investor-perspective critique of a pitch deck |
| `board-minutes` | Governance | Formal board meeting minutes from discussion notes |

Have a skill idea? Add it to [SKILL_REQUEST.md](SKILL_REQUEST.md), [open an issue](../../issues), or raise it in [Discussions](../../discussions). Most-voted requests get built first.

**Contributors** get credited in this README and in the article series. 🙌

---

## 📦 All Plugin Bundles

Install the whole library or just the bundles you need:

# Install everything
/plugin marketplace add mohitagw15856/pm-claude-skills

# Install by profession
claude plugin install pm-essentials@pm-claude-skills

claude plugin install pm-discovery@pm-claude-skills

claude plugin install pm-planning@pm-claude-skills

claude plugin install pm-delivery@pm-claude-skills

claude plugin install pm-analytics@pm-claude-skills

claude plugin install pm-strategy@pm-claude-skills

claude plugin install pm-advanced@pm-claude-skills

claude plugin install pm-rituals@pm-claude-skills

claude plugin install pm-gtm@pm-claude-skills

claude plugin install pm-engineering@pm-claude-skills    # Engineering (35 skills)

claude plugin install pm-cs@pm-claude-skills             # Customer Success

claude plugin install pm-data@pm-claude-skills

claude plugin install pm-people@pm-claude-skills

claude plugin install pm-design@pm-claude-skills

claude plugin install pm-business@pm-claude-skills

claude plugin install pm-legal@pm-claude-skills

claude plugin install pm-finance@pm-claude-skills

claude plugin install pm-hr@pm-claude-skills

claude plugin install pm-sales@pm-claude-skills

claude plugin install pm-operations@pm-claude-skills

claude plugin install pm-research@pm-claude-skills

claude plugin install pm-cross@pm-claude-skills

claude plugin install pm-figma@pm-claude-skills

claude plugin install pm-social@pm-claude-skills         # Social Media 🆕

claude plugin install pm-writers@pm-claude-skills        # Writers & Content Creators 🆕

---

## 🤖 Companion Repository — ChatGPT Custom GPTs

If you use ChatGPT instead of Claude Code, there's a companion repo with the same professional frameworks built as Custom GPT system prompts:

**[professional-gpt-library](https://github.com/mohitagw15856/professional-gpt-library)** — 10 starter GPTs across 8 professions, MIT licence.

Read the full breakdown: [Part 12 — I Built the Same Skills Library for ChatGPT](https://medium.com/product-powerhouse/i-built-the-same-skills-library-for-chatgpt-heres-what-s-different-a9305f9c20b9)

---

## 🔗 Related Projects

Claude Skills is a fast-growing open ecosystem. If this library doesn't have what you
need, these community projects are worth a look — and if you maintain one of the lists
below, a reciprocal link is always welcome. 🙌

**Other skill libraries**

- **[alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)** — a large engineering-leaning library (300+ skills, agents, and commands) with explicit multi-tool support across Claude Code, Codex, Gemini CLI, Cursor, and more.

**Curated "awesome" lists** (great for discovery)

- **[hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)** — the broad list of skills, hooks, slash-commands, and plugins for Claude Code.
- **[travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)** — curated Claude Skills, resources, and tools.
- **[karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills)** — verified skills for Claude Code, Claude.ai, and the API.
- **[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)** — skills and tools for customizing Claude workflows.

**From this author**

- **[professional-gpt-library](https://github.com/mohitagw15856/professional-gpt-library)** — the same frameworks rebuilt as ChatGPT Custom GPTs.

> Maintain a Claude Skills project and want to be listed here? [Open a PR](../../pulls) or an [issue](../../issues).

---

## 🛠️ Custom Skills for Your Team

The 155 skills in this library are built for general professional workflows. But the most powerful version of Claude Skills is one built specifically for *your* team — your templates, your terminology, your processes, your quality standards.

**What custom skills look like in practice:**

- A law firm's contract review skill trained on their specific clause library and risk tolerance
- A SaaS company's sprint brief skill that knows their engineering conventions and definition of done
- A finance team's board pack skill that follows their exact narrative structure and slide format
- An HR team's job description skill that reflects their values language and includes their specific benefits

The difference between a generic skill and one built for your context is significant. Generic skills eliminate the blank page. Custom skills eliminate the rework.

**If you want skills built for your team's specific workflows — [get in touch](mailto:mohit15856@gmail.com).**

Include a brief description of your team, the workflows you want to automate, and the tools you use. I'll come back to you within 48 hours.

---

## 📖 How Skills Work

Skills are markdown files that Claude reads dynamically. When you describe a task, Claude scans available skill descriptions (~100 tokens) and loads the full skill only when relevant. This means:

- Skills are efficient — they only use tokens when triggered
- Multiple skills can coexist without slowing Claude down
- Personal skills (`~/.claude/skills/`) work across all your projects
- Plugin skills install via the Claude Code marketplace with one command

Learn more: [Anthropic's Skills documentation](https://code.claude.com/docs/en/skills)

---

## ⭐ Star Milestones

Stars unlock the next wave of skills. Here's the roadmap:

| Milestone | Unlocks | Status |
|---|---|---|
| 100 ⭐ | 10 Figma skills + quality rebuild across all 93 skills | ✅ Shipped (v6.0.0) |
| 250 ⭐ | 10 Customer Success skills (health scorecard, QBR deck, escalation brief, churn analysis) | ✅ Unlocked — coming in next release |
| 500 ⭐ | 25 Engineering skills (CI/CD playbooks, SLO templates, onboarding docs, debugging patterns, threat models, capacity planning, DR plans, and more) | ✅ Shipped — pm-engineering now 35 skills (v11.0.0) |
| 1000 ⭐ | Full Startup Founder kit (fundraising memo, pitch critique, co-founder equity split) | 🔒 Locked |

**[⭐ Star this repo to unlock the next milestone →](https://github.com/mohitagw15856/pm-claude-skills)**

Want a specific skill built? [Vote or request in SKILL_REQUEST.md](SKILL_REQUEST.md).

### 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mohitagw15856/pm-claude-skills&type=Date)](https://star-history.com/#mohitagw15856/pm-claude-skills&Date)

---

*Built and maintained by [Mohit Aggarwal](https://medium.com/@mohit15856) | [Product Notes publication](https://medium.com/product-powerhouse) | [💖 Sponsor my work](https://github.com/sponsors/mohitagw15856)*
