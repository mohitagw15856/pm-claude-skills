# The incident-response spine — shared vocabulary & handoffs

Reference consulted by the four skills that run the reliability loop:
[`slo-error-budget`](../../skills/slo-error-budget/SKILL.md) frames it, then
[`debugging-log-analyser`](../../skills/debugging-log-analyser/SKILL.md) →
[`incident-postmortem`](../../skills/incident-postmortem/SKILL.md) →
[`oncall-runbook`](../../skills/oncall-runbook/SKILL.md) run on each incident.

Single source of the shared terms and the handoff artifacts. Consult it; don't
restate it inside each skill. When any of the four uses a term below, it means exactly
this.

## The loop

Reliability is a loop, not a line: the error budget decides how hard you prevent, an
incident is diagnosed, the postmortem turns it into fixes, the runbook captures the
response — and the runbook's gaps and the postmortem's action items feed back into
the budget's priorities.

```
slo-error-budget ──▶ [budget: how much failure is allowed, how much to spend preventing]
   incident occurs
debugging-log-analyser ──▶ [root-cause diagnosis + the fix] ──▶ incident-postmortem
incident-postmortem ──▶ [contributing factors + prioritised action items] ──▶ oncall-runbook
oncall-runbook ──▶ [the entry that makes the next responder minutes, not hours]
   └────────────── action items' priority governed by the error budget ──────────────┘
```

`slo-error-budget` is the governor the whole loop runs inside — it decides whether a
postmortem's action items get done now (budget spent) or deferred (budget healthy).
A skill run standalone still works; when an upstream artifact exists, **read it
instead of re-deriving** — re-diagnosing in the postmortem what the log analysis
already found is the ops version of asking a question the logs already answered.

## Shared vocabulary

- **SLO (service level objective)** — the target for a user-facing reliability metric
  (e.g. 99.9% of requests succeed), chosen from what users actually need, not from
  100%. The line the whole loop defends.
- **Error budget** — the allowed shortfall from 100% (a 99.9% SLO budgets 0.1%
  failure). It converts reliability from a feeling into an account: budget remaining →
  ship features; budget spent → stop and fix. It's the objective forcing function
  behind which postmortem action items get done.
- **Incident** — an unplanned degradation of a user-facing service past a threshold.
  Defined by *user impact*, not by whether an alert fired.
- **Detection time / mitigation time / resolution time** — how long from start to
  *noticed*, to *impact-stopped*, to *fully-fixed*. Mitigation (stop the bleeding) and
  resolution (root cause fixed) are different events and are tracked separately.
- **Root cause vs contributing factors** — the root cause is the change or condition
  that made the failure possible; contributing factors are what let it reach users and
  persist (the missing alert, the skipped canary, the unclear runbook). A postmortem
  that names one root cause and no contributing factors hasn't looked hard enough.
- **Blameless** — the postmortem examines the *system* that let a competent person
  make the move, never the person. "Blameless" is not "consequence-free"; it's
  "the failure is a property of the system, so fix the system." The precondition for
  honest incident data.
- **Action item** — a specific, owned, dated change that prevents recurrence or speeds
  detection/mitigation. Named without an owner and a date, it's a wish, and it decays.
- **Runbook entry** — the steps that let the *next* on-call responder detect, mitigate,
  and escalate a known failure in minutes without paging an expert. The postmortem's
  learnings, made operational.

## The honesty rule the whole spine enforces

Blameless is the load-bearing one: the moment a postmortem assigns blame, the honest
data dries up and every future incident is under-reported. Alongside it: timings are
measured, not estimated to flatter; action items carry owners and dates or they don't
count; and the error budget reflects real reliability, not the number that justifies
this quarter's roadmap.
