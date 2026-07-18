---
name: wedding-vendor-contract-decoder
description: "Decode a wedding vendor contract — venue, photographer, caterer, band — before signing: deposits and their refundability, cancellation and postponement terms, the substitute-performer and force-majeure clauses, and overtime math. Use when someone asks review this venue contract, is this photographer contract normal, what if we have to postpone, or decode this caterer agreement. Produces a clause decode with 🔴🟡🟢 severity, the cancellation-cost timeline, the questions to ask this vendor, and what's actually negotiable."
---

# Wedding Vendor Contract Decoder Skill

Wedding contracts are signed in the happiest possible mood about the least happy possible clauses — what happens if someone cancels, postpones, no-shows, or sends a substitute. And the money is structured backwards from consumer intuition: deposits are usually *retainers* (often non-refundable by design — the vendor turned away other bookings for your date), while the cancellation timeline decides whether a change of plans costs 20% or 100%. This skill decodes the clauses that bite, computes the walk-away cost at each date, and lists what vendors routinely amend when asked before signing.

## What This Skill Produces

- A clause-by-clause decode with 🔴🟡🟢 severity, wedding-specific
- **The cancellation-cost timeline** — what backing out costs at each milestone date, computed from the contract's own schedule
- The questions for this vendor — targeted at the contract's silences
- What's actually negotiable — the amendments vendors commonly accept pre-signature

## Required Inputs

Ask for these only if they aren't already provided:
- **The contract text** — pasted or transcribed; decode what's there and name the missing standard clauses (a contract's silences are findings — no postponement clause is itself the postponement policy)
- **The vendor type and the money** — total, deposit, payment schedule; vendor types have different signature risks (venue: minimums and vendor-lockins · photographer: substitute and delivery terms · caterer: per-head true-up dates · band/DJ: overtime and substitute)
- **The couple's realistic risks** — deployment-prone job? Health situations? A date that might move? The decode weights what's likely for *them*

## Framework: Severity Scale

- 🔴 **Can cost you real money** — cancellation schedules that jump to 100% early (quote the dates, compute the timeline), postponement treated as cancellation (the clause that hurt everyone in living memory — date-change terms deserve their own paragraph and often don't have one), guest-count minimums with full-price true-ups, "substitute performer/photographer at our discretion" with no approval or refund rights, overtime rates unstated or extreme, force-majeure that excuses only the *vendor*, auto-forfeiture of everything paid regardless of timing or resale of the date.
- 🟡 **Unusual — clarify before signing** — delivery timelines for photos/video absent ("sneak peek in 2 weeks, gallery by [date]" belongs in writing), exclusive-vendor requirements and their corkage/cake-cutting fee schedule, meal/break riders, image-rights clauses (who can publish the photos where), setup/teardown windows that don't match the venue's.
- 🟢 **Standard** — retainer non-refundability itself (industry-normal — the *schedule* is the fight, not the retainer), service-charge line items disclosed up front, standard liability language; label them so the couple fights the right battles.

Always compute the **walk-away table**: for each contract milestone date, the cost of cancelling that day (deposit + scheduled payments + any penalty), and the same for a *date change* if the contract distinguishes — because "what does changing the date cost in March?" is the question the contract was designed not to answer plainly.

## Output Format

### Vendor Contract Decode: [vendor type — total]

**1. The verdict** — sign / amend these clauses first / keep shopping, in two sentences.

**2. Clause decode**

| Clause (§) | What it says | What it means for your wedding | Severity |
|---|---|---|---|

**3. 💸 The walk-away table** — per milestone date: cancellation cost · date-change cost (or "contract is silent — that's question #1").

**4. Questions for the vendor** — 4–6, aimed at the silences: postponement terms, substitute policy, overtime rate in writing, delivery dates, what happens if *they* cancel.

**5. What's negotiable** — date-change addendum (the most-granted ask in the industry), delivery deadlines, overtime caps, substitute-approval rights, payment-schedule shifts.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] The walk-away table is computed from the contract's actual schedule, per date
- [ ] Postponement-vs-cancellation treatment is explicitly determined or flagged as silent
- [ ] Missing standard clauses are named as findings, not skipped
- [ ] Retainer non-refundability is decoded as normal while the schedule gets the scrutiny
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not fight the retainer's existence — industry-standard; the escalation schedule is where money moves
- [ ] Do not assume postponement ≠ cancellation — unless the contract says so, it doesn't
- [ ] Do not invent clauses that aren't in the document — silences get questions, not assumptions
- [ ] Do not skip the vendor-cancels-you direction — their force majeure needs a your-money answer
- [ ] Do not present jurisdiction-dependent consumer protections as universal — flag and refer out

## Based On

Client-side event-contract review — cancellation-schedule math, postponement-clause triage, silence auditing.
