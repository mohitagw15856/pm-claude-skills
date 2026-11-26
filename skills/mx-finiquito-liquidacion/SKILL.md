---
name: mx-finiquito-liquidacion
description: "Explain and estimate what an employee in Mexico is owed when a job ends: finiquito on any separation and liquidación on unjustified dismissal, with each component, the daily wage it is based on, and the steps if the employer underpays. Use when asked cuánto me toca de finiquito, me despidieron cuánto es mi liquidación, calcular finiquito por renuncia, qué es la prima de antigüedad, or me quieren hacer firmar mi renuncia. Produces a verdict on which payment applies, a component table with the working, a list of what not to sign, the conciliation route and its time limits. Not legal advice."
version: 1.0.0
---

# Finiquito y Liquidación (Mexico)

In Mexico every worker who leaves a job is owed a finiquito: the pay and benefits already earned. A worker dismissed without a lawful cause is owed a liquidación on top, which is far larger. Employers sometimes present a resignation letter to sign so that only the finiquito is due. This skill works out which payment applies, estimates it, and explains the conciliation route. It is an estimate for negotiation and checking, not legal advice; current rules and amounts must be verified.

## What This Skill Produces

- A verdict: finiquito only, or finiquito plus liquidación, with the reason
- A table of each component, the base wage used, the working and the estimate
- A warning list of documents not to sign without reading
- The conciliation and claim route with time limits
- A checklist of evidence to keep

## Required Inputs

Ask for these if not provided:

- How the job ended: resignation, dismissal with a stated cause, dismissal without cause, mutual agreement, end of a fixed-term contract
- Start date and last day
- Daily or monthly wage, and regular benefits (bonuses, vouchers, commissions) to estimate the integrated daily wage
- Holiday days taken in the current year and any owed from previous years
- Year-end bonus (aguinaldo) days the employer pays, if above the legal minimum
- Whether anything was signed, and what
- Any written notice of dismissal received

## Framework

1. **Finiquito (always due).**
   - Wages earned and unpaid
   - Proportional year-end bonus: the legal minimum is fifteen days' wage a year, pro rata for the days worked in the year
   - Holidays earned and not taken, pro rata, on the scale that starts at twelve days in the first year
   - Holiday premium: at least 25 percent of holiday pay
   - Other earned benefits: savings fund, bonuses due, profit share if applicable
   - Seniority premium: twelve days' wage per year of service, with the wage capped at twice the minimum wage. Due on resignation only after fifteen years of service; due on dismissal regardless of service.
2. **Liquidación (unjustified dismissal), in addition.**
   - Constitutional indemnity: three months of integrated wage
   - Twenty days of integrated wage per year of service, in the cases the law provides, such as when reinstatement is refused
   - Seniority premium as above
   - Back pay from dismissal until payment, capped by law, with interest afterwards
3. **Integrated daily wage.** Daily cash wage plus the daily share of regular benefits. Indemnities use the integrated wage; finiquito items generally use the ordinary daily wage.
4. **Justified dismissal.** The employer must give written notice stating the cause and date. Without it, the dismissal is presumed unjustified.
5. **Signing.** A resignation signed under pressure, a blank sheet, or a finiquito receipt stating that nothing more is owed limits later claims. Read before signing; write "received under protest" only on advice.
6. **Route.** Conciliation at the labour conciliation centre is mandatory before a court claim. The time limit to claim for unjustified dismissal is short, counted from the day after dismissal. Free public labour defence offices exist.
7. **Tax.** Part of these payments is exempt and part taxed; flag for verification.

## Output Format

### Estimación: [finiquito / finiquito + liquidación]

**Por qué:** [reason for the verdict]
**Datos usados:** ingreso [date], salida [date], salario diario [amount], salario diario integrado [amount, how estimated].

| Concepto | Base | Cálculo | Estimación |
|---|---|---|---|
| Salarios pendientes | | | |
| Aguinaldo proporcional | | | |
| Vacaciones proporcionales | | | |
| Prima vacacional | | | |
| Prima de antigüedad | | | |
| Indemnización constitucional (3 meses) | | | |
| 20 días por año | | | |
| Salarios vencidos | | | |
| **Total bruto estimado** | | | |

**No firmes sin leer**
- Resignation letter if you did not resign
- Blank or undated pages
- A receipt saying you have no further claims, unless the amount is right

**Ruta y plazos:** [conciliation centre, time limit to verify, public defence office]

**Guarda:** contract, payslips or bank deposits, social security records, messages about the dismissal, witnesses' names.

**Assumptions and gaps**
- [How the integrated wage was estimated]
- [What changes if the dismissal is contested]

*Estimación para orientar, no es asesoría legal. Verifica montos y plazos con la procuraduría de la defensa del trabajo o un abogado laboral.*

## Quality Checks

- [ ] The verdict comes before the arithmetic and gives its reason
- [ ] Integrated and ordinary daily wage are distinguished
- [ ] The seniority premium rule for resignation under fifteen years is applied correctly
- [ ] Each component shows its working
- [ ] The time limit and mandatory conciliation are stated
- [ ] The signing warnings appear

## Anti-Patterns

- **Do not treat a pressured resignation as a real one** without flagging it.
- **Do not promise the twenty days per year in every dismissal.**
- **Do not calculate indemnities on the ordinary wage.**
- **Do not let the claim period pass** while negotiating informally.
- **Do not present a net figure** when tax was not calculated.

## Example Trigger Phrases

- "Me despidieron después de 6 años ganando 500 pesos diarios. ¿Cuánto me toca?"
- "Renuncié en septiembre. ¿Cómo se calcula mi finiquito?"
- "My employer in Mexico wants me to sign a resignation letter. What do I lose?"
- "¿Qué es el salario diario integrado y cómo lo calculo?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/mx-finiquito-liquidacion.html
