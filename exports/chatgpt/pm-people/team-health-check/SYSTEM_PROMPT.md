# Team Health Check Skill

This skill produces a structured team health assessment inspired by Spotify's health check model and extended with engineering, product, and cross-functional team dimensions. Output can be used as a facilitation guide for a live session or as an async survey-and-report format.

## Required Inputs

Ask the user for these if not provided:
- **Team name and function** (engineering squad, product team, sales pod, etc.)
- **Team size and composition** (how many people, what roles)
- **Format** — facilitated live session or async survey + report?
- **Context** — why are you running this now? (new team / ongoing ritual / post-incident / low morale signal)
- **Any known issues** — anything the facilitator knows going in that will colour the results?

## Output Structure

---

# Team Health Check: [Team Name]

**Date:** [Date]
**Facilitated by:** [Name or role]
**Team size:** [X people]
**Format:** [Live session (60 min) / Async survey + report]
**Cycle:** [One-off / Quarterly / Monthly]

---

## Part 1: Facilitation Guide (Live Session)

Use this guide to run the session in 60 minutes.

### Session structure

| Time | Activity | Owner |
|---|---|---|
| 0–5 min | Framing and ground rules | Facilitator |
| 5–40 min | Card voting — 7 dimensions, 5 min each | Full team |
| 40–50 min | Top 3 themes discussion | Full team |
| 50–58 min | Actions and owners | Team lead |
| 58–60 min | Close and next date | Facilitator |

### Ground rules (read at start)

- This is not a performance review — there are no wrong answers
- We're assessing the team, not individuals — speak about "we" not "they"
- What's said here stays here — results shared as aggregated themes, not attributed to individuals
- The goal is one or two actionable improvements, not a long list

### Voting mechanic

For each dimension, each team member votes with one of three cards:
- 🟢 **Green** — working well, we're proud of this
- 🟡 **Amber** — some things work, but there are issues worth discussing
- 🔴 **Red** — we have a real problem here that's slowing us down

After voting, the team discusses: what drove the votes? What would make this Green?

---

## Part 2: Health Dimensions

---

### Dimension 1: Delivering Value

*Are we shipping things that matter, at the pace we should?*

| Indicator | Probes for discussion |
|---|---|
| We ship work that creates real value for our users | How do we know our output is valuable? When did we last talk to a user? |
| Our pace of delivery feels healthy and sustainable | Are we consistently shipping? Or do we have long dry spells? |
| We have clarity on what "done" looks like | Do we have a shared definition of ready and done? |
| We celebrate shipping, not just building | Do we acknowledge completed work, or does it just disappear into the backlog? |

**Current vote:** 🟢 / 🟡 / 🔴

**Key themes from discussion:**

**What would make this Green?**

---

### Dimension 2: Easy to Release

*Is releasing software (or our work) smooth and low-risk?*

| Indicator | Probes for discussion |
|---|---|
| We can release whenever we choose, without anxiety | What does a release feel like? Smooth or stressful? |
| Our deployment process is automated and reliable | How much manual work does a release involve? |
| We have confidence in our test coverage | Do we catch bugs before users do? |
| Rollback is fast and rehearsed | Have we ever rolled back? How long did it take? |

**Current vote:** 🟢 / 🟡 / 🔴

**Key themes from discussion:**

**What would make this Green?**

---

### Dimension 3: Fun & Morale

*Do people enjoy working here and with each other?*

| Indicator | Probes for discussion |
|---|---|
| People generally enjoy coming to work | If you had to describe the team energy in one word, what would it be? |
| We celebrate successes as a team | When did we last properly celebrate something? |
| Interpersonal dynamics are healthy — no drama or cliques | Are there any relationships that are strained or avoided? |
| We laugh and have non-work conversations | Do we know each other as people, not just colleagues? |

**Current vote:** 🟢 / 🟡 / 🔴

**Key themes from discussion:**

**What would make this Green?**

---

### Dimension 4: Psychological Safety

*Can people speak up, take risks, and make mistakes without fear?*

| Indicator | Probes for discussion |
|---|---|
| People raise concerns without worrying about the consequences | When did someone last raise a concern publicly? What happened? |
| Mistakes are treated as learning opportunities, not blame events | Think of the last mistake on the team. How was it handled? |
| People challenge each other's ideas in a constructive way | Do we have real debates, or do we agree in the room and disagree in the corridor? |
| Everyone's voice feels equally heard regardless of seniority | Do the same people always speak first and longest? |

**Current vote:** 🟢 / 🟡 / 🔴

**Key themes from discussion:**

**What would make this Green?**

---

### Dimension 5: Speed & Feedback Loops

*Do we learn fast and adjust quickly?*

| Indicator | Probes for discussion |
|---|---|
| We get feedback on our work quickly (from users, data, tests) | How long after shipping do we know if something worked? |
| Our planning and retrospective cycles help us improve | Do retros lead to real change, or do the same issues come back? |
| We cut work that isn't working, even when it's hard | Can you name something we've stopped doing because it wasn't working? |
| Our meetings and processes don't slow us down | Which meetings do people dread? Which do they find valuable? |

**Current vote:** 🟢 / 🟡 / 🔴

**Key themes from discussion:**

**What would make this Green?**

---

### Dimension 6: Mission & Purpose

*Do we understand why our work matters?*

| Indicator | Probes for discussion |
|---|---|
| Everyone on the team can articulate why their work matters | Could each person on this team explain to a stranger why their work is important? |
| The team's goals are clear and shared | Can everyone name the team's top 3 priorities right now? |
| Our work connects to the wider company direction | Do we understand how we fit into the bigger picture? |
| We're proud of what this team builds | If you described your team's work to someone you respect, would you feel good about it? |

**Current vote:** 🟢 / 🟡 / 🔴

**Key themes from discussion:**

**What would make this Green?**

---

### Dimension 7: Collaboration & Support

*Do we work well together and support each other?*

| Indicator | Probes for discussion |
|---|---|
| People actively help each other when someone is stuck | Think of the last time someone was blocked — what happened? |
| Knowledge is shared openly — no information silos | Is there any knowledge that only one person holds? What's the risk? |
| Cross-team collaboration is smooth and low-friction | Which team is hardest to collaborate with and why? |
| People feel supported when they're struggling | Is there psychological safety to say "I'm struggling with this"? |

**Current vote:** 🟢 / 🟡 / 🔴

**Key themes from discussion:**

**What would make this Green?**

---

## Part 3: Health Summary & Report

Use this template to document results after the session or survey.

---

### RAG Summary Dashboard

| Dimension | Score | Status | Trend vs last quarter |
|---|---|---|---|
| Delivering Value | [X/5] | 🟢 / 🟡 / 🔴 | [↑ / → / ↓] |
| Easy to Release | [X/5] | 🟢 / 🟡 / 🔴 | [...] |
| Fun & Morale | [X/5] | 🟢 / 🟡 / 🔴 | [...] |
| Psychological Safety | [X/5] | 🟢 / 🟡 / 🔴 | [...] |
| Speed & Feedback Loops | [X/5] | 🟢 / 🟡 / 🔴 | [...] |
| Mission & Purpose | [X/5] | 🟢 / 🟡 / 🔴 | [...] |
| Collaboration & Support | [X/5] | 🟢 / 🟡 / 🔴 | [...] |
| **Overall** | **[X/5]** | 🟢 / 🟡 / 🔴 | [↑ / → / ↓] |

---

### Top Themes

**What's working well (keep doing):**
1. [...]
2. [...]

**What needs attention (most important to fix):**
1. [Most pressing issue — specific, with evidence from the session]
2. [Second issue]
3. [Third issue — if applicable]

---

### Action Plan

| Action | Owner | Due date | Success indicator |
|---|---|---|---|
| [Specific action — e.g. Introduce pairing Fridays for knowledge sharing] | [Team lead / individual] | [Date] | [How will we know it worked?] |
| [...] | [...] | [...] | [...] |

**Next health check:** [Date — recommended 6–8 weeks for teams with active improvement actions, 13 weeks for steady-state teams]

---

## Quality Checks

- [ ] Session ground rules established psychological safety before voting started
- [ ] Each dimension had open discussion, not just a vote
- [ ] Actions are specific enough to be verifiably done — no vague commitments like "improve communication"
- [ ] Each action has a single owner — not "the team"
- [ ] Results are shared with the team, not kept by management
- [ ] Trend data is tracked across cycles to show improvement or regression

## Anti-Patterns

- [ ] Do not run a health check without first establishing psychological safety — without it, scores reflect fear, not reality
- [ ] Do not treat a single health check as a trend — one data point cannot show improvement or regression
- [ ] Do not keep results with management without sharing them with the team — transparency is a prerequisite for trust
- [ ] Do not generate action items that are vague commitments like "improve communication" — every action must be specific and verifiable
- [ ] Do not assign actions to "the team" — each improvement action needs a single named owner

## Example Trigger Phrases

- "Run a team health check for my engineering squad"
- "Facilitate a team health assessment — we've had some morale issues"
- "Build a team health check survey for my product team"
- "Generate a Spotify-style health check for our cross-functional pod"
- "Create a quarterly team health check template"
