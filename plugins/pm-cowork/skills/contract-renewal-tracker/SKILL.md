---
name: contract-renewal-tracker
description: "Never get auto-renewed into another year again — the contract inventory with the dates that matter (notice deadlines, not renewal dates), the calendar system with decision-time buffers, and the renewal-decision ritual that renegotiates instead of rubber-stamping. Use when asked track our contracts and renewals, we got auto-renewed again, when do we have to decide on this vendor, or set up renewal management. Produces the inventory with notice-deadline math, the alert system, the renewal-decision checklist, and the negotiation-window playbook."
---

# Contract Renewal Tracker Skill

The auto-renewal ambush is a calendar failure wearing a legal costume: the contract renews on March 1, but the *decision* died on January 29 — the 30-day notice deadline nobody tracked ([vendor-breakup-email](../vendor-breakup-email/SKILL.md) learned this the hard way; this skill prevents needing that lesson). The tracker inventories every contract with the date that matters (notice deadline = renewal date − notice period − decision buffer), alerts at decision-time (not deadline-time — an alert with no time to decide is a countdown to the default), and attaches the renewal *ritual*: every renewal is a negotiation window and a [vendor-comparison-matrix](../vendor-comparison-matrix/SKILL.md)-lite moment, because the rubber-stamp renewal is where pricing quietly ratchets.

## What This Skill Produces

- **The inventory** — every contract: vendor, cost, term, renewal date, notice period, **the computed act-by date**, owner
- **The alert system** — calendar entries at act-by minus the decision buffer, with owners, in a shared calendar that survives personnel changes
- **The renewal ritual** — the decision checklist: usage audit, market check, the renegotiation ask, then renew/renegotiate/exit
- **The negotiation playbook** — what the renewal window makes possible (the only time vendor leverage flips to you)

## Required Inputs

Ask for these if not provided:
- **The contract population** — every recurring agreement: software ([subscription-audit](../subscription-audit/SKILL.md) finds the small ones), services, leases, insurance, maintenance; the inventory hunt mirrors the subscription hunt at company scale
- **The terms, from the documents** — renewal dates and notice periods *from the contracts* (memory says "sometime in spring"; the contract says "60 days written notice" — the [tos-decoder](../tos-decoder/SKILL.md)-grade reading of the renewal clauses)
- **The owners** — who decides each contract's fate; unowned contracts auto-renew by definition
- **The calendar infrastructure** — where alerts live such that they survive the tracker's author leaving (the shared calendar, not the personal one)

## Framework: The Tracker Rules

1. **The act-by date is the only date:** renewal date − notice period − decision buffer (30 days for simple tools, 90 for anything needing a [vendor-comparison-matrix](../vendor-comparison-matrix/SKILL.md) evaluation) = the date on the calendar. Tracking renewal dates instead of act-by dates is the ambush with better documentation.
2. **Alerts carry the decision, not just the date:** the calendar entry names the contract, the cost, the owner, and the question ("Renew CRM at $18k? Act by Feb 15; notice by Mar 1; renews Apr 1") — an alert that requires archaeology to act on gets snoozed into the default.
3. **The ritual runs three checks before any renewal:** *usage* (are we using what we pay for? — seat counts and feature audits routinely fund the year's savings) · *market* (the 30-minute [competitive-scan-lite](../competitive-scan-lite/SKILL.md): has the category moved?) · *the ask* (the renegotiation email — see rule 4). Renew-as-is is a legitimate outcome *of the ritual*; as a default it's a pricing escalator.
4. **The window is your only leverage:** vendors price renewals expecting rubber stamps — the notice window is the one period where "we're evaluating alternatives" is both true-sounding and consequence-bearing. The playbook asks: multi-year for a discount (only where the tool is proven), seat right-sizing, the competitor quote on the table ([the-price-pushback](../the-price-pushback/SKILL.md) dynamics, reversed — you're the client now). Even the ask that fails costs one email.
5. **The tracker survives its author:** shared calendar, the inventory in the team's space ([spreadsheet-handover](../spreadsheet-handover/SKILL.md)-grade documentation), owners named per contract, and the quarterly sweep (new contracts in — the intake rule: no signature without an inventory row — departed owners' contracts reassigned). Auto-renewal ambushes cluster in the quarter after the tracker's owner leaves.

## Output Format

# Renewal Tracker: [org/team] — [N] contracts, [$X] annual

## The Inventory
| Contract | Cost/yr | Renews | Notice | **Act by** | Owner |
|---|---|---|---|---|---|

## The Alert System
[Calendar: act-by minus buffer, per contract · the alert's decision-carrying format · the shared-calendar rule]

## The Renewal Ritual
[Usage audit → market check → the renegotiation ask → renew / renegotiate / exit (per [vendor-breakup-email](../vendor-breakup-email/SKILL.md))]

## The Intake + Survival Rules
[No signature without an inventory row · quarterly sweep · owner-departure reassignment]

## Quality Checks

- [ ] Every date came from the contract's actual clause, not memory
- [ ] The calendar carries act-by dates with decision buffers, not renewal dates
- [ ] Every contract has a named owner
- [ ] The ritual's three checks run before any renewal
- [ ] The intake rule and quarterly sweep keep the inventory current

## Anti-Patterns

- [ ] Do not track renewal dates — the act-by date is the decision's real deadline
- [ ] Do not alert without the decision context — archaeology-requiring alerts get snoozed into defaults
- [ ] Do not rubber-stamp proven tools — the usage audit and the ask cost minutes and fund budgets
- [ ] Do not keep the tracker personal — the ambushes cluster after the owner leaves
- [ ] Do not sign anything into the void — no inventory row, no signature; the intake rule is the whole system's moat

## Example Trigger Phrases

- "Track our contracts and renewals."
- "We got auto-renewed again."
- "Do we have to decide on this vendor?"
- "Set up renewal management."
