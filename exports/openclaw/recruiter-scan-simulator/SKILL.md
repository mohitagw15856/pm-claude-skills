---
name: recruiter-scan-simulator
description: "Simulate a busy recruiter's first scan of a CV for a specific role: what they read in the first seconds, what they decide, and why, then step out of character to say what would change the decision. Use when asked would a recruiter shortlist my CV, review my CV like a recruiter, what does a screener see first, or why am I not getting interviews. Produces the in-character scan with the reading order and a shortlist, maybe or reject decision, then a debrief with the three changes most likely to flip it."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/recruiter-scan-simulator.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Recruiter Scan Simulator

A first screen is fast. A recruiter with two hundred applications reads the top third of page one, checks a few things against the brief, and decides. This simulator plays that recruiter honestly, for one role, then steps out of character to explain the decision and what would change it.

Part of the pm-cv bundle. Follows the library's simulator pattern: in character, then a debrief.

## What This Skill Produces

- **The scan**, in character: the order things were read, what each told the recruiter, the decision
- **The decision**: shortlist, maybe, or reject, with the reason in the recruiter's words
- **A debrief**, out of character: the three changes most likely to flip the decision

## Required Inputs

Ask for these if not provided:
- **The CV**
- **The role**: the job ad, or at least the title, level and three must-haves
- **The recruiter type**: agency recruiter, in-house recruiter, or hiring manager; each reads differently

## Framework

In character, read in the order a screener does:
1. Name, location and current title: does the location and level fit?
2. The summary or first role: does it say the job title or something close?
3. The most recent role's first two bullets: is there evidence of the must-haves?
4. Dates: gaps, short stints, a timeline that adds up?
5. A quick check for the brief's knock-outs: right to work, required qualification, years.

Decide within that reading, as a real screener would. Speak briefly and plainly.

Out of character:
- The decision and the specific line that drove it
- Three changes ranked by likely effect, each specific to a line of the CV
- What a human screener would *not* have noticed, so the person does not over-fix

## Output Format

### Recruiter scan: [role]
**In character**
- First read: [what was seen, in order, with the thought at each step]
- Decision: shortlist / maybe / reject, "because ..."

**Debrief**
1. The deciding line
2. Three changes | Change | Line affected | Why it would flip the decision |
3. Not worth fixing: things the person might worry about that did not matter

## Quality Checks
- [ ] The scan follows a realistic reading order and stays brief
- [ ] The decision is stated plainly, including reject when deserved
- [ ] Each change names the exact line it affects
- [ ] The debrief is out of character and clearly marked

## Anti-Patterns
- **A kind recruiter.** Softness hides the reason for silence after applications.
- **A full proofread.** A first screen does not read every line; the simulation should not either.
- **Generic advice** in the debrief. Every change points to a line.
- **Pretending to be a specific real person** at a named company.

## Example Trigger Phrases
- "Read my CV like a recruiter for this role. Would I get shortlisted?"
- "Why am I not getting interviews? Screen my CV."
- "What does a recruiter see in the first few seconds of my CV?"
- "扮演招聘官看看我的简历能不能过初筛。"
