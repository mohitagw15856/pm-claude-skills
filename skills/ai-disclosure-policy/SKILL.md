---
name: ai-disclosure-policy
description: "Decide when and how your product and communications must (or should) label AI-generated content, and write the disclosure policy — surface-by-surface rules, exact label wording, and the review trigger for regulations like the EU AI Act's transparency obligations. Use when asked 'do we have to label AI content', 'write our AI disclosure policy', 'are we covered for the AI Act', or when marketing/support/product start shipping AI-generated output. Produces a disclosure policy with a per-surface matrix and ready-to-use label copy. Not legal advice."
---

# AI Disclosure Policy Skill

Every company now ships AI-generated content somewhere — support replies,
marketing images, chatbot conversations, synthetic voices — and most have no
rule for when to say so. Meanwhile transparency regulation is arriving (the EU
AI Act's transparency obligations for chatbots, synthetic media, and deepfakes
being the headline example, with obligations phasing in through 2026–2027), and
the trust cost of an *undisclosed* AI surface being discovered is higher than
the disclosure ever was. This skill produces the policy: what you label, where,
in what words — with the honest line that final regulatory judgment belongs to
your lawyer, and this document is what makes that conversation short.

## What This Skill Produces

- A **surface inventory**: every place AI-generated content reaches users or
  the public, with today's disclosure state
- A **disclosure matrix**: per surface — required (regulatory), expected
  (platform/industry norm), or chosen (trust) — with the reasoning
- **Label copy** ready to ship: UI strings, footer lines, image/video marks,
  chatbot self-identification wording
- The **review triggers**: what changes (new surface, new market, new
  regulation phase) forces a policy re-read, and who owns it

## Required Inputs

Ask for (if not already provided):
- Where AI output ships today or soon: chatbots, support, marketing content,
  images/video/voice, code, docs — and which are fully automated vs
  human-reviewed
- Markets served (EU exposure changes obligations) and industry (regulated
  sectors add rules)
- Existing policy fragments ([[ai-usage-policy]] covers internal use — this
  skill covers outward disclosure; link them, don't duplicate)
- Risk posture: minimum-compliance or trust-differentiator

## Process

1. **Inventory before policy.** List every AI-touching surface, then the ones
   the user forgot: auto-generated email, AI-assisted support macros, synthetic
   voices on calls, generated product imagery, auto-summaries in the product.
   For each: fully-AI, AI-drafted-human-approved, or AI-assisted — the
   disclosure answer differs by degree of human control.
2. **Sort into required / expected / chosen.** Required: where a regulation
   plausibly applies — chatbots that could be mistaken for humans, synthetic
   media, emotionally targeted content (flag these for counsel; cite the
   regulation family, not invented article numbers). Expected: platform rules
   and industry norms (ad platforms, app stores increasingly require labels).
   Chosen: where labeling is optional but discovery-risk or brand values argue
   for it. State the reasoning per row — a policy without reasons decays.
3. **Write labels people won't hate.** Honest, short, non-groveling:
   "AI-assisted, human-reviewed" beats a paragraph of throat-clearing. Chatbots
   self-identify at conversation start, not in a footer. Human-approved content
   can say so — the disclosure spectrum has two ends.
4. **Decide the edge cases explicitly**: AI-drafted-human-edited text (the big
   one — set a threshold and say it), internal content that leaks, user-facing
   personalization, A/B tests of the labels themselves (don't).
5. **Wire the triggers.** New surface, new market, automation-degree change,
   regulation phase-in dates → named owner re-reviews. Policy without a
   re-review trigger is a screenshot, not a policy.

## Output Format

```
## Where AI ships today
| Surface | Degree (full / drafted / assisted) | Disclosed today? |

## Disclosure matrix
| Surface | Required / Expected / Chosen | Reasoning | Label |

## Label copy (ready to ship)
[Exact strings per surface type]

## Edge-case rulings
[The threshold decisions, stated plainly]

## Review triggers & ownership
[What forces a re-read, who owns it, standing counsel questions]
```

## Quality Checks

- [ ] The inventory surfaced at least one AI surface the user didn't list
- [ ] Every matrix row carries reasoning; "required" rows name the regulation
      family and carry the flag-for-counsel marker — no invented article
      citations
- [ ] Label copy is shippable as-is: short, honest, located where users
      actually are (chatbot labels at the top, not the terms page)
- [ ] The AI-drafted-human-edited threshold is decided, not deferred
- [ ] The not-legal-advice line is present and the counsel-question list makes
      the legal review cheap

## Anti-Patterns

- [ ] Do not assert specific legal conclusions ("Article X requires you to…")
      — identify plausibly-applicable obligations and route to counsel
- [ ] Do not write labels as apologies — disclosure done confidently is a
      trust feature
- [ ] Do not produce one blanket rule; the matrix exists because a support
      macro and a synthetic voice are different obligations
- [ ] Do not duplicate [[ai-usage-policy]] — internal use rules live there;
      this is outward-facing disclosure

## Example Trigger Phrases

- "Do we have to label AI content?"
- "Write our AI disclosure policy."
- "Are we covered for the AI Act?"
