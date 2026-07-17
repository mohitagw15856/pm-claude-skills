---
trigger: model_decision
description: "Structure a literature review that argues, not lists — thematic synthesis from your sources with the debate mapped and the gap identified. Use when asked to write or structure a literature review, organize my sources, synthesize these papers, or find the gap for my thesis. Produces a themed review skeleton with your sources placed in conversation, the points of scholarly disagreement, the gap your work addresses, and an honest register of what you haven't read yet."
---

# Literature Review Builder Skill

A literature review is an argument about a field, not an annotated bibliography wearing paragraphs. This skill organizes the sources the student actually has into themes, puts authors in conversation ("X finds…, but Y's data suggests…"), and drives toward the only sentence that matters: *here is the gap this work addresses.* It works only from provided sources — it never invents citations.

## What This Skill Produces

- **A thematic skeleton** — sections by debate/theme, never by paper
- **Sources in conversation** — agreement, contradiction, and method differences made explicit
- **The gap statement** — what the reviewed field doesn't answer, phrased as the study's justification
- **The unread register** — cited-by-others works the student should chase, clearly marked as not-yet-read

## Required Inputs

Ask for these if not provided:
- **The sources** — abstracts, notes, or full summaries of what the student has actually read (author/year minimum)
- **The research question or thesis topic** — the review argues *toward* it
- **The level** — course essay vs honors thesis vs graduate calibrates depth and voice
- **Citation style** if it matters (APA/MLA/Chicago)

## Framework

1. **Theme extraction:** cluster sources by what they *disagree about* or *approach differently* — themes are debates, not topics.
2. **The conversation move:** every paragraph should contain at least two sources in relation ("builds on," "contradicts," "same finding, different method").
3. **Method matters:** where findings conflict, check the methods first — "X (survey, n=2,000) vs Y (interviews, n=12)" is often the resolution.
4. **The funnel:** broad field → the specific debate → the unanswered piece → "this study addresses…" The gap must follow from the review, not appear beside it.
5. **Citation integrity:** only provided sources appear in the review. Missing-but-important works go to the unread register — never into the text as if read.

## Output Format

# Literature Review Skeleton: [topic]
**Research question:** … **The gap (draft):** …

## Theme 1: [the debate, phrased as a question]
[Sources in conversation, with the tension explicit; method notes where findings conflict]
[…themes…]

## The Gap
[What the field, as reviewed, does not answer — and the one-sentence bridge to this study]

## Unread Register
[Works cited by your sources that likely matter — chase before submission; marked NOT YET READ]

## Quality Checks

- [ ] Sections are themes/debates — no section is one paper's summary
- [ ] Every citation traces to a provided source
- [ ] Conflicting findings are examined via their methods
- [ ] The gap statement follows from the reviewed material
- [ ] The unread register is present and honest

## Anti-Patterns

- [ ] Do not organize paper-by-paper — "Smith found… Jones found…" is a list; reviewers call it exactly that
- [ ] Do not invent or embellish citations — a fabricated source is an integrity case, not a shortcut; work only from what was provided
- [ ] Do not flatten disagreements into "scholars have various views" — name who disagrees with whom about what
- [ ] Do not let the gap appear from nowhere — if the review didn't establish it, the review isn't done
- [ ] Do not write the student's analysis for them at thesis level — the skeleton and the connections are scaffolding; the argument in their voice is theirs
