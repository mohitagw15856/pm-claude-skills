# Risk Register Skill

This skill produces a complete risk register for a project, programme, or product. Output follows standard risk management practice with likelihood × impact scoring, RAG status, a risk heat map, and specific mitigation and contingency plans. Ready to share with a project board, steering committee, or programme office.

## Required Inputs

Ask the user for these if not provided:
- **Project or product name**
- **Project stage** (discovery / delivery / launch / live / programme-level)
- **Key objectives** — what is the project trying to achieve?
- **Known risks** — anything already on the team's radar (even informal concerns count)
- **Key dependencies** — external vendors, teams, systems, or regulatory approvals
- **Deadline or milestone sensitivity** — are there hard dates that cannot move?
- **Audience** — who will read this? (internal team / executive steering / external board / regulator)

## Output Structure

---

# Risk Register: [Project / Product Name]

**Project stage:** [Discovery / Delivery / Launch / Live / Programme]
**Version:** [1.0]
**Owner:** [PM / Programme Manager / Risk Lead]
**Last reviewed:** [Date]
**Next review:** [Date — recommend weekly during delivery, monthly during discovery]
**Status:** [Active / Archived]

---

## 1. Risk Scoring Framework

**Likelihood (L)**

| Score | Label | Definition |
|---|---|---|
| 5 | Almost certain | >80% probability of occurring |
| 4 | Likely | 60–80% probability |
| 3 | Possible | 40–60% probability |
| 2 | Unlikely | 20–40% probability |
| 1 | Rare | <20% probability |

**Impact (I)**

| Score | Label | Definition |
|---|---|---|
| 5 | Critical | Programme failure, regulatory breach, major financial loss, safety event |
| 4 | High | Significant schedule delay (>4 weeks), scope reduction, reputational damage |
| 3 | Medium | Moderate delay (1–4 weeks), cost overrun, reduced quality |
| 2 | Low | Minor delay (<1 week), manageable cost increase |
| 1 | Negligible | Minimal impact, easily absorbed |

**Risk Score = L × I**

| Score | RAG | Action |
|---|---|---|
| 20–25 | 🔴 Critical | Immediate escalation; active management required |
| 12–19 | 🔴 High | Owner-assigned mitigation; weekly review |
| 8–11 | 🟡 Medium | Mitigation planned; fortnightly review |
| 4–7 | 🟡 Low | Monitor; monthly review |
| 1–3 | 🟢 Negligible | Accept; review if context changes |

---

## 2. Risk Register

| ID | Risk | Category | L | I | Score | RAG | Owner | Status | Mitigation | Contingency | Review date |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R01 | [Risk description — be specific: "Third-party API may not support required volume, causing X to fail"] | [Schedule / Technical / Resource / Commercial / Compliance / External] | [1–5] | [1–5] | [L×I] | 🔴/🟡/🟢 | [Name] | [Open / Mitigating / Closed] | [What are we doing to reduce likelihood or impact?] | [What do we do if it happens?] | [Date] |
| R02 | [...] | [...] | [...] | [...] | [...] | [...] | [...] | [...] | [...] | [...] | [...] |

---

## 3. Risk Categories — Common Risks by Type

Use these to prompt risk identification. Add, remove, or customise for your project.

### Schedule & Delivery
- Key milestone depends on a dependency that has not confirmed availability
- Team capacity reduced by planned or unplanned absence during critical period
- Technical complexity is underestimated — story points consistently overrun
- External approval (regulator, legal, procurement) takes longer than planned

### Technical
- Integration with a third-party system not yet prototyped or agreed
- Existing technical debt makes the change harder or riskier than estimated
- Security or compliance review required before launch has not been scoped
- Performance under production load untested
- Key technical knowledge held by one person (single point of failure)

### Resource & People
- Key SME or engineer leaving or unavailable during critical phase
- Budget not confirmed for Phase 2 of the project
- Stakeholder sponsor changes role or leaves the organisation
- Team not yet at full capacity (hiring lag, access issues, onboarding time)

### Commercial & Financial
- Vendor or partner contract not yet signed
- Cost estimate based on assumptions that have not been validated
- Revenue or savings case depends on assumptions outside the team's control
- Currency exposure or exchange rate risk for international projects

### Compliance & Regulatory
- Data privacy impact assessment (DPIA) not yet complete
- Regulatory approval required and timeline is uncertain
- GDPR, HIPAA, SOC 2, or sector-specific compliance requirement not yet mapped
- Legal review of terms of service or contracts pending

### Stakeholder & Adoption
- Key user group has low awareness or motivation to adopt the change
- Internal resistance from a team that will be affected by the change
- Executive sponsor not consistently engaged — decisions are slow
- Communications plan not yet agreed with change management team

### External
- Market or competitive change could undermine the business case
- Macroeconomic conditions affect budget or priority
- Supplier or infrastructure provider risk (e.g. cloud provider, hardware)
- Geopolitical or regulatory environment change

---

## 4. Risk Heat Map

Plot risks by likelihood (Y axis) and impact (X axis):

```
         │  Low     Medium    High    Critical
         │  (1)      (2-3)    (4)      (5)
─────────┼────────────────────────────────────
Almost   │  🟡        🟡       🔴       🔴
certain  │
(5)      │
─────────┼────────────────────────────────────
Likely   │  🟡        🟡       🔴       🔴
(4)      │
─────────┼────────────────────────────────────
Possible │  🟢        🟡       🟡       🔴
(3)      │
─────────┼────────────────────────────────────
Unlikely │  🟢        🟢       🟡       🟡
(2)      │
─────────┼────────────────────────────────────
Rare     │  🟢        🟢       🟢       🟡
(1)      │
```

[Plot each risk ID on this grid — e.g. R01 lands at L4/I5 = 🔴 Critical]

---

## 5. Top Risks — Executive Summary

For steering committee or board-level reporting:

| Rank | Risk | Score | RAG | Owner | Mitigation status |
|---|---|---|---|---|---|
| 1 | [Most critical risk — plain English description] | [X] | 🔴 | [Owner] | [Active / Planned / Not started] |
| 2 | [...] | [...] | 🔴 | [...] | [...] |
| 3 | [...] | [...] | 🟡 | [...] | [...] |
| 4 | [...] | [...] | 🟡 | [...] | [...] |
| 5 | [...] | [...] | 🟡 | [...] | [...] |

**Decisions required from steering:**
- [Any risk that requires budget, scope, or timeline decision to mitigate]

---

## 6. Risk Changes Since Last Review

| Risk ID | Change | Detail |
|---|---|---|
| [R03] | Score increased | [L moved from 2 → 4 — vendor confirmed delay in API availability] |
| [R07] | Risk closed | [Legal sign-off received on 12 May] |
| [NEW] | New risk identified | [R09 — budget freeze announcement affects Phase 2 funding] |

---

## 7. Risk Closure Criteria

A risk is closed when:
- The risk event can no longer occur (e.g. milestone passed, contract signed), OR
- The residual risk score drops to Negligible (1–3) AND the team formally accepts it, OR
- The risk has materialised and transitioned to an **issue** (tracked separately)

**Issues log:** [Link to issues log — risks that have materialised and are now active problems being managed]

---

## Quality Checks

- [ ] Every risk has a specific owner — not "the team" or "TBD"
- [ ] Mitigations describe what is actively being done — not "monitor and review"
- [ ] Contingency plans exist for all Critical and High risks
- [ ] Risk descriptions are specific — "vendor may be late" is not specific enough; name the vendor and the dependency
- [ ] Register has been reviewed in the last [X] days
- [ ] Closed risks are archived, not deleted — they provide audit trail
- [ ] Risks are distinguished from issues — a risk is something that might happen; an issue is something that has happened

## Example Trigger Phrases

- "Build a risk register for our product launch"
- "Create a risk matrix for [project name]"
- "What risks should I document for a data migration project?"
- "Generate a risk register for our steering committee"
- "Help me identify and score risks for our Q3 delivery plan"

## Anti-Patterns

- [ ] Do not assign risks to "the team" or "TBD" — every risk must have a named individual owner
- [ ] Do not write mitigations as "monitor and review" — mitigations must describe what is actively being done to reduce likelihood or impact
- [ ] Do not delete closed risks — they provide an audit trail; archive them instead
- [ ] Do not confuse risks with issues — a risk is something that might happen; an issue is something that has already happened
- [ ] Do not leave Critical or High risks without a contingency plan — what happens if the mitigation fails must be documented
