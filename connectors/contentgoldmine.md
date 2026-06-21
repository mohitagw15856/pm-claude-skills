# ⛏️ ContentGoldMine — automate the creator stack

PM Skills is the **craft layer** for content creators: skills that teach an AI *how* a pro structures a hook, a thread, a newsletter, a Reel ([`pm-creator`](../plugins/pm-creator)). **[ContentGoldMine](https://github.com/mohitagw15856/ContentGoldMine)** is the **automation layer**: a Python app that runs that same pipeline end-to-end — one input → five platform formats, scored for virality and auto-published.

> **Learn the craft here (free, any AI). Automate it at scale there.** Same philosophy, two layers of the same stack.

## When to use which

| You want to… | Use |
|---|---|
| Understand *why* a hook works and write one yourself, in any AI | **PM Skills** — [`hook-writer`](../skills/hook-writer/SKILL.md), [`content-repurposer`](../skills/content-repurposer/SKILL.md), the [`/repurpose`](../commands/repurpose.md) recipe |
| Turn **one URL into 5 formats** automatically, with viral scores + carousel images | **[ContentGoldMine](https://github.com/mohitagw15856/ContentGoldMine)** |
| **Auto-publish** to X/LinkedIn or push to Buffer/Zapier/Make/n8n | **ContentGoldMine** |
| Define your niche, voice, and pillars once so everything stays on-brand | **PM Skills** — [`creator-brand-kit`](../skills/creator-brand-kit/SKILL.md) |
| Land sponsorships (media kit, outreach, rates) | **PM Skills** — [`creator-media-kit`](../skills/creator-media-kit/SKILL.md) |

## The flow

1. **Set your foundation** — run [`creator-brand-kit`](../skills/creator-brand-kit/SKILL.md) once; paste the result into ContentGoldMine's *brand voice* field (or your `CONTEXT.md`) so both layers sound like you.
2. **Draft & learn** — use the [`/repurpose`](../commands/repurpose.md) recipe to atomize a piece and *see the structure* a pro uses.
3. **Scale it** — point ContentGoldMine at the source URL to generate, score, and publish the full pack in one click.

## Powered by PM Skills (for ContentGoldMine devs)

ContentGoldMine's per-platform transformers are exactly the kind of structured instructions these skills encode. Instead of hand-maintaining prompts, you can have it pull them from this library's MCP server:

```bash
claude mcp add pm-skills -- npx -y pm-claude-skills-mcp
```

Then a transformer fetches the relevant skill (`get_skill content-repurposer`, `get_skill short-form-script`, `get_skill newsletter-writer`) and applies it — so the app and the open library stay in sync. See [`../mcp/README.md`](../mcp/README.md).
