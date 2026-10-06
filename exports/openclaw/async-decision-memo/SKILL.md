---
name: async-decision-memo
description: "Run a decision asynchronously — the memo, the silent-read window, the comment protocol, and the deadline that makes it land without a meeting. Use when asked to decide something async, replace a decision meeting with a document, run an Amazon-style written decision process, or when a decision keeps stalling in comment threads. Produces the decision memo plus the process wrapper: reader roles, response windows, comment-resolution rules, and the tie-breaker. For the document structure alone use decision-memo; this skill runs the process around it."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/async-decision-memo.html
metadata:
  {
    "openclaw": { "emoji": "🔩" }
  }
---

# Async Decision Memo Skill

Remote teams keep reinventing this badly: someone posts a doc, twelve people leave drive-by comments over two weeks, nothing resolves, and the decision happens in a meeting anyway — now with resentment. The async decision is a *process with a deadline*, not a document with comments enabled. This skill runs the whole protocol.

## What This Skill Produces

- The **decision memo** (structured for silent reading, with the recommendation up front)
- The **process wrapper**: named roles, response windows, comment-resolution rules, escalation
- The **kickoff message** that opens the window and the **closing note** that records the outcome

## Required Inputs

Ask for (if not already provided):
- **The decision** — what's being decided, the options, the recommendation and its reasoning (rough notes fine)
- **The people**: who *decides* (one name), who must be *consulted* (their objection could change the answer), who is merely *informed*
- **The clock**: when is this decision needed, and what does it block
- **The stakes** — reversible or one-way-door? (Sets the window length and the bar for escalation)

## The Protocol

1. **Write the memo for a silent first read.** Structure: **the decision needed** (one sentence) · **the recommendation** (up front — burying it invites a treasure hunt) · **context in prose** (full sentences force complete thinking; bullets hide gaps) · **options considered with real trade-offs** (a strawman option list discredits the whole memo) · **what would change my mind** (the single highest-trust section — name the evidence that would flip the recommendation) · **cost of deciding slowly** (why the deadline is real). Target ≤2 pages; past that, the memo needs editing, not more patience.
2. **Assign the three roles by name.** The **decider** (exactly one; "the group decides" is how nothing does) · **consulted** (listed individually — their silence is treated as consent *and they know it*) · **informed** (get the outcome, not a comment invitation). The role list ships in the kickoff, not in anyone's imagination.
3. **Open a bounded window.** Reversible decisions: 2-3 working days. One-way doors: up to a week, never more — an async process longer than a week isn't deliberation, it's drift. The kickoff states the close date/time and timezone, and that *silence from consulted = consent*.
4. **Enforce the comment protocol.** Comments must be one of: **objection** (with reasoning — and where possible, what evidence would resolve it) · **question** (answered by the author within a working day) · **improvement** (accepted/declined by the author, no debate thread). Preference restatements and drive-bys get one reply: "noted — not an objection." Threads longer than 3 exchanges move to a 15-minute call between *those two people only*, whose outcome is written back into the thread.
5. **Close on time, whatever the state.** At the deadline the decider: decides (the default) · extends *once* with a reason and new date · or escalates (only for an unresolved objection on a one-way door). The closing note records: the decision, the dissent *as stated by the dissenter*, what would reopen it, and who does what by when. Dissent recorded ≠ decision reopened — disagree-and-commit is the exit, and the note says so.
6. **File it.** The memo + closing note land where decisions live (the decision log, the [Brain's](../professional-brain/SKILL.md) `decisions/` if one exists) — an async decision that lives in a chat scrollback will be relitigated by someone who "never saw it."

## Output Format

### Async Decision: [title] — window closes [date, tz]

**Roles:** Decider: [name] · Consulted: [names] (silence = consent) · Informed: [names]

**The memo** *(structured per the protocol above)*

**Kickoff message** *(ready to post)*: [what's being decided, the recommendation exists — read before commenting, the window, the comment protocol in two lines, silence rule]

**Closing note template**: Decision: […] · Dissent, as stated: […] · Reopens if: […] · Actions: [who/what/when] · Filed: [where]

## Quality Checks

- [ ] Exactly one named decider; consulted people listed individually
- [ ] The recommendation appears before the context, not after it
- [ ] "What would change my mind" names specific evidence, not humility theatre
- [ ] The window has a date, time, and timezone; the silence rule is stated in the kickoff
- [ ] The closing note records dissent verbatim and the reopen condition

## Anti-Patterns

- [ ] Do not open comments without the protocol — an unbounded comment section is the meeting you were avoiding, slower
- [ ] Do not run a memo without a decider — consensus-by-exhaustion is not an outcome
- [ ] Do not let threads run past 3 exchanges — two people arguing in a doc are holding everyone else hostage
- [ ] Do not extend the window twice — the second extension means the memo was premature; withdraw and rewrite it
- [ ] Do not soften recorded dissent into "some concerns were raised" — the dissenter's actual words, or the record is fiction

## Example Trigger Phrases

- "Decide something async."
- "Replace a decision meeting with a document."
- "Run an Amazon-style written decision process."
