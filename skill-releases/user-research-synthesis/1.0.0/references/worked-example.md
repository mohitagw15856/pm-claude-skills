# Worked Example — User Research Synthesis

A gold-standard run of this skill: a mixed-method retention study (214 survey responses + 12 moderated sessions) synthesised into five evidenced themes a planning meeting can act on.

## The brief

Lingora — a fictional language-learning app with 800K MAU — has a retention cliff: 41% of new learners lapse between day 18 and day 30. Before Q1 planning, PM Yuki Tanaka ran an in-app survey (n=214: 131 lapsed, 83 active learners) and 12 moderated remote sessions (7 lapsed, 5 active; mix of travel, exam-prep, and heritage learners). Research questions: (1) why do learners stall in weeks 3–4, (2) does the streak mechanic help or hurt retention, (3) what actually triggers free→paid conversion. Leadership's pet theory going in: "the paywall is too aggressive."

## The output

```markdown
# User Research Synthesis: Week 3–4 Retention Cliff

## Research Overview
- **Date**: November 3–21, 2025
- **Methodology**: In-app survey (n=214) + 12 moderated remote sessions (45 min each)
- **Participants**: 131 lapsed / 83 active survey respondents; sessions: 7 lapsed, 5 active learners across travel (5), exam-prep (4), heritage (3) motivations
- **Research Questions**:
  1. Why do learners stall in weeks 3–4?
  2. Does the streak mechanic help or hurt retention?
  3. What triggers free→paid conversion?

## Executive Summary
The week 3–4 cliff is not a paywall problem — only 9% of lapsed survey respondents cited price. The two biggest drivers are streak-break abandonment (a single missed day converts to permanent lapse for a majority of streak-motivated learners) and content drifting away from the learner's actual goal just as novelty wears off. Conversion is triggered by external deadlines (trips, exams), not feature gates — which suggests retiming the upgrade prompt, not softening it.

## Key Themes

### Theme 1: A Broken Streak Ends the Relationship, Not Just the Streak

**Description**: For streak-motivated learners, missing one day doesn't cause a pause — it causes abandonment. Once the counter resets, the sunk-cost motivation inverts: returning means facing the loss.

**Prevalence**: 8 of 12 session participants; 61% of lapsed survey respondents selected "I broke my streak and never got back into it" as a lapse reason.

**Supporting Quotes**:
- "Day 24, I was on a flight, lost the streak. Opening the app after that just felt like looking at a gravestone." [P4, lapsed, travel learner]
- "The streak WAS the product for me. When it died, there was no reason left." [P9, lapsed, heritage learner]
- "Honestly the streak is why I'm at 212 days. I plan my evenings around it." [P2, active, exam-prep learner]

**Conflicting evidence — surfaced, not smoothed**: All 5 active session participants described the streak positively; 71% of active survey respondents called it "very motivating." The mechanic is simultaneously our best retention driver *and* our sharpest churn edge. Any fix must preserve the upside for active streakers.

**Implication**: The failure mode isn't the streak — it's the unrecoverable break. Loss-aversion works until the loss actually happens, then it works against us.

### Theme 2: Content Drifts From the Learner's Job Right as Novelty Fades

**Description**: Learners arrive with a concrete job ("order food in Lisbon in March", "pass JLPT N4 in July") but by week 3 the curriculum has them drilling grammar that feels unrelated to that job. Observation: in 6 sessions, participants scrolled past the day's assigned lesson looking for something goal-relevant before either settling or quitting.

**Prevalence**: 7 of 12 session participants; 48% of lapsed survey respondents selected "lessons stopped feeling relevant to my goal."

**Supporting Quotes**:
- "I'm going to Portugal in four months. Why am I learning the vocabulary for office furniture?" [P4, lapsed, travel learner]
- "Week one felt like it was for me. Week three felt like it was for everyone." [P11, lapsed, travel learner]

**Implication**: We capture the learner's goal at onboarding and then never use it to sequence content. The job-to-be-done isn't "learn Portuguese" — it's "be ready for a specific moment."

### Theme 3: Speaking Practice — Requested in Surveys, Avoided in Sessions

**Description**: A say/do gap. Speaking practice is the #1 survey feature request (58% of all respondents), yet 4 of the 5 session participants who had voice exercises enabled skipped them when they appeared, citing embarrassment or "not right now."

**Prevalence**: 58% survey request rate vs. 4/5 observed avoidance in sessions.

**Supporting Quotes**:
- "I definitely want more speaking practice." [P6, active — who then skipped both voice exercises during the session]
- "I'm not talking to my phone on the bus." [P8, lapsed, travel learner]

**Implication**: The stated request is real but the current interaction model doesn't fit the context of use. Interpretation (flagged as such): the underlying need is *confidence before a real conversation*, not more repeat-after-me drills. Building more of the same speaking feature would likely satisfy the survey and miss the behaviour.

### Theme 4: Conversion Follows a Deadline, Not a Feature Gate

**Description**: Upgrades cluster around external deadlines. Purchase-intent language in sessions was always tied to an event, never to hitting the free-tier ceiling.

**Prevalence**: 6 of 12 session participants described a trip or exam as their upgrade trigger; 44% of paying survey respondents upgraded within 30 days of a self-reported trip/exam date.

**Supporting Quotes**:
- "I paid the week I booked the flights. It suddenly felt like real preparation, not a hobby." [P1, active, travel learner]
- "The exam date made it a tool instead of a game." [P2, active, exam-prep learner]

**Implication**: Leadership's "paywall too aggressive" theory is not supported — 9% of lapsed users cited price. The lever is *timing*: prompting upgrade when a learner logs a goal date, not at an arbitrary lesson count.

### Theme 5: Notifications Get Muted, Then the App Disappears

**Description**: Muting notifications is an early warning signal, not a preference setting. 9 of 12 session participants had muted within the first two weeks; among lapsed participants, all 7 had muted before lapsing.

**Prevalence**: 9 of 12 sessions; survey cross-tab: lapsed respondents were 2.3× more likely to report having muted notifications.

**Supporting Quotes**:
- "It messaged me like a needy ex. Three a day. So I muted it, and then… yeah, that was kind of it." [P8, lapsed]

**Implication**: Observation: muting precedes lapse. Interpretation (flagged): current notification volume trades short-term DAU for the learner's only re-entry channel. Correlation is not proven causation — see Open Questions.

## Pain Points Summary

| Pain Point | Severity | Frequency | Current Workaround |
|------------|----------|-----------|-------------------|
| Unrecoverable streak break kills motivation | High | 8/12 sessions, 61% of lapsed | Buying streak freezes in advance (power users only) |
| Curriculum ignores stated goal after week 2 | High | 7/12 sessions, 48% of lapsed | Manually hunting the lesson library for relevant units |
| Speaking exercises unusable in public contexts | Medium | 4/5 observed skips | Skipping; one user whispers into cupped hands |
| Notification volume forces mute-or-churn choice | Medium | 9/12 sessions | Muting (which removes the re-entry channel) |

## Feature Requests

### Must-Have
1. **A way back after a broken streak** — Mentioned by 8 of 12 session participants
   - Quote: "Let me earn it back. Don't just delete a month of my life." [P4]
   - Underlying need: recoverable motivation — the counter is a proxy for self-trust, and its loss must not be terminal.

### High Value
1. **Goal-based lesson paths** — Mentioned by 7 of 12 participants
   - Quote: "Ask me why I'm here, then act like you remember." [P11]
   - Underlying need: visible progress toward a specific real-world moment, not a generic curriculum.
2. **Offline lessons** — Mentioned by 5 of 12 participants
   - Quote: "My only free 40 minutes is the train, and the train has no signal." [P7, active]
   - Underlying need: fitting practice into dead time — the request is offline mode, the job is commute-compatibility.

### Nice-to-Have
1. **Speaking practice (more/better)** — #1 survey request (58%) but see Theme 3
   - Quote: "I definitely want more speaking practice." [P6]
   - Underlying need: confidence before real conversations — do NOT build more of the current format without resolving the say/do gap first.

## Recommendations

### High Priority (0–3 months)
1. **Ship streak repair: complete 2 lessons within 48h of a break to restore the streak**
   - Supporting evidence: Theme 1 — 61% of lapsed cite streak break; active users' attachment means the mechanic itself must stay.
   - Expected impact: directly targets the largest single lapse reason; even a 15% recovery of streak-breakers materially moves day-30 retention.
   - Effort estimate: small (rules change + one screen); main cost is modelling impact on streak-freeze IAP revenue (see Open Questions).
2. **Use the onboarding goal to re-sequence weeks 3–6 of content**
   - Supporting evidence: Theme 2 — 48% of lapsed cite relevance drift; we already collect the goal and discard it.
   - Expected impact: attacks the second-largest lapse reason at exactly the cliff window.
   - Effort estimate: medium — content tagging + sequencing logic; no new content required for travel path (existing units cover it).

### Medium Priority (3–6 months)
1. **Move the upgrade prompt to goal-date capture ("Preparing for a trip or exam? Add the date")**
   - Supporting evidence: Theme 4 — 44% of upgrades follow a deadline; price cited by only 9% of lapsed.
   - Expected impact: conversion lift without touching the free tier; also feeds the goal-path feature.
   - Effort estimate: small–medium.
2. **Cut notification default from 3/day to 1/day and test lapse rates**
   - Supporting evidence: Theme 5 — muting precedes lapse in all 7 lapsed sessions; causality unproven, hence test rather than assume.
   - Expected impact: preserves the re-entry channel; short-term DAU dip is the acceptable cost of the experiment.
   - Effort estimate: small.

### Future Consideration (6+ months)
1. **Redesign speaking practice around private, async contexts — only after follow-up research**
   - Supporting evidence: Theme 3 say/do gap — the top survey request is contradicted by observed behaviour; building now risks 2 quarters on a skipped feature.
   - Expected impact: unknown until the underlying need (confidence vs. format vs. context) is validated.
   - Effort estimate: large; gate behind a 2-week diary study.

## Open Questions
1. Does streak repair cannibalise streak-freeze IAP revenue, and by how much? (Finance model needed before build.)
2. Is the speaking say/do gap about social embarrassment, exercise quality, or context of use? (Diary study, 8–10 participants.)
3. Is muting a cause of lapse or just an early symptom of fading motivation? (Holdback experiment on notification volume.)
4. Exam-prep learners were only 4 of 12 sessions — is the deadline-conversion pattern as strong for them at survey scale?

## Appendix
- Interview guide used (link)
- Full participant demographics (link)
- Raw survey export and session notes (link)
```

## Why it's shaped this way

- **Every theme carries a participant count from both data sources** — the anti-patterns forbid presenting results "without quantifying prevalence"; "8 of 12 sessions, 61% of lapsed" is what lets a planning meeting weigh Theme 1 against Theme 5 instead of arguing from anecdote.
- **The streak contradiction is surfaced inside the theme, not resolved offstage** — the skill bans ignoring contradictory data ("conflicting findings must be surfaced and noted"); active users loving the exact mechanic that churns lapsed users is the finding, and the recommendation (repair, not removal) only makes sense because both halves are shown.
- **Theme 3 separates what users say from what they do** — the analysis guidelines say to note "both what users say AND what they do"; the #1 survey request paired with observed avoidance flips the naive roadmap decision (build more speaking practice) into a research gate, which is the most valuable sentence in the document.
- **Interpretations are labelled as interpretations** — the quality checks require observations and interpretations "clearly separated"; the mute-precedes-lapse claim is stated as observation, the causal story is flagged and pushed to an experiment rather than asserted.
- **Feature requests dig to the underlying need** — the skill demands identifying "jobs-to-be-done, not just feature requests"; offline mode is recorded as commute-compatibility, streak repair as recoverable self-trust, which is why the recommendations don't just transcribe the request list.
- **Leadership's paywall theory is answered with a number** — insights must "connect to specific product decisions"; the 9%-cited-price finding kills a pending decision (soften the paywall) and redirects it (retime the prompt), which is synthesis doing its job against the room's prior.
- **Quotes are attributed and chosen to illustrate patterns** — per the quote guidelines ([P4, lapsed, travel learner]), and P6's self-contradiction is quoted precisely because it *is* the pattern, not an outlier.
- **Recommendations are prioritised with evidence, impact, and effort — and one is deliberately gated** — findings must be "prioritised by impact, not just listed"; parking the top survey request behind a diary study is the honest call the say/do data forces.
