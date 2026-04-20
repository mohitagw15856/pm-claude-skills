# I Rebuilt All 93 Claude Skills From Scratch and Added 7 More — Here's What I Learned About What Makes a Great Skill

*Part 14 of the Claude Skills series. 100 skills. 15 professions. One thing I wish I'd done from the start.*

---

When someone raised a pull request on my open-source Claude Skills library claiming to "improve the skill scores," I did what any reasonable person would do: I got curious, then suspicious, then motivated.

The PR was from an external contributor. The changes looked superficially reasonable — but when I dug in, I noticed they were adding non-standard YAML fields (`tool_integration:`, `metadata:` blocks) that don't exist in Claude's skill specification. The descriptions were being changed too — but to a format that used "Triggers on" instead of describing what the skill actually produces.

I closed the PR. But the experience forced me to ask: **how good are my 93 skills, really?**

The answer was: inconsistent. Some were excellent. Some were missing key sections. A few had YAML that would silently break parsing. Most were missing a structured way to tell Claude what to do when the user doesn't give it enough information.

So I did something I should have done twelve months ago: I rebuilt every single one.

Here's what I learned.

---

## The Three Things That Make a Skill Actually Work

After working through 93 skills and writing 7 new ones, I've converged on three things that separate skills that consistently produce great output from skills that work sometimes.

### 1. The description field is your routing logic

The `description` field in a SKILL.md file is what Claude reads to decide whether to activate a skill. Claude scans descriptions (~100 tokens each) before loading any full skill. If your description is wrong, your skill never fires.

I found two common failure modes:

**The vague description:** "Helps with product management tasks." Too generic. Claude can't confidently match this to a user's request.

**The "Triggers on" description:** The PR that prompted this audit used descriptions like "Triggers on 'user interview', 'discovery interview', 'JTBD'." This describes keywords, not what the skill does. Claude's routing works on semantic understanding, not keyword matching.

The format that works best, based on consistent testing:

> "**Verb the thing**. Use when asked to X, Y, or Z. Produces [specific output description]."

For example:
> "Create a structured user discovery interview guide. Use when planning user interviews, customer discovery sessions, or problem validation. Produces a complete guide with screener questions, discussion guide, and per-session synthesis template."

Three parts: what it does, when to use it, what comes out. The "Produces" clause is particularly important — it sets user expectations and helps Claude understand the scope.

### 2. Required Inputs stops Claude from guessing

The most frustrating failure mode for skills: Claude invokes the skill and makes up inputs rather than asking for them.

You say "write a lesson plan." Claude invents a subject, an age group, a duration, and writes you a lesson plan for Year 7 Physics when you needed a corporate onboarding session for new engineers.

The fix is a `Required Inputs` section with this framing:

```markdown
## Required Inputs

Ask the user for these if not provided:
- **Subject or topic**
- **Audience** (age group, experience level, group size)
- **Session length**
```

The key phrase is "**Ask the user for these if not provided**." This tells Claude to check what it has before executing, and to ask for missing information rather than hallucinate it.

Before I added this section to all 93 skills, about a third of skill invocations required a follow-up correction because Claude had guessed wrong. After? Almost none.

### 3. Quality Checks changes Claude's output posture

The final section I added to every skill is a `Quality Checks` section — a checkbox list that Claude verifies before delivering output.

```markdown
## Quality Checks

- [ ] Every action item has a single named owner (not "team")
- [ ] Every action item has a concrete deadline
- [ ] Decisions include context (why the decision was made)
```

This sounds like it shouldn't matter — Claude is going to write whatever it writes regardless of a checklist. But it does matter, for two reasons:

**It changes what Claude pays attention to.** When the skill instructions explicitly say "every action item must have a named owner," Claude is less likely to write "team to follow up." The checklist becomes part of the specification.

**It gives Claude a self-review mechanism.** With Quality Checks in place, I noticed Claude would occasionally produce output and then say "before I deliver this, let me verify..." and catch its own gaps. That's exactly what you want.

---

## The Four Anti-Patterns I Fixed Across 93 Skills

### 1. Broken YAML frontmatter

Several skills had description fields like this:

```yaml
description: Generates a structured analysis
of user research findings across multiple
interviews, synthesising into themes
```

Multiline unquoted YAML strings break YAML parsing. Claude may parse these silently or incorrectly. The fix is simple — wrap descriptions in double quotes:

```yaml
description: "Generates a structured analysis of user research findings..."
```

### 2. Non-standard frontmatter keys

The PR that sparked this audit introduced `tool_integration: Notion, Jira, Slack` and `metadata:` blocks. These don't exist in Claude's skill specification. They add tokens without functionality, and could confuse future tooling.

Lesson: only use `name:` and `description:` in the frontmatter. Everything else goes in the markdown body.

### 3. Missing "Produces" in descriptions

Descriptions like "Use when asked to X" without a "Produces Y" clause are incomplete. They tell Claude when to activate but not what to aim for. I added "Produces" clauses to every skill that was missing them.

### 4. Quality Checks without checkboxes

Several skills had a Quality Checks section but written as bullet points, not checkboxes:

```markdown
## Quality Checks
- Salary range included
- Must-haves genuinely essential
```

The checkbox format (`- [ ]`) is functionally equivalent for Claude, but it's a stronger signal — it looks like a checklist to be worked through, not a list to be skimmed.

---

## The 7 New Skills — and Why These Seven

The community wishlist on GitHub had a long list of requested skills. I built seven that represent genuinely different professional contexts that weren't covered:

**Teaching Lesson Plan** — Education is the one major profession not covered by the existing 93 skills. A structured lesson plan skill fills this gap — from objectives to formative assessment to differentiation.

**SEO Content Brief** — Marketing existed in the library but was missing the content strategy layer. An SEO brief is the missing link between keyword research and content production.

**Media Pitch** — PR and media relations is a specific craft. A pitch is not a press release. The skill teaches Claude the difference: story-first, journalist-focused, no corporate language.

**Change Management Plan** — Organisational change is one of the most common HR and leadership challenges. The skill covers stakeholder analysis, resistance management, and adoption metrics — the parts most change communications miss.

**Workshop Facilitation Guide** — Facilitating a workshop is a distinct skill from designing one. This covers activity instructions, facilitation moves for when things go off track, and the decision-making protocol that should be agreed at the start of every session.

**Sales Forecasting Model** — Revenue forecasting exists in every commercial organisation but was missing from the library. The skill builds pipeline-based forecasts with scenario analysis and explicit assumption logs.

**Tax Planning Checklist** — Finance existed but covered investment and reporting. Year-end tax planning is a separate, structured review process that needed its own skill.

---

## What 100 Skills Teaches You About Skill Design

A few things I believe more strongly after this project:

**A skill should have one job.** The best skills in this library do exactly one thing and do it well. The weakest skills try to cover too much — "financial analysis" rather than "budget variance analysis" or "financial model narrative."

**Skills compete on their description field.** Two similar skills will be differentiated by which one has the better description. "Use when asked to analyse retention" beats "helps with user retention work" every time.

**The failure path matters as much as the happy path.** The best skills in this library have explicit guidance on what to do when information is missing, when there's genuine uncertainty, or when the output could be dangerous (legal, medical, financial). A skill that doesn't handle edge cases isn't a professional skill — it's a template.

**Quality Checks should be things that could actually go wrong.** Generic checks ("output is clear and structured") add nothing. Specific checks ("every action item has a named owner, not 'team'") reflect actual failure modes from real use.

---

## The Full Library: 100 Skills, 15 Professions

The library is open source and free to use, copy, and contribute to.

**Install everything:**
```bash
/plugin marketplace add mohitagw15856/pm-claude-skills
```

**Or install by profession:**
```bash
claude plugin install pm-essentials@pm-claude-skills    # Core PM
claude plugin install pm-gtm@pm-claude-skills           # Marketing + SEO + Media Pitch
claude plugin install pm-finance@pm-claude-skills       # Finance + Tax Planning
claude plugin install pm-hr@pm-claude-skills            # HR + Change Management
claude plugin install pm-sales@pm-claude-skills         # Sales + Forecasting
claude plugin install pm-operations@pm-claude-skills    # Operations + Workshop Facilitation
claude plugin install pm-cross@pm-claude-skills         # Cross-profession + Teaching
claude plugin install pm-figma@pm-claude-skills         # Figma design system
```

The full list of all 100 skills — with what each one does and which bundle it's in — is in the [GitHub README](https://github.com/mohitagw15856/pm-claude-skills).

---

## What's Next

A few things on the roadmap:

**Community skills.** I want to see skills from practitioners in professions I don't work in — architecture, journalism, education, legal. If you've built a skill that saves you time, raise a PR.

**Skills for Claude.ai (not just Claude Code).** The current library is Claude Code-specific. There's demand for a version that works with claude.ai's Projects feature, which uses a similar but different format.

**Domain-specific libraries.** The general library works across professions. But a law firm's skills library, or a SaaS company's PM skills, or a hospital's documentation skills — these would be 10x more powerful. If you want custom skills built for your team's specific workflows, [get in touch](mailto:mohit15856@gmail.com).

---

*The full library is at [github.com/mohitagw15856/pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills). Free, open source, MIT licence.*

*If this was useful — share it with one person who would find it valuable. That's all I ask.*
