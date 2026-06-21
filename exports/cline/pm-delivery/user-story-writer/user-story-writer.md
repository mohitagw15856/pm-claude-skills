# User Story Writer Skill

This skill produces production-ready user stories from a feature brief, PRD section, or verbal description. Each story follows the standard format with a clear who/what/why, behavioural acceptance criteria in Given/When/Then format, edge cases, and definition of done. Output is ready to paste into Jira, Linear, or your planning tool.

## Required Inputs

Ask the user for these if not provided:
- **Feature or change** to break into stories — paste the brief, PRD section, or describe the feature
- **User types / personas** involved (e.g. admin, end user, guest, API consumer)
- **Scope** — are we writing one story or decomposing an epic into a full set of stories?
- **Acceptance criteria format preference** — Given/When/Then, bullet checklist, or both?
- **Technical constraints or notes** — anything the engineering team has flagged that should shape the stories

## Output Structure

For each story:

---

## Story: [Short title — verb + noun, e.g. "Filter search results by date range"]

**Epic:** [Parent epic name — e.g. "Advanced Search"]
**Story ID:** [Jira/Linear ID — leave blank if not yet created]
**Priority:** [P1 / P2 / P3]
**Story points:** [Leave blank — for engineering to estimate]

---

### User Story

> **As a** [specific user type — not "user"],
> **I want to** [concrete action they want to take],
> **So that** [the outcome they achieve — business value, not feature description].

**Example:**
> As an **account manager**,
> I want to **filter my client list by last contact date**,
> so that I **can quickly identify clients I haven't spoken to in over 30 days and prioritise outreach**.

---

### Context

[1–3 sentences of context that aren't in the user story itself: when does this story matter, what triggers the need, how does it fit into a larger flow. This helps engineers understand why before they ask.]

---

### Acceptance Criteria

**Format: Given / When / Then**

Each criterion tests one specific behaviour. Write one GWT per observable outcome — not one GWT for the whole feature.

**AC1: [Short name for this criterion]**
```
Given [starting state or context]
When [user action]
Then [observable system behaviour]
```

**AC2: [Short name]**
```
Given [...]
When [...]
Then [...]
```

**AC3: [Short name]**
```
Given [...]
When [...]
Then [...]
```

---

### Edge Cases

[List scenarios that are non-obvious but must be handled. These become additional ACs or notes to engineering.]

- [ ] **[Edge case 1]:** [e.g. User applies a date filter that returns 0 results — show empty state with clear messaging and a "clear filters" action]
- [ ] **[Edge case 2]:** [e.g. User has >10,000 clients — filter must not degrade load time >200ms]
- [ ] **[Edge case 3]:** [e.g. Date filter persists across page refresh — or explicitly should not if that's the decision]
- [ ] **[Permission edge case]:** [e.g. Read-only users can see the filter but cannot save filter presets]

---

### Out of Scope

[Explicitly state what this story does NOT cover — prevents scope creep and clarifies where the next story begins.]

- Saving and sharing filter presets (separate story — see [Story X])
- Bulk actions on filtered results
- Exporting filtered client list to CSV

---

### Definition of Done

- [ ] Acceptance criteria all pass
- [ ] Edge cases handled (or explicitly deferred with a new ticket raised)
- [ ] Unit tests written for each AC
- [ ] Works on mobile viewport (if applicable)
- [ ] Accessibility: keyboard navigable and screen-reader compatible
- [ ] Error states are handled and copy approved
- [ ] Product and design have reviewed in staging
- [ ] No console errors in production build

---

## Epic Decomposition Template

If the user provides an epic or feature brief, decompose it into a full set of stories before writing them:

**Epic:** [Name]
**Goal:** [What outcome does completing this epic achieve?]
**Stories:**

| # | Story | Notes | Dependencies |
|---|---|---|---|
| 1 | [Core happy path story — the simplest version of the feature that delivers value] | | |
| 2 | [Validation / error handling story] | | Depends on #1 |
| 3 | [Edge case or power user story] | | Depends on #1 |
| 4 | [Admin or configuration story] | | |
| 5 | [Performance or scale story — if applicable] | | Depends on #1 |

**Suggested sprint order:** [Which stories are P1 for MVP? Which can follow in a later sprint?]

---

## Common Story Anti-Patterns — and Fixes

Use these to review stories before handing to engineering:

| Anti-pattern | Example | Fix |
|---|---|---|
| **Solution in the story** | "As a user I want a dropdown filter" | Remove the UI decision — "As a user I want to filter by date range" |
| **Vague "so that"** | "so that it's easier to use" | Make it specific — "so that I can prioritise outreach without opening each record manually" |
| **Too big** | Story covers 5 distinct user flows | Split into separate stories per flow |
| **No acceptance criteria** | Story has description only | Add at least 3 GWT criteria before engineering starts |
| **ACs that test the solution, not the behaviour** | "Given the dropdown is open, When I select an option" | Test the outcome — "Given I have applied a date filter, When I view my results, Then only clients last contacted in that date range appear" |
| **Missing empty state** | No AC for what happens with 0 results | Add it — empty states are part of the feature |
| **Missing error state** | No AC for network failure or invalid input | Add error handling ACs explicitly |

---

## Example: Full Story Set for a Feature

**Feature brief:** "Allow users to export their invoice history as a PDF or CSV"

---

### Story 1: Export invoice list as CSV

> As a **finance admin**,
> I want to **export my invoice history as a CSV file**,
> so that I can **import it into our accounting software without manual data entry**.

**AC1: Successful export**
```
Given I am on the Invoices page with at least one invoice
When I click "Export" and select "CSV"
Then a CSV file is downloaded containing all visible invoices with columns: Invoice ID, Date, Amount, Status, Customer Name
```

**AC2: Empty state**
```
Given I am on the Invoices page with no invoices
When I click "Export"
Then the export button is disabled and a tooltip reads "No invoices to export"
```

**AC3: Filtered export**
```
Given I have applied a date filter showing invoices from Jan 2026 only
When I click "Export" and select "CSV"
Then the export contains only invoices from Jan 2026 — not all invoices
```

**Edge cases:**
- [ ] Export with >10,000 invoices — must complete in <30s or show a progress indicator
- [ ] Export triggered on mobile — downloads to device's default download location

**Out of scope:** PDF export (Story 2), scheduled exports (future epic)

---

### Story 2: Export invoice list as PDF

> As a **finance admin**,
> I want to **export my invoice history as a formatted PDF**,
> so that I can **share a professional summary with our accountant**.

[... ACs follow same pattern ...]

---

## Quality Checks

- [ ] Every story has a specific user type — not "a user" or "the system"
- [ ] The "so that" explains business value — not just feature description
- [ ] Each AC tests one observable outcome — not a bundle of behaviours
- [ ] Empty states, error states, and edge cases are explicitly handled
- [ ] Out of scope is documented — not assumed
- [ ] Stories are independent — they can be shipped individually without depending on unreleased work (except where explicitly noted)

## Anti-Patterns

- [ ] Do not write user stories from a technical perspective — every story must be from the user's point of view and state their goal
- [ ] Do not write acceptance criteria that are untestable — every criterion must have a clear pass/fail condition
- [ ] Do not create stories that are too large to complete in a single sprint — break epics into estimable, independently deliverable stories
- [ ] Do not omit edge cases — unhappy paths and error states are required, not optional
- [ ] Do not skip the Definition of Done — without it, "done" means different things to different people

## Example Trigger Phrases

- "Write user stories for [feature] from this brief"
- "Break this PRD section into user stories with acceptance criteria"
- "Convert these feature requirements into Jira tickets"
- "Write the user stories and ACs for [feature name]"
- "Decompose this epic into individual stories ready for sprint planning"
