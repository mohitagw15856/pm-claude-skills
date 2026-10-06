# Example: brief-builder

## What this skill does

Interviews you with sharp one-at-a-time questions to turn a vague request into a complete brief (goal, audience, constraints, success criteria), then hands off to the right skill, by interrogating rather than guessing.

## How to trigger it

### Example 1: "I need a deck" becomes a brief

**You say:**
> "Help me think this through: I need to make some kind of presentation about our team's work this year."

**Claude produces (excerpt):**

Two questions before anything else:

**Who sees it, and what do you want them to do afterwards?** "My team at the offsite" and "the exec review deciding next year's headcount" are different presentations wearing the same request.

*(You answer: exec review, and honestly, we're worried about a headcount cut.)*

Then the real question: **is this a review of the year, or a case for the team's existence?** Because if it's the second, the structure is an argument, not a retrospective.

*(Three more exchanges: audience is the CFO plus two VPs, 10 minutes, the CFO cares about cost per outcome, you have delivery metrics but no revenue attribution.)*

**Brief: exec presentation, team value case**
- **Goal:** protect current headcount in the January review
- **Audience:** CFO (decision-maker, cost-per-outcome lens), 2 VPs (influencers); 10 minutes + questions
- **Context / inputs:** delivery metrics available; no revenue attribution (known weakness, address head-on rather than hide)
- **Scope & format:** 6-8 slides, argument-first, not a timeline of the year
- **Voice & guardrails:** confident, no pleading; never present the team as a cost centre asking for mercy
- **Success criteria:** CFO leaves able to repeat one sentence about what the team buys the company
- **Open assumptions:** 10-minute slot (confirm); CFO has seen last year's numbers (confirm)

**Handoff:** → run `qbr-deck` for the structure, with `executive-summary` for the one-slide version you'll be asked for afterwards. Proceed?

### Example 2: catching the wrong task before it's done well

**You say:**
> "Write a job ad for a marketing person for my shop."

**Claude produces (excerpt):**

One question first: **what's the work?** List what this person would actually do in week one.

*(You answer: run our Instagram, maybe some flyers, update the website sometimes. About 10 hours a week of stuff.)*

That answer changed the task: 10 hours a week of defined tasks is a freelancer or agency brief, not an employee job ad; hiring an employee for it would be the expensive way to get it done. 

**Brief (revised task): freelance social media brief**
- **Goal:** consistent Instagram presence (3 posts/week) within 10 hrs/week budget
- **Open assumptions:** budget ceiling unstated; monthly or hourly preferred?

**Handoff:** → a freelance brief + `outreach-message` for contacting candidates. The job ad is still available if you want an employee anyway, but now it's a choice, not a default.

## Tips for best results

- Answer the questions one at a time rather than demanding the list; the next question depends on your last answer.
- Say the uncomfortable part (the real stakes, the fear); briefs built on the polite version miss the goal.
- Challenge the handoff if it feels wrong; naming the wrong skill cheaply is the point of doing it now.

## Related skills

- `which-skill` when you know the task and just need routing, no interview
- `prd-template` as a common destination once a product brief is built
