# Spot AI Mistakes

AI fails in patterned, learnable ways — it invents citations, states outdated facts with total confidence, agrees with whatever you imply, and fumbles arithmetic while sounding certain. Once you know the patterns and their tells, you catch most errors on sight. This maps the failure modes most relevant to how *you* use AI, the signs that give each away, and a fast check for the ones that would actually hurt — building the instinct so confident-wrong stops catching you off guard.

## What This Skill Produces

- **The failure patterns that matter for you** — the specific ways AI goes wrong in your use (hallucinated facts, fabricated citations/quotes, outdated info, sycophancy, arithmetic slips, false precision, missed nuance, confident guessing)
- **The tells for each** — the signals that give a mistake away (suspiciously specific sources, confidence on recent/niche topics, agreeing too readily, round-number math)
- **A fast check for the dangerous ones** — a quick way to catch the errors that would actually cost you, without over-checking everything
- **A calibrated trust level** — where AI is reliable for your uses and where it isn't, so trust is earned per-domain not blanket
- **The instinct, built** — the habit of pattern-matching for these tells as you read AI output

## Required Inputs

Ask for these if not provided:
- **How you use AI** — the domains and tasks (points at which failure modes matter most)
- **A past miss** — a time AI got something wrong on you, if you have one (great teacher)
- **The stakes** — what a missed error would cost in your use
- **Your trust level now** — where you're too trusting or too skeptical

## Framework: Know The Patterns, Read The Tells

1. **Map failures to your use.** The failure modes that matter depend on how you use AI — a coder cares about wrong APIs, a researcher about fake citations, a student about outdated facts. Focus on yours.
2. **Learn the tells.** Each failure has signals: fabricated citations look oddly specific and un-Google-able; hallucinations spike on recent/niche topics; sycophancy shows as agreeing right after you hint at a preference; math errors hide in confident round numbers.
3. **Watch the confidence trap.** AI's tone is uniform whether it's right or inventing — so confidence is *not* a signal of correctness. Judge by pattern and verification, never by how sure it sounds.
4. **Check the dangerous ones fast.** For the errors that would actually hurt, a quick independent check (a source, a second tool, testing it) — don't over-verify the low-stakes stuff.
5. **Calibrate trust per domain.** Trust AI more where it's reliable for you and less where it isn't — calibrated, not blanket trust or blanket suspicion.

## Output Format

### AI mistake-spotting: for [how you use it]

**Failure patterns that matter for you:** [the specific ones — e.g. fake citations, outdated facts, sycophancy, math slips].
**Tells for each:** [pattern → the signal that gives it away].
**The confidence trap:** tone is uniform whether right or wrong — never trust by how sure it sounds.
**Fast check for the dangerous ones:** [quick verification for the errors that would cost you].
**Your calibrated trust:** [reliable for X / verify hard for Y].

## Quality Checks
- [ ] Focuses on the failure modes relevant to the person's use
- [ ] Gives concrete tells for each pattern
- [ ] Warns that confident tone isn't a correctness signal
- [ ] Provides a fast check scaled to stakes
- [ ] Calibrates trust per-domain, not blanket

## Anti-Patterns
- **A generic list** of AI failures with no tells or relevance.
- **Trusting confident tone** as a sign it's right.
- **Blanket distrust** that makes AI useless, or blanket trust that gets you burned.
- **Over-verifying everything** instead of the dangerous ones.
- **No calibration** to where AI is actually reliable for you.

## Example Trigger Phrases
- "How do I know when AI is making something up?"
- "What are the common ways AI gets things wrong?"
- "How do I catch AI errors before they bite me?"
- "Where does AI tend to mess up in [my kind of work]?"
- "Teach me to spot when an AI answer is unreliable."
