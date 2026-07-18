---
name: estate-settlement-organizer
description: "Organize an executor's work — the settlement ladder from will-to-probate-to-distribution, the asset/debt inventory, the creditor and beneficiary communications, and the records that keep an executor protected. Use when asked I'm the executor what do I do, organize settling an estate, what's the probate process roughly, or track estate assets and debts. Produces the phased task ladder (jurisdiction-flagged), the inventory workbook structure, communication templates, and the executor's self-protection rules."
---

# Estate Settlement Organizer Skill

Being named executor is being handed an unpaid part-time project-management job with personal liability, at the worst possible time. The work itself is organizable: a phased ladder (authority → inventory → creditors → taxes → distribution — in that order, because paying people out of order is how executors end up personally liable), a workbook that tracks every asset and claim, and the discipline of documenting everything. This skill organizes that work and stays in its lane: it structures the process; the legal calls belong to an estate attorney, and knowing *when to hire one* is itself on the ladder.

## What This Skill Produces

- **The phased ladder** — authority, inventory, creditors, taxes, distribution — each phase's tasks, its gate to the next, jurisdiction-flagged throughout
- **The inventory workbook** — assets, debts, and the paper each line needs, in trackable form
- **Communication templates** — beneficiary status updates, creditor notifications, institution letters
- **The self-protection rules** — the records, receipts, and don't-do-yets that keep the executor's own assets out of the story

## Required Inputs

Ask for these if not provided:
- **Status** — will located? Executor formally appointed yet (letters/grant issued) or just named? The pre-authority period has a very short allowed-actions list, and knowing it matters
- **The estate's rough shape** — home? accounts? debts? a business? beneficiaries who get along or don't? (conflict changes the communication cadence, not the process)
- **Jurisdiction, loosely** — probate thresholds, deadlines, and small-estate shortcuts vary enormously; everything procedural gets the verify-locally flag, and simplified processes for small estates are worth asking about by name
- **The hire-help question** — complexity signals (business assets, insolvency risk, beneficiary conflict, cross-border anything) route to get-an-attorney-now, stated plainly

## Framework: The Ladder Rules

1. **Authority before action:** until formally appointed, the list is: secure property, forward mail, keep insurance in force, and gather documents — *not* closing accounts, paying claims, or distributing keepsakes ("it's what she would have wanted" is how family wars and liability both start). The appointment process itself is jurisdiction-specific — verify locally.
2. **Inventory everything before paying anything:** the workbook lists every asset (account, property, vehicle, policy, digital — see [digital-legacy-planner](../digital-legacy-planner/SKILL.md)) and every claimed debt, each with its document. Solvency is unknowable without it, and **order-of-payment rules exist precisely for estates that can't pay everyone** — paying an ordinary claim before a priority one, out of order, can land on the executor personally. That sentence is why the ladder's order is the ladder's order.
3. **Creditors get process, not speed:** notification per local rules (some jurisdictions have formal notice procedures that *limit* the claim window — worth doing right), claims logged and verified against documents — estates get billed for debts that aren't real, and "prove the claim" is a legitimate, standard response.
4. **Beneficiaries get cadence, not chaos:** a short written update monthly-ish ("what's done, what's next, honest timeline") prevents the vacuum that suspicion fills; distributions come *last*, after debts and taxes, with signed receipts — and partial early distributions to keep the peace are exactly the move the self-protection rules exist to stop.
5. **The file is the shield:** every action dated, every expense receipted, every decision noted with its reason, estate money never commingled with personal (a separate estate account is nearly always step one post-appointment). An executor with a clean file survives disputes; one with a shoebox becomes the dispute.

## Output Format

# Estate Settlement: [name] — phase: [pre-authority / inventory / administration / distribution]

## The Ladder
| Phase | Tasks | Gate to next | Local-verify flags |
|---|---|---|---|

## The Workbook (structure)
**Assets:** [line: what · where · est. value · document needed · status] · **Debts/claims:** [claimant · amount · verified? · priority class (verify locally) · paid?] · **Estate account:** [in/out ledger]

## Communications
[Beneficiary update template (short, honest, dated) · creditor notification/prove-the-claim letters · institution letter with certified-copy line]

## Self-Protection Rules
[Separate account · no commingling · no out-of-order payments · no early distributions · receipts for everything · the attorney triggers, listed]

> Probate procedure, deadlines, claim windows, and payment priority are jurisdiction-specific — verify each flagged step locally; estates with complexity signals belong with an estate attorney, and hiring one is an estate expense, not a personal one. Not legal advice.

## Quality Checks

- [ ] The pre-authority allowed-actions list is explicit and short
- [ ] No payment or distribution task appears before inventory completes
- [ ] Every procedural step carries the verify-locally flag
- [ ] The attorney triggers are named, and the estate-pays note appears
- [ ] The workbook tracks documents per line, not just amounts

## Anti-Patterns

- [ ] Do not act before appointment beyond the securing list — early helpfulness creates liability
- [ ] Do not pay claims in arrival order — order-of-payment rules exist and bind the executor personally
- [ ] Do not distribute early to keep the peace — receipts, after debts, or the peace gets expensive
- [ ] Do not commingle funds even briefly — the separate account is the whole shield
- [ ] Do not give legal advice or state deadlines as universal — organize the work; the law is local and the attorney's
