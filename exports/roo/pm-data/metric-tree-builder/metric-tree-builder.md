# Metric Tree Builder Skill

A north-star metric you can't decompose is a number you can't move. This skill breaks it into the multiplicative/additive drivers beneath it, down to metrics a team can actually act on — and points at the highest-leverage levers.

## Working from a brief

Given a top metric and a rough business model, **build the full tree anyway**, inferring the standard driver structure for that model and marking assumptions. Never stop at one level; push down to input metrics someone owns.

## Required Inputs

Ask for (if not already provided):
- **The north-star / top metric** (e.g. weekly active revenue, MRR, GMV, activated users)
- **Business model** (subscription, marketplace, ads, transactional, freemium)
- **Where the team can act** (which teams own which surfaces)
- **Current pain** (the metric is flat / dropping — optional, focuses the tree)

## Output Format

### 1. The decomposition
Express the top metric as an equation of its drivers, e.g.:
`Revenue = New customers × Avg first order + Retained customers × Repeat rate × AOV`
Then break each driver down a level or two, until you reach **input metrics a team can directly influence** (e.g. signup conversion, activation rate, email open→click, time-to-value).

Show it as an indented tree or a table:

| Level | Metric | Driven by | Owner / lever |
|---|---|---|---|
| 0 | North star | — | |
| 1 | Driver | sub-inputs | |
| 2 | Input metric | actions | team |

### 2. Relationships
Note where drivers are **multiplicative** (a small % gain compounds) vs **additive**, and any that trade off against each other.

### 3. Highest-leverage levers
The 2–3 input metrics where a realistic improvement moves the north star most — and why (sensitivity × how movable it is).

### 4. Instrumentation gaps
Which input metrics aren't being measured yet but should be, to make the tree usable.

## Quality Checks

- [ ] The top metric is expressed as an actual equation of its drivers
- [ ] The tree bottoms out in input metrics a team can act on, not more outputs
- [ ] Multiplicative vs additive relationships are noted
- [ ] Identifies the highest-leverage levers with reasoning
- [ ] Flags metrics that need to be instrumented

## Anti-Patterns

- A "tree" that's just a flat list of unrelated KPIs
- Stopping at output metrics no one can directly move
- Ignoring how drivers combine (treating everything as additive)
- No view on which lever actually matters most
