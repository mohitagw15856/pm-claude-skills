---
name: logistics-incident-report
description: "Write up a supply chain disruption — port delay, carrier failure, customs hold, or in-transit damage — as a decision-ready incident report. Use when asked to document a shipment delay, write up a logistics failure, report a customs hold, quantify a supply disruption, or draft the customer notice for a late delivery. Produces an impact-quantified incident report with containment actions, root cause, prevention items, and a customer-communication draft."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/logistics-incident-report.html
metadata:
  {
    "openclaw": { "emoji": "📦" }
  }
---

# Logistics Incident Report Skill

When freight goes wrong, the write-up has two jobs at once: give operations the facts to contain the damage today, and give the network the lesson so it doesn't repeat. This skill quantifies who and what is actually at risk (orders, customers, dollars — not just "a container is late"), separates containment from prevention, digs the root cause past "the carrier failed", and drafts the customer message so commercial teams aren't improvising under pressure.

## What This Skill Produces

- An incident summary with severity classification
- Impact quantification: orders, customers, revenue at risk, and production/stockout exposure
- A containment log: actions taken and still open, with owners and ETAs
- Root cause and contributing factors — past the proximate carrier/port event
- Prevention actions distinguishing this-lane fixes from network lessons
- A ready-to-send customer-communication draft

## Required Inputs

Ask for these if not provided:
- **What happened** — event type (port congestion, carrier failure, customs hold, damage, weather), shipment/PO references, discovery date
- **What's on the freight** — SKUs, quantities, value, and what they feed (customer orders, production, safety stock)
- **Timing** — original ETA, current best ETA, and how the delay compares to buffer stock on hand
- **Actions so far** — reroutes, expedites, allocations already in motion
- **Customer exposure** — which customers are affected and any committed dates or penalty/SLA clauses

If details are thin, build the report with figures marked `[to confirm]` and list exactly what data closes each gap. A fast 80% report beats a complete one after the containment window closes.

## Impact & Severity Framework

**Quantify in three layers — never stop at the freight:**
1. **Freight layer** — units and inventory value delayed/damaged (the smallest number; note it, don't lead with it)
2. **Fulfillment layer** — customer orders and production runs that miss dates *after netting available stock*: order count, customers by name/tier, revenue at risk, line-down exposure
3. **Consequence layer** — SLA penalties, expedite premiums already committed, substitution/cancellation risk on strategic accounts

**Severity:**

| Level | Definition | Response posture |
|---|---|---|
| SEV1 | Line-down, strategic-customer miss, or >$250k revenue at risk | Daily war-room, executive owner, proactive customer contact today |
| SEV2 | Committed dates missed for multiple customers, buffers exhausted | Named incident owner, customer contact within 24h |
| SEV3 | Buffer absorbs it; internal dates slip only | Log, monitor, no external comms unless asked |

(Adjust dollar thresholds to the business's scale and say so.)

**Containment vs. prevention** — containment changes this shipment's outcome (reroute, air-freight split, partial release from customs broker, allocate remaining stock, qualify substitute); prevention changes the next one (dual-lane routing, buffer policy on this lane, carrier scorecard consequence, HS-code/documentation fix). Keep them in separate sections — mixing them is how prevention never gets owned.

**Root cause discipline** — "carrier failed" is a proximate event, not a root cause. Ask why the network was exposed: single carrier on a critical lane? Buffer sized for an average transit that ignored seasonal congestion? Customs paperwork error at origin that a document check would have caught? The root cause should name something *your* organisation can change.

**Customer communication rules** — state the new committed date only when confident, else give a date for the date ("firm ETA by Thursday"); say what you're doing, not whose fault it is; never blame the carrier by name in writing; offer the mitigation (partial shipment, substitute) in the same message as the bad news.

## Output Format

### Logistics Incident Report: [event] — [reference]

**1. Summary & severity** — what happened, SEV level, current status, incident owner.

**2. Impact quantification** — the three layers: freight value; table of Order | Customer | Committed date | New date | Revenue at risk | Line-down? ; consequence exposure.

**3. Timeline** — discovery, escalations, decisions, current position (times and dates).

**4. Containment** — table: Action | Owner | Status | ETA | Cost. Include options considered and rejected, with why.

**5. Root cause & contributing factors** — proximate event, root cause, contributing exposures.

**6. Prevention actions** — Action | This-lane or network | Owner | Due date.

**7. Customer communication draft** — ready-to-send text per affected customer tier, following the communication rules.

## Quality Checks

- [ ] Impact quantified through all three layers — orders and dollars, not just delayed units
- [ ] Delay netted against available stock before declaring customer impact
- [ ] Severity assigned from the table, and the response posture matches it
- [ ] Containment actions each have an owner, status, and cost
- [ ] Root cause names an internal exposure, not just the external event
- [ ] Customer draft contains no blame, no unconfirmed promise dates, and a mitigation offer
- [ ] Unknowns marked `[to confirm]` with the data source that closes them

## Anti-Patterns

- [ ] Do not report freight value as the impact — a $40k container feeding a $2M line-down is a $2M problem
- [ ] Do not stop the root cause at "the carrier/port/customs failed" — the exposure that let it hurt you is the fixable part
- [ ] Do not promise customers a recovery date you don't have — give a date for the date instead
- [ ] Do not let expedite costs go untracked — containment spend belongs in the report, or the same lane stays fragile at premium prices
- [ ] Do not merge containment and prevention lists — one has hour deadlines, the other needs owners after the fire is out
- [ ] Do not close the incident when the freight arrives — it closes when prevention actions have owners and dates

## Example Trigger Phrases

- "Document a shipment delay."
- "Write up a logistics failure."
- "Report a customs hold."
- "Quantify a supply disruption."
- "Draft the customer notice for a late delivery."
