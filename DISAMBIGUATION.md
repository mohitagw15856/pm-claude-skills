# 🧭 Disambiguation — you want *this* one, not that one

> **Generated — do not edit.** Run `node scripts/build-disambiguation.mjs`.
> 1157 live skills across 130 bundles, plus 12 retired names that still resolve.

At this size the hard part is not finding *a* skill — it is telling two similar ones apart, and
knowing whether the thing you are about to write already exists under a different noun.
This page answers both. It is assembled from decisions recorded elsewhere in the repo, so it
cannot drift from them.

**Writing a new skill?** Check here first, then run `node scripts/skill-dupes.mjs` — CI runs it
on every PR that touches `skills/`, and a new near-duplicate fails the build.

## Pairs that look alike and both stay

Each of these scored as a near-duplicate and was reviewed and kept. The reason is the rule for
choosing between them.

| These two get confused | | | How to choose |
|---|---|---|---|
| Acquirer Red Team / Red-Team My Plan | `acquirer-red-team` | `red-team-my-plan` | Modelling how an acquirer will attack your numbers in diligence vs general plan stress-testing. |
| Agent Incident Postmortem / Incident Postmortem | `agent-incident-postmortem` | `incident-postmortem` | Agent incidents have failure modes (runaway tool use, shipped hallucinations) that a general postmortem does not prompt for. |
| Agent Observability Spec / Agent Spec | `agent-observability-spec` | `agent-spec` | Specifying an agent's behaviour before building vs specifying its tracing and alerting in production. |
| AI-Assisted Performance Review / Performance Review | `ai-assisted-performance-review` | `performance-review` | Judging performance when output is AI-assisted raises attribution questions a standard review does not. |
| AI Code Review / Code Review Guide | `ai-code-review` | `code-review-guide` | AI-authored code has its own failure modes (hallucinated APIs, plausible-but-wrong logic) that a general review guide does not cover. |
| Async Decision Memo / Decision Memo | `async-decision-memo` | `decision-memo` | Running a decision asynchronously (read window, comment protocol, deadline) vs writing the memo itself. |
| Build My Memory File / Memory-File Maintenance | `build-my-memory-file` | `memory-file-maintenance` | Creating a memory file from scratch vs pruning and maintaining one that has drifted. |
| Car Lease Decoder / Lease Decoder | `car-lease-decoder` | `lease-decoder` | Name collision only: a car lease's money factor and cap cost vs a residential tenancy agreement. |
| Car Lease Decoder / Used Car Decoder | `car-lease-decoder` | `used-car-decoder` | Leasing terms vs reading a used-car listing before viewing it. |
| Care-Decision Family Meeting / Decision Meeting Format | `care-decision-family-meeting` | `decision-meeting-format` | A family care decision with its own emotional dynamics vs a general decision-meeting format. |
| Code Review Checklist / Code Review Guide | `code-review-checklist` | `code-review-guide` | Generating a checklist tailored to a change vs conducting the review with senior judgment. |
| Code Review Guide / Infrastructure-as-Code Review | `code-review-guide` | `infra-as-code-review` | Terraform/CloudFormation review is a different risk surface from application-code review. |
| Cold Email / Investor Cold Email | `cold-email` | `investor-cold-email` | Investor outreach is traction-forward with a different ask structure from B2B sales outreach. |
| Context Budget / Context Switch Budget | `context-budget` | `context-switch-budget` | Name collision only: an LLM context window vs human attention fragmentation across a week. |
| Contract Review / Venue Contract Review | `contract-review` | `venue-contract-review` | General contract review vs the venue-specific commercial exposure — minimum spend, attrition, cancellation ladder — that a general review does not look for. |
| Design Critique / Figma Design Critique — PM Perspective | `design-critique` | `figma-design-critique-pm` | General UX critique frameworks vs a PM-lens critique run against a Figma file. |
| Discharge Summary / Physiotherapy Discharge Summary | `discharge-summary` | `physio-discharge-summary` | A hospital inpatient discharge summary vs closing an outpatient physiotherapy episode against the goals set at assessment. |
| Email Triage / Email Triage System | `email-triage` | `email-triage-system` | Triaging a live Gmail inbox down to what needs you vs installing a durable four-verb habit. |
| Engineering Hiring Rubric / Hiring Rubric | `engineering-hiring-rubric` | `hiring-rubric` | Domain specialisation — technical interview scorecards vs a rubric for any role. |
| Expert Interview Prep / Interview Prep | `expert-interview-prep` | `interview-prep` | Extracting knowledge from an expert vs being evaluated as a candidate. |
| Figma Design Brief / Figma Design QA | `figma-design-brief` | `figma-design-qa` | Briefing a design before it exists vs QA-ing one that does. |
| Figma Design Critique — PM Perspective / Figma Design QA | `figma-design-critique-pm` | `figma-design-qa` | Product-outcome critique vs implementation-fidelity QA. |
| Figma Design QA / Figma Design Review | `figma-design-qa` | `figma-design-review` | Spec-conformance QA vs holistic design review. |
| Go-To-Market / Go-to-Market Planner | `go-to-market` | `go-to-market-planner` | Assets vs plan: one writes the launch collateral, the other sequences the launch itself. |
| Informational-Interview Prep / Interview Prep | `informational-interview-prep` | `interview-prep` | A career-advice chat you requested vs a job interview you are being assessed in. |
| Insurance Claim / Insurance Claim Appeal | `insurance-claim` | `insurance-claim-appeal` | Adjacent stages: filing the claim vs fighting a denial, which needs the denial reason and different evidence. |
| Interview Prep / Source Interview Prep | `interview-prep` | `source-interview-prep` | Journalistic source interviews, including hostile ones, are a different craft from job interviews. |
| Interview Synthesis / User Interview Synthesis | `interview-synthesis` | `user-interview-synthesis` | General interview note synthesis vs the product-discovery research pipeline; overlapping but separately maintained for their own audiences. |
| Literature Review / Literature Review Builder | `literature-review` | `literature-review-builder` | Academic researcher writing for publication vs a student building an argued review from a reading list. |
| Meeting Prep (Live) / Meeting Prep Pack | `meeting-prep-live` | `meeting-prep-pack` | Connector-backed twin — one reads the real Calendar event and linked docs, the other builds the pack from what you paste. |
| Meeting Prep (Live) / S&OP Meeting Prep | `meeting-prep-live` | `sop-meeting-prep` | Name collision only: S&OP is supply-chain sales-and-operations planning, unrelated to general meeting prep. |
| Offer Letter / Property Offer Letter | `offer-letter` | `property-offer-letter` | Name collision only: a job offer to a candidate vs a buyer's cover letter to a property seller. |
| Open House Plan / The Open House | `open-house-plan` | `the-open-house` | Opposite sides of the same event: planning an open house as the seller's agent vs simulating one as the buyer being read by that agent. |
| Parent Conference Prep / Parent Teacher Conference Prep | `parent-conference-prep` | `parent-teacher-conference-prep` | Opposite sides of the same meeting — the teacher preparing to run it vs the parent preparing to get information out of it. |
| PM Weekly Review / Weekly Review Ritual | `pm-weekly-review` | `weekly-review-ritual` | A PM's weekly product review vs a personal GTD-style weekly ritual. |
| Policy Drafter / Privacy Policy Drafter | `policy-drafter` | `privacy-policy-drafter` | An internal policy people follow vs an external, legally-shaped privacy notice. |
| PR Description (Live) / PR Description Writer | `pr-description-live` | `pr-description-writer` | Both are variants of pr-description; the -live twin reads the real diff via the GitHub connector. |
| Red-Team My Plan / Red-Team Review | `red-team-my-plan` | `red-team-review` | Stress-testing your own plan vs running a structured red-team review of someone else's. |
| Second Opinion Request / The Second Opinion | `second-opinion-request` | `the-second-opinion` | Name collision only: requesting a second medical opinion vs a thinking tool that argues against your own position. |
| Security Review / Vendor Security Review | `security-review` | `vendor-security-review` | Reviewing your own design vs assessing a third party and assigning a risk tier. |

## Retired names that still work

These resolve for `add`, `run`, and the MCP server — they are hidden from the catalogue and
point at their successor. See [docs/DEPRECATION.md](docs/DEPRECATION.md).

| Retired | Use instead | Retired on |
|---|---|---|
| `board-game-night-planner` | `game-night-planner` — Game Night Planner | 2026-08-21 |
| `debt-payoff-plan` | `debt-payoff` — Debt Payoff | 2026-08-21 |
| `demo-script` | `sales-demo-script` — Sales Demo Script | 2026-08-25 |
| `eulogy-writer` | `eulogy-and-obituary-writer` — Eulogy & Obituary Writer | 2026-08-25 |
| `jury-duty-guide` | `jury-duty-navigator` — Jury Duty Navigator | 2026-08-21 |
| `new-manager-first-90-days` | `manager-first-90-days` — Manager First 90 Days | 2026-08-21 |
| `offsite-planner` | `team-offsite-planner` — Team Offsite Planner | 2026-08-25 |
| `pr-description-writer` | `pr-description` — PR Description | 2026-08-21 |
| `referral-program` | `referral-program-design` — Referral Program Design | 2026-08-21 |
| `saying-no` | `saying-no-kindly` — Saying No Kindly | 2026-08-25 |
| `security-threat-model` | `threat-model` — Threat Model | 2026-08-21 |
| `youtube-script` | `youtube-script-writer` — YouTube Script Writer | 2026-08-25 |

## Name families

Groups sharing a first word — where a guessed name usually lands. Skim the family before
assuming the skill you want is missing.

**`the-*`** (32)

- `the-2-minute-launch` · pm-focus — Break the paralysis on the thing you keep not starting with a 2-minute launch sequence — a countdown into motion before the resistance can win.
- `the-boring-answer-detector` · pm-thinking — Scan a plan, draft, or idea for the generic, textbook, everyone-would-say-that lines — and push each toward something sharper and more specific.
- `the-car-dealership` · pm-simulators — Simulate the car-buying gauntlet before you walk in — the four-square worksheet, the payment-question trap, the trade-in shuffle, and the finance office's second sales floor, all run against your actual deal.
- `the-churning-customer` · pm-simulators — Simulate the exact customer who will quietly cancel in month 4 — their internal monologue through the lifecycle and the honest exit interview they never gave you.
- `the-due-diligence-call` · pm-simulators — Simulate the due-diligence call where an acquirer's or investor's analyst takes your metrics apart — the questions behind the spreadsheet, the moment a number wobbles, and a debrief on which answers create risk.
- `the-ethics-board` · pm-simulators — Simulate defending your study or protocol before an ethics committee — the consent-comprehension probe, the vulnerable-participant challenge, the minimal-risk fight, the data-retention question you did not prepare for — with a debrief mapping every wobble to the protocol section that needs rewriting.
- `the-ick-decoder` — Figure out whether 'the ick' about someone you're dating is a real incompatibility, a genuine red flag, or an anxious/avoidant self-sabotage pattern worth pushing through — by interrogating the specific ick honestly.
- `the-insurance-adjuster` · pm-simulators — Simulate the adjuster's settlement call after your accident or loss — the recorded-statement asks, the quick-settlement anchor, the friendly minimization — run against your actual claim, with a debrief on every answer that shrank it.
- `the-journalist-call` · pm-simulators — Simulate a hostile-but-fair journalist interview about your company or announcement — the questions you fear, live follow-ups on every dodge, then the story they'd file.
- `the-loan-officer` · pm-simulators — Simulate the mortgage or business-loan underwriting conversation before you have it for real — the deposit-source probe, the any-other-debts completeness test, the casual question about your job plans that can sink the file — run against your actual numbers, with a debrief on every answer that raised a flag.
- `the-maintainers-no` · pm-maintainer — Say no as an open-source maintainer without burning contributors or yourself — the feature that doesn't fit, the PR that took someone a weekend but can't merge, the company that wants free support, the fork suggestion said kindly.
- `the-one-thing` · pm-focus — Cut a full plate down to the single highest-leverage move — the one thing that, done today, makes everything else easier or unnecessary.
- `the-open-house` · pm-simulators — Simulate the open house and the listing agent's read of you — the questions that profile your budget and urgency, the staging that hides what inspection finds, and the offer-pressure choreography, run before you fall in love with anything.
- `the-org-simulator` · pm-2027 — Stress-test a proposed org change before announcing it — simulate who gains, who loses, who blocks, where friction erupts in the first 90 days, and run the memo leak test: how does this land when it leaks before you announce it? Use when planning a reorg, changing reporting lines, merging or splitting teams, moving a function, or 'how will this org change land?'.
- `the-planning-committee` · pm-simulators — Simulate defending your planning application before the committee that decides it — the neighbour objections read into the record, the character-of-the-area catch-all, the parking pile-on, the councillor with a pet issue — run against your actual scheme, inside a three-minute speaking slot.
- `the-price-pushback` · pm-simulators — Simulate the client who grinds on your price — the budget theater, the competitor quote, the scope squeeze — against your actual offer, with a debrief on where you caved and what holding would have sounded like.
- `the-procurement-gauntlet` · pm-simulators — Simulate enterprise procurement and security review of your product before your first big deal meets it for real — the questionnaire, the gaps, the deal-slowing findings.
- `the-promotion-committee` · pm-simulators — Simulate the calibration meeting that discusses your promotion after your manager leaves the room — the debate, the packet's holes, the verdict.
- `the-ruthless-editor` · pm-craft — Run any draft through the editor who owes you nothing — the buried lede surfaced, the throat-clearing cut, the hedges un-stacked, every paragraph made to answer so what — with a target of 30% shorter and the voice intact.
- `the-school-appeal` · pm-simulators — Simulate a school-place appeal panel before you face the real one — the two questions the panel is actually deciding, the probe that separates grounds from feelings, the prejudice balance your case must tip — run against your actual reasons, with a debrief on which answers built a case and which only expressed one.
- `the-second-opinion` · pm-thinking — Deliberately take the opposite position from your leaning and make you defend yours — a forced second opinion that isn't just an echo.
- `the-skeptic-and-the-believer` · pm-thinking — See an idea through two committed extremes — a true believer and a hard skeptic — so you get the full range before settling in the middle.
- `the-strong-no` · pm-thinking — Find the real reason to NOT do the exciting thing you're about to commit to — the honest case against, before the excitement carries you in.
- `the-thesis-defense` · pm-students — Simulate your thesis defense before the real one — a committee of examiner archetypes probing YOUR actual thesis, the questions you hoped nobody would ask, and a debrief with preparation priorities.
- `the-third-answer` · pm-thinking — Push past the first few obvious answers to a question and surface the non-obvious idea worth having.
- `the-time-capsule` · pm-2027 — Write a sealed memo to your future self or successor — the honest state of things, falsifiable predictions with confidence levels, and the advice you suspect they'll need — with an open-on date and a scoring ritual for when it's opened.
- `the-understudy` · pm-2027 — Study 3-5 samples of the user's real writing and decisions, build an explicit 'how you think' profile, then draft new work as their understudy — always with a 'what I couldn't infer about you' list so the gaps are visible instead of guessed.
- `the-union-table` · pm-simulators — Simulate a collective-bargaining session from either chair — the package-versus-item trap, the caucus break used as a weapon, the mandate check, the costing challenge, the last-minute add — run against your actual negotiation, with a debrief on every concession that left the table unpaid-for.
- `the-vibe-check` · pm-newgen — Harden a vibe-coded app before strangers use it — the audit for prototypes built fast with AI: exposed secrets, missing auth checks, unvalidated input, data with no deletion path, and the five embarrassing holes every weekend build has.
- `the-visa-interview` · pm-simulators — Simulate a consular visa interview — the 90-second assessment, the questions behind the questions, and a debrief on which answers helped and hurt.
- `the-worry-decompiler` · pm-focus — Turn an anxious spiral into a concrete list — separate the specific worries from the vague dread, sort what you can act on from what you can't, and get one action.
- `the-year-of-firsts` · pm-grief — Get through the first year after losing someone — the birthdays, holidays, and ordinary triggers that ambush you — with a gentle plan for the hard days instead of being blindsided.

**`data-*`** (10)

- `data-analysis-standard` · pm-analytics — Structure a product data analysis, metric deep-dive, funnel analysis, or cohort study.
- `data-breach-response` · pm-scam-defense — Respond to your data being breached — triage by what actually leaked, the freeze/rotate/monitor ladder in the right order, and the calibrated watchfulness that follows, without panic or paralysis.
- `data-broker-removal` · pm-digital-safety — Get your personal info off people-search and data-broker sites — a prioritized opt-out plan that targets the sites that matter and keeps them from reappearing.
- `data-cleaning-pass` · pm-cowork — Clean a messy dataset methodically — the profiling pass that finds what's actually wrong (dupes, format drift, phantom spaces, mixed types), the fix order that doesn't corrupt while correcting, and the log that makes the cleaning defensible.
- `data-contract` · pm-dataeng — Define a data contract between a producer and consumers of a dataset/event/API.
- `data-pipeline-spec` · pm-data — Design an ETL/ELT data pipeline specification.
- `data-quality-audit` · pm-data — Audit a dataset for the quality problems that silently break analysis — missingness, duplicates, outliers, type and range errors, consistency, and freshness — and produce a prioritised fix list.
- `data-quality-checks` · pm-dataeng — Design the data quality checks for a table or pipeline across the standard dimensions.
- `data-retention-policy` · pm-compliance — Build a data retention and deletion schedule grounded in legal basis.
- `data-slide-design` · pm-cowork — Design slides where the data makes the argument — the takeaway-titled chart, the one-chart-per-slide rule, the annotation layer that guides the eye to the point, and the honesty pass on projected data.

**`decision-*`** (10)

- `decision-autopsy` · pm-warroom — Judge a past decision by its PROCESS, not its outcome — because good decisions lose and bad decisions win, and teams that can't tell the difference learn the wrong lessons.
- `decision-forensics` · pm-method — Reconstruct the decision actually made in a messy Slack, email, or meeting thread into a proper decision record — commitments named, silent assumptions surfaced, non-decisions called out.
- `decision-helper` · pm-personal — Help me decide between options with a weighted pros/cons that actually reaches a recommendation — not just two lists.
- `decision-journal` · pm-essentials — Record decisions the way good judgment compounds — the reasoning, the alternatives, the probabilities, and what would change your mind, written down BEFORE the outcome arrives, then reviewed against reality.
- `decision-log-setup` · pm-cowork — Set up the team decision log that ends relitigation — the one-line-per-decision format (what, why, who, when, reopening rule), the capture moments wired into existing rituals, and the lookup habit that makes it pay.
- `decision-meeting-format` · pm-cowork — Run meetings that actually decide — the pre-read-then-decide format, the options-on-the-table rule, the decider named before debate starts, and the recorded-or-it-didn't-happen close.
- `decision-memo` · pm-business — Write a crisp decision memo that drives a clear decision, not a discussion.
- `decision-panel` · pm-thinking — Run a decision past a panel of clashing advisors — an optimist, a pessimist, a numbers person, an ethicist, and future-you — then get a chair's verdict.
- `decision-tree-solver` · pm-calculators — Turn a fork-in-the-road decision into a computed expected-value tree — settle or sue, launch or wait, fix or replace — rolled back by the bundled script, with the break-even probability where the answer flips.
- `decision-when-tired` · pm-focus — Make a decent decision when you're too depleted to think well — a low-energy protocol that protects you from bad tired-brain choices.

**`figma-*`** (10)

- `figma-annotation-guide` · pm-figma — Generate structured developer handoff annotations for a Figma screen or component.
- `figma-component-audit` · pm-figma — Audit a Figma component library for consistency, coverage gaps, and naming issues.
- `figma-design-brief` · pm-figma — Write a structured design brief for a Figma design task from a product requirement or feature request.
- `figma-design-critique-pm` · pm-figma — Runs a PM-perspective design critique focused on product outcomes and user goals, not aesthetics.
- `figma-design-qa` · pm-figma — Runs a pre-handoff QA checklist on a Figma design before it goes to engineering.
- `figma-design-review` · pm-figma — Runs a structured PM design review against product requirements.
- `figma-prototype-plan` · pm-figma — Plan prototype interactions and flows for user testing in Figma.
- `figma-spacing-system` · pm-figma — Design a spacing and layout token system for a Figma design system.
- `figma-user-flow-planner` · pm-figma — Plan user flows and screen states for a Figma design before any designing starts.
- `figma-variant-matrix` · pm-figma — Define component variants and states systematically for Figma.

**`agent-*`** (8)

- `agent-design-review` · pm-ai — Review an LLM agent design and find where it will be unreliable, expensive, or unsafe.
- `agent-era-pricing` · pm-agentnative — Redesign seat-based pricing for the agent era — when one human runs ten agents, per-seat models collapse.
- `agent-hiring-panel` · pm-2027 — Hire an AI agent the way you'd hire an employee — a role spec with success criteria, a structured work-sample interview run on your real tasks, reference checks (what do actual users report), probation KPIs, and termination criteria written before day one.
- `agent-incident-postmortem` · pm-agentops — Run a blameless postmortem for an incident caused by an AI agent or LLM feature — hallucinated facts shipped to users, runaway tool use, prompt injection, cost blowouts, or wrong actions taken autonomously.
- `agent-observability-spec` · pm-agentops — Specify the tracing, metrics, and alerting for an AI agent or LLM feature in production.
- `agent-readiness-audit` · pm-agentnative — Audit whether AI agents can actually use your product — docs, APIs, onboarding, errors, and discoverability, evaluated from a non-human user's perspective.
- `agent-severance` · pm-2027 — Offboard an AI agent the way you'd offboard an employee — inventory what it knew and touched, export then purge its memory, revoke every credential and access grant, and write the handover for its successor (human or agent).
- `agent-spec` · pm-ai — Specify an autonomous or tool-using AI agent before building it.

**`context-*`** (7)

- `context-bankruptcy` · pm-2027 — Declare bankruptcy on a long-lived AI agent's accumulated memory — audit what it currently believes, separate ground truth from stale and wrong, purge deliberately, restate the truths that survive, and log what was lost.
- `context-budget` · pm-tokens — Plan a session's context window like the budget it is — what loads up front, what gets linked instead, what stays fetch-on-demand, and how to keep the stable prefix cache-friendly so repeated turns cost cents instead of dollars.
- `context-crusher` · pm-tokens — Compress tool outputs, logs, and JSON before they enter the context window — structural compression via a deterministic stdlib script (schema + samples + stats instead of 300 raw rows), no API, no summarization loss.
- `context-engineering-review` · pm-agentops — Review what an LLM feature or agent actually puts in its context window — and find what's bloating, missing, or fighting itself.
- `context-mode` · pm-engineering — Keep Claude Code sessions productive across resets with output filtering, session logging, and auto-resume.
- `context-switch-budget` · pm-cowork — Treat context switches as the budget line they are — the switch census (how fragmented the week really is), the batching moves that consolidate scattered same-kind work, the calendar defrag that turns Swiss cheese into slabs, and the switch-cost line for saying no.
- `context-switch-recovery` · pm-focus — Reconstruct where you were and what's next after an interruption, so a broken focus doesn't cost you the whole thread.

**`email-*`** (6)

- `email-agent-preflight` · pm-seatbelt — Run the pre-flight checklist before an agent touches an inbox — the read-vs-send permission line, the injection-in-email-body threat, the send-guard rules, and the blast-radius limits that keep a compromised agent from mailing the company.
- `email-campaign` · pm-gtm — Write and sequence multi-email nurture or launch campaigns.
- `email-sequence` · pm-copy — Write a multi-email nurture/onboarding/launch sequence with a goal per email.
- `email-to-tasks` · pm-cowork — Convert an email (or a whole thread) into real tasks — the actual asks extracted from the prose, each with owner, deadline, and the done-test, so nothing lives in the inbox as its own reminder.
- `email-triage` · pm-operations — Triage a Gmail inbox down to only what needs you.
- `email-triage-system` · pm-cowork — Turn an overflowing inbox into a four-verb system — archive, reply-now, task, or park — with the two-minute rule enforced and a daily cadence that survives busy weeks.

**`financial-*`** (6)

- `financial-aid-appeal` · pm-students — Write a financial-aid appeal or scholarship request letter that aid offices act on — factual, documented, and specific about the ask.
- `financial-checkup` · pm-wealth — Run an annual (or anytime) financial health check across the key areas — so you catch problems and opportunities instead of drifting.
- `financial-due-diligence` · pm-finance — Generate a financial due diligence checklist and analysis framework for any investment, acquisition, or partnership.
- `financial-independence-roadmap` · pm-wealth — Map a realistic path toward financial independence — the number you'd actually need, your savings rate's massive effect on the timeline, and the honest tradeoffs.
- `financial-model-narrative` · pm-finance — Turn financial model outputs into a clear written narrative.
- `financial-statement-explainer` · pm-accounting — Explain a financial statement (P&L, balance sheet, or cash flow) in plain English.

**`meeting-*`** (6)

- `meeting-action-extractor` · pm-essentials — Pull the action items and decisions out of meeting notes or a transcript — each with an owner, a due date, and enough context to become a ticket — plus the open questions.
- `meeting-cost-meter` · pm-cowork — Price meetings in money and focus — the attendee-hours × loaded-rate math, the recurring multiplier that turns a weekly 30-minutes into a real annual number, and the cost-vs-outcome read that decides what the price buys.
- `meeting-notes` · pm-essentials — Structure and format meeting notes following PM best practices.
- `meeting-prep-live` · pm-cowork-live — Prepare the user for a REAL upcoming meeting by pulling the actual Calendar event, its attendees, the linked Drive docs, and the last email/Slack thread — then producing a brief.
- `meeting-prep-pack` · pm-cowork — Arrive at a meeting armed in fifteen minutes — the prep pack: what this meeting decides, your position with its reasons, the other attendees' likely stances, the questions to ask, and the outcome you're steering toward.
- `meeting-room-etiquette` · pm-cowork — Set the shared-space norms that end the small daily frictions — meeting room booking discipline (the ghost-booking cure), hybrid-call room behavior, the shared kitchen/space contracts, and the enforcement that works without a hall monitor.

**`product-*`** (6)

- `product-description` · pm-ecommerce — Write a product description / listing that sells and ranks.
- `product-health-analysis` · pm-analytics — Interpret product metrics against goals and surface actionable signals.
- `product-launch-checklist` · pm-delivery — Generate a comprehensive pre-launch, launch day, and post-launch checklist for any product release.
- `product-naming` · pm-uxwriting — Generate and evaluate names for a product, feature, or release.
- `product-positioning-doc` · pm-gtm — Write a product positioning document and messaging framework.
- `product-recall-check` · pm-lifeadmin — Find out whether something you own — a car, appliance, car seat, food item, or gadget — is under a safety recall, and what to do about it.

**`client-*`** (5)

- `client-discharge-notes` · pm-veterinary — Write clear at-home care instructions for a pet owner after a veterinary visit, procedure, or hospitalization.
- `client-discovery` · pm-consulting — Run a consulting client discovery session — uncover the real problem, scope, and decision process.
- `client-offboarding` · pm-freelance — Wrap up a client project the right way — a clean handoff, a strong final impression, and the moves that turn a finished project into referrals and repeat work.
- `client-onboarding-kit` · pm-freelance — Build a smooth client-onboarding process that starts projects on the right foot — clear expectations, the info you need, and a professional first impression that prevents problems later.
- `client-red-flags` · pm-freelance — Spot a bad client before you sign — the warning signs of the projects that turn into unpaid, scope-creeping nightmares, and how to screen, price, or decline them.

**`customer-*`** (5)

- `customer-advisory-board` · pm-pmm — Plan and run a customer advisory board (CAB).
- `customer-incident-update` · pm-crisis — Write the customer-facing incident update during an outage — status-page post or email — that's honest about impact without over-promising.
- `customer-journey-map` · pm-discovery — Build a customer journey map for a product, service, or experience.
- `customer-outage-notice` · pm-crisis — Write clear customer-facing outage and service-disruption notifications.
- `customer-success-plan` · pm-cs — Build a joint customer success plan for a specific account.

**`deck-*`** (5)

- `deck-autopsy` · pm-vision — Autopsy a slide deck from photos or screenshots of its slides — the narrative arc, the numbers, and what each slide is hiding.
- `deck-from-doc` · pm-cowork-live — Turn the user's REAL doc into a slide deck — open the source, structure the narrative, and build the actual .pptx — not slide-writing tips.
- `deck-narrative-arc` · pm-cowork — Give a deck a spine the room can follow — the situation-complication-resolution arc, the tension that makes the recommendation feel necessary, the transitions that carry the thread between slides, and the arc-check that catches sag.
- `deck-outline-first` · pm-cowork — Outline a deck as headline sentences before opening the slide tool — each slide a claim that reads as an argument top to bottom, the audience-and-ask header, and the skim test that catches broken decks while they're still bullet points.
- `deck-review-rubric` · pm-cowork — Review a deck against a rubric instead of taste — the five dimensions (argument, evidence, density, arc, honesty), the severity-sorted feedback that separates broken from suboptimal, and the review conversation that improves the deck without rewriting it in the reviewer's voice.

**`dental-*`** (5)

- `dental-clinical-note` · pm-dentistry — Write a dental chart note that survives an insurance audit, a recall years later, and a colleague picking up the case cold — the finding, the justification, the consent conversation, and the materials, in the order a reviewer looks for them.
- `dental-emergency-triage` · pm-dentistry — Triage a dental emergency call so the right patient is seen today and the rest are safely scheduled — the red flags that are medical rather than dental, the questions that sort urgency, and the interim advice a receptionist can safely give.
- `dental-insurance-preauth` · pm-dentistry — Write a dental pre-authorisation request or claim narrative that gets approved the first time — the diagnosis, the documented failure of lesser treatment, and the attachments a reviewer needs, assembled in the order they assess them.
- `dental-recall-reactivation` · pm-dentistry — Build a dental recall and reactivation system that brings lapsed patients back without nagging — the segments worth contacting, the message that works for each, the cadence, and the measure that tells you whether it is working.
- `dental-referral-letter` · pm-dentistry — Write a dental referral letter a specialist can act on without ringing you back — the question you are actually asking, the findings and images that support it, and what you have already tried.

**`expense-*`** (5)

- `expense-audit` · pm-money — Audit spending to find leaks — recurring subscriptions, creep, and cuttable costs — ranked by impact.
- `expense-discipline` · pm-cowork — Submit expenses that sail through approval — the capture-at-spend habit, the policy-fluency that prevents rejections (thresholds, receipt rules, the pre-approval traps), the report assembled in minutes, and the approver-side rules for reviewing fairly and fast.
- `expense-filer` · pm-operator — Turn a pile of receipts into a filed expense report through a tool-using agent — extraction, policy checks, and categorization done for you; submission gated on your approval.
- `expense-policy` · pm-accounting — Write a clear company expense & reimbursement policy.
- `expense-sheet-design` · pm-cowork — Design an expense-tracking sheet that survives real receipts — the capture-at-spend habit, the category set that matches reimbursement or tax rules, the receipt-link discipline, and the month-end close that takes minutes because the work happened at spend-time.

**`first-*`** (5)

- `first-100k-plan` · pm-wealth — Build a realistic plan to reach your first major savings/investing milestone — the hardest one — by focusing on the levers that actually move it: income, savings rate, and time.
- `first-90-days-out` · pm-reentry — Build a concrete plan for the first 90 days after release from incarceration — the ID, benefits, housing, check-ins, and money moves that have to happen in order, before they cascade into a crisis.
- `first-client-contract` · pm-sidehustle — Put your first client agreement in writing — the eight clauses a simple service contract must have, in plain language a non-lawyer can use, with the blanks filled from your actual deal.
- `first-hire-plan` · pm-career — Plan your first hire — whether to hire at all yet, contractor vs employee, what role to hire, and how to do it right when you've never hired before.
- `first-maintainer-month` · pm-maintainer — Set up a new open-source project's first month so it can grow without eating its maintainer — the README that routes people correctly, CONTRIBUTING boundaries written before there are contributors, issue templates that pre-triage, a release rhythm, and the sustainability defaults (what you owe no one).

**`home-*`** (5)

- `home-contractor-quote-decoder` · pm-decoders — Decode a home renovation or repair quote — allowances that aren't prices, exclusions that become change orders, payment schedules that shift risk, and what a comparable-bids check should cover.
- `home-energy-savings` · pm-lifeadmin — Cut your home energy bills with a prioritized plan — the free and cheap fixes first, then the upgrades that actually pay back.
- `home-inspection-decoder` · pm-lifeadmin — Make sense of a home-inspection report before you buy — what's serious vs cosmetic, what to negotiate, and what to investigate further.
- `home-maintenance-calendar` · pm-lifeadmin — Build a seasonal home-maintenance calendar so the small upkeep gets done before it becomes an expensive repair.
- `home-workout-builder` · pm-wellbeing — Build a home workout plan that fits your gear, time, and goal — a real weekly structure, not a random list of exercises.

**`personal-*`** (5)

- `personal-bio` · pm-personal — Write a professional bio in the three lengths you actually need.
- `personal-board-of-directors` · pm-personal — Five standing advisors — the Operator, the Skeptic, the CFO, the Coach, the Customer — debate your decision on paper and vote.
- `personal-operating-manual` · pm-focus — Write the manual for how you work best — your energy, triggers, communication style, and non-negotiables — to share with a manager, team, or partner (or to know yourself).
- `personal-statement` · pm-students — Write a personal statement for a university, grad-school, or job application that's specific, coherent, and unmistakably you — showing fit and motivation, not a résumé in prose.
- `personal-wip-limits` · pm-cowork — Cap your work-in-progress so things finish — the personal WIP limit (3 active outcomes, defended), the finish-before-start rule with its exceptions named, the parking lot for the overflow, and the throughput evidence that converts the skeptic.

**`pricing-*`** (5)

- `pricing-calculator` · pm-calculators — Model pricing scenarios — tiers, margins, break-even, and the revenue impact of a price change.
- `pricing-page-copy` · pm-pmm — Write pricing page copy that helps buyers self-select the right plan and convert.
- `pricing-sensitivity-model` · pm-calculators — Van Westendorp price sensitivity, computed from real survey answers — crossings found by interpolation, not read off a chart by eye.
- `pricing-strategy` · pm-planning — Structure pricing strategy decisions, packaging options, and tier design for SaaS and digital products.
- `pricing-your-services` · pm-freelance — Design a freelance/consulting pricing structure — hourly vs day-rate vs project vs retainer chosen per engagement type, anchored packages, and the rules for saying the number out loud without flinching.

**`sales-*`** (5)

- `sales-battlecard` · pm-sales — Create a competitive sales battlecard for any competitor.
- `sales-demo-script` · pm-pmm — Write a product demo script that tells a value story instead of a feature tour — the buyer's-workflow storyline, the golden path rehearsed with fallbacks, the wow moment placed early, and the demo-death contingencies (backup video, reset state, narration bridge).
- `sales-enablement-kit` · pm-pmm — Build a sales enablement kit so reps can sell a product, feature, or launch confidently.
- `sales-forecasting-model` · pm-sales — Build a structured sales forecast framework for any business or team.
- `sales-page` · pm-copy — Write a long-form sales page that takes a cold reader to a purchase.

**`support-*`** (5)

- `support-a-friend-in-crisis` — Show up well for someone going through something hard — loss, illness, a breakup, a crisis — with the right words, the right presence, and concrete help, instead of freezing or saying the wrong thing.
- `support-macro` · pm-support — Write reusable support macros / canned responses that sound human, not robotic.
- `support-runbook` · pm-support — Write a support runbook for handling a recurring issue type consistently.
- `support-staffing-model` · pm-calculators — How many support agents does the queue actually need — Erlang C, computed, not 'tickets per agent' folklore.
- `support-the-bereaved` · pm-grief — Know what to actually say and do for someone who's grieving — the real help instead of the empty 'let me know if you need anything.' Use when asked what do I say to someone whose parent died, how do I support a grieving friend, what to write in a condolence, or how to help without making it worse.

**`vendor-*`** (5)

- `vendor-breakup-email` · pm-cowork — End a vendor, freelancer, or service relationship cleanly — the notice email that cites the contract, the transition asks that protect your data and continuity, and the door-open close that costs nothing.
- `vendor-comparison-matrix` · pm-cowork — Compare vendors on a matrix that decides instead of decorates — the criteria weighted before the demos (so the shiny demo can't rewrite them), the evidence-based scoring with the marketing-vs-verified flags, the total-cost row that includes switching, and the reference-check questions that get honest answers.
- `vendor-contract-checklist` · pm-operations — Review a vendor/SaaS contract against a practical checklist before you sign.
- `vendor-evaluation` · pm-operations — Create a structured vendor evaluation framework for any procurement decision.
- `vendor-security-review` · pm-compliance — Run a third-party / vendor security review and assign a risk tier with required controls.

**`wedding-*`** (5)

- `wedding-budget` · pm-wedding — Build a wedding budget that survives to the wedding — allocation by real shares, the per-guest lever made explicit, the routinely-forgotten line items priced in from day one, and a contingency that isn't decorative.
- `wedding-logistics-planner` · pm-wedding — Plan the wedding day as the operation it is — the minute-level run sheet, the vendor call sheet, the who-handles-problems roster, and the buffer discipline that keeps the couple out of logistics on the day.
- `wedding-speech` · pm-lifeadmin — A best-man/maid-of-honour/parent wedding toast that actually lands — funny without roasting, moving without syrup, short enough that nobody checks their phone.
- `wedding-vendor-contract-decoder` · pm-wedding — Decode a wedding vendor contract — venue, photographer, caterer, band — before signing: deposits and their refundability, cancellation and postponement terms, the substitute-performer and force-majeure clauses, and overtime math.
- `wedding-vows-writer` · pm-family — Write personal wedding vows that sound like you — specific, heartfelt, and the right length — instead of generic or cheesy.

**`api-*`** (4)

- `api-docs-writer` · pm-engineering — Write clear, developer-facing API documentation.
- `api-for-yourself` · pm-2027 — Publish 'how to work with me' as a literal API spec — endpoints (what to ask me for and what you'll get back), rate limits (meeting and interrupt tolerance), error codes (what happens when you surprise me Friday 5pm), auth (how to earn trust), and a changelog.
- `api-test-plan` · pm-qa — Plan tests for an API endpoint or service — functional, negative, and contract.
- `api-versioning-strategy` · pm-engineering — Write an API versioning strategy document for a service or API platform.

**`async-*`** (4)

- `async-decision-memo` · pm-operations — Run a decision asynchronously — the memo, the silent-read window, the comment protocol, and the deadline that makes it land without a meeting.
- `async-instead` · pm-cowork — Convert a meeting into async work that actually decides — the doc-plus-deadline format that replaces the room, the comment-window rules, the decision-closure step that async usually fumbles, and the honest test for what still needs synchronous.
- `async-standup-compiler` · pm-cowork-live — Compile the team's REAL updates into one async standup — pull what people posted in Slack (and moved in Notion/Linear), not a template for running standups.
- `async-update-format` · pm-cowork — Write status updates people actually read — the traffic-light-plus-narrative format (state first, story second), the blockers-are-asks rule, and the skimmable structure that respects a reader with thirty seconds.

**`board-*`** (4)

- `board-deck-narrative` · pm-business — Build the storyline and slide structure for a board presentation.
- `board-game-designer` · pm-tabletop — Take a board game idea from 'wouldn't it be cool if' to a playtestable prototype — core loop, tension source, components you can make tonight, balance starting-points, and a real playtest protocol with kill criteria.
- `board-minutes` · pm-business — Write formal board meeting minutes from an agenda, notes, transcript, or discussion summary.
- `board-pre-read` · pm-business — Write a board pre-read that's sent before the meeting so the meeting is about decisions, not status.

**`changelog-*`** (4)

- `changelog-for-humans` · pm-cowork — Write changelogs and release notes readers actually benefit from — changes translated to so-whats, grouped by reader impact (breaking first, gifts second, plumbing last), with the upgrade path stated and the marketing kept honest.
- `changelog-from-commits` · pm-cowork-live — Write a human changelog from the REAL commit history — read the actual commit range via the GitHub connector, not a template.
- `changelog-generator` · pm-engineering — Convert a git log, commit list, or release notes into a polished, user-facing changelog.
- `changelog-writer` · pm-devrel — Turn a list of changes, commits, or PRs into clean release notes / a changelog entry.

**`code-*`** (4)

- `code-explainer` · pm-engineering — Explain what a piece of code does in plain English, at the depth the reader needs.
- `code-review-checklist` · pm-engineering — Generate a tailored code review checklist for any pull request based on the language, type of change, and risk level.
- `code-review-guide` · pm-craft — Review a pull request or diff like a thoughtful senior engineer — prioritized, kind, and focused on what matters.
- `code-simplification` · pm-method — Simplify code that works — remove speculative abstraction, dead flexibility, and needless indirection while keeping behaviour identical and verified.

**`design-*`** (4)

- `design-critique` · pm-design — Give structured, constructive feedback on any design using UX frameworks.
- `design-handoff-brief` · pm-advanced — Transform feature briefs into structured design briefs that give designers the context they need before opening Figma.
- `design-system-audit` · pm-design — Audit a design system for consistency, coverage, and quality.
- `design-system-generate` · pm-design — Generate a complete, accessibility-checked design system from scratch — colour ramps, type scale, spacing, elevation, and exports for CSS, Tailwind, design tokens, Figma, VS Code and PowerPoint.

**`event-*`** (4)

- `event-budget-plan` · pm-events — Build an event budget that survives the event — every cost line including the ones people forget, the contingency sized to the actual risk, and the tracking that shows overspend while it can still be stopped.
- `event-run-of-show` · pm-events — Build the minute-by-minute run of show that lets an event run without the planner being asked anything — every cue, who owns it, what happens if it slips, and the version each supplier actually needs.
- `event-safety-plan` · pm-events — Produce the event safety documentation that satisfies a venue or licensing authority and actually works on the day — the risk assessment, crowd and capacity plan, emergency procedures, and the roles that must be filled.
- `event-vendor-brief` · pm-events — Brief an event supplier so they quote accurately and deliver what you pictured — the outcome, the constraints, the deliverables, and the questions you need answered in the quote.

**`interview-*`** (4)

- `interview-me` · pm-method — Elicit the real requirements by interviewing the requester BEFORE building or writing anything — one question at a time, until the brief is buildable.
- `interview-prep` · pm-jobsearch — Prepare for a specific interview at a specific company, not just 'an interview'.
- `interview-question-bank` · pm-recruiting — Build a structured, role-specific interview question bank with what good answers look like.
- `interview-synthesis` · pm-cowork — Turn a pile of interview notes into findings that survive scrutiny — the code-then-theme pass, the counting discipline (how many actually said it), the quote selection that illustrates instead of cherry-picks, and the confidence lines a small sample earns.

**`job-*`** (4)

- `job-application` · pm-business — Tailors a CV and cover letter to a specific job description.
- `job-description-writer` · pm-hr — Write a clear, inclusive, and structured job description for any role.
- `job-search-with-a-record` · pm-reentry — Run a job search when you have a criminal record — where to apply, when and how to disclose, and how to turn the question into a short, confident answer instead of a dealbreaker.
- `job-story-mapper` · pm-discovery — Write Jobs-to-be-Done (JTBD) job stories and map customer jobs across functional, social, and emotional dimensions.

**`layoff-*`** (4)

- `layoff-announcement` · pm-layoff — Write the layoff communications a leader has to get right once — the all-hands script, the affected/unaffected messages, and the external note, without corporate euphemism or legal risk.
- `layoff-communication` · pm-crisis — Plan and write the communications for a layoff or restructure with clarity and dignity.
- `layoff-financial-triage` · pm-layoff — The first-72-hours money plan after a layoff — runway computed, deadlines caught, bleeding stopped, in priority order.
- `layoff-first-72-hours` · pm-career — Steady the first 72 hours after being laid off — the practical, financial, and emotional moves in the right order, before panic-applying to everything.

**`prompt-*`** (4)

- `prompt-debugging` · pm-ai-native — Figure out why a prompt isn't working and fix it — diagnose the actual failure (ambiguity, missing context, wrong format, conflicting instructions) instead of randomly rewording.
- `prompt-library-builder` · pm-ai-native — Build a personal library of reusable prompts for the things you ask AI again and again — so you stop rewriting the same request from scratch.
- `prompt-optimizer` · pm-ai — Diagnose and rewrite an underperforming LLM prompt so it produces reliable, well-structured output.
- `prompt-regression-suite` · pm-agentops — Design a regression test suite that catches an LLM feature getting worse when the prompt, model, or context changes.

**`property-*`** (4)

- `property-investment-analysis` · pm-realestate — Analyze a rental / investment property's returns — cash flow, cap rate, cash-on-cash, ROI.
- `property-listing` · pm-realestate — Write a compelling, accurate real-estate listing description.
- `property-offer-letter` · pm-realestate — Write a buyer's offer cover letter to a seller to strengthen a real-estate bid.
- `property-tax-appeal` · pm-legal — Challenge an over-assessed property tax bill — check whether your assessment is too high, build the evidence, and file the appeal before the deadline.

**`security-*`** (4)

- `security-deposit-recovery` · pm-renters — Get your security deposit back — the move-out documentation that wins disputes before they start, the itemized-deduction challenge, the demand-letter ladder, and the small-claims decision point.
- `security-incident-response` · pm-security — Run or document a security incident response — contain, eradicate, recover, and learn.
- `security-questionnaire-autofill` · pm-compliance — Draft answers to a vendor security questionnaire (SIG, CAIQ, or a custom sheet) from your real controls — fast, consistent, and honest about gaps.
- `security-review` · pm-security — Review a design, PR, or feature for security issues before it ships.

**`skill-*`** (4)

- `skill-fusion` · pm-advanced — Fuse two skills from this library into one hybrid brief for a task that sits between them — the meta-skill.
- `skill-plateau-breaker` · pm-learning — Diagnose why you've stopped improving at something and get a plan to break through the plateau.
- `skill-security-auditor` · pm-engineering — Audit a Claude/Agent SKILL.md (or any AI skill / system prompt) for safety before installing or merging it.
- `skill-vetting` · pm-security — Vet an agent skill before installing it — read the SKILL.md and any scripts for the red-flag patterns (credential access, obfuscation, exfiltration, prompt injection), audit its blast radius, and produce a risk-tiered verdict.

**`spreadsheet-*`** (4)

- `spreadsheet-audit` · pm-cowork — Audit a spreadsheet before trusting it — the error hunt (hardcoded overrides, broken ranges, silent unit mixes), the fragility map (what breaks when rows are added), and the load-bearing-formula review that catches the mistake before the meeting does.
- `spreadsheet-audit-live` · pm-cowork-live — Audit the user's REAL spreadsheet by opening it in the Cowork sandbox — not by reading a description of it.
- `spreadsheet-handover` · pm-cowork — Hand over a spreadsheet so it survives its author leaving — the README tab that decodes the sheet's logic, the update runbook with sources and cadence, the fragility warnings, and the walkthrough that transfers the judgment.
- `spreadsheet-or-database` · pm-cowork — Decide honestly when a spreadsheet should become a database or app — the five outgrowth signals (concurrent editing, relational strain, permission needs, scale, process-in-comments), what staying costs vs what migrating costs, and the incremental escape paths.

**`sprint-*`** (4)

- `sprint-brief` · pm-delivery — Generate a structured sprint brief from sprint data and goals.
- `sprint-planning` · pm-delivery — Structure and facilitate sprint planning sessions.
- `sprint-retro-facilitator` · pm-delivery — Run a sprint retrospective that produces real change — themes from what actually happened, honest start/stop/continue, and owned action items, not a vent session.
- `sprint-velocity-analysis` · pm-engineering — Analyze sprint velocity data and produce an engineering team health report covering delivery trends, capacity utilization, and improvement recommendations.

**`user-*`** (4)

- `user-interview-synthesis` · pm-discovery — Synthesises user interview transcripts into structured research findings.
- `user-journey-map` · pm-visuals — Map a user's journey through a product or experience, phase by phase, with their actions and how they feel.
- `user-research-synthesis` · pm-essentials — Analyze and synthesize user research findings into structured, actionable insights.
- `user-story-writer` · pm-delivery — Write well-structured user stories with acceptance criteria and edge cases.

