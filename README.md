# 🧠 Claude Skills Library — 80 Skills for Every Profession

> **Save 8–10 hours per week across 13 professions. Install in 2 minutes.**

A community-built library of Claude Skills covering product management, marketing, engineering, data, design, leadership, legal, finance, HR, sales, operations, research, and more. Each skill is a structured SKILL.md file that teaches Claude how to produce professional-grade outputs for your specific workflows.

---

## 🚀 Quick Install (2 minutes)

In Claude Code, run:

/plugin marketplace add https://github.com/mohitagw15856/pm-claude-skills


Or install by profession:

claude plugin install pm-essentials@pm-claude-skills     # Core PM
claude plugin install pm-legal@pm-claude-skills          # Legal
claude plugin install pm-finance@pm-claude-skills        # Finance
claude plugin install pm-hr@pm-claude-skills             # HR
claude plugin install pm-sales@pm-claude-skills          # Sales
claude plugin install pm-operations@pm-claude-skills     # Operations
claude plugin install pm-research@pm-claude-skills       # Research & Healthcare
claude plugin install pm-cross@pm-claude-skills          # Cross-profession


Or clone and symlink for auto-updates:

git clone https://github.com/mohitagw15856/pm-claude-skills.git ~/pm-claude-skills
mkdir -p ~/.claude/skills
ln -s ~/pm-claude-skills/skills/* ~/.claude/skills/


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
| Part 8 | I Added 20 New Claude Skills Beyond Product Management | [Read →](https://medium.com/product-powerhouse/i-built-20-new-claude-skills-for-every-profession-heres-the-full-library-50278e00bf72)|
| Part 9 | 80 Claude Skills for Every Profession — Lawyers, Doctors, Finance, HR, Sales and More | [Read →](https://medium.com/@mohit15856/80-claude-skills-for-every-profession-lawyers-doctors-finance-hr-sales-and-more-3dfde9ec0033)|

---

## 🗂️ All 80 Skills

### 🛠️ Product Management (Skills 1–33)
**Bundles:** `pm-essentials` · `pm-discovery` · `pm-planning` · `pm-delivery` · `pm-analytics` · `pm-strategy` · `pm-advanced` · `pm-rituals`

> The original toolkit covering the full PM lifecycle — discovery, prioritisation, delivery, strategy, stakeholder comms, and weekly rituals.

| # | Skill | What It Does |
|---|---|---|
| 1–5 | **pm-essentials** | PRD Template, Meeting Notes, Stakeholder Update, User Research Synthesis, Competitive Analysis |
| 6–9 | **pm-discovery** | Discovery Interview Guide, Job Story Mapper, User Interview Synthesis, Assumption Mapper |
| 10–15 | **pm-planning** | OKR Builder, Feature Prioritisation (RICE/MoSCoW/Kano/ICE), Roadmap Presentation, Pricing Strategy |
| 16–22 | **pm-delivery** | Sprint Planning, Technical Spec, A/B Test Planner, Go-to-Market Planner, Launch Checklist, Sprint Brief, Retro |
| 23–25 | **pm-analytics** | Data Analysis Standard, Retention Analysis, Product Health Analysis |
| 26–31 | **pm-strategy** | Competitor Signal Tracker, Competitive Intelligence Monitor, Stakeholder Influence Mapper, Strategic Narrative, Executive Update, Ambiguity Resolver |
| 32–33 | **pm-advanced** | AI Product Canvas, Multi-Source Signal Synthesiser, Experiment Designer, Design Handoff Brief |

> See [Part 7 article](https://medium.com/product-powerhouse/33-claude-skills-for-pms-are-now-in-the-claude-code-marketplace-heres-how-to-install-them-7968ab6bb1e1) for full PM skills detail.

---

### 📣 Marketing & GTM (Skills 34–37)
**Bundle:** `pm-gtm`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 34 | **Go-To-Market** | `skills/go-to-market/` | Positioning statements, messaging pillars, feature/benefit mapping, role-specific use cases |
| 35 | **Content Calendar** | `skills/content-calendar/` | Multi-channel content calendars with opening hooks, formats, and repurposing map |
| 36 | **Competitor Teardown** | `skills/competitor-teardown/` | Full competitive analysis: positioning map, feature comparison, messaging gaps, SWOT, recommendations |
| 37 | **Email Campaign** | `skills/email-campaign/` | Sequenced email campaigns with subject lines, preview text, body copy, and CTAs |

---

### 👩‍💻 Engineering & Tech (Skills 38–41)
**Bundle:** `pm-engineering`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 38 | **Code Review Checklist** | `skills/code-review-checklist/` | Tailored PR review checklists by language, type, and risk level |
| 39 | **Incident Postmortem** | `skills/incident-postmortem/` | Blameless postmortems with timeline, RCA, impact, and action items |
| 40 | **API Docs Writer** | `skills/api-docs-writer/` | Developer-facing API docs: endpoints, parameters, response schemas, code examples |
| 41 | **Architecture Decision Record** | `skills/architecture-decision-record/` | ADRs with context, options considered, decision, consequences, and risks |

---

### 📊 Data & Analytics (Skills 42–44)
**Bundle:** `pm-data`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 42 | **Metrics Framework** | `skills/metrics-framework/` | North Star + metric tree, dashboard tiers, counter-metrics |
| 43 | **SQL Query Explainer** | `skills/sql-query-explainer/` | Explain, optimise, write, and document SQL in plain English |
| 44 | **Dashboard Brief** | `skills/dashboard-brief/` | Complete dashboard spec: KPIs, charts, filters, layout, data requirements |

---

### 🧑‍💼 Leadership & People (Skills 45–47)
**Bundle:** `pm-people`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 45 | **Performance Review** | `skills/performance-review/` | Structured reviews from bullet-point notes — self, manager, peer, and upward |
| 46 | **Hiring Rubric** | `skills/hiring-rubric/` | Interview scorecards with competencies, behavioural questions, and panel guide |
| 47 | **Team Offsite Planner** | `skills/team-offsite-planner/` | Full offsite agenda, session facilitation notes, and logistics checklist |

---

### 🎨 Design & UX (Skills 48–50)
**Bundle:** `pm-design`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 48 | **UX Research Plan** | `skills/ux-research-plan/` | Research plans with screener, discussion guide, and synthesis framework |
| 49 | **Design Critique** | `skills/design-critique/` | Structured feedback using JTBD, Gestalt principles, and Nielsen's heuristics |
| 50 | **Accessibility Audit** | `skills/accessibility-audit/` | WCAG 2.2 audit with prioritised remediation and quick wins |

---

### 🏢 Business & Strategy (Skills 51–53)
**Bundle:** `pm-business`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 51 | **Investor Update** | `skills/investor-update/` | Monthly/quarterly investor updates: metrics, highlights, challenges, and asks |
| 52 | **Board Deck Narrative** | `skills/board-deck-narrative/` | Slide-by-slide board presentation structure with narrative beats and talking points |
| 53 | **Job Application** | `skills/job-application/` | Tailored CV summary, ATS keyword optimisation, and cover letter for any JD |

---

### ⚖️ Legal (Skills 54–57)
**Bundle:** `pm-legal`

> ⚠️ All legal skills include a disclaimer. Not a substitute for qualified legal advice.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 54 | **Contract Review** | `skills/contract-review/` | Structured review with key terms, flagged clauses, risk rating, and plain English summary |
| 55 | **NDA Analyser** | `skills/nda-analyser/` | Clause-by-clause NDA analysis with risk flags and negotiation checklist |
| 56 | **Legal Brief** | `skills/legal-brief/` | Legal memos and argument outlines in IRAC format (Issue, Rule, Application, Conclusion) |
| 57 | **Compliance Checklist** | `skills/compliance-checklist/` | GDPR, SOC 2, ISO 27001, FCA, HIPAA compliance checklists with prioritised gap analysis |

---

### 💰 Finance (Skills 58–61)
**Bundle:** `pm-finance`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 58 | **Financial Model Narrative** | `skills/financial-model-narrative/` | Turns P&L and model outputs into board-ready written narratives |
| 59 | **Budget Variance Analysis** | `skills/budget-variance-analysis/` | Variance table with root cause commentary and management summary |
| 60 | **Investor Pitch Deck** | `skills/investor-pitch-deck/` | Slide-by-slide pitch deck structure with what each slide must prove |
| 61 | **Financial Due Diligence** | `skills/financial-due-diligence/` | DD document request list, analytical questions, and red flags checklist |

---

### 👥 HR (Skills 62–65)
**Bundle:** `pm-hr`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 62 | **Job Description Writer** | `skills/job-description-writer/` | Inclusive, structured JDs with built-in language review and salary range nudge |
| 63 | **Onboarding Plan** | `skills/onboarding-plan/` | 30/60/90-day plans with week-by-week structure, milestones, and manager checklist |
| 64 | **Employee Engagement Survey** | `skills/employee-engagement-survey/` | Survey design + results analysis mode with eNPS and action planning template |
| 65 | **Redundancy Consultation** | `skills/redundancy-consultation/` | Process timeline, at-risk letter, consultation script, and confirmation letter — UK law |

---

### 🤝 Sales (Skills 66–69)
**Bundle:** `pm-sales`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 66 | **Sales Battlecard** | `skills/sales-battlecard/` | One-page competitive battlecard with objection responses and landmine questions |
| 67 | **Discovery Call Prep** | `skills/discovery-call-prep/` | Call brief with research summary, hypothesis, structured questions, and success criteria |
| 68 | **Proposal Writer** | `skills/proposal-writer/` | Commercial proposals structured around the prospect's problem, not the product |
| 69 | **Account Plan** | `skills/account-plan/` | Strategic account plan with relationship map, whitespace analysis, risks, and 90-day actions |

---

### ⚙️ Operations (Skills 70–73)
**Bundle:** `pm-operations`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 70 | **Process Documentation** | `skills/process-documentation/` | Clear process docs with steps, roles, edge cases — followable by a new starter |
| 71 | **SOP Writer** | `skills/sop-writer/` | Formal, audit-ready SOPs with version control, quality checks, and non-conformance process |
| 72 | **Vendor Evaluation** | `skills/vendor-evaluation/` | Weighted vendor scorecard, RFP questions, reference check template, and recommendation |
| 73 | **Project Status Report** | `skills/project-status-report/` | RAG status reports with milestone progress, issues, risks, and decisions required |

---

### 🏥 Research & Healthcare (Skills 74–77)
**Bundle:** `pm-research`

> ⚠️ Healthcare skills are for documentation and educational purposes only. All clinical content must be reviewed by a qualified professional.

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 74 | **Clinical Case Summary** | `skills/clinical-case-summary/` | SBAR handovers, SOAP notes, and case reports for educational and documentation use |
| 75 | **Research Protocol** | `skills/research-protocol/` | Complete study protocols with objectives, methodology, ethics, and analysis plan |
| 76 | **Patient Communication** | `skills/patient-communication/` | Plain English patient letters, leaflets, and results communications at Grade 6 reading level |
| 77 | **Literature Review** | `skills/literature-review/` | Thematically organised literature reviews with synthesis, critical analysis, and gap identification |

---

### 🌐 Cross-Profession (Skills 78–80)
**Bundle:** `pm-cross`

| # | Skill | Folder | What It Does |
|---|---|---|---|
| 78 | **Press Release** | `skills/press-release/` | Journalist-ready press releases with headline rules, boilerplate, and journalist test |
| 79 | **Grant Proposal** | `skills/grant-proposal/` | Complete grant applications aligned to funder priorities with budget narrative |
| 80 | **Executive Summary** | `skills/executive-summary/` | Decision-ready executive summaries with bottom line upfront, adapted for any audience |

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
| `teaching-lesson-plan` | Education | Structured lesson plans from curriculum objectives |
| `seo-content-brief` | Marketing | Content briefs with keyword strategy and outline |
| `grant-report` | Non-profit | Funder progress reports against grant objectives |
| `architectural-spec` | Architecture | Project specifications and technical drawing briefs |
| `media-pitch` | Journalism | Story pitches to editors and commissioning briefs |
| `clinical-guideline-summary` | Healthcare | Plain English summaries of clinical guidelines |
| `tax-planning-checklist` | Finance | Year-end tax planning checklist by entity type |
| `sales-forecasting-model` | Sales | Structured pipeline forecasting and commentary |

Have a skill idea? [Open an issue](../../issues) or raise it in [Discussions](../../discussions).

**Contributors** get credited in this README and in the article series. 🙌

---

## 📦 All Plugin Bundles

Install the whole library or just the bundles you need:

# Install everything
/plugin marketplace add https://github.com/mohitagw15856/pm-claude-skills

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


---
🛠️ Custom Skills for Your Team
The 80 skills in this library are built for general professional workflows. But the most powerful version of Claude Skills is one built specifically for your team — your templates, your terminology, your processes, your quality standards.
What custom skills look like in practice:

A law firm's contract review skill trained on their specific clause library and risk tolerance
A SaaS company's sprint brief skill that knows their engineering conventions and definition of done
A finance team's board pack skill that follows their exact narrative structure and slide format
An HR team's job description skill that reflects their values language and includes their specific benefits

The difference between a generic skill and one built for your context is significant. Generic skills eliminate the blank page. Custom skills eliminate the rework.
If you want skills built for your team's specific workflows — [get in touch](mailto:mohit15856@gmail.com).
Include a brief description of your team, the workflows you want to automate, and the tools you use. I'll come back to you within 48 hours.

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
