---
name: formula-detangler
description: "Untangle the spreadsheet formula nobody dares touch — decompose the seven-function nest into named readable steps, explain what it actually does (vs. what it's believed to do), and rebuild it maintainably with helper columns and modern functions. Use when asked what does this formula do, this IFERROR-VLOOKUP monster broke, make this formula maintainable, or nobody understands the sheet the analyst left. Produces the plain-language decode, the step decomposition into helper columns, the believed-vs-actual gaps, and the rebuilt version."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/formula-detangler.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Formula Detangler Skill

Every long-lived sheet grows one: the 400-character nest of IFs inside IFERROR inside INDEX-MATCH that one departed analyst understood — now load-bearing, feared, and edited by no one. Detangling is decompilation: read it inside-out, name each layer's job in plain language, check the *believed* behavior against the *actual* (the gaps are where the sheet has been quietly wrong), then rebuild as steps a successor can read — helper columns with named headers beat heroic one-liners in every sheet that outlives its author.

## What This Skill Produces

- **The decode** — the formula's actual behavior in plain language, layer by layer
- **The believed-vs-actual gaps** — where what it does differs from what the team thinks it does (the silent-wrong findings)
- **The decomposition** — the nest split into named helper-column steps, each testable alone
- **The rebuild** — modern equivalents (LOOKUP-family upgrades, IFS over IF-chains) where the platform allows, with the migration check

## Required Inputs

Ask for these if not provided:
- **The formula, verbatim** — and the cells/ranges it references (the decode reads the actual text, not a description)
- **The believed behavior** — what the team *thinks* it does ("it pulls the latest price for the customer's tier") — the decode is diffed against this, and the diff is often the payoff
- **The platform** — Excel/Sheets and roughly the version; rebuild options (XLOOKUP, LET, IFS, dynamic arrays) depend on it
- **The blast radius** — what reads this cell; rebuilds get verified against current outputs before anything switches over

## Framework: The Detangle Rules

1. **Read inside-out, name each layer:** innermost function first — "MATCH finds the customer's row" → "INDEX pulls that row's price" → "IFERROR hides when the customer's missing" — each layer gets one plain sentence. The decode is these sentences in order, and writing them usually surfaces the surprise.
2. **IFERROR is where sins hide:** every error-suppression layer gets interrogated — *what error, from what cause, and is hiding it right?* IFERROR-to-blank routinely masks broken lookups as legitimate empties; the decode names what's being swallowed, because that's usually the believed-vs-actual gap.
3. **Decompose to helper columns:** each named layer becomes a column with a header saying its job (`_customer_row`, `_tier_price`, `_final_with_fallback`) — individually inspectable, individually testable, and readable by the next person *as documentation*. Hide or group the helpers if aesthetics demand; never re-inline them to look clever.
4. **Rebuild with the platform's decade:** IF-chains → IFS · nested VLOOKUP acrobatics → XLOOKUP/INDEX-MATCH with explicit if-not-found · repeated subexpressions → LET (names inside the formula) where available. Modern functions exist precisely to make yesterday's nests unnecessary.
5. **Verify by parallel run:** the rebuild lives beside the original across the real data; a diff column proves equivalence (or surfaces the *original's* bugs — findings, not failures, and they route to the believed-vs-actual report before anyone "fixes" the rebuild to match old wrongness). Only then does the switchover happen, original commented/parked per [spreadsheet-audit](../spreadsheet-audit/SKILL.md) hygiene.

## Output Format

# Detangle: [cell/formula name]

## The Decode (inside-out)
[Layer → plain sentence, in order · the one-paragraph summary of what it actually does]

## Believed vs Actual
| The team thinks | It actually | Consequence |
|---|---|---|
[Including every IFERROR's swallowed cases]

## The Decomposition
[Helper columns: name · job · formula — each testable alone]

## The Rebuild + Verification
[Modern version · the parallel-run diff result · switchover only on clean diff (or documented divergence-is-the-old-bug)]

## Quality Checks

- [ ] Every layer has its plain-language sentence
- [ ] Every error-suppression names what it swallows
- [ ] Helper columns carry job-stating headers
- [ ] The rebuild was parallel-run against real data before switchover
- [ ] Diffs were investigated as possible original-bugs, not auto-matched

## Anti-Patterns

- [ ] Do not "fix" before decoding — editing a formula you can't narrate is surgery blindfolded
- [ ] Do not preserve heroic one-liners for pride — maintainability is the requirement; cleverness was the problem
- [ ] Do not let IFERROR survive uninterrogated — silent blanks are how sheets lie politely
- [ ] Do not match the rebuild to the original's bugs — believed-vs-actual gaps get decided, not replicated
- [ ] Do not switch over without the parallel diff — equivalence is demonstrated, never assumed

## Example Trigger Phrases

- "What does this formula do?"
- "Untangle this nested IF formula."
- "Make this formula maintainable."
- "Rewrite this formula with helper columns."
