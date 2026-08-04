---
trigger: model_decision
description: "Negotiate a recurring bill down — internet, phone, insurance, cable, gym — with a ready-to-read script, the competitor leverage that actually moves the price, and exactly what to say when they say no. Use when asked to lower my bill, negotiate my internet/phone bill, my provider raised my price, or how do I get a discount on [service]. Produces a call-or-chat script in your words, the specific leverage for your situation, a fallback ladder (discount → downgrade → cancel lever), and a note of what to write down so the promised deal actually sticks."
---

# Lower My Bill

Providers bank on you not calling. The loyal customer on the old plan quietly pays the "just renewed at full price" tax while new customers get the deal. This turns that around: a short, confident script you can read almost verbatim, the one or two pieces of leverage that actually shift the number for *your* situation, and a plan for the moment they say "that's the best I can do" — because the first no is rarely the last word.

It's not a scam or a threat. It's asking, with leverage, the way the pricing is designed to be asked.

## What This Skill Produces

- **A ready-to-read script** — an opener, the ask, and the exact lines to use, in plain language you'd actually say (call *or* chat)
- **Your specific leverage** — the competitor offer, the loyalty length, the price jump, or the retention-desk path that fits your case
- **The fallback ladder** — if full discount fails: partial discount → downgrade to a cheaper equivalent → the "cancel/transfer" lever (retention desk) → walk-away math
- **The make-it-stick note** — what to write down (name, date, promised price, how long, confirmation number) so the deal doesn't evaporate next bill

## Required Inputs

Ask for these if not provided:
- **What service & who** — provider and type (internet / mobile / insurance / cable / gym / streaming)
- **What you pay now** — current monthly/annual price, and what it *was* before any increase
- **What triggered this** — price went up, promo ended, or you just want it lower
- **Your leverage, if any** — a competitor's advertised price, how long you've been a customer, whether you can actually leave, bundle you're on
- **Your real bottom line** — the price you'd be happy with, and whether you're willing to switch providers if they won't budge

## Framework: Ask Like the Pricing Expects

1. **Lead with loyalty + a specific number.** "I've been with you [X years] and my bill went from £[A] to £[B] — I'm looking to get it back down to around £[target]." Vague "can you help me save money" gets a vague no.
2. **Name real leverage, not bluffs.** A genuine competitor quote ("[Rival] is offering me £[X] for the same speed") moves prices; an empty threat doesn't. If you have no competitor offer, loyalty + the size of the increase is your leverage — use that instead of inventing one.
3. **Get to the people who can actually discount.** Front-line agents often can't; the words "I'm thinking about cancelling" or "cancel my service" route you to **retention/loyalty**, who can. That's a lever, not a decision — you don't have to go through with it.
4. **Climb the ladder, don't fold.** If the full discount is refused: ask for a smaller one → ask to move to a cheaper plan with the same core service → invoke the cancel/transfer path → and know your walk-away number so "no" is a real choice, not a bluff.
5. **Be genuinely willing to leave — or don't pretend to be.** The lever only works if switching is real for you. If it isn't, negotiate on loyalty and the increase alone; don't threaten a walk you won't take.
6. **Lock it in writing.** Before you hang up: repeat the deal back, get a name and confirmation number, note the new price and how long it lasts, and set a reminder for when the promo ends (that's the next negotiation).

## Output Format

### Lowering: [service] with [provider] · now £[B] → target £[target]

**Your leverage this call:** [competitor quote / loyalty length / size of increase / all three]

**The script**
- **Opener:** "[loyalty + specific number ask]"
- **The ask:** "[what you want, concretely]"
- **If they hesitate:** "[the leverage line]"
- **The route to retention:** "[the phrase that gets you there]"

**Fallback ladder**
1. Full discount refused → "[ask for a partial]"
2. Still no → "[downgrade to cheaper equivalent]"
3. Still no → "[cancel/transfer lever]"
4. Walk-away → switch makes sense below £[walk number] because [reason]

**Write this down**
Agent name · date · promised price · how long it lasts · confirmation # · promo-end reminder date

**One honest note:** [e.g. "your 24-month loyalty is real leverage — lead with it" or "you have no competitor quote, so don't bluff one; the £[B−A] jump is your case"]

## Quality Checks
- [ ] The ask names a specific target number, not "some discount"
- [ ] Leverage used is real to this person (no invented competitor quotes)
- [ ] The retention/cancel step is framed as a lever, not an instruction to actually cancel
- [ ] A fallback ladder exists — the plan survives the first "no"
- [ ] A walk-away number is stated only if switching is genuinely an option for them
- [ ] The "write it down" step is included so the deal sticks
- [ ] Tone is confident and polite — never abusive to the agent (they didn't set the price)

## Anti-Patterns
- **Bluffing a competitor offer** that doesn't exist — it collapses the moment they call it.
- **Threatening to cancel when you won't** — front-line agents hear it 50 times a day; an empty threat weakens you.
- **Taking the first agent's "no" as final** — the discount often lives at a desk you haven't reached yet.
- **Being rude to the person on the line** — they didn't raise your price and won't help someone who's abusive.
- **Winning a verbal deal and not recording it** — no name, no number, no confirmation, and it quietly reverts.
- **Forgetting the promo end date** — the "great deal" resets to full price and the cycle restarts.

## Example Trigger Phrases
- "My internet bill jumped from £35 to £52 — help me get it back down."
- "How do I negotiate my phone bill? I've been with them six years."
- "Write me a script to lower my insurance renewal."
- "The gym keeps raising prices — what do I actually say to get a discount?"
- "My cable promo ended and the bill doubled. Can you help me call and fix it?"
