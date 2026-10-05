---
name: cn-medical-insurance-claim
description: "Use when asked 医保怎么报销, 异地就医怎么备案, 住院能报多少, 门诊报销比例, 手工报销要什么材料, 惠民保值不值得买, or work out what China's basic medical insurance (医保) will pay for a treatment. Produces the person's scheme (职工医保 or 居民医保), how a claim works for this case (direct settlement or manual reimbursement), an out-of-pocket estimate built from the city's own deductible, rate and cap, the cross-region registration (异地就医备案) steps, and the documents to keep."
version: 1.0.0
---

# Medical Insurance Claims (医保报销)

China's basic medical insurance pays a share of most treatment, but how much depends on the scheme, the city, the hospital level, inpatient or outpatient care, and whether the treatment happens away from the insured city. People overpay by not registering for cross-region care before going, or by losing receipts needed for manual claims. This skill explains how a claim works for the person's case and estimates what they will pay from the city's own figures.

Write in Simplified Chinese. Deductibles (起付线), rates and caps (封顶线) are set locally and change each year; use the figures from the local 医保局 or the 国家医保服务平台 app, and treat the estimate as a guide, not a quote.

## Required Inputs

Ask for these if not provided:
- **Insured city** and **scheme**: 职工医保 (through an employer) or 城乡居民医保
- **Treatment**: inpatient or outpatient, condition, expected cost, hospital and its level
- **Where** the treatment happens: the insured city or another city (and whether they live there or are visiting)
- **The city's figures** for deductible, reimbursement rate and cap, if the person has them
- **Supplementary cover**: 大病保险, 惠民保, commercial insurance, employer plans

## Output Structure

### 1. How this claim works
Direct settlement at the hospital (就医直接结算) or manual reimbursement (手工报销) afterwards, and which applies here.

### 2. Cross-region care (if relevant)
How to file 异地就医备案 (for example through the 国家医保服务平台 app or the insured city's channel), the categories (long-term residence, temporary visit, referral) and the effect on the reimbursement rate, all to confirm locally.

### 3. Out-of-pocket estimate
Only from figures the person provides or is directed to:
| Item | Amount | Basis |
Total cost, items not covered (自费项目) and partly covered (乙类先自付), deductible, insured share at the city's rate up to the cap, then 大病保险 or 惠民保 if they apply, and the person's remaining share. Show the calculation; do not invent figures.

### 4. Documents to keep
For manual claims: invoices (发票), itemised bills (费用清单), discharge summary (出院小结), diagnosis, prescriptions, and the claim form; deadlines to confirm.

### 5. Supplementary cover check
Whether 惠民保 or other cover adds anything for this case, judged on its own terms (deductible, covered drugs, exclusions), without recommending a product.

### 6. 长辈版 (optional, when the claim is for or by an older person)
When the person asks for it, or is helping a parent, add a version the older person can follow alone: one action per step numbered 第一步, 第二步 (no more than eight), short sentences, no jargon (say what to bring and which window or app button, not 直接结算 or 备案 without a plain explanation), and a last line: 有不明白的，先别签字、别付钱，打电话给 [家人] 或 12393 医保服务热线 (需核实). For the wider errand, see `cn-help-parents-admin`.

## Quality Checks

- [ ] The scheme and settlement method are identified for this case
- [ ] Cross-region registration is covered whenever treatment is outside the insured city
- [ ] The estimate uses only figures the person supplied or was directed to, with the calculation shown
- [ ] Uncovered and partly covered items are separated before applying the rate
- [ ] Every local figure and deadline is marked to confirm with the 医保局
- [ ] No insurance product is recommended
- [ ] If a 长辈版 is included, it uses one action per step, plain words and a call-for-help line

## Anti-Patterns

- **Going to another city without filing 异地就医备案.** It can cut the reimbursement sharply.
- **Applying the rate to the whole bill.** Uncovered items come off first.
- **Throwing away receipts.** Manual claims fail without them.
- **National averages.** Every city sets its own deductible, rate and cap.

## Example Trigger Phrases

- "我是北京职工医保，去上海住院，要备案吗？能报多少？"
- "住院花了 5 万，医保大概能报多少？"
- "手工报销需要哪些材料？"
- "How much will China's medical insurance cover for my surgery?"
