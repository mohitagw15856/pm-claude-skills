<!-- The shareable 2-page cheatsheet. Canonical source; print via browser (GitHub → print → save as PDF).
     Keep numbers in sync with web/skills.json on release. A poster variant lives at web/cheatsheet.html. -->

# 🧠 PM Skills — the 2-Page Cheatsheet

**One link to start: https://mohitagw15856.github.io/pm-claude-skills/** — no install, no signup; runs with a free Gemini key, a fully-local in-browser model, or your own Claude/OpenAI key.

> **The problem:** ask any AI for a PRD, a postmortem, or a board update and you get plausible filler you rewrite from scratch.
> **The fix:** 731 open-source `SKILL.md` files that teach the AI the *actual structure a senior professional uses* — quality checks and anti-patterns included — so the first draft is one you can ship. **MIT. 25 professions. Works in Claude, ChatGPT, Gemini, Cursor, Codex & any MCP client.**

---

## ⚡ Start in 60 seconds (the one path)

1. Open the **[Playground](https://mohitagw15856.github.io/pm-claude-skills/)**
2. Type what you need into the **🪄 command bar** — *"a blameless postmortem for Friday's outage"* — it routes you to the right skill instantly, before you've entered any key
3. Fill the short form, hit Run. Export as **PDF / Word / slides** — or a typeset certificate from the arenas

*Liked it? Make it permanent:* `npx pm-claude-skills add --agent claude` *(or `cursor`, `codex`, `windsurf`…)*

---

## 🤯 Six things no other skills library does

| | Try it |
|---|---|
| **🏛 The Boardroom** — five AI executives (a CFO who kills unpriced assumptions, a sceptical VC…) debate your PRD in rounds, then a Chair issues a verdict memo with *the changes that would survive the room*. 🔊 Theatre mode: they argue **out loud**. | [boardroom](https://mohitagw15856.github.io/pm-claude-skills/boardroom.html) |
| **🏢 The Firm** — charter a standing AI staff who file delta-aware memos on your metrics/customers/market, **hold board meetings without you**, and log falsifiable predictions you score later — each staff member earns a visible calibration record. | [firm](https://mohitagw15856.github.io/pm-claude-skills/firm.html) |
| **🏆 The Interview Gauntlet** — job posting → decoded role → your stories forged → live cross-examination (answer **by voice**) → salary negotiation against a hidden band → readiness score /100 + a frameable certificate. | [gauntlet](https://mohitagw15856.github.io/pm-claude-skills/gauntlet.html) |
| **🩻 Document X-ray** — every sentence heat-mapped by evidence strength (data · sourced · assertion · superlative · hidden assumption), load-bearing lines outlined, weakest claims listed to fix first. | [xray](https://mohitagw15856.github.io/pm-claude-skills/xray.html) |
| **🎛 Living artifacts** — RICE results render as a live board: drag the confidence slider, watch the ranking re-sort. Journeys draw their emotion curve; health checks animate their gauges. | [playground](https://mohitagw15856.github.io/pm-claude-skills/) |
| **🥊 The Gym** — negotiate a salary/renewal/vendor deal against an AI with a *secret* bottom line; the debrief reveals what was actually achievable and scores you against it. | [gym](https://mohitagw15856.github.io/pm-claude-skills/gym.html) |

Plus: **🌌 [the Skill Galaxy](https://mohitagw15856.github.io/pm-claude-skills/galaxy.html)** (the library as a star map — take the ▶ Sky tour), **🔏 [verifiable attestations](https://mohitagw15856.github.io/pm-claude-skills/verify.html)** on every Boardroom verdict, and **📷 vision skills** that read your whiteboard photos and competitor screenshots.

---

## 🗂 What's inside

**731 skills · 76 profession bundles · 31 fields** — product, engineering, customer success, marketing/GTM, data, design, sales, HR, legal, finance, founders, security, government, healthcare, education, real estate, and more. Highlights by job-to-do:

| You need… | Reach for |
|---|---|
| Product docs that ship | `prd-template` · `rice-prioritisation` · `okr-builder` · `roadmap-narrative` |
| Engineering rituals | `incident-postmortem` · `architecture-decision-record` · `code-review-checklist` · `ai-code-review` |
| Exec & board comms | `executive-update` · `stakeholder-update` · `board-deck-narrative` |
| Customer success | `cs-health-scorecard` · `churn-analysis` · `renewal-playbook` · `qbr-deck` |
| **The agent era** 🆕 | `mcp-server-spec` · `agent-readiness-audit` · `agent-era-pricing` · `human-in-the-loop-design` |
| **AI at work** 🆕 | `ai-usage-policy` · `ai-roi-audit` · `role-redesign-for-ai` · `ai-assisted-performance-review` |
| Your career | the `pm-personal` bundle (résumé → LinkedIn → portfolio) + the Gauntlet |

Every **Production-Ready** skill ships `references/` (the judgment calls) + `templates/` (fill-in worksheets). **11 chained recipes** turn fuzzy asks into finished artifact sets: `/ship-a-feature`, `/land-a-job`, `/ship-an-mcp-server`, `/adopt-ai-properly`… **En español también** — the Production-Ready tier is translated (`i18n/es`), and any skill runs in 10 output languages from the playground.

---

## 🔌 Install anywhere

| Where you work | One line |
|---|---|
| **Claude Code** (skills + 4 agents + 21 commands + hooks) | `npx pm-claude-skills add --agent claude` |
| **Cursor / Codex / Windsurf / 60+ agents** | `npx pm-claude-skills add --agent cursor` *(etc.)* |
| **Any MCP client, on demand** | `claude mcp add pm-skills -- npx -y pm-claude-skills-mcp` |
| **ChatGPT / Claude.ai connector (hosted)** | `https://pm-skills-mcp.pm-claude-skills.workers.dev/` |
| **Python (LangChain / CrewAI)** | `pip install pm-skills` |
| **Claude Code plugin marketplace** | `/plugin marketplace add mohitagw15856/pm-claude-skills` |
| **GitHub CI** (PR descriptions, changelogs, postmortem scaffolds, doc lint) | copy one file from [`action/examples/`](action/examples/) |
| **Browser extension** — insert skills into ChatGPT/Claude/Gemini + **lint your own writing** against a skill's quality bar | [`extension/`](extension/) |

## 🧠 Memory that compounds

The **[Professional Brain](BRAIN.md)**: a local, plain-markdown memory the skills read before answering and write to after (approval-gated, provenance-tagged `[data]→[hunch]`, no vector DB). The **`outcome-tracker`** skill records every decision's falsifiable predictions and scores your frameworks against reality — and The Firm's staff carry the resulting calibration on their cards.

## 🏗 It's infrastructure, not just a library

- **📜 [SkillSpec](SKILLSPEC.md)** — the formal `SKILL.md` standard (conformance L1–L4), SkillCheck as reference validator; security-audited in CI
- **🏛 [SkillBench](skillbench/)** — the benchmark for AI on *professional work*: 12 frozen tasks, every model scored bare vs. skill-instructed
- **🌐 [Community registry](community/)** — publish `you/skill-name` via one PR; your skill stays in your repo, served live over REST + MCP
- **🤝 Agents can hire it** — A2A discovery card + `message/send` on the hosted worker; **[MCP pairings](connectors/mcp-pairings.md)** make skills *act* (meeting notes file themselves in Notion, updates post to Slack — always approval-gated)
- **🌍 Read-only REST API** — `GET /v1/skills` · `/v1/search?q=` · `/v1/workflows` · `/v1/community` on the hosted worker (no auth, open CORS) → n8n, Lovable, Obsidian [connectors](connectors/)
- **🤗 Training data** — the library distilled into a dataset, published to Hugging Face on every release

---

**The numbers:** 731 skills · 88 bundles · 31 professions · 153 curated eval cases · 28 skills with published judge scores ([leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html)) · 11 recipes · MIT · everything runs client-side with **your** key.

<sub>⭐ **Star & share:** https://github.com/mohitagw15856/pm-claude-skills · 🚀 **Start:** https://mohitagw15856.github.io/pm-claude-skills/ · Built by [Mohit Aggarwal](https://medium.com/@mohit15856) · *PM stands for Professional.*</sub>
