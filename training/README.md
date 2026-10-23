# PM-8B: the library distilled into an open model

The pipeline to train **PM-8B**: a QLoRA fine-tune of Qwen3-8B that carries the library's judgment. It learns which skill a task needs, what shape the answer takes, and, from the teacher pass, how a skilled answer actually reads. It runs locally and offline, with zero inference cost.

## Start here: no API credit, one rented GPU

```bash
# on a GPU box (one 80 GB card), inside tmux
git clone https://github.com/mohitagw15856/pm-claude-skills && cd pm-claude-skills
HF_TOKEN=hf_... HF_USER=<your-hf-name> bash training/run-on-gpu.sh
```

`training/run-on-gpu.sh` does everything in one go. It serves an open teacher model (Qwen3-32B by default) with vLLM, generates and judges the teacher data, trains PM-8B, scores it against its base model on held-out skills, and exports it for Ollama and the playground. Expect about 4 to 6 hours and $8 to $15 of GPU rental. **No Anthropic credit** is used, and your laptop only starts it. The Claude-based route below still works, but only with `--allow-api-spend`.

Try the pipeline cheaply first with `LIMIT=10 SKIP_EXPORT=1` (about 30 to 45 minutes). It runs every step on a small sample, so a setup problem shows up before you pay for the full run. A later full run reuses the installs and continues the teacher pass. Give the server about 200 GB of disk. If a model server fails to start, the script stops and prints its log rather than waiting on a billed GPU.

## Status: pipeline complete; teacher pass and training await the owner

| Step | Command | State |
|---|---|---|
| 1. Routing and structure rows | `node training/build-sft-dataset.mjs` → `sft.jsonl` | ✅ committed (646 rows from all 1,311 skills) |
| 2. Teacher pass | `node training/teacher-pass.mjs` → `teacher.jsonl` | 🔑 needs `ANTHROPIC_API_KEY`, about 560 completions plus 560 judge calls. Try `--dry-run`, then `--limit 50`. It resumes where it stopped. |
| 3. Mix and held-out split | `node training/build-pm-8b-mix.mjs` → `pm-8b-train.jsonl`, `pm-8b-heldout-tasks.json` | ✅ runs now; adds the teacher rows once they exist |
| 4. Train | `bash training/train-pm-8b.sh` (axolotl, `pm-8b.yml`) | 💳 one 24 GB+ GPU, 1-3 hours, about $2-10 rented |
| 5. Evaluate | SkillBench with `local:` models (below) | ▶️ after step 4 |
| 6. Publish | `HF_REPO=<you>/pm-8b-lora bash training/train-pm-8b.sh` uploads with `MODEL_CARD.md` | 🔑 your Hugging Face account |
| 7. Run it locally | `bash training/export-pm-8b.sh` merges the adapter and makes an Ollama model (GGUF, Q4_K_M) and WebLLM weights; then set `released: true` in `web/pm-8b.json` and PM-8B appears in the playground's In-browser and Ollama lists | 🔑 after step 6 |

The **PM-8B dataset** workflow (`.github/workflows/pm-8b-dataset.yml`, manual) runs steps 2 and 3 in CI with the repository's Anthropic key. It uploads the mix as a workflow artifact, so a GPU box can download it without the key.

## The held-out evaluation

`training/pm-8b-split.mjs` holds about 10% of the skills out of every training row, deterministically by name. The held-out tasks come in SkillBench format, so the same judge and rubric score PM-8B against its own base model:

```bash
# Serve both with Ollama (or vLLM / llama.cpp; set LOCAL_BASE_URL to its /v1 endpoint)
LOCAL_API_KEY=x node skillbench/run-skillbench.mjs --models local:pm-8b,local:qwen3:8b \
  --tasks training/pm-8b-heldout-tasks.json --out training/pm-8b-results.json
```

Read the **bare** column: it is the skill's judgment without the skill. If PM-8B's bare score does not beat the base model's, the fine-tune did not work, and that is the number to report.

## Honest expectations

Routing and structural discipline transfer well. Depth transfers in proportion to the teacher rows: a few hundred kept answers across 1,311 skills teach the house style, not every skill's specifics. Publish the held-out numbers, not impressions.

## Older artefacts

`axolotl-config.yml` (Qwen2.5-7B on `sft.jsonl` only) is the earlier, routing-only recipe, kept for comparison. `../dataset/` holds the broader dataset export (`scripts/build-dataset.mjs`).
