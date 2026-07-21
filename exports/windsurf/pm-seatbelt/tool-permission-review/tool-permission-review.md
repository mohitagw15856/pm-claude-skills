---
trigger: model_decision
description: "Review what an agent is actually allowed to do before you turn it loose — the tool-by-tool audit (each capability's blast radius), the least-privilege pass that removes what the task doesn't need, the dangerous-combination check, and the allow/ask/deny tiering. Use when asked review my agent's permissions, what can this agent actually do, lock down my agent's tools, or is this MCP/tool set safe to grant. Produces the permission inventory with blast radius, the least-privilege cuts, the dangerous-combo flags, and the allow/ask/deny assignments."
---

# Tool Permission Review Skill

An agent's danger isn't its intelligence — it's its *permissions*. A brilliant agent that can only read is safe; a mediocre one that can send email, run shell commands, and read your filesystem is a breach waiting for a bad prompt or a hijacked page. Permission review is the security discipline every agent setup skips: inventory what it can actually do (tools, MCP servers, computer use, each with its real blast radius), cut everything the task doesn't need (least privilege — the single highest-leverage security move), flag the *combinations* that are dangerous together even when each is fine alone, and tier the survivors into allow / ask / deny.

## What This Skill Produces

- **The permission inventory** — every tool/capability the agent has, each with its blast radius (what's the worst it enables)
- **The least-privilege cuts** — the capabilities the task doesn't need, removed with the reasoning
- **The dangerous-combination flags** — the tool pairs that are safe alone and dangerous together (read-secrets + network = exfiltration)
- **The allow/ask/deny tiering** — each surviving capability assigned, with ask-gates on the irreversible

## Required Inputs

Ask for these if not provided:
- **The full capability list** — every tool, MCP server, and native power (file, shell, browser, computer use, network) the agent has or would get; the review needs the actual grant, not the intended use
- **The task** — what the agent is *for*; least privilege is defined against the task, and "convenience" grants are exactly what this removes
- **The environment's sensitivity** — a sandbox vs. a machine with production access, real credentials, and company data (blast radius is capability × environment)
- **The autonomy level** — supervised or autonomous; autonomous agents need more denied and more gated, because no human catches the misuse live

## Framework: The Review Rules

1. **Inventory by blast radius, not by name:** each capability gets its worst-case — `read_file` (exposure of anything reachable), `run_shell` (arbitrary code = everything), `send_email` (reaches humans, irreversible), `web_fetch` (exfiltration channel + injection intake), `http_post` (data can leave). The name is benign; the blast radius is the truth. Shell and computer-use are the maximal grants — they subsume most others and deserve the hardest scrutiny.
2. **Least privilege is the whole game:** for each capability, ask "does *this task* need it?" — a research agent needs read + fetch, not shell or send; a code-review agent needs read, not write or network. The default failure is granting a broad tool set "so it can handle anything," which maximizes blast radius for a task that used a fraction of it. Remove first, justify what stays.
3. **The dangerous combinations — the non-obvious risk:** capabilities safe alone become exploits together. *Read-secrets + any-network* = exfiltration (read the `.env`, POST it out). *Web-fetch + shell* = fetch-and-run (a page tells it to run something). *File-write + broad-scope* = self-modification or planting. *Read-untrusted + send* = injection-to-action (read a malicious email, forward the data). The review flags every such pair present and either breaks the combo (drop one) or gates it hard.
4. **Tier the survivors — allow / ask / deny:** *allow* the reversible, low-blast reads and analysis. *Ask* (human confirmation, details shown) the irreversible and the moderate-blast — sends, writes, purchases, deletes. *Deny* what the task doesn't need at all, especially shell and unrestricted network unless they're genuinely the point. The tiering is enforced by the tool's permission config, not by trusting the agent to self-restrain.
5. **Autonomy shifts every dial toward restriction:** a supervised agent can hold more allows because a human is watching; an autonomous one moves grants toward ask-or-deny, adds rate/volume caps, and keeps the kill-switch ([blast-radius-drill](../blast-radius-drill/SKILL.md)) ready — because the whole point of autonomy is that no one's checking each action, which is exactly when over-permission turns into incident.

## Output Format

# Tool Permission Review: [agent/task] — env: [sandbox/production]

## The Inventory (by blast radius)
| Capability | Blast radius (worst case) | Task needs it? |
|---|---|---|

## Least-Privilege Cuts
[Removed: capability → why the task doesn't need it]

## Dangerous Combinations
[Flagged pairs present → the exploit they enable → break-the-combo or hard-gate]

## Allow / Ask / Deny
| Capability | Tier | Gate details (for ask) |
|---|---|---|

## Autonomy Adjustments (if autonomous)
[Grants shifted toward ask/deny · rate/volume caps · the kill-switch]

## Quality Checks

- [ ] Every capability is inventoried by blast radius, not just named
- [ ] Least privilege was applied — grants trace to a task need or they're cut
- [ ] Dangerous combinations are flagged and broken or gated
- [ ] Every survivor is tiered allow/ask/deny and enforced in config
- [ ] Autonomous setups shifted toward restriction with caps and a kill-switch

## Anti-Patterns

- [ ] Do not grant by convenience — every unneeded capability is pure blast radius
- [ ] Do not review tools in isolation — the dangerous combinations are where the exploits live
- [ ] Do not trust the agent to self-restrain — tiers are enforced by config, not by good intentions
- [ ] Do not grant shell or computer-use casually — they subsume most other tools and deserve the hardest deny-by-default
- [ ] Do not give an autonomous agent supervised-grade permissions — no human is checking, so the grants must
