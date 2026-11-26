# PM Skills — GitHub Action

Run any skill from this library inside **your** repo's CI. Turn the library's frameworks
into automation: auto-write PR descriptions, generate release notes and changelogs, or run
a code-review checklist — on every push or PR.

```yaml
- uses: mohitagw15856/pm-claude-skills/action@main
  with:
    skill: pr-description-writer
    input: ${{ steps.diff.outputs.text }}
    api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

## Inputs

| Input | Required | Description |
|---|---|---|
| `skill` | ✅ | Skill name, e.g. `pr-description-writer`, `changelog-generator`, `code-review-checklist`. |
| `input` | — | The text/context to run the skill on. |
| `input_file` | — | Read input from a file instead of `input`. |
| `api_key` | ✅ | Anthropic API key (store as a repo secret). |
| `model` | — | Model id. Empty uses the `default` role in `data/models.json` (currently `claude-sonnet-5-5`). |
| `output_file` | — | Also write the result to this file. |

**Output:** `result` — the skill's output (use `output_file` for long, multi-line results).

## Example — auto-write a PR description

```yaml
name: PR description
on: { pull_request: { types: [opened] } }
permissions: { contents: read, pull-requests: write }
jobs:
  describe:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - id: diff
        run: |
          echo "text<<EOF" >> "$GITHUB_OUTPUT"
          git diff origin/${{ github.base_ref }}...HEAD --stat >> "$GITHUB_OUTPUT"
          echo "EOF" >> "$GITHUB_OUTPUT"
      - id: skill
        uses: mohitagw15856/pm-claude-skills/action@main
        with:
          skill: pr-description-writer
          input: ${{ steps.diff.outputs.text }}
          api_key: ${{ secrets.ANTHROPIC_API_KEY }}
      - uses: actions/github-script@v7
        with:
          script: |
            github.rest.pulls.update({ owner: context.repo.owner, repo: context.repo.repo,
              pull_number: context.issue.number, body: process.env.BODY })
        env: { BODY: ${{ steps.skill.outputs.result }} }
```

## 📦 Turnkey recipes — copy one file, done

Ready-made workflows in [`examples/`](examples/) — copy into `.github/workflows/`, add the `ANTHROPIC_API_KEY` secret, and skills start working in your CI:

| Recipe | Trigger | What lands |
|---|---|---|
| [`pr-description.yml`](examples/pr-description.yml) | PR opened | A drafted description posted as a comment (never overwrites the author's) |
| [`release-changelog.yml`](examples/release-changelog.yml) | Release published | User-facing notes generated from the commit log, prepended to the release body |
| [`incident-postmortem.yml`](examples/incident-postmortem.yml) | Issue labelled `incident` | A blameless-postmortem scaffold posted on the issue, pre-filled from its body |
| [`doc-lint.yml`](examples/doc-lint.yml) | PR touching `docs/**` / `*.prd.md` | Pass/fail verdicts against a skill's Quality Checks, commented on the PR |

## Other ideas

- `skill: changelog-generator` from `git log` → write `CHANGELOG.md`.
- `skill: release-notes` on tag push → set the GitHub Release body.
- `skill: code-review-checklist` → post a review checklist as a PR comment.

Pin to a release tag (e.g. `@v19`) for stability once you've tried `@main`.

## Publishing to the GitHub Marketplace

Marketplace listings require `action.yml` at a repo root, so this in-repo action ships as `mohitagw15856/pm-claude-skills/action@main`. To list it: mirror `action/` into a dedicated `pm-skills-action` repo (a 5-minute copy + tag), publish from there, and keep this directory as the source of truth.
