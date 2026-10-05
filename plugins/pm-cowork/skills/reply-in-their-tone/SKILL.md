---
name: reply-in-their-tone
description: "Draft email replies that match the sender's register — formality, length, directness, and emoji-tolerance read from their message, so the reply lands as native instead of off-key. Use when asked reply to this email, draft a response that doesn't sound stiff, match their tone, or answer this without sounding like a robot. Produces the tone read of the incoming message, the reply drafted in that register, and the adjustment knobs."
---

# Reply In Their Tone Skill

Replies fail on register more than content: the three-line casual ask answered with four formal paragraphs, the careful formal request answered with "hey! sure thing 🙌". People read tone mismatch as social information — too formal reads as cold or annoyed, too casual reads as unserious. This skill reads the incoming message's register first (formality, length, directness, warmth markers), then drafts the reply *in that register* — content correct, tone native.

## What This Skill Produces

- **The tone read** — the sender's register across four dials: formality, length, directness, warmth/emoji
- **The reply** — content as instructed, register as read
- **The knobs** — one-notch-warmer and one-notch-more-formal variants when the call is close
- **The mismatch flag** — when the *right* move is deliberately not matching (escalations, boundary-setting), said explicitly

## Required Inputs

Ask for these if not provided:
- **The incoming email** — verbatim; the tone read works on the actual words
- **What the reply must accomplish** — the yes/no/ask/push-back content, decided by the user
- **The relationship** — first contact, colleague, boss, customer? Matching runs within the floor the relationship sets (never below professional-warm with strangers)

## Framework: The Four Dials

1. **Formality:** greeting style ("Dear Dr." vs "hey"), sign-off, contractions, titles. Match it — one notch *warmer* is safe when unsure; one notch stiffer never is.
2. **Length:** a three-line email wants a three-to-five-line reply. Answering short with long reads as lecture; long with short reads as brush-off. Match the sender's investment, ±50%.
3. **Directness:** some write asks in line one; others cushion. Direct senders get the answer in sentence one; cushioners get one line of cushion first — not three.
4. **Warmth markers:** exclamation points, emoji, small talk. Reflect at *most* their level, never above; zero-emoji senders get zero emoji, always.
5. **The deliberate mismatch:** boundary-setting, escalation, and bad-news replies sometimes *should* run more formal than the incoming — a register shift is itself a message. When content calls for it, the skill says so and shifts on purpose rather than by accident.

## Output Format

# Reply: [to whom, accomplishing what]

## The Tone Read
Formality: [level, evidence] · Length: [theirs] · Directness: [direct/cushioned] · Warmth: [markers present]

## The Draft
[The reply, register-matched, ready to send]

## Knobs
[One notch warmer: the changed lines · one notch more formal: the changed lines]
[If mismatch was chosen: why, stated]

## Quality Checks

- [ ] Every dial cites evidence from the incoming message
- [ ] Reply length is within ±50% of the incoming
- [ ] Warmth markers never exceed the sender's
- [ ] The content the user specified survives intact — tone-matching never softens the actual answer
- [ ] Deliberate mismatches are flagged as choices, not accidents

## Anti-Patterns

- [ ] Do not default to formal — stiffness reads as coldness, and coldness reads as a message
- [ ] Do not out-emoji the sender — one notch above reads as performative
- [ ] Do not cushion a direct sender's answer — they told you their preference in their own email
- [ ] Do not let tone-matching dilute a "no" — register is the wrapper, never the content
- [ ] Do not mimic idiosyncrasies (their typos, their catchphrases) — matching register isn't impersonation

## Example Trigger Phrases

- "Reply to this email."
- "Draft a response that doesn't sound stiff."
- "Answer this without sounding like a robot."
