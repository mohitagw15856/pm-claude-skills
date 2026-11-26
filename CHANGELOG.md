# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project broadly follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html):
each new wave of skills bumps the **major** version, extensions and fixes bump
**minor** / **patch**.

## [Unreleased]

### Added
- **Eleven skills, in a new `pm-fieldwork` bundle:** `verified-security-audit`, `live-competitor-capture`, `product-knowledge-graph`, `failure-pattern-library`, `design-doc-review`, `scope-cutter`, `app-store-submission-guard`, `demo-video-kit`, `svg-diagram-studio`, `stitch-design-handoff` and `equity-research-note`. Two ship tested helper scripts: `demo_video.py` (captions and ffmpeg commands from a shot list) and `knowledge_graph.py` (a document graph from Markdown links and terms).
- **`pm-daily-ten` bundle:** the ten skills behind the README example and the built-in slash commands.
- **Three subagents:** `product-director` (coordinates the others), `research-lead` and `data-analyst`.
- **`pm-claude-skills lint <file.md>`:** a deterministic linter for finished documents (placeholders, a PRD with no number in its metrics, action items with no owner).
- **MCP tools `list_calculators` and `run_calculator`:** run a bundled Python calculator with no shell, in a temporary folder, with a time limit.
- **Cursor plugin marketplace manifests** (`.cursor-plugin/`), generated from the Claude ones by `scripts/build-cursor-plugins.mjs`.
- **n8n workflow templates** in `integrations/n8n/`, the one-file rules in `templates/pm-rules/PM-RULES.md`, and the `annotate.html` page for commenting on a draft and sending the feedback back.
- **`npm run regen`** (every generator plus bundle copies) and **`scripts/sync-bundles.mjs`** with a `--check` gate.

- **Five more skills:** `current-practice-check`, `technical-seo-audit`, `keyword-cluster-map`, `earnings-call-summary` and `portfolio-review`, with new `pm-seo` and `pm-investor` bundles, a `seo-lead` subagent and the `/ship-with-director` command.
- **`capture_log.py`** for `live-competitor-capture` and a rejection-pattern reference for `app-store-submission-guard`.
- **Document lint GitHub Action** at `.github/actions/doclint`.
- **Sponsorship:** a rate card in `SPONSORS.md`, a sponsor section in every README language, a sponsor page on the site, `scripts/sponsor-report.mjs` for the monthly report, and `new-skill.mjs --sponsor` for labelled sponsored skills.
- **43 eval cases** for the most-viewed and production-tier skills that had none, and **`scripts/sync-counts.mjs`** to update skill and bundle counts in docs.
- **Demo video prompts** in `docs/video/`, and the skills.sh install badge.

### Changed
- **`npm run check` runs every gate and reports all failures** (`scripts/check-all.mjs`); it used to stop at the first. It now includes the skill audit, the bundle copy check and the Cursor manifest check.
- **Bundle copies resynchronised:** 220 copies under `plugins/` had drifted from `skills/` (missing helper scripts and worked examples, and some unfilled stubs).
- **Workflows:** the Gitee and GitCode mirrors are one workflow (`mirror-china.yml`), and the three weekly data refreshes are one workflow and one pull request (`weekly-data.yml`).
- **Root tidied:** ten documents moved into `docs/` (BUILD_NOTES, CASE_STUDIES, DESIGN, MAINTAINERS, OPERATIONS, ORCHESTRATION, PERSONAS, RELEASE_NOTES, REPO-MAP, ROADMAP-REQUESTS), and changelog entries before 80.0.0 moved to `docs/changelog/CHANGELOG-pre-80.md`.
- `site/tech-tree/data.json` keeps its timestamp when nothing else changed.

- **Demo recordings moved to the `media` branch** (8.4 MB off every checkout); the deploy restores them into the site so their URLs still work.
- The six most-viewed skills link to their related skills and show a one-skill install command.

### Fixed
- Skill pages no longer point their share image at a file that does not exist; skills without their own image use the site card.
- `new-bundle.mjs` copies the whole skill folder into a bundle, not only `SKILL.md`.
- `check-model-refs` no longer fails on the legacy row in `docs/MODELS.md`.

### Removed
- 25 tracked `.DS_Store` files.

## [84.0.0] - Regions and new models - 2026-11-11

**1374 skills · 167 bundles** (from 1310 · 153 at v83.2.0). 54 new skills and 13 new bundles in this release, on top of the work merged since v83.2.0.

### Added
- **Six profession bundles**: `pm-nursing` (shift handover, care plan, incident report, family update), `pm-agriculture` (season plan, subsidy application, records book, buyer contract check), `pm-retail-shopfloor` (stock take, shrink report, shift handover), `pm-sports-coaching` (season and session plans, parent communication, match review), `pm-procurement` (contract renewal brief, with the RFP and supplier skills) and `pm-phd` (supervisor update, chapter plan, reviewer rebuttal, viva prep).
- **Four regional bundles**, each marked high-stakes and stamped for rule review: `pm-mena` (UAE gratuity, Gulf residence visas, Saudi contracts, Gulf job offers), `pm-latam` (Brazilian rescisão CLT and IRPF, Mexican finiquito and declaración anual), `pm-dach` (Arbeitszeugnis, Kündigungsfrist, Steuererklärung) and `pm-africa` (payslips and pensions in Nigeria, payslips and M-Pesa reversals in Kenya, retrenchment and UIF in South Africa).
- **Three China bundles**: `pm-china-ecommerce` (淘宝 and 拼多多 listings, 1688 wholesale, 双11 plans, customer-service scripts), `pm-china-startup` (company registration, equity split, 高新技术企业, 专精特新, subsidies, financing plan) and `pm-china-study-abroad` (essays, visa preparation, returnee job search). `pm-zh-content` gains Bilibili, 知乎, 视频号 and 小宇宙 skills.
- **China tools**: a WeChat Mini Program skill finder that works offline; uTools and Quicker plugins; `--agent qwen`, `--agent iflow` and `--agent kimi` installs for the domestic coding CLIs; write-back of a skill's output to 飞书文档, 语雀 and 钉钉文档; a weekly page of mainland usage from public counters (npmmirror, Gitee, ModelScope).
- **Translations**: the four Gulf skills in Arabic, ten skills in German and nine more in French, all machine-translated and labelled as awaiting native review. The side-by-side reader lays right-to-left languages out from the right.
- **USSD**: a second menu for Nigeria, Kenya and South Africa (`USSD_MENU = "africa"`).
- **Model registry**: `data/models.json` names the model for each of five roles (default, fast, deep, frontier, judge) on the current Claude line-up, and code asks for a role. `scripts/check-model-refs.mjs` fails on an unlisted model id and on any new reference to a legacy model. See `docs/MODELS.md`.
- **Per-skill model and effort guidance**: `data/model-guidance.json`, derived from each skill's risk tier and length, and `pm-claude-skills run <skill> --auto-model`. Derived, not measured; `docs/MODEL-GUIDANCE.md` says so.
- **Missions**: `missions/<id>.json` chains typed pipelines into one run with human checkpoints and `--resume`, validated link by link against the contracts. Two ship: `retention-quarter` and `bad-quarter-reset`. See `docs/MISSIONS.md`.
- **Prompt audit**: `scripts/prompt-audit.mjs` scans every skill for text written for older models. `docs/PROMPT-AUDIT.md` has the result; naming a model version in a skill now fails `npm run check`.
- **Since v83.2.0, already merged**: typed skill contracts and pipelines, a hosted broker document, the lockfile and memory commands, an India pack, Copilot, Gemini CLI and OpenAI Agents exports, provenance footers on every export, a red-team corpus, starters, an offline bundle, a setup wizard, a git hook, the year in review, Hindi and Spanish translations (#502, #503); the Agent Arena, result cards and the Skill Hack (#485); the small-model badge and rule-change watchers (#484); LTS skills and a course pack (#483); launch-day verdicts (#482); `/.well-known/agent-skills.json` (#481); and four agent skills (#473, #474, #477, #479).

### Changed
- The shared Claude client adds room for thinking to `max_tokens` on current models, joins the text blocks of a reply, and raises an error on an empty answer.
- SkillBench takes `--lineup current` and `--effort`, and reads replies that begin with a thinking block.
- The translation check has a `--strict` mode, now in `npm run check`: a translation whose English source gained or lost a section fails.
- `rfp-writer`, `rfp-response`, `contract-renewal-tracker` and `shift-schedule-builder` now list a new bundle as their home (they remain in their earlier bundles too), so their export paths moved.
- The Python package needs Python 3.10 or later.

### Fixed
- The mainland agent tool and the chat bots fetched a skills index that stopped being committed in #502; they now read the committed `data/skills-index.min.json`.
- A pipeline with an optional input that was not supplied stopped at the first step; the input is now left out.
- SkillBench read only the first content block of a reply, which is empty when the model thinks first.

### Not done
- 164 references in 77 files still name a legacy model (Workers, browser pages, workflows). Each needs one live call to verify, so they wait; the baseline can only shrink.
- SkillBench has not been run on the current line-up. It costs API credit and waits for approval.
- The Mini Program has not been previewed in WeChat DevTools or submitted for review, the Quicker script has not been run on Windows, and the write-back script has not called the real platforms.


## [83.2.0] - Duet support - 2026-10-23

**1310 skills · 153 bundles** (from 1301 · 153 at v83.1.0). 21 Duet-ready skills are now designed for Claude Duet and other proactive agents.

### Added
- **Setting up an agent** (pm-duet): `standing-orders`, the one-page manual an agent keeps between your messages (#453); `approval-policy-designer`, per app, what it may do alone, must ask about or must never do (#454); `agent-kill-switch-plan`, how to stop a misbehaving agent in under a minute (#458).
- **Teams**: `shared-agent-charter`, for an agent a whole team shares in Slack or Teams (#456).
- **Small-business watch pack** (#462): `cash-watch`, `payroll-eve-check`, `signature-pipeline-watch`, `crm-hygiene-sweep` and `store-watch`, for Stripe, Xero, QuickBooks, Gusto, DocuSign, HubSpot and Shopify. Each one drafts only; none refunds, pays, signs or edits records.
- **The duet block on five more skills** (#466): `inbox-triage-live`, `followup-sweep`, `delta-briefing`, `competitive-intelligence-monitor` and `late-invoice-chaser`.
- **Injection drill** (#463): twelve planted instructions to send to your own account, scored on whether the agent reports or obeys them. Every planted address is on the reserved .invalid domain.
- **Fake-apps sandbox** (#465): a dependency-free MCP server with invented data for one shop. Sends, payments and deletions are refused and logged.
- **Duet page** (#467): `duet.html`, with the setup order, every Duet-ready skill and its settings, and the safety kit.
- **Starter packs** (#468): five packs of three or four Duet-ready skills, and `npx pm-claude-skills add --skills a,b,c` to install exactly those skills.
- **Add to Claude** (#469): an upload-ready ZIP for every skill, with the skill folder at its root as claude.ai requires, and a button on every skill page and Duet card. Uploaded skills work in Claude and in Claude Duet.

### Fixed
- `docs/installation.md` said to zip a skill's files without their folder, a layout claude.ai rejects; it now gives the folder-at-root layout (#469).

## [83.1.0] - Duet-ready - 2026-10-22

**1301 skills · 153 bundles** (from 1295 · 152 at v83.0.0).

### Added
- **The Duet-ready convention** (#446): an optional `duet` frontmatter block (brief length, cited sources, draft-by-default, approval verbs, a cadence with its plan-limits cost) and a shared [status vocabulary](docs/duet/status-vocabulary.md) that bans "done": terminal states are shipped (verified) or approved (a named yes). Three honesty tiers; everything ships at "designed for Duet" because nobody here has access yet, and that is stated rather than hidden.
- **pm-duet** (6, #447): `morning-brief-designer`, `interrupt-rules`, `end-of-day-report`, `weekly-rollup`, `send-approval-check` (recipient, account, subject, attachments and the committing sentence quoted; approving wording is not approving the send) and `prepare-for-duet` (a readiness audit worth doing on the waitlist). Each with a curated eval case.
- **Connected-source variants** (#447): `stakeholder-update`, `changelog-generator` and `discovery-interview-guide` can read connected threads, events and repos and cite each claim, with sending always a separate approval.
- **Surfacing** (#450): `data/duet-ready.json` (the tier registry), ⚡ flags and a `duet_ready` field in the catalogue, and a waitlist-first Duet section in the README.
- **Community kit** (#448): a "Tested on Duet" issue form with named credit, the [7-day Duet challenge](docs/duet/7-day-challenge.md), the brief gallery with a monthly pick, a 30-second demo storyboard, a sourced [comparison of Claude Duet, OpenAI Dots and Meta Muse](docs/duet/proactive-agents.md), and a before-and-after morning-brief mock labelled as mock data.

## [83.0.0] - For everyone, everywhere - 2026-10-17

**1295 skills · 152 bundles** (from 1285 · 152 at v82.0.0). No Anthropic credit is spent by default from this release on.

### Added
- **Access for everyone**: an Easy Read switch for every skill (#410), Teach me mode so a skill coaches you through doing it yourself (#417), questions by voice with spoken answers in the browser's language (#412), and search that understands Hinglish, Taglish and Spanglish (#411).
- **Local rules and terms**: jurisdiction overlays add the rules where you are to a skill, with sources and a last-checked date (#409, #420), and glossary packs make output use each place's official terms (#413).
- **New skills and journeys**: newcomer and informal-economy skills (#414), disability and after-a-disaster skills (#416), each with two journeys, and `form-explainer` with a forms lookup page covering UK, US and Indian forms (#419).
- **Offline and low-tech**: PM Skills in a box, the website and a local model on a Raspberry Pi over its own Wi-Fi (`box/`, #421); a USSD menu for any phone with no data, with the link by SMS (`integrations/ussd/`, #422); right-click any file in Finder, Explorer or Linux file managers (`integrations/right-click/`, #426); `pm-claude-skills run --local` for a free local model (#426).
- **Skills as apps**: `use.html` opens any skill as a one-page app you can download as a single HTML file (#423).
- **Personal forks**: Skill Remix saves your forks, shows what changed upstream, and "Suggest back" sends only your changed lines (#424).
- **Paid expert skills**: registry rules for paid listings with a checkable credential and a free preview, an experts page and a guide (#425).
- **Partner checks**: organisations that help people can vouch for skills, with a badge and a page to send their users to (#427).
- **The jobs exam**: tasks and marking schemes from working professionals, AI answers graded blind by people in the same occupation (#428).
- **Learning from outcomes**: opt-in, your Outcome Ledger notes on what worked feed the next run of that skill (#429).
- **Earlier in this cycle**: the October bets (#350 to #368: AI at work report, PM-8B pipeline, evolution log, the live Firm, signed community registry, phone line, Skill Cup, "How do I…?", 20 languages for search), live A/B tests of skill versions, smart search by meaning, what-changed pages, daily caps for public bots, README front page, trigger phrases and worked examples for every skill.

### Changed
- **No API spending by default** (#408): automated workflows and the hosted free trial no longer spend Anthropic credit unless `ALLOW_API_SPEND` is set; free answers come from Workers AI.
- **PM-8B trains without API credit** on one rented GPU (`training/run-on-gpu.sh`), hardened for a fresh server (#430).
- New checks live in `tests/checks/`, run by `tests/run-checks.mjs`, so parallel pull requests no longer collide on the check script.

### Fixed
- Stored XSS in credential claims (#365), the homepage card layout (#395), A2A routing (#388), and catalogue dates and counts.

## [82.0.0] - China for everyone, Korea and Southeast Asia, lite skills, teams - 2026-10-06

**1285 skills · 152 bundles** (from 1250 · 144 at v81.2.0).

### Added
- **Profile**: `npx pm-claude-skills profile` stores your role, seniority, industry, company, country, city, language and tone on your computer only; `add` and `sync` install it next to the skills (a `pm-profile` skill, or an always-on rule), so skills stop re-asking and apply local rules for your city.
- **Team sync**: a committed `.pm-skills.json` (with a JSON Schema) lists a team's agents, bundles, skills and agreed version; `npx pm-claude-skills sync` installs exactly that set and `sync --check` fails on a missing, edited or wrong-version install. See `docs/TEAMS.md`.
- **Cookbooks**: Jupyter notebooks using the Python package with DeepSeek, Qwen on ModelScope's free quota and a local Ollama (`cookbooks/`).
- **Discord bot** (`integrations/discord-bot/`): `/skill` and `/find` over HTTP interactions, Ed25519-verified (with a pure-Python RFC 8032 fallback), sharing routing and models with the Feishu, DingTalk and WeCom bot.
- **Contributor credits**: an all-contributors table and a levels-of-contribution card in the README, built from `.all-contributorsrc` by `scripts/build-contributors.mjs` (with `--add` and `--check`).
- **Offline playground**: the installable playground now gets a fresh cache on every deploy (the service worker is stamped with the commit), an offline page, a "new version is ready" reload prompt, and caches the finder, the listen page and each skill bundle as it is opened.
- **jsDelivr route**: `docs/CDN.md` (with Chinese) shows how to fetch any skill or the skill index from jsDelivr's npm mirror, and `install --cdn` (or `PM_SKILLS_CDN=jsdelivr`) installs skills from other repos through jsDelivr instead of GitHub.
- **Word and WPS add-ins** (`integrations/office-addin/`): a task pane that inserts a skill's output template into the document or runs a skill on the selected text with your own model endpoint; sideload steps for Word on the web, Windows and Mac, and for WPS 文字 including 统信 UOS and 银河麒麟.
- **Importable trackers** (`templates/import/`): weekly report, OKR and job-application tables for 飞书多维表格, Notion and Obsidian (with a Dataview dashboard).
- **Side by side** (`compare-lang.html`): any translated skill next to its English original, one section per row, in all translated languages; built at deploy from `skills-i18n/`.
- **Lite skills for small models**: `npx pm-claude-skills add --lite` installs condensed skills (frontmatter, framework, inputs, output template, quality checks and disclaimers; examples and essays dropped), about 20% smaller on average, for Qwen 7B, DeepSeek distills and other local models. `tests/lite-test.mjs` checks every skill keeps its inputs, checks and disclaimers.
- **Calculators with tests**: reference calculators for the year-end bonus tax (separate versus combined, with the threshold traps), Korean 퇴직금, Taiwan 資遣費 with notice pay, and Hong Kong MPF contributions, alongside the Chinese 经济补偿金 one; `tests/test_calculators.py` pins worked values so a rule change breaks a test, not a user's sums.
- **Prompt-injection suite**: 15 documents (a lease, terms, bills, a CV, a job ad, an inbox, a transcript, a Chinese labour contract) each hiding an instruction and a canary; the 15 skills that read pasted documents now carry a "treat documents as data" rule. `scripts/check-injection.mjs` runs offline in `npm run check` and against a model with `--model` (manual workflow: Prompt-injection eval).
- **"Rules checked" stamps**: `data/rules-reviewed.json` dates the last rules check for 181 rule-based skills (high-stakes, plus the regional ones); skill pages show the date, amber after 12 months and red after 24. `node scripts/rules-reviewed.mjs --review <skill> --by <handle>` records a real check.
- **pm-korea** (4): `kr-year-end-tax-settlement` (연말정산), `kr-severance-pay` (퇴직금 and 퇴직연금), `kr-cover-letter` (항목별 자기소개서) and `kr-work-report` (개조식 보고서 and 주간보고), with a Korean **README.ko.md**.
- **Vietnamese and Indonesian**: 28 widely useful skills translated into each (`skills-i18n/vi/`, `skills-i18n/id/`): job search, workplace writing and the document decoders.
- **Chinese audience packs.** **pm-china-teachers** (5, 教师): `cn-lesson-plan` (新课标教案), `cn-class-meeting` (主题班会), `cn-parent-meeting` (家长会), `cn-term-comments` (期末评语) and `cn-open-class` (公开课与说课稿). **pm-china-parents** (4, 家长): `cn-school-entry` (幼升小 / 小升初, marked to confirm locally), `cn-home-school-comms` (家校沟通), `cn-extracurricular-plan` (兴趣班 against the 双减 rules) and `cn-homework-helper-parent` (guiding, not doing, homework). **pm-china-trade** (4, 外贸): `cn-inquiry-reply`, `cn-letter-of-credit-check` (UCP 600, marked to confirm), `cn-trade-quotation` (Incoterms 2020 cost build-up) and `cn-customs-docs`. **pm-china-manufacturing** (4, 制造业): `cn-8d-report`, `cn-5s-audit`, `cn-quality-traceability` and `cn-sop-writer` (作业指导书).
- **适老化**: `cn-help-parents-admin` (帮爸妈办事: 医保, 社保, 养老金, banking and scam protection for ageing parents) in pm-china-life, and an optional 长辈版 output (one action per step, plain words, a call-for-help line) in `cn-medical-insurance-claim` and `cn-social-insurance-explainer`.
- **pm-sea** (4): `singapore-cpf-explainer`, `malaysia-epf-explainer` (KWSP), `singapore-employment-act` and `huawen-business-writing` (新马华文商务写作). **pm-japan** (4): `jp-year-end-adjustment` (年末調整), `jp-tax-return` (確定申告), `jp-resignation-procedures` (退職の手続き) and `jp-ringisho` (稟議書), in Japanese.
- **Chinese workflow chains**: `/cn-career-ladder` (周报 → 复盘 → 年终总结 → 述职 → 晋升答辩), `/cn-crossborder-launch` (market → platform → listing → 小红书 → livestream) and `/cn-campus-offer` (校招 plan → bilingual CV → technical interviews).
- **Pinyin search**: `zb`, `zhoubao` or `xhs` find 中文周报 and 小红书笔记 in the playground, `find.html` and `npx pm-claude-skills find` (`web/zh-pinyin.json`, built by `scripts/build-zh-pinyin.mjs`).
- **Chinese search reach**: a page per Chinese skill at `/zh/` with hreflang links both ways, added to the sitemap, plus Baidu and IndexNow submission after each deploy once `BAIDU_PUSH_TOKEN` and `INDEXNOW_KEY` are set.
- **China data**: `data/cn-policy-calendar.json` opens a `policy-review` issue when a rule the China skills rely on changes (社保 and 公积金 bases, 个税汇算, 社平工资, holidays, exam rules); `data/cn-city-data.json` holds official 2026 社保 bases for Beijing and Shanghai with sources, shown with a severance-cap estimate at `city-data.html`.
- **Live cards**: release-channel drift (GitHub, npm, npmmirror, PyPI, MCP registry, Gitee), most-wanted skills ranked by 👍 on `skill-request` issues, and skill-of-the-day RSS and Atom feeds in English and Chinese.
- **Reach**: a Chinese weekly digest draft (`live/zhoukan.md`), the Chinese skills exported as LobeHub agents (`/lobehub/`, since lobe-chat-agents no longer takes pull requests), a Used by page from GitHub search, and vertical MP4s of the terminal and constellation animations for 抖音, 视频号 and Shorts.
- **Trust**: a reproducible release bundle with a CycloneDX SBOM, signed with Sigstore build provenance at deploy (`/releases/`), and `npx pm-claude-skills verify --release` to check installed skills against it.
- **Faster playground**: skill bodies load per bundle when a skill opens (`skills-body/<bundle>.json`) instead of all 2.6 MB of `skills.json` after first paint.
- **Release safety**: npm publishing uses trusted publishing (OIDC) with the token only as a fallback; the PyPI workflow fails a release whose `pyproject.toml` version was already published; SkillBench gains free `sf:` (SiliconFlow) models; a ratcheted Chinese typography check runs on translation pull requests.
- **Live README cards, round two**: what's new (from this changelog), a 30-day China channel record, countdowns for 四六级, 教资 and 法考 alongside 高考, 考研 and 国考 with a daily sprint page in the last 30 days, a Traditional Chinese seasonal banner, a badge for every skill, PNG copies for WeChat and Weibo, and a subscribable China work calendar (`live/cn-calendar.ics`). The skill of the day now leans towards the season (exam sprints, 618 and Double 11, year-end, recruiting), and `npx pm-claude-skills today` shows the same pick in the terminal.
- **Seasonal tools**: a greetings generator (`zhufu.html`), a year-end review and 述职 outline builder (`nianzhong.html`), a 调休 planner (`tiaoxiu.html`) and an embed page for the live cards (`live-cards.html`).
- **China distribution**: an Alibaba Cloud OSS mirror of the site, ready for keys (`docs/zh/site-mirror.md`), and a listing kit for Coze, Bailian, ERNIE and Kimi with a generated system prompt (`docs/listings/`). The Chinese SkillBench now runs monthly and opens a pull request with its results.
- **Gates**: `check-readme-live.mjs` fails a README that links a live image the build does not produce, and `check-date-data.mjs` fails when the exam dates or solar-term tables run out.
- **Skills**: `cn-jargon-translator` (互联网黑话翻译器) in pm-china-work; a new **pm-china-yearend** bundle (述职季) with `cn-shuzhi-deck`, `cn-year-end-bonus` and `cn-next-year-plan` alongside `cn-year-end-review`; `hk-cantonese-copy` (粵語文案) in pm-hk-tw.
- **A README that does not overwhelm**: a TL;DR box, a "1,255 skills, you need 5" funnel, six Pick your path cards with start pages (`docs/start/`), a "What do you want to do today?" chart, a four-question quiz (`docs/quiz/`), a quest log with badges, and Nib the mascot.
- **Live README images**, rebuilt daily on the site (`scripts/build-readme-live.mjs`): skill of the day, live stats, China channel status, 高考 / 考研 / 国考 countdowns, a daily banner for the 二十四节气 and 春节, 中秋, 国庆, 618 and 双11, and the Chinese model leaderboard. Animated terminal and constellation hero. A 拜年 greetings page.
- **Captures**: before-and-after animations, search demos, a Skill City still and a tech-tree tour. `listen.html` reads Mandarin demos aloud. The skill finder now matches Chinese queries.
- **For Chinese readers**: a calligraphy title, 打工人的一天, a supported-tools grid, a prompt wall, chat animations, a QR poster, a FAQ, and a full Traditional Chinese **README.zh-TW.md**.
- **Repo tools**: Xiaohongshu share cards (`card.html`); a 21 MB intranet offline pack on the site and on Gitee releases, with install guides for 统信 UOS and 银河麒麟; a local-model guide (数据不出域); Feishu, DingTalk and WeCom group-chat bots (`integrations/chat-bots/`); a translation claim board and translators' leaderboard; a campus ambassador kit with a talk deck; a contributors wall and a self-hosted star chart with milestones.
- **Free Chinese models**: the playground offers ModelScope (daily free quota) and Hugging Face (free monthly credits) for DeepSeek, Qwen, GLM, ERNIE, MiniMax and Kimi, each visitor with their own free token. The Chinese SkillBench runs on the same free routes (`modelscope:*`, `hf:*`) with the tokens the repo already has.

### Fixed
- The Dify plugin package is served from the site at https://mohitagw15856.github.io/pm-claude-skills/dify/pm_skills.difypkg, since releases are immutable and cannot take assets after publishing.

## [81.2.0] - China compliance, Hong Kong and Taiwan, Dify and Chinese routing - 2026-10-04

**1250 skills · 144 bundles** (from 1235 · 142 at v81.1.0).

### Added
- **pm-china-compliance** (4): `cn-mlps-checklist` (等保 2.0), `cn-data-export-assessment` (数据出境), `cn-pipl-pia` (个人信息保护影响评估), `cn-genai-filing` (大模型备案与 AI 内容标识).
- **pm-hk-tw** (2): `hk-mpf-explainer` (強積金) and `tw-labour-standards` (勞動基準法), in Traditional Chinese.
- `cn-official-document` (公文, GB/T 9704) in pm-china-work; `cn-thesis-proposal`, `cn-citation-gbt7714` (with a tested GB/T 7714 formatter) and `cn-tech-interview-drill` in pm-china-exams; `cn-hukou-points`, `cn-housing-fund-withdrawal`, `cn-medical-insurance-claim` and `cn-small-business-tax` in pm-china-life; `crossborder-platform-playbook` in pm-chuhai.
- **Dify**: a plugin that finds skills offline and loads them from Gitee (attached to every release as `pm_skills.difypkg`), and 12 import-ready Dify apps. A MaxKB and FastGPT tool that needs only Gitee. A Coze, Yuanqi and ERNIE agent guide.
- **Chinese routing evaluation**: 200 real-world Chinese requests scored across three routers (`docs/ZH-ROUTING.md`); routing now also reads Traditional Chinese translations and short Chinese descriptions for common untranslated skills.
- **Tech tree**: a Chinese interface and share posters with a QR code. **Playground**: voice input.
- **Gitee**: the mirror shows the Chinese README first and retries pushes; Chinese release notes publish to Gitee once a token is set. A GitCode mirror workflow, ready for keys.
- Animated READMEs in English and Chinese; an OSPP project proposal and a filled Datawhale proposal.
- **ModelScope Skills Central**: all 75 Chinese translations listed under @mohitagw15856, published by `scripts/publish-modelscope-skills.py` (skips skills already there, backs off when rate-limited).

## [81.1.0] - Launch kit, 3D explorer, tech tree and more for China - 2026-10-04

**1235 skills · 142 bundles** (from 1212 · 139 at v81.0.0).

### Added
- **pm-oss-launch** (9): take a side project to a repo strangers install, trust and contribute to. `readme-benefit-writer`, `demo-data-generator` (seeded generator template), `importer-scaffolder`, `first-issue-designer`, `licence-notice-auditor` (compatibility reference, not legal advice), `fortnightly-release-planner`, `self-host-packager`, `readonly-mcp-wrapper` (tested stdio server template) and `demo-clip-storyboard`.
- **pm-3d-explorer** (4): topic in, interactive 3D explorer out. `explorer-interface-brief`, `model-prompt-pack` (every label names a trusted source; geometry is illustrative), `explorer-viewer-builder` (single-file Three.js viewer with exploded view and quiz mode) and `explorer-pipeline`.
- **pm-china-exams** (5): `cn-civil-exam-essay` (申论), `cn-civil-exam-interview` (结构化面试), `cn-kaoyan-planner` (考研), `cn-campus-recruitment` (校招), `cn-soe-interview` (国企面试).
- **pm-china-work** gains 5: `feishu-doc-writer`, `dingtalk-work-log`, `wecom-announcement`, `cn-prd-review` (需求评审), `cn-level-mapper` (职级对标).
- **Tech tree** at `/tech-tree/`: the library as a research tree, with search, install commands and the voting queue (`scripts/build-tech-tree.mjs`, `site/tech-tree/`).
- **ModelScope**: the playground as a Studio, a dependency-free skill router model with its evaluation, six skills on Skills Central and the MCP server listed; workflows publish the Studio and the model on every release.
- **SkillBench Chinese task set** and DeepSeek, Qwen, Kimi, GLM and Doubao as SkillBench providers (`modelbench.html?set=zh`).
- `docs/learn-zh/`: a six-lesson Chinese course; Chinese issue templates for GitHub and Gitee.

### Changed
- `docs/CHINA.md` leads with installs that never touch GitHub, and covers Cherry Studio, Dify, FastGPT and MaxKB.
- Translations: 60 skills in Simplified Chinese.

### Fixed
- The playground hero showed a literal `&amp;`; the MCP README still said 174 skills; two README install commands named the marketplace `pm-skills` instead of `pm-claude-skills`.

## [81.0.0] - Chinese support and the CV studio - 2026-10-04

**1212 skills · 139 bundles** (from 1176 · 134 at v80.2.0).

### Added
- **pm-cv** (20): a CV shaped for one company and role from its applicant tracking system, the country, the sector, its published values and the job ad, with every choice sourced and dated. `career-inventory` interviews the experience first; sector and situation formats (consulting and banking, academic, US federal, UK civil service and NHS, career changer, graduate, returner, executive); `bilingual-cv-zh-en`; `recruiter-scan-simulator`; `cv-honesty-check`; `referral-request`; `application-tracker`; and `cv-docx-export`. Helpers: `ats_detect.py`, `jd_gap.py`, `cv_docx.py`.
- **pm-china-work** (4): `cn-weekly-report` (周报), `cn-year-end-review` (述职 / 年终总结), `cn-promotion-defence` (晋升答辩), `cn-fupan` (复盘).
- **pm-china-life** (5, high-stakes): `cn-labour-contract-decoder`, `cn-severance-calculator` (N, N+1, 2N, with `cn_severance.py`), `cn-iit-reconciliation` (with `cn_iit.py`), `cn-social-insurance-explainer`, `cn-gaokao-planner`.
- **pm-chuhai** (3): `chuhai-market-entry`, `cross-border-listing`, `pipl-gdpr-crosswalk`.
- **pm-zh-content** (4): `xiaohongshu-note`, `wechat-article`, `douyin-script`, `livestream-sales-script`, each with a restricted-claims check.
- **Chinese model providers in the playground**: DeepSeek, Qwen, Kimi, GLM and Doubao, bring your own key, with an "Other model ID" field. Browsers set to Simplified Chinese default to GLM's free model.
- **Trae, Qoder, Lingma and CodeBuddy** in `npx pm-claude-skills add --agent`, with rule files generated at install time, and `--bundle` to install only some bundles.
- **Chinese routing**: Chinese requests are matched as two-character pieces, translated descriptions take part, and acronyms such as PRD and OKR are kept inside Chinese requests.
- **Translations**: 50 skills in Simplified Chinese and 25 in Traditional Chinese; `README.zh-CN.md`; `docs/CHINA.md`; drafts in `docs/china-launch/`.
- **Mirrors**: workflows for a Gitee mirror and a ModelScope dataset mirror.

### Changed
- README: a Chinese banner and a bilingual Chinese support section on the first screen.
- Eval coverage: 281 to 317 curated cases. Keyword routing: 55.5% top-1 on 317 cases.

### Fixed
- The router dropped Chinese descriptions from the catalogue.
- The browser extension's never-host list changed shape and crashed its check.

## [80.2.0] - trust in a release - 2026-09-28

**1176 skills · 134 bundles** (unchanged from v80.1.0). No new skills: this release is about being able to trust what is published.

### Fixed
- **The documented MCP command did not work.** `npx -y pm-claude-skills-mcp` resolves an npm package of that name, which is a security holding package and not this library. The working form is `npx -y -p pm-claude-skills pm-claude-skills-mcp`. Corrected in 20 files, including the hints printed by `doctor` and the postinstall message. If you registered the server with the old command, register it again.
- Zapier app: `platformVersion` is read from the installed `zapier-platform-core`. It was hard-coded, so any update to that package would have broken the push.
- README stat table said 132 bundles (134) and the FAQ said 1178 skill directories (1188). Neither shape was covered by the drift check.
- `ROADMAP.md` still said 1117 skills and listed paused work as upcoming. Rewritten from measured numbers and added to the drift check.

### Added
- **Release verify** (`npm run verify:release`, and a workflow on each release, daily, and on demand): checks that npm and PyPI carry the released versions, that the CLI runs from a clean directory, that the MCP server starts through `npx` and lists its tools, and that no living document shows the broken MCP command.
- **Announcements**: `announcements/current.json` holds one current notice. `doctor` prints it from the package with no network call, and the playground shows a dismissible bar from a same-origin copy. Plain text only, `https` links only, and it expires by date. See `docs/ANNOUNCEMENTS.md`.
- **Versioned skill releases** (`npm run skill-release`): frozen copies of a skill that a team can pin, with a hash for each. First releases, all 1.0.0: `prd-template`, `meeting-notes`, `stakeholder-update`, `user-research-synthesis`, `competitive-analysis`. See `docs/SKILL-RELEASES.md`.
- **promptfoo evals** (`npm run evals:promptfoo`, `npm run evals:promptfoo:smoke`): the 281 curated eval cases, runnable against any provider. The smoke run needs no API key. See `evals/promptfoo/README.md`.
- **`DESIGN.md` and `design-system/MASTER.md`**: the library's own design pipeline applied to the web pages, with a check (`npm run check:design`) that fails when the document and the stylesheet disagree or when the count of stray values goes up.
- **Dependabot** for GitHub Actions, npm, pip, cargo and the container image: monthly, grouped, and without major versions except for Actions.
- Pull request template: three gates at the top (searched for duplicates, checked the roadmap, declared dependencies).

### Changed
- README restructured for a faster first read: a link row under the banner, eight badges in place of fourteen, a "How it works" table, a "right for you if" checklist, a compact "Works with" table in place of fifteen platform buttons, a "What PM Skills is not" section, a roadmap preview and a privacy and telemetry summary.
- The three long "New" sections (design taste, the promote loop, the decision layer) moved in full to `docs/WHATS-NEW.md`; the README keeps a short summary table.
- The container runs on `node:24-alpine`. Node 20 has reached end of life.
- GitHub Actions moved to their current major versions across all workflows.
- Seasons are paused. Season 2 is recorded in the Hall as closed with no champion.

## [80.1.0] - design taste - 2026-09-28

**1176 skills · 134 bundles** (from 1170 · 133 at v80.0.0).

### Added
- **pm-design-taste** (6): stop assistants producing generic AI-looking interfaces by fixing the order of decisions. `ui-design-pipeline` is an original orchestrator that runs five stages in sequence, never in parallel: direction (commit to an aesthetic stance from audience and purpose before any code), system (lock it into a persisted design system file), motion (enter animations ease out, most motion under 300ms, animate only where it helps), critique (hierarchy, spacing, typography, too safe vs too loud) and verification (real browser, mobile and desktop widths, screenshot each step, fix and re-check). It detects which specialist skills are installed, hands off one per stage, falls back to built-in guidance with the install command when one is missing, and warns against loading every design skill at once. It carries a dated "current AI tells" checklist and says plainly that the list goes stale.
- Five pointer skills, one per upstream project, with when to use it, the install command and author credit: `frontend-design-pointer` (Anthropic), `ui-ux-pro-max-pointer` (nextlevelbuilder), `emil-design-eng-pointer` (Emil Kowalski), `impeccable-pointer` (Paul Bakaus), `playwright-cli-pointer` (Microsoft, with Vercel's web-design-guidelines as an optional audit step). No upstream SKILL.md content is copied.
- `plugins/pm-design-taste/THIRD_PARTY.md`: project, author, licence and link for each upstream, with the date checked.
- `examples/pm-design-taste-example.md`: trigger prompts and output excerpts.
- Six eval cases; the coverage baseline moves from 275 to 281.
- README: a design taste section with the stage table and trigger prompts.

### Changed
- `skill-dupes-allow.json`: `frontend-design` and `frontend-design-pointer` declared as a deliberate pair (this library's own skill vs a pointer to Anthropic's skill of the same name).
- `.claude-plugin/marketplace.json` description carries the current skill and bundle counts (it said 515 and 74).

### Notes
- Pointer skills end in `-pointer` so they never shadow the upstream skill of the same name once it is installed, and so the pipeline's detection step cannot mistake a pointer for the real thing.
- Upstream changes found on 2026-09-28: `emilkowalski/skill` is now `emilkowalski/skills` and its README installs with `npx skills@latest add emilkowalski/skills`; `anthropics/skills` has no root licence, the `frontend-design` skill carries its own Apache 2.0 `LICENSE.txt`.

## [80.0.0] — the promote loop — 2026-09-22

**1170 skills · 133 bundles** (from 1166 · 132 at v79).

### Added
- **pm-skill-promoter** (4) — closes the loop between what you keep asking your assistant for and reusable skills: `promoter-scan` (cluster and rank recurring requests from Claude Code transcripts or a claude.ai export, redaction first, promotability score), `promoter-draft` (a complete SKILL.md in the library's format with three generalised worked examples and the bundle stanza), `promoter-test` (positives, near-miss negatives and goldens; precision and recall of the trigger description with a rewrite loop at 0.8), `promoter-publish` (the full release package: wiring, generators, count, gates, version, CHANGELOG, commands, one confirmation before push). Three stdlib helper scripts with `--selftest`.
- `/promote` slash command running scan → choose → draft → test → publish.
- `docs/PROMOTE-LOOP.md` with an end-to-end example on the synthetic fixture in `examples/promoter/` (transcript with planted secrets, the scan report, a drafted skill and its evals; the test scores 1.0 precision and recall).
- README: a promote-loop section with the worked example, and a "what do I keep asking you for?" row.


### Changed
- Decision layer: the client now speaks to three providers — TypeSafe direct, **Vercel AI Gateway** (`AI_GATEWAY_API_KEY`, `typesafe-ai/jev`) and **Cloudflare Workers AI** (`CLOUDFLARE_API_TOKEN` + account id, `typesafe/jev`) — picking the first credential present (`JEV_PROVIDER` forces one). TypeSafe signups are closed; the gateways are not.
- Hosted worker: `/route` and the `/try` guard run through a Workers AI binding (`[ai] binding = "AI"`), so they are live with no key; `GET /route` reports the provider. `skillbench/route-bench.mjs --worker <url>` benchmarks through it.
- **Claude adapter** (`integrations/jev/adapter.mjs`): the System One request shape answered by a Claude model on `ANTHROPIC_API_KEY` — the last-resort provider, labelled `adapter:<model>` and never presented as Jev. The worker tries key → Workers AI → adapter and caps adapter-backed `/route` calls per IP and per day.
- Banner and GitHub About text carry the current count (they said 1098). README rewritten again: door table, a without-vs-with table, the count explained in the FAQ (1178 directories, 12 deprecated, 1166 browsable).

## Earlier releases

Releases before 80.0.0 are in [docs/changelog/CHANGELOG-pre-80.md](docs/changelog/CHANGELOG-pre-80.md).
