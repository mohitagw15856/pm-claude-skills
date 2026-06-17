# Email Triage

## The Problem

Most of us spend real time triaging email that could be sorted automatically. Scrolling through a mixed inbox of newsletters, order confirmations, Jira notifications, and actual human asks is a tax on focus. The 40 emails since lunch contain maybe 4 that actually need you — this skill finds those 4.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Gmail connector | Must be active in Claude settings (Settings → Connectors → Gmail) |
| Gmail account | The account you want triaged |

If the Gmail connector is not connected, Claude will prompt you to connect it before proceeding.

## Required Inputs

| Input | Required | Default | Notes |
|-------|----------|---------|-------|
| Time window | No | Last 8 hours | Accepts: "last 8 hours", "last 24h", "today", "since Monday", "last 3 days" |
| Always-include senders | No | None | Specific names or email addresses that always surface, regardless of content |
| Always-ignore senders | No | None | Domains or addresses to always suppress (e.g. noreply@*, jira@company.com) |
| Focus area | No | None | Optional context: "focus on anything from clients" or "flag anything about the launch" |

## What Gets Filtered Out

Claude suppresses the following categories. They are counted in the summary but not shown:

- Order confirmations and shipping notifications
- Marketing and promotional emails (including "one-time" offer emails)
- Newsletter subscriptions and digest emails
- Automated system notifications (monitoring alerts, CI/CD, build reports)
- Calendar invites that have already been accepted or declined
- Read receipts and delivery confirmations
- Social media notifications (LinkedIn, Twitter/X, etc.)
- Internal ticket updates unless the ticket is assigned to you and requires action
- Bank and financial statements (surfaced count only, not content)

## What Gets Surfaced

Claude surfaces only emails that meet one or more of these criteria:

- A human is waiting for a reply
- A decision is being requested
- There is a deadline or time-sensitive ask, explicit or implied
- The sender is someone who does not usually email you (potential priority signal)
- The email is from a sender in your always-include list

## Output Format

```
## Inbox Triage — [Time window] | [Date], [Time]
**Total emails scanned:** X | **Actionable:** Y | **Filtered out:** Z

---

### 🔴 High Priority — Needs reply or decision today

**From:** [Name] <email@domain.com>
**Subject:** [Subject line]
**Received:** [Time, e.g. 2:14 PM]
**What they need:** [One sentence — the actual ask, not a summary of the email]
**Reply starter:** "[A draft opener they can continue — 1 sentence max]"

---

**From:** [Name] <email@domain.com>
**Subject:** [Subject line]
**Received:** [Time]
**What they need:** [One sentence]
**Reply starter:** "[Draft opener]"

---

### 🟡 Medium Priority — Reply within 24–48h

**From:** [Name] <email@domain.com>
**Subject:** [Subject line]
**Received:** [Time]
**What they need:** [One sentence]
**Reply starter:** "[Draft opener]" *(or "No reply needed — action only: [what to do]")*

---

### 🟢 FYI — Worth knowing, no action required

- **[Name]** re: [Subject] — [One-line summary of why it might be relevant]
- **[Name]** re: [Subject] — [One-line summary]

---

### ⚪ Filtered Out — [Z emails]
Receipts: X | Newsletters: X | Notifications: X | Other automated: X
*(No action needed — not shown in detail)*
```

## Instructions for Claude

### Step 1 — Connect and confirm the time window

Confirm the Gmail connector is active. Parse the requested time window and translate it to an exact datetime range (e.g. "last 8 hours" = [current time minus 8 hours] to now). State the window at the top of the output.

### Step 2 — Read the inbox

Fetch emails from the inbox for the specified time window. Include: sender name, sender email, subject, received time, and email body (or first 500 words if long). Do not fetch emails older than the window.

### Step 3 — Apply ignore rules

If the user specified always-ignore senders or domains, suppress those immediately. If no ignore list was given, apply standard suppression (see What Gets Filtered Out). Track counts for the filtered summary.

### Step 4 — Classify each remaining email

For each non-suppressed email, classify into one of four categories:

- **High Priority**: A human is waiting on a reply today, or there is an explicit deadline within 24 hours
- **Medium Priority**: A reply is needed but not urgently, or there is an implicit ask without a hard deadline
- **FYI**: No action needed, but the user would likely want to know about it
- **Filtered Out**: Falls into a suppressed category — add to count, do not show

Apply the always-include list after classification: any email from a flagged sender surfaces regardless of category, with its actual classification.

### Step 5 — Write the "What they need" line

This is the highest-value part of the output. Write exactly one sentence that captures the actual ask — not a summary of the email, the ask.

Bad: "Sarah sent an email about the Q3 report."
Good: "Sarah needs your sign-off on the Q3 report before she sends it to the board at 5 PM."

If there is no clear ask, it is probably FYI or filtered out.

### Step 6 — Write the reply starter

For High and Medium priority emails, write a one-sentence reply opener. The opener should:
- Match the tone of the sender (formal vs. casual)
- Acknowledge the ask directly
- Be something the user can actually send with minimal editing

Example: "Thanks for flagging this — let me check with the team and get back to you by EOD."

If the email requires an action rather than a reply (e.g. "please approve this expense"), write: "No reply needed — action only: [describe the action]."

### Step 7 — Assemble and deliver the output

Use the output format exactly as specified. Do not add extra sections, editorialise, or explain your reasoning. The output should be scannable in under 60 seconds.

### Step 8 — Offer next steps

After the triage output, offer one of:
- "Want me to draft replies to any of these?"
- "Say 'reply to [name]' and I'll draft it."

Keep this to one line. Do not elaborate.

## Quality Checks

- [ ] Time window was applied correctly — no emails outside the window are included
- [ ] Gmail connector was confirmed active before reading
- [ ] Every High Priority email has a specific, concrete "What they need" sentence — not a vague summary
- [ ] Reply starters match the tone of the original email (formal/informal)
- [ ] Filtered-out count is accurate and broken down by category
- [ ] FYI section contains only emails with no action required — nothing actionable is buried here
- [ ] Always-include senders surfaced regardless of category
- [ ] Always-ignore senders/domains are fully suppressed
- [ ] Output is scannable — no unnecessary prose, no padding
- [ ] Financial statements and sensitive content were counted but not shown in full

## Anti-Patterns

- [ ] Do not surface FYI emails in the High or Medium priority sections — burying actionable items with informational ones defeats the purpose of triage
- [ ] Do not write vague "What they need" summaries ("Sarah sent an email about the report") — every summary must state the actual ask, not a description of the email
- [ ] Do not apply the same tone to every reply starter — a formal email from a client requires a different opener than a casual Slack-style email from a colleague
- [ ] Do not include emails outside the requested time window — time window accuracy is the core trust signal for this skill
- [ ] Do not omit the filtered-out count — users need to know how much was scanned, not just what was surfaced, to trust the triage is complete

## Dispatch / Mobile Usage

This skill works from the Claude mobile app (Dispatch). On mobile, the output renders cleanly with the emoji priority markers serving as visual anchors for quick scanning. Recommended mobile trigger: "Check my emails" or "/email-triage".

## Example Trigger Phrases

- `/email-triage`
- "Check my emails"
- "What emails need my attention?"
- "Triage my inbox for the last 8 hours"
- "What came in since this morning?"
- "Any urgent emails I need to deal with?"
- "Triage my inbox — ignore anything from Jira and the marketing domain"
- "Check emails from the last 24 hours, flag anything from [client name]"
- "What do I need to reply to today?"
