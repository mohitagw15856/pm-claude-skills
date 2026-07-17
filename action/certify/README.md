# 🎖 Agent Conformance Certification — as a CI step

The [conformance suite](../../conformance/) certifies **agents** (not models): does yours discover the right skill, refuse when it should, keep the output structure, self-verify, and honor the honesty gate? Five tasks, deterministic verifier, pass/fail.

```yaml
- name: Run my agent over the conformance tasks
  run: ./my-agent-runner conformance-tasks/ --out results/   # however your agent runs
- uses: mohitagw15856/pm-claude-skills/action/certify@main
  with:
    results_dir: results/
```

The tasks live at [`conformance/tasks.json`](../../conformance/tasks.json) — your runner answers each task; the verifier grades the outputs. 5/5 = certification-eligible: submit the passing run per the [conformance README](../../conformance/README.md) to get listed and earn the badge. The trust triad: skills ([SkillSpec](https://github.com/mohitagw15856/skillspec)), models ([SkillBench](../../skillbench/)), agents (this).
