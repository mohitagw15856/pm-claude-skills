---
name: cn-pipl-pia
description: "Use when asked 个人信息保护影响评估怎么做, 写一份 PIA, 处理敏感个人信息要评估吗, 自动化决策评估, PIPL 第五十五条, or assess a processing activity under China's Personal Information Protection Law. Produces a personal information protection impact assessment (个人信息保护影响评估) covering the PIPL Article 55 triggers, the Article 56 questions (lawful, legitimate and necessary; impact and risk; adequacy of protection), a risk register with mitigations and owners, and a record kept for at least three years."
version: 1.0.0
---

# PIPL Impact Assessment (个人信息保护影响评估)

China's Personal Information Protection Law requires a prior impact assessment before certain processing: handling sensitive personal information, automated decision-making, entrusting processing or providing data to others, making it public, transferring it abroad, and other processing with a significant impact. The assessment must answer three questions set by Article 56, and the record must be kept for at least three years. This skill writes that assessment for one processing activity.

Write in Simplified Chinese unless asked otherwise. National standards such as GB/T 39335 give more detailed methods, and regulators may expect them; confirm with counsel. This is a working document, not legal advice.

## Required Inputs

Ask for these if not provided:
- **The processing activity**: purpose, data subjects, data items, sources, systems, retention
- **Which triggers apply**: sensitive personal information (including that of minors under 14), automated decisions, entrusting or sharing, publication, cross-border transfer
- **Legal basis** under PIPL Article 13 (consent, contract, legal duty and others) and how consent is obtained where needed
- **Recipients**, processors and their contracts
- **Existing security measures**

## Output Structure

### 1. Scope and triggers
The activity, and which PIPL Article 55 triggers apply, each with the reason.

### 2. Article 56 assessment
- **合法、正当、必要**: legal basis for each data item; whether each item is needed for the purpose; whether a less intrusive option exists
- **对个人权益的影响及安全风险**: harms to individuals (discrimination, financial loss, reputational harm, physical risk), likelihood and severity
- **保护措施是否合法、有效并与风险程度相适应**: notices, separate consent where required, access control, encryption, de-identification, processor contracts, rights handling, incident response

### 3. Risk register
| Risk | Affected people | Likelihood | Severity | Mitigation | Owner | Residual risk |

### 4. Conclusion and sign-off
Proceed, proceed with conditions, or do not proceed; the conditions; reviewers; date; and the retention note (keep the assessment and processing records for at least three years).

## Quality Checks

- [ ] Every applicable Article 55 trigger is identified with its reason
- [ ] Each data item has a legal basis and a necessity argument
- [ ] Harms are assessed for individuals, not only for the company
- [ ] Every risk has a mitigation, an owner and a residual rating
- [ ] Separate consent is addressed for sensitive information, sharing, publication and export where required
- [ ] The record states it must be kept for at least three years

## Anti-Patterns

- **Assessing after launch.** The law requires the assessment before processing.
- **Company risk instead of personal risk.** The focus is harm to the individual.
- **"All data is necessary".** Each item needs its own justification.
- **A template with the blanks filled.** Assessors look for reasoning specific to the activity.

## Example Trigger Phrases

- "我们要上线人脸识别考勤，帮我写个人信息保护影响评估。"
- "用算法给用户定价，需要做 PIA 吗？怎么写？"
- "把用户数据委托给外包客服，影响评估要写哪些内容？"
- "Write a PIPL impact assessment for our recommendation engine."
