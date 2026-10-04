# Library gaps — 2026-10-01

The [self-growing pipeline](../scripts/mine-gaps.mjs) measured **10** real-world requests against the **1188** skills in the catalog. It found **0** genuinely uncovered and **10** already served.

_Method: lexical (Jaccard token overlap) against each skill's name, title, and description — honest but shallow, so treat this as a shortlist for human judgement, not a verdict._

## 🕳️ Biggest gaps (ranked)
_None — the catalog covers every tracked request._

## ✅ Already covered
- **PRD writing** → `prd-template` (40%)
- **Cold outreach email** → `cold-email` (63%)
- **Incident postmortem** → `incident-postmortem` (25%)
- **Board meeting deck** → `board-deck-narrative` (30%)
- **Reference check script** → `reference-check-script` (31%)
- **Deprecation communication plan** → `deprecation-comms-plan` (20%)
- **RFP response** → `rfp-response` (21%)
- **On-call handoff** → `oncall-handoff` (27%)
- **Usage-based pricing model** → `usage-based-pricing-model` (30%)
- **Community moderation policy** → `community-moderation-policy` (33%)

---
_Seed the request list from GitHub issues labelled `skill-request` (the grow workflow appends them), or edit [data/skill-requests.json](../data/skill-requests.json) directly._
