---
name: feature-sunset-plan
description: "Plan the retirement of a product feature — the kill decision made honest, user migration, data handling, comms sequencing, and the code actually deleted. Use when deprecating or sunsetting a feature, killing an underused capability, retiring an AI feature that didn't land, or when a 'deprecated' feature has haunted the codebase for two years. Produces a sunset plan: the decision record, affected-user analysis, migration paths, a staged timeline with comms per stage, and the removal checklist. For API deprecation specifically use api-versioning-strategy."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/feature-sunset-plan.html
metadata:
  {
    "openclaw": { "emoji": "🗺" }
  }
---

# Feature Sunset Plan Skill

Products are good at shipping and terrible at unshipping: features limp on for years because nobody owns the removal, and when a kill finally happens it's announced badly, migrates nobody, and leaves the code behind anyway. A sunset is a *product launch in reverse* — it deserves the same rigour. This skill plans the whole arc, decision to deletion.

## What This Skill Produces

- A **decision record**: why this feature dies, the evidence, and what was considered instead
- An **affected-user analysis** — who actually uses it, how deeply, and who screams
- **Migration paths** per user segment, with the no-path-exists cases faced honestly
- A **staged timeline** with comms per stage, and the **removal checklist** that ends in deleted code

## Required Inputs

Ask for (if not already provided):
- **The feature and the evidence for killing it**: usage data (who/how many/how deeply — depth matters more than counts), cost to maintain, what it blocks
- **The user reality**: any contractual commitments, enterprise customers with it in their workflow, data users have stored in it
- **What replaces it** — an internal alternative, a competitor hand-off, or honestly nothing
- **Constraints**: renewal cycles to respect, compliance data-retention duties, support capacity for the transition

## Sunset Method

1. **Make the kill decision auditable.** The decision record states: the evidence (usage, cost, strategy misfit), the alternatives considered (invest, maintain-freeze, spin off), and the success criteria *for the sunset itself* (support tickets contained under X, churn attributable under Y, code deleted by date Z). A sunset without success criteria drifts back into maintenance.
2. **Analyse users by depth, not count.** "2% use it" hides the enterprise account whose workflow depends on it. Segment: **incidental** (touched it once — need nothing but the notice) · **regular** (in their routine — need a migration path) · **dependent** (built process/data on it — need white-glove handling and account-team involvement *before* any public notice). Check contracts: a feature named in an enterprise agreement isn't yours to kill on your schedule.
3. **Build the migration path per segment.** For each: where do they go (the replacement, an export, a partner tool), what carries over automatically vs manually, and *what they lose* — stated plainly; migration comms that pretend equivalence get caught, and the trust cost exceeds the feature's. Data handling is explicit: export formats, how long data stays retrievable after shutoff, what compliance requires kept, what gets deleted and when.
4. **Stage the timeline.** The standard arc, compressed or stretched by depth-of-dependence:
   - **Soft close** — hidden from new users; existing users unaffected (kills growth of the problem)
   - **Announce** — dependent users first, privately, *before* the public notice; then in-product notice to actual users of the feature (not a banner for everyone), each with date + path + what-you-lose
   - **Freeze** — no new data/objects created; reminders escalate
   - **Shutoff** — read/export-only window
   - **Removal** — data handled per policy, and the *code deleted* — flags, dead paths, docs, the SKU in billing
   Every stage has a date and an owner in the plan.
5. **Prepare for the screamers.** The loudest resistance often comes from internal teams (the seller who promised it, the founder who built it) and a handful of vocal users. The plan pre-writes: the support macro, the account-team talking points, the exception policy (who may grant extensions, the *maximum* extension, and the answer to "can we just keep it for this one customer" — which is the question that turns sunsets into zombies).
6. **Close the loop.** After removal: the retro against the sunset's own success criteria, and the decision + learnings filed (the [Brain's](../professional-brain/SKILL.md) `decisions/` if one exists) — the next sunset should start smarter.

## Output Format

### Sunset Plan: [feature] — target removal [date]

**Decision record:** [evidence · alternatives considered · sunset success criteria]

**Affected users**
| Segment | Count | Depth signals | Handling |
|---|---|---|---|

**Migration:** [per segment: destination · what carries · what's lost (stated) · data export/retention terms]

**Timeline**
| Stage | Date | Who's told, how | Owner |
|---|---|---|---|

**Exception policy:** [who grants · max extension · the one-customer answer]

**Removal checklist:** [code paths/flags · docs · billing SKU · data deletion per policy · monitoring for stragglers hitting dead ends]

**Retro date:** [when, against the success criteria above]

## Quality Checks

- [ ] The decision record includes sunset success criteria, not just kill reasons
- [ ] Users are segmented by depth; dependent accounts are contacted before any public notice
- [ ] Every migration path states what's lost, not just what's equivalent
- [ ] Contractual and compliance checks are documented, not assumed
- [ ] The timeline ends in *deleted code*, with an owner for the deletion
- [ ] The exception policy has a maximum — extensions are bounded by design

## Anti-Patterns

- [ ] Do not announce by blog post before dependent customers hear it from their account team
- [ ] Do not use raw usage percentage as the whole case — depth and contracts decide who can veto your math
- [ ] Do not promise the replacement is equivalent when it isn't — name the losses; users find them anyway
- [ ] Do not grant open-ended exceptions — one immortal customer instance is the whole maintenance cost with none of the revenue
- [ ] Do not declare victory at shutoff — the sunset is done when the code is gone and the retro is filed
- [ ] Do not let "deprecated" become a permanent state — a deprecation without a removal date is a mood, not a plan

## Example Trigger Phrases

- "Sunsetting a feature."
- "Killing an underused capability."
- "Retire an AI feature that didn't land."
