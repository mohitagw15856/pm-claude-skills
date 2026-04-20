---
name: nda-analyser
description: "Analyse a Non-Disclosure Agreement (NDA) and flag key terms, unusual provisions, and negotiation points. Use when asked to review an NDA, mutual NDA, confidentiality agreement, or non-disclosure deed. Produces clause-by-clause analysis with risk flags and a negotiation checklist."
---

# NDA Analyser Skill

NDAs are often treated as routine paperwork but contain terms with significant long-term consequences. This skill analyses them systematically.

## Required Inputs
- **NDA text** (paste in full or describe key clauses)
- **Your party position** (disclosing / receiving / mutual)
- **Purpose of the NDA** (e.g. pre-sales, hiring, M&A, partnership)
- **Industry context** (optional)

## Output Structure

### 1. NDA Type and Parties
- **Type:** Unilateral / Mutual
- **Disclosing party:** [Name]
- **Receiving party:** [Name]
- **Purpose:** [As stated]
- **Governing law:** [Jurisdiction]
- **Term:** [Duration of obligations]

### 2. Definition of Confidential Information
- **How broadly defined?** Narrow / Standard / Very broad
- **Oral disclosures included?** Yes / No / With conditions
- **Standard exclusions present?** [public domain, prior knowledge, independently developed, legally required disclosure]
- **Flag:** [Unusual inclusions or missing exclusions]

### 3. Key Clause Analysis

**[Clause name] — Concern / Watch / Standard**
- **What it says:** [Plain English]
- **Issue:** [Why flagged]
- **Standard position:** [What this typically looks like]
- **Negotiation suggestion:** [If applicable]

Clauses always covered: permitted use, non-solicitation/non-compete, term and post-termination obligations, return/destruction of information, remedies, liability, residuals clause.

### 4. Negotiation Checklist

| Point | Current position | Suggested ask |
|---|---|---|
| [e.g. Confidentiality term] | [e.g. 5 years] | [e.g. Reduce to 2 years] |

### 5. Plain English Verdict
2-3 sentences. Standard NDA, one-sided, or needs a lawyer?

---

WARNING: This analysis is for informational purposes only and is not legal advice. Consult a qualified solicitor before signing.

## Quality Checks

- [ ] Definition of confidential information assessed for scope (narrow / standard / very broad)
- [ ] Residuals clause checked (allows memory use of disclosed information — high-risk)
- [ ] Non-solicitation / non-compete provisions flagged
- [ ] Post-termination obligations duration noted
- [ ] Plain English verdict given (standard / one-sided / needs lawyer)
- [ ] Disclaimer is included

## Example Trigger Phrases
- "Analyse this NDA"
- "Review this confidentiality agreement"
- "Is this NDA standard or unusual?"
- "What should I negotiate in this mutual NDA?"
