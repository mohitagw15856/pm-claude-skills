---
name: in-epf-withdrawal-guide
description: "Guide an Indian employee through an EPF withdrawal: whether a partial advance or a full settlement applies, the eligibility by reason (job loss, medical, home purchase, marriage, education, retirement), the UAN, KYC and bank seeding prerequisites, TDS on early withdrawal, the online claim steps and what to check before submitting. Use when asked can I withdraw my PF, PF nikalna hai kaise karun, EPF withdrawal after leaving job, Form 19 vs Form 31, or why my PF claim was rejected. Produces the eligibility verdict, the step-by-step claim and a pre-submission checklist."
version: 1.0.0
---

# EPF Withdrawal Guide (India)

EPF claims fail for boring reasons: a name that does not match Aadhaar, a bank account not seeded, an exit date the old employer never marked, or a withdrawal reason that does not fit the rule. This skill works out which withdrawal the person is actually eligible for, lists the prerequisites that cause rejections, and walks through the claim. It is preparation, not financial or legal advice.

## What This Skill Produces

- An eligibility verdict: partial advance (which category) or full settlement, with the rule it rests on
- The prerequisite checklist that prevents rejection (UAN active, Aadhaar and PAN linked, bank seeded, exit date marked, service history merged)
- The tax position: when TDS applies on early withdrawal and how PAN and Form 15G or 15H change it
- The claim steps on the member portal, the forms involved, and the usual processing time

## Required Inputs

Ask for (if not already provided), else infer and label as an assumption:
- Reason for withdrawal: left a job, unemployed for how long, medical, home purchase or construction, marriage or education, retirement, other
- Total service across employers and whether old PF accounts are transferred to the current UAN
- Whether the last employer has marked the date of exit
- UAN status, Aadhaar and PAN linkage, bank account seeding
- Approximate PF balance and years of contribution (TDS depends on service under five years)
- Any pending claim and its rejection reason, if this is a retry

## Framework: Which Withdrawal Applies

1. **Full settlement (Form 19 and 10C).** On retirement, or after leaving a job and remaining unemployed for the waiting period (two months, verify). Pension contribution under EPS is withdrawn on 10C only when service is below the ten-year mark; above it, the person gets a scheme certificate or pension instead.
2. **Partial withdrawal while employed (Form 31).** Reason-based limits: medical treatment (self or family), marriage or education (after seven years of service, limited number of times), home purchase or construction or loan repayment (after five years, once), and the unemployment advance after one month out of work. Each has a cap expressed as months of wages or a share of the member's contribution; state the cap type and tell the person to verify the current figure.
3. **Covid-era and special advances.** Mention only if still in force; verify on the EPFO site.
4. **Tax.** Withdrawal after five years of continuous service (transfers count) is tax-free. Earlier withdrawal above the threshold attracts TDS at the standard rate with PAN, higher without, unless Form 15G or 15H applies. The amount is also added to income for the year. Verify thresholds and rates for the current year.
5. **Prerequisites that cause rejection.** Name mismatch across UAN, Aadhaar and bank; unverified bank account; date of exit not marked; date of birth mismatch; old accounts not transferred; a joint bank account with a non-spouse.
6. **The claim path.** Member portal: Online Services, Claim (Form 31, 19, 10C and 10D), verify the last four digits of the bank account, choose the form, upload the cheque or passbook image, Aadhaar OTP. Processing usually within the stated service window; status is visible under Track Claim.
7. **Interest and dormancy.** Interest continues for a period after leaving; an account can become inoperative after a longer gap. Encourage transfer rather than withdrawal if the person is moving to a new job, and show the compounding cost of withdrawing.

## Output Format

### EPF withdrawal plan for [name or "you"]

**Situation:** [reason], [years of service], [employment status], exit date [marked / not marked].
**What you are eligible for:** [full settlement / partial advance under the (category) rule / not yet eligible until (condition)], because [rule].

**Fix these first, or the claim will be rejected:**
- [ ] UAN active and Aadhaar linked, with the name spelt exactly as on Aadhaar
- [ ] PAN linked (needed for the correct TDS rate)
- [ ] Bank account seeded and verified, in your own name
- [ ] Date of exit marked by the last employer (you can mark it yourself after the waiting period)
- [ ] Earlier PF accounts transferred into this UAN (Form 13)

**Tax on this withdrawal:** [tax-free after five years of service / TDS likely at (rate, verify) because service is under five years; Form 15G or 15H if income is below the taxable limit].

**Steps:**
1. [step with form name]
2. [step]
3. [step]

**Expected timeline:** [usual window]; check Track Claim after [n] days.

**Consider instead:** [transfer to the new employer, or leave the balance to earn interest, with a rough figure for what withdrawing costs in lost compounding].

*Prepared from the information given. Verify limits, waiting periods and tax thresholds on the EPFO member portal or with a chartered accountant before claiming.*

## Quality Checks

- [ ] The eligibility verdict names the specific withdrawal category and the rule behind it
- [ ] The prerequisite list covers UAN, Aadhaar, PAN, bank seeding, exit date and transfers
- [ ] The tax section distinguishes the five-year rule, PAN and Form 15G or 15H, and marks rates for verification
- [ ] The steps name the actual forms (31, 19, 10C, 10D, 13) and the portal path
- [ ] The output offers the transfer alternative and ends with the preparation-not-advice line

## Anti-Patterns

- **Assuming a full withdrawal is available while employed.** Only reason-based partial advances apply.
- **Ignoring the exit date.** The most common rejection cause.
- **Quoting caps and rates as fixed.** They change; mark them for verification.
- **Forgetting EPS.** Pension money follows different rules from the PF balance.
- **Pushing withdrawal over transfer.** Show the compounding cost and let the person decide.

## Example Trigger Phrases

- "I left my job three months ago. Can I withdraw my full PF, and will there be tax?"
- "PF nikalna hai ghar ke liye, kitna nikal sakta hoon?"
- "My EPF claim got rejected saying bank KYC not verified. What do I fix?"
- "Form 19, 10C and 31: which one do I file for a medical emergency?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/in-epf-withdrawal-guide.html
