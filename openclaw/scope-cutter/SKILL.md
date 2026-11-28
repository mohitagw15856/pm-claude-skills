---
name: scope-cutter
description: "Cut a feature, project or release down to the smallest version that still delivers the outcome, by challenging each part to earn its place. Use when asked what can we cut, this is too big, help me descope, what is the smallest version of this, or we will not hit the date. Produces the outcome restated as a test, a keep, cut and defer table with the reason for each line, the smallest shippable version, and a list of what is knowingly not being built."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/scope-cutter.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Scope Cutter Skill

The cheapest feature is the one that was never built, and the second cheapest is the one that was cut before anyone wrote a ticket. Plans grow because adding a line costs nothing in a document and removing one feels like a loss. This skill reverses the default: every part of the plan starts as cut and has to argue its way back in against the outcome. It is for a team that controls its own scope. For a client adding requests to an agreed contract, use `scope-creep-response`.

## What This Skill Produces

- **The outcome as a test**: what a user can do afterwards that they cannot do now, in a form someone could check
- **A keep, cut and defer table** with one reason per line
- **The smallest shippable version**, described so engineering could estimate it
- **The not-building list**, written to be shared, so the cuts are a decision and not an accident
- **The risk each cut carries** and the signal that would bring it back

## Required Inputs

Ask for these if not provided:
- **The plan as it stands**: the feature list, PRD or ticket list
- **The outcome** it is meant to produce and for whom
- **The constraint** forcing the question: date, people, budget, or simple doubt
- **What is already promised** to a customer or a stakeholder, verbatim, because a promise is a constraint and a preference is not

Do not invent estimates. If no sizes are given, sort by relative size (small, medium, large) and say that is what was done.

## Framework: Guilty Until Proven Necessary

1. **Rewrite the outcome as a test.** "Users can export a report" becomes "a finance lead can get this month's numbers into their spreadsheet without asking us." If no test can be written, the scope cannot be judged: stop and resolve that first.
2. **Start from zero.** List every part. Mark each one cut.
3. **Ask the removal question.** For each part: if this is missing on day one, does the outcome test still pass? If yes, it stays cut. If no, it comes back.
4. **Look for the manual stand-in.** Before restoring a part, ask whether a person, a spreadsheet or a support macro could do it for the first users. A manual step that serves ten customers is often the right first version.
5. **Split, do not shrink.** Prefer removing a whole capability over delivering every capability at half quality. One path that works beats three that almost do.
6. **Separate defer from cut.** Deferred means there is a named trigger that brings it back (a customer count, a complaint volume, a contract). No trigger means it is cut.
7. **Price the cut.** For each removed part, name who will notice and what they will do instead.

## Output Format

# Scope Cut: [project]

**Outcome test:** [the checkable sentence]
**Constraint:** [what forced this]

## Decision Table
| Part | Decision | Reason | Who notices | Stand-in or trigger |
|------|----------|--------|-------------|---------------------|

## Smallest Shippable Version
[What it does, the one path it supports, what a user sees at the edges where a cut part would have been]

## Not Building (share this)
[Plain list, each with one line of why]

## What This Costs
[The honest downside of the cuts, and the signal that would reverse each]

## Quality Checks

- [ ] The outcome is written as a test a person could run
- [ ] Every kept part failed the removal question, and the table says how
- [ ] Each deferred part has a named trigger; parts without one are marked cut
- [ ] Existing promises are honoured or explicitly flagged for renegotiation
- [ ] No estimate appears that the user did not supply
- [ ] The not-building list can be sent to stakeholders as written

## Anti-Patterns

- [ ] Do not cut quality on every part to keep every part
- [ ] Do not call something deferred to avoid saying it is cut
- [ ] Do not cut the part that makes the outcome test pass because it is the hardest
- [ ] Do not hide the cuts: an unannounced cut becomes a bug report
- [ ] Do not restore a part because someone senior likes it; ask the removal question again

## Example Trigger Phrases

- "This is too big. What can we cut?"
- "What is the smallest version of this we could ship?"
- "We will not hit the date. Help me descope."
- "Challenge every item in this feature list."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/scope-cutter.html

<!-- pm-claude-skills v84.1.0 | skill: scope-cutter | source: skills/scope-cutter/SKILL.md | sha256: 74d0dac8b9e9cd9acc706f22bcb4d439f65017cb455fc280a2349566a26e2e47 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
