---
aliases: ["IRPF Prep (Brazil)"]
tags: [pm-skills, skill]
skill: br-irpf-prep
description: "Prepare an individual's annual income tax return in Brazil (Declaração de Ajuste Anual do IRPF): whether filing is required, which documents to gather, complete versus simplified model, deductions and their evidence, assets and debts, and the mistakes that send a return to review. Use when asked preciso declarar imposto de renda, como declarar IRPF, o que posso deduzir, declaração completa ou simplificada, caí na malha fina, or help me organise my Brazilian tax return. Produces a filing verdict, a document checklist, a model comparison, a deductions worksheet, an assets list template and a pre-submission check. Preparation help, not tax advice."
---

# IRPF Prep (Brazil)

The Brazilian annual return is mostly an exercise in matching: what the taxpayer declares must agree with what employers, banks, clinics and landlords have already reported. Returns are held for review when those numbers differ. This skill organises the documents, chooses the model and builds the worksheet. Thresholds, caps and dates change every year and must be checked on the tax authority's official pages.

## What This Skill Produces

- A verdict on whether filing is required, with the trigger
- A document checklist by source
- A comparison of the complete and simplified models using the user's figures
- A deductions worksheet with the evidence needed for each item
- An assets and debts template
- A pre-submission check against the usual causes of review

## Required Inputs

Ask for these if not provided:

- The calendar year being declared
- Income by type: salary, self-employment, rent, pension, capital gains, exempt income
- Dependants and alimony paid or received
- Health, education and private pension spending
- Assets at the start and end of the year: property, vehicles, bank and investment balances
- Debts
- Whether a pre-filled return is available through the government login
- Sales of property or shares during the year

## Framework

1. **Who must file.** Triggers include taxable income above the annual threshold, exempt income above a higher threshold, assets above a set value, capital gains or stock market transactions, and rural activity above a limit. Verify each for the year.
2. **Documents.** Income statements (informes de rendimentos) from every employer, bank and broker; receipts for health and education with the provider's tax number; private pension and social security statements; rent received or paid; property and vehicle documents; last year's return.
3. **Pre-filled return.** Use it as a starting point and check every line; the taxpayer remains responsible.
4. **Complete or simplified.** The simplified model replaces all deductions with a percentage of taxable income up to a cap. The complete model itemises. Compare totals.
5. **Deductions in the complete model.** Dependants (fixed amount each), education (capped per person), health (no cap, strict evidence), official social security, private pension of the right type up to a share of taxable income, court-ordered alimony, and the self-employed cash book.
6. **Assets and debts.** Declared at acquisition cost, not market value, with the standard description for each. Balances at 31 December of both years.
7. **Monthly obligations.** Income from individuals or abroad may have required monthly payment during the year; check whether it was paid.
8. **Review triggers (malha fina).** Income omitted, a dependant claimed twice or with their own income left out, health costs without matching provider reports, figures that differ from the income statements, and asset growth that income does not explain.
9. **After filing.** Keep the receipt, track the refund lots or pay the balance, and correct with a rectifying return if an error appears.

## Output Format

### Preparação do IRPF: ano-calendário [year]

**Obrigado a declarar?** [yes / no / voluntary] because [trigger]. **Prazo:** [date to verify].

**Documentos**
| Documento | Fonte | Recebido? |
|---|---|---|

**Completa x simplificada**
| | Completa | Simplificada |
|---|---|---|
| Rendimentos tributáveis | | |
| Deduções | | |
| Base de cálculo | | |

**Deduções**
| Tipo | Beneficiário | Valor | Limite a verificar | Comprovante |
|---|---|---|---|---|

**Bens e dívidas**
| Item | Descrição padrão | 31/12 anterior | 31/12 do ano |
|---|---|---|---|

**Antes de transmitir**
- [ ] All income statements entered exactly as issued
- [ ] Each dependant appears in one return only, with their income included
- [ ] Every health expense has a receipt with the provider's tax number
- [ ] Asset growth is consistent with declared income
- [ ] Bank details for the refund are correct

**Assumptions and gaps**
- [Figures estimated]
- [Documents still missing]

*Apoio à preparação, não é consultoria tributária. Confira limites, prazos e regras do ano nos canais oficiais ou com um contador.*

## Quality Checks

- [ ] The filing trigger is named
- [ ] The model comparison uses the user's numbers
- [ ] Each deduction lists its evidence
- [ ] Assets are at cost, not market value
- [ ] No threshold, cap or date is asserted as current without a verify note
- [ ] Review triggers are checked

## Anti-Patterns

- **Do not state this year's thresholds from memory.**
- **Do not accept the pre-filled return unchecked.**
- **Do not claim health costs without proper receipts.**
- **Do not update property to market value.**
- **Do not ignore a dependant's own income.**

## Example Trigger Phrases

- "Preciso declarar imposto de renda este ano? Ganhei só salário."
- "Completa ou simplificada? Tenho dois filhos e plano de saúde."
- "Como declaro um apartamento financiado?"
- "Caí na malha fina por despesa médica. O que faço?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/br-irpf-prep.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.0.0 | skill: br-irpf-prep | source: skills/br-irpf-prep/SKILL.md | sha256: a38803859a2ea4f672113fa94786518a702e9dddf66e151f7d3001080fafa721 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
