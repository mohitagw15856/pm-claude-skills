#!/usr/bin/env bash
# PM-8B, end to end, on one rented GPU, with no Anthropic credit: an open model
# served by vLLM is the teacher and the judge, then PM-8B trains, is scored on
# held-out skills against its base model, and is exported for Ollama/WebLLM.
#
# On a fresh Ubuntu GPU box (one 80 GB card, e.g. an A100 or H100, and 200 GB of
# disk; about 4 to 6 hours), as root, inside tmux so it survives a disconnect:
#   git clone https://github.com/mohitagw15856/pm-claude-skills && cd pm-claude-skills
#   HF_TOKEN=hf_... HF_USER=<your-hf-name> bash training/run-on-gpu.sh
#
# Try the whole pipeline cheaply first (about 30 to 45 minutes): LIMIT=10 SKIP_EXPORT=1.
# A later full run reuses the installs and continues the teacher pass.
#
# Options (env): TEACHER (default Qwen/Qwen3-32B-AWQ), LIMIT (teacher tasks, 0 = all),
# SKIP_EXPORT=1 to stop after scoring.
#
# vLLM, axolotl and the export tools each get their own virtualenv, because they
# pin different PyTorch versions and one would break the other in a shared one.
set -euo pipefail
cd "$(dirname "$0")/.."
TEACHER="${TEACHER:-Qwen/Qwen3-32B-AWQ}"
LIMIT="${LIMIT:-0}"
OUT=training/out
LOG=$OUT/run.log
mkdir -p "$OUT"
exec > >(tee -a "$LOG") 2>&1
step() { echo; echo "=== $(date -u +%H:%M) $* ==="; }
export HF_TOKEN="${HF_TOKEN:-}"   # read by every Hugging Face tool; needed for uploads
export HF_HUB_ENABLE_HF_TRANSFER=1

# Wait for a vLLM server, but stop (instead of waiting forever on a billed GPU)
# if it dies or takes longer than 40 minutes.
wait_for() { # port pid log
  local i=0
  until curl -sf "localhost:$1/v1/models" >/dev/null; do
    if ! kill -0 "$2" 2>/dev/null; then echo "✗ the server on port $1 stopped. Last lines of $3:"; tail -n 30 "$3"; exit 1; fi
    i=$((i + 1)); [ "$i" -gt 240 ] && { echo "✗ the server on port $1 did not start in 40 minutes. See $3"; kill "$2"; exit 1; }
    sleep 10
  done
}
venv() { # name packages...
  local d="$OUT/venv-$1"; shift
  [ -x "$d/bin/python" ] || uv venv -q --seed --python 3.11 "$d"
  VIRTUAL_ENV="$d" uv pip install -q "$@"
}

step "0/6 Tools"
nvidia-smi --query-gpu=name,memory.total --format=csv,noheader || { echo "✗ No NVIDIA driver. Install one (ubuntu-drivers install), reboot, and run this again."; exit 1; }
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq && apt-get install -y -qq git curl build-essential cmake python3-dev >/dev/null
command -v node >/dev/null || { curl -fsSL https://deb.nodesource.com/setup_24.x | bash - >/dev/null && apt-get install -y -qq nodejs >/dev/null; }
command -v uv >/dev/null || { curl -LsSf https://astral.sh/uv/install.sh | sh >/dev/null; }
export PATH="$HOME/.local/bin:$PATH"
venv serve vllm huggingface_hub hf_transfer
SERVE="$OUT/venv-serve/bin"
df -h . | tail -1 | awk '{ if ($4+0 < 150 && $4 ~ /G/) print "⚠ only " $4 " of disk free; the run needs about 150 GB" }'

step "1/6 Serve the teacher ($TEACHER) with vLLM"
"$SERVE/vllm" serve "$TEACHER" --port 8000 --max-model-len 16384 > "$OUT/vllm-teacher.log" 2>&1 &
VLLM=$!
wait_for 8000 $VLLM "$OUT/vllm-teacher.log"

step "2/6 Teacher pass (resumable: rerun the script to continue)"
node scripts/build-worked-examples.mjs >/dev/null
node training/teacher-pass.mjs --base-url http://localhost:8000/v1 --teacher "$TEACHER" --judge "$TEACHER" --limit "$LIMIT"
kill $VLLM; wait $VLLM 2>/dev/null || true

step "3/6 Training mix and held-out tasks"
node training/build-pm-8b-mix.mjs

step "4/6 Train PM-8B (QLoRA on Qwen3-8B)"
[ -x "$OUT/venv-train/bin/axolotl" ] || { venv train torch && venv train axolotl huggingface_hub hf_transfer; }
PATH="$OUT/venv-train/bin:$PATH" HF_REPO="${HF_USER:+$HF_USER/pm-8b-lora}" bash training/train-pm-8b.sh

step "5/6 Score PM-8B against its base model on held-out skills (judge: $TEACHER)"
# Two servers share the card: about 35% for PM-8B and its base, 45% for the judge.
"$SERVE/vllm" serve Qwen/Qwen3-8B --port 8001 --enable-lora --max-lora-rank 32 --lora-modules pm-8b=$OUT/pm-8b-lora \
  --max-model-len 8192 --gpu-memory-utilization 0.35 > "$OUT/vllm-eval.log" 2>&1 &
EVAL=$!
wait_for 8001 $EVAL "$OUT/vllm-eval.log"
"$SERVE/vllm" serve "$TEACHER" --port 8000 --max-model-len 16384 --gpu-memory-utilization 0.45 > "$OUT/vllm-judge.log" 2>&1 &
JUDGE=$!
wait_for 8000 $JUDGE "$OUT/vllm-judge.log"
LOCAL_BASE_URL=http://localhost:8001/v1 LOCAL_API_KEY=x JUDGE_BASE_URL=http://localhost:8000/v1 \
  node skillbench/run-skillbench.mjs --models local:pm-8b,local:Qwen/Qwen3-8B --judge "local-judge:$TEACHER" \
  --tasks training/pm-8b-heldout-tasks.json --out training/pm-8b-results.json
kill $EVAL $JUDGE; wait 2>/dev/null || true

step "6/6 Export for Ollama and the playground"
if [ -z "${SKIP_EXPORT:-}" ]; then
  venv export torch peft transformers accelerate huggingface_hub hf_transfer
  PATH="$OUT/venv-export/bin:$PATH" HF_REPO="${HF_USER:+$HF_USER/PM-8B-q4f16_1-MLC}" bash training/export-pm-8b.sh
fi
echo
echo "Done. Results: training/pm-8b-results.json (read the 'bare' scores). Log: $LOG"
echo "Copy results back, then DELETE THE GPU SERVER so it stops billing."
