---
name: cn-mlps-checklist
description: "Use when asked 等保怎么做, 等保 2.0 定级, 等保备案和测评流程, 等保三级要求, 我们的系统需要过等保吗, or prepare an information system for China's Multi-Level Protection Scheme (MLPS 2.0, 网络安全等级保护). Produces a grading recommendation (定级) with the reasoning for the expert review, the filing (备案) and assessment (测评) steps and their usual timing, a gap checklist across the ten control areas of GB/T 22239-2019, and a remediation plan, marked as preparation for a licensed assessor."
version: 1.0.0
---

# MLPS 2.0 Checklist (等保 2.0)

China's Cybersecurity Law requires network operators to protect their systems under the Multi-Level Protection Scheme. In practice that means grading each system, filing with the public security bureau for level two and above, passing an assessment by a licensed body (测评机构), and fixing what it finds. Teams lose months by grading wrongly or arriving at the assessment with gaps they could have closed. This skill prepares the grading argument, the filing, and the gap list before the assessor arrives.

Write in Simplified Chinese unless asked otherwise. This is preparation, not certification: grading is confirmed through expert review and the public security bureau, and only a licensed assessor can assess. Check current requirements with the local 网安部门 and the assessor.

## Required Inputs

Ask for these if not provided:
- **The system**: what it does, users, data it holds (including personal and important data), and whether it serves the public
- **Impact if compromised**: on individuals, organisations, social order or national security, and how severe
- **Architecture**: hosting (own data centre or cloud, and the cloud's own MLPS level), network zones, key components
- **Existing controls and policies**, and any previous assessment reports
- **Deadline** driving the work (a tender, a regulator, a customer)

## Output Structure

### 1. Grading (定级)
The recommended level (1 to 5; most business systems land at 2 or 3) with the reasoning on the two factors the standard uses: the object harmed and the degree of harm, separately for business information security and system service security. Written as the 定级报告 argument for expert review.

### 2. Filing and assessment steps
| Step | Who | Typical timing (confirm) |
定级 and expert review, 备案 with the local public security bureau (for level two and above, usually within 30 days of grading), choosing a licensed assessor, assessment, remediation, and re-assessment (level three systems are typically assessed every year).

### 3. Gap checklist
Across the ten control areas of GB/T 22239-2019, at the recommended level:
- Technical: 安全物理环境, 安全通信网络, 安全区域边界, 安全计算环境, 安全管理中心
- Management: 安全管理制度, 安全管理机构, 安全管理人员, 安全建设管理, 安全运维管理
| Area | Requirement | Current state | Gap | Fix | Owner |

### 4. Remediation plan
Gaps ordered by assessment risk and effort, with owners and dates that finish before the assessment.

## Quality Checks

- [ ] The recommended level states the object harmed and the degree of harm for both security aspects
- [ ] Filing applies to level two and above and is shown with its timing marked to confirm
- [ ] The gap checklist covers all ten control areas
- [ ] Every gap has a fix, an owner and a date
- [ ] Cloud-hosted systems separate the provider's controls from the operator's
- [ ] The output states that only a licensed assessor can assess

## Anti-Patterns

- **Grading low to save cost.** Expert review and the bureau can raise it, late.
- **Policies on paper only.** Assessors check evidence of operation, such as logs and records.
- **Assuming the cloud covers everything.** The operator still owns its own layer.
- **Starting remediation after the assessment begins.** Close the obvious gaps first.

## Example Trigger Phrases

- "我们的 SaaS 系统要过等保三级，帮我梳理差距。"
- "等保定级怎么写理由？二级还是三级？"
- "等保备案和测评的流程是什么？"
- "Prepare our system for China's MLPS 2.0 assessment."
