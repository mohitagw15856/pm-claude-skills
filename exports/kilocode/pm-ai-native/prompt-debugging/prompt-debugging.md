# Prompt Debugging

When a prompt misbehaves, most people randomly reword it until something sticks — slow, and it doesn't teach you anything. Prompts fail in diagnosable ways: ambiguity, missing context, a format the model can't follow, or instructions that contradict each other. This finds the actual failure, applies the targeted fix, and names the principle — so you fix it once and stop hitting the same wall.

## What This Skill Produces

- **A diagnosis** — the specific failure mode: ambiguous ask, missing context, unspecified output format, conflicting instructions, buried key instruction, or too much at once
- **The targeted fix** — the change that addresses *that* failure, not a superstitious reword
- **A corrected prompt** — rewritten to fix the diagnosed problem, with the change explained
- **A generalization check** — testing that the fix works across cases, not just the one example (the trap of overfitting to a single output)
- **The principle** — the underlying rule (be specific, show the format, resolve conflicts, front-load the key instruction) so you recognize it next time
- **When it's the model, not the prompt** — the honest call when the task is beyond what prompting fixes

## Required Inputs

Ask for these if not provided:
- **The prompt** — the actual text that's misbehaving
- **What it's doing wrong** — ignoring an instruction, wrong format, inconsistent, off-topic
- **What you want** — the correct output, ideally with an example
- **The pattern** — does it fail always or sometimes (points at ambiguity vs. a hard miss)

## Framework: Diagnose Before You Reword

1. **Name the failure mode.** Match the symptom to a cause — ignored instructions often mean it's buried or conflicting; inconsistent output usually means ambiguity; wrong shape means the format wasn't specified.
2. **Fix that cause specifically.** Ambiguous → add specificity; missing context → add it; no format → show the exact format; conflict → resolve it; buried → move the key instruction up front.
3. **Show, don't just tell.** For format and quality problems, an example of the desired output fixes more than paragraphs of description.
4. **Check it generalizes.** Re-test on several cases — a fix that only works on your one example is overfitting, not a fix.
5. **Extract the principle.** Name the rule behind the fix so the next prompt starts right.
6. **Know when to stop.** If the task genuinely exceeds the model or needs tools/context it can't have, say so instead of endless rewording.

## Output Format

### Prompt debug: [what's failing]

**Diagnosis:** [the specific failure mode — ambiguity / missing context / no format / conflict / buried / overloaded].
**The fix:** [the targeted change for that cause].
**Corrected prompt:**
> [rewritten prompt].

**Generalization check:** [test across cases, not just the one example].
**Principle:** [the rule — so you avoid it next time].
**If it's not the prompt:** [when the task exceeds prompting → what's actually needed].

## Quality Checks
- [ ] Diagnoses a specific failure mode before rewriting
- [ ] Applies the fix that matches the cause
- [ ] Uses an example where the problem is format/quality
- [ ] Checks the fix generalizes beyond one case
- [ ] Names the principle; flags when it's a model limit, not a prompt one

## Anti-Patterns
- **Randomly rewording** until something works, learning nothing.
- **Fixing to one example** and overfitting.
- **Adding more words** when the issue is a conflict or buried instruction.
- **Describing the format** instead of showing it.
- **Blaming the model** when the prompt is fixable — or the reverse.

## Example Trigger Phrases
- "Why isn't my prompt working?"
- "The AI keeps ignoring one of my instructions — why?"
- "My prompt gives me different results every time."
- "Help me fix this prompt, it's not doing what I want."
- "How do I get consistent output from this prompt?"
