# 🧠 PM Skills — 743 Professional Agent Skills for Claude, ChatGPT, Gemini, Cursor, Codex & Hermes

[![In the official Anthropic plugin directory](https://img.shields.io/badge/Anthropic%20Plugin%20Directory-Published-D97757?logo=anthropic&logoColor=white)](#-quick-start)
[![Stars](https://img.shields.io/github/stars/mohitagw15856/pm-claude-skills?style=social)](https://github.com/mohitagw15856/pm-claude-skills/stargazers)
[![npm](https://img.shields.io/npm/v/pm-claude-skills?logo=npm&color=cb3837)](https://www.npmjs.com/package/pm-claude-skills)
[![PyPI](https://img.shields.io/pypi/v/pm-skills?logo=pypi&logoColor=white&color=3775A9&label=pip)](https://pypi.org/project/pm-skills/)
[![Skills](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fmohitagw15856.github.io%2Fpm-claude-skills%2Fskills.json&query=%24.count&label=skills&color=blue)](SKILLS.md)
[![SkillCheck](https://img.shields.io/github/actions/workflow/status/mohitagw15856/pm-claude-skills/skillcheck.yml?branch=main&label=SkillCheck)](.github/workflows/skillcheck.yml)
[![Security Audit](https://img.shields.io/github/actions/workflow/status/mohitagw15856/pm-claude-skills/skill-audit.yml?branch=main&label=security%20audit)](.github/workflows/skill-audit.yml)
[![Version](https://img.shields.io/github/v/release/mohitagw15856/pm-claude-skills?label=version&color=brightgreen)](https://github.com/mohitagw15856/pm-claude-skills/releases)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-❤️-ff69b4)](https://github.com/sponsors/mohitagw15856)

**A library of 743 skills — each one a plain `SKILL.md` file that teaches your AI assistant to do one professional task properly.** Decode a lease before you sign it. Write a PRD your team can execute. Simulate the promotion committee before the real one meets. Check the weather with zero API keys. Generic AI gives you filler; these give you the structure a senior professional actually uses.

Works natively in **Claude Code** and **Hermes Agent**, with ready-to-paste exports for **ChatGPT, Gemini, Cursor, Codex** and 8 more tools. *(PM stands for Professional, not just Product Management.)*

## ⚡ Quick start

| You want to… | Do this |
|---|---|
| **Browse the skills** | **[SKILLS.md](SKILLS.md)** — the full catalog · or the [searchable web catalog](https://mohitagw15856.github.io/pm-claude-skills/catalog.html) |
| **Install in Claude Code** | `/plugin` → search **pm-skills** *(it's in the official Anthropic directory)* — or `npx pm-claude-skills add --agent claude` |
| **Install in Cursor / Codex / Windsurf / Cline…** | `npx pm-claude-skills add --agent cursor` *(or `codex`, `windsurf`, `aider`, `cline`, `zed`…)* |
| **Use one skill in ChatGPT / Gemini** | Copy it from [`exports/chatgpt/`](exports/chatgpt/) or [`exports/gemini/`](exports/gemini/) and paste as instructions |
| **Skills over MCP, in any session** | `claude mcp add pm-skills -- npx -y pm-claude-skills-mcp` |

No `npm install` needed — `npx pm-claude-skills …` always runs the latest. `npx pm-claude-skills list` shows everything in your terminal. Full per-tool instructions: **[docs/installation.md](docs/installation.md)**.

## 📚 The skills

Every skill follows the same discipline: what it produces, the inputs it needs, a real framework (severity scales, decision rules — not vibes), a concrete output template, quality checks, and anti-patterns. All 743 pass the [SkillSpec](SKILLSPEC.md) L3 gate and a security audit in CI.

### For everyone — life's paperwork and decisions

| Family | What it does | Examples (of many) |
|---|---|---|
| 🔍 **Decoders** (25+) | Read the document *before* you sign it — plain language, 🔴🟡🟢 severity, the money math | [lease](skills/lease-decoder/SKILL.md) · [medical bill](skills/medical-bill-decoder/SKILL.md) · [job offer](skills/benefits-decoder/SKILL.md) · [severance](skills/severance-agreement-decoder/SKILL.md) · [insurance policy](skills/insurance-policy-decoder/SKILL.md) · [contractor quote](skills/home-contractor-quote-decoder/SKILL.md) · [timeshare](skills/timeshare-contract-decoder/SKILL.md) |
| 🎭 **Simulators** | Face the adversary early — the real meeting, then an out-of-character debrief | [salary negotiation](skills/salary-negotiation/SKILL.md) · [promotion committee](skills/the-promotion-committee/SKILL.md) · [thesis defense](skills/the-thesis-defense/SKILL.md) · [visa interview](skills/the-visa-interview/SKILL.md) · [due-diligence call](skills/the-due-diligence-call/SKILL.md) |
| 🧮 **Calculators** | Deterministic Python scripts + honest models — assumptions labeled, no false precision | [rent vs buy](skills/rent-vs-buy/SKILL.md) · [FIRE number](skills/fire-number/SKILL.md) · [debt payoff](skills/debt-payoff/SKILL.md) · [raise vs jump](skills/raise-vs-jump/SKILL.md) · [daycare vs stay-home](skills/daycare-vs-stay-home/SKILL.md) |
| 📡 **Live data** (17) | Real-time answers with **zero API keys** — weather, rates, flights, scores, all over plain curl | [weather](skills/weather-now/SKILL.md) · [currency](skills/currency-rates/SKILL.md) · [crypto](skills/crypto-prices/SKILL.md) · [flights](skills/flight-tracker/SKILL.md) · [earthquakes](skills/earthquake-watch/SKILL.md) · [is-it-down](skills/site-check/SKILL.md) |
| 🏠 **Life admin** | The unglamorous logistics, done in order | [relocation](skills/relocation-planner/SKILL.md) · [new parent](skills/new-parent-logistics/SKILL.md) · [caregiving](skills/caregiver-coordination/SKILL.md) · [doctor visits](skills/doctor-visit-prep/SKILL.md) · [records requests](skills/medical-records-request/SKILL.md) |
| 💼 **Career moments** | The weeks that decide years | [layoff kit](plugins/pm-layoff/) · [resignation kit](plugins/pm-resignation/) · [PIP response](skills/pip-responder/SKILL.md) · [first 90 days as manager](skills/manager-first-90-days/SKILL.md) · [interview gauntlet](plugins/pm-jobsearch/) |
| 🧾 **Freelance & renters & parents** | Small bundles for specific lives | [pricing your services](skills/pricing-your-services/SKILL.md) · [late invoices](skills/late-invoice-escalation/SKILL.md) · [deposit recovery](skills/security-deposit-recovery/SKILL.md) · [IEP meetings](skills/iep-504-meeting-kit/SKILL.md) · [students](plugins/pm-students/) |
| 🤝 **Cowork** (100) | The office knowledge work an AI coworker actually does — the *frameworks* — [the whole bundle](plugins/pm-cowork/) | [email triage](skills/email-triage-system/SKILL.md) · [spreadsheet audit](skills/spreadsheet-audit/SKILL.md) · [meeting cost meter](skills/meeting-cost-meter/SKILL.md) · [deck outline first](skills/deck-outline-first/SKILL.md) · [saying no kindly](skills/saying-no-kindly/SKILL.md) · [delegation brief](skills/delegation-brief/SKILL.md) |
| ⚡ **Cowork · Live** (12) | The same jobs, *done* — Claude Cowork acts on your **real data** via connectors + sandbox and returns an artifact — [the whole bundle](plugins/pm-cowork-live/) | [inbox triage (live)](skills/inbox-triage-live/SKILL.md) · [meeting prep (live)](skills/meeting-prep-live/SKILL.md) · [spreadsheet audit (live)](skills/spreadsheet-audit-live/SKILL.md) · [deck from doc](skills/deck-from-doc/SKILL.md) · [thread → decision](skills/thread-to-decision-live/SKILL.md) · [PR description (live)](skills/pr-description-live/SKILL.md) |

### For professionals — 31 fields

| | | |
|---|---|---|
| 📋 [Product Management](plugins/pm-essentials/) | 💻 [Engineering](plugins/pm-engineering/) | 📣 [Marketing & GTM](plugins/pm-gtm/) |
| 🤝 [Customer Success](plugins/pm-cs/) | 📊 [Data & Analytics](plugins/pm-data/) | 👥 [Leadership & People](plugins/pm-people/) |
| 🎨 [Design & UX](plugins/pm-design/) | ⚖️ [Legal](plugins/pm-legal/) | 💰 [Finance](plugins/pm-finance/) |
| 🚀 [Founders](plugins/pm-founders/) | 🔐 [Security](plugins/pm-security/) | 🏛 [Government](plugins/pm-gov/) |

…plus HR, sales, operations, research, healthcare, educators, writers, social media, and more — **[the full profession index](SKILLS.md)**, or by bundle in [`plugins/`](plugins/) (89 bundles). Install any bundle: `/plugin install pm-decoders@pm-skills`.

### Meta

Before installing *anyone's* skills (including these): [skill-vetting](skills/skill-vetting/SKILL.md) — a security read for SKILL.md files. The library's own standard lives in [SKILLSPEC.md](SKILLSPEC.md); every skill's level is enforced in CI.

## 🔍 What a skill looks like

```markdown
---
name: lease-decoder
description: "Decode a residential lease into plain English and rank the
  clauses that can hurt you. Use when someone asks 'what am I signing'…"
---
## Framework: Severity Scale
- 🔴 Can cost you real money — auto-renewal into a full new term, break
  penalties beyond re-rental costs, deposit conditions written to fail…
```

That's the whole trick: it's markdown. Your agent reads it and gains the judgment; you can read it too, audit it, edit it, or [write your own](SKILL-AUTHORING-STANDARD.md). No lock-in, no runtime, no telemetry.

## 💸 Cut your token bill

The **[pm-tokens](plugins/pm-tokens)** bundle optimizes every stage of your agent's token journey — no API keys, stdlib Python, nothing leaves your machine. Five habits, typically **30–60% off a session's token flow**:

```bash
# 1. Map the repo instead of reading it (~3% of the cost of reading everything)
python3 skills/repo-map/scripts/repo_map.py .

# 2. Crush bulk before it enters context (98% smaller on uniform JSON; errors always survive)
python3 skills/context-crusher/scripts/context_crush.py --mode json --file response.json

# 3. Measure what anything costs — at YOUR prices, times YOUR call volume
python3 skills/token-cost/scripts/token_cost.py --file CLAUDE.md --price-in 3 --calls 200
```

Plus the judgment skills: [token-diet](skills/token-diet/SKILL.md) (output costs 3–5× input — diet it where safe), [context-budget](skills/context-budget/SKILL.md) (cache-aware layout: stable first, volatile last), and [session-handoff](skills/session-handoff/SKILL.md) (resume at ~5% of transcript size). **See your own breakdown in the [🪙 Token Dashboard](https://mohitagw15856.github.io/pm-claude-skills/tokens.html)** — paste what rides in your context, get computed per-piece savings, all in-browser. The full how-to: **[docs/SAVE-TOKENS.md](docs/SAVE-TOKENS.md)**.

## 🤝 Make the most of the cowork skills

The **[pm-cowork](plugins/pm-cowork)** bundle is 100 skills for the office work an AI coworker actually does. Install it (`/plugin install pm-cowork@pm-skills`), then — the whole trick — **describe your mess, don't name the skill**: say *"my inbox is 4,000 deep"*, *"nobody reads my status updates"*, *"this spreadsheet came from someone who left"* — the right skill activates on the ask.

**Start where it hurts:**

| Your pain | Say this | The skill that answers |
|---|---|---|
| Drowning in email | "triage my inbox and cut the volume at the source" | [email-triage-system](skills/email-triage-system/SKILL.md) → [inbox-unsubscribe-purge](skills/inbox-unsubscribe-purge/SKILL.md) |
| Calendar is all meetings | "audit my recurring meetings and price them" | [standing-meeting-audit](skills/standing-meeting-audit/SKILL.md) + [meeting-cost-meter](skills/meeting-cost-meter/SKILL.md) |
| Inherited a scary spreadsheet | "audit this sheet before we trust it" | [spreadsheet-audit](skills/spreadsheet-audit/SKILL.md) → [formula-detangler](skills/formula-detangler/SKILL.md) |
| Docs get rewritten in review | "outline first, get sign-off, then draft" | [outline-before-prose](skills/outline-before-prose/SKILL.md) |
| Weeks just happen to you | "set up my weekly review" | [weekly-review-ritual](skills/weekly-review-ritual/SKILL.md) — the hub the others plug into |

**Three habits that compound:** (1) **The weekly review is the keystone** — it feeds [task-triage-matrix](skills/task-triage-matrix/SKILL.md), [deep-work-blocking](skills/deep-work-blocking/SKILL.md), and [personal-wip-limits](skills/personal-wip-limits/SKILL.md) automatically. (2) **The skills chain on purpose** — email-to-tasks feeds the task triage; the meeting audit feeds async-instead; delegation-brief hands off what the triage says to shed — follow the links inside each skill. (3) **Teams adopt one norm at a time** — start with [agenda-or-cancel](skills/agenda-or-cancel/SKILL.md) or [working-agreements](skills/working-agreements/SKILL.md), let it stick, then add the next; the ten-norms-on-Monday rollout is how none of them survive.

## ✅ Quality, not just quantity

- **Every skill passes the [SkillSpec](SKILLSPEC.md) L3 gate** — structure, framework, quality checks, anti-patterns — enforced in CI on every commit
- **[Eval-scored](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html)** — 208 scored outputs, avg 4.8/5, judged blind
- **Security-audited** — a dedicated CI workflow sweeps every skill and script; calculators are stdlib-only and deterministic with byte-exact output tests
- **Honest by design** — decoders end with a not-legal-advice line, calculators name what they don't model, simulators debrief out of character, and skills that shouldn't ghostwrite (student statements) coach instead

## 🎁 Beyond the skills (the bonus material)

The library grew an ecosystem — all optional, all linked from the **[full showcase](docs/SHOWCASE.md)**:

**[▶ Skill Playground](https://mohitagw15856.github.io/pm-claude-skills/)** — try any skill in your browser, no install · **[📸 the Gallery](docs/GALLERY.md)** — the creative side, in screenshots · **[Anti-Pattern Museum](https://mohitagw15856.github.io/pm-claude-skills/museum.html)** — 2,900+ shareable rules · **[The Handbook](https://mohitagw15856.github.io/pm-claude-skills/handbook.html)** (also a [real printed book](docs/print/)) · **[Workflow recipes](WORKFLOWS.md)** · **[Subagents & slash commands](agents/)** · **[MCP server + REST API](mcp-remote/)** · **[n8n / Slack / Obsidian integrations](connectors/)** · **[The Boardroom](https://mohitagw15856.github.io/pm-claude-skills/boardroom.html)** · **[SkillBench](skillbench/)** · **[Org Edition](org/)** · **[🇪🇸 🇫🇷 🇨🇳 🇯🇵 translations](skills-i18n/)**

## 📄 The one-page cheatsheet

The whole library on one poster — start path, standout features, and install one-liners for every tool. Print it, share it, drop it in a slide.

<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/cheatsheet.html">
    <img src="web/docs-assets/cheatsheet.png" width="80%" alt="PM Skills cheatsheet — one link to start, the standout features, and install paths for every tool on one poster." />
  </a>
</p>

**[🖼️ PNG](https://mohitagw15856.github.io/pm-claude-skills/docs-assets/cheatsheet.png)** · **[📄 PDF](https://mohitagw15856.github.io/pm-claude-skills/docs-assets/cheatsheet.pdf)** · **[🌐 Live poster](https://mohitagw15856.github.io/pm-claude-skills/cheatsheet.html)** · **[📥 Markdown](CHEATSHEET.md)**

## 🆕 Latest

**v60.0.0 — Cowork goes live:** **[pm-cowork-live](plugins/pm-cowork-live)** — 12 Claude Cowork-*native* skills that act on your **real data** through connectors (Gmail, Calendar, Drive/Docs/Sheets, Notion, Slack, GitHub/Linear) and the sandbox, and return an artifact — inbox triage on the actual inbox, meeting prep from real events, spreadsheet audits that open the file, decision logs to Notion, PR descriptions from the real diff. Where the v59 [pm-cowork](plugins/pm-cowork) 100 teach the *frameworks*, these *do the work*. *Earlier — v59, the cowork century:* [pm-cowork](plugins/pm-cowork), 100 AI-coworker framework skills (630 → 743). Full history: **[CHANGELOG](CHANGELOG.md)** · [releases](https://github.com/mohitagw15856/pm-claude-skills/releases)

## 🤝 Contributing

Add a skill via PR ([the standard](SKILL-AUTHORING-STANDARD.md), [CONTRIBUTING](CONTRIBUTING.md)), request one via issue, or publish your own repo to the [community index](community/) and earn the badge. Translations follow the pattern in [`skills-i18n/`](skills-i18n/).

## ❤️ Support

If a skill saved you real money or a real mistake, **[star the repo](https://github.com/mohitagw15856/pm-claude-skills/stargazers)** — it's how others find it. Sponsors fund the playground's free runs and get [naming rights, not influence](docs/SPONSORSHIP.md): **[become a sponsor](https://github.com/sponsors/mohitagw15856)**.

## 📄 License

MIT — use them, fork them, ship them at work. Skills are judgment, and judgment wants to be free.

---

*Built by [Mohit](https://github.com/mohitagw15856) with Claude. 743 skills · 89 bundles · 31 professions · every commit gated. The long version of this README — every feature, wave, and frontier bet — lives in the **[Showcase](docs/SHOWCASE.md)**.*
