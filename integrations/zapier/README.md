# PM Skills — Zapier app

Bring the library into any Zap:

- **Find a Skill** — search the catalogue by keyword (no key).
- **Get a Skill** — fetch one skill's full instructions (no key).
- **Run a Skill** — run a skill on text using **your** Anthropic key (a password
  input; used for the call only, never stored by the app).

[`index.js`](index.js) is a [Zapier Platform Core](https://platform.zapier.com/)
app definition, kept dependency-free so it reads as a spec.

## Build & push

```bash
npm i -g zapier-platform-cli
zapier init pm-skills-zapier   # or copy this dir
# drop index.js + package.json in, then:
npm install
zapier push
```

## Why BYO key

The read actions are public. **Run a Skill** deliberately takes the user's
Anthropic key as an input field rather than storing app-level credentials — so
the app holds no secrets and every run bills to the person invoking it. The skill
is fetched from the public API and its `instructions` become the model's system
prompt.

MIT © Mohit Aggarwal
