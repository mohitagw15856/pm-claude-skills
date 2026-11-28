---
aliases: ["KPI Tree Builder"]
tags: [pm-skills, skill]
skill: kpi-tree-builder
description: "Break one top-level number into the arithmetic that produces it: a tree of drivers that multiply or add up to the KPI, each with a definition, an owner and the figure supplied. Use when asked to build a KPI tree, decompose this metric, what drives our revenue, break down this number, or find which lever moves the target. Produces the tree with the formula at every level, a check that the supplied figures reconcile, a sensitivity table showing what a one-step change in each driver does, and the gaps where data is missing."
---

# KPI Tree Builder Skill

A target such as "grow revenue 20%" cannot be worked on directly. Somebody has to say which of the numbers underneath it will move: more customers, more seats per customer, a higher price, fewer leaving. A KPI tree writes that arithmetic down so every branch has a formula, an owner and a figure, and so the parts provably add up to the whole. This skill is about the arithmetic of one number. To choose a north star and its leading indicators, use `metrics-framework`.

> **Not quite this?** Use `metrics-framework` to choose which metrics a product should watch, and `okr-builder` to turn the levers into objectives.

## What This Skill Produces

- **The tree**, with the formula that links each level to the one above
- **Definitions** for every node: what is counted, over what period, from which source
- **A reconciliation**: whether the supplied figures multiply and add back to the top number
- **A sensitivity table**: the effect on the top number of the same relative change in each driver
- **Owners** for each branch
- **Gaps**: nodes with no figure or no agreed definition

## Required Inputs

Ask for these if not provided:
- **The top number**, its exact definition and the period
- **The business model**, so the first split is the right one (subscriptions, transactions, usage, advertising)
- **The figures the team has** for the drivers, with their sources
- **The target**, if there is one
- **Who owns what** today

Use only the figures supplied. Where a driver has no figure, leave it blank and show it as a gap; do not back-solve a number and present it as data. If a missing value can be derived exactly from two supplied ones, derive it, show the working and label it as derived.

## Framework: Make the Arithmetic Explicit

1. **Fix the top node.** One number, one definition, one period.
2. **Split with an identity, not a list.** Each level must be an equation that is always true: revenue = customers × revenue per customer; customers = start + new − lost. If the children do not compute to the parent, it is not a tree.
3. **Alternate multiplying and adding** as the business requires, and write the operator on every branch.
4. **Stop where someone can act.** A leaf is a number a team can influence in a quarter. Three or four levels is usually enough.
5. **Avoid double counting.** Every unit of the top number should flow through exactly one path.
6. **Reconcile.** Multiply and add the supplied leaves back up. If the result differs from the reported top number, show the difference and name the likely cause: mismatched periods, different definitions, or a missing branch.
7. **Test sensitivity.** Apply the same relative change to each driver in turn and show the effect on the top number. In a multiplicative tree the ranking, not the size, is what matters, since equal relative changes have equal effects until an additive branch intervenes.
8. **Assign owners** and note which drivers are leading and which only show up afterwards.

## Output Format

# KPI Tree: [top number] · [period]

**Definition:** [exactly what is counted] · **Reported value:** [as supplied] · **Target:** [as supplied]

## The Tree
```
[Top number] = A × B
├─ A = A1 + A2 − A3
│  ├─ A1  [value]  owner
│  ├─ A2  [value]  owner
│  └─ A3  [value]  owner
└─ B = B1 × B2
   ├─ B1  [value]  owner
   └─ B2  [value]  owner
```

## Definitions
| Node | Formula | What is counted | Period | Source |
|------|---------|-----------------|--------|--------|

## Reconciliation
[Computed from the leaves · reported · difference · likely cause]

## Sensitivity
| Driver | Change tested | Effect on the top number | Working |
|--------|---------------|--------------------------|---------|

## Gaps
[Nodes with no figure or no agreed definition, and who could supply them]

## Quality Checks

- [ ] Every parent equals a formula of its children, with the operator shown
- [ ] No unit of the top number is counted on two paths
- [ ] All figures were supplied, or derived exactly with the working shown and labelled
- [ ] The reconciliation was done and any difference is explained or flagged
- [ ] Sensitivity uses the same relative change for each driver and shows the arithmetic
- [ ] Each leaf has an owner or is listed as unowned

## Anti-Patterns

- [ ] Do not list related metrics under a parent without a formula
- [ ] Do not invent a driver's value to make the tree complete
- [ ] Do not mix periods or definitions between levels
- [ ] Do not decompose past the point where anyone can act
- [ ] Do not present the sensitivity table as a forecast

## Example Trigger Phrases

- "Build a KPI tree for revenue."
- "Decompose this metric into its drivers."
- "Which lever moves our target most?"
- "Do these numbers actually add up?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/kpi-tree-builder.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.1.0 | skill: kpi-tree-builder | source: skills/kpi-tree-builder/SKILL.md | sha256: 225d934d3a592b7cb252995bfe6662c2e00fa83420f6b1ef62380e457fff97ef | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
