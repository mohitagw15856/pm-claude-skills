# 🧠 PM Claude Skills — 114 Skills for Every Profession

[![Stars](https://img.shields.io/github/stars/mohitagw15856/pm-claude-skills?style=social)](https://github.com/mohitagw15856/pm-claude-skills/stargazers)
[![Skills](https://img.shields.io/badge/skills-114-blue)](https://github.com/mohitagw15856/pm-claude-skills)
[![Version](https://img.shields.io/badge/version-10.0.0-brightgreen)](https://github.com/mohitagw15856/pm-claude-skills/releases)
[![Install](https://img.shields.io/badge/Install%20in%20Claude%20Code-2%20minutes-orange)](https://github.com/mohitagw15856/pm-claude-skills#-quick-install-2-minutes)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-❤️-ff69b4)](https://github.com/sponsors/mohitagw15856)

> **PM stands for Professional, not just Product Management.**
> 114 Claude Skills + 4 agent templates across 16 professions. Built by a PM, used by everyone.

A community-built library of Claude Skills for professionals across every field — product management, engineering, customer success, marketing, design, legal, finance, HR, sales, operations, research, and more. Each skill is a structured SKILL.md file that teaches Claude how to produce professional-grade outputs for your specific workflows.

**🆕 Latest release (v10.0.0):** Two star milestones unlocked at once — 250 stars brought 4 Customer Success skills, 500 stars brought 4 more Engineering skills. 114 skills across 16 professions.
---

## 🚀 Quick Install (2 minutes)

In Claude Code, run:

/plugin marketplace add mohitagw15856/pm-claude-skills

Or install by profession:

claude plugin install pm-essentials@pm-claude-skills     # Core PM + Word tracked changes

claude plugin install pm-delivery@pm-claude-skills       # Delivery + PowerPoint auditor

claude plugin install pm-engineering@pm-claude-skills    # Engineering (14 skills) 🆕

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


Or clone and symlink for auto-updates:

git clone https://github.com/mohitagw15856/pm-claude-skills.git ~/pm-claude-skills
mkdir -p ~/.claude/skills
ln -s ~/pm-claude-skills/skills/* ~/.claude/skills/

---

## 🎬 See It in Action

**Debugging Log Analyser** — paste a stack trace or error log, get a structured root cause diagnosis with probable cause, affected code path, a specific fix, and next debugging steps.

**PR Description Writer** — share your diff or commit list, get a reviewer-friendly PR description with summary, changes made, testing steps, and reviewer notes.

**Sprint Planning Skill** — paste your sprint goals and backlog items, get a complete structured sprint plan with capacity, commitments, risks, and a day-one kickoff agenda.

> 📹 Drop a demo in [Discussions](../../discussions) and we'll feature it here.

---

## 🤖 Building Blocks for Agent Templates

On May 5, 2026, Anthropic [released their first agent templates](https://www.anthropic.com/news/finance-agents) — pre-packaged Claude agents that combine **skills, connectors, and subagents** into ready-to-run workflows for financial services.

This library is the largest open-source collection of professional skills available — covering 15 professions beyond financial services. **The 106 skills here are the building blocks for agent templates outside of finance.**

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

## 🆕 What's New in v10.0.0

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

## 📖 v6.0.0 — 100 Skills Milestone

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

## 🗂️ All 106 Skills

### 🛠️ Product Management (Skills 1–34)
**Bundles:** `pm-essentials` · `pm-discovery` · `pm-planning` · `pm-delivery` · `pm-analytics` · `pm-strategy` · `pm-advanced` · `pm-rituals`

> The original toolkit covering the full PM lifecycle — discovery, prioritisation, delivery, strategy, stakeholder comms, and weekly rituals. Now includes Word tracked changes and PowerPoint slide auditing.

| # | Skill | What It Does |
|---|---|---|
| 1–6 | **pm-essentials** | PRD Template, Meeting Notes, Stakeholder Update, User Research Synthesis, Competitive Analysis, **Word Doc Tracked Changes** 🆕 |
| 7–10 | **pm-discovery** | Discovery Interview Guide, Job Story Mapper, User Interview Synthesis, Assumption Mapper |
| 11–16 | **pm-planning** | OKR Builder, Feature Prioritisation (RICE/MoSCoW/Kano/ICE), Roadmap Presentation, Pricing Strategy |
| 17–24 | **pm-delivery** | Sprint Planning, Technical Spec, A/B Test Planner, Go-to-Market Planner, Launch Checklist, Sprint Brief, Retro, **PPTX Slide Auditor** 🆕 |
| 25–27 | **pm-analytics** | Data Analysis Standard, Retention Analysis, Product Health Analysis |
| 28–33 | **pm-strategy** | Competitor Signal Tracker, Competitive Intelligence Monitor, Stakeholder Influence Mapper, Strategic Narrative, Executive Update, Ambiguity Resolver |
| 34 | **pm-advanced** | AI Product Canvas, Multi-Source Signal Synthesiser, Experiment Designer, Design Handoff Brief |

> See [Part 7 article](https://medium.com/product-powerhouse/33-claude-skills-for-pms-are-now-in-the-claude-code-marketplace-heres-how-to-install-them-7968ab6bb1e1) for full PM skills detail.

---

### 📣 Marketing & GTM (Skills 35–40)
**Bundle:** `pm-gtm`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 35 | **Go-To-Market** | `skills/go-to-market/` | Positioning statements, messaging pillars, feature/benefit mapping, role-specific use cases |
| 36 | **Content Calendar** | `skills/content-calendar/` | Multi-channel content calendars with opening hooks, formats, and repurposing map |
| 37 | **Competitor Teardown** | `skills/competitor-teardown/` | Full competitive analysis: positioning map, feature comparison, messaging gaps, SWOT, recommendations |
| 38 | **Email Campaign** | `skills/email-campaign/` | Sequenced email campaigns with subject lines, preview text, body copy, and CTAs |
| 39 | **SEO Content Brief** 🆕 | `skills/seo-content-brief/` | Complete SEO briefs with search intent, competitor gap analysis, content outline, and on-page requirements |
| 40 | **Media Pitch** 🆕 | `skills/media-pitch/` | Story-first journalist pitches with angle development framework and pitch writing rules |

---

### 👩‍💻 Engineering & Tech (Skills 41–54)
**Bundle:** `pm-engineering`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 41 | **Code Review Checklist** | `skills/code-review-checklist/` | Tailored PR review checklists by language, type, and risk level |
| 42 | **Incident Postmortem** | `skills/incident-postmortem/` | Blameless postmortems with timeline, RCA, impact, and action items |
| 43 | **API Docs Writer** | `skills/api-docs-writer/` | Developer-facing API docs: endpoints, parameters, response schemas, code examples |
| 44 | **Architecture Decision Record** | `skills/architecture-decision-record/` | ADRs with context, options considered, decision, consequences, and risks |
| 45 | **Debugging Log Analyser** | `skills/debugging-log-analyser/` | Parse stack traces and error logs into a structured root cause diagnosis with a specific fix |
| 46 | **PR Description Writer** | `skills/pr-description-writer/` | Write reviewer-friendly PR descriptions from a diff, commit list, or change summary |
| 47 | **System Design Interview** | `skills/system-design-interview/` | Structure complete system design answers with capacity estimates, component deep-dives, and trade-offs |
| 48 | **Changelog Generator** | `skills/changelog-generator/` | Convert git commits into a polished, user-facing changelog following Keep a Changelog format |
| 49 | **Test Strategy Doc** | `skills/test-strategy-doc/` | Write a complete test strategy with risk assessment, test types, coverage targets, and P0/P1 test cases |
| 50 | **Runbook Writer** | `skills/runbook-writer/` | Write operational runbooks for deployments, incidents, and maintenance with exact commands and rollback steps |
| 51 | **CI/CD Playbook** 🆕 | `skills/cicd-playbook/` | Complete pipeline playbook covering every stage, rollback procedures, secrets management, and on-call responsibilities |
| 52 | **SLO & Error Budget** 🆕 | `skills/slo-error-budget/` | SLI definitions, SLO targets, error budget calculation, burn rate alerts, and error budget policy |
| 53 | **Developer Onboarding Doc** 🆕 | `skills/developer-onboarding-doc/` | Everything a new engineer needs in their first week — architecture, local setup, testing, deployment, and key contacts |
| 54 | **On-Call Runbook** 🆕 | `skills/oncall-runbook/` | Per-alert response procedures, escalation matrix, diagnostic cheat sheet, and handoff template |

---

### 🤝 Customer Success (Skills 55–58)
**Bundle:** `pm-cs`

> 250 ⭐ milestone unlocked. Install:

claude plugin install pm-cs@pm-claude-skills


| # | Skill | Folder | What It Does |
|---|---|---|---|
| 55 | **Customer Health Scorecard** 🆕 | `skills/cs-health-scorecard/` | Weighted health score across adoption, engagement, outcomes, support, and commercial — RAG status and renewal forecast |
| 56 | **QBR Deck** 🆕 | `skills/qbr-deck/` | Slide-by-slide quarterly business review with talking points, value narrative, and mutual commitments |
| 57 | **Escalation Brief** 🆕 | `skills/cs-escalation-brief/` | Structured brief for at-risk accounts — root cause, business impact, resolution plan, and decision required |
| 58 | **Churn Analysis** 🆕 | `skills/churn-analysis/` | Churn breakdown by category and segment, early warning signals, and prioritised interventions |

---

### 📊 Data & Analytics (Skills 59–62)
**Bundle:** `pm-data`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 59 | **Metrics Framework** | `skills/metrics-framework/` | North Star + metric tree, dashboard tiers, counter-metrics |
| 60 | **SQL Query Explainer** | `skills/sql-query-explainer/` | Explain, optimise, write, and document SQL in plain English |
| 61 | **Dashboard Brief** | `skills/dashboard-brief/` | Complete dashboard spec: KPIs, charts, filters, layout, data requirements |
| 62 | **Chart Data Extractor** | `skills/chart-data-extractor/` | Extract pixel-level data from chart images into structured data tables |

---

### 🧑‍💼 Leadership & People (Skills 63–65)
**Bundle:** `pm-people`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 63 | **Performance Review** | `skills/performance-review/` | Structured reviews from bullet-point notes — self, manager, peer, and upward |
| 64 | **Hiring Rubric** | `skills/hiring-rubric/` | Interview scorecards with competencies, behavioural questions, and panel guide |
| 65 | **Team Offsite Planner** | `skills/team-offsite-planner/` | Full offsite agenda, session facilitation notes, and logistics checklist |

---

### 🎨 Design & UX (Skills 66–68)
**Bundle:** `pm-design`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 66 | **UX Research Plan** | `skills/ux-research-plan/` | Research plans with screener, discussion guide, and synthesis framework |
| 67 | **Design Critique** | `skills/design-critique/` | Structured feedback using JTBD, Gestalt principles, and Nielsen's heuristics |
| 68 | **Accessibility Audit** | `skills/accessibility-audit/` | WCAG 2.2 audit with prioritised remediation and quick wins |

---

### 🏢 Business & Strategy (Skills 69–71)
**Bundle:** `pm-business`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 69 | **Investor Update** | `skills/investor-update/` | Monthly/quarterly investor updates: metrics, highlights, challenges, and asks |
| 70 | **Board Deck Narrative** | `skills/board-deck-narrative/` | Slide-by-slide board presentation structure with narrative beats and talking points |
| 71 | **Job Application** | `skills/job-application/` | Tailored CV summary, ATS keyword optimisation, and cover letter for any JD |

---

### ⚖️ Legal (Skills 72–75)
**Bundle:** `pm-legal`

> ⚠️ All legal skills include a disclaimer. Not a substitute for qualified legal advice.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 72 | **Contract Review** | `skills/contract-review/` | Structured review with key terms, flagged clauses, risk rating, and plain English summary |
| 73 | **NDA Analyser** | `skills/nda-analyser/` | Clause-by-clause NDA analysis with risk flags and negotiation checklist |
| 74 | **Legal Brief** | `skills/legal-brief/` | Legal memos and argument outlines in IRAC format (Issue, Rule, Application, Conclusion) |
| 75 | **Compliance Checklist** | `skills/compliance-checklist/` | GDPR, SOC 2, ISO 27001, FCA, HIPAA compliance checklists with prioritised gap analysis |

---

### 💰 Finance (Skills 76–80)
**Bundle:** `pm-finance`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 76 | **Financial Model Narrative** | `skills/financial-model-narrative/` | Turns P&L and model outputs into board-ready written narratives |
| 77 | **Budget Variance Analysis** | `skills/budget-variance-analysis/` | Variance table with root cause commentary and management summary |
| 78 | **Investor Pitch Deck** | `skills/investor-pitch-deck/` | Slide-by-slide pitch deck structure with what each slide must prove |
| 79 | **Financial Due Diligence** | `skills/financial-due-diligence/` | DD document request list, analytical questions, and red flags checklist |
| 80 | **Tax Planning Checklist** | `skills/tax-planning-checklist/` | Year-end tax planning framework across income, pension, CGT, business reliefs, and ISAs |

---

### 👥 HR (Skills 81–85)
**Bundle:** `pm-hr`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 81 | **Job Description Writer** | `skills/job-description-writer/` | Inclusive, structured JDs with built-in language review and salary range nudge |
| 82 | **Onboarding Plan** | `skills/onboarding-plan/` | 30/60/90-day plans with week-by-week structure, milestones, and manager checklist |
| 83 | **Employee Engagement Survey** | `skills/employee-engagement-survey/` | Survey design + results analysis mode with eNPS and action planning template |
| 84 | **Redundancy Consultation** | `skills/redundancy-consultation/` | Process timeline, at-risk letter, consultation script, and confirmation letter — UK law |
| 85 | **Change Management Plan** | `skills/change-management-plan/` | Full change plan covering stakeholder analysis, communication strategy, training, and adoption metrics |

---

### 🤝 Sales (Skills 86–90)
**Bundle:** `pm-sales`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 86 | **Sales Battlecard** | `skills/sales-battlecard/` | One-page competitive battlecard with objection responses and landmine questions |
| 87 | **Discovery Call Prep** | `skills/discovery-call-prep/` | Call brief with research summary, hypothesis, structured questions, and success criteria |
| 88 | **Proposal Writer** | `skills/proposal-writer/` | Commercial proposals structured around the prospect's problem, not the product |
| 89 | **Account Plan** | `skills/account-plan/` | Strategic account plan with relationship map, whitespace analysis, risks, and 90-day actions |
| 90 | **Sales Forecasting Model** | `skills/sales-forecasting-model/` | Pipeline-based forecast with stage model, scenario analysis, assumption log, and activity sanity check |

---

### ⚙️ Operations (Skills 91–95)
**Bundle:** `pm-operations`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 91 | **Process Documentation** | `skills/process-documentation/` | Clear process docs with steps, roles, edge cases — followable by a new starter |
| 92 | **SOP Writer** | `skills/sop-writer/` | Formal, audit-ready SOPs with version control, quality checks, and non-conformance process |
| 93 | **Vendor Evaluation** | `skills/vendor-evaluation/` | Weighted vendor scorecard, RFP questions, reference check template, and recommendation |
| 94 | **Project Status Report** | `skills/project-status-report/` | RAG status reports with milestone progress, issues, risks, and decisions required |
| 95 | **Workshop Facilitation Guide** | `skills/workshop-facilitation-guide/` | Complete facilitation guides with activity instructions, decision protocols, and facilitator moves |

---

### 🏥 Research & Healthcare (Skills 96–99)
**Bundle:** `pm-research`

> ⚠️ Healthcare skills are for documentation and educational purposes only. All clinical content must be reviewed by a qualified professional.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 96 | **Clinical Case Summary** | `skills/clinical-case-summary/` | SBAR handovers, SOAP notes, and case reports for educational and documentation use |
| 97 | **Research Protocol** | `skills/research-protocol/` | Complete study protocols with objectives, methodology, ethics, and analysis plan |
| 98 | **Patient Communication** | `skills/patient-communication/` | Plain English patient letters, leaflets, and results communications at Grade 6 reading level |
| 99 | **Literature Review** | `skills/literature-review/` | Thematically organised literature reviews with synthesis, critical analysis, and gap identification |

---

### 🌐 Cross-Profession (Skills 100–103)
**Bundle:** `pm-cross`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 100 | **Press Release** | `skills/press-release/` | Journalist-ready press releases with headline rules, boilerplate, and journalist test |
| 101 | **Grant Proposal** | `skills/grant-proposal/` | Complete grant applications aligned to funder priorities with budget narrative |
| 102 | **Executive Summary** | `skills/executive-summary/` | Decision-ready executive summaries with bottom line upfront, adapted for any audience |
| 103 | **Teaching Lesson Plan** | `skills/teaching-lesson-plan/` | Complete lesson plans for any subject, audience, or setting — with objectives, activities, and formative assessment |

---

### 🖼️ Figma (Skills 104–113)
**Bundle:** `pm-figma`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 104 | **Figma Component Audit** | `skills/figma-component-audit/` | Audit component library for naming issues, coverage gaps, and variant completeness |
| 105 | **Figma Design Brief** | `skills/figma-design-brief/` | Convert PRDs and feature requests into structured Figma design briefs |
| 106 | **Figma Annotation Guide** | `skills/figma-annotation-guide/` | Generate complete developer handoff annotations covering all states and edge cases |
| 107 | **Figma Design Review** | `skills/figma-design-review/` | PM design review against requirements with explicit approval status |
| 108 | **Figma User Flow Planner** | `skills/figma-user-flow-planner/` | Map all screens, states, and decision points before opening Figma |
| 109 | **Figma Variant Matrix** | `skills/figma-variant-matrix/` | Define all component variants, properties, and states before building |
| 110 | **Figma Spacing System** | `skills/figma-spacing-system/` | Design a complete spacing scale, grid, and token system |
| 111 | **Figma Prototype Plan** | `skills/figma-prototype-plan/` | Plan prototype scope, interactions, and test task scripts for user testing |
| 112 | **Figma Design QA** | `skills/figma-design-qa/` | Pre-handoff QA checklist covering file hygiene, states, accessibility, and handoff readiness |
| 113 | **Figma Design Critique (PM)** | `skills/figma-design-critique-pm/` | PM-perspective design critique focused on product outcomes, not aesthetics |

claude plugin install pm-figma@pm-claude-skills


---

### 📅 PM Rituals (Skill 114)
**Bundle:** `pm-rituals`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 114 | **PM Weekly Review** | `skills/pm-weekly-review/` | Weekly PM review and planning ritual — metrics, shipping progress, blockers, and next week's priorities |

---

## ❤️ Sponsor This Work

Building and maintaining 114 skills across 23 bundles takes real time — testing skills against new model releases, building new ones from community requests, writing the article series, and keeping documentation current.

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
2. Create a new folder: `skills/your-skill-name/`
3. Add a `SKILL.md` file following the template below
4. Raise a pull request with a short description of what the skill does and why you built it

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

claude plugin install pm-engineering@pm-claude-skills    # 14 engineering skills 🆕

claude plugin install pm-cs@pm-claude-skills             # Customer Success (4 skills) 🆕

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

---

## 🤖 Companion Repository — ChatGPT Custom GPTs

If you use ChatGPT instead of Claude Code, there's a companion repo with the same professional frameworks built as Custom GPT system prompts:

**[professional-gpt-library](https://github.com/mohitagw15856/professional-gpt-library)** — 10 starter GPTs across 8 professions, MIT licence.

Read the full breakdown: [Part 12 — I Built the Same Skills Library for ChatGPT](https://medium.com/product-powerhouse/i-built-the-same-skills-library-for-chatgpt-heres-what-s-different-a9305f9c20b9)

---

## 🛠️ Custom Skills for Your Team

The 114 skills in this library are built for general professional workflows. But the most powerful version of Claude Skills is one built specifically for *your* team — your templates, your terminology, your processes, your quality standards.

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
| 500 ⭐ | 25 more Engineering skills (CI/CD playbooks, SLO templates, onboarding docs, debugging patterns) | ✅ Unlocked — coming in next release |
| 1000 ⭐ | Full Startup Founder kit (fundraising memo, pitch critique, co-founder equity split) | 🔒 Locked |

**[⭐ Star this repo to unlock the next milestone →](https://github.com/mohitagw15856/pm-claude-skills)**

Want a specific skill built? [Vote or request in SKILL_REQUEST.md](SKILL_REQUEST.md).

---

*Built and maintained by [Mohit Aggarwal](https://medium.com/@mohit15856) | [Product Notes publication](https://medium.com/product-powerhouse) | [💖 Sponsor my work](https://github.com/sponsors/mohitagw15856)*
