---
name: go-to-market
description: "Create go-to-market assets for any product or feature. Use when asked for a GTM plan, positioning statement, product launch plan, messaging pillars, use cases, or feature/benefit list. Generates a full GTM pack: positioning statement, messaging pillars, feature-to-benefit mapping, and role-specific use cases."
---

# Go-To-Market Skill

This skill produces a complete go-to-market asset pack for a product, feature, or initiative. It follows Geoffrey Moore's positioning framework and structures all outputs for use in sales decks, landing pages, launch emails, and internal alignment docs.

## Required Inputs

Ask the user for these if not provided:
- **Product/feature name**
- **One-line description** (what it does, technically)
- **Target customer** (role, company size, industry if relevant)
- **Primary problem it solves**
- **Key competitor or alternative** (what people do today without this)
- **Top 3 differentiators**

## Output Structure

Always produce all four sections below in order.

---

### 1. Positioning Statement

Use the Geoffrey Moore format exactly:

> For **[target customer]** who **[has this problem or need]**, **[Product Name]** is a **[product category]** that **[key benefit/outcome]**. Unlike **[primary alternative or competitor]**, our product **[key differentiator]**.

Write one primary positioning statement, then offer a shorter tagline version (10 words or fewer) suitable for a hero headline.

---

### 2. Messaging Pillars

Generate 3–5 messaging pillars. Each pillar must include:

- **Pillar name** (2–4 words, bold)
- **One-sentence summary** of what this pillar claims
- **2–3 proof points** (specific, evidence-backed where possible — if the user hasn't provided data, flag with [ADD PROOF POINT])
- **Example use in copy** (one sentence as it would appear in a landing page or deck)

Pillars should be distinct — avoid overlap. Each pillar should be defensible against the primary competitor.

---

### 3. Feature & Functionality List

Produce a two-column table:

| Feature / Functionality | Buyer Benefit (what it means for the user) |
|---|---|
| [Technical capability] | [Outcome in plain language — start with a verb: "Reduces...", "Enables...", "Eliminates..."] |

Rules:
- Never list a feature without a corresponding benefit
- Benefits should reference the target customer's workflow or pain point
- Aim for 6–12 rows; ask the user for more features if they've only given 1–2
- Avoid jargon in the benefit column — write as if explaining to a buyer, not an engineer

---

### 4. Use Cases

Generate 3–5 role-specific use cases. Each use case must follow this format:

**Use Case [N]: [Role] — [Scenario Title]**

- **Who:** [Job title / role]
- **Situation:** [The specific moment or trigger that leads them to use the product]
- **Before:** [What they had to do without this product — be specific about time, friction, or risk]
- **With [Product Name]:** [What they do now — concrete action, not vague benefit]
- **Outcome:** [Measurable or tangible result]

Use cases should cover different buyer personas if possible (e.g. end user, manager, admin).

---

## Quality Checks

Before delivering output, verify:
- [ ] Positioning statement follows Moore format exactly
- [ ] Tagline is 10 words or fewer
- [ ] Each pillar has at least 2 proof points (or flagged placeholders)
- [ ] Every feature has a benefit — no orphaned features
- [ ] Benefits start with action verbs
- [ ] Use cases include a Before/After structure
- [ ] Language is consistent with the target customer's vocabulary (not internal engineering terms)

## Example Trigger Phrases

- "Create a positioning statement for [product]"
- "Write a GTM plan for [feature]"
- "Give me key pillars for [product name]"
- "Build a feature and use case list for [product]"
- "We're launching [X] — help me with the messaging"
