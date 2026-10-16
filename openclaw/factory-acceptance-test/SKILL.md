---
name: factory-acceptance-test
description: "Write a factory acceptance test (FAT) plan or report — test coverage matrix against spec, AQL sampling plan, pass/fail criteria, golden-sample handling, deviation log, and sign-off structure. Use when asked to write a FAT plan, define outgoing quality inspection, set AQL levels, prepare for a factory acceptance or pre-shipment inspection, or document FAT results. Produces a complete FAT plan or report with sampling tables, defect classification, and a sign-off block."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/factory-acceptance-test.html
metadata:
  {
    "openclaw": { "emoji": "🔧" }
  }
---

# Factory Acceptance Test Skill

A FAT is the last moment a defect is the factory's problem instead of yours. This skill writes the plan (or the report) with the parts that actually get argued over at the line: which spec clause each test covers, how many units get pulled and at what AQL, what exactly fails a lot, and who signs — so acceptance is a decision with a name on it, not a vibe at the end of a factory visit.

## What This Skill Produces

- A test coverage matrix mapping every test to the spec requirement it verifies
- A sampling plan (ANSI/ASQ Z1.4) with lot size, inspection level, and AQL per defect class
- Unambiguous pass/fail criteria and lot accept/reject rules
- Golden-sample handling procedure
- A deviation log format and a sign-off block with authority levels

## Required Inputs

Ask for these if not provided; if the spec is thin, draft the matrix from the product description and mark rows `[spec clause to confirm]`:

- **Product and spec** — the requirements document or at minimum a feature/claims list
- **Lot size** — units in the lot(s) under acceptance
- **Product risk profile** — safety-relevant? battery? affects AQL choice
- **Prior quality history** — first article vs mature product (allows tightened/reduced inspection)
- **Who signs** — customer QE, factory QA, third-party inspector?

## Sampling & Classification Framework

**Defect classes and default AQLs** (ANSI/ASQ Z1.4, General Inspection Level II, normal inspection — the consumer-electronics defaults; adjust with reason):

| Class | Definition | Default AQL |
|---|---|---|
| Critical | Safety hazard, regulatory violation, data loss | 0 — any occurrence rejects the lot |
| Major | Product fails to function, or defect the user will certainly notice and return | 1.0 (tighten to 0.65 for premium/first lots) |
| Minor | Cosmetic or workmanship issue within limit samples' tolerance but noted | 2.5 (relax to 4.0 for bulk/industrial) |

From lot size + Level II, derive the sample-size code letter and accept/reject numbers from the Z1.4 tables; state them explicitly in the plan (e.g. "Lot 3,000 → code K → n=125; Major Ac=3/Re=4"). Switch to tightened inspection after 2 of 5 consecutive lots rejected; reduced only with sustained history.

**Golden samples.** Two signed, serialised golden samples minimum — one held at the factory line, one at the buyer. Sealed, dated, with an expiry/refresh rule (refresh on any ECO that changes fit/finish/function). Cosmetic judgement is against the limit-sample boundary set, never against memory.

**Deviations.** Any test performed differently than planned, any borderline judgement, and any use-as-is decision goes in the deviation log — numbered, with disposition and approver.

## Output Format

### FAT [plan | report]: [product] — lot [ID]

1. **Scope & lot definition** — product rev, lot size, factory, date
2. **Test coverage matrix** — table: test #, spec clause covered, method/equipment, sample basis (100% / AQL sample), pass criterion
3. **Sampling plan** — lot size, code letter, n, and Ac/Re per defect class
4. **Pass/fail & lot disposition rules** — accept / reject / rework-and-rescreen conditions
5. **Golden & limit sample register** — serials, locations, seal dates, refresh trigger
6. **Deviation log** — #, description, class, disposition, approver
7. **Results** *(report only)* — defects found per class vs Ac/Re, failure detail with photos referenced
8. **Sign-off block** — lot disposition, name, role, authority, date; rejection escalation path

## Quality Checks

- [ ] Every spec requirement appears in the coverage matrix, or its exclusion is stated
- [ ] Sample sizes and Ac/Re numbers are explicit — not "per AQL 1.0"
- [ ] Critical defects have Ac=0 and an immediate-stop instruction
- [ ] Cosmetic criteria reference physical limit samples, not adjectives
- [ ] The report states defects per class against Ac/Re, and the disposition follows arithmetically
- [ ] Sign-off names a role with authority to reject the lot

## Anti-Patterns

- [ ] Do not write "inspect to AQL 1.0" without the sample size and accept/reject numbers — that phrase settles nothing
- [ ] Do not let critical defects carry a non-zero acceptance number
- [ ] Do not judge cosmetics against memory or photos alone — physical limit samples or it will be relitigated every lot
- [ ] Do not allow rework-and-reinspect of a rejected lot without 100% rescreen of the reworked defect mode
- [ ] Do not accept a lot with an unsigned deviation in the log
- [ ] Do not let golden samples go stale across an ECO — refresh or they certify the wrong product

## Example Trigger Phrases

- "Write a FAT plan."
- "Define outgoing quality inspection."
- "Set AQL levels."
- "Prepare for a factory acceptance."
- "Document FAT results."
