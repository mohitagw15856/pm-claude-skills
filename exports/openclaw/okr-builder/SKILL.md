---
name: okr-builder
description: "Create well-structured OKRs (Objectives and Key Results) for product teams, startups, and individuals. Use when asked to write OKRs, set quarterly goals, define key results, or review existing OKRs. Produces a complete OKR set with objectives, measurable key results, baselines, and a scoring guide."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/okr-builder.html
metadata:
  {
    "openclaw": { "emoji": "🗺" }
  }
---

# OKR Builder Skill

Write ambitious, measurable OKRs that connect product work to company strategy. Avoid vanity metrics, output-focused key results, and objectives that sound like task lists.

## Working from a brief

You will often get a short brief without every detail (no baselines, no exact numbers). **Always deliver a complete, specific OKR set anyway** — do not stop to ask questions and do not leave bracketed placeholders like `[target]`. Where a baseline or number is missing, infer a realistic value from the brief and the domain, and mark it *(assumed — confirm)*. A clearly-labelled assumed baseline (e.g. "activation 40% *(assumed)* → 60%") is always better than a blank or an invented-as-fact figure.

## OKR Fundamentals

**Objective:** Qualitative, inspiring, time-bound. Answers "where are we going?"
**Key Result:** Quantitative, specific, measurable. Answers "how will we know we've arrived?"

### The Test for a Good KR
- Can it be scored 0.0–1.0 at the end of the period?
- Does it measure outcome, not output? ("Revenue from new customers increased by 30%" not "Launch 3 features")
- Is it ambitious but achievable? (Aim for 70% attainment as the gold standard)
- Is it within the team's control?

## Common OKR Anti-Patterns to Flag and Fix

| Anti-Pattern | Example | Better Version |
|---|---|---|
| Task masquerading as KR | "Launch onboarding redesign" | "New user activation rate increases from 42% to 65%" |
| Vanity metric | "Get 10,000 app downloads" | "30-day retention for new users reaches 40%" |
| Binary KR | "Ship API v2" | "API v2 adopted by 80% of active integrations" |
| Too many KRs | 6+ per objective | Max 3–4 KRs per objective |
| No baseline | "Improve NPS" | "NPS increases from 32 to 50" |

Always flag anti-patterns and offer a rewrite.

## Output Format

### [Quarter] OKRs — [Team/Product Area]

---

**Objective 1: [Inspiring, qualitative statement]**

*Why this matters:* [1–2 sentence strategic context]

| # | Key Result | Baseline | Target | Measurement Method |
|---|---|---|---|---|
| KR1 | [Measurable outcome] | [Current state] | [Target] | [How measured] |
| KR2 | [Measurable outcome] | [Current state] | [Target] | [How measured] |
| KR3 | [Measurable outcome] | [Current state] | [Target] | [How measured] |

*Owner:* [Name/Role]
*Check-in cadence:* Weekly

---

Repeat for each objective. Recommend 2–4 objectives per team per quarter.

## Scoring Guide to Include

At quarter end, score each KR:
- 0.7–1.0 = Excellent (0.7 is the "sweet spot" — if all KRs score 1.0, they weren't ambitious enough)
- 0.4–0.6 = Made progress but missed
- 0.0–0.3 = Missed — needs retrospective discussion

## Inputs (infer any not provided — label assumptions)

- **Team or individual** the OKRs are for
- **Quarter and year**
- **Company or product North Star metric** (OKRs should connect to this — if not given, infer a plausible one and label it *(assumed)*)
- **Top 3 priorities or goals for this quarter** (rough notes are fine)
- **Any existing OKRs to review or improve** (optional)

## Guidelines

- Connect OKRs to the company/product North Star; if it isn't given, infer a plausible one and label it *(assumed)* rather than asking
- Recommend no more than 3 objectives per team per quarter
- If user provides output-based goals, always reframe as outcomes
- Include a "health check" section flagging which KRs have no current baseline data
- Remind user: OKRs are not performance reviews — they should be ambitious enough that missing them is okay

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Outcome orientation | KRs are a shipped-feature task list ("launch X", "complete Y") | Mostly outcomes, but one or more KRs are outputs or binary ship/no-ship | Every KR is an outcome metric scorable 0.0–1.0 by degree of achievement |
| Baseline & measurability | No baselines or measurement methods; KRs cannot be scored at quarter end | Targets present but several baselines missing or unsourced, with no health-check flag | Every KR has baseline, target, and measurement method; missing data is flagged in a health check with a plan to instrument |
| Ambition calibration | Targets are last quarter's trendline (sandbagged) or pure fantasy with no path | Some stretch, but nobody could say what a 0.7 score looks like | Calibrated so 0.7 attainment is the expected good quarter; sandbagged proposals and moonshots are called out and corrected |
| Strategic focus & control | No link to a North Star; 5+ objectives or KR zoo; KRs depend on other teams' work | Ladders loosely to strategy but objectives are overloaded or one KR fails the control test | ≤3 objectives with ≤4 KRs each, every objective explicitly ladders to the North Star, and every KR is within the team's control |

## Quality Checks

- [ ] Each KR is measurable with a baseline and target
- [ ] No output-based KRs (no "launch X" or "complete Y")
- [ ] Maximum 4 KRs per objective
- [ ] OKRs connect to the company or product North Star
- [ ] Ambitious enough that 0.7 attainment is the expected score

## Anti-Patterns

- [ ] Do not accept output-based key results — any KR phrased as "launch X" or "complete Y" must be rewritten as an outcome with a baseline and target
- [ ] Do not write OKRs without asking for the company or product North Star — OKRs disconnected from the strategic context are just a goal-setting exercise
- [ ] Do not write more than 4 KRs per objective — too many KRs dilute focus and make scoring ambiguous at quarter end
- [ ] Do not use binary KRs (ship/don't ship) — every KR must be scorable on a 0.0–1.0 scale based on degree of achievement
- [ ] Do not skip the health check section on baselines — OKRs without current baselines cannot be scored objectively at quarter end
