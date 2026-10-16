---
name: agent-readiness-audit
description: "Audit whether AI agents can actually use your product — docs, APIs, onboarding, errors, and discoverability, evaluated from a non-human user's perspective. Use when asked if a product is agent-ready, to audit a site or API for AI usability, to prepare for agentic traffic, or when agents keep failing against your product. Produces a scored readiness report with per-surface findings and a prioritised fix list. For optimising a single article for AI citation use aeo-optimizer; for designing the MCP server itself use mcp-server-spec."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agent-readiness-audit.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Agent Readiness Audit Skill

A growing share of your product's users aren't human: agents research it, evaluate it, onboard onto it, and operate it on their principals' behalf. They can't watch your demo video, guess what an unlabeled icon means, or call support. This skill audits every surface an agent touches and scores how much of your product is invisible or unusable to them.

## What This Skill Produces

- A **readiness score by surface** (discovery, docs, API/auth, errors, onboarding, transactions)
- **Per-surface findings** with the failing artifact quoted and the fix
- A **prioritised fix list** ranked by agent-traffic impact vs effort
- A **re-test protocol** so readiness is measured, not vibed

## Required Inputs

Ask for (if not already provided):
- **The product** and its public surfaces (site, docs URL, API reference, status page)
- **What agents will be asked to do** with it — research/compare? sign up? operate it daily?
- **What exists already**: llms.txt? MCP server? OpenAPI spec? If unknown, the audit checks
- **Any observed agent failures** (the best audit seed there is)

## The Audit Surfaces

Walk each surface asking one question: *could a capable agent, starting cold, complete its job here without a human unblocking it?*

**1. Discovery — can agents find and understand what you are?**
`llms.txt` present and current · docs fetchable as clean markdown/text (not JS-rendered walls) · pricing and limits stated in prose an agent can quote · comparison-relevant facts (SOC 2, SSO, data residency) written down anywhere at all — an agent can't infer what you never wrote.

**2. Docs — written for readers who execute?**
Every task documented as copy-runnable steps with expected outputs · code samples that actually run (agents execute them verbatim) · one canonical way per task (agents can't arbitrate between three contradictory tutorials) · error-message strings from the product appearing verbatim in the docs so search-by-error works.

**3. API & auth — self-serve without a human?**
Key/token obtainable without a sales call (or the agent path is documented honestly) · OpenAPI spec accurate to the deployed API · rate limits discoverable programmatically · an MCP server, or at least a stated position on one.

**4. Errors — instructive to a retrying machine?**
Errors name the field and the fix · machine-readable codes stable across releases · 4xx vs 5xx used honestly (agents branch on this) · no CAPTCHAs on API-adjacent flows without a documented alternative.

**5. Onboarding & transactions — can an agent complete them?**
Signup/checkout completable without image CAPTCHAs, drag-widgets, or SMS-only verification (or agent-appropriate alternatives exist) · forms with real labels, not placeholder-only · the confirmation state readable as text.

**6. Guardrails — do you *know* your agent traffic?**
Are agents distinguishable in analytics? Is there a stated policy (terms + technical) for agent use — welcome, gated, or forbidden? Silence is a decision made by accident.

Score each surface 0-4: 0 = actively hostile · 2 = humans-only assumptions throughout · 4 = agent-native. Cite the failing artifact for anything below 3.

## Output Format

### Agent Readiness Audit: [product] — [n]/24

| Surface | Score /4 | Sharpest finding |
|---|---|---|

**Findings** *(per surface, worst first)*
**[surface] — [score]**: [what fails, with the artifact quoted] → **Fix:** [specific change]

**Fix list, prioritised:**
| # | Fix | Surface | Impact | Effort |
|---|---|---|---|---|

**Re-test protocol:** [5-8 cold-start agent tasks ("sign up and send one API request", "find whether SSO is on the cheap plan") — run them with a real agent after fixes; the score is the pass rate, not the checklist]

## Quality Checks

- [ ] Every score below 3 cites the actual failing artifact (URL, error string, form field), not a vibe
- [ ] Fixes are specific changes, not "improve the docs"
- [ ] The audit distinguishes *unwritten* facts (agent can't know) from *buried* facts (agent might find)
- [ ] The fix list is ranked by agent-traffic impact, and states assumptions where traffic is unmeasured
- [ ] The re-test protocol exists — readiness is a pass rate, not an opinion

## Anti-Patterns

- [ ] Do not audit from memory of the product — fetch the actual surfaces; they've changed
- [ ] Do not treat "we have great docs" as evidence — great-for-humans routinely scores 1/4 for agents
- [ ] Do not recommend blocking agents as a fix unless the business genuinely wants that — then say it in terms *and* technically, consistently
- [ ] Do not conflate this with SEO/AEO — being quotable is surface 1; being *usable* is the other five
- [ ] Do not skip the guardrails surface — unmeasured agent traffic is how products discover this problem in an outage

## Example Trigger Phrases

- "If a product is agent-ready."
- "Audit a site or API for AI usability."
- "Prepare for agentic traffic."
