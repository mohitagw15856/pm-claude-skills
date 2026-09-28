# Worked Example — PRD Template

A gold-standard run of this skill: a reconciliation pain point at an invoice-financing platform turned into a complete PRD with baselined metrics, testable requirements, and the fights left visibly unresolved in Open Questions.

## The brief

**Ledgerline** (fictional) advances 85% of invoice value to SMB staffing agencies, collecting payment directly from the agencies' clients ("debtors"). Debtors pay by bank transfer, and 31% of inbound payments arrive with a missing or mangled reference — a 3-person ops team manually reconciles them, taking a median 2.4 days. Misapplied payments mean agencies see wrong outstanding balances (210 support tickets/month) and wait an average 3.1 days for their 15% residual after debtor payment. The PM, Tomas Reyes, is writing the PRD for a hosted **Debtor Payment Portal**. Known tensions: Risk wants overpayments hard-blocked, Ops wants them accepted and flagged; Sales wants card payments for two enterprise debtors, but 1.8% interchange erases the margin on large invoices; and a third of agencies run agency-branded collections, where a Ledgerline-branded portal would expose the financing relationship.

## The output

```
# PRD: Debtor Payment Portal

**Author**: Tomas Reyes (PM) · **Reviewers**: Ana Sork (Ops Lead), Priya Mehta (Head of
Risk), Jon Callis (Eng Lead), Sofia Lindqvist (Compliance) · **Status**: In review, v0.3

## 1. Overview

**Problem Statement**: Debtors paying Ledgerline-financed invoices have no guided way
to pay — they make free-text bank transfers, and 31% arrive with a missing or wrong
reference. Agencies then see incorrect outstanding balances, chase us instead of their
clients, and wait 3.1 days on average for their residual payout after their debtor has
already paid.

**Proposed Solution**: A hosted, per-invoice payment page (unique link on every
Ledgerline-issued invoice) that pre-fills the payment reference, initiates a bank
transfer via our payments provider, accepts partial payments with a declared reason,
and lets debtors upload remittance advice for multi-invoice payments.

**Success Metrics**:
- Auto-reconciliation rate: **69% → 92%** of inbound payments matched without human touch
- Median time-to-reconcile unmatched payments: **2.4 days → <8 business hours**
- Residual release time (debtor payment → agency payout): **3.1 days → 1.0 day**
- Reconciliation-related support tickets: **210/month → <60/month**
- Guardrail: debtor days-to-pay must not worsen (**baseline 34.2 days DSO**) — a portal
  that adds friction and slows payment is a net loss even if reconciliation improves

## 2. Context & Background

**Why Now**: Funded volume grew 68% YoY but the reconciliation team can't scale
linearly — Ops projects a 4th and 5th hire by Q1 otherwise (~$140K/yr). Two of our five
largest agencies cited "balance accuracy" in QBR risk-to-churn feedback. Our payments
provider shipped hosted payment-initiation APIs in March, removing last year's blocker.

**Strategic Alignment**: Directly supports the company objective "Ops cost per funded
invoice down 30% by year end" and the platform bet that debtor experience — not agency
features — is the next defensible moat.

**User Research Summary**: Ops shadowing (2 weeks) + 9 debtor AP-clerk interviews +
payment-data analysis:
- 74% of unmatched payments are reference errors; 22% are multi-invoice lump sums with
  remittance sent separately (usually to the *agency*, not us); 4% over/underpayments
- AP clerks batch payment runs weekly — a portal that can't handle "pay 6 invoices at
  once" will be bypassed, not adopted
- 3 of 9 clerks did not know Ledgerline existed; they believe they pay the agency
  (agency-branded collections) — portal branding is therefore a compliance and trust
  question, not a cosmetic one

## 3. User Stories & Use Cases

**US1: Guided single-invoice payment**
As a debtor AP clerk, I want to pay an invoice from a link on the invoice itself so
that I don't have to re-key references and account details.
Acceptance Criteria:
- Unique URL per invoice renders amount due, due date, and pre-filled reference
- Payment initiated via bank-transfer rails without the clerk typing a reference
- Payment lands pre-matched; no ops touch on the happy path
- Link expires when the invoice is fully settled; a settled invoice's link shows a
  "paid" state with the date and amount, not an error

**US2: Multi-invoice payment run**
As a debtor AP clerk, I want to select and pay all open invoices to this supplier in
one transfer so that the portal fits my weekly payment run instead of fighting it.
Acceptance Criteria:
- Portal lists all open invoices for that debtor–agency pair after email verification
- One transfer allocates across selected invoices; allocation stored line-by-line
- A lump sum that doesn't exactly match any invoice combination prompts the clerk to
  allocate the difference before submitting

**US3: Partial payment with declared reason**
As a debtor AP clerk, I want to short-pay a disputed invoice and say why so that the
undisputed remainder isn't blocked behind the dispute.
Acceptance Criteria:
- Partial amounts accepted with a required reason (dispute / credit expected / other +
  free text)
- Reason visible to Ops and to the agency in their dashboard within 15 minutes
- Overpayments are accepted and auto-flagged for refund review (see Requirements —
  Risk's hard-block proposal rejected; rationale in §8)

**US4: Ops exception review**
As a Ledgerline ops analyst, I want unmatched or flagged payments in a single queue
with suggested matches so that exception handling takes minutes, not days.
Acceptance Criteria:
- Queue shows payment, confidence-ranked suggested invoice matches, and flag reason
- One-click apply/split/refund actions, each writing an audit-log entry
- Queue item SLA timer visible; items >8 business hours old escalate to Ops lead

## 4. Requirements

**Functional — P0 (MVP)**
- Per-invoice hosted payment link with pre-filled reference (US1)
- Bank-transfer initiation via existing payments provider; no card rails
- Partial payment with mandatory reason; overpayment accepted + flagged (US3)
- Ops exception queue with suggested matches and audit log (US4)
- White-label mode: portal renders agency name/logo for agency-branded collections,
  with legally required Ledgerline disclosure text (exact copy owned by Compliance)

**Functional — P1**
- Multi-invoice selection and allocation (US2) — highest-value fast follow; excluded
  from MVP only because email-verification design isn't settled (§8 Q2)
- Remittance-advice upload (PDF/CSV) with parsed allocation suggestions
- Agency dashboard surface: payment status + partial-payment reasons

**Functional — P2**
- Card payments — blocked on pricing decision to pass through the 1.8% interchange
  as a debtor-side surcharge where lawful (§8 Q3); do not build speculatively
- Debtor-side payment scheduling ("pay on due date")

**Non-Functional**
- Performance: portal page interactive <2s at p95; payment-status webhook processed
  <60s
- Security: links are unguessable (≥128-bit token); no account data shown before
  email verification for anything beyond the single linked invoice; PCI scope must
  remain zero in MVP (no card data touches our systems)
- Accessibility: WCAG 2.1 AA — AP clerks in enterprise debtors commonly use
  screen-reader and keyboard-only workflows; this is a P0 gate, not a polish item
- Audit: every allocation, flag, and refund action attributable and immutable

## 5. Design & User Experience

- Mocks: [link to Figma file — v2 flows] (placeholder until design review 14 Aug)
- Key flows: invoice link → pay (no login); email-verify → multi-invoice run (P1);
  ops queue → resolve exception
- Edge cases and error states: expired/settled link (show settled state, never a
  404); payment initiated but webhook delayed (>60s → "processing" state + email
  confirmation); duplicate payment attempt on a settled invoice (block with support
  contact); white-label agency churns mid-flight (portal falls back to Ledgerline
  branding with notice)

## 6. Technical Considerations

- Builds on the existing payments-provider integration; new components are the hosted
  portal service and the allocation engine
- Dependency: reconciliation service must expose match-confidence scoring (currently
  internal-only); Eng estimates 2 weeks to extract an API — on the critical path
- Risk: payments-provider webhook delivery is at-least-once with occasional 10-min
  delays observed in staging; mitigation: idempotent processing + polling fallback
- White-label mode touches invoice-generation templates owned by the Billing team —
  cross-team dependency, committed in their Q3 plan (confirmed 28 Jul, Ana ↔ Billing)

## 7. Implementation Plan

- **Phase 1 (MVP, target GA end of Q3)**: P0 list — single-invoice links, partial/
  overpayment handling, exception queue, white-label mode. Pilot with 5 agencies
  (2 agency-branded) for 3 weeks before GA.
- **Phase 2 (Q4)**: multi-invoice runs, remittance upload, agency dashboard surface.
- **Phase 3 (exploratory)**: card rails pending pricing decision; payment scheduling;
  debtor payment-behaviour scoring as an input to Risk's advance-rate model (Risk has
  asked; explicitly out of scope until portal adoption >50% so the data means something).

## 8. Open Questions

- **Q1 — Overpayment handling**: PRD adopts accept-and-flag over Risk's hard-block.
  Priya maintains hard-block is safer for client-money handling; Compliance to rule
  whether accept-and-flag meets safeguarding obligations. Owner: Sofia. Needed by:
  design review 14 Aug. If Compliance sides with Risk, US3 AC changes and Phase 1
  scope grows ~1 week.
- **Q2 — Multi-invoice verification**: is email verification sufficient to list all
  open invoices for a debtor–agency pair, or does exposure of invoice lists to a
  spoofed email require stronger auth? Owner: Jon + Security. Needed before P1 build.
- **Q3 — Card surcharging**: legal position on debtor-side surcharges differs by
  debtor jurisdiction. Owner: Sofia with outside counsel. No P2 card work until
  answered.
- **Q4 — White-label disclosure copy**: exact Ledgerline-disclosure wording in
  agency-branded mode. Owner: Sofia. Needed by: pilot start.

## 9. Appendix

- Ops shadowing notes + payment-data analysis (internal research doc, Jul)
- Debtor AP-clerk interview synthesis (9 interviews, internal)
- QBR churn-risk feedback excerpts — Agencies #2 and #4
- Related: Reconciliation service match-scoring design doc; Billing team Q3 plan
- Competitive note: two competing invoice financiers ship debtor portals; neither
  handles agency-branded collections — the white-label mode is the differentiator
```

## Why it's shaped this way

- **The problem statement is the debtor's and the agency's, not Ledgerline's** — the anti-patterns say "do not write requirements from the company's perspective"; the ops-cost saving is real but it lives in Why Now, while the problem is stated as what debtors and agencies experience.
- **Every success metric has a baseline and a target** — "31% unmatched", "69% → 92%", "3.1 days → 1.0" — because the anti-patterns ban "percentages without baselines: specify the current state and the target"; the DSO guardrail is there so the team can't win reconciliation by adding payment friction.
- **US2 exists because the research said the portal would otherwise be bypassed** — AP clerks batch weekly runs; a PRD that ignored that would ship a portal debtors don't use. Requirements trace to observed behaviour, per "link to research and data".
- **"The system should be fast" appears nowhere** — performance is "<2s at p95", links are "≥128-bit tokens", accessibility is "WCAG 2.1 AA as a P0 gate": every requirement is testable, as both the quality checks and anti-patterns demand.
- **MVP vs. later phases is a hard line with reasons** — multi-invoice is P1 *because Q2 is unresolved*, card rails are P2 *because Q3 is unresolved*, and Risk's scoring ask is explicitly out of scope with a re-entry condition — the anti-patterns forbid conflating MVP with future phases.
- **The Risk-vs-Ops fight is resolved provisionally and surfaced honestly** — the PRD takes a position (accept-and-flag) so the team isn't blocked, but Q1 records the dissent, the owner, the deadline, and the scope cost if the ruling goes the other way. "Do not skip open questions — unresolved assumptions are risks; surfacing them is the PM's job."
- **The white-label tension is treated as compliance, not cosmetics** — three of nine clerks didn't know Ledgerline existed; the research summary carries that finding into a P0 requirement and open question Q4, which is what "include 'why' not just 'what'" looks like in practice.
- **The appendix earns its place** — competitive note, research links, and the cross-team dependency confirmation, so a reviewer can check the PRD's claims rather than take them on faith ("link to supporting materials").
