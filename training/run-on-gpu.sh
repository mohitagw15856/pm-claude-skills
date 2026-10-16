#!/usr/bin/env bash
# PM-8B, end to end, on one rented GPU, with no Anthropic credit: an open model
# served by vLLM is the teacher and the judge, then PM-8B trains, is scored on
# held-out skills against its base model, and is exported for Ollama/WebLLM.
#
# On a fresh GPU box (one 80 GB card, e.g. an A100 or H100; about 4 to 6 hours,
# roughly $8 to $15 at typical rental prices), inside tmux so it survives a
# disconnect:
#   git clone https://github.com/mohitagw15856/pm-claude-skills && cd pm-claude-skills
#   HF_TOKEN=hf_... HF_USER=<your-hf-name> bash training/run-on-gpu.sh
#
# Options (env): TEACHER (default Qwen/Qwen3-32B-AWQ), LIMIT (teacher tasks, 0 = all),
# SKIP_EXPORT=1 to stop after scoring.
set -euo pipefail
cd "$(dirname "$0")/.."
TEACHER="${TEACHER:-Qwen/Qwen3-32B-AWQ}"
LIMIT="${LIMIT:-0}"
LOG=training/out/run.log
mkdir -p training/out
exec > >(tee -a "$LOG") 2>&1
step() { echo; echo "=== $(date -u +%H:%M) $* ==="; }

step "0/6 Tools"
command -v node >/dev/null || { curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt-get install -y nodejs; }
pip install -q vllm huggingface_hub
[ -n "${HF_TOKEN:-}" ] && huggingface-cli login --token "$HF_TOKEN" >/dev/null

step "1/6 Serve the teacher ($TEACHER) with vLLM"
vllm serve "$TEACHER" --port 8000 --max-model-len 16384 > training/out/vllm-teacher.log 2>&1 &
VLLM=$!
until curl -sf localhost:8000/v1/models >/dev/null; do sleep 10; done

step "2/6 Teacher pass (resumable: rerun the script to continue)"
node scripts/build-worked-examples.mjs >/dev/null
node training/teacher-pass.mjs --base-url http://localhost:8000/v1 --teacher "$TEACHER" --judge "$TEACHER" --limit "$LIMIT"
kill $VLLM; wait $VLLM 2>/dev/null || true

step "3/6 Training mix and held-out tasks"
node training/build-pm-8b-mix.mjs

step "4/6 Train PM-8B (QLoRA on Qwen3-8B)"
HF_REPO="${HF_USER:+$HF_USER/pm-8b-lora}" bash training/train-pm-8b.sh

step "5/6 Score PM-8B against its base model on held-out skills (judge: $TEACHER)"
vllm serve Qwen/Qwen3-8B --port 8001 --enable-lora --lora-modules pm-8b=training/out/pm-8b-lora --max-model-len 8192 > training/out/vllm-eval.log 2>&1 &
EVAL=$!
until curl -sf localhost:8001/v1/models >/dev/null; do sleep 10; done
vllm serve "$TEACHER" --port 8000 --max-model-len 16384 --gpu-memory-utilization 0.45 > training/out/vllm-judge.log 2>&1 &
JUDGE=$!
until curl -sf localhost:8000/v1/models >/dev/null; do sleep 10; done
LOCAL_BASE_URL=http://localhost:8001/v1 LOCAL_API_KEY=x JUDGE_BASE_URL=http://localhost:8000/v1 \
  node skillbench/run-skillbench.mjs --models local:pm-8b,local:Qwen/Qwen3-8B --judge "local-judge:$TEACHER" \
  --tasks training/pm-8b-heldout-tasks.json --out training/pm-8b-results.json
kill $EVAL $JUDGE; wait 2>/dev/null || true

step "6/6 Export for Ollama and the playground"
if [ -z "${SKIP_EXPORT:-}" ]; then
  HF_REPO="${HF_USER:+$HF_USER/PM-8B-q4f16_1-MLC}" bash training/export-pm-8b.sh
fi
echo
echo "Done. Results: training/pm-8b-results.json (read the 'bare' scores). Log: $LOG"
echo "Copy results back, then STOP THE GPU INSTANCE so it stops billing."
