---
name: farm-records-book
description: "Set up or tidy a farm's records so they answer the questions that matter: what was applied where and when, what each field and animal group produced, what it cost and earned, and what an inspector, buyer or bank will ask to see. Use when asked to set up farm records, what records do I need to keep, organise my field notes, prepare for a farm inspection or audit, or turn this notebook into proper records. Produces a records structure, ready-to-use tables for field, livestock, input, sales and labour records, a weekly routine, and an inspection-readiness check."
version: 1.0.0
---

# Farm Records Book

Most farms keep records in a notebook, a phone gallery and somebody's memory. That works until a buyer asks for spray records, a bank asks for last year's sales, or the farmer wants to know which field lost money. This skill sets up the smallest set of records that answers those questions and a routine that takes minutes a week.

## What This Skill Produces

- A records structure matched to the farm's enterprises and to who will ask for the records
- Table templates: field operations, input purchases and stock, crop protection applications, harvest and sales, livestock, labour, cash
- A weekly and monthly routine
- A conversion of existing notes into the tables, where notes are supplied
- An inspection or audit readiness check

## Required Inputs

Ask for these if not provided:

- Enterprises: crops, livestock, processing, direct sales
- Who needs the records: the farmer, a certification body, a contract buyer, a subsidy scheme, a lender, the tax authority
- Any standard to meet (name it, and supply its record requirements)
- How records are kept now, and on what: paper, phone, spreadsheet
- Who will do the recording and how much time they have
- Existing notes to convert, if any

## Framework

1. **Start from the questions.** List who will ask what, then keep only the records that answer those questions.
2. **One event, one line.** Date, field or animal group, what was done, product and quantity, who did it.
3. **Traceability chain.** Input batch to field to harvest lot to buyer. A buyer or certifier follows this chain, so each link needs an identifier.
4. **Crop protection and veterinary records carry legal weight.** Product, rate, area or animal, reason, operator, date, and the withdrawal or pre-harvest interval end date. The farmer takes rates from the label.
5. **Money follows operations.** Every purchase and sale is recorded with a receipt reference so gross margin per field or group can be worked out.
6. **Routine beats detail.** Ten minutes at the end of each working day or a fixed weekly slot. Records written from memory a month later are not evidence.
7. **Retention.** Keep records for as long as the strictest requester demands; ask the user to confirm that period.

## Output Format

### Records plan: [farm]

**Who asks for what**
| Requester | Records they want | How long to keep |
|---|---|---|

**Field operations**
| Date | Field | Operation | Product or seed | Rate | Quantity | Operator | Note |
|---|---|---|---|---|---|---|---|

**Crop protection or veterinary treatments**
| Date | Field or animal group | Product and batch | Reason | Rate or dose (from label) | Operator | Safe-to-harvest or withdrawal ends |
|---|---|---|---|---|---|---|

**Inputs in and stock**
| Date | Item | Supplier | Batch | Quantity | Cost | Receipt ref | Stock after |
|---|---|---|---|---|---|---|---|

**Harvest and sales**
| Date | Field or group | Lot ID | Quantity | Grade | Buyer | Price | Invoice ref |
|---|---|---|---|---|---|---|---|

**Labour**
| Date | Person | Task | Field | Hours or days | Pay |
|---|---|---|---|---|---|

**Routine:** daily [what], weekly [what], monthly [what], end of season [what].

**Inspection readiness**
- [ ] Every treatment has a date, product, rate and operator
- [ ] Harvest lots trace back to a field and forward to a buyer
- [ ] Receipts match the input record
- [ ] Records are in ink or locked files, with corrections visible

**Assumptions and gaps**
- [Requirements assumed because the standard was not supplied]
- [Records that cannot be rebuilt from the notes given]

## Quality Checks

- [ ] Each table exists because a named requester needs it
- [ ] Lot or batch identifiers link inputs, fields, harvest and sales
- [ ] Treatment records include the interval end date
- [ ] The routine fits the time the farmer said they have
- [ ] Converted notes are transcribed, not embellished

## Anti-Patterns

- **Do not design twenty forms.** Unused records are worse than few.
- **Do not backfill missing entries with guesses.** Mark the gap.
- **Do not state legal retention periods or residue limits from memory.**
- **Do not separate money records from operations** so far that margins cannot be worked out.
- **Do not rely on one phone.** Say where the copy lives.

## Example Trigger Phrases

- "A supermarket buyer wants spray records. What do I need to keep?"
- "Turn these notebook pages into proper field records."
- "Set up simple records for forty goats and two hectares of vegetables."
- "We have an organic inspection next month. Are our records ready?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/farm-records-book.html
