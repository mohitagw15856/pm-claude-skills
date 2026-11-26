# Retros That Change Things: Root Causes vs Symptoms

Most retro items die because they treat symptoms ("communicate better!") and skip causes (the deploy window that guarantees Friday scrambles). This reference is the digging discipline for the "why did this keep happening" step.

## The symptom → cause ladder

Take any repeated complaint and climb:

> "QA is always the bottleneck" (symptom)
> → why? testing starts when everything lands at once (pattern)
> → why? stories all complete in the last two days (pattern)
> → why? nothing is demoable mid-sprint because stories are sized as full features (CAUSE — changeable)

Stop climbing at a **system property the team can change next sprint**. "People should try harder" is never a rung.

## Sorting the wall

Cluster raw retro notes into exactly three kinds:

| Kind | Test | What to do |
|---|---|---|
| **One-off** | Confluence of events, unlikely to recur | Acknowledge, don't process-ify — a rule born from one incident is bureaucracy |
| **Pattern** | Third time it's appeared (check past retros!) | Climb the ladder; this is where action items come from |
| **Constraint** | Real but outside team control (org deadline, headcount) | Name it, route it up explicitly, stop re-grieving it every retro |

## Action items that survive contact with next sprint

- **One or two, not seven.** Seven items = zero items with extra guilt.
- Each has an owner, a date, and a *visible artifact* ("demo checklist in the PR template by Tuesday" — not "improve demos").
- **Start every retro by scoring last retro's items.** A retro that doesn't check its own homework trains the team that items are theatre — this single habit predicts whether retros work at all.

## The blame smell test

If an item names a person, rewrite until it names the system: "Alex missed the config" → "config changes have no second pair of eyes before deploy." Renaming the human should change nothing about the fix; if it does, it wasn't a system fix.
