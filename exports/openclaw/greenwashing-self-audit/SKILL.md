---
name: greenwashing-self-audit
description: "Audit your own marketing and report claims for greenwashing risk before a regulator, journalist, or competitor does. Use when asked to review sustainability claims, check marketing copy for greenwash, audit environmental claims on a website or report, or pressure-test green messaging. Produces a claim inventory with substantiation status per claim, vague-term and omission flags, and a fix-or-drop recommendation for every claim."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/greenwashing-self-audit.html
metadata:
  {
    "openclaw": { "emoji": "🌍" }
  }
---

# Greenwashing Self-Audit Skill

The cheapest time to find an unsupportable green claim is before publication; the most expensive is in a regulator's letter. This skill inventories every environmental claim in a piece of content, grades its substantiation, flags vague terms and material omissions, and ends with a concrete fix-or-drop call per claim. Audit the material as an adversary would read it, not as the author meant it.

## What This Skill Produces

- A numbered claim inventory extracted from the material (explicit claims and implied ones)
- A substantiation status per claim: Evidenced / Partially evidenced / Unsupported
- Vague-term flags with the precise question each term fails to answer
- An omission review — what a full picture would include that the material leaves out
- A fix-or-drop recommendation per claim, with rewritten wording where a fix exists

## Required Inputs

Ask for these if not provided; if only the copy is supplied, run the audit anyway and mark every substantiation status as "pending evidence" rather than refusing:

- **The material** — the marketing copy, report section, packaging text, or web page content
- **Available evidence** — data, certifications, methodologies, or studies behind the claims
- **Claim scope** — does each claim cover a product, a product line, or the whole company?
- **Audience and jurisdiction** — consumer-facing vs B2B, and where it will be published (affects which rules bite)

## Audit Framework

**1. Build the claim inventory.** Extract every environmental claim: explicit statements, numbers, badges/imagery (green leaves, "planet-friendly" visuals count), and *implied* claims (a wind-turbine photo on a fossil product page is a claim). Number each.

**2. Grade substantiation per claim:**

| Status | Test |
|---|---|
| Evidenced | Specific, current, methodology-backed evidence exists and covers the claim's full scope |
| Partially evidenced | Evidence exists but is narrower, older, or weaker than the claim as worded |
| Unsupported | No evidence provided, or evidence contradicts the claim's scope or tense |

Grade the claim *as a skeptical reader would parse it*, not as the author intended it.

**3. Flag vague terms.** "Eco-friendly", "green", "sustainable", "natural", "climate positive", "carbon neutral" (without standard + registry), "recyclable" (without where/how), "up to X%" (without typical case). For each: what precise question does the term dodge?

**4. Run the omission review.** Would the claim survive full context? Check for: cherry-picked scope (one green product fronting a brown portfolio), lifecycle stages ignored (use-phase highlighted, manufacturing hidden), trade-offs unmentioned (recyclable but carbon-heavy), progress framed against an unstated or convenient baseline, and offsets doing silent work in a "neutral" claim.

**5. Decide fix-or-drop per claim.** A claim is fixable if narrowing scope, adding basis, or quantifying makes it true and evidenced ("100% recycled packaging on product X, certified by [scheme]"). Otherwise recommend dropping it. Provide the rewritten wording for every "fix".

## Output Format

### Greenwashing self-audit: [material name]

**1. Summary risk read** — overall exposure (low / moderate / high), the riskiest 2–3 claims, and the dominant failure mode (vagueness, scope inflation, offset reliance, omission).

**2. Claim inventory and grades** — table: # | claim (verbatim) | type (explicit / implied / visual) | scope | substantiation status | evidence cited.

**3. Vague-term flags** — term | where it appears | the unanswered question | suggested precise replacement.

**4. Omission review** — what a complete picture adds, and which claims it would change.

**5. Fix-or-drop register** — per claim: **Fix** (with rewritten wording and the evidence to attach) or **Drop** (with the reason a fix isn't available).

**6. Evidence to-collect list** — what proof, if obtained, would upgrade "partially evidenced" claims.

Include this line in the artifact: *"Verify final claims against the applicable advertising and disclosure rules in your jurisdictions (e.g. green claims guidance, unfair commercial practices rules) with your legal and compliance team before publication."*

## Quality Checks

- [ ] Implied and visual claims are inventoried, not just literal sentences
- [ ] Every claim has a substantiation status and the evidence (or its absence) is named
- [ ] Every vague term is flagged with the specific question it fails to answer
- [ ] The omission review considers scope, lifecycle, trade-offs, baseline, and offsets
- [ ] Every claim ends in an explicit Fix (with new wording) or Drop — no "monitor" limbo
- [ ] The audit reads adversarially — graded as a regulator or journalist would parse it

## Anti-Patterns

- [ ] Do not claim carbon neutrality without naming the standard, the offset registry, and the gross-emissions figure it sits on
- [ ] Do not grade a claim by author intent — grade the words as published
- [ ] Do not let a true-but-narrow claim imply company-wide performance — scope must match wording
- [ ] Do not soften an "Unsupported" grade to "Partially" out of politeness — the reader outside won't
- [ ] Do not fix a claim by making it vaguer — fixes add basis and precision, or the claim drops
- [ ] Do not treat this audit as legal clearance — jurisdictional rules and counsel govern

## Based On

Green-claims substantiation practice (claim–evidence matching, scope discipline, omission and lifecycle review) as used in advertising-standards and consumer-protection contexts.

## Example Trigger Phrases

- "Review sustainability claims."
- "Check marketing copy for greenwash."
- "Audit environmental claims on a website."
