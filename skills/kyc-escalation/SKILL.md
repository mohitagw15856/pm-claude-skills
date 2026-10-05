---
name: kyc-escalation
description: "Write an internal KYC/AML escalation memo: a factual time-stamped trigger description, customer-profile vs activity mismatch analysis, red-flag taxonomy mapping, outstanding information, and a recommendation with rationale. Use when asked to escalate a KYC alert, document an AML concern, write up unusual-activity findings for compliance review, or prepare an enhanced due diligence referral. Produces a structured internal escalation memo for a compliance team's decision-makers."
---

# KYC Escalation Skill

This skill helps compliance teams document internal escalations well: facts separated from inference, red flags mapped to a taxonomy, and a recommendation the MLRO or reporting decision-maker can act on. It documents and escalates — it does not decide, and it does not draft regulatory reports.

**Boundaries — apply these without exception.** Never draft a SAR/STR or its narrative — that is the designated reporting officer's regulated act; this memo is the *internal* input to that decision. Never advise on structuring transactions, avoiding detection, or evading monitoring, for any party. Never include tipping-off risk material — the memo is internal-only; do not draft customer-facing language about the investigation.

## What This Skill Produces

- A factual, time-stamped trigger description
- A profile-vs-activity mismatch analysis (expected vs observed)
- Red flags mapped to a taxonomy, each with its supporting fact
- An "information still needed" list with sources
- A recommendation: clear / enhanced due diligence / exit consideration / refer to reporting decision-maker — with rationale

## Required Inputs

Ask for what's missing; never fabricate transaction details — mark gaps `[not in file]`:

- **Trigger** — the alert, transaction(s), or observation, with dates, amounts, counterparties
- **Customer profile** — KYC file basics: stated occupation/business, expected activity, source of funds/wealth, tenure, risk rating
- **Activity history** — recent pattern for context
- **Prior alerts or escalations** on this customer

## Escalation Framework

**1. Trigger description — facts only.** What was observed, when, in what amounts, involving whom. Time-stamp everything. No adjectives, no inference — "three cash deposits of 9,400–9,800 on consecutive days", not "obvious structuring".

**2. Profile vs activity mismatch.** Two columns: what the KYC file says to expect (business type, turnover, geographies, counterparties, channels) vs what was observed. The mismatch — or its absence — is the analytical core. An alert consistent with a well-documented profile may support "clear"; activity inconsistent with the file is what escalates.

**3. Red-flag taxonomy mapping.** Map observations (never speculation) to categories: **structuring patterns** (amounts near reporting thresholds, split transactions); **rapid movement/pass-through** (in-and-out with no business purpose, layering hops); **third parties** (unexplained payers/payees, funnel patterns); **jurisdiction risk** (high-risk geography exposure inconsistent with profile); **entity opacity** (shell characteristics, nominee patterns, circular ownership); **source-of-funds gaps** (wealth/activity unexplained by the file); **behavioural** (reluctance to provide documents, unusual urgency, threshold awareness); **adverse media / PEP or sanctions proximity** (cite the specific source and date). Each flag cites its fact; list relevant categories checked and *not* present too.

**4. Information still needed.** What would resolve the ambiguity, and its source (customer outreach — flag tipping-off sensitivity for the decision-maker; internal records; registries; screening re-run). Distinguish "needed before any decision" from "needed for EDD".

**5. Recommendation with rationale.** Exactly one of: **clear** (documented, consistent explanation); **enhanced due diligence** (mismatch resolvable with more information); **exit consideration** (risk outside appetite regardless of reporting outcome — note exit timing may need the reporting decision-maker's input first); **refer to reporting decision-maker** (facts that a reasonable person could regard as grounds for suspicion). Two sentences of rationale tying flags to the recommendation.

## Output Format

### KYC escalation memo — INTERNAL: [customer ref / date / analyst]

**1. Trigger** — time-stamped facts.
**2. Customer profile summary** — risk rating, expected activity, tenure.
**3. Profile vs activity** — expected | observed table.
**4. Red flags** — category | observation | source/date. Plus categories checked, not present.
**5. Prior history** — earlier alerts and outcomes.
**6. Information still needed** — item | source | blocking or EDD-stage.
**7. Recommendation & rationale** — one of the four, two-sentence rationale.

End with: *"This memo is analytical support for internal escalation, not a compliance determination. Reporting, exit, and customer-contact decisions rest with your institution's designated decision-makers under its policy and applicable regulation."*

## Quality Checks

- [ ] Trigger section contains zero inference — every claim has a date and amount
- [ ] Facts and analysis are in separate sections; the word "suspicious" appears only, if at all, in the recommendation's rationale
- [ ] Every red flag cites a specific observation; checked-but-absent categories are listed
- [ ] Recommendation is exactly one of the four options with rationale
- [ ] No SAR/report narrative drafted; no customer-facing text included
- [ ] Gaps marked `[not in file]`, never filled in

## Anti-Patterns

- [ ] Do not draft the SAR/STR or its narrative — this memo informs the reporting decision-maker; it is not the report
- [ ] Do not advise anyone on structuring, thresholds, or evading monitoring — including hypothetically
- [ ] Do not state guilt or intent — describe activity and mismatch; suspicion determinations belong to the designated officer
- [ ] Do not include customer-facing language or anything creating tipping-off risk
- [ ] Do not recommend customer outreach without flagging the tipping-off sensitivity for the decision-maker
- [ ] Do not fabricate transaction data to complete a pattern — mark it `[not in file]`

## Example Trigger Phrases

- "Escalate a KYC alert."
- "Document an AML concern."
- "Write up unusual-activity findings for compliance review."
- "Prepare an enhanced due diligence referral."
