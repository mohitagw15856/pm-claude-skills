---
name: gulf-residence-visa-admin
description: "Plan the residence and work permit paperwork for someone moving to, working in or leaving a Gulf country: the sequence of steps, who does each one, documents and attestations, family sponsorship, renewals, changing employer, and cancellation with its grace period. Use when asked what are the steps for my UAE residence visa, how do I sponsor my family in the Gulf, my iqama is expiring, I am changing jobs in Saudi Arabia, or what happens to my visa when I resign. Produces a step-by-step plan with owner and timing, a document and attestation checklist, a cost-responsibility note, deadlines that carry fines, and questions for the employer's government relations officer."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/gulf-residence-visa-admin.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Gulf Residence Visa Admin

In the Gulf, the right to live in the country is tied to a sponsor, usually the employer, and the process is a chain of steps in a fixed order. Problems come from documents that were not attested at home, deadlines that carry daily fines, and assumptions about who pays. This skill lays out the chain for the person's country and situation and marks every rule to verify, because fees, salary thresholds and grace periods change often. It is planning help, not immigration advice.

## What This Skill Produces

- The sequence for the situation: new hire, family sponsorship, renewal, change of employer, or exit
- For each step: who does it, what is needed, typical order and dependencies
- A document checklist, including what must be attested or legalised before travel
- A note on which costs the employer normally bears and which the employee does
- Deadlines that trigger fines or bans
- Questions to put to the employer's public relations or government relations officer

## Required Inputs

Ask for these if not provided:

- Country: UAE, Saudi Arabia, Qatar, Kuwait, Bahrain or Oman
- Situation: arriving for a job, sponsoring family, renewing, changing employer, leaving
- Nationality and current location (inside or outside the country)
- Employer type: mainland or free zone (UAE), private or government
- Job title and salary, since family sponsorship and some permits depend on them
- Family members to sponsor, with ages
- Current permit expiry date, if any
- Qualifications that the job title requires

## Framework

1. **Know the sponsor.** The employer sponsors the worker; the worker, once resident, sponsors family if salary and housing conditions are met. Some countries offer self-sponsored long-term residence for certain categories.
2. **The usual chain for a new hire.** Offer and contract registered with the labour authority; entry permit or work visa; travel; medical fitness test; biometrics and identity card; residence permit issued; health insurance; bank account. In the UAE the Emirates ID carries the residence status. In Saudi Arabia the iqama is the residence permit and employer platforms hold the contract.
3. **Attest before travelling.** Degree and marriage and birth certificates usually need legalisation in the issuing country and then by the destination's embassy and foreign ministry. This is the slowest step.
4. **Costs.** Recruitment and work permit costs are the employer's in most Gulf labour laws, and charging them to the worker is unlawful in several. Family visa costs are normally the sponsor's.
5. **Family sponsorship.** Minimum salary or salary plus housing, tenancy contract, attested marriage and birth certificates, medical tests for adults, health insurance.
6. **Renewal.** Start before expiry. An expired permit accrues fines and blocks other services.
7. **Changing employer.** Rules on transfer, notice and any consent differ by country and have been reformed in recent years. Check the current rule on the official labour platform.
8. **Leaving.** Permit cancellation, final settlement, grace period to exit or find a new sponsor, cancellation of dependants first, closing bank accounts and utilities, clearing loans to avoid a travel ban.
9. **Verify on official channels.** Each country's interior ministry, labour ministry and identity authority publish current fees and periods.

## Output Format

### Visa and residence plan: [country], [situation]

**Sponsor:** [who]. **Key dates:** [arrival, expiry, last working day].

| # | Step | Who does it | You provide | Depends on | Notes |
|---|---|---|---|---|---|

**Documents**
| Document | Original or copy | Attestation needed | Lead time | Status |
|---|---|---|---|---|

**Who pays:** [employer items] / [your items] / [confirm with employer]

**Deadlines with penalties**
| Deadline | What happens if missed |
|---|---|

**Ask the employer's government relations officer**
1. [question]

**Verify before acting:** [fees, salary thresholds, grace periods, transfer rules] on [official source type].

**Assumptions and gaps**
- [What was assumed about employer type or salary]
- [The rule most likely to have changed]

*A planning aid. Rules, fees and periods change; confirm each on the official government portal or with a licensed typing centre or adviser.*

## Quality Checks

- [ ] The steps are in dependency order with an owner each
- [ ] Attestation needs are listed per document
- [ ] Cost responsibility is stated and unlawful charges are flagged
- [ ] Every figure that changes (fee, threshold, grace period) is marked for verification, not asserted
- [ ] Exit plans cancel dependants' permits before the sponsor's
- [ ] Loans and bank accounts are covered in a leaving plan

## Anti-Patterns

- **Do not quote fees, salary thresholds or grace periods as fixed facts.**
- **Do not suggest working on a visit visa** or before the permit allows it.
- **Do not treat all Gulf countries as one system.**
- **Do not advise handing over a passport for safekeeping.** Employers retaining passports is prohibited in several Gulf states.
- **Do not skip attestation** and hope it will not be asked for.

## Example Trigger Phrases

- "I start a job in Abu Dhabi next month. What are the visa steps and what must I attest?"
- "How do I sponsor my wife and two children in Dubai?"
- "My iqama expires in three weeks and my employer is slow. What should I do?"
- "I resigned in Qatar. What is the order for cancelling permits and leaving?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/gulf-residence-visa-admin.html

<!-- pm-claude-skills v84.0.0 | skill: gulf-residence-visa-admin | source: skills/gulf-residence-visa-admin/SKILL.md | sha256: cb7001e95ee230e60aed97d0c053c681821be3e39e065c6e1f53c2e3a22e2cd3 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
