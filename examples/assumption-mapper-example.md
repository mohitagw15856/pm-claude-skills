# Example: assumption-mapper

## What this skill does

Extracts the hidden assumptions in a brief or PRD, scores each for confidence and impact, and tells you which three to validate first and how.

## How to trigger it

### Example 1: auditing a PRD before build

**You say:**
> "Find the assumptions in this brief: 'We're adding an AI summary at the top of every support ticket so agents resolve tickets 20% faster. Agents will trust the summary and stop reading full threads.'"

**Claude produces (excerpt):**

### Assumption Map: AI ticket summaries

| Assumption | Category | Confidence | Impact | Priority | Validation Method |
|---|---|---|---|---|---|
| Agents will trust AI summaries enough to act on them | Desirability | 2 | 5 | 1 | Shadow test with 5 agents for one week |
| Reading the thread is the main time cost in resolution | Viability | 2 | 5 | 2 | Time-on-task analysis of 50 recorded resolutions |
| Summaries can be accurate enough on messy threads | Feasibility | 3 | 5 | 3 | Offline eval on 200 historical tickets |
| 20% faster resolution is attainable from this change alone | Viability | 1 | 4 | 4 | Baseline split by ticket type first |

#### Critical Assumptions (Impact 4+, Confidence 2 or below)
Three of four qualify. The 20% target inherits all three risks; treat it as a hypothesis, not a commitment.

#### Top 3 to validate first
1. Trust: shadow test, 1 week, 5 agents. If agents re-read threads anyway, the time saving disappears.
2. Time cost: pull 50 session recordings; if reading is under 30% of handle time, cap the possible gain.
3. Accuracy: 200-ticket offline eval; below 90% usable summaries, agents will learn to ignore them.

### Example 2: a one-line idea

**You say:**
> "Assumption-map this: 'SMBs will pay £49/month for automated VAT filing.'"

**Claude produces (excerpt):**

| Assumption | Category | Confidence | Impact | Priority | Validation Method |
|---|---|---|---|---|---|
| SMBs feel VAT filing pain monthly, not quarterly | Desirability | 2 | 4 | 1 | 10 problem interviews with sole traders |
| £49/month clears their willingness to pay | Viability | 2 | 5 | 2 | Van Westendorp survey, n=80 |
| "Automated" is achievable without an accountant review step | Feasibility | 2 | 5 | 3 | Map 20 real filings for exception rate |

## Tips for best results

- Paste the actual brief text; the riskiest assumptions hide in throwaway sentences.
- Say what you already have evidence for, so known facts are not re-flagged.
- Ask for the validation plan as tickets if you want to action it immediately.

## Related skills

- `discovery-interview-guide` to run the interviews a critical assumption demands
- `red-team-my-plan` when you want attacks on the whole plan, not scored assumptions
