---
name: the-planning-committee
description: "Simulate defending your planning application before the committee that decides it — the neighbour objections read into the record, the character-of-the-area catch-all, the parking pile-on, the councillor with a pet issue — run against your actual scheme, inside a three-minute speaking slot. Use when asked to prepare for a planning committee, my application goes to committee, rehearse my three minutes, or how do I answer the objectors. Produces the hearing transcript with member reactions, the objection-by-objection answer map grounded in material considerations, and the three-minute statement rebuilt. Pairs with planning-application-statement. Not planning or legal advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/the-planning-committee.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# The Planning Committee Skill

Committee is not a design review — it is a public meeting where elected members who may never have read your drawings vote after hearing three minutes from you, three from the objectors, and a recital of everything your neighbours wrote. Schemes with officer support die there on a mood; weak objections carry when nobody in the room separates material considerations from noise. This skill runs that room against your actual scheme: the objection recital, the member questions that arrive sideways, the pet-issue councillor, the clock. The debrief rebuilds your three minutes around the only things that legally count — and flags the moment an answer handed members a reason to refuse.

## What This Skill Produces

- **The hearing transcript** — objectors' statements, your slot, member questions, and the *member reaction* noted after each of your answers
- **The objection map** — every objection sorted material / non-material, each material one paired with its grounded answer
- **The three-minute statement, rebuilt** — timed, leading with what moves votes: policy compliance, officer recommendation, and the specific harms addressed
- **The don't-say list** — the answers that read as dismissive of neighbours or as new information that invites deferral

## Required Inputs

Ask for these if not provided:
- **The scheme** — what is proposed, and the officer recommendation (approve or refuse changes the entire game)
- **The objections** — what neighbours and consultees actually wrote, verbatim where possible; the simulation reads them into the record
- **The sore points** — overlooking, parking, scale, precedent, trees, the boundary dispute nobody mentions officially
- **Who speaks** — you, your agent, or both; and whether a supportive neighbour or member has been arranged
- **The local flavour, if known** — a committee that hates three-storey anything, a ward councillor campaigning on overdevelopment

## Framework: The Committee's Moves

1. **The recital sets the temperature.** Objections are summarised aloud before you speak — sixteen letters sounds like a movement even when twelve are the same sentence. The counter is never to dismiss the count; it is to address the two material ones by name and let the rest visibly fall away.
2. **Character of the area is the catch-all** — the objection that fits any scheme. The answer that survives is specific: the street's actual mix, the precedent addresses, the officer's own character assessment. "It's subjective" loses; "numbers 14 and 22 are the same height" holds.
3. **Parking is the pile-on.** Every member has a parking story. The trained answer concedes the concern's legitimacy, then anchors to the highways consultee's response — the one voice on parking the committee cannot dismiss as an interested party.
4. **The sideways question is a trap for new information.** "Would you accept a condition on obscure glazing?" Answered loosely, you have amended the scheme live and invited deferral. The trained move: welcome conditions in principle, defer specifics to officers.
5. **The pet-issue councillor gets respect, not victory.** One member will ride a hobby-horse — drainage, bin storage, heritage. Fighting them loses the room; the answer names their concern as legitimate, points to where the application addresses it, and moves on.
6. **Members vote on harms, not love.** Your three minutes is not for describing the scheme — the officers did that. It is for the three sentences that neutralise the three biggest harms members are about to weigh, and one that reminds them refusal needs defensible reasons.

## Output Format

# Committee Hearing: [scheme] — officer recommendation: [approve/refuse]

> Simulation — a plausible committee, not a prediction. Procedure and speaking rights vary by authority.

## The Transcript
[Objector slots → your three minutes → member questions. *Member reaction:* after each answer]

## The Objection Map
| Objection | Material? | The grounded answer |
|---|---|---|
[Material considerations answered from policy and consultee responses; non-material ones named as such, respectfully]

## Your Three Minutes, Rebuilt
[Timed draft — harms neutralised first, policy anchor, officer recommendation, close]

## Debrief — out of character
[What handed members a refusal reason · what the sideways questions were fishing for · the don't-say list]

> Not planning or legal advice — committee procedure, speaking time, and what counts as material vary by authority. Where refusal is likely or an appeal is in view, a planning consultant is the right next call.

## Quality Checks

- [ ] Every objection is classified material or non-material, with the classification defensible
- [ ] The three-minute draft actually reads aloud inside three minutes
- [ ] The sideways-question beat shows the deferral risk of amending live
- [ ] Member reactions track votes, not debate points
- [ ] The debrief distinguishes losing the argument from losing the room

## Anti-Patterns

- [ ] Do not coach contempt for objectors — members are their neighbours' representatives, and dismissiveness reads as exactly the developer they fear
- [ ] Do not spend the three minutes describing the scheme — the vote turns on harms, and the officers already presented the proposal
- [ ] Do not invent policy citations — anchor to the officer report the members are holding
- [ ] Do not let the pet-issue councillor be defeated — redirected, never humiliated
- [ ] Do not stay in character in the debrief
