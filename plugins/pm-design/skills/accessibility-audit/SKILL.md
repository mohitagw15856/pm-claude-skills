---
name: accessibility-audit
description: "Generate a WCAG 2.2 accessibility audit checklist and remediation suggestions for any UI or design. Use when asked to audit for accessibility, check WCAG compliance, review a design for a11y issues, or create an accessibility remediation plan. Produces a prioritised checklist with pass/fail assessments and specific fixes."
---

# Accessibility Audit Skill

This skill produces a structured accessibility audit based on WCAG 2.2 guidelines. It covers visual, motor, cognitive, and screen reader accessibility — with prioritised remediation for each issue found.

## Required Inputs

Ask the user for these if not provided:
- **What is being audited** (screen, component, full product, design spec)
- **Description or image** of the UI
- **Target WCAG level** (A / AA / AAA — default to AA, which is the legal standard in most jurisdictions)
- **Known assistive technology users?** (Yes/No — if yes, which: screen reader / switch access / voice control / magnification)
- **Platform** (Web / iOS / Android / Desktop app)

## Output Structure

---

# Accessibility Audit: [Component or Screen Name]
**Target standard:** WCAG 2.2 Level [AA]
**Platform:** [Platform]
**Date:** [Date]

---

## Audit Summary

| Category | Issues Found | Critical | Moderate | Minor |
|---|---|---|---|---|
| Perceivable | | | | |
| Operable | | | | |
| Understandable | | | | |
| Robust | | | | |
| **Total** | | | | |

**Overall compliance status:** ✅ Compliant / 🟡 Minor issues / 🔴 Fails AA standard

---

## Perceivable

### 1.1 Text Alternatives
- [ ] All images have descriptive alt text (not filename or "image")
- [ ] Decorative images have `alt=""` to be skipped by screen readers
- [ ] Icons without visible labels have accessible names
- [ ] Complex images (charts, diagrams) have extended descriptions

**Issues found:** [List specific issues or "None"]

### 1.3 Adaptable
- [ ] Content structure uses semantic HTML (headings, lists, landmarks) — not just visual formatting
- [ ] Reading order in DOM matches visual order
- [ ] Form inputs have associated labels (not placeholder text as label)
- [ ] Data tables have proper headers and scope

**Issues found:**

### 1.4 Distinguishable
- [ ] Text contrast ratio ≥ 4.5:1 (normal text) or ≥ 3:1 (large text 18px+)
- [ ] UI component contrast ratio ≥ 3:1 against background
- [ ] Information is not conveyed by colour alone
- [ ] Text can be resized to 200% without loss of content
- [ ] No content that auto-plays audio

**Issues found:**

---

## Operable

### 2.1 Keyboard Accessible
- [ ] All interactive elements are reachable by keyboard (Tab key)
- [ ] No keyboard traps
- [ ] Custom components have keyboard interactions (arrow keys for menus, Escape to close modals)
- [ ] Skip navigation link available for pages with repeated navigation

**Issues found:**

### 2.4 Navigable
- [ ] Focus is visible at all times (not removed with `outline: none` without replacement)
- [ ] Focus order is logical and predictable
- [ ] Page/screen has a descriptive title
- [ ] Link text is descriptive (not "click here" or "read more")
- [ ] Headings are hierarchical (H1 → H2 → H3, no skips)

**Issues found:**

### 2.5 Input Modalities
- [ ] Touch targets are at least 44x44px
- [ ] No functionality requires complex gestures (pinch, multi-touch) without a simple alternative
- [ ] Motion or dragging interactions have button alternatives

**Issues found:**

---

## Understandable

### 3.1 Readable
- [ ] Language of the page is set (`lang` attribute)
- [ ] Unusual words, abbreviations, or jargon are explained

### 3.2 Predictable
- [ ] Navigation is consistent across screens
- [ ] Components behave consistently (same button does the same thing)
- [ ] No unexpected context changes on focus or input

### 3.3 Input Assistance
- [ ] Error messages identify the field and describe the error in plain language (not just "Invalid input")
- [ ] Required fields are labelled (not just with colour or asterisk alone)
- [ ] Forms provide suggestions for correcting errors where possible

**Issues found:**

---

## Robust

### 4.1 Compatible
- [ ] HTML is valid and well-structured
- [ ] ARIA roles and attributes are used correctly (not to fix broken semantics)
- [ ] Status messages (success, error, loading) are announced to screen readers without focus change

**Issues found:**

---

## Prioritised Remediation List

| Priority | Issue | WCAG Criterion | Fix | Effort |
|---|---|---|---|---|
| 🔴 Critical | [Issue] | [e.g. 1.4.3 Contrast] | [Specific fix] | [Low/Med/High] |
| 🟡 Moderate | [Issue] | | | |
| 🟢 Minor | [Issue] | | | |

**Priority definitions:**
- 🔴 Critical: Blocks access for users with disabilities. Legal risk. Fix before launch.
- 🟡 Moderate: Significant friction. Fix in next sprint.
- 🟢 Minor: Best practice. Address in roadmap.

---

## Quick Wins (Fix in < 1 hour)

[List any issues that are trivially fixable — e.g. adding alt text, fixing contrast with a colour swap, adding a `lang` attribute. These are easy to ship immediately.]

---

## Testing Recommendations

- **Manual keyboard test:** Tab through the entire flow. Can you complete every task without a mouse?
- **Screen reader test:** VoiceOver (Mac/iOS), NVDA or JAWS (Windows). Is every piece of content and every action accessible?
- **Colour contrast check:** Use Stark (Figma plugin) or WebAIM Contrast Checker
- **Automated scan:** Axe DevTools or Lighthouse accessibility audit (catches ~30% of issues automatically)

---

## Quality Checks

- [ ] Issues are mapped to specific WCAG criteria
- [ ] Every critical issue has a specific fix recommendation
- [ ] Quick wins are separated from larger fixes
- [ ] Effort estimates are included for prioritisation
- [ ] Testing recommendations are included

## Example Trigger Phrases

- "Audit this design for accessibility"
- "Check WCAG compliance for [screen/component]"
- "Give me an a11y audit of [UI description]"
- "What accessibility issues does this design have?"
