---
name: beneficiary-audit
description: "Audit the beneficiary designations that quietly override wills — the account-by-account sweep, the life-event triggers that make them stale, and the coordination check against actual intentions. Use when asked check my beneficiaries, does my 401k go to my ex, do beneficiary forms beat a will, or what should I update after marriage/divorce/a birth. Produces the account sweep list, the stale-designation red flags, the intent-vs-paperwork comparison table, and the update checklist with the verify-in-writing step."
---

# Beneficiary Audit Skill

The most important estate document most people have isn't their will — it's a form they filled out on day two of a job in 2016 and never saw again. Retirement accounts, life insurance, and payable-on-death accounts generally pass by *designation*, outside the will entirely: in the classic disaster, the will says everything to the new spouse, the 401k form still says the ex, and (jurisdiction-varying, but often) **the form wins.** This skill runs the audit: sweep every designation-carrying account, compare paper against intent, and flag the stale ones before they become someone's litigation.

## What This Skill Produces

- **The sweep list** — every account type that carries designations, checked or marked unknown
- **The comparison table** — what the paperwork says vs. what the person actually intends, per account
- **The red-flag list** — ex-spouses, deceased primaries, missing contingents, minors named directly, "estate" as beneficiary — each with why it bites
- **The update checklist** — what to change where, and the confirm-in-writing step that closes the loop

## Required Inputs

Ask for these if not provided:
- **The account inventory** — employer retirement plans (every past employer — the forgotten 401k with the forgotten designation is the classic), IRAs, life insurance (employer group + private), pensions, bank/brokerage POD/TOD registrations, HSAs
- **The life since the forms** — marriages, divorces, births, deaths, estrangements — each is a staleness trigger, and the audit walks them chronologically against the forms
- **Actual current intent** — who should get what, stated plainly; the audit is a diff, and the diff needs both sides
- **Jurisdiction, loosely** — some places auto-revoke ex-spouse designations, some don't, and federal-law plans (in the US) can override state rules — all flagged verify-locally; this skill finds the mismatches, a professional resolves the contested ones

## Framework: The Audit Rules

1. **Designations beat wills — audit them like it:** the sweep covers every account that passes outside probate; "my will handles it" is the misconception the audit exists to correct. Where the will and a form conflict, flag it loudly and route to the estate attorney — never assume which wins.
2. **Life events are the staleness clock:** each marriage/divorce/birth/death since a form's date is a trigger; the audit walks the timeline and asks "which forms were touched after this?" — the answer is usually none, and that's the finding.
3. **The red-flag patterns:** ex-spouse still named (the headline case) · primary beneficiary deceased with no contingent (the money goes… somewhere — often the estate, defeating the purpose) · minor children named directly (courts and custodians get involved; the fix is jurisdiction-specific — flag it) · "my estate" as beneficiary of a retirement account (can have real tax consequences — flag for a professional) · percentages that don't sum or siblings named unevenly by accident.
4. **Contingents are half the audit:** every account gets a primary *and* a contingent check — the no-contingent gap is more common than the wrong-primary one, and it fails exactly when both spouses are in the same accident.
5. **Updates aren't done until confirmed:** the checklist ends with written confirmation from each institution (a screenshot of the portal or the confirmation letter, filed with the estate documents) — submitted-but-unrecorded changes are a known failure mode, and the confirmation is the audit's receipt.

## Output Format

# Beneficiary Audit: [name] — [date]

## The Sweep
| Account | Institution | Primary on file | Contingent | Last touched | Status |
|---|---|---|---|---|---|
[Unknown = the finding; "check the portal" is a task, not a gap to skip]

## Intent vs. Paperwork
| Account | The form says | You intend | Match? |
|---|---|---|---|

## 🚩 Red Flags
[Each: the account, the pattern, why it bites, the fix — jurisdiction-flagged where rules diverge]

## Update Checklist
[Per change: where (portal/form) · what · the confirm-in-writing step · file the confirmation with the estate documents · recheck cadence: every life event + every ~2 years]

> Which designation rules apply — auto-revocation on divorce, plan-law overrides, minor-beneficiary handling — varies by jurisdiction and account type; this audit finds mismatches, and contested or tax-sensitive ones belong with an estate attorney or financial professional. Not legal or tax advice.

## Quality Checks

- [ ] The sweep includes past-employer plans and group life insurance, not just current accounts
- [ ] Every account is checked for a contingent, not just a primary
- [ ] The life-event timeline was walked against form dates
- [ ] Every red flag names its consequence, not just its presence
- [ ] The checklist ends in written confirmations, filed

## Anti-Patterns

- [ ] Do not treat the will as covering designation accounts — the opposite assumption is the audit's founding fact
- [ ] Do not skip "unknown" accounts — unknown is the most common and most dangerous status
- [ ] Do not declare which document wins a conflict — flag loudly, route to the professional
- [ ] Do not name minors directly as the fix for anything — that pattern is itself a flag
- [ ] Do not close the audit at "submitted" — unconfirmed updates are how this audit gets needed twice
