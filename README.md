# 🧠 Claude Skills Library — 100 Skills for Every Profession

> **Save 8–10 hours per week across 15 professions. Install in 2 minutes. Now with 100 skills and comprehensive quality improvements across every skill.**

A community-built library of Claude Skills covering product management, marketing, engineering, data, design, Figma, leadership, legal, finance, HR, sales, operations, research, education, and more. Each skill is a structured SKILL.md file that teaches Claude how to produce professional-grade outputs for your specific workflows.

**🆕 Latest release (v6.0.0):** 100 skills milestone — 7 new skills added, plus quality improvements across all 93 existing skills (standardised descriptions, Required Inputs sections, and Quality Checks on every skill).

---

## 🚀 Quick Install (2 minutes)

In Claude Code, run:

/plugin marketplace add mohitagw15856/pm-claude-skills


Or install by profession:

claude plugin install pm-essentials@pm-claude-skills     # Core PM + Word tracked changes
claude plugin install pm-delivery@pm-claude-skills       # Delivery + PowerPoint auditor
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

## 🆕 What's New in v6.0.0 — 100 Skills Milestone

**7 new skills added:**

| Skill | Bundle | What It Does |
|---|---|---|
| **Teaching Lesson Plan** | pm-cross | Structured lesson plans for any subject, audience, or setting — with objectives, activities, and formative assessment |
| **SEO Content Brief** | pm-gtm | Complete SEO briefs with search intent analysis, competitor gaps, content outline, and on-page requirements |
| **Media Pitch** | pm-gtm | Story-first journalist pitches with angle development framework and pitch rules |
| **Change Management Plan** | pm-hr | Full change plan covering stakeholder analysis, communication strategy, training, and adoption metrics |
| **Workshop Facilitation Guide** | pm-operations | Complete facilitation guides with activity instructions, decision protocols, and facilitator moves |
| **Sales Forecasting Model** | pm-sales | Pipeline-based forecast with stage model, scenario analysis, assumption log, and activity sanity check |
| **Tax Planning Checklist** | pm-finance | Year-end tax planning review framework across income, pension, CGT, business reliefs, and ISAs |

**Quality improvements across all 93 existing skills:**
- Every skill now has a standardised `description` field using the "Verb the thing. Use when X. Produces Y." format
- Every skill now has a `Required Inputs` section prompting Claude to ask for missing information before executing
- Every skill now has a `Quality Checks` section with specific checkboxes Claude verifies before delivering output

**Read the full story:** [Part 14 — I Rebuilt All 93 Skills and Added 7 More: What 100 Skills Taught Me About What Makes a Great Skill](#)

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

---

## 🗂️ All 100 Skills

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

### 👩‍💻 Engineering & Tech (Skills 41–44)
**Bundle:** `pm-engineering`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 41 | **Code Review Checklist** | `skills/code-review-checklist/` | Tailored PR review checklists by language, type, and risk level |
| 42 | **Incident Postmortem** | `skills/incident-postmortem/` | Blameless postmortems with timeline, RCA, impact, and action items |
| 43 | **API Docs Writer** | `skills/api-docs-writer/` | Developer-facing API docs: endpoints, parameters, response schemas, code examples |
| 44 | **Architecture Decision Record** | `skills/architecture-decision-record/` | ADRs with context, options considered, decision, consequences, and risks |

---

### 📊 Data & Analytics (Skills 45–48)
**Bundle:** `pm-data`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 45 | **Metrics Framework** | `skills/metrics-framework/` | North Star + metric tree, dashboard tiers, counter-metrics |
| 46 | **SQL Query Explainer** | `skills/sql-query-explainer/` | Explain, optimise, write, and document SQL in plain English |
| 47 | **Dashboard Brief** | `skills/dashboard-brief/` | Complete dashboard spec: KPIs, charts, filters, layout, data requirements |
| 48 | **Chart Data Extractor** | `skills/chart-data-extractor/` | Extract pixel-level data from chart images into structured data tables |

---

### 🧑‍💼 Leadership & People (Skills 49–51)
**Bundle:** `pm-people`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 49 | **Performance Review** | `skills/performance-review/` | Structured reviews from bullet-point notes — self, manager, peer, and upward |
| 50 | **Hiring Rubric** | `skills/hiring-rubric/` | Interview scorecards with competencies, behavioural questions, and panel guide |
| 51 | **Team Offsite Planner** | `skills/team-offsite-planner/` | Full offsite agenda, session facilitation notes, and logistics checklist |

---

### 🎨 Design & UX (Skills 52–54)
**Bundle:** `pm-design`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 52 | **UX Research Plan** | `skills/ux-research-plan/` | Research plans with screener, discussion guide, and synthesis framework |
| 53 | **Design Critique** | `skills/design-critique/` | Structured feedback using JTBD, Gestalt principles, and Nielsen's heuristics |
| 54 | **Accessibility Audit** | `skills/accessibility-audit/` | WCAG 2.2 audit with prioritised remediation and quick wins |

---

### 🏢 Business & Strategy (Skills 55–57)
**Bundle:** `pm-business`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 55 | **Investor Update** | `skills/investor-update/` | Monthly/quarterly investor updates: metrics, highlights, challenges, and asks |
| 56 | **Board Deck Narrative** | `skills/board-deck-narrative/` | Slide-by-slide board presentation structure with narrative beats and talking points |
| 57 | **Job Application** | `skills/job-application/` | Tailored CV summary, ATS keyword optimisation, and cover letter for any JD |

---

### ⚖️ Legal (Skills 58–61)
**Bundle:** `pm-legal`

> ⚠️ All legal skills include a disclaimer. Not a substitute for qualified legal advice.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 58 | **Contract Review** | `skills/contract-review/` | Structured review with key terms, flagged clauses, risk rating, and plain English summary |
| 59 | **NDA Analyser** | `skills/nda-analyser/` | Clause-by-clause NDA analysis with risk flags and negotiation checklist |
| 60 | **Legal Brief** | `skills/legal-brief/` | Legal memos and argument outlines in IRAC format (Issue, Rule, Application, Conclusion) |
| 61 | **Compliance Checklist** | `skills/compliance-checklist/` | GDPR, SOC 2, ISO 27001, FCA, HIPAA compliance checklists with prioritised gap analysis |

---

### 💰 Finance (Skills 62–66)
**Bundle:** `pm-finance`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 62 | **Financial Model Narrative** | `skills/financial-model-narrative/` | Turns P&L and model outputs into board-ready written narratives |
| 63 | **Budget Variance Analysis** | `skills/budget-variance-analysis/` | Variance table with root cause commentary and management summary |
| 64 | **Investor Pitch Deck** | `skills/investor-pitch-deck/` | Slide-by-slide pitch deck structure with what each slide must prove |
| 65 | **Financial Due Diligence** | `skills/financial-due-diligence/` | DD document request list, analytical questions, and red flags checklist |
| 66 | **Tax Planning Checklist** 🆕 | `skills/tax-planning-checklist/` | Year-end tax planning framework across income, pension, CGT, business reliefs, and ISAs |

---

### 👥 HR (Skills 67–71)
**Bundle:** `pm-hr`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 67 | **Job Description Writer** | `skills/job-description-writer/` | Inclusive, structured JDs with built-in language review and salary range nudge |
| 68 | **Onboarding Plan** | `skills/onboarding-plan/` | 30/60/90-day plans with week-by-week structure, milestones, and manager checklist |
| 69 | **Employee Engagement Survey** | `skills/employee-engagement-survey/` | Survey design + results analysis mode with eNPS and action planning template |
| 70 | **Redundancy Consultation** | `skills/redundancy-consultation/` | Process timeline, at-risk letter, consultation script, and confirmation letter — UK law |
| 71 | **Change Management Plan** 🆕 | `skills/change-management-plan/` | Full change plan covering stakeholder analysis, communication strategy, training, and adoption metrics |

---

### 🤝 Sales (Skills 72–76)
**Bundle:** `pm-sales`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 72 | **Sales Battlecard** | `skills/sales-battlecard/` | One-page competitive battlecard with objection responses and landmine questions |
| 73 | **Discovery Call Prep** | `skills/discovery-call-prep/` | Call brief with research summary, hypothesis, structured questions, and success criteria |
| 74 | **Proposal Writer** | `skills/proposal-writer/` | Commercial proposals structured around the prospect's problem, not the product |
| 75 | **Account Plan** | `skills/account-plan/` | Strategic account plan with relationship map, whitespace analysis, risks, and 90-day actions |
| 76 | **Sales Forecasting Model** 🆕 | `skills/sales-forecasting-model/` | Pipeline-based forecast with stage model, scenario analysis, assumption log, and activity sanity check |

---

### ⚙️ Operations (Skills 77–81)
**Bundle:** `pm-operations`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 77 | **Process Documentation** | `skills/process-documentation/` | Clear process docs with steps, roles, edge cases — followable by a new starter |
| 78 | **SOP Writer** | `skills/sop-writer/` | Formal, audit-ready SOPs with version control, quality checks, and non-conformance process |
| 79 | **Vendor Evaluation** | `skills/vendor-evaluation/` | Weighted vendor scorecard, RFP questions, reference check template, and recommendation |
| 80 | **Project Status Report** | `skills/project-status-report/` | RAG status reports with milestone progress, issues, risks, and decisions required |
| 81 | **Workshop Facilitation Guide** 🆕 | `skills/workshop-facilitation-guide/` | Complete facilitation guides with activity instructions, decision protocols, and facilitator moves |

---

### 🏥 Research & Healthcare (Skills 82–85)
**Bundle:** `pm-research`

> ⚠️ Healthcare skills are for documentation and educational purposes only. All clinical content must be reviewed by a qualified professional.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 82 | **Clinical Case Summary** | `skills/clinical-case-summary/` | SBAR handovers, SOAP notes, and case reports for educational and documentation use |
| 83 | **Research Protocol** | `skills/research-protocol/` | Complete study protocols with objectives, methodology, ethics, and analysis plan |
| 84 | **Patient Communication** | `skills/patient-communication/` | Plain English patient letters, leaflets, and results communications at Grade 6 reading level |
| 85 | **Literature Review** | `skills/literature-review/` | Thematically organised literature reviews with synthesis, critical analysis, and gap identification |

---

### 🌐 Cross-Profession (Skills 86–89)
**Bundle:** `pm-cross`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 86 | **Press Release** | `skills/press-release/` | Journalist-ready press releases with headline rules, boilerplate, and journalist test |
| 87 | **Grant Proposal** | `skills/grant-proposal/` | Complete grant applications aligned to funder priorities with budget narrative |
| 88 | **Executive Summary** | `skills/executive-summary/` | Decision-ready executive summaries with bottom line upfront, adapted for any audience |
| 89 | **Teaching Lesson Plan** 🆕 | `skills/teaching-lesson-plan/` | Complete lesson plans for any subject, audience, or setting — with objectives, activities, and formative assessment |

---

### 🖼️ Figma (Skills 90–100 — reaching the milestone)
**Bundle:** `pm-figma`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 90 | **Figma Component Audit** | `skills/figma-component-audit/` | Audit component library for naming issues, coverage gaps, and variant completeness |
| 91 | **Figma Design Brief** | `skills/figma-design-brief/` | Convert PRDs and feature requests into structured Figma design briefs |
| 92 | **Figma Annotation Guide** | `skills/figma-annotation-guide/` | Generate complete developer handoff annotations covering all states and edge cases |
| 93 | **Figma Design Review** | `skills/figma-design-review/` | PM design review against requirements with explicit approval status |
| 94 | **Figma User Flow Planner** | `skills/figma-user-flow-planner/` | Map all screens, states, and decision points before opening Figma |
| 95 | **Figma Variant Matrix** | `skills/figma-variant-matrix/` | Define all component variants, properties, and states before building |
| 96 | **Figma Spacing System** | `skills/figma-spacing-system/` | Design a complete spacing scale, grid, and token system |
| 97 | **Figma Prototype Plan** | `skills/figma-prototype-plan/` | Plan prototype scope, interactions, and test task scripts for user testing |
| 98 | **Figma Design QA** | `skills/figma-design-qa/` | Pre-handoff QA checklist covering file hygiene, states, accessibility, and handoff readiness |
| 99 | **Figma Design Critique (PM)** | `skills/figma-design-critique-pm/` | PM-perspective design critique focused on product outcomes, not aesthetics |
| 100 | **PM Weekly Review** | `skills/pm-weekly-review/` | Weekly PM review and planning ritual — metrics, shipping progress, blockers, and next week's priorities |

claude plugin install pm-figma@pm-claude-skills


---

## 🤝 Contributing — Add Your Skill

This is an open-source community library. If you've built a skill that saves you time, share it here.

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

Have a skill idea? [Open an issue](../../issues) or raise it in [Discussions](../../discussions).

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
claude plugin install pm-engineering@pm-claude-skills
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

The 100 skills in this library are built for general professional workflows. But the most powerful version of Claude Skills is one built specifically for *your* team — your templates, your terminology, your processes, your quality standards.

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

## ⭐ If this is useful

Star the repo so others can find it. And if you build something with these skills — raise a PR, open a discussion, or tag me in your article.

---

*Built and maintained by [Mohit Aggarwal](https://medium.com/@mohit15856) | [Product Notes publication](https://medium.com/product-powerhouse)*
