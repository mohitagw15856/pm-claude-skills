# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project broadly follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html):
each new wave of skills bumps the **major** version, extensions and fixes bump
**minor** / **patch**.

## [Unreleased]

## [53.0.0] — close the loop + go everywhere: trust/proof surfaces & the distribution wave — 2026-07-16

### Added — 🤝 Trust & proof (close the loop)
- **[Outcome Ledger](https://mohitagw15856.github.io/pm-claude-skills/ledger.html)** — log what each artifact became in the real world (landed / mixed / no / pending) and see per-skill landed-rate; opt-in "claim" contributes anonymised counts. Local-first (`pm_outcome_ledger_v1`).
- **[Cost & Privacy meter](https://mohitagw15856.github.io/pm-claude-skills/cost.html)** — per-run token-cost estimate, a running local total, and a plain-English "where your data went" panel. Backed by `web/pmcost.js` (`PMCost`).
- **[Model Duel](https://mohitagw15856.github.io/pm-claude-skills/duel.html)** — run the same task on three models side-by-side and pick a winner.
- **Accessibility pass** — a site-wide `a11y.js` toolkit (high-contrast, dyslexia-friendly, large-text, reduced-motion, skip-link) wired into 67 pages.
- **[Write-back to real tools](integrations/writeback/)** — a thin relay Worker that pushes a finished artifact into GitHub, Notion, Linear, or Slack using your own token.
- **Right-click → send to a skill** — the coach browser extension now has a `contextMenus` background worker: select any text anywhere and drop it into a skill (pre-filled), or route it to the command bar (new `?q=` deep link).
- **[Skill Remix](https://mohitagw15856.github.io/pm-claude-skills/remix.html)** — edit a skill's instructions, run the fork, word-diff against the original, share as a PR.
- **[Trends dashboard](https://mohitagw15856.github.io/pm-claude-skills/trends.html)** — a privacy-preserving pulse of the library from opt-in ratings + eval scores.
- **[The Operator's Path](https://mohitagw15856.github.io/pm-claude-skills/path.html)** — a 30-day certified-operator programme with streaks and review markers.
- **[Scheduled reports](.github/workflows/scheduled-reports.yml)** — `config/scheduled-reports.json` + `scripts/scheduled-report.mjs` run a skill on a cadence and commit the output to `docs/reports/scheduled/`.

### Added — 📦 Physical, standards & distribution
- **[Skills API](https://mohitagw15856.github.io/pm-claude-skills/api.html)** — a live developer landing page over the existing edge REST API, plus a formal OpenAPI 3.1 contract (`integrations/api/openapi.yaml`) and BYO-key run guide.
- **[The Operator's Journal](scripts/build-journal.mjs)** — a print-and-fill workbook generator: each spread is a real skill's output structure with lined space to draft by hand.
- **[The Operator (tabletop game)](scripts/build-tabletop.mjs)** — a print-and-play party game about professional judgment (48 skill cards + 24 situations + rules), built from the real library.
- **[E-ink desk companion](integrations/eink/)** — MicroPython for ESP32 + Waveshare e-paper showing "today's skill" from the public API; panel-agnostic driver adapter.
- **[SkillBench working paper](docs/paper/skillbench.md)** — the professional-work benchmark's methodology, protocol, and honestly-negative initial skill-lift result.
- **[Agent Skill Interchange (RFC-0001)](docs/rfcs/0001-skill-interchange.md)** — a provider-neutral `.skillpack` format for moving a *collection* of skills between agent systems, with provenance + integrity (`spec/skill-interchange.schema.json`).
- **[Reports index](docs/reports/README.md)** — an index + shared methodology for the Institute's published reports.
- **[Voice assistants](integrations/voice-assistants/)** — Alexa (interaction model + Lambda), Google Assistant (Actions webhook), and Apple Watch/Siri (Shortcuts recipe): name the best-fit skill by voice, push the full artifact to the phone.
- **[Slack app](integrations/slack-app/) + [Zapier](integrations/zapier/) + [Make](integrations/make/)** — a `/skill` slash command and two automation-platform apps over the public API (BYO key; nothing stored).
- **[Localized editions](scripts/build-localized-landing.mjs)** — a browsable public front door per translated language (`web/editions/<lang>.html`); ships the Spanish edition (50 skills).

## [52.0.0] — the sensory & spatial release: new ways in, out, and around the library — 2026-07-16

### Added — 🎙️ sensory: new ways in and out
- **[Voice Mode](https://mohitagw15856.github.io/pm-claude-skills/voice.html)** — a hands-free voice agent fronted by a living canvas **orb** that listens, thinks, and speaks in colour. Web Speech STT + `speechSynthesis` TTS; pick a skill or a free assistant; optional hands-free re-loop. Audio never leaves the browser — only the transcript reaches your provider.
- **[Live Capture](https://mohitagw15856.github.io/pm-claude-skills/capture.html)** — point a camera at a whiteboard / contract / screen / chart and turn the frame into an artifact **live**, with an animated scanning overlay. Uses the multi-provider vision path (Claude / Gemini / OpenAI).
- **[Video export](https://mohitagw15856.github.io/pm-claude-skills/video.html)** — paste any output and render a shareable animated **`.webm`** (motion graphic, counting numbers, a Web-Audio soundtrack, your Brand-Kit colour) via `canvas.captureStream` + `MediaRecorder`. No upload.

### Added — 🌊 living visuals
- **[The War Table](https://mohitagw15856.github.io/pm-claude-skills/wartable.html)** — watch two AI agents **negotiate live**: moves land one at a time, a tension meter and deal-proximity bar swing, and it ends in a verdict (deal / close / standoff). Four scenarios.
- **[Holo Cards](https://mohitagw15856.github.io/pm-claude-skills/holo.html)** — tear open a **booster pack** and pull tilt-reactive, gyroscope-aware **holographic** skill cards with rarities; every card deep-links into the Playground.

### Added — 🌐 immersive & interactive
- **[Work OS](https://mohitagw15856.github.io/pm-claude-skills/workos.html)** — a cinematic mission-control deck: dump your open loops and get a **ranked battle plan** that maps each item to the exact skill to run (one-click launches), with a live clock and a "deploy next" rail.
- **[Prompt-to-App](https://mohitagw15856.github.io/pm-claude-skills/app.html)** — describe a tool (calculator / tracker / quiz / decision matrix) and get a complete **working single-file app** whose state serialises into the URL, so a link reproduces it.
- **[The Time Machine](https://mohitagw15856.github.io/pm-claude-skills/timemachine.html)** — a draggable, **playable timeline** that replays your professional history (scans local data, accepts pasted `YYYY-MM-DD — event` lines, or a demo) — events and running state animate as you scrub.
- **[Co-Canvas](https://mohitagw15856.github.io/pm-claude-skills/cocanvas.html)** — a sticky-note whiteboard where **the AI is a participant** (add / cluster / poke holes / expand), with live cross-tab sync (`BroadcastChannel`), presence, and room share links.
- **[Spatial 3D](https://mohitagw15856.github.io/pm-claude-skills/spatial.html)** — fly through the whole library as a **3D constellation** (hand-rolled canvas projection, no deps): orbit, zoom, search, click a star to open it, coloured by bundle; detects VR headsets via WebXR.

### Changed
- 10 new surfaces added to the **🆕 New** nav group; new README showcase strip with live screenshots.
- Cheatsheet poster refreshed (74 bundles · 31 professions) and re-exported to PNG/PDF.
- **Library:** **515 skills, 74 bundles** — capability, not count.

## [51.0.0] — the artifact release: skills stop answering and start producing — 2026-07-16

### Added — 🏭 "Make it real": every skill's output becomes a real deliverable
- **[The Packet](https://mohitagw15856.github.io/pm-claude-skills/make.html)** — one brief, a **`.zip` of finished documents**. Pick a preset chain (🚀 Launch Kit, 🧭 Strategy Pack, 🏃 Delivery Pack) and each skill in it is rendered to its best format — `PRD.doc`, `plan.xlsx`, `deck.pptx`, `press-release.doc` — and bundled via JSZip (SRI-pinned, hash computed from the real file, not guessed).
- **🎨 Brand Kit** ([brandkit.js](web/brandkit.js), `window.PMBrand`) — set a **logo, accent, font and footer once**; every export wears it (PDF header, PPTX title slide + accent rail, Word header, one-pager). Stored in `localStorage` only — the logo never leaves the tab.
- **🧮 Live-formula Excel** — the XLSX export can now write a real `=SUM()` total row over numeric columns, so the file **recalculates like a spreadsheet** instead of shipping dead cells.
- **🖼️ Infographic one-pager** — `PMExport.onePager()` lifts the headline, up to four "big numbers", and the key takeaways into a designed, print-ready A4 page.
- **📄 Designed templates** — the four PDF themes surfaced as a document-template picker.

### Added — 🚀 beyond the document: artifacts that aren't a single file
- **[Meeting → artifacts](https://mohitagw15856.github.io/pm-claude-skills/meeting.html)** — paste a transcript, get **three finished artifacts in one pass**: clean minutes, an Owner/Due/Priority **action tracker** (→ Excel), and ready-to-send **follow-up emails** — plus a one-click `.zip` of the set.
- **[Bring your own data](https://mohitagw15856.github.io/pm-claude-skills/data.html)** — import a **CSV**, paste a table, or fetch a **published Google Sheet**, and run any skill **grounded in your real rows** (cite the numbers; no invented figures), with a live table preview and Word/PDF/Excel export.
- **🌐 Multilingual export** — translate the finished artifact into any of **10 languages** (markdown structure preserved) and download it, one click.
- **[Site & interactive builder](https://mohitagw15856.github.io/pm-claude-skills/site.html)** — describe it and get **one complete, self-contained HTML page** (everything inlined, works offline) — portfolio, landing page, one-pager microsite — with a sandboxed live preview. The **checklist** and **weighted scorecard** types stay **interactive after download**: tick items, drag weights, state persists to `localStorage`.

### Added — earlier in this wave (now documented)
- **💬 [Consultant Mode](https://mohitagw15856.github.io/pm-claude-skills/consult.html)** — run any of the 515 skills as an **adaptive interview** instead of a one-shot template: it asks the two or three questions that actually change the answer, then delivers. Additive — no `SKILL.md` changed, so the marketplace/downloadable versions are untouched.
- **🤖 [SkillBench model rankings](https://mohitagw15856.github.io/pm-claude-skills/modelbench.html)** — the public "which AI does professional work best" leaderboard, rendered from the reproducible harness results with per-domain breakdown and an honest skill-lift finding.
- **🌱 The self-growing library** ([mine-gaps.mjs](scripts/mine-gaps.mjs)) — mines real requests against the catalog by lexical similarity, ranks the biggest gaps, scaffolds the top one under `proposals/`, and opens a PR (monthly + manual). Never writes to `skills/`, never auto-merges.
- **📕 The Handbook, in print** — the paperback is [live on Lulu](https://www.lulu.com/shop/mohit-aggarwal/the-professional-work-handbook/paperback/product-65kwrpk.html); the [print kit](docs/print/) gained a step-by-step Amazon KDP runbook and paste-ready listing copy (description, keywords, categories).

### Changed
- `export-doc.js` gained blob variants (`wordBlob` / `pptxBlob` / `xlsxBlob`) so artifacts can be bundled, and reads the Brand Kit throughout — existing playground exports are unchanged (brand defaults to empty).
- Five new surfaces added to the **🆕 New** nav group.
- **Library:** **515 skills, 74 bundles** (this wave is capability, not count — the artifacts multiply what every existing skill can produce).

## [50.0.0] — the wow release: AI that reads your lease, argues back like opposing counsel, and shows you your exit waterfall — 2026-07-14

### Added — 🔍 pm-decoders: AI reads the fine print for you (6 skills)
- **[lease-decoder](skills/lease-decoder)**, **[medical-bill-decoder](skills/medical-bill-decoder)**, **[tos-decoder](skills/tos-decoder)**, **[loan-decoder](skills/loan-decoder)**, **[benefits-decoder](skills/benefits-decoder)**, **[hoa-decoder](skills/hoa-decoder)** — clause-by-clause plain English with 🔴🟡🟢 red flags ranked by how much they can hurt you, the questions to ask, and what's actually negotiable. Every artifact carries the not-legal-advice line; jurisdiction-dependent rules are flagged, never universalized.

### Added — ⚔️ pm-simulators: the hostile reader you fear, on demand (5 skills)
- **[opposing-counsel](skills/opposing-counsel)** drafts the demand letter the other side's lawyer would send · **[vc-partner-meeting](skills/vc-partner-meeting)** runs the Monday partner meeting after you leave the room · **[regulator-eyes](skills/regulator-eyes)** writes the consumer-protection inquiry letter · **[the-churning-customer](skills/the-churning-customer)** gives the exit interview they never gave you · **[acquirer-red-team](skills/acquirer-red-team)** chips your price with a mechanism per finding. Each produces the adversary's real artifact, then breaks character for a ranked-fixes debrief.

### Added — 🧮 calculators wave 2: skills that do real math (4 skills)
- **[exit-waterfall](skills/exit-waterfall)** — liquidation preferences, conversion equilibrium (brute-forced, not asserted), and the "your shares mean nothing below $X" sentence · **[offer-comparison](skills/offer-comparison)** — vesting curves, cliffs, crossover year · **[refinance-breakeven](skills/refinance-breakeven)** — the month a refi actually saves money, term-reset trap called out by the script itself · **[fire-number](skills/fire-number)** — a sensitivity grid instead of a false-precision retirement date. All deterministic, stdlib-only, byte-exact-pinned in the scripts smoke suite (88 assertions, was 76).

### Added — ✨ four singles
- **[receipts-audit](skills/receipts-audit)** — every factual claim in any document graded against its sources: evidenced / partial / unsupported / contradicted. The Institute's verifiability brand, as a skill.
- **[personal-board-of-directors](skills/personal-board-of-directors)** — five advisors who must disagree, vote under a stated decision rule, and name the evidence that would flip each vote.
- **[altitude-shifter](skills/altitude-shifter)** — one truth at four altitudes (board / engineers / customer / new hire) with a delta table making every reframe inspectable.
- **[decision-forensics](skills/decision-forensics)** — reconstructs what a messy thread actually decided; "no decision was reached" is a valid finding.

### Changed
- **Dynamic skills badge** — the README count badge now reads the live number from skills.json; it can never rot again (it had said 466 for two waves).
- **Drift guard widened** — six claim shapes now checked (badges, pills, "N-skill library", table cells); it caught 39 stale counts across this wave's growth.
- **Library:** 496 → **515 skills, 74 bundles**; exports now 6,193 files × 12 platforms; handbook at 2,563 rules.

## [49.0.0] — the professions release: six industries nobody built AI for, and depth for the fifty that carry the library — 2026-07-14

### Added — six unserved professions (466 → 496 skills, 72 bundles)
- **🏗 [pm-construction](plugins/pm-construction)** — bid/tender review (front-loading detection, exclusion risk-shift), defensible change orders, punch lists with back-charge flags, toolbox-talk safety briefings (hierarchy of controls), subcontractor scorecards with a safety-cap rule, and delay claim letters built on the excusable/compensable matrix.
- **🔧 [pm-hardware](plugins/pm-hardware)** — hardware PRDs with four-layer cost stacks, BOM cost review (single-source and EOL flags), EVT/DVT/PVT gate reviews with waiver discipline, factory acceptance tests (AQL sampling), tooling risk with shown cavitation math, and 8D-structured RMA failure analysis.
- **📦 [pm-supplychain](plugins/pm-supplychain)** — weighted RFP scoring with sensitivity checks, supplier scorecards (OTIF/PPM), S&OP readouts with the max-three-decisions rule, forecast interrogation (hockey-stick detection), ABC/XYZ inventory policy, and logistics incident reports.
- **🌍 [pm-climate](plugins/pm-climate)** — GHG inventory sanity checks (never net offsets against the gross headline), CSRD/ESRS-flavored disclosure drafting, climate risk (hazard × exposure × vulnerability), and a greenwashing self-audit that grades your claims before a regulator does.
- **🛡 [pm-insurance](plugins/pm-insurance) + 🏦 [pm-banking](plugins/pm-banking)** — claims triage, underwriting narratives, renewal reviews, coverage-gap analysis; credit memos with covenant headroom, covenant compliance reviews, KYC/AML escalations, portfolio risk briefs. Every regulated-domain skill embeds an "analytical support, not a determination" line.

### Added — depth inside the skills
- **📖 Worked examples, 50/50** — every Production-Ready skill ships `references/worked-example.md`: a realistic brief, a complete gold-standard artifact, and margin notes tying each choice back to the skill's rules. Internally consistent numbers; real tensions, not happy paths.
- **🎯 Scoring rubrics, 50/50** — each production skill carries a skill-specific 0–40 rubric with 0/5/10 anchors; 32+ is ship-quality. The bridge from "trust me" to "score it".
- **⌨️ CLI field-by-field prompting** — `pm-claude-skills run <skill>` at a TTY with no input now prompts from the skill's declared inputs (same parse the playground form uses). Plus **[RFC-0002](https://github.com/mohitagw15856/skillspec/blob/main/docs/rfcs/0002-machine-readable-inputs.md)** drafted in the standard's new home to make structured inputs official.

### Changed — the standard moved out
- **📜 SkillSpec has its own repo** — [github.com/mohitagw15856/skillspec](https://github.com/mohitagw15856/skillspec) (history-preserving split: spec, JSON Schema, validator, pre-commit hook, GOVERNANCE.md, RFC-0001 ratifying 1.0 as-is). This repo's SKILLSPEC.md is now the pinned pointer copy; one org-creation click remains.
- **🖥 Cockpit shipped** — [cockpit-v0.1.2](https://github.com/mohitagw15856/pm-claude-skills/releases/tag/cockpit-v0.1.2): the playground as a native desktop app, with mac/windows/linux installers now building on every `cockpit-v*` tag.
- **📕 The print kit is real** — `docs/print/build-interior.mjs` renders a true 6×9" trade interior (299 pp) and the wrap cover regenerates from the actual page count.

### Fixed — community PRs, thank you @thejesh23
- **[#146](https://github.com/mohitagw15856/pm-claude-skills/pull/146)** — export READMEs now advertise each platform's real file extension (only cursor is `.mdc`).
- **[#147](https://github.com/mohitagw15856/pm-claude-skills/pull/147)** — `list` derives agents from the CLI's own registries; kilocode no longer missing.
- **[#148](https://github.com/mohitagw15856/pm-claude-skills/pull/148)** — the postinstall banner counts skills at install time instead of hardcoding a stale number.

## [48.0.0] — the institution release: a repo grows a name on the door — 2026-07-13

### Added — the institution wave: from repo to something with a name on the door
- **🏛 [The Open Institute for Professional Judgment](https://mohitagw15856.github.io/pm-claude-skills/institute.html)** — the umbrella binding what already operates (SkillSpec, the Operator's Exam, SkillBench rankings, the census, the Season, the annual report) to named principles: *verifiability over authority; money never touches judgment*. Charter in [docs/INSTITUTE.md](docs/INSTITUTE.md).
- **📜 [The SkillSpec Foundation trajectory](docs/FOUNDATION.md)** — governance written against our own interest: RFC process (with mandatory false-positive analysis and census-measured breakage), maintainership earned by adoption, constitutional verifiability, and the one-hour spin-out runbook to a neutral org.
- **🏢 [The Org Edition](org/)** — `docker compose up` = your company's skill library on your infra: playground + drop-in /v1 API over curated **plus private skills** (hot-reloaded, overriding on collision), deliberately no built-in auth (your VPN/SSO; no account DB to breach), nothing phones home. Tested: 467 skills served with a private override.
- **💼 [The creator economy](docs/CREATORS.md)** — paid packs with a **0% platform take** (Polar/Lemon Squeezy checkout, CI-validated), the sampler rule, and the same security/conformance bar on paid listings. Creators keep the repo, the customers, and the money.
- **🎓 [The Syllabus](docs/syllabus/)** — a complete 6-week zero-budget course (Academy drills + arenas as attested labs + the Operator's Exam as the final), instructor notes with per-week failure modes, and a verified **SCORM 1.2 export** for Canvas/Moodle/Blackboard.
- **🎖 [Agent Conformance](conformance/)** — the suite that certifies *agents* (not models) use skills correctly: discovery, restraint, structure, self-verification, and the honesty-gate refusal — self-tested with pass/fail fixtures; certification by PR with a badge.
- **📕 [The State of Professional AI — 2026 Mid-Year](docs/reports/state-of-professional-ai-2026.md)** — the Institute's citable flagship, generated from live data, including the honest SkillBench finding (run 1 measured *negative* skill-lift, n=12 single-vendor — published as measured, with the two testable hypotheses).
- **📦 [Print products press-go kit](docs/print/)** — the Handbook's full-wrap cover generated (spine width computed), POD runbooks for Lulu/KDP/MakePlayingCards, house rules: digital stays free, proceeds to the free-runs pool.
- **🖥 [The Cockpit](cockpit/)** — complete Tauri 2 scaffold for the desktop app (PWA core ships in the binary; tray/notification/hotkey hooks named as TODOs) + a disabled 3-OS release workflow awaiting the owner's first local build.
- **🏟 Season, institutionalized** — the permanent [Hall of Seasons](seasons/HALL.md), a daily rollover workflow that freezes podiums and opens next-season checklists (scenario authorship stays human, as principle), and live Season standings in the Morning Show.

## [47.0.0] — the off-web release: skills that reach you where you already work — 2026-07-13

### Added — six ways off the web: text, email, a card deck, a game, a coach, and a newsletter
- **📱 Text or call a skill** ([integrations/twilio](integrations/twilio)) — a Cloudflare Worker that turns any incoming SMS into a skill run: it verifies Twilio's request signature (HMAC-SHA1, fail-closed), routes the message to the best skill via `/v1/search` (or an explicit `skill-name:` prefix), runs it on the Anthropic API, and replies as TwiML. The library now answers a phone number.
- **✉️ Email-native operator** ([integrations/email](integrations/email)) — a Cloudflare Email Worker: send a note to an address, it parses the message (`postal-mime`), picks the skill from the subject or body, runs it, and **replies in-thread** (`message.reply`, `mimetext`). No app, no login — just email.
- **🃏 The Operator's Deck** ([deck.html](https://mohitagw15856.github.io/pm-claude-skills/deck.html)) — a printable, poker-sized physical card deck: [build-deck.mjs](scripts/build-deck.mjs) bakes 54 cards, each with a QR that deep-links to the skill in the Playground, cut guides and `@page` print CSS. The library as an object you can hold and deal.
- **🎮 Run the Firm — the game** ([firm-game.html](https://mohitagw15856.github.io/pm-claude-skills/firm-game.html)) — a self-contained browser tycoon: steer an AI company across 8 quarters trading cash, growth, morale and reputation against a random market, score a prediction ledger, earn a grade (S–F), and share the run. Every decision maps to a real skill in the library.
- **🧭 Watch-me-work Coach** ([integrations/coach-extension](integrations/coach-extension)) — an MV3 browser extension that watches the doc/email/PR/ticket you're editing (Docs, Gmail, GitHub, Linear, Notion, Jira, Slack), keyword-matches the text against a bundled skill index, and surfaces a dismissible corner nudge — *"there's a skill for this."* Fully local: nothing you type ever leaves the tab.
- **📻 Auto morning-show / newsletter** ([newsletter/](newsletter)) — a zero-cost weekly issue: [build-morning-show.mjs](scripts/build-morning-show.mjs) composes a skill-of-the-week, fresh picks, the numbers, and a spoken "show script" for TTS — deterministically from the catalog by ISO week, so a [scheduled Action](.github/workflows/morning-show.yml) publishes an issue every Monday untouched.

### Changed — navigation & discoverability
- **🆕 A "New" nav group** — the just-shipped surfaces (Operator's Deck, Run the Firm, Auto-Composer, Live Meeting, Morning Show) were live but buried in the crowded Tools/Explore dropdowns. They now sit in a dedicated top-level **🆕 New** group, and every dropdown scrolls (`max-height` + `overflow-y`) so nothing falls off-screen on smaller viewports.

### Added — the frontier wave: the Season, the Nightwatch, the Atlas, and the show about you
- **🏆 The Season** ([season.html](https://mohitagw15856.github.io/pm-claude-skills/season.html)) — the first open, serverless esport of professional judgment: one negotiation a month with **identical hidden state for everyone on Earth**, played through the Gym's season mode, scores attested with transcript SHA-256, submitted by PR to a CI-verified leaderboard (shape, bounds, author-matches-handle, tamper-protection). Season 1, "The Meridian Renewal," is open until 2026-08-10; winners enter the Hall of Seasons.
- **🌙 The Nightwatch** (`pm-claude-skills nightwatch`) — AI staff that work your directory while you sleep: a scheduled Agent SDK shift that settles due predictions against file evidence, investigates open hunches, drafts the one artifact the workspace needs, and files a morning brief of work DONE. launchd/cron installer, `--dry-run` shows the shift plan free, bounded turns, writes only inside the workspace.
- **⏰ Standing skills** (`pm-claude-skills subscribe`) — skills as scheduled subscriptions against living inputs; every run leads with **"What changed since last run"** (CHANGES.md is the artifact worth reading). Shared scheduler with the Nightwatch.
- **🗺 The Atlas** ([atlas.html](https://mohitagw15856.github.io/pm-claude-skills/atlas.html)) — a navigable map of the public agent-skill ecosystem: 466 library skills in amber among 147 external skills from 144 repos, laid out by honest **lexical** similarity (TF-IDF + force layout, labeled as such), built by [build-atlas.mjs](scripts/build-atlas.mjs) with the census machinery.
- **📻 The Morning Show** ([morningshow.html](https://mohitagw15856.github.io/pm-claude-skills/morningshow.html)) — your professional life as a two-host podcast: scripted entirely from local stores (predictions due, calibration, Gym record, Panel results, streaks, Charter status) with real banter, performed by two distinct browser voices. Zero API, zero upload.
- **👥 Multiplayer Boardroom** — "Go live" streams your session to a watcher **browser-to-browser** (WebRTC; only 5-minute-TTL SDP handshake blobs touch the worker's new `/signal` endpoint — documented in SECURITY.md); the watcher can tag in with suggestions that surface to the presenter. E2E-tested with two real headless peers.
- **🧠 pm-skills-7b pipeline** ([training/](training/)) — the press-go kit for distilling the library into an open model: a 616-pair SFT dataset (routing + structural discipline) generated free from all 466 skills, Axolotl LoRA config, Modal/Colab runbooks, and an honest model card ("learns judgment shape, not depth"). GPU run awaits budget sign-off.
- **☀️ `pm-claude-skills brief` + `stats`** — the chief-of-staff on demand and the public vitals in the terminal; **FAQPage JSON-LD** on all 466 skill pages (4 real questions each, built from the skill's own description, inputs, and quality checks).

## [46.0.0] — the arsenal release: pm-warroom, skills with faces, and the repo that proves itself — 2026-07-10

### Added — identity & growth: every skill gets a face, every channel gets a listing
- **🎨 Generative skill pages** — all 466 skill pages now carry a **deterministic generative identity**: one of five banner art families (orbits, waves, circuit, rays, constellation) drawn from the skill's name-hash, bundle-family colours with per-skill shifts, and a monogram — plus new craft sections parsed from each skill's own body (trigger-phrase chips, "the bar it holds itself to" Quality Checks card, Anti-Patterns as warnings, Deeper Materials, executable-helper badge).
- **🃏 Playground cards wear the same identity** — the identity math ported verbatim (card hue === page hue, verified programmatically): colour strip, monogram watermark, and an ⓘ link to the skill's page on every card; card click still runs the skill.
- **💛 Sponsorship wired into every value moment** — the trial's cap messages, the CLI thank-you, and the README badge all carry "sponsors fund the free runs"; [docs/SPONSORSHIP.md](docs/SPONSORSHIP.md) sells **naming rights, never influence** (README → playground footer → sponsor-a-bench → Galaxy constellation).
- **🏪 Storefront kit + awesome-PR rescue** — 8 paste-ready directory listings in the [submission kit](docs/submission-kit.md) (PulseMCP, mcp.so, Glama via `glama.json`, Slack/Discord directories, Raycast Store, pre-commit registry); both stuck awesome-list PRs were diagnosed (a literal markdown typo on one), fixed, refreshed to current stats, and bumped.
- **🗺 [REPO-MAP.md](REPO-MAP.md)** — the monorepo, explained by role ("you want X → you need one folder"), with the 10-second skills-only sparse clone (~5 MB vs the 63 MB full clone).

### Added — the crazy-skills wave: the adversarial bundle, more skills that do math, and the ones people share (454 → 466)
- **⚔️ New bundle — `pm-warroom` (5 skills)** — the adversarial arsenal: [`premortem-assassin`](skills/premortem-assassin/SKILL.md) (twelve named failure vectors, the obituary, and dated tripwires), [`devils-twin`](skills/devils-twin/SKILL.md) (the opposition's best memo — argued from their premises, with a battle map of which of your claims fall), [`metric-gaslighting-detector`](skills/metric-gaslighting-detector/SKILL.md) (the eleven distortions through which true numbers create false beliefs), [`decision-autopsy`](skills/decision-autopsy/SKILL.md) (grade the process, not the outcome — with luck accounting), [`assumption-bounty`](skills/assumption-bounty/SKILL.md) (every hidden belief extracted and priced by cost-if-wrong ÷ cost-to-test).
- **🧮 Computed wave 2 (3 skills, tested scripts)** — [`support-staffing-model`](skills/support-staffing-model/SKILL.md) (real **Erlang C**: agents, occupancy, shrinkage — not tickets-per-agent folklore), [`schedule-monte-carlo`](skills/schedule-monte-carlo/SKILL.md) (three-point estimates over the dependency DAG → P10/P50/P90 + per-task criticality; shows the sum-of-likelies lie explicitly), [`tornado-sensitivity`](skills/tornado-sensitivity/SKILL.md) (one-at-a-time driver swings, ranked — with an injection-tested restricted formula evaluator). All three in the CI harness with exact-output regression cases (76 assertions total).
- **🎭 The shareable singles (4)** — [`eulogy-writer`](skills/eulogy-writer/SKILL.md) (the hardest writing anyone does, handled with actual care: gentle elicitation, nothing invented, a delivery copy formatted for shaking hands), [`wedding-speech`](skills/wedding-speech/SKILL.md) (one story, the pivot, under four minutes — plus the cut list), [`fine-appeal-letter`](skills/fine-appeal-letter/SKILL.md) (the four grounds that actually win + the honesty gate that says "just pay it" when true), [`skill-fusion`](skills/skill-fusion/SKILL.md) (the meta-skill: fuse two library skills into one hybrid with precedence rules — no more stapled documents).
- All 12 ship at SkillSpec L3 with eval cases (141 → 153); `pm-calculators` → 1.2.0; the Anti-Pattern Almanac grows to 2,297 rules.

### Added — the proof wave: 454/454 L3, tested scripts, gated quality
- **🎯 454/454 SkillSpec L3** — the last four skills (brief-builder, regex-builder, sql-query-explainer, employee-engagement-survey) gained their missing structure sections; the whole library now self-verifies, and CI **gates every PR on `skillspec --min-level 3`** — the claim is enforced, not aspirational.
- **🧪 Executable-skills harness** ([tests/scripts-smoke.mjs](tests/scripts-smoke.mjs)) — all 29 Python helpers exercised on every relevant change: `--help` health across the board, 9 functional cases with real fixtures (Office roundtrips, a deterministic Monte Carlo exact-output match, and a regression guard for the Van Westendorp plateau bug), and a no-hangs-on-garbage tier. 67 assertions, zero API cost.
- **📚 Depth wave 3** — crafted references/templates for 9 high-traffic Stable skills: gated fill-in templates for `one-pager` and `cover-letter`; calibration references for `cold-email` (reply-rate line-by-line), `job-application` (the six-second scan), `interview-prep` (the story matrix), `win-loss-analysis` (buyer interview craft), `pricing-strategy` (the model-selection regrets table), `board-deck-narrative` (what boards actually read), and `performance-review` (evidence, not adjectives).
- **🚦 Lighthouse CI** ([lighthouse.yml](.github/workflows/lighthouse.yml)) — weekly performance + accessibility budgets on the key pages, accessibility ≥0.9 as the hard gate (first run: green).
- **🪝 Dogfooding** — [.pre-commit-config.yaml](.pre-commit-config.yaml) runs the repo's own published skillspec hook locally; the standard applies to us first.

### Added — the self-operating wave: PWA, public vitals, and the repo that maintains itself
- **📱 The playground is a PWA** — install it to a phone/desktop; the no-API core (the Handbook, Academy, Campaign, Wrapped, Reckoning, Charter, daily challenge) works **offline** via a conservative service worker (same-origin only; provider APIs and the trial endpoint are never cached).
- **📈 Public vitals** ([status.html](https://mohitagw15856.github.io/pm-claude-skills/status.html)) — the project's numbers in the open: free runs served and stars charted over time from the public `vitals-data` branch, the latest SkillBench results, and exactly what sponsorship funds.
- **🤖 The self-operating repo** ([repo-vitals.yml](.github/workflows/repo-vitals.yml)) — a daily snapshot appends runs-served + stars to the open ledger; every Monday the **State of Agent Skills census regenerates** and the **community registry is live re-scanned** (dead or pin-mismatched entries automatically file a `registry-health` issue — the trust chain is now actively enforced).
- **🎬 Demo GIFs** — the Tower collapse, the Galaxy warp, the Stage verdict, and the holo-card tilt, captured from the real pages ([docs-assets](web/docs-assets/)); the first two now open the README's 3D section.
- **🏷 Repo metadata** — 18 GitHub topics set, [SECURITY.md](SECURITY.md) refreshed to cover the hosted pieces and the chain of trust (validator bypasses are explicitly in scope), and a social-preview image generated.

## [45.0.0] — the spectacle release: duels, the Charter, and the library in 3D — 2026-07-07

### Added — the spectacle wave: duels, the Charter, and the library in 3D
- **⚔️ Duels — challenge links** ([web/duel.js](web/duel.js)) — after any Gym or Panel run, one click copies a link that puts a friend in the EXACT same scenario: the Gym's hidden world or the Panel's candidate + archetype travels gzip-compressed in the URL, and the challenger finishes to a **side-by-side scorecard** ("Beat my 33/40"). No server; honour-based and says so.
- **🎓 The Charter** ([charter.html](https://mohitagw15856.github.io/pm-claude-skills/charter.html)) — the certification you can't talk your way into: four requirements read from your actual practice record (graduate all 3 Academy tracks · Gym 28+/40 · Panel 70+ with the RIGHT call · 5 settled predictions) grant a charter with a **cryptographic attestation** anyone can check on verify.html — tamper-tested: a forged name fails the hash. Certificate PDF + LinkedIn-ready post included.
- **🌌 Galaxy 3D** ([galaxy3d.html](https://mohitagw15856.github.io/pm-claude-skills/galaxy3d.html)) — the flagship visual goes volumetric: 454 skills as bloom-lit stars on spiral-arm constellations, fly-to search, a hyperspace warp with FOV punch — and **your sky is yours**: stars you've run burn brighter.
- **🏗 The Tower of Claims** ([tower.html](https://mohitagw15856.github.io/pm-claude-skills/tower.html)) — a document as a physics tower: sentences are blocks, evidence is material (steel/stone/wood/cardboard/**glass**), and the stress test shatters fragile blocks under load with camera shake — "💥 IT FALLS — the conclusion was resting on glass." Keyless demo included; grade your real document live.
- **🏛 The Stage** ([stage.html](https://mohitagw15856.github.io/pm-claude-skills/stage.html)) — any Boardroom replay link as cinema: moody table, glowing emoji-faced executives, camera cuts to the speaker, the document as a floating hologram that **cracks as objections land**, and a verdict finale that seals it gold or shatters it.
- **✨ Holo cards + 🏆 the Trophy Forge** — Wrapped's persona becomes a tilt-tracking holographic trading card (foil follows your cursor/phone); [trophy.html](https://mohitagw15856.github.io/pm-claude-skills/trophy.html) casts any achievement as a spinning engraved gold obelisk (Charter-aware), PNG export.
- **🌃 Skill City + ☄️ the orrery** — [city.html](https://mohitagw15856.github.io/pm-claude-skills/city.html): 454 buildings in 65 districts at dusk, windows lit only in skills you've used, a beacon on your most-used; the Reckoning gains an animated orrery — open predictions orbit inward toward their due dates, hits join a constellation, misses streak out.
- **📊 Runs served, in public** — `/try/stats` on the worker + a live README badge counting every sponsored free run (counts only, never content).
- **🏁 First official results, on the record**: [SkillBench run #1](skillbench/results.json) (Claude Haiku 4.5 vs Sonnet 4.6 across the 12 frozen tasks — 4.5 vs 4.6 mean, per-task detail in the results) and **evolution loop run #1**: all three challenged champions held under blind judging (5.00 draws — the referee requires a clear win). The benchmark and the loop are no longer claims.
- **🪑 First registry packs** ([packs/](packs/)) — ⚖️ the Legal Bench, 🎓 the Education Bench, 🤝 the Acquisition Call scenario — all sha256-pinned in the [community registry](community/registry.json).

### Fixed
- The CI smoke suite now blocks the production worker (the live free trial was hijacking keyless-guard tests and burning sponsored runs); a Tower lighting bug; smoke suite covers 32 pages.

## [44.0.0] — the legendary release: the campaign, the handbook, the package manager, and infrastructure for the whole ecosystem — 2026-07-07

### Added — the infrastructure wave: the tools, the badge, the census, and every protocol
- **🧰 `pm-skills-tools`** ([tools-pkg/](tools-pkg/)) — the library compiled for **agent builders**: all 454 skills as OpenAI function schemas, Vercel AI SDK tools, and a framework-agnostic runtime with `pick()`/`search()` (never ship 454 into one context). Executing a tool returns the skill's instructions for *your* model to run — no second vendor, no extra key. Generated by [build-tools-exports.mjs](scripts/build-tools-exports.mjs); dispatch-published to npm.
- **🛡 The SkillSpec badge service** — `GET /badge?repo=owner/repo` on the hosted worker live-grades any public repo's skills and returns a shields.io endpoint badge (minimum level across the repo, 6h cache). Any skill author can now wear `![SkillSpec L3]` — the standard spreads one README at a time.
- **🌍 The State of Agent Skills** ([first census](docs/reports/state-of-agent-skills-2026-07-06.md), [generator](scripts/skill-census.mjs)) — a real census of the public SKILL.md ecosystem via GitHub code search: millions of files on the raw surface, ~310k with "Use when" discipline, and a graded 118-repo sample showing conformance is a pyramid (96% stop at L1). Methodology and honesty notes baked in; free to regenerate quarterly.
- **🗣 Every protocol, one library** ([connectors table](connectors/mcp-pairings.md)) — MCP (with sampling) · **A2A** (agent card + `message/send`, already live on the worker) · **AGENTS.md** (`init` now generates one wiring the brain, skills, and arena artifacts for Codex/Jules-style agents) · function calling (`pm-skills-tools`) · REST.
- **🧑‍🎓 The Apprentice** ([templates/apprentice/](templates/apprentice/)) — a ready-to-run Claude Agent SDK agent that starts every task grounded in your `brain/`, reads the matching SKILL.md before drafting, treats Quality Checks as its acceptance tests, and files artifacts + predictions back into the workspace. ~80 lines, meant to be forked.
- **⚖️ The Council** (`pm-claude-skills council <skill>`) — cross-provider adversarial review: one vendor's model authors, a *different* vendor's critiques against the skill's own Quality Checks/Anti-Patterns, a third arbitrates ([multi-provider lib](bin/lib/providers.mjs): Anthropic/OpenAI/Gemini, fetch-only). 3 calls, your keys, `--dry-run` free.
- **☀️ The Chief of Staff hook** ([hooks/chief-of-staff.sh](hooks/chief-of-staff.sh)) — SessionStart brief assembled from local files only: predictions due for settling, the latest Firm minutes/Boardroom verdicts, open hypotheses. Zero API cost; silent when there's nothing to say.
- **📥 `pm-claude-skills migrate <dir>`** — the onramp for prompt graveyards: batch-converts a folder of prompts/templates/SOPs into SkillSpec skills (restructures, preserves the source's knowledge verbatim where possible), grades each, and flags what needs a human pass. One call per file, `--dry-run` free.
- **📡 Frontier flag: MCP Apps** — interactive UI over MCP, tracked in [mcp/README.md](mcp/README.md); `run_skill` outputs upgrade to live artifacts when the spec settles.

### Added — the legend wave: the campaign, the book, the ledger, and the chain of trust
- **🗺 Campaign mode — "Your First 90 Days"** ([campaign.html](https://mohitagw15856.github.io/pm-claude-skills/campaign.html)) — the arenas, tied into one story. You're the first Head of Product at Relay, a Series A freight-analytics startup; eight chapters over ninety fictional days route you through the Academy, the playground, the Gym, the Boardroom, the Panel, the Reckoning and the daily challenge — and **your real scores write the plot**: score under 20/40 in the Gym and Meridian (18% of ARR) churns, and the loss echoes through the Week-4 roadmap review and the Day-90 board meeting; get fooled by the bluffer in the Panel and the bad hire is "between deliverables" by Week 10. Persistent save, replayable with different outcomes, certificate at the end.
- **📖 The Professional Work Handbook** ([handbook.html](https://mohitagw15856.github.io/pm-claude-skills/handbook.html) · [PDF](web/docs-assets/handbook.pdf)) — the library compiled as a book by [scripts/build-handbook.mjs](scripts/build-handbook.mjs): Part I, eleven chapters of craft (all 50 Production-Ready skills in full); Part II, **the Anti-Pattern Almanac — 2,237 rules of professional judgment** extracted from all 454 skills. Print-ready CSS, regenerated from the library with every release. No other project can generate this artifact, because no other project has the corpus.
- **⚖️ The Reckoning** ([reckoning.html](https://mohitagw15856.github.io/pm-claude-skills/reckoning.html) + `npx pm-claude-skills reckoning`) — the calibration ledger: record predictions **with a confidence and a due date**, get them resurfaced when due, settle hit/miss, and watch your **personal calibration curve** and **Brier score** build over months (0 = oracle, 0.25 = coin-flip guessing). The Firm's staff predictions ride along; the CLI works on the same `brain/predictions/` folder the web workspace bridge writes.
- **🔏 The chain of trust** — four verifiable layers, documented in [community/README.md](community/README.md): the security scan (existing) · **content pinning** (registry entries may declare `sha256`; CI verifies the fetched file matches forever — live-tested against the seeded skill) · **install lockfile + `pm-claude-skills verify`** (the installer records content hashes; `verify` detects any post-install drift or tampering before an agent runs it — exit 1 on drift) · npm **provenance** (already publishing, now part of the documented story).

### Changed
- The workspace bridge gained `PMWorkspace.list()` (directory listing); the smoke suite covers 26 pages; the L2 heuristic fix propagated to the universal installer; new pages in nav + sitemap.

### Added — the ecosystem wave: the package manager, the standard, and skills that do math (454 skills)
- **📦 `pm-claude-skills install <owner/repo>`** ([bin/install.mjs](bin/install.mjs)) — install skills from **any public GitHub repo**, not just this library: every file is security-scanned (the same patterns the registry bans), every skill SkillSpec-graded (L1→L3) on the way in; flagged skills are never installed, existing ones never overwritten without `--force`, curated-name shadowing warned. `--dry-run` audits without writing — the installer that audits before it installs.
- **🧪 MCP sampling: `run_skill` with zero API key** ([mcp/server.mjs](mcp/server.mjs)) — the MCP server's new `run_skill` tool executes any of the 454 skills via **MCP sampling**: the generation runs on the *client's* model (Claude Desktop/Code pays nothing extra, this server needs no key). Graceful fallback message on clients without sampling. Among the first MCP servers to use server→client sampling in the wild.
- **⛓ Skill chains** ([bin/chain.mjs](bin/chain.mjs)) — `pm-claude-skills chain <workflow>` runs a whole recipe headless: each skill's output feeds the next (`chain --list` shows all 11), artifacts land numbered in a folder, and `--deck` / `--doc` finish with a **real .pptx / .docx** via the stdlib document tools. Raw notes in, board-ready deck out, one command.
- **🏗 `pm-claude-skills init`** ([bin/init.mjs](bin/init.mjs)) — the 60-second professional workspace: scaffolds `brain/` (from the repo templates, with examples), `pm-context.md`, the arena folders the web workspace bridge writes into, and a CLAUDE.md section wiring it together. Idempotent — never overwrites, reports what it kept.
- **📏 `skillspec-check` — the standalone SkillSpec validator** ([skillspec/](skillspec/)) — the eslint for SKILL.md, publishable to npm as its own zero-dependency package: conformance levels L1 Loadable → L3 Trustworthy, the security scan, `--min-level` CI gates, `--json`, plus a [`.pre-commit-hooks.yaml`](.pre-commit-hooks.yaml) so any skills repo can adopt the standard in two lines. Self-test: 447/451 curated skills grade L3.
- **🏛 Boardroom doc review for CI** ([scripts/boardroom-review.mjs](scripts/boardroom-review.mjs) + [recipe](action/examples/doc-review-boardroom.yml)) — documents get code review: PRs touching docs are read by a CFO/CTO/CCO bench, objections quote the doc with severity tags, and the Chair posts a 🟢/🟡/🔴 verdict as a PR comment — optionally failing the check on 🔴 (`--fail-on red`, exit 3). One API call per PR, adopting repo brings its own key.
- **🧮 Computed skills — skills that do math (451 → 454)**: [`cohort-curve-model`](skills/cohort-curve-model/SKILL.md) (fits r(t)=a·t^-b by log-log least squares, R², LTV projection), [`runway-monte-carlo`](skills/runway-monte-carlo/SKILL.md) (5,000 simulated paths → P10/P50/P90 runway + death curve; deterministic with `--seed`), [`pricing-sensitivity-model`](skills/pricing-sensitivity-model/SKILL.md) (Van Westendorp crossings by interpolation, non-monotone responses dropped and counted). Each ships a **zero-dependency script that computes AND emits a real .xlsx with live formulas** — edit ARPU, LTV recalculates. All three L3, eval cases seeded, added to `pm-calculators` (v1.1.0).

### Changed
- CLI help covers the four new commands; the L2 output-section heuristic (skillspec + registry validator) now recognises Template/Structure/Format headings; MCP README documents `run_skill`.

## [43.0.0] — the local-first & learning wave: your folder, your story, the other side of the table — 2026-07-04

### Added — the local-first & learning wave: your folder, your story, the other side of the table
- **🗂 The local-first workspace** ([web/workspace.js](web/workspace.js)) — connect the Firm and the Boardroom to a **real folder on disk** (File System Access API, Chromium): Firm minutes land in `firm-minutes/`, staff memos in `firm-minutes/memos/`, predictions in `brain/predictions/` with frontmatter, Boardroom verdicts + transcripts in `boardroom/`. Point Claude Code at the same folder and the web arenas and the CLI become **one product** — `/firm` reads what the browser wrote. Connect-once persistence via IndexedDB; feature-detected everywhere else.
- **🔗 Shareable Boardroom replays** — every finished session gets a **replay link**: the whole debate (doc excerpt, every executive turn, the verdict) gzip-compressed into the URL fragment — *no server, nothing uploaded, the link IS the data*. Recipients watch it play back turn by turn with a typing animation. Sessions and custom setups up to ~28 KB compressed.
- **🪑 Custom benches & bench packs** — swap the Boardroom's whole panel: three built-in presets ([web/benches.json](web/benches.json) — 🦈 Fundraising: lead VC/operator angel/cold-read LP/DD-CFO · 🏥 Healthcare: CMO/compliance/health-economics/patient advocate · 🚀 Seed-stage), plus **build your own executive** (name, role, lens, bias — persisted locally, right-click to remove). The [community registry](community/) now accepts **packs** (`type: bench|scenario`) — publishing a great *character* is a 20-minute contribution; CI validates structure + security-scans the JSON.
- **🎤 The Panel** ([hiring.html](https://mohitagw15856.github.io/pm-claude-skills/hiring.html)) — the Gauntlet **flipped**: the AI is the candidate, YOU interview. Three hidden archetypes (genuinely strong / polished-but-evasive / confident bluffer — picked client-side so the model can't drift), you make a written hire/no-hire call before the reveal, and a hiring coach scores *your* questioning: evidence-pinning, follow-up discipline, the tells you caught or missed. Interviewing is the more valuable skill — nobody trains it.
- **🎓 The Academy** ([academy.html](https://mohitagw15856.github.io/pm-claude-skills/academy.html)) — three learning tracks built from the library's own **Anti-Patterns**: 🎯 Executive communication, 🔬 Discovery & evidence, ⚙️ Work discipline (the pm-method canon). 18 hand-authored spot-the-flaw drills — real snippets, one flaw, explanations that quote the exact skill rule — **no API key needed**; each track's final exam is a live arena (the Defense / the Panel / the Boardroom), with a certificate on graduation.
- **🎁 PM Skills Wrapped** ([wrapped.html](https://mohitagw15856.github.io/pm-claude-skills/wrapped.html)) — your practice as an animated story, computed entirely from this browser's local data: runs, Gym personal bests, imposters caught on the Panel, prediction calibration from the Firm's ledger, streaks, brain facts — capped with a persona title you earned (🕵️ The Bluffer's Nightmare, 🔮 The Calibrated One…) and a 1080×1350 **share card** rendered on a canvas. Graceful empty states; nothing leaves the machine.
- **🩺 `pm-skills doctor`** ([bin/doctor.mjs](bin/doctor.mjs)) — a read-only checkup of your whole setup: skills installed per agent **diffed against the current library** (finds stale + missing), Claude extras (subagents/commands/output-styles), whether the pm-skills hooks are wired, MCP registration, the project's brain/, node + key env — ending in a ranked **℞ prescription** of the top 3 fixes. No network, no writes.
- **🧬 The evolution loop** ([scripts/evolve-skills.mjs](scripts/evolve-skills.mjs) + [evolve-skills.yml](.github/workflows/evolve-skills.yml)) — the library improves itself, with a referee: challenger rewrites of the lowest eval-scoring skills targeted at their weak dimensions, **blind-judged** against the champions (labels hidden, scored in isolation); a challenger must win by a clear margin, and winners land on a **review branch** — the loop proposes, humans dispose. Manual dispatch only; `--dry-run` costs nothing.
- **📁 Teams, decided** ([docs/TEAMS-DECISION.md](docs/TEAMS-DECISION.md)) — the recorded decision that Teams is a *folder convention*, not a backend: why no accounts/server will be built, how the workspace bridge + a shared git repo + replay links + the registry already compose into team workflows, and the explicit criteria for revisiting.

### Changed
- The registry validator ([scripts/check-registry.mjs](scripts/check-registry.mjs)) validates packs (structural + live-fetch: 2-8 complete executives / required scenario fields + the security scan). The web smoke suite grew to 23 pages with interaction checks for the Panel, the Academy, and Wrapped.

### Added earlier this cycle — the gap-closing wave: process discipline, real document production & design craft (441 → 451 skills, 64 → 65 bundles)
- **🧭 New bundle — Method (`pm-method`), 8 skills** — process discipline for professional work, closing the category's biggest thematic gap: `interview-me` (elicit the real requirements one question at a time, play the brief back, THEN build), `brainstorming` (divergent-with-a-quota then convergent-with-named-criteria, rejects preserved), `writing-plans` / `executing-plans` (outcome-tested plans with per-step verification; execution that classifies every deviation instead of improvising), `verification-before-completion` (re-read the original ask, run what's runnable, one adversarial pass, honest residuals), `subagent-orchestration` (slice by ownership boundary, standalone briefs, integrate with suspicion), `incremental-implementation` (thin working slices, never mix refactor with behaviour change), `code-simplification` (remove speculative generality behaviour-preservingly, Chesterton's-fence checked).
- **📎 Document production, for real** — the `pm-documents` skills now ship **zero-dependency stdlib scripts** that produce actual Office files (zip+XML, no pip installs): `xlsx_tool.py` (JSON → workbook with live formulas; `{{placeholder}}` template filling), `docx_tool.py` (markdown-lite → Word; template filling that survives Word splitting placeholders across runs; text extraction for verification), `pptx_tool.py` (markdown outline → a themed 16:9 `.pptx`). All three verified end-to-end; limits stated honestly in each helper doc.
- **🎨 Design production** (in `pm-design`): `frontend-design` — UI that looks *decided*: token system first (type scale, spacing scale, color roles), one accent spent deliberately, and the states (hover/focus/empty/loading/error) designed rather than defaulted; `brand-guidelines` — extract an applicable brand kit from what a company actually ships (hex from real CSS, voice as mechanics, usage rules per color) and apply it wholesale to any artifact. Every new skill ships a curated eval case (10 added — fixtures only).

## [42.0.0] — every Production-Ready skill gets depth, the arenas get voices, and the web gets a safety net — 2026-07-02

### Added — the everything-else wave (protection, theatre, depth)
- **🧪 CI web smoke suite** ([tests/web-smoke.mjs](tests/web-smoke.mjs) + [web-tests.yml](.github/workflows/web-tests.yml)) — all 21 interactive pages load headlessly with zero console/page errors on every web PR and push, plus load-bearing interaction checks: keyless guards on every arena, command-bar routing, the artifact renderer, the attestation round-trip, Galaxy fly-to-search. The insurance layer that would have caught the Galaxy crashes before a human did.
- **🔊 Voice for the arenas** ([web/voice.js](web/voice.js)) — **Theatre mode**: each Boardroom executive (and the Defense examiners, the Gauntlet's interviewer and recruiter) speaks their turn aloud in a distinct browser voice — deterministic voice assignment with per-persona rate/pitch, markdown and severity tags cleaned for speech. **🎙 Dictation**: answer the Defense and both Gauntlet stages out loud via browser speech recognition. Zero API cost; feature-detected, buttons hide when unsupported.
- **🏢 Firm v2** — staff cards now carry a *real calibration report* (hit rate over resolved with a gradient bar, trust verdict once ≥5 resolved: 🟢 earned trust / 🟡 mixed / 🔴 verify their calls, current streak, pending count — the JS port of `outcome_calibration.py`'s logic), and every staff member's **duty skill is swappable** from all 441 catalog skills, persisted per browser.
- **🎬 Demo GIFs** — the Boardroom and The Firm recorded live from the real pages with mock SSE streaming ([record-arena-demos.mjs](web/docs-assets/record-arena-demos.mjs), no API needed), embedded in the README: the executive debate streaming in, the staff meeting landing in the inbox.
- **🧩 Two recipes for the new bundles** — `/ship-an-mcp-server` (spec → readiness audit → pricing → oversight) and `/adopt-ai-properly` (policy → roles → reviews → ROI audit); 11 recipes total.
- **📚 Depth wave 2 — the moat work: every Production-Ready skill now ships `references/` + `templates/`.** 44 skills gained 88 crafted support files: calibration references (capacity honesty for sprint planning, churn avoidability calls, retention-curve reading, cohort design, review-depth calibration, ADR context craft, 3am-runbook usability, injection-pattern library…) and fill-in templates with quality gates inline. Each SKILL.md points to its deeper materials. 0 of 50 Production-Ready skills lack depth, up from 6 of 50.

### Changed
- **Standing decisions recorded** ([OPERATIONS.md](OPERATIONS.md)): `exports/` stays committed (browsability is a feature) with a 150 MB revisit threshold; tier policy aligned with practice — new self-contained skills enter **Stable**, Experimental reserved for external-dependency skills (authoring standard §8 updated).
- **README** — a collapsible documentation map near the top (the README as trailer, details in focused docs) + the two demo GIFs.

## [41.0.0] — the modern skills wave (Agent-Native & AI-at-Work) + cosmic Galaxy, certificates & MCP pairings — 2026-07-02

### Added — the modern skills wave: 15 skills, 2 new domains (426 → 441 skills, 62 → 64 bundles)
- **🤖 New bundle — Agent-Native (`pm-agentnative`), 5 skills** — build for products whose users aren't all human: `mcp-server-spec` (task-shaped toolsets, not API mirrors; the never-exposed list; agent test plans), `agent-readiness-audit` (six surfaces scored from a cold-start agent's perspective), `agent-era-pricing` (migrate seat pricing before agents break it — value metrics, fences, cannibalisation math on real cohorts), `human-in-the-loop-design` (approval surfaces that don't decay into rubber stamps — action tiers, approval budgets, anti-rubber-stamp mechanics), `voice-agent-design` (barge-in, repair ladders, whisper-summary handoffs, gameability-paired metrics).
- **🧑‍💼 New bundle — AI at Work (`pm-aiwork`), 5 skills** — the questions every manager is asking this year: `ai-roi-audit` (measured against baselines with a method-tier hierarchy, hidden-cost ledger, per-tool keep/cut verdicts), `role-redesign-for-ai` (the task inventory with AI-created verification work counted, capacity allocated deliberately, the junior-ladder problem faced), `ai-usage-policy` (a one-page data-traffic-light policy people can actually apply, plus the decision log for counsel), `ai-assisted-performance-review` (what still measures the human: judgment, verification, outcomes, leverage — with scripts for the three hard cases), `ai-content-audit` (slop detection by information density, not AI-detector scores; keep/enrich/rewrite/delete triage; a publishing gate).
- **5 singles into existing bundles**: `ai-code-review` → pm-engineering (the seven AI-characteristic failure modes: plausible-but-wrong logic, hallucinated APIs, tests that test nothing…), `synthetic-user-research` → pm-research (the lane enforced: what AI personas can probe vs must never validate), `async-decision-memo` → pm-operations (the process wrapper: silent reads, comment protocol, silence-is-consent windows), `brand-impersonation-response` → pm-crisis (deepfakes, cloned support lines — verify-preserve-contain-communicate with proportionality rules), `feature-sunset-plan` → pm-planning (the launch in reverse: depth-based user segmentation, bounded exceptions, code actually deleted). Every new skill ships a curated eval case (15 added — fixtures only; scoring runs only when the leaderboard workflow is dispatched).

### Added — the fun & connected wave
- **🌠 Galaxy cosmic events** — ambient shooting stars streak across the sky (reduced-motion aware, never during the tour), and a new **🎲 Warp** button: a hyperspace-streak jump to a random top-rated skill you haven't visited — serendipity as a feature.
- **🎓 Certificates** — the arena pages (Gauntlet, Defense, Gym) now export a *frameable*, print-typeset landscape certificate: serif headline, your score, the level, a dated seal, and honest fine print ("the score is only as honest as the run"). New `PMExport.certificate()` in the export engine.
- **🔌 MCP pairings** ([connectors/mcp-pairings.md](connectors/mcp-pairings.md)) — skills that *act* through the MCP servers you've already connected: `meeting-notes` gains a full `## Execution` block (file the approved notes in Notion, create tracker issues per action item, verify + link back), `/firm` offers to deliver approved minutes via Slack/Notion, and a pairing table maps eight workflows end-to-end — all under SkillSpec §5's approval-gated, verbatim-delivery, verify-and-link rules.

## [40.0.0] — The Firm: don't run tools, employ a staff — 2026-07-02

### Added
- **🏢 The Firm** ([web/firm.html](web/firm.html) + [`/firm`](commands/firm.md)) — the composition layer over everything the library has become: don't run tools, **employ a staff**. Charter a standing team once (pre-filled from your Skill Memory); each session, every hired staff member — 💰 CFO, ❤️ CCO, 🛠️ CTO, 🦈 Strategy, plus 📣 Growth and ⚖️ Counsel on the bench — files a **delta-aware memo** on their beat (what changed since last session, never a restatement; each runs a real library skill as its method), ending in a **falsifiable prediction** with a check-by date. Then the staff **hold a boardroom session without you** — genuine disagreement where beats conflict — and the minutes land in your inbox with decisions, asks, and **dissent preserved**. Score predictions as reality lands and each staff member accumulates a visible **calibration record** on their card: you can performance-review your AI staff. Everything persists in-browser. The `/firm` slash command runs the same loop natively in Claude Code, grounded in `FIRM.md`, the Brain, and your git log, saving minutes to `firm-minutes/` and predictions to `brain/predictions/`.

## [39.0.0] — three waves: SkillBench & the registry, the breathtaking six, and the revamped playground — 2026-07-02

### Added — the "make it famous" wave (7 features)
- **🏛 SkillBench** ([skillbench/](skillbench/)) — the professional-work benchmark: HumanEval exists for code, nothing measured whether a model can write a PRD, postmortem, or board update that survives contact. A **frozen 12-task set** across 6 domains, each run *bare* and *skilled* per model, judged two-pass on the library's fixed rubric — yielding a **SkillBench score** and a **skill lift** (how much structured judgment improves each model). Multi-provider runner (Claude/GPT/Gemini), a manual **Run SkillBench** workflow that commits results, and a quarterly **State of Professional AI** report template.
- **📦 Turnkey CI recipes** ([action/examples/](action/examples/)) — four copy-one-file workflows for the existing GitHub Action: PR opened → drafted description commented; release published → user-facing notes prepended; issue labelled `incident` → postmortem scaffold posted; docs PR → quality-bar verdicts commented. Plus the Marketplace publishing path documented.
- **🌐 The community registry** ([community/](community/)) — npm-for-skills: publish `yourhandle/skill-name` via one PR while the skill stays in your repo. CI validates every entry (SkillSpec conformance level, namespace-vs-repo-owner, typosquat guard against curated names, security-pattern scan of the fetched file) and re-scans weekly; the hosted worker serves entries at **`/v1/community`**, fetched live from authors' repos with `community: true` labelling.
- **🏆 The Interview Gauntlet** ([web/gauntlet.html](web/gauntlet.html)) — job posting → signed offer in one arc: **Decode** (what the posting actually wants, the loop to expect, your angle), **Forge** (raw experiences → metric-led stories mapped to the decoded requirements, with coverage gaps), **Survive** (the hiring manager cross-examines you, 5 questions building on your answers, 3 difficulty levels), **Negotiate** (a recruiter with a hidden approval band and levers), then a **readiness score /100** with the three preparations that would most move it.
- **🪝 Ambient hooks** ([hooks/](hooks/)) — three new Claude Code hooks: `doc-quality-gate.sh` (model writes a PRD/OKR/postmortem/status doc → the matching skill's quality bar is injected as a self-review, so drafts fix themselves), `commit-changelog-nudge.sh` (git commit in a changelog-keeping repo → the Keep-a-Changelog line is proposed), `session-brief.sh` (session end → one ledger line, so `pm-weekly-review` has real material).
- **🤗 Hugging Face publishing** ([publish-dataset.yml](.github/workflows/publish-dataset.yml)) — the training dataset rebuilds and pushes to the Hub on every release (HF_TOKEN-gated, fails soft), with a proper dataset card ([dataset/CARD.md](dataset/CARD.md)).
- **🌍 Localization pipeline** ([i18n/](i18n/) + [translate-skills.mjs](scripts/translate-skills.mjs)) — translate skills into 8 languages with hard structural guarantees (routing `name` never translated, section/code-block counts must match source, professional loan-words kept), honest `machine-translated · review: pending` frontmatter, a `--check` validator run by CI on i18n PRs, and a manual translation workflow.

### Changed — playground revamp & Galaxy 2.0
- **🪄 Command bar** — the playground gains a task-first front door: describe what you need in plain words ("a postmortem for Friday's outage") and an instant, local, IDF-weighted matcher surfaces the top 3 skills as cards — Enter opens the best one. No API call, no key needed; cycling example placeholders teach the pattern.
- **✨ Visual polish layer** — a soft aurora backdrop behind the dark theme, a gradient-ring command bar, staggered card entrance animations (first two rows only), and richer hover states — all with `prefers-reduced-motion` fallbacks, in the shared stylesheet so every tool page benefits.
- **🌌 Galaxy 2.0 — the map now *does* things**: **▶ Sky tour** (an auto-piloted camera flight across the six brightest professions, captioned, ending by tracing a Journey constellation with marching-ants animation), **click → docked skill panel** (description, eval score, ▶ Run, and hop-to-connected-stars — exploration without leaving the map), **search that flies** (Enter animates the camera to the match and opens its panel), and **🧭 For you** (pulsing rings on high-scoring skills near the ones you've already run). The graph engine gained a reusable `flyTo` camera (`forcegraph.js`). Labels were also reworked: constant screen size under zoom (they used to scale up into word soup), per-frame collision culling in dense clusters, and fully suppressed during the tour so the flight stays cinematic.

### Added — the "breathtaking" wave (6 features)
- **🎛 Living artifacts** ([web/artifacts.js](web/artifacts.js)) — skill outputs you can *grab*: skills with a registered renderer emit a typed `artifact` JSON block alongside the prose, and the playground turns it into an interactive component. Ships four renderers: a **live RICE board** (drag confidence/effort sliders, watch the ranking re-sort), a **roadmap timeline** (period lanes, click-to-expand items), a **journey map** (animated emotion curve + stage cards), and an **animated scorecard**. Wired for `rice-prioritisation`, `rice-impact-matrix`, `feature-prioritisation`, `roadmap-narrative`, `customer-journey-map`, `cs-health-scorecard`, `product-health-analysis`, `team-health-check`, and more.
- **🩻 Document X-ray** ([web/xray.html](web/xray.html)) — paste any document and see its evidence skeleton: every sentence heat-mapped as data / sourced / bare assertion / unsupported superlative / hidden assumption, with a scanning animation, an evidence score, the load-bearing sentences outlined, and a "fix these first" list.
- **🥊 The Gym** ([web/gym.html](web/gym.html)) — a scenario engine with *hidden state*: negotiate a salary, renewal, vendor deal, or exec pushback against a counterparty with a secret BATNA, hidden pressures, and behavioural tells. Close or walk — only the debrief reveals what was achievable, scoring you against the theoretical optimum with three drills for next time. Session scores persist locally so improvement is visible.
- **📷 New bundle — Vision ([`pm-vision`](plugins/pm-vision)), 4 skills (3 new)** — point a camera at the work: [`whiteboard-to-spec`](skills/whiteboard-to-spec/SKILL.md) (workshop photos → structured spec, with an ambiguity ledger instead of guesses), [`screenshot-teardown`](skills/screenshot-teardown/SKILL.md) (competitor UI screenshots → evidence-anchored teardown, observed vs inference), [`deck-autopsy`](skills/deck-autopsy/SKILL.md) (slide photos → reconstructed argument chain, cross-slide number checks, and the questions the deck avoids); wires in `chart-data-extractor`. The playground now supports **image attachments** for vision skills across Claude, Gemini, and OpenAI providers.
- **✍️ [`style-fingerprint`](skills/style-fingerprint/SKILL.md)** (in `pm-essentials`) — studies 3-5 documents the user actually shipped and distils a mechanical style card (rhythm, register, signature moves, the banned list) into `brain/knowledge/style.md`, with before/after proof — so every brain-aware skill writes in *their* voice, not the model's.
- **🔒 [`evidence-lock`](skills/evidence-lock/SKILL.md)** (in `pm-research`) — no-unsourced-sentences mode: every substantive claim footnotes the exact passage in the user's provided sources (quoted verbatim in a source map), inferences are labelled, conflicts surface instead of averaging, and an unsupported-claims register + coverage score make the gaps visible. **426 skills across 62 bundles.**

## [38.0.0] — The library becomes infrastructure: SkillSpec, execution blocks, A2A, attestations, The Defense, outcome tracking, ambient lint & the dataset — 2026-07-02

### Added — the "library as infrastructure" wave (8 frontier features)
- **SkillSpec v1.0** ([SKILLSPEC.md](SKILLSPEC.md) + [spec/skill.schema.json](spec/skill.schema.json)) — a formal, normative specification for `SKILL.md`: frontmatter contract, body-section rules, conformance levels **L1 Loadable → L4 Verified**, SemVer + content-hash pinning, safety requirements, registry interoperability. SkillCheck is the reference validator; the authoring standard remains the style guide.
- **Execution blocks for computer-use agents** — skills MAY now carry an `## Execution` section (Preconditions / closed-allow-list Actions / Verification / Rollback) so tool-using agents can *perform* a skill, bounded and approval-gated, instead of only drafting. Spec in SKILLSPEC §5; worked examples in `sprint-planning` (build the approved sprint in the tracker) and `stakeholder-update` (send the approved update, verbatim, to the approved channel).
- **Agent-to-agent (A2A) discovery on the hosted Worker** — `GET /.well-known/agent-card.json` (who this agent is, what it offers) and `POST /a2a` (JSON-RPC `message/send`: send a task description, receive the best-matching skill's full instructions + runner-up). Read-only, no auth, no server-side LLM. Other agents can now *hire the library*.
- **`outcome-tracker` skill** (in `pm-autopilot`) + `predictions/` Brain folder — closes the loop nobody closes: record every decision's falsifiable predictions (metric, band, confidence, check-by date, framework), score them against reality on a schedule, and compute per-framework / per-confidence-band calibration with a stdlib calculator (`outcome_calibration.py`). Frameworks earn trust from outcomes, not vibes.
- **🛡️ The Defense** ([web/defend.html](web/defend.html)) — the Boardroom reviews the *document*; this reviews **you**. Up to three executives cross-examine you live, one question at a time; a neutral Chair scores the defense (facts, evidence, honesty about unknowns, composure), issues PASS / PASS WITH REVISIONS / NOT READY, and names the three questions to prepare better. Honest "I don't know" scores above bluffing.
- **🔏 Boardroom attestations + verify page** — every verdict now exports a tamper-evident integrity record (SHA-256 of the exact reviewed text + bench, grill, model, verdict). [web/verify.html](web/verify.html) re-computes the hash locally — one changed character fails the match. Scope stated honestly: integrity, not signature.
- **Extension v1.1 — ambient lint** — the browser extension gains a Lint tab: select text you wrote anywhere, and it's judged against a chosen (or auto-detected) skill's Quality Checks + Anti-Patterns with your own key — pass/fail chips with specific notes, copy-as-markdown. Grammarly for professional judgment.
- **Training dataset pipeline** ([scripts/build-dataset.mjs](scripts/build-dataset.mjs) → [dataset/](dataset/)) — deterministically distills the library into training data: ~1,500 skill-routing chat pairs, 108 eval-case SFT seeds, 22 graded sample triplets, plus the two-stage teacher-distillation recipe. Step one toward `pm-skills-3b`. **421 skills across 61 bundles.**

## [37.0.0] — The Boardroom, AgentOps & Autopilot bundles, the skill router & per-skill depth — 2026-07-01

### Added
- **🏛️ The Boardroom** ([`web/boardroom.html`](web/boardroom.html)) — the library's first *adversarial* tool: every other page helps you write the document; this one tells you if it survives a leadership team. Paste a PRD/plan/pitch and a bench of five AI executives (CFO, CTO, Chief Customer Officer, General Counsel, a sceptical VC — seat or excuse each) debates it live in structured rounds: severity-tagged opening statements (`BLOCKER`/`RISK`/`QUESTION`), cross-examination where they argue with each other and concede points, then a neutral Chair's verdict memo — approve/conditions/rework/reject, risks ranked with owners, and the 3–5 changes that would survive the room. Three grill levels (constructive → brutal), downloadable decision memo + transcript, runs fully client-side on any playground provider (Claude, Gemini free key, OpenAI, Ollama, in-browser WebLLM).
- **New bundle — AgentOps (`pm-agentops`), 8 skills (5 new)** — for teams *operating* AI agents and LLM features in production, complementing `pm-ai`'s design-time skills: `prompt-regression-suite` (golden sets, CI gates, failure triage), `model-migration-plan` (eval → shadow → canary phases with rollback triggers), `context-engineering-review` (audit the assembled context window: bloat, conflicts, caching, token budgets), `agent-incident-postmortem` (blameless postmortems for behavioural AI failures, root-cause layers, nondeterminism discipline), `agent-observability-spec` (trace schema, drift-based quality alerts, sampling/retention/privacy). Wires in `ai-eval-plan`, `llm-cost-latency-budget`, and `agent-design-review` from `pm-ai`. Each new skill ships a curated eval case.
- **New bundle — Autopilot (`pm-autopilot`), 6 skills (3 new)** — put recurring rituals on a schedule: `autopilot-charter` (decide what to automate — automate/assist/keep-manual calls with guardrails and kill criteria), `schedule-recipe` (turn "every Friday 4pm" into copy-paste setup for Claude Code routines, `/loop`, GitHub Actions cron, n8n, or crontab — with failure alerting), `delta-briefing` (make recurring briefs report what *changed* since the last edition, with a state record the next run diffs against). Wires in `morning-intelligence`, `competitive-intelligence-monitor`, and `pm-weekly-review`. Each new skill ships a curated eval case.
- **`which-skill` router** (in `pm-essentials`) — describe a task in your own words and get routed to the best-fit skill: routing method, a disambiguation table for the library's look-alike clusters (competitive ×4, changelog ×2, GTM ×2, research synthesis ×2, prioritisation ×3, exec comms ×3, A/B testing ×2), inputs to gather, runner-up with tie-breaker, and workflow-recipe escalation for multi-skill jobs.
- **Per-skill depth: `references/` + `templates/` for 6 Production-Ready skills** — the first wave of the roadmap's depth push: `prd-template` (success-metrics guide + PRD skeleton), `rice-prioritisation` (estimate calibration + evidence-column scoring worksheet), `okr-builder` (bad-OKR gallery with rewrites + OKR worksheet), `competitor-teardown` (intel sourcing guide with confidence labels + teardown skeleton), `incident-postmortem` (root-cause digging / blameless-language guide + review-meeting agenda), `stakeholder-update` (status-honesty "watermelon" guide + one-page update skeleton). Each SKILL.md now points at its deeper materials.

### Changed
- **Cross-references in 10 overlapping skill descriptions** — the competitive, changelog, GTM, and research-synthesis clusters now say when to use the sibling skill instead, so models (and humans) pick the right one first time.

### Fixed
- Removed `plugins/pm-advaned/` — an empty leftover typo twin of `pm-advanced/`.

## [35.0.0] — 400 skills, new reach (Custom GPT · Gemini Gem · Raycast · Alfred) & Product Marketing — 2026-07-01

### Added
- **New bundle — Product Marketing (`pm-pmm`), 8 skills (392 → 400 skills, 56 → 57 bundles)** — `win-loss-analysis`, `sales-enablement-kit`, `pricing-page-copy`, `analyst-relations-brief`, `customer-advisory-board`, `voice-of-customer-program`, `launch-tiering-framework`, `sales-demo-script`. Each ships a curated eval case and bakes in guardrails (never fabricating win/loss quotes, pricing, logos, or analyst metrics; mark unknowns `[to confirm]`).
- **Custom GPT packaging** ([`integrations/custom-gpt/`](integrations/custom-gpt/)) — publish the whole library as a GPT in the GPT Store: an OpenAPI **Actions** schema over the hosted read-only REST API (`searchSkills` / `getSkill` / `listWorkflows` …), the GPT system prompt, and a 10-minute setup guide. The GPT reads skills **live**, so it never goes stale.
- **Gemini Gem packaging** ([`integrations/gemini-gem/`](integrations/gemini-gem/)) — package the library as a Gem using `llms.txt` / `llms-full.txt` as Knowledge, with a copy-paste setup.
- **Raycast extension** ([`integrations/raycast/`](integrations/raycast/)) — search every skill from your launcher, then open, run, or install it; reads the live catalog.
- **Alfred workflow** ([`integrations/alfred/`](integrations/alfred/)) — keyword `pm` to search skills, with open/copy actions and a one-command `.alfredworkflow` build.
- **CLI `search` command** — `npx pm-claude-skills search [query] [--json] [--limit]`. Name-weighted ranking over the whole library; `--json` powers the launcher integrations and any script.
- **Bring-your-data in the playground** — paste a public GitHub issue/PR URL to pull its title + body straight into your context (fetched in-browser), alongside the existing file upload.
- **Board Minutes skill** (`board-minutes`, in `pm-business`) — formal minutes with attendees, quorum, conflicts of interest, resolutions, and an action register, with governance-review safeguards. Contributed by [@roian6](https://github.com/roian6).
- **2 new vertical bundles, 12 skills (354 → 366 skills, 51 → 53 bundles)** — each ships a curated eval case:
  - **🧪 QA & Testing** (new `pm-qa`): `test-case-writer`, `bug-report`, `exploratory-test-charter`, `regression-test-plan`, `qa-release-signoff`, `api-test-plan`.
  - **🏠 Real Estate** (new `pm-realestate`): `property-listing`, `comparative-market-analysis`, `property-offer-letter`, `property-investment-analysis`, `open-house-plan`, `tenant-screening-guide` — listing/offer/tenant skills bake in Fair-Housing safeguards; CMA/investment skills flag "not an appraisal/financial advice" and never invent comps/figures.
- **`npm run new-bundle` scaffolder** ([`scripts/new-bundle.mjs`](scripts/new-bundle.mjs)) — scaffold or wire a whole bundle in one command: creates the `plugin.json`, copies each skill into the plugin (wiring existing `skills/<name>/` or scaffolding a SkillCheck-passing stub), and inserts a `marketplace.json` entry (textually, preserving formatting; idempotent).

### Changed
- **CONTRIBUTING fast path** — documented the `npm run new-skill` / `new-bundle` scaffolders so a first contribution is ~10 minutes, not an afternoon.
- **PRs no longer eval-score skills.** The Skill PR Check now only validates **structure** (`skillcheck`) — opening a PR never spends tokens. Eval scoring is run deliberately after merge via the manual [**Evaluate selected bundles**](.github/workflows/eval-bundles.yml) Action. (The score-drop regression gate on PRs was removed.)

## [32.0.0] — 4 new bundles: E-commerce, UX Writing, Recruiting & Accounting — 2026-06-30

### Added
- **24 new skills across 4 new bundles (330 → 354 skills, 47 → 51 bundles)** — filling verified domain gaps; each ships a curated eval case:
  - **🛒 E-commerce & Retail** (new `pm-ecommerce`): `product-description`, `marketplace-listing-optimizer`, `return-refund-policy`, `promotion-plan`, `review-response`, `category-page-brief`. Listings that rank and convert, promos with the margin math, returns flagged for consumer-law review.
  - **✍️ UX Writing & Content Design** (new `pm-uxwriting`): `microcopy-writer`, `error-message-writer`, `empty-state-writer`, `product-naming`, `content-style-guide`, `onboarding-copy`.
  - **🧑‍💼 Recruiting & Sourcing** (new `pm-recruiting`): `boolean-search-builder`, `recruiter-outreach`, `interview-question-bank`, `candidate-scorecard`, `offer-letter`, `sourcing-strategy` — with non-discriminatory, job-related guardrails; offers flagged for HR/legal.
  - **🧾 Accounting & Bookkeeping** (new `pm-accounting`): `invoice-generator`, `expense-policy`, `collections-email`, `financial-statement-explainer`, `bookkeeping-categorization`, `cash-flow-forecast` — drafting aids that flag they're not tax/accounting advice and never invent figures.
- **Community Skills directory** ([`COMMUNITY-SKILLS.md`](COMMUNITY-SKILLS.md)) — a fenced, community-maintained list of external skill repos/packs that follow the `SKILL.md` standard, with an explicit trust boundary (community-contributed; **not** eval-scored or security-audited) so it stays clearly separate from the curated library. **PR-only** to get listed, and a merged PR earns a **"Featured in PM Skills Community" badge** authors can display in their own repo (links back to the directory — the awesome-list flywheel). A format validator ([`scripts/check-community-skills.mjs`](scripts/check-community-skills.mjs)) + CI keeps submissions well-formed. Linked from the README and CONTRIBUTING.
- **Kilo Code export/install target** (#40) — `exports/kilocode/` (rules for `.kilocode/rules/`) wired end-to-end: a `PLATFORMS` entry in `build-exports.mjs`, an install-path mapping in `install.sh`, and a CLI branch in `bin/cli.mjs` (`npx pm-claude-skills add --agent kilocode`). 11 export platforms total.
- **Export-target contributor checklist** ([`CONTRIBUTING.md`](CONTRIBUTING.md)) — a 4-point contract (registry entry · install-path mapping · CLI branch · `build-exports --check` proof) so "support another tool" always means a working install path, not just a README entry. Kilo Code is the worked example.

## [30.0.0] — 25 new skills, 4 new bundles & eval coverage — 2026-06-29

### Added
- **25 new skills across 4 new bundles (288 → 313 skills, 41 → 45 bundles)** — each ships a curated eval case:
  - **AI-builder pack** (`pm-ai`, 7 → 13): `prompt-optimizer`, `eval-rubric-designer`, `rag-architecture-review`, `llm-guardrails-spec`, `agent-design-review`, `model-selection-advisor`.
  - **Crisis & sensitive comms** (new `pm-crisis`): `pr-crisis-response`, `incident-public-statement`, `customer-outage-notice`, `layoff-communication`, `apology-letter`.
  - **Healthcare documentation** (new `pm-health`): `soap-note`, `discharge-summary`, `prior-authorization-letter`, `clinical-trial-protocol` — drafting aids that flag clinician/expert review and never invent clinical data.
  - **Life-admin letters** (new `pm-lifeadmin`): `complaint-letter`, `dispute-letter`, `reference-letter`, `rental-application`, `insurance-claim`.
  - **Nonprofit** (new `pm-nonprofit`): `impact-report`, `case-for-support`, `donor-update`; plus **procurement** in `pm-operations`: `rfp-writer`, `vendor-contract-checklist`.
- **Eval-coverage page** ([`web/coverage.html`](scripts/build-coverage.mjs)) — a public view of eval coverage per bundle (✅ complete / 🟡 partial / ⬜ unevaluated) with a coverage bar and a CTA to the *Evaluate selected bundles* Action. Generated by `scripts/build-coverage.mjs`; added to the Explore nav and the deploy.
- **"Evaluate selected bundles" Action** ([`.github/workflows/eval-bundles.yml`](.github/workflows/eval-bundles.yml)) — pick which bundles to score and add to the leaderboard. A free `list` mode reports eval coverage per bundle (✅ complete / 🟡 partial / ⬜ unevaluated) in the job summary; `evaluate` mode scores the bundles you name (or every unevaluated one), keeps all existing scores, and opens a PR with the refreshed `evals/results.json`. Backed by a new [`scripts/eval-status.mjs`](scripts/eval-status.mjs) (CLI: `node scripts/eval-status.mjs`) and new `--bundles` / `--skills` / `--unevaluated` filters on the eval harness.

### Fixed
- **Header navigation on generated pages** — the Tools/Explore dropdowns broke on `catalog.html`, `leaderboard.html`, and `community.html` because those pages ship inline CSS and don't link `styles.css`, so the dropdown/CTA rules never loaded. [`web/nav.js`](web/nav.js) now injects its own styles, keeping it the single source of truth so the bar works on every page.
- **Guide skill count** — [`web/guide.html`](web/guide.html) now reads **313 skills across 23 professions** (was 244 / 21).
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

[Unreleased]: https://github.com/mohitagw15856/pm-claude-skills/compare/v50.0.0...HEAD
[50.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v49.0.0...v50.0.0
[49.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v48.0.0...v49.0.0
[48.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v47.0.0...v48.0.0
[46.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v45.0.0...v46.0.0
[45.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v44.0.0...v45.0.0
[44.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v43.0.0...v44.0.0
[43.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v42.0.0...v43.0.0
[20.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v19.0.0...v20.0.0
[19.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v18.0.0...v19.0.0
[18.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v17.0.0...v18.0.0
[17.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v16.0.0...v17.0.0
[16.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v15.0.0...v16.0.0
[15.0.0]: https://github.com/mohitagw15856/pm-claude-skills/compare/v14.0.0...v15.0.0
[14.0.0]: https://github.com/mohitagw15856/pm-claude-skills/releases
