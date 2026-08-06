---
trigger: model_decision
description: "Reconstruct where you were and what's next after an interruption, so a broken focus doesn't cost you the whole thread. Use when asked where was I, I got interrupted and lost my place, help me pick back up, or I forgot what I was doing. Produces a quick rebuild of the task's state from what you remember (what you'd done, what you were mid-thought on), the single next action to re-enter it, and a 'breadcrumb' habit for next time — cutting the expensive re-immersion cost that interruptions inflict, especially on ADHD brains."
---

# Context-Switch Recovery

An interruption doesn't just cost the minute it took — it costs the ten minutes of re-immersion to find your place again, and for some brains the thread is just *gone*. This rebuilds it fast: from whatever you remember, it reconstructs what you'd done and what you were mid-thought on, hands you the single action to re-enter the task, and sets a breadcrumb so the next interruption costs less.

## What This Skill Produces

- **The reconstructed state** — what you'd already done, what you were in the middle of, and what was next, rebuilt from your fragments
- **The re-entry action** — the single next move to get back *in*, not just oriented
- **The lost thread, recovered** — the mid-thought or half-idea you were about to lose, captured
- **A breadcrumb for next time** — a tiny habit (a one-line "I'm here, next is X" note) so future interruptions cost less

## Required Inputs

Ask for these if not provided:
- **What you were doing** — the task, as much as you recall
- **What you remember doing last** — the last thing you completed or touched
- **Any half-thought** — what you were about to do or think when interrupted
- **How long you've been away** — a minute or since yesterday

## Framework: Rebuild, Re-Enter, Breadcrumb

1. **Reconstruct from fragments.** From whatever the person remembers, rebuild the task's state — done, in-progress, next — so the picture reforms.
2. **Recover the lost thread.** Prompt for the half-formed thought or intention they were mid-way through, before it evaporates — that's the expensive part.
3. **Give one re-entry action.** Not "resume the project" — the specific next move that drops them back into flow (reopen X, reread the last line, do the next tiny bit).
4. **Make re-entry easy.** The action should require re-immersion, not re-deciding — lower the cost of getting back in.
5. **Set a breadcrumb.** Teach the one-line "parking note" habit — before any interruption, jot "I'm here, next is X" — so the next recovery is instant.

## Output Format

### You were: [the task]

**Reconstructed state:** done [x] · mid-way on [y] · next was [z].
**The thing you were about to lose:** [the half-thought, captured].
**👉 Re-enter with:** [the single concrete action to get back in].

**Breadcrumb for next time:** before you get pulled away, drop one line — "I'm here, next is ___" — and recovery is instant.

## Quality Checks
- [ ] Rebuilds the task state from the person's fragments
- [ ] Recovers the half-formed thought before it's lost
- [ ] Gives one concrete re-entry action, not "resume"
- [ ] The action aids re-immersion, not fresh decisions
- [ ] Teaches the breadcrumb habit for next time

## Anti-Patterns
- **"Just pick up where you left off"** — that's the problem, not the fix.
- **Orienting without a re-entry action.**
- **Missing the half-thought** the person was about to lose.
- **A heavy note-taking system** instead of a one-line breadcrumb.

## Example Trigger Phrases
- "I got interrupted and completely lost my place — where was I?"
- "Help me pick back up on what I was doing before that call."
- "I forgot what I was working on. Here's what I remember…"
- "I was mid-thought and got pulled away — help me recover it."
- "How do I get back into this after being distracted?"
