# 🌍 i18n — the library in your language

Machine-translated skill editions, one directory per language (`i18n/<lang>/skills/<name>/SKILL.md`), produced by [`scripts/translate-skills.mjs`](../scripts/translate-skills.mjs) and structurally validated against their English sources (same sections, same code blocks, same `name` routing key — CI runs `--check`).

**Honest labelling:** every file's frontmatter carries `machine-translated … review: pending` until a native speaker reviews it (PRs very welcome — reviewing a translation is one of the highest-leverage first contributions). The English `skills/` tree remains canonical; translations follow it, never fork from it.

```bash
ANTHROPIC_API_KEY=… node scripts/translate-skills.mjs --lang es          # Production-Ready tier (default scope)
node scripts/translate-skills.mjs --check                                # validate all translations, no API
```

Supported language codes so far: `es` `pt` `hi` `ja` `de` `fr` `zh` `ko` — adding one is a single line in the script's `LANGS` map. Translation runs are also available as a manual GitHub Action (**Translate skills**), which commits results back.
