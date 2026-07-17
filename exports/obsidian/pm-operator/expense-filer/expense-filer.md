---
aliases: ["Expense Filer"]
tags: [pm-skills, skill]
skill: expense-filer
description: "Turn a pile of receipts into a filed expense report through a tool-using agent — extraction, policy checks, and categorization done for you; submission gated on your approval. Use when asked to file my expenses, process these receipts, build my expense report, or expense this trip. Produces the itemized report with policy flags and an approval-gated filing plan."
---

# Expense Filer Skill

Nobody's judgment is improved by hand-typing receipts. This skill does the clerk work — extraction, categorization, policy screening, currency normalization — and stops at the line that matters: *submission happens only after a human reads the report.* Numbers must reconcile; anything ambiguous is flagged, never guessed.

## What This Skill Produces

- **The itemized report** — merchant, date, amount, currency, category, project/cost-center, per receipt
- **Policy flags** — over-limit items, missing-itemization risks, personal-expense suspicion, duplicates, each with the fix
- **The reconciliation line** — receipts total vs report total, to the cent
- **The filing plan** — what gets submitted where, gated on approval

## Required Inputs

Ask for these if not provided:
- **The receipts** — images, PDFs, forwarded emails, or a folder the agent can read
- **The policy** — per-diem limits, category caps, itemization rules (or "use conservative defaults and flag everything near an edge")
- **Context** — trip/project the expenses attach to, cost center, currency of the report
- **The expense system** — Concur/Expensify/Ramp/a spreadsheet — and whether draft-only or submit is desired

## Framework

1. **Extract with provenance** — every line links to its source receipt; a number without a receipt is a flag, not a line.
2. **Categorize by the policy's taxonomy**, not intuition; unknown category → flag with a best-guess clearly marked.
3. **Screen before math:** duplicates (same merchant+amount±1 day), split-transaction patterns, weekend/personal-suspect items, alcohol-on-meal-receipt rules — flag, never silently drop or include.
4. **Normalize currency** at the receipt-date rate, shown per line.
5. **Reconcile or refuse:** if extracted totals and report totals disagree, the report doesn't ship.

## Output Format

# Expense Report: [trip/project] — [period]
| # | Date | Merchant | Amount | Curr | → [report curr] | Category | Receipt | Flags |
|---|---|---|---|---|---|---|---|---|
**Total:** [n] items · [amount] · reconciles ✓
**Flags needing you:** [each with the question to answer]

## Quality Checks
- [ ] Every line traces to a receipt; every receipt appears exactly once
- [ ] Totals reconcile to the cent, conversion shown per line
- [ ] Every policy edge is flagged with the specific rule it grazes
- [ ] Nothing ambiguous was guessed — flags ask, lines assert

## Anti-Patterns
- [ ] Do not round away discrepancies — a report that's $3 off is wrong, not close
- [ ] Do not categorize creatively to fit under caps — flag the overage; gaming policy is the user's career, not your cleverness
- [ ] Do not drop suspect items silently — surfacing them is the service
- [ ] Do not submit anything — filing is gated below, always

## Execution

For agents with file/OCR access and expense-system access (API or UI). Without tools, the report itself is the deliverable. Rules per [SKILLSPEC.md §5](../../SKILLSPEC.md).

### Preconditions
- The report above produced, flags resolved by the user, and the final version **explicitly approved by a human**.
- Expense-system access authenticated; the target report/trip container named.
- The filing plan (create entries, attach receipts, save as draft vs submit) displayed and confirmed — **submit requires its own explicit yes.**

### Allowed actions
- Create the expense entries exactly as in the approved report; attach the corresponding receipt files.
- Save the report as a draft in the system.
- Submit only if the user's approval explicitly included the word-level go for submission.
- Nothing else: no editing existing reports, no touching payment methods, no approving on behalf of anyone.

### Verification
- Re-read the created report from the system: line count, per-line amounts, and total match the approved version; every entry shows its attachment.
- Report the system's own total back next to the approved total.

### Rollback
- Draft reports: delete the draft. Submitted reports: recall/withdraw if the system allows; otherwise notify the user immediately with the exact state.
- Stop and ask a human if: the system rejects an entry, an attachment fails, or any created total drifts from the approved one.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
