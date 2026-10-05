---
name: agent-observability-spec
description: "Specify the tracing, metrics, and alerting for an AI agent or LLM feature in production. Use when asked what to log for an LLM app, design agent tracing or spans, define quality and cost monitors, or answer 'how do we know if the agent is misbehaving?'. Produces an observability spec with a trace schema, metric definitions with owners and alert thresholds, sampling and retention policy, and a privacy note for logged content."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agent-observability-spec.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Agent Observability Spec Skill

You can't fix what you didn't record. For LLM systems the unit of observability is the *trace* — everything the model saw and did — because behaviour, not uptime, is what fails. This skill specifies what to capture, what to compute from it, and when to page someone.

> **Not quite this?** Use `agent-spec` when you are specifying what the agent should do before it is built.

## What This Skill Produces

- A **trace schema**: per-request spans and the fields each must carry
- **Metric definitions** across health, quality, cost, and behaviour — each with a threshold and owner
- A **sampling and retention policy** that keeps cost sane and debugging possible
- A **privacy note**: what logged content contains, who can see it, and how long it lives

## Required Inputs

Ask for (if not already provided):
- **The system's shape** — single LLM call, RAG pipeline, or multi-step tool-using agent
- **Traffic volume and cost sensitivity** — full tracing at 10M req/day is a budget decision
- **What "misbehaving" means here** — the two or three failure modes that matter most (wrong facts? wrong actions? cost? refusals?)
- **Existing observability stack** (Datadog, Langfuse, OTel, homegrown) — spec into it, not around it

## Trace Schema

Every request produces one trace; every model call, retrieval, guardrail check, and tool execution is a span. Minimum fields:

| Span | Must capture |
|---|---|
| **Request root** | request id, user/session (pseudonymous), feature + prompt version, model id, total tokens, total cost, latency, terminal status |
| **Model call** | full input context (or content-addressed ref), output, finish reason, tokens in/out, cached-token share, temperature |
| **Retrieval** | query, top-k ids + scores, which chunks entered the context |
| **Tool call** | tool name, arguments, result (or ref), duration, error |
| **Guardrail** | check name, verdict, and *what it did* (blocked / rewrote / flagged) |
| **User signal** | edits, regenerates, thumbs, abandonment — joined to the trace id |

The test of the schema: **an engineer can replay any incident from its trace alone** (see `agent-incident-postmortem`).

## Metrics and Alerts

Define four families; every metric gets a threshold, a window, and an owner.

- **Health** — error rate, p50/p95 latency, timeout rate, provider 429/5xx rate. *Page* on these.
- **Cost** — cost per request (p50, p99), tokens per request, cache hit rate, daily spend vs. budget (pair with `llm-cost-latency-budget`). *Alert* on p99 and daily-budget burn — cost incidents are caused by the tail, not the mean.
- **Quality proxies** — format/schema violation rate, refusal rate, groundedness-check failure rate, judge score on a sampled slice, regenerate/edit rate. *Alert on drift* vs. a rolling baseline: absolute thresholds go stale, deltas don't.
- **Behaviour (agents)** — steps per task, tool-error rate, loop detection (same tool + same args N times), unauthorised-action attempts caught by guardrails. *Page* on the last one.

## Sampling & Retention

- **Metadata for 100%** of requests (ids, versions, tokens, cost, status) — this is cheap and non-negotiable.
- **Full content traces:** 100% for errors, guardrail hits, and negative user signals; [1-10]% random sample for the rest, adjusted to volume.
- **Retention:** full content [30-90] days, metadata [12+] months for trend baselines; incident traces pinned indefinitely.
- **Privacy:** logged context contains user data — state where it lives, who has access, how deletion requests reach it, and that traces are scrubbed or access-gated before wide sharing.

## Output Format

### Observability Spec: [feature/agent]

**System shape:** [calls/pipeline/agent] · **Volume:** [req/day] · **Stack:** [tooling]

**Trace schema:** [the span table, tailored]

**Metrics:**
| Metric | Family | Threshold / baseline | Window | Alert → owner |
|---|---|---|---|---|

**Sampling & retention:** [the policy]

**Privacy:** [content classification, access, deletion path]

**Dashboards:** [the 2-3 views: live health, quality drift, cost]

**First incident drill:** pick yesterday's worst trace and confirm it can be replayed end-to-end from the stored data.

## Quality Checks

- [ ] Any incident is replayable from its trace alone — the schema was tested against that bar
- [ ] Every metric has a number, a window, and a named owner — no orphan dashboards
- [ ] Quality alerts are drift-based against a rolling baseline, not absolute guesses
- [ ] Sampling keeps 100% of error/guardrail/negative-signal traces
- [ ] The privacy note exists and names retention and access — logged prompts are user data

## Anti-Patterns

- [ ] Do not log only inputs and outputs — without retrieval and tool spans, root cause analysis is guesswork
- [ ] Do not alert on mean cost or mean latency — the tail is where both incidents live
- [ ] Do not run judge-based quality scoring on 100% of traffic — sample; spend the budget on better baselines
- [ ] Do not treat observability as launch-week scaffolding — drift metrics only work with months of baseline
- [ ] Do not ship an agent that can take actions without logging the guardrail verdicts alongside the actions
