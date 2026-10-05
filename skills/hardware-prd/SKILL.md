---
name: hardware-prd
description: "Write a PRD for a physical hardware product — target cost (BOM and landed), industrial design constraints, regulatory certifications, reliability targets, serviceability, packaging, and forecast assumptions. Use when asked to write a hardware PRD, spec a new device, define requirements for a physical product, or kick off an NPI program. Produces a complete hardware PRD with a cost stack, cert matrix, reliability spec, and EVT/DVT/PVT milestone targets."
---

# Hardware PRD Skill

A software PRD can ship wrong and patch later; a hardware PRD is cut into steel and soldered onto boards. This skill writes a PRD that forces the decisions that get expensive after tooling: cost targets with a full stack (not just BOM), certifications named per market, reliability as numbers, and forecast assumptions stated so the supply chain can be sized honestly.

## What This Skill Produces

- A complete hardware PRD with numbered, testable requirements (shall-statements)
- A target cost stack: BOM → COGS → landed cost, with margin math
- A regulatory/certification matrix per target market
- Reliability, serviceability, and packaging requirements with acceptance numbers
- Forecast assumptions and the EVT/DVT/PVT milestones the schedule hangs on

## Required Inputs

Ask for these if not provided; if the brief is thin, infer sensible values and label each one `[assumed — confirm]`:

- **Product concept and user** — what it is, who buys it, key use environment (indoor/outdoor, temp range, drop risk)
- **Target retail price and channel** — retail vs D2C changes the margin stack
- **Target markets** — determines the cert list (US, EU, UK, etc.)
- **Power source** — battery (chemistry, size) vs mains changes safety certs entirely
- **Forecast** — units for year 1 and lifetime, plus confidence
- **Launch window** and any hard date (e.g. holiday season)

## Cost & Certification Framework

**Cost stack** — always build all four layers; never let "cost target" mean BOM alone:

| Layer | Contains |
|---|---|
| BOM | Components, PCBA, mechanicals, packaging materials |
| COGS | BOM + assembly/test labour + scrap/yield loss + factory overhead |
| Landed | COGS + freight + duty/tariff (HTS code, country of origin) + insurance |
| Margin check | Landed vs channel price after retailer margin (typ. 30–50% retail) |

**Cert matrix** — map each market to its certs. Typical starters: **FCC** Part 15B (unintentional) / 15C (Wi-Fi/BT radio), **CE** (RED, EMC, LVD), **UKCA**, safety **UL/IEC 62368-1**, **RoHS/REACH/Prop 65**, batteries **UN 38.3** + **IEC 62133**. Flag any radio module choice that lacks modular certification — it adds months.

**Reliability targets** — state as numbers: MTBF (hours), warranty return rate ceiling (% in 12 months), lifetime (years/cycles), and the abuse cases (1 m drop, IP rating, operating temp range).

## Output Format

### Hardware PRD: [product]

1. **Overview & user** — problem, user, use environment
2. **Requirements** — numbered shall-statements grouped: functional, industrial design (size/weight/CMF limits), environmental
3. **Target cost stack** — the four-layer table with numbers and margin math
4. **Regulatory & certification matrix** — market × cert × owner × lead time
5. **Reliability & quality targets** — MTBF, return-rate ceiling, abuse cases, ORT expectation
6. **Serviceability & repair** — field-replaceable units, disassembly, spare-parts strategy
7. **Packaging** — retail vs bulk, drop-test spec (e.g. ISTA 3A), dielines owner
8. **Forecast assumptions** — Y1/lifetime units, MOQ implications, ramp shape
9. **Milestones** — EVT/DVT/PVT/MP dates and what each gate must prove
10. **Open questions & assumptions** — everything labelled `[assumed — confirm]`

## Quality Checks

- [ ] Every requirement is testable — a DVT engineer could write a pass/fail test from it
- [ ] Cost target includes landed cost and survives the channel-margin math
- [ ] Every target market has its certs listed with lead times
- [ ] Reliability targets are numbers, not adjectives ("robust" is not a spec)
- [ ] Forecast assumptions are explicit enough to size tooling and MOQs against
- [ ] Battery products name chemistry and the UN 38.3 / IEC 62133 path

## Anti-Patterns

- [ ] Do not state a cost target without saying which layer it is — "$40 target" that turns out to be BOM-only kills the margin at landed
- [ ] Do not write "certified for global markets" — name each market and each cert
- [ ] Do not spec reliability as "high quality" — give MTBF, return-rate ceiling, and abuse cases
- [ ] Do not omit serviceability — an unrepairable design is a warranty-cost decision, so make it consciously
- [ ] Do not hide forecast uncertainty — tooling cavitation and MOQs are bought against this number
- [ ] Do not refuse a thin brief — draft with labelled assumptions and list what must be confirmed before EVT

## Example Trigger Phrases

- "Write a hardware PRD."
- "Spec a new device."
- "Define requirements for a physical product."
- "Kick off an NPI program."
