---
aliases: ["Error Message Writer"]
tags: [pm-skills, skill]
skill: error-message-writer
description: "Write clear, helpful error messages that tell users what happened and how to fix it. Use when asked to write an error message, validation text, a failure/empty-error state, or to rewrite a cryptic system error. Produces human, blame-free error copy — what went wrong, why (if useful), and the next step — with options per surface (inline, toast, full page) and the related success/empty states."
---

# Error Message Writer Skill

An error is a moment of friction; a good error message turns it into a recovery. The formula is simple and
rarely followed: say **what happened**, in plain language, and **what to do next** — without blaming the user or
exposing a stack trace. This skill writes error copy that helps people get unstuck and keeps trust intact.

## Working from a brief

Given "the payment failed" or a raw system error, **write the message anyway** — infer the likely cause and the
recovery path, and label assumptions. Where the real cause is unknown to the user, focus on the next action.
Never hand back a question instead of the copy; never surface internal/technical detail to end users.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **What failed** — the action or system, and the likely cause(s).
- **The surface** — inline field, toast/snackbar, modal, or full-page error.
- **Recovery** — what the user can actually do (retry, fix input, wait, contact support).
- **Voice & constraints** — tone, length limits, and whether a support/error code is needed.

## Output Format

### Error Message: [scenario]

- **Recommended message** — structured as:
  - **What happened** — plainly, in the user's terms ("We couldn't process your payment").
  - **Why / what to check** — only if it helps them act ("Your card was declined — check the details or try another card").
  - **Next step** — the clear action (a button label or instruction).
- **By surface** — short variants for inline validation, toast, and full-page where relevant.
- **Tone notes** — blame-free, calm, human; matched to severity (a wrong field ≠ a data-loss event).
- **For developers** — a note on what to *log* vs. what to *show* (keep stack traces and codes out of the user message; offer a support reference if needed).

## Quality Checks

- [ ] States what happened in plain language — no codes, no jargon, no stack traces shown to the user
- [ ] Gives a concrete next step the user can take
- [ ] Blame-free — never "you entered it wrong"; focus on the fix
- [ ] Tone matches severity (minor validation vs. serious failure)
- [ ] Variants fit the surface (inline vs. toast vs. full page) and any length limits
- [ ] Separates what to log (technical) from what to show (human)

## Anti-Patterns

- [ ] Do not show raw/technical errors ("Error 500", "null pointer") to end users
- [ ] Do not blame the user ("Invalid input") — say what to do instead
- [ ] Do not write a dead-end ("Something went wrong") with no next step
- [ ] Do not be jokey about serious failures (payment, data loss) — match the tone to the stakes
- [ ] Do not bury the action — the recovery step should be obvious

## Based On

UX writing practice — plain-language, blame-free error messages with clear recovery, surface-appropriate variants, and log-vs-show separation.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
