---
name: interview-synthesis
description: "Turn a pile of interview notes into findings that survive scrutiny — the code-then-theme pass, the counting discipline (how many actually said it), the quote selection that illustrates instead of cherry-picks, and the confidence lines a small sample earns. Use when asked synthesize these user/customer/exit interviews, what did we actually learn from the calls, turn 12 transcripts into insights, or are these themes real. Produces the coded themes with counts, the divergences preserved, the illustrative quotes, and the claims sized to the sample."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/interview-synthesis.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Interview Synthesis Skill

Interview piles get "synthesized" two bad ways: the highlight reel (the quotes that confirmed what the team hoped) and the mush ("users want simplicity" — twelve hours of conversation flattened into a poster). Honest synthesis is mechanical before it's interpretive: code the notes (what did each person actually say, tagged), count the themes (a theme is something *multiple* people said — with the number attached), preserve the divergences (the two dissenters are data, not noise), and size every claim to the sample — twelve interviews support "we repeatedly heard," never "users want."

> **Not quite this?** Use `user-interview-synthesis` when the interviews are product-discovery research with users.

## What This Skill Produces

- **The coded pass** — each interview's statements tagged to emerging codes, traceable back to the speaker
- **The theme table** — themes with counts (7/12 raised unprompted; 3 more agreed when asked — the prompted/unprompted split matters)
- **The divergence report** — who disagreed with each theme and why; the outliers examined, not deleted
- **The claims, sample-sized** — findings phrased at what N interviews can carry, with the quotes that illustrate honestly

## Required Inputs

Ask for these if not provided:
- **The notes/transcripts** — the actual material; synthesis of summaries synthesizes the summarizer's biases
- **The questions the interviews served** — what the study was trying to learn; themes get organized against them (plus the "unexpected" bucket, often the best one)
- **The sample's shape** — who these people are, how selected (12 enthusiastic volunteers ≠ 12 representative users — the selection shapes what claims are legal)
- **What the team already believes** — stated up front as hypotheses; the synthesis marks confirms/contradicts explicitly (the contradicts are the expensive-to-lose ones)

## Framework: The Synthesis Rules

1. **Code before theming:** pass one is mechanical — each substantive statement tagged (needs-integration, pricing-confusion, workaround-X) with speaker attribution. Themes emerge from tag frequencies, not from memory — memory promotes the vivid, and vividness isn't prevalence.
2. **Count, and split prompted from unprompted:** every theme carries its number ("8/12"), and *unprompted mentions outweigh prompted agreements* — "seven raised pricing before we asked" is a finding; "everyone agreed pricing matters when asked" is politeness. The counts keep the highlight reel honest.
3. **Divergence is data:** the two who disagreed get examined — different segment? Different workflow? Their *why* often reveals the theme's boundary condition ("the theme holds for teams over ten; both dissenters were solo"). Deleting outliers manufactures consensus; bounding themes with them manufactures insight.
4. **Quotes illustrate counted themes — never substitute for them:** each theme gets 1–2 verbatim quotes chosen for *representativeness* (the middle of the distribution, not the spiciest take), attributed at the agreed anonymity level. A vivid quote for a 2/12 theme is cherry-picking with production values.
5. **Size claims to the sample and selection:** twelve interviews earn "a recurring pattern among [who we talked to]" — not "users want," not percentages ("58% of users" from n=12 is numerical cosplay). The confidence line states sample, selection, and what would harden the finding ("survey to size it" — the [survey-design-basics](../survey-design-basics/SKILL.md) handoff).

## Output Format

# Interview Synthesis: [study] — n=[N], [who/how selected]

## Theme Table
| Theme | Unprompted / prompted | Count | Bounded by (divergences) |
|---|---|---|---|

## The Themes (each)
**[Theme]** (n/N unprompted) — [two sentences of what it actually is] · *"[representative quote]"* · Divergence: [who + why + the boundary it suggests]

## Against the Hypotheses
[Confirmed: … · Contradicted: … — marked plainly]

## Claims & Confidence
[Findings phrased at sample-legal strength · the selection caveat · what would harden each]

## Quality Checks

- [ ] Every theme traces to coded statements with counts
- [ ] Unprompted and prompted mentions are distinguished
- [ ] Divergences are examined for boundaries, not discarded
- [ ] Quotes are representative of counted themes, not highlights
- [ ] No claim exceeds what n and selection legally support

## Anti-Patterns

- [ ] Do not synthesize from memory — the vivid interview colonizes the findings; coding is the antidote
- [ ] Do not present percentages from small samples — counts, plainly
- [ ] Do not delete the dissenters — they're the theme's boundary survey team
- [ ] Do not quote the spiciest take as the finding — representative or labeled as an outlier
- [ ] Do not let confirmation win silently — the contradicted hypotheses are the synthesis's most valuable line
