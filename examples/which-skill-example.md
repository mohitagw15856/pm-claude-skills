# Example: which-skill

## What this skill does

Routes a fuzzy request to the right skill in this library: a best-fit recommendation with the inputs to gather first, a runner-up with the tie-breaker condition, and a multi-skill recipe when the job spans several.

## How to trigger it

### Example 1: a task that could match several skills

**You say:**
> "Which skill should I use? I have a pile of customer feedback from our NPS survey and support tickets, and leadership wants to know what to build next quarter."

**Claude produces (excerpt):**

### Skill Recommendation

**Best fit:** `user-research-synthesis`: your input is mixed sources (survey + tickets), and its output is themed insights with prevalence, which is what "what should we build" needs as its evidence layer.

**Before you run it, have ready:**
- The raw verbatims and tickets (exported, not summarised)
- The question leadership is actually asking, in one sentence
- Any segment labels (plan tier, account size) attached to the feedback

**Runner-up:** `user-interview-synthesis`: pick this instead if the real input turns out to be interview transcripts; it handles quotes-per-theme more rigorously but expects conversational data.

**This is a multi-skill job**: the full chain is `user-research-synthesis` → `feature-prioritisation` → `roadmap-narrative`, because leadership asked a prioritisation question, not a research question: the synthesis gives you themes, the prioritisation turns them into a ranked quarter, and the narrative makes it presentable. Run them in that order and each output feeds the next.

**Run it:** `/user-research-synthesis` in Claude Code, or open it in the [Playground](https://mohitagw15856.github.io/pm-claude-skills/).

### Example 2: when the honest answer is one skill, used twice

**You say:**
> "Is there a skill for 'my boss keeps rejecting my proposals'? Not sure what I need."

**Claude produces (excerpt):**

**Best fit:** `should-i-send-this` is tempting but wrong; rejection of proposals is rarely a tone problem. The likelier diagnosis: the proposals argue your case rather than answering your boss's question. **`brief-builder`** fits best; run it on your *next* proposal before writing it, and let it interrogate what your boss's actual decision criteria are.

**Runner-up:** `red-team-my-plan`: pick this if the proposals are genuinely sound and well-aimed; it will find the objection your boss keeps seeing that you don't.

**The tie-breaker:** look at the last rejection's wording. "Not now / no budget" points to brief-builder (wrong framing for the audience); "this won't work because..." points to red-team (a substance gap you keep missing).

## Tips for best results

- Describe the task and what you'll do with the output; routing depends on the destination, not just the input.
- Say what you have (transcripts, tickets, a spec); available inputs often decide between near-identical skills.
- Ask for the chain when the ask involves "and then present it"; most leadership requests are multi-skill jobs.

## Related skills

- `brief-builder` when the request is too vague even to route; it interviews first
- `writing-great-skills` when no skill fits and the answer is to write one
