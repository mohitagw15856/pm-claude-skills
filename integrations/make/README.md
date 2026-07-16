# PM Skills — Make (Integromat) custom app

Bring the library into a [Make](https://make.com) scenario: **Find a Skill**,
**Get a Skill** (full instructions), and **Run a Skill** on your text with your
own Anthropic key.

[`pm-skills.app.json`](pm-skills.app.json) is a custom-app blueprint you paste
into Make's app builder:

1. Make → **Custom apps** → *Create a new app* → import / paste the blueprint.
2. The three modules appear; use them in a scenario like any other app.
3. For **Run a Skill**, supply your Anthropic key in the module — it's used for
   that call only and not stored by the app.

The read modules (Find/Get) hit the public API and need no key. `Run a Skill`
chains two calls: fetch the skill's `instructions`, then call the model with them
as the system prompt.

> Blueprint format follows Make's custom-app module spec (base URL, `communication`,
> `response.iterate/output`). Treat it as the contract; adjust field mappings to
> your Make plan's builder as needed.

MIT © Mohit Aggarwal
