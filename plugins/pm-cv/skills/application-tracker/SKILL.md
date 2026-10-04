---
name: application-tracker
description: "Set up and keep a job application tracker: one master CV, every tailored version, where each was sent, its status, next action and follow-up date, plus a weekly review of what is working. Use when asked to track my job applications, organise my job search, which CV did I send to which company, or what should I follow up on this week. Produces a tracker table (markdown or CSV) with one row per application, a version log linking each to its tailored CV, this week's actions, and a short weekly review of response rates by source."
version: 1.0.0
---

# Application Tracker

A job search with twenty applications and five CV versions turns into confusion fast: which version went where, who to chase, what is working. This skill sets up a simple tracker, keeps it up to date from what the person tells it, and turns it into a short list of this week's actions.

Part of the pm-cv bundle.

## What This Skill Produces

- **The tracker**: one row per application
- **A version log**: each tailored CV, what changed, where it was sent
- **This week's actions**: follow-ups due, interviews to prepare, deadlines
- **A weekly review**: response rate by source and by CV version, and one change to try

## Required Inputs

Ask for these if not provided:
- **Existing applications**, if any: company, role, date, where applied
- **Where the tracker should live**: a markdown file, a CSV for a spreadsheet, or in the conversation
- **The master CV file name**, so versions can be named after it

## Framework

Tracker columns:
| ID | Company | Role | Link | Source (job board, referral, recruiter, direct) | CV version | Date applied | Status | Next action | Follow-up date | Contact | Notes |

Statuses, in order: Saved, Applied, Screening, Interviewing, Offer, Rejected, Withdrawn, No response.

Rules:
- **Version names** follow `Lastname-CV-[company]-[yyyy-mm-dd]`, so a file name always says where it went.
- **Follow-up date**: seven to ten days after applying if there is no response, once.
- **No response after three weeks**: mark as No response; it stays in the review.
- **Weekly review**: response rate = (Screening or later) ÷ Applied, per source and per CV version. Recommend one change.

## Output Format

### Job search tracker: [name], week of [date]
**1. Tracker** (table, or CSV block)
**2. Version log** | Version | Based on | What changed | Sent to |
**3. This week** | Action | Application | Due |
**4. Weekly review** | Source | Applied | Responses | Rate | ; one change to try

## Quality Checks
- [ ] Every application has a status and a next action or a closed status
- [ ] Every row links to a CV version
- [ ] Follow-up dates are computed, not left blank
- [ ] Rates in the review are arithmetically correct

## Anti-Patterns
- **Tracking without acting.** The tracker exists to produce this week's actions.
- **Many follow-ups.** One polite follow-up per application.
- **Changing everything at once** after a bad week. One change, then measure.
- **Storing passwords or ID numbers** in the tracker.

## Example Trigger Phrases
- "Set up a tracker for my job applications."
- "Which CV did I send to which company? Help me organise this."
- "What should I follow up on this week?"
- "帮我整理一下我投过的简历和进度。"
