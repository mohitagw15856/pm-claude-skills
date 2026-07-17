---
name: form-filler-operator
description: "Fill long web forms and applications through a computer-use agent — from a fact sheet you approve, field by field, with a full transcript and nothing submitted without your word. Use when asked to fill this application for me, complete this government/vendor/insurance form, or do this registration. Produces the fact-to-field mapping, the filled form held at review, and a field-level transcript."
---

# Form Filler Operator Skill

Forms are where an hour of a professional's day goes to die: the same facts, retyped into someone else's boxes. This skill runs the retyping through a computer-use agent — with the discipline the task actually needs: facts come from an approved sheet (never invented), every field write is logged, and the submit button belongs to the human. (Reading the form's fine print first? That's `tos-decoder`'s job — chain them.)

## What This Skill Produces

- **The fact sheet** — every fact the form needs, gathered once, confirmed before any filling
- **The mapping** — form field → fact → source, including fields with *no* matching fact (asked, never guessed)
- **The filled form, held at review** — completed up to (never through) the submission step
- **The transcript** — field-by-field record of what was entered where

## Required Inputs

Ask for these if not provided:
- **The form** — URL or document, and any login the user has already established
- **The facts** — documents/profile to draw from (or interview the user to build the sheet)
- **Sensitivity rules** — which fields (SSN/passport/banking) require the user to type them personally; default: ALL such fields are user-typed
- **The deadline and stakes** — a visa application and a newsletter signup deserve different paranoia

## Framework

1. **Sheet before form:** all facts assembled and user-confirmed first; mid-form invention is how wrong data gets submitted.
2. **Map, then fill:** every field mapped to a fact + source; unmapped fields become questions batched to the user — one interruption, not twenty.
3. **Sensitive-field floor:** identity, financial, and medical fields are never agent-typed unless the user explicitly overrides, field by field.
4. **Checkpoint pages:** multi-page forms get a per-page pause-and-verify against the mapping before proceeding.
5. **The held-at-review rule:** the run ends at the review/submit screen with a screenshot; pressing submit is the user's hand or an explicit word-level go.

## Output Format

# Form Run: [form name] — [date]
**Fact sheet:** [n] facts confirmed · **Fields:** [n] mapped, [n] user-typed (sensitive), [n] open questions
| Field | Entered | Fact source |
|---|---|---|
**Status:** held at review — [screenshot] — awaiting your submit.

## Quality Checks
- [ ] Zero fields filled from inference — every entry traces to the confirmed sheet
- [ ] All sensitive fields were user-typed or explicitly overridden one by one
- [ ] Open questions were batched, not guessed
- [ ] The run ended held-at-review with visual proof

## Anti-Patterns
- [ ] Do not guess a field to keep momentum — a wrong passport number costs weeks
- [ ] Do not accept ToS/declarations on the user's behalf — decode them (`tos-decoder`) and put the checkbox in the user's hands
- [ ] Do not autofill from a browser profile — the confirmed sheet is the only source
- [ ] Do not treat CAPTCHAs or identity checks as obstacles to defeat — they're the user's to complete, by design

## Execution

For computer-use agents with browser control. Without tools, the fact sheet + mapping is the deliverable (still worth an hour). Rules per [SKILLSPEC.md §5](../../SKILLSPEC.md).

### Preconditions
- The fact sheet confirmed by the user; the mapping approved; sensitivity rules acknowledged.
- The user is present (or reachable) for sensitive fields, CAPTCHAs, and the final submit.
- For logged-in forms: the session was established by the user, not the agent.

### Allowed actions
- Navigate the named form; enter mapped facts into their fields; upload documents the user staged for this run.
- Pause at each page checkpoint and at every sensitive field; screenshot at each checkpoint.
- Stop at the review/submit screen.
- Nothing else: **no submitting, no account creation, no payment entry, no accepting agreements, no navigating beyond the named form.**

### Verification
- At review: read back every field from the form itself against the mapping; list any field the form transformed (formatting, truncation).
- Deliver the transcript + review screenshot.

### Rollback
- Unsubmitted forms roll back by closing the session (nothing was committed).
- Stop and ask a human if: a field rejects a mapped fact, the form's structure changes mid-run, an unexpected identity/payment step appears, or anything requires agreement acceptance.
