# Worked Example — The Churning Customer

## The brief

Relay is a $79/mo social-media scheduler for small marketing teams. Onboarding: signup → connect accounts → a 7-email drip → "book an optional demo." No human touch unless the user asks. A CS lead asks: "our month-4 cancellations mostly never contacted support. Simulate one."

## The output

# The Customer Who Left: Dana Okafor, Marketing Manager (3-person team), Relay

> Simulation — a plausible composite, not a prediction. Validate against real churned-customer interviews.

## The Five Moments

**1. Purchase rationalization (day 0)** — "Okay. $79 a month, but if it saves Priya even two hours a week on scheduling it pays for itself. I told Marcus it would 'centralize our whole social workflow.' That's the sentence I'll be held to."

**2. First value attempt (day 3)** — "Connected Instagram and LinkedIn fine. The TikTok connection failed twice with an error about business accounts — I'll deal with that later. Scheduled next week's posts. Honestly… this part took about as long as doing it natively. Maybe it gets faster."

**3. The silent disappointment (week 4)** — "The calendar view is genuinely nice. But the approval flow — I still end up screenshotting drafts into Slack because Priya doesn't have a seat ($29 more) and the client can't comment without an account. The thing I *actually* bought — fewer places to check — hasn't happened. I haven't told anyone this. It's not broken enough to complain about."

**4. The workaround (month 2)** — "Priya built a Notion board for approvals. So now Relay is… the place we paste things after they're approved. I'm scheduling directly in LinkedIn again half the time because it's one tab instead of three. TikTok never did get connected."

**5. The renewal email (month 4)** — "'Your annual upgrade offer — save 20%!' $758 a year. For a paste-step. I'm not angry, it's a fine product — it's just not *doing* anything. Cancel is under Settings → Billing. There's a survey. I picked 'switching to another tool.' It was easier than the truth."

## The Exit Interview They Never Gave

**What did you buy this to do?** Give three people one shared place for drafting, approving, and scheduling — kill the Slack-screenshot workflow.
**When did you first doubt it?** Week one, honestly — scheduling wasn't faster. But I'd said the "centralize" sentence to my boss, so I gave it time.
**What did you replace it with?** Notion for approvals + native scheduling. Worse on paper. Fewer tabs in practice.
**What would have kept you?** A free reviewer seat. Not a feature — a pricing decision. My approver didn't need to *post*, just to comment.
**Why didn't you tell us?** Nothing was broken. You can't file a ticket that says "this is fine but my life didn't change."

## Debrief — out of character

| Signal | Detectable when | Where it shows | Intervention |
|---|---|---|---|
| Failed platform connection never retried | Day 3–7 | Integration error logs vs account status | Human follow-up on failed connects within 48h — "want me to fix TikTok with you?" converts silent friction |
| Single-seat account with multi-person posting patterns | Week 2–3 | Draft edits from one login at odd cadence; exports/screenshots | Trigger a free-reviewer-seat offer; the approval loop is the retention product |
| Scheduling frequency declining while logins continue | Month 2 | Posts-scheduled/week trend | "We noticed you're scheduling less — what moved outside Relay?" (the honest question, asked early) |

One paragraph: the onboarding's real gap is that **moment 2 measures the wrong thing** — Relay counts "accounts connected + first post scheduled" as activation, but Dana's purchase sentence was about the *approval loop*, which onboarding never touches. Adding "invite your approver (free)" as onboarding step 2 moves the product from paste-step to workflow before the Notion board ever gets built.

## Why it's shaped this way

- **Moment 3 is the heart** — quiet repricing of expectations, never spoken; the monologue names the exact seat-pricing collision behind it.
- **The customer describes pain, not roadmap** ("fewer places to check"), per the anti-patterns — real customers don't say "build commenting."
- **The exit survey lie is included** ("switching tools" was easier than the truth) — why survey data undercounts this churn class.
- **Every debrief signal maps to data Relay already has** — integration logs, seat/usage mismatch, scheduling trend; no new telemetry required.
- **The "what would have kept you" answer is honest-sized** — a pricing decision, not a feature list; smallness is the credibility.
