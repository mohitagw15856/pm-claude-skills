---
name: ai-agent-reliability
description: "Make an AI agent or automation reliable enough to trust — the tests, checks, and guardrails that catch its failures before they reach anything real. Use when asked how do I test my AI agent, make my automation reliable, my agent works sometimes, or how do I trust an AI workflow in production. Produces a map of where the agent can fail (bad input, hallucination, wrong tool call, edge cases, silent errors), the checks that catch each (validation, evals on real cases, human-in-the-loop gates, monitoring), a right-sized reliability plan scaled to the stakes, and a rollout that earns trust incrementally — so an agent that works in a demo becomes one that works in reality. For builders putting AI agents into real workflows."
---

# AI-Agent Reliability

An AI agent that works in a demo and one you can trust in production are different things — the gap is everything that happens when input is messy, the model hallucinates, a tool call goes wrong, or an error fails silently. This maps where your agent can fail and the specific checks that catch each, scaled to the stakes, plus a rollout that earns trust incrementally — so "works sometimes" becomes "works reliably."

## What This Skill Produces

- **A failure map** — where this agent can go wrong: bad/unexpected input, hallucinated output, wrong or malformed tool calls, unhandled edge cases, silent failures, and runaway loops
- **The catching checks per failure** — input validation, output verification, evals on real cases, schema/format checks on tool calls, human-in-the-loop gates, and monitoring/alerts
- **An eval approach** — testing on a real set of cases (including the hard ones) so quality is measured, not assumed, and regressions are caught
- **Human-in-the-loop placement** — where a human must approve, scaled to consequence (irreversible/external actions gated, low-stakes automated)
- **A right-sized plan** — reliability effort matched to the stakes, not gold-plating a low-risk toy or under-testing a high-risk system
- **A trust-building rollout** — shadow mode → low-stakes → expand, with monitoring, rather than shipping it everywhere and hoping

## Required Inputs

Ask for these if not provided:
- **The agent** — what it does, what tools/actions it takes, what it touches
- **The stakes** — what a failure costs (drives how hard to test and gate)
- **Where it fails now** — the flakiness you've seen (points at the weak spots)
- **Your setup** — the framework/tools, and whether you can add evals/monitoring

## Framework: Map Failures, Catch Each, Earn Trust

1. **Enumerate the failure modes.** Walk the agent's path — input, reasoning, tool calls, output, actions — and name where each step can break. You can't guard what you haven't named.
2. **Attach a check to each.** Validation for input, verification for output, schema checks for tool calls, evals for quality, gates for consequential actions — a specific catch per failure.
3. **Build real evals.** A set of representative and hard cases, scored — so you know it works and catch regressions before users do.
4. **Gate by consequence.** Irreversible or external actions get a human check; low-stakes steps run free. Match the gate to the cost.
5. **Right-size it.** Don't over-engineer a low-risk helper or under-test a system that moves money or data — effort follows stakes.
6. **Roll out to earn trust.** Shadow mode, then low-stakes live, then expand — with monitoring and alerts — so reliability is proven, not assumed.

## Output Format

### Agent reliability: [what it does] · stakes [level]

**Failure map:** [bad input · hallucination · wrong tool call · edge cases · silent errors · runaway loops].
**Catch each:** [failure → the check: validation / verification / schema / eval / human gate / monitor].
**Evals:** [the real + hard cases to test on, scored].
**Human gates:** [the consequential actions that need approval].
**Right-sized:** [effort matched to stakes — where to invest, where not].
**Rollout:** [shadow → low-stakes → expand, with monitoring].

## Quality Checks
- [ ] Enumerates failure modes across the agent's whole path
- [ ] Attaches a specific check to each failure
- [ ] Includes evals on real and hard cases, scored
- [ ] Gates consequential actions with a human; automates low-stakes
- [ ] Scales effort to stakes; rolls out to build trust incrementally

## Anti-Patterns
- **Shipping a demo** as if it's production-ready.
- **No evals** — quality assumed, regressions invisible.
- **The same trust level** for a summary and a money transfer.
- **Gold-plating a toy** or under-testing a high-stakes system.
- **Big-bang launch** with no shadow mode or monitoring.

## Example Trigger Phrases
- "How do I test my AI agent so I can actually trust it?"
- "My automation works sometimes — how do I make it reliable?"
- "How do I put an AI workflow into production safely?"
- "What checks does my agent need before I let it run on real data?"
- "How do I know my agent won't do something dumb and irreversible?"
