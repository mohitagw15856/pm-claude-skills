---
name: cn-labour-contract-decoder
description: "Decode a mainland China labour contract (劳动合同) before signing: probation, pay and its structure, working hours, social insurance, non-compete and confidentiality, termination terms and anything that conflicts with the Labour Contract Law. Use when asked 帮我看看劳动合同, 劳动合同有什么坑, 试用期合法吗, 竞业限制条款, or review my Chinese employment contract. Produces a clause-by-clause decode with red, amber and green flags, the statutory limits each clause must respect, the questions to ask HR, and suggested wording for changes. Not legal advice."
version: 1.0.0
---

# China Labour Contract Decoder (劳动合同)

A labour contract in mainland China is read once, quickly, on the first day. Some clauses that look standard are unenforceable, and some that look harmless cost real money later: an over-long probation, a pay structure that shrinks the base used for overtime and severance, a non-compete with no compensation. This skill decodes the contract against the statutory limits and suggests what to ask.

Write the output in Simplified Chinese unless asked otherwise.

## What This Skill Produces

- **A clause-by-clause decode** with 🔴🟡🟢 flags
- **The statutory limit** each key clause must respect
- **Questions to ask HR**, in polite, specific wording
- **Suggested changes** where a clause should be amended

## Required Inputs

Ask for these if not provided:
- **The contract text**, and any employee handbook or offer letter it refers to
- **The offer as understood**: salary, bonus, title, location
- **City of the workplace**, since minimum wage and some rules are local
- **Contract type**: fixed term (and length), open-ended, or project-based

## Framework: What to Check

| Area | What the law sets | Flag when |
|---|---|---|
| Probation (试用期) | Contract under 3 months: none. 3 months to under 1 year: at most 1 month. 1 to under 3 years: at most 2 months. 3 years or more, or open-ended: at most 6 months. Only once per employer (Art. 19) | Longer than allowed, or a second probation |
| Probation pay | At least 80% of the contract wage or the lowest wage for the same post, and not below local minimum wage (Art. 20) | Lower |
| Pay structure | Base, allowances and bonus | A very low base with the rest as "discretionary" bonus; it lowers overtime and compensation bases |
| Working hours | Standard hours, or an approved comprehensive or flexible hours system | A special hours system with no approval mentioned |
| Social insurance and housing fund | Mandatory, on the actual wage | Paid on a lower base, or "voluntarily waived" |
| Non-compete (竞业限制) | Only for senior staff, technical staff and others with confidentiality duties; at most 2 years after leaving; monthly compensation payable during it (Art. 23, 24) | No compensation stated, too broad, or applied to a junior role |
| Training service period | Penalty only for special professional training paid by the employer, capped at the training cost (Art. 22) | Penalty for ordinary training, or not capped |
| Penalties (违约金) | Allowed only for service period and non-compete breaches (Art. 25) | Any other penalty on the employee |
| Termination | As the Labour Contract Law sets | Clauses letting the employer end it at will, or forcing resignation |
| Workplace and role | Stated | Clauses letting the employer change them unilaterally |

## Output Format

### 劳动合同解读：[公司]，[岗位]

**一、总体判断**：一段话，最需要注意的 1 到 3 点。

**二、逐条解读**
| 条款 | 原文要点 | 含义 | 法律底线 | 标记 |

**三、建议询问 HR 的问题**（礼貌、具体）

**四、建议修改的措辞**

End verbatim: *"以上为条款解读，不构成法律意见。如有争议或重大疑问，请咨询当地劳动法律师或劳动仲裁机构。"*

## Quality Checks
- [ ] Probation length is checked against the contract length
- [ ] Pay structure is examined for an artificially low base
- [ ] The non-compete clause, if any, is checked for scope, duration and compensation
- [ ] Every 🔴 flag cites the article it conflicts with
- [ ] The disclaimer appears verbatim

## Anti-Patterns
- **Calling every unusual clause illegal.** Many are lawful and simply unfavourable; say which.
- **Ignoring the handbook** the contract incorporates.
- **Advising not to sign.** Decode, flag and suggest questions; the person decides.
- **Assuming national rules cover everything.** Some details are local; say so.

## Example Trigger Phrases
- "帮我看看这份劳动合同有没有坑。"
- "三年合同试用期六个月，合法吗？"
- "合同里有竞业限制但没写补偿，怎么办？"
- "Review my Chinese employment contract before I sign."
