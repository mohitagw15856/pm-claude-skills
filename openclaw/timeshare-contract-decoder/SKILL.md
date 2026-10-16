---
name: timeshare-contract-decoder
description: "Decode a timeshare contract before signing — the lifetime cost math, the perpetuity and fee-escalation clauses, the rescission window, and the honest resale reality. Use when asked to review this timeshare, decode my timeshare contract, can I get out of a timeshare, or is this vacation ownership worth it. Produces the true-cost projection, the clause decode with the perpetuity traps flagged, the rescission-window computation, and — for existing owners — the legitimate exit paths vs the exit-scam checklist."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/timeshare-contract-decoder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Timeshare Contract Decoder Skill

Timeshares are sold in a 90-minute high-pressure window and owned for decades — sometimes by your heirs. This skill does the reading the presentation was designed to prevent: the lifetime cost computed, the perpetuity and escalation clauses flagged, and the rescission clock — the single most valuable number in the document — calculated to the day. For existing owners, it separates the real exits from the exit-scam industry that preys on the trapped.

## What This Skill Produces

- **The lifetime cost projection** — purchase + financing + escalating fees over 10/20/30 years vs renting the same weeks
- **Clause decode** — perpetuity, fee escalation, special assessments, booking reality, transfer restrictions
- **The rescission clock** — jurisdiction-dependent cancellation window, computed with the how-to-cancel steps
- **Exit paths (owners)** — legitimate routes vs the scam-pattern checklist

## Required Inputs

Ask for these only if not provided:
- **The contract/offer** — price, financing terms, annual fees, the maintenance-fee history if obtainable
- **When it was signed** (if already signed) — the rescission window may still be open; this is urgent
- **The jurisdiction of purchase** — rescission periods vary widely; never guess
- **Their vacation reality** — actual weeks/year they'd use, destinations, flexibility

## Framework

1. **Rescission first, always:** if signed within recent days, compute the window *now* and lead with the cancellation procedure (typically written notice, specific address, postmark rules). This paragraph outranks everything else in the decode.
2. **The lifetime math:** price + loan interest (timeshare financing rates are routinely steep) + fees compounding at the historical escalation rate (ask for history; absent it, model at several plausible rates and say so) − honest usage. Compare against simply renting comparable weeks.
3. **The perpetuity flags:** "in perpetuity" obligations, heir-binding language, developer's unilateral special assessments, exchange-program dependencies that can devalue independently.
4. **Resale honesty:** the resale market for most timeshares is effectively near-zero; the contract's "investment" framing is decoded against that reality, plainly.
5. **The exit-scam checklist (owners):** upfront-fee "exit companies," guaranteed-exit claims, cold calls citing a "buyer waiting" — pattern-flag them. Legitimate paths: rescission (if in window), developer surrender/deed-back programs, licensed resale at honest prices, attorney consultation for misrepresentation cases.

## Output Format

### Timeshare Decode: [property/company]
**⏰ Rescission status:** [in window until DATE — cancellation steps below / window closed — see exit paths]

**The lifetime math** | Horizon | All-in cost | Rent-equivalent | Verdict |
**Clause decode** | Clause | Says | Means | Severity |
**🚩 Ranked flags** — perpetuity, escalation, assessments, booking reality — each with the quoted line
**Your usage vs the promise:** [honest fit paragraph]
**Exit paths** [owners: legitimate routes ranked · the scam checklist]

End verbatim: *"This is a plain-language reading, not legal or financial advice — rescission rights and contract enforceability vary by jurisdiction; for an in-window cancellation act today, and for anything else confirm with a licensed attorney."*

## Quality Checks

- [ ] Rescission status and date lead the decode when potentially open
- [ ] Lifetime math shows its escalation assumption and the rent comparison
- [ ] Perpetuity/heir language is quoted, not paraphrased
- [ ] Resale reality is stated plainly
- [ ] The exit-scam checklist appears for any post-window owner
- [ ] The disclaimer appears verbatim

## Anti-Patterns

- [ ] Do not bury the rescission window — it's the most valuable number in the document and it's expiring
- [ ] Do not use the sales deck's fee assumptions — model escalation from history or plausible rates, stated
- [ ] Do not entertain the "investment" frame — decode it against the actual resale market
- [ ] Do not recommend exit companies — pattern-flag the industry and point to the legitimate routes
- [ ] Do not shame the buyer — the presentation was engineered by professionals; the decode is for deciding, not regretting

## Example Trigger Phrases

- "Review this timeshare."
- "Decode my timeshare contract."
- "Can I get out of a timeshare?"
- "Is this vacation ownership worth it?"
