---
trigger: model_decision
description: "Decode an employment contract under Saudi labour law for an employee: contract term, probation, wages and allowances, hours and overtime, leave, notice, the end-of-service award, non-compete and termination clauses, compared with the statutory minimums. Use when asked to check my Saudi employment contract, what does this clause mean in my KSA contract, is this probation period legal, عقد العمل في السعودية, or what is my end of service award in Saudi Arabia. Produces a plain-language summary, a clause table against the legal baseline, the clauses to question, an end-of-service illustration, and questions to raise before signing. Not legal advice."
---

# KSA Labour Contract Decoder

A Saudi employment contract is usually short, bilingual, and registered on a government platform, with the Arabic text prevailing. What it leaves out is filled in by the Labour Law, which has been amended more than once in recent years. This skill reads the contract clause by clause against the statutory baseline and shows what the employee would leave with. Figures in the baseline are the commonly cited statutory positions and each is marked for verification against the current law.

## What This Skill Produces

- A plain-language summary of the deal
- A clause table: what the contract says, the legal baseline, and whether it is better, equal, worse or unclear
- Clauses to question before signing, with wording to ask for
- An end-of-service award illustration under leaving and dismissal scenarios
- A list of items the contract is silent on

## Required Inputs

Ask for these if not provided:

- The contract text (Arabic, English or both) or the key terms
- Nationality (Saudi or expatriate), since fixed-term rules differ
- Basic wage and each allowance, separately
- Start date, term, and renewal wording
- Job title and location
- Whether the contract is registered on the official contract platform
- What was promised in the offer letter that may not be in the contract

## Framework: Baseline to Compare Against (verify each)

1. **Term.** Expatriate contracts are fixed-term; where no term is stated the law supplies one tied to the work permit or a default period. Check renewal wording.
2. **Probation.** Must be written. A limited number of days, extendable by written agreement to a statutory ceiling. Either side may end the contract during probation unless the contract restricts this.
3. **Wage.** Basic wage and allowances stated separately. Many entitlements are computed on the actual wage; confirm the definition used in the contract. Wages are paid through the wage protection system.
4. **Hours and overtime.** Daily and weekly limits, reduced hours for Muslims in Ramadan, overtime at a premium on the hourly wage, a weekly rest day.
5. **Leave.** Annual leave of a statutory minimum that rises after five years, public holidays, sick leave on a sliding pay scale, maternity and paternity leave, Hajj leave once after qualifying service.
6. **Notice.** Indefinite contracts carry statutory notice, with different lengths for employer and employee after recent amendments. Fixed-term contracts end at term; early termination without a lawful reason triggers compensation.
7. **End-of-service award.** Half a month's wage for each of the first five years and one month's wage for each year after, on the last wage. On resignation the award is reduced by a sliding scale for shorter service and paid in full after ten years; certain resignations keep the full award.
8. **Termination.** The law lists grounds on which either side may end the contract without notice. Read the contract's list against it.
9. **Non-compete and confidentiality.** Must be written and limited in time, place and type of work.
10. **Costs and documents.** Recruitment, residence permit and work permit fees, and the return ticket at the end, are the employer's. The employer may not keep the employee's passport.
11. **Language and registration.** Arabic prevails. The registered version is the one that counts in a dispute.

## Output Format

### Contract decoded: [employer], [role]

**In brief:** [term, pay, hours, leave, how it ends]

| Clause | Contract says | Legal baseline (verify) | Position | Note |
|---|---|---|---|---|
| Term and renewal | | | Better / Equal / Worse / Unclear | |
| Probation | | | | |
| Wage and allowances | | | | |
| Hours and overtime | | | | |
| Leave | | | | |
| Notice | | | | |
| End of service | | | | |
| Termination grounds | | | | |
| Non-compete | | | | |
| Costs and ticket | | | | |

**Question before signing**
1. [clause, why, wording to request]

**The contract is silent on:** [list]

**End-of-service illustration** (on a wage of [x])
| Scenario | Service | Award |
|---|---|---|
| Contract ends or employer terminates | | |
| Resignation | | |

**Assumptions and gaps**
- [Wage definition or dates assumed]
- [Clauses that could not be read or were missing]

*A reading aid, not legal advice. Check each baseline against the current Labour Law and its regulations, or with the labour ministry or a licensed lawyer.*

## Quality Checks

- [ ] Every clause row has a position and a reason
- [ ] Basic wage and allowances are separated in the analysis
- [ ] The Arabic-prevails and registration points are stated
- [ ] The end-of-service illustration shows its working
- [ ] Each statutory figure is marked for verification
- [ ] Mismatches with the offer letter are listed

## Anti-Patterns

- **Do not state statutory numbers as certain.** The law has been amended; mark them.
- **Do not read the English text alone** where an Arabic version exists.
- **Do not assume an unlimited contract for an expatriate.**
- **Do not ignore what the offer letter promised.**
- **Do not tell the employee a clause is void.** Say it appears to fall below the baseline and should be checked.

## Example Trigger Phrases

- "Check this Saudi employment contract before I sign."
- "My contract says 180 days probation. Is that allowed?"
- "What end-of-service award would I get if I resign after six years in Riyadh?"
- "The offer letter promised a housing allowance but the contract does not mention it."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/ksa-labour-contract-decoder.html

<!-- pm-claude-skills v84.0.0 | skill: ksa-labour-contract-decoder | source: skills/ksa-labour-contract-decoder/SKILL.md | sha256: 3ffb6e7f7f02e9a4f7e65e201f2a69e0950752d4b4b6d941b3dae0143ed83f4a | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
