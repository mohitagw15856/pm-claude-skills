# 🧩 Workflow Recipes

> **Skills you can chain.** A recipe runs several skills in sequence and *passes each output forward as context* for the next — so a fuzzy idea comes out the other end as a finished, joined-up set of artifacts. No other skills library chains across professions like this.

Run one as a slash command in Claude Code (e.g. `/ship-a-feature a referral program for B2B users`), or fetch it over MCP with the `get_workflow` tool.

<!-- Generated from workflows.json by scripts/build-workflows.mjs — do not edit by hand. -->

There are **15 recipes** today:

| Recipe | Command | Lifecycle | Chains |
|--------|---------|-----------|--------|
| **Ship a Feature** | `/ship-a-feature` | Discover → Decide → Build → Ship | 5 skills |
| **Close the Quarter** | `/close-the-quarter` | Measure → Communicate | 4 skills |
| **Launch a Product** | `/launch-a-product` | Decide → Ship | 5 skills |
| **Rescue an Account** | `/rescue-an-account` | Measure → Communicate | 4 skills |
| **Run Discovery** | `/run-discovery` | Discover → Decide | 4 skills |
| **Repurpose Content** | `/repurpose` | One source → many platforms | 3 skills |
| **Launch an AI Feature** | `/launch-an-ai-feature` | Spec → Design → Evaluate → Budget → Document | 5 skills |
| **Grow a Product** | `/grow-a-product` | Diagnose → Experiment → Retain → Nurture | 4 skills |
| **Land a Job** | `/land-a-job` | Decode → Research → Apply → Interview | 4 skills |
| **Ship an MCP Server** | `/ship-an-mcp-server` | Spec → Audit → Price | 4 skills |
| **Adopt AI Properly** | `/adopt-ai-properly` | Policy → Roles → Proof | 4 skills |
| **Design Review** | `/design-review` | React → Measure → Diagnose → Hand over | 4 skills |
| **职场晋升线 (Chinese workplace: report to promotion)** | `/cn-career-ladder` | 周报 → 复盘 → 年终总结 → 述职 → 晋升答辩 | 5 skills |
| **出海上新 (cross-border launch)** | `/cn-crossborder-launch` | 选市场 → 选平台 → listing → 种草 → 直播 | 5 skills |
| **校招拿 offer (campus recruitment)** | `/cn-campus-offer` | 规划 → 简历 → 技术面 | 3 skills |

## Ship a Feature — `/ship-a-feature`

*Discover → Decide → Build → Ship* · Take a raw feature idea from fuzzy brief all the way to a launch plan, end to end.

`ambiguity-resolver` → `prd-template` → `rice-prioritisation` → `roadmap-narrative` → `go-to-market`

1. **ambiguity-resolver** → produces a sharp problem statement and scoped boundaries.
2. **prd-template** → produces a full PRD with goals, requirements, and success metrics.
3. **rice-prioritisation** → produces a RICE score positioning this work against alternatives.
4. **roadmap-narrative** → produces where this sits on the roadmap and the story around it.
5. **go-to-market** → produces a launch plan: audience, messaging, channels, and timeline.

## Close the Quarter — `/close-the-quarter`

*Measure → Communicate* · Turn the quarter's raw numbers into a leadership-ready story and board deck.

`metrics-framework` → `churn-analysis` → `executive-update` → `board-deck-narrative`

1. **metrics-framework** → produces the metric tree and what actually moved.
2. **churn-analysis** → produces why customers left and what is avoidable.
3. **executive-update** → produces a tight leadership briefing of the quarter.
4. **board-deck-narrative** → produces a slide-by-slide board deck storyline.

## Launch a Product — `/launch-a-product`

*Decide → Ship* · Go from competitive landscape to positioning to a fully checklisted launch and press release.

`competitor-teardown` → `product-positioning-doc` → `go-to-market` → `product-launch-checklist` → `press-release`

1. **competitor-teardown** → produces the competitive map and gaps to exploit.
2. **product-positioning-doc** → produces positioning, value props, and messaging pillars.
3. **go-to-market** → produces the GTM plan across audience and channels.
4. **product-launch-checklist** → produces an owner-by-owner launch readiness checklist.
5. **press-release** → produces the announcement press release.

## Rescue an Account — `/rescue-an-account`

*Measure → Communicate* · Diagnose an at-risk customer and build the full save play through to renewal.

`cs-health-scorecard` → `churn-analysis` → `cs-escalation-brief` → `renewal-playbook`

1. **cs-health-scorecard** → produces a health score with the specific risk drivers.
2. **churn-analysis** → produces the root cause and whether the risk is avoidable.
3. **cs-escalation-brief** → produces an internal escalation brief for the save.
4. **renewal-playbook** → produces the renewal strategy and negotiation plan.

## Run Discovery — `/run-discovery`

*Discover → Decide* · From a vague opportunity to validated insight and a prioritised next step.

`ambiguity-resolver` → `discovery-interview-guide` → `user-research-synthesis` → `rice-prioritisation`

1. **ambiguity-resolver** → produces a one-page problem brief from the fuzzy opportunity.
2. **discovery-interview-guide** → produces a screener and discussion guide for user interviews.
3. **user-research-synthesis** → produces themes and insights from the research.
4. **rice-prioritisation** → produces a ranked, defensible list of what to do next.

## Repurpose Content — `/repurpose`

*One source → many platforms* · Turn one blog post, video, or idea into a full platform-native content pack — thread, LinkedIn, newsletter, carousel, and short-form script — with sharpened hooks and a thumbnail concept.

`content-repurposer` → `hook-writer` → `thumbnail-creator`

1. **content-repurposer** → produces platform-native drafts for X, LinkedIn, newsletter, carousel and short-form video.
2. **hook-writer** → produces stronger, scroll-stopping hooks for each piece.
3. **thumbnail-creator** → produces a thumbnail concept for the video version.

## Launch an AI Feature — `/launch-an-ai-feature`

*Spec → Design → Evaluate → Budget → Document* · Take an AI/LLM feature idea from a probabilistic-aware PRD through retrieval/agent design, an eval plan with a ship bar, a cost & latency budget, and a launch-ready model card.

`ai-feature-prd` → `rag-design-doc` → `ai-eval-plan` → `llm-cost-latency-budget` → `model-card`

1. **ai-feature-prd** → produces a PRD designed for a probabilistic system — uncertainty UX, guardrails, fallback, and a quality bar.
2. **rag-design-doc** → produces the retrieval/generation design (chunking, retrieval, reranking, grounding, failure modes).
3. **ai-eval-plan** → produces an eval harness: datasets, rubrics, baselines, a ship threshold, and a regression gate.
4. **llm-cost-latency-budget** → produces per-request token math, model tiering, caching, p95 targets, and spend guardrails.
5. **model-card** → produces a launch-ready model card: intended use, sliced eval, limitations, and a rollback trigger.

## Grow a Product — `/grow-a-product`

*Diagnose → Experiment → Retain → Nurture* · Turn a growth goal into a full-funnel diagnosis, a prioritised experiment backlog, a retention loop, and the lifecycle journeys that nurture users — a joined-up growth plan.

`marketing-funnel-plan` → `growth-experiment-backlog` → `retention-loop-design` → `lifecycle-crm-plan`

1. **marketing-funnel-plan** → produces a full-funnel map with the biggest leak identified and a 90-day focus.
2. **growth-experiment-backlog** → produces a prioritised, properly-powered experiment backlog (ICE) against that stage.
3. **retention-loop-design** → produces a retention/engagement loop (trigger→action→reward→investment) and activation path.
4. **lifecycle-crm-plan** → produces behaviour-triggered lifecycle journeys that drive the loop, with holdouts and suppression.

## Land a Job — `/land-a-job`

*Decode → Research → Apply → Interview* · Go after a specific role end to end: decode the job description, research the company, tailor your CV and cover letter to it, and prep for the interview — each step building on the last.

`jd-decoder` → `company-brief` → `job-application` → `interview-prep`

1. **jd-decoder** → produces what the posting really wants, your honest fit, and the keywords to mirror.
2. **company-brief** → produces a research brief — business model, trajectory, and the challenges this role would touch.
3. **job-application** → produces an ATS-tailored CV summary and a cover letter aligned to the decoded requirements.
4. **interview-prep** → produces a tailored prep pack — likely questions for this role and round, STAR answers, a story bank, and questions to ask.

## Ship an MCP Server — `/ship-an-mcp-server`

*Spec → Audit → Price* · Make your product genuinely usable by AI agents: spec the server, audit every agent-facing surface, and fix the pricing before agents break it.

`mcp-server-spec` → `agent-readiness-audit` → `agent-era-pricing` → `human-in-the-loop-design`

1. **mcp-server-spec** → produces a task-shaped toolset with auth, gates, and the never-exposed list.
2. **agent-readiness-audit** → produces a six-surface readiness score with the failing artifacts quoted and a fix list.
3. **agent-era-pricing** → produces a value-metric migration plan with fences and cannibalisation math.
4. **human-in-the-loop-design** → produces the approval surface for every gated action the server exposes.

## Adopt AI Properly — `/adopt-ai-properly`

*Policy → Roles → Proof* · The org-side AI adoption arc: a policy people can follow, roles redesigned on purpose, reviews that still measure the human, and an audit that proves what paid.

`ai-usage-policy` → `role-redesign-for-ai` → `ai-assisted-performance-review` → `ai-roi-audit`

1. **ai-usage-policy** → produces a one-page usable policy with the data traffic-light and decision log.
2. **role-redesign-for-ai** → produces redesigned role charters with capacity deliberately reallocated.
3. **ai-assisted-performance-review** → produces review criteria that measure judgment, verification, outcomes, and leverage.
4. **ai-roi-audit** → produces per-tool keep/consolidate/cut verdicts with the measurement behind each number.

## Design Review — `/design-review`

*React → Measure → Diagnose → Hand over* · Review a design end to end and finish with measured numbers rather than adjectives — every contrast ratio computed, and the fixes split into find-and-replace versus decisions somebody has to make.

`design-critique` → `accessibility-audit` → `design-system-audit` → `design-handoff-brief`

1. **design-critique** → produces an honest read of intent versus execution, written before the measurements.
2. **accessibility-audit** → produces a WCAG audit with every contrast row computed rather than assessed.
3. **design-system-audit** → produces whether this is a one-off or a token problem underneath.
4. **design-handoff-brief** → produces the decisions, the measured values, and the open questions in buildable form.

## 职场晋升线 (Chinese workplace: report to promotion) — `/cn-career-ladder`

*周报 → 复盘 → 年终总结 → 述职 → 晋升答辩* · Turn a year of Chinese workplace notes into a promotion case: weekly reports, a 复盘, the year-end review, the 述职 deck and the defence.

`cn-weekly-report` → `cn-fupan` → `cn-year-end-review` → `cn-shuzhi-deck` → `cn-promotion-defence`

1. **cn-weekly-report** → produces 周报 that show results with numbers, risks and next steps.
2. **cn-fupan** → produces a 复盘 of the biggest project: goals, results, causes, lessons.
3. **cn-year-end-review** → produces the 年终总结: achievements ranked by impact, problems and next year's plan.
4. **cn-shuzhi-deck** → produces a 述职 deck outline, page by page, with a timed script.
5. **cn-promotion-defence** → produces a level-gap analysis and a rehearsal of the committee's questions.

## 出海上新 (cross-border launch) — `/cn-crossborder-launch`

*选市场 → 选平台 → listing → 种草 → 直播* · Take a Chinese product to an overseas marketplace: market choice, platform playbook, the listing, then the content that sells it.

`chuhai-market-entry` → `crossborder-platform-playbook` → `cross-border-listing` → `xiaohongshu-note` → `livestream-sales-script`

1. **chuhai-market-entry** → produces a market-entry brief: which market first, why, and the risks.
2. **crossborder-platform-playbook** → produces the platform choice (Temu, TikTok Shop, Amazon) and how to enter it.
3. **cross-border-listing** → produces a localised listing: title, bullets, description and keywords.
4. **xiaohongshu-note** → produces a 小红书 note built on a real usage story, checked for restricted ad terms.
5. **livestream-sales-script** → produces a livestream script with the pitch, objections and a compliance check.

## 校招拿 offer (campus recruitment) — `/cn-campus-offer`

*规划 → 简历 → 技术面* · Plan the 秋招 or 春招 season, build a bilingual CV for the target companies, and drill the technical interviews.

`cn-campus-recruitment` → `bilingual-cv-zh-en` → `cn-tech-interview-drill`

1. **cn-campus-recruitment** → produces a season plan: timeline, target list, 网申 answers and how to compare offers.
2. **bilingual-cv-zh-en** → produces a Chinese and English CV tailored to those roles.
3. **cn-tech-interview-drill** → produces a technical interview drill: questions by round, model answers and feedback.

---

**Add your own:** define it in [`workflows.json`](workflows.json), add a matching `commands/<id>.md`, and run `node scripts/build-workflows.mjs`. Recipes are just composition — every step is an existing skill you can already run on its own.
