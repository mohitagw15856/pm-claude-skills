---
name: cn-letter-of-credit-check
description: "Use when asked 信用证审证, 信用证审单, 审核信用证条款, 单证不符点, L/C 软条款, 交单前检查, or check a letter of credit or a set of export documents against it for a Chinese exporter. Produces an L/C term review (dates, amounts, shipment, documents, soft clauses) with what to ask the buyer to amend, and a document-by-document discrepancy checklist (invoice, bill of lading, packing list, insurance, certificate of origin, inspection) with the relevant UCP 600 articles, all marked to confirm with the bank's documentary credit team. Not legal or banking advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-letter-of-credit-check.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Letter of Credit Check (信用证审证与审单)

A letter of credit only protects the exporter if the documents comply. Banks refuse a large share of first presentations for discrepancies (不符点): a misspelt name, a late presentation, a bill of lading that does not say "on board", an insurance amount below 110 per cent. Each discrepancy costs a fee and gives the buyer a chance to refuse or renegotiate. And some L/Cs contain soft clauses (软条款) that make payment depend on the buyer. This skill reviews the L/C when it arrives (审证) and the documents before presentation (审单).

Write in Simplified Chinese with the L/C field references and English terms kept as they appear. References to UCP 600 (the ICC Uniform Customs and Practice for Documentary Credits, 2007 revision) and to ISBP (the ICC's international standard banking practice publication, in the edition the bank applies) are for orientation and are marked 需核实; the L/C's own terms prevail where they modify the rules, and the advising or negotiating bank's documentary credit team has the final view. This is a working checklist, not legal or banking advice.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **The L/C text** (MT700 fields or a scan): 40A form, 31D expiry date and place, 32B amount, 39A tolerance, 41a available with, 42C drafts, 43P partial shipment, 43T transhipment, 44A to 44F ports and latest shipment date, 45A goods, 46A documents required, 47A additional conditions, 48 presentation period, 49 confirmation, 71B charges
- **The sales contract** and pro forma invoice
- **Shipment facts**: actual or planned shipment date, ports, vessel, quantity, packing
- **The draft documents** for 审单: commercial invoice, packing list, bill of lading or air waybill, insurance policy, certificate of origin, inspection certificate, beneficiary's certificate, draft
- **Which stage**: reviewing a new L/C, or checking documents before presentation

## Output Structure

### 1. 审证：条款审核
| 字段 | 内容 | 与合同是否一致 | 风险 | 建议 |
Check: beneficiary name and address exactly; amount, currency and tolerance; goods description; Incoterm consistent with the documents required (for example CIF requires insurance); latest shipment date and expiry leaving enough time; presentation period (UCP 600 Art. 14(c): if none is stated, no later than 21 calendar days after shipment and within the expiry, 需核实); expiry place (a place in the buyer's country is a risk); partial shipment and transhipment matching the logistics plan; confirmation if the issuing bank or country risk is high.

### 2. 软条款与风险条款
Clauses that make payment depend on the buyer or on documents the exporter cannot control, for example an inspection certificate signed by the buyer, a "shipping advice approved by the applicant", or payment after the goods are accepted. For each: why it is risky and a proposed amendment wording.

### 3. 改证要求
A list of amendments to request from the buyer, in English and Chinese, ready to send, with a deadline before production or shipment.

### 4. 审单：单据逐项检查
| 单据 | 检查项 | L/C 要求 | 实际 | 是否相符 | 依据（需核实）|
- **商业发票** (UCP 600 Art. 18): issued by the beneficiary, made out to the applicant, goods description corresponding to the L/C, currency and amount not exceeding the credit
- **提单** (Art. 20): carrier named and signed, on-board notation with date, ports as stated, full set of originals, consignee and notify party as required, clean
- **保险单** (Art. 28): dated no later than shipment, at least 110 per cent of CIF or CIP value unless the L/C says otherwise, risks as required, same currency
- **装箱单, 原产地证, 检验证书, 受益人证明**: as required in 46A, consistent with each other
- **汇票** (if required): drawn on the right party, amount and tenor
- **Consistency across documents** (Art. 14(d)): data need not be identical but must not conflict

### 5. 交单时间表
Latest shipment date, presentation deadline, expiry, and the bank's examination time (UCP 600 Art. 14(b): up to five banking days following presentation, 需核实), with the internal deadline to finish documents.

### 6. 如果有不符点
Options: correct and re-present within the time limit, ask the buyer to accept the discrepancies and authorise payment, or present on approval terms; the costs and risks of each, and why re-presentation is preferred where possible.

## Quality Checks

- [ ] Every L/C field is compared with the contract
- [ ] Soft clauses are identified with amendment wording
- [ ] Each document is checked against the specific 46A and 47A requirements
- [ ] Dates are laid out: shipment, presentation, expiry, examination
- [ ] UCP 600 and ISBP references are marked 需核实 and the L/C's own terms take priority
- [ ] The output says the bank's documentary credit team has the final view

## Anti-Patterns

- **Accepting the L/C without reading 47A.** Soft clauses hide in additional conditions.
- **Shipping before amendments are confirmed.** You lose leverage once the goods sail.
- **"Close enough" names and addresses.** Typos in the beneficiary or consignee are classic discrepancies.
- **Presenting on the last day.** Leave time to correct and re-present.
- **Assuming a discrepancy will be waived.** The buyer may use it to renegotiate.

## Example Trigger Phrases

- "收到一份信用证，帮我审一下条款有没有软条款。"
- "交单前帮我检查发票、提单和保险单有没有不符点。"
- "信用证要求客户签字的检验证书，能接受吗？"
- "提单日期 3 月 5 日，信用证没写交单期，最晚哪天交单？"
- "Check these export documents against the letter of credit for discrepancies."
