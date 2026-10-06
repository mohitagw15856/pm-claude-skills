---
name: company-event-ops
description: "Run a company event — the launch party, the customer day, the team celebration — as the operation it is: the goal that shapes every choice, the budget with its forgotten lines, the vendor and venue coordination, the run-of-show with owners, and the day-of roles that keep hosts hosting. Use when asked plan the company event, organize our customer day/holiday party/launch event, what am I forgetting for this event, or be the run-of-show for Thursday. Produces the goal-shaped plan, the budget with the forgotten lines, the run-of-show, and the day-of role card."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/company-event-ops.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Company Event Ops Skill

Company events are [wedding-logistics-planner](../wedding-logistics-planner/SKILL.md) mechanics pointed at a business goal — and the goal is the part that usually goes unstated, which is why so many events are pleasant and pointless. "What is this event *for*" (celebrate the team? deepen customer relationships? mark the launch loudly?) shapes every downstream choice: venue, format, guest list, budget, and what success means Friday morning. Below the goal, it's operations: the budget with its routinely-forgotten lines (AV, service fees, the buffer), vendors coordinated on one sheet, the run-of-show with a named owner per segment, and the day-of rule that saves every event: *the hosts host; the runners run* — decided in advance, or the CEO spends the customer day moving chairs.

## What This Skill Produces

- **The goal-shaped plan** — the event's purpose stated, and the format/venue/guest choices that follow from it
- **The budget** — the real lines including the forgotten ones (AV, service charges + gratuities, signage, the 10% buffer)
- **The run-of-show** — the event in segments: time, what happens, who owns it, what could go wrong
- **The day-of role card** — hosts, runners, the decision-holder, vendor point — names against jobs, the [workshop-designer](../workshop-designer/SKILL.md) capture-role logic applied to events

## Required Inputs

Ask for these if not provided:
- **The goal, forced to specific** — "team morale" becomes "the team feels seen after a brutal quarter — success is people staying past the official end"; the goal test kills format mismatches early (awards ceremonies serve recognition; open bars serve decompression; they are not interchangeable)
- **The constraints** — budget band, date, headcount, the venue-vs-office question, and the remote contingent (excluded remote employees remember it longer than the event)
- **The stakes and audience** — internal celebration vs. customer-facing changes the polish bar, the run-of-show rigor, and who must never be seen moving chairs
- **The history** — last event's autopsy: what worked, what ran late, who got stuck running logistics

## Framework: The Ops Rules

1. **The goal picks the format:** every major choice (venue, program length, speeches-or-not, seating) gets tested against the stated goal — a customer event's goal ("deepen the top-20 relationships") argues for round tables and long breaks, against back-to-back presentations; a celebration's goal argues against anything resembling work. Events without a stated goal default to imitating the last event, recursively.
2. **The budget includes the forgotten lines:** AV (always more than assumed, and load-bearing for anything with speeches), service charges and gratuities (the [wedding-budget](../wedding-budget/SKILL.md) 20%+ surprise, corporate edition), signage/branding, overtime clauses, and the 10% contingency that isn't decoration. The per-head number is computed early — it's the go/no-go and the format-shaper.
3. **Vendors live on one sheet:** the [travel-brief](../travel-brief/SKILL.md)-style card per vendor — contact, arrival, setup window, what they need (power, access, load-in), payment status — and one named vendor-point who answers their calls (the day's hosts must not be that person).
4. **The run-of-show is minute-mapped with owners:** segments with times, transitions planned (a room of 80 moves slowly — [wedding-logistics-planner](../wedding-logistics-planner/SKILL.md) crowd-speed math), each segment owned, the AV/speech segments rehearsed ([presenter-notes](../presenter-notes/SKILL.md) for anyone speaking), and the contingency cards for the classics: speaker overruns (the cut plan), tech fails (the bridge), rain (the call time and caller).
5. **Day-of roles keep the right people visible:** hosts (senior folks whose job is the guests — protected from logistics absolutely) · runners (empowered to solve small problems with a budget cap) · the decision-holder (one name for the audibles) · vendor-point. The [offsite-planner](../offsite-planner/SKILL.md) two-endings rule applies: the event ends twice — in the room, and in the follow-through (the customer thank-yous, the photo share, the what-worked note for next time's autopsy file).

## Output Format

# Event Ops: [event] — goal: [the specific version] · [date, headcount, budget/head]

## Goal → Format Decisions
[The stated goal · the choices it drove: venue/format/program/guest-list — each with its why]

## The Budget
[The lines including AV, service+gratuity, signage, overtime clauses · the 10% buffer · per-head]

## Vendor Sheet + Run-of-Show
[Vendor cards: contact/arrival/needs/payment · The minute-map: time × segment × owner × contingency]

## Day-Of Roles
[Hosts (protected) · runners (+ their budget cap) · decision-holder · vendor-point — names against all]

## The Second Ending
[The follow-through: thank-yous, the share, the autopsy note — owned and dated]

## Quality Checks

- [ ] The goal is specific enough to have vetoed at least one format choice
- [ ] The budget carries the forgotten lines and the buffer
- [ ] Every run-of-show segment has an owner and the classics have contingency cards
- [ ] Hosts are structurally protected from logistics
- [ ] The follow-through has owners before the event starts

## Anti-Patterns

- [ ] Do not plan an event without a stated goal — pleasant-and-pointless is the default outcome
- [ ] Do not let the CEO move chairs — the role card exists so seniority hosts instead of hauling
- [ ] Do not budget the caterer's quote as the food cost — service and gratuity are the corporate surprise too
- [ ] Do not skip the remote contingent — the excluded remember longer than the attendees
- [ ] Do not end once — the un-followed-through event evaporates by Monday; the second ending is where the goal gets banked

## Example Trigger Phrases

- "Plan the company event."
- "Organize our customer day/holiday party/launch event."
- "What am I forgetting for this event?"
- "Be the run-of-show for Thursday."
