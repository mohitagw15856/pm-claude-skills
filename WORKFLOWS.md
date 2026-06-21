# 🧩 Workflow Recipes

> **Skills you can chain.** A recipe runs several skills in sequence and *passes each output forward as context* for the next — so a fuzzy idea comes out the other end as a finished, joined-up set of artifacts. No other skills library chains across professions like this.

Run one as a slash command in Claude Code (e.g. `/ship-a-feature a referral program for B2B users`), or fetch it over MCP with the `get_workflow` tool.

<!-- Generated from workflows.json by scripts/build-workflows.mjs — do not edit by hand. -->

There are **6 recipes** today:

| Recipe | Command | Lifecycle | Chains |
|--------|---------|-----------|--------|
| **Ship a Feature** | `/ship-a-feature` | Discover → Decide → Build → Ship | 5 skills |
| **Close the Quarter** | `/close-the-quarter` | Measure → Communicate | 4 skills |
| **Launch a Product** | `/launch-a-product` | Decide → Ship | 5 skills |
| **Rescue an Account** | `/rescue-an-account` | Measure → Communicate | 4 skills |
| **Run Discovery** | `/run-discovery` | Discover → Decide | 4 skills |
| **Repurpose Content** | `/repurpose` | One source → many platforms | 3 skills |

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

---

**Add your own:** define it in [`workflows.json`](workflows.json), add a matching `commands/<id>.md`, and run `node scripts/build-workflows.mjs`. Recipes are just composition — every step is an existing skill you can already run on its own.
