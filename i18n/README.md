# 🌍 i18n — the library in your language

Machine-translated skill editions, one directory per language (`i18n/<lang>/skills/<name>/SKILL.md`), produced by [`scripts/translate-skills.mjs`](../scripts/translate-skills.mjs) and structurally validated against their English sources (same sections, same code blocks, same `name` routing key — CI runs `--check`).

**Honest labelling:** every file's frontmatter carries `machine-translated … review: pending` until a native speaker reviews it (PRs very welcome — reviewing a translation is one of the highest-leverage first contributions). The English `skills/` tree remains canonical; translations follow it, never fork from it.

```bash
ANTHROPIC_API_KEY=… node scripts/translate-skills.mjs --lang es          # Production-Ready tier (default scope)
node scripts/translate-skills.mjs --check                                # validate all translations, no API
```

## The strategy: descriptions first

At 1153 skills, translating every body in every language is not a project anyone
finishes — the previous approach reached **4.3% of one language, none of it
reviewed**, which reads worse to a visitor than no translations at all.

So the unit of translation is the **description**, not the body:

```bash
ANTHROPIC_API_KEY=… node scripts/translate-skills.mjs --lang de --descriptions --all
# → i18n/de/descriptions.json
```

The description is the entire basis on which a model decides a skill is
relevant. Translating it makes the library *findable* in a language — which is
the thing that actually matters — at roughly 2% of the tokens of a full pass,
and it completes rather than trailing off at 4%. Full bodies stay worthwhile for
the Production-Ready tier, where somebody will genuinely sit and read the skill.

## Why bodies rot

`node scripts/translate-skills.mjs --check` currently reports **50 of 50**
Spanish bodies as structurally drifted: the English sources gained sections
after translation, so every one is now incomplete. Nothing was broken — this is
simply what full-body translation costs. Each edit to an English skill silently
invalidates its translations, and `i18n-status` now shows that as a `drifted`
column rather than letting it accumulate unseen.

Descriptions drift far less, and re-running them is cheap enough to be routine.

## Three surfaces, deliberately

`node scripts/i18n-status.mjs` reports all of them, because reporting one made
the real coverage impossible to see:

| Tree | What it is | Contract |
|---|---|---|
| `i18n/<lang>/skills/` | Machine-translated full bodies | Structure-checked against the English source (`--check`) |
| `i18n/<lang>/descriptions.json` | Machine-translated descriptions | The discovery layer; one file per language |
| `skills-i18n/<lang>/` | Human/community translations | Parity-gated by `tests/i18n-parity.mjs` |

The English `skills/` tree is canonical in all three cases.

Supported language codes so far: `es` `pt` `hi` `ja` `de` `fr` `zh` `ko` — adding one is a single line in the script's `LANGS` map. Translation runs are also available as a manual GitHub Action (**Translate skills**), which commits results back.
