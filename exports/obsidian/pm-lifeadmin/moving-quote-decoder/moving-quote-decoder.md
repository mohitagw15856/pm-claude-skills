---
aliases: ["Moving-Quote Decoder"]
tags: [pm-skills, skill]
skill: moving-quote-decoder
description: "Decode a moving-company quote and spot the lowball, the padding, and the outright scam before you book. Use when asked to check a moving quote, is this mover legit, compare moving estimates, or avoid moving scams. Produces a read on the quote type (binding vs non-binding vs 'not to exceed') and what it really means, the red flags of moving scams (big deposits, no in-home/video survey, low-then-hostage pricing), the questions to ask and credentials to verify, an apples-to-apples comparison, and how to protect yourself on moving day."
---

# Moving-Quote Decoder

Moving quotes are a minefield: a suspiciously low estimate can balloon on the day, and outright scams hold your belongings hostage for a bigger payment. This decodes what a quote actually commits the mover to, flags the scam signals, tells you what to verify, and helps you compare estimates fairly — so you pick a real mover, not a cheap trap.

## What This Skill Produces

- **A quote-type read** — binding, non-binding, or "not-to-exceed," and what each means for your final bill
- **Scam red flags** — the signals of a rogue mover (large upfront deposit, quote without an in-home/video survey, no proper credentials, low quote then a hostage price hike)
- **Verify checklist** — the licensing/registration and insurance to confirm, plus reviews across independent sources
- **Questions to ask** — what to pin down (what's included, extra fees, weight/volume basis, delivery window, claims process)
- **An apples-to-apples comparison** — normalizing quotes so a "cheap" one isn't just hiding costs
- **Moving-day protection** — how to avoid the hostage-load scenario and document condition

## Required Inputs

Ask for these if not provided:
- **The quote(s)** — the amount, the type, and what's itemized
- **The move** — local vs long-distance/interstate, size, distance, dates
- **How it was quoted** — in-home survey, video, or just over the phone/online
- **The company** — name and what you can verify about it
- **Concerns** — a suspiciously low price, a big deposit request, or a comparison

## Framework: Know The Quote, Vet The Mover

1. **Read the quote type.** A non-binding estimate can rise; a binding or not-to-exceed protects you. Know which you're getting before comparing prices.
2. **Spot the scam signals.** No in-home/video survey, a large cash deposit, a too-good price, vague company details, and pressure are classic rogue-mover tells — especially for long-distance moves.
3. **Verify credentials.** Confirm licensing/registration and insurance through official registries, and check reviews across independent sites (not just the mover's).
4. **Ask the pinning questions.** What's included, the basis (weight/volume/hours), extra fees (stairs, long carry, bulky items), the delivery window, and the claims process.
5. **Compare apples-to-apples.** Normalize the quotes for what's actually included so a low headline isn't hiding add-ons.
6. **Protect moving day.** Avoid large upfront payments, get everything in writing, document your items' condition, and know your rights if they try to hold the load hostage.

## Output Format

### Moving quote check: [local/long-distance] · quote [amount] · type [x]

**Quote type:** [binding / non-binding / not-to-exceed] → means [your bill can/can't change how].
**Scam red flags present?** [deposit size · survey done? · credentials · low-then-hostage risk].
**Verify:** [licensing/registration · insurance · independent reviews].
**Ask:** [what's included · basis · extra fees · delivery window · claims].
**Compare fairly:** [normalize included items across quotes].
**Moving day:** [no big upfront cash · get it in writing · document condition · hostage-load rights].

## Quality Checks
- [ ] Explains the quote type and its bill implications
- [ ] Flags the classic moving-scam red flags
- [ ] Lists the credentials/insurance to verify officially
- [ ] Gives the key questions to pin down costs
- [ ] Normalizes quotes for a fair comparison
- [ ] Covers moving-day protection and hostage-load risk

## Anti-Patterns
- **Comparing headline prices** across different quote types.
- **Booking without verifying** licensing/insurance and reviews.
- **Ignoring the no-survey / big-deposit** scam signals.
- **Missing hidden fees** (stairs, long carry, bulky).
- **Paying a large deposit** or cash upfront.

## Example Trigger Phrases
- "Is this moving quote legit? It seems really low."
- "The mover wants a big deposit and never came to see my stuff — red flag?"
- "Compare these two moving estimates for me."
- "How do I avoid getting scammed by a moving company?"
- "What should I ask a mover before booking a long-distance move?"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
