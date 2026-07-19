#!/usr/bin/env python3
"""Context crusher for the context-crusher skill.

Deterministically compresses the three things that bloat agent context —
JSON tool outputs, logs, and prose/text — before they're fed to an LLM.
No API, no model, stdlib only: structural compression, not summarization.

Usage
-----
    python3 context_crush.py --mode json  --file response.json
    python3 context_crush.py --mode log   --file build.log --keep 40
    python3 context_crush.py --mode text  --file notes.md
    cat data.json | python3 context_crush.py --mode json

JSON: arrays of objects become schema + stats + head/tail samples.
Logs: consecutive duplicates collapse, repeated lines dedupe with counts,
error/warning lines always survive. Text: whitespace normalization +
head/tail windowing with an elision marker.
"""
from __future__ import annotations
import argparse, json, re, sys

ERR = re.compile(r"error|warn|fail|exception|fatal|panic|traceback|denied", re.I)

def toks(s):  # rough token estimate, ~4 chars/token
    return max(1, len(s) // 4)

def summarize_array(arr, samples):
    keys = {}
    nums = {}
    for item in arr:
        if isinstance(item, dict):
            for k, v in item.items():
                keys.setdefault(k, type(v).__name__)
                if isinstance(v, (int, float)) and not isinstance(v, bool):
                    nums.setdefault(k, []).append(v)
    out = {"__crushed__": f"array of {len(arr)} items",
           "schema": {k: keys[k] for k in sorted(keys)},
           "head": arr[:samples], "tail": arr[-1:] if len(arr) > samples else []}
    stats = {}
    for k in sorted(nums):
        vs = nums[k]
        stats[k] = {"min": min(vs), "max": max(vs), "mean": round(sum(vs) / len(vs), 2)}
    if stats:
        out["numeric_stats"] = stats
    return out

def crush_json(text, samples):
    data = json.loads(text)
    def walk(node):
        if isinstance(node, list) and len(node) > samples + 2 and any(isinstance(i, dict) for i in node):
            return summarize_array(node, samples)
        if isinstance(node, list) and len(node) > 24:
            return {"__crushed__": f"array of {len(node)} values",
                    "head": node[:8], "tail": node[-2:]}
        if isinstance(node, dict):
            return {k: walk(v) for k, v in node.items()}
        if isinstance(node, str) and len(node) > 400:
            return node[:200] + f" …[crushed {len(node)} chars]… " + node[-80:]
        return node
    return json.dumps(walk(data), separators=(",", ":"), sort_keys=False)

def crush_log(text, keep):
    lines = text.splitlines()
    out, counts, seen_order = [], {}, []
    prev, run = None, 0
    for ln in lines:
        key = ln.strip()
        if key == prev:
            run += 1
            continue
        if prev is not None and run > 1:
            out.append(f"  [x{run} repeats]")
        prev, run = key, 1
        counts[key] = counts.get(key, 0) + 1
        if counts[key] == 1:
            seen_order.append(ln)
            out.append(ln)
    if run > 1:
        out.append(f"  [x{run} repeats]")
    errors = [ln for ln in lines if ERR.search(ln)]
    if len(out) > keep:
        head = out[: keep // 2]
        tail = out[-keep // 2:]
        out = head + [f"  …[crushed {len(out) - keep} lines]…"] + tail
    dedup_err = []
    for e in errors:
        if e not in dedup_err:
            dedup_err.append(e)
    if dedup_err:
        out += ["", f"-- all error/warning lines ({len(dedup_err)} unique) --"] + dedup_err[:60]
    return "\n".join(out)

def crush_text(text, keep):
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    lines = text.splitlines()
    if len(lines) <= keep:
        return "\n".join(lines)
    head = lines[: int(keep * 0.7)]
    tail = lines[-int(keep * 0.3):]
    return "\n".join(head + [f"\n…[crushed {len(lines) - keep} lines — fetch the original if this section matters]…\n"] + tail)

def main(argv=None):
    ap = argparse.ArgumentParser(description="Deterministic context compression: JSON, logs, text.")
    ap.add_argument("--mode", choices=["json", "log", "text"], required=True)
    ap.add_argument("--file", help="Input file (default: stdin)")
    ap.add_argument("--samples", type=int, default=3, help="JSON: sample rows kept per array (default 3)")
    ap.add_argument("--keep", type=int, default=60, help="log/text: max lines kept (default 60)")
    a = ap.parse_args(argv)

    text = open(a.file, encoding="utf-8", errors="replace").read() if a.file else sys.stdin.read()
    try:
        if a.mode == "json":
            crushed = crush_json(text, a.samples)
        elif a.mode == "log":
            crushed = crush_log(text, a.keep)
        else:
            crushed = crush_text(text, a.keep)
    except json.JSONDecodeError as e:
        print(f"not valid JSON ({e}); try --mode text", file=sys.stderr)
        return 2
    t0, t1 = toks(text), toks(crushed)
    if t1 >= t0:
        print(f"[context-crush {a.mode}: no gain (~{t0:,} tokens, already compact) — use the original]")
        print(text.rstrip("\n"))
        return 0
    pct = round((1 - t1 / t0) * 100)
    print(f"[context-crush {a.mode}: ~{t0:,} -> ~{t1:,} tokens, {pct}% smaller — structural, not summarized]")
    print(crushed)
    return 0

if __name__ == "__main__":
    sys.exit(main())
