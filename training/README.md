# pm-skills-7b — distilling the library into an open model

The pipeline to train **the first open model distilled from a skills library**: a LoRA fine-tune that teaches a small model the library's *judgment shape* — which skill applies to a task, and what disciplined output structure + self-verification looks like.

## Status: pipeline complete, training awaits GPU budget

| Step | State |
|---|---|
| 1. Dataset | ✅ `node training/build-sft-dataset.mjs` → `sft.jsonl` (646 pairs: routing + structure, from all 625 skills + the 153 eval inputs) |
| 2. Teacher pass (optional, better) | 🔑 optional upgrade: generate full teacher completions for the 153 real inputs via `pm-claude-skills run` in a loop (~$3-5 on your key) and merge them in as richer targets — not yet scripted, straightforward when wanted |
| 3. Train | ▶️ press-go recipes below (~$10-25 GPU) |
| 4. Publish | `huggingface-cli upload` to your HF account, model card in `training/MODEL_CARD.md` |

## Train — pick one route

**A. Axolotl on Modal/RunPod (recommended, ~$10-25):**
```bash
pip install axolotl
axolotl train training/axolotl-config.yml     # Qwen2.5-7B-Instruct + LoRA r=16, ~2 epochs
```

**B. Free-tier Colab (T4, slower, smaller):** open a notebook, `pip install unsloth`, load `unsloth/Qwen2.5-7B-Instruct-bnb-4bit`, train on `sft.jsonl` with the same hyperparameters (config comments map 1:1).

**Honest expectations:** a 7B LoRA on 646 pairs learns *routing* and *structural discipline* convincingly; it does not learn the full depth of 625 skills. It's a demonstration artifact and a fast local router — the claim to publish is exactly that, no more.

## Hyperparameters (in axolotl-config.yml)
LoRA r=16 α=32 dropout=0.05 · lr 2e-4 cosine · 2 epochs · bf16 · seq len 2048 · chatml template.
