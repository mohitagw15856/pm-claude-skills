# 🧬 pm-skills dataset — distill the library into a model

The skills library as **training data**: 420 skills of codified professional judgment, their curated eval cases, and graded sample outputs — regenerated deterministically from the canonical sources by [`scripts/build-dataset.mjs`](../scripts/build-dataset.mjs). The end goal is **`pm-skills-3b`**: a small, fully local model that carries the library's judgment offline — for laptops, regulated industries, and zero-cost inference (the playground's in-browser WebLLM path is the natural runtime).

```bash
node scripts/build-dataset.mjs   # rebuild after skills change
```

## Files

| File | Rows | What it teaches | Ready to train? |
|---|---|---|---|
| `routing.jsonl` | ~1,500 | **Skill routing** — task phrasing → skill name. Chat-format triplets derived mechanically from each skill's "Use when …" triggers. | ✅ Yes, as-is |
| `sft-seeds.jsonl` | ~110 | **Doing the work** — `{system: full SKILL.md body, user: curated eval input, assistant: null}`. Seeds for completion generation. | ⚠️ Needs stage 1 below |
| `samples.jsonl` | ~22 | Full SFT triplets from the published, human-reviewed [sample outputs](https://mohitagw15856.github.io/pm-claude-skills/examples.html). | ✅ Yes (small) |

## The two-stage distillation recipe

1. **Generate completions with a teacher.** For each row of `sft-seeds.jsonl`, call a strong model (Claude Sonnet/Opus) with `system` + `user` and store the answer in `assistant`. Widen the set by generating 3–5 paraphrased inputs per eval case first (the eval-case *shape* is the valuable part). Expect ~500–2,000 high-quality triplets.
2. **Filter, then fine-tune.** Score every generated completion with the repo's eval rubric ([`evals/run-evals.mjs`](../evals/run-evals.mjs) — LLM-as-judge); keep ≥4/5 only. Fine-tune a small instruct model (Qwen2.5-3B / Llama-3.2-3B) with any standard SFT stack (LoRA is fine) on `routing.jsonl` + the filtered triplets + `samples.jsonl`. Evaluate the result against the *same* eval harness the library uses — the pass bar already exists.

Publish to Hugging Face as `pm-skills-instruct` (dataset) and `pm-skills-3b` (model), pointing back to this repo as the living source; the dataset regenerates every release, so version tags here map cleanly to dataset versions there.

## License & provenance

Everything derives from this repository's MIT-licensed skills; the dataset carries the same [MIT license](../LICENSE) — attribution appreciated: *"built from [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills)"*. `sft-seeds.jsonl` contains **no model outputs** (assistant is null); `samples.jsonl` rows carry a `source` field disclosing which model produced each sample. If you generate stage-1 completions, check your teacher-model provider's terms for distillation use.
