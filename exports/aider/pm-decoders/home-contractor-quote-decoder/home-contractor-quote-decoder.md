# Home Contractor Quote Decoder Skill

The most expensive number in a renovation quote is usually one that isn't there: the allowance that runs out, the exclusion that becomes a change order, the "TBD" that becomes time-and-materials. This skill decodes the quote the way a construction manager reads a bid — hunting the gaps between what's written and what the finished job requires — and turns three incomparable bids into one comparable question set. It reads documents; it doesn't judge workmanship.

## What This Skill Produces

- A section-by-section decode: scope, materials, allowances, exclusions, schedule, payment terms
- The allowance audit — every allowance vs. what that item realistically requires, flagged where it's a teaser
- The exclusion-to-change-order map: what's not in this price that the finished job will need
- Payment-schedule risk read, and the question set that makes competing bids comparable

## Required Inputs

Ask for these only if they aren't already provided:

- **The quote/contract text** — full document preferred; decode what's provided and name the missing sections (a one-page quote for a $60k job is itself a finding).
- **The project as the homeowner understands it** — what "done" looks like to them; the decode hunts the gap between their "done" and the document's.
- **Competing bids** if any — the decode aligns them line by line.
- **Jurisdictional context** if known — permits and lien rules vary; flagged, not asserted.

## Framework: Severity Scale

- 🔴 **Resolve before signing** — allowances materially below what the selected-grade item costs (a $2,000 cabinet allowance in a kitchen remodel is a placeholder wearing a price), scope described by outcome without specification ("renovate bathroom" vs. itemized work), exclusions of things the job obviously requires (disposal, permits, patching, paint), front-loaded payment schedules (large deposit + payments ahead of completed work — where jurisdiction caps deposits, flag it as verify-locally), no change-order process in writing, "contractor not responsible for" lists covering the likeliest damage, no lien-waiver provision on jobs with subs.
- 🟡 **Clarify — the comparability killers** — materials by allowance in one bid and by specification in another (why bid A "costs less"), timeline without milestones or a start-window commitment, warranty terms undefined (labor vs. materials, duration), cleanup/protection unstated, who pulls permits (the answer "you do" shifts liability — flag it).
- 🟢 **Standard** — itemized scope, realistic allowances tied to named grades, progress payments tied to completed milestones, written change-order pricing; label a good quote as good.

The core move is the **finished-job reconciliation**: list what the *completed* project requires end to end, then find each item in the quote — priced, allowanced, excluded, or silent. Silent items are the future change orders; price the gap.

## Output Format

### Contractor Quote Decode: [project — contractor, amount]

**1. The verdict** — the real expected cost range (quote + likely allowance overages + silent items), in three sentences.

**2. Section decode**

| Section | What it says | What it means / what's missing | Severity |
|---|---|---|---|

**3. The allowance audit** — each allowance vs. realistic cost at the homeowner's stated grade; the overage subtotal.

**4. The silent-items list** — required by the finished job, absent from the document; each one a future change order.

**5. Payment schedule read** — money vs. completed work over time; where the homeowner is exposed; the milestone-tied restructure to request.

**6. Making bids comparable** — the question set to send every bidder so the numbers finally mean the same thing.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Every allowance is audited against the homeowner's stated grade, with the overage totaled
- [ ] The finished-job reconciliation produces an explicit silent-items list
- [ ] Payment-schedule exposure is shown as money-ahead-of-work over time
- [ ] Jurisdiction-dependent items (deposit caps, permits, liens) are flagged verify-locally
- [ ] Bid comparisons align scope first, price second
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not judge the contractor's quality or honesty — decode the document; references and licensing checks are separate homework (name them)
- [ ] Do not treat the lowest bid as the best or the worst — un-specified scope explains most bid gaps; make it comparable first
- [ ] Do not invent local costs or code requirements — ranges to verify, not facts
- [ ] Do not soften the allowance finding — a teaser allowance is the oldest trick in the bid
- [ ] Do not let "we'll figure it out as we go" stand anywhere money is involved — that sentence is a time-and-materials contract in disguise

## Based On

Owner-side bid review practice — finished-job reconciliation, allowance auditing, payment-risk sequencing, bid leveling.
