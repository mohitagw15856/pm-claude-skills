# Publishing the Skill Packs as GPTs and Gemini Gems (reach idea #5)

The `custom-gpt` and `gemini-gem` integrations already exist as *code*. This publishes the **persona packs** (`PACKS.md`) as **listed, discoverable** GPTs in the GPT Store and Gems in Gemini — the surface that reaches people who will never install a plugin: a new parent, someone in debt, someone who just lost a person.

Each file in this folder is a ready-to-paste instruction set for one pack. Same voice as `../instructions.md`, scoped to the pack, with the not-advice boundary hard-wired.

## Publish a GPT (GPT Store)
1. ChatGPT → Explore GPTs → **Create** → *Configure* tab.
2. **Name / Description** from the file's header. Upload the crest as the icon (`web/docs-assets/logos/`).
3. **Instructions** → paste the file body.
4. **Actions** → import `../actions-openapi.json` (lets the GPT fetch live skills). If you'd rather ship static, paste the pack's skills from `exports/chatgpt/` as Knowledge files.
5. **Conversation starters** → the file's *Starters* list.
6. Share → **Public / GPT Store**, category *Lifestyle* (life packs) or *Productivity*. Add the repo link in the description.

## Publish a Gem (Gemini)
1. Gemini → Gems → **New Gem**. Name + instructions from the file. Gems don't run actions — paste the pack's skills from `exports/gemini/` as the Gem's knowledge.
2. Share the Gem link; add it to the README badge row.

## Rules for every pack listing
- The **not-advice boundary** stays in the instructions; the GPT routes to real help for high-stakes questions.
- **No telemetry claims you can't keep** — store platforms log conversations; say so in the description.
- Link back to the repo + Playground in every description (the funnel).
- Keep the skill list current: regenerate from `PACKS.md` when it changes.

Packs here: `new-parent.md` · `just-laid-off.md` · `money-in-crisis.md` · `losing-someone.md`. Add the rest (`new-to-this-country`, `caring-for-a-parent`, `starting-over`, `serious-about-ai`) with the same template.
