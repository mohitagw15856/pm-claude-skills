#!/usr/bin/env python3
"""Token cost estimator for the token-cost skill.

Estimates token counts locally (two stated heuristics, no tokenizer deps),
prices them at user-supplied rates, and compares before/after files to
quantify savings. Deterministic, stdlib only — prices are inputs, never
baked in, because they change.

Usage
-----
    python3 token_cost.py --file context.md
    python3 token_cost.py --file context.md --price-in 3 --price-out 15 --calls 200
    python3 token_cost.py --file original.json --compare crushed.json --price-in 3
"""
from __future__ import annotations
import argparse, re, sys

def estimate(text):
    by_chars = max(1, len(text) // 4)                     # ~4 chars/token (English prose)
    words = len(re.findall(r"\S+", text))
    by_words = max(1, round(words * 4 / 3))               # ~0.75 words/token
    return by_chars, by_words, round((by_chars + by_words) / 2)

def main(argv=None):
    ap = argparse.ArgumentParser(description="Local token estimate + cost math at your prices.")
    ap.add_argument("--file", help="Input file (default: stdin)")
    ap.add_argument("--compare", help="Second file — report the delta as savings")
    ap.add_argument("--price-in", type=float, default=0, help="$ per million input tokens (your model's price)")
    ap.add_argument("--price-out", type=float, default=0, help="$ per million output tokens")
    ap.add_argument("--calls", type=int, default=1, help="How many calls this content rides along on (default 1)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    text = open(a.file, encoding="utf-8", errors="replace").read() if a.file else sys.stdin.read()
    c, w, est = estimate(text)
    out = {"chars": len(text), "estimate_by_chars": c, "estimate_by_words": w, "estimate": est,
           "note": "heuristic estimate (chars/4 and words*4/3 averaged) — real tokenizers vary ±15%"}
    if a.price_in:
        out["input_cost_per_call"] = round(est * a.price_in / 1_000_000, 6)
        out["input_cost_at_calls"] = round(est * a.price_in / 1_000_000 * a.calls, 4)
    if a.compare:
        text2 = open(a.compare, encoding="utf-8", errors="replace").read()
        _, _, est2 = estimate(text2)
        saved = est - est2
        out["compare"] = {"estimate": est2, "tokens_saved": saved,
                          "pct_saved": round(saved / est * 100, 1) if est else 0}
        if a.price_in:
            out["compare"]["saved_at_calls"] = round(saved * a.price_in / 1_000_000 * a.calls, 4)
    if a.json:
        import json
        print(json.dumps(out, indent=1)); return 0
    print(f"~{est:,} tokens  (chars/4: {c:,} · words*4/3: {w:,} — heuristics, ±15%)")
    if a.price_in:
        print(f"input cost: ${out['input_cost_per_call']:.6f}/call · ${out['input_cost_at_calls']:.4f} across {a.calls} calls at ${a.price_in:g}/M")
    if a.compare:
        cmp = out["compare"]
        print(f"vs {a.compare}: ~{cmp['estimate']:,} tokens → saves {cmp['tokens_saved']:,} ({cmp['pct_saved']:g}%)"
              + (f" · ${cmp['saved_at_calls']:.4f} across {a.calls} calls" if a.price_in else ""))
    print("prices are yours, not baked in — they change; token counts are estimates, not tokenizer truth.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
