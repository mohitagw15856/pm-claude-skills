---
aliases: ["Kündigungsfrist Check (Germany)"]
tags: [pm-skills, skill]
skill: de-kuendigungsfrist-check
description: "Work out the notice period and last working day for an employment contract in Germany, for resignation or dismissal: the statutory periods by length of service, probation, contract and collective-agreement terms, the written-form rule, and the deadlines that follow. Use when asked wie lange ist meine Kündigungsfrist, when is my last day if I resign today, my employer gave me notice, how do I resign in Germany, or Kündigung schreiben. Produces the applicable notice period with the rule it rests on, the earliest end date, a compliant resignation letter in German, and a checklist of deadlines for the employment agency and for challenging a dismissal. Not legal advice."
---

# Kündigungsfrist Check (Germany)

In Germany the notice period depends on who gives notice, how long the employment has lasted, what the contract says and whether a collective agreement applies. A resignation sent by email is not valid. A dismissal can only be challenged within a short window. This skill works out the dates and lists the steps that have deadlines. The statutory periods below are the standard ones in the Civil Code; the user must verify them and check the contract and any collective agreement.

## What This Skill Produces

- The notice period that applies and the rule it comes from
- The earliest termination date for a notice given on a stated day
- A resignation letter in German that meets the written-form rule
- For a dismissal: what to check and the deadline to challenge it
- A deadline checklist: employment agency registration, leave, reference, handover

## Required Inputs

Ask for these if not provided:

- Who is giving notice: employee or employer
- Start date of employment, and whether a probation period is still running
- The contract's notice clause, quoted
- Whether a collective agreement (Tarifvertrag) applies
- The date notice will be delivered, or was received
- Company size, for dismissal protection
- Remaining leave and overtime
- Special status: pregnancy, parental leave, severe disability, works council member, apprentice

## Framework: Statutory Baseline (verify)

1. **Basic period.** Four weeks to the fifteenth or to the end of a calendar month, for either side.
2. **Probation.** During an agreed probation of up to six months, two weeks to any day.
3. **Employer's notice lengthens with service**, each to the end of a calendar month: two years, one month; five years, two months; eight years, three; ten years, four; twelve years, five; fifteen years, six; twenty years, seven.
4. **Employee's notice.** Stays at the basic period unless the contract extends it. A contract may align the employee's period with the employer's longer one, but may not make the employee's period longer than the employer's.
5. **Contract and collective agreement.** A longer contractual period generally applies. Collective agreements may shorten or lengthen. Check both.
6. **Written form.** Notice must be on paper with an original signature. Email, fax, scans and messaging apps are invalid.
7. **Delivery decides the date.** The period starts when the notice reaches the other side. Hand it over against a signed copy, or use a courier or a recorded method with a witness.
8. **Dismissal protection.** In businesses above the small-business threshold, after six months of service, a dismissal needs a social justification. A claim must reach the labour court within three weeks of receiving the notice.
9. **Employment agency.** Register as seeking work at least three months before the end, or within three days of learning the end date if that is nearer. Resigning or signing a termination agreement without an important reason usually triggers a benefit suspension period.
10. **Special protection.** Pregnancy, parental leave, severe disability and works council membership carry additional rules. Flag and refer.

## Output Format

### Notice period: [employee / employer] notice, [date delivered]

**Applies:** [period] under [statute / contract clause / collective agreement].
**Earliest end date:** [date]. **Working:** [delivery date, period, permitted end dates].

| Check | Finding |
|---|---|
| Probation running? | |
| Contract clause | |
| Collective agreement | |
| Length of service | |
| Special protection | |

**Resignation letter (German)**
> [Name, address]
> [Employer, address]
> [Ort, Datum]
>
> **Kündigung meines Arbeitsverhältnisses**
>
> Sehr geehrte Damen und Herren,
> hiermit kündige ich das mit Ihnen bestehende Arbeitsverhältnis ordentlich und fristgerecht zum [Datum], hilfsweise zum nächstmöglichen Termin.
> Bitte bestätigen Sie mir den Erhalt dieser Kündigung sowie das Beendigungsdatum schriftlich und stellen Sie mir ein qualifiziertes Arbeitszeugnis aus.
>
> Mit freundlichen Grüßen
> [handwritten signature]

**If you received a dismissal**
- [ ] Note the date of receipt
- [ ] Check form, signatory, notice period and works council consultation
- [ ] Decide on a claim within three weeks
- [ ] Register with the employment agency

**Deadlines**
| By | Step |
|---|---|

**Assumptions and gaps**
- [Contract terms assumed]
- [What a collective agreement might change]

*A calculation aid, not legal advice. Verify periods against the current Civil Code and your contract, or consult a lawyer or union.*

## Quality Checks

- [ ] The rule behind the period is named
- [ ] The end date respects the fifteenth or month-end rule
- [ ] The letter includes "hilfsweise zum nächstmöglichen Termin" and needs a wet signature
- [ ] The three-week claim window appears for any dismissal
- [ ] Employment agency registration and the suspension risk are covered
- [ ] Special protection categories are flagged

## Anti-Patterns

- **Do not let the user resign by email or messaging app.**
- **Do not apply the employer's long periods to an employee's resignation** unless the contract does.
- **Do not ignore the collective agreement.**
- **Do not advise signing a termination agreement** without flagging the benefit suspension risk.
- **Do not count the notice period from the date on the letter.** It runs from receipt.

## Example Trigger Phrases

- "Ich arbeite seit sechs Jahren hier. Wie lange ist meine Kündigungsfrist?"
- "If I hand in my notice on 10 March, when is my last day?"
- "My employer dismissed me yesterday. What are my deadlines?"
- "Write my resignation letter in German."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/de-kuendigungsfrist-check.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.0.0 | skill: de-kuendigungsfrist-check | source: skills/de-kuendigungsfrist-check/SKILL.md | sha256: ae45332969e20963ef4760f667f85dc1172cf74d19222b7b792331b0b1bf2f7f | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
