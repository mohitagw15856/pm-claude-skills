#!/usr/bin/env bash
# Train PM-8B on any machine with one 24 GB+ GPU (RunPod, Modal, Lambda, a Colab A100).
# Rough cost: 1-3 GPU-hours, about $2-10 at current A100/L40S rental prices.
#
#   bash training/train-pm-8b.sh                   # train only
#   HF_REPO=<you>/pm-8b-lora bash training/train-pm-8b.sh   # train, then upload the adapter
#
# Needs the mix first: node training/teacher-pass.mjs && node training/build-pm-8b-mix.mjs
set -euo pipefail
cd "$(dirname "$0")/.."
[ -s training/pm-8b-train.jsonl ] || { echo "training/pm-8b-train.jsonl is missing: run node training/build-pm-8b-mix.mjs"; exit 1; }
# No flash-attn: it compiles from source and often fails on a plain server; PyTorch's
# own attention (sdp_attention in pm-8b.yml) is nearly as fast on an A100 or H100.
command -v axolotl >/dev/null || { pip install -q torch && pip install -q axolotl huggingface_hub; }
# Upload with the current Hugging Face CLI (hf), or the older huggingface-cli.
hf_upload() { if command -v hf >/dev/null; then hf upload "$1" "$2" . --repo-type model; else huggingface-cli upload "$1" "$2" . --repo-type model; fi; }
axolotl train training/pm-8b.yml
if [ -n "${HF_REPO:-}" ]; then
  cp training/MODEL_CARD.md training/out/pm-8b-lora/README.md
  hf_upload "$HF_REPO" training/out/pm-8b-lora
  echo "Uploaded to https://huggingface.co/$HF_REPO"
fi
echo "Next: serve it (for example, merge and import into Ollama as pm-8b) and score it on the held-out set:"
echo "  LOCAL_API_KEY=x node skillbench/run-skillbench.mjs --models local:pm-8b,local:qwen3:8b --tasks training/pm-8b-heldout-tasks.json --out training/pm-8b-results.json"
