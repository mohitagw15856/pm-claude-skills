---
name: vendor-evaluation
description: "Create a structured vendor evaluation framework for any procurement decision. Use when asked to evaluate vendors, compare suppliers, run an RFP scoring process, or assess a software or service provider. Produces a weighted scorecard, evaluation criteria, and recommendation framework."
---

# Vendor Evaluation Skill

Produces a structured vendor evaluation framework — from defining criteria through to a scored comparison and recommendation.

## Required Inputs
- **What you are procuring**
- **Vendors being evaluated** (minimum 2)
- **Key decision criteria** (if known)
- **Decision makers**
- **Budget range**
- **Timeline to decide**

## Output Structure

### 1. Evaluation Criteria and Weights

| Category | Weight | Rationale |
|---|---|---|
| Functional fit | [%] | Does it do what we need? |
| Commercial terms | [%] | Price, flexibility, payment |
| Implementation | [%] | How hard to get started? |
| Support and SLA | [%] | What happens when things go wrong? |
| Security and compliance | [%] | Meets regulatory requirements? |
| Vendor stability | [%] | Will this company exist in 3 years? |
| References | [%] | Who else uses this? |

Weights must total 100%.

### 2. Scoring Rubric
- 5: Exceeds requirements — clear best-in-class
- 4: Meets requirements — fully satisfies with minor gaps
- 3: Partially meets — notable gaps requiring workarounds
- 2: Significant gaps — would require workarounds
- 1: Does not meet — cannot satisfy requirement

### 3. Vendor Scorecard

| Criterion | Weight | [Vendor A] | Weighted | [Vendor B] | Weighted | [Vendor C] | Weighted |
|---|---|---|---|---|---|---|---|
| Functional fit | [%] | /5 | | /5 | | /5 | |
| [Continue...] | | | | | | | |
| **Total** | 100% | | **/5** | | **/5** | | **/5** |

### 4. Key Questions for Every Vendor
Functional: Walk through [most critical use case]. What can your product not do that customers ask for?
Commercial: What is included vs add-ons? Contract minimum term and notice period? Price protection at renewal?
Implementation: Typical implementation for our size? What do you need from our team?
Support: SLA for critical issues? Support included vs charged extra?
Security: ISO 27001 / SOC 2 certified? Where is data stored? Breach notification process?

### 5. Reference Check Questions
- How long using [vendor]? Implementation surprises? Support responsiveness? One thing you wish you had known? Would you choose them again?

### 6. Recommendation

**Recommended vendor:** [Name] | **Score:** [X/5]
**Rationale:** [Specific strengths that matter for this decision]
**Key risks:** [Risk and mitigation]
**Conditions:** [Contract terms to negotiate before signing]
**Runner-up:** [Vendor and why they lost]

## Quality Checks

- [ ] Evaluation criteria weights total 100%
- [ ] Scoring rubric is defined before scoring vendors (not post-hoc)
- [ ] Reference check questions are included
- [ ] Recommendation includes risks and conditions, not just a winner
- [ ] Runner-up rationale explains why they lost (enables future conversations)
- [ ] Contract terms to negotiate are specified

## Example Trigger Phrases
- "Help me evaluate vendors for [procurement]"
- "Create a vendor scorecard for [software/service]"
- "Compare [Vendor A] vs [Vendor B] for [use case]"
