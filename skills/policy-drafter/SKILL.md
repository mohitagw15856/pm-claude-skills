---
name: policy-drafter
description: "Draft an internal policy people can actually follow — the rule stated plainly with its reason, the bright lines separated from the judgment zones, the edge cases resolved by principle, and the enforcement reality stated honestly. Use when asked write our expense/remote-work/AI-use/security policy, turn this incident into a policy, our policy doc is unreadable, or people keep asking what's allowed. Produces the policy with rules-plus-reasons, the bright-line/judgment split, the worked edge cases, and the honest enforcement section."
---

# Policy Drafter Skill

Internal policies fail readers two ways: legalese nobody parses (so folklore governs instead), or vague aspiration ("use good judgment with expenses") that answers no actual question. A followable policy states each rule plainly *with its reason* (reasons recruit compliance and guide the unlisted cases), separates bright lines (never/always, no judgment) from judgment zones (factors + who decides), and works three real edge cases in the text — because the edge cases are what people actually come to a policy to resolve. Honesty requirement: the enforcement section describes what actually happens, not theater.

> **Not quite this?** Use `privacy-policy-drafter` when you need an external privacy notice for users rather than an internal policy.

## What This Skill Produces

- **The policy** — scope, the rules with reasons, bright lines vs. judgment zones marked
- **The worked edge cases** — 3–5 real scenarios resolved in the text, showing the principle in motion
- **The enforcement section** — what happens on violation, honestly, and who decides gray cases
- **The one-page summary** — the rules card people will actually consult (the full policy is the reference; the card is the interface)

## Required Inputs

Ask for these if not provided:
- **The behavior being governed and why now** — the incident, the ambiguity, the new tool; policies exist for reasons and the reasons belong in the text
- **The real cases** — the actual questions people have asked ("can I expense the airport lounge?", "can I use AI on customer data?") — these become the worked examples, and a policy that doesn't answer them fails at its job
- **The bright-line candidates** — what leadership genuinely intends as never/always, vs. what they want discretion on; drafting discovers this boundary and forces the conversation
- **The enforcement truth** — what will actually happen on violation; if the answer is "probably nothing," the policy needs redesign (fewer rules, real ones), not stronger language

## Framework: The Followability Rules

1. **Every rule carries its reason:** "Expenses over $500 need pre-approval — because surprises at that size break the team budget's month" — the reason converts rules from arbitrary to legible, guides cases the rule didn't list, and survives the rule's author leaving. Rules without reasons age into folklore.
2. **Bright lines and judgment zones get different grammar:** bright lines are absolute and short ("customer data never enters unapproved tools — no exceptions") · judgment zones name the factors and the decider ("client gifts: consider value, timing, and optics; over $100 or near a renewal → ask [role]"). Blending the two produces policies that are simultaneously rigid and vague.
3. **Edge cases are worked in the text:** the 3–5 real questions get answered *with the reasoning shown* ("Lounge on a delayed red-eye: yes — the reason behind the meal rule (reasonable comfort on work travel) covers it") — teaching the principle so the sixth case answers itself.
4. **The floor is the busy reader:** the one-page card carries the rules and bright lines; the full policy holds reasons, edges, and process. A policy only consultable by reading eleven pages will be consulted never; the card is the interface, per the [template-designer](../template-designer/SKILL.md) lightness law.
5. **Enforcement honesty:** the section states the actual consequence ladder and the gray-case decider — and if drafting reveals there's no appetite to enforce a rule, the rule gets cut or softened to guidance *now*. Unenforced rules teach that the whole policy is decorative; three real rules beat eleven ornamental ones.

## Output Format

# Policy: [domain] — v[N], owner: [role]

## Why This Policy Exists
[Two sentences — the incident/ambiguity it resolves]

## The Rules (with reasons)
[Each: the rule · — because [reason] · 🔒 bright line / ⚖️ judgment zone (factors + decider)]

## Worked Edge Cases
[The real questions, resolved with reasoning shown]

## Enforcement (honestly)
[The consequence ladder as it will actually run · gray cases → [decider] · review cadence]

## The One-Page Card
[Rules + bright lines only — the consultable interface]

## Quality Checks

- [ ] Every rule states its reason
- [ ] Bright lines and judgment zones are visually and grammatically distinct
- [ ] The worked cases are the team's real questions, reasoning shown
- [ ] Enforcement describes reality — no rule survives that nobody will enforce
- [ ] The card fits a page and answers the common cases alone

## Anti-Patterns

- [ ] Do not draft in legalese — unparsed policies govern nothing; folklore fills the gap
- [ ] Do not write "use good judgment" as a rule — name the factors and the decider or it's not policy
- [ ] Do not skip the edge cases — they're the questions the policy exists to answer
- [ ] Do not keep unenforceable rules for tone — each one discounts the enforceable ones
- [ ] Do not publish without an owner and review date — orphan policies drift into fiction within a year

## Example Trigger Phrases

- "Write our expense/remote-work/AI-use/security policy."
- "Turn this incident into a policy."
- "Our policy doc is unreadable."
