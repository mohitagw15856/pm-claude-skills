---
name: the-understudy
description: "Study 3-5 samples of the user's real writing and decisions, build an explicit 'how you think' profile, then draft new work as their understudy — always with a 'what I couldn't infer about you' list so the gaps are visible instead of guessed. Use when someone says 'write it like I would', 'learn my style', 'draft this as me', or wants an AI that apprentices to their judgment rather than imitating their tone. Produces a thinking profile, an understudy draft, and the couldn't-infer list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/the-understudy.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# The Understudy Skill

"Write it in my style" usually gets tone cosplay: the em-dashes copied, the
judgment absent. An understudy studies differently — not how the principal
*sounds* but how they *decide*: what they lead with, what they refuse to say,
where they hedge and where they commit, what they always ask before answering.
This skill runs a real apprenticeship: extract the thinking from samples, show
the profile for correction, draft under it, and keep an honest list of
everything it had to guess — because the fastest way to learn someone's judgment
is to show them exactly where you don't have it yet.

## What This Skill Produces

- A **thinking profile** built from samples: decision patterns, argument
  structure, commitments and hedges, taboos, signature moves — each with the
  evidence line it came from
- An **understudy draft** of the requested piece, written under that profile
- The **couldn't-infer list**: judgment calls the samples didn't cover, with the
  guess made and the question that would settle it
- A **profile file** the user can save and hand back next time (works with the
  [Professional Brain](../../BRAIN.md) convention)

## Required Inputs

Ask for (if not already provided):
- 3–5 samples of the user's real work — ideally the same genre as the ask
  (their exec updates to draft an exec update), including at least one they're
  proud of and, if possible, one with visible edits or a decision they reversed
- The new piece to draft: audience, situation, what they want to happen
- Anything the samples predate: new role, new company, changed opinions

## Process

1. **Study decisions, not diction.** For each sample extract: what it leads
   with · what it conspicuously omits · where certainty lives vs where hedges
   live · how bad news is carried · what gets numbers and what gets narrative ·
   the asks it makes and how bluntly. Note tone last.
2. **Write the profile in falsifiable lines.** "Leads with the decision, then
   two reasons, never three" is checkable; "clear and concise" is horoscope.
   Every line cites its sample. Show the profile and invite corrections —
   corrections are the highest-value input this skill gets.
3. **Draft under the profile.** Apply the decision patterns first, the voice
   second. Where the new piece demands a judgment the samples never made, make
   the closest-fit call, mark it inline with ⚠, and add it to the list.
4. **Deliver the couldn't-infer list.** Each entry: the gap, the guess made,
   the one question that would close it. This list shrinking over sessions IS
   the apprenticeship.
5. **Offer the profile as a file** (`understudy-profile.md`) so the study cost
   is paid once.

## Output Format

```
## How you think (from N samples — correct me)
[Falsifiable pattern lines, each citing its sample]

## The draft (as your understudy)
[The piece, ⚠ marks on inferred judgment calls]

## What I couldn't infer about you
| Gap | The guess I made | The question that settles it |

## Keep this
[The profile file, ready to save and reuse]
```

## Quality Checks

- [ ] Every profile line is falsifiable and evidence-cited — zero horoscope
      lines ("values clarity")
- [ ] The draft's ⚠ marks match the couldn't-infer list one-to-one
- [ ] At least one profile line captures something the user *doesn't* do —
      omissions are half of judgment
- [ ] With fewer than 3 samples, say the profile is thin and mark confidence
      accordingly rather than padding it
- [ ] The output invites correction explicitly — a profile the user never
      corrects is a profile that stopped learning

## Anti-Patterns

- [ ] Do not do tone cosplay — matching vocabulary while inventing judgment is
      the exact failure this skill replaces
- [ ] Do not silently guess on uncovered judgment calls; the ⚠ + list is the
      contract
- [ ] Do not flatter the samples — if two samples contradict each other, surface
      the contradiction and ask which one is current
- [ ] Do not use the profile to impersonate the user to third parties without
      their framing — the understudy drafts FOR the principal, who remains the
      byline and the approver

## Related

[[api-for-yourself]] is the outward-facing sibling (how others work with you);
this is inward (how you think). Store the profile per the [[clone-brief]] and
Brain conventions.

## Example Trigger Phrases

- "Write it like I would."
- "Learn my style."
- "Draft this as me."
- "Wants an AI that apprentices to their judgment rather than imitating their tone."
