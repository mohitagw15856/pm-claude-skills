---
name: ad-copy
description: "Write platform-native paid ad copy with multiple angles to test. Use when asked to write ad copy, Google/Facebook/LinkedIn/Instagram ads, PPC headlines, or paid social creative copy. Produces ready-to-ship variants per platform (headlines, primary text, descriptions, CTAs) across distinct angles, sized to each platform's limits, with a note on what each variant tests."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ad-copy.html
metadata:
  {
    "openclaw": { "emoji": "✍️" }
  }
---

# Ad Copy Skill

Paid ads live or die on the hook and the angle, and you never know which wins — so you test several.
This skill writes platform-native variants (right format, right character limits) across *distinct
angles* (pain, outcome, social proof, curiosity, objection), so you ship a real test, not one guess.

## Required Inputs

Ask for these only if they aren't already provided:

- **Platform(s)** — Google Search, Meta (FB/IG), LinkedIn, X, etc. (format and limits differ).
- **Product & offer** — what's advertised and the action (click, lead, install, buy).
- **Audience & their trigger** — who's targeted and the pain/desire that makes them click.
- **Differentiator & proof** — why you, and any metric/social proof to use.
- **Landing destination** — so the ad matches the page (message match lifts conversion).

## Output Format

### Ad Copy: [product] — [platform(s)]

For each platform, produce variants in its native fields and limits, e.g.:

**Google Search** — 3 sets of {Headlines (≤30 chars ×3), Descriptions (≤90 chars ×2)}.
**Meta / LinkedIn** — 4 ads of {Primary text (hook in first line, ~125 chars before "see more"), Headline, Description, CTA button}.

Each variant labelled with its **angle** and what it tests:

| # | Angle | Hook | What it tests |
|---|---|---|---|
| 1 | Pain | "Still doing X by hand?" | does the problem framing resonate |
| 2 | Outcome | "Ship Y in a day" | does the result pull harder |
| 3 | Social proof | "5,000 teams switched" | does credibility win |

**Notes** — the message-match line to keep consistent with the landing page, and which variable to hold constant so the test is clean.

## Quality Checks

- [ ] Variants span genuinely distinct angles (not reworded versions of one)
- [ ] Each fits the platform's exact fields and character limits
- [ ] The hook lands in the first line / before the fold
- [ ] Ad message matches the landing page it points to
- [ ] Each variant notes what it's testing, so results are interpretable

## Anti-Patterns

- [ ] Do not ship one ad — without variants you can't learn; give a real test set
- [ ] Do not write near-duplicate variants — vary the angle, not just the wording
- [ ] Do not exceed platform limits — copy that truncates mid-hook wastes spend
- [ ] Do not mismatch ad and landing page — broken message match tanks Quality Score and conversion
- [ ] Do not over-claim — ad platforms reject unsupported superlatives, and they erode trust

## Based On

Performance-creative practice — angle testing, platform-native formats, message match, hook-first structure.

## Example Trigger Phrases

- "Write ad copy for our launch."
- "Give me five Google ad headlines to test."
- "Write LinkedIn and Instagram ads for this offer."
- "Draft paid social copy with different angles."
