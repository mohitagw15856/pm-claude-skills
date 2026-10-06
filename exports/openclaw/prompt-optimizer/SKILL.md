---
name: prompt-optimizer
description: "Diagnose and rewrite an underperforming LLM prompt so it produces reliable, well-structured output. Use when asked to improve a prompt, fix a prompt that gives inconsistent or wrong results, reduce hallucination/refusals, or make output follow a format. Produces a rewritten prompt with a diagnosis of what was failing, the specific changes and why, and a small test set to verify the fix."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/prompt-optimizer.html
metadata:
  {
    "openclaw": { "emoji": "🤖" }
  }
---

# Prompt Optimizer Skill

A weak prompt fails in patterned ways — vague task, no output contract, buried instructions, no examples,
or asking for judgement with nothing to ground it. This skill diagnoses *which* failure mode is in play and
rewrites the prompt to fix it, then hands you a way to check the fix held — so "it's flaky" becomes a specific,
testable change rather than another round of fiddling.

## Working from a brief

You'll often get just the prompt and a vague "it's not working". **Always deliver a full rewrite anyway** —
infer the intended task and output from the prompt's wording, state your assumptions, and rewrite. If the
failing behaviour wasn't described, infer the most likely failure mode from the prompt's structure and say so.
Never hand back only a critique with no rewritten prompt.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The current prompt** — the exact text being used.
- **What's going wrong** — wrong answers, inconsistent format, refusals, too long/short, hallucinated facts.
- **The desired output** — what a perfect response looks like (a sample is ideal).
- **Context** — the model/runtime, whether it's one-shot or part of a chain, and any hard constraints (length, JSON, latency).

## Output Format

### Prompt Diagnosis & Rewrite

**1. Diagnosis** — the specific failure mode(s), each tied to the line that causes it:

| Symptom | Likely cause | Fix applied |
|---|---|---|
| Inconsistent format | no explicit output contract | added a schema + example |
| Hallucinated details | asked to answer without grounding | added "use only the provided context; say what's unknown" |
| Ignores an instruction | buried mid-paragraph | moved to a numbered rule near the top |

**2. Rewritten prompt** — the full new prompt in a fenced block, ready to paste. Apply the levers that fit:
role + task in the first lines, an explicit **output contract** (structure/schema + a short example), grounding
rules ("answer only from X; if unknown, say so"), constraints stated as rules not prose, and 1–3 few-shot
examples when the task needs a demonstrated pattern.

**3. What changed and why** — a short bullet list mapping each edit to the symptom it addresses.

**4. Test set** — 3–5 concrete inputs (incl. an edge case and a "should refuse / say unknown" case) and the
expected output for each, so the user can confirm the rewrite behaves before shipping.

## Quality Checks

- [ ] The rewrite has an explicit output contract (format/schema), not just a description of the task
- [ ] Each change is tied to a specific symptom — no cosmetic edits presented as fixes
- [ ] Grounding/uncertainty is handled (the model is allowed to say "I don't know")
- [ ] Few-shot examples are included only where a pattern must be demonstrated, not by default
- [ ] A test set with at least one edge case and one negative case is provided
- [ ] The prompt is ready to paste — no placeholders left unfilled

## Anti-Patterns

- [ ] Do not return a critique without the rewritten prompt — the rewrite is the deliverable
- [ ] Do not pile on every technique at once — apply the levers that match the diagnosed failure, and say why
- [ ] Do not add examples that contradict the instructions — the model copies the example over the rule
- [ ] Do not make the prompt longer when the fix is to make instructions clearer and earlier
- [ ] Do not claim a fix works without a way to test it — ship the test set

## Based On

Prompt-engineering practice — explicit output contracts, grounding/uncertainty handling, structured instructions, and example-driven demonstration.

## Example Trigger Phrases

- "Improve a prompt."
- "Fix a prompt that gives inconsistent."
- "Reduce hallucination/refusals."
- "Make output follow a format."
