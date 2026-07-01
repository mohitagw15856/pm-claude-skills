---
name: foia-request
description: "Draft a public-records request (FOIA / FOI / state open-records) that's specific enough to get records and hard to deny. Use when asked to write a FOIA request, records request, or freedom-of-information request to a government body. Produces a properly-scoped request: the records sought, date range and format, fee-waiver and expedited-processing asks where applicable, and citations to the governing statute."
---

# FOIA / Public-Records Request Skill

Public-records requests fail when they're too vague ("all documents about X") — agencies reject or stall them.
A good request is *specific*: named record types, a date range, the right custodian, and the statutory hooks
for fees and timing. This skill drafts a request that's easy to fulfil and hard to deny.

> Educational drafting aid. Public-records laws vary by jurisdiction (US federal FOIA, US state open-records
> laws, UK/EU FOI, etc.) — confirm the governing statute, agency, and deadlines for the specific case.

## Required Inputs

Ask for these only if they aren't already provided:

- **The records you want** — as specifically as possible (type, subject, people/programs, keywords).
- **Timeframe & custodian** — the date range, and which agency/department/office likely holds them.
- **Jurisdiction** — federal, which state, or which country's FOI law (sets the statute, timelines, exemptions).
- **Requester type & purpose** — individual, journalist, researcher, commercial — affects fee category and waivers.
- **Format** — how you want records delivered (electronic preferred, native format).

## Output Format

### Public-records request — [agency]

**To:** the agency's FOIA/records officer (address/portal). **Date.**

**1. Statement of request** — "Under [the governing statute, e.g. the Freedom of Information Act, 5 U.S.C. § 552 / the [State] Public Records Act], I request the following records:"

**2. Records sought** — a numbered, specific list. For each: record type, subject, custodian if known, and the **date range**. Specific beats broad — narrow, well-defined items get filled; sweeping ones get denied.

**3. Format & delivery** — preferred format (electronic/native), and delivery method.

**4. Fees** — a fee category statement and, where applicable, a **fee-waiver request** (e.g. disclosure is in the public interest / non-commercial) with brief justification, plus a cap ("please contact me before incurring fees over $X").

**5. Expedited processing** (if applicable) — the basis (urgency, media, imminent public need).

**6. Response-time note** — cite the statutory response deadline and request acknowledgment.

**7. Contact & signature.**

## Quality Checks

- [ ] Records sought are specific (type, subject, custodian, date range) — not "all documents about X"
- [ ] The governing statute and jurisdiction are cited correctly
- [ ] Format/delivery preference is stated
- [ ] Fee category, a fee-waiver ask (if applicable), and a cost cap are included
- [ ] Expedited processing and the statutory response deadline are addressed where relevant

## Anti-Patterns

- [ ] Do not write an overbroad "any and all records" request — it invites denial or endless delay
- [ ] Do not omit the date range and custodian — specificity is what gets records produced
- [ ] Do not forget the fee cap — an uncapped request can return a huge estimate that stalls it
- [ ] Do not cite the wrong law for the jurisdiction — federal FOIA ≠ state open-records acts
- [ ] Do not overstate an expedited-processing basis — it must genuinely qualify

## Based On

FOIA / public-records practice (specificity, statutory citation, fee-waiver & expedited-processing provisions).
