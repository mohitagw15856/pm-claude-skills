---
name: resale-flip-kit
description: "Sell secondhand like someone who's done it 500 times — honest condition grading, comps-based pricing with a floor and an anchor, listing titles built from real search terms, photo checklists, and offer/haggle scripts for Vinted, Depop, eBay, and Facebook Marketplace. Use when someone says 'help me sell this', 'price my old jacket', 'write my Depop listing', or 'lowballers keep messaging me'. Produces ready-to-post listings plus a pricing sheet and reply scripts."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/resale-flip-kit.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Resale Flip Kit Skill

The difference between a listing that sells in three days and one that rots
for months is rarely the item — it's the title nobody searches for, the
price picked by feeling, the photos hiding the flaw that surfaces in the
buyer's hands (hello, dispute), and the seller who either caves to the first
lowball or answers it with poetry. This skill runs the professional
reseller's routine: grade honestly, price from comps with a floor decided in
advance, title for search, shoot for trust, and script the haggle so it's
already answered before it arrives.

## What This Skill Produces

- A **ready-to-post listing** per item: search-term title, honest
  description with flaws stated plainly, measurements block, and platform
  variants (Vinted/Depop tone ≠ eBay tone)
- A **pricing sheet**: how to pull comps (sold prices, not asking prices),
  the floor / list / anchor trio, and the drop schedule if it sits
- A **photo checklist** per item type: the shots buyers zoom on, including
  the flaw close-up that *prevents* disputes rather than causing them
- **Reply scripts**: lowballs, "is this still available", bundle requests,
  the meet-up safety rules for local sales

## Required Inputs

Ask for (if not already provided):
- The item(s): brand, size, age, condition told honestly — including every
  flaw ("be the buyer's flashlight, not their surprise")
- Platform(s) they're selling on, and country (measurement units, buyer
  culture, and fee structures differ; fees change — check the platform's
  current cut rather than assuming)
- Goal: max price (patient) or gone-this-week (price accordingly) — the
  strategy forks here
- What comps they can see: 3 sold listings for the same/similar item beats
  any model's guess — ask them to look

## Framework

1. **Grade like a stranger will judge it.** Condition scale: New with tags /
   Like new / Very good / Good (visible wear, stated) / Flawed (front-and-
   center flaw). Rule: any flaw findable in 30 seconds of handling goes in
   the description AND the photos — disclosed flaws are haggling points;
   discovered flaws are refunds.
2. **Price from sold, not from hope.** Sold/completed listings for the same
   item set the market; asking prices are other people's hopes. From comps:
   FLOOR (won't go below — decided now, while rational) · LIST (comp median,
   adjusted for condition) · ANCHOR (list ~10-15% above on offer-culture
   platforms so the haggle lands on LIST). If it hasn't moved in 2 weeks:
   drop 10%, refresh photos, relist — staleness is algorithmic death on most
   platforms.
3. **Title = search terms, not vibes.** [Brand] [item type] [key attribute]
   [size] [color/era] — the words a buyer types, front-loaded.
   "Y2K leather moto jacket brown M Zara" outsells "Gorgeous vintage vibes
   😍" on every platform, including the aesthetic ones.
4. **Shoot the trust set.** Natural light, plain background · front/back/
   label/measurement-flat · the flaw close-up · on-form if wearable. Phone
   is fine; flash-at-night is not. First photo decides the click; the flaw
   photo decides the review.
5. **Script the conversation once.** Lowball (−40%): "Thanks — I can do
   [LIST−10%], firm below that." · Still available: "Yes — first to pay
   has it." · Bundles: genuine discount (shipping saves are real) with a
   floor. Local meetups: public place, daylight, cash/verified payment,
   someone knows where you are — non-negotiable lines, stated as such.

## Output Format

```
## [Item] — listing pack
Title ([platform]): …
Description: [what it is · honest condition incl. flaws · measurements ·
from a [smoke-free/pet-free if true] home · platform tone variant]
Photos: [ ] checklist for THIS item, flaw shot included

## Pricing sheet
Comps to pull: [search exactly this, filter to sold]
Floor £/€/$X · List Y · Anchor Z · Drop schedule: [dates]

## Replies (copy-paste)
[Lowball · availability · bundle · the meetup safety lines]
```

## Quality Checks

- [ ] Every known flaw appears in BOTH description and photo checklist
- [ ] Prices derive from sold comps the user pulled (or are labelled
      estimate-pending-comps) — never asserted as market fact from nothing
- [ ] The floor is set before the first offer arrives
- [ ] Title is search-term-first and under the platform's cut-off length
- [ ] Safety lines for local sales are present and framed as non-negotiable

## Anti-Patterns

- [ ] Do not write listings that hide flaws or inflate brands ("style of" /
      "inspired by" for fakes is fraud, not marketing — decline counterfeits
      outright)
- [ ] Do not quote current platform fees or shipping rates as fact — they
      change; say "check the platform's current fees"
- [ ] Do not price from asking-price comps or sentimental value
- [ ] Do not script rudeness at lowballers — the polite-firm reply converts
      a surprising fraction of them
- [ ] Do not promise "this will sell for X" — floors and strategies, not
      prophecies

## Related

[[pricing-your-services]] for pricing labor instead of objects;
[[late-invoice-escalation]] energy for the buyer who "paid, promise";
[[email-triage-system]] when the "is this available" flood needs a system.

## Example Trigger Phrases

- "Help me sell this."
- "Price my old jacket."
- "Write my Depop listing."
