---
name: mechanic-quote-decoder
description: "Read a garage quote or invoice like someone who can't be padded — which line items connect to your actual symptom, which are while-we're-in-there additions, the questions that make soft lines disappear, when a second opinion pays for itself, and the scripts for declining work without souring the relationship. Use when someone says 'is this mechanic quote fair', 'the garage called and now it's £900', 'do I really need all this', or before authorizing repairs. Produces a line-by-line decode, the callback questions, and the authorize/decline/second-opinion sort. Not a diagnosis — it's the interrogation of one."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/mechanic-quote-decoder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Mechanic Quote Decoder Skill

Most garages are honest; the padding problem is structural anyway: you
can't see the car, you can't judge the diagnosis, and the quote arrives
by phone with a "while it's up on the lift" rider. The defense isn't
mechanical knowledge — it's *interrogation structure*: which lines trace
to the symptom you brought the car in with, which are discoveries
(legitimate but separately decidable), which are maintenance upsells
wearing urgency, and the magic question that dissolves soft lines:
"which of these are safety-critical *today*, and which can wait until
the next service?" Honest garages answer that cleanly. The answer's
shape tells you which kind you're dealing with.

## What This Skill Produces

- A **line-by-line decode** of the quote: symptom-linked / legitimate
  discovery / maintenance-due / soft upsell — with the reasoning per
  line and the 🔴🟡🟢 urgency read *as claimed vs as evidenced*
- The **callback questions**, scripted: the safety-critical-today
  question, the "can I see/keep the old part?" line, the failed-vs-
  worn distinction ("is it broken, or wearing?"), labor-hours clarity
- A **sort**: authorize now / decline politely / defer to next service /
  second-opinion — with the decline scripts that keep the relationship
- The **second-opinion math**: when the quote size justifies the cost
  and hassle of another garage's eyes, and how to ask for one without
  war
- **Price-sanity flags**: parts findable at retail (the OEM-vs-
  pattern-part question asked, not assumed), labor hours vs book-time
  norms — framed as questions to ask, never as asserted local prices

## Required Inputs

Ask for (if not already provided):
- The quote/invoice text or the phone-call version as remembered, with
  every line and price
- The original symptom: what the car was brought in FOR, in the user's
  words
- The car (make/model/year/mileage) and its service history roughness
- The relationship: trusted long-term garage, or first visit? (The
  prior changes the read — and the scripts)

## Framework

1. **Anchor every line to the symptom.** Three bins: fixes-the-
   complaint · discovered-while-in-there (real, but a *separate
   decision* — the lift doesn't obligate you) · unrelated-maintenance
   (legitimate as scheduled work, soft as urgency). A quote where
   nothing maps to the original symptom is itself a 🔴.
2. **Interrogate urgency, don't assume bad faith.** The load-bearing
   question, verbatim: "Which of these are unsafe to drive on today,
   and which can wait for the next service?" Follow-ups: "is the part
   failed or wearing?" · "what happens if I leave it 3 months?" Honest
   answers are specific and mixed; padding answers are uniformly
   urgent.
3. **Ask for the evidence ritual.** "Can you show me / photograph the
   worn part?" and "I'd like the old parts back" — both normal
   professional requests; both change soft-line behavior. On brakes,
   the numbers question: "how many millimeters left?" converts
   "getting low" into a fact with a timeline.
4. **Sanity-check the money as questions.** Parts: "is that OEM or
   pattern, and what's the price difference?" Labor: "how many hours is
   that line?" — then the user can compare against book-time sources
   themselves; the skill frames the questions and never invents local
   rates. Diagnostic fees credited against work done? Ask — often yes.
5. **Sort and script.** Authorize the symptom-fix and true safety
   items · defer maintenance-due to its schedule ("let's do that at
   the service in March — book me in") · decline the soft lines with
   the relationship-keeper: "just the [symptom fix] today, thanks —
   I'll plan the rest." Second-opinion trigger: quote is
   engine/transmission money, or the urgency answers came back
   uniform-and-vague; the ask that isn't war: "I want to think about a
   bill this size — can I get the diagnosis in writing?" (The written-
   diagnosis request is also the second garage's starting point.)

## Output Format

```
## The quote, decoded
| Line | £ | Bin (symptom / discovery / maintenance / soft) | Urgency
claimed vs evidenced | Verdict |

## Call the garage back with these
[The scripted questions, in order, with what honest vs soft answers
sound like]

## The sort
Authorize: … · Defer (with booking line): … · Decline (script): … ·
Second opinion because: …

## Money sanity questions
[OEM-vs-pattern · labor hours · diagnostic-fee credit — as asks]

⚠ This decodes the quote's structure — it is not a remote diagnosis.
A written diagnosis + a second garage is the tool for engine-money
decisions.
```

## Quality Checks

- [ ] Every line lands in exactly one bin with reasoning tied to the
      stated symptom
- [ ] The safety-critical-today question appears verbatim in the
      callback script
- [ ] Deferrals come with a rebooking line — declining maintenance
      forever is its own future 🔴, and the decode says so
- [ ] No local prices, book-times, or part costs asserted — money
      checks are framed as questions
- [ ] The tone treats the garage as presumed-honest; the structure does
      the protecting

## Anti-Patterns

- [ ] Do not diagnose the car — the skill interrogates the quote, and
      says so when asked to do more
- [ ] Do not script accusations — every line is deliverable to a
      mechanic you'll see again
- [ ] Do not dismiss discovered work as scam by default; the lift
      really does reveal things — separate decision ≠ illegitimate
- [ ] Do not let deferred safety items vanish — deferrals get dates
- [ ] Do not invent repair prices or hour norms; the questions put the
      numbers on the garage's side of the table where they belong

## Related

[[used-car-decoder]] before this car was yours;
[[home-contractor-quote-decoder]] — the same grammar in a different
trade; [[car-tco]] for whether this car is worth fixing at all.

## Example Trigger Phrases

- "Is this mechanic quote fair?"
- "Do I really need all this?"
- "Which of these repairs are padding?"
- "Should I get a second opinion on this garage quote?"
