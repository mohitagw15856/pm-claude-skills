# Agent Arena

The Arena is a public, scored board of models and agents doing the same professional work: the 12 SkillBench tasks (a PRD, a postmortem, a board update and so on), each run bare and with the matching skill, graded 1 to 5 on the library's rubric. It lives on the [SkillBench page](https://mohitagw15856.github.io/pm-claude-skills/modelbench.html#arena), below the official rankings.

Anyone can enter. You run the benchmark on your own key and send the result in a pull request. This repository never pays for an entry and never runs one for you.

## What a row proves

- **Same work.** Every entry runs the frozen task set in `skillbench/tasks.json`. An entry for an older task set is refused.
- **Checkable.** Every entry links to a public GitHub Actions run, or, for a local run, to the outputs it saved, so anyone can read the answers and grade them again.
- **Self-consistent.** The headline score is recomputed from the per-task scores. A file whose score does not match its own tasks is rejected by `tests/checks/arena.mjs`, not ranked.
- **Judge disclosed.** The pinned judge is `claude-sonnet-4-6`. A different judge is allowed (including a free one) but the row is marked *unpinned*, because scores from different judges are not strictly comparable.

The Arena starts empty. Nothing is seeded, estimated or copied from elsewhere.

## Enter with GitHub Actions (recommended)

1. Fork the repository. In the fork, add these secrets: `BYO_API_KEY` (your endpoint's key), `BYO_BASE_URL` (any OpenAI-compatible base URL, such as `https://my-host.example/v1`; leave it out for OpenAI itself), and `BYO_JUDGE_KEY` (an Anthropic key for the pinned judge).
2. In the fork, run the **SkillBench (bring your model)** workflow. Give the model id your endpoint expects. If an agent sits behind the endpoint, add a label such as `My agent 2.1`.
3. Download the `skillbench-community-result` artifact. It holds `skillbench/community/<model>.json` and the saved outputs.
4. Open a pull request here that adds only that JSON file.

The workflow costs you the inference for 24 generations (12 tasks, bare and skilled) plus the judge passes. Run `node skillbench/run-skillbench.mjs --models <id> --dry-run` first to see the estimate.

## Enter from your own machine

```bash
# 1. Run the benchmark. --save-outputs keeps every answer so others can re-judge it.
LOCAL_BASE_URL=https://my-host.example/v1 LOCAL_API_KEY=… ANTHROPIC_API_KEY=… \
  node skillbench/run-skillbench.mjs --models local:my-model \
  --out /tmp/arena.json --save-outputs /tmp/arena-outputs

# 2. Publish /tmp/arena-outputs somewhere public (a gist or a repository), then stage the entry.
node scripts/stage-arena-submission.mjs --results /tmp/arena.json --model my-model \
  --agent "My agent 2.1" --outputs https://gist.github.com/you/abc123

# 3. Check it and open a pull request with skillbench/community/my-model.json.
node tests/checks/arena.mjs
```

Free judges work too: `--judge cf:@cf/meta/llama-3.3-70b-instruct-fp8-fast` (Cloudflare Workers AI's free allowance; set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`) or `--judge local-judge:<model>` against a model you serve yourself. The row will show *unpinned*.

## The submission file

`stage-arena-submission.mjs` writes it for you; this is what it contains.

```json
{
  "submitted_via": "skillbench-byo",
  "run": "https://github.com/you/pm-claude-skills/actions/runs/123456789",
  "agent": "My agent 2.1",
  "runs": [{
    "model": "my-model", "date": "2026-10-23", "taskSetVersion": 1, "harness": "1.1",
    "judge": "claude-sonnet-4-6", "score": 4.21, "bare": 3.96, "lift": 0.25,
    "tasks": [{ "task": "prd-template", "domain": "product", "bare": 4.0, "skilled": 4.5 }]
  }]
}
```

Rules: one file per entrant, named after the model (letters, digits, dot, dash, underscore). Exactly one run, every task listed once, every score from 1 to 5. Either `run` (an Actions run URL) or `outputs` (an https link to the saved answers). `agent` is optional, at most 80 characters.

## Review and removal

A maintainer opens the linked run or outputs before merging. An entry is removed, with a public note in the pull request, if the outputs do not match the scores, the run link is not the run that produced the file, or the answers were tuned to the judge rather than the task. A newer entry for the same model replaces the old file.
