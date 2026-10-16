# The jobs exam: AI marked by people who do the job

SkillBench's other sets are scored by an AI judge on a general rubric. The jobs exam is scored by **people in the occupation**, on **their own marking scheme**:

1. **A practitioner writes a paper**: a real task from their work (anonymised), how long a qualified person would take, a marking scheme with points and marks, the fatal errors that fail an answer outright, and a pass mark. They submit it through the [jobs-exam paper issue](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=jobs-exam-paper.yml). A maintainer checks it and adds it to [`papers.json`](papers.json).
2. **Models sit it.** `run.mjs` stores each answer under a random id in `answers/<paper>.json`, shuffled and with model and vendor names redacted. The key that unblinds them goes to `.key.json`, which is never committed until grading closes.
3. **Graders in the same occupation mark it blind** on [jobs-exam.html](https://mohitagw15856.github.io/pm-claude-skills/jobs-exam.html), which submits the marks as an issue. A maintainer adds them to `grades/<paper>.json`.
4. **`score.mjs` unblinds and scores.** An answer counts only with **two or more graders**. Its mark is their mean, and it fails if most graders found a fatal error. The spread between graders is published with every answer.

The result is a pass rate per model per occupation: "would a payroll officer sign this off?", not "did another model like it?".

## Run it (free)

```bash
ollama pull qwen2.5:3b && ollama pull llama3.1:8b
node skillbench/jobs-exam/run.mjs --models local:qwen2.5:3b,local:llama3.1:8b
# later, when each answer has two or more grades:
node skillbench/jobs-exam/score.mjs --key skillbench/jobs-exam/.key.json
```

`local:` is Ollama or any OpenAI-compatible server (`LOCAL_BASE_URL`). `cf:` uses Cloudflare Workers AI's free allowance (`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`). Paid APIs (`claude-*`, `gpt-*`) refuse to run without `--allow-api-spend`.

## Rules

- **Papers come from people who do the job.** The `example` in `papers.json` is a format example written by the maintainers. It's marked `example_only` and is never scored.
- **No invented grades.** Every grade links the issue it came from. `scripts/check-jobs-exam.mjs` (in `npm run check`) rejects grades for answers that don't exist, marks outside a point's range, answers that name a model, and papers without an author's credential and issue.
- **Graders stay blind.** The key is published only after grading closes, with the results.
- Papers are versioned (`version` in `papers.json`). A paper that has been graded isn't edited; a fixed one gets a new id.
