---
aliases: ["Style Fingerprint"]
tags: [pm-skills, skill]
skill: style-fingerprint
description: "Study 3-5 documents the user actually shipped and distil a compact style card — so every skill writes in their voice, not the model's. Use when asked to learn my writing style, make outputs sound like me, build a voice profile, or when a user complains AI drafts don't sound like them. Produces a style card (rhythm, register, structure habits, pet phrases, banned moves) saved to the Brain where every other skill reads it."
---

# Style Fingerprint Skill

The #1 complaint about AI drafts is "it doesn't sound like me." This skill fixes it at the root: it studies writing the user has *actually shipped*, extracts the mechanical, imitable features of their voice, and writes a style card into the Brain — after which every brain-aware skill drafts in their register instead of the model's default.

## What This Skill Produces

- A **style card** (~200-300 words, structured) capturing the user's voice as *reproducible rules*, not adjectives
- **Before/after proof**: one paragraph rewritten from model-default into the fingerprinted voice, so the user can verify the card works
- The card **saved to `brain/knowledge/style.md`** (with the user's approval), plus a one-line pointer in `context.md` voice section

## Required Inputs

Ask for (if not already provided):
- **3-5 samples the user wrote and shipped** — real emails, updates, PRD sections, posts. More samples of the *same genre* beat variety. Politely reject samples the user merely approved but didn't write — an edited-by-committee doc fingerprints the committee.
- **The target register** if samples span several (exec formal vs team casual) — or fingerprint each as a named variant

## Extraction Method

Analyse mechanics, not impressions. For each dimension, extract a *rule an imitator could follow*:

| Dimension | What to extract |
|---|---|
| **Sentence rhythm** | Median sentence length; short-sentence frequency; do they open paragraphs long or punchy? |
| **Register & warmth** | Contractions? First person singular or plural? Directness of asks ("please could we" vs "let's") |
| **Structure habits** | Bullets vs prose ratio; headers or none; do they front-load the conclusion (BLUF) or build to it? |
| **Signature moves** | Recurring phrases, connectors ("net-net", "the short version:"), characteristic openings/closings |
| **Emphasis style** | Bold? Italics? Caps? Em-dashes vs parentheses? Emoji policy (which ones, where, never)? |
| **Numbers** | Precision habits ("~40%" vs "42.3%"), units, how they hedge estimates |
| **Banned moves** | What never appears in their writing (corporate filler, exclamation marks, "I hope this finds you well", passive voice…) — the banned list does more work than the rest combined |

Then verify: rewrite one neutral paragraph in the extracted voice and check it against the samples. If it reads generic, the card is adjectives, not rules — extract harder.

## Output Format

### Style card: [name / register variant] — fingerprinted [date] from [n] samples

**Rhythm:** [rules]
**Register:** [rules]
**Structure:** [rules]
**Signature moves:** [phrases/patterns, quoted from samples]
**Emphasis & numbers:** [rules]
**Never:** [the banned list]
**Calibration line:** *(one sentence from the samples that is peak them — future skills imitate toward this)*

**Proof — same paragraph, twice:**
> [model-default version]
> [fingerprinted version]

**📥 Save to Brain:** propose writing this card to `brain/knowledge/style.md` and adding a `voice: see knowledge/style.md` pointer in `context.md`. Show the write, get a yes, then use `../professional-brain/scripts/brain_write.py … --commit`. Brain-aware skills read `context.md` voice on every run — the fingerprint takes effect immediately and everywhere.

## Quality Checks

- [ ] Every dimension yields a followable rule, not an adjective ("uses 8-14 word sentences, one 3-word sentence per paragraph" — not "punchy")
- [ ] Signature moves are quoted verbatim from the samples
- [ ] The banned list has at least 4 entries — voice is defined by what's absent
- [ ] The proof paragraph is verifiably different from model-default and consistent with the samples
- [ ] The card is ≤300 words — a style card that's an essay never gets applied

## Anti-Patterns

- [ ] Do not fingerprint from fewer than 3 samples — you'd be fingerprinting one mood
- [ ] Do not describe voice with adjectives ("professional yet approachable") — extract mechanics
- [ ] Do not merge conflicting registers into one mushy card — name variants ("exec", "team") instead
- [ ] Do not include the user's confidential content in the card — rules and short quoted phrases only
- [ ] Do not overwrite an existing style card silently — diff against it and show what changed

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
