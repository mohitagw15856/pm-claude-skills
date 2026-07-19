#!/usr/bin/env python3
"""Repo map generator for the repo-map skill.

Walks a directory and emits a compact, deterministic map — the tree with
sizes plus top-level symbols per code file (regex-based, no parser deps) —
so an agent can navigate by map instead of reading files wholesale.
Prints the token math: what reading the map costs vs. reading everything.

Usage
-----
    python3 repo_map.py .
    python3 repo_map.py src --max-files 400 --no-symbols
"""
from __future__ import annotations
import argparse, os, re, sys

SKIP_DIRS = {".git", "node_modules", "dist", "build", ".venv", "venv", "__pycache__",
             ".next", "target", "vendor", ".idea", ".vscode", "coverage", ".cache"}
SYMBOL_RULES = {
    ".py":  re.compile(r"^(?:class|def|async def)\s+(\w+)", re.M),
    ".js":  re.compile(r"^(?:export\s+)?(?:default\s+)?(?:async\s+)?(?:function|class)\s+(\w+)|^(?:export\s+)?const\s+(\w+)\s*=", re.M),
    ".ts":  re.compile(r"^(?:export\s+)?(?:default\s+)?(?:async\s+)?(?:function|class|interface|type|enum)\s+(\w+)|^(?:export\s+)?const\s+(\w+)\s*=", re.M),
    ".go":  re.compile(r"^func\s+(?:\([^)]+\)\s+)?(\w+)|^type\s+(\w+)", re.M),
    ".rs":  re.compile(r"^(?:pub\s+)?(?:fn|struct|enum|trait|impl)\s+(\w+)", re.M),
    ".java": re.compile(r"^\s*(?:public|protected)\s+(?:static\s+)?(?:final\s+)?(?:class|interface|enum)\s+(\w+)", re.M),
    ".rb":  re.compile(r"^\s*(?:class|module|def)\s+([\w.?!]+)", re.M),
    ".sh":  re.compile(r"^(?:function\s+)?(\w+)\s*\(\)", re.M),
}
SYMBOL_RULES[".jsx"] = SYMBOL_RULES[".js"]
SYMBOL_RULES[".tsx"] = SYMBOL_RULES[".ts"]
SYMBOL_RULES[".mjs"] = SYMBOL_RULES[".js"]

def toks(n_chars):
    return max(1, n_chars // 4)

def main(argv=None):
    ap = argparse.ArgumentParser(description="Compact deterministic repo map with symbols and token math.")
    ap.add_argument("path", nargs="?", default=".")
    ap.add_argument("--max-files", type=int, default=500, help="Stop after N files (default 500)")
    ap.add_argument("--max-symbols", type=int, default=12, help="Symbols shown per file (default 12)")
    ap.add_argument("--no-symbols", action="store_true")
    a = ap.parse_args(argv)

    root = os.path.abspath(a.path)
    rows, total_chars, total_lines, n_files, truncated = [], 0, 0, 0, False
    for dirpath, dirnames, filenames in sorted(os.walk(root)):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS and not d.startswith("."))
        rel = os.path.relpath(dirpath, root)
        depth = 0 if rel == "." else rel.count(os.sep) + 1
        if rel != ".":
            rows.append(("  " * (depth - 1) + os.path.basename(dirpath) + "/", "", ""))
        for fn in sorted(filenames):
            if fn.startswith("."):
                continue
            if n_files >= a.max_files:
                truncated = True
                break
            fp = os.path.join(dirpath, fn)
            try:
                with open(fp, encoding="utf-8", errors="replace") as f:
                    content = f.read()
            except OSError:
                continue
            n_files += 1
            lines = content.count("\n") + 1
            total_chars += len(content)
            total_lines += lines
            syms = ""
            ext = os.path.splitext(fn)[1]
            if not a.no_symbols and ext in SYMBOL_RULES:
                found = []
                for m in SYMBOL_RULES[ext].finditer(content):
                    name = next((g for g in m.groups() if g), None)
                    if name and name not in found:
                        found.append(name)
                if found:
                    shown = found[: a.max_symbols]
                    extra = f" +{len(found) - len(shown)}" if len(found) > len(shown) else ""
                    syms = "  → " + ", ".join(shown) + extra
            rows.append(("  " * depth + fn, f"{lines}L", syms))
        if truncated:
            break

    out_lines = [f"{name:<48}{meta:>6}{syms}" for name, meta, syms in rows]
    body = "\n".join(out_lines)
    map_tokens = toks(len(body))
    full_tokens = toks(total_chars)
    print(f"# Repo map: {root}")
    print(f"# {n_files} files · {total_lines:,} lines · reading everything ≈ {full_tokens:,} tokens · this map ≈ {map_tokens:,} tokens ({round(map_tokens/full_tokens*100,1) if full_tokens else 0}%)")
    if truncated:
        print(f"# [truncated at {a.max_files} files — raise --max-files or map a subdirectory]")
    print(body)
    print("# navigate by map: open only the files whose names/symbols match the task — the map is the index, not the territory")
    return 0

if __name__ == "__main__":
    sys.exit(main())
