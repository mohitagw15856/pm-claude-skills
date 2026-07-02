---
aliases: ["Executing Plans"]
tags: [pm-skills, skill]
skill: executing-plans
description: "Execute a written plan with discipline — verify each step before advancing, surface deviations instead of improvising around them, and keep a visible execution log. Use when working through a plan (yours or another agent's), resuming multi-session work, or when execution keeps drifting from what was agreed. Produces completed work plus an execution log showing what matched the plan, what deviated and why, and what the plan got wrong. Pairs with writing-plans."
---

# Executing Plans Skill

A plan's value is realised or destroyed at execution time. The two failure modes: *rigid* execution (following a plan reality has invalidated) and *drift* (quietly improvising until the work no longer resembles the plan and nobody decided that). The discipline is the same for both: deviations are decisions, made visibly.

## What This Skill Produces

- The work, executed step-by-step with per-step verification actually run
- An **execution log**: step → result → verification outcome → any deviation with its reason
- A **plan feedback note**: what the plan got wrong (feeds the next plan)

## Execution Method

1. **Load the plan and check it's still true.** Before step 1: do the plan's assumptions still hold (the branch, the data, the constraint)? A plan written yesterday can be stale today; two minutes of validation beats an hour of executing a fiction.
2. **One step, then its verification — actually run.** The verification isn't decoration: run the command, check the observable, record the result. Advancing on "that probably worked" is how step 6 fails mysteriously because step 3 silently didn't.
3. **Classify every divergence out loud.** When reality disagrees with the plan, stop and classify:
   - **Plan-preserving detail** — the plan's intent holds, the mechanics differ slightly → note it in the log, continue
   - **Plan deviation** — the approach must change for this step → *amend the plan visibly* (strikethrough + new step), state why, continue
   - **Plan invalidation** — a stop condition hit, or the goal itself is now wrong → STOP; report; replan with the human before another line of work
   The cardinal sin is treating an invalidation as a detail because stopping feels like failure.
4. **Respect the stop conditions absolutely.** They were written calm; you are now in flow and biased toward momentum. The "must not do" list doesn't bend for convenience — if it should, that's a visible plan amendment, decided, not slid into.
5. **Checkpoint on schedule.** At each planned checkpoint (or ~every 30-45 min of work): where am I vs the plan, what's the log show, is the remaining plan still right? Multi-session work ends each session with a state note: done through step N, next action, open questions — the resume beats re-derivation.
6. **Close with the feedback loop.** At completion: run the plan's DONE test (not your feeling of doneness). Then write the plan feedback: which estimates were off, which risk fired, which verification caught something. Plans improve only if execution reports back.

## Output Format

**Per step (in the log):**
`Step N: [action] → [result] · verify: [check run → outcome] · [deviation? classified + reason]`

**On completion:**
### Execution report: [plan name]
**Done test:** [the plan's test → passed/failed, evidence]
**Deviations:** [each, with classification and reason — or "none"]
**The plan was wrong about:** [feedback for the next plan]
**Follow-ups discovered (not done, not forgotten):** […]

## Quality Checks

- [ ] Every step's verification was actually executed, result recorded
- [ ] Every divergence was classified (detail / deviation / invalidation) — none absorbed silently
- [ ] Stop conditions were honoured; any override was a visible, stated decision
- [ ] Completion was declared by the plan's done-test, not by fatigue
- [ ] The plan-feedback note exists

## Anti-Patterns

- [ ] Do not improvise around a broken plan — amend it visibly or stop; silent drift is unaccountable work
- [ ] Do not skip verifications when steps "obviously worked" — the mysterious step-6 failure was born at step 3
- [ ] Do not push through a stop condition on momentum — it was written calm precisely because you wouldn't be
- [ ] Do not declare done without running the done-test — feeling-finished and being-finished diverge exactly when it matters
- [ ] Do not end a session without the state note — re-derivation is the tax on every resumed task

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
