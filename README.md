# 🧠 PM Skills — 958 Professional Agent Skills for Claude, ChatGPT, Gemini, Cursor, Codex & Hermes

<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/">
    <img src="web/docs-assets/hero.svg" width="100%" alt="PM Skills — 958 professional skills your AI assistant can read. Plain markdown, works with Claude, ChatGPT, Gemini, Cursor, and Codex. MIT licensed." />
  </a>
</p>

[![In the official Anthropic plugin directory](https://img.shields.io/badge/Anthropic%20Plugin%20Directory-Published-D97757?logo=anthropic&logoColor=white)](#-quick-start)
[![Stars](https://img.shields.io/github/stars/mohitagw15856/pm-claude-skills?style=social)](https://github.com/mohitagw15856/pm-claude-skills/stargazers)
[![npm](https://img.shields.io/npm/v/pm-claude-skills?logo=npm&color=cb3837)](https://www.npmjs.com/package/pm-claude-skills)
[![PyPI](https://img.shields.io/pypi/v/pm-skills?logo=pypi&logoColor=white&color=3775A9&label=pip)](https://pypi.org/project/pm-skills/)
[![Skills](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fmohitagw15856.github.io%2Fpm-claude-skills%2Fskills.json&query=%24.count&label=skills&color=blue)](SKILLS.md)
[![SkillCheck](https://img.shields.io/github/actions/workflow/status/mohitagw15856/pm-claude-skills/skillcheck.yml?branch=main&label=SkillCheck)](.github/workflows/skillcheck.yml)
[![SkillSpec](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmohitagw15856%2Fpm-claude-skills%2Fmain%2Fconformance%2Fbadge.json)](conformance/REGISTRY.md)
[![Security Audit](https://img.shields.io/github/actions/workflow/status/mohitagw15856/pm-claude-skills/skill-audit.yml?branch=main&label=security%20audit)](.github/workflows/skill-audit.yml)
[![Version](https://img.shields.io/github/v/release/mohitagw15856/pm-claude-skills?label=version&color=brightgreen)](https://github.com/mohitagw15856/pm-claude-skills/releases)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-❤️-ff69b4)](https://github.com/sponsors/mohitagw15856)
[![Listed in Awesome Claude Skills](https://img.shields.io/badge/Awesome%20Claude%20Skills-listed-fc60a8?logo=awesomelists&logoColor=white)](https://github.com/BehiSecc/awesome-claude-skills)
[![Skill of the day](https://img.shields.io/endpoint?url=https%3A%2F%2Fpm-skills-mcp.pm-claude-skills.workers.dev%2Ftoday%2Fbadge)](https://pm-skills-mcp.pm-claude-skills.workers.dev/today.json)
[![Free runs served](https://img.shields.io/endpoint?url=https%3A%2F%2Fpm-skills-mcp.pm-claude-skills.workers.dev%2Ftry%2Fstats)](https://mohitagw15856.github.io/pm-claude-skills/)
[![Website & newsletter](https://img.shields.io/badge/website-catalogue%20%26%20newsletter-d9605a)](https://site-jet-seven-34.vercel.app)

## What is PM Skills?

<!-- AEO Answer Capsule — 68 words -->
PM Skills is an open-source library of 958 Agent Skills — plain-markdown SKILL.md files that teach an AI assistant to do one professional task to a senior professional's standard, from writing a PRD to decoding a lease or running a blameless postmortem. Each skill bundles the framework, an output template, quality checks, and anti-patterns. It is MIT-licensed and works with Claude, ChatGPT, Gemini, Cursor, and Codex.
<!-- End AEO Capsule -->

**Decode a lease before you sign it. Write a PRD your team can execute. Simulate the promotion committee before the real one meets. Check the weather with zero API keys.** Generic AI gives you filler; these give you the structure a senior professional actually uses.

Works natively in **Claude Code** and **Hermes Agent**, with ready-to-paste exports for **ChatGPT, Gemini, Cursor, Codex** and 8 more tools. *(PM stands for Professional, not just Product Management.)*

<p align="center">
  <a href="docs/installation.md"><img src="https://img.shields.io/badge/Claude_Code-native-D97757?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude Code — native"></a>
  <a href="exports/chatgpt/"><img src="https://img.shields.io/badge/ChatGPT-exports-74aa9c?style=for-the-badge&logo=openai&logoColor=white" alt="ChatGPT exports"></a>
  <a href="exports/gemini/"><img src="https://img.shields.io/badge/Gemini-exports-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini exports"></a>
  <a href="docs/installation.md"><img src="https://img.shields.io/badge/Cursor_·_Codex_·_Windsurf-one_command-1a1a2e?style=for-the-badge" alt="Cursor, Codex, Windsurf — one command"></a>
  <a href="mcp-remote/"><img src="https://img.shields.io/badge/MCP-any_client-8a5cf5?style=for-the-badge" alt="MCP — any client"></a>
  <br>
  <a href="integrations/telegram/"><img src="https://img.shields.io/badge/Telegram-bot-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram bot"></a>
  <a href="integrations/slack-app/"><img src="https://img.shields.io/badge/Slack-%2Fskill-4A154B?style=for-the-badge&logo=slack&logoColor=white" alt="Slack app"></a>
  <a href="integrations/raycast/"><img src="https://img.shields.io/badge/Raycast-launcher-FF6363?style=for-the-badge&logo=raycast&logoColor=white" alt="Raycast launcher"></a>
  <a href="integrations/obsidian-plugin/"><img src="https://img.shields.io/badge/Obsidian-plugin-7C3AED?style=for-the-badge&logo=obsidian&logoColor=white" alt="Obsidian plugin"></a>
  <a href="connectors/"><img src="https://img.shields.io/badge/n8n-connector-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n connector"></a>
  <br>
  <a href="https://pypi.org/project/pm-skills/"><img src="https://img.shields.io/badge/Python-pip_install_pm--skills-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python — pip install pm-skills"></a>
  <a href="dataset/"><img src="https://img.shields.io/badge/🤗_Hugging_Face-dataset-FFD21E?style=for-the-badge" alt="Hugging Face dataset"></a>
  <a href="Dockerfile"><img src="https://img.shields.io/badge/Docker-ghcr_image-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker image on ghcr"></a>
  <a href="action/"><img src="https://img.shields.io/badge/GitHub_Actions-CI_skills-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions"></a>
</p>

## 🐣 New here? Pick a door — each takes about 30 seconds

1. **Just looking →** open the **[▶ Playground](https://mohitagw15856.github.io/pm-claude-skills/)** and run a skill in your browser. Nothing to install, nothing to sign up for.
2. **You use Claude Code →** type `/plugin`, search **pm-skills**, install. Done — ask *"decode this lease"* and watch.
3. **You use anything else →** `npx pm-claude-skills add` and pick your tool from the menu (Cursor, Codex, Windsurf, ChatGPT, Gemini…).
4. **Want the guided tour →** browse the searchable **[catalogue site](https://site-jet-seven-34.vercel.app)** and subscribe to get an email whenever new skills launch.

**Nothing here can scare your setup.** A skill is a markdown file your AI reads — no runtime, no telemetry, no accounts. Installing copies text files; uninstalling is deleting them. Skeptical? Good instinct: [read one first](skills/lease-decoder/SKILL.md) — it's designed to be read by humans too.

**Don't know what to look for?** Describe your task in plain words at **[🔎 find](https://mohitagw15856.github.io/pm-claude-skills/find.html)** — *"my landlord kept my deposit"*, *"board meeting on Thursday"* — and it names the skill.

<p align="center">
  <a href="https://site-jet-seven-34.vercel.app/#subscribe"><img src="https://img.shields.io/badge/📬_Get_the_newsletter-Subscribe_free-d9605a?style=for-the-badge" alt="Subscribe to the PM Skills newsletter"></a>
</p>

**Never miss a new skill.** New ones drop regularly — **[subscribe to the newsletter](https://site-jet-seven-34.vercel.app/#subscribe)** and get a short email with a real example whenever they launch. No spam, unsubscribe anytime. Prefer no email? **[Follow via RSS](https://mohitagw15856.github.io/pm-claude-skills/feed.xml)** or browse the **[newsletter archive](https://mohitagw15856.github.io/pm-claude-skills/newsletters/)**.

## ✨ See it in action

It's not just a folder of files — the whole library is explorable, runnable, and a little bit magic. All of this runs **in your browser, free, nothing to install:**

<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/"><img src="web/docs-assets/playground-demo.gif" width="90%" alt="The Skill Playground: pick the Executive Update skill, fill in a few notes, hit run, and watch a structured executive briefing stream out — all in the browser" /></a>
  <br /><sub><b>▶ Pick a skill → fill a short form → run it → a senior-grade artifact streams out.</b> No install, your key stays in your browser (or run free with no key).</sub>
</p>

<table>
<tr>
<td width="50%" align="center">
<a href="https://mohitagw15856.github.io/pm-claude-skills/galaxy3d.html"><img src="web/docs-assets/demo-galaxy.gif" width="100%" alt="Galaxy 3D — fly through all 958 skills as a glowing constellation you orbit and click into" /></a>
<br /><sub><b>🌌 <a href="https://mohitagw15856.github.io/pm-claude-skills/galaxy3d.html">Galaxy 3D</a></b> — fly through all 958 skills as a living constellation. The ones you've run burn brighter.</sub>
</td>
<td width="50%" align="center">
<a href="https://mohitagw15856.github.io/pm-claude-skills/wrapped.html"><img src="web/docs-assets/demo-holo.gif" width="100%" alt="PM Skills Wrapped — your practice turned into a shareable, Spotify-Wrapped-style story" /></a>
<br /><sub><b>🎁 <a href="https://mohitagw15856.github.io/pm-claude-skills/wrapped.html">Wrapped</a></b> — your practice, as a shareable story. 100% local — nothing leaves your browser.</sub>
</td>
</tr>
</table>

▶ **[Open the Playground](https://mohitagw15856.github.io/pm-claude-skills/)** to run any of the 958 skills with your own key — or just [browse them all](SKILLS.md).

## 💬 What can I ask it to do?

Anything below is a real ask that activates a real skill — say it in your own words, the description does the routing:

| | | |
|---|---|---|
| 🏠 *"decode this lease before I sign"* → [lease-decoder](skills/lease-decoder/SKILL.md) | 📋 *"write the PRD for our referral feature"* → [prd-template](skills/prd-template/SKILL.md) | 🚨 *"blameless postmortem for Friday's outage"* → [incident-postmortem](skills/incident-postmortem/SKILL.md) |
| 💰 *"practice my salary negotiation"* → [salary-negotiation](skills/salary-negotiation/SKILL.md) | 📉 *"why is churn up this quarter?"* → [churn-analysis](skills/churn-analysis/SKILL.md) | ⚖️ *"rank the backlog with RICE"* → [rice-prioritisation](skills/rice-prioritisation/SKILL.md) |
| 🛂 *"prep me for the visa interview"* → [the-visa-interview](skills/the-visa-interview/SKILL.md) | 🔨 *"is this contractor quote fair?"* → [home-contractor-quote-decoder](skills/home-contractor-quote-decoder/SKILL.md) | 🏡 *"should we rent or buy?"* → [rent-vs-buy](skills/rent-vs-buy/SKILL.md) |
| 📝 *"draft my self-review honestly"* → [performance-review](skills/performance-review/SKILL.md) | 🚀 *"are we ready to launch?"* → [product-launch-checklist](skills/product-launch-checklist/SKILL.md) | 📬 *"my inbox is 4,000 deep"* → [email-triage-system](skills/email-triage-system/SKILL.md) |

…all 958 asks live in **[the catalog](SKILLS.md)**.

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

Every skill follows the same discipline: what it produces, the inputs it needs, a real framework (severity scales, decision rules — not vibes), a concrete output template, quality checks, and anti-patterns. All 958 pass the [SkillSpec](SKILLSPEC.md) L3 gate and a security audit in CI.

<table align="center">
  <tr align="center">
    <td><a href="plugins/pm-decoders/"><img src="web/docs-assets/logos/pm-decoders.svg" width="84" alt="Decoders bundle crest"/></a></td>
    <td><a href="plugins/pm-simulators/"><img src="web/docs-assets/logos/pm-simulators.svg" width="84" alt="Simulators bundle crest"/></a></td>
    <td><a href="plugins/pm-calculators/"><img src="web/docs-assets/logos/pm-calculators.svg" width="84" alt="Calculators bundle crest"/></a></td>
    <td><a href="plugins/pm-live/"><img src="web/docs-assets/logos/pm-live.svg" width="84" alt="Live data bundle crest"/></a></td>
    <td><a href="plugins/pm-cowork/"><img src="web/docs-assets/logos/pm-cowork.svg" width="84" alt="Cowork bundle crest"/></a></td>
    <td><a href="plugins/pm-tokens/"><img src="web/docs-assets/logos/pm-tokens.svg" width="84" alt="Tokens bundle crest"/></a></td>
    <td><a href="plugins/pm-seatbelt/"><img src="web/docs-assets/logos/pm-seatbelt.svg" width="84" alt="Seatbelt bundle crest"/></a></td>
    <td><a href="plugins/pm-essentials/"><img src="web/docs-assets/logos/pm-essentials.svg" width="84" alt="Essentials bundle crest"/></a></td>
  </tr>
  <tr align="center">
    <td><a href="plugins/pm-decoders/"><b>Decoders</b></a></td>
    <td><a href="plugins/pm-simulators/"><b>Simulators</b></a></td>
    <td><a href="plugins/pm-calculators/"><b>Calculators</b></a></td>
    <td><a href="plugins/pm-live/"><b>Live&nbsp;data</b></a></td>
    <td><a href="plugins/pm-cowork/"><b>Cowork</b></a></td>
    <td><a href="plugins/pm-tokens/"><b>Tokens</b></a></td>
    <td><a href="plugins/pm-seatbelt/"><b>Seatbelt</b></a></td>
    <td><a href="plugins/pm-essentials/"><b>Essentials</b></a></td>
  </tr>
</table>

### For everyone — life's paperwork and decisions

| Family | What it does | Examples (of many) |
|---|---|---|
| 🔍 **Decoders** (25+) | Read the document *before* you sign it — plain language, 🔴🟡🟢 severity, the money math | [lease](skills/lease-decoder/SKILL.md) · [medical bill](skills/medical-bill-decoder/SKILL.md) · [job offer](skills/benefits-decoder/SKILL.md) · [severance](skills/severance-agreement-decoder/SKILL.md) · [insurance policy](skills/insurance-policy-decoder/SKILL.md) · [contractor quote](skills/home-contractor-quote-decoder/SKILL.md) · [timeshare](skills/timeshare-contract-decoder/SKILL.md) |
| 🎭 **Simulators** | Face the adversary early — the real meeting, then an out-of-character debrief | [salary negotiation](skills/salary-negotiation/SKILL.md) · [promotion committee](skills/the-promotion-committee/SKILL.md) · [thesis defense](skills/the-thesis-defense/SKILL.md) · [visa interview](skills/the-visa-interview/SKILL.md) · [due-diligence call](skills/the-due-diligence-call/SKILL.md) |
| 🧮 **Calculators** | Deterministic Python scripts + honest models — assumptions labeled, no false precision | [rent vs buy](skills/rent-vs-buy/SKILL.md) · [FIRE number](skills/fire-number/SKILL.md) · [debt payoff](skills/debt-payoff/SKILL.md) · [raise vs jump](skills/raise-vs-jump/SKILL.md) · [daycare vs stay-home](skills/daycare-vs-stay-home/SKILL.md) |
| 📡 **Live data** (17) | Real-time answers with **zero API keys** — weather, rates, flights, scores, all over plain curl | [weather](skills/weather-now/SKILL.md) · [currency](skills/currency-rates/SKILL.md) · [crypto](skills/crypto-prices/SKILL.md) · [flights](skills/flight-tracker/SKILL.md) · [earthquakes](skills/earthquake-watch/SKILL.md) · [is-it-down](skills/site-check/SKILL.md) |
| 🏠 **Life admin** | The unglamorous logistics, done in order | [relocation](skills/relocation-planner/SKILL.md) · [new parent](skills/new-parent-logistics/SKILL.md) · [caregiving](skills/caregiver-coordination/SKILL.md) · [doctor visits](skills/doctor-visit-prep/SKILL.md) · [records requests](skills/medical-records-request/SKILL.md) |
| 💼 **Career moments** | The weeks that decide years | [layoff kit](plugins/pm-layoff/) · [resignation kit](plugins/pm-resignation/) · [PIP response](skills/pip-responder/SKILL.md) · [first 90 days as manager](skills/manager-first-90-days/SKILL.md) · [interview gauntlet](plugins/pm-jobsearch/) |
| 🏛 **Dead mentors** (5) 🆕 | History's sharpest operators, resurrected — the *real* methods from public-domain classics, applied to modern work | [Machiavelli on office politics](skills/machiavelli-counsel/SKILL.md) · [Sun Tzu on picking your fights](skills/sun-tzu-strategy-brief/SKILL.md) · [Franklin's decision algebra](skills/franklin-decision-ledger/SKILL.md) · [Marcus Aurelius on bad days](skills/stoic-setback-debrief/SKILL.md) · [Bennett's 1908 time audit](skills/bennett-time-audit/SKILL.md) |
| ⚡ **New-gen** (10) 🆕 | How the next generation lives and earns — creator deals, clips, D&D, ranked, resale, the attention war | [creator-deal-decoder](skills/creator-deal-decoder/SKILL.md) · [clip-factory](skills/clip-factory/SKILL.md) · [ttrpg-session-forge](skills/ttrpg-session-forge/SKILL.md) · [the-vibe-check](skills/the-vibe-check/SKILL.md) · [ranked-climb-coach](skills/ranked-climb-coach/SKILL.md) · [attention-reset](skills/attention-reset/SKILL.md) |
| 🔮 **2027** (10) 🆕 | Problems you don't have yet, but will — the agent era's operational skills | [agent-severance](skills/agent-severance/SKILL.md) · [deepfake-drill](skills/deepfake-drill/SKILL.md) · [agent-hiring-panel](skills/agent-hiring-panel/SKILL.md) · [context-bankruptcy](skills/context-bankruptcy/SKILL.md) · [clone-brief](skills/clone-brief/SKILL.md) · [api-for-yourself](skills/api-for-yourself/SKILL.md) · [the-org-simulator](skills/the-org-simulator/SKILL.md) |
| 🎲 **Tabletop** (5) 🆕 | Game night, upgraded — teach, judge, plan, design, and practice the trades | [teach-the-game](skills/teach-the-game/SKILL.md) · [rules-lawyer](skills/rules-lawyer/SKILL.md) · [game-night-planner](skills/game-night-planner/SKILL.md) · [board-game-designer](skills/board-game-designer/SKILL.md) · [tabletop-negotiator](skills/tabletop-negotiator/SKILL.md) |
| 🧾 **Freelance & renters & parents** | Small bundles for specific lives | [pricing your services](skills/pricing-your-services/SKILL.md) · [late invoices](skills/late-invoice-escalation/SKILL.md) · [deposit recovery](skills/security-deposit-recovery/SKILL.md) · [IEP meetings](skills/iep-504-meeting-kit/SKILL.md) · [students](plugins/pm-students/) |
| 🎲 **Hobbies** (12) 🆕 | Life outside work — the genuinely fun stuff | [wine pairing](skills/wine-pairing/SKILL.md) · [houseplant care](skills/houseplant-care/SKILL.md) · [board-game night](skills/board-game-night-planner/SKILL.md) · [D&D campaign](skills/dnd-campaign-starter/SKILL.md) · [stargazing](skills/stargazing-tonight/SKILL.md) · [chess openings](skills/chess-opening-coach/SKILL.md) |
| 💪 **Wellbeing** (12) 🆕 | Body and mind, sustainably — not another app streak | [home workout](skills/home-workout-builder/SKILL.md) · [sleep reset](skills/sleep-reset-plan/SKILL.md) · [habit builder](skills/habit-builder/SKILL.md) · [posture reset](skills/posture-reset-plan/SKILL.md) · [screen-time detox](skills/screen-time-detox/SKILL.md) |
| 🔐 **Digital self-defense** (12) 🆕 | When your digital life is under attack | [identity-theft recovery](skills/identity-theft-recovery/SKILL.md) · [phishing triage](skills/phishing-triage/SKILL.md) · [account recovery](skills/account-recovery-plan/SKILL.md) · [data-broker removal](skills/data-broker-removal/SKILL.md) · [doxxing response](skills/doxxing-response/SKILL.md) |
| 👪 **Family & relationships** (12) 🆕 | The people who matter | [new-baby logistics](skills/new-baby-logistics/SKILL.md) · [wedding vows](skills/wedding-vows-writer/SKILL.md) · [co-parenting messages](skills/co-parenting-messages/SKILL.md) · [condolences](skills/condolence-message-helper/SKILL.md) · [in-law boundaries](skills/in-law-boundary-scripts/SKILL.md) |
| 🤝 **Cowork** (100) | The office knowledge work an AI coworker actually does — the *frameworks* — [the whole bundle](plugins/pm-cowork/) | [email triage](skills/email-triage-system/SKILL.md) · [spreadsheet audit](skills/spreadsheet-audit/SKILL.md) · [meeting cost meter](skills/meeting-cost-meter/SKILL.md) · [deck outline first](skills/deck-outline-first/SKILL.md) · [saying no kindly](skills/saying-no-kindly/SKILL.md) · [delegation brief](skills/delegation-brief/SKILL.md) |
| ⚡ **Cowork · Live** (12) | The same jobs, *done* — Claude Cowork acts on your **real data** via connectors + sandbox and returns an artifact — [the whole bundle](plugins/pm-cowork-live/) | [inbox triage (live)](skills/inbox-triage-live/SKILL.md) · [meeting prep (live)](skills/meeting-prep-live/SKILL.md) · [spreadsheet audit (live)](skills/spreadsheet-audit-live/SKILL.md) · [deck from doc](skills/deck-from-doc/SKILL.md) · [thread → decision](skills/thread-to-decision-live/SKILL.md) · [PR description (live)](skills/pr-description-live/SKILL.md) |

### For professionals — 35 fields

| | | |
|---|---|---|
| <img src="web/docs-assets/logos/pm-essentials.svg" width="20" alt=""/> [Product Management](plugins/pm-essentials/) | <img src="web/docs-assets/logos/pm-engineering.svg" width="20" alt=""/> [Engineering](plugins/pm-engineering/) | <img src="web/docs-assets/logos/pm-gtm.svg" width="20" alt=""/> [Marketing & GTM](plugins/pm-gtm/) |
| <img src="web/docs-assets/logos/pm-cs.svg" width="20" alt=""/> [Customer Success](plugins/pm-cs/) | <img src="web/docs-assets/logos/pm-data.svg" width="20" alt=""/> [Data & Analytics](plugins/pm-data/) | <img src="web/docs-assets/logos/pm-people.svg" width="20" alt=""/> [Leadership & People](plugins/pm-people/) |
| <img src="web/docs-assets/logos/pm-design.svg" width="20" alt=""/> [Design & UX](plugins/pm-design/) | <img src="web/docs-assets/logos/pm-legal.svg" width="20" alt=""/> [Legal](plugins/pm-legal/) | <img src="web/docs-assets/logos/pm-finance.svg" width="20" alt=""/> [Finance](plugins/pm-finance/) |
| <img src="web/docs-assets/logos/pm-founders.svg" width="20" alt=""/> [Founders](plugins/pm-founders/) | <img src="web/docs-assets/logos/pm-security.svg" width="20" alt=""/> [Security](plugins/pm-security/) | <img src="web/docs-assets/logos/pm-gov.svg" width="20" alt=""/> [Government](plugins/pm-gov/) |

…plus HR, sales, operations, research, healthcare, educators, writers, social media, and more — **[the full profession index](SKILLS.md)**, or by bundle in [`plugins/`](plugins/) (108 bundles). Install any bundle: `/plugin install pm-decoders@pm-skills`.

### Meta

Before installing *anyone's* skills (including these): [skill-vetting](skills/skill-vetting/SKILL.md) — a security read for SKILL.md files. The library's own standard lives in [SKILLSPEC.md](SKILLSPEC.md); every skill's level is enforced in CI.

## 🔍 What does a skill look like?

<!-- AEO Answer Capsule — 62 words -->
A skill is a single markdown file with a name, a description that tells the assistant when to activate it, and a body containing the working framework: required inputs, decision rules or severity scales, a concrete output template, quality checks, and anti-patterns. The assistant reads it and gains the judgment; humans can read, audit, and edit the same file. No runtime, no lock-in.
<!-- End AEO Capsule -->

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

## 🔬 Prove it, and stop paying rent

Two CLI tools for the trust-and-cost problems the ecosystem keeps hand-waving — both keyless-to-inspect, both one command:

```bash
# Does your skill actually work? Prove it. Paired A/B — skill on vs off, same tasks,
# REAL token counts from the API's usage fields, optional blind judge, sha-pinned receipt.
npx pm-claude-skills prove --skill ./my-skill --tasks tasks.txt --runs 2 --judge
npx pm-claude-skills prove --skill ./my-skill --tasks tasks.txt --dry-run   # plan + call count, spends nothing

# Your MCP servers are charging you rent. Measure it: per-server token cost,
# unused-in-N-days flags, "disconnect these three, save X tokens per message".
npx pm-claude-skills mcp-audit --connect
```

`prove` exists because the ecosystem is full of "65% better!" claims and almost none are measured — it's the honest-broker harness (the JetBrains "advertised 65%, measured 8.5%" story is exactly why). `mcp-audit` reads your Claude configs, speaks real MCP to each server to count its schema tokens, and scans your session logs for what you actually use. See also the **[📊 AI Spend](https://mohitagw15856.github.io/pm-claude-skills/spend.html)** page — every agent's cost (Claude Code, Codex, Copilot) in one meter, all in-browser.

**Agent safety:** the **[pm-seatbelt](plugins/pm-seatbelt)** bundle is the pre-flight checklist before an agent touches email, the browser, or files — least-privilege reviews, [prompt-injection spotting](skills/injection-spotter/SKILL.md), and the [blast-radius drill](skills/blast-radius-drill/SKILL.md) for going autonomous. And **[RFC 0002 — HANDOFF.md](docs/rfcs/0002-agent-handoff-file.md)** is a dead-simple session-handoff convention (*your agent, but it remembers Monday*) — a file, not a server, with [reference hooks](hooks/).

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

**v72.0.0 — the Everyday Life update:** the biggest single drop yet — **100 new skills** across four new bundles: [🎲 hobbies](plugins/pm-hobbies) (wine pairing, board-game nights, D&D), [💪 wellbeing](plugins/pm-wellbeing) (workouts, sleep, habits), [🔐 digital self-defense](plugins/pm-digital-safety) (identity-theft recovery, phishing triage, doxxing response), and [👪 family](plugins/pm-family) (new-baby logistics, wedding vows, condolences) — plus new money, legal, home, career, freelance and learning skills; **958 skills, 108 bundles**.

**v67.0.0 — the everywhere wave:** six new rooms — [the trades](plugins/pm-trades) (quotes, stage payments, apprentices), [the committee](plugins/pm-committee) (AGMs, treasurers, the council mic), [open-source maintainers](plugins/pm-maintainer), [aging parents](plugins/pm-aging-parents) (the talks, the sibling summit), [the kitchen](plugins/pm-kitchen), [the band](plugins/pm-musician) — plus [used-car](skills/used-car-decoder/SKILL.md)/[mechanic-quote](skills/mechanic-quote-decoder/SKILL.md) decoders, the [group-trip fixer](skills/group-trip-negotiator/SKILL.md), and [🌱 daily practice](https://mohitagw15856.github.io/pm-claude-skills/streak.html); 958 skills, 104 bundles. *v66 — new-gen;* [pm-newgen](plugins/pm-newgen) — [decode your first brand deal](skills/creator-deal-decoder/SKILL.md), [clip the podcast](skills/clip-factory/SKILL.md), [prep tonight's D&D](skills/ttrpg-session-forge/SKILL.md), [fix the dating profile honestly](skills/dating-profile-doctor/SKILL.md), [vibe-check the weekend app](skills/the-vibe-check/SKILL.md), [keep the flat peaceful](skills/roommate-agreement/SKILL.md), [climb ranked on purpose](skills/ranked-climb-coach/SKILL.md), [flip thrift finds](skills/resale-flip-kit/SKILL.md), [plan the micro-retirement](skills/micro-retirement-planner/SKILL.md), [get your attention back](skills/attention-reset/SKILL.md); 958 skills, 104 bundles. *v65 — pm-2027;* ten skills for problems you don't have yet (but will) — [offboard an AI coworker](skills/agent-severance/SKILL.md), [drill the deepfake wire-fraud call](skills/deepfake-drill/SKILL.md), [hire your agent like an employee](skills/agent-hiring-panel/SKILL.md), [declare context bankruptcy](skills/context-bankruptcy/SKILL.md), [send your position to meetings instead of your body](skills/clone-brief/SKILL.md), [publish your personal API](skills/api-for-yourself/SKILL.md), [simulate the reorg before announcing it](skills/the-org-simulator/SKILL.md); 958 skills, 104 bundles. *v64 — game night;* [pm-tabletop](plugins/pm-tabletop) — teach any board game in 5 minutes, settle rules arguments fairly, plan the lineup, design your own game, and [spar the Catan trade](skills/tabletop-negotiator/SKILL.md) against a hidden agenda with a scored debrief; 958 skills, 104 bundles. *v63.1 — pixel confetti:* [pixel-gif-maker](skills/pixel-gif-maker/SKILL.md) — custom retro Slack GIFs (scroll, pulse, party, sparkle) from a pure-stdlib deterministic encoder; 958 skills. *And v63.0.0 — the dead mentors:* history's sharpest operators, resurrected as skills — **[Machiavelli](skills/machiavelli-counsel/SKILL.md)** reads your reorg (with the honest counterweight built in), **[Sun Tzu](skills/sun-tzu-strategy-brief/SKILL.md)** decides fight/reshape/decline, **[Franklin's decision algebra](skills/franklin-decision-ledger/SKILL.md)** settles the offer you keep flip-flopping on, **[Marcus Aurelius](skills/stoic-setback-debrief/SKILL.md)** debriefs the day that went badly, and **[Arnold Bennett (1908)](skills/bennett-time-audit/SKILL.md)** finds your inner day — real methods from public-domain classics, chapter-cited, never misquoted. *Earlier — v62.2, the distribution wave* (SkillScan, telemetry, SkillBench v2, quiz, wins, WhatsApp); *v62.1, nine frontiers.* Full history: **[CHANGELOG](CHANGELOG.md)** · [releases](https://github.com/mohitagw15856/pm-claude-skills/releases)

## ❓ First-timer questions, straight answers

<details>
<summary><b>Is it actually free?</b></summary>
Yes — MIT, all 958 skills, forever. The skills are markdown; there is nothing to gate. Sponsors fund the playground's free model runs, not access.
</details>

<details>
<summary><b>Do I need an API key?</b></summary>
Not to browse, read, install, or use skills inside a tool you already have (Claude Code, ChatGPT, Cursor…). The playground even serves a few sponsor-funded free runs a day. A key only enters the picture for optional extras like running skills from CI.
</details>

<details>
<summary><b>I'm not a product manager. Is this for me?</b></summary>
PM stands for <i>Professional</i> here. Most of the library is decoders for leases and medical bills, salary-negotiation practice, career-moment kits, life admin, and 35 professions from teaching to veterinary. The product-management corner is just where it started.
</details>

<details>
<summary><b>Will this mess with my existing setup?</b></summary>
No. Skills are inert text files in a folder; your assistant reads them when relevant. Remove the folder and it's like they were never there. The CLI never touches anything outside the skills directory it tells you about.
</details>

<details>
<summary><b>How do I know these are any good?</b></summary>
Every skill passes a structural gate (SkillSpec L3) and a security scan in CI; 208 outputs are <a href="https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html">eval-scored in the open</a> (avg 4.8/5), and the <a href="skillbench/REPORT.md">benchmark report</a> publishes the negative findings too. When something's machine-translated or unscored, it's labelled.
</details>

## 🤝 Contributing

<p align="center">
  <a href="CONTRIBUTING.md">
    <img src="web/docs-assets/footer.svg" width="100%" alt="The library grows a skill at a time — plant one of your own. One markdown file, one PR." />
  </a>
</p>

Add a skill via PR ([the standard](SKILL-AUTHORING-STANDARD.md), [CONTRIBUTING](CONTRIBUTING.md)), request one via issue, or publish your own repo to the [community index](community/) and earn the badge. Translations follow the pattern in [`skills-i18n/`](skills-i18n/).

## ❤️ Support

If a skill saved you real money or a real mistake, **[star the repo](https://github.com/mohitagw15856/pm-claude-skills/stargazers)** — it's how others find it. Sponsors fund the playground's free runs and get [naming rights, not influence](docs/SPONSORSHIP.md): **[become a sponsor](https://github.com/sponsors/mohitagw15856)**.

## 📄 License

MIT — use them, fork them, ship them at work. Skills are judgment, and judgment wants to be free.

---

*Built by [Mohit](https://github.com/mohitagw15856) with Claude. 958 skills · 108 bundles · 35 professions · every commit gated. The long version of this README — every feature, wave, and frontier bet — lives in the **[Showcase](docs/SHOWCASE.md)**.*
