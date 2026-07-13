# Library gaps — 2026-07-13

The [self-growing pipeline](../scripts/mine-gaps.mjs) measured **10** real-world requests against the **466** skills in the catalog. It found **4** genuinely uncovered and **6** already served.

_Method: lexical (Jaccard token overlap) against each skill's name, title, and description — honest but shallow, so treat this as a shortlist for human judgement, not a verdict._

## 🕳️ Biggest gaps (ranked)
1. **Usage-based pricing model** — _"Model a usage-based pricing scheme with tiers and guardrails against bill shock"_ `demand:5` · nearest: `pricing-calculator` (16%)
2. **On-call handoff** — _"Write a clean end-of-shift on-call handoff so nothing gets dropped"_ `demand:4` · nearest: `oncall-runbook` (10%)
3. **Reference check script** — _"Give me structured questions and a rubric to run a candidate reference check by phone"_ `demand:4` · nearest: `candidate-scorecard` (13%)
4. **Community moderation policy** — _"Draft a moderation policy and escalation ladder for our user community"_ `demand:3` · nearest: `investing-policy-statement` (13%)

## ✅ Already covered
- **PRD writing** → `prd-template` (40%)
- **Cold outreach email** → `cold-email` (63%)
- **Incident postmortem** → `incident-postmortem` (25%)
- **Board meeting deck** → `board-deck-narrative` (30%)
- **Deprecation communication plan** → `layoff-communication` (17%)
- **RFP response** → `rfp-response` (21%)

---
_Seed the request list from GitHub issues labelled `skill-request` (the grow workflow appends them), or edit [data/skill-requests.json](../data/skill-requests.json) directly._
