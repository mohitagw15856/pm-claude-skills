---
aliases: ["Couch-to-Goal Runner"]
tags: [pm-skills, skill]
skill: couch-to-goal-runner
description: "Build a beginner running plan from wherever you are to a real goal — first nonstop mile, 5K, or 10K — that builds up slowly enough to avoid injury. Use when asked for a couch to 5k plan, help me start running, train for a [distance], or a running plan for beginners. Produces a week-by-week walk/run progression to the goal, session detail, pacing and form basics, rest and cross-training, and an injury-prevention note — with a 'check with a doctor if you have health conditions' flag."
---

# Couch-to-Goal Runner

Beginners quit running from doing too much too soon and getting hurt or discouraged. This builds a gradual walk/run progression to your actual goal, increasing load slowly enough that your legs keep up, with honest pacing advice (slower than you think), built-in rest, and a plan for the aches — so you reach the finish line instead of the injury bench.

## What This Skill Produces

- **A week-by-week plan** — walk/run intervals progressing to the goal distance, at a realistic timeline
- **Session detail** — what each run looks like (warm-up, intervals, cool-down)
- **Pacing & form basics** — the "too slow feels right" conversational pace, and a few form cues
- **Rest & cross-training** — recovery days and low-impact alternatives to protect the build
- **Injury prevention** — the 10%-ish weekly progression rule, warning signs, and when to back off
- **A safety flag** — check with a doctor first if you have relevant health conditions

## Required Inputs

Ask for these if not provided:
- **The goal** — first nonstop mile, 5K, 10K, or a time
- **Starting point** — current activity, can you walk 30 min, run at all
- **Timeline** — target date or how many weeks
- **Days/week** — how often you can train
- **Limits** — injuries, weight/joint concerns, health conditions

## Framework: Slow Build, Stay Healthy

1. **Start where they are.** Meet the current fitness honestly — walk/run intervals for true beginners, not day-one 5Ks.
2. **Progress gradually.** Increase running time/distance slowly (roughly ≤10%/week) — the single biggest injury-preventer.
3. **Pace easy.** Beginners run too fast; prescribe a conversational pace and reassure that slow is correct.
4. **Build in rest.** Non-consecutive run days, recovery, and optional cross-training protect the adaptation.
5. **Watch for injury.** Distinguish normal soreness from pain; sharp/persistent pain = back off, not push through. Flag doctor clearance for conditions.

## Output Format

### Plan: [current level] → [goal] · [days/week] · [timeline]

**Week-by-week**
- Wk 1: [e.g. run 1 min / walk 2 min ×8] · Wk 2: … · … → Wk N: [goal].

**Each session:** warm-up walk → intervals → cool-down. Pace: [conversational].
**Rest & cross-train:** [rest days + low-impact options].
**Form cues:** [posture, cadence, relaxed].
**Injury watch:** progress ≤~10%/week · [normal soreness vs stop-signs].

> If you have health conditions or are returning from injury, check with a doctor before starting.

## Quality Checks
- [ ] Plan starts at the person's real current level
- [ ] Weekly progression is gradual (~10% rule)
- [ ] Prescribes an easy, conversational pace
- [ ] Includes rest days and cross-training
- [ ] Distinguishes soreness from injury and says when to back off
- [ ] Flags doctor clearance for health conditions

## Anti-Patterns
- **Too much too soon** — the classic beginner injury.
- **No walk breaks** for a true beginner.
- **Pacing too fast** — leaving out the "slow is right" message.
- **No rest days** — back-to-back hard runs.
- **"Run through the pain"** — ignoring injury signals.

## Example Trigger Phrases
- "I want to go from couch to 5K — build me a plan."
- "Help me start running, I can barely jog a minute."
- "Train me for a 10K in 12 weeks."
- "Beginner running plan, 3 days a week, bad knees."
- "I want to run a nonstop mile — where do I start?"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
