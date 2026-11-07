---
name: in-labour-codes-decoder
description: "Decode India's four labour codes (Wages, Industrial Relations, Social Security, OSH) for an employee, HR lead or small employer: what changes in the wage definition, hours and overtime, leave, gratuity, fixed-term and contract work, with the caveat that commencement and state rules must be checked. Use when asked what the new labour codes mean for me, labour code se salary kaise badlegi, fixed-term employee gratuity, or for an employer readiness checklist. Produces a plain-language decode for the user's role, the likely effects on pay and leave, and a what-to-verify list."
version: 1.0.0
---

# Labour Codes Decoder (India)

Twenty-nine central labour laws were consolidated into four codes. The headlines (take-home pay may fall, a four-day week is possible, fixed-term workers get gratuity) are half true and depend on rules that states notify separately and on commencement dates that have moved more than once. This skill explains what each code does, what it is likely to change for the person's situation, and what they must verify before acting. It is preparation, not legal advice.

## What This Skill Produces

- A one-paragraph decode of each code in plain language, aimed at the user's role
- The specific changes that touch the user: wage definition and the 50 percent rule, hours and overtime, leave accrual and encashment, gratuity for fixed-term staff, retrenchment thresholds, contract labour licensing, social security for gig and platform workers
- An illustrative before-and-after salary structure where pay is the concern, labelled as illustrative
- A verification list: commencement status, the state's draft or final rules, and the employer's own policy documents

## Required Inputs

Ask for (if not already provided), else infer and label as an assumption:
- Who is asking: employee, fixed-term or contract worker, gig or platform worker, HR or founder of a company of what size
- State of work (rules are notified by each state)
- Current salary structure if pay is the concern: basic, HRA, allowances, employer PF, any variable pay
- Sector and whether the establishment is a factory, shop, IT or services, or construction
- The question driving the request (take-home, leave, overtime, gratuity, layoffs, compliance)

## Framework: The Four Codes and What Moves

1. **Code on Wages.** One definition of wages for minimum wage, bonus, PF and gratuity. Excluded allowances are capped at 50 percent of total remuneration, so basic plus DA cannot be squeezed below half. Effect: PF and gratuity rise for people whose basic was low, and take-home may fall unless the employer absorbs the cost. Floor wage set centrally, minimum wages by state.
2. **Industrial Relations Code.** Fixed-term employment recognised with the same benefits as permanent staff pro rata, and gratuity after one year of service for fixed-term workers. Retrenchment and closure approval threshold raised to establishments with 300 or more workers (verify). Standing orders threshold raised. Negotiating union recognition rules. Strike notice requirements extended to all establishments.
3. **Code on Social Security.** Brings gig and platform workers into a social security framework funded by aggregator contributions (rules pending in most states, verify). Gratuity continuous service rules carried over with the fixed-term change. EPF and ESI coverage rationalised. Maternity benefit retained.
4. **Occupational Safety, Health and Working Conditions Code.** Daily hours capped with the possibility of longer days inside a 48-hour week (the four-day-week story), overtime at twice the ordinary rate, leave accrual after 180 days of service, carry-forward and encashment rules, single licence for contractors above the threshold, health checks and welfare provisions for larger establishments.
5. **Commencement and state rules.** The codes were passed centrally; commencement requires notification, and states must notify their rules. Treat any date or threshold as something to verify on labour.gov.in and the state labour department site on the day of asking. Many employers restructured pay in anticipation; check the appointment letter and policy, not just the law.
6. **Role lens.** An employee cares about take-home, leave and gratuity. A fixed-term worker cares about parity and gratuity after one year. A gig worker cares about the social security fund and registration. An employer cares about the wage ceiling, overtime cost, contract labour licensing, standing orders and the retrenchment threshold.

## Output Format

### The labour codes, decoded for [role] in [state]

**Status today:** [commencement and state rules as last known, marked "verify on labour.gov.in and the state labour department site before relying on this"].

| Code | What it does in one line | What changes for you |
|---|---|---|
| Wages | [one line] | [specific effect or none] |
| Industrial Relations | [one line] | [effect] |
| Social Security | [one line] | [effect] |
| OSH and Working Conditions | [one line] | [effect] |

**Your pay structure, illustrative:**

| Component | Today | Under the 50 percent rule |
|---|---|---|
| Basic plus DA | [amount] | [amount] |
| Allowances | [amount] | [amount, capped] |
| Employer PF | [amount] | [amount] |
| Gratuity accrual per year | [amount] | [amount] |
| Take-home | [amount] | [amount] |

**What you can act on now:** [two to four concrete steps, such as asking HR for the restructured CTC letter, checking the fixed-term contract for the gratuity clause, registering as a gig worker if the state portal is open].

**Verify before acting:**
- [ ] Commencement status of each code and your state's rules
- [ ] The threshold figures quoted here (300-worker retrenchment, standing orders, contractor licence) against the current rules
- [ ] Your own appointment letter, CTC breakup and leave policy

*This is a plain-language decode for preparation. Rules differ by state and have changed in draft more than once. Confirm with the state labour department, your HR, or a labour lawyer before acting.*

## Quality Checks

- [ ] Each code is explained in one plain line and then tied to a concrete effect for the stated role, or an explicit "no change for you"
- [ ] Every threshold, date and percentage is marked for verification and the state dependency is stated
- [ ] The pay illustration is labelled illustrative and derived from the user's own components
- [ ] The output tells the person what to check in their own documents, not only in the law
- [ ] The preparation-not-advice line is present

## Anti-Patterns

- **Stating a commencement date as fact.** It has moved; verify.
- **Repeating the four-day-week headline without the 48-hour condition.**
- **Claiming take-home will fall for everyone.** It depends on the current basic share.
- **Ignoring state rules.** Minimum wages, leave and licensing are notified by states.
- **Quoting thresholds from memory.** Mark them and point to the source.

## Example Trigger Phrases

- "I am a software engineer in Karnataka on 18 lakh CTC. What do the new labour codes change for me?"
- "Labour code aane se meri in-hand salary kam ho jayegi kya?"
- "We are a 40-person startup. Give me a readiness checklist for the four codes."
- "I am on a two-year fixed-term contract. Do I get gratuity under the new codes?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/in-labour-codes-decoder.html
