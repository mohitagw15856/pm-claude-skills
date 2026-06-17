---
trigger: model_decision
description: "Audit a design system for consistency, coverage, and quality. Use when asked to audit a design system, review a component library, assess design token coverage, or evaluate the health of a shared design system. Produces a structured audit with a health score, component coverage gaps, token inconsistencies, accessibility issues, and a prioritised remediation roadmap."
---

# Design System Audit Skill

This skill produces a structured audit of a design system — covering component coverage, token consistency, documentation quality, accessibility compliance, contribution processes, and adoption health. Output is ready for a design system team, design leadership, or an engineering team evaluating their shared component library.

## Required Inputs

Ask the user for these if not provided:
- **Design system name** and what product(s) it serves
- **Audit scope** — component library / design tokens / documentation / contribution process / all of the above
- **Current tooling** — Figma / Storybook / Zeroheight / custom / combination?
- **Team using it** — how many designers and engineers, how many products?
- **Known pain points** — what do teams complain about most?
- **Governance model** — centralised team / federated contributors / no dedicated team?
- **Goal of the audit** — improve adoption / prepare for a rebrand / onboard new teams / justify investment?

## Output Structure

---

# Design System Audit: [System Name]

**Products served:** [List of products / apps]
**Audit scope:** [Full / Components only / Tokens only / Documentation]
**Auditor:** [Name / Team]
**Date:** [Date]
**Stakeholders:** [Design lead, Eng lead, CPO, etc.]

---

## Overall Health Score

| Dimension | Score (1–5) | Status |
|---|---|---|
| Component coverage | [X/5] | 🟢/🟡/🔴 |
| Token consistency | [X/5] | 🟢/🟡/🔴 |
| Documentation quality | [X/5] | 🟢/🟡/🔴 |
| Accessibility compliance | [X/5] | 🟢/🟡/🔴 |
| Adoption rate | [X/5] | 🟢/🟡/🔴 |
| Contribution process | [X/5] | 🟢/🟡/🔴 |
| **Overall** | **[X/5]** | 🟢/🟡/🔴 |

**Summary:** [2–3 sentences. What is the overall state of the design system? What are the top 2 issues and what is the biggest strength?]

---

## 1. Component Coverage Audit

**How to assess:** Compare components in the design system against the actual UI patterns in the product. Every pattern that exists in production but not in the system is a coverage gap.

### Component Inventory

| Category | Components present | Coverage | Gap |
|---|---|---|---|
| **Navigation** | [Navbar, Sidebar, Breadcrumb, Tabs] | [80%] | [Missing: Mega menu, mobile drawer] |
| **Forms & Inputs** | [Text input, Dropdown, Checkbox, Radio, Toggle, Date picker] | [90%] | [Missing: Multi-select, Rich text editor] |
| **Feedback & Alerts** | [Toast, Banner, Modal, Tooltip] | [60%] | [Missing: Inline validation, Progress indicator, Skeleton loader] |
| **Data Display** | [Table, Card, Badge, Avatar] | [50%] | [Missing: Data grid, Stat card, Timeline, Gantt] |
| **Layout** | [Grid, Container, Divider, Spacer] | [70%] | [Missing: Responsive breakpoint utilities] |
| **Buttons & Actions** | [Button, Icon button, FAB, Link] | [100%] | [None] |

**Coverage score:** [X% of production UI patterns are covered by the design system]

**Most impactful gaps:**
1. [Most used pattern not in the system — causing most duplication]
2. [...]
3. [...]

---

## 2. Component Quality Audit

For each component, assess against these quality criteria:

| Component | States complete | Responsive | Accessibility | Dark mode | Props documented | Code matches Figma |
|---|---|---|---|---|---|---|
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Modal | ⚠️ Loading state missing | ✅ | ✅ | ❌ | ⚠️ Partial | ✅ |
| Table | ❌ Sorting state missing | ❌ No mobile layout | ⚠️ No aria-sort | ❌ | ❌ | ⚠️ Drift |
| [Component] | [...] | [...] | [...] | [...] | [...] | [...] |

**Legend:** ✅ Complete — ⚠️ Partial / inconsistent — ❌ Missing

**Components with critical quality issues (fix before anything else):**
- [Component name]: [Specific issue and why it's blocking]
- [...]

---

## 3. Design Token Audit

**Token coverage:**

| Token type | Defined | Used consistently | Issues |
|---|---|---|---|
| **Colour** | [X tokens defined] | [⚠️ — 12 hardcoded hex values found in Figma] | [Inconsistent use of primary-500 vs primary-600 for CTAs across products] |
| **Typography** | [X tokens defined] | [✅] | [None — all type styles use token scale] |
| **Spacing** | [X tokens defined] | [⚠️ — custom spacing used in X components] | [Engineers using arbitrary px values instead of spacing tokens in X components] |
| **Border radius** | [X tokens defined] | [❌ — not defined; each component has hardcoded values] | [Button, card, modal all use different radius values with no token] |
| **Shadow / elevation** | [X tokens defined] | [⚠️] | [3 different drop-shadow values in use; no elevation scale] |
| **Animation / motion** | [X tokens defined] | [❌ — not defined] | [Transition durations inconsistent across components] |

**Semantic token layer:** [Does the system have semantic tokens (e.g. `color.action.primary` on top of `color.blue.500`) or only primitive tokens?]

**Token drift:** [Are code tokens and Figma tokens in sync? Use a tool like Token Studio, Style Dictionary, or manual comparison.]

---

## 4. Documentation Quality Audit

**Assessment per component / pattern:**

| Document type | Quality | Issues |
|---|---|---|
| **Usage guidelines** | [⚠️ — X% of components have guidelines] | [Button and Form components documented; Navigation and Data Display mostly undocumented] |
| **Do / Don't examples** | [❌ — mostly absent] | [Engineers frequently misuse components because intent is unclear] |
| **Accessibility notes** | [⚠️ — present for some components] | [No consistent format; accessibility notes missing for interactive components] |
| **Code examples** | [✅ — all Storybook components have code examples] | [...] |
| **Changelog** | [❌ — no component-level changelog exists] | [Breaking changes are not communicated; causes unexpected UI regressions] |
| **Migration guides** | [❌ — absent] | [Teams don't know how to upgrade to new component versions] |

**Documentation score:** [X% of components have complete, usable documentation]

**Most common designer / engineer complaint about docs:** [e.g. "I can't find whether to use Modal or Drawer for this use case — no guidance exists"]

---

## 5. Accessibility Audit

**WCAG 2.2 compliance status:**

| Criterion | Level | Status | Components affected |
|---|---|---|---|
| Colour contrast (text) | AA | [✅ / ⚠️ / ❌] | [e.g. ❌ — Disabled state text fails 4.5:1 ratio in 3 components] |
| Colour contrast (UI components) | AA | [✅ / ⚠️ / ❌] | [...] |
| Keyboard navigation | AA | [✅ / ⚠️ / ❌] | [⚠️ — Modal focus trap not implemented; Dropdown not keyboard accessible] |
| Focus visible | AA | [✅ / ⚠️ / ❌] | [...] |
| Screen reader support (ARIA) | AA | [✅ / ⚠️ / ❌] | [❌ — Table component lacks aria-sort; Icon buttons have no aria-label] |
| Touch target size | AA | [✅ / ⚠️ / ❌] | [⚠️ — Mobile tap targets below 44×44px in X components] |
| Motion / animation | AA | [✅ / ⚠️ / ❌] | [...] |

**Critical accessibility blockers (must fix before next release):**
1. [Most critical issue — e.g. Keyboard users cannot close Modal — focus trap missing]
2. [...]

---

## 6. Adoption Audit

**Adoption by team / product:**

| Product / Team | Components used from system | Custom components built outside system | Adoption score |
|---|---|---|---|
| [Product A] | [X% of UI uses system components] | [Y custom components] | [High / Medium / Low] |
| [Product B] | [...] | [...] | [...] |

**Why teams are not adopting:**

| Barrier | Severity | Evidence |
|---|---|---|
| [Component doesn't exist] | High | [Top reason in team survey] |
| [Component exists but doesn't meet use case] | Medium | [Modal component lacks X state needed by Product B] |
| [Documentation too sparse to know how to use it] | Medium | [...] |
| [No one enforces system use — easier to build custom] | High | [...] |
| [System is out of date with product's current visual language] | Medium | [...] |

---

## 7. Contribution Process Audit

| Dimension | Current state | Assessment |
|---|---|---|
| **How to contribute** | [Documented / Not documented] | [✅ / ❌] |
| **Contribution criteria** | [Clear entry bar for what goes in the system] | [⚠️ — unclear who decides what becomes a system component vs stays local] |
| **Review process** | [Who reviews contributions and how long it takes] | [❌ — no formal review; contributions sit unreviewed for weeks] |
| **Release cadence** | [How often system releases happen] | [⚠️ — sporadic; no set cadence] |
| **Breaking change policy** | [How breaking changes are handled and communicated] | [❌ — no policy; breaking changes are a surprise] |
| **Versioning** | [Semantic versioning in place?] | [✅ — all packages use semver] |

---

## 8. Prioritised Remediation Roadmap

| Priority | Initiative | Impact | Effort | Timeline |
|---|---|---|---|---|
| P1 | Fix [X] critical accessibility issues (keyboard nav, ARIA) | Critical — legal + user impact | Medium | Sprint 1–2 |
| P1 | Define and implement border radius and shadow token scale | High — ends inconsistency | Low | Sprint 1 |
| P1 | Document top 10 most-used components (usage + do/don't) | High — unblocks adoption | Medium | Sprint 2–4 |
| P2 | Build Skeleton loader + Inline validation components (top 2 gaps) | High — eliminates custom duplication | High | Quarter 2 |
| P2 | Establish contribution process with SLA for reviews | Medium — enables growth | Low | Sprint 3 |
| P3 | Dark mode token support | Medium — product parity | High | Quarter 3 |
| P3 | Design-code token sync tooling (Token Studio / Style Dictionary) | Medium — reduces drift | Medium | Quarter 2–3 |

---

## Quality Checks

- [ ] Coverage gaps are identified by comparing the design system to actual production UI, not assumed
- [ ] Accessibility issues cite specific WCAG criterion and affected components
- [ ] Adoption barriers are backed by evidence (interviews, survey, usage data) — not assumed
- [ ] Remediation roadmap has effort estimates and is sequenced by impact
- [ ] Both Figma and code (Storybook/implementation) are assessed — not just Figma
- [ ] Stakeholders from design, engineering, and product have reviewed the audit

## Anti-Patterns

- [ ] Do not assess only the Figma library without checking the code implementation — Figma-code drift is one of the most common and costly design system failures
- [ ] Do not score adoption without interviewing teams — audit tool metrics miss the human reasons teams build custom components instead of using the system
- [ ] Do not treat all component gaps equally — prioritise gaps based on how many production screens rely on custom implementations, not alphabetically
- [ ] Do not recommend adding more components without first auditing documentation quality — an undocumented component is often worse than no component
- [ ] Do not schedule remediation without a named owner per initiative — design system improvements without ownership consistently stall

## Example Trigger Phrases

- "Audit our design system for consistency and coverage"
- "Review our component library and identify gaps"
- "Assess the health of our shared design system"
- "Run a design system audit before we do a rebrand"
- "What's wrong with our design system and what should we fix first?"
