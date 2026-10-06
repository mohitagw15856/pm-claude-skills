---
name: the-vibe-check
description: "Harden a vibe-coded app before strangers use it — the audit for prototypes built fast with AI: exposed secrets, missing auth checks, unvalidated input, data with no deletion path, and the five embarrassing holes every weekend build has. Use when someone says 'Claude built my app, is it safe to launch', 'harden my prototype', 'vibe check my project', or before putting real users on a hackathon build. Produces a ranked findings list with fixes, a launch-blocker line, and a 'what I'd break first' attacker's tour. Defensive review of YOUR OWN app."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/the-vibe-check.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# The Vibe Check Skill

Vibe coding is real and good: an idea becomes a working app in a weekend. Then
the app gets users, and the things that didn't matter Friday night matter
enormously — the API key sitting in client code, the endpoint that trusts the
browser to say who's logged in, the database where every user can read every
row. This skill is the bridge from "it works" to "strangers can use it":
a structured self-audit ordered by embarrassment-per-fix, honest about what
must block launch versus what can wait for week two. It reviews the *user's
own app* — it's a seatbelt, not a lockpick.

## What This Skill Produces

- A **ranked findings list**: 🔴 launch-blockers / 🟡 week-one / 🟢 eventually,
  each with the concrete fix (and the code-level change where code was shared)
- The **attacker's tour**: "here's what I'd try first on your app" — the 10-
  minute walkthrough of your own front door, as motivation and test plan
- A **launch checklist** for this specific stack, not a generic OWASP dump
- The **data honesty check**: what you're storing, whether you need it, and
  whether you can delete it when a user asks

## Required Inputs

Ask for (if not already provided):
- What the app does and who's about to use it (5 friends? the internet?
  payments? minors? — the bar moves)
- The stack: framework, hosting, database, auth approach, AI APIs used
- Access to look: the repo/key files pasted, or answers to the checklist
  questions honestly ("is the Supabase anon key doing all your auth? be
  honest")
- What the AI assistant built vs what the user wrote/reviewed — unreviewed
  generated code is where the holes cluster

## Framework: the five embarrassing holes (check these first)

1. **Secrets in the client.** API keys in frontend JS, .env committed to the
   repo, keys in the mobile bundle. Fix: server-side proxy for anything with
   a bill or a scope; rotate anything that ever shipped to a browser — it's
   burned, rotation is not optional.
2. **Auth theater.** The UI hides the admin button but the endpoint answers
   anyone; user ID taken from the request body; "logged in" checked in React
   but not on the server. Fix: every endpoint re-checks identity and
   *authorization* server-side; the client is a rumor, not a witness.
3. **The database trusts everyone.** Default-open row-level security, every
   user can query every row, the AI wrote `select *` where it meant
   `where user_id =`. Fix: RLS/scoped queries, then *test as a second user* —
   the two-account test finds most of it.
4. **Input goes straight in.** Unvalidated input into queries, prompts
   (injection into your LLM calls — your system prompt is not a secret once
   users can talk to it), file uploads with no limits, HTML rendered unescaped.
   Fix: validate server-side, parameterize, cap sizes, escape output, treat
   LLM output shown to other users as untrusted input too.
5. **Data with no exit.** Storing more than needed, no deletion path, AI
   conversation logs kept forever by default, no answer to "delete my
   account." Fix: store less, add the delete path now (retrofitting it after
   growth is 10x the work), write the three-line privacy note that matches
   reality.

Then the supporting cast: rate limits on anything that costs money per call
(your AI endpoints especially — one loop = one invoice) · error messages that
don't leak stack traces · dependency audit (`npm audit` is free) · backups
tested once · the bus factor file (how to deploy, where the keys live).

## Output Format

```
## Vibe check: [app] — verdict: [SHIP / SHIP AFTER RED / NOT YET]

## Findings
| # | 🔴🟡🟢 | The hole | Where | The fix (specific) |

## The attacker's 10-minute tour of your app
[First thing I'd try · second · third — each mapped to a finding]

## Launch checklist (your stack)
- [ ] [concrete, checkable items]

## Data honesty
[Storing → needed? → deletable? · the 3-line privacy note]

## What's genuinely fine
[The vibe-coded parts that hold up — credit where due]
```

## Quality Checks

- [ ] Findings cite the user's actual code/answers — zero generic-scanner
      filler for holes their stack can't even have
- [ ] Every 🔴 has a specific fix, and shipped-to-client secrets say ROTATE,
      not just "remove"
- [ ] The two-account test and the rate-limit-on-paid-APIs check appear
      whenever applicable
- [ ] The verdict line is committed — one of the three, with the 🔴 count
      carrying the reasoning
- [ ] Something is marked genuinely fine — an audit that only condemns
      teaches less than one that also confirms

## Anti-Patterns

- [ ] Do not audit apps the user doesn't own or operate — this skill hardens
      your own front door; decline recon on others' apps
- [ ] Do not produce exploit code — findings name the hole and the fix; the
      attacker's tour describes attempts, not payloads
- [ ] Do not perfection-block a launch — the 🔴/🟡/🟢 split exists because
      "fix everything first" means never shipping, which is its own failure
- [ ] Do not shame the vibe coding — the weekend build was the right call;
      this is just the Monday that follows

## Related

[[security-threat-model]] for the grown-up version; [[injection-spotter]] for
the prompt-injection deep-dive; [[local-dev-setup]] and [[monitoring-setup-guide]]
for the operational half of "real app."

## Example Trigger Phrases

- "Is it safe to launch?"
- "Claude built my app: is it secure?"
- "Harden my prototype before strangers use it."
- "Vibe check my project."
