---
trigger: model_decision
description: "Design a product analytics tracking plan: event names on one convention, the properties each event carries with types and allowed values, user and account properties, and the questions each event answers. Use when asked to design our event taxonomy, write a tracking plan, name our analytics events, clean up our event names, or what should we track for this feature. Produces a naming convention, an event table with triggers and properties, a property dictionary, the questions mapped to events, and a list of what not to track."
---

# Analytics Event Taxonomy Skill

Analytics becomes unusable one event at a time: `signup_click`, `Sign Up Clicked` and `user_signed_up` all exist, nobody knows which is right, and a property called `type` means four things. A taxonomy is a small set of rules applied without exception, decided before the code is written. This skill starts from the questions the team needs answered and works back to the fewest events that answer them. To choose which metrics matter, use `metrics-framework`; to specify a dashboard, use `dashboard-brief`.

## What This Skill Produces

- **A naming convention** with examples of right and wrong
- **An event table**: name, when exactly it fires, where (client or server), and its properties
- **A property dictionary**: name, type, allowed values, example, and whether it may contain personal data
- **User and account properties**, kept apart from event properties
- **A question map**: each business question and the events that answer it
- **A do-not-track list**

## Required Inputs

Ask for these if not provided:
- **The product and the flows** in scope
- **The questions the team needs answered**: funnel steps, activation, retention, feature use
- **What exists today**: current event names, the tools in use, known problems
- **Privacy constraints**: regions, consent requirements, data that must never be collected
- **Who implements and who analyses**

If the team has not said what questions it needs answered, ask before listing events. Do not invent event volumes, conversion rates or benchmarks.

## Framework: Questions First, Then the Fewest Events

1. **List the questions.** Each must be answerable with a count, a rate or a sequence. Vague ones ("how do people use search?") are sharpened first.
2. **Pick one convention and state it.** A common choice is object then past-tense action in one case style (`Report Exported` or `report_exported`). Whatever is chosen: one case, one tense, no abbreviations, no screen names in the event name.
3. **Name events for what happened, not where it was clicked.** `Report Exported` with a `format` property, not `export_csv_button_click` and `export_pdf_button_click`.
4. **Define the trigger precisely.** "Fires when the server confirms the export file is ready", not "when the user exports". Say whether it is sent from the client or the server; events that matter for money or state should come from the server.
5. **Put variation in properties.** Each property has one meaning everywhere, a type, and a closed list of values where possible.
6. **Separate who from what.** Things true of the user or account (plan, role, signup date) are user or account properties, set once and updated, not repeated on every event by hand.
7. **Mark personal data.** Flag any property that could identify a person, and prefer an ID over a name or email.
8. **Cut.** Remove any event that answers no listed question. Every event is something to maintain.
9. **Plan the change.** For an existing mess: map old names to new, run both for a period, and set a date to remove the old.

## Output Format

# Tracking Plan: [product or feature]

**Convention:** [the rule in one line] · **Good:** `[example]` · **Bad:** `[example]`

## Questions
| # | Question | Events that answer it |
|---|----------|-----------------------|

## Events
| Event | Fires when | Sent from | Properties | Answers |
|-------|-----------|-----------|------------|---------|

## Property Dictionary
| Property | Type | Allowed values | Example | Personal data? |
|----------|------|----------------|---------|----------------|

## User and Account Properties
| Property | Type | Set when |
|----------|------|----------|

## Do Not Track
[Items and the reason]

## Migration (if replacing existing events)
| Old name | New name | Dual-run until |
|----------|----------|----------------|

## Quality Checks

- [ ] Every event follows the stated convention with no exceptions
- [ ] Every event answers at least one listed question
- [ ] Each trigger says exactly when it fires and from where
- [ ] Each property has one meaning, a type and, where possible, a closed list of values
- [ ] Personal data is flagged and minimised
- [ ] No invented volumes or rates appear

## Anti-Patterns

- [ ] Do not name events after buttons or screens
- [ ] Do not create a new event where a property would do
- [ ] Do not reuse a property name with a different meaning
- [ ] Do not track everything "in case it is useful"
- [ ] Do not put emails, names or free text into event properties

## Example Trigger Phrases

- "Design our event taxonomy."
- "Write a tracking plan for this feature."
- "Our analytics event names are a mess. Fix them."
- "What should we track for onboarding?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/analytics-event-taxonomy.html

<!-- pm-claude-skills v84.1.0 | skill: analytics-event-taxonomy | source: skills/analytics-event-taxonomy/SKILL.md | sha256: f187a199bb521657e453a9f9f98cf843b20584bcf2bd665bf6ba8856bfb51435 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
