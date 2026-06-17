---
trigger: model_decision
description: "Conduct a structured ethical review of an AI or ML feature, model, or product. Use when preparing to deploy an AI system, assessing algorithmic risk, auditing a model for bias, or producing a responsible AI impact assessment. Produces a structured ethics review covering fairness, transparency, privacy, safety, accountability, and societal impact with a risk tier score, pre-deployment checklist, and prioritised mitigations."
---

# AI Ethics Review Skill

This skill produces a structured ethical review of an AI or machine learning feature, model, or product. Output covers fairness, transparency, privacy, safety, accountability, and societal impact — with risk scoring, prioritised mitigations, and a checklist suitable for governance review or responsible AI documentation.

> ⚠️ This skill provides a structured framework for identifying and documenting ethical risks. It is not a substitute for legal advice, regulated algorithmic impact assessments, or specialist ethics review required in specific jurisdictions (e.g. EU AI Act, UK AI regulation).

## Required Inputs

Ask the user for these if not provided:
- **Feature or model name** and what it does
- **Who it affects** — which users or people does the AI interact with, make decisions about, or collect data from?
- **What decisions or outputs it produces** — recommendations, predictions, classifications, generation, automation?
- **Consequentiality** — how significant are the AI's decisions? (low-stakes suggestions vs decisions that affect employment, credit, health, safety, etc.)
- **Data used** — what training data, user data, or third-party data is used?
- **Human oversight** — is there a human in the loop, and at what stage?
- **Deployment context** — who will use this and how? (internal tool / consumer-facing / automated pipeline)

## Output Structure

---

# AI Ethics Review: [Feature / Model Name]

**Product / system:** [Name and brief description]
**Review type:** [Pre-deployment review / Post-deployment audit / Change review]
**Risk tier:** [High / Medium / Low — based on consequentiality, scale, and affected population]
**Reviewer:** [Name / Team]
**Date:** [Date]
**Status:** [Draft / Approved / Requires escalation]

---

## 1. Feature Summary

| | |
|---|---|
| **What it does** | [1–2 sentences — plain English description of the AI feature and its purpose] |
| **Who uses it** | [End users / internal teams / automated system] |
| **Who is affected by its outputs** | [May be different from who uses it — e.g. an AI hiring tool is used by HR but affects candidates] |
| **Output type** | [Recommendation / Classification / Prediction / Generation / Automation / Scoring] |
| **Scale** | [How many people affected per day/month?] |
| **Consequentiality** | [High: affects access to services, employment, credit, health, safety / Medium: influences decisions / Low: suggestions with easy override] |
| **Human oversight level** | [Full automation / Human review before action / Human can override after action / Advisory only] |

---

## 2. Risk Tier Assessment

| Factor | Score (1–3) | Rationale |
|---|---|---|
| **Consequentiality** (impact on individuals) | [1=low, 3=high] | [e.g. 3 — model output influences hiring decisions] |
| **Scale** (number of people affected) | [1=few, 3=many] | [e.g. 2 — internal tool used for ~500 candidates/year] |
| **Reversibility** (can harm be undone?) | [1=reversible, 3=irreversible] | [e.g. 2 — unfair rejection can be appealed but may not be caught] |
| **Vulnerability of affected group** | [1=general population, 3=protected or vulnerable group] | [e.g. 2 — includes protected characteristics in the decision context] |
| **Transparency** (do affected people know?) | [1=informed, 3=opaque] | [e.g. 3 — candidates are not told AI is used in screening] |

**Composite risk tier:** [High (12–15) / Medium (7–11) / Low (3–6)]

**Risk tier implications:**
- **High:** Mandatory senior ethics review, DPA/DPIA required, human-in-loop for all consequential decisions, ongoing monitoring required
- **Medium:** Ethics review recommended, document mitigations, quarterly monitoring
- **Low:** Standard review, document assumptions, annual review

---

## 3. Fairness & Bias

*Does the AI treat people equitably across groups?*

**Protected characteristics relevant to this feature:**
[List applicable protected characteristics — age, gender, race/ethnicity, disability, religion, national origin, etc.]

| Risk | Analysis | Mitigation |
|---|---|---|
| **Training data bias** | [Does the training data reflect historical discrimination? e.g. hiring data that reflects past biases in who was hired] | [Audit training data for demographic representation / use debiasing techniques / document data lineage] |
| **Proxy discrimination** | [Could the model use a proxy for a protected characteristic? e.g. using postcode as a proxy for race] | [Identify proxy features / test for disparate impact using adversarial debiasing] |
| **Differential performance** | [Does the model perform differently across demographic groups? — e.g. lower accuracy for underrepresented groups] | [Disaggregate performance metrics by group / set minimum performance thresholds per group] |
| **Feedback loops** | [Does the model's output reinforce existing disparities? e.g. recommending content that keeps disadvantaged groups in lower-engagement patterns] | [Monitor outcome distributions over time / implement feedback loop detection] |

**Fairness evaluation method:** [What method will be used to measure fairness — statistical parity / equalised odds / individual fairness? Who is responsible for running it and how often?]

---

## 4. Transparency & Explainability

*Can affected people understand how the AI makes decisions?*

| Dimension | Current state | Required state | Gap |
|---|---|---|---|
| **User disclosure** | [Are users told they're interacting with AI?] | [Yes — required for trust and regulation] | [e.g. No disclosure on current UI] |
| **Decision explanation** | [Can the system explain why it reached a conclusion?] | [For high-stakes decisions: yes] | [e.g. Black-box model — no feature attribution available] |
| **Right to know** | [Can affected people ask how a decision was made?] | [Yes — required under GDPR Art. 22 for automated decisions] | [e.g. No process exists] |
| **Confidence calibration** | [Does the model express appropriate uncertainty?] | [Yes — overconfident models cause over-reliance] | [e.g. Model outputs binary label without confidence score] |

**Explainability approach:** [LIME / SHAP / rule-based surrogate / LLM-generated rationale / none — and why]

---

## 5. Privacy & Data

*Is personal data used responsibly and lawfully?*

| Risk | Analysis | Mitigation |
|---|---|---|
| **Data minimisation** | [Does the model use more personal data than necessary?] | [Audit input features — remove any that don't improve performance and involve unnecessary data collection] |
| **Data retention** | [How long is personal data retained for training and inference?] | [Define retention policy aligned to GDPR / CCPA / sector requirements] |
| **Re-identification risk** | [Could model outputs or training data be used to identify individuals?] | [Differential privacy / k-anonymity / output rate limiting] |
| **Third-party data** | [Is data from third parties used? Is it licensed for this use?] | [Audit data licensing / get legal sign-off on each third-party source] |
| **Cross-border data transfer** | [Is personal data transferred across jurisdictions?] | [Legal review — Standard Contractual Clauses or equivalent] |

**DPIA required?** [Yes / No / Uncertain — for High tier or whenever processing is likely to result in high risk to individuals under GDPR Art. 35]

---

## 6. Safety & Reliability

*What happens when the AI gets it wrong?*

| Failure mode | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **False positives** | [H/M/L] | [e.g. Flagging a legitimate transaction as fraud — customer locked out] | [Set threshold conservatively; human review for edge cases] |
| **False negatives** | [H/M/L] | [e.g. Missing a real fraud case — financial loss] | [Monitor false negative rate; set minimum recall threshold] |
| **Out-of-distribution inputs** | [H/M/L] | [Model behaves unpredictably on inputs outside training distribution] | [Input validation; confidence thresholding — route uncertain inputs to human review] |
| **Model degradation** | [M] | [Performance degrades as data distributions shift post-deployment] | [Scheduled performance monitoring; drift detection alerts] |
| **Adversarial inputs** | [L/M] | [Deliberate manipulation of inputs to game the model] | [Adversarial testing; rate limiting; anomaly detection on inputs] |
| **Single point of failure** | [L/M] | [Model outage causes downstream system failure] | [Graceful degradation — define fallback behaviour when model is unavailable] |

**Fallback behaviour:** [What happens if the AI is unavailable or returns low-confidence output? — e.g. route to human review / use rule-based fallback / block the action]

---

## 7. Accountability & Governance

*Who is responsible when things go wrong?*

| Question | Answer |
|---|---|
| **Who owns this AI feature?** | [Team or individual with end-to-end accountability] |
| **Who approved deployment?** | [Name and role — must be documented] |
| **Who is responsible for ongoing monitoring?** | [Team and cadence] |
| **Who can shut it down?** | [Who has kill-switch authority and under what conditions?] |
| **How are incidents reported?** | [Internal escalation path + external disclosure process if required] |
| **Is this subject to regulation?** | [EU AI Act / UK AI regulation / sector-specific rules — FINRA, FDA, FCA, etc.] |

**Incident response plan:** [Link to or describe what happens if the model causes harm — detection, escalation, remediation, disclosure]

---

## 8. Societal Impact

*Beyond individual users — what are the broader effects?*

| Impact area | Risk | Mitigation |
|---|---|---|
| **Labour displacement** | [Does this AI automate tasks that currently employ people?] | [Transition plan / human-AI collaboration framing / skills retraining commitment] |
| **Environmental impact** | [What is the carbon cost of training and inference?] | [Measure and offset; prefer efficient architectures; use renewable-energy infrastructure where possible] |
| **Power concentration** | [Does this AI give the deploying organisation disproportionate power over individuals?] | [Ensure right to opt out; avoid lock-in; consider open alternatives] |
| **Information ecosystem** | [Could this AI contribute to misinformation, filter bubbles, or manipulation?] | [Provenance labelling / content policies / algorithmic diversity requirements] |

---

## 9. Mitigation Priorities

| # | Risk | Severity | Action | Owner | Deadline |
|---|---|---|---|---|---|
| 1 | [Highest risk — e.g. No disclosure to affected candidates] | Critical | [Add AI disclosure to UI and candidate-facing documentation] | [PM + Legal] | [Before launch] |
| 2 | [e.g. No fairness evaluation across demographic groups] | High | [Commission third-party fairness audit using [method]] | [ML team + external auditor] | [Within 30 days of launch] |
| 3 | [e.g. No model monitoring in place] | High | [Deploy performance and drift monitoring dashboard] | [ML Ops] | [Launch day] |
| 4 | [e.g. DPIA not completed] | High | [Complete DPIA with DPO before deployment] | [Legal / DPO] | [Before launch] |

---

## 10. Pre-Deployment Checklist

- [ ] Ethics review completed and approved by required reviewers
- [ ] DPIA completed (if required)
- [ ] Fairness evaluation completed and results documented
- [ ] AI disclosure is in place wherever required
- [ ] Human oversight mechanism is defined and tested
- [ ] Kill-switch and escalation path is documented and tested
- [ ] Model monitoring is deployed and alerting is configured
- [ ] Data lineage and training data audit documented
- [ ] Legal sign-off obtained on data licensing and cross-border transfers
- [ ] Incident response plan in place

---

## Quality Checks

- [ ] "Who is affected" includes people the AI makes decisions *about*, not just who uses the product
- [ ] Fairness analysis names specific protected characteristics, not just "diverse groups"
- [ ] Safety section covers both false positive and false negative failure modes
- [ ] Accountability section names real people, not teams or roles
- [ ] Mitigations are specific and time-bound — not "monitor and review"

## Anti-Patterns

- [ ] Do not limit the affected-population analysis to users of the product — AI that makes decisions about people (hiring, credit, content moderation) affects non-users who have no opt-out
- [ ] Do not accept "we will monitor" as a mitigation without specifying what is monitored, at what threshold, and who acts
- [ ] Do not assign fairness analysis to the model team alone — protected characteristic analysis requires input from legal, HR, or a subject-matter expert
- [ ] Do not defer the DPIA to post-launch — for high-risk tier systems, a DPIA is a pre-requisite for lawful deployment under GDPR
- [ ] Do not conflate statistical accuracy with fairness — a model can be 95% accurate overall while performing significantly worse for a protected group

## Example Trigger Phrases

- "Run an AI ethics review for [feature]"
- "Conduct an ethical impact assessment for our new ML model"
- "Review the AI risks for our hiring / credit / recommendation system"
- "Build a responsible AI checklist for our product"
- "What are the ethical risks of using AI for [use case]?"
