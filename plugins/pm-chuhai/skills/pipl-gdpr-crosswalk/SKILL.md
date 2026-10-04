---
name: pipl-gdpr-crosswalk
description: "Compare China's Personal Information Protection Law (PIPL) with the EU GDPR for a specific data flow, and produce the gap list and cross-border transfer path for a company operating in both. Use when asked PIPL vs GDPR, 个人信息保护法和 GDPR 的区别, how do we transfer personal data out of China, our app serves users in China and Europe, or 数据出境 compliance. Produces a requirement crosswalk for the described processing, the transfer mechanism that likely applies in each direction, a prioritised gap list, and the questions to take to counsel. Not legal advice."
version: 1.0.0
---

# PIPL and GDPR Crosswalk

Companies serving users in both China and Europe face two strict regimes that look alike and differ in the details that matter: consent, sensitive data, and above all moving data across borders. This skill maps one described data flow against both, identifies the transfer path, and lists the gaps to close, so the conversation with counsel starts from specifics.

Part of the pm-chuhai bundle. For a general framework checklist, see `compliance-checklist`.

## What This Skill Produces

- **A crosswalk** for the described processing: each requirement under PIPL and GDPR, and what the company must do
- **The transfer path** in each direction (China to abroad, EU to China)
- **A gap list**, prioritised by risk
- **Questions for counsel**

## Required Inputs

Ask for these if not provided:
- **The data flow**: what personal information, about whom, collected where, stored where, accessed from where
- **Volumes**: roughly how many individuals per year, and whether any sensitive information is involved
- **The entities**: where the company and its processors are established
- **The purpose** of processing and the legal basis currently relied on

## Framework

Compare on these points. State each as a general description and mark it "verify current text", because implementing rules change.

| Point | PIPL (China) | GDPR (EU) |
|---|---|---|
| Legal bases | Consent and several other bases (contract, legal duty, emergencies, news reporting, public information, HR management); no general "legitimate interests" basis | Six bases, including legitimate interests |
| Separate consent | Required for sensitive information, transfers abroad, public disclosure, sharing with another handler, and some image or ID uses | Explicit consent for special categories when consent is the basis |
| Sensitive information | Broad, including financial accounts, location tracking, and all data of minors under 14 | Special categories (health, biometrics, beliefs and others) |
| Transfer abroad | One of: CAC security assessment, the standard contract, or certification, depending on volume and data type; a personal information protection impact assessment; separate consent. Exemptions introduced in 2024 for some lower-volume and necessary transfers: verify current thresholds | Adequacy decision, standard contractual clauses with a transfer impact assessment, binding corporate rules, or derogations |
| Local representative | Required for overseas handlers processing data of people in China in scope | Article 27 representative for non-EU controllers in scope |
| Data protection officer | Required above set volume thresholds | Required in defined cases |
| Breach notification | Promptly to the authority and individuals | Within 72 hours to the authority where required |

Then:
1. **Classify the flow**: which data, which direction, which volume band.
2. **Choose the transfer mechanism** for each direction and list its documents.
3. **List gaps**: what the company does today against what each regime requires.
4. **Prioritise** by likelihood of enforcement and harm: transfers and sensitive data first.

## Output Format

### PIPL and GDPR crosswalk: [company], [data flow]
**1. Flow summary** (data, people, locations, volume)
**2. Crosswalk** | Requirement | PIPL | GDPR | What we must do |
**3. Transfer path** | Direction | Mechanism | Documents | Verify |
**4. Gap list** | Gap | Regime | Priority | Fix |
**5. Questions for counsel**

End verbatim: *"This is a structured starting point, not legal advice. Data transfer rules in China and the EU change through implementing regulations; confirm every point with qualified counsel in both jurisdictions."*

## Quality Checks
- [ ] Every row that depends on thresholds or recent rules is marked "verify"
- [ ] The transfer mechanism is identified for each direction separately
- [ ] Sensitive information and minors' data are explicitly checked
- [ ] Gaps are prioritised with transfers and sensitive data first
- [ ] The disclaimer appears verbatim

## Anti-Patterns
- **Treating PIPL as "GDPR in China".** Legal bases and transfer rules differ materially.
- **Quoting volume thresholds as settled.** They have changed; verify.
- **Forgetting the EU to China direction.** It has its own requirements.
- **Giving a compliance verdict.** Map, prioritise and hand to counsel.

## Example Trigger Phrases
- "我们的 App 同时服务中国和欧洲用户，数据出境要怎么做？"
- "Compare PIPL and GDPR for our HR data flow from Shanghai to Dublin."
- "个人信息保护法和 GDPR 有什么关键区别？"
- "What do we need to transfer customer data out of China?"
