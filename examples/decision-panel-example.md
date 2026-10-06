# Example: decision-panel

## What this skill does

Runs a decision past five clashing advisors (optimist, pessimist, numbers person, ethicist, future-you), surfaces their biggest disagreement, names the tie-breaker question, and gives a chair's verdict with the accepted trade-off.

## How to trigger it

### Example 1: a job offer with a pay cut

**You say:**
> "Help me decide: offer from an early-stage startup, 20% pay cut from my current £65k, meaningful equity, role I'd love. I have 8 months' expenses saved, no dependants."

**Claude produces (excerpt):**

### Decision: take the startup offer at £52k?

**🌤 Optimist:** This is the low-risk window of your whole life: savings, no dependants, a role you would love. The upside case (equity plus two years of compressed learning) dwarfs the £13k.

**🌧 Pessimist:** Early-stage equity is statistically worth near zero, and "role I'd love" is based on interviews, which is how everyone describes jobs they later hate. You are buying a lottery ticket with a 20% salary subscription.

**🔢 Numbers:** The cut is £13k/year gross, ~£8.8k net. Your 8 months of runway at the lower salary becomes ~10 months of safety margin if it fails. The equity needs roughly a 1-in-8 chance of a modest exit to break even; most seed-stage odds are worse than that, so the equity is not the reason to go. The learning premium is.

**⚖️ Ethicist:** Nobody else is harmed either way; the only obligation in play is to your own stated values, and you have said "love the role" out loud. Deciding against your stated values needs a reason, and "£8.8k net" is a thin one at your savings level.

**🔮 Future-you:** At 45 you will not remember the £13k. You might remember not going. But check the premise: future-you only endorses this if the startup is the kind you'd be proud of trying, not just escaping your current job. Make sure this is a towards-decision, not an away-decision.

**Biggest clash:** Optimist and Pessimist disagree on what the equity is: upside or decoration. The Numbers advisor settles that (decoration), which reframes the whole decision as paying £8.8k/year for the role and the learning.

**Tie-breaker question:** Would you take this exact job at this salary if the equity were zero? If yes, go; the equity is a bonus. If no, you are buying the lottery ticket the Pessimist described.

**Chair's verdict:** Take it, provided the tie-breaker answers yes and the startup has 12+ months of funding you have verified, not assumed. The trade-off being accepted: ~£18k over two years for a compressed-learning bet, insured by your savings. That is a fair price at your life stage, and you should negotiate a 6-month compensation review as a condition of signing.

### Example 2: a smaller decision, same rigour

**You say:**
> "Run this by the advisors: do I confront my co-founder about missing three board prep sessions?"

**Claude produces (excerpt):**

**🌧 Pessimist:** The third miss is a pattern, and patterns ignored become norms.
**🔮 Future-you:** Every founder divorce story starts with "I didn't say anything for months."

**Tie-breaker question:** Is there something happening in their life you don't know about? Ask that first; it changes the conversation from charge to check-in.

**Chair's verdict:** Raise it this week, framed as the check-in. The trade-off: a possibly awkward conversation now against a certainly worse one later.

## Tips for best results

- Give the material facts (savings, deadlines, numbers); the Numbers advisor is only as good as the inputs.
- Answer the tie-breaker question honestly before reading the verdict again; it often decides for you.
- Add a specialist advisor (health, legal) when the decision touches one; say so and the panel seats them.

## Related skills

- `five-minds` for worldview-level perspectives on a question rather than a verdict on a decision
- `decision-journal` to record the call and check your calibration later
