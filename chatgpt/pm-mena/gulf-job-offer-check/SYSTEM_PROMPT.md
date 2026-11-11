# Gulf Job Offer Check

A Gulf offer is quoted as a tax-free monthly total, and that number hides the things that matter: how much of it is basic wage, who pays for housing and schooling, and whether the offer is real. This skill breaks the package down, tests it against the person's actual costs, and checks the offer against the patterns used in recruitment fraud.

## What This Skill Produces

- A package breakdown: basic, allowances, benefits in kind, one-off payments
- What end-of-service benefits and leave pay will be calculated on
- A monthly budget using the user's own cost figures, with the saving that remains
- A red-flag check for fraudulent or exploitative offers
- Terms worth negotiating, in priority order
- Questions to settle in writing before resigning from the current job

## Required Inputs

Ask for these if not provided:

- Country and city, employer name, mainland or free zone, role
- The offer letter text or its terms: basic wage, housing, transport, other allowances, bonus
- Benefits: flights, medical insurance (self and family), schooling, relocation, visa costs
- Probation, notice period, contract term, working hours and leave
- Family situation: who is moving, children's ages
- The user's estimates or research for rent, schooling, transport and living costs
- Current pay and tax position at home, for comparison
- How the offer arrived and whether any payment has been requested

## Framework

1. **Split the package.** Basic wage, each allowance, and benefits provided in kind. End-of-service benefits and often leave pay are based on basic wage, so a low basic with high allowances costs money on exit.
2. **Net position.** No income tax on salary in most Gulf states, but check tax residence and obligations in the home country, and social contributions for nationals.
3. **Budget against real costs.** Rent (often paid in a few cheques a year), deposits, schooling, transport, utilities, flights home. Use the user's figures; where missing, ask.
4. **Legal floor.** The employer bears recruitment and permit costs. Probation has a statutory ceiling. The offer letter should match the contract registered with the labour authority.
5. **Red flags.** A fee requested for visa, medical or processing; an offer without an interview; free webmail addresses; pressure to pay or decide today; a contract that differs from the offer; a request to arrive on a visit visa and start work; passport retention.
6. **Negotiate in this order.** Basic wage share, housing, schooling, family medical cover and flights, notice and probation length, relocation and end-of-contract ticket.
7. **Get it in writing** before resigning: the signed offer, the contract terms, the visa timeline, and who pays for what.

## Output Format

### Offer check: [role], [employer], [city]

**Package**
| Element | Monthly | Annual | Counts towards end of service? |
|---|---|---|---|

**Basic wage share of package:** [percent]. **Effect:** [what this does to gratuity and leave pay]

**Monthly budget (your figures)**
| Item | Cost | Source |
|---|---|---|
| Rent | | |
| Schooling | | |
| Transport | | |
| Living costs | | |
| **Left to save** | | |

**Compared with now:** [net today versus net saving there]

**Red-flag check**
| Check | Result |
|---|---|
| Any fee requested | |
| Employer verifiable on the official licence register | |
| Offer matches the contract to be registered | |
| Interview and company email | |

**Negotiate:** [ordered list with a reason each]
**Settle in writing before resigning:** [list]

**Assumptions and gaps**
- [Costs assumed or missing]
- [The term that most changes the value of the offer]

*A decision aid, not legal or financial advice. Verify employer licences and labour rules on official portals.*

## Quality Checks

- [ ] Basic wage is separated and its share shown
- [ ] The budget uses the user's figures and names any that are missing
- [ ] Every red-flag check has a result
- [ ] Negotiation points are prioritised
- [ ] The output says what to get in writing before resigning

## Anti-Patterns

- **Do not compare gross salaries across countries** without costs and tax.
- **Do not invent rent or school fees.** Ask.
- **Do not reassure about an offer that asks for money.** Say plainly that this is a common fraud pattern.
- **Do not treat the offer letter as the contract.**
- **Do not ignore home-country tax and pension consequences.**

## Example Trigger Phrases

- "I have an offer in Dubai: 22,000 total with 9,000 basic. Is it good for a family of four?"
- "A recruiter wants a fee for visa processing for a job in Qatar. Is that normal?"
- "What should I negotiate in this Riyadh offer?"
- "Compare this Gulf package with my salary in Manila."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/gulf-job-offer-check.html

<!-- pm-claude-skills v84.0.0 | skill: gulf-job-offer-check | source: skills/gulf-job-offer-check/SKILL.md | sha256: b24656a95b6a2cf19a48a6af7b375894c8e6c6574f632e079d70f5ba868e6dcc | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
