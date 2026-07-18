---
name: prescription-cost-navigator
description: "Work down the cost of a prescription systematically — the generic and therapeutic-alternative conversation, discount programs vs insurance math, pharmacy price variance, and manufacturer/assistance programs, in the order that saves the most first. Use when asked my prescription is too expensive, how do I save on my meds, is there a cheaper version of this drug, or I can't afford my medication. Produces the cost-reduction ladder for the specific prescription, the scripts for pharmacist and prescriber conversations, and the never-do list (skipping doses is not a savings plan)."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/prescription-cost-navigator.html
metadata:
  {
    "openclaw": { "emoji": "🗓" }
  }
---

# Prescription Cost Navigator Skill

Prescription pricing is the only market where the cash price can beat the insurance price, the same bottle varies severalfold between pharmacies on the same street, and the manufacturer will sometimes pay your share themselves — but nobody at the counter is required to mention any of it. This skill runs the reduction ladder in savings order for the specific medication, scripts the two conversations that unlock most of it (pharmacist, prescriber), and holds one line absolutely: the dose is medical; only the price is negotiable.

## What This Skill Produces

- **The reduction ladder** — every applicable option for this prescription, ordered by typical savings and effort
- **The two scripts** — the pharmacist conversation (cash vs. insurance, discount programs, 90-day) and the prescriber conversation (generic, therapeutic alternatives, samples-and-bridges)
- **The comparison worksheet** — insurance copay vs. cash-with-discount vs. alternative pharmacy vs. mail-order, on their numbers
- **The never-do list** — the cost-coping behaviors (splitting non-splittable pills, skipping doses, unvetted online pharmacies) that convert a money problem into a medical one

## Required Inputs

Ask for these if not provided:
- **The medication** — name, dose, quantity; brand or generic as currently filled
- **The current cost and how it's paid** — copay with insurance, cash, deductible phase (the same drug costs differently in January than November)
- **Insurance shape** — plan type if known, and whether a formulary/tier document is available (the tier explains the copay and names the cheaper siblings)
- **The prescriber relationship** — the alternatives conversation needs them; the skill scripts it, the prescriber decides it

## Framework: The Ladder Rules

1. **Generic first, and it's the prescriber's five-second yes:** if filled as brand with a generic available, that's the whole game — ask why (occasionally there's a reason; usually there's an old default). Therapeutic alternatives — different molecule, same job, lower tier — are also real, and also entirely the prescriber's call.
2. **Ask the cash question explicitly:** "What's the cash price with your discount program?" — the counter is often *forbidden or disinclined* to volunteer that it beats the copay; asked directly, they answer. Note: cash payments may not count toward the deductible — that trade gets named, not glossed.
3. **Pharmacies are not one market:** the same generic varies severalfold between chains, groceries, warehouses, and mail-order; the worksheet prices 3–4 options. 90-day fills cut both cost and hassle where the prescription allows.
4. **Manufacturer and assistance programs are real money:** brand-name copay cards (with their insurance interactions flagged), manufacturer patient-assistance programs for those who qualify, and state/nonprofit assistance — listed as *types with where-to-look*, never invented names or promised eligibility.
5. **The floor is fixed:** the dose, frequency, and molecule are the prescriber's; every option on the ladder changes *where money goes*, never *what's taken*. Any option that quietly changes therapy (half-doses, every-other-day, imported unverified sources) goes on the never-do list with its specific risk named.

## Output Format

# Cost Navigation: [medication, dose] — currently [cost/month]

## The Ladder (savings order)
| Rung | The move | Typical impact | Effort | Script/where |
|---|---|---|---|---|

## The Two Conversations
**Pharmacist:** "[cash-price question · discount program · 90-day ask — verbatim]"
**Prescriber:** "[generic/alternative ask framed as cost, not compliance · the bridge question if switching]"

## The Worksheet
[Current vs cash-discount vs alt-pharmacy vs mail-order — filled where numbers exist, marked look-up where they don't · deductible-credit tradeoff noted]

## Never Do
[Skipping/splitting/stretching doses — the medical risk named · unverified online sources · stopping without the prescriber — each with why it costs more than it saves]

> Prices, programs, and insurance rules change constantly and vary by location and plan — verify each rung before relying on it. The dose is medical: cost changes route through the prescriber, always.

## Quality Checks

- [ ] The ladder is ordered by savings-for-this-drug, not generic listicle order
- [ ] The cash-vs-copay question appears with its deductible tradeoff
- [ ] All therapy changes route explicitly through the prescriber
- [ ] Assistance programs are types-with-where-to-look, never invented names
- [ ] The never-do list names the specific risk of each behavior
- [ ] The verify-before-relying line appears

## Anti-Patterns

- [ ] Do not suggest any change to dose, frequency, or molecule — that's the prescriber's floor
- [ ] Do not invent program names, prices, or eligibility — types and lookups only
- [ ] Do not present the copay as the price — it's one of four prices; the worksheet exists because they differ
- [ ] Do not shame the constraint — affordability is a logistics problem, and treating it as noncompliance is how doses get skipped in secret
- [ ] Do not recommend unverified import/online sources — the never-do list is load-bearing
