<sub>**English** · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md)</sub>

# 🧠 PM Skills: Professional Agent Skills for Claude, ChatGPT, Gemini, Cursor, Codex & Hermes

> **One request to your AI, one finished deliverable back: the PRD, the stakeholder update and the decision call, at a senior product manager's standard.**

Try it right now. Install below, then paste this into your assistant:

```text
Here are my discovery notes from six customer calls: [paste your notes].
Turn them into a one-page PRD, a risk register with owners, and a
stakeholder update I can send to leadership today.
```

Your assistant loads [user-interview-synthesis](skills/user-interview-synthesis/SKILL.md), [prd-template](skills/prd-template/SKILL.md) and [stakeholder-update](skills/stakeholder-update/SKILL.md) and returns the three documents, not advice about writing them. Not a PM? The same library covers engineers, job seekers, students, founders and 中文用户, below.

<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/banner.svg">
      <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/banner-light.svg">
      <img src="docs/readme-assets/banner.svg" width="100%" alt="PM Skills: the senior colleague's notes for any AI assistant. A request in plain words loads the right skill: a deposit dispute, a PRD, a Chinese weekly report, a Korean tax settlement." />
    </picture>
  </a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/stats.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/stats-light.svg">
    <img alt="Live numbers: skills, bundles, GitHub stars, weekly npm downloads and translated skills, refreshed daily" src="https://mohitagw15856.github.io/pm-claude-skills/live/stats-light.svg" width="860">
  </picture>
</p>

<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/"><strong>▶ Playground</strong></a> ·
  <a href="#-install-in-30-seconds"><strong>⚡ Install</strong></a> ·
  <a href="SKILLS.md"><strong>📚 All skills</strong></a> ·
  <a href="https://mohitagw15856.github.io/pm-claude-skills/worked-examples.html"><strong>📘 Worked examples</strong></a> ·
  <a href="https://mohitagw15856.github.io/pm-claude-skills/ai-at-work.html"><strong>🏆 Best AI for your job</strong></a> ·
  <a href="https://mohitagw15856.github.io/pm-claude-skills/how.html"><strong>❓ How do I…?</strong></a> ·
  <a href="docs/SHOWCASE.md"><strong>🖼 Showcase</strong></a> ·
  <a href="https://mohitagw15856.github.io/pm-claude-skills/tech-tree/"><strong>🌳 Tech tree</strong></a> ·
  <a href="README.zh-CN.md"><strong>🇨🇳 简体中文</strong></a> ·
  <a href="README.zh-TW.md"><strong>繁體中文</strong></a> ·
  <a href="README.ko.md"><strong>한국어</strong></a> ·
  <a href="CHANGELOG.md"><strong>🆕 Changelog</strong></a>
</p>

<p align="center">
  <a href="https://github.com/mohitagw15856/pm-claude-skills/stargazers"><img src="https://img.shields.io/github/stars/mohitagw15856/pm-claude-skills?style=social" alt="Stars"></a>
  <a href="https://github.com/mohitagw15856/pm-claude-skills/releases"><img src="https://img.shields.io/github/v/release/mohitagw15856/pm-claude-skills?label=version&color=brightgreen" alt="Version"></a>
  <a href="https://www.npmjs.com/package/pm-claude-skills"><img src="https://img.shields.io/npm/v/pm-claude-skills?logo=npm&color=cb3837" alt="npm"></a>
  <a href="#-install-in-30-seconds"><img src="https://img.shields.io/badge/Anthropic%20Plugin%20Directory-Published-D97757?logo=anthropic&logoColor=white" alt="In the official Anthropic plugin directory"></a>
  <a href=".github/workflows/skillcheck.yml"><img src="https://img.shields.io/github/actions/workflow/status/mohitagw15856/pm-claude-skills/skillcheck.yml?branch=main&label=SkillCheck" alt="SkillCheck"></a>
  <a href="SKILLSPEC.md"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fpm-skills-mcp.pm-claude-skills.workers.dev%2Fbadge%3Frepo%3Dmohitagw15856%2Fpm-claude-skills%26path%3Dskills" alt="SkillSpec conformance level, graded live"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-lightgrey" alt="License"></a>
</p>

> **Your landlord kept your deposit. You got laid off on a Tuesday. Your boss wants the PRD by Friday.**
> Generic AI is a very confident intern. **PM Skills** is the senior colleague's notes: 1312 of them, one markdown file each. *(PM stands for Professional. Yes, we get asked.)*

<!-- AEO Answer Capsule — 68 words -->
PM Skills is an open-source library of 1312 Agent Skills — plain-markdown SKILL.md files that teach an AI assistant to do one professional task to a senior professional's standard, from writing a PRD to decoding a lease or running a blameless postmortem. Each skill bundles the framework, an output template, quality checks, and anti-patterns. It is MIT-licensed and works with Claude, ChatGPT, Gemini, Cursor, and Codex.
<!-- End AEO Capsule -->

## ⚡ Install in 30 seconds

```bash
npx pm-claude-skills add                                            # any tool: Cursor, Codex, Windsurf, Cline, Zed…
# In Claude Code:  /plugin → search pm-skills   (official Anthropic directory)
npx --registry=https://registry.npmmirror.com pm-claude-skills add  # 中国大陆镜像
```

Then just say what you need: *"Decode this job ad and tell me where I am weak."* Nothing here can break your setup: a skill is a markdown file your AI reads; installing copies text files, uninstalling deletes them. [Read one first](skills/lease-decoder/SKILL.md). Per-tool instructions: [docs/installation.md](docs/installation.md) · ChatGPT and Gemini: copy from [`exports/`](https://github.com/mohitagw15856/pm-claude-skills/tree/exports) · MCP: `claude mcp add pm-skills -- npx -y -p pm-claude-skills pm-claude-skills-mcp`

## 🌅 Claude Duet, OpenAI Dots and other proactive agents

**PM Skills works with [Claude Duet](https://claude.com/)**, Anthropic's proactive agent. Duet uses the skills in your Claude account, so every skill here can run inside it. Agents that work while you're away fail in new ways: briefs that pad, uncited claims, acting instead of drafting, saying "done" about a draft. So **21 Duet-ready skills are built for unattended use**. They keep briefs short and cited, draft instead of sending, and always ask before anything is sent, posted, paid, signed or deleted.

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/duet-flow.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/duet-flow-light.svg"><img src="docs/readme-assets/duet-flow.svg" width="100%" alt="How PM Skills works inside Claude Duet: your apps are checked every few hours, a Duet-ready skill turns what it finds into a short cited brief and drafts, and anything outward waits at an approval gate for your yes." /></picture></p>

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/duet-setup.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/duet-setup-light.svg"><img src="docs/readme-assets/duet-setup.svg" width="100%" alt="Set up your always-on agent in five steps: audit, standing orders, approval policy, brief and alerts, kill switch; then install with Add to Claude, a starter pack or the whole bundle." /></picture></p>

<sub>The five skills: [prepare-for-duet](skills/prepare-for-duet/SKILL.md) · [standing-orders](skills/standing-orders/SKILL.md) · [approval-policy-designer](skills/approval-policy-designer/SKILL.md) · [morning-brief-designer](skills/morning-brief-designer/SKILL.md) and [interrupt-rules](skills/interrupt-rules/SKILL.md) · [agent-kill-switch-plan](skills/agent-kill-switch-plan/SKILL.md)</sub>

**Watchers for a small business**: [cash-watch](skills/cash-watch/SKILL.md), [payroll-eve-check](skills/payroll-eve-check/SKILL.md), [signature-pipeline-watch](skills/signature-pipeline-watch/SKILL.md), [crm-hygiene-sweep](skills/crm-hygiene-sweep/SKILL.md) and [store-watch](skills/store-watch/SKILL.md). They cover Stripe, Xero, QuickBooks, Gusto, DocuSign, HubSpot and Shopify. **For teams**: [shared-agent-charter](skills/shared-agent-charter/SKILL.md), for a Dot or a shared agent in Slack or Teams.

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/duet-brief.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/duet-brief-light.svg"><img src="docs/readme-assets/duet-brief.svg" width="100%" alt="Illustration with invented data: the morning brief the five watchers would give a small candle shop, with what needs you, what waits on others, what to watch, and two planted scams reported rather than obeyed." /></picture></p>

**Get started**
- **Into Claude and Duet:** press **⬇ Add to Claude** on any skill's page, then upload the ZIP in claude.ai (Settings, Skills, Upload skill).
- **A starter pack** of 3 or 4 skills (founder, freelancer, shop owner, team lead, business ops) on the [Duet page](https://mohitagw15856.github.io/pm-claude-skills/duet.html), or `npx pm-claude-skills add --agent claude --skills standing-orders,cash-watch,store-watch`.
- **The whole bundle:** `npx pm-claude-skills add --bundle pm-duet`.

**Test it safely**: the [injection drill](docs/duet/injection-drill.md) has 12 planted instructions to check whether your agent reports or obeys them. The [fake-apps sandbox](integrations/fake-apps-mcp/) gives invented Gmail, Stripe and Shopify data where every send or payment is refused and logged.

**Honest status:** every one of these skills is *designed for Duet*. None has been tested on Duet yet, because it's a waitlisted research preview. [File a Tested on Duet report](.github/ISSUE_TEMPLATE/tested-on-duet.yml) and a skill moves up a tier, with your name on it. They're written to work with Dots and Muse too: see [how the three compare](docs/duet/proactive-agents.md).

## 🥊 The demo

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/before-after.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/before-after-light.svg">
    <img src="docs/readme-assets/before-after.svg" width="100%" alt="Animated before and after: the same request answered by a generic AI and by a skill. A lease gets vague advice on the left and ranked clauses with real money on the right; a PRD request gets platitudes versus a problem, metrics and user stories; a Chinese weekly report gets filler versus results, risks and a dated plan." />
  </picture>
</p>

More to see: the **[Showcase gallery](docs/SHOWCASE.md)** has the Playground, the tech tree, Galaxy 3D and Skill City.

## 🧭 How it works

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/skill-flow.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/skill-flow-light.svg"><img src="docs/readme-assets/skill-flow.svg" width="100%" alt="How a skill turns a request into a finished document: you ask in plain words, your AI picks the matching skill by its description, follows the skill file (framework, template, quality checks) and returns the finished document. Skills reach your AI through the installer, the MCP server or the REST API." /></picture></p>

<details><summary>More detail: the installer, the MCP server and the REST API</summary>

A skill is one plain-markdown SKILL.md file: a description that tells your assistant when to load it, plus the working framework, output template and quality checks it follows. The installer (`npx pm-claude-skills add`) copies the skills you choose into the config folder of the tool you use, so they load only when a request matches. The [MCP server](mcp-remote/) serves skills on demand to any MCP client instead, and the same package exposes a read-only [REST API](mcp-remote/#rest-api-for-n8n-lovable-make-any-http-tool) for n8n, Make and other automations. No runtime, no account, nothing resident: uninstalling deletes text files.

</details>

## 🧑‍🤝‍🧑 Pick your path

<table><tr><td width="72">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/nib-wave.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/nib-wave-light.svg">
  <img src="docs/readme-assets/nib-wave.svg" width="64" alt="Nib, the PM Skills mascot, waving hello" />
</picture>
</td><td><b>Hi, I'm Nib.</b> Pick the card that sounds most like you. Each one opens three starter skills with a prompt you can copy.</td></tr></table>

<p align="center">
  <a href="docs/start/product-manager.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-product-manager.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-product-manager-light.svg"><img src="docs/readme-assets/path-product-manager.svg" width="32%" alt="Product manager: PRDs, updates, meeting notes. 3 starter skills." /></picture></a>
  <a href="docs/start/engineer.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-engineer.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-engineer-light.svg"><img src="docs/readme-assets/path-engineer.svg" width="32%" alt="Engineer: PRs, errors, code review. 3 starter skills." /></picture></a>
  <a href="docs/start/job-seeker.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-job-seeker.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-job-seeker-light.svg"><img src="docs/readme-assets/path-job-seeker.svg" width="32%" alt="Job seeker: applying and interviewing. 3 starter skills." /></picture></a>
  <a href="docs/start/student.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-student.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-student-light.svg"><img src="docs/readme-assets/path-student.svg" width="32%" alt="Student: exams, notes, applications. 3 starter skills." /></picture></a>
  <a href="docs/start/founder.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-founder.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-founder-light.svg"><img src="docs/readme-assets/path-founder.svg" width="32%" alt="Founder: ideas, runway, fundraising. 3 starter skills." /></picture></a>
  <a href="docs/start/chinese.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-chinese.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-chinese-light.svg"><img src="docs/readme-assets/path-chinese.svg" width="32%" alt="中文用户, for Chinese speakers: weekly reports, civil service exams. 3 starter skills." /></picture></a>
</p>

<p align="center"><sub>None of these you? <a href="docs/start/README.md">docs/start</a> has all six paths, a map of every bundle by what you want to do, a four-question quiz and a five-level quest log. Mid-something big? <a href="PACKS.md">Skill Packs</a> start from your moment: a new baby, a layoff, a move, a loss.</sub></p>

## 🗺 What you can do

The product-management core first, then the bundles everyone borrows. Each one is a real bundle in [`plugins/`](plugins/).

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/bundles.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/bundles-light.svg"><img src="docs/readme-assets/bundles.svg" width="100%" alt="Pick the job you have this week: thirteen bundles, from turning research into decisions and writing the PRD to reading before you sign and landing the next job, each with its number of skills." /></picture></p>

<details><summary>The table: what each bundle gives you, what you bring, and links</summary>

<!-- WHAT-YOU-CAN-DO:START -->
| Your job this week | Bundle | What you get | What you bring |
|---|---|---|---|
| Turn research into decisions | [pm-discovery](plugins/pm-discovery/) | Interview guides, job stories, synthesis with quotes and prevalence | Transcripts or raw notes |
| Write the PRD and the updates | [pm-essentials](plugins/pm-essentials/) | PRD, meeting notes, stakeholder updates, competitive analysis | A feature brief; your goals |
| Plan the quarter | [pm-planning](plugins/pm-planning/) | OKRs, RICE/MoSCoW/Kano prioritisation, roadmap narrative | A backlog and a company goal |
| Ship the sprint and the launch | [pm-delivery](plugins/pm-delivery/) | Sprint plans, tech specs, A/B test plans, launch checklists | Stories, capacity, dates |
| Read the numbers | [pm-data](plugins/pm-data/) | Metrics frameworks, cohort and churn analysis, dashboard briefs | Your metrics or a CSV |
| Watch the market | [pm-strategy](plugins/pm-strategy/) | Competitor teardowns, signal tracking, stakeholder influence maps | Competitor names and sources |
| Launch and sell it | [pm-gtm](plugins/pm-gtm/) | GTM plans, content calendars, email campaigns | A product and an audience |
| Keep the customers | [pm-cs](plugins/pm-cs/) | Health scorecards, QBR decks, churn analysis, renewal playbooks | Account data, close notes |
| Make the hard call | [pm-decisions](plugins/pm-decisions/) | Typed ship-or-slip, renew-or-churn, hire-or-pass calls with probabilities | The decision's real state |
| Escape the average answer | [pm-thinking](plugins/pm-thinking/) | Red-teaming, five clashing minds, decision panels | A plan or question worth attacking |
| Read before you sign | [pm-decoders](plugins/pm-decoders/) | Leases, bills, benefits and contracts decoded with the money maths | The document itself |
| Land the next job | [pm-jobsearch](plugins/pm-jobsearch/) | JD decoding, outreach, interview prep, follow-up sequences | The JD and your CV |
| 用中文工作 | [pm-china-work](plugins/pm-china-work/) | 周报、述职、复盘，中国职场的写法 | 你的工作记录 |
<!-- WHAT-YOU-CAN-DO:END -->

</details>

Install any bundle: `/plugin install pm-decoders@pm-claude-skills`, or `npx pm-claude-skills add --bundle pm-decoders`. All 153 bundles with every skill and install command: **[docs/catalogue.md](docs/catalogue.md)** · every skill in one page: [SKILLS.md](SKILLS.md) · chain them: [WORKFLOWS.md](WORKFLOWS.md)

## 🇨🇳 中文用户

**用中文提问即可。** 十三个面向中文用户的技能包：周报述职（[pm-china-work](plugins/pm-china-work/)）、考公考研（[pm-china-exams](plugins/pm-china-exams/)）、劳动合同与补偿（[pm-china-life](plugins/pm-china-life/)）、外贸、制造业、合规、出海等，73 个技能有简体中文版、27 个有繁体中文版。
国内安装：`npx --registry=https://registry.npmmirror.com pm-claude-skills add`，镜像与离线包见 [docs/CHINA.md](docs/CHINA.md)。
试着说："帮我写周报" · "公司要裁我，能拿多少补偿？" · "下个月公务员面试，帮我模拟一轮。"
完整中文说明（技能包全表、常见问题、国内工具与本地模型、海报与分享卡）：**[简体中文 README](README.zh-CN.md)** · 港台用户：[繁體中文 README](README.zh-TW.md)

## 🆕 What's new

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/releases.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/releases-light.svg"><img src="docs/readme-assets/releases.svg" width="100%" alt="What's new, release by release: v82.0.0 China for everyone, v83.0.0 For everyone, everywhere, v83.1.0 Duet-ready and v83.2.0 Duet support, the latest." /></picture></p>

<details><summary>What each release adds, and what to try saying</summary>

| Release | What it adds | Try saying |
|---|---|---|
| **[v83.2.0](https://github.com/mohitagw15856/pm-claude-skills/releases/latest)** Duet support | 21 Duet-ready skills for Claude Duet and other proactive agents: standing orders, approval policies, a kill switch, small-business watchers (cash, payroll, signatures, CRM, store), team charters, an injection drill, a fake-apps sandbox, starter packs and an Add to Claude ZIP for every skill | *"Write standing orders for my Duet"* · *"Watch my Stripe and Xero every morning"* |
| **[v83.0.0](https://github.com/mohitagw15856/pm-claude-skills/releases/tag/v83.0.0)** For everyone, everywhere | Easy Read, Teach me, voice and mixed-language questions, local rules for your place, a skill for every form, newcomer, informal-economy, disability and after-a-disaster skills, the library offline on a Raspberry Pi, a USSD menu for any phone, right-click any file, skill apps, partner checks and an expert-graded jobs exam | *"Explain this P60 to me"* · *"मेरा landlord deposit नहीं दे रहा"* |
| **[v82.0.0](https://github.com/mohitagw15856/pm-claude-skills/releases/tag/v82.0.0)** China for everyone, Korea and Southeast Asia | Teachers, parents, trade and manufacturing packs, 适老化, Korean, Japanese and Southeast Asian packs, lite skills for local models, Word and WPS add-ins, team sync | *"帮我写一份新课标教案"* · *"연말정산 어떻게 해요?"* |

**Reaching everyone (v83):** read any skill in [Easy Read](https://mohitagw15856.github.io/pm-claude-skills/index.html?easy=1), have it [teach you](https://mohitagw15856.github.io/pm-claude-skills/index.html?teach=1) instead of doing it, [ask by voice](https://mohitagw15856.github.io/pm-claude-skills/how.html) in your own language (Hinglish and Taglish included), look up [any form](https://mohitagw15856.github.io/pm-claude-skills/forms.html), open a skill [as an app](https://mohitagw15856.github.io/pm-claude-skills/use.html), or use it with no internet: [on a Raspberry Pi](box/README.md), over [USSD on a basic phone](integrations/ussd/README.md), or [from the right-click menu](integrations/right-click/README.md) with a free local model.

</details>

Everything older: **[CHANGELOG.md](CHANGELOG.md)** · the write-ups: [docs/WHATS-NEW.md](docs/WHATS-NEW.md) · most-wanted skills and votes: the [tech tree](https://mohitagw15856.github.io/pm-claude-skills/tech-tree/)

## ✅ Trust and quality

An honest summary of what is checked, measured and still unreviewed, computed from the repo on every change:

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/trust.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/trust-light.svg"><img src="docs/readme-assets/trust.svg" width="100%" alt="Trust and quality in numbers: skills that pass SkillCheck on every change, skills with eval cases, measured skills and their average score, hostile documents in the injection suite, translations, and how many high-stakes skills have an expert review." /></picture></p>

<details><summary>The numbers in full, with links, and how the library checks itself</summary>

<!-- TRUST-NUMBERS:START (generated by scripts/build-trust-numbers.mjs; do not edit by hand) -->
- **Checked on every change, in CI:** structure ([SkillCheck](SKILLSPEC.md), all 1,312 skills at the L3 gate), a security audit, a near-duplicate check, a count-drift check, translation parity (178 translations in 10 languages), and a prompt-injection suite of 15 hostile documents. A change that fails any of them does not merge.
- **Eval cases:** 416 of the 1,312 skills carry eval cases ([`evals/cases.json`](evals/cases.json)), and 161 have a worked example in [`examples/`](examples/).
- **Measured scores:** 399 skills have blind-judged scores on the [leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html) (average 4.6/5 across the models tested); the [benchmark report](skillbench/REPORT.md) publishes the negative findings too. Everything unscored is unscored, not assumed good.
- **Human review:** of the 161 skills rated high-stakes in [risk tiers](docs/RISK-TIERS.md), **0 have a current review by a qualified professional**. The [expert-review programme](docs/EXPERT-REVIEW-PROGRAM.md) and its [ranked queue](docs/HUMAN-REVIEW-QUEUE.md) exist for exactly this; if you hold a relevant credential, reviewing one skill is the most valuable contribution available.
- **Reported savings:** none recorded yet. [Tell us what a skill saved you](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=roi-story.yml): hours and money only, added up in public on the [Wall of Wins](https://mohitagw15856.github.io/pm-claude-skills/wins.html).
<!-- TRUST-NUMBERS:END -->
- **Checked by people who do the job:** organisations can vouch for skills as [partners](https://mohitagw15856.github.io/pm-claude-skills/partners.html), and the [jobs exam](https://mohitagw15856.github.io/pm-claude-skills/jobs-exam.html) has AI answers marked blind by working professionals on their own marking schemes. Both start empty and fill only with real participants.
- **It rewrites itself, in public:** the weakest skills are periodically rewritten by a model and kept only if a judge scores the rewrite higher; every attempt, including the losses, is in the [evolution log](EVOLUTION.md).
- **Honesty rules baked in:** decoders end with a not-advice line ([the severity scale](docs/severity-scale.md)), calculators name what they do not model, simulators debrief out of character. PM Skills is not a substitute for a professional.

</details>

**Privacy, stated plainly:** everything installable runs locally. Skills are inert markdown on your machine; the CLI, the exports and the local MCP server send nothing anywhere, and telemetry is off unless you set `PM_SKILLS_TELEMETRY=1` (skill name only, never content). The two things that do leave your machine are your prompts to whichever model provider you chose, and requests to the hosted playground or hosted MCP if you opt to use them. Full statements: [docs/TELEMETRY.md](docs/TELEMETRY.md) · report a vulnerability: [SECURITY.md](SECURITY.md) · licence: [MIT](LICENSE). Verify a release: `npx pm-claude-skills verify --release` (signed SBOM, Sigstore provenance).

## 🙌 Community

- **Show and Tell:** share what a skill produced, including what it got wrong: [open a Show and Tell](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=show-and-tell.yml). The best entries become [showcases](docs/showcases/).
- **Vote on what gets built next:** the [tech tree](https://mohitagw15856.github.io/pm-claude-skills/tech-tree/) ranks open [skill requests](https://github.com/mohitagw15856/pm-claude-skills/issues/new?labels=skill-request&title=Skill:%20) by 👍; the top three are in research.
- **Roadmap:** confirmed direction in [ROADMAP.md](ROADMAP.md), the live signals behind it in [docs/roadmap.md](docs/roadmap.md).
- **Chat:** TODO, a Discord or GitHub Discussions link goes here once the maintainer enables one; until then, issues are the front door.

## 🤝 Contributing

<p align="center">
  <a href="CONTRIBUTING.md">
    <img src="web/docs-assets/footer.svg" width="100%" alt="The library grows a skill at a time: plant one of your own. One markdown file, one PR." />
  </a>
</p>

Add a skill by PR ([the standard](SKILL-AUTHORING-STANDARD.md), [CONTRIBUTING](CONTRIBUTING.md)), [request one](https://github.com/mohitagw15856/pm-claude-skills/issues/new?labels=skill-request&title=Skill:%20) and watch it appear on the tech tree, or claim a [good first translation](https://github.com/mohitagw15856/pm-claude-skills/labels/good%20first%20translation). 中文贡献者：[Gitee Issue](https://gitee.com/mohitagw/pm-claude-skills/issues) 也可以。

### Contributors

<p align="center">
  <a href="https://github.com/mohitagw15856/pm-claude-skills/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=mohitagw15856/pm-claude-skills&max=120&columns=12" alt="Avatars of the people who have contributed to PM Skills" />
  </a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/contributor-levels.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/contributor-levels-light.svg">
    <img src="docs/readme-assets/contributor-levels.svg" width="640" alt="Levels of contribution: report or fix a bug, translate a skill, write a skill, review, maintain, with how many people have done each" />
  </picture>
</p>

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16%"><a href="https://github.com/mohitagw15856"><img src="https://avatars.githubusercontent.com/u/119053560?v=4&s=72" width="72px;" alt="Mohit Aggarwal"/><br /><sub><b>Mohit Aggarwal</b></sub></a><br /><span title="Maintenance">🚧</span> <span title="Code">💻</span> <span title="Skills and content">🖋</span> <span title="Translation">🌍</span> <span title="Documentation">📖</span> <span title="Infrastructure">🚇</span></td>
      <td align="center" valign="top" width="16%"><a href="https://github.com/thejesh23"><img src="https://avatars.githubusercontent.com/u/35212698?v=4&s=72" width="72px;" alt="Thejesh"/><br /><sub><b>Thejesh</b></sub></a><br /><span title="Code">💻</span> <span title="Bug reports and fixes">🐛</span> <span title="Skills and content">🖋</span></td>
      <td align="center" valign="top" width="16%"><a href="https://github.com/roian6"><img src="https://avatars.githubusercontent.com/u/23256775?v=4&s=72" width="72px;" alt="Chanhyo Jung"/><br /><sub><b>Chanhyo Jung</b></sub></a><br /><span title="Skills and content">🖋</span></td>
      <td align="center" valign="top" width="16%"><a href="https://github.com/mblode"><img src="https://avatars.githubusercontent.com/u/7183998?v=4&s=72" width="72px;" alt="Matthew Blode"/><br /><sub><b>Matthew Blode</b></sub></a><br /><span title="Skill libraries">🔌</span></td>
      <td align="center" valign="top" width="16%"><a href="https://github.com/InsightFactoryAPP"><img src="https://avatars.githubusercontent.com/u/168487014?v=4&s=72" width="72px;" alt="InsightFactoryAPP"/><br /><sub><b>InsightFactoryAPP</b></sub></a><br /><span title="Skill libraries">🔌</span></td>
      <td align="center" valign="top" width="16%"><a href="https://github.com/LucideLarp"><img src="https://avatars.githubusercontent.com/u/279298543?v=4&s=72" width="72px;" alt="Martinius"/><br /><sub><b>Martinius</b></sub></a><br /><span title="Skill libraries">🔌</span></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<sub>Credits follow the <a href="https://allcontributors.org">all-contributors</a> spec (<a href=".all-contributorsrc">.all-contributorsrc</a>). Contributed and not listed? Open a pull request running <code>node scripts/build-contributors.mjs --add &lt;your-login&gt; &lt;type&gt;</code>, or ask in an issue. Translators: pick a skill from the <a href="docs/zh/translation-board.md">claim board</a>.</sub>

### Star history

<p align="center">
  <a href="https://github.com/mohitagw15856/pm-claude-skills/stargazers">
    <img src="web/docs-assets/star-history.svg" width="70%" alt="Star history chart for PM Skills, with markers for star milestones and major releases" />
  </a>
</p>

If a skill saved you real money or a real mistake, **[star the repo](https://github.com/mohitagw15856/pm-claude-skills/stargazers)**: it's how others find it. Sponsors fund the playground's free runs and get [naming rights, not influence](docs/SPONSORSHIP.md): **[become a sponsor](https://github.com/sponsors/mohitagw15856)**.

**MIT.** Use them, fork them, ship them at work. Skills are judgment, and judgment wants to be free.

---

*Built by [Mohit](https://github.com/mohitagw15856) with Claude. 1312 skills · 153 bundles · 35 professions · every commit gated. The long version lives in the **[Showcase](docs/SHOWCASE.md)**.*
