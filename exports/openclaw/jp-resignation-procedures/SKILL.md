---
name: jp-resignation-procedures
description: "Use when asked 退職の手続き, how do I quit my job in Japan, 退職届の書き方, what happens to my health insurance and pension when I leave, 失業保険のもらい方, 有給消化, or 在日本辞职要办什么手续. Produces a dated plan from giving notice to the first weeks after leaving: the resignation letter, using remaining paid leave, health insurance and pension choices with their costs, unemployment benefit steps, resident tax, and the documents to collect from the employer."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/jp-resignation-procedures.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Japan Resignation Procedures (退職の手続き)

Leaving a job in Japan sets off a chain of paperwork with short deadlines: health insurance, pension, unemployment benefit and resident tax all change, and choosing badly can cost tens of thousands of yen. People also lose unused paid leave and forget documents they will need for the next job or a visa. This skill turns the person's situation into a dated checklist.

Write in Japanese unless the person asks for English or Chinese. Deadlines, benefit rules and premiums are set by law and local offices and change; mark every figure to confirm with the employer, the city office (市区町村役場), the pension office and Hello Work (ハローワーク). This is information, not legal advice; for disputes, point to the labour standards office (労働基準監督署) or a lawyer.

## Required Inputs

Ask for these if not provided:
- **Contract**: permanent (無期) or fixed-term, the notice rule in the work rules (就業規則), last day wanted
- **Reason**: own choice, company request, contract end, health
- **Next step**: new job lined up (start date), a gap, studying, leaving Japan
- **Family**: spouse or parent whose health insurance could cover the person
- **Paid leave** remaining, and salary
- **Visa status**, if not Japanese

## Output Structure

### 1. Giving notice
The legal minimum notice for a permanent contract and what the work rules say (confirm which applies in practice), how to tell the manager, and a 退職届 or 退職願 draft with the difference between them.

### 2. Using paid leave
How to plan 有給消化 before the last day, and what to do if the employer refuses.

### 3. Health insurance and pension
| Option | Deadline (confirm) | Cost | Best when |
任意継続 of the employer's plan, 国民健康保険, or joining a family member's plan; switching pension to 国民年金 when there is a gap, and premium exemptions or reductions after leaving (confirm).

### 4. Unemployment benefit (雇用保険)
Eligibility, the 離職票 from the employer, registering at Hello Work, the waiting period and any benefit restriction for leaving by choice (confirm the current rule), and the re-employment allowance if a new job starts quickly.

### 5. Resident tax and documents
How the remaining 住民税 is paid after leaving, and the documents to collect: 離職票, 源泉徴収票, 雇用保険被保険者証, 年金手帳 or the basic pension number, and a certificate of employment if needed.

### 6. Dated checklist
| Date | Action | Where |

## Quality Checks

- [ ] Every deadline, premium and benefit rule is marked to confirm with the relevant office
- [ ] The plan is dated from the person's own last day
- [ ] Health insurance options are compared on cost for the person's salary
- [ ] The documents to collect are listed before the last day
- [ ] Visa implications are flagged for non-Japanese employees
- [ ] The output says it is information, not legal advice

## Anti-Patterns

- **Missing the health insurance deadline.** Some options must be chosen within days of leaving.
- **Leaving with unused paid leave.** It is the person's right to take it before the last day.
- **Forgetting the 離職票.** Unemployment benefit cannot start without it.
- **Assuming a gap needs no pension change.** A gap still has to be covered.

## Example Trigger Phrases

- "来月末で退職します。やることを全部日付順に教えて。"
- "任意継続と国民健康保険、どっちが安い？年収は450万円です。"
- "How do I resign properly in Japan and keep my health insurance?"
- "在日本辞职要办哪些手续？失业保险怎么领？"
