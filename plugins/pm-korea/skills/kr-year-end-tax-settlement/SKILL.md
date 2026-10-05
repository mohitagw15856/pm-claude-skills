---
name: kr-year-end-tax-settlement
description: "Use when asked 연말정산 어떻게 해요, 연말정산 간소화 자료 어떻게 제출해, which deductions can I claim in my Korean year-end tax settlement, 부양가족 공제 누구 올려야 해, 맞벌이 연말정산 누가 공제받는 게 유리해, or 13월의 월급 how do I get a bigger refund. Produces the settlement timeline, which 공제 apply to the person's situation and what proves each one, the 홈택스 간소화 steps, what the employer cannot settle and must go to 5월 종합소득세 신고 or 경정청구 instead, and a document checklist."
version: 1.0.0
---

# Korea Year-End Tax Settlement (연말정산)

In Korea the employer withholds income tax from every payslip and settles the year in January and February through 연말정산. Each employee submits deduction evidence, mostly from the 홈택스 연말정산 간소화 서비스, and the result arrives as a refund or an extra deduction on the February or March payslip. Missing a dependant or a receipt means overpaid tax; listing a dependant whose income is too high means a penalty later. This skill tells the person which deductions apply, what proves each one and what to do separately.

Write in Korean unless the person asks for English or Chinese. Deduction amounts, income limits, rates and deadlines are set by 국세청 and change most years; mark every figure to confirm on hometax.go.kr, nts.go.kr or the employer's 연말정산 안내. This is information, not tax advice; for complex cases (several employers, rental or business income, foreign income) suggest a 세무사 or the 국세청 상담센터 (126).

## Required Inputs

Ask for these if not provided:
- **Employment**: one employer all year, a mid-year job change (전 직장 근로소득 원천징수영수증 needed), or left during the year; estimated 총급여
- **Family**: spouse and their income, children and parents with ages and incomes, anyone with a disability, single-parent or 부녀자 status; whether a sibling or spouse is already claiming the same person
- **Spending**: credit and debit card, cash receipts, 전통시장 and 대중교통 use, medical and education costs, 월세, donations
- **Savings and insurance**: 연금저축, IRP, 주택청약종합저축, 보장성 보험료
- **Housing**: 무주택 세대주 or not, 월세 contract, 주택임차차입금 or 장기주택저당차입금 이자
- **Other income**: side income, freelance (3.3%) income, rental income

## Output Structure

### 1. Timeline
| Step | When (confirm this year's dates) | What to do |
간소화 자료 opening in mid-January, the employer's submission deadline, 부양가족 자료제공 동의 for adult family members, the payslip on which the result appears, and the May 종합소득세 신고 window for anything left out.

### 2. Deductions that apply to you
| 공제 | Applies? | Condition (confirm current limit) | Evidence |
인적공제 (기본공제 per person, with the dependant's own income limit and age conditions, 추가공제 for 경로우대, 장애인, 한부모, 부녀자), 신용카드 등 소득공제 (only spending above the threshold share of 총급여 counts; 전통시장 and 대중교통 at higher rates), 의료비, 교육비, 보험료, 연금계좌 (연금저축 and IRP), 월세 세액공제, 주택청약종합저축, 주택자금, 기부금. Mark every rate and cap to confirm.

### 3. 맞벌이 and family allocation
Who should claim each child or parent and the card spending, explained from the rules (for example the threshold for card spending and medical expenses is per earner), with a note that one person cannot be claimed twice.

### 4. 홈택스 간소화 steps
Logging in, 부양가족 자료 동의, downloading the PDF or using the employer's 일괄제공 service, and the items 간소화 often misses (안경 구입비, 교복비, some 월세 and donation receipts, medical costs at some clinics) that need paper receipts.

### 5. What 연말정산 cannot fix
Items to claim later through 5월 종합소득세 확정신고 or a 경정청구 within the deadline (confirm, usually five years): missed deductions, side or freelance income to combine, and leaving the job before year-end without settlement.

### 6. Checklist
| Document | From whom | Where to get it |

## Quality Checks

- [ ] Every amount, rate, income limit and date is marked to confirm with 국세청 or the employer
- [ ] Dependant decisions use the family member's own income and age, and no one is claimed twice
- [ ] Each deduction is tied to the evidence that proves it
- [ ] Items outside 연말정산 point to 종합소득세 신고 or 경정청구
- [ ] The output says it is information, not tax advice

## Anti-Patterns

- **Claiming a parent a sibling already claims.** 국세청 cross-checks; it ends in additional tax and a penalty.
- **Adding a dependant who earned too much.** Check the income limit before ticking the box.
- **Trusting 간소화 as complete.** Glasses, uniforms and some medical or rent costs need separate receipts.
- **Promising a refund figure.** The result depends on tax already withheld; give an estimate range at most.

## Example Trigger Phrases

- "연말정산 처음 해요. 부모님 기본공제 올릴 수 있나요? 아버지 연금 소득이 있어요."
- "맞벌이 부부인데 아이 공제랑 카드 공제 누가 받는 게 유리한가요?"
- "월세 세액공제 받으려면 뭐가 필요해요?"
- "How does year-end tax settlement work in Korea? I changed jobs in July."
