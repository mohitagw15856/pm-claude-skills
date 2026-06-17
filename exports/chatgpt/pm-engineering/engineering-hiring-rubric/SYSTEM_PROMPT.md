# Engineering Hiring Rubric

Produce a complete hiring rubric and interview scorecard for evaluating software engineers at a specific role and level. The rubric must be specific enough that two interviewers who have never compared notes will score the same candidate within one level of each other. That requires: explicit behavioral anchors (what does "Strong Hire" look like vs. "Hire" for each competency), calibrated technical questions with written evaluation criteria, and a structured debrief format that surfaces signal rather than recency bias. Include calibration notes to help interviewers recognize and counter common evaluation biases.

## Required Inputs

Ask for these if not already provided:
- **Role** — backend, frontend, fullstack, SRE/platform, data, ML, or mobile engineer
- **Level** — junior (L3/IC2), mid (L4/IC3), senior (L5/IC4), or staff (L6/IC5); clarify the company's level naming if different
- **Team context** — what the team builds, team size, and what problems this hire will work on in the first year
- **Tech stack** — primary languages and frameworks for the technical questions; list the stack explicitly
- **Interview format** — which rounds are used (phone screen, coding, system design, behavioral, take-home); if not specified, produce a recommended format

## Output Format

---

# Engineering Hiring Rubric: [Role] — [Level]

**Role:** [e.g., Senior Backend Engineer]
**Level equivalent:** [e.g., L5 / IC4 / Senior]
**Team:** [Team name and one-sentence description of what they build]
**Tech stack:** [Languages and frameworks]
**Interview loop:** [List the rounds in order]

---

## 1. Role Definition and Level Expectations

### What This Role Does

[2–3 sentences describing the scope of work: what systems they'll own, what problems they'll solve, and who they'll work with. Make this specific to the team context provided.]

### Level Bar

Define the minimum bar for a Hire recommendation at this level. This is not the ideal candidate description — it is the floor.

| Dimension | [Level] Floor | One Level Below (No Hire) | One Level Above (Stretch) |
|-----------|--------------|---------------------------|---------------------------|
| Technical scope | [e.g., "Owns a service or major feature area end-to-end with minimal guidance"] | [e.g., "Completes well-defined tasks; needs guidance on scope and approach"] | [e.g., "Leads cross-team technical initiatives; sets technical direction"] |
| Problem solving | [e.g., "Breaks ambiguous problems into concrete sub-problems independently"] | [e.g., "Solves defined problems well; struggles with ambiguity"] | [e.g., "Identifies problems others miss; structures organization-level technical challenges"] |
| Code quality | [e.g., "Writes production-ready code; anticipates edge cases; reviewable without significant rework"] | [e.g., "Writes working code that requires significant review feedback"] | [e.g., "Sets code quality standards; designs reusable abstractions adopted by others"] |
| Communication | [e.g., "Communicates technical decisions clearly to peers and stakeholders"] | [e.g., "Communicates well with direct team; struggles with cross-team or stakeholder comms"] | [e.g., "Drives technical consensus across teams; writes documents others reference"] |
| Ownership | [e.g., "Sees work to production; monitors after deploy; follows up on issues proactively"] | [e.g., "Delivers assigned work; escalates issues but doesn't drive them to resolution"] | [e.g., "Owns outcomes across teams; improves team processes and systems beyond their own work"] |

---

## 2. Interview Loop Structure

| Round | Format | Duration | Interviewer | Competencies Assessed |
|-------|--------|----------|-------------|----------------------|
| Phone screen | Video call, technical questions | 45 min | [Hiring manager or senior engineer] | Problem solving, communication, basic technical depth |
| Coding interview 1 | Live coding — [platform] | 60 min | [Engineer] | Coding, data structures, code quality |
| Coding interview 2 | Live coding — [platform] | 60 min | [Engineer] | Algorithms, debugging, code quality |
| System design | Whiteboard / shared doc | 60 min | [Senior/Staff engineer] | System design, scalability, technical communication |
| Behavioral | Structured interview | 45 min | [Hiring manager] | Ownership, collaboration, growth mindset |
| [Optional] Take-home | Asynchronous project | [X hours] | [Reviewer] | Code quality, thoroughness, real-world problem solving |

**Interview coverage matrix:** Each competency dimension must be assessed by at least 2 independent interviewers.

| Competency | Phone Screen | Coding 1 | Coding 2 | System Design | Behavioral |
|-----------|-------------|---------|---------|--------------|-----------|
| Coding | ○ | ● | ● | ○ | |
| System design | ○ | | | ● | |
| Problem solving | ● | ● | ● | ● | |
| Code quality | | ● | ● | | |
| Communication | ● | ● | ● | ● | ● |
| Ownership | ○ | | | ○ | ● |
| Debugging | | ● | ● | | |

● = Primary signal  ○ = Secondary signal

---

## 3. Coding Interview Guide

### Question Selection

Choose 1–2 problems per coding round. Problems should be solvable in 30–40 minutes with the remaining time for discussion and follow-ups. Prefer problems with multiple solution tiers so you can see how far candidates take their thinking.

### Problem Template

**Problem: [Title]**

*Prompt (read to candidate):*
> [Problem statement — be specific. Include constraints (input size, value ranges). Avoid ambiguity that tests problem-reading rather than problem-solving.]

*Example:*
> Given a list of integers representing stock prices at each minute of a trading day, return the maximum profit you could achieve by making exactly one buy and one sell. You may not sell before you buy.

**Clarifying questions a strong candidate will ask:**
- [e.g., "Can the list be empty?" / "Are all values positive?" / "Can profit be negative — i.e., should we return 0 if no profit is possible?"]

**Solution tiers:**

| Tier | Approach | Time Complexity | Space Complexity | Signals |
|------|----------|-----------------|-----------------|---------|
| Baseline | [Brute force — O(n²) nested loop] | O(n²) | O(1) | Can solve the problem; understands correctness |
| Expected | [Single pass, tracking min price seen so far] | O(n) | O(1) | Strong problem solver; explains tradeoff |
| Strong | [Generalizes to k transactions, or extends to cooldown variant without prompting] | O(n) | O(1) | Staff-level generalization thinking |

**Follow-up questions:**
- [e.g., "What if you could make at most k trades?"]
- [e.g., "How would you test this function? Write me 3 test cases."]
- [e.g., "Walk me through your code as if you're explaining it in a code review."]

**Evaluation rubric for this problem:**

| Signal | Strong Hire | Hire | No Hire |
|--------|------------|------|---------|
| Problem comprehension | Asks 1–2 clarifying questions immediately; identifies edge cases before coding | Understands the problem after 1 prompt; misses 1–2 edge cases | Misunderstands the problem or requires repeated clarification |
| Solution quality | O(n) solution; clean code; handles all edge cases | O(n) with hints; code is readable but has minor issues | O(n²) with hints, or correct solution with significant issues |
| Code quality | Well-named variables; logical structure; would pass code review | Functional but verbose or inconsistently named | Hard to follow; would require significant review feedback |
| Communication | Narrates thinking throughout; explains complexity; self-corrects | Explains solution when asked; answers follow-ups well | Silent during coding; unable to explain their approach |
| Follow-ups | Extends solution confidently; identifies further improvements | Handles follow-ups with moderate prompting | Unable to extend or explain tradeoffs |

---

## 4. System Design Interview Guide

### [Level]-Appropriate Design Scope

At [Level], expect the candidate to:
- [e.g., Senior: "Design a complete system with capacity estimates, component breakdown, and discussion of failure modes"]
- [e.g., Mid: "Design the core components of a system; may need prompting on scalability and failure handling"]
- [e.g., Junior: "Design a simple client-server system; focus on clarity of thinking over complete distributed systems knowledge"]

### Sample Design Question

**Question:** "Design [a URL shortener / a rate limiter / a notification service / a ride-matching system — choose one relevant to the team's domain]."

**Evaluation dimensions:**

| Dimension | What to assess | Strong Hire | Hire | No Hire |
|-----------|---------------|------------|------|---------|
| Requirements clarification | Does the candidate ask before designing? | Asks scope, scale, SLA, and key use cases before drawing anything | Asks some questions; may miss scale or SLA | Starts designing immediately without clarifying |
| High-level design | Can they describe the major components? | Clear component breakdown with justified choices; covers data flow | Reasonable breakdown; may overcomplicate or undercomplicate | Missing key components or cannot explain data flow |
| Data model | Can they design a schema or data structure for the system? | Models the core entities with normalization/denormalization tradeoffs discussed | Reasonable schema; may miss indexing or partitioning needs | Cannot model the data or produces clearly wrong schema |
| Scalability | Can they identify and address bottlenecks? | Identifies bottlenecks proactively; proposes horizontal scaling, caching, or sharding as appropriate | Discusses scaling when prompted; reasonable solutions | Cannot identify bottlenecks or proposes solutions that don't match the scale |
| Failure handling | Do they think about what happens when things break? | Proactively discusses failure modes: single points of failure, retry logic, idempotency | Discusses failure when prompted; identifies some failure modes | Does not think about failure; assumes happy path |
| Communication | Is the design explained clearly? | Could run this meeting with a team of engineers at a real company | Clear enough to follow; some gaps in explanation | Difficult to follow; interviewer cannot understand the design |

### Design Probing Questions

Use these to probe depth after the candidate presents their design:
- "Walk me through what happens when a write request comes in at peak load — 10,000 requests per second."
- "Your primary database just failed. What happens to the system?"
- "You estimated X QPS. How would your design change if it needed to handle 100× that?"
- "Where is the first place this system would fall over under load?"
- "How would you monitor this in production? What would your on-call runbook look like?"

---

## 5. Behavioral Interview Question Bank

Map every question to a competency. Ask 4–6 questions per behavioral round using STAR format (Situation, Task, Action, Result). Do not ask leading questions.

### Competency: Ownership and Delivery

1. "Tell me about a time you owned something end-to-end — from design through production monitoring. What did you do when something went wrong after launch?"
   - *Strong signal:* Describes proactive monitoring setup, a specific incident they caught themselves, and what they changed
   - *Weak signal:* Describes writing the code and handing off; no discussion of production behavior

2. "Describe a project that was significantly delayed or failed. What was your role, and what did you take responsibility for?"
   - *Strong signal:* Direct ownership of their contribution to the failure; specific changes to how they work
   - *Weak signal:* Attributes all delay to external factors; no reflection on their own actions

### Competency: Technical Judgment

3. "Tell me about a significant technical decision you made. What options did you consider, and how did you decide?"
   - *Strong signal:* Named alternatives with clear tradeoffs; explains who they consulted; reflects on whether they'd decide the same way today
   - *Weak signal:* "I knew X was the right answer" without describing the decision process

4. "Describe a time you had to push back on a technical direction — either from management or from peers. What happened?"
   - *Strong signal:* Evidence-based disagreement; constructive communication; willing to commit once decision was made even if they lost the argument
   - *Weak signal:* Either never pushed back or pushed back emotionally without evidence

### Competency: Collaboration and Communication

5. "Tell me about a time you had to explain a complex technical concept to a non-technical stakeholder. How did you approach it?"
   - *Strong signal:* Used analogy or simplified model; confirmed understanding; adapted to the audience
   - *Weak signal:* "I explained it technically and told them to trust me"

6. "Describe a situation where you and a peer strongly disagreed on an approach. How did it resolve?"
   - *Strong signal:* Sought a third opinion or data; focused on the right outcome, not being right; maintained relationship
   - *Weak signal:* Escalated immediately or capitulated without engaging

### Competency: Growth and Learning

7. "What is a significant technical mistake you made in the last two years? What did you learn from it?"
   - *Strong signal:* Specific mistake, clear causal analysis, concrete behavioral change afterward
   - *Weak signal:* Cannot name a specific mistake; describes a minor issue to avoid vulnerability

8. "How do you stay current in [relevant technical area]? Give me a specific example of something you learned recently and applied."
   - *Strong signal:* Named sources, applied learning in a specific project with a concrete outcome
   - *Weak signal:* "I read blogs" with no specifics; no applied example

---

## 6. Full Interview Scorecard

Complete one scorecard per interview round. Collect all scorecards before the debrief.

```
INTERVIEW SCORECARD
===================
Candidate:         ______________________
Interviewer:       ______________________
Round:             ______________________
Date:              ______________________
Interview format:  ______________________

COMPETENCY RATINGS
Rate each dimension independently. Do not average.
Scale: 1 = Strong No Hire | 2 = No Hire | 3 = Hire | 4 = Strong Hire

                          1    2    3    4    Notes
Coding / Technical skill  [ ]  [ ]  [ ]  [ ]  ___________________________
Problem solving           [ ]  [ ]  [ ]  [ ]  ___________________________
System design             [ ]  [ ]  [ ]  [ ]  ___________________________  
Code quality              [ ]  [ ]  [ ]  [ ]  ___________________________
Debugging                 [ ]  [ ]  [ ]  [ ]  ___________________________
Communication             [ ]  [ ]  [ ]  [ ]  ___________________________
Ownership                 [ ]  [ ]  [ ]  [ ]  ___________________________
Collaboration             [ ]  [ ]  [ ]  [ ]  ___________________________

SPECIFIC EVIDENCE
What did the candidate do or say that drove your rating?
(Required — write observable behaviors, not impressions)

Strongest signal (positive):
___________________________________________________________________________

Strongest concern or gap:
___________________________________________________________________________

OVERALL RECOMMENDATION
[ ] Strong Hire    [ ] Hire    [ ] No Hire    [ ] Strong No Hire

OVERALL RECOMMENDATION RATIONALE
(Required — 3–5 sentences minimum. State your recommendation, the evidence
that supports it, and the specific gap or risk if not a Strong Hire)
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________

Level signal: This candidate demonstrated [ L_ / L_ ] level behaviors.

SHOULD INTERVIEWERS DISCUSS BEFORE DEBRIEF? 
[ ] No — I have a clear independent signal
[ ] Yes — I need context on [specific area] to complete my assessment
```

---

## 7. Hiring Recommendation Framework

| Recommendation | Meaning | When to use |
|---------------|---------|-------------|
| **Strong Hire** | Confident the candidate will exceed the level bar and be a high performer on the team | Evidence across 3+ competencies at above-bar level; no significant concerns |
| **Hire** | Confident the candidate meets the level bar; will perform well | Meets bar on all must-have competencies; may have 1 area to develop |
| **No Hire** | Does not meet the level bar | Below bar on 1+ must-have competency, or gap too large to close quickly |
| **Strong No Hire** | Clear mismatch — well below the bar, or a specific disqualifying signal | Significant gaps across multiple competencies, or a values/behavior concern |

**Must-hire competencies for [Role] at [Level]:** [List 3–4 competencies where a No Hire score on any one of them means the overall recommendation must be No Hire, regardless of performance elsewhere. Example: "Coding and System Design are must-hire competencies for a Senior Backend Engineer. Strong performance on Behavioral dimensions cannot compensate for a No Hire on Coding."]

**Debrief rule:** A Strong Hire can override one No Hire only if: (a) the No Hire is not on a must-hire competency, and (b) the Strong Hire interviewer can articulate why the concern is not disqualifying. A Strong No Hire cannot be overridden — escalate to hiring manager.

---

## 8. Debrief Agenda

Run the debrief before scorecards are shared verbally. Everyone submits a written scorecard first.

```
DEBRIEF AGENDA — [Candidate Name]
Duration: 45 minutes
Facilitator: [Hiring Manager]

0:00 – 0:05  SCORECARD REVIEW
  Each interviewer states their overall recommendation only (no rationale yet).
  Facilitator notes alignment and disagreements on whiteboard/doc.

0:05 – 0:15  EVIDENCE ROUND
  Go around the table. Each interviewer shares:
    - Their strongest positive signal (observable behavior, not impression)
    - Their biggest concern (observable behavior, not impression)
  No discussion yet — just evidence gathering.

0:15 – 0:30  DISCUSS DISAGREEMENTS
  Address only the competency dimensions where interviewers disagree.
  Anchor discussion on: "What did you observe?" not "What do you think?"
  If interviewers assessed different competencies, disagreement may reflect
  insufficient signal — note this.

0:30 – 0:40  DECISION
  Reach a decision on overall recommendation.
  If consensus: state the recommendation and rationale.
  If not consensus: hiring manager makes the call and states why.

0:40 – 0:45  PROCESS NOTES
  - Were any questions unclear or hard to compare across candidates?
  - Any bias signals observed during the debrief? (see Section 9)
  - Feedback to improve the process for next time.
```

---

## 9. Calibration and Bias Reduction Notes

Brief every interviewer on these before they conduct their first interview for this role.

| Bias | How it manifests | Counter-measure |
|------|-----------------|-----------------|
| Halo effect | Strong performance in round 1 colors ratings in round 2 | Submit scorecard before reading others; rate each competency independently |
| Similarity bias | "I liked them" correlates with "they think like me" | Require observable evidence for every rating; check: "Is this a signal about their ability or their similarity to me?" |
| Recency bias | Final impression dominates overall rating | Take notes during the interview; write evidence immediately after; debrief uses written evidence, not memory |
| Expectation anchoring | First interviewer's opinion anchors all others | No verbal discussion between interviewers before debrief; written scorecards submitted before debrief starts |
| Culture fit as cover | "Not a culture fit" without specific behavioral evidence | "Culture fit" is not a valid dimension on this scorecard; use Collaboration and Communication with evidence |
| Credential bias | Degree or previous employer overweights rating | Do not list educational background in pre-interview briefing documents; focus on demonstrated behaviors |
| Confidence ≠ Competence | Articulate candidates rated higher regardless of correctness | Grade the answer quality, not the delivery style; use written rubrics per question |

---

## Quality Checks

- [ ] Level bar table defines a concrete floor for the level — not aspirational traits — with a comparison to one level below and above
- [ ] Every behavioral question includes explicit Strong Hire and Weak/No Hire signal descriptions — not just the question text
- [ ] Coding problem(s) include solution tiers with time and space complexity, plus a per-question rubric with behavioral anchors
- [ ] System design rubric evaluates at minimum: requirements clarification, component design, data model, scalability, and failure handling
- [ ] Scorecard uses observable behavior fields ("What did the candidate do or say") — not impression fields
- [ ] Must-hire competencies are explicitly named for the role and level
- [ ] Debrief agenda enforces written scorecard submission before verbal discussion to prevent anchoring

## Anti-Patterns

- [ ] Do not use a single behavioral anchor description per competency — you must define what Strong Hire AND No Hire look like separately, or interviewers cannot calibrate
- [ ] Do not allow "culture fit" as a standalone assessment dimension — it masks similarity bias; all judgments must use observable behavioral evidence
- [ ] Do not let interviewers share scorecard feedback before the debrief — verbal pre-debrief discussion anchors everyone to the first opinion expressed
- [ ] Do not set the same must-hire competency list for all engineering roles — a senior backend engineer and a frontend engineer have different non-negotiable competencies
- [ ] Do not skip the calibration bias notes section — interviewers who have never been briefed on halo effect, recency bias, and credential bias will reproduce them in every loop
