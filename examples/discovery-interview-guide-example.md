# Example: discovery-interview-guide

## What this skill does

Creates a complete discovery-interview kit: screener questions, a structured discussion guide, and per-session synthesis plus pattern-detection templates, aimed at a decision rather than general curiosity.

## How to trigger it

### Example 1: validating a problem before building

**You say:**
> "Interview guide for freelance designers about invoicing pain. The decision: whether to build invoicing into our design-handoff tool. I can recruit from our user base."

**Claude produces (excerpt):**

### Discovery Interview Guide: freelancer invoicing

**Research Goal:** decide whether invoicing inside [product] is worth building, or a distraction.
**Target Participant Profile:** freelance designers, 2+ years, invoicing clients directly.

**Screener Questions:**
1. "How many client invoices did you send last month?" → must be 2+
2. "Do you invoice through an agency or platform that handles it for you?" → disqualify if yes
3. "Which tool do you currently use to invoice?" → record; disqualify none

**Interview Guide (excerpt):**
- Warm-up: "Walk me through the last invoice you sent, from deciding to send it to the money arriving."
- Problem exploration: "What happened the last time an invoice was paid late?" / "What have you tried to fix that?"
- (Avoid: "Would you use invoicing inside [product]?", a future-promise question)

**Synthesis Template** (after each session):
- Key quote: "[verbatim]"
- Core pain: [one sentence] | Intensity (1-5): [ ]
- Current workaround: [tool or habit, and what it costs them]

### Example 2: pattern detection after the sessions

**You say:**
> "I ran 7 interviews with the guide. Filling your pattern template: late payment pain in 6 of 7, intensity 4+; but 5 of 7 already use [tool] and call it 'fine'. What does the synthesis say?"

**Claude produces (excerpt):**

**Pattern Detection:**
- Pain mentioned by 6/7: late payment and the awkwardness of chasing, intensity 4.1 average
- Workaround used by 5/7: [tool], described as "fine", switching energy low
- Most emotionally charged moment: chasing a £3,000 invoice from a long-term client

**Read for the decision:** the pain is real but the *invoice creation* job is already served. The underserved slice is *chasing*: nobody's tool makes the awkward reminder easy. Recommendation: test a chasing feature, not full invoicing; 2-week concept test before any build.

## Tips for best results

- Name the decision the research informs; the guide bends every question toward it.
- Recruit on behaviour (sent 2+ invoices) not identity (calls themselves a freelancer).
- Fill the synthesis template the same day as each interview; recall decays fast.

## Related skills

- `user-interview-synthesis` to merge the completed sessions into findings
- `assumption-mapper` to pick which assumption the interviews should attack first
