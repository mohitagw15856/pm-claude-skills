---
name: cn-8d-report
description: "Use when asked 写8D报告, 客户投诉8D, 质量问题8D, 客诉回复报告, 8D 怎么写, 根本原因分析报告, or write an 8D problem-solving report for a customer complaint or internal quality issue in a Chinese factory. Produces a bilingual (Chinese and English) 8D report from D0 to D8 with the problem described by 5W2H, dated containment actions and suspect-stock quantities, root cause for both occurrence and escape (流出) with 5 Why and fishbone evidence, verified corrective actions, prevention through updated PFMEA, control plan and SOP, and closure criteria, in the format customers expect."
version: 1.0.0
---

# 8D Report (8D 报告)

When a customer, often an automotive or electronics OEM, sends a complaint, the supplier is expected to reply with an 8D report: containment within 24 hours, root cause and corrective action within days, and closure with evidence. Many 8D reports fail the customer's review because the problem statement is vague, the root cause is "operator carelessness" (操作员疏忽), or the corrective action is "加强培训". This skill writes an 8D that would pass a demanding customer quality engineer.

Write in Simplified Chinese with an English version of each section (customers outside China usually require English), unless asked otherwise. Customer-specific requirements (CSR), for example a required template, response times or IATF 16949 expectations, take precedence; anything assumed is marked 需核实. For analysing a batch of field returns across failure modes, use `rma-failure-analysis`; this skill is for one problem, written up for a customer.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **The complaint**: customer, part number, defect description, quantity, where and when found, photos or measurements, the customer's deadline and template
- **Production facts**: lot or date codes, process flow, line, shift, equipment, materials and suppliers involved
- **What is known so far**: containment done, inspection results of stock (in the plant, in transit, at the customer), any changes (4M: 人, 机, 料, 法, plus 环 and 测) around the time
- **Analysis done**: tests, comparisons of good and bad parts, reproduction attempts
- **Team**: names and roles

## Output Structure

### D0 准备 / Preparation
Whether an emergency response is needed, and the decision to open an 8D.

### D1 小组 / Team
| 姓名 | 部门 | 角色 | Name, department, role |
A champion, a leader, and members from quality, production, engineering and, where relevant, the supplier.

### D2 问题描述 / Problem description (5W2H)
What, where, when, who found it, why it is a problem, how it was found, how many; with the specification versus actual and photos referenced. One clear problem statement.

### D3 临时措施 / Containment (dated)
| 位置 | 数量 | 检查方法 | 结果 | 负责人 | 完成日期 |
Suspect stock at the customer, in transit, in the warehouse and in WIP; sorting method; how good parts are marked (for example a clean-point label from a stated date or lot); the effectiveness check.

### D4 根本原因 / Root cause
Two causes, each with evidence:
- **发生原因 (occurrence)**: why the defect was made
- **流出原因 (escape)**: why it was not detected
Use a fishbone (人机料法环测) to list candidates and 5 Why to drill down, with each step backed by data; label each cause 已验证 (verified, for example by reproducing the defect) or 假设 (hypothesis). "Operator error" is not accepted as a root cause without asking why the process allowed it.

### D5 永久纠正措施 / Permanent corrective actions
For each root cause, the chosen action, why it addresses the cause, and how it was verified before full implementation. Prefer error-proofing (防错, poka-yoke) and design or process changes over training and inspection.

### D6 实施与验证 / Implementation and validation
| 措施 | 负责人 | 完成日期 | 验证方法 | 结果 |
Cut-in point (date, lot or serial), and data showing the defect has stopped.

### D7 预防再发 / Prevent recurrence
Updated documents: PFMEA, control plan, SOP (see `cn-sop-writer`), inspection standards, and lessons applied to similar parts and lines (横向展开).

### D8 结案 / Closure
Closure criteria (for example no recurrence over three months or a set number of lots), team recognition, and the customer's sign-off.

## Quality Checks

- [ ] The D2 statement is specific: part, defect, quantity, specification versus actual
- [ ] Containment covers every location of suspect stock, with quantities and dates
- [ ] Both occurrence and escape root causes are given, with evidence and verified or hypothesis labels
- [ ] Corrective actions address the root causes and favour error-proofing over training
- [ ] PFMEA, control plan and SOP updates are named in D7
- [ ] Chinese and English versions match, and customer-specific requirements are noted

## Anti-Patterns

- **"员工疏忽" as root cause.** Ask why the process let a person make or miss the error.
- **"加强培训" as the corrective action.** Training fades; change the process or add error-proofing.
- **Containment without quantities.** The customer wants to know exactly how much stock was checked.
- **One root cause only.** Without the escape cause, the next defect will also reach the customer.
- **Closing without data.** Show the defect has stopped.

## Example Trigger Phrases

- "客户投诉我们的注塑件有缩痕，批量 2000 件，要我们三天内回 8D，帮我写。"
- "8D 里根本原因写操作员疏忽被客户退回了，怎么改？"
- "帮我把这个客诉整理成中英文 8D 报告。"
- "D3 临时措施要写哪些内容？"
- "Write an 8D report for a customer complaint about a dimension defect."
