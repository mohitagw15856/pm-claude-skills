---
trigger: model_decision
description: "Write a standout rental application / cover letter to a landlord or letting agent. Use when asked to write a rental application, a letter to a landlord, a renter cover letter, or to strengthen an application for a competitive rental. Produces a concise renter profile and cover letter — who you are, why you're a reliable tenant, your evidence, and a clear ask — that helps a landlord choose you."
---

# Rental Application Skill

In a competitive market a landlord picks the tenant who looks reliable and low-hassle. This skill writes a
concise cover letter and renter profile that signal exactly that — stable income, good history, references —
without oversharing, so you stand out from a stack of bare applications.

## Working from a brief

Given "help me write a letter for a flat I'm applying for", **write the full letter anyway** — structure it
and bracket the specifics (income, employment, references, move-in date) to fill in. Never withhold for missing
detail.

## Required Inputs

Ask for these only if they aren't already provided (else bracket to fill in):

- **The property & you** — the property/address, who's applying (and any co-applicants/occupants), and desired move-in date.
- **Reliability signals** — employment/income (or proof of funds), and tenancy length you're seeking.
- **Rental history** — previous tenancies, landlord references, and on-time payment record.
- **Anything notable** — pets, guarantor, why you want this place — and any potential concern to pre-empt (e.g. self-employed, new to the area).

## Output Format

### Rental Application Letter

- **Opening** — who you are and the specific property you're applying for, with your intended move-in date and tenancy length.
- **Why you're a reliable tenant** — employment/income stability and ability to meet rent comfortably (state evidence; avoid oversharing exact figures unless asked).
- **Rental history & references** — prior tenancies, on-time payment, and referees available (landlord, employer).
- **Pre-empt concerns** — briefly and positively address anything a landlord might worry about (pets → references/deposit; self-employed → proof of funds/guarantor).
- **The ask** — that you'd love to be considered, can provide documents/references promptly, and are available to view/sign.
- **Close** — contact details and availability.

Also output a **one-line renter summary** (the elevator version) and a **document checklist** to attach (ID, proof of income, references). Note items to confirm.

## Quality Checks

- [ ] Leads with the specific property and clear reliability signals (income stability, history)
- [ ] References and supporting documents are offered/listed
- [ ] Any likely landlord concern is pre-empted positively, not hidden
- [ ] Tone is warm and professional — a person a landlord would want as a tenant
- [ ] It doesn't overshare sensitive financial detail beyond what's needed to reassure
- [ ] A document checklist and a one-line summary are included

## Anti-Patterns

- [ ] Do not send a bare "I'd like to apply" — give the reliability signals that win competitive listings
- [ ] Do not overshare exact salary/bank details unsolicited — reassure without exposing yourself
- [ ] Do not hide a likely concern — address it positively before the landlord wonders
- [ ] Do not sound desperate or over-familiar — confident and professional wins
- [ ] Do not invent references or history — bracket real details to provide

## Based On

Tenant-application practice — signalling reliability (stable income, good history, references), pre-empting concerns, and a clear, document-ready ask.
