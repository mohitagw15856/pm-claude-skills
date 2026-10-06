---
name: agent-incident-postmortem
description: "Run a blameless postmortem for an incident caused by an AI agent or LLM feature — hallucinated facts shipped to users, runaway tool use, prompt injection, cost blowouts, or wrong actions taken autonomously. Use when asked to write up an AI incident, analyse why an agent did something wrong, or produce corrective actions after an LLM failure. Produces a structured postmortem with trace reconstruction, a root-cause layer analysis, and corrective actions including a permanent regression case. For non-AI production incidents use incident-postmortem."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agent-incident-postmortem.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Agent Incident Postmortem Skill

AI incidents differ from outages: the system didn't go down — it did something wrong, confidently, and maybe only once. This skill adapts blameless postmortem practice to nondeterministic systems, where "can we reproduce it?" needs traces, not just steps.

## What This Skill Produces

- A **blameless postmortem document** with timeline and user/business impact
- A **trace reconstruction** of what the agent saw, decided, and did
- A **root-cause analysis across the AI failure layers** (not "the model hallucinated" as a conclusion)
- **Corrective actions** — always including a new permanent case in the regression suite

## Required Inputs

Ask for (if not already provided):
- **What the agent did** and what it should have done
- **The trace** — the full request: system prompt, context, tool calls and results, output. If no trace exists, that absence is itself a finding
- **Blast radius** — how many users/requests, over what window, and whether it's ongoing
- **Detection** — how it was noticed (user report? monitor? luck?) and how long after it started

## Root-Cause Layers

Walk the layers in order; the root cause is usually the *earliest* layer that could have prevented the outcome. "The model was wrong" is a starting point, never the conclusion — models are known to be fallible, so the question is what let a fallible output become an incident.

| Layer | Ask |
|---|---|
| **Input / context** | Was the context wrong, stale, contradictory, or poisoned (injection)? Did retrieval feed it bad ground truth? |
| **Model behaviour** | Given that context, was the output a foreseeable failure mode (fabrication under missing data, over-compliance with injected text)? |
| **Guardrails** | What check should have caught this output and didn't exist / didn't fire? (schema validation, groundedness check, action allow-list) |
| **Action layer** | Why could the wrong output become a real action or reach a user without the appropriate gate for its risk level? |
| **Detection** | Why did we learn about it this way, this late? What signal would have caught it in minutes? |

## Nondeterminism Discipline

- **Reproduce with the trace, not the anecdote:** replay the exact context; then re-run N times to measure frequency — a 1-in-20 failure at 10k requests/day is 500 incidents/day.
- **Pin everything when replaying:** model version, prompt version, temperature, tool results.
- **If it can't be reproduced:** say so, keep the trace as the evidence, and treat frequency as unknown — not as "rare".

## Output Format

### AI Incident Postmortem: [title] — [date]

**Severity:** [level] · **Status:** [resolved/monitoring] · **Owner:** [name]

**Summary:** [3 sentences: what the agent did, impact, root cause layer]

**Impact:** [users/requests affected, window, cost, trust/regulatory dimension]

**Timeline:** [first bad output → detection → mitigation → resolution, with the detection gap called out]

**Trace reconstruction:** [what was in the window; which tool calls ran; where the path diverged from intended behaviour]

**Root cause by layer:**
| Layer | Finding |
|---|---|
| Input/context | |
| Model behaviour | |
| Guardrails | |
| Action layer | |
| Detection | |

**Reproduction:** [replayed? failure frequency over N runs / not reproducible — evidence is the trace]

**Corrective actions:**
| Action | Layer | Owner | Due |
|---|---|---|---|
| Add this trace as a permanent regression case | eval | | |
| [guardrail/monitor/context fix] | | | |

**What went well / what got lucky:** [both, honestly]

## Quality Checks

- [ ] The postmortem is blameless toward humans *and* useful about the system — "prompt engineer error" and "model hallucinated" are both banned conclusions
- [ ] Root cause identifies the earliest layer that could have prevented impact, not just the layer that misbehaved
- [ ] The trace (or its absence) is in the document; findings cite it
- [ ] Failure frequency was measured or explicitly marked unknown
- [ ] Corrective actions include the permanent regression case and at least one detection improvement

## Anti-Patterns

- [ ] Do not close with "improved the prompt" as the only action — the same class of output must also be caught by a guardrail or gate next time
- [ ] Do not assess frequency from one replay — nondeterministic failures hide at low temperatures and reappear at scale
- [ ] Do not skip the injection question when any untrusted text (web, user docs, tickets) was in the window
- [ ] Do not let "the model will be better next version" close an action item — upgrades are migrations (see model-migration-plan), not fixes
- [ ] Do not write it as an outage report — the system was up; the failure was behavioural, and the doc must analyse behaviour

## Example Trigger Phrases

- "Write up an AI incident."
- "Analyse why an agent did something wrong."
- "Produce corrective actions after an LLM failure."
