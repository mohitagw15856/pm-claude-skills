# 🔗 Lovable — build skill-powered apps

[Lovable](https://lovable.dev) turns prompts into full-stack web apps (React + Vite +
Tailwind, usually with a Supabase backend). PM Skills is the **content/brains layer**: your
Lovable app provides the UI and the model call; PM Skills provides the structure that makes
the output professional instead of generic.

The bridge is the read-only **REST API / static catalogue** — no SDK, no auth, open CORS, so
a Lovable app can `fetch()` it directly from the browser or from a Supabase edge function.

---

## Pattern A — client-side, bring-your-own-key (no backend)

This mirrors the official [Skill Playground](https://mohitagw15856.github.io/pm-claude-skills/):
the user pastes their own model key, the app fetches a skill, and calls the provider
directly. Nothing touches a server you own.

```js
// 1) List skills for a picker
const { skills } = await fetch(
  'https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills'
).then(r => r.json());

// 2) Pull the chosen skill's instructions
const skill = await fetch(
  `https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills/${name}`
).then(r => r.json());

// 3) Run it with the user's own key (Anthropic shown)
const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': userKey,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-opus-4-8',
    max_tokens: 2048,
    system: skill.instructions,        // the skill body = the system prompt
    messages: [{ role: 'user', content: userInput }],
  }),
});
```

> No-deploy fallback: `https://mohitagw15856.github.io/pm-claude-skills/skills.json` is the
> same catalogue as static JSON (`name`, `title`, `description`, `plugin`, `instructions`).

---

## Pattern B — Supabase edge function (key stays server-side)

For a real product where you don't want the key in the browser, proxy the model call through
a Supabase edge function. The function fetches the skill, prepends it as the system prompt,
and calls the provider with a secret key — your React UI only ever talks to your function.

```ts
// supabase/functions/run-skill/index.ts (sketch)
const skill = await fetch(`${PM_SKILLS}/v1/skills/${name}`).then(r => r.json());
const out = await callModel({ system: skill.instructions, user: input, key: Deno.env.get('ANTHROPIC_API_KEY') });
return new Response(JSON.stringify(out));
```

---

## Make Lovable's generator skill-aware

Paste the block below into your Lovable project's **Knowledge** (or your first prompt). It
teaches Lovable how to wire PM Skills into anything it builds — so "add a PRD generator"
just works.

```text
KNOWLEDGE: PM Skills integration
PM Skills is a free, read-only, CORS-open catalogue of 205 professional "skill"
prompts (PRDs, exec updates, launch plans, etc.). Use it whenever the app needs to
produce a structured professional document.

Base URL: https://pm-skills-mcp.pm-claude-skills.workers.dev
- GET /v1/skills              -> list skills: [{name,title,description,bundle,tier}]
- GET /v1/skills/{name}       -> one skill: {..., instructions}  (the full prompt body)
- GET /v1/skills/{name}?format=md -> raw Markdown body
- GET /v1/search?q=<query>    -> keyword search
- GET /v1/workflows           -> multi-step "recipe" chains

To run a skill: fetch its `instructions`, use that string as the LLM system prompt,
and pass the user's input as the user message. Prefer the user's own API key on the
client, or a Supabase edge function if the key must stay secret. No auth is needed to
read the catalogue.
```

---

## Ship a starter

The fastest path is to clone the existing Playground (`web/` — vanilla JS, zero backend) as
a Lovable project and restyle it, then point `fetch` at `/v1/skills`. A polished, forkable
"Skill Studio on Lovable" reference template is on the roadmap —
[interested?](https://github.com/mohitagw15856/pm-claude-skills/issues)

## Safety

The PM Skills catalogue is read-only and unauthenticated — it only serves skill text. Treat
the user's model key like any secret: keep it client-side (Pattern A) or in Supabase secrets
(Pattern B), never in your repo.
