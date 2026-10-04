---
name: cn-data-export-assessment
description: "Use when asked 数据出境要申报吗, 数据出境安全评估还是标准合同, 个人信息出境标准合同怎么备案, 我们把数据传到海外总部合规吗, or decide how to transfer data out of mainland China lawfully. Produces a data map of what leaves China, the route that applies (an exemption, the personal information export standard contract, certification, or a CAC security assessment) with the thresholds to confirm, the filing steps, and the documents to prepare, including the personal information protection impact assessment."
version: 1.0.0
---

# Data Export Assessment (数据出境)

Sending data from mainland China to anywhere else, including a parent company's systems abroad, is regulated by the Personal Information Protection Law, the Data Security Law and the Cybersecurity Law, with routes and thresholds set by the Cyberspace Administration of China (CAC). Since the 2024 provisions on promoting and regulating cross-border data flows, many transfers are exempt, while others need a standard contract filing, certification, or a security assessment. This skill maps the data, finds the route, and lists what to prepare.

Write in Simplified Chinese unless asked otherwise. Thresholds and exemptions are set by CAC rules and may change, and free trade zones can publish their own negative lists; confirm with current CAC guidance and counsel. This is preparation, not legal advice.

## Required Inputs

Ask for these if not provided:
- **What data leaves China**: categories, whether it includes personal information, sensitive personal information (敏感个人信息) or important data (重要数据), and volumes since 1 January this year
- **Why**: the business purpose (contract with the individual, cross-border HR management, group IT, analytics, AI training)
- **Who receives it**, where, and how (system access, transfer, cloud)
- **Whether the company is a critical information infrastructure operator (CIIO)**
- **Location**, including any free trade zone

## Output Structure

### 1. Data map
| Data | Category (personal, sensitive, important, other) | Volume this year | Recipient and country | Purpose | Channel |

### 2. Route decision
Walk the rules in order and show the result for each data flow:
1. **Exemptions**: for example transfers necessary to perform a contract with the individual, cross-border HR management under lawful policies, emergencies, or low-volume non-sensitive personal information (thresholds to confirm)
2. **Security assessment** (CAC): typically for important data, CIIOs, or high volumes of personal information or sensitive personal information
3. **Standard contract or certification**: typically for volumes between the exemption and assessment thresholds
State the threshold relied on for each step as "to confirm against current CAC provisions".

### 3. Steps for the chosen route
| Step | Who | Output |
For a standard contract: the personal information protection impact assessment, signing the CAC template contract unchanged, and filing with the provincial CAC within the required period. For an assessment: self-assessment, application, CAC review. For an exemption: the record showing why it applies.

### 4. Documents to prepare
The impact assessment (see `cn-pipl-pia`), notices and separate consent where required, the data map, recipient due diligence, and security measures.

## Quality Checks

- [ ] Every data flow has a category, a volume and a purpose
- [ ] Each flow is walked through exemptions, assessment and standard contract in order
- [ ] Every threshold is marked to confirm against current CAC provisions
- [ ] Sensitive personal information and important data are identified separately
- [ ] The steps for the chosen route include the impact assessment where it is required
- [ ] The output states it is not legal advice

## Anti-Patterns

- **Assuming group-internal transfers are free.** A parent company abroad is still overseas.
- **Counting only this month.** Volumes accumulate from 1 January.
- **Editing the standard contract.** The CAC template must be used as issued; add terms in a separate agreement.
- **Ignoring remote access.** Letting overseas staff view data in China can count as export.

## Example Trigger Phrases

- "我们要把员工数据同步到新加坡总部，需要申报吗？"
- "个人信息出境标准合同怎么备案？"
- "数据出境安全评估的门槛是什么？我们够不够？"
- "Do we need a CAC assessment to send customer data from China to the EU?"
