---
trigger: model_decision
description: "Check AI output before you trust or use it — where it's likely wrong, what to verify, and how to catch confident-sounding errors. Use when asked can I trust this AI answer, how do I verify what AI told me, fact-check this AI output, or is this AI response reliable. Produces a risk read on the specific output (the claims most likely to be wrong or made up), the parts that need independent verification vs the parts that are low-risk, how to actually verify each, the tells of AI hallucination and overconfidence, and a habit for building verification into your AI use — because AI is confidently wrong often enough that unchecked trust is a real risk."
---

# AI-Output Verifier

AI is fluent, confident, and sometimes completely wrong — inventing facts, citations, and details in the same authoritative tone as the correct ones. That confidence is exactly what makes unverified trust dangerous. This checks a specific output: which claims are most likely wrong or fabricated, what genuinely needs independent verification, how to verify it, and the tells of hallucination — so you use AI's speed without inheriting its errors.

## What This Skill Produces

- **A risk read of the output** — which specific claims are most likely to be wrong, outdated, or made up (facts, numbers, citations, names, recent events, specifics)
- **Verify vs. low-risk split** — what genuinely needs independent checking vs. what's low-stakes or self-evident, so you spend effort where it counts
- **How to verify each** — the concrete way to check the high-risk claims (a primary source, a second tool, a domain expert, testing it)
- **The hallucination tells** — the signs AI is likely fabricating (oddly specific citations, confident claims about recent/niche facts, plausible-but-unverifiable details)
- **A verification habit** — how to build appropriate checking into your AI use by default, scaled to the stakes (trust more for low-stakes, verify hard for high-stakes)

## Required Inputs

Ask for these if not provided:
- **The output** — the AI response to check (paste it)
- **What it's for** — the stakes (a casual question vs. something you'll publish, decide on, or act on)
- **The domain** — factual/technical/legal/medical/current-events (some are far higher-risk for AI)
- **What you'd do with it** — trust it, act on it, share it, build on it

## Framework: Risk-Rate The Claims, Verify What Matters

1. **Scan for the high-risk claim types.** Specific facts, numbers, dates, names, citations, recent events, and niche/technical specifics are where AI most often invents — flag these.
2. **Split by risk and stakes.** Separate the claims that genuinely need verification (high-risk × high-stakes) from the low-risk or low-stakes ones you can reasonably accept — don't verify everything equally.
3. **Verify against real sources.** For the high-risk claims, check a primary source, a second independent tool, an expert, or by testing — not by asking the same AI "are you sure?" (it'll often just re-confirm).
4. **Watch the hallucination tells.** Oddly precise citations, confident answers about very recent or obscure things, and unverifiable specifics are red flags — treat them as unverified until checked.
5. **Scale trust to stakes.** For low-stakes uses, light verification is fine; for anything you'll publish, decide on, or that could harm if wrong, verify hard. Build this reflex in.

## Output Format

### Verifying: [the output] · for [use/stakes]

**High-risk claims (verify these):** [specific facts/numbers/citations/recent/niche → most likely wrong].
**Low-risk (reasonable to accept):** [self-evident / low-stakes parts].
**How to verify each:** [primary source / second tool / expert / test — not re-asking the same AI].
**Hallucination tells present:** [odd-specific citations · confident on recent/niche · unverifiable specifics].
**Trust level for your use:** [light check for low-stakes / verify hard because it's high-stakes].

## Quality Checks
- [ ] Flags the specific high-risk claim types in the output
- [ ] Splits what needs verification from what's low-risk, by stakes
- [ ] Gives concrete verification methods (not "ask the AI again")
- [ ] Names the hallucination/overconfidence tells present
- [ ] Scales the recommended trust to the actual stakes

## Anti-Patterns
- **"Verify everything"** equally, ignoring stakes.
- **Re-asking the same AI** "are you sure?" as verification.
- **Trusting confident tone** as a signal of correctness.
- **Missing the high-risk claim types** (citations, recent facts, numbers).
- **No stakes-based scaling** of how hard to check.

## Example Trigger Phrases
- "Can I trust this answer the AI gave me?"
- "How do I verify what ChatGPT told me before I use it?"
- "Fact-check this AI output — I'm about to publish it."
- "Is this AI response reliable enough to act on?"
- "What in this AI answer should I double-check?"
