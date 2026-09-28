# Run the evals yourself, with promptfoo

The library's curated eval cases, runnable against any model provider with [promptfoo](https://www.promptfoo.dev). You do not need this library's own runner or an Anthropic key.

One case per skill. Each case loads the skill's instructions as the system message and sends a realistic request as the user message, which is exactly how the library's own runner calls a skill.

## Check it works, no key needed

```bash
npm run evals:promptfoo:smoke
```

This uses promptfoo's `echo` provider, which returns the prompt it was given. It proves that every case loads and every prompt is built. It costs nothing and says nothing about quality.

## Run for real

```bash
export ANTHROPIC_API_KEY=sk-ant-...
PF_MAX=10 npm run evals:promptfoo        # ten cases first, to see the cost
npm run evals:promptfoo                  # all of them
npx promptfoo@0.123.1 view               # results in the browser
```

Another provider: set its key and pass it on the command line. The grader for the quality check follows promptfoo's defaults for the keys you have set.

```bash
cd evals/promptfoo
npx promptfoo@0.123.1 eval -c promptfooconfig.yaml --providers openai:gpt-4.1-mini
```

## Narrow a run

| Variable | Effect |
|---|---|
| `PF_SKILLS=prd-template,meeting-notes` | Only these skills |
| `PF_MAX=10` | At most this many cases |

## What is checked

| Check | Kind | Passes when |
|---|---|---|
| `not-empty` | Deterministic | The output is at least 200 characters |
| `no-placeholder` | Deterministic | No `[insert` or `lorem ipsum` text |
| `quality` | Model-graded | Structure, completeness, usefulness and grounding all hold. An output that asks for missing inputs, without inventing them, passes on grounding |

The four quality dimensions are the same ones the library's own judge uses in `evals/run-evals.mjs`. The scale differs: promptfoo gives pass or fail, the library's judge gives 1 to 5 per dimension. Do not compare the two numbers directly.

## How it is built

| File | Role |
|---|---|
| `promptfooconfig.yaml` | The real run |
| `promptfooconfig.smoke.yaml` | The no-key smoke run |
| `prompts/skill-chat.cjs` | Builds the two messages. A function, so skill text is passed through untouched |
| `tests.cjs` | Reads `../cases.json` at run time. Nothing is generated, so nothing goes stale |

```bash
node evals/promptfoo/tests.cjs --selftest   # no network, no promptfoo
node evals/promptfoo/tests.cjs --count
```

## Adding a case

Add it to [`evals/cases.json`](../cases.json). It appears here on the next run.

Library: https://github.com/mohitagw15856/pm-claude-skills
