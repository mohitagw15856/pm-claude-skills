---
trigger: model_decision
description: "Check a mobile app build against the common reasons app store reviewers reject submissions, before it is submitted. Use when asked will this pass app review, why was my app rejected, pre-submission checklist, check my app store listing, or help me answer this rejection. Produces a risk-ranked findings table tied to the store's own guideline sections, a fix list with owners, reviewer notes to paste into the submission, and a reply draft if the app was already rejected."
---

# App Store Submission Guard Skill

A rejection costs days, and most rejections come from a short list of repeat causes: the reviewer could not sign in, the listing promised something the build does not do, a permission prompt gave no reason, or a purchase went around the store's billing. This skill runs the build and the listing through those causes before a reviewer does. It reports what it can check from the material given and marks the rest as unchecked, because a checklist that claims to have verified what it only assumed is worse than none.

## What This Skill Produces

- **A findings table** ranked by likelihood of rejection, each row tied to a named guideline area and the evidence seen
- **A fix list** with an owner type (engineering, design, legal, store listing) and whether the fix needs a new build
- **Reviewer notes** ready to paste into the submission form: demo account, feature paths, hardware or region needs
- **A rejection reply** when the app has already been rejected: what was changed, where to see it, and the clarifying question if the rejection is unclear

## Required Inputs

Ask for these if not provided:
- **Which store or stores** (Apple App Store, Google Play, or both) and the app category
- **What the app does**, including sign-in, payments, user-generated content, health, finance, children or location features
- **The listing**: name, subtitle, description, screenshots described or attached, age rating answers, privacy answers
- **The permission list** and the text of each permission prompt
- **The rejection message**, verbatim, if there is one

State plainly that store guidelines change. Ask the user to confirm against the current published guideline before relying on a specific section number, and never quote a section number from memory as though it were verified.

## Framework: The Repeat Causes

1. **Reviewer cannot get in.** No demo account, expired credentials, a login that needs a real phone number or a region the reviewer is not in. Fix: working credentials and a path that needs nothing external.
2. **Listing and build disagree.** Screenshots of features that are not in the build, claims such as "number one" with no basis, placeholder text, or a name that leans on another brand.
3. **Payments around the store.** Digital goods sold with outside billing, or links that steer to it, where the store requires its own purchase system. Physical goods and services are treated differently: name which case applies.
4. **Permissions without a reason.** A prompt that does not say why access is needed, access requested at launch before any feature needs it, or data collected that the privacy answers do not declare.
5. **Privacy answers and behaviour disagree.** Tracking with no consent prompt, a missing privacy policy link, or no way to delete an account from inside the app where accounts can be created.
6. **User-generated content with no controls.** No report button, no block, no moderation statement.
7. **Thin or broken.** Crashes on launch, a wrapped website with no native value, dead buttons, test data left in.
8. **Sensitive categories.** Health claims, financial advice, gambling, children: each needs evidence, licences or specific design. Flag and route to a qualified reviewer; do not clear these alone.

The full catalogue, with a self-check and the usual fix for each pattern, is in [`references/rejection-patterns.md`](references/rejection-patterns.md). It links to both stores' current policy pages and gives no section numbers on purpose.

For each cause, record one of: **found**, **not found in the material given**, or **could not check** with what is needed to check it.

## Output Format

# Submission Check: [app name] for [store]

**Verdict:** [ready / fix first / needs specialist review] with the single biggest risk in one line

## Findings
| # | Area | What was seen | Evidence | Likelihood | Needs new build? |
|---|------|---------------|----------|------------|------------------|

## Not Checked
[What could not be verified from the material, and what would let it be checked]

## Fix List
| Fix | Owner | Effort | Blocks submission? |
|-----|-------|--------|--------------------|

## Reviewer Notes (paste into the submission)
[Demo credentials placeholder, steps to reach each reviewed feature, anything unusual about hardware, region or sign-in]

## Reply to the Rejection (if applicable)
> [Polite, specific, names the change and where to see it, asks one clarifying question if needed]

## Quality Checks

- [ ] Every finding names the evidence it rests on
- [ ] Items that were not verifiable are listed under Not Checked, never silently passed
- [ ] No guideline section number is presented as verified unless the user supplied the current text
- [ ] Sensitive categories are routed to a qualified person, not cleared
- [ ] Reviewer notes contain a working path to every feature the listing mentions

## Anti-Patterns

- [ ] Do not say an app will pass: review is a human decision and this is a risk check
- [ ] Do not invent credentials, policy URLs or licence numbers; leave marked placeholders
- [ ] Do not argue with the reviewer in the reply; state the change and ask one question
- [ ] Do not skip the listing: many rejections are about metadata, not code
- [ ] Do not treat one store's rule as the other's

## Example Trigger Phrases

- "Will this pass app review?"
- "My app was rejected, help me reply."
- "Give me a pre-submission checklist for the App Store."
- "Check my Play Store listing before I submit."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/app-store-submission-guard.html

<!-- pm-claude-skills v84.1.0 | skill: app-store-submission-guard | source: skills/app-store-submission-guard/SKILL.md | sha256: 43101b254c303d4de84068d6a9fa060526696e41f9f2d88878c41b56deb31d2b | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
