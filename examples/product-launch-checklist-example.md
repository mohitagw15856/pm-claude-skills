# Example: product-launch-checklist

## What this skill does

Generates a tiered, role-assigned launch checklist across pre-launch engineering, marketing and comms, support readiness, launch day and post-launch monitoring, sized to the launch's risk.

## How to trigger it

### Example 1: a tier-1 feature launch

**You say:**
> "Launch checklist for our new payments dashboard, target [date], tier 1 (touches billing data, all customers see it). PM is [Rhea], eng lead [Tomas]."

**Claude produces (excerpt):**

### Launch Checklist: Payments dashboard. Target: [date]

**Launch Tier:** 1 | **Launch Owner:** [Rhea] | **Engineering Lead:** [Tomas]
**Go/No-Go Decision By:** [date minus 1], 15:00

### 🔧 PRE-LAUNCH, Engineering & Product (T-2 weeks)
- [ ] Feature flag created and tested in staging ([Tomas])
- [ ] Rollback procedure documented and tested, including flag-off under load
- [ ] Security review completed (billing data exposure) ([security])
- [ ] Monitoring: dashboard error rate and load-time alerts wired ([Tomas])

### 📣 PRE-LAUNCH, Marketing & Comms (T-1 week)
- [ ] In-app announcement drafted and scheduled ([marketing])
- [ ] Help-centre article live but unlisted ([support ops])

### 🛟 SUPPORT READINESS (T-3 days)
- [ ] Support briefed with the 5 expected questions and answers
- [ ] Known-limitations list shared (CSV export ships in v1.1)

### 🚀 LAUNCH DAY
- [ ] Flag to 10% at 09:00; error budget check at 10:00; 100% by 14:00 if green
- [ ] #launch-room open; [Rhea] posts hourly status

### 📊 POST-LAUNCH (T+7)
- [ ] Adoption vs target (40% of weekly actives open it)
- [ ] Ticket themes reviewed; rollback criteria formally retired

### Example 2: right-sizing a small release

**You say:**
> "Same skill for a tier-3: we renamed two menu items and updated empty-state copy."

**Claude produces (excerpt):**

**Launch Tier:** 3, minimal ceremony.
- [ ] Copy reviewed by one other person
- [ ] Localisation strings updated (the two renamed items exist in 4 languages)
- [ ] Help-centre screenshots checked for the old names
- [ ] Changelog line added
**Explicitly skipped for tier 3:** go/no-go meeting, support briefing, launch room. A checklist that treats this like tier 1 trains people to ignore checklists.

## Tips for best results

- State the tier and why; depth follows blast radius, not effort spent building.
- Name owners as you ask; unowned checklist lines do not happen.
- Keep the go/no-go time real; a decision point without a clock is a hope.

## Related skills

- `go-to-market` for the messaging assets this checklist schedules
- `incident-postmortem` if launch day goes wrong despite the list
