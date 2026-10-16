---
name: help-center-article
description: "Write a help-center / knowledge-base article that actually resolves the issue and deflects tickets. Use when asked to write a help doc, KB article, FAQ entry, how-to, or support documentation. Produces a findable, skimmable article — task-based title, the answer up front, numbered steps, screenshots-to-add markers, troubleshooting, and related links — written so users self-serve instead of contacting support."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/help-center-article.html
metadata:
  {
    "openclaw": { "emoji": "🎧" }
  }
---

# Help Center Article Skill

A help article's job is deflection: the user finds it, solves their problem, and never opens a ticket.
That requires a *findable* title (what they'd search), the answer **up front** (not after three
paragraphs of preamble), and skimmable steps. This skill writes that — task-based, scannable, and
SEO/search-friendly so it surfaces both in your help center and in Google.

## Required Inputs

Ask for these only if they aren't already provided:

- **The task/problem** — what the user is trying to do or fix (phrased as they'd search it).
- **The solution** — the steps or answer.
- **Audience** — end-user vs. admin/developer (changes depth and terminology).
- **Edge cases / gotchas** — common failure points and prerequisites.

## Output Format

### [Task-based title — what the user searches]
*e.g. "How to reset your password" / "Why is my export failing?" — not "Password Management."*

**1. Short answer (TL;DR)** — resolve it in 1–2 sentences right at the top for the people who just need the quick fix. Then the detail for those who need it.

**2. Before you start** — prerequisites/permissions, if any (so step 3 doesn't fail silently).

**3. Steps** — numbered, one action per step, in the user's language. Mark where a **[screenshot]** should go. Bold the buttons/menu names they'll click.

**4. Troubleshooting** — the 2–4 common "it didn't work" cases and the fix for each. This is what prevents the follow-up ticket.

**5. Related articles** — links to the adjacent tasks (the next thing they'll need).

**SEO/findability note:** use the words users actually type (synonyms in the body), keep the title a real question/task, and front-load the answer.

## Quality Checks

- [ ] Title is a task/question the user would actually search (not an internal category name)
- [ ] The answer is at the top (TL;DR), not buried under preamble
- [ ] Steps are numbered, one action each, with bolded UI labels and screenshot markers
- [ ] Prerequisites are stated before the steps
- [ ] A troubleshooting section heads off the common follow-up tickets
- [ ] Uses the user's vocabulary (findable in search), not internal jargon

## Anti-Patterns

- [ ] Do not bury the answer — front-load it; most readers want the quick fix, not your intro
- [ ] Do not title by internal feature name — title by the user's task/question, or they won't find it
- [ ] Do not skip troubleshooting — the "it didn't work" cases are exactly what generate the ticket you're trying to deflect
- [ ] Do not use internal jargon — write the words users type
- [ ] Do not cram multiple tasks into one article — one task per article = better search + clearer steps

## Based On

Knowledge-base / technical-writing practice — task-based titles, answer-first, scannable steps, search-optimised, ticket-deflection focus.

## Example Trigger Phrases

- "Write a help doc."
- "Write a knowledge-base article for this issue."
- "Write a FAQ entry."
- "Write support documentation that cuts tickets."
