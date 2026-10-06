---
name: docs-quickstart
description: "Write a 'get started in 5 minutes' quickstart for a tool, library, or API. Use when asked to write a quickstart, getting-started guide, or onboarding docs for developers. Produces a copy-paste-friendly quickstart that takes a developer from zero to a first working result fast, with install, a minimal working example, and clear next steps."
---

# Docs Quickstart Skill

The quickstart is the most important page in any developer docs — it decides whether someone gets a win in
five minutes or bounces. This skill writes a tight, copy-paste-able quickstart that takes a dev from **install
→ first working result** with the absolute minimum of steps, then points them to what's next.

## Required Inputs

Ask for these only if they aren't already provided:

- **What it is** — the tool/library/API and what a developer uses it for.
- **Install & setup** — how to install; any key/auth/config needed to start.
- **The "hello world"** — the smallest meaningful thing it can do (the first win).
- **Environment** — language(s)/runtime, prerequisites.
- **Next steps** — where to go deeper (key guides, API reference, examples).

## Output Format

### Quickstart: [Product]

> Get from zero to [first result] in ~5 minutes.

**Prerequisites** — the short list (versions, account/key) — only what's truly required.

**1. Install**
```
# the actual install command(s)
```

**2. Configure / authenticate** (only if needed) — the minimal setup, with where to get a key.

**3. Your first [result]** — the smallest complete, runnable example:
```
# copy-paste-able code that actually works end to end
```

**4. What you should see** — the expected output, so they know it worked.

**Next steps** — 3–4 links/pointers: the core concept to learn next, the API reference, more examples, how to get help.

**Troubleshooting** (optional) — the 1–2 most common first-run errors and the fix.

## Quality Checks

- [ ] A developer can copy-paste their way to a working result — no missing steps
- [ ] The first example is the *minimal* one (one clear win), not a feature tour
- [ ] Prerequisites list only what's truly required to start
- [ ] Expected output is shown so success is unambiguous
- [ ] Next steps point to the right deeper resources

## Anti-Patterns

- [ ] Do not front-load concepts/architecture — get them to a working result first, explain later
- [ ] Do not assume hidden setup — every step needed to run must be present
- [ ] Do not show a huge "kitchen sink" example as the first one — minimal win first
- [ ] Do not skip the expected output — devs need to confirm it worked
- [ ] Do not leave dead-ends — always point to what's next

## Based On

Developer documentation practice (the Diátaxis "tutorial" / time-to-first-success quickstart pattern).

## Example Trigger Phrases

- "Write a quickstart."
- "Write a getting-started guide for our API."
- "Get a developer to a working call in five minutes."
- "Write onboarding docs for developers."
