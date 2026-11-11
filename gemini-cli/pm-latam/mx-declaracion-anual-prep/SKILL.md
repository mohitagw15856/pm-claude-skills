---
name: mx-declaracion-anual-prep
description: "Prepare an individual's annual tax return in Mexico (declaración anual de personas físicas): whether filing is required, the access credentials, the documents, personal deductions and their rules, and how a refund is requested. Use when asked tengo que presentar declaración anual, cómo hago mi declaración ante el SAT, qué puedo deducir, cómo pido mi saldo a favor, or help me prepare my Mexican tax return as an employee. Produces a filing verdict, a credentials and documents checklist, a deductions worksheet with the invoice and payment rules, a pre-filled data review list and a refund checklist. Preparation help, not tax advice."
---

# Declaración Anual Prep (Mexico)

For most employees the annual return is a review of data the tax authority already holds, plus the personal deductions that produce a refund. Refunds are lost on technicalities: an invoice issued to the wrong tax ID, a payment in cash, a bank account that fails validation. This skill prepares the return. Thresholds, caps and dates are set each year and must be verified on the authority's portal.

## What This Skill Produces

- A verdict on whether the person must file, and whether it is worth filing voluntarily
- A credentials check: password, electronic signature, tax mailbox
- A document checklist
- A deductions worksheet with the rule and evidence for each item
- A list of pre-filled data to verify
- A refund checklist

## Required Inputs

Ask for these if not provided:

- Tax year and tax regime: salaries, professional services, rental, business, simplified trust regime, interest, other
- Number of employers in the year and whether employment ended before December
- Approximate annual income
- Personal deductible spending: medical, dental, psychological and nutrition services, hospital, optical lenses, funeral costs, donations, mortgage interest, voluntary retirement contributions, medical insurance premiums, school transport, tuition
- How each was paid and whether a digital invoice (CFDI) exists in the person's tax ID
- Bank account in the person's name for a refund
- Whether the electronic signature is current

## Framework

1. **Who must file.** Employees are generally exempt unless they exceed an annual income threshold, had two or more employers at once, stopped working before year end, received other types of income, or asked the employer in writing not to do the annual calculation. People in other regimes file. Voluntary filing is allowed and is how deductions are claimed.
2. **Window.** Individuals file during a fixed month in the year after the tax year. Verify the dates.
3. **Credentials.** A password is enough for many returns; the electronic signature is needed above a refund threshold or for certain procedures. The tax mailbox must be active.
4. **Pre-filled data.** Income and withholdings come from payroll invoices issued by employers. Check that each employer's total matches the payslips and that no unknown employer appears.
5. **Personal deductions.** Each needs a digital invoice in the person's tax ID with the correct use code, paid by electronic means (card, transfer or named cheque), not cash, for the categories where that is required. Beneficiaries can include spouse, children, parents and grandparents within income limits.
6. **Caps.** Most personal deductions together are limited to the lower of a multiple of the annual unit of measure or a percentage of total income. Tuition has per-level caps and sits outside the general cap, as do some other items. Verify.
7. **Result.** Balance due (can be paid in instalments if filed on time) or balance in favour.
8. **Refund.** Requires a bank account in the taxpayer's name with a validated interbank code. Automatic refunds can be rejected for inconsistencies; the conventional refund request is the fallback.
9. **Keep.** The acknowledgement, the invoices, and proof of payment for five years or the period advised.

## Output Format

### Preparación de la declaración anual: ejercicio [year]

**¿Obligado?** [yes / no / voluntary and worthwhile] because [reason]. **Plazo:** [dates to verify].

**Accesos**
- [ ] Contraseña vigente
- [ ] e.firma vigente (needed if [condition])
- [ ] Buzón tributario activo

**Documentos**
- [ ] Payroll invoices or withholding certificate from each employer
- [ ] Deduction invoices in your tax ID
- [ ] Bank statements showing electronic payment
- [ ] Mortgage interest and retirement contribution statements
- [ ] Bank account statement with the interbank code

**Deducciones**
| Concepto | Beneficiario | Monto | Factura a tu RFC | Pago electrónico | Límite a verificar |
|---|---|---|---|---|---|

**Total against the general cap:** [amount] versus [cap to verify]

**Revisa en la información precargada**
- [ ] Each employer and total income
- [ ] Tax withheld
- [ ] Deductions shown and any missing invoice

**Para la devolución**
- [ ] Account in your name, interbank code validated
- [ ] Amounts consistent with invoices
- [ ] Acknowledgement saved

**Assumptions and gaps**
- [Regime or income assumed]
- [Invoices not yet confirmed]

*Apoyo para preparar, no es asesoría fiscal. Verifica requisitos, límites y fechas en el portal oficial o con un contador.*

## Quality Checks

- [ ] The filing verdict names the trigger
- [ ] Every deduction row checks invoice, tax ID and payment method
- [ ] The general cap is compared, and items outside it are separated
- [ ] No amount, cap or date is asserted as current without a verify note
- [ ] The refund account conditions are listed

## Anti-Patterns

- **Do not list deductions paid in cash** where electronic payment is required.
- **Do not accept pre-filled income unchecked.**
- **Do not state the year's caps from memory.**
- **Do not suggest deducting invoices issued to another person's tax ID.**
- **Do not cover business or complex regimes** without referring to an accountant.

## Example Trigger Phrases

- "Soy asalariado y tuve dos patrones este año. ¿Tengo que declarar?"
- "¿Qué gastos médicos puedo deducir y qué necesito?"
- "How do I get my saldo a favor from the SAT?"
- "Arma mi checklist para la declaración anual."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/mx-declaracion-anual-prep.html

<!-- pm-claude-skills v84.0.0 | skill: mx-declaracion-anual-prep | source: skills/mx-declaracion-anual-prep/SKILL.md | sha256: 672ec360e1c011286ed1f30192fce2fcc6e5ea2610c93d9ee6bd9c907f2314f9 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
