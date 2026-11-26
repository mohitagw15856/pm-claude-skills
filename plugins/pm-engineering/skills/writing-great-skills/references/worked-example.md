# Worked Example — Writing Great Skills

## The brief

Trellium is a fictional observability SaaS (400 B2B customers, 11-person combined support/SRE org). Their Head of Support asks: *"Write us a skill for customer-facing incident comms. Last quarter we had three incidents where the status page update went out 40+ minutes late, full of jargon, and legal escalated because an engineer called a partial degradation an 'outage' before severity was confirmed. I want status page updates and the post-incident email to come out consistent, fast, and safe to publish."* No further detail is offered — the deliverable, inputs, and structure must be inferred from that one paragraph.

## The output

1. The complete SKILL.md, ready to save to `skills/incident-comms/SKILL.md`:

````markdown
---
name: incident-comms
description: "Draft customer-facing incident communications — status page updates for each incident stage and the post-incident follow-up email — in plain language that is safe to publish before root cause is known. Use when asked to write a status page update, draft incident comms, announce a degradation or outage, post an all-clear, or write a customer-facing incident email. Produces a stage-appropriate status update (investigating / identified / monitoring / resolved) and, when the incident closes, a post-incident customer email with impact, cause in plain words, and what changes next."
---

# Incident Comms Skill

During an incident, the first casualty is clear writing. This skill produces customer-safe incident communications in minutes — worded so support can publish without waiting on legal, and staged so customers always know what changed since the last update.

## Working from a brief

Given only "we're seeing elevated errors on ingestion," **draft the update anyway**. Infer the stage (default: *Investigating*), state only what is confirmed, and mark anything uncertain as *(confirm before publishing)*. Never block on missing root cause — early updates describe symptoms and scope, not causes.

## Required Inputs

Ask for (if not already provided), else infer and label:
- **What customers are experiencing** (symptom, not internal component names)
- **Scope** — which product areas / regions / % of customers, if known
- **Incident stage** — investigating, identified, monitoring, or resolved
- **Start time** (with timezone) and whether data was lost or delayed
- For the post-incident email: **duration, impact summary, cause in one sentence, and 1–3 prevention actions**

## Severity Language Rules

- Use **"outage"** only when the service is fully unavailable for affected customers. Otherwise use **"degradation"** or **"delays"**. Misgrading severity upward triggers contractual review clauses; misgrading it downward destroys trust.
- Name what customers see ("dashboards loading slowly"), never internal systems ("Kafka consumer lag").
- No speculation about cause until stage is *Identified* or later.
- Every update ends with when the next update will come ("Next update by 14:30 UTC or sooner").

## Output Format

### Status page update
> **[Stage] — [Plain-language title, symptom-first]**
> Posted [time UTC]
>
> [2–4 sentences: what customers are experiencing, scope, what we're doing right now, what has changed since the previous update.]
>
> Next update by [time UTC].

### Post-incident customer email (after Resolved)
- **Subject:** [Product area] incident on [date] — what happened and what we're changing
- **What happened** — 2–3 sentences, customer-visible impact only, with start/end times and duration.
- **What caused it** — one plain-English sentence; no blame, no component jargon.
- **What we're changing** — 1–3 concrete prevention actions, each with a timeframe.
- **If you were affected** — what (if anything) the customer should check or do.

## Quality Checks

- [ ] Severity word matches the rules ("outage" only for full unavailability)
- [ ] Every sentence describes customer-visible behaviour, not internal systems
- [ ] The update states when the next update will come
- [ ] No cause is asserted before the *Identified* stage
- [ ] Post-incident email includes duration, plain-English cause, and dated prevention actions
- [ ] Anything unconfirmed is marked *(confirm before publishing)*

## Anti-Patterns

- Calling a partial degradation an "outage" (or the reverse) — severity words carry contractual weight
- Updates that restate the previous update with a new timestamp — every post must say what changed
- Jargon customers can't act on ("elevated 5xx on the ingest tier")
- A post-incident email with apology but no prevention actions
- Waiting for root cause before posting anything — silence reads as abandonment
````

2. Why this works:

- **Triggers cover the real phrasings** — "write a status page update", "draft incident comms", "post an all-clear", "customer-facing incident email" — the words a support lead types at minute five of an incident, not the category label "incident communication management".
- **The deliverable is named twice** (description's "Produces…" clause and the Output Format) and is two concrete artifacts, so two runs of the skill look like the same product.
- **The severity-language rules encode the actual failure** from the brief — the legal escalation over "outage" — as a checkable rule rather than a vague "be careful with wording".
- **The sharpest anti-pattern it guards against** is the timestamp-only repost: the most common real-world status page failure, and one a weaker prompt would happily produce.
- **It won't beg for inputs**: the working-from-a-brief section forces a publishable draft from one symptom sentence, with *(confirm before publishing)* labels instead of refusal.

## Why it's shaped this way

- The description carries all three mandated parts (what / "Use when…" / "Produces…") because the skill's own rule says the description "is the most important line in the file" — it is all the model sees at trigger time.
- Trigger phrases are written the way users *speak* under pressure ("post an all-clear"), following the rule to cover synonyms rather than categorise — a description saying "incident communication" alone would lose to a neighbouring postmortem skill.
- The Output Format is a literal template with a blockquote skeleton and a subject line, not a description of one — the skill names "an Output Format that *describes* the artifact instead of *templating* it" as a core anti-pattern.
- The generated skill includes its own Quality Checks and Anti-Patterns sections because the standard marks them required — they are "what make a skill trustworthy, not just a prompt".
- Quality checks are observable ("severity word matches the rules"), never "output should be professional" — the skill explicitly bans non-observable checks.
- The working-from-a-brief section exists because the brief was thin (one paragraph, no input list): the skill's rule is to produce the full SKILL.md anyway and label open choices, never hand back a skeleton with TODOs.
- The rationale note is 5 bullets leading with trigger choice and the sharpest anti-pattern, exactly matching the skill's two-part Output Format contract (complete file + "why this works" note).
- Tension is preserved, not sanitized: the severity-word rule exists *because* legal and engineering disagreed about "outage" — the example encodes the disagreement as a rule instead of pretending wording is neutral.
