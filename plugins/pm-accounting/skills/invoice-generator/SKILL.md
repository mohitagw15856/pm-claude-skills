---
name: invoice-generator
description: "Create a professional, complete invoice for a client or customer. Use when asked to write an invoice, create a bill, draft a freelance/contractor invoice, or set up an invoice template. Produces a clear invoice — your and the client's details, a unique number, line items with quantities/rates, subtotal/tax/total, payment terms and methods, and due date — ready to send and easy to pay. Not tax/legal advice."
---

# Invoice Generator Skill

An invoice that's clear and complete gets paid faster — it has the details a client (and their finance team)
need to approve and pay without a back-and-forth. This skill produces a professional invoice with everything in
the right place: itemised work, the totals, and **how and when to pay**.

> **Note:** this is a documentation aid, **not tax, accounting, or legal advice**. Tax handling (VAT/GST/sales
> tax, reverse charge, withholding), required fields, and registration numbers vary by country and situation —
> confirm your tax treatment and legal requirements with an accountant. Tax lines below are flagged to set.

## Working from a brief

Given "invoice a client $2,000 for a website project", **produce the full invoice anyway** — lay out every
standard field and mark the ones to set *(your detail)* (invoice number, dates, tax rate, payment details).
Compute the arithmetic from the line items you're given; don't invent a tax rate — flag it to set.

## Required Inputs

Ask for these only if they aren't already provided (else mark to set):

- **From / to** — your business name + contact (and tax/registration ID if applicable), and the client's billing details.
- **Line items** — description of work/goods, quantity, unit rate.
- **Tax** — whether tax applies and the rate (flag to confirm), or exempt/not applicable.
- **Terms** — payment due (e.g. Net 30), accepted methods (bank transfer, card, etc.), and any late-payment terms.
- **References** — PO number, project name, invoice number (or note your numbering scheme).

## Output Format

### Invoice

- **Header** — "INVOICE", a unique **invoice number**, issue date, and **due date**.
- **From** — your business name, address, contact, tax/registration ID (if any).
- **Bill to** — client name, address, contact; PO/reference if provided.
- **Line items** — a table: description · qty · unit rate · amount.

| Description | Qty | Rate | Amount |
|---|---|---|---|

- **Totals** — subtotal, tax (rate + amount, *flag to set*), discounts if any, and **total due** (in the right currency). Show the arithmetic so it's verifiable.
- **Payment details** — how to pay (bank/account details, payment link, etc.) and the terms (due date, late fee if any).
- **Notes** — a short thank-you / any terms; and a reminder to confirm tax treatment with an accountant.

## Quality Checks

- [ ] Has a unique invoice number, issue date, and explicit due date
- [ ] Both parties' details are complete (and tax IDs where relevant)
- [ ] Line items are itemised and the subtotal/tax/total arithmetic is correct and shown
- [ ] Payment method(s) and terms (e.g. Net 30) are clear
- [ ] Currency is explicit; tax rate is flagged to set rather than assumed
- [ ] Reads professionally and is easy for a finance team to approve

## Anti-Patterns

- [ ] Do not invent a tax rate or tax treatment — flag it to confirm with an accountant
- [ ] Do not omit the invoice number or due date — they're what makes it trackable and payable
- [ ] Do not leave payment instructions vague — say exactly how to pay
- [ ] Do not miscompute totals — show the math so it can be checked
- [ ] Do not present this as tax/legal advice — it formats an invoice, it doesn't certify compliance

## Based On

Billing & accounts-receivable practice — complete, itemised invoices with clear terms and payment instructions (tax treatment left to a qualified accountant).
