---
aliases: ["Action Runner"]
tags: [pm-skills, skill]
skill: action-runner
description: "Turn a skill's recommendations into real, executed actions — open the tickets, file the issues, post the updates — safely: dry-run preview, risk-classified, approval-gated, then recorded back to the brain. Use when asked to act on a plan, file tickets from a checklist, create issues from a PRD, execute the recommended next steps, or wire a skill's output into GitHub/Linear/Slack. Produces a dry-run actions plan with per-action risk, executes only after approval via the connected action MCP, and logs what was done. Nothing acts silently."
---

# Action Runner Skill

The library is great at *recommending* work. This skill executes it — the action layer of the
[Professional Brain](../professional-brain/SKILL.md) (Phase 2). A skill says "open a ticket per
checklist item"; this turns that into real GitHub/Linear/Slack actions, **safely**: previewed,
risk-rated, approved, then recorded. The cardinal rule: **nothing acts silently.**

## What This Skill Produces

1. A **dry-run actions plan** — every proposed action with its target, operation, and **risk**.
2. After approval, the **executed actions** (via the connected action MCP) — outbound/destructive
   ones gated individually.
3. A **record back to the brain** of what was actually done, with provenance.

## Required Inputs

Ask for (if not already provided):
- **The recommendations to act on** (a launch checklist, PRD requirements, postmortem follow-ups…).
- **The connected action MCP** and **targets** — which GitHub repo / Linear project / Slack channel. Scope is limited to what the user names; never act outside it.
- **Approval posture** — what may run with a single OK vs. what needs per-action confirmation.

## How it works

```
recommend → build an actions plan (JSON) → preview + risk-gate → approve → execute → record
```

1. **Build the plan** — express each action as JSON: `{"target","op","args","why","risk?"}`.
2. **Preview + gate** — run the helper; it prints a dry-run, classifies risk (🟢 low / 🟡 medium /
   🔴 high), and **refuses to proceed while any 🔴 outbound/destructive action is unapproved**:
   ```bash
   echo '<plan json>' | python3 scripts/action_preview.py -
   # after the user approves the risky ones:
   echo '<plan json>' | python3 scripts/action_preview.py - --allow-high
   ```
3. **Approve** — low/medium can run on a single confirmation; every 🔴 (post, send, delete, deploy,
   merge, charge…) needs explicit per-action approval. Default is **do nothing** until told.
4. **Execute** — only approved actions, only via the connected action MCP (e.g. Composio/GitHub
   `create_issue`). One target at a time; stop and report on the first failure.
5. **Record** — append what was actually done to the brain so the loop closes:
   ```bash
   python3 ../professional-brain/scripts/brain_write.py ./brain decisions "Filed launch tickets" \
     --tag external --body "Opened 7 issues in acme/app from the launch checklist" --commit
   ```

## Safety rules (non-negotiable)

- **Dry-run by default.** The plan is shown before anything runs.
- **Approval-gated.** No execution without a yes; 🔴 actions are confirmed one by one.
- **Scope-limited.** Only the repos/channels/projects the user named.
- **Logged.** Every executed action is recorded to the brain with an `[external]` tag and a link.
- **No silent retries, no bulk outbound.** If a step fails, stop and surface it.

## The contract for other skills

An action-aware skill adds a short **"Proposes Actions"** section: after producing its artifact,
it lists the actions it *could* take (target · op · why), then hands off to `action-runner` —
which previews, gates, executes, and records. The skill never executes directly.

## Output Format

1. **Proposed actions** — a table: # · target · operation · why · risk.
2. **Gate result** — the preview output; the 🔴 actions needing approval called out explicitly.
3. **Executed** (after approval) — what ran, with links/IDs returned by the MCP.
4. **Recorded to the brain** — the line(s) appended, with provenance.

## Quality Checks

- [ ] A dry-run plan is shown before anything executes
- [ ] Every action has a risk level; 🔴 actions are individually approved
- [ ] Execution stays within the named scope and uses only the connected MCP
- [ ] Each executed action is recorded back to the brain with an `[external]` tag
- [ ] On failure, it stops and reports rather than retrying blindly

## Anti-Patterns

- Executing anything without showing the dry-run plan first
- Treating an outbound/destructive action (post, email, delete, deploy) as low-risk
- Acting outside the scope the user named, or fanning out to many targets
- "Helpfully" doing more than was approved
- Forgetting to record what was done — the brain must reflect reality

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
