# Launch Readiness Skill

Ensure nothing falls through the cracks before launch by systematically checking readiness across every function — and producing a clear, evidenced go/no-go recommendation.

## Required Inputs

Ask the user for these if not provided:
- **Launch name and target date**
- **Launch tier** (Tier 1 = major launch / Tier 2 = significant feature / Tier 3 = incremental update)
- **Completed checklist items or self-assessment** (even partial is fine — we'll surface gaps)
- **Team and role names** (to assign owners to blockers)

## Readiness Checklist by Function

### Product & Engineering
- [ ] Feature complete against launch spec
- [ ] Performance benchmarks met
- [ ] Accessibility standards checked
- [ ] Edge cases documented and handled
- [ ] Rollback plan defined and tested

### Marketing & Comms
- [ ] Launch messaging approved
- [ ] Blog post / press release drafted
- [ ] Social content prepared
- [ ] Email campaigns scheduled
- [ ] Landing page live and tested

### Support & Success
- [ ] Support team trained on new feature
- [ ] FAQ and help docs published
- [ ] Escalation path defined for launch issues
- [ ] Customer success briefed (if enterprise)

### Sales & Partnerships
- [ ] Sales enablement materials ready
- [ ] Pricing confirmed and communicated
- [ ] Partner comms sent (if applicable)

### Data & Analytics
- [ ] Tracking events implemented and verified
- [ ] Launch metrics dashboard live
- [ ] Baseline metrics captured pre-launch

## Process
1. Review provided launch brief and checklist responses
2. Flag any incomplete items as blockers (must fix) or risks (monitor)
3. Assess overall readiness and produce go/no-go recommendation with rationale
4. If no-go, specify exactly what must be completed and by when
5. **Validate** — Confirm every blocker has a named owner and resolution deadline, and that the rollback plan is tested (not just documented)

## Output Structure

### Launch Readiness Assessment: [Feature/Product Name]
**Launch Date:** [date]
**Launch Tier:** [1 / 2 / 3]
**Overall Status:** ✅ Go / ⚠️ Conditional Go / 🛑 No-Go

**Blockers (must resolve before launch):**
- [item + owner + resolution required by]

**Risks (monitor closely):**
- [item + mitigation plan]

**Ready Areas:**
- [function]: ✅ Ready

**Recommendation:**
[Clear go/no-go with rationale — 3-5 sentences]

## Quality Checks

- [ ] Every blocker has a specific owner (not "the team") and a deadline
- [ ] Rollback plan is explicitly tested, not just written
- [ ] Analytics events are verified in staging, not just implemented
- [ ] Go/No-Go decision has a named decision-maker and a cut-off time
- [ ] At least one post-launch monitoring check is scheduled (e.g., T+2hr, T+24hr)

## Anti-Patterns

- [ ] Do not mark a function as "Ready" without evidence — green status must be backed by a completed checklist item, not an assumption
- [ ] Do not issue a Conditional Go without specifying exactly what conditions must be met and by when — vague conditions are not conditions
- [ ] Do not treat the rollback plan as complete unless it has been tested in staging, not just documented
- [ ] Do not assign blockers to "the team" — every blocker must have a single named owner or it will not be resolved before launch
- [ ] Do not skip the analytics verification step — unverified tracking events mean the launch will be invisible and cannot be evaluated
