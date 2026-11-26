#!/usr/bin/env bash
# Export a trained PM-8B for local use: Ollama (GGUF) and the playground's
# in-browser engine (WebLLM). Run on the GPU box after train-pm-8b.sh, where the
# adapter is in training/out/pm-8b-lora. Untested until the first trained adapter
# exists; each step prints what it made.
#
#   HF_REPO=<you>/PM-8B-q4f16_1-MLC OLLAMA_NAME=<you>/pm-8b bash training/export-pm-8b.sh
set -euo pipefail
# Upload with the current Hugging Face CLI (hf), or the older huggingface-cli.
hf_upload() { if command -v hf >/dev/null; then hf upload "$1" "$2" . --repo-type model; else huggingface-cli upload "$1" "$2" . --repo-type model; fi; }
cd "$(dirname "$0")/.."
OUT=training/out
[ -d "$OUT/pm-8b-lora" ] || { echo "No adapter at $OUT/pm-8b-lora: run training/train-pm-8b.sh first."; exit 1; }

echo "1/3 Merging the adapter into Qwen3-8B…"
pip install -q peft transformers accelerate
python3 - <<'PY'
from peft import AutoPeftModelForCausalLM
from transformers import AutoTokenizer
m = AutoPeftModelForCausalLM.from_pretrained("training/out/pm-8b-lora", torch_dtype="auto")
m = m.merge_and_unload()
m.save_pretrained("training/out/pm-8b-merged", safe_serialization=True)
AutoTokenizer.from_pretrained("Qwen/Qwen3-8B").save_pretrained("training/out/pm-8b-merged")
print("merged → training/out/pm-8b-merged")
PY

echo "2/3 Ollama: GGUF (Q4_K_M) and a Modelfile…"
[ -d "$OUT/llama.cpp" ] || git clone -q --depth 1 https://github.com/ggml-org/llama.cpp "$OUT/llama.cpp"
pip install -q -r "$OUT/llama.cpp/requirements.txt"
python3 "$OUT/llama.cpp/convert_hf_to_gguf.py" "$OUT/pm-8b-merged" --outfile "$OUT/pm-8b-f16.gguf" --outtype f16
(cd "$OUT/llama.cpp" && cmake -B build -DGGML_CUDA=OFF >/dev/null && cmake --build build --target llama-quantize -j >/dev/null)
"$OUT/llama.cpp/build/bin/llama-quantize" "$OUT/pm-8b-f16.gguf" "$OUT/pm-8b-Q4_K_M.gguf" Q4_K_M
cat > "$OUT/Modelfile" <<MF
FROM ./pm-8b-Q4_K_M.gguf
PARAMETER temperature 0.6
SYSTEM "You are PM-8B, trained on the pm-claude-skills library. Do professional work to a senior standard: work from what is given, mark assumptions, and say when someone needs a professional."
MF
if command -v ollama >/dev/null; then
  (cd "$OUT" && ollama create pm-8b -f Modelfile)
  [ -n "${OLLAMA_NAME:-}" ] && ollama cp pm-8b "$OLLAMA_NAME" && ollama push "$OLLAMA_NAME"
else
  echo "Ollama not installed here: copy $OUT/pm-8b-Q4_K_M.gguf and $OUT/Modelfile to a machine with Ollama and run: ollama create pm-8b -f Modelfile"
fi

echo "3/3 WebLLM: MLC weights (q4f16_1)…"
pip install -q --pre -f https://mlc.ai/wheels mlc-llm-nightly-cpu mlc-ai-nightly-cpu
MLC="$OUT/PM-8B-q4f16_1-MLC"
mlc_llm convert_weight "$OUT/pm-8b-merged" --quantization q4f16_1 -o "$MLC"
mlc_llm gen_config "$OUT/pm-8b-merged" --quantization q4f16_1 --conv-template qwen2 -o "$MLC"
if [ -n "${HF_REPO:-}" ]; then
  hf_upload "$HF_REPO" "$MLC"
  echo "Uploaded to https://huggingface.co/$HF_REPO"
fi
cat <<NEXT

Done. To switch PM-8B on in the playground, edit web/pm-8b.json:
  "released": true,
  "webllm.model": "https://huggingface.co/${HF_REPO:-<you>/PM-8B-q4f16_1-MLC}",
  "webllm.model_lib": the model_lib URL of the "Qwen3-8B-q4f16_1-MLC" entry in WebLLM's
     prebuiltAppConfig (same architecture and quantisation, so PM-8B reuses its compiled library).
Check it loads in Chrome with WebGPU before announcing it: it is about a 5 GB download.
NEXT
