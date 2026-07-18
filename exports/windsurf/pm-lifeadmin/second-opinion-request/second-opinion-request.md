---
trigger: model_decision
description: "Get a second medical opinion without torching the first relationship — when it's warranted, how to raise it with the current doctor, the records package the consulting doctor needs, and how to weigh two opinions that disagree. Use when asked should I get a second opinion, how do I ask for a second opinion without offending my doctor, what records do I send, or the two doctors disagree now what. Produces the warranted-or-not framing, the raising-it scripts, the records checklist, and the disagreement-weighing framework."
---

# Second Opinion Request Skill

Second opinions change diagnoses or treatment plans often enough that for major decisions they're due diligence, not disloyalty — and good doctors know it, welcome it, and get them for their own families. The friction is social and logistical, not medical: how to say it to the current doctor, what to actually send, and what to do when the opinions differ. This skill handles exactly those three, and stays out of the medicine itself.

## What This Skill Produces

- **The warranted check** — the situations where second opinions earn their cost, honestly framed (and the ones where they mostly add delay)
- **The scripts** — raising it with the current doctor, requesting the consult, and the insurance-coverage question
- **The records package checklist** — what the consulting physician needs, so the visit reviews the case instead of restarting it
- **The disagreement framework** — how to structure the follow-up questions when opinions differ, without playing referee on medicine

## Required Inputs

Ask for these if not provided:
- **The situation** — the diagnosis or recommended treatment, in the user's words; the stakes (surgery, long-term medication, serious diagnosis, "watch and wait" they're uneasy about)
- **The relationship** — how the current doctor has responded to questions so far; whether the user fears the conversation (common, and addressable with the script)
- **The logistics** — insurance shape, timeline pressure (some decisions have real clocks; the plan respects them), and access to a relevant specialist or center
- **What's driving the wish** — uncertainty, a gut mismatch, something read, a family push — it shapes which questions the consult should answer

## Framework: The Diligence Rules

1. **Warranted, plainly:** major surgery, cancer diagnoses and staging, rare conditions, treatments with lifelong consequences, a plan that isn't working, or a diagnosis made quickly on thin workup. Less warranted: routine matters where delay costs more than confirmation adds — say so honestly; a second opinion is a tool, not a ritual.
2. **The doctor is not the obstacle:** the script is direct and unapologetic — "Before we proceed with something this significant, I'd like a second opinion. Would you refer me, and have the records sent?" Good doctors say yes routinely. A doctor who bristles at diligence has *become* one of the findings.
3. **Records make the consult real:** imaging (the actual images, not just reports), pathology slides/blocks where relevant, labs, the treatment plan, and clinic notes — requested per the records process (see [medical-records-request](../medical-records-request/SKILL.md)). A consult without records is a conversation, not an opinion.
4. **Independence matters:** for major calls, a consultant outside the first doctor's immediate group reads with fresher eyes; for specialized conditions, a high-volume center is the honest ask. Framed as considerations, not referrals — this skill names *types* of consultants, never specific ones.
5. **Disagreement is information, not deadlock:** the move is structured follow-up, not coin-flipping — bring opinion B back to doctor A (and vice versa): "The consulting physician suggested X instead — what's your read on why you'd still recommend Y?" The *reasons for the difference* (different guidelines? risk tolerance? information one had and the other didn't?) are what the patient can actually evaluate; sometimes a third, tie-breaking consult at a referral center is the right spend, and the framework says when.

## Output Format

# Second Opinion Plan: [situation]

## Is It Warranted Here
[The honest read against the stakes and timeline — including the delay cost if the clock is real]

## The Scripts
**To your current doctor:** "[verbatim — direct, warm, unapologetic]"
**Booking the consult:** "[what to say, what to ask about records and timing]"
**Insurance:** "[the coverage question — flagged plan-specific]"

## The Records Package
| Item | Why the consultant needs it | How to get it |
|---|---|---|

## If They Disagree
[The take-B-back-to-A structure with verbatim questions · what differences to probe (guidelines, risk tolerance, information gaps) · when a third opinion at a referral center is worth it]

> This skill organizes the process — the medical content of both opinions belongs entirely to the physicians. Coverage rules and records rights vary by jurisdiction and plan; verify the specifics.

## Quality Checks

- [ ] The warranted check is honest both directions — including when a second opinion mostly adds delay
- [ ] The raising-it script contains zero apology and zero accusation
- [ ] The records checklist includes actual images/slides, not just reports
- [ ] The disagreement structure sends each opinion back to the other doctor, with verbatim questions
- [ ] Timeline pressure is respected — diligence that misses a treatment window isn't diligence

## Anti-Patterns

- [ ] Do not weigh in on which opinion is medically right — structure the questions; the medicine is the doctors'
- [ ] Do not script sneaking around the first doctor — the direct version works better and keeps the records flowing
- [ ] Do not recommend specific physicians or centers — types and criteria only
- [ ] Do not treat disagreement as a crisis — it's the process working; the framework exists for exactly this
- [ ] Do not let diligence become avoidance — serial opinion-shopping past two (occasionally three) is a decision not being made, and the artifact should say so
