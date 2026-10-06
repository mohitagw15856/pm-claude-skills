---
name: purchase-justification
description: "Write the purchase request that gets approved — the cost-of-not-buying framing, the ROI math at the approver's altitude, the alternatives-considered section that preempts the obvious pushback, and the right-sized ask for the approval tier. Use when asked justify this tool/hire/equipment purchase, write the budget request, my requests keep getting deferred, or make the business case for this spend. Produces the justification memo: the problem priced, the ROI shown, alternatives dispatched, and the ask sized to its approval path."
---

# Purchase Justification Skill

Purchase requests die of vagueness, not price: "we need this tool, it's $8k" gives the approver nothing to weigh, so deferral — the polite no — wins by default. The justification that works is the [proposal-skeleton](../proposal-skeleton/SKILL.md) specialized for spend: the *problem priced first* (what not-buying costs, in the approver's currency — hours, risk, revenue), the ROI math honest and conservative (one inflated payback poisons the requester's every future ask), the alternatives-considered section dispatching the obvious pushbacks ("can't we use what we have?") before they're raised, and the ask *sized to its approval tier* — because a $4,800 pilot approved this week beats a $50k platform deferred to next fiscal year.

## What This Skill Produces

- **The justification memo** — one page: the priced problem, the proposal, the ROI, alternatives, the ask
- **The ROI math** — conservative, assumption-labeled, with the payback period the approver can check
- **The alternatives table** — do-nothing (priced), the cheaper option (honestly assessed), the requested option
- **The ask sizing** — the request shaped to the approval tier and the pilot-first path where it helps

## Required Inputs

Ask for these if not provided:
- **The problem's evidence** — the hours lost, the incidents, the workaround's cost ([meeting-cost-meter](../meeting-cost-meter/SKILL.md)-style arithmetic on the status quo); requests without a priced problem are wishes with quotes attached
- **The approver and their currency** — who signs at this amount, what they weigh (cost-saving? risk? team velocity?), and what's burned them before ([exec-vs-working-deck](../exec-vs-working-deck/SKILL.md) audience-currency logic)
- **The real numbers** — the quote ([vendor-comparison-matrix](../vendor-comparison-matrix/SKILL.md) TCO, not license price), and the honest benefit estimate with its assumptions
- **The approval tiers** — where the thresholds sit ($5k? $25k?); the sizing strategy needs the map

## Framework: The Justification Rules

1. **Price the status quo first:** "the manual process costs ~9 hours/week across the team (≈$2.3k/month)" — the not-buying number converts the purchase from spending into *trading*, and makes deferral a priced choice instead of a free one. Conservative estimates only; the approver who checks your math once trusts it forever after.
2. **ROI at the approver's altitude, assumptions visible:** payback = TCO ÷ monthly benefit, with each assumption labeled ("assumes 6 of the 9 hours recovered — the conservative case") — and the [token-cost](../token-cost/SKILL.md)-style honesty: ranges beat points, and the worst-case-still-works framing ("even at half the benefit, payback is 11 months") is the strongest sentence available.
3. **Dispatch the alternatives preemptively:** the table — do-nothing (priced, per rule 1), the cheaper/existing-tool option (steelmanned: what it genuinely covers, where it fails the requirement), the requested option — because "can't we just use spreadsheets?" asked in the approval meeting means the memo failed to answer it in advance ([spreadsheet-or-database](../spreadsheet-or-database/SKILL.md) often *is* the honest answer, and knowing when strengthens every request that isn't).
4. **Size the ask to the tier and the trust:** below-threshold pilots move in days; cross-threshold platforms move in quarters — the pilot-first path ("3 seats, 3 months, $1.4k, success = [metric], then the real decision") converts the big ask into a small ask plus evidence. Never split purchases to *dodge* thresholds (that's a career-limiting optimization); do scope genuinely smaller starts.
5. **Close with the decision made easy:** the specific ask (amount, vendor, start date), the reversibility line ("monthly contract, cancellable"), and the offer of the deeper material ([citation-hygiene](../citation-hygiene/SKILL.md)-clean quotes and comparisons in the appendix). Approvers approve what's easy to approve; the memo's whole job is making yes the low-effort path.

## Output Format

# Purchase Justification: [the thing] — [amount] · approver: [who]

## The Problem, Priced
[The status-quo cost in the approver's currency, conservative, shown]

## The Proposal + ROI
[What, TCO over the term · payback math with labeled assumptions · the even-at-half sentence]

## Alternatives Considered
| Option | Covers | Fails | Cost |
|---|---|---|---|
[Do-nothing (priced) · the cheaper path (steelmanned) · the ask]

## The Ask
[Amount, vendor, date · pilot-sized if crossing tiers · the reversibility line · appendix pointer]

## Quality Checks

- [ ] The status quo carries a conservative price in the approver's currency
- [ ] ROI assumptions are labeled and the worst-case line appears
- [ ] The cheaper alternative was steelmanned, not strawmanned
- [ ] The ask fits its approval tier honestly (scoped, never split)
- [ ] Yes is the low-effort path: specific, dated, reversible where true

## Anti-Patterns

- [ ] Do not request against an unpriced status quo — free inertia beats every paid tool
- [ ] Do not inflate the ROI — the first checked exaggeration taxes all future requests
- [ ] Do not leave "use what we have" for the meeting — dispatch it in the memo or lose to it live
- [ ] Do not split invoices to dodge thresholds — scope real pilots instead
- [ ] Do not end with "thoughts?" — the ask is specific or the answer is deferral

## Example Trigger Phrases

- "Justify this tool/hire/equipment purchase."
- "Write the budget request."
- "My requests keep getting deferred."
- "Make the business case for this spend."
