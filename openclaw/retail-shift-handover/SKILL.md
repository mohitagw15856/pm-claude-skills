---
name: retail-shift-handover
description: "Write a shop-floor shift handover between duty managers or team leaders: trading so far against plan, cash and till position, deliveries and stock issues, staffing, customer issues still open, safety and security matters, and the tasks the next shift must finish. Use when asked to write the handover for the late shift, close-down notes, opening manager notes, duty manager handover, or what does the next shift need to know. Produces a one-page handover with a must-do list in priority order, open issues with owners, and a sign-off line. Distinct from nursing-shift-handover and from spreadsheet-handover."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/retail-shift-handover.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Retail Shift Handover

The late shift inherits whatever the early shift did not finish and did not mention: a delivery half put away, a refund promised to a customer, a till that was short at lunchtime. This skill turns a duty manager's notes into one page the next person can run the shop from.

## What This Skill Produces

- A trading snapshot: sales against plan and anything driving the gap
- Cash position: till counts, floats, banking, discrepancies
- Deliveries, stock gaps and price or promotion changes
- Staffing for the next shift, including absence and breaks owed
- Open customer issues with what was promised and by when
- Safety, security and maintenance matters
- A prioritised must-do list and a sign-off line

## Required Inputs

Ask for these if not provided:

- Shop, date, which shift is handing to which
- Sales so far against plan, if known
- Till and cash events: counts, shorts or overs, safe drops, banking
- Deliveries received, outstanding or short, and what is still to be worked
- Staff in, absent, swapped, and anything the next manager must know
- Customer complaints, refunds, orders and promises still open
- Incidents: theft, accident, equipment fault, alarm
- Tasks not finished and tasks due before close or opening

## Framework

1. **Lead with what must happen next shift**, in priority order, each with a deadline.
2. **Cash is stated exactly.** Amounts, till numbers and who counted. A discrepancy is reported with what was already checked.
3. **Promises to customers carry a name and a time.** What was promised, by whom, the contact method and the deadline.
4. **Stock is described by consequence.** "Milk delivery short by two crates, will run out about 18:00, supplier called at 11:20, credit requested."
5. **Safety and security items never sit at the bottom.** Wet floor, broken lock, alarm fault go in the must-do list.
6. **Facts about people stay factual.** Attendance and cover only. Conduct concerns go to the right manager privately, not in a shared handover.
7. **Sign-off.** Both managers confirm the cash position and the keys.

## Output Format

### Handover: [shop], [shift] to [shift], [date]

**Must do, in order**
| # | Task | By | Owner |
|---|---|---|---|

**Trading:** sales [x] against plan [x]. [Reason for the gap.]

**Cash**
| Till or safe | Counted | Expected | Difference | Checked by | Note |
|---|---|---|---|---|---|

**Deliveries and stock:** [received, short, still to work, gaps on shelf, price or promotion changes]

**Staffing next shift:** [who is in, absences, breaks, cover arranged]

**Open customer issues**
| Customer ref | What was promised | By when | Contact | Owner |
|---|---|---|---|---|

**Safety, security, maintenance:** [items and what has been done]

**Sign-off:** cash and keys confirmed by [outgoing] and [incoming] at [time].

**Assumptions and gaps**
- [Figures not supplied]
- [Items the outgoing manager should confirm before leaving]

## Quality Checks

- [ ] The must-do list comes first and every item has a deadline
- [ ] Cash amounts are exact and discrepancies say what was checked
- [ ] Every customer promise has an owner and a time
- [ ] Safety and security items appear in the must-do list
- [ ] Nothing about an individual's conduct appears in the shared note

## Anti-Patterns

- **Do not write "all fine".** Say what was checked.
- **Do not bury a cash discrepancy** in a paragraph.
- **Do not hand over a promise without a deadline.**
- **Do not record opinions about staff** in a document others can read.
- **Do not let the list run to thirty items.** Group routine tasks and highlight the exceptions.

## Example Trigger Phrases

- "Write the handover for the closing manager from these notes."
- "Till 3 was short at lunch and a delivery is half done. What do I hand over?"
- "Make a one-page opening manager note for tomorrow."
- "A customer was promised a refund call by 5 pm. Put that in the handover properly."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/retail-shift-handover.html

<!-- pm-claude-skills v84.0.0 | skill: retail-shift-handover | source: skills/retail-shift-handover/SKILL.md | sha256: 00afe5d57a98b59a38ab233b58113e44aa1e9ffa3f2951855d12c29f2a253171 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
