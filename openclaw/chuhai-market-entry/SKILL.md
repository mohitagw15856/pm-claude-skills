---
name: chuhai-market-entry
description: "Plan a Chinese company's entry into an overseas market (出海): choose the market with evidence, then plan entity, payments, localisation, compliance, channels and team for the first twelve months. Use when asked 出海计划, 我们要进入东南亚 / 中东 / 欧洲 / 美国市场, how should a Chinese company expand overseas, or a go-global plan. Produces a market scorecard, a twelve-month entry plan by workstream, the compliance and data checklist for the chosen market, and the top risks with mitigations. Bilingual output on request."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/chuhai-market-entry.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# 出海 Market Entry

Chinese companies going abroad often win on product and lose on everything around it: a market chosen by headline size, payments that do not fit local habits, a translation instead of localisation, data rules discovered after launch. This skill plans the whole entry: which market, and the workstreams that decide whether the product can actually sell there.

Write in Chinese, English or both, as the person prefers. For data transfer law, see `pipl-gdpr-crosswalk`; for marketplace listings, see `cross-border-listing`.

## What This Skill Produces

- **A market scorecard**: candidate markets scored on the factors that matter for this product
- **A twelve-month entry plan** by workstream, with milestones
- **A compliance checklist** for the chosen market: entity, tax, product rules, data
- **The top risks**, each with a mitigation and an owner

## Required Inputs

Ask for these if not provided:
- **The product**: what it is, price point, B2B or B2C, physical goods, software or service
- **Candidate markets**, or "help us choose"
- **Current traction** in China, and what made it work
- **Budget and team** available for the first year
- **Constraints**: data must stay in China, payment needs, sensitive categories

## Framework

**1. Choose the market.** Score each candidate from 1 to 5 on:
- Demand evidence for this category (search data, competitor revenue, imports)
- Willingness and ability to pay at this price
- Competition, including local and other Chinese players
- Channel access (marketplaces, app stores, distributors, direct)
- Regulatory and data difficulty for this product
- Fit of the China playbook (what transfers, what does not)
- Cost of operating (people, logistics, marketing)
Weight the factors for the business model and show the arithmetic.

**2. Plan by workstream:**
- **Entity and tax**: local entity, branch, or operate cross-border first; VAT or GST registration
- **Payments**: local methods (cards, e-wallets, bank transfer, cash on delivery); settlement and currency
- **Localisation**: language, pricing, imagery, customer service hours and channels, not only translation
- **Compliance**: product standards and certification, consumer law, advertising rules, data protection
- **Channels**: marketplaces, social commerce, search, partners, sales team
- **Team**: local hires versus China-based; the first three roles to hire
- **Brand**: name check in the local language, trademark registration before launch

**3. Phase it:** months 1 to 3 (validate), 4 to 6 (launch), 7 to 12 (scale or stop), with a go or stop metric at each gate.

## Output Format

### 出海计划：[产品] → [市场]

**1. Market scorecard** | Factor | Weight | [Market A] | [Market B] | [Market C] |, with totals and the recommendation

**2. Twelve-month plan** | Workstream | Months 1 to 3 | 4 to 6 | 7 to 12 | Owner |

**3. Compliance checklist** | Area | Requirement | Status | Source to verify |

**4. Risks** | Risk | Likelihood | Impact | Mitigation | Owner |

**5. Gates** | Gate | Metric | Go if | Stop if |

End with: *"Regulatory points are a starting checklist, not legal advice. Confirm each with a qualified adviser in the target market before committing spend."*

## Quality Checks
- [ ] The market choice shows its scoring arithmetic
- [ ] Payments and localisation are planned as workstreams, not footnotes
- [ ] Data protection is addressed for the chosen market
- [ ] Every risk has an owner and a mitigation
- [ ] Each phase has a measurable go or stop gate

## Anti-Patterns
- **Choosing by population or GDP alone.** Demand for this product at this price is what matters.
- **Translation as localisation.** Pricing, payment, imagery and service hours matter as much as language.
- **Copying the China playbook whole.** Channels and consumer habits differ; test what transfers.
- **Trademark after launch.** Register first; squatting is common.
- **Treating regulatory notes as final.** Rules change; verify locally.

## Example Trigger Phrases
- "我们是做智能家居的，想出海，东南亚还是中东？"
- "帮我做一个进入美国市场的出海计划。"
- "Plan our expansion from China into Europe for the first year."
- "出海需要注意哪些合规问题？"
