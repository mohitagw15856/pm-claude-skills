---
name: email-to-tasks
description: "Convert an email (or a whole thread) into real tasks — the actual asks extracted from the prose, each with owner, deadline, and the done-test, so nothing lives in the inbox as its own reminder. Use when asked what am I actually being asked to do here, turn this thread into a task list, extract the action items from this email, or I keep re-reading this thread. Produces the ask extraction with quoted sources, the task list in owner-verb-deadline form, and the reply that confirms the commitments."
---

# Email To Tasks Skill

Long emails and longer threads hide their asks: three requests buried in paragraph four, a soft deadline in the sign-off, an implied "you'll handle this?" nobody confirmed. Until the asks are extracted, the *thread itself* becomes the task — re-read five times, actioned zero. This skill mines the actual requests (quoted, so nothing is invented), converts each into owner-verb-deadline form with a done-test, and drafts the confirming reply that turns assumptions into commitments.

## What This Skill Produces

- **The ask extraction** — every explicit and implied request, quoted from the source text
- **The task list** — each: owner · verb-first action · deadline (stated or proposed) · the done-test
- **The ambiguity list** — asks too vague to action, each with the clarifying question that fixes it
- **The confirming reply** — the short message that locks owners and dates before anyone's assumption diverges

## Required Inputs

Ask for these if not provided:
- **The email/thread** — verbatim; extraction quotes its sources
- **Who the user is in it** — extraction is role-relative: their tasks, tasks they're delegating, and tasks that are someone else's problem are three different lists
- **The task system** — where tasks live (tool or list), so the output lands in import-ready shape

## Framework: The Extraction Rules

1. **Hunt four ask-shapes:** direct requests ("please send…") · questions requiring work ("could you find out…") · implied ownership ("someone should…" in a thread addressed to you) · and *commitments the user made* ("I'll get back to you on…") — the last category is the most-dropped and most reputation-expensive.
2. **Quote or it doesn't exist:** every task cites its source line. Extraction that paraphrases invents asks; the quote discipline keeps the list honest and makes the confirming reply defensible.
3. **Owner-verb-deadline or it's not a task:** "the report" is a topic; "Mira sends the Q3 report to finance by Thursday EOD" is a task. Unstated deadlines get *proposed* ones marked as proposals — the confirming reply makes them real.
4. **The done-test:** each task states what done observably looks like ("the deck is in the shared folder and Ana is told"). Tasks without done-tests get re-litigated at review time.
5. **Ambiguity gets a question, not a guess:** "handle the vendor situation" doesn't decompose — it generates the clarifying question ("by 'handle,' do you mean renegotiate or terminate?") and parks until answered. Guessed interpretations of vague asks are how work gets done twice.

## Output Format

# Tasks From: [thread subject]

## Your Tasks
| Task (owner-verb-deadline) | Source (quoted) | Done-test |
|---|---|---|

## You're Delegating / Others Own
[Same table — the confirming reply assigns these explicitly]

## Commitments You Made
[The "I'll…" list — these outrank inbound asks reputationally]

## Too Vague To Action
[Each: the quoted ask + the clarifying question]

## The Confirming Reply
[Short draft: "Confirming: I'll do X by [date], Y by [date]. Assuming Z is with Priya — flag if not. On the vendor question: [the clarifier]."]

## Quality Checks

- [ ] Every task quotes its source line
- [ ] Every task has owner, verb, deadline (stated or labeled-proposed), and done-test
- [ ] The user's own outbound commitments were mined, not just inbound asks
- [ ] Vague asks became questions, never guesses
- [ ] The confirming reply covers every owner assumption the extraction made

## Anti-Patterns

- [ ] Do not paraphrase asks into existence — quote or drop
- [ ] Do not leave deadlines unproposed — "no deadline" means "never" in practice; propose and confirm
- [ ] Do not skip the confirming reply — unconfirmed extraction is a private theory about shared work
- [ ] Do not action vague asks by interpretation — the clarifying question costs one line; the wrong guess costs the work
- [ ] Do not leave the thread as backup storage — once tasks are filed and confirmed, the thread archives

## Example Trigger Phrases

- "What am I actually being asked to do here?"
- "Turn this thread into a task list."
- "Extract the action items from this email."
- "I keep re-reading this thread."
