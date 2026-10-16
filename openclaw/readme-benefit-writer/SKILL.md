---
name: readme-benefit-writer
description: "Use when asked to rewrite a README so strangers understand why they should care, turn a feature list into benefits, make a side project's README convincing, or explain what users get rather than what the code does. Rewrites an existing README so every feature is stated as a user benefit in plain sentences, and produces a one-line pitch, a Why section, a benefit-led feature list, a quick start, a Your data section and a contribution pointer. For a README written from scratch with badges, usage and install sections, use readme-writer."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/readme-benefit-writer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# README Benefit Writer

Most side-project READMEs describe the code ("built with React, uses SQLite, supports webhooks") when a stranger wants to know what changes for them ("your notes stay on your laptop and sync when you are back online"). This skill rewrites an existing README so each feature is stated as a benefit to a named user, in plain sentences, without losing the facts a developer needs.

## Required Inputs

Ask for these if not provided:
- **The current README** (or the repo's description and feature list)
- **Who it is for**: the one kind of person most likely to install it
- **What they do today instead**: the tool, spreadsheet or habit this replaces
- **Where data goes**: what is stored, where, and whether anything leaves the user's machine
- **How to contribute**: CONTRIBUTING file, issue labels, or "not accepting PRs yet"

## Output Structure

Return the rewritten README in Markdown, in this order.

### 1. One-line pitch
One sentence, under 20 words: `[Project] helps [user] [get outcome] without [current pain].`

### 2. Why
Two to four sentences. Name the user, the current workaround and what it costs them, then what this project changes. No adjectives without evidence ("fast" needs a number; otherwise drop it).

### 3. What you get
A bullet list, three to seven items. Each bullet uses this pattern:
`**[Benefit in user terms].** [The feature that delivers it, in one plain sentence.]`
Example: `**Find any note in under a second.** Full-text search runs locally over every note you have saved.`

### 4. Quick start
The shortest path from nothing to the first useful result, as numbered steps with copyable commands, ending with what the user should see.

### 5. Your data
A short section answering, in plain sentences: what is stored, where it is stored, what (if anything) is sent over the network and to whom, and how to export or delete it. If nothing leaves the machine, say so plainly.

### 6. Contributing
One or two sentences and a link: where to start (a label such as `good first issue`), and how to ask a question.

### 7. Change log for the author
After the README, a table of what changed and why:
| Before | After | Why |

## Quality Checks

- [ ] The pitch is one sentence of 20 words or fewer and names the user
- [ ] Every "What you get" bullet starts with a benefit in user terms, not a technology
- [ ] Every benefit is backed by a named feature in the same bullet
- [ ] No claim of speed, security or privacy appears without a stated basis
- [ ] The Your data section says what is stored, where, and what leaves the machine
- [ ] The quick start ends with what the user should see
- [ ] No fact from the original README was lost without being listed in the change log

## Anti-Patterns

- **Benefits without features.** "Boost your productivity" tells a reader nothing; pair every benefit with what delivers it.
- **The tech stack as the pitch.** Developers may care, but it belongs lower down.
- **Inventing numbers.** If the author has no benchmark, write the benefit without one.
- **A privacy section that hedges.** "We take privacy seriously" is not an answer; say where the data goes.

## Example Trigger Phrases

- "Rewrite my README so people understand why they would use this."
- "Turn this feature list into benefits for the README."
- "My side project's README is all tech stack. Fix it."
- "Make this README convincing for someone who has never heard of the project."
