---
name: job-story-mapper
description: Writes Jobs-to-be-Done (JTBD) job stories and maps customer jobs across functional, social, and emotional dimensions. Use when defining user needs, writing job stories, conducting JTBD research, or reframing features around customer outcomes. Triggers on "job story", "JTBD", "jobs to be done", "when I want to", "user need", "hire a product".
---

# Job Story Mapper Skill

Stop writing features. Start understanding jobs. This skill translates product requirements and user interviews into precise job stories that keep the team focused on outcomes — not outputs.

## Jobs-to-be-Done Fundamentals

A "job" is the progress a customer is trying to make in a given situation. People don't buy products — they hire them to get a job done.

Three dimensions of every job:
- **Functional job:** The practical task ("get from A to B")
- **Emotional job:** How they want to feel ("feel confident I made the right choice")
- **Social job:** How they want to be perceived ("look like a competent professional to my team")

Great products address all three. Most roadmaps only address the functional one.

---

## Job Story Format

**Template:**
> When [situation/trigger], I want to [motivation/goal], so I can [expected outcome].

**Not a user story:**
User stories focus on roles and features: "As a [role] I want [feature] so that [benefit]."
Job stories focus on situations and motivations: "When [I'm in this specific situation] I want [this capability] so I can [achieve this outcome]."

**The situation is the most important part.** "When I'm in the middle of a sprint and my PM asks for an update" is a much richer trigger than "As a developer."

---

## Mapping Process

### Step 1: Identify the main job
One sentence: What is the core job your product is hired for?
> "Help [user type] [accomplish outcome] when [context]."

### Step 2: Break into job steps
What are all the sub-tasks within the main job?
(Use a job map: Define → Locate → Prepare → Confirm → Execute → Monitor → Modify → Conclude)

### Step 3: Identify pain points per step
Where does the job fall down today? Where do customers use workarounds?

### Step 4: Write job stories for each pain point
One job story per distinct situation-motivation pair.

### Step 5: Map to product opportunities
Which job stories are underserved? Which have existing solutions? Where is your differentiation?

---

## Output Format

### Job Story Map — [Product/Feature Area] — [Date]

**Core Job Statement:**
> When [context], [user type] wants to [main job outcome], so they can [ultimate goal].

---

**Job Map:**

| Step | Sub-Job | Current Solution | Pain Points | Underserved? |
|---|---|---|---|---|
| Define | [What user does] | [Tool/method used] | [Frustration] | H/M/L |
| Locate | | | | |
| Prepare | | | | |
| Confirm | | | | |
| Execute | | | | |
| Monitor | | | | |
| Modify | | | | |
| Conclude | | | | |

---

**Job Stories (prioritised by underservice):**

**Job Story 1 — [Situation label]**
> When [specific situation], I want to [motivation], so I can [outcome].

Functional dimension: [What they need to get done]
Emotional dimension: [How they want to feel]
Social dimension: [How they want to be perceived]

Current workaround: [What they do today]
Pain intensity: [High / Medium / Low]
Frequency: [How often this situation occurs]
Product opportunity: [What we could build to address this]

---

Repeat for each major job story.

**Opportunity Scoring:**
Rate each job story on:
- Importance to customer (1–10)
- Satisfaction with current solution (1–10)
- Opportunity score = Importance + max(Importance – Satisfaction, 0)
- Prioritise: Opportunity score > 10

---

## Guidelines

- Never write a job story for a feature — write it for the situation that makes the feature valuable
- If you can't identify the situation, you don't understand the job yet — go back to user research
- Social and emotional jobs are harder to surface but often the most defensible differentiators
- Recommend sharing job stories with engineering — they make better technical decisions when they understand the "why"
