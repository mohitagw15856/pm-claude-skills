---
name: subscription-audit
description: "Find and rank the recurring-payment leak — every subscription annualized, sorted by real yearly cost, with the keep/cancel/downgrade pass and the where-they-hide checklist. Use when asked audit my subscriptions, how much am I spending on subscriptions, help me cancel stuff, or what recurring charges am I forgetting. Produces the annualized ranking from the script, the hidden-subscription hunt list, the keep/cancel/downgrade decisions with the cancellation friction notes, and the re-audit cadence."
---

# Subscription Audit Skill

Subscriptions are priced monthly precisely so nobody computes them yearly — $15.99 is a sandwich; $191.88 is a decision. The audit is two passes: *find them all* (the hunt is the hard part — they hide across cards, app stores, PayPal, and annual charges that only surface one month a year) and *annualize and rank them*, at which point most of the leak turns out to live in the top three lines. This skill runs both passes and then the honest keep/cancel/downgrade sort — including the note that canceling is sometimes deliberately harder than subscribing, and how to do it anyway.

## What This Skill Produces

- **The annualized ranking** — every recurring charge at its true yearly cost, from the script, with per-month and per-day totals
- **The hunt checklist** — the places subscriptions hide, worked through systematically
- **The sort** — keep (used, valued) / cancel (the honest list) / downgrade (the tier nobody remembers choosing) / negotiate (the ones that discount on cancel-intent)
- **The re-audit cadence** — because the leak refills

## Required Inputs

Ask for these if not provided:
- **The recurring lines** — from bank/card statements (2–3 months back, plus one full year scan for annual charges); raw pasted statements are fine — extraction is part of the job
- **The hunt surfaces** — which cards, app-store subscriptions (both platforms), PayPal/payment-app recurring, anything on a partner's card that's really shared
- **Honest usage** — per service: when last actually used (the calendar answer, not the aspirational one — "I might get back into it" is the leak talking)

## Programmatic Helper

```bash
python3 scripts/subscription_audit.py --sub "streaming-a:15.99:monthly" --sub "vpn:71.88:yearly" --sub "gym:45:monthly"
python3 scripts/subscription_audit.py --sub "news:4:weekly" --sub "cloud:2.99:monthly" --json
```

Deterministic. Cadences: weekly/monthly/quarterly/yearly; output ranks by annualized cost and reports the top-three share — usually most of the leak.

## Framework: The Audit Rules

1. **The hunt is systematic or it's partial:** card statements (all cards) → app-store subscription pages (both ecosystems — the ones subscribed via app store don't show as merchant names you recognize) → PayPal/payment-app recurring lists → the annual-charge sweep (scan 12 months, not 2 — domains, memberships, and software renew yearly and hide 11 months at a time) → the free-trial calendar (what converts next month?).
2. **Annualize before judging:** every decision is made against the yearly number; the script exists because $2.99 and $45 monthly *feel* the same and are not. The per-day total is the motivation number; the ranking is the action list.
3. **The sort has four bins, not two:** keep (used this month, priced fair) · cancel (the calendar says so) · **downgrade** (the forgotten premium tier — often the biggest recovery per minute of effort) · **negotiate** (services with retention offers: starting the cancel flow legitimately surfaces the discount; taking it sets a calendar reminder for when it expires).
4. **Duplicates and bundles get a pass of their own:** two cloud storages, three streamers rotated seasonally (the rotation *is* the strategy: subscribe the month you watch, cancel after), a bundle that quietly covers a standalone being paid separately.
5. **Cancellation friction is real and beatable:** note per-cancel what it takes (button / chat / phone call — the phone-call ones are that way on purpose); calendar the annual renewals two weeks ahead of their date, because the re-decision beats the auto-renew. Re-audit every 6 months — the leak refills at roughly one new subscription a month.

## Output Format

---

# Subscription Audit: [N] found — [total]/year

## The Ranking
[Script output: annualized table, per-month/per-day, top-three share]

## The Hunt Ledger
[Surfaces checked ✓ · surfaces still to check · trials converting soon]

## The Sort
| Subscription | /year | Last used | Decision | Action + friction note |
|---|---|---|---|---|

**Recovered:** [the cancel+downgrade total]/year · **Renewal calendar:** [annual charges, dated two weeks early]

*Educational model, not financial advice — and the rotation move (subscribe when using, cancel after) is allowed to be the whole strategy.*

---

## Quality Checks

- [ ] The hunt covered app stores and payment apps, not just card statements
- [ ] The annual-charge sweep scanned a full 12 months
- [ ] Every decision was made against the annualized number
- [ ] Downgrade and negotiate bins were considered, not just keep/cancel
- [ ] The recovered total and the renewal calendar both appear

## Anti-Patterns

- [ ] Do not audit only the obvious card — the app-store and PayPal surfaces are where they hide
- [ ] Do not judge at monthly prices — annualize first, always
- [ ] Do not let "might use it again" survive contact with the last-used date — the calendar votes, aspiration doesn't
- [ ] Do not cancel the negotiables without walking the retention flow once — the discount is sitting right there
- [ ] Do not shame the keeps — a used, valued subscription is fine; the audit hunts the forgotten, not the enjoyed
