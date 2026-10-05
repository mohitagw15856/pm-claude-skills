---
name: singapore-employment-act
description: "Use when asked am I covered by the Employment Act, how much annual leave or sick leave am I entitled to, can my employer cut my pay, how much notice do I need to give, is retrenchment benefit compulsory, how do I claim unpaid salary, or 新加坡劳工法 questions. Produces whether and how the Employment Act applies to the person, their leave, hours and overtime entitlements, notice and termination rules, the retrenchment position under the tripartite guidelines, and the route for claims through TADM and the ECT."
version: 1.0.0
---

# Singapore Employment Act Guide

Most employees in Singapore are covered by the Employment Act, but which parts apply depends on salary and the kind of work. People leave money behind on leave, overtime and unpaid salary because they do not know which protections they have, and they sign retrenchment terms without knowing what is normal. This skill works out what applies to the person, sets out their entitlements, and shows how to claim.

Write in English unless the person asks for Chinese (新加坡华文, Simplified script). Thresholds and entitlements are set by the Ministry of Manpower and change; mark every figure to confirm on mom.gov.sg. This is general information, not legal advice; for a dispute, point to TADM or a lawyer.

## Required Inputs

Ask for these if not provided:
- **Job**: role, whether manual work (workman) or not, full-time or part-time
- **Monthly basic salary** and length of service
- **Contract terms** on leave, hours, notice and any bonus
- **What happened**: unpaid salary, leave refused, dismissal, retrenchment, a contract change
- **Dates**: when it happened (claims have time limits)

## Output Structure

### 1. Are you covered, and by which parts
Whether the Act applies at all (it excludes some groups, such as domestic workers and seafarers), and whether the part on rest days, working hours and overtime applies given the salary thresholds for workmen and other employees (confirm current thresholds).

### 2. Your entitlements
| Entitlement | What the Act gives (confirm) | What your contract says | Which wins |
Annual leave by years of service, paid sick and hospitalisation leave after the qualifying period, public holidays, rest days, overtime pay where it applies, and salary payment deadlines and allowed deductions.

### 3. Notice and termination
Notice periods (contract, or the statutory minimum where the contract is silent), salary in lieu of notice, dismissal with and without cause, and wrongful dismissal claims.

### 4. Retrenchment
That retrenchment benefit is not set by the Act for most employees, what the tripartite guidelines describe as the prevailing norm (confirm), notification duties, and what to negotiate.

### 5. How to claim
Steps: raise it in writing with the employer, then file with the Tripartite Alliance for Dispute Management (TADM) for mediation, then the Employment Claims Tribunal (ECT) if it is not settled, with the time limits to file (confirm).

## Quality Checks

- [ ] Coverage is decided before entitlements are listed
- [ ] Every threshold, entitlement and time limit is marked to confirm with MOM
- [ ] Contract terms are compared with the Act, and the more favourable one is identified
- [ ] Retrenchment benefit is described as a norm under guidelines, not a statutory right, unless the contract or a collective agreement provides it
- [ ] The claim route names TADM and the ECT with time limits
- [ ] The output says it is general information, not legal advice

## Anti-Patterns

- **Assuming every protection applies to everyone.** Hours and overtime rules depend on salary and role.
- **Promising a retrenchment payout.** It depends on the contract, a collective agreement or negotiation.
- **Missing the time limit.** Claims must be filed within set periods after the event or the end of employment.
- **Advising a resignation before checking notice.** Leaving without proper notice can cost salary in lieu.

## Example Trigger Phrases

- "My employer hasn't paid me for two months. What can I do in Singapore?"
- "How much annual leave should I get after three years?"
- "I'm being retrenched. Is there a compulsory payout?"
- "新加坡公司要我离职，我能拿什么补偿？"
