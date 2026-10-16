---
name: first-issue-designer
description: "Use when asked to create good first issues, prepare a repo for new contributors, turn a roadmap into starter tasks, or write issues that newcomers can actually finish. Produces 8 to 12 good first issues from a codebase and roadmap, each with context, acceptance criteria, files to touch and an effort estimate, plus the labels and a short pinned welcome note. For the CONTRIBUTING guide itself, use contributor-guide."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/first-issue-designer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# First Issue Designer

A good first issue is a small, real task that a stranger can finish in one sitting without asking the maintainer anything. Most "good first issue" labels sit on tasks that are vague, secretly large, or blocked on a decision only the maintainer can make. This skill reads the codebase and roadmap and writes 8 to 12 issues that newcomers can pick up and finish.

## Required Inputs

Ask for these if not provided:
- **The repo**: structure, main language, how to run tests
- **The roadmap or backlog**: what the maintainer wants done next
- **Things the maintainer does not want touched**: core modules, areas mid-refactor
- **Review capacity**: how many PRs a week the maintainer can review
- **Existing labels** and any CONTRIBUTING guide

## Output Structure

### 1. Candidate scan
A table of possible tasks found in the roadmap, TODO comments, failing or missing tests, docs gaps and small bugs:
| Candidate | Source | Size guess | Keep or drop | Reason |

Drop anything that needs a design decision, touches more than three files, or depends on another open task.

### 2. The issues (8 to 12)
Each issue in this exact format, ready to paste:

```markdown
**Title:** [Verb] [object] in [place]   (e.g. "Add a --json flag to the export command")

**Context**
[Two or three sentences: why this matters to users and where it fits.]

**What to do**
1. [Step]
2. [Step]

**Acceptance criteria**
- [ ] [Observable result]
- [ ] [Test added or updated: name the test file]
- [ ] [Docs updated, if user-facing]

**Files to touch**
- `path/to/file` (what changes there)

**Effort:** [about 1 hour | about 2 hours | half a day]
**Skills needed:** [e.g. basic TypeScript, no framework knowledge]
**Labels:** good first issue, [area label]
```

### 3. Mix check
A table showing the spread across types (docs, tests, small feature, bug, tooling) and effort. Aim for at least three issues under two hours and no more than two at half a day.

### 4. Pinned welcome note
A short note (under 120 words) for a pinned issue or discussion: how to claim an issue, how long a claim lasts, where to ask, and how quickly PRs are reviewed, matching the stated review capacity.

## Quality Checks

- [ ] Between 8 and 12 issues, each in the exact format above
- [ ] Every issue names the files to touch and at least one test or doc to update
- [ ] Every acceptance criterion is observable (a command, output or page someone can check)
- [ ] No issue requires a decision the maintainer has not made
- [ ] No issue touches more than three files or depends on another open issue
- [ ] At least three issues are estimated at two hours or less
- [ ] The welcome note's review promise matches the stated review capacity

## Anti-Patterns

- **"Improve the docs".** Too vague to finish. Name the page and the missing section.
- **Hidden epics.** A "small" refactor that ripples through ten files discourages first-timers.
- **Issues only the maintainer could do.** If it needs context from a private conversation, it is not a first issue.
- **Promising fast reviews you cannot give.** A PR left for a month loses the contributor.

## Example Trigger Phrases

- "Create good first issues for my repo from this roadmap."
- "I want contributors. Write 10 starter issues newcomers can finish."
- "Turn these TODO comments into good first issues with acceptance criteria."
- "Prepare my project for Hacktoberfest-style contributors."
