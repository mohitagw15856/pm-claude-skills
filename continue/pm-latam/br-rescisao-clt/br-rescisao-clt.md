---
name: "Explain and estimate termination pay (verbas rescisórias) fo"
description: "Explain and estimate termination pay (verbas rescisórias) for an employee under Brazil's CLT: which amounts are due for each type of termination, how each is calculated, what happens to the FGTS balance and unemployment insurance, the payment deadline, and what to check on the termination statement. Use when asked quanto vou receber na rescisão, calcular rescisão CLT, fui demitido sem justa causa o que recebo, pedi demissão quais meus direitos, or check my TRCT. Produces a table of entitlements by termination type, a step-by-step estimate, an FGTS and seguro-desemprego note, a checklist for the termination statement, and next steps if amounts are missing. Not legal advice."
---

# Rescisão CLT (Brazil)

What a worker receives at the end of a CLT contract depends first on how the contract ended. The same salary and service produce very different totals for dismissal without cause, resignation, dismissal for cause and termination by agreement. This skill identifies the type, lists the amounts due, and shows the arithmetic. It is an estimate for checking a termination statement, not legal advice, and current values must be verified.

## What This Skill Produces

- The termination type and what it means
- A table of each amount: due or not, how it is calculated, the estimate
- What happens to the FGTS balance and whether unemployment insurance is available
- The payment deadline and the penalty for lateness
- A checklist for reading the termination statement (TRCT)
- Next steps if something is missing

## Required Inputs

Ask for these if not provided:

- How the contract ended: dismissal without cause, resignation, dismissal for cause, agreement between the parties, end of a fixed-term contract, or constructive dismissal (rescisão indireta)
- Admission date and last day worked
- Monthly salary and regular additions (overtime average, commissions, night or hazard pay)
- Whether notice was worked, paid in lieu or waived
- Holiday periods already taken and any overdue
- FGTS balance, if known
- Any advances, loans or deductions

## Framework

1. **Amounts by type.**

| Amount | Without cause | Resignation | For cause | By agreement |
|---|---|---|---|---|
| Salary balance (saldo de salário) | Yes | Yes | Yes | Yes |
| Notice (aviso prévio) | Yes, worked or paid | Employee owes it | No | Half, if paid in lieu |
| Proportional 13th salary | Yes | Yes | No | Yes |
| Overdue holidays plus one third | Yes | Yes | Yes | Yes |
| Proportional holidays plus one third | Yes | Yes | No | Yes |
| FGTS fine | 40 percent of deposits | No | No | 20 percent |
| FGTS withdrawal | Yes | No | No | Part of the balance |
| Unemployment insurance | If eligible | No | No | No |

2. **Salary balance.** Monthly pay divided by 30, times days worked in the final month.
3. **Notice.** Thirty days plus three days for each completed year of service, up to ninety days. When paid in lieu it counts as service for the 13th salary and holidays.
4. **Proportional 13th.** One twelfth of pay for each month worked in the year, counting a month where fifteen days or more were worked.
5. **Holidays.** Overdue periods in full, the current period in twelfths, each with the constitutional one-third added.
6. **FGTS.** The employer deposits 8 percent of pay monthly. The fine is calculated on all deposits made during the contract, adjusted, not on the current balance alone.
7. **Deadline.** Payment and the documents are due within ten days of the end of the contract; late payment triggers a fine equal to one salary.
8. **Deductions.** Social security and income tax apply to some amounts and not others; advances can be deducted within limits. Flag for verification.
9. **Constructive dismissal and end of fixed term** follow their own rules; identify and refer.

## Output Format

### Estimativa de rescisão: [type]

**Dados usados:** admissão [date], saída [date], salário [amount], aviso [worked / paid / waived].

| Verba | Devida? | Cálculo | Estimativa |
|---|---|---|---|
| Saldo de salário | | | |
| Aviso prévio | | | |
| 13º proporcional | | | |
| Férias vencidas + 1/3 | | | |
| Férias proporcionais + 1/3 | | | |
| Multa do FGTS | | | |
| **Total bruto estimado** | | | |

**FGTS e seguro-desemprego:** [withdrawal right, fine, eligibility note]
**Prazo de pagamento:** [date], ten days after the end of the contract.

**Confira no TRCT**
- [ ] Termination type and code match what happened
- [ ] Dates of admission, notice and exit
- [ ] Each amount listed separately, with averages of variable pay included
- [ ] Deductions itemised
- [ ] FGTS deposits up to date in the statement from the bank

**If something is missing:** ask the employer in writing, seek the union or a labour lawyer, and note that claims are time-limited after the contract ends.

**Assumptions and gaps**
- [Averages or dates assumed]
- [What the FGTS statement would confirm]

*Estimativa para conferência, não é aconselhamento jurídico. Verifique valores, descontos e regras atuais com o sindicato, um advogado trabalhista ou os canais oficiais.*

## Quality Checks

- [ ] The termination type is identified before any arithmetic
- [ ] Every amount shows its calculation
- [ ] Notice reflects years of service and the ninety-day cap
- [ ] The FGTS fine is based on deposits, not only the balance
- [ ] The ten-day deadline is stated
- [ ] Taxes and deductions are flagged, not guessed

## Anti-Patterns

- **Do not calculate before establishing how the contract ended.**
- **Do not forget variable pay averages.**
- **Do not tell a worker who resigned that they can withdraw FGTS.**
- **Do not present a net figure** without saying deductions were estimated or excluded.
- **Do not advise signing a statement that lists amounts not paid.**

## Example Trigger Phrases

- "Fui demitido sem justa causa depois de 4 anos ganhando R$ 3.500. Quanto recebo?"
- "Pedi demissão. Tenho direito a quê?"
- "What is the difference between acordo and dismissal without cause in Brazil?"
- "Confere esse TRCT pra mim."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/br-rescisao-clt.html

<!-- pm-claude-skills v84.0.0 | skill: br-rescisao-clt | source: skills/br-rescisao-clt/SKILL.md | sha256: bd2dbff6c573f83221fc051f7e7511846f1688bfa2ae6c509f886677ef670e8a | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
