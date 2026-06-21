# Financial Due Diligence Skill

Produces a structured financial due diligence framework — document request list and analytical questions — for any investment, acquisition, or significant commercial relationship.

## Required Inputs
- **Transaction type** (acquisition / investment / partnership / supplier / fundraise)
- **Stage of diligence** (initial screening / full DD / confirmatory)
- **Target company type** (startup / SME / listed / subsidiary)
- **Key concerns** (optional — e.g. revenue recognition, customer concentration)

## Output Structure

### 1. Document Request List

**Financial Statements**
- Audited accounts for last 3 years
- Management accounts for current year (monthly)
- Board-approved budget and latest reforecast
- 3-year financial model with assumptions

**Revenue**
- Revenue by customer (top 20, % of total)
- Revenue by product/segment
- Contracted vs recurring vs one-off breakdown
- Churn and renewal data

**Costs**
- Cost of sales breakdown
- Headcount by department with compensation detail
- Top 10 supplier contracts

**Cash and Debt**
- Bank statements (12 months)
- Debt schedule with covenants and maturity
- Working capital analysis

**Tax**
- Last 3 years tax returns
- Any open enquiries
- R&D tax credit claims

### 2. Key Analytical Questions

**Revenue quality:** Is revenue growing organically? What % is truly recurring? Customer concentration risk?

**Margin analysis:** Gross margin trend over 3 years? One-off items inflating EBITDA? Normalised EBITDA?

**Cash conversion:** Does profit convert to cash? Cash conversion cycle? Working capital red flags?

**Debt and liabilities:** Net debt position? Contingent liabilities? Covenant headroom?

### 3. Red Flags Checklist
- Revenue concentration over 30% in one customer
- Declining gross margins without explanation
- EBITDA-to-cash conversion below 70%
- Auditor qualifications or emphasis of matter
- Related party transactions not at arm length
- Aggressive revenue recognition
- Growing debtor days with no explanation

### 4. Summary Output Template
- Revenue quality: [Assessment]
- Margin sustainability: [Assessment]
- Cash generation: [Assessment]
- Balance sheet risk: [Assessment]
- Overall: Green Strong / Amber Acceptable / Red Material concerns

## Quality Checks

- [ ] Document request list is tailored to the transaction type and stage — not a generic template
- [ ] Red flags checklist covers revenue quality, margins, cash conversion, and balance sheet risk
- [ ] Every analytical question connects to a specific risk the transaction presents
- [ ] Summary output template is completed with an overall RAG assessment
- [ ] Disclaimer that this is a framework and does not substitute for qualified financial or legal advice

## Anti-Patterns

- [ ] Do not present the checklist without tailoring it to the specific transaction type and stage of diligence
- [ ] Do not overlook revenue concentration risk — customer concentration above 20–30% is a material risk that must be flagged
- [ ] Do not confuse EBITDA with cash — always check cash conversion and identify non-cash items
- [ ] Do not skip the related-party transaction review — undisclosed related-party dealings are a common due diligence failure point
- [ ] Do not produce output without noting this is a framework and qualified financial and legal advice is required

## Example Trigger Phrases
- "Give me a financial due diligence checklist for [company type]"
- "What documents should I request for financial DD?"
- "Build a DD framework for our Series A investment"
