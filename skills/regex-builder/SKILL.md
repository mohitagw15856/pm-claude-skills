---
name: regex-builder
description: "Build a regular expression from a plain-English description, or explain an existing one. Use when asked to write a regex, match/validate/extract a pattern, or understand what a regex does. Produces the regex, a token-by-token breakdown, passing and failing test cases, and notes on flavor/edge cases."
---

# Regex Builder & Explainer Skill

Produce correct, readable regular expressions — and explain them so the user actually understands what they're shipping.

## Working from a brief

Infer the regex flavor (JavaScript/PCRE/Python/Go) from context; if unstated, default to one and say so *(assumed — confirm)*. Always deliver a working pattern and tests even from a loose description. Never leave placeholders.

## Two modes
- **Build:** the user describes what to match → produce the regex.
- **Explain:** the user pastes a regex → break it down.
Detect which from the input.

## Output Structure

### Pattern
The regex in a code block, plus the **flavor** and any **flags** (e.g. `i`, `g`, `m`) and why.

### Breakdown
A token-by-token table or list: each part of the pattern and what it matches.

| Token | Matches |
|-------|---------|
| `^` | start of string |
| … | … |

### Test cases
- ✅ **Matches:** 3–5 strings it should match
- ❌ **Rejects:** 3–5 strings it should *not* match (include the tricky near-misses)

### Notes
Edge cases, catastrophic-backtracking risks, anchoring, Unicode, and a simpler alternative if the regex is getting unwieldy (sometimes "don't use regex" is the right answer — say so).

## Quality Checks

- [ ] The pattern actually passes the listed "matches" and rejects the "rejects"
- [ ] Flavor and flags are stated
- [ ] The breakdown covers every token, not just the interesting ones
- [ ] Edge cases / backtracking risks are flagged

## Anti-Patterns

- [ ] Do not give a regex with no test cases — always prove it
- [ ] Do not ignore the flavor — `\d`, lookbehind, and named groups differ across engines
- [ ] Do not produce an unreadable one-liner when a commented/verbose version or a non-regex approach is clearer
- [ ] Do not silently assume anchoring — state whether it matches the whole string or a substring
