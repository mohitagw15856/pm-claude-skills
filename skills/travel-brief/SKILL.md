---
name: travel-brief
description: "Turn a business trip into a one-page brief that runs itself — the itinerary with buffers and failure modes, the meeting logistics pre-solved (addresses, contacts, backup numbers), the packing-and-prep list by trip type, and the expense capture set up before departure. Use when asked prep my business trip, build the travel brief, I always forget something when traveling, or organize this three-city week. Produces the one-page brief: timeline with buffers, the per-meeting logistics, the contingency card, and the expense setup."
---

# Travel Brief Skill

Business trips fail in the seams — the connection that assumed zero delays, the meeting address that lived in an email now unreachable on airport wifi, the receipt pile that becomes March's archaeology ([expense-discipline](../expense-discipline/SKILL.md) starts before departure). The brief is one page that runs the trip: the timeline with honest buffers (the failure modes priced in), every meeting's logistics pre-solved and *offline-accessible*, the contingency card (what happens when the flight cancels — decided calmly, not at gate B7), and the capture habits armed before wheels-up.

## What This Skill Produces

- **The timeline** — the trip end-to-end with buffers at the risky seams, and the timezone math done once
- **The per-meeting card** — address, floor, contact + backup phone, the prep pointer ([meeting-prep-pack](../meeting-prep-pack/SKILL.md) per high-stakes meeting), the get-there time
- **The contingency card** — the flight-cancels / meeting-moves / tech-fails branches, pre-decided
- **The setup list** — offline copies, expense capture armed, the OOO-lite for the office ([out-of-office-designer](../out-of-office-designer/SKILL.md) trimmed for travel)

## Required Inputs

Ask for these if not provided:
- **The trip's skeleton** — flights/trains, cities, the meetings with their stakes (the one that justifies the trip gets named — it shapes every buffer decision)
- **The known fragilities** — tight connections, first-time cities, winter weather, the meeting that might move; contingencies attach to real risks
- **The traveler's failure pattern, honestly** — forgets chargers? Books too tight? Loses receipts? The brief compensates for the actual person
- **The expense regime** — company card or reimbursement, the policy's receipt rules; the capture setup matches it

## Framework: The Brief Rules

1. **Buffers price the failure modes:** connections get the honest minimum (not the airline's optimism), the airport-to-meeting gap assumes traffic, and the trip-justifying meeting gets the *arrive-the-night-before* rule when stakes warrant — a $200 hotel is cheap insurance on the meeting that booked the flight. Every buffer names what it absorbs.
2. **Meeting logistics live offline:** every meeting's card — full address with floor/suite, the contact's mobile (and a backup human), the calendar hold with everything embedded — saved offline (the brief as a PDF on the phone), because airport wifi and roaming failures target exactly the moment you need the address.
3. **The contingency card pre-decides:** flight cancels → the rebooking move (the airline app first, the lounge/counter parallel, the meeting's contact told *early* — a moved meeting survives; a no-showed one doesn't) · meeting moves → the slack in the timeline it lands in · demo/tech fails → the [demo-script](../demo-script/SKILL.md) backup lives locally. Decisions made at gate B7 under a delay board are reliably worse than the same decisions made at a desk.
4. **Expense capture starts at booking:** the trip folder (digital) opens at booking time — confirmations in as they arrive, the receipt-photo habit armed ([expense-sheet-design](../expense-sheet-design/SKILL.md): photograph at spend-time, 15 seconds), per-diem rules checked *before* the first meal, not after. The trip ends with the report half-done because it was captured, not reconstructed.
5. **The office runs without you, lightly:** the travel OOO-lite — reachable-but-slow expectations set, the one delegate for the can't-wait items, the calendar blocked honestly (including transit — a flight is not "free" for calls, and pretending it is books the day twice).

## Output Format

# Travel Brief: [trip] — [dates] · the trip-justifier: [the key meeting]

## The Timeline
[End-to-end with buffers, each named for what it absorbs · timezone math done · transit blocked honestly]

## Meeting Cards
| Meeting | Address (full) | Contact + backup | Arrive by | Prep |
|---|---|---|---|---|

## The Contingency Card
[Flight cancels → … · meeting moves → … · tech fails → … — each pre-decided with its first phone call]

## Setup (before departure)
[Brief saved offline · trip expense folder open · receipt habit armed · OOO-lite + delegate · chargers/adapters per the personal failure list]

## Quality Checks

- [ ] Every buffer names the failure mode it absorbs
- [ ] The trip-justifying meeting has the night-before rule considered explicitly
- [ ] All meeting logistics are offline-accessible with backup contacts
- [ ] Contingencies are pre-decided with their first moves
- [ ] Expense capture was armed at booking, not at return

## Anti-Patterns

- [ ] Do not book the airline's optimistic connection for a stakes trip — the buffer is the ticket's real price
- [ ] Do not leave addresses in searchable-later emails — offline or it doesn't exist at the moment of need
- [ ] Do not improvise the cancellation response — gate-B7 decisions are the worst decisions in business travel
- [ ] Do not pile receipts for later — the 15-second photo beats the March shoebox by arithmetic
- [ ] Do not schedule the flight hours as working hours — transit is transit; double-booked days collapse twice

## Example Trigger Phrases

- "Prep my business trip."
- "Build the travel brief."
- "I always forget something when traveling."
- "Organize this three-city week."
