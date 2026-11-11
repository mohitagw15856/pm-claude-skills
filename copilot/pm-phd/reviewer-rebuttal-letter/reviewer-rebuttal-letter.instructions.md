---
applyTo: "**"
description: "Write the response-to-reviewers letter for a revised journal article or conference paper: every comment quoted and numbered, a direct answer, the change made with its location in the manuscript, and a courteous, evidenced reply where the authors disagree. Use when asked to write my response to reviewers, draft the rebuttal letter, reply to reviewer 2, how do I disagree with a reviewer politely, or we got major revisions. Produces a triage table of comments, the cover note to the editor, the point-by-point response, a list of changes still to make, and a consistency check between the letter and the manuscript."
---

# Reviewer Rebuttal Letter

The response letter is read by a tired editor deciding whether the authors took the reviews seriously. Letters fail when they argue, when they answer a different question from the one asked, or when the editor cannot find the promised change. This skill builds the letter comment by comment and keeps it tied to the revised manuscript.

## What This Skill Produces

- A triage table: each comment, its type, the planned response and the effort
- A short cover note to the editor summarising the main changes
- The point-by-point response with quoted comments, replies and locations
- A to-do list of analyses or edits the letter promises
- A check that every promise in the letter matches a change in the manuscript

## Required Inputs

Ask for these if not provided:

- The decision letter and all reviewer comments, in full
- The journal or venue and its instructions for revisions (format, word limit, tracked changes)
- What the authors have already changed or plan to change
- Points where the authors disagree, and their evidence
- New analyses or data available, and what is not feasible
- The revision deadline

## Framework

1. **Number everything.** Editor comments E1, E2; reviewer comments R1.1, R1.2. Split compound comments.
2. **Triage.** Each comment is one of: agree and change; agree, partly change; clarify (the reviewer misread, so the text was unclear); disagree with evidence; out of scope.
3. **Answer first, then explain.** The first sentence says what was done.
4. **Show the change.** Quote the new text or give page, section and line in the revised manuscript.
5. **A misreading is the authors' problem.** If a reviewer misunderstood, revise the text so the next reader does not, and say so.
6. **Disagree rarely and with evidence.** Acknowledge the concern, give the reason and the source or analysis, and offer what was done instead, such as an added limitation.
7. **Conflicting reviewers.** State the conflict to the editor, choose, and explain the choice.
8. **Tone.** Thank once, at the top. No flattery in every reply, no sarcasm, no complaints about the reviewer.
9. **Requests that cannot be met.** Say why, plainly, and what is offered in its place.

## Output Format

### Response to reviewers: [manuscript ID], [title]

**Triage**
| ID | Comment in brief | Type | Response | Effort | Done? |
|---|---|---|---|---|---|

**Cover note to the editor**
> [Thanks, summary of the three or four main changes, note on any point of disagreement, confirmation of format requirements.]

**Editor**

**E1.** *"[quoted comment]"*
**Response:** [answer first]. [Explanation.]
**Change:** [quoted new text or location: section, page, lines]

**Reviewer 1**

**R1.1.** *"[quoted comment]"*
**Response:** ...
**Change:** ...

**Still to do before submission**
- [ ] [analysis or edit promised in the letter]

**Consistency check**
- [ ] Every "Change" entry exists in the revised manuscript at the stated location
- [ ] New numbers in the letter match the manuscript

**Assumptions and gaps**
- [Replies drafted without the authors' data or decision]
- [The comment most likely to draw a second round]

## Quality Checks

- [ ] Every comment is quoted and numbered, none merged away
- [ ] Each response opens with what was done
- [ ] Each change has a location or quoted text
- [ ] Disagreements cite evidence and offer something
- [ ] No reply claims a change that has not been made
- [ ] Tone is level throughout

## Anti-Patterns

- **Do not paraphrase a comment into an easier one.**
- **Do not write "we thank the reviewer for this insightful comment" forty times.**
- **Do not promise an analysis the authors cannot run.**
- **Do not invent results, citations or line numbers.** Mark placeholders clearly.
- **Do not argue with the reviewer's competence.**

## Example Trigger Phrases

- "We got major revisions. Here are the reviews. Draft the response letter."
- "Reviewer 2 wants an experiment we cannot run. How do we reply?"
- "The two reviewers contradict each other on the framing. What do we tell the editor?"
- "Check that my rebuttal letter matches the revised manuscript."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/reviewer-rebuttal-letter.html

<!-- pm-claude-skills v84.0.0 | skill: reviewer-rebuttal-letter | source: skills/reviewer-rebuttal-letter/SKILL.md | sha256: 4f19c3878a291ddfab76827fd0705ba2a5761357344cb28abb3a7c66b2dd610f | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
