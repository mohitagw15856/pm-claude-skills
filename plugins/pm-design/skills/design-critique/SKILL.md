---
name: design-critique
description: "Give structured, constructive feedback on any design. Use when asked to critique a design, review a UI, give feedback on a Figma file or wireframe, assess a user flow, or evaluate a design against UX principles. Applies Jobs-to-be-Done, Gestalt principles, and usability heuristics to give actionable feedback."
---

# Design Critique Skill

This skill provides structured, actionable design feedback using established UX frameworks. It balances positive observations with clear, prioritised improvement suggestions.

## Required Inputs

Ask the user for these if not provided:
- **What is being reviewed** (screen, flow, component, full product)
- **Design description or attached image** (describe it if no image — the skill will still work)
- **User goal** (what is the user trying to accomplish with this design?)
- **Context** (web / mobile / desktop app / physical product)
- **Stage** (early wireframe / mid-fidelity / high-fidelity / live product)
- **Primary concern** (optional — e.g. "I'm worried the onboarding is too long" or "I think the CTA is unclear")

## Output Structure

---

# Design Critique: [Design Name or Screen]

**User goal:** [What the user needs to accomplish]
**Context:** [Platform / Stage]
**Critique focus:** [Primary concern if stated, otherwise "full review"]

---

## 1. What's Working

[3–5 specific, honest observations about what the design does well. Don't manufacture praise — only include genuine strengths. Be specific: "The visual hierarchy clearly guides the eye from headline → supporting detail → CTA" is useful. "Looks clean" is not.]

---

## 2. Priority Issues

Rank issues by impact on the user goal. Use:
- 🔴 **High** — Blocks or significantly degrades the user's ability to complete their goal
- 🟡 **Medium** — Causes friction or confusion but doesn't block completion
- 🟢 **Low** — Polish or preference — nice to fix but not critical

For each issue:

### [Priority] Issue [N]: [Short name]

**What's happening:**
[Describe the specific design problem — be precise about which element, screen, or interaction]

**Why it matters:**
[Connect to the user goal or a specific principle — don't just say "it's confusing." Say why it creates confusion and what the consequence is for the user.]

**Framework reference:**
[Name the principle being violated — e.g. Nielsen's Heuristic #6 (Recognition over Recall), Gestalt proximity, JTBD clarity, Fitts's Law, etc.]

**Recommendation:**
[Specific, actionable suggestion. Not "make the button bigger" but "Increase the primary CTA to at least 44x44px to meet touch target guidelines; consider moving it below the form rather than inline with the input fields to reduce accidental taps."]

---

## 3. Heuristic Assessment

Quick assessment against Nielsen's 10 Usability Heuristics — score each as ✅ Pass / 🟡 Partial / ❌ Fail:

| Heuristic | Status | Note |
|---|---|---|
| 1. Visibility of system status | | |
| 2. Match between system and real world | | |
| 3. User control and freedom | | |
| 4. Consistency and standards | | |
| 5. Error prevention | | |
| 6. Recognition rather than recall | | |
| 7. Flexibility and efficiency of use | | |
| 8. Aesthetic and minimalist design | | |
| 9. Help users recognise, diagnose, and recover from errors | | |
| 10. Help and documentation | | |

Only include heuristics relevant to what's visible in the design — don't penalise for things not in scope.

---

## 4. Gestalt Principles Check

[Comment on any Gestalt principles that are either well-applied or violated:]

- **Proximity:** [Are related elements grouped clearly?]
- **Similarity:** [Do similar elements look similar?]
- **Continuity:** [Does the eye flow naturally through the design?]
- **Figure/Ground:** [Is the primary content clearly distinguished from background?]
- **Closure:** [Are any implied shapes or containers confusing?]

---

## 5. JTBD Alignment

[Assess how well the design serves the stated job-to-be-done:]

- **Does the design make the user's primary job obvious?** [Yes / Partially / No — explain]
- **Are there any elements that distract from the primary job?** [List any competing CTAs, distractions, or unclear hierarchy]
- **What emotional job does this design serve?** [Speed / Confidence / Control / Delight / Other] — and does the visual design match that emotional goal?

---

## 6. Top 3 Recommended Next Steps

Prioritised list of the 3 most impactful changes. Each should be actionable in the next design iteration:

1. [Most impactful change — specific]
2. [Second priority]
3. [Third priority]

---

## Quality Checks

- [ ] "What's working" includes only genuine, specific observations
- [ ] Every issue has a framework reference (not just subjective opinion)
- [ ] Recommendations are specific and actionable
- [ ] Priority levels (High/Medium/Low) reflect actual impact on user goal
- [ ] Heuristic assessment only covers visible elements

## Example Trigger Phrases

- "Critique this design: [description or image]"
- "Give me feedback on this UI/UX"
- "Review this Figma screen for usability issues"
- "What's wrong with this user flow?"
- "Do a heuristic evaluation of [screen/product]"
