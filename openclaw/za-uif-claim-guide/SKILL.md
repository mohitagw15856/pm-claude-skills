---
name: za-uif-claim-guide
description: "Guide a worker in South Africa through an unemployment insurance claim: which benefit applies, eligibility, how credits and the benefit amount work, the documents, the application steps online or at a labour centre, the time limit, and what to do when a claim is delayed or rejected. Use when asked how do I claim UIF, can I claim UIF if I resigned, how much UIF will I get, what documents do I need for UIF, or my UIF claim is stuck. Produces an eligibility verdict, a benefit estimate method, a document checklist, the application steps, a follow-up log and an appeal route. Not legal advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/za-uif-claim-guide.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# UIF Claim Guide (South Africa)

The unemployment insurance fund pays short-term benefits to contributors who lose work, fall ill, or take maternity, parental or adoption leave. Claims stall on missing employer declarations and on forms the employer has not completed. This skill works out which benefit applies and prepares a complete application. Benefit rates, time limits and form numbers are set by the fund and must be verified before applying. It is not legal advice.

## What This Skill Produces

- An eligibility verdict with the reason
- An explanation of credit days and how the benefit is calculated, with an estimate if figures are given
- A document checklist, including what the employer must provide
- Application steps for the online portal or a labour centre
- A follow-up log and what to do if the employer has not declared or contributed
- The appeal route

## Required Inputs

Ask for these if not provided:

- Why work ended or stopped: retrenchment, dismissal, contract expiry, resignation, insolvency of the employer, illness, maternity, parental or adoption leave, reduced working time, or death of a contributor (dependants' claim)
- Last working day
- Length of contribution over the past four years and average monthly pay
- Whether the employer deducted contributions and declared them
- Whether the claimant is available for and seeking work
- Citizenship or permit status
- Whether bank details can be verified in the claimant's name

## Framework

1. **Which benefit.** Unemployment, illness, maternity, parental, adoption, reduced work time, or dependants' benefits. Each has its own form and rules.
2. **Unemployment benefit eligibility.** The contract ended through dismissal, retrenchment, expiry or the employer's insolvency. A worker who resigned is generally not eligible, unless the resignation amounts to a constructive dismissal found by the dispute body. Domestic workers and those with more than one employer have specific rules.
3. **Credits.** Contributors earn benefit days in proportion to days worked, up to a maximum over a four-year cycle. Days already claimed in the cycle are deducted.
4. **Amount.** Benefits are a percentage of earnings on a sliding scale, higher for lower earners, subject to an earnings ceiling, and step down after an initial period. Use the fund's calculator or the current schedule to estimate.
5. **Time limit.** Unemployment claims must be lodged within a set number of months of the last working day; other benefits have their own limits. Apply early.
6. **Documents.** Identity document or passport with permit, the employer's declaration of the end of service, proof of banking details in the claimant's name, the latest payslips, and the benefit-specific form (for example a medical certificate or the child's birth certificate).
7. **Apply.** Online through the fund's portal or in person at a labour centre. Register as a work seeker. Keep the reference number.
8. **While claiming.** Confirm availability for work when required, attend any appointments, and report new employment at once.
9. **If the employer did not contribute or declare.** Report it; the fund can pursue the employer. Keep payslips showing deductions.
10. **Delay or rejection.** Follow up with the reference number, escalate through the fund's complaint channel, and appeal within the stated period.

## Output Format

### UIF plan: [benefit type]

**Eligible?** [yes / no / unclear] because [reason]. **Apply by:** [deadline to verify].

**How your benefit is worked out:** [credits, sliding percentage, ceiling]. **Estimate:** [figure from the fund's calculator, or "use the calculator with these inputs: ..."].

**Documents**
| Document | From | Have it? |
|---|---|---|
| ID or passport and permit | You | |
| Employer's end-of-service declaration | Employer | |
| Bank form or proof of account | Bank | |
| Payslips | You | |
| [benefit-specific form] | | |

**Steps**
1. [step]

**Follow-up log**
| Date | Channel | Reference | Outcome |
|---|---|---|---|

**If the employer is the problem:** [steps]
**If rejected:** [appeal route and period to verify]

**Assumptions and gaps**
- [Contribution history assumed]
- [Document most likely to delay the claim]

*Guidance for preparation, not legal advice. Verify forms, rates and time limits with the fund or a labour centre.*

## Quality Checks

- [ ] The benefit type is identified first
- [ ] The resignation rule is applied correctly
- [ ] The time limit is stated and marked for verification
- [ ] The employer's documents are listed separately
- [ ] The estimate uses the fund's method, not a guessed rate
- [ ] An appeal route is included

## Anti-Patterns

- **Do not tell someone who resigned that they qualify for unemployment benefits** without the constructive dismissal caveat.
- **Do not quote a fixed percentage as the benefit.**
- **Do not suggest claiming while working.**
- **Do not recommend paying an agent** to speed up a claim.
- **Do not let the claim period lapse** while waiting for an employer's paperwork; apply and report the gap.

## Example Trigger Phrases

- "I was retrenched last week. How do I claim UIF and how much will I get?"
- "Can I claim UIF if I resigned because of how I was treated?"
- "My employer never gave me the form. What now?"
- "My UIF claim has been pending for two months."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/za-uif-claim-guide.html

<!-- pm-claude-skills v84.0.0 | skill: za-uif-claim-guide | source: skills/za-uif-claim-guide/SKILL.md | sha256: b582aaa8a814f9a4c78f04f5da2ff44b399d2e0fa34b99d94d1cc632e813d28b | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
