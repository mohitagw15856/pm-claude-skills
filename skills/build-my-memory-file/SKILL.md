---
name: build-my-memory-file
description: "Interview you into a durable personal MEMORY.md — your decision rules, patterns, past failures, and preferences — that any AI can read to help you better, with privacy guardrails built in. Use when asked to build my memory file, help my AI remember me, create a MEMORY.md, or set up context about myself. Produces a structured personal-context file drawn out through good questions (how you decide, what you keep repeating, what you don't want to repeat), organized for an AI to use — while explicitly refusing to store sensitive data like credentials, financial, health, or others' personal info."
---

# Build My Memory File

The single biggest upgrade to working with AI isn't a better prompt — it's a `MEMORY.md` that captures how *you* work, so you stop re-explaining yourself every session. This interviews you into one: your decision criteria, recurring patterns, past mistakes worth not repeating, and preferences — organized so any AI can read it and help you better. And it has a hard privacy line: no credentials, no financial, health, or other people's personal data.

## What This Skill Produces

- **A structured MEMORY.md** — your durable personal context, in sections an AI can use
- **Your decision rules** — how you actually make choices, your criteria, your non-negotiables
- **Your patterns** — the things you keep doing (good and bad), your recurring instructions and preferences
- **Your "don't repeat these"** — past failures and lessons worth remembering
- **Working preferences** — how you like things done, communicated, and delivered
- **A privacy firewall** — an explicit list of what NOT to store, and it refuses to include it

## Required Inputs

Ask for these if not provided:
- **The scope** — general life, or a specific domain (work, a project, health-adjacent-but-not-sensitive)
- **What you keep re-explaining** — the context you're tired of repeating to AI
- **Your patterns** — decisions you make the same way, mistakes you repeat
- **Your preferences** — how you like output, communication, and process

## Framework: Interview, Structure, Protect

1. **Draw it out with questions.** Most people can't just list their operating rules — good questions surface them ("how do you usually decide X?", "what do you keep having to redo?").
2. **Capture rules, patterns, and failures.** The high-value contents: decision criteria, recurring preferences, and past mistakes not to repeat.
3. **Write it for an AI to use.** Structure it in clear sections with concrete, actionable statements — not vague self-description.
4. **Enforce the privacy line.** Explicitly refuse to store credentials, account numbers, financial details, health data, home address, authentication info, or other people's personal information — and tell the user to manage those elsewhere.
5. **Make it maintainable.** Keep it a living file — a format easy to add one line to over time, and a note on how to use it (paste it, or reference it in a global AI config).

## Output Format

### MEMORY.md — [scope]

```
# My decision rules
- [how I decide X / my criteria / non-negotiables]

# My patterns
- [recurring preferences, instructions, tendencies]

# Don't repeat these (past lessons)
- [mistakes not to make again]

# How I like things done
- [communication / output / process preferences]
```

**How to use it:** [paste at the start of a session, or add to your AI's global config].
**Keeping it alive:** add one line whenever you notice a rule or lesson.

> **Not stored here:** passwords, account/card numbers, financial or health details, home address, auth info, or other people's personal information. Keep those in a secure place you control — never in AI-readable memory.

## Quality Checks
- [ ] Draws content out through questions, not a blank template
- [ ] Captures decision rules, patterns, and past-failure lessons
- [ ] Written as concrete, AI-usable statements
- [ ] Explicitly excludes and refuses sensitive/personal data
- [ ] Is a maintainable, living format with usage guidance

## Anti-Patterns
- **A blank template** with no interviewing.
- **Vague self-description** an AI can't act on.
- **Storing sensitive data** (credentials, financial, health, others' info) — hard no.
- **A one-off file** with no way to keep it current.

## Example Trigger Phrases
- "Help me build a MEMORY.md so my AI understands how I work."
- "Interview me into a personal context file for Claude."
- "I'm tired of re-explaining myself to AI — set up my memory."
- "Create a file of my decision rules and preferences."
- "Help my AI remember my patterns and past mistakes."
