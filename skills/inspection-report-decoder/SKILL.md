---
name: inspection-report-decoder
description: "Decode a home inspection report into what's cosmetic, what's expensive, and what kills deals — with repair-cost ranges and the negotiation list. Use when asked to decode my inspection report, is this inspection bad, what should I ask the seller to fix, or should I walk after inspection. Produces a findings triage (walk-risk / negotiate / cosmetic), cost ranges per item, the ask-the-seller list, and the questions for your inspector before the objection deadline."
---

# Inspection Report Decoder Skill

Inspection reports bury a $15,000 foundation note between forty comments about caulk — everything is written in the same alarmed font. This skill triages: what threatens the deal, what's a negotiation line, what's Saturday-morning maintenance — with cost ranges, because a finding without a number can't be negotiated.

## What This Skill Produces

- **The triage** — 🔴 walk-risk / 🟡 negotiate / 🟢 cosmetic-or-maintenance, every finding placed
- **Cost ranges** — order-of-magnitude repair estimates per meaningful finding, stated as ranges with the "get a specialist quote" flag where warranted
- **The seller ask-list** — repairs vs credits, ranked by leverage, with the deadline noted
- **Inspector follow-ups** — the questions to ask while you still can

## Required Inputs

Ask for these only if not provided:
- **The report** (paste the findings; photos' captions help)
- **The deal context** — price, market temperature (multiple offers?), objection/resolution deadline
- **The house basics** — age, region (cost ranges and typical failure modes vary), how long you plan to stay
- **Your risk appetite** — first home stretched thin vs experienced renovator changes the triage

## Framework

1. **The big five get found first:** foundation/structural movement, roof (age + active leaks), electrical (panel type, aluminum branch wiring), plumbing (supply material, sewer line), water intrusion/grading. Everything else waits.
2. **Cost ranges honestly:** wide ranges with the driver named ("panel replacement: low thousands; if service upgrade needed, more — electrician quote required"). A specialist-quote flag beats a false-precision number.
3. **Age vs defect:** a 19-year-old roof on a 20-year design life is *pricing information*, not a defect the seller "hid" — decode which findings are negotiation-legitimate vs already-in-the-price.
4. **Negotiate credits over repairs** where possible — the seller's rushed contractor is nobody's friend; state the tradeoff.
5. **The deadline governs everything:** objection windows are short and expire silently; every recommendation carries the date.

## Output Format

### Inspection Decode: [address] — objection deadline: [date]
**The one-paragraph verdict:** proceed / negotiate hard / specialist-inspect before deciding / walk-risk present — and why.

**Triage table** | Finding (report §) | Plain English | Cost range | Tier |

**🚩 The money findings** — each: what it is, the realistic range, the driver, specialist-quote flag
**The seller list** — asks ranked by leverage: [credit/repair/price] with suggested wording
**Ask your inspector** — 3–6 questions (verbal answers are often franker than the written report)
**Budget reality** — year-one likely spend if you buy as-is: [range]

End verbatim: *"This is a plain-language reading, not a professional inspection, engineering, or legal opinion — cost ranges are regional estimates; get specialist quotes for anything load-bearing before your objection deadline."*

## Quality Checks

- [ ] Every finding is tiered — none left floating in report-speak
- [ ] Every 🔴/🟡 carries a cost range with its driver named
- [ ] Age-based findings are distinguished from defects
- [ ] The objection deadline appears in the header and the asks
- [ ] The disclaimer appears verbatim

## Anti-Patterns

- [ ] Do not mirror the report's flat tone — triage IS the value; forty equal alarms equal zero alarms
- [ ] Do not price findings as points ("$8,500") — ranges with drivers; false precision dies at the first quote
- [ ] Do not treat every finding as seller-negotiable — priced-in aging isn't a gotcha
- [ ] Do not let 🟢 items pad the ask-list — nickel lists cost credibility on the dollar items
- [ ] Do not say walk/don't-walk for them — surface the walk-risks, price the rest, hand the decision back

## Example Trigger Phrases

- "Decode my inspection report."
- "Is this inspection bad?"
- "What should I ask the seller to fix?"
- "Should I walk after inspection?"
