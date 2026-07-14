---
name: discovery-interview-guide
description: "Create a structured user discovery interview guide with screener questions, a discussion guide, and a synthesis framework. Use when planning user interviews, customer discovery sessions, Jobs-to-be-Done research, or problem validation. Produces a complete guide covering warm-up, problem exploration, and a per-session synthesis template."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/discovery-interview-guide.html
metadata:
  {
    "openclaw": { "emoji": "🔍" }
  }
---

# Discovery Interview Guide Skill

Design interviews that surface genuine insight — not validation of what you already believe. Every guide follows a story-based, past-behaviour-focused structure.

## Core Principles

1. **Never ask about the future.** "Would you use X?" tells you nothing. "Tell me about the last time you did X" tells you everything.
2. **Interview for behaviour, not opinion.** Opinions are cheap. Behaviour is evidence.
3. **The 5 Whys.** Every surface answer is a door. Keep opening doors.
4. **Confirm the problem before exploring the solution.** Never show a prototype until you've confirmed the pain exists unprompted.

## Interview Structure (60 minutes standard)

### 1. Warm-Up (5 min)
Build rapport. Get them talking. Don't discuss the topic yet.
- "Tell me a bit about your role and what a typical week looks like for you."
- "What tools do you rely on most day-to-day?"

### 2. Context Setting (10 min)
Understand their world before diving into the problem space.
- "Walk me through how you currently [handle the domain area]."
- "What does that process look like from start to finish?"
- "Who else is involved when you do this?"

### 3. Problem Exploration (25 min) — THE CORE
Surface pain without leading.
- "Tell me about the last time you had to [relevant task]. What happened?"
- "What was the hardest part of that?"
- "How did you handle it?"
- "What did you try before settling on that approach?"
- "What does it cost you when this goes wrong?" (time, money, stress, reputation)
- "If you could wave a magic wand and change one thing about this process, what would it be?"

⚠️ **Do not mention your product or feature during this phase.**

### 4. Current Solutions (10 min)
Understand the competitive landscape from their perspective.
- "What tools or workarounds do you use today for this?"
- "What do you like about [current solution]? What frustrates you?"
- "Have you tried other approaches? What happened?"

### 5. Wrap-Up (10 min)
- "Is there anything about this topic we haven't covered that you think I should know?"
- "Is there anyone else you'd recommend I speak to?"
- "Would you be open to a follow-up if I have more questions?"

---

## Output Format

### Discovery Interview Guide — [Topic] — [Date]

**Research Goal:** [One sentence: what decision will this research inform?]
**Target Participant Profile:** [Role, company size, behaviour qualifier]

**Screener Questions** (for recruiting):
1. [Question] → Must answer: [Y/N or specific]
2. [Question] → Must answer: [Y/N or specific]
3. [Disqualifier question] → Disqualify if: [answer]

**Interview Guide:**

[Full structured guide using the format above, customised to the specific research topic]

**Synthesis Template** (fill after each interview):
- Key quote: "[verbatim]"
- Core pain: [1 sentence]
- Current workaround: [what they're doing today]
- Intensity (1–5): [how painful is this?]
- Surprise/unexpected finding: [anything that challenged your assumptions]

**Pattern Detection** (after 5+ interviews):
- Pain mentioned by [X/N] participants: [theme]
- Workaround used by [X/N] participants: [theme]
- Most emotionally charged moment in interviews: [observation]

---

## Required Inputs

Ask the user for these if not provided:
- **Research topic or question** (what decision will this inform?)
- **Target participant profile** (role, behaviour, company type)
- **Session length** (30 / 45 / 60 / 90 minutes)
- **Number of interviews planned**
- **Known hypotheses to test or avoid confirming prematurely** (optional)

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Behavioural anchoring | Questions are hypothetical ("Would you use…?") or answerable yes/no | Mostly past-tense, but a few opinion or future-tense questions slipped into the core section | Every problem question is anchored to a specific past event ("tell me about the last time…") and open-ended |
| Solution containment | The product or feature appears in the screener or early questions, anchoring every answer | Product withheld from questions but the guide gives the interviewer no script for when participants ask what's being built | Product absent from all phases before pain is confirmed, with an inline interviewer note and deflection script guarding the boundary |
| Screener selectivity | Screeners are self-assessments anyone can pass ("Are you responsible for X?") | Screeners qualify on role and firmographics but include no behaviour check or disqualifier | Screeners qualify on recent, verifiable behaviour, include an explicit disqualifier, and would be hard to guess the "right" answer to |
| Synthesis machinery | No per-session template or pattern-detection plan; synthesis left to memory | Template exists but lacks intensity rating or surprise capture; pattern thresholds not tied to planned interview count | Per-session template with anchored intensity scale and surprise field, plus pattern detection gated at 5+ interviews with X/N counts matched to the planned sample |

## Quality Checks

- [ ] No future-tense questions ("would you...") — only past-behaviour questions
- [ ] Product or solution not mentioned until after pain is confirmed
- [ ] Questions open-ended (cannot be answered yes/no)
- [ ] Synthesis template included for per-session notes
- [ ] Screener questions identify and disqualify wrong participants

## Guidelines

- Recommend 5–8 interviews to reach thematic saturation for most discovery questions
- Always record with permission — transcripts beat notes
- If user is new to interviewing: remind them to stay silent after asking a question (aim for 80/20 participant-to-interviewer talking ratio)
- Never synthesise during the interview — do it after, when you can look across sessions
- Flag confirmation bias: if user writes questions that lead toward a predetermined answer, rewrite them as open-ended alternatives

## Anti-Patterns

- [ ] Do not use future-tense questions ("Would you use this?") — hypothetical responses do not predict real behaviour and produce false confidence in an idea
- [ ] Do not mention your product or solution before problem exploration is complete — doing so anchors the participant's responses and invalidates the discovery
- [ ] Do not synthesise across fewer than 5 interviews — themes from 2–3 interviews reflect anecdote, not pattern; wait for saturation
- [ ] Do not write screener questions that are too easy to pass — if participants can guess the "right" answer, you will recruit the wrong people
- [ ] Do not treat participant opinions as evidence of future behaviour — what people say they will do consistently diverges from what they actually do
