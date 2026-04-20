---
name: contract-review
description: "Review and summarise any contract or legal agreement. Use when asked to review a contract, check an agreement, flag legal risks, or summarise key clauses. Produces a structured review with key terms, flagged clauses, risk rating, and plain English summary. Not a substitute for qualified legal advice."
---

# Contract Review Skill

This skill produces a structured contract review identifying key terms, unusual or high-risk clauses, and a plain English summary. Always include the disclaimer that this is not legal advice.

## Required Inputs
- **Contract text or description** (paste or describe)
- **Reviewer role** (e.g. the party signing, their legal team, a business owner)
- **Contract type** (e.g. SaaS agreement, employment contract, NDA, supplier contract)
- **Key concerns** (optional — e.g. "focus on IP ownership and termination clauses")

## Output Structure

### 1. Contract Overview
- **Type:** [Contract type]
- **Parties:** [Party A and Party B]
- **Effective date / duration:** [If stated]
- **Governing law:** [Jurisdiction]
- **Overall risk rating:** Green Low / Amber Medium / Red High

### 2. Key Terms Summary

| Term | Detail |
|---|---|
| Payment / fees | |
| Term and renewal | |
| Termination rights | |
| Liability cap | |
| IP ownership | |
| Confidentiality | |
| Dispute resolution | |

### 3. Flagged Clauses

For each flagged clause:

**[Risk level] — [Clause name]**
- **What it says:** [Plain English summary]
- **Why it matters:** [Risk or implication]
- **Suggested action:** [Negotiate / Accept / Seek legal advice / Query]

### 4. Missing Clauses
List any standard clauses absent but normally expected for this contract type.

### 5. Plain English Summary
3-5 sentences. What does this contract mean for the party signing it?

### 6. Recommended Next Steps
- [Action 1]
- [Action 2]

---

WARNING: This review is for informational purposes only and does not constitute legal advice. Always consult a qualified solicitor or lawyer before signing any legally binding agreement.

## Quality Checks

- [ ] Overall risk rating is justified (not just "Medium" without reasons)
- [ ] All flagged clauses have a specific recommended action (not just "read this")
- [ ] Missing clauses section is completed for this contract type
- [ ] Plain English summary can be understood by a non-lawyer
- [ ] Disclaimer is included

## Example Trigger Phrases
- "Review this contract: [paste]"
- "Flag the key risks in this agreement"
- "Summarise this SaaS contract in plain English"
- "What should I watch out for in this supplier agreement?"
